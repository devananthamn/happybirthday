import React, { useState, useRef, useEffect } from 'react';
import { Volume2, VolumeX, Play, Pause, Music } from 'lucide-react';
import { birthdayConfig } from '../../config/birthdayConfig';
import { sounds } from '../../utils/soundEffects';

const YOUTUBE_ID = birthdayConfig.music?.youtubeId || 'UzhiBIOP1go';

export default function MusicPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isExpanded, setIsExpanded] = useState(true);
  const [isReady, setIsReady] = useState(false);
  const playerRef = useRef(null);
  const containerRef = useRef(null);

  const initPlayer = () => {
    if (playerRef.current) return; // already initialised
    playerRef.current = new window.YT.Player(containerRef.current, {
      videoId: YOUTUBE_ID,
      width: '1',
      height: '1',
      playerVars: {
        autoplay: 0,
        controls: 0,
        disablekb: 1,
        fs: 0,
        iv_load_policy: 3,
        modestbranding: 1,
        rel: 0,
        loop: 1,
        playlist: YOUTUBE_ID, // needed for loop to work
      },
      events: {
        onReady: () => {
          setIsReady(true);
        },
        onStateChange: (e) => {
          // 1 = playing, 2 = paused, 0 = ended → restart
          if (e.data === window.YT.PlayerState.PLAYING) {
            setIsPlaying(true);
          } else if (e.data === window.YT.PlayerState.PAUSED) {
            setIsPlaying(false);
          } else if (e.data === window.YT.PlayerState.ENDED) {
            // Loop: seek back to start and play again
            playerRef.current.seekTo(0);
            playerRef.current.playVideo();
          }
        },
      },
    });
  };

  // Load YouTube IFrame API once
  useEffect(() => {
    if (window.YT && window.YT.Player) {
      initPlayer();
      return;
    }

    // Inject the script tag only once
    if (!document.getElementById('yt-iframe-api')) {
      const tag = document.createElement('script');
      tag.id = 'yt-iframe-api';
      tag.src = 'https://www.youtube.com/iframe_api';
      document.head.appendChild(tag);
    }

    // YouTube calls this global when API is ready
    window.onYouTubeIframeAPIReady = () => {
      initPlayer();
    };

    return () => {
      if (playerRef.current) {
        try { playerRef.current.destroy(); } catch {}
      }
    };
  }, []);

  const togglePlay = () => {
    sounds.playPop();
    if (!playerRef.current || !isReady) return;
    if (isPlaying) {
      playerRef.current.pauseVideo();
    } else {
      playerRef.current.playVideo();
    }
  };

  const toggleMute = () => {
    const nextMute = !isMuted;
    setIsMuted(nextMute);
    sounds.isMuted = nextMute;
    if (!playerRef.current || !isReady) return;
    if (nextMute) {
      playerRef.current.mute();
    } else {
      playerRef.current.unMute();
    }
  };

  return (
    <aside
      className="music-player-wrapper"
      style={{
        position: 'fixed',
        bottom: 'max(16px, env(safe-area-inset-bottom))',
        right: 'max(16px, env(safe-area-inset-right))',
        zIndex: 40,
        maxWidth: 'calc(100vw - 24px)',
      }}
      aria-label="Background Music Player"
    >
      {/* Hidden YouTube player container (1×1 px, off-screen) */}
      <div
        style={{ position: 'absolute', width: '1px', height: '1px', opacity: 0, pointerEvents: 'none' }}
        ref={containerRef}
      />

      <div
        className="glass-card"
        style={{
          display: 'flex',
          alignItems: 'center',
          padding: isExpanded ? '6px 14px 6px 8px' : '8px',
          background: 'rgba(255, 249, 245, 0.94)',
          backdropFilter: 'blur(16px)',
          border: '1.5px solid rgba(232, 142, 173, 0.5)',
          borderRadius: '9999px',
          boxShadow: '0 8px 30px -4px rgba(157, 66, 104, 0.25)',
          gap: '10px',
        }}
      >
        {/* Play / Pause circular button */}
        <button
          onClick={togglePlay}
          aria-label={isPlaying ? 'Pause music' : 'Play birthday music'}
          className="btn-primary"
          style={{
            width: '42px',
            height: '42px',
            minWidth: '42px',
            padding: 0,
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            opacity: isReady ? 1 : 0.6,
          }}
        >
          {isPlaying ? <Pause size={18} /> : <Play size={18} style={{ marginLeft: '2px' }} />}
        </button>

        {isExpanded && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            {/* Visualizer soundwave */}
            <div style={{ display: 'flex', alignItems: 'flex-end', height: '18px', gap: '3px' }}>
              {[0.4, 0.8, 1.0, 0.6, 0.9, 0.5].map((_, i) => (
                <span
                  key={i}
                  style={{
                    width: '3px',
                    height: isPlaying ? '100%' : '4px',
                    backgroundColor: '#E88EAD',
                    borderRadius: '2px',
                    transform: isPlaying ? 'scaleY(1)' : 'scaleY(0.3)',
                    transformOrigin: 'bottom',
                    animation: isPlaying
                      ? `floatGentle ${0.7 + i * 0.15}s ease-in-out infinite alternate`
                      : 'none',
                    transition: 'height 0.2s ease',
                  }}
                />
              ))}
            </div>

            {/* Mute button */}
            <button
              onClick={toggleMute}
              aria-label={isMuted ? 'Unmute audio' : 'Mute audio'}
              style={{
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                color: isMuted ? '#9E7D8C' : '#9D4268',
                padding: '4px',
                display: 'flex',
                alignItems: 'center',
              }}
            >
              {isMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}
            </button>
          </div>
        )}

        {/* Toggle Expand/Collapse */}
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          title={isExpanded ? 'Collapse player' : 'Expand music info'}
          style={{
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            color: '#E88EAD',
            fontSize: '0.75rem',
            padding: '2px 4px',
          }}
        >
          {isExpanded ? '✕' : <Music size={15} />}
        </button>
      </div>
    </aside>
  );
}
