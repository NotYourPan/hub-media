import React from 'react';
import { PlatformBadge } from '../PlatformBadge';
import { MediaPlatform } from '../../types/media';

export const PlatformMarquee: React.FC = () => {
  const platforms: MediaPlatform[] = [
    'youtube',
    'tiktok',
    'instagram',
    'facebook',
    'twitter',
    'webpage',
  ];

  const items = [...platforms, ...platforms];

  return (
    <div className="marquee-container" aria-hidden="true">
      <div className="marquee-track">
        {items.map((platform, idx) => (
          <div key={`${platform}-${idx}`} className="marquee-item">
            <PlatformBadge platform={platform} />
            <span className="marquee-badge">60 FPS</span>
            <span className="marquee-badge">Lossless</span>
          </div>
        ))}
      </div>
    </div>
  );
};
