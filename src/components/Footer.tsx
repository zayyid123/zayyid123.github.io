import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Button from './Button';
import { toast } from 'sonner';

gsap.registerPlugin(ScrollTrigger);

const Footer = () => {
  const containerRef = useRef(null);
  const textRef = useRef(null);

  useEffect(() => {
    // Hide initially using GSAP to prevent flashes
    gsap.set(textRef.current, { y: 100, opacity: 0 });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            gsap.fromTo(
              textRef.current,
              { y: 100, opacity: 0 },
              {
                y: 0,
                opacity: 1,
                duration: 1.5,
                ease: 'power3.out',
                delay: 0.2, // beri jeda sedikit agar scroll natural
              }
            );
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.05 } // Pemicu lebih awal (5% terlihat)
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  function onCopyEmail() {
    navigator.clipboard.writeText('mochamadzayyid@gmail.com').then(() => {
      toast.success('Email copied to clipboard');
    });
  }

  return (
    <footer
      id="panelFooter"
      ref={containerRef}
      className="absolute inset-0 h-dvh flex flex-col justify-center px-6 md:px-20 text-white overflow-hidden bg-secondary z-35"
    >
      <div className="absolute top-[-50%] right-[-10%] w-[80vw] h-[80vw] bg-white rounded-full mix-blend-overlay filter blur-[100px] opacity-20 pointer-events-none"></div>

      <div className="z-10">
        <h2 className="font-label text-xl mb-12 uppercase tracking-widest font-bold">
          Have an idea?
        </h2>
        <div className="overflow-hidden mb-12">
          <h1 ref={textRef} className="font-headline text-[12vw] leading-none mb-8">
            LET'S WORK <br /> TOGETHER.
          </h1>
        </div>
        <div className="flex gap-4">
          <Button
            variant="inverted"
            onClick={() => (window.location.href = 'mailto:[mochamadzayyid@gmail.com]')}
          >
            Get in touch
          </Button>
          <Button variant="secondary" onClick={() => onCopyEmail()}>
            Copy Email
          </Button>
        </div>
      </div>

      <div className="mt-20 pt-8 border-t border-secondary/20 flex flex-col md:flex-row justify-between items-center z-10 font-body text-sm font-medium">
        <p>&copy; {new Date().getFullYear()} Zay Portfolio. All rights reserved.</p>
        <div className="flex gap-8 mt-4 md:mt-0 font-label uppercase tracking-widest">
          <a
            href="https://www.linkedin.com/in/mochamad-zayyid"
            target="_blank"
            className="transition-colors hover:text-primary"
          >
            LinkedIn
          </a>
          <a
            href="https://www.instagram.com/zayyid_123/"
            target="_blank"
            className="transition-colors hover:text-primary"
          >
            Instagram
          </a>
          <a
            href="https://github.com/zayyid123"
            target="_blank"
            className="transition-colors hover:text-primary"
          >
            Github
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
