import React, { useState } from 'react';
import { Sparkles, Video, Image as ImageIcon, Wand2, Upload, Play, Film, RefreshCw, Download, AlertCircle, CheckCircle2, User } from 'lucide-react';
import { soundEffects } from '../utils/audio.ts';

export const AiCreativeStudio: React.FC = () => {
  const [activeMode, setActiveMode] = useState<'video' | 'image'>('video');

  // Video Generation States (gemini-omni-1.2-flash via Interactions API)
  const [videoPrompt, setVideoPrompt] = useState(
    'Cinematic 3D camera pan around Jyotiprakash with glowing cybernetic particles, soft atmospheric neon lighting, and high production value.'
  );
  const [videoAspectRatio, setVideoAspectRatio] = useState<'16:9' | '9:16'>('16:9');
  const [selectedImageForVideo, setSelectedImageForVideo] = useState<string>('/assets/aistudio/lky_465f9290.jpeg');
  const [customImageBase64, setCustomImageBase64] = useState<string | null>(null);
  const [isVideoLoading, setIsVideoLoading] = useState(false);
  const [generatedVideoUrl, setGeneratedVideoUrl] = useState<string | null>(null);
  const [videoError, setVideoError] = useState<string | null>(null);

  // Image Generation/Editing States (gemini-nano-banana-2.1)
  const [imagePrompt, setImagePrompt] = useState('Cyberpunk developer workspace in futuristic Bhubaneswar with neon purple and cyan holographic screens');
  const [imageAspectRatio, setImageAspectRatio] = useState<'1:1' | '16:9' | '9:16'>('1:1');
  const [editImageBase64, setEditImageBase64] = useState<string | null>(null);
  const [isImageLoading, setIsImageLoading] = useState(false);
  const [generatedImageUrl, setGeneratedImageUrl] = useState<string | null>(null);
  const [imageError, setImageError] = useState<string | null>(null);

  // Handle file uploads for video animation
  const handleFileUploadForVideo = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        setCustomImageBase64(reader.result);
        setSelectedImageForVideo(reader.result);
      }
    };
    reader.readAsDataURL(file);
  };

  // Handle file uploads for image editing
  const handleFileUploadForImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        setEditImageBase64(reader.result);
      }
    };
    reader.readAsDataURL(file);
  };

  // Convert image URL to base64 for API submission if needed
  const fetchUrlAsBase64 = async (url: string): Promise<string> => {
    if (url.startsWith('data:')) return url;
    const response = await fetch(url);
    const blob = await response.blob();
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result as string);
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
  };

  // Generate Video with gemini-omni-1.2-flash
  const handleGenerateVideo = async () => {
    soundEffects.click();
    setIsVideoLoading(true);
    setVideoError(null);
    setGeneratedVideoUrl(null);

    try {
      let base64 = selectedImageForVideo;
      if (!base64.startsWith('data:')) {
        base64 = await fetchUrlAsBase64(selectedImageForVideo);
      }

      const res = await fetch('/api/ai/video', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          base64Image: base64,
          prompt: videoPrompt,
          aspectRatio: videoAspectRatio,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Failed to animate video');
      }

      if (data.videoUrl) {
        setGeneratedVideoUrl(data.videoUrl);
        soundEffects.success();
      } else {
        throw new Error('No video URL returned from the server.');
      }
    } catch (err: any) {
      console.error('Video Generation Error:', err);
      setVideoError(err.message || 'Error communicating with Gemini Omni video engine.');
    } finally {
      setIsVideoLoading(false);
    }
  };

  // Generate or Edit Image with gemini-nano-banana-2.1
  const handleGenerateImage = async () => {
    soundEffects.click();
    setIsImageLoading(true);
    setImageError(null);
    setGeneratedImageUrl(null);

    try {
      const payload: any = {
        prompt: imagePrompt,
        aspectRatio: imageAspectRatio,
      };

      if (editImageBase64) {
        payload.base64Image = editImageBase64;
      }

      const res = await fetch('/api/ai/image', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Failed to create/edit image');
      }

      if (data.imageUrl) {
        setGeneratedImageUrl(data.imageUrl);
        soundEffects.success();
      } else {
        throw new Error('No image returned from server.');
      }
    } catch (err: any) {
      console.error('Image Generation Error:', err);
      setImageError(err.message || 'Error communicating with Gemini image engine.');
    } finally {
      setIsImageLoading(false);
    }
  };

  return (
    <section id="ai-lab" className="py-24 px-4 sm:px-6 max-w-7xl mx-auto relative">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-purple-600/10 rounded-full blur-[140px] pointer-events-none" />

      {/* Section Header */}
      <div className="gsap-section-header text-center max-w-3xl mx-auto mb-12">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-950/60 border border-purple-500/40 text-purple-300 font-mono text-xs uppercase tracking-wider mb-4">
          <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
          <span>Next-Gen Gemini AI Studio</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-heading font-extrabold text-white tracking-tight">
          AI Creative <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent">Laboratory</span>
        </h2>
        <p className="text-slate-400 text-sm sm:text-base mt-3 leading-relaxed">
          Interactive multimodal playground powered by <strong>gemini-omni-1.2-flash</strong> for video animation and <strong>gemini-nano-banana-2.1</strong> for high-resolution image synthesis and editing.
        </p>

        {/* Mode Switcher */}
        <div className="inline-flex p-1.5 rounded-2xl bg-[#0e0e18] border border-purple-500/30 mt-8 shadow-xl">
          <button
            onClick={() => {
              soundEffects.click();
              setActiveMode('video');
            }}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-mono text-xs uppercase tracking-wider font-semibold transition-all ${
              activeMode === 'video'
                ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-lg shadow-purple-600/30'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Video className="w-4 h-4 text-cyan-300" />
            <span>Animate Photo into Video</span>
          </button>
          <button
            onClick={() => {
              soundEffects.click();
              setActiveMode('image');
            }}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-mono text-xs uppercase tracking-wider font-semibold transition-all ${
              activeMode === 'image'
                ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg shadow-purple-600/30'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <ImageIcon className="w-4 h-4 text-pink-300" />
            <span>Create & Edit Images</span>
          </button>
        </div>
      </div>

      {/* ======================================================== */}
      {/* FEATURE 1: ANIMATE IMAGE INTO VIDEO (gemini-omni-1.2-flash) */}
      {/* ======================================================== */}
      {activeMode === 'video' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start bg-[#0a0a14]/90 border border-purple-500/30 rounded-3xl p-6 sm:p-8 backdrop-blur-xl shadow-2xl relative overflow-hidden">
          {/* Left Configuration Panel */}
          <div className="lg:col-span-6 space-y-6">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Film className="w-4 h-4 text-cyan-400" />
                <h3 className="font-heading font-bold text-lg text-white">1. Select Input Photo</h3>
              </div>
              <p className="text-xs text-slate-400">
                Choose Jyotiprakash Kundu's portrait or upload your own photo to animate into a cinematic video clip.
              </p>

              {/* Source Image Selector */}
              <div className="grid grid-cols-2 gap-3 mt-3">
                <button
                  type="button"
                  onClick={() => {
                    soundEffects.click();
                    setSelectedImageForVideo('/assets/aistudio/lky_465f9290.jpeg');
                  }}
                  className={`p-3 rounded-2xl border text-left flex items-center gap-3 transition-all ${
                    selectedImageForVideo === '/assets/aistudio/lky_465f9290.jpeg'
                      ? 'border-cyan-400 bg-cyan-950/30 shadow-[0_0_15px_rgba(6,182,212,0.2)]'
                      : 'border-slate-800 bg-[#0d0d1a] hover:border-slate-700'
                  }`}
                >
                  <img
                    src="/assets/aistudio/lky_465f9290.jpeg"
                    alt="Jyotiprakash Kundu"
                    className="w-12 h-14 object-cover rounded-lg border border-purple-500/40"
                  />
                  <div>
                    <span className="text-xs font-semibold text-white block">Jyotiprakash's Photo</span>
                    <span className="text-[10px] font-mono text-cyan-300">Official Portrait</span>
                  </div>
                </button>

                <label
                  className={`p-3 rounded-2xl border text-left flex items-center gap-3 cursor-pointer transition-all ${
                    customImageBase64 && selectedImageForVideo === customImageBase64
                      ? 'border-purple-400 bg-purple-950/30 shadow-[0_0_15px_rgba(168,85,247,0.2)]'
                      : 'border-slate-800 bg-[#0d0d1a] hover:border-slate-700'
                  }`}
                >
                  <input type="file" accept="image/*" onChange={handleFileUploadForVideo} className="hidden" />
                  {customImageBase64 ? (
                    <img src={customImageBase64} alt="Custom" className="w-12 h-14 object-cover rounded-lg border border-purple-500/40" />
                  ) : (
                    <div className="w-12 h-14 rounded-lg bg-slate-800 flex items-center justify-center text-slate-400">
                      <Upload className="w-5 h-5" />
                    </div>
                  )}
                  <div>
                    <span className="text-xs font-semibold text-white block">Upload Custom Photo</span>
                    <span className="text-[10px] font-mono text-purple-300">JPG, PNG, WebP</span>
                  </div>
                </label>
              </div>
            </div>

            {/* Aspect Ratio Selector */}
            <div>
              <label className="text-xs font-mono font-bold uppercase tracking-wider text-purple-300 block mb-2">
                2. Video Aspect Ratio
              </label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => {
                    soundEffects.click();
                    setVideoAspectRatio('16:9');
                  }}
                  className={`py-2.5 px-4 rounded-xl font-mono text-xs border flex items-center justify-center gap-2 transition-all ${
                    videoAspectRatio === '16:9'
                      ? 'border-cyan-400 bg-cyan-950/30 text-white font-bold shadow-md shadow-cyan-500/20'
                      : 'border-slate-800 bg-[#0d0d1a] text-slate-400 hover:text-white'
                  }`}
                >
                  <span className="w-5 h-3 border border-current rounded-sm" />
                  <span>16:9 (Landscape HD)</span>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    soundEffects.click();
                    setVideoAspectRatio('9:16');
                  }}
                  className={`py-2.5 px-4 rounded-xl font-mono text-xs border flex items-center justify-center gap-2 transition-all ${
                    videoAspectRatio === '9:16'
                      ? 'border-cyan-400 bg-cyan-950/30 text-white font-bold shadow-md shadow-cyan-500/20'
                      : 'border-slate-800 bg-[#0d0d1a] text-slate-400 hover:text-white'
                  }`}
                >
                  <span className="w-3 h-5 border border-current rounded-sm" />
                  <span>9:16 (Portrait / Reels)</span>
                </button>
              </div>
            </div>

            {/* Motion Prompt */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs font-mono font-bold uppercase tracking-wider text-purple-300">
                  3. Cinematic Motion Direction
                </label>
                <button
                  type="button"
                  onClick={() => {
                    soundEffects.click();
                    setVideoPrompt('Slow cinematic parallax camera push-in with subtle atmospheric lighting, gentle movement, and 4k movie quality.');
                  }}
                  className="text-[10px] font-mono text-cyan-400 hover:underline"
                >
                  Reset Preset
                </button>
              </div>
              <textarea
                value={videoPrompt}
                onChange={(e) => setVideoPrompt(e.target.value)}
                rows={3}
                className="w-full bg-[#0d0d1a] border border-slate-800 focus:border-purple-500 rounded-xl p-3 text-xs text-white placeholder-slate-500 focus:outline-none transition-colors"
                placeholder="Describe camera motion, atmosphere, and lighting..."
              />
            </div>

            {/* Generate Action Button */}
            <button
              onClick={handleGenerateVideo}
              disabled={isVideoLoading}
              className={`w-full py-3.5 px-6 rounded-2xl font-mono text-xs font-bold uppercase tracking-wider text-white flex items-center justify-center gap-2 transition-all shadow-xl ${
                isVideoLoading
                  ? 'bg-purple-900/50 cursor-not-allowed text-purple-300'
                  : 'bg-gradient-to-r from-purple-600 via-indigo-600 to-cyan-500 hover:opacity-95 shadow-purple-600/30 active:scale-[0.99]'
              }`}
            >
              {isVideoLoading ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin text-cyan-400" />
                  <span>Generating Video with gemini-omni-1.2-flash...</span>
                </>
              ) : (
                <>
                  <Wand2 className="w-4 h-4 text-cyan-300" />
                  <span>Render Cinematic Video Clip</span>
                </>
              )}
            </button>

            {videoError && (
              <div className="p-3 rounded-xl bg-red-950/40 border border-red-500/40 flex items-start gap-2.5 text-xs text-red-300">
                <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-red-400" />
                <div>
                  <p className="font-semibold">Video Generation Notice</p>
                  <p className="text-[11px] text-red-200 mt-0.5">{videoError}</p>
                </div>
              </div>
            )}
          </div>

          {/* Right Display / Video Player Panel */}
          <div className="lg:col-span-6 flex flex-col items-center justify-center min-h-[380px] bg-[#07070f] border border-slate-800/80 rounded-2xl p-4 sm:p-6 relative">
            {isVideoLoading ? (
              <div className="text-center space-y-4">
                <div className="relative w-20 h-20 mx-auto">
                  <div className="absolute inset-0 rounded-full border-2 border-purple-500/20" />
                  <div className="absolute inset-0 rounded-full border-2 border-t-purple-400 border-r-cyan-400 animate-spin" />
                  <div className="absolute inset-2 rounded-full bg-purple-950/40 flex items-center justify-center text-cyan-400">
                    <Video className="w-6 h-6 animate-pulse" />
                  </div>
                </div>
                <div>
                  <h4 className="font-heading font-bold text-white text-base">Synthesizing 60fps Motion Frames</h4>
                  <p className="text-xs text-slate-400 font-mono mt-1">
                    Interactions API: Model gemini-omni-1.2-flash ({videoAspectRatio})
                  </p>
                  <p className="text-[11px] text-purple-400 mt-2 italic">Rendering photorealistic cinematic interpolation...</p>
                </div>
              </div>
            ) : generatedVideoUrl ? (
              <div className="w-full space-y-3">
                <div className={`relative mx-auto rounded-xl overflow-hidden border border-purple-500/40 shadow-2xl ${
                  videoAspectRatio === '9:16' ? 'max-w-[280px] aspect-[9/16]' : 'w-full aspect-[16/9]'
                }`}>
                  <video
                    src={generatedVideoUrl}
                    controls
                    autoPlay
                    loop
                    playsInline
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex items-center justify-between pt-2">
                  <span className="text-xs font-mono text-emerald-400 flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4" /> Video Render Complete
                  </span>
                  <a
                    href={generatedVideoUrl}
                    download="jyotiprakash_omni_video.mp4"
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-purple-600/30 border border-purple-500/40 text-purple-300 hover:text-white hover:bg-purple-600 transition-colors text-xs font-mono"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Save Video</span>
                  </a>
                </div>
              </div>
            ) : (
              <div className="text-center space-y-3 max-w-sm">
                <div className="w-16 h-16 rounded-2xl bg-purple-950/40 border border-purple-500/30 flex items-center justify-center mx-auto text-purple-400">
                  <Play className="w-7 h-7" />
                </div>
                <h4 className="font-heading font-bold text-white text-base">Video Preview Monitor</h4>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Click <strong className="text-purple-300">"Render Cinematic Video Clip"</strong> on the left to animate the selected photograph into an award-worthy motion showcase.
                </p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* FEATURE 2: CREATE & EDIT IMAGES (gemini-nano-banana-2.1)   */}
      {/* ======================================================== */}
      {activeMode === 'image' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start bg-[#0a0a14]/90 border border-purple-500/30 rounded-3xl p-6 sm:p-8 backdrop-blur-xl shadow-2xl relative overflow-hidden">
          {/* Left Controls */}
          <div className="lg:col-span-6 space-y-6">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Sparkles className="w-4 h-4 text-pink-400" />
                <h3 className="font-heading font-bold text-lg text-white">High-Resolution Image Studio</h3>
              </div>
              <p className="text-xs text-slate-400">
                Generate brand-new digital imagery or upload an image to edit with <strong>gemini-nano-banana-2.1</strong>.
              </p>
            </div>

            {/* Mode: Generate or Edit */}
            <div>
              <label className="text-xs font-mono font-bold uppercase tracking-wider text-pink-300 block mb-2">
                Optional: Upload Image to Edit
              </label>
              <label className="flex items-center justify-center gap-2.5 p-3.5 rounded-xl border border-dashed border-purple-500/40 bg-[#0d0d1a] cursor-pointer hover:border-pink-400 transition-colors">
                <input type="file" accept="image/*" onChange={handleFileUploadForImage} className="hidden" />
                <Upload className="w-4 h-4 text-purple-400" />
                <span className="text-xs text-slate-300 font-mono">
                  {editImageBase64 ? 'Image uploaded for AI editing (click to change)' : 'Select image to edit (leave blank for new generation)'}
                </span>
              </label>
              {editImageBase64 && (
                <div className="mt-2 flex items-center justify-between">
                  <span className="text-[11px] text-cyan-300 font-mono">Editing Mode Active</span>
                  <button
                    type="button"
                    onClick={() => setEditImageBase64(null)}
                    className="text-[10px] text-red-400 hover:underline"
                  >
                    Clear Image
                  </button>
                </div>
              )}
            </div>

            {/* Aspect Ratio */}
            <div>
              <label className="text-xs font-mono font-bold uppercase tracking-wider text-purple-300 block mb-2">
                Aspect Ratio
              </label>
              <div className="grid grid-cols-3 gap-2">
                {(['1:1', '16:9', '9:16'] as const).map((ratio) => (
                  <button
                    key={ratio}
                    type="button"
                    onClick={() => {
                      soundEffects.click();
                      setImageAspectRatio(ratio);
                    }}
                    className={`py-2 px-3 rounded-xl font-mono text-xs border text-center transition-all ${
                      imageAspectRatio === ratio
                        ? 'border-pink-400 bg-pink-950/30 text-white font-bold shadow-md shadow-pink-500/20'
                        : 'border-slate-800 bg-[#0d0d1a] text-slate-400 hover:text-white'
                    }`}
                  >
                    {ratio}
                  </button>
                ))}
              </div>
            </div>

            {/* Prompt */}
            <div>
              <label className="text-xs font-mono font-bold uppercase tracking-wider text-purple-300 block mb-2">
                Creative Image Prompt
              </label>
              <textarea
                value={imagePrompt}
                onChange={(e) => setImagePrompt(e.target.value)}
                rows={3}
                className="w-full bg-[#0d0d1a] border border-slate-800 focus:border-pink-500 rounded-xl p-3 text-xs text-white placeholder-slate-500 focus:outline-none transition-colors"
                placeholder="Enter prompt for gemini-nano-banana-2.1..."
              />

              {/* Quick Prompt Starters */}
              <div className="mt-2 flex flex-wrap gap-1.5">
                {[
                  'Bhubaneswar cybernetic smart city 2045',
                  'Futuristic Python full stack holographic dashboard',
                  'Ultra-HD geometric 3D polyhedral core wallpaper',
                ].map((starter, sIdx) => (
                  <button
                    key={sIdx}
                    type="button"
                    onClick={() => {
                      soundEffects.hover();
                      setImagePrompt(starter);
                    }}
                    className="text-[10px] font-mono px-2 py-1 rounded-md bg-[#0f0f1f] text-slate-400 hover:text-cyan-300 border border-slate-800"
                  >
                    {starter}
                  </button>
                ))}
              </div>
            </div>

            {/* Generate Button */}
            <button
              onClick={handleGenerateImage}
              disabled={isImageLoading}
              className={`w-full py-3.5 px-6 rounded-2xl font-mono text-xs font-bold uppercase tracking-wider text-white flex items-center justify-center gap-2 transition-all shadow-xl ${
                isImageLoading
                  ? 'bg-purple-900/50 cursor-not-allowed text-purple-300'
                  : 'bg-gradient-to-r from-pink-600 via-purple-600 to-indigo-600 hover:opacity-95 shadow-pink-600/30 active:scale-[0.99]'
              }`}
            >
              {isImageLoading ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin text-pink-300" />
                  <span>Synthesizing with gemini-nano-banana-2.1...</span>
                </>
              ) : (
                <>
                  <Wand2 className="w-4 h-4 text-pink-300" />
                  <span>{editImageBase64 ? 'Apply AI Edit' : 'Generate 1K Resolution Image'}</span>
                </>
              )}
            </button>

            {imageError && (
              <div className="p-3 rounded-xl bg-red-950/40 border border-red-500/40 flex items-start gap-2.5 text-xs text-red-300">
                <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-red-400" />
                <div>
                  <p className="font-semibold">Image Generation Notice</p>
                  <p className="text-[11px] text-red-200 mt-0.5">{imageError}</p>
                </div>
              </div>
            )}
          </div>

          {/* Right Image Result */}
          <div className="lg:col-span-6 flex flex-col items-center justify-center min-h-[380px] bg-[#07070f] border border-slate-800/80 rounded-2xl p-4 sm:p-6 relative">
            {isImageLoading ? (
              <div className="text-center space-y-4">
                <div className="relative w-20 h-20 mx-auto">
                  <div className="absolute inset-0 rounded-full border-2 border-pink-500/20" />
                  <div className="absolute inset-0 rounded-full border-2 border-t-pink-400 border-r-purple-400 animate-spin" />
                  <div className="absolute inset-2 rounded-full bg-pink-950/40 flex items-center justify-center text-pink-400">
                    <ImageIcon className="w-6 h-6 animate-pulse" />
                  </div>
                </div>
                <div>
                  <h4 className="font-heading font-bold text-white text-base">Generating High-Fidelity Pixels</h4>
                  <p className="text-xs text-slate-400 font-mono mt-1">
                    Model: gemini-nano-banana-2.1 ({imageAspectRatio})
                  </p>
                </div>
              </div>
            ) : generatedImageUrl ? (
              <div className="w-full space-y-3">
                <div className="rounded-xl overflow-hidden border border-pink-500/40 shadow-2xl max-h-[460px] flex items-center justify-center bg-black">
                  <img src={generatedImageUrl} alt="Generated by AI" className="max-h-[440px] w-auto object-contain" />
                </div>
                <div className="flex items-center justify-between pt-2">
                  <span className="text-xs font-mono text-emerald-400 flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4" /> Synthesized Successfully
                  </span>
                  <a
                    href={generatedImageUrl}
                    download="jyotiprakash_nano_banana.png"
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-pink-600/30 border border-pink-500/40 text-pink-300 hover:text-white hover:bg-pink-600 transition-colors text-xs font-mono"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Download Image</span>
                  </a>
                </div>
              </div>
            ) : (
              <div className="text-center space-y-3 max-w-sm">
                <div className="w-16 h-16 rounded-2xl bg-pink-950/40 border border-pink-500/30 flex items-center justify-center mx-auto text-pink-400">
                  <ImageIcon className="w-7 h-7" />
                </div>
                <h4 className="font-heading font-bold text-white text-base">Image Studio Monitor</h4>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Enter a creative visual prompt and hit <strong className="text-pink-300">Generate</strong> to preview high-resolution graphics rendered by Gemini.
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  );
};
