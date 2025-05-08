
import React, { useState, useEffect } from "react";
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";
import { useMediaQuery } from "@/hooks/use-mobile";
import SocialPlatformCard from "./SocialPlatformCard";

// Define the social platform type
interface SocialPlatform {
  platform: string;
  icon: React.ReactNode;
  color: string;
  description: string;
  count: number;
}

interface SocialPlatformCarouselProps {
  platforms: SocialPlatform[];
  onPlatformChange?: (platform: SocialPlatform) => void;
}

const SocialPlatformCarousel: React.FC<SocialPlatformCarouselProps> = ({
  platforms,
  onPlatformChange
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const isMobile = useMediaQuery("(max-width: 768px)");
  const cardsPerView = isMobile ? 1 : 3;
  
  // Change background color based on current platform
  useEffect(() => {
    if (onPlatformChange && platforms.length > 0) {
      const activePlatform = platforms[currentIndex % platforms.length];
      onPlatformChange(activePlatform);
    }
  }, [currentIndex, platforms, onPlatformChange]);
  
  // Auto-rotate through platforms
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % platforms.length);
    }, 3000);
    
    return () => clearInterval(interval);
  }, [platforms.length]);

  // Correctly handle the carousel's onSelect event
  // This needs to be a React event handler that extracts the index from the API
  const handleCarouselSelect = (api: any) => {
    // When the carousel API provides the current index, update our state
    if (api && typeof api.selectedScrollSnap === 'function') {
      const index = api.selectedScrollSnap();
      setCurrentIndex(index);
    }
  };

  return (
    <div className="w-full">
      <Carousel
        opts={{
          align: "start",
          loop: true,
        }}
        className="w-full"
        onSelect={handleCarouselSelect}
      >
        <CarouselContent className="animate-slide-platforms">
          {platforms.map((platform, index) => (
            <CarouselItem 
              key={platform.platform} 
              className={`basis-full md:basis-1/3 lg:basis-1/3 transition-transform duration-500 animate-fade-in`}
              style={{ 
                animationDelay: `${index * 200}ms`,
              }}
            >
              <div className="p-1">
                <SocialPlatformCard
                  platform={platform.platform}
                  icon={platform.icon}
                  color={platform.color}
                  description={platform.description}
                  count={platform.count}
                />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  );
};

export default SocialPlatformCarousel;
