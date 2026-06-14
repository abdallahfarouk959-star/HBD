import { useEffect, useRef } from 'react';

export default function ParticleBackground() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = 0;
    let height = 0;

    interface Star {
      x: number;
      y: number;
      size: number;
      baseX: number;
      baseY: number;
      angle: number;
      speed: number;
      color: string;
      alpha: number;
      twinkleSpeed: number;
      twinkleDir: number;
    }

    let stars: Star[] = [];
    const mouse = { x: -9999, y: -9999, radius: 150 };

    // Palette of glowing stars
    const colors = [
      'rgba(236, 192, 188, ', // Rose gold
      'rgba(253, 224, 71, ',  // Neon yellow/gold
      'rgba(236, 72, 153, ',  // Neon pink
      'rgba(168, 85, 247, ',  // Neon purple
      'rgba(147, 197, 253, ', // Soft blue
    ];

    const createStars = (w: number, h: number) => {
      const count = Math.min(Math.floor((w * h) / 7000), 220);
      stars = [];
      for (let i = 0; i < count; i++) {
        const size = Math.random() * 2 + 0.6;
        const color = colors[Math.floor(Math.random() * colors.length)];
        stars.push({
          x: Math.random() * w,
          y: Math.random() * h,
          size,
          baseX: 0,
          baseY: 0,
          angle: Math.random() * Math.PI * 2,
          speed: Math.random() * 0.15 + 0.05,
          color,
          alpha: Math.random() * 0.7 + 0.3,
          twinkleSpeed: Math.random() * 0.015 + 0.005,
          twinkleDir: Math.random() > 0.5 ? 1 : -1,
        });
      }
    };

    const handleResize = (entries: ResizeObserverEntry[]) => {
      const entry = entries[0];
      if (!entry) return;
      const { width: w, height: h } = entry.contentRect;
      width = w;
      height = h;
      canvas.width = w;
      canvas.height = h;
      createStars(w, h);
    };

    const resizeObserver = new ResizeObserver(handleResize);
    resizeObserver.observe(container);

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    };

    const handleMouseLeave = () => {
      mouse.x = -9999;
      mouse.y = -9999;
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        const rect = canvas.getBoundingClientRect();
        mouse.x = e.touches[0].clientX - rect.left;
        mouse.y = e.touches[0].clientY - rect.top;
      }
    };

    const handleTouchEnd = () => {
      mouse.x = -9999;
      mouse.y = -9999;
    };

    container.addEventListener('mousemove', handleMouseMove);
    container.addEventListener('mouseleave', handleMouseLeave);
    container.addEventListener('touchmove', handleTouchMove, { passive: true });
    container.addEventListener('touchend', handleTouchEnd);

    const animate = () => {
      ctx.clearRect(0, 0, width, height);

      // Draw faint background grid glow (ambient stars & space)
      for (let i = 0; i < stars.length; i++) {
        const s = stars[i];

        // Orbit or soft drifting motion
        s.angle += s.speed * 0.01;
        s.x += Math.cos(s.angle) * 0.15;
        s.y += Math.sin(s.angle) * 0.15;

        // Wrap around bounds
        if (s.x < 0) s.x = width;
        if (s.x > width) s.x = 0;
        if (s.y < 0) s.y = height;
        if (s.y > height) s.y = 0;

        // Twinkle effect (alpha changing)
        s.alpha += s.twinkleSpeed * s.twinkleDir;
        if (s.alpha > 0.95) {
          s.alpha = 0.95;
          s.twinkleDir = -1;
        } else if (s.alpha < 0.2) {
          s.alpha = 0.2;
          s.twinkleDir = 1;
        }

        // Mouse interaction: draw fine sparkling connections & push stars slightly
        let displayX = s.x;
        let displayY = s.y;

        if (mouse.x !== -9999) {
          const dx = mouse.x - s.x;
          const dy = mouse.y - s.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < mouse.radius) {
            // Magnetic attraction or organic alignment: pull slightly
            const force = (mouse.radius - dist) / mouse.radius;
            displayX += (dx / dist) * force * 15;
            displayY += (dy / dist) * force * 15;

            // Draw connecting lines with alpha based on distance
            const lineAlpha = (1 - dist / mouse.radius) * 0.15;
            ctx.beginPath();
            ctx.moveTo(displayX, displayY);
            ctx.lineTo(mouse.x, mouse.y);
            ctx.strokeStyle = s.color + lineAlpha + ')';
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }

        // Draw star
        ctx.beginPath();
        const grad = ctx.createRadialGradient(
          displayX, displayY, 0,
          displayX, displayY, s.size * 2
        );
        grad.addColorStop(0, 'rgba(255, 255, 255, ' + s.alpha + ')');
        grad.addColorStop(0.4, s.color + (s.alpha * 0.7) + ')');
        grad.addColorStop(1, 'rgba(0, 0, 0, 0)');
        
        ctx.fillStyle = grad;
        ctx.arc(displayX, displayY, s.size * 2, 0, Math.PI * 2);
        ctx.fill();
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      resizeObserver.disconnect();
      cancelAnimationFrame(animationFrameId);
      container.removeEventListener('mousemove', handleMouseMove);
      container.removeEventListener('mouseleave', handleMouseLeave);
      container.removeEventListener('touchmove', handleTouchMove);
      container.removeEventListener('touchend', handleTouchEnd);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 pointer-events-auto z-0 overflow-hidden"
      id="particles-container"
    >
      <canvas
        ref={canvasRef}
        className="block w-full h-full"
        id="starfield-canvas"
      />
    </div>
  );
}
