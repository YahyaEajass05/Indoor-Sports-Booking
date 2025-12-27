/**
 * 3D Animations with Three.js
 * Advanced 3D effects and animations
 */

// 3D Card Rotation Effect
export const create3DCard = (scene, camera) => {
  // This is a helper for React Three Fiber
  return {
    rotation: [0, 0, 0],
    onPointerMove: (event) => {
      const x = (event.clientX / window.innerWidth) * 2 - 1;
      const y = -(event.clientY / window.innerHeight) * 2 + 1;
      return {
        rotateY: x * 0.3,
        rotateX: y * 0.3
      };
    }
  };
};

// Floating 3D Objects
export const floatingObjectAnimation = {
  position: [0, 0, 0],
  animate: {
    y: [0, 0.5, 0],
    rotateY: [0, Math.PI * 2],
    transition: {
      duration: 5,
      repeat: Infinity,
      ease: 'easeInOut'
    }
  }
};

// 3D Wave Effect
export const waveEffect = {
  createWave: (geometry, time) => {
    const positions = geometry.attributes.position;
    for (let i = 0; i < positions.count; i++) {
      const x = positions.getX(i);
      const y = positions.getY(i);
      const waveX = Math.sin(x + time) * 0.5;
      const waveY = Math.sin(y + time) * 0.5;
      positions.setZ(i, waveX + waveY);
    }
    positions.needsUpdate = true;
  }
};

// Particle System 3D
export const particleSystem3D = {
  count: 5000,
  createParticles: () => {
    const particles = [];
    for (let i = 0; i < 5000; i++) {
      particles.push({
        position: [
          (Math.random() - 0.5) * 10,
          (Math.random() - 0.5) * 10,
          (Math.random() - 0.5) * 10
        ],
        velocity: [
          (Math.random() - 0.5) * 0.02,
          (Math.random() - 0.5) * 0.02,
          (Math.random() - 0.5) * 0.02
        ]
      });
    }
    return particles;
  }
};

// 3D Court Model Animation
export const courtModelAnimation = {
  entrance: {
    initial: { scale: 0, rotateY: -180 },
    animate: { 
      scale: 1, 
      rotateY: 0,
      transition: { duration: 1.5, ease: 'easeOut' }
    }
  },
  rotation: {
    animate: {
      rotateY: 360,
      transition: {
        duration: 20,
        repeat: Infinity,
        ease: 'linear'
      }
    }
  }
};

// Glass Morphism Effect
export const glassMorphism = {
  material: {
    transparent: true,
    opacity: 0.7,
    roughness: 0.1,
    metalness: 0.5,
    transmission: 0.9,
    thickness: 0.5
  }
};

// Holographic Effect
export const holographicEffect = {
  shader: {
    uniforms: {
      time: { value: 0 },
      colorA: { value: [0.23, 0.51, 0.91] },
      colorB: { value: [0.55, 0.32, 0.69] }
    },
    vertexShader: `
      varying vec2 vUv;
      varying vec3 vPosition;
      void main() {
        vUv = uv;
        vPosition = position;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `,
    fragmentShader: `
      uniform float time;
      uniform vec3 colorA;
      uniform vec3 colorB;
      varying vec2 vUv;
      varying vec3 vPosition;
      
      void main() {
        vec3 color = mix(colorA, colorB, vUv.y + sin(time + vPosition.x * 5.0) * 0.5);
        gl_FragColor = vec4(color, 0.8);
      }
    `
  }
};

// Morphing Sphere
export const morphingSphere = {
  animate: (time) => {
    return {
      radiusTop: 1 + Math.sin(time) * 0.3,
      radiusBottom: 1 + Math.cos(time) * 0.3
    };
  }
};

// Camera Animations
export const cameraAnimations = {
  zoomIn: {
    from: { position: [0, 0, 10] },
    to: { position: [0, 0, 5], duration: 2, ease: 'power2.out' }
  },
  orbit: {
    animate: (time) => ({
      x: Math.cos(time) * 5,
      z: Math.sin(time) * 5
    })
  },
  shake: {
    intensity: 0.1,
    duration: 0.5
  }
};

// Light Animations
export const lightAnimations = {
  pulse: {
    animate: {
      intensity: [0.5, 1.5, 0.5],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: 'easeInOut'
      }
    }
  },
  colorShift: {
    animate: {
      color: ['#3b82f6', '#8b5cf6', '#ec4899', '#3b82f6'],
      transition: {
        duration: 5,
        repeat: Infinity,
        ease: 'linear'
      }
    }
  }
};

// Post-processing Effects
export const postProcessing = {
  bloom: {
    strength: 1.5,
    radius: 0.4,
    threshold: 0.85
  },
  chromaticAberration: {
    offset: [0.002, 0.002]
  },
  vignette: {
    darkness: 0.5,
    offset: 0.5
  },
  glitch: {
    delay: [1.5, 3.5],
    duration: [0.6, 1.0],
    strength: [0.3, 1.0]
  }
};

// Shader Materials
export const shaderMaterials = {
  // Gradient shader
  gradient: {
    vertexShader: `
      varying vec2 vUv;
      void main() {
        vUv = uv;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `,
    fragmentShader: `
      uniform vec3 colorStart;
      uniform vec3 colorEnd;
      varying vec2 vUv;
      void main() {
        vec3 color = mix(colorStart, colorEnd, vUv.y);
        gl_FragColor = vec4(color, 1.0);
      }
    `
  },
  
  // Ripple effect
  ripple: {
    vertexShader: `
      uniform float time;
      uniform float amplitude;
      varying vec2 vUv;
      void main() {
        vUv = uv;
        vec3 newPosition = position;
        float distance = length(uv - 0.5);
        newPosition.z += sin(distance * 10.0 - time * 3.0) * amplitude;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(newPosition, 1.0);
      }
    `,
    fragmentShader: `
      varying vec2 vUv;
      void main() {
        gl_FragColor = vec4(vUv, 1.0, 1.0);
      }
    `
  }
};

export default {
  create3DCard,
  floatingObjectAnimation,
  waveEffect,
  particleSystem3D,
  courtModelAnimation,
  glassMorphism,
  holographicEffect,
  morphingSphere,
  cameraAnimations,
  lightAnimations,
  postProcessing,
  shaderMaterials
};
