import React from 'react';
import { useLanguage } from '../lib/i18n';

export const Footer: React.FC = () => {
  const { t } = useLanguage();

  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-grid">
          <div>
            <div className="brand-logo" style={{ marginBottom: '0.75rem' }}>
              <span className="brand-icon">H</span>
              <span>Hub</span>
            </div>
            <p style={{ fontSize: '0.88rem', maxWidth: '340px', color: 'var(--color-text-secondary)', lineHeight: 1.6 }}>
              {t.footer.bio}
            </p>
          </div>

          <div>
            <h4 className="footer-heading">{t.footer.colProduct}</h4>
            <ul className="footer-list">
              <li>
                <a href="/" className="footer-link">
                  {t.footer.mediaDownloader}
                </a>
              </li>
              <li>
                <a href="/about.html" className="footer-link">
                  {t.footer.aboutHub}
                </a>
              </li>
              <li>
                <a href="/docs.html" className="footer-link">
                  {t.footer.publicApiDocs}
                </a>
              </li>
              <li>
                <a href="/#faq" className="footer-link">
                  {t.footer.faq}
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="footer-heading">{t.footer.colDevs}</h4>
            <ul className="footer-list">
              <li>
                <a href="/docs.html" className="footer-link">
                  {t.footer.apiReference}
                </a>
              </li>
              <li>
                <a href="/docs.html" className="footer-link">
                  {t.footer.interactiveTerminal}
                </a>
              </li>
              <li>
                <a href="/about.html" className="footer-link">
                  {t.footer.systemArchitecture}
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="footer-heading">{t.footer.colOpenSource}</h4>
            <ul className="footer-list">
              <li>
                <a
                  href="https://github.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="footer-link"
                >
                  {t.footer.githubRepo}
                </a>
              </li>
              <li>
                <a
                  href="https://opensource.org/licenses/MIT"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="footer-link"
                >
                  {t.footer.mitLicense}
                </a>
              </li>
              <li>
                <a
                  href="https://github.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="footer-link"
                >
                  {t.footer.reportIssue}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <span>{t.footer.copyright}</span>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--color-text-dim)' }}>
            {t.footer.zeroTelemetry}
          </span>
        </div>
      </div>
    </footer>
  );
};
