import React, { useState } from 'react';
import { Copy, Check, BookOpen, Terminal, Award, ArrowRight } from 'lucide-react';
import { CP_STATS, CP_TEMPLATES, TECHNICAL_ARTICLES, TechnicalArticle } from '../data/portfolioData';

export const ResearchCPPage: React.FC = () => {
  const [selectedTemplateId, setSelectedTemplateId] = useState<string>(CP_TEMPLATES[0].id);
  const [copiedCode, setCopiedCode] = useState<boolean>(false);
  const [activeArticle, setActiveArticle] = useState<TechnicalArticle>(TECHNICAL_ARTICLES[0]);

  const currentTemplate = CP_TEMPLATES.find((t) => t.id === selectedTemplateId) || CP_TEMPLATES[0];

  const handleCopyCode = () => {
    navigator.clipboard.writeText(currentTemplate.code);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  return (
    <div className="space-y-16">
      {/* Page Header */}
      <div className="space-y-3 border-b border-slate-200 dark:border-slate-800 pb-8">
        <div className="text-xs font-mono text-indigo-600 dark:text-indigo-400">
          Algorithmic Problem Solving · C++20 Reference Library · Engineering Notes
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          Competitive Programming & Engineering Research
        </h1>
        <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 max-w-3xl leading-relaxed">
          Documenting 200+ solved algorithmic challenges across Codeforces, LeetCode, and Beecrowd alongside technical
          notes on backend database optimization, memory visualization, and embedded telemetry at PUST.
        </p>
      </div>

      {/* Section 1: Competitive Programming Platforms & Topic Breakdown */}
      <section className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white tracking-tight">
              01. Competitive Programming Profile
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-1">
              Consistent algorithmic practice in C++20 focusing on graph theory, trees, and dynamic programming.
            </p>
          </div>
          <div className="font-mono text-xs text-amber-600 dark:text-amber-400 font-semibold tabular-nums">
            Total Solved: {CP_STATS.totalSolved}+ · Codeforces Max: {CP_STATS.codeforcesMaxRating}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {CP_STATS.platforms.map((plat) => (
            <div
              key={plat.name}
              className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0e1422] p-6 space-y-3"
            >
              <div className="flex items-center justify-between text-xs font-mono text-slate-500 dark:text-slate-400">
                <span>{plat.name}</span>
                <span className="text-indigo-600 dark:text-indigo-400">@{plat.handle}</span>
              </div>
              <div className="text-2xl font-bold text-slate-900 dark:text-white font-mono tabular-nums">
                {plat.solved}
              </div>
              <div className="text-xs font-semibold text-amber-600 dark:text-amber-400 font-mono">
                {plat.metric}
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed pt-2 border-t border-slate-100 dark:border-slate-800/80">
                {plat.focus}
              </p>
            </div>
          ))}
        </div>

        {/* Topic Distribution Bars */}
        <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0e1422] p-6 sm:p-8 space-y-4">
          <h3 className="text-sm font-bold text-slate-900 dark:text-white">
            Algorithmic Domain Distribution (215+ Verified Submissions)
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
            {CP_STATS.topicDistribution.map((item) => (
              <div key={item.topic} className="space-y-1.5">
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="text-slate-700 dark:text-slate-300">{item.topic}</span>
                  <span className="text-slate-900 dark:text-white font-semibold tabular-nums">
                    {item.count} problems
                  </span>
                </div>
                <div className="w-full h-2 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                  <div
                    className="h-full rounded-full bg-indigo-600 dark:bg-indigo-500"
                    style={{ width: `${item.percentage}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 2: C++20 Algorithm Template Explorer */}
      <section className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white tracking-tight">
              02. C++20 Competitive Programming Reference Templates
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-1">
              Battle-tested C++ templates authored by Md. Monirul Islam for contests and systems labs.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-1.5 p-1 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
            {CP_TEMPLATES.map((tpl) => (
              <button
                key={tpl.id}
                type="button"
                onClick={() => setSelectedTemplateId(tpl.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors whitespace-nowrap shrink-0 ${
                  selectedTemplateId === tpl.id
                    ? 'bg-indigo-600 text-white'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                {tpl.title.split(' ')[0]} {tpl.title.split(' ')[1]}
              </button>
            ))}
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-950 text-slate-100 overflow-hidden">
          <div className="px-6 py-4 bg-slate-900 border-b border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <div className="text-xs font-mono text-indigo-400">
                {currentTemplate.topic} · {currentTemplate.complexity}
              </div>
              <h3 className="text-base font-bold text-white mt-0.5">{currentTemplate.title}</h3>
            </div>
            <button
              type="button"
              onClick={handleCopyCode}
              className="px-3.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-mono font-medium border border-slate-700 transition-colors flex items-center gap-1.5 self-start sm:self-auto whitespace-nowrap shrink-0"
            >
              {copiedCode ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedCode ? 'Copied C++20' : 'Copy Template'}</span>
            </button>
          </div>
          <div className="px-6 py-3 bg-slate-900/50 border-b border-slate-800/80 text-xs text-slate-300">
            {currentTemplate.description}
          </div>
          <pre className="p-6 font-mono text-xs text-slate-200 overflow-x-auto leading-relaxed">
            <code>{currentTemplate.code}</code>
          </pre>
        </div>
      </section>

      {/* Section 3: Technical Engineering Notes & Articles */}
      <section className="space-y-6">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white tracking-tight">
            03. Engineering Notes & Architecture Deep-Dives
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-1">
            Detailed post-mortems and architectural notes from software and ICE hardware lab projects.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Article Selector List */}
          <div className="space-y-3">
            {TECHNICAL_ARTICLES.map((article) => {
              const isSelected = article.id === activeArticle.id;
              return (
                <button
                  key={article.id}
                  type="button"
                  onClick={() => setActiveArticle(article)}
                  className={`w-full text-left p-5 rounded-2xl border transition-all space-y-2 ${
                    isSelected
                      ? 'bg-white dark:bg-[#131c31] border-indigo-500 shadow-sm'
                      : 'bg-white/70 dark:bg-[#0e1422] border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center gap-2 text-xs font-mono text-slate-500 dark:text-slate-400">
                    <span>{article.category}</span>
                    <span aria-hidden="true">·</span>
                    <span>{article.readTime}</span>
                  </div>
                  <h3 className="text-sm font-bold text-slate-900 dark:text-white leading-snug">
                    {article.title}
                  </h3>
                  <div className="flex items-center gap-1 text-xs font-semibold text-indigo-600 dark:text-indigo-400 pt-1">
                    <span>Read Technical Note</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                </button>
              );
            })}
          </div>

          {/* Active Article Reader */}
          <article className="lg:col-span-2 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0e1422] p-6 sm:p-8 space-y-6">
            <div className="space-y-2 border-b border-slate-200 dark:border-slate-800 pb-6">
              <div className="flex flex-wrap items-center gap-2 text-xs font-mono text-indigo-600 dark:text-indigo-400">
                <BookOpen className="w-3.5 h-3.5" />
                <span>{activeArticle.category}</span>
                <span aria-hidden="true">·</span>
                <span>Published {activeArticle.date}</span>
                <span aria-hidden="true">·</span>
                <span>{activeArticle.readTime}</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white tracking-tight">
                {activeArticle.title}
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">{activeArticle.summary}</p>
            </div>

            <div className="space-y-6">
              {activeArticle.sections.map((sec, idx) => (
                <div key={idx} className="space-y-2.5">
                  <h4 className="text-base font-bold text-slate-900 dark:text-white">{sec.heading}</h4>
                  <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">{sec.body}</p>
                  {sec.code && (
                    <pre className="p-4 rounded-xl bg-slate-950 text-slate-200 font-mono text-xs overflow-x-auto border border-slate-800">
                      <code>{sec.code}</code>
                    </pre>
                  )}
                </div>
              ))}
            </div>
          </article>
        </div>
      </section>
    </div>
  );
};
