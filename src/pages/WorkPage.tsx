/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, ArrowUpRight } from 'lucide-react';
import gsap from 'gsap';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../lib/firebase';

const staticFallbackData = [
  {
    title: 'Cinchy Life',
    category: 'Web Development',
    tech: ['React', 'Next.js', 'Tailwind', 'GSAP'],
    image:
      'https://res.cloudinary.com/do3gqpixo/image/upload/v1775537762/portfolio/Screenshot_2026-04-07_115502_vmlqen.png',
    url: 'https://cinchy.life/en',
    color: '#FF7337',
    year: '2024',
    aspect: 'aspect-video',
  },
  {
    title: 'Eleena Jewels',
    category: 'E-commerce',
    tech: ['Vue', 'Nuxt.js', 'Shopify', 'Tailwind'],
    image:
      'https://res.cloudinary.com/do3gqpixo/image/upload/v1742500655/portfolio/ynsvnktsz2ojvzvjukjl.png',
    url: 'https://eleena-landing-git-main-eleenajewels-projects.vercel.app/en',
    color: '#E5D3B3',
    year: '2023',
    aspect: 'aspect-[3/4]',
  },
  {
    title: 'SIMRS Web App',
    category: 'Web SaaS',
    tech: ['React', 'TypeScript', 'Redux', 'Tailwind'],
    image:
      'https://res.cloudinary.com/do3gqpixo/image/upload/v1775538328/portfolio/Screenshot_2026-04-07_120456_en4hsw.png',
    url: 'https://nexmedis.com/',
    color: '#1A1A1A',
    year: '2024',
    aspect: 'aspect-square',
  },
  {
    title: 'Velo Digital Agency',
    category: 'UI/UX Design',
    tech: ['Figma', 'Framer', 'Webflow'],
    image:
      'https://images.unsplash.com/photo-1551434678-e076c223a692?q=80&w=800&auto=format&fit=crop',
    url: 'https://github.com/zayyid123',
    color: '#8A2BE2',
    year: '2023',
    aspect: 'aspect-[4/5]',
  },
  {
    title: 'Zenith Crypto Portal',
    category: 'Web Development',
    tech: ['Next.js', 'TypeScript', 'Ethers.js'],
    image:
      'https://images.unsplash.com/photo-1621761191319-c6fb62004040?q=80&w=800&auto=format&fit=crop',
    url: 'https://github.com/zayyid123',
    color: '#00F2FE',
    year: '2024',
    aspect: 'aspect-video',
  },
];

