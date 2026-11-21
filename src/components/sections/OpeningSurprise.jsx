import React, { useState, useEffect } from 'react';
import { Sparkles } from 'lucide-react';
import BowRibbon from '../common/BowRibbon';
import { birthdayConfig } from '../../config/birthdayConfig';
import { fireSurpriseConfetti } from '../../utils/confetti';
import { sounds } from '../../utils/soundEffects';

export default function OpeningSurprise({ isOpen, onClose }) {
  const [isOpening, setIsOpening] = useState(false);

  // Lock background scroll when opening screen is visible
  useEffect(() => {
    if (isOpen) {
      const originalBodyOverflow = document.body.style.overflow;
      const originalHtmlOverflow = document.documentElement.style.overflow;
      document.body.style.overflow = 'hidden';
      document.documentElement.style.overflow = 'hidden';
      window.scrollTo(0, 0);

      const preventWheelTouch = (e) => {
        // Prevent background scrolling while surprise modal is open
        e.preventDefault();
      };

      window.addEventListener('wheel', preventWheelTouch, { passive: false });
      window.addEventListener('touchmove', preventWheelTouch, { passive: false });

      return () => {
        document.body.style.overflow = originalBodyOverflow;
        document.documentElement.style.overflow = originalHtmlOverflow;
        window.removeEventListener('wheel', preventWheelTouch);
        window.removeEventListener('touchmove', preventWheelTouch);
      };
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleOpen = () => {
    if (isOpening) return;
    setIsOpening(true);
    sounds.playPop();
    fireSurpriseConfetti();

    // Ensure we are positioned at top of website
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });

    // After animation finishes, dismiss opening modal and scroll smoothly to top
    setTimeout(() => {
      onClose();
      setIsOpening(false);
      const heroEl = document.getElementById('hero');
      if (heroEl) {
        heroEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }, 1100);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Birthday Surprise Box"
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 50,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#FFF9F5',
        backdropFilter: 'blur(20px)',
        opacity: isOpening ? 0 : 1,
        transition: 'opacity 0.9s cubic-bezier(0.16, 1, 0.3, 1)',
        padding: '20px',
        overflowY: 'auto',
        overscrollBehavior: 'contain',
      }}
    >
      {/* Decorative floating hearts background */}
      <div 
        aria-hidden="true" 
        style={{ position: 'absolute', inset: 0, pointerEvents: 'none', overflow: 'hidden' }}
      >
        <span 
          style={{ 
            position: 'absolute', 
            top: '12%', 
            left: '15%', 
            fontSize: '28px', 
            opacity: 0.5,
            animation: 'floatGentle 4s ease-in-out infinite' 
          }}
        >
          🎀
        </span>
        <span 
          style={{ 
            position: 'absolute', 
            top: '20%', 
            right: '18%', 
            fontSize: '32px', 
            opacity: 0.45,
            animation: 'floatSlow 5s ease-in-out infinite' 
          }}
        >
          ✨
        </span>
        <span 
          style={{ 
            position: 'absolute', 
            bottom: '15%', 
            left: '20%', 
            fontSize: '30px', 
            opacity: 0.5,
            animation: 'floatSlow 6s ease-in-out infinite' 
          }}
        >
          💖
        </span>
        <span 
          style={{ 
            position: 'absolute', 
            bottom: '22%', 
            right: '15%', 
            fontSize: '26px', 
            opacity: 0.4,
            animation: 'floatGentle 4.5s ease-in-out infinite' 
          }}
        >
          🌸
        </span>
      </div>

      <div
        className="glass-card text-center opening-surprise-card"
        style={{
          maxWidth: '520px',
          width: '100%',
          margin: 'auto',
          padding: 'clamp(24px, 5.5vw, 44px) clamp(16px, 4.5vw, 32px)',
          textAlign: 'center',
          position: 'relative',
          borderRadius: 'clamp(20px, 4vw, 32px)',
          background: 'rgba(255, 255, 255, 0.94)',
          boxShadow: '0 25px 60px -12px rgba(157, 66, 104, 0.3), 0 0 0 1px rgba(232, 142, 173, 0.35)',
          transform: isOpening ? 'scale(1.08) translateY(-20px)' : 'scale(1) translateY(0)',
          transition: 'transform 0.9s cubic-bezier(0.16, 1, 0.3, 1)',
        }}
      >
        {/* Cute Bow header */}
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '8px' }}>
          <BowRibbon size={56} />
        </div>

        {/* Surprise Greeting */}
        <span className="badge-coquette" style={{ marginBottom: '16px' }}>
          <Sparkles size={13} />
          {birthdayConfig.recipient.birthdayDate || "Special Day"}
        </span>

        <h1
          className="font-serif"
          style={{
            fontSize: 'clamp(2rem, 5vw, 2.7rem)',
            color: 'var(--color-deep-berry)',
            marginBottom: '10px',
            lineHeight: 1.2,
          }}
        >
          {birthdayConfig.openingScreen.greeting}
        </h1>

        <p
          className="font-script"
          style={{
            fontSize: 'clamp(1.4rem, 3.5vw, 1.8rem)',
            color: 'var(--color-rose-pink)',
            marginBottom: '32px',
          }}
        >
          {birthdayConfig.openingScreen.subtext}
        </p>

        {/* 🎁 Animated Gift Box with Ribbons */}
        <div
          onClick={handleOpen}
          style={{
            position: 'relative',
            width: '180px',
            height: '180px',
            margin: '0 auto 36px',
            cursor: 'pointer',
            transition: 'transform 0.4s ease',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'scale(1.05)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'scale(1)';
          }}
        >
          {/* Soft pulsing aura */}
          <div
            style={{
              position: 'absolute',
              inset: '-10px',
              borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(248, 200, 220, 0.8) 0%, rgba(255, 249, 245, 0) 70%)',
              animation: 'pulseHeart 2.5s ease-in-out infinite',
            }}
          />

          {/* Gift Box Base */}
          <div
            style={{
              position: 'absolute',
              bottom: 0,
              left: '15px',
              right: '15px',
              height: '110px',
              backgroundColor: '#FCE4EC',
              borderRadius: '16px',
              border: '2px solid rgba(232, 142, 173, 0.6)',
              boxShadow: '0 15px 30px rgba(157, 66, 104, 0.25), inset 0 2px 4px rgba(255, 255, 255, 0.8)',
              overflow: 'hidden',
            }}
          >
            {/* Vertical ribbon */}
            <div
              style={{
                position: 'absolute',
                top: 0,
                bottom: 0,
                left: '50%',
                transform: 'translateX(-50%)',
                width: '32px',
                background: 'linear-gradient(to right, #E88EAD, #D4698E)',
                boxShadow: '0 0 10px rgba(157, 66, 104, 0.2)',
              }}
            />
          </div>

          {/* Gift Box Lid */}
          <div
            style={{
              position: 'absolute',
              top: '40px',
              left: '5px',
              right: '5px',
              height: '38px',
              backgroundColor: '#F8C8DC',
              borderRadius: '14px',
              border: '2px solid rgba(232, 142, 173, 0.8)',
              boxShadow: '0 6px 16px rgba(157, 66, 104, 0.2), inset 0 2px 4px rgba(255, 255, 255, 0.9)',
              transform: isOpening ? 'translateY(-45px) rotate(-14deg)' : 'translateY(0)',
              transition: 'transform 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)',
            }}
          >
            {/* Lid vertical ribbon */}
            <div
              style={{
                position: 'absolute',
                top: 0,
                bottom: 0,
                left: '50%',
                transform: 'translateX(-50%)',
                width: '32px',
                background: 'linear-gradient(to right, #E88EAD, #D4698E)',
              }}
            />
          </div>

          {/* Bow on Top */}
          <div
            style={{
              position: 'absolute',
              top: '12px',
              left: '50%',
              transform: isOpening ? 'translateX(-50%) translateY(-55px) scale(1.15)' : 'translateX(-50%)',
              transition: 'transform 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)',
              zIndex: 10,
            }}
          >
            <BowRibbon size={65} />
          </div>

          {/* Little Tag with bestie name */}
          <div
            style={{
              position: 'absolute',
              bottom: '38px',
              left: '50%',
              transform: 'translateX(-50%)',
              backgroundColor: '#FFF9F5',
              padding: '5px 12px',
              borderRadius: '8px',
              border: '1px dashed #E88EAD',
              fontSize: '0.75rem',
              fontWeight: 700,
              color: '#9D4268',
              whiteSpace: 'nowrap',
              zIndex: 5,
              boxShadow: '0 4px 10px rgba(0,0,0,0.06)',
            }}
          >
            🎂 To: {birthdayConfig.recipient.name} ♡
          </div>
        </div>

        {/* Action Button */}
        <div>
          <button
            onClick={handleOpen}
            className="btn-primary"
            style={{
              fontSize: 'clamp(1rem, 2.8vw, 1.15rem)',
              padding: 'clamp(14px, 3.5vw, 16px) clamp(24px, 6vw, 36px)',
              width: 'min(100%, 320px)',
              touchAction: 'manipulation',
            }}
          >
            <span>{birthdayConfig.openingScreen.buttonText}</span>
          </button>

          <p
            style={{
              marginTop: '16px',
              fontSize: '0.82rem',
              color: 'var(--color-text-muted)',
            }}
          >
            {birthdayConfig.openingScreen.hintText}
          </p>
        </div>
      </div>
    </div>
  );
}
