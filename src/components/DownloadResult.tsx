import React, { useState } from 'react';
import { MediaInfo, MediaFormat, MediaQuality } from '../types/media';
import { PlatformBadge } from './PlatformBadge';
import { useLanguage } from '../lib/i18n';

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
  const [downloadState, setDownloadState] = useState<'idle' | 'preparing' | 'completed'>('idle');
  const [isPlayingPreview, setIsPlayingPreview] = useState<boolean>(false);

  const handleDownload = () => {
    setDownloadState('preparing');
    setTimeout(() => {
      setDownloadState('completed');
    }, 1200);
  };

  const getFormatLabel = (format: MediaFormat) => {
    switch (format) {
      case 'video':
        return 'Video (MP4)';
      case 'audio':
        return 'Audio (MP3)';
      case 'html':
        return 'Webpage Source (HTML)';
      default:
        return format;
    }
  };

  const getQualityLabel = (quality: MediaQuality) => {
    switch (quality) {
      case 'original':
        return 'Original Source';
      case '1080p':
        return '1080p Full HD';
      case '720p':
        return '720p HD';
      case '480p':
        return '480p Standard';
      case '320kbps':
        return '320 kbps High Quality';
      case '128kbps':
        return '128 kbps Standard';
      case 'raw_html':
        return 'Raw HTML Markup';
      case 'clean_html':
        return 'Sanitized Article DOM';
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
              {isPlayingPreview ? 'Show Thumbnail' : 'Watch Stream Preview'}
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
            <span>Target: Distributed Stream</span>
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
                <span>{t.downloader.simulatingBtn}</span>
              </>
            ) : (
              <span>{t.downloader.downloadBtn} {selectedFormat.toUpperCase()}</span>
            )}
          </button>
        </div>
      </div>

      {downloadState === 'completed' && (
        <div className="status-box status-success">
          <div>
            <strong>{t.downloader.simulatedNotice}</strong> {t.downloader.readyAs}{' '}
            <code>{media.id}.{selectedFormat === 'html' ? 'html' : selectedFormat === 'audio' ? 'mp3' : 'mp4'}</code>.
            ({t.downloader.prototypeNote})
          </div>
        </div>
      )}
    </div>
  );
};