const WorkPage = () => {
  const navigate = useNavigate();
  const [filter, setFilter] = useState('All');
  const [rawProjects, setRawProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);

  // 1. Fetch from Firestore
  useEffect(() => {
    const fetchFirestoreProjects = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'portfolio'));
        const fetchedList: any[] = [];
        querySnapshot.forEach((doc) => {
          fetchedList.push({
            id: doc.id,
            ...doc.data(),
          });
        });

        // Sort by date (newest first)
        fetchedList.sort((a, b) => {
          const parseDate = (dStr: string) => {
            if (!dStr) return 0;
            const parts = dStr.split('/');
            if (parts.length === 3) {
              return new Date(`${parts[2]}-${parts[1]}-${parts[0]}`).getTime();
            }
            return 0;
          };
          return parseDate(b.createdAt || b.date) - parseDate(a.createdAt || a.date);
        });

        if (fetchedList.length === 0) {
          setRawProjects(staticFallbackData);
        } else {
          setRawProjects(fetchedList);
        }
      } catch (error) {
        console.error('Error loading Firestore portfolio:', error);
        // Seamless fallback if firebase is unconfigured
        setRawProjects(staticFallbackData);
      } finally {
        setLoading(false);
      }
    };

    fetchFirestoreProjects();
  }, []);

  // Helper parsers
  const getYearFromDate = (dateStr: any) => {
    if (!dateStr) return '2024';
    if (typeof dateStr === 'string') {
      const parts = dateStr.split('/');
      if (parts.length === 3) return parts[2];
      const match = dateStr.match(/\d{4}/);
      return match ? match[0] : '2024';
    }
    return '2024';
  };

  const getAspectForIndex = (index: number) => {
    const aspects = ['aspect-video', 'aspect-[3/4]', 'aspect-square', 'aspect-[4/5]'];
    return aspects[index % aspects.length];
  };

  // Map raw Firestore attributes to standard frontend layout fields
  const getMappedProjects = () => {
    return rawProjects.map((p, index) => {
      const title = p.name || p.title || 'Untitled Project';

      // Capture 'project: "website"' or 'category'
      const rawCategory = p.project || p.category || 'website';
      const category = rawCategory.charAt(0).toUpperCase() + rawCategory.slice(1);

      // Smart extract tech stack from description if missing
      let tech = p.tech || p.technologies || [];
      if (tech.length === 0 && p.description) {
        const desc = p.description.toLowerCase();
        const techKeywords = [
          { key: 'next.js', label: 'Next.js' },
          { key: 'next-intl', label: 'Next-Intl' },
          { key: 'react', label: 'React' },
          { key: 'vue', label: 'Vue' },
          { key: 'nuxt', label: 'Nuxt.js' },
          { key: 'tailwind', label: 'Tailwind' },
          { key: 'midtrans', label: 'Midtrans' },
          { key: 'raja ongkir', label: 'Raja Ongkir' },
          { key: 'contentful', label: 'Contentful' },
          { key: 'gsap', label: 'GSAP' },
          { key: 'figma', label: 'Figma' },
          { key: 'framer', label: 'Framer' },
          { key: 'webflow', label: 'Webflow' },
          { key: 'typescript', label: 'TypeScript' },
          { key: 'firebase', label: 'Firebase' },
          { key: 'firestore', label: 'Firestore' },
          { key: 'redux', label: 'Redux' },
          { key: 'shopify', label: 'Shopify' },
        ];

        techKeywords.forEach(({ key, label }) => {
          if (desc.includes(key)) {
            tech.push(label);
          }
        });
      }
      if (tech.length === 0) {
        tech = ['Web App', 'Interactive'];
      }

      const image =
        p.image ||
        'https://images.unsplash.com/photo-1551434678-e076c223a692?q=80&w=800&auto=format&fit=crop';
      const url = p.link || p.url || 'https://github.com/zayyid123';
      const year = getYearFromDate(p.createdAt || p.date);
      const aspect = p.aspect || getAspectForIndex(index);

      return {
        ...p,
        title,
        category,
        tech,
        image,
        url,
        year,
        aspect,
      };
    });
  };

  const mappedProjects = getMappedProjects();

  // Dynamically extract categories from DB records
  const categories = ['All', ...Array.from(new Set(mappedProjects.map((p) => p.category)))];

  const filteredProjects =
    filter === 'All' ? mappedProjects : mappedProjects.filter((p) => p.category === filter);

  // 2. Staggered Entrance Animations on Mount
  useEffect(() => {
    if (loading) return;

    const ctx = gsap.context(() => {
      gsap.set('.animate-fade', { opacity: 0, y: 35 });
      gsap.set('.masonry-item', { opacity: 0, y: 50, scale: 0.95 });

      gsap.to('.animate-fade', {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.12,
        ease: 'power3.out',
      });

      gsap.to('.masonry-item', {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.8,
        stagger: 0.08,
        ease: 'power3.out',
        delay: 0.2,
      });
    }, containerRef);

    return () => ctx.revert();
  }, [loading]);

  // Stagger elements when filter category shifts
  useEffect(() => {
    if (loading) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.masonry-item',
        { opacity: 0, y: 30, scale: 0.97 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.5,
          stagger: 0.05,
          ease: 'power2.out',
        }
      );
    }, containerRef);
    return () => ctx.revert();
  }, [filter, loading]);

  // Loading indicator pulse animation
  useEffect(() => {
    if (!loading) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.loader-text',
        { opacity: 0.3, scale: 0.98 },
        {
          opacity: 1,
          scale: 1,
          duration: 0.8,
          repeat: -1,
          yoyo: true,
          ease: 'power1.inOut',
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, [loading]);

  // Premium 3D mouse tilting effect on cards
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>, cardElement: HTMLDivElement) => {
    if (window.innerWidth < 1024) return;

    const rect = cardElement.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const xc = rect.width / 2;
    const yc = rect.height / 2;
    const rotateX = -(y - yc) / (rect.height / 15);
    const rotateY = (x - xc) / (rect.width / 15);

    gsap.to(cardElement, {
      rotateX: rotateX,
      rotateY: rotateY,
      scale: 1.02,
      duration: 0.3,
      transformPerspective: 800,
      ease: 'power2.out',
    });
  };

  const handleMouseLeave = (cardElement: HTMLDivElement) => {
    gsap.to(cardElement, {
      rotateX: 0,
      rotateY: 0,
      scale: 1,
      duration: 0.5,
      ease: 'elastic.out(1, 0.3)',
    });
  };

  return (
    <div
      ref={containerRef}
      className="w-full min-h-screen bg-[#111] text-white selection:bg-primary selection:text-white pb-32 overflow-x-hidden relative"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20 pt-28">
        {/* Back navigation & Header */}
        <div className="flex flex-col gap-6 mb-16">
          <button
            onClick={() => navigate('/')}
            className="flex items-center gap-2 font-label text-sm uppercase tracking-widest text-gray-400 hover:text-primary cursor-pointer w-fit transition-colors group animate-fade"
          >
            <ArrowLeft
              size={16}
              className="transform group-hover:-translate-x-1 transition-transform"
            />
            Back to Home
          </button>

          <h1 className="font-headline text-[10vw] md:text-[6vw] lg:text-7xl leading-none uppercase animate-fade mt-2">
            Selected <span className="text-primary font-bold">Works</span>
          </h1>
          <p className="font-body text-gray-400 max-w-xl text-base md:text-lg animate-fade">
            A dynamic, staggered masonry gallery pulled directly from Cloud Firestore, showcasing
            custom fullstack code and design solutions.
          </p>
        </div>

        {/* Loading State */}
        {loading ? (
          <div className="w-full h-80 flex flex-col justify-center items-center gap-4">
            <h2 className="loader-text font-headline text-3xl tracking-widest text-primary font-bold">
              LOADING WORKS...
            </h2>
            <div className="w-16 h-0.5 bg-primary rounded animate-pulse"></div>
          </div>
        ) : (
          <>
            {/* Filter Pills */}
            <div className="flex flex-wrap gap-3 mb-16 animate-fade">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setFilter(cat)}
                  className={`px-5 py-2.5 rounded-full font-label text-xs uppercase tracking-widest border transition-all duration-300 cursor-pointer ${
                    filter === cat
                      ? 'bg-primary border-primary text-white scale-105 shadow-[0_0_20px_rgba(255,115,55,0.3)]'
                      : 'border-white/10 text-gray-400 hover:border-white/30 hover:text-white'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Masonry Grid */}
            <div className="columns-1 md:columns-2 lg:columns-3 gap-8 w-full">
              {filteredProjects.map((project, index) => {
                let itemRef: HTMLDivElement | null = null;
                return (
                  <div
                    key={project.id || index}
                    ref={(el) => {
                      itemRef = el;
                    }}
                    onClick={() => window.open(project.url, '_blank', 'noopener,noreferrer')}
                    onMouseMove={(e) => itemRef && handleMouseMove(e, itemRef)}
                    onMouseLeave={() => itemRef && handleMouseLeave(itemRef)}
                    className="masonry-item break-inside-avoid mb-8 group bg-[#181818] rounded-3xl overflow-hidden border border-white/5 hover:border-primary/30 cursor-pointer transition-colors duration-500 flex flex-col"
                    style={{ transformStyle: 'preserve-3d' }}
                  >
                    {/* Image Container */}
                    <div
                      className={`w-full ${project.aspect} overflow-hidden relative rounded-t-3xl border-b border-white/5`}
                    >
                      {/* Overlay on Hover */}
                      <div className="absolute inset-0 bg-[#111]/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10 flex items-center justify-center">
                        <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center text-white scale-75 group-hover:scale-100 transition-transform duration-300 shadow-lg">
                          <ArrowUpRight size={22} />
                        </div>
                      </div>

                      <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-cover transform scale-100 group-hover:scale-105 transition-transform duration-700 ease-in-out pointer-events-none select-none"
                      />

                      {/* Top category label floating badge */}
                      <span className="absolute top-4 left-4 px-3 py-1 bg-[#111]/60 backdrop-blur-md rounded-full font-label text-[10px] uppercase tracking-wider text-gray-300 z-10">
                        {project.category}
                      </span>
                    </div>

                    {/* Details Section */}
                    <div className="p-6 md:p-8 flex flex-col gap-3 grow">
                      <div className="flex items-center justify-between">
                        <h2 className="font-headline text-2xl group-hover:text-primary transition-colors duration-300">
                          {project.title}
                        </h2>
                        <span className="font-headline text-lg text-white/20 group-hover:text-white/40 transition-colors duration-300">
                          {project.year}
                        </span>
                      </div>

                      {/* Tech stack badges */}
                      <div className="flex flex-wrap gap-1.5 mt-2">
                        {project.tech.map((t: string, idx: number) => (
                          <span
                            key={idx}
                            className="px-2.5 py-0.5 bg-white/5 border border-white/5 rounded-md font-body text-[10px] text-gray-400 uppercase tracking-wide"
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {filteredProjects.length === 0 && (
              <div className="py-32 text-center">
                <p className="font-body text-gray-500 text-lg">
                  No projects found in this category.
                </p>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default WorkPage;
