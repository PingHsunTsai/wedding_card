"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const [isHovered, setIsHovered] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [starPositions, setStarPositions] = useState([]);
  const router = useRouter();

  // Generate star positions only on client side
  useEffect(() => {
    const areaWidth = 100;
    const areaHeight = 100;
    
    const positions = [...Array(5)].map(() => ({
      x: (Math.random() - 0.5) * areaWidth,
      y: (Math.random() - 0.5) * areaHeight,
      scale: 1 + Math.random(),
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
    <div className="relative min-h-screen">
      {/* Background Image */}
      <Image
        src="/envelope.png"
        alt="Background"
        fill
        priority
        className={`
          object-cover object-center
          transition-transform duration-1000 ease-in-out
          ${isTransitioning ? 'scale-150' : 'scale-100'}
        `}
        quality={100}
      />
      
      <div className="absolute inset-0 bg-black/20" />

      <div className="absolute top-[45%] left-[55%] -translate-x-1/2 -translate-y-1/2 z-20">
        {/* Animated Stars - only render after positions are generated */}
        {starPositions.map((position, i) => {
          const viewBoxX = 40;
          const viewBoxY = 40;
          const offsetX = 5 * position.scale;
          const offsetY = 2;

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
              <svg width="25" height="25" viewBox={`0 0 ${viewBoxX} ${viewBoxY}`}>
                <path 
                  d={`M${viewBoxX / 2} ${offsetY}V${viewBoxY - offsetY}M${offsetX} ${viewBoxY / 2}H${viewBoxX - offsetX}`}
                  stroke="currentColor" 
                  strokeWidth="2" 
                  fill="none"
                />
                <circle cx={`${viewBoxX / 2}`} cy={`${viewBoxY / 2}`} r="4" fill="currentColor" />
              </svg>
            </div>
          );
        })}
      </div>

      <div className="absolute top-[57%] left-[50%] -translate-x-1/2 -translate-y-1/2 z-20">
        {/* Button */}
        <button
          onClick={handleClick}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          className="relative w-40 h-40 rounded-full cursor-pointer
                     transition-all duration-300 ease-in-out
                     hover:bg-white/10 hover:backdrop-blur-sm"
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