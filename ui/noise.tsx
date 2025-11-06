'use client'

import type React from 'react';
import { useRef, useEffect, useCallback } from 'react';
import { useInView } from 'react-intersection-observer';

interface NoiseProps {
  patternSize?: number;
  patternRefreshInterval?: number;
  patternAlpha?: number;
  quality?: 'low' | 'medium' | 'high';
  performanceMode?: boolean;
}

const Noise: React.FC<NoiseProps> = ({
  patternSize = 500,
  patternRefreshInterval = 2,
  patternAlpha = 5,
  quality = 'medium',
  performanceMode = false
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const { ref: inViewRef, inView } = useInView({
    rootMargin: '200px 0px',
    triggerOnce: false,
  });

  // Quality settings
  const qualitySettings = useCallback(() => {
    switch (quality) {
      case 'low':
        return { 
          size: Math.max(32, patternSize * 0.1), 
          refreshInterval: Math.max(10, patternRefreshInterval * 5),
          alpha: Math.min(5, patternAlpha * 0.3)
        };
      case 'medium':
        return { 
          size: patternSize, 
          refreshInterval: patternRefreshInterval,
          alpha: patternAlpha
        };
      case 'high':
        return { 
          size: Math.min(512, patternSize * 1.5), 
          refreshInterval: Math.max(1, patternRefreshInterval * 0.5),
          alpha: Math.min(25, patternAlpha * 1.2)
        };
      default:
        return { 
          size: patternSize, 
          refreshInterval: patternRefreshInterval,
          alpha: patternAlpha
        };
    }
  }, [quality, patternSize, patternRefreshInterval, patternAlpha]);

  const setRefs = useCallback(
    (node: HTMLCanvasElement) => {
      canvasRef.current = node;
      inViewRef(node);
    },
    [inViewRef],
  );

  useEffect(() => {
    if (!inView) {
      return;
    }

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    const settings = qualitySettings();
    let frame = 0;
    let animationId: number;

    const resize = () => {
      if (!canvas) return;
      canvas.width = settings.size;
      canvas.height = settings.size;

      canvas.style.width = '100%';
      canvas.style.height = '100%';
    };

    const drawGrain = () => {
      const imageData = ctx.createImageData(settings.size, settings.size);
      const data = imageData.data;

      for (let i = 0; i < data.length; i += 4) {
        // Generate slightly lighter noise with green tint
        const baseValue = Math.random() * 200 + 55; // Range 55-255 instead of 0-255
        data[i] = Math.max(0, baseValue - 20); // Red (slightly reduced)
        data[i + 1] = Math.min(255, baseValue + 10); // Green (slightly enhanced)
        data[i + 2] = Math.max(0, baseValue - 20); // Blue (slightly reduced)
        data[i + 3] = settings.alpha;
      }

      ctx.putImageData(imageData, 0, 0);
    };

    const loop = () => {
      // Conditionally draw based on performance mode and visibility
      if (!performanceMode || inView) {
        if (frame % settings.refreshInterval === 0) {
          drawGrain();
        }
      }

      frame++;
      animationId = window.requestAnimationFrame(loop);
    };

    window.addEventListener('resize', resize);
    resize();
    loop();

    return () => {
      window.removeEventListener('resize', resize);
      window.cancelAnimationFrame(animationId);
    };
  }, [inView, qualitySettings, performanceMode]);

  return (
    <canvas 
      className="absolute inset-0 w-full h-full pointer-events-none" 
      ref={setRefs} 
      style={{ imageRendering: 'pixelated' }} 
    />
  );
};

export default Noise;
