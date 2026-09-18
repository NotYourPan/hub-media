export type MediaPlatform =
  | 'youtube'
  | 'tiktok'
  | 'instagram'
  | 'facebook'
  | 'twitter'
  | 'webpage'
  | 'unknown';

export type MediaFormat = 'video' | 'audio' | 'html';

export type MediaQuality =
  | 'original'
  | '1080p'
  | '720p'
  | '480p'
  | '320kbps'
  | '128kbps'
  | 'raw_html'
  | 'clean_html';

export type DownloadStatus = 'idle' | 'analyzing' | 'success' | 'error';

export interface MediaInfo {
  id: string;
  url: string;
  platform: MediaPlatform;
  title: string;
  author: string;
  authorHandle?: string;
  authorAvatarUrl?: string;
  thumbnailUrl: string;
  videoPreviewUrl?: string;
  duration?: string;
  viewsCount?: string;
  availableFormats: MediaFormat[];
  availableQualities: MediaQuality[];
}

export interface DownloadResult {
  mediaInfo: MediaInfo;
  selectedFormat: MediaFormat;
  selectedQuality: MediaQuality;
  fileSizeEstimate: string;
  downloadUrl?: string;
}

export type HtmlEntryFile = 'index.html' | 'about.html' | 'docs.html';
