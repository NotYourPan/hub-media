import { MediaPlatform } from '../types/media';

/**
 * Detect media platform based on the input URL hostname.
 */
export function detectPlatform(inputUrl: string): MediaPlatform {
  if (!inputUrl || typeof inputUrl !== 'string') {
    return 'unknown';
  }

  const trimmed = inputUrl.trim();
  let hostname = '';

  try {
    const parsed = new URL(trimmed.startsWith('http') ? trimmed : `https://${trimmed}`);
    hostname = parsed.hostname.toLowerCase();
  } catch {
    // If URL parsing fails, check substring matches for quick user feedback
    const lower = trimmed.toLowerCase();
    if (lower.includes('tiktok.com')) return 'tiktok';
    if (lower.includes('youtube.com') || lower.includes('youtu.be')) return 'youtube';
    if (lower.includes('instagram.com')) return 'instagram';
    if (lower.includes('facebook.com') || lower.includes('fb.watch')) return 'facebook';
    if (lower.includes('twitter.com') || lower.includes('x.com')) return 'twitter';
    return 'unknown';
  }

  if (hostname.includes('tiktok.com') || hostname === 'vm.tiktok.com') {
    return 'tiktok';
  }

  if (
    hostname.includes('youtube.com') ||
    hostname === 'youtu.be' ||
    hostname.includes('m.youtube.com')
  ) {
    return 'youtube';
  }

  if (hostname.includes('instagram.com')) {
    return 'instagram';
  }

  if (
    hostname.includes('facebook.com') ||
    hostname === 'fb.watch' ||
    hostname.includes('fb.com')
  ) {
    return 'facebook';
  }

  if (hostname.includes('twitter.com') || hostname.includes('x.com')) {
    return 'twitter';
  }

  // Any other valid URL can be processed as general Webpage HTML
  if (hostname.includes('.')) {
    return 'webpage';
  }

  return 'unknown';
}

export function getPlatformLabel(platform: MediaPlatform): string {
  switch (platform) {
    case 'youtube':
      return 'YouTube';
    case 'tiktok':
      return 'TikTok';
    case 'instagram':
      return 'Instagram';
    case 'facebook':
      return 'Facebook';
    case 'twitter':
      return 'X (Twitter)';
    case 'webpage':
      return 'Webpage HTML';
    case 'unknown':
    default:
      return 'Universal';
  }
}

export function isValidUrl(urlString: string): boolean {
  try {
    const url = new URL(urlString.startsWith('http') ? urlString : `https://${urlString}`);
    return url.hostname.length > 3 && url.hostname.includes('.');
  } catch {
    return false;
  }
}
