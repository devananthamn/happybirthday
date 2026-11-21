import React from 'react';
import { birthdayConfig } from '../../config/birthdayConfig';
import { sounds } from '../../utils/soundEffects';

const BIG_ICONS = [
  {
    id: 'memories',
    label: 'Memories',
    iconImg: '/icons/camera.png',
    color: '#D4698E',
    floatClass: 'bubble-float-1',
    caption: 'Snapshots & Polaroids',
  },
  {
    id: 'letter',
    label: 'Letter',
    iconImg: '/icons/letter-open.png',
    color: '#9D4268',
    floatClass: 'bubble-float-2',
    caption: 'A Heartfelt Message',
  },
  {
    id: 'wishcake',
    label: 'Cake',
    iconImg: '/icons/cake.png',
    color: '#D9654C',
    floatClass: 'bubble-float-3',
    caption: 'Candles & Make a Wish',
  },
];

export default function HeroSection({ onNavigate }) {
  const handleIconClick = (tabId) => {
    sounds.playSparkle();
    if (onNavigate) {
      onNavigate(tabId);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <section 
      id="hero" 
      className="section-wrapper" 
      style={{ 
        minHeight: '88vh', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        paddingTop: '36px',
        paddingBottom: '48px',
      }}
    >
      <div 
        style={{ 
          maxWidth: '860px', 
          width: '100%', 
          textAlign: 'center', 
          margin: '0 auto', 
          position: 'relative' 
        }}
      >

        {/* Main Headline */}
        <h1 
          className="font-serif"
          style={{
            fontSize: 'clamp(2.3rem, 5.5vw, 3.6rem)',
            fontWeight: 700,
            color: 'var(--color-deep-berry)',
            lineHeight: 1.18,
            marginBottom: '16px',
            textShadow: '0 2px 20px rgba(248, 200, 220, 0.5)',
          }}
        >
          {birthdayConfig.hero.headline}
        </h1>

        {/* Supporting Script & Text */}
        <p
          className="font-sans"
          style={{
            fontSize: 'clamp(1rem, 2.2vw, 1.2rem)',
            color: 'var(--color-text-secondary)',
            maxWidth: '660px',
            margin: '0 auto 32px',
            lineHeight: 1.7,
            fontWeight: 400,
          }}
        >
          {birthdayConfig.hero.supportingText}
        </p>

        {/* Decorative Dedicated Vignette */}
        <div
          style={{
            position: 'relative',
            maxWidth: '440px',
            width: '100%',
            margin: '0 auto 16px',
          }}
        >
          {/* Scrapbook Frame */}
          <div
            className="glass-card hero-vignette-card"
            style={{
              padding: 'clamp(14px, 4vw, 20px)',
              borderRadius: '24px',
              border: '2px dashed rgba(232, 142, 173, 0.45)',
              background: 'linear-gradient(135deg, rgba(255, 249, 245, 0.95) 0%, rgba(252, 228, 236, 0.7) 100%)',
              position: 'relative',
            }}
          >
            {/* Washi tape on top */}
            <div className="washi-tape tape-left" style={{ top: '-12px', left: '30px' }} />
            <div className="washi-tape tape-right" style={{ top: '-12px', right: '30px' }} />

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 'clamp(8px, 2.5vw, 14px)' }}>
              <span style={{ fontSize: 'clamp(1.8rem, 5vw, 2.4rem)', animation: 'floatGentle 3s ease-in-out infinite' }}>🎂</span>
              <div style={{ textAlign: 'left' }}>
                <div 
                  className="font-script" 
                  style={{ fontSize: 'clamp(1.25rem, 3.8vw, 1.55rem)', color: '#9D4268', lineHeight: 1.1 }}
                >
                  To {birthdayConfig.recipient.name} ♡
                </div>
                <div style={{ fontSize: 'clamp(0.74rem, 2vw, 0.82rem)', color: '#E88EAD', fontWeight: 600 }}>
                  The sweetest, kindest Madam in the world ✨ (Happy 20th!)
                </div>
              </div>
            </div>

            {/* Quick stats pills */}
            <div
              className="hero-stats-grid"
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(3, 1fr)',
                gap: '8px',
                marginTop: '14px',
                paddingTop: '12px',
                borderTop: '1px solid rgba(232, 142, 173, 0.25)',
              }}
            >
              {birthdayConfig.hero.stats.map((stat, i) => (
                <div key={i} style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: '0.9rem', fontWeight: 700, color: '#9D4268' }}>
                    {stat.value}
                  </div>
                  <div style={{ fontSize: '0.7rem', color: '#6B4958' }}>
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 🎀 Big Clickable Bubble Icons (Camera, Letter, Cake) */}
        <div style={{ marginTop: '6px' }}>
          <div
            className="bubble-icons-container"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '-20px',
              flexWrap: 'nowrap',
            }}
          >
            {BIG_ICONS.map((item) => (
              <button
                key={item.id}
                onClick={() => handleIconClick(item.id)}
                aria-label={`Open ${item.label}`}
                title={`Open ${item.label}`}
                className="bubble-icon-btn"
                style={{
                  display: 'inline-flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                }}
              >
                {/* Icons8 Bubble Icon Illustration with gentle floating motion */}
                <div className={`bubble-icon-img-wrapper ${item.floatClass}`}>
                  <img
                    src={item.iconImg}
                    alt={item.label}
                    className="bubble-icon-img"
                  />
                </div>
                <span className="bubble-icon-label">{item.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
