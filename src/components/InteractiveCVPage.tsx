import React, { useState } from 'react';
import { Printer, Copy, Check, FileText, Code2, LayoutList, ExternalLink } from 'lucide-react';
import { PROFILE_DATA, SKILL_GROUPS, PROJECTS_DATA, EDUCATION_DATA, ACHIEVEMENTS_DATA } from '../data/portfolioData';

export const InteractiveCVPage: React.FC<{ avatarUrl: string; onNavigate: (page: string) => void }> = ({
  avatarUrl,
  onNavigate,
}) => {
  const [cvFormat, setCvFormat] = useState<'executive' | 'ats' | 'markdown'>('executive');
  const [copied, setCopied] = useState(false);

  const generateMarkdownResume = () => {
    return `# ${PROFILE_DATA.name}
**${PROFILE_DATA.headline}**
${PROFILE_DATA.department} — ${PROFILE_DATA.university}
Email: ${PROFILE_DATA.email} | Web: ${PROFILE_DATA.website} | GitHub: ${PROFILE_DATA.github} | LinkedIn: ${PROFILE_DATA.linkedin}

## Summary
${PROFILE_DATA.bioLead} ${PROFILE_DATA.bioExtended}

## Education
**${EDUCATION_DATA.degree}**
${EDUCATION_DATA.institution}, ${EDUCATION_DATA.location} (${EDUCATION_DATA.period})
Coursework: ${EDUCATION_DATA.coursework.map((c) => c.title).join(', ')}

## Technical Skills
${SKILL_GROUPS.map((g) => `- **${g.title}:** ${g.items.map((i) => i.name).join(', ')}`).join('\n')}

## Selected Engineering Projects (STAR Methodology)
${PROJECTS_DATA.slice(0, 4)
  .map(
    (p) => `### ${p.title} (${p.year}) — [${p.tech.join(', ')}]
- **Situation & Task:** ${p.star.situation} ${p.star.task}
- **Action:** ${p.star.action}
- **Result:** ${p.star.result}`
  )
  .join('\n\n')}

## Achievements & Certifications
${ACHIEVEMENTS_DATA.map((a) => `- **${a.title}** (${a.organization}, ${a.year}): ${a.description}`).join('\n')}
`;
  };

  const handleCopyMarkdown = () => {
    navigator.clipboard.writeText(generateMarkdownResume());
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handlePrintCV = () => {
    window.print();
  };

  return (
    <div className="space-y-8">
      {/* Control Toolbar (Hidden when printing) */}
      <div className="no-print flex flex-col lg:flex-row lg:items-center justify-between gap-4 p-5 rounded-2xl bg-white dark:bg-[#0e1422] border border-slate-200 dark:border-slate-800">
        <div className="space-y-1">
          <div className="text-xs font-mono text-indigo-600 dark:text-indigo-400">
            Curriculum Vitae & ATS Resume Generator
          </div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">
            Md. Monirul Islam — Official Curriculum Vitae
          </h1>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          {/* Format Selector */}
          <div className="flex items-center gap-1 p-1 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
            <button
              type="button"
              onClick={() => setCvFormat('executive')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors flex items-center gap-1.5 whitespace-nowrap shrink-0 ${
                cvFormat === 'executive'
                  ? 'bg-indigo-600 text-white'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <LayoutList className="w-3.5 h-3.5" />
              <span>Executive CV</span>
            </button>
            <button
              type="button"
              onClick={() => setCvFormat('ats')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors flex items-center gap-1.5 whitespace-nowrap shrink-0 ${
                cvFormat === 'ats'
                  ? 'bg-indigo-600 text-white'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <FileText className="w-3.5 h-3.5" />
              <span>1-Page ATS Resume</span>
            </button>
            <button
              type="button"
              onClick={() => setCvFormat('markdown')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors flex items-center gap-1.5 whitespace-nowrap shrink-0 ${
                cvFormat === 'markdown'
                  ? 'bg-indigo-600 text-white'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <Code2 className="w-3.5 h-3.5" />
              <span>Markdown Source</span>
            </button>
          </div>

          <button
            type="button"
            onClick={handleCopyMarkdown}
            className="px-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 text-xs font-semibold border border-slate-300 dark:border-slate-700 transition-colors flex items-center gap-1.5 whitespace-nowrap shrink-0"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? 'Copied Markdown!' : 'Copy Markdown'}</span>
          </button>

          <button
            type="button"
            onClick={handlePrintCV}
            className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold shadow-sm transition-colors flex items-center gap-1.5 whitespace-nowrap shrink-0"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Print / Save PDF</span>
          </button>
        </div>
      </div>

      {/* CV Document Sheet */}
      {cvFormat === 'markdown' ? (
        <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-950 p-6 sm:p-8 text-slate-200 font-mono text-xs overflow-x-auto leading-relaxed">
          <pre className="whitespace-pre-wrap">{generateMarkdownResume()}</pre>
        </div>
      ) : (
        <div className="print-only-sheet rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0e1422] p-8 sm:p-12 shadow-sm space-y-8">
          {/* CV Header */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-slate-200 dark:border-slate-800 pb-8">
            <div className="flex items-start sm:items-center gap-5">
              {cvFormat === 'executive' && (
                <div className="w-20 h-20 rounded-2xl overflow-hidden border border-slate-300 dark:border-slate-700 shrink-0 bg-slate-900">
                  <img
                    src={avatarUrl}
                    alt={PROFILE_DATA.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
              <div className="space-y-1.5">
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                  {PROFILE_DATA.name}
                </h2>
                <p className="text-sm sm:text-base font-semibold text-indigo-600 dark:text-indigo-400">
                  {PROFILE_DATA.headline} · {PROFILE_DATA.university}
                </p>
                <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs font-mono text-slate-600 dark:text-slate-400">
                  <span>{PROFILE_DATA.location}</span>
                  <span aria-hidden="true">·</span>
                  <a href={`mailto:${PROFILE_DATA.email}`} className="hover:underline">
                    {PROFILE_DATA.email}
                  </a>
                  <span aria-hidden="true">·</span>
                  <a href={PROFILE_DATA.website} target="_blank" rel="noopener noreferrer" className="hover:underline">
                    monirul.dev.cv
                  </a>
                  <span aria-hidden="true">·</span>
                  <a href={PROFILE_DATA.github} target="_blank" rel="noopener noreferrer" className="hover:underline">
                    github.com/monirul-dev
                  </a>
                  <span aria-hidden="true">·</span>
                  <a href={PROFILE_DATA.linkedin} target="_blank" rel="noopener noreferrer" className="hover:underline">
                    linkedin.com/in/monirul-dev
                  </a>
                </div>
              </div>
            </div>

            <div className="font-mono text-xs text-slate-500 dark:text-slate-400 md:text-right shrink-0">
              <div>B.Sc. in ICE @ PUST</div>
              <div className="text-slate-900 dark:text-white font-semibold mt-0.5">Session: 2024 – 2028</div>
              <div className="text-amber-600 dark:text-amber-400 font-semibold mt-0.5">Codeforces Max: 1350+</div>
            </div>
          </div>

          {/* Executive Summary */}
          <div className="space-y-2">
            <h3 className="text-sm font-bold tracking-tight text-slate-900 dark:text-white border-b border-slate-200 dark:border-slate-800 pb-1.5">
              01. Engineering Profile & Summary
            </h3>
            <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
              {PROFILE_DATA.bioLead} {PROFILE_DATA.bioExtended}
            </p>
          </div>

          {/* Education */}
          <div className="space-y-3">
            <h3 className="text-sm font-bold tracking-tight text-slate-900 dark:text-white border-b border-slate-200 dark:border-slate-800 pb-1.5">
              02. Academic Education
            </h3>
            <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
              <div>
                <h4 className="text-base font-bold text-slate-900 dark:text-white">{EDUCATION_DATA.degree}</h4>
                <p className="text-sm font-medium text-indigo-600 dark:text-indigo-400">
                  {EDUCATION_DATA.institution} — {EDUCATION_DATA.location}
                </p>
              </div>
              <span className="text-xs font-mono text-slate-600 dark:text-slate-400 shrink-0">
                {EDUCATION_DATA.period}
              </span>
            </div>
            <div className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              <strong className="text-slate-900 dark:text-slate-200">Core Engineering Coursework: </strong>
              {EDUCATION_DATA.coursework.map((c) => `${c.title} (${c.code})`).join(' · ')}
            </div>
          </div>

          {/* Technical Skills */}
          <div className="space-y-3">
            <h3 className="text-sm font-bold tracking-tight text-slate-900 dark:text-white border-b border-slate-200 dark:border-slate-800 pb-1.5">
              03. Technical Skills & Tooling
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
              {SKILL_GROUPS.map((group) => (
                <div key={group.id} className="leading-relaxed">
                  <strong className="text-slate-900 dark:text-white">{group.title}: </strong>
                  <span className="text-slate-700 dark:text-slate-300">
                    {group.items.map((i) => i.name).join(' · ')}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Selected Engineering Projects */}
          <div className="space-y-5">
            <h3 className="text-sm font-bold tracking-tight text-slate-900 dark:text-white border-b border-slate-200 dark:border-slate-800 pb-1.5">
              04. Selected Engineering Projects & Impact (STAR Format)
            </h3>
            <div className="space-y-5">
              {(cvFormat === 'ats' ? PROJECTS_DATA.slice(0, 4) : PROJECTS_DATA).map((proj) => (
                <div key={proj.id} className="space-y-1.5">
                  <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
                    <div className="flex items-center gap-2">
                      <h4 className="text-sm font-bold text-slate-900 dark:text-white">{proj.title}</h4>
                      <span className="text-xs text-slate-400">·</span>
                      <span className="text-xs font-mono text-indigo-600 dark:text-indigo-400">
                        {proj.tech.join(' / ')}
                      </span>
                    </div>
                    <span className="text-xs font-mono text-slate-500 tabular-nums">{proj.year}</span>
                  </div>
                  <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
                    <strong className="text-slate-900 dark:text-white">Context & Architecture: </strong>
                    {proj.architectureOverview}
                  </p>
                  <ul className="space-y-1 text-xs text-slate-600 dark:text-slate-400 pl-4 list-disc">
                    {proj.highlights.map((h, i) => (
                      <li key={i}>{h}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Competitive Programming & Certifications */}
          <div className="space-y-3">
            <h3 className="text-sm font-bold tracking-tight text-slate-900 dark:text-white border-b border-slate-200 dark:border-slate-800 pb-1.5">
              05. Competitive Programming & Honors
            </h3>
            <div className="space-y-2.5">
              {ACHIEVEMENTS_DATA.map((ach) => (
                <div key={ach.id} className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 text-xs">
                  <div>
                    <strong className="text-slate-900 dark:text-white">{ach.title}</strong>
                    <span className="text-slate-400 mx-1.5">—</span>
                    <span className="text-slate-700 dark:text-slate-300">{ach.description}</span>
                  </div>
                  <span className="font-mono text-slate-500 shrink-0 tabular-nums">{ach.year}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Interactive Footer inside CV (hidden on print) */}
          <div className="no-print pt-4 border-t border-slate-200 dark:border-slate-800 flex flex-wrap items-center justify-between gap-4 text-xs text-slate-500">
            <span>Verified Portfolio & Academic CV — Md. Monirul Islam (PUST ICE)</span>
            <button
              type="button"
              onClick={() => onNavigate('projects')}
              className="text-indigo-600 dark:text-indigo-400 hover:underline font-semibold flex items-center gap-1"
            >
              <span>Launch Live Interactive Project Demos</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
