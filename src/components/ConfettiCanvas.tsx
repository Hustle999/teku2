import { useEffect, useRef } from 'react';

interface ConfettiPiece {
  x: number;
  y: number;
  w: number;
  h: number;
  color: string;
  vx: number;
  vy: number;
  rotation: number;
  vr: number;
  opacity: number;
}

export function fireConfetti() {
  window.dispatchEvent(new CustomEvent('celebrate-confetti'));
}

export function ConfettiCanvas() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);
    let pieces: ConfettiPiece[] = [];
    let animId: number;

    const colors = [
      '#FF6B8B', '#FFA07A', '#FFD700', '#FF69B4',
      '#FFF0F5', '#E6E6FA', '#F4A460', '#FFE4E1',
      '#FF85A1', '#FFC2D1'
    ];

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    const launchConfetti = () => {
      const count = 120;
      const originX = width / 2;
      const originY = height / 2;

      for (let i = 0; i < count; i++) {
        const angle = Math.random() * Math.PI * 2;
        const speed = Math.random() * 12 + 5;
        pieces.push({
          x: originX,
          y: originY,
          w: Math.random() * 8 + 5,
          h: Math.random() * 6 + 4,
          color: colors[Math.floor(Math.random() * colors.length)],
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed - 4,
          rotation: Math.random() * 360,
          vr: (Math.random() - 0.5) * 15,
          opacity: 1,
        });
      }
    };

    window.addEventListener('celebrate-confetti', launchConfetti);

    const update = () => {
      ctx.clearRect(0, 0, width, height);

      if (pieces.length > 0) {
        for (let i = pieces.length - 1; i >= 0; i--) {
          const p = pieces[i];
          p.x += p.vx;
          p.y += p.vy;
          p.vy += 0.25; // gravity
          p.vx *= 0.98; // air resistance
          p.rotation += p.vr;
          p.opacity -= 0.007;

          if (p.opacity <= 0 || p.y > height + 20) {
            pieces.splice(i, 1);
            continue;
          }

          ctx.save();
          ctx.translate(p.x, p.y);
          ctx.rotate((p.rotation * Math.PI) / 180);
          ctx.fillStyle = p.color;
          ctx.globalAlpha = Math.max(0, p.opacity);
          ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
          ctx.restore();
        }
      }

      animId = requestAnimationFrame(update);
    };

    update();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('celebrate-confetti', launchConfetti);
      cancelAnimationFrame(animId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-50 h-full w-full"
    />
  );
}
