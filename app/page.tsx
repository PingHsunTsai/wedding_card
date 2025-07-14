"use client";

import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const [isHovered, setIsHovered] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const router = useRouter();

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
        className="object-cover object-center"
        quality={100}
      />
      
      <div className="absolute inset-0 bg-black/10" />

      {/* Invisible Center Button */}
      <button
        onClick={handleClick}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="absolute top-[57%] left-[50%] -translate-x-1/2 -translate-y-1/2 z-20 
                   w-35 h-35 rounded-full cursor-pointer
                   transition-all duration-300 ease-in-out
                   hover:bg-white/2 hover:backdrop-blur-sm"
        aria-label="Open invitation"
      >
        <span 
          className={`
            text-white font-medium text-lg
            transition-all duration-300 ease-in-out
            ${isHovered ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}
          `}
        >
          Click me to open the invitation
        </span>
      </button>

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