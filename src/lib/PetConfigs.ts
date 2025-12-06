export type AnimationConfig = {
  name: string;
  spriteUrl: string;
  frameCount: number;
  frameWidth: number;
  frameHeight: number;
  duration: number;
  action?: (multiples?: number) => Promise<void>;
};

export const ANIMATIONS: Record<string, AnimationConfig> = {
  idle: {
    name: 'idle',
    spriteUrl: '/cat/idle-cat.png',
    frameCount: 7,
    frameWidth: 32,
    frameHeight: 32,
    duration: 700,
  },
  idle2: {
    name: 'idle2',
    spriteUrl: '/cat/idle2-cat.png',
    frameCount: 14,
    frameWidth: 32,
    frameHeight: 32,
    duration: 1400,
  },
  jump: {
    name: 'jump',
    spriteUrl: '/cat/jump-cat.png',
    frameCount: 13,
    frameWidth: 32,
    frameHeight: 32,
    duration: 1300,
  },
  jump2: {
    name: 'jump2',
    spriteUrl: '/cat/jump2-cat.png',
    frameCount: 9,
    frameWidth: 32,
    frameHeight: 32,
    duration: 900,
  },
  run: {
    name: 'run',
    spriteUrl: '/cat/run-cat.png',
    frameCount: 7,
    frameWidth: 32,
    frameHeight: 32,
    duration: 700,
  },
  sit: {
    name: 'sit',
    spriteUrl: '/cat/sitting-cat.png',
    frameCount: 3,
    frameWidth: 32,
    frameHeight: 32,
    duration: 750,
  },
  sleep: {
    name: 'sleep',
    spriteUrl: '/cat/sleep-cat.png',
    frameCount: 3,
    frameWidth: 32,
    frameHeight: 32,
    duration: 750,
  },
};