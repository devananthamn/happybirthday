/**
 * 🎵 Sound Effects & Web Audio Ambient Music Synthesizer
 * Provides cute chime sounds and a cozy ambient music box melody
 * without requiring any external mp3 files, with full fallback support.
 */

class SoundController {
  constructor() {
    this.ctx = null;
    this.isMuted = false;
    this.melodyTimer = null;
    this.isPlayingMelody = false;
  }

  initCtx() {
    if (!this.ctx && typeof window !== "undefined") {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === "suspended") {
      this.ctx.resume();
    }
  }

  // Play a gentle kalimba/chime note
  playChime(freq = 523.25, duration = 0.8, type = "sine", gainVal = 0.15) {
    if (this.isMuted) return;
    try {
      this.initCtx();
      if (!this.ctx) return;

      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = type;
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime);

      // Soft envelope
      gain.gain.setValueAtTime(0.001, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(gainVal, this.ctx.currentTime + 0.05);
      gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + duration);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start();
      osc.stop(this.ctx.currentTime + duration);
    } catch {
      // Audio autoplay or permissions prevented
    }
  }

  // Cute pop chime for opening envelopes & boxes
  playPop() {
    this.playChime(587.33, 0.25, "triangle", 0.2); // D5
    setTimeout(() => this.playChime(880.0, 0.4, "sine", 0.2), 80); // A5
  }

  // Sparkle chime when cards or notes reveal
  playSparkle() {
    const notes = [523.25, 659.25, 783.99, 1046.5]; // C5, E5, G5, C6
    notes.forEach((freq, idx) => {
      setTimeout(() => this.playChime(freq, 0.4, "sine", 0.12), idx * 70);
    });
  }

  // Candle blow puff & triumphant fairy chime
  playCandleBlow() {
    if (this.isMuted) return;
    try {
      this.initCtx();
      if (!this.ctx) return;

      // Soft breath noise simulation
      const bufferSize = this.ctx.sampleRate * 0.4;
      const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (bufferSize * 0.3));
      }

      const noise = this.ctx.createBufferSource();
      noise.buffer = buffer;

      const filter = this.ctx.createBiquadFilter();
      filter.type = "lowpass";
      filter.frequency.setValueAtTime(800, this.ctx.currentTime);
      filter.frequency.exponentialRampToValueAtTime(120, this.ctx.currentTime + 0.4);

      const gain = this.ctx.createGain();
      gain.gain.setValueAtTime(0.18, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.4);

      noise.connect(filter);
      filter.connect(gain);
      gain.connect(this.ctx.destination);

      noise.start();

      // Followed by celebration harp flourish
      setTimeout(() => {
        const harp = [523.25, 659.25, 783.99, 987.77, 1046.5, 1318.51];
        harp.forEach((freq, idx) => {
          setTimeout(() => this.playChime(freq, 0.6, "sine", 0.15), idx * 80);
        });
      }, 300);
    } catch {
      // ignore
    }
  }

  // Cozy gentle ambient music box loop (Happy Birthday / Cozy Lofi motif)
  startAmbientMelody() {
    if (this.isPlayingMelody) return;
    this.initCtx();
    this.isPlayingMelody = true;

    // Cozy romantic chord arpeggio pattern: C - G - Am - F
    const chords = [
      [261.63, 329.63, 392.0, 523.25], // C major
      [246.94, 293.66, 392.0, 493.88], // G major
      [220.0, 261.63, 329.63, 440.0],  // A minor
      [174.61, 261.63, 349.23, 440.0], // F major
    ];

    let chordIdx = 0;
    let noteIdx = 0;

    const tick = () => {
      if (!this.isPlayingMelody) return;
      const currentChord = chords[chordIdx];
      const freq = currentChord[noteIdx];
      this.playChime(freq * 1.5, 0.9, "sine", 0.08);

      noteIdx++;
      if (noteIdx >= currentChord.length) {
        noteIdx = 0;
        chordIdx = (chordIdx + 1) % chords.length;
      }

      this.melodyTimer = setTimeout(tick, 450);
    };

    tick();
  }

  stopAmbientMelody() {
    this.isPlayingMelody = false;
    if (this.melodyTimer) {
      clearTimeout(this.melodyTimer);
      this.melodyTimer = null;
    }
  }
}

export const sounds = new SoundController();
