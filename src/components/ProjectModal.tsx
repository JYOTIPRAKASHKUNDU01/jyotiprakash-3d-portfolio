import React, { useState } from 'react';
import { X, ExternalLink, Github, CheckCircle2, Layers, Cpu, Sparkles, Terminal, ArrowRight } from 'lucide-react';
import { Project } from '../types.ts';
import { soundEffects } from '../utils/audio.ts';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'architecture' | 'simulator'>('overview');

  if (!project) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-3xl max-h-[92vh] bg-[#0c0c16] border border-purple-500/30 rounded-2xl shadow-2xl flex flex-col overflow-hidden text-slate-200">
        {/* Header Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-purple-500/20 bg-[#080810]">
          <div className="flex items-center gap-3">
            <span
              className="px-2.5 py-0.5 rounded-full text-[10px] font-mono uppercase tracking-wider font-semibold border"
              style={{
                borderColor: `${project.accentColor}60`,
                backgroundColor: `${project.accentColor}20`,
                color: project.accentColor,
              }}
            >
              {project.category}
            </span>
            <h3 className="font-heading font-bold text-lg text-white truncate">{project.title}</h3>
          </div>
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

        {/* Tab Navigation */}
        <div className="flex border-b border-slate-800 bg-[#090912] px-6">
          {(['overview', 'architecture', 'simulator'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => {
                soundEffects.hover();
                setActiveTab(tab);
              }}
              className={`py-3 px-4 font-mono text-xs uppercase tracking-wider border-b-2 transition-all capitalize ${
                activeTab === tab
                  ? 'border-purple-500 text-purple-300 font-semibold'
                  : 'border-transparent text-slate-400 hover:text-slate-200'
              }`}
            >
              {tab === 'simulator' ? 'Interactive Preview' : tab}
            </button>
          ))}
        </div>

        {/* Modal Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-[#090912]">
          {activeTab === 'overview' && (
            <div className="space-y-6">
              {/* Image banner with overlay */}
              <div className="relative h-56 rounded-xl overflow-hidden border border-slate-800 group">
                <img src={project.image} alt={project.title} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0c0c16] via-transparent to-transparent" />
                <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between">
                  <p className="font-mono text-xs text-cyan-300 bg-black/60 px-3 py-1 rounded-md backdrop-blur-sm border border-cyan-500/30">
                    {project.tagline}
                  </p>
                </div>
              </div>

              {/* Long Description */}
              <div>
                <h4 className="text-xs font-mono font-bold tracking-wider text-purple-400 uppercase mb-2">Project Brief</h4>
                <p className="text-slate-300 text-sm leading-relaxed">{project.longDescription}</p>
              </div>

              {/* Features List */}
              <div>
                <h4 className="text-xs font-mono font-bold tracking-wider text-purple-400 uppercase mb-3">Key Engineering Features</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {project.features.map((feat, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-xs text-slate-300 bg-[#0f0f1c] p-2.5 rounded-lg border border-slate-800">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Tech Stack */}
              <div>
                <h4 className="text-xs font-mono font-bold tracking-wider text-purple-400 uppercase mb-2">Technologies Used</h4>
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((t, idx) => (
                    <span key={idx} className="px-2.5 py-1 rounded-lg text-xs font-mono bg-purple-950/40 text-purple-300 border border-purple-800/40">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'architecture' && (
            <div className="space-y-6">
              <div className="bg-[#0f0f1c] p-4 rounded-xl border border-purple-500/20 font-mono text-xs text-slate-300 space-y-3">
                <div className="flex items-center gap-2 text-purple-400 font-bold">
                  <Terminal className="w-4 h-4" /> System Topology
                </div>
                <div className="space-y-2 border-l-2 border-purple-500/40 pl-3">
                  <p><strong className="text-cyan-300">[Frontend Layer]:</strong> Next.js / React Client with responsive state management, Framer Motion transitions, and Tailwind CSS utility styling.</p>
                  <p><strong className="text-purple-300">[API & Integration]:</strong> REST API endpoints with request debounce, caching, and serialization pipelines.</p>
                  <p><strong className="text-emerald-300">[Data & Persistence]:</strong> PostgreSQL / Supabase storage with relational indexes and secured table policies.</p>
                  <p><strong className="text-rose-300">[Performance]:</strong> Lazy-loaded assets, optimized component re-renders, and responsive layouts.</p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="bg-[#0f0f1c] p-4 rounded-xl border border-slate-800">
                  <h5 className="font-heading font-semibold text-white text-sm flex items-center gap-2 mb-2">
                    <Layers className="w-4 h-4 text-cyan-400" /> Modular Components
                  </h5>
                  <p className="text-xs text-slate-400">
                    Engineered with atomic components, custom React hooks for state isolation, and zero unnecessary re-renders.
                  </p>
                </div>
                <div className="bg-[#0f0f1c] p-4 rounded-xl border border-slate-800">
                  <h5 className="font-heading font-semibold text-white text-sm flex items-center gap-2 mb-2">
                    <Cpu className="w-4 h-4 text-rose-400" /> Error Resilience
                  </h5>
                  <p className="text-xs text-slate-400">
                    Defensive input validation, graceful fallbacks for third-party API quotas, and persistent client-side state.
                  </p>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'simulator' && (
            <div className="space-y-4">
              <div className="bg-[#06060c] border border-cyan-500/30 rounded-xl p-4 text-center space-y-3">
                <div className="w-12 h-12 rounded-xl bg-cyan-500/10 border border-cyan-500/40 flex items-center justify-center mx-auto text-cyan-400">
                  <Sparkles className="w-6 h-6" />
                </div>
                <h4 className="font-heading font-bold text-white text-base">Live Interactive Showcase</h4>
                <p className="text-xs text-slate-400 max-w-md mx-auto">
                  Experience this project in action. You can inspect the source code on GitHub or view demo walkthroughs.
                </p>
                <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-mono text-xs transition-colors shadow-lg shadow-purple-600/30"
                  >
                    <Github className="w-4 h-4" />
                    <span>View Repository on GitHub</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-3.5 border-t border-purple-500/20 bg-[#080810] flex items-center justify-between">
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-xs font-mono text-purple-400 hover:text-white transition-colors"
          >
            <Github className="w-4 h-4" />
            <span>Source Code (GitHub)</span>
          </a>
          <button
            onClick={() => {
              soundEffects.click();
              onClose();
            }}
            className="px-4 py-1.5 rounded-lg bg-slate-800 text-slate-300 hover:text-white hover:bg-slate-700 text-xs font-mono transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
