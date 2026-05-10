import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

const Navbar = () => {
  const navRef = useRef(null);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    gsap.fromTo(
      navRef.current,
      { y: -100, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: 'power3.out', delay: 0.2 }
    );
  }, []);

  const handleNav = (target: string) => {
    setIsOpen(false);
    window.dispatchEvent(new CustomEvent('nav-to', { detail: { target } }));
  };

  return (
    <>
      <nav
        ref={navRef}
        className={`fixed top-0 left-0 w-full p-6 flex justify-between items-center z-100 transition-colors duration-300 text-white`}
      >
        <div
          onClick={() => handleNav('hero')}
          className="font-headline text-3xl tracking-wider cursor-pointer"
        >
          ZAY
        </div>
        <ul className="gap-8 font-label text-sm uppercase tracking-widest hidden md:flex items-center">
          <li
            onClick={() => handleNav('work')}
            className="hover:text-secondary cursor-pointer transition-colors"
          >
            Work
          </li>
          <li
            onClick={() => handleNav('skills')}
            className="hover:text-secondary cursor-pointer transition-colors"
          >
            Skills
          </li>
          <li
            onClick={() => handleNav('contact')}
            className="hover:text-secondary cursor-pointer transition-colors"
          >
            Contact
          </li>
        </ul>
        <div
          className="md:hidden flex flex-col gap-1.5 cursor-pointer p-2"
          onClick={() => setIsOpen(!isOpen)}
        >
          <div
            className={`w-8 h-0.5 bg-current transition-all duration-300 origin-center ${isOpen ? 'rotate-45 translate-y-2' : ''}`}
          ></div>
          <div
            className={`w-8 h-0.5 bg-current transition-all duration-300 origin-center ${isOpen ? '-rotate-45' : ''}`}
          ></div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 bg-[#111] z-90 flex flex-col justify-center items-center transition-all duration-500 ease-[cubic-bezier(0.77,0,0.175,1)] ${isOpen ? 'opacity-100 pointer-events-auto translate-y-0' : 'opacity-0 pointer-events-none -translate-y-full'}`}
      >
        <ul className="flex flex-col gap-10 font-headline text-5xl uppercase tracking-widest text-center text-white">
          <li
            onClick={() => handleNav('work')}
            className="hover:text-white cursor-pointer transition-colors"
          >
            Work
          </li>
          <li
            onClick={() => handleNav('skills')}
            className="hover:text-white cursor-pointer transition-colors"
          >
            Skills
          </li>
          <li
            onClick={() => handleNav('contact')}
            className="hover:text-white cursor-pointer transition-colors"
          >
            Contact
          </li>
        </ul>
      </div>
    </>
  );
};

export default Navbar;
