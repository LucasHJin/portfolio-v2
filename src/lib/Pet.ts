import { AnimationConfig } from "./PetConfigs";

export class Pet {
  private currentX: number = 50;
  private direction: 1 | -1 = 1;
  private currentAnimation: string = 'idle';
  private actionLoopPaused: boolean = false;
  private isDestroyed: boolean = false;
  private animations: Record<string, AnimationConfig>;
  private animationFrameId: number | null = null;
  private moveDist: number;
  private containerWidth: number = 0;

  // Callbacks to update React state
  private onPositionChange: (x: number) => void;
  private onDirectionChange: (dir: 1 | -1) => void;
  private onAnimationChange: (anim: string) => void;

  constructor(
    animations: Record<string, AnimationConfig>,
    moveDist: number,
    onPositionChange: (x: number) => void,
    onDirectionChange: (dir: 1 | -1) => void,
    onAnimationChange: (anim: string) => void
  ) {
    this.animations = { ...animations };
    this.moveDist = moveDist;
    this.onPositionChange = onPositionChange;
    this.onDirectionChange = onDirectionChange;
    this.onAnimationChange = onAnimationChange;
  }

  public setContainerWidth(width: number) {
    this.containerWidth = width;
  }

  public getCurrentAnimation() {
    return this.currentAnimation;
  }

  public pause() {
    this.actionLoopPaused = true;
    this.setAnimation('sit');
  }

  public resume() {
    this.actionLoopPaused = false;
  }

  private sleep(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  private setAnimation(name: string) {
    this.currentAnimation = name;
    this.onAnimationChange(name);
  }

  private move(duration: number, action?: string): Promise<void> {
    if (this.containerWidth === 0) return Promise.resolve();

    const petWidth = this.animations['idle'].frameWidth * 2;
    const maxLeft = (this.containerWidth - petWidth / 2) / this.containerWidth * 100;
    const minLeft = (petWidth / 2) / this.containerWidth * 100;

    const magnitude = action?.includes('jump')
      ? this.moveDist * (Math.random() * 0.3 + 1.5)
      : this.moveDist;
    const bias = 0.9;
    const potentialDirection = Math.random() < bias ? this.direction : -this.direction;
    let dx = magnitude * potentialDirection / this.containerWidth * 100;
    const possibleX = this.currentX + dx;

    if (possibleX < minLeft || possibleX > maxLeft) {
      dx = -dx;
    }
    const targetX = this.currentX + dx;

    if (targetX === this.currentX) {
      return Promise.resolve();
    }

    const newDirection = (dx < 0 ? -1 : 1) as 1 | -1;
    this.direction = newDirection;
    this.onDirectionChange(newDirection);

    return new Promise((resolve) => {
      const startTime = Date.now();
      const startX = this.currentX;

      const animate = () => {
        if (this.actionLoopPaused) {
          if (this.animationFrameId) {
            cancelAnimationFrame(this.animationFrameId);
            this.animationFrameId = null;
          }
          resolve();
          return;
        }

        if (Date.now() - startTime >= duration) {
          this.currentX = targetX;
          this.onPositionChange(targetX);
          if (this.animationFrameId) {
            cancelAnimationFrame(this.animationFrameId);
            this.animationFrameId = null;
          }
          resolve();
          return;
        }

        const progress = (Date.now() - startTime) / duration;
        const newX = startX + dx * progress;
        this.currentX = newX;
        this.onPositionChange(newX);

        this.animationFrameId = requestAnimationFrame(animate);
      };

      this.animationFrameId = requestAnimationFrame(animate);
    });
  }

  private setupActions() {
    for (const key in this.animations) {
      this.animations[key].action = async (multiples = 1) => {
        this.setAnimation(key);

        if (key === 'run') {
          for (let i = 0; i < multiples; i++) {
            if (this.actionLoopPaused) break;
            await this.move(this.animations[key].duration, key);
          }
        } else if (key === 'jump' || key === 'jump2') {
          if (!this.actionLoopPaused) {
            await this.move(this.animations[key].duration, key);
          }
        } else if (key === 'sit' || key === 'sleep') {
          const extensionAmount = Math.floor(Math.random() * 8) + 5;
          for (let i = 0; i < extensionAmount; i++) {
            if (this.actionLoopPaused) break;
            await this.sleep(this.animations[key].duration);
          }
        } else {
          const extensionAmount = Math.floor(Math.random() * 2) + 2;
          for (let i = 0; i < extensionAmount; i++) {
            if (this.actionLoopPaused) break;
            await this.sleep(this.animations[key].duration);
          }
        }
      };
    }
  }

  public async startActionLoop() {
    const getRandDelay = (min: number, max: number, multiple: number): number => {
      const random = Math.random() * (max - min) + min;
      return Math.round(random / multiple) * multiple;
    };

    const ACTIONS = Object.keys(this.animations).filter((a) => a !== 'run');

    while (!this.isDestroyed) {
      while (this.actionLoopPaused && !this.isDestroyed) {
        await this.sleep(100);
      }

      if (this.isDestroyed) break;

      const randomAction = ACTIONS[Math.floor(Math.random() * ACTIONS.length)];
      await this.animations[randomAction].action?.();

      while (this.actionLoopPaused && !this.isDestroyed) {
        await this.sleep(100);
      }

      if (this.isDestroyed) break;

      const delay = getRandDelay(3000, 8000, this.animations['run'].duration);
      await this.animations['run'].action?.(
        Math.floor(delay / this.animations['run'].duration)
      );
    }
  }

  public init() {
    this.setupActions();
    this.startActionLoop();
  }

  public destroy() {
    this.isDestroyed = true;
    if (this.animationFrameId) {
      cancelAnimationFrame(this.animationFrameId);
    }
  }
}