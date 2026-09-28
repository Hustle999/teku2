// Soft romantic music-box synthesizer using Web Audio API

class MusicBoxPlayer {
  private ctx: AudioContext | null = null;
  private isPlaying: boolean = false;
  private timer: number | null = null;
  private noteIndex: number = 0;

  // Gentle, warm birthday & romantic melody frequencies
  private readonly melody: { note: number; duration: number }[] = [
    // Gentle lullaby / celebration tones
    { note: 261.63, duration: 400 }, // C4
    { note: 261.63, duration: 400 }, // C4
    { note: 293.66, duration: 800 }, // D4
    { note: 261.63, duration: 800 }, // C4
    { note: 349.23, duration: 800 }, // F4
    { note: 329.63, duration: 1400 }, // E4

    { note: 261.63, duration: 400 }, // C4
    { note: 261.63, duration: 400 }, // C4
    { note: 293.66, duration: 800 }, // D4
    { note: 261.63, duration: 800 }, // C4
    { note: 392.00, duration: 800 }, // G4
    { note: 349.23, duration: 1400 }, // F4

    { note: 261.63, duration: 400 }, // C4
    { note: 261.63, duration: 400 }, // C4
    { note: 523.25, duration: 800 }, // C5
    { note: 440.00, duration: 800 }, // A4
    { note: 349.23, duration: 800 }, // F4
    { note: 329.63, duration: 800 }, // E4
    { note: 293.66, duration: 1200 }, // D4

    { note: 466.16, duration: 400 }, // Bb4
    { note: 466.16, duration: 400 }, // Bb4
    { note: 440.00, duration: 800 }, // A4
    { note: 349.23, duration: 800 }, // F4
    { note: 392.00, duration: 800 }, // G4
    { note: 349.23, duration: 1600 }, // F4
  ];

  private initCtx() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  public playTone(freq: number, durationMs: number = 600) {
    try {
      this.initCtx();
      if (!this.ctx) return;

      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      // Sine wave with subtle triangle overtone for chime/music-box sweetness
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime);

      // Soft envelope (bell chime)
      const now = this.ctx.currentTime;
      gain.gain.setValueAtTime(0.001, now);
      gain.gain.exponentialRampToValueAtTime(0.2, now + 0.04);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + durationMs / 1000);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + durationMs / 1000 + 0.1);
    } catch {
      // Audio context might be restricted before interaction
    }
  }

  public playChimeSuccess() {
    // Joyful magical chime chord
    const chord = [392.0, 523.25, 659.25, 783.99, 1046.5];
    chord.forEach((freq, idx) => {
      setTimeout(() => {
        this.playTone(freq, 1200);
      }, idx * 100);
    });
  }

  public startMelody() {
    if (this.isPlaying) return;
    this.initCtx();
    this.isPlaying = true;
    this.noteIndex = 0;
    this.scheduleNextNote();
  }

  private scheduleNextNote() {
    if (!this.isPlaying) return;
    const current = this.melody[this.noteIndex];
    this.playTone(current.note, current.duration * 1.2);

    this.noteIndex = (this.noteIndex + 1) % this.melody.length;
    this.timer = window.setTimeout(() => {
      this.scheduleNextNote();
    }, current.duration);
  }

  public stopMelody() {
    this.isPlaying = false;
    if (this.timer) {
      clearTimeout(this.timer);
      this.timer = null;
    }
  }

  public toggle(): boolean {
    if (this.isPlaying) {
      this.stopMelody();
      return false;
    } else {
      this.startMelody();
      return true;
    }
  }

  public getStatus(): boolean {
    return this.isPlaying;
  }
}

export const musicBox = new MusicBoxPlayer();
