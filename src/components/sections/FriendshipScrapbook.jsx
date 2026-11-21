import React, { useState } from 'react';
import { Camera, X } from 'lucide-react';
import BowRibbon from '../common/BowRibbon';
import { birthdayConfig } from '../../config/birthdayConfig';
import { fireGentleSparkle } from '../../utils/confetti';
import { sounds } from '../../utils/soundEffects';

const getPreviewCaption = (text, wordLimit = 4) => {
  if (!text) return '';
  const words = text.trim().split(/\s+/);
  if (words.length <= wordLimit) return text.trim();
  return `${words.slice(0, wordLimit).join(' ')}...`;
};

export default function FriendshipScrapbook() {
  const [activePhoto, setActivePhoto] = useState(null);
  const [revealedIds, setRevealedIds] = useState(() => new Set());
  const { title, subtitle, polaroids } = birthdayConfig.scrapbook;

  const handlePolaroidClick = (photo) => {
    sounds.playSparkle();
    fireGentleSparkle();

    if (!revealedIds.has(photo.id)) {
      setRevealedIds((prev) => {
        const next = new Set(prev);
        next.add(photo.id);
        return next;
      });
      return;
    }

    setActivePhoto(photo);
  };

  return (
    <section id="memories" className="section-wrapper">
      {/* Section Header */}
      <div style={{ textAlign: 'center', marginBottom: '48px' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
          <BowRibbon size={36} />
          <span className="badge-coquette">Best Memories</span>
          <BowRibbon size={36} />
        </div>

        <h2
          className="font-serif"
          style={{
            fontSize: 'clamp(2rem, 4.5vw, 3rem)',
            color: 'var(--color-deep-berry)',
            marginBottom: '12px',
          }}
        >
          {title}
        </h2>

        {subtitle && (
          <p
            style={{
              maxWidth: '620px',
              margin: '0 auto',
              color: 'var(--color-text-secondary)',
              fontSize: '1.05rem',
            }}
          >
            {subtitle}
          </p>
        )}
      </div>

      {/* Polaroid Scrapbook Gallery */}
      <div>
        <div style={{ marginBottom: '24px' }}>
          <h3 style={{ fontSize: '1.4rem', color: '#9D4268', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Camera size={20} />
            <span>Snapshots of Us</span>
          </h3>
        </div>

        <div
          className="scrapbook-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(240px, 100%), 1fr))',
            gap: '28px',
            padding: '12px 6px',
          }}
        >
          {polaroids.map((photo) => {
            const isRevealed = revealedIds.has(photo.id);
            return (
              <div
                key={photo.id}
                onClick={() => handlePolaroidClick(photo)}
                style={{
                  position: 'relative',
                  background: '#FFFFFF',
                  padding: '14px 14px 24px 14px',
                  borderRadius: '8px',
                  boxShadow: '0 12px 28px rgba(157, 66, 104, 0.14), 0 2px 8px rgba(0,0,0,0.06)',
                  border: '1px solid rgba(232, 142, 173, 0.2)',
                  transform: `rotate(${photo.rotation})`,
                  transition: 'all 0.35s cubic-bezier(0.16, 1, 0.3, 1)',
                  cursor: 'pointer',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'scale(1.04) rotate(0deg) translateY(-8px)';
                  e.currentTarget.style.zIndex = '10';
                  e.currentTarget.style.boxShadow = '0 20px 40px rgba(157, 66, 104, 0.25)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = `rotate(${photo.rotation})`;
                  e.currentTarget.style.zIndex = '1';
                  e.currentTarget.style.boxShadow = '0 12px 28px rgba(157, 66, 104, 0.14), 0 2px 8px rgba(0,0,0,0.06)';
                }}
              >
                {/* Washi Tape */}
                <div
                  style={{
                    position: 'absolute',
                    top: '-10px',
                    left: photo.tapePosition === 'top-right' ? 'auto' : '24px',
                    right: photo.tapePosition === 'top-right' ? '24px' : 'auto',
                    width: '75px',
                    height: '20px',
                    backgroundColor: photo.tapeColor || 'rgba(248, 200, 220, 0.8)',
                    boxShadow: '0 2px 4px rgba(0,0,0,0.08)',
                    borderLeft: '2px dashed rgba(255,255,255,0.7)',
                    borderRight: '2px dashed rgba(255,255,255,0.7)',
                    transform: 'rotate(-2deg)',
                    zIndex: 2,
                  }}
                />

                {/* Photo Image Frame */}
                <div
                  style={{
                    width: '100%',
                    aspectRatio: '1 / 1',
                    overflow: 'hidden',
                    borderRadius: '4px',
                    backgroundColor: '#FCE4EC',
                    position: 'relative',
                  }}
                >
                  <img
                    src={photo.image}
                    alt={isRevealed ? photo.alt : 'Hidden memory photo'}
                    loading="lazy"
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      opacity: isRevealed ? 1 : 0,
                      transform: isRevealed ? 'scale(1)' : 'scale(0.96)',
                      transition: 'opacity 0.55s ease, transform 0.55s ease',
                    }}
                  />

                  {/* Hidden Mystery Cover (shown until card is clicked) */}
                  {!isRevealed && (
                    <div
                      style={{
                        position: 'absolute',
                        inset: 0,
                        background: 'linear-gradient(135deg, #FCE4EC 0%, #F8C8DC 55%, #F3D5E5 100%)',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '10px',
                        padding: '16px',
                        textAlign: 'center',
                      }}
                    >
                      <div
                        style={{
                          width: '54px',
                          height: '54px',
                          borderRadius: '50%',
                          backgroundColor: 'rgba(255, 255, 255, 0.85)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          color: '#9D4268',
                          boxShadow: '0 6px 18px rgba(157, 66, 104, 0.16)',
                        }}
                      >
                        <Camera size={24} />
                      </div>
                      <span
                        className="font-script"
                        style={{
                          fontSize: '1.35rem',
                          color: '#9D4268',
                          lineHeight: 1.2,
                        }}
                      >
                        Tap to see photo
                      </span>
                    </div>
                  )}

                  {/* Sticker badge */}
                  <span
                    style={{
                      position: 'absolute',
                      bottom: '8px',
                      right: '8px',
                      fontSize: '1.2rem',
                      filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.2))',
                    }}
                  >
                    {photo.sticker}
                  </span>
                </div>

                {/* Polaroid Caption */}
                <div style={{ marginTop: '16px', textAlign: 'center' }}>
                  <p
                    className="font-serif"
                    style={{
                      fontSize: '1.05rem',
                      fontWeight: 500,
                      fontStyle: 'italic',
                      color: '#3D232F',
                      lineHeight: 1.4,
                      marginBottom: '4px',
                    }}
                  >
                    {getPreviewCaption(photo.caption, 4)}
                  </p>
                  {photo.date && (
                    <span
                      style={{
                        fontSize: '0.72rem',
                        color: '#9E7D8C',
                        fontWeight: 600,
                        letterSpacing: '0.05em',
                      }}
                    >
                      {photo.date}
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Lightbox Modal for Polaroid preview */}
      {activePhoto && (
        <div
          role="dialog"
          aria-modal="true"
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 60,
            backgroundColor: 'rgba(58, 26, 40, 0.75)',
            backdropFilter: 'blur(8px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: 'clamp(10px, 3vw, 20px)',
          }}
          onClick={() => setActivePhoto(null)}
        >
          <div
            style={{
              maxWidth: 'min(480px, 94vw)',
              width: '100%',
              maxHeight: '92vh',
              overflowY: 'auto',
              WebkitOverflowScrolling: 'touch',
              backgroundColor: '#FFF',
              padding: 'clamp(16px, 4vw, 24px) clamp(14px, 3.5vw, 22px)',
              borderRadius: '20px',
              boxShadow: '0 25px 60px rgba(0,0,0,0.3)',
              position: 'relative',
              textAlign: 'center',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setActivePhoto(null)}
              aria-label="Close photo preview"
              style={{
                position: 'absolute',
                top: '10px',
                right: '10px',
                background: 'rgba(255, 255, 255, 0.92)',
                border: '1px solid rgba(232, 142, 173, 0.4)',
                borderRadius: '50%',
                width: '38px',
                height: '38px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                color: '#9D4268',
                zIndex: 2,
                touchAction: 'manipulation',
              }}
            >
              <X size={20} />
            </button>

            <img
              src={activePhoto.image}
              alt={activePhoto.alt}
              className="lightbox-img"
              style={{
                width: '100%',
                maxHeight: 'clamp(220px, 48vh, 420px)',
                objectFit: 'contain',
                backgroundColor: '#FCE4EC',
                borderRadius: '12px',
                marginBottom: '14px',
              }}
            />

            <p
              className="font-serif"
              style={{
                fontSize: 'clamp(1.02rem, 3.2vw, 1.25rem)',
                fontWeight: 500,
                fontStyle: 'italic',
                color: '#3D232F',
                lineHeight: 1.45,
                marginBottom: '6px',
              }}
            >
              {activePhoto.caption}
            </p>
            <span style={{ fontSize: '0.85rem', color: '#9E7D8C' }}>
              {activePhoto.date ? `${activePhoto.date} • ${activePhoto.sticker}` : activePhoto.sticker}
            </span>
          </div>
        </div>
      )}
    </section>
  );
}
