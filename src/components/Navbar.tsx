import React from 'react';
import { HtmlEntryFile } from '../types/media';
import { useTheme } from '../lib/theme';
import { useLanguage } from '../lib/i18n';

interface NavbarProps {
  currentEntry: HtmlEntryFile;
  badgeLabel?: string;
}

export const Navbar: React.FC<NavbarProps> = ({ currentEntry, badgeLabel }) => {
  const { theme, toggleTheme } = useTheme();
  const { lang, toggleLanguage, t } = useLanguage();

  return (
    <header className="site-navbar">
      <div className="container site-navbar-inner">
        <div className="brand-wrapper">
          <a href="/" className="brand-logo" aria-label="Hub Home">
            <span className="brand-icon">H</span>
            <span>Hub</span>
          </a>
          <span className="brand-badge">{badgeLabel || t.nav.openSource}</span>
        </div>

        <nav aria-label="Main Navigation">
          <ul className="nav-links">
            <li>
              <a
                href="/"
                className={`nav-link ${currentEntry === 'index.html' ? 'active' : ''}`}
              >
                {t.nav.downloader}
              </a>
            </li>
            <li>
              <a
                href="/about.html"
                className={`nav-link ${currentEntry === 'about.html' ? 'active' : ''}`}
              >
                {t.nav.about}
              </a>
            </li>
            <li>
              <a
                href="/docs.html"
                className={`nav-link ${currentEntry === 'docs.html' ? 'active' : ''}`}
              >
                {t.nav.docs}
              </a>
            </li>
          </ul>
        </nav>

        <div className="nav-actions">
          {/* Language Switcher Button (EN / ID) */}
          <button
            type="button"
            onClick={toggleLanguage}
            className="nav-control-btn"
            aria-label={`Switch language. Current: ${lang.toUpperCase()}`}
            title={`Language: ${lang === 'en' ? 'English (Click for Indonesian)' : 'Bahasa Indonesia (Klik untuk English)'}`}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10" />
              <line x1="2" y1="12" x2="22" y2="12" />
              <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
            </svg>
            <span style={{ textTransform: 'uppercase' }}>{lang}</span>
          </button>

          {/* Theme Toggle Button (Light / Dark) */}
          <button
            type="button"
            onClick={toggleTheme}
            className="nav-control-btn"
            aria-label={`Toggle theme. Current: ${theme}`}
            title={`Theme: ${theme === 'dark' ? 'Dark mode (Switch to Light)' : 'Light mode (Switch to Dark)'}`}
          >
            {theme === 'dark' ? (
              <>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="5" />
                  <line x1="12" y1="1" x2="12" y2="3" />
                  <line x1="12" y1="21" x2="12" y2="23" />
                  <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
                  <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
                  <line x1="1" y1="12" x2="3" y2="12" />
                  <line x1="21" y1="12" x2="23" y2="12" />
                  <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
                  <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
                </svg>
                <span>{t.nav.themeLight}</span>
              </>
            ) : (
              <>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
                </svg>
                <span>{t.nav.themeDark}</span>
              </>
            )}
          </button>

          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="input-action-btn"
            style={{ fontSize: '0.8rem', padding: '6px 12px' }}
          >
            GitHub
          </a>
        </div>
      </div>
    </header>
  );
};
