/**
 * Loading Animations & Spinners
 * Collection of loading indicators and spinners
 */

import React from 'react';
import { motion } from 'framer-motion';

// Spinner Variants
export const spinnerVariants = {
  circular: {
    animate: {
      rotate: 360,
      transition: { duration: 1, repeat: Infinity, ease: 'linear' }
    }
  },
  pulse: {
    animate: {
      scale: [1, 1.2, 1],
      opacity: [1, 0.5, 1],
      transition: { duration: 1.5, repeat: Infinity, ease: 'easeInOut' }
    }
  },
  bounce: {
    animate: {
      y: [0, -20, 0],
      transition: { duration: 0.6, repeat: Infinity, ease: 'easeInOut' }
    }
  }
};

// Dots Loader
export const DotsLoader = ({ size = 'md', color = 'primary' }) => {
  const sizes = { sm: 8, md: 12, lg: 16 };
  const dotSize = sizes[size];
  
  const containerVariants = {
    animate: {
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const dotVariants = {
    animate: {
      y: [0, -15, 0],
      transition: {
        duration: 0.6,
        repeat: Infinity,
        ease: 'easeInOut'
      }
    }
  };

  return (
    <motion.div 
      className="flex gap-2"
      variants={containerVariants}
      animate="animate"
    >
      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          className={`bg-${color}-500 rounded-full`}
          style={{ width: dotSize, height: dotSize }}
          variants={dotVariants}
        />
      ))}
    </motion.div>
  );
};

// Circle Spinner
export const CircleSpinner = ({ size = 40, color = '#3b82f6', thickness = 4 }) => {
  return (
    <motion.div
      className="relative"
      style={{ width: size, height: size }}
      animate={{ rotate: 360 }}
      transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
    >
      <svg width={size} height={size} viewBox="0 0 50 50">
        <circle
          cx="25"
          cy="25"
          r="20"
          fill="none"
          stroke={color}
          strokeWidth={thickness}
          strokeDasharray="80, 200"
          strokeLinecap="round"
        />
      </svg>
    </motion.div>
  );
};

// Progress Bar
export const ProgressBar = ({ progress = 0, height = 4, color = 'primary' }) => {
  return (
    <div className="w-full bg-gray-200 rounded-full overflow-hidden" style={{ height }}>
      <motion.div
        className={`bg-${color}-500 h-full`}
        initial={{ width: 0 }}
        animate={{ width: `${progress}%` }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
      />
    </div>
  );
};

// Skeleton Loader
export const SkeletonLoader = ({ width = '100%', height = 20, className = '' }) => {
  return (
    <motion.div
      className={`bg-gray-200 rounded ${className}`}
      style={{ width, height }}
      animate={{
        backgroundColor: ['#e5e7eb', '#f3f4f6', '#e5e7eb']
      }}
      transition={{
        duration: 1.5,
        repeat: Infinity,
        ease: 'easeInOut'
      }}
    />
  );
};

// Ripple Loader
export const RippleLoader = ({ size = 60, color = '#3b82f6' }) => {
  return (
    <div className="relative" style={{ width: size, height: size }}>
      {[0, 1].map((i) => (
        <motion.div
          key={i}
          className="absolute inset-0 rounded-full border-4"
          style={{ borderColor: color }}
          animate={{
            scale: [0, 1],
            opacity: [1, 0]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            delay: i * 1,
            ease: 'easeOut'
          }}
        />
      ))}
    </div>
  );
};

// Bars Loader
export const BarsLoader = ({ barCount = 5, height = 40, color = '#3b82f6' }) => {
  return (
    <div className="flex items-end gap-1" style={{ height }}>
      {Array.from({ length: barCount }).map((_, i) => (
        <motion.div
          key={i}
          className="w-1"
          style={{ backgroundColor: color }}
          animate={{
            height: ['20%', '100%', '20%']
          }}
          transition={{
            duration: 1,
            repeat: Infinity,
            delay: i * 0.1,
            ease: 'easeInOut'
          }}
        />
      ))}
    </div>
  );
};

// Heart Beat Loader
export const HeartBeatLoader = ({ size = 40, color = '#ef4444' }) => {
  return (
    <motion.svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill={color}
      animate={{
        scale: [1, 1.2, 1]
      }}
      transition={{
        duration: 0.8,
        repeat: Infinity,
        ease: 'easeInOut'
      }}
    >
      <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
    </motion.svg>
  );
};

// Infinity Loader
export const InfinityLoader = ({ size = 60, color = '#3b82f6', thickness = 4 }) => {
  return (
    <motion.svg
      width={size}
      height={size / 2}
      viewBox="0 0 100 50"
      fill="none"
      stroke={color}
      strokeWidth={thickness}
    >
      <motion.path
        d="M0,25 Q15,0 25,25 T50,25 Q65,50 75,25 T100,25"
        strokeDasharray="200"
        strokeDashoffset="200"
        animate={{
          strokeDashoffset: [200, 0]
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: 'linear'
        }}
      />
    </motion.svg>
  );
};

// Clock Loader
export const ClockLoader = ({ size = 40, color = '#3b82f6' }) => {
  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg width={size} height={size} viewBox="0 0 24 24">
        <circle cx="12" cy="12" r="10" stroke={color} strokeWidth="2" fill="none" />
        <motion.line
          x1="12"
          y1="12"
          x2="12"
          y2="6"
          stroke={color}
          strokeWidth="2"
          strokeLinecap="round"
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
          style={{ originX: '12px', originY: '12px' }}
        />
        <motion.line
          x1="12"
          y1="12"
          x2="16"
          y2="12"
          stroke={color}
          strokeWidth="2"
          strokeLinecap="round"
          animate={{ rotate: 360 }}
          transition={{ duration: 12, repeat: Infinity, ease: 'linear' }}
          style={{ originX: '12px', originY: '12px' }}
        />
      </svg>
    </div>
  );
};

