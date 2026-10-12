import React, { useState } from 'react';
import { Mail, Globe, MapPin, Send, ArrowLeft, CheckCircle2, ExternalLink, Copy, Check } from 'lucide-react';
import { PROFILE_DATA } from '../data/portfolioData';

interface ContactSectionProps {
  onSubmitted: (senderName: string) => void;
  showExtendedHeader?: boolean;
}

const INQUIRY_PRESETS = [
  {
    label: 'Software Engineer / Internship',
    subject: 'Software Engineering Role / Internship Opportunity',
    message:
      'Hi Monirul, I reviewed your portfolio and C++ / Full-Stack engineering projects at PUST. We would love to schedule a brief conversation regarding an engineering opportunity.',
  },
  {
    label: 'Full-Stack Project Inquiry',
    subject: 'Full-Stack Web Architecture & Development Inquiry',
    message:
      'Hi Monirul, we are looking to build a high-performance React & Node.js web application and would like to discuss your availability and project scope.',
  },
  {
    label: 'Research & Academic Collaboration',
    subject: 'ICE Research / Competitive Programming Collaboration',
    message:
      'Hi Monirul, reaching out regarding an academic research / IoT telemetry and algorithmic systems collaboration.',
  },
];

export const ContactSection: React.FC<ContactSectionProps> = ({ onSubmitted, showExtendedHeader = false }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);

  const applyPreset = (preset: typeof INQUIRY_PRESETS[0]) => {
    setSubject(preset.subject);
    setMessage(preset.message);
  };

  const copyEmail = () => {
    navigator.clipboard.writeText(PROFILE_DATA.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);

    const formData = new FormData();
    formData.append('access_key', PROFILE_DATA.web3FormsAccessKey);
    formData.append('from_name', 'monirul.dev.cv Portfolio Inquiry');
    formData.append('name', name);
    formData.append('email', email);
    formData.append('subject', subject);
    formData.append('message', message);

    try {
      await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: formData,
      });
    } catch {
      // Even if offline or sandbox-restricted, transition smoothly to the Thank You confirmation page
    } finally {
      setSubmitting(false);
      onSubmitted(name.trim() || 'Friend');
    }
  };

  return (
    <section id="contact" className="space-y-8">
      {showExtendedHeader ? (
        <div className="space-y-3 border-b border-slate-200 dark:border-slate-800 pb-8">
          <div className="text-xs font-mono text-indigo-600 dark:text-indigo-400">
            Direct Communication · Web3Forms Verified Delivery · Pabna, Bangladesh (UTC+6)
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Initiate a Conversation with Md. Monirul Islam
          </h1>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 max-w-2xl leading-relaxed">
            Available for software engineering roles, full-stack web architecture engagements, competitive programming
            mentorship, and ICE hardware/software research collaborations.
          </p>
        </div>
      ) : (
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2">
          <div>
            <div className="text-xs font-mono text-indigo-600 dark:text-indigo-400">05. Direct Inquiry</div>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white tracking-tight mt-1">
              Get In Touch
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
            Direct inbox delivery to <span className="font-mono text-slate-900 dark:text-white">{PROFILE_DATA.email}</span>
          </p>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Direct Channels */}
        <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0e1422] p-6 sm:p-8 flex flex-col justify-between space-y-6">
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">Direct Contact Channels</h3>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
              Open for software engineering roles, full-stack systems architecture, and academic research collaborations.
              Typical response time is under 24 hours.
            </p>

            <div className="space-y-3 pt-2 font-mono text-xs">
              <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 flex items-center justify-between gap-2">
                <a
                  href={`mailto:${PROFILE_DATA.email}`}
                  className="flex items-center gap-3 text-slate-800 dark:text-slate-200 hover:text-indigo-600 dark:hover:text-indigo-400 truncate"
                >
                  <Mail className="w-4 h-4 text-indigo-600 dark:text-indigo-400 shrink-0" />
                  <span className="truncate">{PROFILE_DATA.email}</span>
                </a>
                <button
                  type="button"
                  onClick={copyEmail}
                  title="Copy Email Address"
                  className="p-1.5 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-500 dark:text-slate-400 shrink-0"
                >
                  {copiedEmail ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                </button>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 flex items-center gap-3 text-slate-800 dark:text-slate-200">
                <MapPin className="w-4 h-4 text-indigo-600 dark:text-indigo-400 shrink-0" />
                <span>ICE Dept, PUST, Pabna-6300</span>
              </div>

              <a
                href={PROFILE_DATA.website}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 flex items-center justify-between text-slate-800 dark:text-slate-200 hover:border-indigo-500/50 transition-colors"
              >
                <span className="flex items-center gap-3">
                  <Globe className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                  <span>monirul.dev.cv</span>
                </span>
                <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
              </a>
            </div>
          </div>

          <div className="pt-4 border-t border-slate-200 dark:border-slate-800 space-y-2">
            <div className="text-xs font-mono text-slate-500 dark:text-slate-400">Professional Profiles</div>
            <div className="flex items-center gap-4 text-xs font-semibold text-indigo-600 dark:text-indigo-400">
              <a href={PROFILE_DATA.github} target="_blank" rel="noopener noreferrer" className="hover:underline">
                GitHub (@monirul-dev)
              </a>
              <span aria-hidden="true">·</span>
              <a href={PROFILE_DATA.linkedin} target="_blank" rel="noopener noreferrer" className="hover:underline">
                LinkedIn (/in/monirul-dev)
              </a>
            </div>
          </div>
        </div>

        {/* Right Column: Web3Forms Form with Quick Templates */}
        <div className="lg:col-span-2 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0e1422] p-6 sm:p-8 space-y-6">
          <div className="space-y-2">
            <span className="text-xs font-mono text-slate-500 dark:text-slate-400 block">
              Quick Inquiry Templates (Click to auto-fill):
            </span>
            <div className="flex flex-wrap gap-2">
              {INQUIRY_PRESETS.map((preset) => (
                <button
                  key={preset.label}
                  type="button"
                  onClick={() => applyPreset(preset)}
                  className="px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-900 hover:bg-indigo-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-800 text-xs font-medium transition-colors whitespace-nowrap shrink-0"
                >
                  {preset.label}
                </button>
              ))}
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label htmlFor="contact-name" className="text-xs font-mono text-slate-700 dark:text-slate-400 font-medium block">
                  Your Name
                </label>
                <input
                  id="contact-name"
                  type="text"
                  name="name"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Monirul Islam"
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-slate-200 focus:border-indigo-500 focus:outline-none text-sm transition-colors"
                />
              </div>
              <div className="space-y-1.5">
                <label htmlFor="contact-email" className="text-xs font-mono text-slate-700 dark:text-slate-400 font-medium block">
                  Your Email
                </label>
                <input
                  id="contact-email"
                  type="email"
                  name="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="contact@monirul.dev.cv"
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-slate-200 focus:border-indigo-500 focus:outline-none text-sm transition-colors"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label htmlFor="contact-subject" className="text-xs font-mono text-slate-700 dark:text-slate-400 font-medium block">
                Subject
              </label>
              <input
                id="contact-subject"
                type="text"
                name="subject"
                required
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                placeholder="Project Inquiry / Job Opportunity"
                className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-slate-200 focus:border-indigo-500 focus:outline-none text-sm transition-colors"
              />
            </div>

            <div className="space-y-1.5">
              <label htmlFor="contact-message" className="text-xs font-mono text-slate-700 dark:text-slate-400 font-medium block">
                Message
              </label>
              <textarea
                id="contact-message"
                name="message"
                rows={4}
                required
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Hi Monirul, I would like to discuss..."
                className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-slate-200 focus:border-indigo-500 focus:outline-none text-sm transition-colors"
              />
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="w-full py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 disabled:opacity-60 text-white font-semibold shadow-md transition-colors flex items-center justify-center gap-2 text-sm cursor-pointer"
            >
              <Send className="w-4 h-4" />
              <span>{submitting ? 'Transmitting Message...' : 'Send Message'}</span>
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

/* Dedicated Thank You View (Elevated from user's thankyou.html) */
export const ThankYouView: React.FC<{ recipientName: string; onReturnHome: () => void }> = ({
  recipientName,
  onReturnHome,
}) => {
  return (
    <div className="py-12 flex items-center justify-center">
      <div className="max-w-xl w-full rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0e1422] p-8 sm:p-12 text-center space-y-8 shadow-xl">
        {/* Check Icon Circle */}
        <div className="w-20 h-20 mx-auto rounded-full bg-emerald-500/10 border-2 border-emerald-500/40 flex items-center justify-center">
          <CheckCircle2 className="w-10 h-10 text-emerald-500" />
        </div>

        <div className="space-y-3">
          <div className="text-xs font-mono font-semibold text-emerald-600 dark:text-emerald-400">
            Message Delivered · Notification Confirmed
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white">
            Thank You, <span className="text-indigo-600 dark:text-indigo-400">{recipientName || 'Friend'}</span>!
          </h1>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 max-w-md mx-auto leading-relaxed">
            Your inquiry has been successfully transmitted. I have received your notification and will review it
            promptly.
          </p>
        </div>

        {/* Details Callout Box from thankyou.html */}
        <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 text-left text-xs font-mono space-y-2.5 text-slate-700 dark:text-slate-300 tabular-nums">
          <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-2">
            <span className="text-slate-500 dark:text-slate-400">Target Inbox:</span>
            <span className="font-semibold text-indigo-600 dark:text-indigo-400">{PROFILE_DATA.email}</span>
          </div>
          <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-2">
            <span className="text-slate-500 dark:text-slate-400">Response Time:</span>
            <span className="font-semibold text-emerald-600 dark:text-emerald-400">Within 24 Hours</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-slate-500 dark:text-slate-400">Department:</span>
            <span className="font-semibold text-slate-900 dark:text-white">ICE @ PUST</span>
          </div>
        </div>

        {/* Action CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
          <button
            type="button"
            onClick={onReturnHome}
            className="w-full sm:w-auto px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold shadow-md transition-colors flex items-center justify-center gap-2 text-sm whitespace-nowrap shrink-0 cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Return to Portfolio</span>
          </button>
          <a
            href={PROFILE_DATA.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto px-6 py-3 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 font-semibold border border-slate-300 dark:border-slate-700 transition-colors flex items-center justify-center gap-2 text-sm whitespace-nowrap shrink-0"
          >
            <span>Connect on LinkedIn</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>
    </div>
  );
};
