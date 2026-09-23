import React, { useState, useRef } from 'react';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { DownloaderInput } from '../components/DownloaderInput';
import { DownloadResult } from '../components/DownloadResult';
import { PlatformBadge } from '../components/PlatformBadge';
import { FaqSection } from '../components/FaqSection';
import { SmoothScroll } from '../components/animations/SmoothScroll';
import { SpotlightCard } from '../components/animations/SpotlightCard';
import { DecryptedText } from '../components/animations/DecryptedText';
import { ParticleCanvas } from '../components/animations/ParticleCanvas';
import { PlatformMarquee } from '../components/animations/PlatformMarquee';
import { fetchMediaInfo } from '../lib/api';
import { isValidUrl } from '../lib/platform';
import { useLanguage } from '../lib/i18n';
import { MediaInfo, DownloadStatus, MediaPlatform } from '../types/media';

interface SampleMediaAsset {
  platform: MediaPlatform;
  url: string;
  title: string;
  author: string;
  authorAvatar: string;
  duration: string;
  views: string;
  thumbnailUrl: string;
}

export const Home: React.FC = () => {
  const { t } = useLanguage();
  const [status, setStatus] = useState<DownloadStatus>('idle');
  const [mediaInfo, setMediaInfo] = useState<MediaInfo | null>(null);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [currentUrl, setCurrentUrl] = useState<string>('');
  const downloaderCardRef = useRef<HTMLDivElement>(null);

  const handleAnalyze = async (url: string) => {
    if (!isValidUrl(url)) {
      setStatus('error');
      setErrorMessage(t.home.errorValidUrl);
      setMediaInfo(null);
      return;
    }

    setStatus('analyzing');
    setErrorMessage('');
    setCurrentUrl(url);

    try {
      const data = await fetchMediaInfo(url);
      setMediaInfo(data);
      setStatus('success');
    } catch {
      setStatus('error');
      setErrorMessage(t.home.errorParse);
      setMediaInfo(null);
    }
  };

  const sampleAssets: SampleMediaAsset[] = [
    {
      platform: 'youtube',
      url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
      title: 'Distributed System Transcoding & High Throughput Video Streams',
      author: 'Alex Chen',
      authorAvatar: '/assets/avatars/alex-chen.webp',
      duration: '12:35',
      views: '482K views',
      thumbnailUrl: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=600&auto=format&fit=crop&q=80',
    },
    {
      platform: 'tiktok',
      url: 'https://www.tiktok.com/@creator/video/73928190283',
      title: 'Viral Motion Design & 3D Interactive Animation Showcase',
      author: 'Sarah Jenkins',
      authorAvatar: '/assets/avatars/sarah-jenkins.webp',
      duration: '0:48',
      views: '1.4M views',
      thumbnailUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=600&auto=format&fit=crop&q=80',
    },
    {
      platform: 'instagram',
      url: 'https://www.instagram.com/reel/C8x71a9Lz5k/',
      title: 'Cinematic Visual Exploration: Urban Nightscapes and Neon Architecture',
      author: 'Elena Rostova',
      authorAvatar: '/assets/avatars/elena-rostova.webp',
      duration: '01:15',
      views: '890K views',
      thumbnailUrl: 'https://images.unsplash.com/photo-1514565131-fce0801e5785?w=600&auto=format&fit=crop&q=80',
    },
    {
      platform: 'twitter',
      url: 'https://x.com/developer/status/1812390184719',
      title: 'Live Demo: Rust + WebAssembly Low-Latency Media Processing',
      author: 'Marcus Vance',
      authorAvatar: '/assets/avatars/marcus-vance.webp',
      duration: '02:18',
      views: '320K views',
      thumbnailUrl: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=600&auto=format&fit=crop&q=80',
    },
  ];

  const handleSelectSample = (sampleUrl: string) => {
    setCurrentUrl(sampleUrl);
    downloaderCardRef.current?.scrollIntoView({ behavior: 'smooth' });
    handleAnalyze(sampleUrl);
  };

  const platformsList: MediaPlatform[] = [
    'youtube',
    'tiktok',
    'instagram',
    'facebook',
    'twitter',
    'webpage',
  ];

  return (
    <SmoothScroll>
      <ParticleCanvas />
      <Navbar currentEntry="index.html" />

      <main className="site-main" style={{ position: 'relative' }}>
        <div className="ambient-glow" />

        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          {/* Hero Section */}
          <section className="hero-section">
            <h1 className="hero-title">
              <DecryptedText text={t.home.heroTitle} speed={28} maxIterations={12} />
            </h1>
            <p className="hero-subtitle">
              {t.home.heroSubtitle}
            </p>

            <div ref={downloaderCardRef} style={{ maxWidth: '720px', margin: '0 auto' }}>
              <SpotlightCard className="downloader-card" spotlightColor="rgba(113, 50, 245, 0.16)">
                <DownloaderInput
                  key={currentUrl}
                  initialUrl={currentUrl}
                  placeholder={t.home.inputPlaceholder}
                  isLoading={status === 'analyzing'}
                  onAnalyze={handleAnalyze}
                />

                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '1.25rem', flexWrap: 'wrap', gap: '0.5rem' }}>
                  <span style={{ fontSize: '0.8rem', color: 'var(--color-text-dim)', fontFamily: 'var(--font-mono)', fontWeight: 500 }}>
                    {t.home.supportedEngines}
                  </span>
                  <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                    {platformsList.map((p) => (
                      <PlatformBadge key={p} platform={p} />
                    ))}
                  </div>
                </div>
              </SpotlightCard>

              {/* Status / Feedback Area */}
              {status === 'analyzing' && (
                <div className="status-box status-loading">
                  <span className="spinner" />
                  <span>{t.home.analyzing}</span>
                </div>
              )}

              {status === 'error' && (
                <div className="status-box status-error">
                  <span>{errorMessage}</span>
                </div>
              )}

              {status === 'success' && mediaInfo && (
                <DownloadResult media={mediaInfo} />
              )}
            </div>
          </section>

          {/* Infinite Marquee Ticker */}
          <PlatformMarquee />

          {/* Interactive Media Showcase & Samples */}
          <section className="section-block">
            <div className="section-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '1rem' }}>
              <div>
                <div className="section-tag">
                  {t.home.samplesTag}
                </div>
                <h2 className="section-title">
                  {t.home.samplesTitle}
                </h2>
              </div>
              <p style={{ color: 'var(--color-text-muted)', fontSize: '0.88rem', maxWidth: '360px' }}>
                {t.home.samplesDesc}
              </p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '1.25rem' }}>
              {sampleAssets.map((asset, idx) => (
                <SpotlightCard
                  key={idx}
                  className="card-item"
                  spotlightColor="rgba(113, 50, 245, 0.16)"
                  style={{ display: 'flex', flexDirection: 'column', padding: '16px' }}
                >
                  <div style={{ position: 'relative', height: '150px', borderRadius: '10px', overflow: 'hidden', marginBottom: '12px' }}>
                    <img
                      src={asset.thumbnailUrl}
                      alt={asset.title}
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                      loading="lazy"
                    />
                    <div style={{ position: 'absolute', top: '8px', left: '8px' }}>
                      <PlatformBadge platform={asset.platform} />
                    </div>
                    <div
                      style={{
                        position: 'absolute',
                        bottom: '8px',
                        right: '8px',
                        backgroundColor: 'rgba(0,0,0,0.75)',
                        color: '#ffffff',
                        fontSize: '0.72rem',
                        fontFamily: 'var(--font-mono)',
                        padding: '2px 6px',
                        borderRadius: '4px',
                      }}
                    >
                      {asset.duration}
                    </div>
                  </div>

                  <h3 style={{ fontSize: '0.98rem', fontWeight: 600, color: 'var(--color-text)', marginBottom: '6px', lineHeight: 1.35 }}>
                    {asset.title}
                  </h3>

                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '0.8rem', color: 'var(--color-text-muted)', marginBottom: '14px', marginTop: 'auto' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <img
                        src={asset.authorAvatar}
                        alt={asset.author}
                        style={{
                          width: '24px',
                          height: '24px',
                          borderRadius: '50%',
                          objectFit: 'cover',
                          border: '1px solid var(--color-border)',
                        }}
                      />
                      <span style={{ fontWeight: 500, color: 'var(--color-text)' }}>{asset.author}</span>
                    </div>
                    <span>{asset.views}</span>
                  </div>

                  <button
                    type="button"
                    onClick={() => handleSelectSample(asset.url)}
                    className="btn-secondary"
                    style={{
                      width: '100%',
                      padding: '10px 14px',
                      fontSize: '0.85rem',
                      fontWeight: 600,
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '6px',
                    }}
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                      <polygon points="5 3 19 12 5 21 5 3" />
                    </svg>
                    <span>{t.home.inspectStream}</span>
                  </button>
                </SpotlightCard>
              ))}
            </div>
          </section>

          {/* Dedicated Lightweight Clients Section */}
          <section className="section-block">
            <div className="section-header">
              <div className="section-tag">{t.home.suitesHeadingTag}</div>
              <h2 className="section-title">{t.home.suitesHeadingTitle}</h2>
            </div>

            <div className="grid-3">
              <SpotlightCard className="card-item" spotlightColor="rgba(113, 50, 245, 0.16)">
                <div className="card-number">{t.home.suite1Tag}</div>
                <h3 className="card-title">{t.home.suite1Title}</h3>
                <p className="card-text">
                  {t.home.suite1Text}
                </p>
                <div style={{ marginTop: '1.25rem' }}>
                  <span className="html-entry-pill">{t.home.suite1Btn}</span>
                </div>
              </SpotlightCard>

              <SpotlightCard className="card-item" spotlightColor="rgba(20, 158, 97, 0.16)">
                <div className="card-number">{t.home.suite2Tag}</div>
                <h3 className="card-title">{t.home.suite2Title}</h3>
                <p className="card-text">
                  {t.home.suite2Text}
                </p>
                <div style={{ marginTop: '1.25rem' }}>
                  <a href="/about.html" className="btn-secondary" style={{ display: 'inline-block' }}>
                    {t.home.suite2Btn}
                  </a>
                </div>
              </SpotlightCard>

              <SpotlightCard className="card-item" spotlightColor="rgba(87, 65, 216, 0.16)">
                <div className="card-number">{t.home.suite3Tag}</div>
                <h3 className="card-title">{t.home.suite3Title}</h3>
                <p className="card-text">
                  {t.home.suite3Text}
                </p>
                <div style={{ marginTop: '1.25rem' }}>
                  <a href="/docs.html" className="btn-secondary" style={{ display: 'inline-block' }}>
                    {t.home.suite3Btn}
                  </a>
                </div>
              </SpotlightCard>
            </div>
          </section>

          {/* Pipeline Workflow Section */}
          <section className="section-block">
            <div className="section-header">
              <div className="section-tag">{t.home.pipelineTag}</div>
              <h2 className="section-title">{t.home.pipelineTitle}</h2>
            </div>

            <div className="grid-3">
              <SpotlightCard className="card-item">
                <div className="card-number">{t.home.step1Tag}</div>
                <h3 className="card-title">{t.home.step1Title}</h3>
                <p className="card-text">
                  {t.home.step1Text}
                </p>
              </SpotlightCard>

              <SpotlightCard className="card-item">
                <div className="card-number">{t.home.step2Tag}</div>
                <h3 className="card-title">{t.home.step2Title}</h3>
                <p className="card-text">
                  {t.home.step2Text}
                </p>
              </SpotlightCard>

              <SpotlightCard className="card-item">
                <div className="card-number">{t.home.step3Tag}</div>
                <h3 className="card-title">{t.home.step3Title}</h3>
                <p className="card-text">
                  {t.home.step3Text}
                </p>
              </SpotlightCard>
            </div>
          </section>

          {/* Backend Integration Architecture */}
          <section className="section-block">
            <SpotlightCard className="card-item" style={{ borderLeft: '4px solid var(--color-primary)' }}>
              <h3 className="card-title" style={{ marginBottom: '0.5rem' }}>{t.home.backendTitle}</h3>
              <p className="card-text" style={{ marginBottom: '1rem' }}>
                {t.home.backendText}
              </p>
              <div className="code-block">
                POST /v1/media/info | POST /v1/media/download | GET /v1/media/download/:id
              </div>
            </SpotlightCard>
          </section>

          {/* FAQ Section */}
          <FaqSection />
        </div>
      </main>

      <Footer />
    </SmoothScroll>
  );
};