// Grid Loader
export const GridLoader = ({ size = 60, color = '#3b82f6', gridSize = 3 }) => {
  const cellSize = size / gridSize;
  
  return (
    <div 
      className="grid gap-1"
      style={{ 
        width: size, 
        height: size,
        gridTemplateColumns: `repeat(${gridSize}, 1fr)`
      }}
    >
      {Array.from({ length: gridSize * gridSize }).map((_, i) => (
        <motion.div
          key={i}
          className="rounded"
          style={{ backgroundColor: color }}
          animate={{
            scale: [1, 0, 1],
            opacity: [1, 0.5, 1]
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            delay: i * 0.1,
            ease: 'easeInOut'
          }}
        />
      ))}
    </div>
  );
};

// Wave Loader
export const WaveLoader = ({ width = 100, height = 40, color = '#3b82f6' }) => {
  return (
    <svg width={width} height={height} viewBox="0 0 100 40">
      <motion.path
        d="M0,20 Q25,0 50,20 T100,20"
        stroke={color}
        strokeWidth="3"
        fill="none"
        strokeLinecap="round"
        animate={{
          d: [
            'M0,20 Q25,0 50,20 T100,20',
            'M0,20 Q25,40 50,20 T100,20',
            'M0,20 Q25,0 50,20 T100,20'
          ]
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: 'easeInOut'
        }}
      />
    </svg>
  );
};

// Bouncing Balls
export const BouncingBalls = ({ count = 3, size = 15, color = '#3b82f6' }) => {
  return (
    <div className="flex gap-2 items-end" style={{ height: 50 }}>
      {Array.from({ length: count }).map((_, i) => (
        <motion.div
          key={i}
          className="rounded-full"
          style={{ 
            width: size, 
            height: size, 
            backgroundColor: color 
          }}
          animate={{
            y: [0, -30, 0]
          }}
          transition={{
            duration: 0.8,
            repeat: Infinity,
            delay: i * 0.15,
            ease: 'easeInOut'
          }}
        />
      ))}
    </div>
  );
};

export default {
  spinnerVariants,
  DotsLoader,
  CircleSpinner,
  ProgressBar,
  SkeletonLoader,
  RippleLoader,
  BarsLoader,
  HeartBeatLoader,
  InfinityLoader,
  ClockLoader,
  GridLoader,
  WaveLoader,
  BouncingBalls
};
