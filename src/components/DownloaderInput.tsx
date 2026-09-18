import React, { useState, FormEvent } from 'react';
import { Magnet } from './animations/Magnet';
import { useLanguage } from '../lib/i18n';

interface DownloaderInputProps {
  initialUrl?: string;
  placeholder?: string;
  isLoading?: boolean;
  onAnalyze: (url: string) => void;
  onUrlChange?: (url: string) => void;
}

export const DownloaderInput: React.FC<DownloaderInputProps> = ({
  initialUrl = '',
  placeholder,
  isLoading = false,
  onAnalyze,
  onUrlChange,
}) => {
  const [url, setUrl] = useState(initialUrl);
  const { t } = useLanguage();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setUrl(value);
    if (onUrlChange) {
      onUrlChange(value);
    }
  };

  const handlePaste = async () => {
    try {
      const text = await navigator.clipboard.readText();
      if (text) {
        setUrl(text);
        if (onUrlChange) {
          onUrlChange(text);
        }
      }
    } catch {
      // Clipboard permission denied or unavailable, user can paste manually
    }
  };

  const handleClear = () => {
    setUrl('');
    if (onUrlChange) {
      onUrlChange('');
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (url.trim() && !isLoading) {
      onAnalyze(url.trim());
    }
  };

  return (
    <form onSubmit={handleSubmit} className="downloader-form" aria-label="Media Downloader Input Form">
      <div className="input-group">
        <input
          type="url"
          className="downloader-input-field"
          value={url}
          onChange={handleInputChange}
          placeholder={placeholder || t.home.inputPlaceholder}
          required
          autoComplete="off"
          spellCheck="false"
          aria-label="Media URL"
        />

        {url ? (
          <button
            type="button"
            onClick={handleClear}
            className="input-action-btn"
            aria-label="Clear input"
          >
            {t.downloader.clear}
          </button>
        ) : (
          <button
            type="button"
            onClick={handlePaste}
            className="input-action-btn"
            aria-label="Paste from clipboard"
          >
            {t.downloader.paste}
          </button>
        )}

        <Magnet padding={16} magnetStrength={0.25}>
          <button
            type="submit"
            className="btn-primary"
            disabled={isLoading || !url.trim()}
            aria-label="Analyze URL"
          >
            {isLoading ? (
              <>
                <span className="spinner" />
                <span>{t.downloader.analyzingBtn}</span>
              </>
            ) : (
              <span>{t.downloader.analyze}</span>
            )}
          </button>
        </Magnet>
      </div>
    </form>
  );
};
