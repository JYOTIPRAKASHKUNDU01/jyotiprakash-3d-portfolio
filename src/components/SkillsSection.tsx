import React, { useState } from 'react';
import { Cpu, Code2, Database, Wrench, Sparkles, Server, Layout, Check, Terminal, ExternalLink } from 'lucide-react';
import { SKILL_CATEGORIES } from '../data/portfolioData.ts';
import { soundEffects } from '../utils/audio.ts';

export const SkillsSection: React.FC = () => {
  const [selectedFilter, setSelectedFilter] = useState<string>('all');

  const filterTabs = [
    { id: 'all', label: 'All Technologies' },
    { id: 'frontend', label: 'Frontend' },
    { id: 'backend', label: 'Backend' },
    { id: 'database', label: 'Databases' },
    { id: 'tools', label: 'Tools & Workflow' },
    { id: 'creative', label: 'Creative 3D' },
  ];

  const displayedCategories =
    selectedFilter === 'all'
      ? SKILL_CATEGORIES
      : SKILL_CATEGORIES.filter((c) => c.categoryKey === selectedFilter);

  return (
    <section id="skills" className="py-24 px-4 sm:px-6 max-w-7xl mx-auto relative">
      {/* Glow effect */}
      <div className="absolute top-1/2 left-10 w-[500px] h-[350px] bg-cyan-600/10 rounded-full blur-[140px] pointer-events-none" />

      {/* Header */}
      <div className="gsap-section-header text-center max-w-3xl mx-auto mb-12">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/60 border border-cyan-500/40 text-cyan-300 font-mono text-xs uppercase tracking-wider mb-4">
          <Cpu className="w-3.5 h-3.5 text-purple-400" />
          <span>Technical Arsenal</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-heading font-extrabold text-white tracking-tight">
          Skills & <span className="bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">Capabilities</span>
        </h2>
        <p className="text-slate-400 text-sm sm:text-base mt-3 leading-relaxed">
          Comprehensive full-stack developer skill set across frontend architectures, backend APIs, relational databases, and interactive 3D web graphics.
        </p>

        {/* Filter Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 mt-8">
          {filterTabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => {
                soundEffects.click();
                setSelectedFilter(tab.id);
              }}
              className={`px-4 py-2 rounded-xl font-mono text-xs uppercase tracking-wider font-semibold transition-all cursor-pointer ${
                selectedFilter === tab.id
                  ? 'bg-gradient-to-r from-purple-600 to-cyan-600 text-white shadow-lg shadow-purple-600/30'
                  : 'bg-[#0d0d1a] border border-slate-800 text-slate-400 hover:text-white hover:border-slate-700'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Skill Categories Grid */}
      <div className="space-y-12">
        {displayedCategories.map((cat) => (
          <div key={cat.categoryKey} className="space-y-4">
            <div className="flex items-center gap-3 border-b border-slate-800/80 pb-3">
              <span className="w-3 h-3 rounded-full bg-purple-500 shadow-[0_0_8px_#a855f7]" />
              <h3 className="font-heading font-bold text-lg sm:text-xl text-white tracking-wide">
                {cat.title}
              </h3>
              <span className="font-mono text-xs text-slate-500 ml-auto">
                {cat.skills.length} competencies
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {cat.skills.map((skill, sIdx) => (
                <div
                  key={sIdx}
                  onMouseEnter={() => soundEffects.hover()}
                  className="group relative bg-[#090914] border border-purple-500/20 hover:border-purple-500/60 p-5 rounded-2xl transition-all duration-300 hover:-translate-y-1.5 shadow-lg hover:shadow-[0_10px_25px_-5px_rgba(147,51,234,0.25)] flex flex-col justify-between"
                >
                  {/* Glowing Top Corner Accent */}
                  <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-bl from-purple-500/10 to-transparent rounded-tr-2xl pointer-events-none group-hover:from-purple-500/20 transition-colors" />

                  <div>
                    {/* Top row: Skill name + Badge */}
                    <div className="flex items-start justify-between gap-2">
                      <div className="w-10 h-10 rounded-xl bg-purple-950/40 border border-purple-500/30 flex items-center justify-center text-cyan-400 group-hover:text-purple-300 transition-colors">
                        <Code2 className="w-5 h-5" />
                      </div>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-slate-900 text-purple-300 border border-purple-800/40">
                        {skill.level}
                      </span>
                    </div>

                    <h4 className="font-heading font-bold text-base text-white mt-3 group-hover:text-cyan-300 transition-colors">
                      {skill.name}
                    </h4>

                    <p className="text-xs text-slate-400 mt-1.5 leading-relaxed">
                      {skill.description}
                    </p>
                  </div>

                  {/* Status Indicator */}
                  <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-[11px] font-mono text-slate-400">
                    <span className="flex items-center gap-1.5 text-emerald-400">
                      <Check className="w-3.5 h-3.5" /> Production Ready
                    </span>
                    <span className="text-slate-600 group-hover:text-purple-400 transition-colors">
                      verified
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
