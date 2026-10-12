import React, { useState, useEffect, useRef } from 'react';
import {
  ArrowRight,
  ArrowUpRight,
  Github,
  Linkedin,
  Mail,
  Globe,
  Camera,
  FileText,
  Sparkles,
  Sun,
  Moon,
  Cpu,
  CheckCircle2,
} from 'lucide-react';
import {
  PROFILE_DATA,
  SKILL_GROUPS,
  PROJECTS_DATA,
  EDUCATION_DATA,
  ACHIEVEMENTS_DATA,
  ProjectItem,
} from '../data/portfolioData';
import { ContactSection } from './ContactAndThankYou';

interface OverviewPageProps {
  avatarUrl: string;
  onUpdateAvatar: (newUrl: string) => void;
  onResetAvatar: () => void;
  isDark: boolean;
  onToggleTheme: () => void;
  onNavigate: (page: string, labTab?: 'dsa' | 'iot') => void;
  onSelectProject: (proj: ProjectItem) => void;
  onOpenAI: () => void;
  onContactSubmitted: (senderName: string) => void;
}

export const OverviewPage: React.FC<OverviewPageProps> = ({
  avatarUrl,
  onUpdateAvatar,
  onResetAvatar,
  isDark,
  onToggleTheme,
  onNavigate,
  onSelectProject,
  onOpenAI,
  onContactSubmitted,
}) => {
  // Typewriter Effect State
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayedRole, setDisplayedRole] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  // Skills Filter State
  const [skillFilter, setSkillFilter] = useState<'all' | 'languages' | 'web' | 'cs' | 'devops'>('all');

  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const currentFullWord = PROFILE_DATA.typewriterRoles[roleIndex];
    const typingSpeed = isDeleting ? 40 : 85;

    const timer = setTimeout(() => {
      if (!isDeleting && displayedRole.length < currentFullWord.length) {
        setDisplayedRole(currentFullWord.slice(0, displayedRole.length + 1));
      } else if (!isDeleting && displayedRole.length === currentFullWord.length) {
        setTimeout(() => setIsDeleting(true), 1800);
      } else if (isDeleting && displayedRole.length > 0) {
        setDisplayedRole(currentFullWord.slice(0, displayedRole.length - 1));
      } else if (isDeleting && displayedRole.length === 0) {
        setIsDeleting(false);
        setRoleIndex((prev) => (prev + 1) % PROFILE_DATA.typewriterRoles.length);
      }
    }, typingSpeed);

    return () => clearTimeout(timer);
  }, [displayedRole, isDeleting, roleIndex]);

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        onUpdateAvatar(reader.result);
      }
    };
    reader.readAsDataURL(file);
  };

  const filteredSkills =
    skillFilter === 'all' ? SKILL_GROUPS : SKILL_GROUPS.filter((g) => g.category === skillFilter);

  const featuredProjects = PROJECTS_DATA.filter((p) => p.featured);

  return (
    <div className="space-y-20">
      {/* HERO SECTION: Split-Screen + Full-Width KPI Row */}
      <section id="home" className="pt-4 sm:pt-8 space-y-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-stretch">
          {/* Left Column: Typographic Hierarchy & Actions */}
          <div className="lg:col-span-8 flex flex-col justify-between space-y-6">
            <div className="space-y-5">
              {/* Quiet Unboxed Kicker + Workspace Theme & AI Toolbar */}
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-200 dark:border-slate-800/80 pb-3">
                <div className="text-xs sm:text-sm font-mono text-indigo-600 dark:text-indigo-400 font-medium">
                  ICE Major @ Pabna University of Science and Technology (PUST)
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={onToggleTheme}
                    className="px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-900 hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-800 text-xs font-mono flex items-center gap-1.5 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                  >
                    {isDark ? <Sun className="w-3.5 h-3.5 text-amber-400" /> : <Moon className="w-3.5 h-3.5" />}
                    <span>{isDark ? 'Light Theme' : 'Dark Theme'}</span>
                  </button>
                  <button
                    type="button"
                    onClick={onOpenAI}
                    className="px-3 py-1.5 rounded-lg bg-indigo-600/10 hover:bg-indigo-600/20 text-indigo-600 dark:text-indigo-400 border border-indigo-500/30 text-xs font-mono font-medium flex items-center gap-1.5 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>AI Assistant</span>
                  </button>
                </div>
              </div>

              {/* Hero Display Headline & Typewriter */}
              <div className="space-y-2">
                <h1
                  className="text-3xl sm:text-5xl lg:text-[3.5rem] font-extrabold tracking-tight text-slate-900 dark:text-white leading-[1.1]"
                  style={{ textWrap: 'balance' }}
                >
                  Hi, I’m <span className="text-indigo-600 dark:text-indigo-400">{PROFILE_DATA.name}</span>
                </h1>
                <div className="h-8 flex items-center font-mono text-lg sm:text-2xl text-slate-700 dark:text-slate-300">
                  <span className="font-semibold text-slate-900 dark:text-white">{displayedRole}</span>
                  <span className="ml-1 text-indigo-600 dark:text-indigo-400">|</span>
                </div>
              </div>

              {/* Lead Engineering Prose */}
              <p className="text-slate-700 dark:text-slate-300 text-sm sm:text-base lg:text-lg max-w-2xl leading-relaxed">
                Undergraduate engineering student in{' '}
                <strong className="text-slate-900 dark:text-white font-semibold">
                  Information and Communication Engineering (ICE)
                </strong>{' '}
                at <strong className="text-indigo-600 dark:text-indigo-400 font-semibold">PUST</strong>. Specialized in
                Data Structures, Algorithm Optimization, Modern Web Architectures, and RESTful Microservices.
              </p>
            </div>

            {/* Primary & Secondary Actions + Social Links */}
            <div className="space-y-6 pt-2">
              <div className="flex flex-wrap items-center gap-3">
                <button
                  type="button"
                  onClick={() => onNavigate('projects')}
                  className="px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-sm shadow-md transition-colors flex items-center gap-2 whitespace-nowrap shrink-0 cursor-pointer"
                >
                  <span>Explore Projects & Live Lab</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => onNavigate('cv')}
                  className="px-5 py-3 rounded-xl bg-slate-100 dark:bg-slate-800/90 hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-900 dark:text-slate-200 font-semibold text-sm border border-slate-300 dark:border-slate-700 transition-colors flex items-center gap-2 whitespace-nowrap shrink-0 cursor-pointer"
                >
                  <FileText className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                  <span>View Printable CV</span>
                </button>
                <a
                  href="#contact"
                  className="px-5 py-3 rounded-xl border border-slate-300 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-900 text-slate-700 dark:text-slate-300 font-semibold text-sm transition-colors whitespace-nowrap shrink-0"
                >
                  Contact Me
                </a>
              </div>

              {/* Clean Social Links */}
              <div className="flex flex-wrap items-center gap-5 text-xs font-mono text-slate-600 dark:text-slate-400 pt-1">
                <a
                  href={PROFILE_DATA.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                >
                  <Github className="w-4 h-4" />
                  <span>github.com/monirul-dev</span>
                </a>
                <span aria-hidden="true">·</span>
                <a
                  href={PROFILE_DATA.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                >
                  <Linkedin className="w-4 h-4" />
                  <span>linkedin.com/in/monirul-dev</span>
                </a>
                <span aria-hidden="true">·</span>
                <a
                  href={`mailto:${PROFILE_DATA.email}`}
                  className="flex items-center gap-2 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                >
                  <Mail className="w-4 h-4" />
                  <span>{PROFILE_DATA.email}</span>
                </a>
                <span aria-hidden="true">·</span>
                <a
                  href={PROFILE_DATA.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                >
                  <Globe className="w-4 h-4" />
                  <span>monirul.dev.cv</span>
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: Developer Identity Card with Custom Photo Upload */}
          <div className="lg:col-span-4 flex">
            <div className="w-full rounded-2xl bg-white dark:bg-[#0e1422] border border-slate-200 dark:border-slate-800 p-6 flex flex-col items-center justify-between text-center shadow-sm">
              <div className="w-full flex items-center justify-between text-[11px] font-mono text-slate-500 dark:text-slate-400 border-b border-slate-100 dark:border-slate-800/80 pb-3">
                <span>PUST · ICE DEPT</span>
                <span>2024 – 2028</span>
              </div>

              <div className="my-5 flex flex-col items-center">
                <div className="relative w-32 h-32 sm:w-36 sm:h-36 rounded-full overflow-hidden border-2 border-indigo-500/50 bg-slate-900 shadow-md">
                  <img
                    src={avatarUrl}
                    alt={PROFILE_DATA.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                </div>

                <h2 className="font-bold text-xl text-slate-900 dark:text-white mt-4">{PROFILE_DATA.name}</h2>
                <p className="text-xs font-mono text-indigo-600 dark:text-indigo-400 mt-1">{PROFILE_DATA.email}</p>
                <p className="text-xs font-mono text-slate-600 dark:text-slate-400 mt-0.5">
                  B.Sc. in ICE · PUST, Pabna
                </p>
              </div>

              {/* Custom Photo Uploader Control */}
              <div className="w-full pt-3 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-center gap-2">
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handlePhotoUpload}
                  className="hidden"
                />
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-800/90 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 text-xs font-mono flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <Camera className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
                  <span>Upload myprofile.png</span>
                </button>
                {avatarUrl !== PROFILE_DATA.defaultAvatar && (
                  <button
                    type="button"
                    onClick={onResetAvatar}
                    className="px-2.5 py-1.5 rounded-lg text-xs font-mono text-slate-500 hover:text-slate-800 dark:hover:text-slate-200"
                  >
                    Reset
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Full-Width 4-Column Quantitative KPI Strip Below Hero Split */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {PROFILE_DATA.kpis.map((kpi) => (
            <div
              key={kpi.label}
              className="p-5 rounded-2xl bg-white dark:bg-[#0e1422] border border-slate-200 dark:border-slate-800 space-y-1"
            >
              <div className="text-2xl sm:text-3xl font-extrabold font-mono text-slate-900 dark:text-white tabular-nums">
                {kpi.value}
              </div>
              <div className="text-xs sm:text-sm font-bold text-indigo-600 dark:text-indigo-400">{kpi.label}</div>
              <div className="text-xs font-mono text-slate-500 dark:text-slate-400">{kpi.context}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Editorial Section Divider */}
      <div className="py-3 border-y border-slate-200 dark:border-slate-800/80 text-center font-mono text-xs text-slate-500 dark:text-slate-400 tracking-wide overflow-hidden whitespace-nowrap">
        selected engineering works · full-stack web architecture · c++20 competitive programming · esp32 iot telemetry ·
        pust ice department
      </div>

      {/* SECTION 01: ABOUT ME & ENGINEERING FOCUS */}
      <section id="about" className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2">
          <div>
            <div className="text-xs font-mono text-indigo-600 dark:text-indigo-400">01. Profile & Architecture</div>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white tracking-tight mt-1">
              About Me & Engineering Overview
            </h2>
          </div>
          <button
            type="button"
            onClick={() => onNavigate('cv')}
            className="text-xs font-mono font-semibold text-indigo-600 dark:text-indigo-400 hover:underline flex items-center gap-1 self-start sm:self-auto"
          >
            <span>Read Full Academic CV</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0e1422] p-6 sm:p-8 space-y-5 flex flex-col justify-between">
            <div className="space-y-4 text-sm sm:text-base text-slate-700 dark:text-slate-300 leading-relaxed">
              <p>
                I am an engineering undergraduate studying{' '}
                <strong className="text-slate-900 dark:text-white">
                  Information and Communication Engineering (ICE)
                </strong>{' '}
                at{' '}
                <strong className="text-indigo-600 dark:text-indigo-400">
                  Pabna University of Science and Technology (PUST)
                </strong>
                .
              </p>
              <p>
                My primary technical focus is building high-performance web systems using{' '}
                <strong className="text-slate-900 dark:text-white">
                  C++, JavaScript (ES6+), TypeScript, React.js, Node.js, Express, MongoDB, PostgreSQL, and Docker
                </strong>
                . I combine core telecommunication and computer network fundamentals with modern software engineering
                practices.
              </p>
            </div>

            <div className="pt-4 border-t border-slate-200 dark:border-slate-800 grid grid-cols-1 sm:grid-cols-3 gap-4 font-mono text-xs tabular-nums">
              <div>
                <span className="block text-slate-500 dark:text-slate-400">Institution</span>
                <strong className="text-sm text-slate-900 dark:text-white mt-0.5 block">PUST, Bangladesh</strong>
              </div>
              <div>
                <span className="block text-slate-500 dark:text-slate-400">Department & Batch</span>
                <strong className="text-sm text-slate-900 dark:text-white mt-0.5 block">ICE (2024 – 2028)</strong>
              </div>
              <div>
                <span className="block text-slate-500 dark:text-slate-400">Codeforces Max</span>
                <strong className="text-sm text-amber-600 dark:text-amber-400 mt-0.5 block">1350+ Rating</strong>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0e1422] p-6 sm:p-8 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <h3 className="font-bold text-lg text-slate-900 dark:text-white">Core Engineering Focus</h3>
              <ul className="space-y-3 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                  <span>Scalable Full-Stack Architecture & RESTful Microservices.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                  <span>Algorithm Optimization, Graph Theory & Memory Efficiency.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                  <span>IoT Smart Telemetry Systems & Network Communication.</span>
                </li>
              </ul>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs font-serif-editorial italic text-slate-700 dark:text-slate-300">
              “{PROFILE_DATA.engineeringPhilosophy}”
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 02: TECHNICAL SKILLS MATRIX */}
      <section id="skills" className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="text-xs font-mono text-indigo-600 dark:text-indigo-400">02. Technical Stack</div>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white tracking-tight mt-1">
              Technical Skills & Competencies
            </h2>
          </div>

          {/* Interactive Filter Controls */}
          <div className="flex flex-wrap items-center gap-1 p-1 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
            {[
              { id: 'all', label: 'All Domains' },
              { id: 'languages', label: 'Languages' },
              { id: 'web', label: 'Web & Databases' },
              { id: 'cs', label: 'Core CS & ICE' },
              { id: 'devops', label: 'DevOps & Tools' },
            ].map((btn) => (
              <button
                key={btn.id}
                type="button"
                onClick={() => setSkillFilter(btn.id as typeof skillFilter)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                  skillFilter === btn.id
                    ? 'bg-indigo-600 text-white shadow-xs'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                {btn.label}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredSkills.map((group) => (
            <div
              key={group.id}
              className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0e1422] p-6 space-y-4"
            >
              <div className="border-b border-slate-100 dark:border-slate-800/80 pb-3">
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">{group.title}</h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{group.summary}</p>
              </div>

              <div className="divide-y divide-slate-100 dark:divide-slate-800/60">
                {group.items.map((skill) => (
                  <div key={skill.name} className="py-2.5 flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 text-xs">
                    <div className="font-mono font-semibold text-slate-900 dark:text-white">
                      {skill.name}{' '}
                      <span className="font-normal text-indigo-600 dark:text-indigo-400">· {skill.level}</span>
                    </div>
                    <div className="text-slate-600 dark:text-slate-400 sm:text-right">{skill.context}</div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* SECTION 03: FEATURED PROJECTS (DYNAMIC BENTO GRID) */}
      <section id="projects" className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3">
          <div>
            <div className="text-xs font-mono text-indigo-600 dark:text-indigo-400">
              03. Selected Works · STAR Case Studies
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white tracking-tight mt-1">
              Featured Engineering Projects
            </h2>
          </div>
          <button
            type="button"
            onClick={() => onNavigate('projects')}
            className="text-xs font-mono font-semibold text-indigo-600 dark:text-indigo-400 hover:underline flex items-center gap-1 self-start sm:self-auto cursor-pointer"
          >
            <span>Open All 6 Projects & Live Interactive Lab</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Media-First Bento Grid: Wide Card + 2 Sibling Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {featuredProjects.map((proj, index) => (
            <div
              key={proj.id}
              className={`rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0e1422] overflow-hidden flex flex-col justify-between group hover:border-indigo-500/60 transition-colors ${
                index === 0 ? 'lg:col-span-2 lg:grid lg:grid-cols-12' : ''
              }`}
            >
              {/* Image Container */}
              <div
                className={`relative bg-slate-900 overflow-hidden ${
                  index === 0 ? 'lg:col-span-6 min-h-[260px] lg:min-h-full' : 'h-52'
                }`}
              >
                <img
                  src={proj.image}
                  alt={proj.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 opacity-90"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent p-6 flex flex-col justify-between">
                  <div className="flex items-center justify-between text-xs font-mono text-slate-300">
                    <span>
                      {proj.categoryLabel} · {proj.year}
                    </span>
                    <div className="flex items-center gap-2">
                      <a
                        href={proj.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        title="GitHub Repository"
                        className="p-2 rounded-lg bg-black/60 hover:bg-indigo-600 text-white transition-colors"
                      >
                        <Github className="w-3.5 h-3.5" />
                      </a>
                    </div>
                  </div>
                  <div>
                    <div className="text-xs font-mono text-emerald-400 mb-1">
                      {proj.metrics.join(' · ')}
                    </div>
                    <h3 className="text-xl sm:text-2xl font-bold text-white leading-tight">{proj.title}</h3>
                  </div>
                </div>
              </div>

              {/* Content & STAR Breakdown */}
              <div
                className={`p-6 sm:p-8 flex flex-col justify-between space-y-6 ${
                  index === 0 ? 'lg:col-span-6' : ''
                }`}
              >
                <div className="space-y-3 text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                  <p>
                    <strong className="text-slate-900 dark:text-white">Situation: </strong>
                    {proj.star.situation}
                  </p>
                  <p>
                    <strong className="text-slate-900 dark:text-white">Task: </strong>
                    {proj.star.task}
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

                <div className="space-y-4 pt-2 border-t border-slate-100 dark:border-slate-800/80">
                  <div className="text-xs font-mono text-slate-500 dark:text-slate-400">
                    {proj.tech.join(' · ')}
                  </div>

                  <div className="flex flex-wrap items-center gap-3">
                    <button
                      type="button"
                      onClick={() => onSelectProject(proj)}
                      className="px-4 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-indigo-600 dark:hover:bg-indigo-600 text-slate-900 dark:text-white hover:text-white text-xs font-semibold transition-colors flex items-center gap-1.5 whitespace-nowrap shrink-0 cursor-pointer"
                    >
                      <span>View Tech Specs & Code</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </button>

                    {proj.hasInteractiveDemo && (
                      <button
                        type="button"
                        onClick={() =>
                          onNavigate('projects', proj.hasInteractiveDemo === 'iot-telemetry' ? 'iot' : 'dsa')
                        }
                        className="px-4 py-2.5 rounded-xl bg-indigo-600/10 hover:bg-indigo-600 text-indigo-600 dark:text-indigo-400 hover:text-white border border-indigo-500/30 text-xs font-semibold transition-colors flex items-center gap-1.5 whitespace-nowrap shrink-0 cursor-pointer"
                      >
                        <Cpu className="w-3.5 h-3.5" />
                        <span>Launch Interactive Simulator</span>
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* SECTION 04: EDUCATION & ACHIEVEMENTS */}
      <section id="education" className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2">
          <div>
            <div className="text-xs font-mono text-indigo-600 dark:text-indigo-400">
              04. Academic Credentials & Honors
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white tracking-tight mt-1">
              Education & Competitive Achievements
            </h2>
          </div>
          <button
            type="button"
            onClick={() => onNavigate('research')}
            className="text-xs font-mono font-semibold text-indigo-600 dark:text-indigo-400 hover:underline flex items-center gap-1 self-start sm:self-auto cursor-pointer"
          >
            <span>Explore C++20 CP Templates & Research Notes</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* PUST Degree Card */}
        <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0e1422] p-6 sm:p-8 space-y-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-6">
            <div className="space-y-1">
              <div className="text-xs font-mono text-emerald-600 dark:text-emerald-400 font-semibold">
                {EDUCATION_DATA.status}
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
                {EDUCATION_DATA.degree}
              </h3>
              <p className="text-sm font-semibold text-indigo-600 dark:text-indigo-400">
                {EDUCATION_DATA.institution} · {EDUCATION_DATA.location}
              </p>
            </div>
            <div className="font-mono text-xs sm:text-sm text-slate-700 dark:text-slate-300 bg-slate-50 dark:bg-slate-900 px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 shrink-0 tabular-nums">
              {EDUCATION_DATA.period}
            </div>
          </div>

          <div className="space-y-3">
            <h4 className="text-xs font-mono font-semibold text-slate-500 dark:text-slate-400">
              Key Undergraduate Engineering Coursework
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {EDUCATION_DATA.coursework.map((course) => (
                <div
                  key={course.code}
                  className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800/80 space-y-1"
                >
                  <div className="text-xs font-mono text-indigo-600 dark:text-indigo-400 font-semibold">
                    {course.code}
                  </div>
                  <div className="text-sm font-bold text-slate-900 dark:text-white">{course.title}</div>
                  <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">{course.focus}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Achievements Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {ACHIEVEMENTS_DATA.map((item) => (
            <div
              key={item.id}
              className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0e1422] p-6 space-y-3 flex flex-col justify-between"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs font-mono text-slate-500 dark:text-slate-400 tabular-nums">
                  <span>{item.year}</span>
                  <span className="text-amber-600 dark:text-amber-400 font-semibold">{item.metric}</span>
                </div>
                <h3 className="text-base font-bold text-slate-900 dark:text-white leading-snug">{item.title}</h3>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">{item.description}</p>
              </div>
              <div className="text-xs font-mono text-indigo-600 dark:text-indigo-400 pt-2 border-t border-slate-100 dark:border-slate-800/80">
                {item.organization}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* SECTION 05: GET IN TOUCH */}
      <ContactSection onSubmitted={onContactSubmitted} />
    </div>
  );
};
