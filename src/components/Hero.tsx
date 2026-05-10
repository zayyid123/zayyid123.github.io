import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ArrowRight } from 'lucide-react';
import Button from './Button';

const Hero = () => {
  const containerRef = useRef<HTMLElement | null>(null);
  const text1Ref = useRef<HTMLHeadingElement | null>(null);
  const text2Ref = useRef<HTMLHeadingElement | null>(null);
  const ctaRef = useRef<HTMLDivElement | null>(null);
  const bgTextRef = useRef<HTMLDivElement | null>(null);
  const cardRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const tl = gsap.timeline();

    tl.fromTo(
      [text1Ref.current, text2Ref.current, ctaRef.current],
      { y: 200, opacity: 0, rotationX: -20 },
      {
        y: 0,
        opacity: 1,
        rotationX: 0,
        duration: 1.5,
        stagger: 0.1,
        ease: 'power4.out',
        delay: 0.2,
      }
    )
      .fromTo(
        bgTextRef.current,
        { scale: 1.2, opacity: 0 },
        { scale: 1, opacity: 0.05, duration: 2, ease: 'power3.out' },
        0
      )
      .fromTo(
        cardRef.current,
        { y: 100, opacity: 0, rotateY: 30 },
        { y: 0, opacity: 1, rotateY: 0, duration: 1.5, ease: 'power3.out' },
        '-=1'
      );

    // 3D Parallax on mouse move
    const handleMouseMove = (e: MouseEvent) => {
      if (!cardRef.current || !bgTextRef.current) return;
      const { innerWidth, innerHeight } = window;
      const xPos = (e.clientX / innerWidth - 0.5) * 2;
      const yPos = (e.clientY / innerHeight - 0.5) * 2;

      gsap.to(cardRef.current, {
        rotateY: xPos * 15,
        rotateX: -yPos * 15,
        duration: 1,
        ease: 'power2.out',
        transformPerspective: 1000,
      });

      gsap.to(bgTextRef.current, {
        x: -xPos * 30,
        y: -yPos * 30,
        duration: 2,
        ease: 'power2.out',
      });
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <section
      id="panelHero"
      ref={containerRef}
      className="absolute inset-0 h-dvh flex flex-col justify-center px-6 md:px-20 overflow-hidden text-black pt-10 bg-[#EB6A2D] z-10"
    >
      {/* Massive Background Typography */}
      <div
        ref={bgTextRef}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full text-center pointer-events-none whitespace-nowrap"
      >
        <h1 className="font-headline text-[70vh] md:text-[90vh] leading-[0.7] tracking-tighter text-black mix-blend-overlay">
          Ready
          <br />
          For Code
        </h1>
      </div>

      <div className="z-10 mt-10 flex justify-end lg:justify-between flex-col-reverse lg:flex-row gap-5 items-center h-full">
        <div className="flex flex-col justify-center w-full lg:w-1/2">
          <div className="relative z-20">
            <h1 ref={text1Ref} className="font-headline  tracking-tight uppercase">
              <span className="mix-blend-difference text-secondary text-[10vw] leading-[0.85]">
                The Simple
              </span>
              <span className="text-black text-[10vw] leading-[0.85]">,</span>
            </h1>
          </div>
          <div className="mix-blend-difference text-white relative z-10">
            <h1
              ref={text2Ref}
              className="font-headline text-[7vh] sm:text-[9vh] leading-[0.85] tracking-tight uppercase ml-0 lg:ml-20"
            >
              Clean Code
            </h1>
          </div>

          <div
            ref={ctaRef}
            className="mt-10 md:mt-16 flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-6 mix-blend-difference text-white"
          >
            <Button
              variant="inverted"
              className="rounded-full bg-white! text-black! hover:bg-gray-200!"
            >
              Download CV <ArrowRight size={20} />
            </Button>
            <span className="font-label text-xs md:text-sm uppercase tracking-widest opacity-80">
              Scroll to discover
            </span>
          </div>
        </div>

        {/* 3D Card Area */}
        <div className="relative w-full aspect-square lg:w-1/2 h-[50vh] lg:h-full flex justify-center items-center perspective-1000">
          <div
            ref={cardRef}
            className="w-3/4 h-3/4 bg-black rounded-3xl overflow-hidden shadow-2xl preserve-3d"
            style={{ transformStyle: 'preserve-3d' }}
          >
            <img
              src="/foto_cv.png"
              alt="Art"
              className="w-full h-[130%] object-cover  opacity-80 bg-white"
              style={{ transform: 'scale(1.1)' }}
            />
            <div
              className="absolute inset-0 md:p-8 p-2 flex flex-col justify-end"
              style={{ transform: 'translateZ(20px)' }}
            >
              <h3 className="font-headline text-xl sm:text-4xl text-white">Passionate</h3>
              <p className="font-label text-white/70 mt-0 sm:mt-2 text-sm sm:text-base uppercase">
                Web Developer
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
