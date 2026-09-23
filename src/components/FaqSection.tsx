import React, { useState } from 'react';
import { useLanguage } from '../lib/i18n';
import { SpotlightCard } from './animations/SpotlightCard';

export const FaqSection: React.FC = () => {
  const { t } = useLanguage();
  const [openIndex, setOpenIndex] = useState<number | null>(0); // First item open by default

  const toggleItem = (index: number) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  };

  return (
    <section className="section-block" id="faq" aria-labelledby="faq-title">
      <div className="section-header" style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
        <div className="section-tag">{t.faq.tag}</div>
        <h2 id="faq-title" className="section-title">
          {t.faq.title}
        </h2>
        <p style={{ maxWidth: '640px', margin: '0.75rem auto 0', color: 'var(--color-text-secondary)', fontSize: '1rem' }}>
          {t.faq.subtitle}
        </p>
      </div>

      <div style={{ maxWidth: '820px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {t.faq.items.map((item: { q: string; a: string }, index: number) => {
          const isOpen = openIndex === index;

          return (
            <SpotlightCard
              key={index}
              className="faq-accordion-item"
              spotlightColor="rgba(113, 50, 245, 0.12)"
              style={{
                borderRadius: '12px',
                border: isOpen ? '1px solid var(--color-primary)' : '1px solid var(--color-border)',
                backgroundColor: 'var(--color-surface)',
                boxShadow: isOpen ? 'var(--shadow-elevation)' : 'var(--shadow-subtle)',
                transition: 'all 200ms ease',
                overflow: 'hidden',
              }}
            >
              <button
                type="button"
                onClick={() => toggleItem(index)}
                aria-expanded={isOpen}
                className="faq-question-btn"
                style={{
                  width: '100%',
                  padding: '18px 22px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: '1rem',
                  textAlign: 'left',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                }}
              >
                <span
                  style={{
                    fontSize: '1.05rem',
                    fontWeight: 600,
                    color: isOpen ? 'var(--color-primary)' : 'var(--color-text)',
                    transition: 'color 150ms ease',
                  }}
                >
                  {item.q}
                </span>

                <div
                  style={{
                    width: '28px',
                    height: '28px',
                    borderRadius: '8px',
                    backgroundColor: isOpen ? 'var(--color-primary-subtle)' : 'var(--color-surface-elevated)',
                    border: '1px solid var(--color-border)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                    transition: 'transform 200ms ease, background-color 200ms ease',
                    transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                  }}
                >
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke={isOpen ? 'var(--color-primary)' : 'var(--color-text-secondary)'}
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polyline points="6 9 12 15 18 9" />
                  </svg>
                </div>
              </button>

              {isOpen && (
                <div
                  style={{
                    padding: '0 22px 20px',
                    color: 'var(--color-text-secondary)',
                    fontSize: '0.95rem',
                    lineHeight: 1.6,
                    borderTop: '1px solid var(--color-border-subtle)',
                    paddingTop: '14px',
                  }}
                >
                  {item.a}
                </div>
              )}
            </SpotlightCard>
          );
        })}
      </div>
    </section>
  );
};
