import React, { useState, useEffect } from 'react';
import { Menu, X, FileText, Volume2, VolumeX, Sparkles, Terminal, Code2 } from 'lucide-react';
import { soundEffects } from '../utils/audio.ts';

interface NavbarProps {
  onOpenResume: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenResume }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);

      const sections = ['hero', 'about', 'skills', 'projects', 'experience', 'education', 'ai-lab', 'contact'];
      const scrollPos = window.scrollY + 200;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'HOME', href: '#hero', id: 'hero' },
    { name: 'ABOUT', href: '#about', id: 'about' },
    { name: 'SKILLS', href: '#skills', id: 'skills' },
    { name: 'PROJECTS', href: '#projects', id: 'projects' },
    { name: 'EXPERIENCE', href: '#experience', id: 'experience' },
    { name: 'EDUCATION', href: '#education', id: 'education' },
    { name: 'AI LAB', href: '#ai-lab', id: 'ai-lab' },
    { name: 'CONTACT', href: '#contact', id: 'contact' },
  ];

  const handleNavClick = (href: string) => {
    soundEffects.click();
    setMobileMenuOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleToggleSound = () => {
    const nextMuted = soundEffects.toggleMute();
    setIsMuted(nextMuted);
    if (!nextMuted) {
      soundEffects.hover();
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#050505]/85 backdrop-blur-md border-b border-purple-500/20 py-3 shadow-[0_4px_30px_rgba(0,0,0,0.8)]'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between">
        {/* Brand / Logo */}
        <a
          href="#hero"
          onClick={() => handleNavClick('#hero')}
          className="flex items-center gap-2 group cursor-pointer"
        >
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-purple-600 via-indigo-600 to-cyan-400 p-[1.5px] transition-transform group-hover:scale-105">
            <div className="w-full h-full bg-[#050505] rounded-[10px] flex items-center justify-center">
              <span className="font-heading font-extrabold text-sm text-white tracking-wider">JK</span>
            </div>
          </div>
          <div className="flex flex-col">
            <span className="font-heading font-bold text-sm tracking-wide text-white group-hover:text-purple-400 transition-colors">
              JYOTIPRAKASH KUNDU
            </span>
            <span className="font-mono text-[9px] text-cyan-400 tracking-widest uppercase">
              Full Stack & 3D Web
            </span>
          </div>
        </a>

        {/* Desktop Nav Links */}
        <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => handleNavClick(link.href)}
              className={`px-3 py-1.5 rounded-lg font-mono text-xs tracking-wider transition-all cursor-pointer ${
                activeSection === link.id
                  ? 'text-purple-300 bg-purple-950/40 border border-purple-500/30 font-semibold shadow-[0_0_12px_rgba(168,85,247,0.3)]'
                  : 'text-slate-400 hover:text-white hover:bg-slate-900/50'
              }`}
            >
              {link.name}
            </button>
          ))}
        </nav>

        {/* Actions: Sound FX Toggle & Resume */}
        <div className="hidden sm:flex items-center gap-3">
          {/* Procedural Audio Toggle */}
          <button
            onClick={handleToggleSound}
            className="p-2 rounded-xl bg-slate-900/80 border border-slate-800 text-slate-400 hover:text-purple-300 hover:border-purple-500/40 transition-colors"
            title={isMuted ? 'Unmute Procedural Audio' : 'Mute Procedural Audio'}
          >
            {isMuted ? <VolumeX className="w-4 h-4 text-slate-500" /> : <Volume2 className="w-4 h-4 text-cyan-400" />}
          </button>

          {/* Resume CTA */}
          <button
            onClick={() => {
              soundEffects.click();
              onOpenResume();
            }}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-mono text-xs font-semibold tracking-wider transition-all shadow-lg shadow-purple-600/30 active:scale-95"
          >
            <FileText className="w-4 h-4" />
            <span>RESUME</span>
          </button>
        </div>

        {/* Mobile Menu Button */}
        <div className="flex items-center gap-2 lg:hidden">
          <button
            onClick={handleToggleSound}
            className="p-2 rounded-xl bg-slate-900/80 border border-slate-800 text-slate-400"
            title="Toggle Audio"
          >
            {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4 text-cyan-400" />}
          </button>
          <button
            onClick={() => {
              soundEffects.click();
              setMobileMenuOpen(!mobileMenuOpen);
            }}
            className="p-2 rounded-xl bg-purple-950/40 border border-purple-500/30 text-purple-300 hover:text-white"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Navigation Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#07070e]/98 border-b border-purple-500/30 px-6 py-6 space-y-3 backdrop-blur-2xl animate-fade-in shadow-2xl">
          <div className="grid grid-cols-2 gap-2">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => handleNavClick(link.href)}
                className={`py-2.5 px-3 rounded-xl font-mono text-xs text-left tracking-wider transition-all ${
                  activeSection === link.id
                    ? 'bg-purple-950/60 text-purple-300 border border-purple-500/40 font-bold'
                    : 'text-slate-300 bg-[#0d0d18] border border-slate-800/80 hover:text-white'
                }`}
              >
                {link.name}
              </button>
            ))}
          </div>

          <div className="pt-2">
            <button
              onClick={() => {
                soundEffects.click();
                setMobileMenuOpen(false);
                onOpenResume();
              }}
              className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-mono text-xs font-semibold shadow-lg shadow-purple-600/30"
            >
              <FileText className="w-4 h-4" />
              <span>DOWNLOAD RESUME (PDF)</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
