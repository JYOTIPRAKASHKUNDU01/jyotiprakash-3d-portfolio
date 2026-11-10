import React, { useState } from 'react';
import { Mail, Linkedin, Github, MapPin, Send, CheckCircle2, Copy, Check, MessageSquare, Sparkles, AlertCircle, RefreshCw } from 'lucide-react';
import confetti from 'canvas-confetti';
import { PERSONAL_INFO } from '../data/portfolioData.ts';
import { soundEffects } from '../utils/audio.ts';

export const ContactSection: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [copiedEmail, setCopiedEmail] = useState(false);

  const handleCopyEmail = () => {
    soundEffects.click();
    navigator.clipboard.writeText(PERSONAL_INFO.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2500);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    soundEffects.click();
    setIsSubmitting(true);
    setErrorMessage(null);

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Failed to send message.');
      }

      setIsSuccess(true);
      soundEffects.success();
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#a855f7', '#06b6d4', '#f43f5e'],
      });

      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch (err: any) {
      console.error('Contact Form Error:', err);
      setErrorMessage(err.message || 'Something went wrong. Please email directly.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-24 px-4 sm:px-6 max-w-7xl mx-auto relative">
      {/* Background Glow */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 w-[600px] h-[350px] bg-purple-600/10 rounded-full blur-[140px] pointer-events-none" />

      {/* Section Header */}
      <div className="gsap-section-header text-center max-w-3xl mx-auto mb-16">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-950/60 border border-purple-500/40 text-purple-300 font-mono text-xs uppercase tracking-wider mb-4">
          <MessageSquare className="w-3.5 h-3.5 text-cyan-400" />
          <span>Initiate Communication</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-heading font-extrabold text-white tracking-tight">
          Have a Project in Mind? <br className="hidden sm:inline" />
          <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent glow-purple">
            Let's Build Something Amazing.
          </span>
        </h2>
        <p className="text-slate-400 text-sm sm:text-base mt-3 leading-relaxed">
          I am actively exploring full-time Python Full Stack Developer roles, frontend engineering positions, and impactful freelance collaborations.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        {/* Left Column: Direct Contact Cards */}
        <div className="lg:col-span-5 space-y-4">
          {/* Email Card with Copy button */}
          <div
            onMouseEnter={() => soundEffects.hover()}
            className="bg-[#090913] border border-purple-500/30 hover:border-purple-500/70 p-6 rounded-3xl transition-all duration-300 shadow-xl space-y-3 group"
          >
            <div className="flex items-center justify-between">
              <div className="w-12 h-12 rounded-2xl bg-purple-950/40 border border-purple-500/40 flex items-center justify-center text-purple-400 group-hover:scale-110 transition-transform">
                <Mail className="w-6 h-6" />
              </div>
              <button
                onClick={handleCopyEmail}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-purple-900/30 hover:bg-purple-600 text-purple-300 hover:text-white transition-colors text-xs font-mono border border-purple-500/30 cursor-pointer"
                title="Copy email to clipboard"
              >
                {copiedEmail ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedEmail ? 'Copied!' : 'Copy'}</span>
              </button>
            </div>
            <div>
              <span className="text-xs font-mono uppercase tracking-wider text-slate-400 block">Direct Email</span>
              <a
                href={`mailto:${PERSONAL_INFO.email}`}
                className="font-heading font-bold text-base sm:text-lg text-white hover:text-purple-300 transition-colors break-all"
              >
                {PERSONAL_INFO.email}
              </a>
            </div>
            <p className="text-xs text-slate-400">
              Guaranteed response within 24 hours for career and project inquiries.
            </p>
          </div>

          {/* LinkedIn Card */}
          <a
            href={PERSONAL_INFO.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            onMouseEnter={() => soundEffects.hover()}
            className="block bg-[#090913] border border-blue-500/30 hover:border-blue-400/70 p-6 rounded-3xl transition-all duration-300 hover:-translate-y-1 shadow-xl space-y-2 group"
          >
            <div className="flex items-center justify-between">
              <div className="w-12 h-12 rounded-2xl bg-blue-950/40 border border-blue-500/40 flex items-center justify-center text-blue-400 group-hover:scale-110 transition-transform">
                <Linkedin className="w-6 h-6" />
              </div>
              <span className="text-xs font-mono text-blue-400 group-hover:text-blue-300 flex items-center gap-1">
                Connect on LinkedIn →
              </span>
            </div>
            <div>
              <span className="text-xs font-mono uppercase tracking-wider text-slate-400 block">Professional Network</span>
              <h4 className="font-heading font-bold text-base text-white">Jyotiprakash Kundu</h4>
            </div>
            <p className="text-xs text-slate-400">
              View recommendations, network activity, and career updates.
            </p>
          </a>

          {/* GitHub Card */}
          <a
            href={PERSONAL_INFO.github}
            target="_blank"
            rel="noopener noreferrer"
            onMouseEnter={() => soundEffects.hover()}
            className="block bg-[#090913] border border-cyan-500/30 hover:border-cyan-400/70 p-6 rounded-3xl transition-all duration-300 hover:-translate-y-1 shadow-xl space-y-2 group"
          >
            <div className="flex items-center justify-between">
              <div className="w-12 h-12 rounded-2xl bg-cyan-950/40 border border-cyan-500/40 flex items-center justify-center text-cyan-400 group-hover:scale-110 transition-transform">
                <Github className="w-6 h-6" />
              </div>
              <span className="text-xs font-mono text-cyan-400 group-hover:text-cyan-300 flex items-center gap-1">
                Explore Repositories →
              </span>
            </div>
            <div>
              <span className="text-xs font-mono uppercase tracking-wider text-slate-400 block">Open Source & Code</span>
              <h4 className="font-heading font-bold text-base text-white">github.com/jyotiprakashkundu</h4>
            </div>
            <p className="text-xs text-slate-400">
              Browse repositories for Wallvora, Travellora, translation systems, and full-stack experiments.
            </p>
          </a>

          {/* Location Card */}
          <div className="bg-[#090913] border border-slate-800 p-5 rounded-2xl flex items-center gap-4 text-xs font-mono">
            <div className="w-10 h-10 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center text-cyan-400 shrink-0">
              <MapPin className="w-5 h-5" />
            </div>
            <div>
              <span className="text-slate-400 block text-[10px]">CURRENT LOCATION</span>
              <span className="text-white font-semibold">{PERSONAL_INFO.location}</span>
            </div>
          </div>
        </div>

        {/* Right Column: Working Contact Form */}
        <div className="lg:col-span-7 bg-[#090913]/90 border border-purple-500/30 p-6 sm:p-8 rounded-3xl backdrop-blur-xl shadow-2xl relative">
          <div className="flex items-center justify-between border-b border-slate-800/80 pb-4 mb-6">
            <div className="flex items-center gap-2.5">
              <div className="w-3 h-3 rounded-full bg-purple-500 shadow-[0_0_8px_#a855f7]" />
              <h3 className="font-heading font-bold text-lg text-white">Send a Message</h3>
            </div>
            <span className="font-mono text-xs text-slate-500">Live Secure Relay</span>
          </div>

          {isSuccess ? (
            <div className="p-8 text-center space-y-4">
              <div className="w-16 h-16 rounded-2xl bg-emerald-950/40 border border-emerald-500/40 flex items-center justify-center mx-auto text-emerald-400">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h4 className="font-heading font-bold text-xl text-white">Message Transmitted!</h4>
              <p className="text-slate-300 text-sm max-w-md mx-auto leading-relaxed">
                Thank you for reaching out. Jyotiprakash Kundu has received your message and will reply to your email address shortly.
              </p>
              <button
                type="button"
                onClick={() => setIsSuccess(false)}
                className="mt-4 px-6 py-2.5 rounded-xl bg-slate-900 border border-purple-500/40 text-purple-300 hover:text-white font-mono text-xs transition-colors"
              >
                Send Another Message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-mono font-bold uppercase tracking-wider text-purple-300 block mb-1.5">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Satya Nadella / Recruiter"
                    className="w-full bg-[#0d0d1a] border border-slate-800 focus:border-purple-500 rounded-xl px-4 py-3 text-xs text-white placeholder-slate-600 focus:outline-none transition-colors"
                  />
                </div>
                <div>
                  <label className="text-xs font-mono font-bold uppercase tracking-wider text-purple-300 block mb-1.5">
                    Your Email *
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="name@company.com"
                    className="w-full bg-[#0d0d1a] border border-slate-800 focus:border-purple-500 rounded-xl px-4 py-3 text-xs text-white placeholder-slate-600 focus:outline-none transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-mono font-bold uppercase tracking-wider text-purple-300 block mb-1.5">
                  Subject / Inquiring Role
                </label>
                <input
                  type="text"
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  placeholder="e.g. Python Full Stack Role / Project Discussion"
                  className="w-full bg-[#0d0d1a] border border-slate-800 focus:border-purple-500 rounded-xl px-4 py-3 text-xs text-white placeholder-slate-600 focus:outline-none transition-colors"
                />
              </div>

              <div>
                <label className="text-xs font-mono font-bold uppercase tracking-wider text-purple-300 block mb-1.5">
                  Your Message *
                </label>
                <textarea
                  required
                  rows={5}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Share details about the role, technical requirements, or collaboration idea..."
                  className="w-full bg-[#0d0d1a] border border-slate-800 focus:border-purple-500 rounded-xl px-4 py-3 text-xs text-white placeholder-slate-600 focus:outline-none transition-colors resize-none"
                />
              </div>

              {errorMessage && (
                <div className="p-3 rounded-xl bg-red-950/40 border border-red-500/40 flex items-center gap-2 text-xs text-red-300">
                  <AlertCircle className="w-4 h-4 shrink-0 text-red-400" />
                  <span>{errorMessage}</span>
                </div>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full py-3.5 px-6 rounded-2xl font-mono text-xs font-bold uppercase tracking-wider text-white flex items-center justify-center gap-2 transition-all shadow-xl ${
                  isSubmitting
                    ? 'bg-purple-900/50 cursor-not-allowed text-purple-300'
                    : 'bg-gradient-to-r from-purple-600 via-indigo-600 to-cyan-500 hover:opacity-95 shadow-purple-600/30 active:scale-[0.99] cursor-pointer'
                }`}
              >
                {isSubmitting ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin text-cyan-300" />
                    <span>Dispatching Transmission...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4 text-cyan-300" />
                    <span>Send Message to Jyotiprakash</span>
                  </>
                )}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
};
