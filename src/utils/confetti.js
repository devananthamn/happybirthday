import confetti from 'canvas-confetti';

/**
 * 🎀 Magical Confetti & Sparkles Controller
 */

// Soft blush, rose pink, lavender, and champagne gold colors
const COQUETTE_COLORS = ['#F8C8DC', '#FCE4EC', '#E88EAD', '#9D4268', '#E6E6FA', '#F3E5AB', '#FFFFFF'];

/**
 * Quick burst of hearts and sparkles (opening surprise, quiz answers, etc.)
 */
export function fireSurpriseConfetti() {
  // Center burst
  confetti({
    particleCount: 60,
    spread: 70,
    origin: { y: 0.6 },
    colors: COQUETTE_COLORS,
    ticks: 200,
    gravity: 0.8,
    scalar: 1.1,
  });

  // Soft secondary sparkle
  setTimeout(() => {
    confetti({
      particleCount: 40,
      angle: 60,
      spread: 55,
      origin: { x: 0.2, y: 0.65 },
      colors: COQUETTE_COLORS,
    });
    confetti({
      particleCount: 40,
      angle: 120,
      spread: 55,
      origin: { x: 0.8, y: 0.65 },
      colors: COQUETTE_COLORS,
    });
  }, 150);
}

/**
 * Grand Cake Finale Celebration (multi-stage cannons!)
 */
export function fireGrandFinaleConfetti() {
  const end = Date.now() + 3.5 * 1000;

  const frame = () => {
    confetti({
      particleCount: 3,
      angle: 60,
      spread: 55,
      origin: { x: 0, y: 0.7 },
      colors: COQUETTE_COLORS,
    });
    confetti({
      particleCount: 3,
      angle: 120,
      spread: 55,
      origin: { x: 1, y: 0.7 },
      colors: COQUETTE_COLORS,
    });

    if (Date.now() < end) {
      requestAnimationFrame(frame);
    }
  };

  frame();

  // Big center booms
  setTimeout(() => {
    confetti({
      particleCount: 100,
      spread: 100,
      origin: { y: 0.5 },
      colors: COQUETTE_COLORS,
      scalar: 1.25,
    });
  }, 400);

  setTimeout(() => {
    confetti({
      particleCount: 80,
      spread: 120,
      origin: { y: 0.4 },
      colors: ['#E88EAD', '#9D4268', '#F3E5AB', '#FFF'],
      scalar: 1.1,
    });
  }, 1200);
}

/**
 * Gentle little sparkle for note opening or button interactions
 */
export function fireGentleSparkle(x = 0.5, y = 0.5) {
  confetti({
    particleCount: 25,
    spread: 45,
    origin: { x, y },
    colors: ['#F8C8DC', '#E88EAD', '#FCE4EC', '#FFF9F5'],
    gravity: 0.9,
    ticks: 120,
    scalar: 0.9,
  });
}
