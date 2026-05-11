import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Hero from '../components/Hero';
import Projects from '../components/Projects';
import Skill from '../components/Skill';
import Footer from '../components/Footer';
import Ready from '../components/ready';
import Navbar from '../components/Navbar';

gsap.registerPlugin(ScrollTrigger);

function HomePage() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const TOTAL_UNITS = 60; // Hero(0) -> Projects(10) -> Skill(20) -> SkillAnim(30) -> Ready(40) -> ReadyAnim(50) -> Footer(60)
    const TOTAL_SCROLL = 6000; // Define how many pixels to scroll for the full experience

    const ctx = gsap.context(() => {
      const panelProjects = document.getElementById('panelProjects');
      const panelSkill = document.getElementById('panelSkill');
      const panelReady = document.getElementById('panelReady');
      const panelFooter = document.getElementById('panelFooter');
      const progressBar = document.getElementById('progressBar');

      if (!panelProjects || !panelSkill || !panelReady || !panelFooter) return;

      // Reset initial states
      gsap.set([panelProjects, panelSkill, panelReady, panelFooter], {
        yPercent: 150,
        rotate: 20,
      });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: `+=${TOTAL_SCROLL}`, // Total scroll distance
          pin: true,
          scrub: 1, // Smooth scrub
          onUpdate: (self) => {
            const p = self.progress * TOTAL_UNITS;
            if (progressBar) {
              progressBar.style.width = `${self.progress * 100}%`;
            }
            // Dispatch custom event for decoupled animations (like Skill diamond)
            window.dispatchEvent(
              new CustomEvent('app-scroll', { detail: { progress: p, TOTAL_UNITS } })
            );
          },
        },
      });

      // Map 60 units to the timeline duration.
      // Progress 0 to 10: Projects slide up
      tl.to(panelProjects, {
        yPercent: 0,
        ease: 'none',
        duration: 10,
        rotate: 0,
      });

      // Progress 10 to 20: Skill slide up
      tl.to(panelSkill, {
        yPercent: 0,
        ease: 'none',
        duration: 10,
        rotate: 0,
      });

      // Progress 20 to 30: Wait (Skill inner animation happens via app-scroll event)
      tl.to(
        {},
        {
          duration: 10,
          rotate: 0,
          yPercent: 0,
        }
      );

      // Progress 30 to 40: Ready slide up
      tl.to(panelReady, {
        yPercent: 0,
        ease: 'none',
        duration: 10,
        rotate: 0,
      });

      // Progress 40 to 50: Wait (Ready inner horizontal scroll animation happens via app-scroll event)
      tl.to(
        {},
        {
          duration: 10,
          rotate: 0,
          yPercent: 0,
        }
      );

      // Progress 50 to 60: Footer slide up
      tl.to(panelFooter, {
        yPercent: 0,
        ease: 'none',
        duration: 10,
        rotate: 0,
      });
    }, containerRef);

    // Handle navigation clicks
    const handleNavTo = (e: Event) => {
      const customEvent = e as CustomEvent;
      const target = customEvent.detail.target;

      let targetProgress = 0;
      if (target === 'hero') targetProgress = 0;
      else if (target === 'work') targetProgress = 10;
      else if (target === 'skills') targetProgress = 20;
      else if (target === 'contact') targetProgress = 60;

      // Scroll to the mapped progress position
      const scrollPos = (targetProgress / TOTAL_UNITS) * TOTAL_SCROLL;

      window.scrollTo({
        top: scrollPos,
        behavior: 'smooth',
      });
    };

    window.addEventListener('nav-to', handleNavTo);

    return () => {
      window.removeEventListener('nav-to', handleNavTo);
      ctx.revert(); // This cleanly removes pin spacers and restores DOM to pre-pinned state
    };
  }, []);

  return (
    <div className="w-full min-h-screen">
      <div
        ref={containerRef}
        className="text-tertiary selection:bg-primary selection:text-white w-full h-dvh overflow-hidden relative"
      >
        <div
          id="progressBar"
          className="fixed top-0 left-0 h-1 bg-white z-999 w-0 transition-all duration-75"
        ></div>

        <Navbar />
        <Hero />
        <Projects />
        <Skill />
        <Ready />
        <Footer />
      </div>
    </div>
  );
}

export default HomePage;
