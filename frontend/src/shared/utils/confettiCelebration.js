import confetti from 'canvas-confetti';

/**
 * triggerConfettiCelebration
 * High-impact AlgoMaster/LeetCode-style celebration confetti explosion:
 * 1. Dual-cannon corner burst with emerald green, mint, cyan, lime, and gold particles
 * 2. Top-down confetti rain shower matching user's screenshot
 * 3. Soft pleasant harmonic victory chime via Web Audio API
 */
export function triggerConfettiCelebration() {
  const emeraldColors = ['#10B981', '#34D399', '#059669', '#064E3B', '#22D3EE', '#84CC16', '#F59E0B', '#10B981'];

  // 1. Center & Corner Cannon Bursts
  confetti({
    particleCount: 80,
    spread: 70,
    origin: { y: 0.85, x: 0.5 },
    colors: emeraldColors,
    ticks: 300,
    gravity: 0.9,
    scalar: 1.1,
    shapes: ['square', 'circle']
  });

  // 2. Left and Right synchronized side cannons
  setTimeout(() => {
    confetti({
      particleCount: 50,
      angle: 60,
      spread: 55,
      origin: { x: 0, y: 0.75 },
      colors: emeraldColors,
      ticks: 300,
      gravity: 0.8
    });
    confetti({
      particleCount: 50,
      angle: 120,
      spread: 55,
      origin: { x: 1, y: 0.75 },
      colors: emeraldColors,
      ticks: 300,
      gravity: 0.8
    });
  }, 150);

  // 3. Gentle top-down floating confetti shower (Matching AlgoMaster Screenshot)
  setTimeout(() => {
    const end = Date.now() + 1500;
    const interval = setInterval(() => {
      if (Date.now() > end) {
        return clearInterval(interval);
      }
      confetti({
        startVelocity: 25,
        particleCount: 20,
        spread: 360,
        ticks: 250,
        origin: {
          x: Math.random(),
          y: Math.random() * 0.3 - 0.1
        },
        colors: emeraldColors,
        gravity: 0.6,
        scalar: 0.9,
        drift: Math.random() * 0.4 - 0.2
      });
    }, 150);
  }, 300);

  // 4. Harmonic Success Chime (Web Audio API)
  playCelebrationSound();
}

/**
 * Pleasant 3-note pentatonic victory chord (C5 -> E5 -> G5)
 */
function playCelebrationSound() {
  try {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (!AudioContext) return;
    const ctx = new AudioContext();

    const notes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6
    notes.forEach((freq, index) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, ctx.currentTime + index * 0.08);

      gain.gain.setValueAtTime(0.001, ctx.currentTime + index * 0.08);
      gain.gain.exponentialRampToValueAtTime(0.12, ctx.currentTime + index * 0.08 + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + index * 0.08 + 0.4);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(ctx.currentTime + index * 0.08);
      osc.stop(ctx.currentTime + index * 0.08 + 0.45);
    });
  } catch (e) {
    // Audio Context blocked or unavailable (fail silently)
  }
}
