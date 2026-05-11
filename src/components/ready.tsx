import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SplitText from 'gsap/SplitText';

gsap.registerPlugin(SplitText, ScrollTrigger);

const Ready = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const headingRef = useRef<HTMLHeadingElement | null>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const splitInstanceRef = useRef<any>(null);

  useEffect(() => {
    const heading = headingRef.current;
    if (!heading) return;

    // Split text into characters
    splitInstanceRef.current = new SplitText(heading, { type: 'chars' });
    const chars = splitInstanceRef.current.chars;

    // Create custom timeline to scrub on scroll progress (30 to 40)
    const tl = gsap.timeline({ paused: true });

    // 1. Move text horizontally from right edge to far left
    tl.fromTo(heading, { x: '90vw' }, { x: '-100%', duration: 1, ease: 'none' }, 0);

    // 2. Animate individual characters falling into place
    chars.forEach((char: HTMLElement, index: number) => {
      // Stagger the character animations across the timeline scroll progress
      const startProgress = (index / chars.length) * 0.7; // span across first 70% of scroll
      tl.from(
        char,
        {
          yPercent: gsap.utils.random(-250, 250),
          rotation: gsap.utils.random(-45, 45),
          opacity: 0,
          duration: 0.3,
          ease: 'back.out(1.2)',
        },
        startProgress
      );
    });

    const handleAppScroll = (e: Event) => {
      const customEvent = e as CustomEvent;
      const p = customEvent.detail.progress;
      const t = Math.max(0, Math.min(1, (p - 40) / 10)); // Maps progress 40 -> 50 to 0 -> 1
      tl.progress(t);
    };

    window.addEventListener('app-scroll', handleAppScroll);

    return () => {
      window.removeEventListener('app-scroll', handleAppScroll);
      if (splitInstanceRef.current) {
        splitInstanceRef.current.revert();
      }
    };
  }, []);

  return (
    <div
      id="panelReady"
      ref={containerRef}
      className="absolute inset-0 h-dvh flex flex-col justify-center text-secondary overflow-hidden bg-[#fafafa] z-30"
    >
      <div className="w-full overflow-hidden whitespace-nowrap">
        <h1
          ref={headingRef}
          className="font-headline text-[15vw] md:text-[18vw] leading-none tracking-tight inline-block select-none text-black"
        >
          READY TO START?
        </h1>
      </div>
    </div>
  );
};

export default Ready;
