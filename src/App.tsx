/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { PROFILE_DATA, ProjectItem } from './data/portfolioData';
import { OverviewPage } from './components/OverviewPage';
import { ProjectsAndLabPage } from './components/ProjectsAndLabPage';
import { InteractiveCVPage } from './components/InteractiveCVPage';
import { ResearchCPPage } from './components/ResearchCPPage';
import { ContactSection, ThankYouView } from './components/ContactAndThankYou';
import { ProjectSpecModal } from './components/ProjectSpecModal';
import { AIChatbot } from './components/AIChatbot';

type PageKey = 'overview' | 'projects' | 'cv' | 'research' | 'contact' | 'thankyou';

export default function App() {
  const [activePage, setActivePage] = useState<PageKey>('overview');
  const [labTab, setLabTab] = useState<'dsa' | 'iot'>('dsa');
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);
  const [isAIChatOpen, setIsAIChatOpen] = useState<boolean>(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  const [thankYouRecipient, setThankYouRecipient] = useState<string>('Friend');
  const [isDark, setIsDark] = useState<boolean>(true);
  const [avatarUrl, setAvatarUrl] = useState<string>(PROFILE_DATA.defaultAvatar);

  // Initialize theme, saved avatar, and URL query params (e.g., ?name=Alex)
  useEffect(() => {
    const savedTheme = localStorage.getItem('monirul_theme');
    if (savedTheme === 'light') {
      setIsDark(false);
      document.documentElement.classList.remove('dark');
    } else {
      setIsDark(true);
      document.documentElement.classList.add('dark');
    }

    const savedAvatar = localStorage.getItem('monirul_custom_avatar');
    if (savedAvatar) {
      setAvatarUrl(savedAvatar);
    }

    const params = new URLSearchParams(window.location.search);
    const nameParam = params.get('name');
    const pageParam = params.get('page') as PageKey | null;
    if (nameParam && nameParam.trim() !== '') {
      setThankYouRecipient(nameParam.trim());
      setActivePage('thankyou');
    } else if (pageParam && ['overview', 'projects', 'cv', 'research', 'contact', 'thankyou'].includes(pageParam)) {
      setActivePage(pageParam);
    }
  }, []);

  const toggleTheme = () => {
    setIsDark((prev) => {
      const next = !prev;
      if (next) {
        document.documentElement.classList.add('dark');
        localStorage.setItem('monirul_theme', 'dark');
      } else {
        document.documentElement.classList.remove('dark');
        localStorage.setItem('monirul_theme', 'light');
      }
      return next;
    });
  };

  const handleUpdateAvatar = (newUrl: string) => {
    setAvatarUrl(newUrl);
    try {
      localStorage.setItem('monirul_custom_avatar', newUrl);
    } catch {
      // Ignore storage quota errors for large base64 images
    }
  };

  const handleResetAvatar = () => {
    setAvatarUrl(PROFILE_DATA.defaultAvatar);
    localStorage.removeItem('monirul_custom_avatar');
  };

  const navigateTo = (page: string, targetLabTab?: 'dsa' | 'iot') => {
    if (targetLabTab) {
      setLabTab(targetLabTab);
    }
    setActivePage(page as PageKey);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleContactSubmitted = (senderName: string) => {
    setThankYouRecipient(senderName || 'Friend');
    setActivePage('thankyou');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navItems: { id: PageKey; label: string }[] = [
    { id: 'overview', label: 'Overview' },
    { id: 'projects', label: 'Projects & Lab' },
    { id: 'cv', label: 'Interactive CV' },
    { id: 'research', label: 'Research & CP' },
    { id: 'contact', label: 'Contact' },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-[#f8fafc] dark:bg-[#090d16] text-slate-900 dark:text-slate-100 transition-colors duration-150">
      {/* Strict 3-Zone Top Bar Contract */}
      <header className="no-print sticky top-0 z-40 backdrop-blur-md bg-white/90 dark:bg-[#090d16]/90 border-b border-slate-200 dark:border-slate-800/90">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-8">
          {/* Zone 1: Single text element wordmark */}
          <button
            type="button"
            onClick={() => navigateTo('overview')}
            className="text-lg font-extrabold tracking-tight text-slate-900 dark:text-white whitespace-nowrap shrink-0 cursor-pointer"
          >
            Md. Monirul Islam
          </button>

          {/* Zone 2: 5 concise single-line text navigation links */}
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-600 dark:text-slate-300">
            {navItems.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => navigateTo(item.id)}
                className={`py-1 transition-colors whitespace-nowrap shrink-0 cursor-pointer border-b-2 ${
                  activePage === item.id
                    ? 'text-indigo-600 dark:text-indigo-400 border-indigo-600 dark:border-indigo-400 font-semibold'
                    : 'border-transparent hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* Zone 3: 1 primary action */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              type="button"
              onClick={() => setIsAIChatOpen((prev) => !prev)}
              className="px-4 py-2 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-500 rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            >
              Ask AI Assistant
            </button>
            <button
              type="button"
              onClick={() => setMobileMenuOpen((prev) => !prev)}
              aria-label="Toggle navigation menu"
              className="md:hidden p-2 rounded-lg text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="md:hidden border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-[#090d16] px-4 py-3 space-y-1">
            {navItems.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => navigateTo(item.id)}
                className={`block w-full text-left px-3 py-2 rounded-lg text-sm font-medium ${
                  activePage === item.id
                    ? 'bg-indigo-600/10 text-indigo-600 dark:text-indigo-400 font-semibold'
                    : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        )}
      </header>

      {/* Main Content Area */}
      <main className="flex-grow max-w-6xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {activePage === 'overview' && (
          <OverviewPage
            avatarUrl={avatarUrl}
            onUpdateAvatar={handleUpdateAvatar}
            onResetAvatar={handleResetAvatar}
            isDark={isDark}
            onToggleTheme={toggleTheme}
            onNavigate={navigateTo}
            onSelectProject={(proj) => setSelectedProject(proj)}
            onOpenAI={() => setIsAIChatOpen(true)}
            onContactSubmitted={handleContactSubmitted}
          />
        )}

        {activePage === 'projects' && (
          <ProjectsAndLabPage
            onSelectProject={(proj) => setSelectedProject(proj)}
            initialLabTab={labTab}
          />
        )}

        {activePage === 'cv' && (
          <InteractiveCVPage avatarUrl={avatarUrl} onNavigate={navigateTo} />
        )}

        {activePage === 'research' && <ResearchCPPage />}

        {activePage === 'contact' && (
          <ContactSection onSubmitted={handleContactSubmitted} showExtendedHeader />
        )}

        {activePage === 'thankyou' && (
          <ThankYouView
            recipientName={thankYouRecipient}
            onReturnHome={() => navigateTo('overview')}
          />
        )}
      </main>

      {/* Quiet Editorial Footer */}
      <footer className="no-print border-t border-slate-200 dark:border-slate-800/80 bg-white dark:bg-[#090d16] py-8 mt-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-slate-500 dark:text-slate-400">
          <div>© 2026 Md. Monirul Islam · ICE @ PUST · All rights reserved</div>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <button
              type="button"
              onClick={() => navigateTo('overview')}
              className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors cursor-pointer"
            >
              Overview
            </button>
            <span aria-hidden="true">·</span>
            <button
              type="button"
              onClick={() => navigateTo('projects')}
              className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors cursor-pointer"
            >
              Projects & Lab
            </button>
            <span aria-hidden="true">·</span>
            <button
              type="button"
              onClick={() => navigateTo('cv')}
              className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors cursor-pointer"
            >
              Printable CV
            </button>
            <span aria-hidden="true">·</span>
            <button
              type="button"
              onClick={() => navigateTo('thankyou')}
              className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors cursor-pointer"
            >
              Thank You View
            </button>
            <span aria-hidden="true">·</span>
            <a
              href={PROFILE_DATA.github}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
            >
              GitHub
            </a>
            <span aria-hidden="true">·</span>
            <a
              href={PROFILE_DATA.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
            >
              LinkedIn
            </a>
          </div>
        </div>
      </footer>

      {/* Project Specification Lightbox Modal */}
      <ProjectSpecModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
        onLaunchDemo={(demoType) => navigateTo('projects', demoType)}
      />

      {/* AI Portfolio Assistant Chatbot */}
      <AIChatbot
        isOpen={isAIChatOpen}
        onToggle={() => setIsAIChatOpen((prev) => !prev)}
        onNavigate={navigateTo}
      />
    </div>
  );
}
