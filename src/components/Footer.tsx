import React from 'react';
import { ArrowUp, Github, Linkedin, Mail, Heart, Sparkles, MapPin } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData.ts';
import { soundEffects } from '../utils/audio.ts';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    soundEffects.click();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative border-t border-purple-500/20 bg-[#050508] py-12 px-4 sm:px-6 overflow-hidden">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Left Branding */}
        <div className="flex flex-col items-center md:items-start text-center md:text-left">
          <div className="flex items-center gap-2">
            <span className="font-heading font-extrabold text-lg text-white tracking-wider">
              JYOTIPRAKASH KUNDU
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
            <span className="font-mono text-xs text-purple-400">2026</span>
          </div>
          <p className="text-xs text-slate-400 font-mono mt-1">
            Python Full Stack Developer | Frontend Developer | Creative 3D Web
          </p>
          <p className="text-[11px] text-slate-500 font-mono mt-0.5 flex items-center gap-1">
            <MapPin className="w-3 h-3 text-cyan-400" /> GIFT Autonomous, Bhubaneswar, Odisha, India
          </p>
        </div>

        {/* Center Tech Stack Credential */}
        <div className="text-center font-mono text-[11px] text-slate-500 space-y-1">
          <p className="text-slate-400">
            Engineered with React 19 • TypeScript • Three.js PBR • Tailwind CSS
          </p>
          <p className="text-purple-400/80">
            Multimodal Studio powered by Gemini Interactions API
          </p>
        </div>

        {/* Right Socials & Back to Top */}
        <div className="flex items-center gap-3">
          <a
            href={PERSONAL_INFO.github}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-white hover:border-purple-500/40 transition-colors"
            title="GitHub"
          >
            <Github className="w-4 h-4" />
          </a>
          <a
            href={PERSONAL_INFO.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-white hover:border-purple-500/40 transition-colors"
            title="LinkedIn"
          >
            <Linkedin className="w-4 h-4" />
          </a>
          <a
            href={`mailto:${PERSONAL_INFO.email}`}
            className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-white hover:border-purple-500/40 transition-colors"
            title="Email"
          >
            <Mail className="w-4 h-4" />
          </a>

          <button
            onClick={scrollToTop}
            className="p-2.5 rounded-xl bg-purple-600/20 border border-purple-500/40 text-purple-300 hover:bg-purple-600 hover:text-white transition-colors cursor-pointer"
            title="Return to top"
          >
            <ArrowUp className="w-4 h-4" />
          </button>
        </div>
      </div>
    </footer>
  );
};
