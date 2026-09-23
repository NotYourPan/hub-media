import React, { useState } from 'react';
import { MediaInfo, MediaFormat, MediaQuality } from '../types/media';
import { PlatformBadge } from './PlatformBadge';
import { useLanguage } from '../lib/i18n';
import { requestMediaDownload, pollMediaDownloadStatus } from '../lib/api';

interface DownloadResultProps {
  media: MediaInfo;
}

export const DownloadResult: React.FC<DownloadResultProps> = ({ media }) => {
  const { t } = useLanguage();
  const [selectedFormat, setSelectedFormat] = useState<MediaFormat>(
    media.availableFormats[0] || 'video'
  );
  const [selectedQuality, setSelectedQuality] = useState<MediaQuality>(
    media.availableQualities[0] || '1080p'
  );
  const [downloadState, setDownloadState] = useState<'idle' | 'preparing' | 'completed' | 'failed'>('idle');
  const [progressText, setProgressText] = useState<string>('');
  const [downloadUrl, setDownloadUrl] = useState<string>('');
  const [fileSizeText, setFileSizeText] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [isPlayingPreview, setIsPlayingPreview] = useState<boolean>(false);

  const triggerBrowserDownload = (url: string, filename: string) => {
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.target = '_blank';
    a.rel = 'noopener noreferrer';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  const handleDownload = async () => {
    setDownloadState('preparing');
    setErrorMessage('');
    setProgressText(`${t.downloader.preparingBtn} (10%)`);

    const targetExt = selectedFormat === 'html' ? 'html' : selectedFormat === 'audio' ? 'mp3' : 'mp4';
    const downloadFilename = `${media.id}.${targetExt}`;

    try {
      // 1. Submit download job to Go backend
      const submitRes = await requestMediaDownload(media.url, selectedFormat, selectedQuality);
      const jobId = submitRes.jobId;

      // 2. Poll job status
      let attempts = 0;
      const maxAttempts = 60; // 60 seconds max
      const interval = 1000;

      while (attempts < maxAttempts) {
        attempts++;
        await new Promise((resolve) => setTimeout(resolve, interval));

        try {
          const status = await pollMediaDownloadStatus(jobId);

          if (status.status === 'ready' && status.downloadUrl) {
            setDownloadUrl(status.downloadUrl);
            if (status.fileSizeBytes) {
              const mb = (status.fileSizeBytes / (1024 * 1024)).toFixed(1);
              setFileSizeText(`${mb} MB`);
            }
            setDownloadState('completed');
            triggerBrowserDownload(status.downloadUrl, downloadFilename);
            return;
          }

          if (status.status === 'failed') {
            throw new Error(status.error || t.downloader.downloadFailed);
          }

          const currentPct = status.progressPercent || Math.min(95, attempts * 5);
          setProgressText(`${t.downloader.preparingBtn} (${currentPct}%)`);
        } catch (pollErr: any) {
          if (attempts >= maxAttempts) {
            throw pollErr;
          }
        }
      }
      throw new Error('Download processing timed out');
    } catch (err: any) {
      // Fallback: If backend transcoder fails or times out, but direct videoPreviewUrl exists for video
      if (selectedFormat === 'video' && media.videoPreviewUrl) {
        setDownloadUrl(media.videoPreviewUrl);
        setDownloadState('completed');
        triggerBrowserDownload(media.videoPreviewUrl, downloadFilename);
        return;
      }

      setDownloadState('failed');
      setErrorMessage(err?.message || t.downloader.downloadFailed);
    }
  };

  const getFormatLabel = (format: MediaFormat) => {
    switch (format) {
      case 'video':
        return t.downloader.formatVideo;
      case 'audio':
        return t.downloader.formatAudio;
      case 'html':
        return t.downloader.formatHtml;
      default:
        return format;
    }
  };

  const getQualityLabel = (quality: MediaQuality) => {
    switch (quality) {
      case 'original':
        return t.downloader.qualityOriginal;
      case '1080p':
        return t.downloader.quality1080p;
      case '720p':
        return t.downloader.quality720p;
      case '480p':
        return t.downloader.quality480p;
      case '320kbps':
        return t.downloader.quality320k;
      case '128kbps':
        return t.downloader.quality128k;
      case 'raw_html':
        return t.downloader.qualityRawHtml;
      case 'clean_html':
        return t.downloader.qualityCleanHtml;
      default:
        return quality;
    }
  };

  return (
    <div className="result-card">
      <div className="result-header">
        <div style={{ position: 'relative', width: '220px', flexShrink: 0 }}>
          {isPlayingPreview && media.videoPreviewUrl ? (
            <video
              src={media.videoPreviewUrl}
              controls
              autoPlay
              className="result-thumbnail"
              style={{ width: '100%', height: '130px', objectFit: 'cover' }}
            />
          ) : (
            <div style={{ position: 'relative' }}>
              <img
                src={media.thumbnailUrl}
                alt={media.title}
                className="result-thumbnail"
                style={{ width: '100%', height: '130px' }}
                loading="lazy"
              />
              {media.videoPreviewUrl && (
                <button
                  type="button"
                  onClick={() => setIsPlayingPreview(true)}
                  aria-label="Play video preview"
                  style={{
                    position: 'absolute',
                    inset: 0,
                    margin: 'auto',
                    width: '42px',
                    height: '42px',
                    borderRadius: '50%',
                    backgroundColor: 'rgba(113, 50, 245, 0.9)',
                    color: '#ffffff',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: '0 4px 16px rgba(0,0,0,0.4)',
                    cursor: 'pointer',
                    transition: 'transform 150ms ease',
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.1)')}
                  onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
                  title="Watch sample video preview"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                    <polygon points="5 3 19 12 5 21 5 3" />
                  </svg>
                </button>
              )}
            </div>
          )}

          {media.videoPreviewUrl && (
            <button
              type="button"
              onClick={() => setIsPlayingPreview((prev) => !prev)}
              style={{
                marginTop: '6px',
                width: '100%',
                fontSize: '0.74rem',
                fontFamily: 'var(--font-mono)',
                padding: '3px 6px',
                borderRadius: '6px',
                border: '1px solid var(--color-border)',
                backgroundColor: 'var(--color-surface-elevated)',
                color: 'var(--color-text-secondary)',
                cursor: 'pointer',
                textAlign: 'center',
              }}
            >
              {isPlayingPreview ? t.downloader.showThumbnail : t.downloader.watchPreview}
            </button>
          )}
        </div>

        <div className="result-details">
          <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', marginBottom: '0.5rem', flexWrap: 'wrap' }}>
            <PlatformBadge platform={media.platform} />
            {media.duration && (
              <span className="badge-neutral" style={{ color: 'var(--color-text-dim)' }}>
                {media.duration}
              </span>
            )}
            {media.viewsCount && (
              <span className="badge-neutral" style={{ color: 'var(--color-text-muted)' }}>
                {media.viewsCount}
              </span>
            )}
          </div>

          <h3 className="result-title">{media.title}</h3>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px' }}>
            {media.authorAvatarUrl && (
              <img
                src={media.authorAvatarUrl}
                alt={media.author}
                style={{
                  width: '28px',
                  height: '28px',
                  borderRadius: '50%',
                  objectFit: 'cover',
                  border: '1.5px solid var(--color-primary)',
                  boxShadow: 'var(--shadow-micro)',
                }}
              />
            )}
            <p className="result-author" style={{ margin: 0 }}>
              {t.downloader.creator} <span style={{ fontWeight: 600, color: 'var(--color-text)' }}>{media.author}</span> {media.authorHandle ? `(${media.authorHandle})` : ''}
            </p>
          </div>

          <div className="result-meta-row">
            <span>{t.downloader.identifier} {media.id}</span>
            <span>{t.downloader.targetLabel}</span>
          </div>
        </div>
      </div>

      <div className="result-options">
        <div style={{ display: 'flex', gap: '1.25rem', flexWrap: 'wrap' }}>
          <div className="option-group">
            <label htmlFor="format-select" className="option-label">
              {t.downloader.format}
            </label>
            <select
              id="format-select"
              className="select-control"
              value={selectedFormat}
              onChange={(e) => setSelectedFormat(e.target.value as MediaFormat)}
            >
              {media.availableFormats.map((fmt) => (
                <option key={fmt} value={fmt}>
                  {getFormatLabel(fmt)}
                </option>
              ))}
            </select>
          </div>

          <div className="option-group">
            <label htmlFor="quality-select" className="option-label">
              {t.downloader.quality}
            </label>
            <select
              id="quality-select"
              className="select-control"
              value={selectedQuality}
              onChange={(e) => setSelectedQuality(e.target.value as MediaQuality)}
            >
              {media.availableQualities.map((q) => (
                <option key={q} value={q}>
                  {getQualityLabel(q)}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <button
            type="button"
            className="btn-primary"
            onClick={handleDownload}
            disabled={downloadState === 'preparing'}
          >
            {downloadState === 'preparing' ? (
              <>
                <span className="spinner" />
                <span>{progressText}</span>
              </>
            ) : (
              <span>{t.downloader.downloadBtn} {selectedFormat.toUpperCase()}</span>
            )}
          </button>
        </div>
      </div>

      {downloadState === 'completed' && (
        <div className="status-box status-success" style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          <div>
            <strong>{t.downloader.downloadReady}</strong>{' '}
            <code>{media.id}.{selectedFormat === 'html' ? 'html' : selectedFormat === 'audio' ? 'mp3' : 'mp4'}</code>
            {fileSizeText && <span> ({fileSizeText})</span>}
          </div>
          <p style={{ margin: 0, fontSize: '0.875rem', opacity: 0.9 }}>
            {t.downloader.downloadStarting}
          </p>
          {downloadUrl && (
            <div style={{ marginTop: '0.25rem' }}>
              <a
                href={downloadUrl}
                download={`${media.id}.${selectedFormat === 'html' ? 'html' : selectedFormat === 'audio' ? 'mp3' : 'mp4'}`}
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: '#6ee7b7', textDecoration: 'underline', fontSize: '0.875rem', fontWeight: 600 }}
              >
                {t.downloader.clickToDownload} →
              </a>
            </div>
          )}
        </div>
      )}

      {downloadState === 'failed' && (
        <div className="status-box" style={{ backgroundColor: 'rgba(239, 68, 68, 0.1)', borderColor: '#ef4444', color: '#fca5a5' }}>
          <div>
            <strong>{t.downloader.downloadFailed}</strong> {errorMessage}
          </div>
        </div>
      )}
    </div>
  );
};
