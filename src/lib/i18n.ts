import { useSyncExternalStore } from 'react';

export type Language = 'en' | 'id';

export const translations = {
  en: {
    // Navigation
    nav: {
      downloader: 'Downloader',
      about: 'About Us',
      docs: 'API Docs',
      openSource: 'Open Source',
      themeLight: 'Light',
      themeDark: 'Dark',
      closeMenu: 'Close menu',
      openMenu: 'Open menu',
      switchLang: 'Switch language',
    },

    // Home Page
    home: {
      heroTitle: 'Download media. Simply.',
      heroSubtitle: 'Free, lightweight, developer-first client for multi-platform stream inspection, format selection, and content extraction with zero bloated runtimes.',
      inputPlaceholder: 'Paste video, audio, or webpage URL...',
      supportedEngines: 'Supported engines:',
      analyzing: 'Connecting to media metadata resolver and inspecting stream sources...',
      errorValidUrl: 'Please enter a valid URL containing a recognizable domain name.',
      errorParse: 'Failed to parse media metadata from the provided URL.',
      samplesTag: 'Verified Media Sources',
      samplesTitle: 'Sample Media Extraction',
      samplesDesc: 'Click any sample to test real-time metadata resolution and video stream inspection.',
      inspectStream: 'Inspect Stream',
      suitesHeadingTag: 'Modular Architecture',
      suitesHeadingTitle: 'Dedicated Application Endpoints',
      suite1Tag: 'SUITE 01 / CORE',
      suite1Title: 'Media Downloader',
      suite1Text: 'Primary web interface for cross-platform URL analysis, format inspection, and direct stream extraction.',
      suite1Btn: 'Status: Active Client',
      suite2Tag: 'SUITE 02 / MISSION',
      suite2Title: 'About Us & Architecture',
      suite2Text: 'Learn about our open-source mission, zero-ad privacy commitment, and distributed Go transcoding design.',
      suite2Btn: 'Read About Hub',
      suite3Tag: 'SUITE 03 / DEVELOPERS',
      suite3Title: 'Public API Documentation',
      suite3Text: 'Integrate media extraction into your applications, bots, and CLI scripts via our public REST endpoints.',
      suite3Btn: 'Explore API Docs',
      pipelineTag: 'Processing Pipeline',
      pipelineTitle: 'How Hub Operates',
      step1Tag: 'STEP 01',
      step1Title: 'Target Parsing',
      step1Text: 'Client normalizes URL parameters and identifies the target media service host with zero redirects.',
      step2Tag: 'STEP 02',
      step2Title: 'Stream Resolution',
      step2Text: 'Media metadata, available codecs, audio bitrates, and source structure are resolved in parallel.',
      step3Tag: 'STEP 03',
      step3Title: 'Direct Delivery',
      step3Text: 'Target asset is delivered directly without intermediary compression degradation or third-party ads.',
      backendTitle: 'Distributed Engine Architecture',
      backendText: 'Hub connects this lightweight client with an asynchronous Go processing backend powered by yt-dlp and FFmpeg deployed at api.zidanmutaqin.cloud.',
    },

    // Downloader Form & Result
    downloader: {
      paste: 'Paste',
      clear: 'Clear',
      analyze: 'Analyze',
      analyzingBtn: 'Analyzing...',
      format: 'Format:',
      quality: 'Quality:',
      downloadBtn: 'Download',
      preparingBtn: 'Processing Stream...',
      creator: 'Creator:',
      identifier: 'Identifier:',
      downloadReady: 'Download Ready:',
      downloadStarting: 'Your download has started automatically.',
      clickToDownload: 'Click here if download does not start automatically',
      downloadFailed: 'Failed to process download. Please try again.',
      fileSize: 'File Size:',
      targetLabel: 'Target: Distributed Stream',
      watchPreview: 'Watch Stream Preview',
      showThumbnail: 'Show Thumbnail',
      playPreview: 'Watch sample video preview',
      formatVideo: 'Video (MP4)',
      formatAudio: 'Audio (MP3)',
      formatHtml: 'Webpage Source (HTML)',
      qualityOriginal: 'Original Source',
      quality1080p: '1080p Full HD',
      quality720p: '720p HD',
      quality480p: '480p Standard',
      quality320k: '320 kbps High Quality',
      quality128k: '128 kbps Standard',
      qualityRawHtml: 'Raw HTML Markup',
      qualityCleanHtml: 'Sanitized Article DOM',
    },

    // About Page
    about: {
      tag: 'Our Mission & Engineering',
      title: 'About Hub Downloader',
      subtitle: 'Engineered as an ad-free, privacy-first open source utility to replace bloated, malware-infested media download sites with a clean developer tool.',
      pillar1Tag: 'PILLAR 01',
      pillar1Title: 'Zero Malicious Ads',
      pillar1Text: 'Traditional downloader sites bombard users with deceptive popups, redirects, and trackers. Hub is 100% clean, transparent, and built with open web standards.',
      pillar2Tag: 'PILLAR 02',
      pillar2Title: 'Lightweight Architecture',
      pillar2Text: 'Built as a multi-page static application. Each suite loads only the minimal code required for execution, ensuring instant page response on any device.',
      pillar3Tag: 'PILLAR 03',
      pillar3Title: 'Open Developer API',
      pillar3Text: 'Hub is designed from day one to expose clean RESTful endpoints, allowing external developers, bots, and CLI scripts to automate media ingestion.',
      archTag: 'System Design',
      archTitle: 'End-to-End Processing Architecture',
      archDescTitle: 'Distributed Transcoding Pipeline',
      archDescText: 'The Hub platform decouples the static client interface from backend processing. Heavyweight audio/video demuxing and format conversion are orchestrated via Go microservices leveraging yt-dlp and FFmpeg worker pools.',
      fullSpecsLink: 'Read full specifications on the API Documentation page.',
      teamTag: 'Core Team',
      teamTitle: 'Meet the Founders',
      zidanRole: 'Lead · Co-Founder · Engineer',
      dhevanzaRole: 'Collaborator · UI & Integration',
      contribTag: 'Open Source',
      contribTitle: 'Contribute to Hub',
      contribText: 'Hub is free software distributed under the permissive MIT License. Contributions for new platform extractors, UI optimizations, and bug reports are warmly welcomed by the community.',
      launchDownloader: 'Launch Downloader',
      exploreDocs: 'Explore API Docs',
    },

    // Docs Page & Terminal
    docs: {
      tag: 'Developer Reference',
      title: 'Public API Documentation',
      subtitle: 'Integrate Hub media ingestion into your applications, bots, and CLI scripts via our public RESTful API.',
      envTag: 'API ENVIRONMENT',
      envTitle: 'Base Endpoint',
      envText: 'All requests must use HTTPS and send standard JSON payloads with Content-Type: application/json.',
      terminalTag: 'Interactive Terminal & Runner',
      terminalTitle: 'Public API Console',
      terminalPlaceholder: 'type command (e.g. curl ..., help, ping, clear) and press Enter',
      terminalRun: 'Run ⏎',
      terminalExecuting: 'Executing...',
      terminalCopy: 'pbcopy',
      terminalCopied: 'copied!',
      terminalClear: 'clear',
      terminalWelcome: 'Hub CLI Terminal [v1.0.0-release (darwin-arm64)]\nType any command below (e.g., curl, help, ls, ping, clear) or press Enter to run.',
      endpoint1Tag: 'Endpoint: Metadata Inspection',
      endpoint1Desc: 'Inspects a target media URL, automatically identifies the service provider (YouTube, TikTok, Instagram, Facebook, X, or general Webpage), and extracts available audio/video codecs, resolutions, and author details.',
      endpoint2Tag: 'Endpoint: Stream Extraction',
      endpoint2Desc: 'Dispatches an asynchronous media extraction and transcoding job to the backend worker pool.',
      endpoint3Tag: 'Endpoint: Job Status & Stream Delivery',
      endpoint3Desc: 'Polls the status of an ongoing transcoding job. Once status is ready, the payload contains the direct binary download stream URL.',
      codeExampleTag: 'Code Integration',
      codeExampleTitle: 'TypeScript / JavaScript Fetch Example',
    },

    // FAQ Section
    faq: {
      tag: 'Knowledge Base',
      title: 'Frequently Asked Questions',
      subtitle: 'Clear answers regarding Hub Downloader architecture, API limits, supported formats, and privacy commitments.',
      items: [
        {
          q: 'Is Hub Downloader completely free to use with zero advertisements?',
          a: 'Yes, Hub is 100% free and open-source software under the MIT License. Unlike traditional downloader sites, we do not inject deceptive redirect popups, crypto-mining scripts, or telemetry trackers.',
        },
        {
          q: 'What platforms, video resolutions, and audio codecs are supported?',
          a: 'Hub supports YouTube, TikTok (without watermarks), Instagram Reels, Facebook Watch, X (Twitter) video, and general HTML article extraction. Video qualities range from 480p up to 4K Ultra HD (MP4/WebM) and audio up to 320 kbps (MP3/M4A).',
        },
        {
          q: 'Can I automate media downloads using the REST API?',
          a: 'Yes! Hub provides a developer-first RESTful API at api.zidanmutaqin.cloud/v1/media. You can inspect metadata, submit transcoding jobs, and poll stream results with standard cURL, Node.js, Python, or Go clients.',
        },
        {
          q: 'Does Hub store, cache, or log downloaded media files?',
          a: 'No. Hub operates on a transient streaming pipeline. Binary assets are streamed directly through worker nodes and automatically purged within 60 minutes after conversion. We maintain zero user download logs.',
        },
        {
          q: 'How does the Go distributed transcoding architecture work?',
          a: 'The static multi-page frontend sends HTTPS requests to an asynchronous API gateway. Tasks are queued into a worker pool written in Go that orchestrates yt-dlp extraction and FFmpeg hardware acceleration for near-instant stream packaging.',
        },
        {
          q: 'Is there a rate limit on the public API endpoints?',
          a: 'Standard public endpoints allow up to 60 requests per minute per IP address. Self-hosted instances running the open-source backend have unlimited throughput.',
        },
      ],
    },

    // Footer
    footer: {
      bio: 'Modern, open-source media ingestion and format extraction interface. Fast, privacy-focused, and engineered without trackers or deceptive advertisements.',
      colProduct: 'Product',
      colDevs: 'Developers',
      colOpenSource: 'Open Source',
      mediaDownloader: 'Media Downloader',
      aboutHub: 'About Hub',
      publicApiDocs: 'Public API Docs',
      apiReference: 'REST API Reference',
      interactiveTerminal: 'Interactive Terminal',
      systemArchitecture: 'System Architecture',
      faq: 'FAQ & Knowledge Base',
      githubRepo: 'GitHub Repository',
      mitLicense: 'MIT License',
      reportIssue: 'Report an Issue',
      copyright: '(c) 2026 Hub. Open source software under the MIT License.',
      zeroTelemetry: 'Zero Telemetry / No Deceptive Ads',
      partOf: 'Part of: ',
      engineeredBy: 'Engineered by ',
    },
  },

  id: {
    // Navigasi
    nav: {
      downloader: 'Pengunduh',
      about: 'Tentang Kami',
      docs: 'Dokumentasi API',
      openSource: 'Open Source',
      themeLight: 'Terang',
      themeDark: 'Gelap',
      closeMenu: 'Tutup menu',
      openMenu: 'Buka menu',
      switchLang: 'Ganti bahasa',
    },

    // Halaman Beranda
    home: {
      heroTitle: 'Unduh media. Sederhana.',
      heroSubtitle: 'Klien pengunduh media gratis, ringan, dan ramah pengembang untuk inspeksi stream multi-platform dan ekstraksi format tanpa runtime yang membengkak.',
      inputPlaceholder: 'Tempel tautan video, audio, atau laman web...',
      supportedEngines: 'Mesin didukung:',
      analyzing: 'Menghubungkan ke resolver metadata media dan memeriksa sumber stream...',
      errorValidUrl: 'Harap masukkan URL yang valid dengan domain yang dapat dikenali.',
      errorParse: 'Gagal mengurai metadata media dari URL yang diberikan.',
      samplesTag: 'Sumber Media Terverifikasi',
      samplesTitle: 'Contoh Ekstraksi Media',
      samplesDesc: 'Klik salah satu sampel untuk menguji resolusi metadata dan inspeksi stream video secara langsung.',
      inspectStream: 'Inspeksi Stream',
      suitesHeadingTag: 'Arsitektur Modular',
      suitesHeadingTitle: 'Titik Masuk Aplikasi Khusus',
      suite1Tag: 'SUITE 01 / UTAMA',
      suite1Title: 'Pengunduh Media',
      suite1Text: 'Antarmuka web utama untuk analisis URL lintas platform, inspeksi format, dan ekstraksi stream langsung.',
      suite1Btn: 'Status: Klien Aktif',
      suite2Tag: 'SUITE 02 / MISI',
      suite2Title: 'Tentang Kami & Arsitektur',
      suite2Text: 'Pelajari misi open-source kami, komitmen privasi tanpa iklan, dan desain transcoding Go terdistribusi.',
      suite2Btn: 'Baca Tentang Hub',
      suite3Tag: 'SUITE 03 / PENGEMBANG',
      suite3Title: 'Dokumentasi API Publik',
      suite3Text: 'Integrasikan ekstraksi media ke dalam aplikasi, bot, dan skrip CLI Anda melalui endpoint REST publik kami.',
      suite3Btn: 'Jelajahi Dokumentasi API',
      pipelineTag: 'Alur Pemrosesan',
      pipelineTitle: 'Cara Kerja Hub',
      step1Tag: 'LANGKAH 01',
      step1Title: 'Penguraian Target',
      step1Text: 'Klien menormalkan parameter URL dan mengidentifikasi host layanan media target tanpa redirect.',
      step2Tag: 'LANGKAH 02',
      step2Title: 'Resolusi Stream',
      step2Text: 'Metadata media, codec yang tersedia, bitrate audio, dan struktur sumber diuraikan secara paralel.',
      step3Tag: 'LANGKAH 03',
      step3Title: 'Pengiriman Langsung',
      step3Text: 'Aset target dikirimkan langsung tanpa penurunan kompresi perantara atau iklan pihak ketiga.',
      backendTitle: 'Arsitektur Mesin Terdistribusi',
      backendText: 'Hub menghubungkan klien ringan ini dengan backend pemrosesan Go asinkron yang ditenagai oleh yt-dlp dan FFmpeg yang di-deploy di api.zidanmutaqin.cloud.',
    },

    // Form & Hasil Pengunduh
    downloader: {
      paste: 'Tempel',
      clear: 'Hapus',
      analyze: 'Analisis',
      analyzingBtn: 'Menganalisis...',
      format: 'Format:',
      quality: 'Kualitas:',
      downloadBtn: 'Unduh',
      preparingBtn: 'Memproses Stream...',
      creator: 'Kreator:',
      identifier: 'ID:',
      downloadReady: 'Unduhan Siap:',
      downloadStarting: 'File Anda sedang diunduh otomatis.',
      clickToDownload: 'Klik di sini jika unduhan tidak mulai otomatis',
      downloadFailed: 'Gagal memproses unduhan. Silakan coba lagi.',
      fileSize: 'Ukuran File:',
      targetLabel: 'Target: Stream Terdistribusi',
      watchPreview: 'Tonton Pratinjau',
      showThumbnail: 'Tampilkan Thumbnail',
      playPreview: 'Tonton pratinjau sampel video',
      formatVideo: 'Video (MP4)',
      formatAudio: 'Audio (MP3)',
      formatHtml: 'Sumber Laman Web (HTML)',
      qualityOriginal: 'Sumber Asli',
      quality1080p: '1080p Full HD',
      quality720p: '720p HD',
      quality480p: '480p Standar',
      quality320k: '320 kbps Kualitas Tinggi',
      quality128k: '128 kbps Standar',
      qualityRawHtml: 'Markup HTML Mentah',
      qualityCleanHtml: 'DOM Artikel Bersih',
    },

    // Halaman Tentang Kami
    about: {
      tag: 'Misi & Rekayasa Kami',
      title: 'Tentang Hub Downloader',
      subtitle: 'Dirancang sebagai utilitas open-source bebas iklan dan mengutamakan privasi untuk menggantikan situs pengunduh media yang penuh malware dengan alat pengembang yang bersih.',
      pillar1Tag: 'PILAR 01',
      pillar1Title: 'Nol Iklan Berbahaya',
      pillar1Text: 'Situs pengunduh tradisional membombardir pengguna dengan popup, redirect, dan pelacak berbahaya. Hub 100% bersih, transparan, dan dibangun dengan standar web terbuka.',
      pillar2Tag: 'PILAR 02',
      pillar2Title: 'Arsitektur Ringan',
      pillar2Text: 'Dibangun sebagai aplikasi multi-page statis. Setiap suite hanya memuat kode minimal yang diperlukan untuk eksekusi, memastikan respon instan pada perangkat apa pun.',
      pillar3Tag: 'PILAR 03',
      pillar3Title: 'API Pengembang Terbuka',
      pillar3Text: 'Hub dirancang sejak hari pertama untuk menyediakan endpoint RESTful yang bersih, memungkinkan pengembang eksternal, bot, dan skrip mengotomatiskan pengunduhan media.',
      archTag: 'Desain Sistem',
      archTitle: 'Arsitektur Pemrosesan End-to-End',
      archDescTitle: 'Pipeline Transcoding Terdistribusi',
      archDescText: 'Platform Hub memisahkan antarmuka klien statis dari pemrosesan backend. Demuxing audio/video dan konversi format diatur melalui microservice Go yang memanfaatkan worker pool yt-dlp dan FFmpeg.',
      fullSpecsLink: 'Baca spesifikasi lengkap di halaman Dokumentasi API.',
      teamTag: 'Tim Inti',
      teamTitle: 'Kenali Para Pendiri',
      zidanRole: 'Ketua · Co-Founder · Rekayasa',
      dhevanzaRole: 'Kolaborator · Antarmuka & Integrasi',
      contribTag: 'Open Source',
      contribTitle: 'Kontribusi ke Hub',
      contribText: 'Hub adalah perangkat lunak gratis yang didistribusikan di bawah Lisensi MIT. Kontribusi untuk ekstraktor platform baru, optimasi antarmuka, dan pelaporan bug sangat disambut.',
      launchDownloader: 'Buka Pengunduh',
      exploreDocs: 'Jelajahi Dokumentasi API',
    },

    // Halaman Docs & Terminal
    docs: {
      tag: 'Referensi Pengembang',
      title: 'Dokumentasi API Publik',
      subtitle: 'Integrasikan penarikan media Hub ke dalam aplikasi, bot, dan skrip CLI Anda melalui API RESTful publik kami.',
      envTag: 'LINGKUNGAN API',
      envTitle: 'Endpoint Dasar',
      envText: 'Semua permintaan harus menggunakan HTTPS dan mengirimkan payload JSON standar dengan Content-Type: application/json.',
      terminalTag: 'Terminal & Runner Interaktif',
      terminalTitle: 'Konsol API Publik',
      terminalPlaceholder: 'ketik perintah (mis. curl ..., help, ping, clear) lalu tekan Enter',
      terminalRun: 'Jalankan ⏎',
      terminalExecuting: 'Mengeksekusi...',
      terminalCopy: 'salin',
      terminalCopied: 'tersalin!',
      terminalClear: 'bersihkan',
      terminalWelcome: 'Hub CLI Terminal [v1.0.0-release (darwin-arm64)]\nKetik perintah di bawah ini (mis. curl, help, ls, ping, clear) atau tekan Enter untuk menjalankan.',
      endpoint1Tag: 'Endpoint: Inspeksi Metadata',
      endpoint1Desc: 'Memeriksa URL media target, secara otomatis mengidentifikasi penyedia layanan (YouTube, TikTok, Instagram, Facebook, X, atau Webpage), dan mengekstrak codec audio/video, resolusi, serta detail kreator yang tersedia.',
      endpoint2Tag: 'Endpoint: Ekstraksi Stream',
      endpoint2Desc: 'Mengirimkan tugas ekstraksi dan transcoding media asinkron ke worker pool backend.',
      endpoint3Tag: 'Endpoint: Status Tugas & Pengiriman Stream',
      endpoint3Desc: 'Memeriksa status tugas transcoding yang sedang berlangsung. Setelah status ready, payload berisi URL stream unduhan biner langsung.',
      codeExampleTag: 'Integrasi Kode',
      codeExampleTitle: 'Contoh Fetch TypeScript / JavaScript',
    },

    // Bagian FAQ
    faq: {
      tag: 'Basis Pengetahuan',
      title: 'Pertanyaan yang Sering Diajukan',
      subtitle: 'Jawaban jelas mengenai arsitektur Hub Downloader, batasan API, format yang didukung, dan komitmen privasi.',
      items: [
        {
          q: 'Apakah Hub Downloader benar-benar gratis tanpa iklan?',
          a: 'Ya, Hub adalah perangkat lunak 100% gratis dan open source di bawah Lisensi MIT. Berbeda dari situs pengunduh media konvensional, kami tidak menyisipkan popup pengalihan, skrip penambangan, atau pelacak telemetri.',
        },
        {
          q: 'Platform, resolusi video, dan codec audio apa saja yang didukung?',
          a: 'Hub mendukung YouTube, TikTok (tanpa watermark), Instagram Reels, Facebook Watch, video X (Twitter), dan ekstraksi artikel laman web HTML. Resolusi video didukung mulai 480p hingga 4K Ultra HD (MP4/WebM) serta audio hingga 320 kbps (MP3/M4A).',
        },
        {
          q: 'Bisakah saya mengotomatiskan pengunduhan media menggunakan REST API?',
          a: 'Tentu! Hub menyediakan API RESTful ramah pengembang di api.zidanmutaqin.cloud/v1/media. Anda dapat memeriksa metadata, mengirim tugas transcoding, dan mengambil stream dengan cURL, Node.js, Python, atau Go.',
        },
        {
          q: 'Apakah Hub menyimpan atau mencatat file media yang diunduh?',
          a: 'Tidak. Hub beroperasi dengan pipeline streaming sementara. Aset biner dialirkan langsung melalui node worker dan otomatis dihapus dalam waktu 60 menit setelah konversi. Kami tidak mencatat log aktivitas unduhan pengguna.',
        },
        {
          q: 'Bagaimana cara kerja arsitektur transcoding terdistribusi Go?',
          a: 'Frontend multi-page statis mengirim permintaan HTTPS ke API gateway asinkron. Tugas dimasukkan ke dalam antrean worker pool Go yang mengorkestrasikan ekstraksi yt-dlp dan akselerasi hardware FFmpeg untuk pembuatan paket stream instan.',
        },
        {
          q: 'Apakah ada batasan kecepatan (rate limit) pada endpoint API publik?',
          a: 'Endpoint publik standar mengizinkan hingga 60 permintaan per menit per alamat IP. Instans mandiri (self-hosted) yang menjalankan backend open source tidak memiliki batasan throughput.',
        },
      ],
    },

    // Footer
    footer: {
      bio: 'Antarmuka ekstraksi format dan penarikan media modern berlisensi open source. Cepat, berfokus pada privasi, dan dirancang tanpa pelacak atau iklan menyesatkan.',
      colProduct: 'Produk',
      colDevs: 'Pengembang',
      colOpenSource: 'Open Source',
      mediaDownloader: 'Pengunduh Media',
      aboutHub: 'Tentang Hub',
      publicApiDocs: 'Dokumentasi API Publik',
      apiReference: 'Referensi REST API',
      interactiveTerminal: 'Terminal Interaktif',
      systemArchitecture: 'Arsitektur Sistem',
      faq: 'FAQ & Basis Pengetahuan',
      githubRepo: 'Repositori GitHub',
      mitLicense: 'Lisensi MIT',
      reportIssue: 'Laporkan Masalah',
      copyright: '(c) 2026 Hub. Perangkat lunak open source berlisensi MIT.',
      zeroTelemetry: 'Nol Telemetri / Tanpa Iklan Menyesatkan',
      partOf: 'Bagian dari: ',
      engineeredBy: 'Dikembangkan oleh ',
    },
  },
};

