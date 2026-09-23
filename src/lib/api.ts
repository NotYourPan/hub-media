import { MediaInfo, MediaPlatform, MediaFormat, MediaQuality } from '../types/media';
import { detectPlatform, getPlatformLabel } from './platform';

/**
 * API Base URL configuration.
 * Connects to local Go backend when running on localhost:8080 or falls back to simulated stream.
 */
export const API_BASE_URL =
  typeof window !== 'undefined' && window.location.hostname === 'localhost'
    ? 'http://localhost:8080/v1/media'
    : 'https://api.zidanmutaqin.cloud/v1/media';

export interface MediaInfoRequest {
  url: string;
}

export interface MediaDownloadRequest {
  url: string;
  format: MediaFormat;
  quality: MediaQuality;
}

export interface MediaJobStatus {
  jobId: string;
  status: 'queued' | 'processing' | 'ready' | 'failed';
  progressPercent: number;
  downloadUrl?: string;
  fileSizeBytes?: number;
  expiresInSeconds?: number;
  error?: string;
}

export async function requestMediaDownload(
  targetUrl: string,
  format: MediaFormat,
  quality: MediaQuality
): Promise<{ jobId: string; status: string; estimatedSeconds?: number }> {
  const res = await fetch(`${API_BASE_URL}/download`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ url: targetUrl, format, quality }),
  });
  if (!res.ok) {
    const errData = await res.json().catch(() => ({}));
    throw new Error(errData.error || `Download request failed (${res.status})`);
  }
  return await res.json();
}

export async function pollMediaDownloadStatus(jobId: string): Promise<MediaJobStatus> {
  const res = await fetch(`${API_BASE_URL}/download/${jobId}`);
  if (!res.ok) {
    throw new Error(`Failed to check job status (${res.status})`);
  }
  return await res.json();
}

/**
 * Attempts to inspect media via live Go backend, with seamless fallback to client mock.
 */
export async function fetchMediaInfo(targetUrl: string): Promise<MediaInfo> {
  try {
    const controller = new AbortController();
    // Allow up to 20s for real-time video stream inspection across remote platform CDN/extractors
    const timeoutId = setTimeout(() => controller.abort(), 20000);

    const res = await fetch(`${API_BASE_URL}/info`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ url: targetUrl }),
      signal: controller.signal,
    });
    clearTimeout(timeoutId);


    if (res.ok) {
      const liveData: MediaInfo = await res.json();
      if (liveData && liveData.id) {
        return liveData;
      }
    }
  } catch {
    // Backend offline or unreachable, fall through to client mock
  }

  // Client-side fallback simulation with rich assets
  await new Promise((resolve) => setTimeout(resolve, 450));

  const platform: MediaPlatform = detectPlatform(targetUrl);
  const platformLabel = getPlatformLabel(platform);

  if (platform === 'tiktok') {
    return {
      id: 'tt_mock_98231',
      url: targetUrl,
      platform: 'tiktok',
      title: 'Viral Motion Design & 3D Interactive Animation Showcase',
      author: 'Sarah Jenkins',
      authorHandle: '@sarah_motionlab',
      authorAvatarUrl: '/assets/avatars/sarah-jenkins.webp',
      thumbnailUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&auto=format&fit=crop&q=85',
      videoPreviewUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
      duration: '0:48',
      viewsCount: '1.4M views',
      availableFormats: ['video', 'audio'],
      availableQualities: ['original', '1080p', '720p', '320kbps'],
    };
  }

  if (platform === 'youtube') {
    return {
      id: 'yt_mock_74829',
      url: targetUrl,
      platform: 'youtube',
      title: 'Distributed System Transcoding & High Throughput Video Streams',
      author: 'Alex Chen',
      authorHandle: '@alexchen_cloud',
      authorAvatarUrl: '/assets/avatars/alex-chen.webp',
      thumbnailUrl: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=800&auto=format&fit=crop&q=85',
      videoPreviewUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
      duration: '12:35',
      viewsCount: '482K views',
      availableFormats: ['video', 'audio'],
      availableQualities: ['1080p', '720p', '480p', '320kbps', '128kbps'],
    };
  }

  if (platform === 'instagram') {
    return {
      id: 'ig_mock_51294',
      url: targetUrl,
      platform: 'instagram',
      title: 'Cinematic Visual Exploration: Urban Nightscapes and Neon Architecture',
      author: 'Elena Rostova',
      authorHandle: '@elena_cinema',
      authorAvatarUrl: '/assets/avatars/elena-rostova.webp',
      thumbnailUrl: 'https://images.unsplash.com/photo-1514565131-fce0801e5785?w=800&auto=format&fit=crop&q=85',
      videoPreviewUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
      duration: '01:15',
      viewsCount: '890K views',
      availableFormats: ['video', 'audio'],
      availableQualities: ['1080p', '720p', '320kbps'],
    };
  }

  if (platform === 'twitter') {
    return {
      id: 'x_mock_42109',
      url: targetUrl,
      platform: 'twitter',
      title: 'Live Demo: Rust + WebAssembly Low-Latency Media Processing',
      author: 'Marcus Vance',
      authorHandle: '@marcus_systems',
      authorAvatarUrl: '/assets/avatars/marcus-vance.webp',
      thumbnailUrl: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800&auto=format&fit=crop&q=85',
      videoPreviewUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyBlazes.mp4',
      duration: '02:18',
      viewsCount: '320K views',
      availableFormats: ['video', 'audio'],
      availableQualities: ['1080p', '720p', '320kbps'],
    };
  }

  if (platform === 'webpage') {
    return {
      id: 'html_mock_31024',
      url: targetUrl,
      platform: 'webpage',
      title: 'RFC 9110: HTTP Semantics Specification & Stream Caching Protocol',
      author: 'Technical Docs Team',
      authorHandle: '@ietf_rfc',
      authorAvatarUrl: '/assets/avatars/dev-lead.webp',
      thumbnailUrl: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&auto=format&fit=crop&q=85',
      duration: 'Page Snapshot',
      availableFormats: ['html'],
      availableQualities: ['raw_html', 'clean_html'],
    };
  }

  return {
    id: `media_${Date.now()}`,
    url: targetUrl,
    platform: platform,
    title: `${platformLabel} Universal Media Stream`,
    author: 'Verified Creator',
    thumbnailUrl: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&auto=format&fit=crop&q=85',
    videoPreviewUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4',
    duration: '03:45',
    viewsCount: '150K views',
    availableFormats: ['video', 'audio', 'html'],
    availableQualities: ['1080p', '720p', '320kbps', 'clean_html'],
  };
}
