import React, { useState, useEffect } from 'react';
import { X, ExternalLink, Github, Copy, Check, Cpu } from 'lucide-react';
import { ProjectItem } from '../data/portfolioData';

interface ProjectSpecModalProps {
  project: ProjectItem | null;
  onClose: () => void;
  onLaunchDemo?: (demoType: 'dsa' | 'iot') => void;
}

export const ProjectSpecModal: React.FC<ProjectSpecModalProps> = ({ project, onClose, onLaunchDemo }) => {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (project) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [project, onClose]);

  if (!project) return null;

  const copySnippet = () => {
    navigator.clipboard.writeText(project.codeSnippet.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto"
      onClick={onClose}
    >
      <div
        className="max-w-3xl w-full rounded-2xl bg-white dark:bg-[#0e1422] border border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden my-8 max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Modal Header */}
        <div className="px-6 py-4 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between gap-4 bg-slate-50 dark:bg-slate-900/60">
          <div className="text-xs font-mono text-indigo-600 dark:text-indigo-400">
            {project.categoryLabel} · {project.year}
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close modal"
            className="p-2 rounded-lg bg-slate-200/80 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Scrollable Body */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-6">
          <div className="space-y-2">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              {project.title}
            </h2>
            <p className="text-sm text-slate-600 dark:text-slate-400">{project.subtitle}</p>
            <div className="flex flex-wrap items-center gap-2 pt-1 text-xs font-mono text-slate-500 dark:text-slate-400">
              {project.tech.map((t, idx) => (
                <React.Fragment key={t}>
                  <span className="text-slate-800 dark:text-slate-200 font-medium">{t}</span>
                  {idx < project.tech.length - 1 && <span aria-hidden="true">·</span>}
                </React.Fragment>
              ))}
            </div>
          </div>

          {/* STAR Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900/70 border border-slate-200 dark:border-slate-800 space-y-1">
              <div className="text-xs font-mono font-semibold text-slate-500 dark:text-slate-400">01. Situation</div>
              <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                {project.star.situation}
              </p>
            </div>
            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900/70 border border-slate-200 dark:border-slate-800 space-y-1">
              <div className="text-xs font-mono font-semibold text-slate-500 dark:text-slate-400">02. Task</div>
              <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                {project.star.task}
              </p>
            </div>
            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900/70 border border-slate-200 dark:border-slate-800 space-y-1">
              <div className="text-xs font-mono font-semibold text-slate-500 dark:text-slate-400">03. Action</div>
              <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                {project.star.action}
              </p>
            </div>
            <div className="p-4 rounded-xl bg-emerald-500/5 border border-emerald-500/30 space-y-1">
              <div className="text-xs font-mono font-semibold text-emerald-600 dark:text-emerald-400">
                04. Quantifiable Result
              </div>
              <p className="text-xs sm:text-sm text-slate-800 dark:text-slate-200 font-medium leading-relaxed">
                {project.star.result}
              </p>
            </div>
          </div>

          {/* System Architecture & Highlights */}
          <div className="space-y-3">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white">System Architecture & Implementation</h3>
            <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
              {project.architectureOverview}
            </p>
            <ul className="space-y-1.5 text-xs sm:text-sm text-slate-600 dark:text-slate-300 pl-4 list-disc">
              {project.highlights.map((h, i) => (
                <li key={i}>{h}</li>
              ))}
            </ul>
          </div>

          {/* Code Snippet */}
          <div className="rounded-xl overflow-hidden border border-slate-800 bg-slate-950">
            <div className="px-4 py-2.5 bg-slate-900 border-b border-slate-800 flex items-center justify-between text-xs font-mono text-slate-400">
              <span>{project.codeSnippet.filename}</span>
              <button
                type="button"
                onClick={copySnippet}
                className="flex items-center gap-1.5 text-slate-300 hover:text-white transition-colors"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'Copied' : 'Copy Code'}</span>
              </button>
            </div>
            <pre className="p-4 font-mono text-xs text-slate-200 overflow-x-auto leading-relaxed">
              <code>{project.codeSnippet.code}</code>
            </pre>
          </div>

          {/* Action Footer */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-slate-200 dark:border-slate-800">
            <div className="flex flex-wrap items-center gap-3">
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 rounded-xl bg-slate-900 dark:bg-slate-800 hover:bg-slate-800 dark:hover:bg-slate-700 text-white text-xs font-semibold flex items-center gap-2 transition-colors whitespace-nowrap shrink-0"
              >
                <Github className="w-3.5 h-3.5" />
                <span>View Source on GitHub</span>
              </a>
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 rounded-xl border border-slate-300 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-800 dark:text-slate-200 text-xs font-semibold flex items-center gap-2 transition-colors whitespace-nowrap shrink-0"
                >
                  <span>Live Deployment</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              )}
            </div>

            {project.hasInteractiveDemo && onLaunchDemo && (
              <button
                type="button"
                onClick={() => {
                  const demoType = project.hasInteractiveDemo === 'iot-telemetry' ? 'iot' : 'dsa';
                  onClose();
                  onLaunchDemo(demoType);
                }}
                className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold flex items-center gap-2 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
              >
                <Cpu className="w-3.5 h-3.5" />
                <span>Run Live Interactive Demo</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
