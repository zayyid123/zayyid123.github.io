import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowUpRight } from 'lucide-react';
import Button from './Button';
import { useNavigate } from 'react-router-dom';

gsap.registerPlugin(ScrollTrigger);

const projectsData = [
  {
    title: 'Cinchy Life',
    category: 'Web Development',
    image:
      'https://res.cloudinary.com/do3gqpixo/image/upload/v1775537762/portfolio/Screenshot_2026-04-07_115502_vmlqen.png',
    url: 'https://cinchy.life/en',
    color: '#FF7337',
  },
  {
    title: 'Eleena Jewels E-commerce',
    category: 'Web Development',
    image:
      'https://res.cloudinary.com/do3gqpixo/image/upload/v1742500655/portfolio/ynsvnktsz2ojvzvjukjl.png',
    url: 'https://eleena-landing-git-main-eleenajewels-projects.vercel.app/en',
    color: '#e5e5e5',
  },
  {
    title: 'SIMRS Web Application',
    category: 'Web Development',
    image:
      'https://res.cloudinary.com/do3gqpixo/image/upload/v1775538328/portfolio/Screenshot_2026-04-07_120456_en4hsw.png',
    url: 'https://nexmedis.com/',
    color: '#1A1A1A',
  },
];

const Projects = () => {
  const sectionRef = useRef<HTMLElement | null>(null);
  const titleRef = useRef<HTMLHeadingElement | null>(null);
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);
  const projectRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);

  const navigate = useNavigate();

  useEffect(() => {
    // Initial entrance states
    gsap.set(titleRef.current, { y: 100, opacity: 0 });
    projectRefs.current.forEach((el) => {
      if (el) gsap.set(el, { y: 100, opacity: 0 });
    });

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

            projectRefs.current.forEach((el, index) => {
              if (el) {
                gsap.to(el, {
                  y: 0,
                  opacity: 1,
                  duration: 1,
                  ease: 'power3.out',
                  delay: index * 0.1 + 0.2,
                });
              }
            });

            entranceObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );

    if (sectionRef.current) {
      entranceObserver.observe(sectionRef.current);
    }

    const container = scrollContainerRef.current;
    if (!container) return;

    // Detect active slide on scroll/swipe
    const handleScroll = () => {
      const scrollLeft = container.scrollLeft;
      const firstChild = container.firstElementChild as HTMLElement;
      const cardWidth = firstChild?.clientWidth || 300;
      const index = Math.round(scrollLeft / (cardWidth + 24)); // 24 is gap-6
      const clampedIndex = Math.max(0, Math.min(projectsData.length - 1, index));
      setActiveIndex(clampedIndex);
    };

    container.addEventListener('scroll', handleScroll);

    // Native DOM touch event handlers to stop propagation BEFORE reaching ScrollTrigger window-level listeners
    let startX = 0;
    let startY = 0;

    const handleTouchStart = (e: TouchEvent) => {
      const touch = e.touches[0];
      startX = touch.clientX;
      startY = touch.clientY;
    };

    const handleTouchMove = (e: TouchEvent) => {
      const touch = e.touches[0];
      const diffX = Math.abs(touch.clientX - startX);
      const diffY = Math.abs(touch.clientY - startY);

      // If the motion is primarily horizontal, stop propagation natively
      if (diffX > diffY) {
        e.stopPropagation();
      }
    };

    container.addEventListener('touchstart', handleTouchStart, { passive: true });
    container.addEventListener('touchmove', handleTouchMove, { passive: true });

    // Intersection Observer for slide dots indicator active state
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = projectRefs.current.indexOf(entry.target as HTMLDivElement);
            if (index !== -1) {
              setActiveIndex(index);
            }
          }
        });
      },
      {
        root: container,
        threshold: 0.6,
      }
    );

    projectRefs.current.forEach((el) => {
      if (el) observer.observe(el);
    });

    return () => {
      container.removeEventListener('scroll', handleScroll);
      container.removeEventListener('touchstart', handleTouchStart);
      container.removeEventListener('touchmove', handleTouchMove);
      observer.disconnect();
      entranceObserver.disconnect();
    };
  }, []);

  return (
    <section
      id="panelProjects"
      ref={sectionRef}
      className="absolute inset-0 h-dvh flex flex-col justify-center px-6 md:px-20 text-white overflow-hidden bg-[#2C3539] z-20 pt-16"
    >
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 md:mb-16">
        <h2
          ref={titleRef}
          className="font-headline text-[12vw] md:text-[6vw] lg:text-7xl leading-none"
        >
          SELECTED <br className="hidden md:block" /> <span className="text-primary">WORKS</span>
        </h2>
        <Button
          onClick={() => navigate('/work')}
          variant="outlined"
          className="flex mt-8 md:mt-0 w-fit"
        >
          View All Projects
        </Button>
      </div>

      <div
        ref={scrollContainerRef}
        className="flex flex-row lg:grid lg:grid-cols-3 gap-6 md:gap-10 overflow-x-auto lg:overflow-x-visible overscroll-x-contain w-full pb-4 md:pb-8 hide-scrollbar snap-x snap-mandatory"
        data-lenis-prevent="true"
      >
        {projectsData.map((project, index) => (
          <div
            key={index}
            ref={(el) => {
              projectRefs.current[index] = el;
            }}
            className="flex-none w-[85vw] md:w-[60vw] lg:w-auto snap-start group relative cursor-pointer overflow-hidden rounded-2xl"
          >
            <div className="aspect-4/3 lg:aspect-16/10 overflow-hidden rounded-2xl relative">
              <div className="absolute inset-0 bg-neutral/20 group-hover:bg-transparent transition-colors duration-500 z-10"></div>
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 ease-in-out select-none pointer-events-none"
              />
              <div
                onClick={(e) => {
                  e.stopPropagation();
                  window.open(project.url, '_blank', 'noopener,noreferrer');
                }}
                className="absolute top-4 right-4 z-20 w-10 h-10 md:w-12 md:h-12 bg-white hover:bg-primary hover:text-secondary rounded-full flex items-center justify-center text-black opacity-100 md:opacity-0 group-hover:opacity-100 transform translate-y-0 md:translate-y-4 group-hover:translate-y-0 transition-all duration-300 cursor-pointer"
              >
                <ArrowUpRight size={20} />
              </div>
            </div>
            <div className="mt-4 md:mt-6">
              <p className="font-label text-xs md:text-sm text-gray-400 mb-1 md:mb-2 uppercase tracking-widest select-none pointer-events-none">
                {project.category}
              </p>
              <h3 className="font-headline text-2xl md:text-3xl select-none pointer-events-none">
                {project.title}
              </h3>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination Dots for Mobile & Tablet */}
      <div className="flex lg:hidden justify-center gap-2 mt-4 md:mt-8">
        {projectsData.map((_, index) => (
          <button
            key={index}
            className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
              activeIndex === index ? 'w-6 bg-primary' : 'w-2 bg-gray-500'
            }`}
            onClick={() => {
              if (projectRefs.current[index]) {
                projectRefs.current[index]?.scrollIntoView({
                  behavior: 'smooth',
                  block: 'nearest',
                  inline: 'start',
                });
              }
            }}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
};

export default Projects;
