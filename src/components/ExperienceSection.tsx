import React from 'react';
import { Briefcase, Calendar, MapPin, CheckCircle2, ArrowRight, Terminal } from 'lucide-react';
import { EXPERIENCES } from '../data/portfolioData.ts';
import { soundEffects } from '../utils/audio.ts';

export const ExperienceSection: React.FC = () => {
  return (
    <section id="experience" className="py-24 px-4 sm:px-6 max-w-7xl mx-auto relative">
      {/* Background Glow */}
      <div className="absolute top-1/3 left-1/4 w-[450px] h-[350px] bg-cyan-600/10 rounded-full blur-[140px] pointer-events-none" />

      {/* Header */}
      <div className="gsap-section-header text-center max-w-3xl mx-auto mb-16">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/60 border border-cyan-500/40 text-cyan-300 font-mono text-xs uppercase tracking-wider mb-4">
          <Briefcase className="w-3.5 h-3.5 text-purple-400" />
          <span>Career Progression</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-heading font-extrabold text-white tracking-tight">
          Professional <span className="bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">Experience</span>
        </h2>
        <p className="text-slate-400 text-sm sm:text-base mt-3 leading-relaxed">
          Real-world industry internships mastering Python full-stack engineering, responsive web systems, and fundamental programming algorithms.
        </p>
      </div>

      {/* Timeline Container */}
      <div className="relative border-l-2 border-purple-500/30 ml-4 sm:ml-32 md:ml-48 space-y-12">
        {EXPERIENCES.map((exp, idx) => (
          <div
            key={idx}
            className="relative pl-6 sm:pl-10 group"
            onMouseEnter={() => soundEffects.hover()}
          >
            {/* Glowing Timeline Node */}
            <div
              className="absolute -left-[9px] top-1.5 w-4 h-4 rounded-full border-2 bg-[#050505] transition-transform duration-300 group-hover:scale-125"
              style={{
                borderColor: exp.accentColor,
                boxShadow: `0 0 12px ${exp.accentColor}`,
              }}
            />

            {/* Floating Date Badge on the Left (Desktop) */}
            <div className="hidden sm:block absolute -left-36 md:-left-52 top-0 text-right pr-6 w-32 md:w-44">
              <span className="font-mono text-xs font-semibold text-purple-300 block">
                {exp.period}
              </span>
              <span className="font-mono text-[10px] text-slate-500 block mt-0.5">
                {exp.duration}
              </span>
            </div>

            {/* Experience Card */}
            <div className="bg-[#090913] border border-purple-500/20 hover:border-purple-500/60 p-6 sm:p-8 rounded-3xl transition-all duration-300 hover:-translate-y-1 shadow-xl hover:shadow-[0_15px_30px_-10px_rgba(147,51,234,0.25)] space-y-4">
              {/* Card Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800/80 pb-4">
                <div>
                  <span className="font-mono text-xs text-cyan-400 block sm:hidden mb-1">
                    {exp.period} • {exp.duration}
                  </span>
                  <h3 className="font-heading font-extrabold text-xl sm:text-2xl text-white group-hover:text-purple-300 transition-colors">
                    {exp.role}
                  </h3>
                  <div className="flex flex-wrap items-center gap-2 mt-1">
                    <span className="font-mono font-semibold text-sm text-purple-400">
                      {exp.company}
                    </span>
                    <span className="text-slate-600">•</span>
                    <span className="font-mono text-xs text-slate-400 flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-cyan-400" /> {exp.location}
                    </span>
                  </div>
                </div>

                <span
                  className="px-3 py-1 rounded-full text-xs font-mono font-bold uppercase tracking-wider self-start sm:self-auto border"
                  style={{
                    backgroundColor: `${exp.accentColor}20`,
                    borderColor: `${exp.accentColor}50`,
                    color: exp.accentColor,
                  }}
                >
                  {exp.type}
                </span>
              </div>

              {/* Achievements & Responsibilities */}
              <ul className="space-y-2.5 pt-1">
                {exp.highlights.map((h, hIdx) => (
                  <li key={hIdx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-300 leading-relaxed">
                    <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                    <span>{h}</span>
                  </li>
                ))}
              </ul>

              {/* Technologies Applied */}
              <div className="pt-3 border-t border-slate-800/80 flex flex-wrap items-center gap-1.5">
                <span className="font-mono text-[11px] text-slate-500 mr-1 flex items-center gap-1">
                  <Terminal className="w-3 h-3 text-purple-400" /> Stack:
                </span>
                {exp.technologies.map((t, tIdx) => (
                  <span
                    key={tIdx}
                    className="px-2.5 py-0.5 rounded-lg text-[11px] font-mono bg-slate-900 text-slate-300 border border-slate-800"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
