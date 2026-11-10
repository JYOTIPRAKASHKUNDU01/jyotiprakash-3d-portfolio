import React, { useRef } from 'react';
import { X, Download, Printer, MapPin, Mail, Linkedin, Github, ExternalLink, Award, Briefcase, GraduationCap, Code2, Terminal } from 'lucide-react';
import { PERSONAL_INFO, EXPERIENCES, EDUCATION, PROJECTS, CERTIFICATIONS } from '../data/portfolioData.ts';
import { soundEffects } from '../utils/audio.ts';

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ResumeModal: React.FC<ResumeModalProps> = ({ isOpen, onClose }) => {
  const resumePrintRef = useRef<HTMLDivElement>(null);

  if (!isOpen) return null;

  const handlePrint = () => {
    soundEffects.click();
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-4xl max-h-[92vh] bg-[#0c0c14] border border-purple-500/30 rounded-2xl shadow-2xl flex flex-col overflow-hidden text-slate-200">
        {/* Header Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-purple-500/20 bg-[#07070d]">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-purple-600/20 border border-purple-500/40 flex items-center justify-center text-purple-400">
              <Code2 className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-heading font-bold text-lg text-white">Curriculum Vitae</h3>
              <p className="text-xs font-mono text-purple-400">{PERSONAL_INFO.name} — Full Stack & Creative Developer</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-purple-600/20 border border-purple-500/40 text-purple-300 hover:bg-purple-600 hover:text-white transition-all text-xs font-mono"
            >
              <Download className="w-4 h-4" />
              <span>Download / Print PDF</span>
            </button>
            <button
              onClick={() => {
                soundEffects.click();
                onClose();
              }}
              className="p-1.5 rounded-lg bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Scrollable Printable Document Body */}
        <div ref={resumePrintRef} className="flex-1 overflow-y-auto p-6 sm:p-8 space-y-6 text-sm bg-[#090910]">
          {/* Top Banner / Name */}
          <div className="border-b border-slate-800 pb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl font-heading font-bold text-white tracking-wide">{PERSONAL_INFO.name}</h1>
              <p className="text-purple-400 font-mono text-sm mt-1">{PERSONAL_INFO.title}</p>
              <p className="text-xs text-slate-400 flex items-center gap-1.5 mt-2">
                <MapPin className="w-3.5 h-3.5 text-cyan-400" /> {PERSONAL_INFO.location}
              </p>
            </div>

            <div className="flex flex-col gap-1.5 font-mono text-xs text-slate-300">
              <a href={`mailto:${PERSONAL_INFO.email}`} className="flex items-center gap-2 hover:text-cyan-400 transition-colors">
                <Mail className="w-3.5 h-3.5 text-purple-400" /> {PERSONAL_INFO.email}
              </a>
              <a href={PERSONAL_INFO.linkedin} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-cyan-400 transition-colors">
                <Linkedin className="w-3.5 h-3.5 text-blue-400" /> LinkedIn Profile
              </a>
              <a href={PERSONAL_INFO.github} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-cyan-400 transition-colors">
                <Github className="w-3.5 h-3.5 text-slate-300" /> GitHub: jyotiprakashkundu
              </a>
            </div>
          </div>

          {/* Professional Summary */}
          <div>
            <h2 className="text-xs font-mono font-bold tracking-wider text-cyan-400 uppercase mb-2 flex items-center gap-2">
              <Terminal className="w-4 h-4" /> Professional Summary
            </h2>
            <p className="text-slate-300 text-xs sm:text-sm leading-relaxed bg-[#0d0d17] p-3.5 rounded-xl border border-slate-800">
              {PERSONAL_INFO.bio}
            </p>
          </div>

          {/* Education */}
          <div>
            <h2 className="text-xs font-mono font-bold tracking-wider text-cyan-400 uppercase mb-3 flex items-center gap-2">
              <GraduationCap className="w-4 h-4" /> Education
            </h2>
            <div className="space-y-3">
              {EDUCATION.map((edu, idx) => (
                <div key={idx} className="bg-[#0d0d17] p-4 rounded-xl border border-slate-800/80">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                    <h3 className="font-semibold text-white text-sm">{edu.degree}</h3>
                    <span className="font-mono text-xs text-purple-400 bg-purple-950/40 px-2 py-0.5 rounded border border-purple-800/50">
                      {edu.scoreOrStatus}
                    </span>
                  </div>
                  <p className="text-xs text-cyan-300 mt-0.5">{edu.institution} — {edu.location}</p>
                  <p className="text-[11px] text-slate-400 font-mono mt-0.5">{edu.boardOrUniversity} • {edu.period}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Experience */}
          <div>
            <h2 className="text-xs font-mono font-bold tracking-wider text-cyan-400 uppercase mb-3 flex items-center gap-2">
              <Briefcase className="w-4 h-4" /> Internship Experience
            </h2>
            <div className="space-y-3">
              {EXPERIENCES.map((exp, idx) => (
                <div key={idx} className="bg-[#0d0d17] p-4 rounded-xl border border-slate-800/80">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                    <div>
                      <h3 className="font-semibold text-white text-sm">{exp.role}</h3>
                      <p className="text-xs text-purple-400 font-mono">{exp.company} • {exp.location}</p>
                    </div>
                    <span className="text-[11px] font-mono text-slate-400">{exp.period}</span>
                  </div>
                  <ul className="mt-2.5 space-y-1">
                    {exp.highlights.map((h, hIdx) => (
                      <li key={hIdx} className="text-xs text-slate-300 flex items-start gap-2">
                        <span className="text-purple-400 mt-1">▸</span>
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-2.5 flex flex-wrap gap-1.5">
                    {exp.technologies.map((t, tIdx) => (
                      <span key={tIdx} className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800/80 text-slate-300">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Projects */}
          <div>
            <h2 className="text-xs font-mono font-bold tracking-wider text-cyan-400 uppercase mb-3 flex items-center gap-2">
              <Code2 className="w-4 h-4" /> Key Projects
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {PROJECTS.map((proj) => (
                <div key={proj.id} className="bg-[#0d0d17] p-3.5 rounded-xl border border-slate-800">
                  <h3 className="font-semibold text-white text-xs">{proj.title}</h3>
                  <p className="text-[11px] text-slate-300 mt-1 line-clamp-2">{proj.description}</p>
                  <div className="mt-2 flex flex-wrap gap-1">
                    {proj.technologies.slice(0, 4).map((tech, tIdx) => (
                      <span key={tIdx} className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-purple-950/50 text-purple-300 border border-purple-800/40">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Certifications */}
          <div>
            <h2 className="text-xs font-mono font-bold tracking-wider text-cyan-400 uppercase mb-3 flex items-center gap-2">
              <Award className="w-4 h-4" /> Certifications & Achievements
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {CERTIFICATIONS.map((cert, idx) => (
                <div key={idx} className="bg-[#0d0d17] p-3.5 rounded-xl border border-slate-800">
                  <h3 className="font-semibold text-white text-xs">{cert.title}</h3>
                  <p className="text-[11px] text-purple-400 font-mono mt-0.5">{cert.issuer}</p>
                  <p className="text-[11px] text-slate-400 mt-1">{cert.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-3 border-t border-purple-500/20 bg-[#07070d] flex items-center justify-between text-xs font-mono text-slate-400">
          <span>Verified Academic & Experience Record</span>
          <button
            onClick={() => {
              soundEffects.click();
              onClose();
            }}
            className="text-purple-400 hover:text-white"
          >
            Close Viewer
          </button>
        </div>
      </div>
    </div>
  );
};
