import { useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Projects from './components/Projects';
import Skill from './components/Skill';
import Footer from './components/Footer';

function App() {
  useEffect(() => {
    // ─── Scroll-linked panel system ───────────────────────────────
    const UNITS_PER_PANEL = 10;
    const TOTAL_UNITS = 40; // Hero(0) -> Projects(10) -> Skill(20) -> SkillAnim(30) -> Footer(40)
    const UNIT_SIZE = 120;

    const panelProjects = document.getElementById('panelProjects');
    const panelSkill = document.getElementById('panelSkill');
    const panelFooter = document.getElementById('panelFooter');
    const progressBar = document.getElementById('progressBar');

    let progress = 0;
    let rendered = 0;
    let rafId: number | null = null;

    function clamp(v: number, lo: number, hi: number) {
      return Math.min(Math.max(v, lo), hi);
    }

    function applyProgress(p: number) {
      if (!panelProjects || !panelSkill || !panelFooter) return;

      const sageP = clamp(p / UNITS_PER_PANEL, 0, 1);
      const sageY = (1 - sageP) * 100;
      panelProjects.style.transform = `translateY(${sageY}%)`;

      const skillP = clamp((p - UNITS_PER_PANEL) / UNITS_PER_PANEL, 0, 1);
      const skillY = (1 - skillP) * 100;
      panelSkill.style.transform = `translateY(${skillY}%)`;

      const darkP = clamp((p - 30) / UNITS_PER_PANEL, 0, 1);
      const darkY = (1 - darkP) * 100;
      panelFooter.style.transform = `translateY(${darkY}%)`;

      if (progressBar) {
        progressBar.style.width = (p / TOTAL_UNITS) * 100 + '%';
      }

      // Dispatch custom event for decoupled animations
      window.dispatchEvent(new CustomEvent('app-scroll', { detail: { progress: p, TOTAL_UNITS } }));
    }

    function renderLoop() {
      if (Math.abs(progress - rendered) < 0.001) {
        rafId = null;
        return;
      }
      rendered += (progress - rendered) * 0.12;
      applyProgress(rendered);
      rafId = requestAnimationFrame(renderLoop);
    }

    function scheduleRender() {
      if (!rafId) rafId = requestAnimationFrame(renderLoop);
    }

    // ─── Wheel ───────────────────────────────────────────────────
    let wheelBuffer = 0;
    let wheelTimer: NodeJS.Timeout | null = null;

    const handleWheel = (e: WheelEvent) => {
      const target = e.target as HTMLElement;
      const verticalScrollArea = target.closest('.vertical-scroll-area');

      if (verticalScrollArea) {
        const atTop = verticalScrollArea.scrollTop <= 50;
        const atBottom =
          verticalScrollArea.scrollHeight -
            verticalScrollArea.clientHeight -
            verticalScrollArea.scrollTop <=
          50;

        if (e.deltaY < 0 && !atTop) return; // Let native scroll up
        if (e.deltaY > 0 && !atBottom) return; // Let native scroll down
      }

      wheelBuffer += e.deltaY;
      const delta = wheelBuffer / UNIT_SIZE;
      wheelBuffer = 0;

      let nextProgress = progress + delta;

      // Trap scroll momentum at panel boundaries (10 and 20)
      if (progress < 10 && nextProgress >= 10) {
        nextProgress = 10;
      } else if (progress > 10 && nextProgress <= 10) {
        nextProgress = 10;
      }

      if (progress < 20 && nextProgress >= 20) {
        nextProgress = 20;
      } else if (progress > 20 && nextProgress <= 20) {
        nextProgress = 20;
      }

      if (progress < 30 && nextProgress >= 30) {
        nextProgress = 30;
      } else if (progress > 30 && nextProgress <= 30) {
        nextProgress = 30;
      }

      progress = clamp(nextProgress, 0, TOTAL_UNITS);
      scheduleRender();

      if (wheelTimer) clearTimeout(wheelTimer);
      wheelTimer = setTimeout(() => {
        wheelBuffer = 0;
      }, 100);
    };

    window.addEventListener('wheel', handleWheel, { passive: true });

    // ─── Touch ───────────────────────────────────────────────────
    let touchStartX = 0;
    let touchStartY = 0;
    let touchLastY = 0;

    const handleTouchStart = (e: TouchEvent) => {
      touchStartX = e.touches[0].clientX;
      touchStartY = e.touches[0].clientY;
      touchLastY = touchStartY;
    };

    const handleTouchMove = (e: TouchEvent) => {
      const x = e.touches[0].clientX;
      const y = e.touches[0].clientY;

      const deltaX = Math.abs(x - touchStartX);
      const deltaY = Math.abs(y - touchStartY);

      const isHorizontal = deltaX > deltaY;
      const inScrollArea = (e.target as HTMLElement).closest('.hide-scrollbar');
      const verticalScrollArea = (e.target as HTMLElement).closest('.vertical-scroll-area');

      if (verticalScrollArea && !isHorizontal) {
        const atTop = verticalScrollArea.scrollTop <= 50;
        const atBottom =
          verticalScrollArea.scrollHeight -
            verticalScrollArea.clientHeight -
            verticalScrollArea.scrollTop <=
          50;
        const delta = touchLastY - y; // > 0 means swiping up (scrolling down)

        if (delta < 0 && !atTop) {
          touchLastY = y;
          return;
        }
        if (delta > 0 && !atBottom) {
          touchLastY = y;
          return;
        }
      }

      // If user is swiping horizontally inside a scrollable area, let native scroll happen
      if (isHorizontal && inScrollArea) {
        touchLastY = y;
        return;
      }

      // Prevent native vertical scroll (pull-to-refresh, overscroll)
      if (e.cancelable) {
        e.preventDefault();
      }

      const delta = (touchLastY - y) / UNIT_SIZE;
      touchLastY = y;

      let nextProgress = progress + delta;

      // Trap scroll momentum at panel boundaries (10 and 20)
      if (progress < 10 && nextProgress >= 10) {
        nextProgress = 10;
      } else if (progress > 10 && nextProgress <= 10) {
        nextProgress = 10;
      }

      if (progress < 20 && nextProgress >= 20) {
        nextProgress = 20;
      } else if (progress > 20 && nextProgress <= 20) {
        nextProgress = 20;
      }

      if (progress < 30 && nextProgress >= 30) {
        nextProgress = 30;
      } else if (progress > 30 && nextProgress <= 30) {
        nextProgress = 30;
      }

      progress = clamp(nextProgress, 0, TOTAL_UNITS);
      scheduleRender();
    };

    window.addEventListener('touchstart', handleTouchStart, { passive: false });
    window.addEventListener('touchmove', handleTouchMove, { passive: false });

    // ─── Keyboard arrow keys ─────────────────────────────────────
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowDown') {
        progress = clamp(progress + 1, 0, TOTAL_UNITS);
        scheduleRender();
      }
      if (e.key === 'ArrowUp') {
        progress = clamp(progress - 1, 0, TOTAL_UNITS);
        scheduleRender();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    // ─── Navbar Navigation ───────────────────────────────────────
    const handleNavTo = (e: Event) => {
      const customEvent = e as CustomEvent;
      const target = customEvent.detail.target;

      let targetProgress = progress;
      if (target === 'hero') targetProgress = 0;
      else if (target === 'work') targetProgress = 10;
      else if (target === 'skills') targetProgress = 20;
      else if (target === 'contact') targetProgress = 40;

      progress = targetProgress;
      scheduleRender();
    };

    window.addEventListener('nav-to', handleNavTo);

    // Initial setup
    if (panelProjects) panelProjects.style.transform = `translateY(100%)`;
    if (panelSkill) panelSkill.style.transform = `translateY(100%)`;
    if (panelFooter) panelFooter.style.transform = `translateY(100%)`;

    return () => {
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('nav-to', handleNavTo);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <div className="text-tertiary selection:bg-primary selection:text-white w-full h-dvh overflow-hidden relative">
      <div
        id="progressBar"
        className="fixed top-0 left-0 h-1 bg-white z-999 w-0 transition-all duration-75"
      ></div>

      <Navbar />
      <Hero />
      <Projects />
      <Skill />
      <Footer />
    </div>
  );
}

export default App;
