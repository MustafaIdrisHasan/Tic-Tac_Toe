// Sound manager for game audio effects

class SoundManager {
  constructor() {
    this.sounds = {};
    this.enabled = true;
    this.volume = 0.5;
    this.loadSounds();
  }

  loadSounds() {
    // Create audio contexts for different sound effects
    // Since we don't have actual sound files, we'll use Web Audio API to generate simple tones
    try {
      this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
    } catch (e) {
      console.warn('Web Audio API not supported, sounds disabled');
      this.enabled = false;
      return;
    }

    // Pre-generate sound buffers for common sounds
    this.sounds = {
      move: this.createTone(200, 0.1),
      win: this.createToneSequence([400, 500, 600], 0.15),
      draw: this.createTone(150, 0.2),
      error: this.createTone(100, 0.1),
      click: this.createTone(300, 0.05)
    };
  }

  createTone(frequency, duration) {
    return () => {
      if (!this.enabled || !this.audioContext) return;
      
      const oscillator = this.audioContext.createOscillator();
      const gainNode = this.audioContext.createGain();
      
      oscillator.connect(gainNode);
      gainNode.connect(this.audioContext.destination);
      
      oscillator.frequency.value = frequency;
      oscillator.type = 'sine';
      
      gainNode.gain.setValueAtTime(0, this.audioContext.currentTime);
      gainNode.gain.linearRampToValueAtTime(this.volume, this.audioContext.currentTime + 0.01);
      gainNode.gain.linearRampToValueAtTime(0, this.audioContext.currentTime + duration);
      
      oscillator.start(this.audioContext.currentTime);
      oscillator.stop(this.audioContext.currentTime + duration);
    };
  }

  createToneSequence(frequencies, durationPerTone) {
    return () => {
      if (!this.enabled || !this.audioContext) return;
      
      frequencies.forEach((freq, index) => {
        setTimeout(() => {
          const oscillator = this.audioContext.createOscillator();
          const gainNode = this.audioContext.createGain();
          
          oscillator.connect(gainNode);
          gainNode.connect(this.audioContext.destination);
          
          oscillator.frequency.value = freq;
          oscillator.type = 'sine';
          
          gainNode.gain.setValueAtTime(0, this.audioContext.currentTime);
          gainNode.gain.linearRampToValueAtTime(this.volume, this.audioContext.currentTime + 0.01);
          gainNode.gain.linearRampToValueAtTime(0, this.audioContext.currentTime + durationPerTone);
          
          oscillator.start(this.audioContext.currentTime);
          oscillator.stop(this.audioContext.currentTime + durationPerTone);
        }, index * durationPerTone * 1000);
      });
    };
  }

  play(soundName) {
    if (this.sounds[soundName]) {
      // Resume audio context if it was suspended (browser autoplay policy)
      if (this.audioContext && this.audioContext.state === 'suspended') {
        this.audioContext.resume();
      }
      this.sounds[soundName]();
    }
  }

  setEnabled(enabled) {
    this.enabled = enabled;
  }

  setVolume(volume) {
    this.volume = Math.max(0, Math.min(1, volume));
  }

  isEnabled() {
    return this.enabled;
  }
}

// Export singleton instance
export const soundManager = new SoundManager();

