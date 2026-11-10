import React, { useState, useRef, useEffect } from 'react';
import { Terminal, Send, CornerDownLeft, Sparkles } from 'lucide-react';
import { PERSONAL_INFO, EXPERIENCES, EDUCATION, PROJECTS } from '../data/portfolioData.ts';
import { soundEffects } from '../utils/audio.ts';

interface TerminalLine {
  type: 'input' | 'output' | 'system';
  text: string;
}

export const InteractiveTerminal: React.FC = () => {
  const [inputVal, setInputVal] = useState('');
  const [history, setHistory] = useState<TerminalLine[]>([
    { type: 'system', text: '⚡ Kundu-OS v2.4 [Bhubaneswar Cluster initialized]' },
    { type: 'system', text: 'Type "help" to list available commands or click quick prompts below.' },
  ]);
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  const handleCommand = (cmdStr: string) => {
    const trimmed = cmdStr.trim().toLowerCase();
    if (!trimmed) return;

    soundEffects.click();

    const newHistory: TerminalLine[] = [...history, { type: 'input', text: `$ ${cmdStr}` }];

    switch (trimmed) {
      case 'help':
        newHistory.push({
          type: 'output',
          text: 'Available commands: whoami, skills, experience, education, projects, contact, clear, python --version',
        });
        break;
      case 'whoami':
        newHistory.push({
          type: 'output',
          text: `${PERSONAL_INFO.name} — ${PERSONAL_INFO.title}. CSE Student at GIFT Autonomous, Bhubaneswar. Currently Python Full Stack Intern at THYO TECH.`,
        });
        break;
      case 'skills':
        newHistory.push({
          type: 'output',
          text: 'Frontend: React.js, Next.js, TypeScript, Tailwind CSS | Backend: Python, Flask, Node.js, REST APIs | DB: MySQL, PostgreSQL, Supabase | Creative: Three.js, Framer Motion',
        });
        break;
      case 'experience':
        newHistory.push({
          type: 'output',
          text: EXPERIENCES.map((e) => `[${e.period}] ${e.role} @ ${e.company}`).join(' \n'),
        });
        break;
      case 'education':
        newHistory.push({
          type: 'output',
          text: EDUCATION.map((ed) => `• ${ed.degree} (${ed.institution}) - ${ed.scoreOrStatus}`).join(' \n'),
        });
        break;
      case 'projects':
        newHistory.push({
          type: 'output',
          text: PROJECTS.map((p) => `• ${p.title}: ${p.tagline}`).join(' \n'),
        });
        break;
      case 'contact':
        newHistory.push({
          type: 'output',
          text: `Email: ${PERSONAL_INFO.email} | LinkedIn: ${PERSONAL_INFO.linkedin} | Location: ${PERSONAL_INFO.location}`,
        });
        break;
      case 'python --version':
      case 'python -v':
        newHistory.push({
          type: 'output',
          text: 'Python 3.12.2 (CPython runtime, Full Stack Architecture)',
        });
        break;
      case 'clear':
      case 'cls':
        setHistory([
          { type: 'system', text: '⚡ Terminal cleared. Ready for next command.' },
        ]);
        setInputVal('');
        return;
      default:
        newHistory.push({
          type: 'output',
          text: `zsh: command not found: ${trimmed}. Type "help" for valid commands.`,
        });
        break;
    }

    setHistory(newHistory);
    setInputVal('');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleCommand(inputVal);
  };

  return (
    <div className="w-full bg-[#080812] border border-purple-500/30 rounded-2xl overflow-hidden shadow-2xl font-mono text-xs">
      {/* Terminal Title Bar */}
      <div className="bg-[#05050a] px-4 py-2.5 border-b border-purple-500/20 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-red-500/80 inline-block" />
            <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/80 inline-block" />
            <span className="w-2.5 h-2.5 rounded-full bg-green-500/80 inline-block" />
          </div>
          <span className="text-[11px] text-slate-400 font-semibold ml-2 flex items-center gap-1">
            <Terminal className="w-3.5 h-3.5 text-purple-400" /> jyoti@bhubaneswar:~ (zsh)
          </span>
        </div>
        <span className="text-[10px] text-purple-400/80 bg-purple-950/40 px-2 py-0.5 rounded border border-purple-800/40">
          Python 3.12 • Full Stack
        </span>
      </div>

      {/* Terminal Log Output */}
      <div className="p-4 h-56 overflow-y-auto space-y-2 text-slate-300">
        {history.map((line, idx) => (
          <div key={idx} className="leading-relaxed">
            {line.type === 'system' && (
              <span className="text-cyan-400/90">{line.text}</span>
            )}
            {line.type === 'input' && (
              <span className="text-purple-300 font-bold">{line.text}</span>
            )}
            {line.type === 'output' && (
              <pre className="text-slate-300 whitespace-pre-wrap font-mono mt-0.5 pl-2 border-l border-purple-500/30">
                {line.text}
              </pre>
            )}
          </div>
        ))}
        <div ref={endRef} />
      </div>

      {/* Quick Click Prompts */}
      <div className="px-4 py-2 bg-[#05050c] border-t border-slate-800/80 flex flex-wrap items-center gap-1.5 text-[10px]">
        <span className="text-slate-500 mr-1">Quick:</span>
        {['whoami', 'skills', 'experience', 'projects', 'contact', 'clear'].map((cmd) => (
          <button
            key={cmd}
            type="button"
            onClick={() => handleCommand(cmd)}
            className="px-2 py-0.5 rounded bg-slate-900 hover:bg-purple-900/40 text-purple-300 border border-slate-800 hover:border-purple-500/40 transition-colors"
          >
            {cmd}
          </button>
        ))}
      </div>

      {/* Command Input Field */}
      <form onSubmit={handleSubmit} className="p-3 bg-[#080812] border-t border-purple-500/20 flex items-center gap-2">
        <span className="text-cyan-400 font-bold">$</span>
        <input
          type="text"
          value={inputVal}
          onChange={(e) => setInputVal(e.target.value)}
          placeholder="Type a command (e.g. whoami, skills, experience)..."
          className="flex-1 bg-transparent text-white placeholder-slate-600 focus:outline-none text-xs"
        />
        <button
          type="submit"
          className="p-1.5 rounded-lg bg-purple-600/30 hover:bg-purple-600 text-purple-300 hover:text-white transition-colors"
        >
          <Send className="w-3.5 h-3.5" />
        </button>
      </form>
    </div>
  );
};
