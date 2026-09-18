# Hub

A modern, developer-first, open-source media ingestion and format extraction platform built with React, Vite Multi-Page Architecture, and strict TypeScript.

- Production Domain: https://hub.zidanmutaqin.cloud
- Architecture: Zero-Bloat Lightweight Static Client (3 Independent HTML Entrypoints)
- Public API Base: https://api.zidanmutaqin.cloud/v1/media
- Planned Processing Engine: Go Backend + yt-dlp + FFmpeg
- License: MIT

---

## Overview

Hub is a lightweight, privacy-conscious media analysis and extraction platform. Designed as a zero-dependency static Multi-Page Application, Hub provides three dedicated, high-speed interfaces for parsing media URLs across major platforms (YouTube, TikTok, Instagram, Facebook, X), exploring system architecture, and connecting to the public REST API.

---

## Key Features

- Kraken-Inspired Design System: Distinctive purple brand identity (`#7132f5`, `#5741d8`), near-black text, cool blue-gray neutral scale, strictly 12px button radius (no pill buttons), and subtle elevation shadows (`rgba(0,0,0,0.03) 0px 4px 24px`).
- Dark & Light Mode: Fully reactive theme switcher with local storage persistence and system preference auto-detection.
- Bilingual i18n Support: Full internationalization supporting English (`en`) and Indonesian (`id`) with reactive language toggle.
- Interactive FAQ Accordion: Accessible knowledge base answering architectural, format, privacy, and API questions.
- Real Media Assets & Stream Preview: High-resolution media cards with live stream video playback preview.
- Lightweight Multi-Page Architecture (MPA): Features three independent physical HTML entry points (`index.html`, `about.html`, `docs.html`), completely eliminating client-side routing overhead and ensuring instant time-to-interactive.
- Multi-Platform Ingestion: Ingestion support for YouTube, TikTok, Instagram, Facebook, X (Twitter), and general Webpage content extraction.
- Instant Host Detection: Real-time hostname parsing and brand badge identification as links are typed or pasted.
- Format and Quality Selection: Inspect stream variants across Video (MP4), Audio (MP3 stems), and Webpage DOM snapshots.
- Public REST API Documentation: Comprehensive developer guide with interactive macOS Terminal playground for integrating Hub into bots, scripts, and third-party apps via public API endpoints.
- Pure CSS Design Tokens: Built with native CSS variables and semantic HTML5 without heavy UI frameworks (no Tailwind, no Bootstrap).
- Serverless-Ready Clean URLs: Native routing configured through `public/_redirects` (`/about`, `/docs`).

---

## Tech Stack

- Frontend: React 19
- Build Tooling: Vite 6 (Multi-Page Rollup configuration)
- Language: TypeScript 5.7 (Strict mode)
- Styling: Vanilla CSS3 with centralized design tokens (`src/styles/global.css`)
- Animations: Lenis Smooth Scroll, Reactbits DecryptedText & SpotlightCard, Web3 Particle Canvas
- Hosting Target: Netlify Static Delivery

---

## Dedicated Application Endpoints

Hub is split into three standalone HTML entry points:

### 1. Media Downloader (`index.html`)
- Route: `/`
- Entry: `src/main.tsx` -> `src/pages/Home.tsx`
- Purpose: Primary landing interface providing cross-platform URL analysis, quick stream inspection, format selection, and stream simulation.

### 2. About Us & Architecture (`about.html`)
- Route: `/about` or `/about.html`
- Entry: `src/about.tsx` -> `src/pages/About.tsx`
- Purpose: Explains Hub's open-source mission, privacy guarantees (no malicious ads or trackers), and distributed Go backend transcoding pipeline.

### 3. Public API Documentation (`docs.html`)
- Route: `/docs` or `/docs.html`
- Entry: `src/docs.tsx` -> `src/pages/Docs.tsx`
- Purpose: Complete interactive reference guide with cURL examples, JSON schemas, and code integration snippets for using `api.zidanmutaqin.cloud`.

