import React, { useState, useEffect } from 'react';
import { Heart } from 'lucide-react';
import BowRibbon from '../common/BowRibbon';
import { birthdayConfig } from '../../config/birthdayConfig';
import { fireSurpriseConfetti, fireGentleSparkle } from '../../utils/confetti';
import { sounds } from '../../utils/soundEffects';

const NO_CLICK_MESSAGES = [
  "Enna nga no click pandringa .... 🥺",
  "Marapadium no va ....olunga yes click pannunga Madam...",
  "Yes kudu olunga ,illaina avolotha unnaku solliten ",
  "Aii enna tha prechana ipo unnaku , olunga yes ah kudu  ✨",
  "Romba thimuru tha unnaku ..ivolo solliyum no kudukura nee",
  "No click panna panna button naganthute irukkum nga... Mudiyathu! 🏃‍♀️💨",
  "Neenga evlo thadava No sonnalum na vidamaten Madam! 😜",
  "Seri seri... ipo achum Yes thodunga Madam, nalla pullaiyila! 🎀✨",
];

// Gentle playful offsets that stay safely within the card area on all screen sizes
const NO_OFFSETS = [
  { x: 0, y: 0, rotate: 0 },
  { x: 28, y: -10, rotate: 4 },
  { x: -30, y: 10, rotate: -4 },
  { x: 24, y: 12, rotate: 3 },
  { x: -26, y: -10, rotate: -3 },
  { x: 30, y: 6, rotate: 4 },
  { x: -28, y: -6, rotate: -4 },
];

