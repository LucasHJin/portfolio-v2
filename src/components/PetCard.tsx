'use client';

import { useEffect, useRef, useState } from 'react';
import { ANIMATIONS } from '@/lib/PetConfigs';
import { Pet } from '@/lib/Pet';
import Image from 'next/image';

export default function PetCard() {
  const containerRef = useRef<HTMLDivElement>(null);
  const petInstanceRef = useRef<Pet | null>(null);
  const [currentX, setCurrentX] = useState(50);
  const [direction, setDirection] = useState<1 | -1>(1);
  const [currentAnimation, setCurrentAnimation] = useState('idle');
  const [hearts, setHearts] = useState<{ id: number; left: string }[]>([]);
  const heartIdRef = useRef(0);

  // Create new pet on load (clean up after as well)
  useEffect(() => {
    const pet = new Pet(
      ANIMATIONS,
      65,
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
        petInstanceRef.current.setContainerWidth(containerRef.current.offsetWidth);
      }
    };

    window.addEventListener('resize', updateWidth);
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
  };

  const anim = ANIMATIONS[currentAnimation];

  return (
    <div
      ref={containerRef}
      className="h-full w-5/12 rounded-xl relative overflow-hidden"
    >
      <Image
        src="/cat/background.png"
        alt="background"
        fill
        className="object-cover"
        style={{ imageRendering: 'pixelated' }}
        priority
        unoptimized
        quality={100}
      />

      <div
        className="absolute cursor-pointer z-10"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={handleClick}
        style={{
          left: `${currentX}%`,
          top: '87%',
          transform: `translate(-50%, -50%) scaleX(${direction}) scale(2)`,
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