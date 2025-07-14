"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const [isHovered, setIsHovered] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [starPositions, setStarPositions] = useState<Array<{
    x: number;
    y: number;
    scale: number;
  }>>([]);
  const [isMobile, setIsMobile] = useState(false);
  const router = useRouter();

  // Generate star positions only on client side
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    // Adjust area based on screen size
    checkMobile();
    const areaWidth = isMobile ? 20 : 400;
    const areaHeight = isMobile ? 20 : 400;
    
    const positions = [...Array(8)].map(() => ({
      x: (Math.random() - 0.5) * areaWidth,
      y: (Math.random() - 0.5) * areaHeight,
      scale: 1 + Math.random() * 0.5,
    }));

    setStarPositions(positions);
  }, []);

  const handleClick = () => {
    setIsTransitioning(true);
    // Navigate after animation completes
    setTimeout(() => {
      router.push("/invitation"); // Change this to your desired route
    }, 1000);
  };

  return (
    <div className="relative min-h-screen min-h-[100dvh] overflow-hidden">
      {/* Animated Background Image */}
      <div
        className={`
          absolute inset-0
          transition-all duration-1000 ease-in-out
          ${isTransitioning 
            ? 'scale-125' 
            : 'scale-100'
          }
        `}
      >
        <Image
          src={isMobile ? "/envelope_mobile.png" : "/envelope.png"}
          alt="Background"
          fill
          priority
          className="object-cover object-center"
          quality={100}
        />
      </div>
      
      <div className={`
        absolute inset-0 bg-black-5
        transition-opacity duration-1000 ease-in-out
        ${isTransitioning ? 'opacity-40' : 'opacity-20'}
      `} />

      {/* Stars Container - Responsive positioning */}
      <div className="absolute 
                      top-1/2 left-1/2 
                      -translate-x-1/2 -translate-y-1/2 z-20">
        {/* Animated Stars */}
        {starPositions.map((position, i) => {
          const viewBoxX = 40;
          const viewBoxY = 40;
          const offsetX = 5 * position.scale;
          const offsetY = 2;
          const starSize = isMobile ? 8 : 20;

          return (
            <div
              key={i}
              className="absolute pointer-events-none animate-pulse"
              style={{
                left: `calc(50% + ${position.x}px)`,
                top: `calc(50% + ${position.y}px)`,
                transform: 'translate(-50%, -50%)',
                animationDelay: `${i * 0.2}s`,
                animationDuration: `${2 + i * 0.3}s`
              }}
            >
              <svg 
                width={starSize * position.scale} 
                height={starSize * position.scale} 
                viewBox={`0 0 ${viewBoxX} ${viewBoxY}`}
                className="drop-shadow-md"
              >
                <defs>
                  <linearGradient id={`gold-${i}`} x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#D4AF37" />
                    <stop offset="100%" stopColor="#8B6914" />
                  </linearGradient>
                </defs>
                <path 
                  d={`M${viewBoxX / 2} ${offsetY}V${viewBoxY - offsetY}M${offsetX} ${viewBoxY / 2}H${viewBoxX - offsetX}`}
                  stroke={`url(#gold-${i})`}
                  strokeWidth="2" 
                  fill="none"
                />
                <circle 
                  cx={viewBoxX / 2} 
                  cy={viewBoxY / 2} 
                  r="3" 
                  fill={`url(#gold-${i})`}
                />
              </svg>
            </div>
          );
        })}
      </div>

      {/* Button Container */}
      <div className={`absolute 
                      ${isMobile ? 'top-[50%]' : 'top-[57%]'} left-1/2 
                      -translate-x-1/2 -translate-y-1/2 z-20`}>
        {/* Mobile Layout */}
        {isMobile ? (
          <div className="flex items-center gap-4">
            <span className="absolute right-0 top-[100%] text-black/80 text-sm font-medium animate-pulse">
               ↑ Click
            </span>
            <button
              onClick={handleClick}
              className="relative 
                       w-20 h-20 
                       rounded-full cursor-pointer
                       transition-all duration-300 ease-in-out
                       active:bg-white/20
                       tap-highlight-transparent"
              aria-label="Open invitation"
            />
          </div>
        ) : (
          /* Desktop Layout */
          <button
            onClick={handleClick}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className="relative 
                     w-40 h-40 
                     rounded-full cursor-pointer
                     transition-all duration-300 ease-in-out
                     hover:bg-white/10
                     hover:backdrop-blur-sm"
            aria-label="Open invitation"
          >
            <span 
              className={`
                text-white font-medium text-lg
                transition-all duration-300 ease-in-out
                ${isHovered ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}
              `}
            >
              Click Here
            </span>
          </button>
        )}
      </div>

      {/* Transition Overlay */}
      <div 
        className={`
          fixed inset-0 z-50 bg-white pointer-events-none
          transition-all duration-1000 ease-in-out
          ${isTransitioning 
            ? 'opacity-100 scale-150' 
            : 'opacity-0 scale-100'
          }
        `}
      />
    </div>
  );
}