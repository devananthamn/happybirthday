import React, { useState, useEffect } from 'react';
import { Heart, RotateCcw } from 'lucide-react';
import { birthdayConfig } from '../../config/birthdayConfig';
import { fireGrandFinaleConfetti, fireGentleSparkle } from '../../utils/confetti';
import { sounds } from '../../utils/soundEffects';

export default function BirthdayCakeFinale() {
  const { cakeFinale } = birthdayConfig;
  const sentence = cakeFinale.sentence || "Unnaku enna venumnu sollu Nan kandipa unakaga pannuven";
  
  const [candlesBlown, setCandlesBlown] = useState(false);
  const [isBlowing, setIsBlowing] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [isWritingWish, setIsWritingWish] = useState(false);
  const [hasPrompted, setHasPrompted] = useState(false);

  // Box starts completely empty with no initial text
  const [wishText, setWishText] = useState('');

  // Clear any previously saved test text from browser localStorage
  useEffect(() => {
    try {
      localStorage.removeItem('archana_birthday_wish');
    } catch {}
  }, []);

  // Clicking on the big cake reveals the wish writing card
  const handleCakeClick = () => {
    if (!candlesBlown && !isWritingWish) {
      sounds.playPop();
      sounds.playSparkle();
      setIsWritingWish(true);
      setTimeout(() => {
        const inputEl = document.getElementById('birthday-wish-input');
        if (inputEl) {
          inputEl.focus();
          inputEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      }, 150);
    } else if (!candlesBlown && isWritingWish && wishText.trim()) {
      handleMakeWish();
    } else if (candlesBlown) {
      sounds.playSparkle();
      fireGentleSparkle();
    }
  };

  const handleMakeWish = async () => {
    if (candlesBlown || isBlowing || isSending) return;

    const trimmedWish = wishText.trim();

    // If box is empty, nudge them — change placeholder without leaving page
    if (!trimmedWish) {
      setHasPrompted(true);
      setTimeout(() => {
        const inputEl = document.getElementById('birthday-wish-input');
        if (inputEl) inputEl.focus();
      }, 50);
      return;
    }

    setIsSending(true);

    // Safety Backup: Always save Madam's wish locally so it is NEVER lost
    try {
      const existingWishes = JSON.parse(localStorage.getItem('madam_all_wishes_backup') || '[]');
      existingWishes.push({ wish: trimmedWish, date: new Date().toLocaleString() });
      localStorage.setItem('madam_all_wishes_backup', JSON.stringify(existingWishes));
      console.log('💖 Madam Wish Saved Backup:', trimmedWish);
    } catch {}

    const web3Key = cakeFinale.web3FormsAccessKey;
    const recipientEmail = cakeFinale.recipientEmail || 'devananthamn@gmail.com';
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 8000);

    try {
      if (web3Key) {
        await fetch('https://api.web3forms.com/submit', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
          },
          body: JSON.stringify({
            access_key: web3Key,
            subject: `🎂 20th Birthday Wish from ${birthdayConfig.recipient.name}! 💖`,
            from_name: `${birthdayConfig.recipient.name} (Madam)`,
            name: `${birthdayConfig.recipient.name} (Madam)`,
            message: trimmedWish,
          }),
          signal: controller.signal,
        });
      } else {
        await fetch(`https://formsubmit.co/ajax/${recipientEmail}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
          },
          body: JSON.stringify({
            From: `${birthdayConfig.recipient.name} (Madam)`,
            Wish: trimmedWish,
            Time: new Date().toLocaleString(),
            _subject: `🎂 20th Birthday Wish from ${birthdayConfig.recipient.name}! 💖`,
            _captcha: 'false',
            _template: 'table',
          }),
          signal: controller.signal,
        });
      }
    } catch {
      // Proceed smoothly even if offline
    } finally {
      clearTimeout(timeoutId);
      setIsSending(false);
    }

    setIsBlowing(true);
    sounds.playCandleBlow();

    try {
      localStorage.setItem('archana_birthday_wish', trimmedWish);
    } catch {}

    setTimeout(() => {
      setCandlesBlown(true);
      setIsBlowing(false);
      fireGrandFinaleConfetti();
    }, 450);
  };

  const handleRelight = () => {
    setCandlesBlown(false);
    setIsWritingWish(true);
    setWishText('');
    setHasPrompted(false);
    sounds.playSparkle();
  };

  return (
    <section id="wishcake" className="section-wrapper" style={{ paddingBottom: '120px' }}>
      {/* 💖 Only one special sentence on the big cake as requested */}
      <div style={{ textAlign: 'center', marginBottom: '32px' }}>
        <h1
          className="font-script"
          style={{
            fontSize: 'clamp(2rem, 5vw, 3.2rem)',
            color: '#9D4268',
            maxWidth: '780px',
            margin: '0 auto',
            lineHeight: 1.35,
            fontWeight: 700,
            textShadow: '0 2px 20px rgba(248, 200, 220, 0.5)',
          }}
        >
          "{sentence}" 💖
        </h1>
      </div>

      <div style={{ maxWidth: '680px', margin: '0 auto', textAlign: 'center' }}>
        {/* 🎂 Interactive BIG Birthday Cake */}
        <div
          onClick={handleCakeClick}
          className="big-cake-interactive"
          title={!candlesBlown ? "Click the cake to write your wish!" : "Happy 20th Birthday, Madam!"}
          style={{
            position: 'relative',
            width: '100%',
            maxWidth: '420px',
            margin: '0 auto 28px',
            height: 'clamp(220px, 55vw, 310px)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'flex-end',
            cursor: 'pointer',
            transition: 'transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'scale(1.04) translateY(-6px)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'scale(1) translateY(0)';
          }}
        >
          {/* Candles on top of the big cake */}
          <div
            style={{
              position: 'absolute',
              top: '6px',
              display: 'flex',
              gap: 'clamp(14px, 5vw, 32px)',
              zIndex: 10,
            }}
          >
            {[1, 2, 3].map((candle) => (
              <div
                key={candle}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  position: 'relative',
                }}
              >
                {/* Candle Flame / Smoke */}
                {!candlesBlown ? (
                  <div
                    style={{
                      width: '18px',
                      height: '28px',
                      borderRadius: '50% 50% 35% 35%',
                      background: 'radial-gradient(ellipse at bottom, #FFF7C2 0%, #FFAE34 60%, #FF5A36 100%)',
                      boxShadow: '0 0 18px 6px rgba(255, 174, 52, 0.85)',
                      animation: 'flameFlicker 1.8s ease-in-out infinite',
                      animationDelay: `${candle * 0.25}s`,
                      marginBottom: '2px',
                    }}
                  />
                ) : (
                  <div
                    style={{
                      width: '14px',
                      height: '22px',
                      backgroundColor: 'rgba(216, 180, 226, 0.6)',
                      borderRadius: '50%',
                      animation: 'candleSmoke 1.5s ease-out forwards',
                      marginBottom: '2px',
                    }}
                  />
                )}

                {/* Candle Wick */}
                <div
                  style={{
                    width: '3px',
                    height: '6px',
                    backgroundColor: '#5A3E36',
                  }}
                />

                {/* Festive Candle Body */}
                <div
                  style={{
                    width: '12px',
                    height: '46px',
                    borderRadius: '4px 4px 0 0',
                    background:
                      candle === 2
                        ? 'repeating-linear-gradient(45deg, #FFF9F5, #FFF9F5 5px, #E88EAD 5px, #E88EAD 10px)'
                        : 'repeating-linear-gradient(45deg, #F8C8DC, #F8C8DC 5px, #D4698E 5px, #D4698E 10px)',
                    boxShadow: '0 3px 6px rgba(0,0,0,0.12)',
                  }}
                />
              </div>
            ))}
          </div>

          {/* Big Cake: Top Tier */}
          <div
            className="cake-scale-wrapper"
            style={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              right: 0,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'flex-end',
              gap: 0,
            }}
          >
          <div
            style={{
              width: 'min(210px, 50vw)',
              height: '64px',
              backgroundColor: '#FFF9F5',
              borderRadius: '20px 20px 6px 6px',
              border: '2.5px solid rgba(232, 142, 173, 0.7)',
              boxShadow: 'inset 0 4px 8px rgba(255,255,255,0.95), 0 6px 14px rgba(157, 66, 104, 0.12)',
              position: 'relative',
              zIndex: 3,
            }}
          >
            {/* Scallop Frosting Along Rim */}
            <div
              style={{
                position: 'absolute',
                bottom: '-6px',
                left: 0,
                right: 0,
                display: 'flex',
                justifyContent: 'space-around',
              }}
            >
              {[...Array(7)].map((_, i) => (
                <div
                  key={i}
                  style={{
                    width: '18px',
                    height: '11px',
                    backgroundColor: '#E88EAD',
                    borderRadius: '0 0 10px 10px',
                  }}
                />
              ))}
            </div>
          </div>

          {/* Big Cake: Middle Tier */}
          <div
            style={{
              width: 'min(290px, 70vw)',
              height: '76px',
              backgroundColor: '#F8C8DC',
              borderRadius: '22px 22px 6px 6px',
              border: '2.5px solid rgba(232, 142, 173, 0.75)',
              boxShadow: 'inset 0 4px 8px rgba(255,255,255,0.85), 0 8px 18px rgba(157, 66, 104, 0.14)',
              position: 'relative',
              zIndex: 2,
            }}
          >
            {/* Middle Pearls Frosting */}
            <div
              style={{
                position: 'absolute',
                bottom: '-6px',
                left: 0,
                right: 0,
                display: 'flex',
                justifyContent: 'space-around',
              }}
            >
              {[...Array(9)].map((_, i) => (
                <div
                  key={i}
                  style={{
                    width: '20px',
                    height: '13px',
                    backgroundColor: '#FFF9F5',
                    borderRadius: '0 0 12px 12px',
                    boxShadow: '0 2px 4px rgba(157, 66, 104, 0.1)',
                  }}
                />
              ))}
            </div>
          </div>

          {/* Big Cake: Bottom Tier */}
          <div
            style={{
              width: 'min(375px, 90vw)',
              height: '88px',
              backgroundColor: '#FCE4EC',
              borderRadius: '24px 24px 8px 8px',
              border: '2.5px solid rgba(232, 142, 173, 0.85)',
              boxShadow: 'inset 0 4px 8px rgba(255,255,255,0.9), 0 12px 28px rgba(157, 66, 104, 0.16)',
              position: 'relative',
              zIndex: 1,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            {/* Ribbon banner on the bottom tier */}
            <div
              style={{
                position: 'absolute',
                top: '24px',
                left: 0,
                right: 0,
                height: '24px',
                backgroundColor: 'rgba(232, 142, 173, 0.85)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 2px 6px rgba(157, 66, 104, 0.15)',
              }}
            >
              <span
                className="font-script"
                style={{
                  fontSize: '0.98rem',
                  color: '#FFFFFF',
                  fontWeight: 700,
                  letterSpacing: '0.04em',
                  textShadow: '0 1px 3px rgba(157, 66, 104, 0.5)',
                }}
              >
                ♡ 20th Birthday Madam ♡
              </span>
            </div>
          </div>

          {/* Cake Gold Pedestal / Plate */}
          <div
            style={{
              width: 'min(415px, 99vw)',
              height: '18px',
              backgroundColor: '#FFF9F5',
              borderRadius: '9999px',
              border: '2.5px solid rgba(223, 186, 115, 0.8)',
              boxShadow: '0 10px 25px rgba(157, 66, 104, 0.18)',
            }}
          />
          </div>{/* end cake-scale-wrapper */}
        </div>

        {/* 🎂 Hint to tap the cake (shown before writing wish) */}
        {!isWritingWish && !candlesBlown && (
          <div style={{ marginBottom: '32px' }}>
            <button
              onClick={handleCakeClick}
              className="badge-coquette animate-pulse-heart"
              style={{
                fontSize: '0.95rem',
                padding: '10px 24px',
                cursor: 'pointer',
                background: '#FFFFFF',
                border: '1.5px solid #E88EAD',
                boxShadow: '0 4px 16px rgba(157, 66, 104, 0.15)',
                color: '#9D4268',
                fontWeight: 700,
              }}
            >
              🎂 Unnaku enna venumnu sollu Nan kandipa unakaga pannuven ✨
            </button>
          </div>
        )}

        {/* 💌 Wish Writing Stationery Card (Opens AFTER clicking the cake) */}
        {isWritingWish && !candlesBlown && (
          <div
            className="glass-card"
            style={{
              maxWidth: '520px',
              margin: '0 auto 36px',
              padding: 'clamp(20px, 4.5vw, 28px) clamp(16px, 4vw, 24px)',
              borderRadius: 'clamp(20px, 4vw, 26px)',
              background: 'rgba(255, 255, 255, 0.96)',
              border: '2px dashed rgba(232, 142, 173, 0.65)',
              boxShadow: '0 18px 45px rgba(157, 66, 104, 0.16)',
              textAlign: 'left',
              position: 'relative',
              animation: 'floatGentle 0.4s ease',
            }}
          >
            {/* Washi tape accents */}
            <div className="washi-tape tape-left" style={{ top: '-10px', left: '20px' }} />
            <div className="washi-tape tape-right" style={{ top: '-10px', right: '20px' }} />

            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
              <span style={{ fontSize: '1.35rem' }}>✨</span>
              <label
                htmlFor="birthday-wish-input"
                className="font-script"
                style={{
                  fontSize: 'clamp(1.35rem, 4vw, 1.55rem)',
                  color: '#9D4268',
                  fontWeight: 700,
                  cursor: 'pointer',
                  lineHeight: 1.2,
                }}
              >
                Write your wish, Madam:
              </label>
            </div>

            {/* Initial message shown above the box; disappears as soon as Madam starts writing */}
            {!hasPrompted && !wishText && (
              <div
                style={{
                  backgroundColor: 'rgba(252, 228, 236, 0.55)',
                  border: '1.5px dashed rgba(232, 142, 173, 0.7)',
                  borderRadius: '14px',
                  padding: '10px 14px',
                  marginBottom: '12px',
                  animation: 'floatGentle 0.4s ease-out',
                }}
              >
                <p
                  className="font-sans"
                  style={{
                    fontSize: 'clamp(0.88rem, 2.4vw, 0.98rem)',
                    color: '#6B4958',
                    lineHeight: 1.55,
                    margin: 0,
                    fontWeight: 500,
                  }}
                >
                  Ippaiyachu enkitta , ennaku ithu venumnu kelu ...Nan vangi tharen .....Unnaku enna venumoo atha intha box la write pannu arpm kela iruka buttton ahh click pannu
                </p>
              </div>
            )}

            {/* Prompt message shown ABOVE the writing box when empty send is clicked */}
            {hasPrompted && !wishText.trim() && (
              <div
                style={{
                  backgroundColor: 'rgba(255, 238, 245, 0.96)',
                  border: '1.5px solid #E88EAD',
                  borderRadius: '14px',
                  padding: '10px 14px',
                  marginBottom: '12px',
                  boxShadow: '0 4px 14px rgba(157, 66, 104, 0.1)',
                  animation: 'floatGentle 0.4s ease-out',
                }}
              >
                <p
                  className="font-serif"
                  style={{
                    fontSize: 'clamp(0.92rem, 2.5vw, 1.05rem)',
                    fontStyle: 'italic',
                    fontWeight: 600,
                    color: '#9D4268',
                    lineHeight: 1.45,
                    margin: 0,
                  }}
                >
                  "Eppaiyum edhuvum vena nu tha solluvingala intha oru tharava ungaluku enna venum nu sollunga ......"
                </p>
              </div>
            )}

            <textarea
              id="birthday-wish-input"
              value={wishText}
              onChange={(e) => {
                setWishText(e.target.value);
                if (hasPrompted && e.target.value.trim()) {
                  setHasPrompted(false);
                }
              }}
              rows={3}
              style={{
                width: '100%',
                padding: '14px 16px',
                borderRadius: '16px',
                border: hasPrompted && !wishText.trim() ? '1.5px solid #E88EAD' : '1.5px solid rgba(232, 142, 173, 0.6)',
                backgroundColor: '#FFFDF9',
                color: '#3D232F',
                fontFamily: 'var(--font-sans)',
                fontSize: '16px',
                lineHeight: 1.6,
                resize: 'none',
                outline: 'none',
                transition: 'all 0.25s ease',
                boxShadow: hasPrompted && !wishText.trim()
                  ? '0 0 0 3px rgba(232, 142, 173, 0.25)'
                  : 'inset 0 2px 4px rgba(157, 66, 104, 0.05)',
              }}
              onFocus={(e) => {
                e.target.style.borderColor = '#9D4268';
                e.target.style.boxShadow = '0 0 0 3px rgba(232, 142, 173, 0.35)';
              }}
              onBlur={(e) => {
                e.target.style.borderColor = hasPrompted && !wishText.trim() ? '#E88EAD' : 'rgba(232, 142, 173, 0.6)';
                e.target.style.boxShadow = hasPrompted && !wishText.trim()
                  ? '0 0 0 3px rgba(232, 142, 173, 0.25)'
                  : 'inset 0 2px 4px rgba(157, 66, 104, 0.05)';
              }}
            />

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', marginTop: '10px' }}>
              {wishText.trim().length > 0 && (
                <span style={{ fontSize: '0.82rem', color: '#E88EAD', fontWeight: 600 }}>
                  {wishText.length} characters 💖
                </span>
              )}
            </div>

            <div style={{ textAlign: 'center', marginTop: '16px' }}>
              <button
                onClick={handleMakeWish}
                disabled={isSending}
                className="btn-primary"
                style={{
                  padding: 'clamp(14px, 3.5vw, 16px) clamp(20px, 5vw, 36px)',
                  fontSize: 'clamp(1rem, 2.8vw, 1.1rem)',
                  cursor: isSending ? 'wait' : 'pointer',
                  width: '100%',
                  opacity: isSending ? 0.8 : 1,
                  touchAction: 'manipulation',
                }}
              >
                <Heart size={20} fill="#FFF" />
                <span>{isSending ? 'Sending...' : 'Send this to your Enemy '}</span>
              </button>
            </div>
          </div>
        )}

        {/* 🌟 Revealed State (After Candles Blown) */}
        {candlesBlown && (
          <div style={{ marginBottom: '36px' }}>
            <div style={{ display: 'inline-flex', flexDirection: 'column', alignItems: 'center', gap: '14px' }}>
              <span
                className="badge-coquette"
                style={{
                  fontSize: '0.98rem',
                  padding: '10px 24px',
                  backgroundColor: '#FFF',
                  boxShadow: '0 4px 16px rgba(157, 66, 104, 0.15)',
                }}
              >
                ✨ {cakeFinale.buttonBlown}
              </span>

              <button
                onClick={handleRelight}
                style={{
                  background: 'none',
                  border: 'none',
                  color: '#9D4268',
                  fontSize: '0.88rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  textDecoration: 'underline',
                }}
              >
                <RotateCcw size={15} />
                <span>Try again</span>
              </button>
            </div>
          </div>
        )}

        {/* 💌 Revealed Thank You Card */}
        {candlesBlown && (
          <div
            className="glass-card"
            style={{
              maxWidth: '520px',
              margin: '0 auto 36px',
              padding: '28px 24px',
              borderRadius: '26px',
              background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.96) 0%, rgba(254, 240, 245, 0.95) 100%)',
              border: '2px solid rgba(232, 142, 173, 0.6)',
              boxShadow: '0 20px 45px rgba(157, 66, 104, 0.18)',
              position: 'relative',
              textAlign: 'center',
              animation: 'floatGentle 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
            }}
          >
            <div className="washi-tape tape-left" style={{ top: '-10px', left: '30px' }} />
            <div className="washi-tape tape-right" style={{ top: '-10px', right: '30px' }} />

            <p
              className="font-script"
              style={{
                fontSize: 'clamp(1.6rem, 4vw, 2.1rem)',
                color: '#9D4268',
                lineHeight: 1.35,
                margin: '8px 0',
                padding: '0 10px',
              }}
            >
              Sonnathuku romba nandri Madam
            </p>
          </div>
        )}

        {/* Revealed Heartfelt Final Letter Card */}
      </div>
    </section>
  );
}
