'use client';

import { useState, useEffect } from "react";
import Image from 'next/image';

export default function InvitationPage() {
    const [isTransitioning, setIsTransitioning] = useState(false);
    const [isMobile, setIsMobile] = useState(false);
    const [isEN, setIsEN] = useState(true);
    
    useEffect(() => {
        const checkMobile = () => {
        setIsMobile(window.innerWidth < 768);
        };
        checkMobile();
    }, []);

    const invitationEN = [
        "/s_EN.jpg",
        "/info_EN.jpg",
    ];

    const invitationIT = [
        "/s_IT.jpg",
        "/info_IT.jpg",
    ];

    const [images, setImages] = useState(invitationEN);

    const handleClick = () => {
        setIsTransitioning(true);
        setIsEN(!isEN);
        setImages(isEN ? invitationIT : invitationEN);
    };

    return (
        <div className="relative min-h-screen">
            {/* Background Image */}
            <Image
                src={isMobile ? "/envelope_open_mobile.png" : "/envelope_open.png"}
                alt="Background"
                fill
                priority
                className={`
                    object-cover object-center
                    transition-transform duration-1000 ease-in-out
                `}
                quality={100}
            />

            {/* Scrollable Content Container */}
            <div className="relative right-100 z-10 min-h-screen flex items-center justify-center p-4">
                {/* Card Container */}
                <div className={`
                    bg-transparent
                    ${isMobile ? 'w-full max-w-sm h-[80vh]' : 'w-full max-w-2xl h-[85vh]'}
                    flex flex-col
                    overflow-hidden
                `}>

                    {/* Scrollable Image Container */}
                    <div className="flex-1 overflow-y-auto overflow-x-hidden p-4 md:p-8"
                        style={{ transform: 'scaleX(-1)' }}
                    >
                        <div className="space-y-4 md:space-y-6"
                            style={{ transform: 'scaleX(-1)' }}
                        >
                            {images.map((imagePath, index) => (
                                <div key={index} className="relative w-full">
                                <Image
                                    src={imagePath}
                                    alt={`Invitation part ${index + 1}`}
                                    width={isMobile ? 350 : 600}
                                    height={isMobile ? 500 : 850}
                                    className="w-full h-auto rounded-lg shadow-lg"
                                    quality={95}
                                />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            <div className={`absolute ${isMobile ? 'top-[10%] left-[90%]' : 'top-[57%] left-[76%]'} -translate-x-1/2 -translate-y-1/2 z-20`}>
                <button
                onClick={handleClick}
                className="text-sm px-6 py-3 bg-transparent text-black rounded-full shadow-lg hover:bg-gray-200 transition-colors"
                >
                    {isEN ? 'EN' : 'IT'}
                </button>
            </div>
        </div>
    );
}