export function getInitialLanguage(): Language {
  if (typeof window !== 'undefined') {
    const saved = localStorage.getItem('hub-lang') as Language | null;
    if (saved === 'en' || saved === 'id') {
      return saved;
    }
  }
  return 'en';
}

let currentLang: Language = getInitialLanguage();
const listeners = new Set<() => void>();

function subscribe(callback: () => void) {
  listeners.add(callback);
  return () => {
    listeners.delete(callback);
  };
}

function getSnapshot(): Language {
  return currentLang;
}

export function setLanguage(newLang: Language) {
  if (currentLang !== newLang) {
    currentLang = newLang;
    if (typeof window !== 'undefined') {
      localStorage.setItem('hub-lang', newLang);
      document.documentElement.setAttribute('lang', newLang);
      window.dispatchEvent(new CustomEvent('hub-lang-change', { detail: newLang }));
    }
    listeners.forEach((listener) => listener());
  }
}

export function toggleLanguage() {
  setLanguage(currentLang === 'en' ? 'id' : 'en');
}

// Sync across browser tabs or external events
if (typeof window !== 'undefined') {
  window.addEventListener('storage', (e) => {
    if (e.key === 'hub-lang' && (e.newValue === 'en' || e.newValue === 'id')) {
      if (e.newValue !== currentLang) {
        currentLang = e.newValue;
        document.documentElement.setAttribute('lang', currentLang);
        listeners.forEach((listener) => listener());
      }
    }
  });

  document.documentElement.setAttribute('lang', currentLang);
}

export function useLanguage() {
  const lang = useSyncExternalStore<Language>(subscribe, getSnapshot, () => 'en');
  const t = translations[lang];

  return { lang, toggleLanguage, setLang: setLanguage, t };
}
