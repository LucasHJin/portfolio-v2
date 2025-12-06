'use client';

import { useEffect, useRef, useState } from 'react';
import { ANIMATIONS } from '@/lib/PetConfigs';
import { Pet } from '@/lib/Pet';
import Image from 'next/image';
import { useClickTracking } from '@/hooks/useClickTracking';

export default function PetCard() {
  const containerRef = useRef<HTMLDivElement>(null);
  const petInstanceRef = useRef<Pet | null>(null);
  const [currentX, setCurrentX] = useState(50);
  const [direction, setDirection] = useState<1 | -1>(1);
  const [currentAnimation, setCurrentAnimation] = useState('idle');
  const [hearts, setHearts] = useState<{ id: number; left: string }[]>([]);
  const [catScale, setCatScale] = useState(2);
  const heartIdRef = useRef(0);

  const { handleClick: trackClick, totalClicks } = useClickTracking();

  // Create new pet on load (clean up after as well)
  useEffect(() => {
    const pet = new Pet(
      ANIMATIONS,
      30 * catScale * 0.85,
      setCurrentX,
      setDirection,
      setCurrentAnimation
    );

    petInstanceRef.current = pet;

    if (containerRef.current) {
      pet.setContainerWidth(containerRef.current.offsetWidth);
    }

    pet.init();

    return () => {
      pet.destroy();
    };
  }, []);

  // Update container width on resize
  useEffect(() => {
    const updateWidth = () => {
      if (containerRef.current && petInstanceRef.current) {
        const width = containerRef.current.offsetWidth;
        petInstanceRef.current.setContainerWidth(width);

        // Example: make scale proportional to container width
        // Here, 400px container width = scale 1, 800px = scale 2
        const newScale = Math.max(1, width / 300);
        setCatScale(newScale);
      }
    };

    window.addEventListener('resize', updateWidth);
    updateWidth();
    return () => window.removeEventListener('resize', updateWidth);
  }, []);

  const handleMouseEnter = () => {
    petInstanceRef.current?.pause();
  };

  const handleMouseLeave = () => {
    petInstanceRef.current?.resume();
  };

  const handleClick = () => {
    const randomX = 25 + Math.random() * 50;
    const id = heartIdRef.current++;
    
    setHearts(prev => [...prev, { id, left: `${randomX}%` }]);

    setTimeout(() => {
      setHearts(prev => prev.filter(heart => heart.id !== id));
    }, 1000);

    trackClick();
  };

  const anim = ANIMATIONS[currentAnimation];

  return (
    <div
      ref={containerRef}
      className="w-full h-1/5 lg:h-full lg:w-5/12 rounded-xl relative overflow-hidden"
    >
      <Image
        src="/cat/background.png"
        alt="background"
        fill
        className="object-cover object-bottom"
        style={{ imageRendering: 'pixelated' }}
        priority
        unoptimized
        quality={75}
      />

      <div className="absolute top-4 left-4 lg:top-6 lg:left-6 text-white z-20 text-l lg:text-xl">
        {totalClicks ? 
          <p>Total times petted: {totalClicks}</p> :
          null
        }
      </div>

      <div
        className="absolute cursor-pointer z-10"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={handleClick}
        style={{
          left: `${currentX}%`,
          top: '90%',
          transform: `translate(-50%, -100%) scaleX(${direction}) scale(${catScale})`,
          width: `${anim.frameWidth}px`,
          height: `${anim.frameHeight}px`,
          backgroundImage: `url(${anim.spriteUrl})`,
          backgroundSize: `${anim.frameCount * anim.frameWidth}px ${anim.frameHeight}px`,
          backgroundPosition: '0 0',
          animation: `sprite-animation-${currentAnimation} ${anim.duration}ms steps(${anim.frameCount}) infinite`,
          imageRendering: 'pixelated',
        }}
      >
        {hearts.map(heart => (
          <div
            key={heart.id}
            className="pet-heart"
            style={{ left: heart.left }}
          />
        ))}
      </div>
    </div>
  );
}