import React from 'react';
import { ArrowDown, Code2, Download, Send, Sparkles, MapPin, Terminal, ExternalLink, ChevronDown } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData.ts';
import { ThreeHeroScene } from './ThreeHeroScene.tsx';
import { soundEffects } from '../utils/audio.ts';

interface HeroSectionProps {
  onOpenResume: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onOpenResume }) => {
  const scrollTo = (id: string) => {
    soundEffects.click();
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center pt-24 pb-16 overflow-hidden">
      {/* Background Animated Gradient Blobs */}
      <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-purple-600/15 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 translate-x-1/3 translate-y-1/3 w-[450px] h-[450px] bg-cyan-500/10 rounded-full blur-[130px] pointer-events-none" />

      {/* Cyber Grid background */}
      <div className="absolute inset-0 cyber-grid opacity-60 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
        {/* Left Column: Cinematic Typography & CTAs */}
        <div className="lg:col-span-7 space-y-6 text-center lg:text-left pt-6 lg:pt-0">
          {/* Status Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#0d0d18] border border-purple-500/40 text-purple-300 font-mono text-xs shadow-lg shadow-purple-950/40 backdrop-blur-md">
            <span className="w-2 h-2 rounded-full bg-emerald-400 inline-block shadow-[0_0_8px_#34d399]" />
            <span className="text-slate-300">Available for Opportunities</span>
            <span className="text-slate-600">|</span>
            <span className="text-cyan-400 flex items-center gap-1">
              <MapPin className="w-3 h-3" /> Bhubaneswar, India
            </span>
          </div>

          {/* Main Hero Header */}
          <div className="space-y-3 gsap-hero-header">
            <h2 className="font-mono text-xs sm:text-sm tracking-widest uppercase text-cyan-400 font-semibold flex items-center justify-center lg:justify-start gap-2">
              <span className="text-purple-400">01 //</span> HEY, I'M JYOTIPRAKASH KUNDU
            </h2>
            <h1 className="text-4xl sm:text-6xl xl:text-7xl font-heading font-extrabold text-white tracking-tight leading-[1.1]">
              Building Digital <br />
              <span className="bg-gradient-to-r from-purple-400 via-pink-500 to-cyan-400 bg-clip-text text-transparent glow-purple">
                Experiences Through Code
              </span> <br />
              <span className="text-slate-200">& Creativity.</span>
            </h1>
          </div>

          {/* Supporting Bio */}
          <p className="text-slate-300 text-sm sm:text-base max-w-xl mx-auto lg:mx-0 leading-relaxed font-normal">
            I'm a Computer Science Engineering student and aspiring{' '}
            <strong className="text-purple-300 font-semibold">Python Full Stack Developer</strong> passionate about creating modern, scalable, and interactive web applications.
          </p>

          {/* Quick Tags */}
          <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2 pt-1 font-mono text-xs">
            <span className="px-2.5 py-1 rounded-lg bg-slate-900/80 border border-slate-800 text-purple-300">
              Python & Flask
            </span>
            <span className="px-2.5 py-1 rounded-lg bg-slate-900/80 border border-slate-800 text-cyan-300">
              React & Next.js
            </span>
            <span className="px-2.5 py-1 rounded-lg bg-slate-900/80 border border-slate-800 text-pink-300">
              Three.js 3D
            </span>
            <span className="px-2.5 py-1 rounded-lg bg-slate-900/80 border border-slate-800 text-emerald-300">
              SQL & Supabase
            </span>
          </div>

          {/* Hero CTAs */}
          <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3.5 pt-4">
            {/* Explore My Work */}
            <button
              onClick={() => scrollTo('projects')}
              className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-purple-600 via-indigo-600 to-purple-700 hover:from-purple-500 hover:to-indigo-500 text-white font-mono text-xs uppercase tracking-wider font-bold transition-all shadow-[0_0_25px_rgba(147,51,234,0.4)] active:scale-95 flex items-center gap-2 cursor-pointer"
            >
              <Code2 className="w-4 h-4 text-cyan-300" />
              <span>Explore My Work</span>
            </button>

            {/* Download Resume */}
            <button
              onClick={() => {
                soundEffects.click();
                onOpenResume();
              }}
              className="px-6 py-3.5 rounded-xl bg-[#0e0e18] hover:bg-[#151525] border border-purple-500/40 hover:border-purple-400 text-purple-200 font-mono text-xs uppercase tracking-wider font-semibold transition-all shadow-lg active:scale-95 flex items-center gap-2 cursor-pointer"
            >
              <Download className="w-4 h-4 text-purple-400" />
              <span>Download Resume</span>
            </button>

            {/* Let's Connect */}
            <button
              onClick={() => scrollTo('contact')}
              className="px-5 py-3.5 rounded-xl bg-transparent hover:bg-slate-900/60 border border-slate-700 hover:border-slate-500 text-slate-300 hover:text-white font-mono text-xs uppercase tracking-wider font-semibold transition-all flex items-center gap-2 cursor-pointer"
            >
              <Send className="w-4 h-4 text-cyan-400" />
              <span>Let's Connect</span>
            </button>
          </div>
        </div>

        {/* Right Column: 3D Procedural Cybernetic Canvas */}
        <div className="lg:col-span-5 h-[460px] sm:h-[540px] xl:h-[600px] w-full relative flex items-center justify-center">
          <ThreeHeroScene interactive={true} />
        </div>
      </div>

      {/* Animated Scroll Down Indicator */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-1 opacity-70 hover:opacity-100 transition-opacity">
        <button
          onClick={() => scrollTo('about')}
          className="flex flex-col items-center text-slate-400 hover:text-purple-300 font-mono text-[10px] uppercase tracking-widest transition-colors cursor-pointer"
        >
          <span>Scroll to explore</span>
          <ChevronDown className="w-4 h-4 animate-bounce text-cyan-400 mt-1" />
        </button>
      </div>
    </section>
  );
};
