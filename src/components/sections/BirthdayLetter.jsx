import React, { useState } from 'react';
import { Heart, MailOpen } from 'lucide-react';
import BowRibbon from '../common/BowRibbon';
import { birthdayConfig } from '../../config/birthdayConfig';
import { fireGentleSparkle } from '../../utils/confetti';
import { sounds } from '../../utils/soundEffects';

export default function BirthdayLetter({ defaultOpen = false }) {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  const { letter } = birthdayConfig;

  const handleEnvelopeToggle = () => {
    if (!isOpen) {
      sounds.playPop();
      setTimeout(() => sounds.playSparkle(), 200);
      fireGentleSparkle();
    }
    setIsOpen(!isOpen);
  };

  return (
    <section id="letter" className="section-wrapper">
      <div style={{ textAlign: 'center', marginBottom: '40px' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
          <BowRibbon size={36} />
          <span className="badge-coquette">Personal Note</span>
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
          {letter.sectionTitle}
        </h2>
      </div>

      <div style={{ maxWidth: '680px', margin: '0 auto', position: 'relative' }}>
        {/* Closed / Interactive Envelope Container */}
        <div
          onClick={handleEnvelopeToggle}
          className="letter-envelope"
          style={{
            position: 'relative',
            width: '100%',
            maxWidth: '520px',
            height: isOpen ? 'clamp(70px, 18vw, 90px)' : 'clamp(210px, 56vw, 290px)',
            margin: '0 auto',
            backgroundColor: '#F8C8DC',
            borderRadius: '20px',
            boxShadow: '0 20px 45px rgba(157, 66, 104, 0.2)',
            border: '2px solid rgba(232, 142, 173, 0.6)',
            cursor: 'pointer',
            overflow: isOpen ? 'visible' : 'hidden',
            transition: 'all 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: isOpen ? 'center' : 'flex-end',
            paddingBottom: isOpen ? '0' : 'clamp(16px, 4vw, 24px)',
          }}
        >
          {!isOpen ? (
            <>
              {/* Envelope Flap Lines */}
              <div
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  height: 'clamp(95px, 26vw, 135px)',
                  background: 'linear-gradient(to bottom, #FCE4EC, #F8C8DC)',
                  clipPath: 'polygon(0 0, 50% 100%, 100% 0)',
                  borderBottom: '2px solid rgba(232, 142, 173, 0.5)',
                  boxShadow: '0 6px 12px rgba(157, 66, 104, 0.1)',
                }}
              />

              {/* Heart Wax Seal */}
              <div
                style={{
                  position: 'absolute',
                  top: 'clamp(75px, 20vw, 108px)',
                  width: 'clamp(44px, 12vw, 56px)',
                  height: 'clamp(44px, 12vw, 56px)',
                  borderRadius: '50%',
                  background: 'radial-gradient(circle at 35% 35%, #D4698E 0%, #9D4268 70%, #6E2644 100%)',
                  boxShadow: '0 6px 16px rgba(110, 38, 68, 0.45), inset 0 2px 4px rgba(255, 255, 255, 0.4)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#FFF9F5',
                  zIndex: 10,
                  animation: 'pulseHeart 2.5s ease-in-out infinite',
                }}
              >
                <Heart size={24} fill="#FFF9F5" />
              </div>

              {/* Envelope Text */}
              <div style={{ textAlign: 'center', zIndex: 5, padding: '0 16px' }}>
                <span
                  className="font-script"
                  style={{
                    fontSize: 'clamp(1.4rem, 4.5vw, 1.8rem)',
                    color: '#9D4268',
                    display: 'block',
                    lineHeight: 1.2,
                  }}
                >
                  {letter.envelopeLabel}
                </span>
                <span style={{ fontSize: '0.8rem', color: '#6B4958', fontWeight: 600 }}>
                  Open panni padichu parunga 💌
                </span>
              </div>
            </>
          ) : (
            <div
              style={{
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '0 24px',
              }}
            >
              <span style={{ fontSize: '0.9rem', color: '#9D4268', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '6px' }}>
                <MailOpen size={18} />
                Envelope Opened
              </span>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleEnvelopeToggle();
                }}
                className="btn-secondary"
                style={{ padding: '6px 16px', fontSize: '0.82rem' }}
              >
                Fold pannunga
              </button>
            </div>
          )}
        </div>

        {/* Unfolded Stationery Letter (Visible when open) */}
        {isOpen && (
          <article
            className="glass-card"
            style={{
              marginTop: '20px',
              backgroundColor: '#FFFDF9',
              backgroundImage: 'radial-gradient(rgba(248, 200, 220, 0.15) 1px, transparent 0)',
              backgroundSize: '24px 24px',
              borderRadius: 'clamp(18px, 4vw, 24px)',
              padding: 'clamp(20px, 4.5vw, 44px) clamp(16px, 4vw, 36px)',
              boxShadow: '0 20px 50px rgba(157, 66, 104, 0.18)',
              border: '2px solid rgba(232, 142, 173, 0.35)',
              position: 'relative',
              animation: 'floatGentle 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
            }}
          >
            {/* Washi tapes on top */}
            <div className="washi-tape tape-left" style={{ top: '-10px', left: '20px' }} />
            <div className="washi-tape tape-right" style={{ top: '-10px', right: '20px' }} />

            {/* Letter Date Stamp */}
            <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '20px' }}>
              <span
                style={{
                  fontSize: '0.85rem',
                  color: '#9E7D8C',
                  fontStyle: 'italic',
                  borderBottom: '1px dashed #E88EAD',
                  paddingBottom: '2px',
                }}
              >
                {letter.letterDate}
              </span>
            </div>

            {/* Greeting */}
            <h3
              className="font-script"
              style={{
                fontSize: 'clamp(1.6rem, 4vw, 2.2rem)',
                color: '#9D4268',
                marginBottom: '24px',
                lineHeight: 1.3,
              }}
            >
              {letter.greeting}
            </h3>

            {/* Letter Body Paragraphs */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {letter.paragraphs.map((p, idx) => (
                <p
                  key={idx}
                  style={{
                    fontSize: 'clamp(1rem, 2vw, 1.1rem)',
                    lineHeight: 1.8,
                    color: '#3D232F',
                    fontFamily: 'var(--font-sans)',
                  }}
                >
                  {p}
                </p>
              ))}
            </div>

            {/* Signature & Heart */}
            <div
              style={{
                marginTop: '36px',
                paddingTop: '20px',
                borderTop: '1px dashed rgba(232, 142, 173, 0.4)',
                textAlign: 'right',
              }}
            >
              <div
                className="font-script"
                style={{
                  fontSize: '1.9rem',
                  color: '#9D4268',
                  lineHeight: 1.2,
                }}
              >
                {letter.signature}
              </div>
              {letter.author && (
                <div style={{ fontSize: '0.9rem', color: '#6B4958', fontWeight: 600 }}>
                  {letter.author}
                </div>
              )}
            </div>
          </article>
        )}
      </div>
    </section>
  );
}