---

## Connecting to the Public API

You can programmatically extract media metadata and request transcoding streams from your own applications:

### 1. Inspect Media URL

```bash
curl -X POST https://api.zidanmutaqin.cloud/v1/media/info \
  -H "Content-Type: application/json" \
  -d '{
    "url": "https://www.youtube.com/watch?v=dQw4w9WgXcQ"
  }'
```

Response:
```json
{
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
}
```

### 2. Request Stream Extraction

```bash
curl -X POST https://api.zidanmutaqin.cloud/v1/media/download \
  -H "Content-Type: application/json" \
  -d '{
    "url": "https://www.tiktok.com/@creator/video/73928190283",
    "format": "video",
    "quality": "1080p"
  }'
```

### 3. JavaScript / TypeScript Fetch Example

```typescript
async function getMediaStream(targetUrl: string) {
  const response = await fetch('https://api.zidanmutaqin.cloud/v1/media/info', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ url: targetUrl }),
  });

  const metadata = await response.json();
  console.log('Title:', metadata.title);
  console.log('Available Formats:', metadata.availableFormats);
  return metadata;
}
```

---

## Project Structure

```text
/
├── .gitignore
├── index.html                  # Media Downloader entry point
├── about.html                  # About Us entry point
├── docs.html                   # Public API Docs entry point
├── package.json
├── tsconfig.json
├── tsconfig.node.json
├── vite.config.ts              # Vite Rollup MPA configuration
├── README.md
├── LICENSE                     # MIT License
├── public/
│   └── _redirects              # Netlify clean URL rules
├── src/
│   ├── main.tsx                # Mounts Downloader to index.html
│   ├── about.tsx               # Mounts About to about.html
│   ├── docs.tsx                # Mounts Docs to docs.html
│   ├── components/
│   │   ├── Navbar.tsx          # Navigation across Downloader, About, Docs
│   │   ├── Footer.tsx          # Footer with API links
│   │   ├── DownloaderInput.tsx # Reusable URL input with paste/clear actions
│   │   ├── PlatformBadge.tsx   # Brand SVG logos (YouTube, TikTok, etc.)
│   │   ├── DownloadResult.tsx  # Media metadata preview & format selector
│   │   └── animations/         # Lenis scroll, SpotlightCard, DecryptedText
│   ├── pages/
│   │   ├── Home.tsx            # Downloader web application
│   │   ├── About.tsx           # About Us & architecture
│   │   └── Docs.tsx            # Public API documentation
│   ├── lib/
│   │   ├── platform.ts         # Hostname parser and platform detector
│   │   └── api.ts              # Future Go API contract and mock resolver
│   ├── types/
│   │   └── media.ts            # Core TypeScript interfaces
│   └── styles/
│       └── global.css          # Developer dark theme design system
```

---

## Getting Started

### Prerequisites

- Node.js 18.0.0 or higher
- npm (or pnpm / yarn)

### Installation & Run

1. Clone the repository:
```bash
git clone https://github.com/your-username/hub.git
cd hub
```

2. Install dependencies:
```bash
npm install
```

3. Start development server:
```bash
npm run dev
```

4. Access the application:
- Downloader: http://localhost:5173/
- About Us: http://localhost:5173/about.html (or http://localhost:5173/about)
- Public API Docs: http://localhost:5173/docs.html (or http://localhost:5173/docs)

---

## Building for Production

Compile the production bundle:
```bash
npm run build
```

The output directory `dist/` will contain:
- `dist/index.html`
- `dist/about.html`
- `dist/docs.html`
- `dist/_redirects`
- Bundled CSS and JavaScript assets

---
## Contributor
Contributor on this repository:
- [notyourpan](https;//github.com/notyourpan)

---
## License

Distributed under the [MIT License](LICENSE).
