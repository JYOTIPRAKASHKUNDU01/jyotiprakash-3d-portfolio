import React from 'react';
import { ExternalLink, Github, Code2, Sparkles, CheckCircle2, ArrowRight, Layers } from 'lucide-react';
import { PROJECTS } from '../data/portfolioData.ts';
import { Project } from '../types.ts';
import { soundEffects } from '../utils/audio.ts';

interface ProjectsSectionProps {
  onSelectProject: (project: Project) => void;
}

export const ProjectsSection: React.FC<ProjectsSectionProps> = ({ onSelectProject }) => {
  return (
    <section id="projects" className="py-24 px-4 sm:px-6 max-w-7xl mx-auto relative">
      {/* Background glow */}
      <div className="absolute top-1/4 right-0 w-[550px] h-[350px] bg-purple-600/10 rounded-full blur-[140px] pointer-events-none" />

      {/* Section Header */}
      <div className="gsap-section-header text-center max-w-3xl mx-auto mb-16">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-950/60 border border-purple-500/40 text-purple-300 font-mono text-xs uppercase tracking-wider mb-4">
          <Layers className="w-3.5 h-3.5 text-cyan-400" />
          <span>Engineered Deployments</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-heading font-extrabold text-white tracking-tight">
          Featured <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent">Projects</span>
        </h2>
        <p className="text-slate-400 text-sm sm:text-base mt-3 leading-relaxed">
          Showcasing production-ready full-stack systems, 3D interactive web applications, translation portals, and e-commerce platforms.
        </p>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {PROJECTS.map((project, idx) => (
          <div
            key={project.id}
            className="group relative bg-[#090913] border border-purple-500/20 hover:border-purple-500/60 rounded-3xl overflow-hidden transition-all duration-500 hover:-translate-y-2 shadow-xl hover:shadow-[0_20px_40px_-15px_rgba(147,51,234,0.3)] flex flex-col justify-between"
          >
            {/* Top Preview Image Container */}
            <div className="relative h-64 sm:h-72 overflow-hidden bg-slate-950">
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#090913] via-transparent to-transparent opacity-95" />

              {/* Category Pill & Project Index */}
              <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
                <span
                  className="px-3 py-1 rounded-full text-xs font-mono font-bold uppercase tracking-wider border backdrop-blur-md"
                  style={{
                    backgroundColor: `${project.accentColor}25`,
                    borderColor: `${project.accentColor}60`,
                    color: project.accentColor,
                  }}
                >
                  {project.category}
                </span>

                <span className="font-mono text-xs text-slate-300 bg-black/60 px-2.5 py-1 rounded-lg backdrop-blur-md border border-slate-800">
                  0{idx + 1} // PROD
                </span>
              </div>

              {/* Tagline on image bottom */}
              <div className="absolute bottom-3 left-6 right-6">
                <span className="font-mono text-xs text-cyan-300 drop-shadow">
                  {project.tagline}
                </span>
              </div>
            </div>

            {/* Content Body */}
            <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between space-y-6">
              <div className="space-y-3">
                <h3 className="font-heading font-extrabold text-xl sm:text-2xl text-white group-hover:text-purple-300 transition-colors">
                  {project.title}
                </h3>

                <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                  {project.description}
                </p>

                {/* Features Highlights */}
                <div className="pt-2 space-y-1.5">
                  {project.features.slice(0, 3).map((feat, fIdx) => (
                    <div key={fIdx} className="flex items-start gap-2 text-xs text-slate-400">
                      <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Technology Tags */}
              <div>
                <div className="flex flex-wrap gap-1.5 pt-2">
                  {project.technologies.map((tech, tIdx) => (
                    <span
                      key={tIdx}
                      className="px-2.5 py-1 rounded-lg text-[11px] font-mono bg-purple-950/40 text-purple-300 border border-purple-800/40"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Buttons: Modal Inspect & Source Code */}
              <div className="pt-4 border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-3">
                <button
                  onClick={() => {
                    soundEffects.click();
                    onSelectProject(project);
                  }}
                  className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-mono text-xs font-semibold tracking-wider transition-all shadow-lg shadow-purple-600/30 cursor-pointer"
                >
                  <span>Project Deep Dive</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>

                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700/80 text-slate-300 hover:text-white font-mono text-xs transition-colors"
                >
                  <Github className="w-4 h-4 text-purple-400" />
                  <span>GitHub Repository</span>
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