export default function IntroGate({ isOpen, onAccept }) {
  const [noOffset, setNoOffset] = useState(null);
  const [noCount, setNoCount] = useState(0);
  const [noMessage, setNoMessage] = useState(null);
  const [isClosing, setIsClosing] = useState(false);

  const { introGate } = birthdayConfig;

  // Lock scrolling while this intro gate is visible
  useEffect(() => {
    if (isOpen) {
      const originalBodyOverflow = document.body.style.overflow;
      const originalHtmlOverflow = document.documentElement.style.overflow;
      document.body.style.overflow = 'hidden';
      document.documentElement.style.overflow = 'hidden';

      return () => {
        document.body.style.overflow = originalBodyOverflow;
        document.documentElement.style.overflow = originalHtmlOverflow;
      };
    }
  }, [isOpen]);

  if (!isOpen) return null;

  // When user clicks the No button:
  // 1. Show a new message every single time
  // 2. Glides slowly and smoothly within the view so it NEVER disappears or goes off-screen
  const handleNoClick = (e) => {
    if (e && e.preventDefault) {
      e.preventDefault();
    }
    sounds.playPop();
    fireGentleSparkle();

    const nextCount = noCount + 1;
    setNoCount(nextCount);
    setNoMessage(NO_CLICK_MESSAGES[(nextCount - 1) % NO_CLICK_MESSAGES.length]);

    // Choose next smooth playful position
    const nextOffset = NO_OFFSETS[nextCount % NO_OFFSETS.length];
    setNoOffset(nextOffset);
  };

  const handleYes = () => {
    if (isClosing) return;
    setIsClosing(true);
    sounds.playSparkle();
    fireSurpriseConfetti();
    onAccept();
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Welcome Note for Madam"
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 60,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#FFF9F5',
        backdropFilter: 'blur(20px)',
        opacity: isClosing ? 0 : 1,
        transition: 'opacity 0.45s cubic-bezier(0.16, 1, 0.3, 1)',
        padding: 'clamp(12px, 3.5vw, 24px)',
        overflowY: 'auto',
        WebkitOverflowScrolling: 'touch',
      }}
    >
      {/* Decorative ambient floating icons */}
      <div
        aria-hidden="true"
        style={{ position: 'absolute', inset: 0, pointerEvents: 'none', overflow: 'hidden' }}
      >
        <span
          style={{
            position: 'absolute',
            top: '8%',
            left: '8%',
            fontSize: 'clamp(20px, 4vw, 28px)',
            opacity: 0.45,
            animation: 'floatGentle 4s ease-in-out infinite',
          }}
        >
          🎀
        </span>
        <span
          style={{
            position: 'absolute',
            top: '12%',
            right: '10%',
            fontSize: 'clamp(22px, 4.5vw, 32px)',
            opacity: 0.45,
            animation: 'floatSlow 5s ease-in-out infinite',
          }}
        >
          ✨
        </span>
        <span
          style={{
            position: 'absolute',
            bottom: '10%',
            left: '10%',
            fontSize: 'clamp(22px, 4.5vw, 30px)',
            opacity: 0.45,
            animation: 'floatSlow 6s ease-in-out infinite',
          }}
        >
          💖
        </span>
        <span
          style={{
            position: 'absolute',
            bottom: '12%',
            right: '8%',
            fontSize: 'clamp(20px, 4vw, 26px)',
            opacity: 0.4,
            animation: 'floatGentle 4.5s ease-in-out infinite',
          }}
        >
          🌸
        </span>
      </div>

      {/* Main Coquette Scrapbook Card */}
      <div
        className="glass-card text-center"
        style={{
          maxWidth: '540px',
          width: '100%',
          margin: 'auto',
          padding: 'clamp(24px, 5.5vw, 44px) clamp(16px, 4.5vw, 36px)',
          textAlign: 'center',
          position: 'relative',
          borderRadius: 'clamp(20px, 4vw, 32px)',
          background: 'rgba(255, 255, 255, 0.95)',
          boxShadow: '0 25px 60px -12px rgba(157, 66, 104, 0.28), 0 0 0 1px rgba(232, 142, 173, 0.35)',
        }}
      >
        {/* Washi tapes on top */}
        <div className="washi-tape tape-left" style={{ top: '-10px', left: '20px' }} />
        <div className="washi-tape tape-right" style={{ top: '-10px', right: '20px' }} />

        {/* Cute Bow header */}
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '14px' }}>
          <BowRibbon size={48} />
        </div>

        {/* Greeting Headline */}
        <h1
          className="font-script"
          style={{
            fontSize: 'clamp(1.9rem, 6vw, 2.8rem)',
            color: 'var(--color-deep-berry)',
            marginBottom: '14px',
            lineHeight: 1.2,
          }}
        >
          {introGate?.greeting || "Hlo Madam! 🎀"}
        </h1>

        {/* User's special heartfelt Tanglish intro text */}
        <div
          style={{
            backgroundColor: 'rgba(252, 228, 236, 0.45)',
            border: '1.5px dashed rgba(232, 142, 173, 0.65)',
            borderRadius: '20px',
            padding: '18px 20px',
            margin: '0 auto 20px',
          }}
        >
          <p
            className="font-sans"
            style={{
              fontSize: 'clamp(1rem, 2.5vw, 1.15rem)',
              color: '#3D232F',
              lineHeight: 1.75,
              fontWeight: 500,
            }}
          >
            {introGate?.message ||
              "Hlo madam ithu summa ungaluku kaga pannen ...ennnanu porumaiya parunga ...kandipa unnaku pudikuma nu therla nga ....."}
          </p>
        </div>

        {/* Dynamic reaction message when user clicks 'No' */}
        {noMessage && (
          <div
            style={{
              backgroundColor: 'rgba(255, 238, 245, 0.96)',
              border: '1.5px solid #E88EAD',
              borderRadius: '16px',
              padding: '12px 18px',
              margin: '0 auto 20px',
              maxWidth: '460px',
              boxShadow: '0 8px 20px rgba(157, 66, 104, 0.12)',
              animation: 'floatGentle 0.4s ease-out',
            }}
          >
            <p
              className="font-serif"
              style={{
                fontSize: 'clamp(1.05rem, 2.8vw, 1.22rem)',
                fontStyle: 'italic',
                fontWeight: 600,
                color: '#9D4268',
                lineHeight: 1.5,
                margin: 0,
              }}
            >
              "{noMessage}"
            </p>
          </div>
        )}

        {/* The Prompt Question */}
        <p
          className="font-script"
          style={{
            fontSize: 'clamp(1.5rem, 4vw, 2rem)',
            color: '#9D4268',
            fontWeight: 700,
            marginBottom: '24px',
          }}
        >
          {introGate?.question || "Do you want to read? 💌"}
        </p>

        {/* Action Buttons: Yes and Slow-Floating No */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 'clamp(12px, 3vw, 16px)',
            flexWrap: 'wrap',
            minHeight: '64px',
            position: 'relative',
          }}
        >
          {/* YES Button: Always ready to enter */}
          <button
            onClick={handleYes}
            className="btn-primary"
            style={{
              fontSize: 'clamp(1rem, 2.8vw, 1.15rem)',
              padding: 'clamp(12px, 3vw, 14px) clamp(26px, 6vw, 38px)',
              cursor: 'pointer',
              boxShadow: '0 12px 28px rgba(157, 66, 104, 0.35)',
              touchAction: 'manipulation',
            }}
          >
            <Heart size={19} fill="#FFF" />
            <span>{introGate?.yesButtonText || "Yes 💖"}</span>
          </button>

          {/* NO Button:
              - Appears for the first 4 clicks with playful movements
              - On the 5th click, completely disappears leaving only the YES button!
          */}
          {noCount < 5 && (
            <button
              type="button"
              onClick={handleNoClick}
              className="btn-secondary"
              style={{
                fontSize: 'clamp(0.95rem, 2.5vw, 1.05rem)',
                padding: 'clamp(10px, 2.5vw, 12px) clamp(22px, 5vw, 28px)',
                cursor: 'pointer',
                userSelect: 'none',
                touchAction: 'manipulation',
                whiteSpace: 'nowrap',
                transform: noOffset
                  ? `translate(${noOffset.x}px, ${noOffset.y}px) rotate(${noOffset.rotate}deg)`
                  : 'none',
                // Gentle, slow 0.7s glide
                transition: 'transform 0.7s cubic-bezier(0.25, 1, 0.5, 1)',
                backgroundColor: '#FFF',
                borderColor: '#9D4268',
                boxShadow: '0 8px 20px rgba(157, 66, 104, 0.15)',
                zIndex: 10,
              }}
            >
              <span>{introGate?.noButtonText || "No 🙈"}</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
