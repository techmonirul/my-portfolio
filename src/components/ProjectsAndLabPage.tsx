import React, { useState } from 'react';
import { ExternalLink, Github, Cpu, ArrowUpRight } from 'lucide-react';
import { PROJECTS_DATA, ProjectItem } from '../data/portfolioData';
import { InteractiveLabs } from './InteractiveLabs';

interface ProjectsAndLabPageProps {
  onSelectProject: (proj: ProjectItem) => void;
  initialLabTab?: 'dsa' | 'iot';
}

export const ProjectsAndLabPage: React.FC<ProjectsAndLabPageProps> = ({
  onSelectProject,
  initialLabTab = 'dsa',
}) => {
  const [filter, setFilter] = useState<'all' | 'fullstack' | 'algorithms' | 'iot' | 'systems'>('all');
  const [labTab, setLabTab] = useState<'dsa' | 'iot'>(initialLabTab);

  const filteredProjects =
    filter === 'all' ? PROJECTS_DATA : PROJECTS_DATA.filter((p) => p.category === filter);

  return (
    <div className="space-y-16">
      {/* Page Header */}
      <div className="space-y-3 border-b border-slate-200 dark:border-slate-800 pb-8">
        <div className="text-xs font-mono text-indigo-600 dark:text-indigo-400">
          Software Architecture · Interactive DSA Engine · Embedded IoT Telemetry
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          Engineering Projects & Live Simulation Lab
        </h1>
        <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 max-w-3xl leading-relaxed">
          Explore full-stack systems, C++ algorithmic visualizers, and embedded ESP32 hardware nodes engineered by Md.
          Monirul Islam—complete with STAR case studies and an interactive browser workbench below.
        </p>
      </div>

      {/* Live Interactive Engineering Workbench */}
      <section id="interactive-workbench" className="space-y-4">
        <InteractiveLabs initialTab={labTab} />
      </section>

      {/* Complete Project Archive with Segmented Filter */}
      <section className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">
              Complete Engineering Archive ({filteredProjects.length} Systems)
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-1">
              Click any project card to inspect the STAR breakdown, system architecture, and source code snippet.
            </p>
          </div>

          {/* Interactive Filter Controls */}
          <div className="flex flex-wrap items-center gap-1 p-1 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
            {[
              { id: 'all', label: 'All Projects' },
              { id: 'fullstack', label: 'Full-Stack & DB' },
              { id: 'algorithms', label: 'Algorithms & CP' },
              { id: 'iot', label: 'IoT & Hardware' },
              { id: 'systems', label: 'ICE Signals' },
            ].map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setFilter(tab.id as typeof filter)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors whitespace-nowrap shrink-0 ${
                  filter === tab.id
                    ? 'bg-indigo-600 text-white shadow-xs'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((proj) => (
            <div
              key={proj.id}
              className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0e1422] overflow-hidden flex flex-col justify-between group hover:border-indigo-500/60 transition-colors"
            >
              <div>
                {/* Media Frame with Resilient Fallback */}
                <div className="relative h-48 bg-slate-900 overflow-hidden">
                  <img
                    src={proj.image}
                    alt={proj.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 opacity-90"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-transparent p-5 flex flex-col justify-between">
                    <div className="flex items-center justify-between text-xs font-mono text-slate-300">
                      <span>
                        {proj.categoryLabel} · {proj.year}
                      </span>
                      <div className="flex items-center gap-2">
                        <a
                          href={proj.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          title="GitHub Repository"
                          className="p-1.5 rounded-lg bg-black/60 hover:bg-indigo-600 text-white transition-colors"
                        >
                          <Github className="w-3.5 h-3.5" />
                        </a>
                        {proj.liveUrl && (
                          <a
                            href={proj.liveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(e) => e.stopPropagation()}
                            title="Live Preview"
                            className="p-1.5 rounded-lg bg-black/60 hover:bg-indigo-600 text-white transition-colors"
                          >
                            <ExternalLink className="w-3.5 h-3.5" />
                          </a>
                        )}
                      </div>
                    </div>
                    <h3 className="text-lg font-bold text-white leading-snug">{proj.title}</h3>
                  </div>
                </div>

                {/* STAR Summary */}
                <div className="p-5 space-y-3 text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
                  <p>
                    <strong className="text-slate-900 dark:text-white">Situation & Task: </strong>
                    {proj.star.situation}
                  </p>
                  <p>
                    <strong className="text-slate-900 dark:text-white">Action: </strong>
                    {proj.star.action}
                  </p>
                  <p className="text-emerald-600 dark:text-emerald-400 font-semibold">
                    <strong>Result: </strong>
                    {proj.star.result}
                  </p>
                </div>
              </div>

              <div className="p-5 pt-0 space-y-4">
                {/* Clean Unboxed Metadata */}
                <div className="text-[11px] font-mono text-slate-500 dark:text-slate-400 border-t border-slate-100 dark:border-slate-800/80 pt-3">
                  {proj.tech.join(' · ')}
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => onSelectProject(proj)}
                    className="flex-1 py-2.5 px-3 rounded-xl bg-slate-100 dark:bg-slate-800/90 hover:bg-indigo-600 dark:hover:bg-indigo-600 text-slate-800 dark:text-slate-200 hover:text-white text-xs font-semibold transition-colors flex items-center justify-center gap-1.5 whitespace-nowrap shrink-0 cursor-pointer"
                  >
                    <span>View Tech Specs</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </button>
                  {proj.hasInteractiveDemo && (
                    <button
                      type="button"
                      onClick={() => {
                        setLabTab(proj.hasInteractiveDemo === 'iot-telemetry' ? 'iot' : 'dsa');
                        document.getElementById('interactive-workbench')?.scrollIntoView({ behavior: 'smooth' });
                      }}
                      title="Test Live in Browser Workbench"
                      className="py-2.5 px-3 rounded-xl bg-indigo-600/10 hover:bg-indigo-600 text-indigo-600 dark:text-indigo-400 hover:text-white border border-indigo-500/30 text-xs font-semibold transition-colors flex items-center gap-1 whitespace-nowrap shrink-0 cursor-pointer"
                    >
                      <Cpu className="w-3.5 h-3.5" />
                      <span>Live Lab</span>
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
