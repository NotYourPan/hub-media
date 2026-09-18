import React from 'react';
import { MediaPlatform } from '../types/media';
import { getPlatformLabel } from '../lib/platform';

interface PlatformBadgeProps {
  platform: MediaPlatform;
  showIcon?: boolean;
}

export const PlatformBadge: React.FC<PlatformBadgeProps> = ({ platform, showIcon = true }) => {
  const label = getPlatformLabel(platform);

  const renderIcon = () => {
    switch (platform) {
      case 'youtube':
        return (
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path
              d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814z"
              fill="#FF0000"
            />
            <path d="M9.545 15.568V8.432L15.818 12l-6.273 3.568z" fill="#FFFFFF" />
          </svg>
        );

      case 'tiktok':
        return (
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path
              d="M19.589 6.686a4.793 4.793 0 0 1-3.77-4.245V2h-3.445v13.672a2.896 2.896 0 0 1-2.891 2.766 2.896 2.896 0 0 1-2.896-2.896 2.896 2.896 0 0 1 2.896-2.896c.387 0 .753.076 1.09.213V9.387A6.335 6.335 0 0 0 9.483 9.24 6.34 6.34 0 0 0 3.143 15.58a6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.34-6.34V8.708a8.183 8.183 0 0 0 4.766 1.517v-3.54z"
              fill="#25F4EE"
            />
            <path
              d="M18.589 5.686a4.793 4.793 0 0 1-3.77-4.245V1h-3.445v13.672a2.896 2.896 0 0 1-2.891 2.766 2.896 2.896 0 0 1-2.896-2.896 2.896 2.896 0 0 1 2.896-2.896c.387 0 .753.076 1.09.213V8.387A6.335 6.335 0 0 0 8.483 8.24 6.34 6.34 0 0 0 2.143 14.58a6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.34-6.34V7.708a8.183 8.183 0 0 0 4.766 1.517v-3.54z"
              fill="#FE2C55"
              style={{ mixBlendMode: 'screen' }}
            />
            <path
              d="M19.089 6.186a4.793 4.793 0 0 1-3.77-4.245V1.5h-3.445v13.672a2.896 2.896 0 0 1-2.891 2.766 2.896 2.896 0 0 1-2.896-2.896 2.896 2.896 0 0 1 2.896-2.896c.387 0 .753.076 1.09.213V8.887A6.335 6.335 0 0 0 8.983 8.74 6.34 6.34 0 0 0 2.643 15.08a6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.34-6.34V8.208a8.183 8.183 0 0 0 4.766 1.517v-3.54z"
              fill="#FFFFFF"
            />
          </svg>
        );

      case 'instagram':
        return (
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <rect x="2" y="2" width="20" height="20" rx="5" stroke="#E1306C" strokeWidth="2.2" />
            <circle cx="12" cy="12" r="4.5" stroke="#E1306C" strokeWidth="2.2" />
            <circle cx="17.5" cy="6.5" r="1.2" fill="#E1306C" />
          </svg>
        );

      case 'facebook':
        return (
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <circle cx="12" cy="12" r="11" fill="#1877F2" />
            <path
              d="M15.5 12h-2.5v7h-3v-7h-1.8V9.5H10V7.8C10 6.2 11 5 13.2 5H15.5v2.4h-1.5c-.8 0-1 .4-1 1v1.1h2.7l-.2 2.5z"
              fill="#FFFFFF"
            />
          </svg>
        );

      case 'twitter':
        return (
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path
              d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"
              fill="#FFFFFF"
            />
          </svg>
        );

      case 'webpage':
        return (
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#3b82f6" strokeWidth="2" aria-hidden="true">
            <circle cx="12" cy="12" r="10" />
            <line x1="2" y1="12" x2="22" y2="12" />
            <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
          </svg>
        );

      default:
        return (
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
            <polyline points="7 10 12 15 17 10" />
            <line x1="12" y1="15" x2="12" y2="3" />
          </svg>
        );
    }
  };

  return (
    <span className="platform-badge" data-platform={platform}>
      {showIcon && <span style={{ display: 'inline-flex', alignItems: 'center' }}>{renderIcon()}</span>}
      <span>{label}</span>
    </span>
  );
};
