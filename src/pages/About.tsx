import React from 'react';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { SmoothScroll } from '../components/animations/SmoothScroll';
import { SpotlightCard } from '../components/animations/SpotlightCard';
import { DecryptedText } from '../components/animations/DecryptedText';
import { ParticleCanvas } from '../components/animations/ParticleCanvas';
import { useLanguage } from '../lib/i18n';

export const About: React.FC = () => {
  const { t } = useLanguage();

  return (
    <SmoothScroll>
      <ParticleCanvas />
      <Navbar currentEntry="about.html" badgeLabel={t.nav.about} />

      <main className="site-main" style={{ position: 'relative' }}>
        <div className="ambient-glow" />

        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <header style={{ marginBottom: '3rem', textAlign: 'center' }}>
            <div className="section-tag">{t.about.tag}</div>
            <h1 className="hero-title" style={{ marginBottom: '1rem' }}>
              <DecryptedText text={t.about.title} speed={28} maxIterations={12} />
            </h1>
            <p className="hero-subtitle">
              {t.about.subtitle}
            </p>
          </header>

          <section className="section-block" style={{ marginTop: 0 }}>
            <div className="grid-3">
              <SpotlightCard className="card-item" spotlightColor="rgba(113, 50, 245, 0.16)">
                <div className="card-number">{t.about.pillar1Tag}</div>
                <h3 className="card-title">{t.about.pillar1Title}</h3>
                <p className="card-text">
                  {t.about.pillar1Text}
                </p>
              </SpotlightCard>

              <SpotlightCard className="card-item" spotlightColor="rgba(87, 65, 216, 0.16)">
                <div className="card-number">{t.about.pillar2Tag}</div>
                <h3 className="card-title">{t.about.pillar2Title}</h3>
                <p className="card-text">
                  {t.about.pillar2Text}
                </p>
              </SpotlightCard>

              <SpotlightCard className="card-item" spotlightColor="rgba(20, 158, 97, 0.16)">
                <div className="card-number">{t.about.pillar3Tag}</div>
                <h3 className="card-title">{t.about.pillar3Title}</h3>
                <p className="card-text">
                  {t.about.pillar3Text}
                </p>
              </SpotlightCard>
            </div>
          </section>

          <section className="section-block">
            <div className="section-header">
              <div className="section-tag">{t.about.archTag}</div>
              <h2 className="section-title">{t.about.archTitle}</h2>
            </div>

            <SpotlightCard className="card-item" style={{ borderLeft: '4px solid var(--color-primary)' }}>
              <h3 className="card-title" style={{ marginBottom: '0.75rem' }}>{t.about.archDescTitle}</h3>
              <p className="card-text" style={{ marginBottom: '1.25rem' }}>
                {t.about.archDescText}
              </p>

              <div className="code-block" style={{ marginBottom: '1rem' }}>
{`Client (hub.zidanmutaqin.cloud)
  │
  │ HTTPS JSON Request
  ▼
API Gateway (api.zidanmutaqin.cloud)
  │
  ▼
Go Ingestion Engine (Gin / Fiber)
  │
  ├── URL Validation & Platform Matching
  ├── Metadata Extractor (yt-dlp)
  └── Stream Packaging / Transcoder (FFmpeg)`}
              </div>

              <p className="card-text" style={{ fontSize: '0.9rem' }}>
                {t.about.fullSpecsLink} (<a href="/docs.html">/docs.html</a>)
              </p>
            </SpotlightCard>
          </section>

          {/* Core Engineering Contributors Showcase */}
          <section className="section-block">
            <div className="section-header">
              <div className="section-tag">
                {t.about.contribTag === 'Open Source' ? 'Core Team' : 'Tim Inti'}
              </div>
              <h2 className="section-title">
                {t.about.contribTag === 'Open Source' ? 'Meet the Founders' : 'Kenali Para Pendiri'}
              </h2>
            </div>

            {/* Lead / Co-Founder — Zidan Mutaqin */}
            <SpotlightCard
              className="card-item"
              spotlightColor="rgba(113, 50, 245, 0.22)"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '1.75rem',
                padding: '28px 24px',
                marginBottom: '1.25rem',
                borderLeft: '4px solid var(--color-primary)',
              }}
            >
              <img
                src="/assets/avatars/zidan-mutaqin.webp"
                alt="Zidan Mutaqin"
                style={{
                  width: '90px',
                  height: '90px',
                  borderRadius: '50%',
                  objectFit: 'cover',
                  objectPosition: 'top',
                  border: '3px solid var(--color-primary)',
                  boxShadow: '0 0 24px rgba(113,50,245,0.35)',
                  flexShrink: 0,
                }}
                loading="lazy"
              />
              <div style={{ flex: 1 }}>
                <div style={{
                  display: 'inline-block',
                  fontSize: '0.7rem',
                  fontWeight: 700,
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  color: 'var(--color-primary)',
                  fontFamily: 'var(--font-mono)',
                  background: 'rgba(113,50,245,0.12)',
                  padding: '2px 10px',
                  borderRadius: '99px',
                  marginBottom: '8px',
                }}>
                  Lead · Co-Founder · Engineer
                </div>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--color-text)', marginBottom: '6px' }}>
                  Zidan Mutaqin
                </h3>
                <p style={{ fontSize: '0.875rem', color: 'var(--color-text-dim)', lineHeight: 1.6 }}>
                  Architect of the Hub platform — designing the distributed transcoding pipeline, Go ingestion engine, and overall system vision.
                </p>
              </div>
            </SpotlightCard>

            {/* Collaborator — Dhevanza Yugies Daniella */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '1.25rem' }}>
              <SpotlightCard
                className="card-item"
                spotlightColor="rgba(87, 65, 216, 0.16)"
                style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '24px 16px' }}
              >
                <img
                  src="/assets/avatars/dhevanza-yugies.webp"
                  alt="Dhevanza Yugies Daniella"
                  style={{
                    width: '68px',
                    height: '68px',
                    borderRadius: '50%',
                    objectFit: 'cover',
                    objectPosition: 'top',
                    border: '2px solid rgba(87,65,216,0.7)',
                    marginBottom: '14px',
                    boxShadow: 'var(--shadow-elevation)',
                  }}
                  loading="lazy"
                />
                <h3 style={{ fontSize: '1.05rem', fontWeight: 600, color: 'var(--color-text)', marginBottom: '4px' }}>
                  Dhevanza Yugies Daniella
                </h3>
                <p style={{ fontSize: '0.8rem', color: 'var(--color-primary)', fontFamily: 'var(--font-mono)', marginBottom: '10px' }}>
                  Collaborator · UI & Integration
                </p>
                <span style={{ fontSize: '0.78rem', color: 'var(--color-text-dim)', fontFamily: 'var(--font-mono)' }}>
                  @dhevanza
                </span>
              </SpotlightCard>
            </div>
          </section>

          <section className="section-block">
            <div className="section-header">
              <div className="section-tag">{t.about.contribTag}</div>
              <h2 className="section-title">{t.about.contribTitle}</h2>
            </div>

            <div className="card-item">
              <p className="card-text" style={{ marginBottom: '1.25rem' }}>
                {t.about.contribText}
              </p>
              <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                <a href="/" className="btn-primary">
                  {t.about.launchDownloader}
                </a>
                <a href="/docs.html" className="btn-secondary">
                  {t.about.exploreDocs}
                </a>
              </div>
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </SmoothScroll>
  );
};
