import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { MotionPathPlugin } from 'gsap/MotionPathPlugin';

gsap.registerPlugin(MotionPathPlugin);

const skillsData = [
  {
    name: 'HTML',
    color: '#ea580c',
    shadow: 'rgba(234, 88, 12, 0.5)',
    textColor: '#ffffff',
    image: '/image/html.png',
  },
  {
    name: 'CSS',
    color: '#2563eb',
    shadow: 'rgba(37, 99, 235, 0.5)',
    textColor: '#ffffff',
    image: '/image/css.png',
  },
  {
    name: 'JavaScript',
    color: '#eab308',
    shadow: 'rgba(234, 179, 8, 0.5)',
    textColor: '#000000',
    image: '/image/javascript.png',
  },
  {
    name: 'React',
    color: '#06b6d4',
    shadow: 'rgba(6, 182, 212, 0.5)',
    textColor: '#000000',
    image: '/image/react.png',
  },
  {
    name: 'Tailwind',
    color: '#14b8a6',
    shadow: 'rgba(20, 184, 166, 0.5)',
    textColor: '#ffffff',
    image: '/image/tailwind.png',
  },
  {
    name: 'Next.js',
    color: '#ffffff',
    shadow: 'rgba(255, 255, 255, 0.5)',
    textColor: '#000000',
    image: '/image/nextjs.png',
  },
  {
    name: 'Bootstrap',
    color: '#7952b3',
    shadow: 'rgba(121, 82, 179, 0.5)',
    textColor: '#ffffff',
    image: '/image/bootstrap.png',
  },
  {
    name: 'Vue.js',
    color: '#42b883',
    shadow: 'rgba(66, 184, 131, 0.5)',
    textColor: '#ffffff',
    image: '/image/vue.png',
  },
  {
    name: 'Nuxt.js',
    color: '#ffffff',
    shadow: 'rgba(255, 255, 255, 0.5)',
    textColor: '#000000',
    image: '/image/nuxt.png',
  },
];

