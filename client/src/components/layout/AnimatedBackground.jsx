import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

const AnimatedBackground = ({ variant = 'particles', className = '' }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    if (variant === 'particles' && canvasRef.current) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      let animationFrameId;
      let particles = [];

      // Set canvas size
      const resizeCanvas = () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
      };
      resizeCanvas();
      window.addEventListener('resize', resizeCanvas);

      // Particle class
      class Particle {
        constructor() {
          this.x = Math.random() * canvas.width;
          this.y = Math.random() * canvas.height;
          this.vx = (Math.random() - 0.5) * 0.5;
          this.vy = (Math.random() - 0.5) * 0.5;
          this.size = Math.random() * 3 + 1;
          this.opacity = Math.random() * 0.5 + 0.2;
        }

        update() {
          this.x += this.vx;
          this.y += this.vy;

          if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
          if (this.y < 0 || this.y > canvas.height) this.vy *= -1;
        }

        draw() {
          ctx.beginPath();
          ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(59, 130, 246, ${this.opacity})`;
          ctx.fill();
        }
      }

      // Initialize particles
      for (let i = 0; i < 100; i++) {
        particles.push(new Particle());
      }

      // Animation loop
      const animate = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Draw connections
        particles.forEach((p1, i) => {
          particles.slice(i + 1).forEach(p2 => {
            const dx = p1.x - p2.x;
            const dy = p1.y - p2.y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < 150) {
              ctx.beginPath();
              ctx.strokeStyle = `rgba(59, 130, 246, ${0.2 * (1 - distance / 150)})`;
              ctx.lineWidth = 1;
              ctx.moveTo(p1.x, p1.y);
              ctx.lineTo(p2.x, p2.y);
              ctx.stroke();
            }
          });
        });

        // Update and draw particles
        particles.forEach(particle => {
          particle.update();
          particle.draw();
        });

        animationFrameId = requestAnimationFrame(animate);
      };

      animate();

      return () => {
        window.removeEventListener('resize', resizeCanvas);
        cancelAnimationFrame(animationFrameId);
      };
    }
  }, [variant]);

  if (variant === 'particles') {
    return (
      <canvas
        ref={canvasRef}
        className={`fixed inset-0 pointer-events-none ${className}`}
        style={{ zIndex: -1 }}
      />
    );
  }

  if (variant === 'gradient') {
    return (
      <div className={`fixed inset-0 pointer-events-none ${className}`} style={{ zIndex: -1 }}>
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-primary-500/10 via-secondary-500/10 to-accent-500/10"
          animate={{
            backgroundPosition: ['0% 0%', '100% 100%', '0% 0%'],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: 'linear',
          }}
          style={{
            backgroundSize: '200% 200%',
          }}
        />
      </div>
    );
  }

  if (variant === 'mesh') {
    return (
      <div className={`fixed inset-0 pointer-events-none ${className}`} style={{ zIndex: -1 }}>
        <div className="absolute inset-0 grid-bg opacity-20" />
        <motion.div
          className="absolute inset-0"
          style={{
            background: 'radial-gradient(circle at center, transparent 0%, rgba(59, 130, 246, 0.05) 100%)',
          }}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      </div>
    );
  }

  if (variant === 'waves') {
    return (
      <div className={`fixed inset-0 pointer-events-none overflow-hidden ${className}`} style={{ zIndex: -1 }}>
        {[0, 1, 2].map((index) => (
          <motion.div
            key={index}
            className="absolute inset-0"
            style={{
              background: `linear-gradient(180deg, transparent 0%, rgba(59, 130, 246, ${0.05 - index * 0.015}) 50%, transparent 100%)`,
            }}
            animate={{
              y: ['0%', '100%', '0%'],
            }}
            transition={{
              duration: 15 + index * 5,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: index * 2,
            }}
          />
        ))}
      </div>
    );
  }

  return null;
};

export default AnimatedBackground;
