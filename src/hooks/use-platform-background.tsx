
import { useState, useEffect } from 'react';

interface Platform {
  platform: string;
  color: string;
}

export function usePlatformBackground(defaultColor: string = '#ffffff') {
  const [backgroundColor, setBackgroundColor] = useState(defaultColor);
  const [backgroundOpacity, setBackgroundOpacity] = useState(0.05);
  
  const updateBackground = (platform: Platform) => {
    // Extract color from the platform and set as background with opacity
    if (platform && platform.color) {
      setBackgroundColor(platform.color);
      document.documentElement.style.setProperty('--platform-color', platform.color);
      document.documentElement.style.setProperty('--platform-background', `${platform.color}${Math.floor(backgroundOpacity * 255).toString(16).padStart(2, '0')}`);
    }
  };
  
  // Clean up when unmounting
  useEffect(() => {
    return () => {
      document.documentElement.style.removeProperty('--platform-color');
      document.documentElement.style.removeProperty('--platform-background');
    };
  }, []);
  
  return { updateBackground, setBackgroundOpacity };
}
