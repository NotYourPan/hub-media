import React, { useState, useRef, useEffect } from 'react';
import { fetchMediaInfo } from '../lib/api';
import { useLanguage } from '../lib/i18n';

type LanguageType = 'curl' | 'node' | 'python' | 'go';
type EndpointType = 'info' | 'download' | 'status';

export const ApiPlayground: React.FC = () => {
  const { t } = useLanguage();
  const [endpoint, setEndpoint] = useState<EndpointType>('info');
  const [language, setLanguage] = useState<LanguageType>('curl');
  const [targetUrl, setTargetUrl] = useState<string>('https://www.youtube.com/watch?v=dQw4w9WgXcQ');
  const [format, setFormat] = useState<string>('video');
  const [quality, setQuality] = useState<string>('1080p');
  const [jobId, setJobId] = useState<string>('job_89420ab');

  // Interactive typing input state
  const [currentInput, setCurrentInput] = useState<string>(
    'curl -X POST https://api.zidanmutaqin.cloud/v1/media/info -d \'{"url": "https://www.youtube.com/watch?v=dQw4w9WgXcQ"}\''
  );
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState<number>(-1);

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [logs, setLogs] = useState<Array<{ type: 'command' | 'response' | 'info' | 'error'; content: string; status?: string; time?: number }>>([
    {
      type: 'info',
      content: 'Hub CLI Terminal [v1.0.0-release (darwin-arm64)]\nType any command below (e.g., curl, help, ls, ping, clear) or press Enter to run.',
    },
    {
      type: 'command',
      content: 'curl -X POST https://api.zidanmutaqin.cloud/v1/media/info -d \'{"url": "https://www.youtube.com/watch?v=dQw4w9WgXcQ"}\'',
    },
    {
      type: 'response',
      status: 'HTTP/2 200 OK',
      time: 38,
      content: JSON.stringify(
        {
          id: 'yt_dQw4w9WgXcQ',
          url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
          platform: 'youtube',
          title: 'Rick Astley - Never Gonna Give You Up (Official Music Video)',
          author: 'Rick Astley',
          authorHandle: '@RickAstleyYT',
          duration: '03:33',
          thumbnailUrl: 'https://i.ytimg.com/vi/dQw4w9WgXcQ/maxresdefault.jpg',
          availableFormats: ['video', 'audio'],
          availableQualities: ['1080p', '720p', '480p', '320kbps', '128kbps'],
        },
        null,
        2
      ),
    },
  ]);

  const [copied, setCopied] = useState<boolean>(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const terminalEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll terminal to bottom when new logs appear
  useEffect(() => {
    terminalEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [logs, isLoading]);

  const generateDefaultCommand = (ep: EndpointType, lang: LanguageType, url: string, fmt: string, q: string, job: string): string => {
    const baseUrl = 'https://api.zidanmutaqin.cloud/v1/media';

    if (ep === 'info') {
      switch (lang) {
        case 'curl':
          return `curl -X POST ${baseUrl}/info -d '{"url": "${url}"}'`;
        case 'node':
          return `node -e 'fetch("${baseUrl}/info", {method:"POST", body:JSON.stringify({url:"${url}"})}).then(r=>r.json()).then(console.log)'`;
        case 'python':
          return `python3 -c 'import requests; print(requests.post("${baseUrl}/info", json={"url": "${url}"}).json())'`;
        case 'go':
          return `go run client.go -endpoint=info -url="${url}"`;
      }
    }

    if (ep === 'download') {
      switch (lang) {
        case 'curl':
          return `curl -X POST ${baseUrl}/download -d '{"url": "${url}", "format": "${fmt}", "quality": "${q}"}'`;
        case 'node':
          return `node -e 'fetch("${baseUrl}/download", {method:"POST", body:JSON.stringify({url:"${url}", format:"${fmt}", quality:"${q}"})}).then(r=>r.json()).then(console.log)'`;
        case 'python':
          return `python3 -c 'import requests; print(requests.post("${baseUrl}/download", json={"url": "${url}", "format": "${fmt}"}).json())'`;
        case 'go':
          return `go run client.go -endpoint=download -url="${url}" -format="${fmt}"`;
      }
    }

    switch (lang) {
      case 'curl':
        return `curl -X GET ${baseUrl}/download/${job}`;
      case 'node':
        return `node -e 'fetch("${baseUrl}/download/${job}").then(r=>r.json()).then(console.log)'`;
      case 'python':
        return `python3 -c 'import requests; print(requests.get("${baseUrl}/download/${job}").json())'`;
      case 'go':
        return `go run client.go -endpoint=status -job=${job}`;
    }
  };

  const handleEndpointSelect = (newEp: EndpointType) => {
    setEndpoint(newEp);
    const newCmd = generateDefaultCommand(newEp, language, targetUrl, format, quality, jobId);
    setCurrentInput(newCmd);
  };

  const handleLanguageSelect = (newLang: LanguageType) => {
    setLanguage(newLang);
    const newCmd = generateDefaultCommand(endpoint, newLang, targetUrl, format, quality, jobId);
    setCurrentInput(newCmd);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(currentInput);
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  };

  const handleClear = () => {
    setLogs([]);
  };

  const executeRawCommand = async (cmdToRun: string) => {
    const trimmed = cmdToRun.trim();
    if (!trimmed) return;

    // Save to command history
    setCommandHistory((prev) => [...prev, trimmed]);
    setHistoryIndex(-1);

    // Record entered command in log
    setLogs((prev) => [
      ...prev,
      {
        type: 'command',
        content: trimmed,
      },
    ]);

    setIsLoading(true);
    const startTime = performance.now();

    const lower = trimmed.toLowerCase();

    // Built-in terminal utility commands
    if (lower === 'clear') {
      setLogs([]);
      setIsLoading(false);
      return;
    }

    if (lower === 'help') {
      setLogs((prev) => [
        ...prev,
        {
          type: 'info',
          content: `Hub Terminal Commands:
  curl <endpoint>      Dispatch HTTP cURL request to Hub API
  info <url>           Quickly inspect media stream metadata
  download <url>       Simulate transcoding pipeline submission
  ping                 Test latency to api.zidanmutaqin.cloud
  ls                   List client SDK source files
  cat <file>           Display source file content (e.g., cat curl.sh)
  clear                Clear terminal output`,
        },
      ]);
      setIsLoading(false);
      return;
    }

    if (lower === 'ls') {
      setLogs((prev) => [
        ...prev,
        {
          type: 'info',
          content: 'curl.sh   client.js   client.py   main.go   package.json   README.md',
        },
      ]);
      setIsLoading(false);
      return;
    }

    if (lower.startsWith('cat ')) {
      const fileName = trimmed.split(' ')[1] || '';
      let fileContent = '';
      if (fileName.includes('curl')) {
        fileContent = `#!/usr/bin/env bash\ncurl -X POST https://api.zidanmutaqin.cloud/v1/media/info \\\n  -H "Content-Type: application/json" \\\n  -d '{"url": "${targetUrl}"}'`;
      } else if (fileName.includes('js') || fileName.includes('node')) {
        fileContent = `const res = await fetch('https://api.zidanmutaqin.cloud/v1/media/info', {\n  method: 'POST',\n  headers: { 'Content-Type': 'application/json' },\n  body: JSON.stringify({ url: '${targetUrl}' })\n});\nconsole.log(await res.json());`;
      } else if (fileName.includes('py')) {
        fileContent = `import requests\nr = requests.post('https://api.zidanmutaqin.cloud/v1/media/info', json={'url': '${targetUrl}'})\nprint(r.json())`;
      } else {
        fileContent = `File: ${fileName}\nEndpoint: https://api.zidanmutaqin.cloud/v1/media/*\nStatus: Ready`;
      }
      setLogs((prev) => [
        ...prev,
        {
          type: 'info',
          content: fileContent,
        },
      ]);
      setIsLoading(false);
      return;
    }

    if (lower === 'ping' || lower.startsWith('ping ')) {
      await new Promise((res) => setTimeout(res, 350));
      setLogs((prev) => [
        ...prev,
        {
          type: 'info',
          content: `PING api.zidanmutaqin.cloud (104.21.48.12): 56 data bytes
64 bytes from 104.21.48.12: icmp_seq=0 ttl=58 time=21.4 ms
64 bytes from 104.21.48.12: icmp_seq=1 ttl=58 time=19.8 ms
64 bytes from 104.21.48.12: icmp_seq=2 ttl=58 time=22.1 ms
--- api.zidanmutaqin.cloud ping statistics ---
3 packets transmitted, 3 packets received, 0.0% packet loss
round-trip min/avg/max = 19.8/21.1/22.1 ms`,
        },
      ]);
      setIsLoading(false);
      return;
    }

    // Process API requests (curl, node, python, go, or direct URL commands)
    try {
      // Extract target URL from command if provided
      let extractedUrl = targetUrl;
      const urlMatch = trimmed.match(/https?:\/\/[^\s"']+/);
      if (urlMatch && !urlMatch[0].includes('api.zidanmutaqin.cloud')) {
        extractedUrl = urlMatch[0];
      }

      if (lower.includes('/download') || lower.startsWith('download')) {
        await new Promise((res) => setTimeout(res, 500));
        const elapsed = Math.round(performance.now() - startTime);
        setLogs((prev) => [
          ...prev,
          {
            type: 'response',
            status: 'HTTP/2 202 Accepted',
            time: elapsed,
            content: JSON.stringify(
              {
                jobId: `job_${Math.random().toString(36).substring(2, 9)}`,
                status: 'queued',
                format: format,
                quality: quality,
                target: extractedUrl,
                estimatedSeconds: 2.5,
                engine: 'Go + yt-dlp + FFmpeg cluster',
              },
              null,
              2
            ),
          },
        ]);
      } else if (lower.includes('/download/') || lower.startsWith('status')) {
        await new Promise((res) => setTimeout(res, 380));
        const elapsed = Math.round(performance.now() - startTime);
        setLogs((prev) => [
          ...prev,
          {
            type: 'response',
            status: 'HTTP/2 200 OK',
            time: elapsed,
            content: JSON.stringify(
              {
                jobId: jobId,
                status: 'ready',
                downloadUrl: `https://api.zidanmutaqin.cloud/v1/media/stream/${jobId}.mp4`,
                fileSizeBytes: 14820921,
                expiresInSeconds: 3600,
              },
              null,
              2
            ),
          },
        ]);
      } else {
        // Default to info endpoint
        const data = await fetchMediaInfo(extractedUrl);
        const elapsed = Math.round(performance.now() - startTime);
        setLogs((prev) => [
          ...prev,
          {
            type: 'response',
            status: 'HTTP/2 200 OK',
            time: elapsed,
            content: JSON.stringify(data, null, 2),
          },
        ]);
      }
    } catch {
      setLogs((prev) => [
        ...prev,
        {
          type: 'error',
          status: 'HTTP/2 500 Internal Server Error',
          content: JSON.stringify({ error: 'Connection failure or timeout.', code: 'API_DISPATCH_ERR' }, null, 2),
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      executeRawCommand(currentInput);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (commandHistory.length > 0) {
        const nextIdx = historyIndex === -1 ? commandHistory.length - 1 : Math.max(0, historyIndex - 1);
        setHistoryIndex(nextIdx);
        setCurrentInput(commandHistory[nextIdx]);
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex !== -1) {
        const nextIdx = historyIndex + 1;
        if (nextIdx < commandHistory.length) {
          setHistoryIndex(nextIdx);
          setCurrentInput(commandHistory[nextIdx]);
        } else {
          setHistoryIndex(-1);
          setCurrentInput('');
        }
      }
    }
  };

  return (
    <section className="section-block" style={{ marginTop: '2.5rem' }}>
      <div className="section-header">
        <div className="section-tag">{t.docs.terminalTag}</div>
        <h2 className="section-title">{t.docs.terminalTitle}</h2>
      </div>

      {/* Mac Terminal Window Container */}
      <div
        className="mac-terminal-window"
        onClick={() => inputRef.current?.focus()}
        style={{
          borderRadius: '12px',
          border: '1px solid #2d3748',
          backgroundColor: '#0a0d14',
          boxShadow: '0 25px 60px -15px rgba(0, 0, 0, 0.75), 0 0 0 1px rgba(255, 255, 255, 0.05)',
          overflow: 'hidden',
          cursor: 'text',
        }}
      >
        {/* macOS Titlebar */}
        <div
          style={{
            height: '42px',
            backgroundColor: '#161b26',
            borderBottom: '1px solid #222938',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '0 16px',
            userSelect: 'none',
          }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Traffic Light Buttons */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', width: '80px' }}>
            <span
              style={{
                width: '12px',
                height: '12px',
                borderRadius: '50%',
                backgroundColor: '#ff5f56',
                border: '1px solid #e0443e',
                display: 'inline-block',
              }}
            />
            <span
              style={{
                width: '12px',
                height: '12px',
                borderRadius: '50%',
                backgroundColor: '#ffbd2e',
                border: '1px solid #dea123',
                display: 'inline-block',
              }}
            />
            <span
              style={{
                width: '12px',
                height: '12px',
                borderRadius: '50%',
                backgroundColor: '#27c93f',
                border: '1px solid #1aab29',
                display: 'inline-block',
              }}
            />
          </div>

          {/* Window Title */}
          <div
            style={{
              fontSize: '0.8rem',
              fontFamily: 'var(--font-mono)',
              color: '#94a3b8',
              letterSpacing: '-0.01em',
              fontWeight: 500,
            }}
          >
            zidan@hub-macbook-pro: ~/api-client (zsh)
          </div>

          {/* Language Tabs in Titlebar */}
          <div style={{ display: 'flex', gap: '4px' }}>
            {(['curl', 'node', 'python', 'go'] as LanguageType[]).map((lang) => (
              <button
                key={lang}
                type="button"
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.72rem',
                  padding: '3px 8px',
                  borderRadius: '4px',
                  backgroundColor: language === lang ? '#222938' : 'transparent',
                  color: language === lang ? '#f1f5f9' : '#64748b',
                  border: language === lang ? '1px solid #334155' : '1px solid transparent',
                  cursor: 'pointer',
                  transition: 'all 150ms ease',
                }}
                onClick={() => handleLanguageSelect(lang)}
              >
                {lang === 'curl' && 'curl.sh'}
                {lang === 'node' && 'client.js'}
                {lang === 'python' && 'client.py'}
                {lang === 'go' && 'main.go'}
              </button>
            ))}
          </div>
        </div>

        {/* Terminal Control Toolbar */}
        <div
          style={{
            padding: '12px 18px',
            backgroundColor: '#0f1420',
            borderBottom: '1px solid #1e2638',
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '12px',
          }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Endpoint selector */}
          <div style={{ display: 'flex', gap: '6px', alignItems: 'center', flexWrap: 'wrap' }}>
            <span style={{ fontSize: '0.75rem', fontFamily: 'var(--font-mono)', color: '#64748b', marginRight: '4px' }}>
              Endpoint:
            </span>
            <button
              type="button"
              className={`input-action-btn ${endpoint === 'info' ? 'active' : ''}`}
              style={{
                fontSize: '0.75rem',
                padding: '4px 10px',
                backgroundColor: endpoint === 'info' ? '#1e293b' : 'transparent',
                borderColor: endpoint === 'info' ? '#38bdf8' : '#222a3e',
                color: endpoint === 'info' ? '#38bdf8' : '#94a3b8',
              }}
              onClick={() => handleEndpointSelect('info')}
            >
              POST /v1/media/info
            </button>
            <button
              type="button"
              className={`input-action-btn ${endpoint === 'download' ? 'active' : ''}`}
              style={{
                fontSize: '0.75rem',
                padding: '4px 10px',
                backgroundColor: endpoint === 'download' ? '#1e293b' : 'transparent',
                borderColor: endpoint === 'download' ? '#6366f1' : '#222a3e',
                color: endpoint === 'download' ? '#818cf8' : '#94a3b8',
              }}
              onClick={() => handleEndpointSelect('download')}
            >
              POST /v1/media/download
            </button>
            <button
              type="button"
              className={`input-action-btn ${endpoint === 'status' ? 'active' : ''}`}
              style={{
                fontSize: '0.75rem',
                padding: '4px 10px',
                backgroundColor: endpoint === 'status' ? '#1e293b' : 'transparent',
                borderColor: endpoint === 'status' ? '#f59e0b' : '#222a3e',
                color: endpoint === 'status' ? '#fbbf24' : '#94a3b8',
              }}
              onClick={() => handleEndpointSelect('status')}
            >
              GET /v1/media/download/:jobId
            </button>
          </div>

          {/* Action Buttons */}
          <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
            <button
              type="button"
              onClick={handleClear}
              className="input-action-btn"
              style={{ fontSize: '0.75rem', padding: '5px 10px' }}
              title="Clear terminal log"
            >
              {t.docs.terminalClear}
            </button>
            <button
              type="button"
              onClick={handleCopy}
              className="input-action-btn"
              style={{ fontSize: '0.75rem', padding: '5px 10px' }}
              title="Copy snippet to clipboard"
            >
              {copied ? t.docs.terminalCopied : t.docs.terminalCopy}
            </button>
            <button
              type="button"
              onClick={() => executeRawCommand(currentInput)}
              disabled={isLoading}
              className="btn-primary"
              style={{
                fontSize: '0.78rem',
                padding: '6px 16px',
                backgroundColor: '#22c55e',
                color: '#052e16',
                fontWeight: 700,
              }}
            >
              {isLoading ? t.docs.terminalExecuting : t.docs.terminalRun}
            </button>
          </div>
        </div>

        {/* Dynamic Parameter Bar */}
        <div
          style={{
            padding: '10px 18px',
            backgroundColor: '#0c101a',
            borderBottom: '1px solid #192132',
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            gap: '14px',
            fontSize: '0.8rem',
            fontFamily: 'var(--font-mono)',
          }}
          onClick={(e) => e.stopPropagation()}
        >
          {endpoint !== 'status' ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flex: 1, minWidth: '260px' }}>
              <span style={{ color: '#64748b' }}>--url=</span>
              <input
                type="text"
                value={targetUrl}
                onChange={(e) => {
                  setTargetUrl(e.target.value);
                  setCurrentInput(generateDefaultCommand(endpoint, language, e.target.value, format, quality, jobId));
                }}
                style={{
                  flex: 1,
                  backgroundColor: '#161d2b',
                  border: '1px solid #283347',
                  borderRadius: '4px',
                  color: '#f1f5f9',
                  padding: '4px 10px',
                  fontSize: '0.8rem',
                  fontFamily: 'var(--font-mono)',
                  outline: 'none',
                }}
                placeholder="https://..."
              />
            </div>
          ) : (
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flex: 1, minWidth: '220px' }}>
              <span style={{ color: '#64748b' }}>--jobId=</span>
              <input
                type="text"
                value={jobId}
                onChange={(e) => {
                  setJobId(e.target.value);
                  setCurrentInput(generateDefaultCommand(endpoint, language, targetUrl, format, quality, e.target.value));
                }}
                style={{
                  flex: 1,
                  backgroundColor: '#161d2b',
                  border: '1px solid #283347',
                  borderRadius: '4px',
                  color: '#f1f5f9',
                  padding: '4px 10px',
                  fontSize: '0.8rem',
                  fontFamily: 'var(--font-mono)',
                  outline: 'none',
                }}
              />
            </div>
          )}

          {endpoint === 'download' && (
            <>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span style={{ color: '#64748b' }}>--format=</span>
                <select
                  value={format}
                  onChange={(e) => {
                    setFormat(e.target.value);
                    setCurrentInput(generateDefaultCommand(endpoint, language, targetUrl, e.target.value, quality, jobId));
                  }}
                  className="select-control"
                  style={{ padding: '3px 8px', fontSize: '0.78rem' }}
                >
                  <option value="video">video (MP4)</option>
                  <option value="audio">audio (MP3)</option>
                  <option value="html">html (DOM)</option>
                </select>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span style={{ color: '#64748b' }}>--quality=</span>
                <select
                  value={quality}
                  onChange={(e) => {
                    setQuality(e.target.value);
                    setCurrentInput(generateDefaultCommand(endpoint, language, targetUrl, format, e.target.value, jobId));
                  }}
                  className="select-control"
                  style={{ padding: '3px 8px', fontSize: '0.78rem' }}
                >
                  <option value="1080p">1080p</option>
                  <option value="720p">720p</option>
                  <option value="480p">480p</option>
                  <option value="320kbps">320kbps</option>
                  <option value="clean_html">clean_html</option>
                </select>
              </div>
            </>
          )}
        </div>

        {/* Mac Terminal Body / Screen */}
        <div
          style={{
            padding: '20px',
            minHeight: '360px',
            maxHeight: '520px',
            overflowY: 'auto',
            fontFamily: 'var(--font-mono)',
            fontSize: '0.84rem',
            lineHeight: 1.6,
            color: '#e2e8f0',
          }}
        >
          {/* Log History */}
          {logs.map((log, index) => (
            <div key={index} style={{ marginBottom: '16px' }}>
              {log.type === 'info' && (
                <div style={{ color: '#64748b', whiteSpace: 'pre-wrap', lineHeight: 1.5 }}>
                  {log.content}
                </div>
              )}

              {log.type === 'command' && (
                <div style={{ display: 'flex', gap: '8px', alignItems: 'flex-start', flexWrap: 'wrap' }}>
                  <span style={{ color: '#22c55e', fontWeight: 600 }}>developer@macbook</span>
                  <span style={{ color: '#64748b' }}>:</span>
                  <span style={{ color: '#38bdf8' }}>~/hub-api</span>
                  <span style={{ color: '#f1f5f9' }}>$</span>
                  <span style={{ color: '#f8fafc', whiteSpace: 'pre-wrap', wordBreak: 'break-all' }}>
                    {log.content}
                  </span>
                </div>
              )}

              {log.type === 'response' && (
                <div style={{ marginTop: '6px', paddingLeft: '14px', borderLeft: '2px solid #22c55e' }}>
                  <div style={{ display: 'flex', gap: '14px', marginBottom: '4px', fontSize: '0.76rem', color: '#94a3b8' }}>
                    <span style={{ color: '#22c55e', fontWeight: 700 }}>{log.status}</span>
                    <span>Elapsed: <strong style={{ color: '#38bdf8' }}>{log.time}ms</strong></span>
                    <span>Server: <strong style={{ color: '#cbd5e1' }}>Go/1.24</strong></span>
                  </div>
                  <pre
                    style={{
                      margin: 0,
                      color: '#a5f3fc',
                      whiteSpace: 'pre-wrap',
                      wordBreak: 'break-all',
                      fontSize: '0.8rem',
                    }}
                  >
                    {log.content}
                  </pre>
                </div>
              )}

              {log.type === 'error' && (
                <div style={{ marginTop: '6px', paddingLeft: '14px', borderLeft: '2px solid #ef4444' }}>
                  <div style={{ color: '#ef4444', fontWeight: 700, marginBottom: '4px', fontSize: '0.76rem' }}>
                    {log.status}
                  </div>
                  <pre style={{ margin: 0, color: '#fca5a5', fontSize: '0.8rem' }}>{log.content}</pre>
                </div>
              )}
            </div>
          ))}

          {/* Active Live Interactive Typing Input Line */}
          <div style={{ display: 'flex', gap: '8px', alignItems: 'center', marginTop: '6px' }}>
            <span style={{ color: '#22c55e', fontWeight: 600, flexShrink: 0 }}>developer@macbook</span>
            <span style={{ color: '#64748b', flexShrink: 0 }}>:</span>
            <span style={{ color: '#38bdf8', flexShrink: 0 }}>~/hub-api</span>
            <span style={{ color: '#f1f5f9', flexShrink: 0 }}>$</span>

            <div style={{ display: 'flex', alignItems: 'center', flex: 1, position: 'relative' }}>
              <input
                ref={inputRef}
                type="text"
                value={currentInput}
                onChange={(e) => setCurrentInput(e.target.value)}
                onKeyDown={handleKeyDown}
                disabled={isLoading}
                spellCheck="false"
                autoComplete="off"
                autoCapitalize="off"
                style={{
                  width: '100%',
                  backgroundColor: 'transparent',
                  border: 'none',
                  outline: 'none',
                  color: '#f8fafc',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.84rem',
                  lineHeight: 1.6,
                  padding: 0,
                  margin: 0,
                  caretColor: '#38bdf8',
                }}
                placeholder={t.docs.terminalPlaceholder}
              />
            </div>
          </div>

          <div ref={terminalEndRef} style={{ height: '4px' }} />
        </div>
      </div>
    </section>
  );
};
