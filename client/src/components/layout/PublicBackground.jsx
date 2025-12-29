import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../../context/ThemeContext';

const PublicBackground = ({ variant = 'default' }) => {
  const { isDark } = useTheme();
  const [mousePosition, setMousePosition] = useState({ x: 50, y: 50 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const variants = {
    default: isDark ? 'from-gray-950 via-slate-900 to-gray-950' : 'from-primary-50 via-white to-purple-50',
    blue: isDark ? 'from-slate-950 via-blue-950 to-slate-950' : 'from-blue-50 via-white to-cyan-50',
    purple: isDark ? 'from-purple-950 via-gray-950 to-pink-950' : 'from-purple-50 via-white to-pink-50',
    green: isDark ? 'from-emerald-950 via-gray-950 to-green-950' : 'from-green-50 via-white to-emerald-50',
    gradient: isDark ? 'from-indigo-950 via-purple-950 to-pink-950' : 'from-primary-100 via-purple-50 to-pink-100'
  };

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      {/* Base Gradient */}
      <div className={`absolute inset-0 bg-gradient-to-br ${variants[variant]}`} />

      {/* Mouse-tracking gradient */}
      <motion.div
        className="absolute inset-0"
        style={{
          opacity: isDark ? 0.25 : 0.3,
          background: `radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%, ${isDark ? 'rgba(59, 130, 246, 0.2)' : 'rgba(59, 130, 246, 0.3)'} 0%, transparent 50%)`
        }}
      />

      {/* Animated Pattern */}
      <motion.div
        animate={{
          backgroundPosition: ['0% 0%', '100% 100%'],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          repeatType: 'reverse'
        }}
        className="absolute inset-0"
        style={{
          opacity: isDark ? 0.15 : 0.2,
          backgroundImage: `radial-gradient(circle, ${isDark ? 'rgba(255,255,255,0.08)' : 'rgba(59, 130, 246, 0.3)'} 1px, transparent 1px)`,
          backgroundSize: '50px 50px'
        }}
      />

      {/* Floating Shapes */}
      <motion.div
        animate={{
          y: [0, -30, 0],
          rotate: [0, 180, 360],
          scale: [1, 1.2, 1]
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: 'easeInOut'
        }}
        className={`absolute top-20 left-20 w-64 h-64 bg-gradient-to-br rounded-full blur-3xl ${isDark ? 'from-blue-500/20 to-purple-500/20' : 'from-primary-400/20 to-purple-400/20'}`}
      />

      <motion.div
        animate={{
          y: [0, 30, 0],
          rotate: [360, 180, 0],
          scale: [1, 1.3, 1]
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: 'easeInOut'
        }}
        className={`absolute bottom-20 right-20 w-80 h-80 bg-gradient-to-br rounded-full blur-3xl ${isDark ? 'from-purple-500/25 to-pink-500/25' : 'from-purple-400/20 to-pink-400/20'}`}
      />

      <motion.div
        animate={{
          x: [-20, 20, -20],
          y: [20, -20, 20],
          rotate: [0, 90, 0]
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: 'easeInOut'
        }}
        className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-br rounded-full blur-3xl ${isDark ? 'from-blue-500/15 to-cyan-500/15' : 'from-blue-400/10 to-cyan-400/10'}`}
      />

      {/* Grid Overlay */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5" />
    </div>
  );
};

export default PublicBackground;
