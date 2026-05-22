import { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  opacity: number;
  rotation: number;
  rotationSpeed: number;
}

export function NatureBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const animationRef = useRef<number>();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    // Create particles
    const particleCount = 30;
    const particles: Particle[] = [];

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 30 + 20,
        speedX: (Math.random() - 0.5) * 0.1,
        speedY: (Math.random() - 0.5) * 0.1,
        opacity: Math.random() * 0.3 + 0.4,
        rotation: Math.random() * 360,
        rotationSpeed: (Math.random() - 0.5) * 0.2,
      });
    }

    particlesRef.current = particles;

    // Draw leaf shape
    const drawLeaf = (ctx: CanvasRenderingContext2D, x: number, y: number, size: number, rotation: number, opacity: number) => {
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate((rotation * Math.PI) / 180);
      ctx.globalAlpha = opacity;
      
      ctx.beginPath();
      ctx.moveTo(0, -size);
      ctx.bezierCurveTo(size * 0.5, -size * 0.5, size, -size * 0.3, size, 0);
      ctx.bezierCurveTo(size, size * 0.3, size * 0.5, size * 0.5, 0, size);
      ctx.bezierCurveTo(-size * 0.5, size * 0.5, -size, size * 0.3, -size, 0);
      ctx.bezierCurveTo(-size, -size * 0.3, -size * 0.5, -size * 0.5, 0, -size);
      ctx.closePath();
      
      // Fill with earth/gold gradient
      const gradient = ctx.createLinearGradient(-size, -size, size, size);
      gradient.addColorStop(0, "rgba(184, 134, 11, 0.3)");
      gradient.addColorStop(0.5, "rgba(107, 142, 35, 0.2)");
      gradient.addColorStop(1, "rgba(26, 25, 23, 0.1)");
      ctx.fillStyle = gradient;
      ctx.fill();
      
      // Draw vein
      ctx.beginPath();
      ctx.moveTo(0, -size);
      ctx.quadraticCurveTo(size * 0.1, 0, 0, size);
      ctx.strokeStyle = "rgba(107, 142, 35, 0.3)";
      ctx.lineWidth = 1;
      ctx.stroke();
      
      ctx.restore();
    };

    // Draw water droplet
    const drawDroplet = (ctx: CanvasRenderingContext2D, x: number, y: number, size: number, opacity: number) => {
      ctx.save();
      ctx.globalAlpha = opacity;
      
      ctx.beginPath();
      ctx.arc(x, y, size, 0, Math.PI * 2);
      const gradient = ctx.createRadialGradient(x - size * 0.3, y - size * 0.3, 0, x, y, size);
      gradient.addColorStop(0, "rgba(173, 216, 230, 0.4)");
      gradient.addColorStop(0.5, "rgba(135, 206, 235, 0.2)");
      gradient.addColorStop(1, "rgba(70, 130, 180, 0.1)");
      ctx.fillStyle = gradient;
      ctx.fill();
      
      ctx.restore();
    };

    // Draw organic circle
    const drawOrganicCircle = (ctx: CanvasRenderingContext2D, x: number, y: number, size: number, opacity: number) => {
      ctx.save();
      ctx.globalAlpha = opacity;
      
      ctx.beginPath();
      for (let i = 0; i <= 360; i += 10) {
        const angle = (i * Math.PI) / 180;
        const radius = size + Math.sin(angle * 3) * size * 0.1;
        const px = x + Math.cos(angle) * radius;
        const py = y + Math.sin(angle) * radius;
        if (i === 0) {
          ctx.moveTo(px, py);
        } else {
          ctx.lineTo(px, py);
        }
      }
      ctx.closePath();
      
      const gradient = ctx.createRadialGradient(x, y, 0, x, y, size);
      gradient.addColorStop(0, "rgba(184, 134, 11, 0.15)");
      gradient.addColorStop(1, "rgba(184, 134, 11, 0)");
      ctx.fillStyle = gradient;
      ctx.fill();
      
      ctx.restore();
    };

    // Animation loop with frame rate control
    let lastTime = 0;
    const fps = 30;
    const interval = 1000 / fps;

    const animate = (currentTime: number) => {
      animationRef.current = requestAnimationFrame(animate);

      const deltaTime = currentTime - lastTime;

      if (deltaTime < interval) return;

      lastTime = currentTime - (deltaTime % interval);

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((particle) => {
        // Update position
        particle.x += particle.speedX;
        particle.y += particle.speedY;
        particle.rotation += particle.rotationSpeed;

        // Wrap around screen
        if (particle.x < -50) particle.x = canvas.width + 50;
        if (particle.x > canvas.width + 50) particle.x = -50;
        if (particle.y < -50) particle.y = canvas.height + 50;
        if (particle.y > canvas.height + 50) particle.y = -50;

        // Draw different types of particles
        const type = Math.floor(particle.x) % 3;
        if (type === 0) {
          drawLeaf(ctx, particle.x, particle.y, particle.size, particle.rotation, particle.opacity);
        } else if (type === 1) {
          drawDroplet(ctx, particle.x, particle.y, particle.size * 0.3, particle.opacity * 0.8);
        } else {
          drawOrganicCircle(ctx, particle.x, particle.y, particle.size * 0.8, particle.opacity * 0.5);
        }
      });
    };

    animate(0);

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{ opacity: 0.8 }}
    />
  );
}
