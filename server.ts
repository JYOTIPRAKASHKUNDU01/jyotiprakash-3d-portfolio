import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { GoogleGenAI } from '@google/genai';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;

// Parse JSON request bodies up to 25MB (to handle image uploads for video animation)
app.use(express.json({ limit: '25mb' }));
app.use(express.urlencoded({ extended: true, limit: '25mb' }));

// Initialize Google GenAI client server-side
const getAiClient = () => {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error('GEMINI_API_KEY is not configured in environment variables');
  }
  return new GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      },
    },
  });
};

// --- API ROUTES ---

// Health check
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    developer: 'Jyotiprakash Kundu',
    timestamp: new Date().toISOString(),
    aiConfigured: Boolean(process.env.GEMINI_API_KEY),
  });
});

// Contact form submission
const contactSubmissions: Array<{
  id: string;
  name: string;
  email: string;
  subject?: string;
  message: string;
  timestamp: string;
}> = [];

app.post('/api/contact', (req, res) => {
  try {
    const { name, email, subject, message } = req.body;
    if (!name || !email || !message) {
      return res.status(400).json({ error: 'Name, email, and message are required.' });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ error: 'Invalid email address.' });
    }

    const submission = {
      id: `msg_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
      name: String(name).trim(),
      email: String(email).trim(),
      subject: subject ? String(subject).trim() : 'Portfolio Inquiry',
      message: String(message).trim(),
      timestamp: new Date().toISOString(),
    };

    contactSubmissions.unshift(submission);
    console.log(`[Contact] New inquiry from ${submission.name} <${submission.email}>: "${submission.subject}"`);

    return res.status(200).json({
      success: true,
      message: "Thank you for reaching out! Jyotiprakash will get back to you shortly.",
      id: submission.id,
    });
  } catch (err: any) {
    console.error('[Contact Error]', err);
    return res.status(500).json({ error: err.message || 'Failed to submit contact message.' });
  }
});

// AI Feature 1: Create & Edit Images using gemini-nano-banana-2.1
app.post('/api/ai/image', async (req, res) => {
  try {
    const { prompt, base64Image, mimeType = 'image/png', aspectRatio = '1:1' } = req.body;

    if (!prompt) {
      return res.status(400).json({ error: 'Prompt is required.' });
    }

    const ai = getAiClient();

    let interaction;
    if (base64Image) {
      // Edit existing image
      const cleanBase64 = base64Image.replace(/^data:image\/\w+;base64,/, '');
      interaction = await ai.interactions.create({
        model: 'gemini-nano-banana-2.1',
        input: [
          {
            type: 'image',
            mime_type: mimeType,
            data: cleanBase64,
          },
          {
            type: 'text',
            text: prompt,
          },
        ],
        response_modalities: ['image', 'text'],
      });
    } else {
      // Generate new image
      interaction = await ai.interactions.create({
        model: 'gemini-nano-banana-2.1',
        input: prompt,
        response_modalities: ['image', 'text'],
        generation_config: {
          image_config: {
            aspect_ratio: aspectRatio,
            image_size: '1K',
          },
        },
      });
    }

    // Extract image from interaction steps
    let imageUrl: string | null = null;
    let descriptionText = '';

    for (const step of (interaction.steps || []) as any[]) {
      if (step.type === 'model_output') {
        const imageContent = step.content?.find((c: any) => c.type === 'image') as any;
        if (imageContent && imageContent.data) {
          const outMime = imageContent.mime_type || 'image/png';
          imageUrl = `data:${outMime};base64,${imageContent.data}`;
        }
        const textContent = step.content?.find((c: any) => c.type === 'text') as any;
        if (textContent?.text) {
          descriptionText += textContent.text;
        }
      }
    }

    if (!imageUrl) {
      return res.status(500).json({
        error: 'The AI model completed without returning an image. Please try a different prompt.',
      });
    }

    return res.json({
      success: true,
      imageUrl,
      description: descriptionText,
    });
  } catch (err: any) {
    console.error('[AI Image Error]', err);
    const message = err?.message || 'Failed to generate/edit image';
    return res.status(500).json({
      error: message,
      details: err?.toString(),
    });
  }
});

// AI Feature 2: Animate Image into Video using gemini-omni-1.2-flash via Interactions API
app.post('/api/ai/video', async (req, res) => {
  try {
    const { base64Image, mimeType = 'image/jpeg', prompt, aspectRatio = '16:9' } = req.body;

    if (!base64Image) {
      return res.status(400).json({ error: 'Base64 image is required to animate into video.' });
    }

    const cleanBase64 = base64Image.replace(/^data:image\/\w+;base64,/, '');
    const validAspectRatio = aspectRatio === '9:16' ? '9:16' : '16:9';

    const ai = getAiClient();

    console.log(`[AI Video] Animating image with aspect ratio ${validAspectRatio}...`);

    const interaction = await ai.interactions.create(
      {
        model: 'gemini-omni-1.2-flash',
        input: [
          {
            type: 'image',
            mime_type: mimeType,
            data: cleanBase64,
          },
          {
            type: 'text',
            text:
              prompt ||
              'Slow cinematic parallax camera push-in with subtle atmospheric lighting, gentle movement, and 4k movie quality.',
          },
        ],
        background: false,
        store: false,
        stream: false,
        response_format: {
          type: 'video',
          aspect_ratio: validAspectRatio,
        },
      },
      { timeout: 300000 }
    );

    const videoPart = interaction.output_video;
    if (videoPart && videoPart.data) {
      const outMime = videoPart.mime_type || 'video/mp4';
      return res.json({
        success: true,
        videoUrl: `data:${outMime};base64,${videoPart.data}`,
        mimeType: outMime,
      });
    } else if (videoPart && (videoPart as any).uri) {
      return res.json({
        success: true,
        videoUrl: (videoPart as any).uri,
      });
    }

    return res.status(500).json({
      error: 'The AI model completed without returning a video stream. Please try again.',
    });
  } catch (err: any) {
    console.error('[AI Video Error]', err);
    const message = err?.message || 'Failed to animate video';
    return res.status(500).json({
      error: message,
      details: err?.toString(),
    });
  }
});

// Setup Vite middleware in dev or static files in production
async function startServer() {
  const isProd = process.env.NODE_ENV === 'production';

  if (!isProd) {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.resolve(__dirname, 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.resolve(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`🚀 Portfolio server running at http://0.0.0.0:${PORT} [${isProd ? 'production' : 'development'}]`);
  });
}

startServer().catch((err) => {
  console.error('Failed to start server:', err);
  process.exit(1);
});
