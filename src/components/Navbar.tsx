import React, { useState, useEffect, useRef } from 'react';
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
  const [menuOpen, setMenuOpen] = useState(false);
  const drawerRef = useRef<HTMLDivElement>(null);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const hamburgerBtn = document.getElementById('hamburger-btn');
      if (
        drawerRef.current &&
        !drawerRef.current.contains(e.target as Node) &&
        hamburgerBtn &&
        !hamburgerBtn.contains(e.target as Node)
      ) {
        setMenuOpen(false);
      }
    };
    if (menuOpen) document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [menuOpen]);

  // Close on desktop resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) setMenuOpen(false);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Lock body scroll when drawer is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  return (
    <>
      <header className="site-navbar">
        <div className="container site-navbar-inner">
          {/* Brand */}
          <div className="brand-wrapper">
            <a href="/" className="brand-logo" aria-label="Hub Home">
              <img
                src="/assets/logo.webp"
                alt="Hub Logo"
                className="brand-icon-img"
                width="32"
                height="32"
              />
              <span>Hub</span>
            </a>
            <span className="brand-badge">{badgeLabel || t.nav.openSource}</span>
          </div>

          {/* Desktop nav links */}
          <nav className="nav-desktop" aria-label="Main Navigation">
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

          {/* Right actions — always visible */}
          <div className="nav-actions">
            {/* Language toggle — always outside hamburger */}
            <button
              type="button"
              onClick={toggleLanguage}
              className="nav-control-btn"
              aria-label={`${t.nav.switchLang}. Current: ${lang.toUpperCase()}`}
              title={`Language: ${lang === 'en' ? 'English (Click for Indonesian)' : 'Bahasa Indonesia (Klik untuk English)'}`}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10" />
                <line x1="2" y1="12" x2="22" y2="12" />
                <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
              </svg>
              <span style={{ textTransform: 'uppercase' }}>{lang}</span>
            </button>

            {/* Theme toggle — always outside hamburger */}
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
                  <span className="nav-btn-label">{t.nav.themeLight}</span>
                </>
              ) : (
                <>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
                  </svg>
                  <span className="nav-btn-label">{t.nav.themeDark}</span>
                </>
              )}
            </button>

            {/* GitHub — hidden on mobile, shown in drawer */}
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="input-action-btn nav-github-btn"
              style={{ fontSize: '0.8rem', padding: '6px 12px' }}
            >
              GitHub
            </a>

            {/* Hamburger — mobile only */}
            <button
              id="hamburger-btn"
              type="button"
              className={`hamburger-btn${menuOpen ? ' is-open' : ''}`}
              aria-label={menuOpen ? t.nav.closeMenu : t.nav.openMenu}
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              onClick={() => setMenuOpen(prev => !prev)}
            >
              <span className="hamburger-bar" />
              <span className="hamburger-bar" />
              <span className="hamburger-bar" />
            </button>
          </div>
        </div>
      </header>

      {/* Fullscreen Mobile Menu Overlay */}
      <div
        id="mobile-menu"
        className={`mobile-fullscreen${menuOpen ? ' is-open' : ''}`}
        aria-hidden={!menuOpen}
      >
        {/* Top bar inside overlay */}
        <div className="mobile-fs-topbar">
          <button
            type="button"
            className="mobile-fs-close"
            aria-label={t.nav.closeMenu}
            onClick={() => setMenuOpen(false)}
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
          <a href="/" className="mobile-fs-brand" onClick={() => setMenuOpen(false)}>
            <img src="/assets/logo.webp" alt="Hub Logo" width="28" height="28" className="brand-icon-img" />
            <span>Hub</span>
          </a>
          <div style={{ width: 44 }} />{/* spacer to center brand */}
        </div>

        {/* Nav links */}
        <nav className="mobile-fs-nav" aria-label="Mobile Navigation">
          <ul className="mobile-fs-links">
            <li>
              <a
                href="/"
                className={`mobile-fs-link${currentEntry === 'index.html' ? ' active' : ''}`}
                onClick={() => setMenuOpen(false)}
              >
                {t.nav.downloader}
              </a>
            </li>
            <li>
              <a
                href="/about.html"
                className={`mobile-fs-link${currentEntry === 'about.html' ? ' active' : ''}`}
                onClick={() => setMenuOpen(false)}
              >
                {t.nav.about}
              </a>
            </li>
            <li>
              <a
                href="/docs.html"
                className={`mobile-fs-link${currentEntry === 'docs.html' ? ' active' : ''}`}
                onClick={() => setMenuOpen(false)}
              >
                {t.nav.docs}
              </a>
            </li>
          </ul>

          <div className="mobile-fs-secondary">
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="mobile-fs-secondary-link"
              onClick={() => setMenuOpen(false)}
            >
              GitHub
            </a>
          </div>
        </nav>
      </div>
    </>
  );
};
