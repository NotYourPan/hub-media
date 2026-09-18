import React from 'react';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { SmoothScroll } from '../components/animations/SmoothScroll';
import { SpotlightCard } from '../components/animations/SpotlightCard';
import { DecryptedText } from '../components/animations/DecryptedText';
import { ParticleCanvas } from '../components/animations/ParticleCanvas';
import { ApiPlayground } from '../components/ApiPlayground';
import { useLanguage } from '../lib/i18n';

export const Docs: React.FC = () => {
  const { t } = useLanguage();

  return (
    <SmoothScroll>
      <ParticleCanvas />
      <Navbar currentEntry="docs.html" badgeLabel={t.nav.docs} />

      <main className="site-main" style={{ position: 'relative' }}>
        <div className="ambient-glow" />

        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <header style={{ marginBottom: '3rem', textAlign: 'center' }}>
            <div className="section-tag">{t.docs.tag}</div>
            <h1 className="hero-title" style={{ marginBottom: '1rem' }}>
              <DecryptedText text={t.docs.title} speed={28} maxIterations={12} />
            </h1>
            <p className="hero-subtitle">
              {t.docs.subtitle}
            </p>
          </header>

          {/* Quickstart / Base URL */}
          <section className="section-block" style={{ marginTop: 0 }}>
            <SpotlightCard className="card-item" spotlightColor="rgba(113, 50, 245, 0.16)">
              <div className="card-number">{t.docs.envTag}</div>
              <h3 className="card-title">{t.docs.envTitle}</h3>
              <p className="card-text" style={{ marginBottom: '1rem' }}>
                {t.docs.envText}
              </p>
              <div className="code-block" style={{ color: 'var(--color-primary)' }}>
                https://api.zidanmutaqin.cloud/v1/media
              </div>
            </SpotlightCard>
          </section>

          {/* Interactive macOS-style Terminal Playground */}
          <ApiPlayground />

          {/* Endpoint 1: Inspect Metadata */}
          <section className="section-block">
            <div className="section-header">
              <div className="section-tag">{t.docs.endpoint1Tag}</div>
              <h2 className="section-title">POST /v1/media/info</h2>
            </div>

            <SpotlightCard className="card-item">
              <p className="card-text" style={{ marginBottom: '1.25rem' }}>
                {t.docs.endpoint1Desc}
              </p>

              <h4 style={{ fontSize: '0.9rem', marginBottom: '0.5rem', color: 'var(--color-text)', fontFamily: 'var(--font-mono)' }}>
                cURL Example
              </h4>
              <div className="code-block" style={{ marginBottom: '1.25rem' }}>
{`curl -X POST https://api.zidanmutaqin.cloud/v1/media/info \\
  -H "Content-Type: application/json" \\
  -d '{
    "url": "https://www.youtube.com/watch?v=dQw4w9WgXcQ"
  }'`}
              </div>

              <h4 style={{ fontSize: '0.9rem', marginBottom: '0.5rem', color: 'var(--color-text)', fontFamily: 'var(--font-mono)' }}>
                Response Schema (200 OK)
              </h4>
              <div className="code-block">
{`{
  "id": "yt_dQw4w9WgXcQ",
  "url": "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
  "platform": "youtube",
  "title": "Rick Astley - Never Gonna Give You Up (Official Music Video)",
  "author": "Rick Astley",
  "authorHandle": "@RickAstleyYT",
  "duration": "03:33",
  "thumbnailUrl": "https://i.ytimg.com/vi/dQw4w9WgXcQ/maxresdefault.jpg",
  "availableFormats": ["video", "audio"],
  "availableQualities": ["1080p", "720p", "480p", "320kbps", "128kbps"]
}`}
              </div>
            </SpotlightCard>
          </section>

          {/* Endpoint 2: Submit Download Job */}
          <section className="section-block">
            <div className="section-header">
              <div className="section-tag">{t.docs.endpoint2Tag}</div>
              <h2 className="section-title">POST /v1/media/download</h2>
            </div>

            <SpotlightCard className="card-item">
              <p className="card-text" style={{ marginBottom: '1.25rem' }}>
                {t.docs.endpoint2Desc}
              </p>

              <h4 style={{ fontSize: '0.9rem', marginBottom: '0.5rem', color: 'var(--color-text)', fontFamily: 'var(--font-mono)' }}>
                cURL Example
              </h4>
              <div className="code-block" style={{ marginBottom: '1.25rem' }}>
{`curl -X POST https://api.zidanmutaqin.cloud/v1/media/download \\
  -H "Content-Type: application/json" \\
  -d '{
    "url": "https://www.tiktok.com/@creator/video/73928190283",
    "format": "video",
    "quality": "1080p"
  }'`}
              </div>

              <h4 style={{ fontSize: '0.9rem', marginBottom: '0.5rem', color: 'var(--color-text)', fontFamily: 'var(--font-mono)' }}>
                Response Schema (202 Accepted)
              </h4>
              <div className="code-block">
{`{
  "jobId": "job_9847192a",
  "status": "processing",
  "estimatedSeconds": 2.5
}`}
              </div>
            </SpotlightCard>
          </section>

          {/* Endpoint 3: Check Job Status */}
          <section className="section-block">
            <div className="section-header">
              <div className="section-tag">{t.docs.endpoint3Tag}</div>
              <h2 className="section-title">GET /v1/media/download/:jobId</h2>
            </div>

            <SpotlightCard className="card-item">
              <p className="card-text" style={{ marginBottom: '1.25rem' }}>
                {t.docs.endpoint3Desc}
              </p>

              <div className="code-block">
{`curl -X GET https://api.zidanmutaqin.cloud/v1/media/download/job_9847192a

// Response (200 OK):
{
  "jobId": "job_9847192a",
  "status": "ready",
  "downloadUrl": "https://api.zidanmutaqin.cloud/v1/media/stream/job_9847192a.mp4",
  "fileSizeBytes": 14209420,
  "expiresInSeconds": 3600
}`}
              </div>
            </SpotlightCard>
          </section>

          {/* Client SDK Integration Snippet */}
          <section className="section-block">
            <div className="section-header">
              <div className="section-tag">{t.docs.codeExampleTag}</div>
              <h2 className="section-title">{t.docs.codeExampleTitle}</h2>
            </div>

            <SpotlightCard className="card-item">
              <div className="code-block">
{`import { fetchMediaInfo } from './lib/api';

async function analyzeMedia(targetUrl: string) {
  try {
    const response = await fetch('https://api.zidanmutaqin.cloud/v1/media/info', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ url: targetUrl }),
    });

    const data = await response.json();
    console.log('Available formats:', data.availableFormats);
    return data;
  } catch (error) {
    console.error('API Error:', error);
  }
}`}
              </div>
            </SpotlightCard>
          </section>
        </div>
      </main>

      <Footer />
    </SmoothScroll>
  );
};
