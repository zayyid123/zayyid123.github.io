import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowUpRight } from 'lucide-react';
import Button from './Button';

gsap.registerPlugin(ScrollTrigger);

const projectsData = [
  {
    title: 'E-Commerce Redesign',
    category: 'Web Design & Development',
    image:
      'https://images.unsplash.com/photo-1661956602116-aa6865609028?auto=format&fit=crop&q=80&w=800&h=600',
    color: '#FF7337',
  },
  {
    title: 'Finance Dashboard',
    category: 'UI/UX Design',
    image:
      'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=800&h=600',
    color: '#e5e5e5',
  },
  {
    title: 'Brand Identity',
    category: 'Art Direction',
    image:
      'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=800&h=600',
    color: '#1A1A1A',
  },
];

const Projects = () => {
  const sectionRef = useRef<HTMLElement | null>(null);
  const titleRef = useRef<HTMLHeadingElement | null>(null);
  const projectRefs = useRef<(HTMLDivElement | null)[]>([]);
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    // Set initial states
    gsap.set(titleRef.current, { y: 100, opacity: 0 });
    projectRefs.current.forEach((el) => {
      if (el) gsap.set(el, { y: 100, opacity: 0 });
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
      { threshold: 0.15 } // Trigger when 15% of the section is visible
    );

    if (sectionRef.current) {
      entranceObserver.observe(sectionRef.current);
    }

    // Intersection Observer untuk indikator dot di mobile
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
        root: scrollContainerRef.current,
        threshold: 0.6, // Memicu perubahan saat 60% card terlihat
      }
    );

    projectRefs.current.forEach((el) => {
      if (el) observer.observe(el);
    });

    return () => {
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
        <Button variant="outlined" className="hidden md:flex mt-8 md:mt-0 w-fit">
          View All Projects
        </Button>
      </div>

      <div
        ref={scrollContainerRef}
        className="flex lg:grid lg:grid-cols-3 gap-6 md:gap-10 overflow-x-auto lg:overflow-x-visible overscroll-x-contain touch-pan-x snap-x snap-mandatory w-full pb-4 md:pb-8 hide-scrollbar"
        data-lenis-prevent="true"
      >
        {projectsData.map((project, index) => (
          <div
            key={index}
            ref={(el) => {
              projectRefs.current[index] = el;
            }}
            className="flex-none w-[85vw] md:w-[60vw] lg:w-auto snap-center group relative cursor-pointer overflow-hidden"
          >
            <div className="aspect-4/3 lg:aspect-16/10 overflow-hidden rounded-2xl relative">
              <div className="absolute inset-0 bg-neutral/20 group-hover:bg-transparent transition-colors duration-500 z-10"></div>
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 ease-in-out"
              />
              <div className="absolute top-4 right-4 z-20 w-10 h-10 md:w-12 md:h-12 bg-white rounded-full flex items-center justify-center text-black opacity-100 md:opacity-0 group-hover:opacity-100 transform translate-y-0 md:translate-y-4 group-hover:translate-y-0 transition-all duration-300">
                <ArrowUpRight size={20} />
              </div>
            </div>
            <div className="mt-4 md:mt-6">
              <p className="font-label text-xs md:text-sm text-gray-400 mb-1 md:mb-2 uppercase tracking-widest">
                {project.category}
              </p>
              <h3 className="font-headline text-2xl md:text-3xl">{project.title}</h3>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination Dots for Mobile & Tablet */}
      <div className="flex lg:hidden justify-center gap-2 mt-4 md:mt-8">
        {projectsData.map((_, index) => (
          <button
            key={index}
            onClick={() => {
              if (projectRefs.current[index]) {
                projectRefs.current[index]?.scrollIntoView({
                  behavior: 'smooth',
                  block: 'nearest',
                  inline: 'center',
                });
              }
            }}
            className={`h-2 rounded-full transition-all duration-300 ${
              activeIndex === index ? 'w-6 bg-primary' : 'w-2 bg-gray-500'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
};

export default Projects;
