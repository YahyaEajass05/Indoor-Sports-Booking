import { useState, useEffect } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';

const ScrollProgressBar = ({ position = 'top', height = 4, color = 'gradient' }) => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const positionStyles = {
    top: 'top-0',
    bottom: 'bottom-0',
  };

  const colorStyles = {
    gradient: 'bg-gradient-to-r from-primary-500 via-secondary-500 to-accent-500',
    primary: 'bg-primary-500',
    secondary: 'bg-secondary-500',
    accent: 'bg-accent-500',
  };

  return (
    <>
      <motion.div
        className={`fixed left-0 right-0 ${positionStyles[position]} z-[100] origin-left shadow-lg`}
        style={{
          scaleX,
          height: `${height}px`,
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: isVisible ? 1 : 0 }}
        transition={{ duration: 0.2 }}
      >
        <div className={`w-full h-full ${colorStyles[color]}`} />
        <motion.div
          className="absolute inset-0 blur-md opacity-50"
          style={{
            background: 'linear-gradient(90deg, rgba(59, 130, 246, 0.8), rgba(217, 70, 239, 0.8), rgba(249, 115, 22, 0.8))',
          }}
        />
      </motion.div>

      {/* Circular progress indicator */}
      <motion.div
        className="fixed bottom-8 right-8 z-[100]"
        initial={{ opacity: 0, scale: 0 }}
        animate={{
          opacity: isVisible ? 1 : 0,
          scale: isVisible ? 1 : 0,
        }}
        transition={{ duration: 0.3 }}
      >
        <div className="relative w-14 h-14">
          <svg className="w-full h-full transform -rotate-90">
            <circle
              cx="28"
              cy="28"
              r="24"
              stroke="currentColor"
              strokeWidth="3"
              fill="none"
              className="text-gray-200"
            />
            <motion.circle
              cx="28"
              cy="28"
              r="24"
              stroke="url(#gradient)"
              strokeWidth="3"
              fill="none"
              strokeLinecap="round"
              style={{
                pathLength: scrollYProgress,
              }}
              strokeDasharray="0 1"
            />
            <defs>
              <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#3b82f6" />
                <stop offset="50%" stopColor="#d946ef" />
                <stop offset="100%" stopColor="#f97316" />
              </linearGradient>
            </defs>
          </svg>
          <motion.button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="absolute inset-0 m-auto w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-gradient-to-br hover:from-primary-500 hover:to-secondary-500 hover:text-white transition-all group"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <svg className="w-5 h-5 text-gray-700 group-hover:text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
            </svg>
          </motion.button>
        </div>
      </motion.div>
    </>
  );
};

export default ScrollProgressBar;
