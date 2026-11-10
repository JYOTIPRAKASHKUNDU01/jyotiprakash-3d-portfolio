import React from 'react';
import { User, MapPin, GraduationCap, Briefcase, Award, Sparkles, Terminal, Code2, ArrowUpRight, CheckCircle2 } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData.ts';
import { InteractiveTerminal } from './InteractiveTerminal.tsx';
import { soundEffects } from '../utils/audio.ts';

export const AboutSection: React.FC = () => {
  return (
    <section id="about" className="py-24 px-4 sm:px-6 max-w-7xl mx-auto relative">
      {/* Background Glow */}
      <div className="absolute top-1/3 right-10 w-[400px] h-[400px] bg-purple-600/10 rounded-full blur-[130px] pointer-events-none" />

      {/* Section Header */}
      <div className="gsap-section-header text-center max-w-3xl mx-auto mb-16">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-950/60 border border-purple-500/40 text-purple-300 font-mono text-xs uppercase tracking-wider mb-4">
          <User className="w-3.5 h-3.5 text-cyan-400" />
          <span>Professional Identity</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-heading font-extrabold text-white tracking-tight">
          About <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent">Jyotiprakash Kundu</span>
        </h2>
        <p className="text-slate-400 text-sm sm:text-base mt-3 leading-relaxed">
          Crafting scalable web architectures, responsive frontends, and cinematic 3D digital experiences.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Left Column: Holographic Photo & Key Attributes */}
        <div className="lg:col-span-5 flex flex-col items-center">
          <div className="relative group w-full max-w-md">
            {/* Glowing Backdrop Border */}
            <div className="absolute -inset-1.5 bg-gradient-to-r from-purple-600 via-cyan-500 to-pink-600 rounded-3xl blur-md opacity-70 group-hover:opacity-100 transition duration-500" />

            <div className="relative bg-[#090913] rounded-3xl overflow-hidden border border-purple-500/40 shadow-2xl">
              {/* Top Tech Status Strip */}
              <div className="px-4 py-2.5 bg-[#05050c] border-b border-purple-500/20 flex items-center justify-between text-[11px] font-mono">
                <span className="text-cyan-400 flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-cyan-400 inline-block shadow-[0_0_6px_#06b6d4]" />
                  ID // JK-2026-BHU
                </span>
                <span className="text-purple-300 bg-purple-950/50 px-2 py-0.5 rounded border border-purple-800/40">
                  GIFT Autonomous
                </span>
              </div>

              {/* Real Uploaded Photo of Jyotiprakash Kundu */}
              <div className="relative h-[420px] sm:h-[460px] overflow-hidden bg-slate-900">
                <img
                  src={PERSONAL_INFO.photoUrl}
                  alt="Jyotiprakash Kundu - Python Full Stack Developer"
                  className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                  onError={(e) => {
                    // Fallback to high-res stylized developer avatar if local image not found
                    (e.target as HTMLImageElement).src =
                      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=800&auto=format&fit=crop';
                  }}
                />
                {/* Cyber Scanline effect */}
                <div className="absolute inset-0 scanline opacity-30 pointer-events-none" />

                {/* Gradient Vignette */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#090913] via-transparent to-transparent opacity-90" />

                {/* Floating Info Overlay */}
                <div className="absolute bottom-4 left-4 right-4 p-4 rounded-2xl bg-[#090913]/90 border border-purple-500/30 backdrop-blur-md">
                  <h3 className="font-heading font-bold text-lg text-white">{PERSONAL_INFO.name}</h3>
                  <p className="text-xs font-mono text-purple-400 mt-0.5">Python Full Stack & Creative Developer</p>
                  <p className="text-[11px] text-slate-300 flex items-center gap-1.5 mt-2">
                    <MapPin className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                    <span>{PERSONAL_INFO.location}</span>
                  </p>
                </div>
              </div>

              {/* Bottom Quick Facts */}
              <div className="p-4 bg-[#07070f] border-t border-purple-500/20 grid grid-cols-2 gap-3 text-xs font-mono">
                <div className="p-2.5 rounded-xl bg-slate-900/60 border border-slate-800">
                  <span className="text-slate-400 block text-[10px]">CURRENT ROLE</span>
                  <span className="text-white font-semibold">Python Intern @ THYO TECH</span>
                </div>
                <div className="p-2.5 rounded-xl bg-slate-900/60 border border-slate-800">
                  <span className="text-slate-400 block text-[10px]">ACADEMICS</span>
                  <span className="text-white font-semibold">B.Tech CSE @ GIFT</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Bio Narrative, 4 Key Stat Cards, and Interactive Terminal */}
        <div className="lg:col-span-7 space-y-6">
          <div className="space-y-4">
            <h3 className="text-2xl sm:text-3xl font-heading font-bold text-white">
              Bridging Backend Architecture with Intuitive Frontend Experiences
            </h3>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              I am pursuing my <strong>B.Tech in Computer Science Engineering at GIFT Autonomous, Bhubaneswar</strong>. Currently serving as a <strong>Python Full Stack Development Intern at THYO TECH PVT. LTD.</strong>, I build production-grade web systems focusing on clean REST APIs, resilient databases, and modern interactive user interfaces.
            </p>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              My engineering philosophy revolves around solving practical real-world problems through performant code. Whether constructing complex SQL database integrations in Flask, orchestrating dynamic React/Next.js client experiences, or implementing 3D procedural scenes using Three.js, I continuously strive for technical excellence.
            </p>
          </div>

          {/* 4 Stat Metric Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 py-2">
            {[
              { label: 'Internships', value: '3+', sub: 'Hands-on industry' },
              { label: 'Projects', value: '10+', sub: 'Full stack & web' },
              { label: 'Technologies', value: '15+', sub: 'Tools & frameworks' },
              { label: 'CSE Degree', value: 'B.Tech', sub: 'GIFT Autonomous' },
            ].map((stat, idx) => (
              <div
                key={idx}
                className="bg-[#0b0b16] border border-purple-500/20 hover:border-purple-500/50 p-4 rounded-2xl transition-all hover:-translate-y-1"
              >
                <span className="font-heading font-extrabold text-2xl sm:text-3xl bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent block">
                  {stat.value}
                </span>
                <span className="text-xs font-semibold text-white block mt-1">{stat.label}</span>
                <span className="text-[10px] text-slate-400 font-mono block mt-0.5">{stat.sub}</span>
              </div>
            ))}
          </div>

          {/* Interactive Live Terminal Component */}
          <div className="pt-2">
            <div className="flex items-center justify-between mb-2">
              <span className="font-mono text-xs uppercase tracking-wider text-purple-400 flex items-center gap-1.5 font-bold">
                <Terminal className="w-4 h-4 text-cyan-400" /> Interactive Developer Shell
              </span>
              <span className="text-[11px] font-mono text-slate-400">Try: skills, experience, whoami</span>
            </div>
            <InteractiveTerminal />
          </div>
        </div>
      </div>
    </section>
  );
};
