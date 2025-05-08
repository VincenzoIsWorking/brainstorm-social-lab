
import { useState, useEffect, useCallback } from 'react';

export interface AutoCarouselOptions {
  interval?: number;
  initialIndex?: number;
  totalItems: number;
  pauseOnHover?: boolean;
  autoplay?: boolean;
}

export function useAutoCarousel({
  interval = 3000,
  initialIndex = 0,
  totalItems,
  pauseOnHover = true,
  autoplay = true
}: AutoCarouselOptions) {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const [paused, setPaused] = useState(false);
  
  // Go to next item
  const next = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % totalItems);
  }, [totalItems]);
  
  // Go to previous item
  const previous = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + totalItems) % totalItems);
  }, [totalItems]);
  
  // Go to specific index
  const goTo = useCallback((index: number) => {
    setCurrentIndex(index % totalItems);
  }, [totalItems]);
  
  // Pause/resume control
  const pause = useCallback(() => {
    setPaused(true);
  }, []);
  
  const resume = useCallback(() => {
    setPaused(false);
  }, []);
  
  // Auto-rotate effect
  useEffect(() => {
    if (!autoplay || paused) return;
    
    const timer = setInterval(next, interval);
    return () => clearInterval(timer);
  }, [next, interval, autoplay, paused]);
  
  return {
    currentIndex,
    next,
    previous,
    goTo,
    pause: pauseOnHover ? pause : undefined,
    resume: pauseOnHover ? resume : undefined,
    isPaused: paused
  };
}