const Skill = () => {
  const sectionRef = useRef<HTMLElement | null>(null);
  const titleRef = useRef<HTMLHeadingElement | null>(null);
  const skillRefs = useRef<(HTMLDivElement | null)[]>([]);
  const diamondRef = useRef<HTMLDivElement | null>(null);
  const imageRef = useRef<HTMLImageElement | null>(null);

  useEffect(() => {
    // Set initial states
    gsap.set(titleRef.current, { y: 50, opacity: 0 });
    skillRefs.current.forEach((el) => {
      if (el) gsap.set(el, { scale: 0.8, opacity: 0 });
    });

    // Observer for entrance animations
    const entranceObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            gsap.to(titleRef.current, {
              y: 0,
              opacity: 1,
              duration: 1,
              ease: 'power3.out',
            });

            skillRefs.current.forEach((el, index) => {
              if (el) {
                gsap.to(el, {
                  scale: 1,
                  opacity: 1,
                  duration: 0.6,
                  ease: 'back.out(1.7)',
                  delay: index * 0.1 + 0.2,
                });
              }
            });

            entranceObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 } // Trigger when 15% of the section is visible
    );

    if (sectionRef.current) {
      entranceObserver.observe(sectionRef.current);
    }

    const ctx = gsap.context(() => {
      const updatePath = () => {
        const box = diamondRef.current;
        if (!box || skillRefs.current.length === 0) return;

        gsap.killTweensOf(box);
        if (imageRef.current) gsap.killTweensOf(imageRef.current);

        const targetBox = skillRefs.current[0];
        if (!targetBox) return;

        const boxWidth = targetBox.offsetWidth;
        const boxHeight = targetBox.offsetHeight;

        gsap.set(box, {
          x: 0,
          y: 0,
          width: boxWidth,
          height: boxHeight,
          rotation: 0,
          scale: 1,
          backgroundColor: skillsData[0].color,
          boxShadow: `0 0 60px ${skillsData[0].shadow}`,
          borderRadius: '1rem',
        });

        if (imageRef.current) {
          gsap.set(imageRef.current, {
            rotation: 0,
            scale: 1,
          });
        }

        const boxStartRect = box.getBoundingClientRect();

        const points = skillRefs.current.map((skillEl) => {
          if (!skillEl) return { x: 0, y: 0 };
          const r = skillEl.getBoundingClientRect();
          return {
            x: r.left + r.width / 2 - (boxStartRect.left + boxStartRect.width / 2),
            y: r.top + r.height / 2 - (boxStartRect.top + boxStartRect.height / 2),
          };
        });

        // Set initial position immediately to the first box (HTML)
        gsap.set(box, { x: points[0].x, y: points[0].y });

        const tl = gsap.timeline({ paused: true });

        const moveTime = 1;
        const pauseTime = 0.8; // Time spent staying at the box

        // Initial pause at the first box
        tl.to({}, { duration: pauseTime });

        for (let i = 0; i < skillsData.length - 1; i++) {
          const startTime = pauseTime + i * (moveTime + pauseTime);
          const midTime = startTime + moveTime / 2;

          // Move to next box
          tl.to(
            box,
            {
              x: points[i + 1].x,
              y: points[i + 1].y,
              duration: moveTime,
              ease: 'power2.inOut',
            },
            startTime
          );

          tl.to(
            box,
            {
              backgroundColor: skillsData[i + 1].color,
              boxShadow: `0 0 60px ${skillsData[i + 1].shadow}`,
              duration: moveTime,
              ease: 'power2.inOut',
            },
            startTime
          );

          // Morph to diamond
          tl.to(
            box,
            {
              scale: 0.5,
              rotation: 45,
              borderRadius: '1.5rem',
              duration: moveTime / 2,
              ease: 'power2.in',
            },
            startTime
          );

          if (imageRef.current) {
            tl.to(
              imageRef.current,
              {
                rotation: -45,
                scale: 1.8,
                duration: moveTime / 2,
                ease: 'power2.in',
              },
              startTime
            );
          }

          // Morph to square
          tl.to(
            box,
            {
              scale: 1,
              rotation: 0,
              borderRadius: '1rem',
              duration: moveTime / 2,
              ease: 'power2.out',
            },
            midTime
          );

          if (imageRef.current) {
            tl.to(
              imageRef.current,
              {
                rotation: 0,
                scale: 1,
                duration: moveTime / 2,
                ease: 'power2.out',
              },
              midTime
            );
          }
        }

        // Final pause at the last box
        tl.to({}, { duration: pauseTime });

        tl.eventCallback('onUpdate', () => {
          const t = tl.time();
          const cycleDuration = moveTime + pauseTime;

          let index = 0;
          for (let i = 0; i < skillsData.length - 1; i++) {
            const switchTime = pauseTime + i * cycleDuration + moveTime / 2;
            if (t >= switchTime) {
              index = i + 1;
            }
          }

          if (imageRef.current && imageRef.current.src !== skillsData[index].image) {
            imageRef.current.src = skillsData[index].image;
            imageRef.current.alt = skillsData[index].name;
          }
        });

        // Initialize at progress 0 and make visible
        tl.progress(0);
        gsap.to(box, { opacity: 1, duration: 0.3 });

        const handleAppScroll = (e: Event) => {
          const customEvent = e as CustomEvent;
          const p = customEvent.detail.progress;
          const t = Math.max(0, Math.min(1, (p - 20) / 10));
          tl.progress(t);
        };

        window.addEventListener('app-scroll', handleAppScroll);

        return () => window.removeEventListener('app-scroll', handleAppScroll);
      };

      let cleanupScroll: (() => void) | undefined;
      const timer = setTimeout(() => {
        cleanupScroll = updatePath();
      }, 1000);
      window.addEventListener('resize', updatePath);

      return () => {
        clearTimeout(timer);
        if (cleanupScroll) cleanupScroll();
        window.removeEventListener('resize', updatePath);
      };
    }, sectionRef);

    return () => {
      entranceObserver.disconnect();
      ctx.revert();
    };
  }, []);

  return (
    <section
      id="panelSkill"
      ref={sectionRef}
      className="absolute inset-0 h-dvh w-full flex flex-col justify-center px-6 md:px-20 bg-[#111111] z-25 overflow-hidden"
      style={{
        transform: 'translateY(100%)',
        backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.05) 1px, transparent 1px)`,
        backgroundSize: '50px 50px',
      }}
    >
      <div className="flex flex-col items-center justify-center w-full mb-8 md:mb-16 mt-16 md:mt-0">
        <h2
          ref={titleRef}
          className="font-headline text-[12vw] md:text-[6vw] lg:text-7xl leading-none text-white/50 text-center"
        >
          SKILLS
        </h2>
      </div>

      <div className="flex flex-wrap gap-8 md:gap-14 lg:gap-20 justify-center items-center max-w-6xl mx-auto mt-8">
        {skillsData.map((skill, index) => (
          <div
            key={index}
            ref={(el) => {
              skillRefs.current[index] = el;
            }}
            className="w-28 h-28 md:w-40 md:h-40 border-2 border-dashed border-white/20 rounded-2xl flex items-center justify-center bg-white/5 hover:bg-white/10 hover:border-white/40 transition-all duration-300 group cursor-pointer relative overflow-hidden"
          >
            <span className="text-white/50 group-hover:text-white font-label font-bold text-sm md:text-lg tracking-widest transition-colors duration-300 z-10">
              {skill.name}
            </span>
          </div>
        ))}
      </div>

      {/* Box Bercahaya yang Berpindah */}
      <div className="absolute top-[50%] left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 pointer-events-none">
        <div
          ref={diamondRef}
          className="flex items-center justify-center opacity-0"
          style={{ willChange: 'transform, background-color, box-shadow, border-radius' }}
        >
          <img
            ref={imageRef}
            src={skillsData[0].image}
            alt={skillsData[0].name}
            className="w-20 h-20 drop-shadow-md object-cover"
            style={{ willChange: 'transform' }}
          />
        </div>
      </div>
    </section>
  );
};

export default Skill;
