import React from 'react';
import { GraduationCap, Award, Calendar, MapPin, CheckCircle2, Bookmark, ExternalLink } from 'lucide-react';
import { EDUCATION, CERTIFICATIONS } from '../data/portfolioData.ts';
import { soundEffects } from '../utils/audio.ts';

export const EducationSection: React.FC = () => {
  return (
    <section id="education" className="py-24 px-4 sm:px-6 max-w-7xl mx-auto relative">
      {/* Background glow */}
      <div className="absolute top-1/2 right-1/4 w-[450px] h-[350px] bg-purple-600/10 rounded-full blur-[140px] pointer-events-none" />

      {/* Header */}
      <div className="gsap-section-header text-center max-w-3xl mx-auto mb-16">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-950/60 border border-purple-500/40 text-purple-300 font-mono text-xs uppercase tracking-wider mb-4">
          <GraduationCap className="w-3.5 h-3.5 text-cyan-400" />
          <span>Academic Pedigree</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-heading font-extrabold text-white tracking-tight">
          Education & <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent">Certifications</span>
        </h2>
        <p className="text-slate-400 text-sm sm:text-base mt-3 leading-relaxed">
          Strong formal foundations in Computer Science Engineering, Higher Secondary Science, and nationally recognized NPTEL certifications.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Left Column: Academic Degrees */}
        <div className="lg:col-span-7 space-y-6">
          <div className="flex items-center gap-2 mb-4">
            <GraduationCap className="w-5 h-5 text-cyan-400" />
            <h3 className="font-heading font-bold text-xl text-white">Academic Journey</h3>
          </div>

          <div className="space-y-4">
            {EDUCATION.map((item, idx) => (
              <div
                key={idx}
                onMouseEnter={() => soundEffects.hover()}
                className="bg-[#090913] border border-purple-500/20 hover:border-purple-500/50 p-6 rounded-3xl transition-all duration-300 hover:-translate-y-1 shadow-lg space-y-3"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800/80 pb-3">
                  <div>
                    <span className="font-mono text-xs text-purple-400 font-semibold">{item.boardOrUniversity}</span>
                    <h4 className="font-heading font-bold text-lg text-white mt-0.5">{item.degree}</h4>
                    <p className="text-xs text-cyan-300 font-mono flex items-center gap-1.5 mt-1">
                      <MapPin className="w-3.5 h-3.5 text-slate-400" /> {item.institution} — {item.location}
                    </p>
                  </div>

                  <div className="sm:text-right">
                    <span className="inline-block px-3 py-1 rounded-full text-xs font-mono font-bold bg-purple-950/60 border border-purple-500/40 text-purple-300 shadow-[0_0_10px_rgba(168,85,247,0.2)]">
                      {item.scoreOrStatus}
                    </span>
                    <span className="block font-mono text-[10px] text-slate-400 mt-1">{item.period}</span>
                  </div>
                </div>

                <ul className="space-y-1.5 pt-1">
                  {item.highlights.map((h, hIdx) => (
                    <li key={hIdx} className="text-xs text-slate-300 flex items-start gap-2 leading-relaxed">
                      <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0 mt-0.5" />
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Certifications & Verified Badges */}
        <div className="lg:col-span-5 space-y-6">
          <div className="flex items-center gap-2 mb-4">
            <Award className="w-5 h-5 text-purple-400" />
            <h3 className="font-heading font-bold text-xl text-white">Certifications & Credentials</h3>
          </div>

          <div className="space-y-4">
            {CERTIFICATIONS.map((cert, idx) => (
              <div
                key={idx}
                onMouseEnter={() => soundEffects.hover()}
                className="bg-[#090913] border border-cyan-500/20 hover:border-cyan-500/50 p-6 rounded-3xl transition-all duration-300 hover:-translate-y-1 shadow-lg space-y-3 relative overflow-hidden group"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="w-10 h-10 rounded-xl bg-cyan-950/40 border border-cyan-500/30 flex items-center justify-center text-cyan-300 shrink-0">
                    <Award className="w-5 h-5" />
                  </div>
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono uppercase tracking-wider bg-cyan-950/50 border border-cyan-500/40 text-cyan-300">
                    {cert.badge}
                  </span>
                </div>

                <div>
                  <h4 className="font-heading font-bold text-base text-white group-hover:text-cyan-300 transition-colors">
                    {cert.title}
                  </h4>
                  <p className="text-xs font-mono text-purple-400 mt-1">{cert.issuer}</p>
                  <p className="text-xs text-slate-300 mt-2 leading-relaxed">{cert.description}</p>
                </div>

                <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between text-[11px] font-mono text-slate-400">
                  <span className="text-emerald-400 flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" /> Verified Completion
                  </span>
                  <span className="text-purple-400">NPTEL IIT</span>
                </div>
              </div>
            ))}

            {/* Quick Recognition Highlights */}
            <div className="bg-gradient-to-br from-purple-950/30 to-slate-900/40 border border-purple-500/30 p-6 rounded-3xl space-y-3">
              <span className="text-xs font-mono uppercase tracking-wider text-cyan-400 font-bold block">
                Engineering Commitment
              </span>
              <p className="text-xs text-slate-300 leading-relaxed">
                Dedicated to continuous professional growth, actively engaging in full-stack architecture design, open-source code contributions, algorithmic problem-solving, and modern 3D creative design workflows.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
