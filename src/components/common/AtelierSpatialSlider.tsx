import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import gsap from 'gsap';
import { useLanguage } from '../../context/LanguageContext';
import { useVisualizer } from '../../context/VisualizerContext';
import { 
  Maximize2, 
  ChevronLeft, 
  ChevronRight, 
  Sparkles, 
  Ruler, 
  ArrowRight, 
  ArrowLeft,
  Compass,
  Layers
} from 'lucide-react';

export interface SpatialSlide {
  id: string;
  tag: string;
  tagAr: string;
  title: string;
  titleAr: string;
  location: string;
  locationAr: string;
  area: string;
  ceiling: string;
  image: string;
  description: string;
  descriptionAr: string;
  piecesCount: number;
}

const DEFAULT_SLIDES: SpatialSlide[] = [
  {
    id: 'zayed-salon',
    tag: '01 / CONTEMPORARY SALON',
    tagAr: '٠١ / صالون معاصر مشمس',
    title: 'The Alabaster & Smoked Ash Salon',
    titleAr: 'صالون المرمر وخشب الرماد المدخن',
    location: 'Sheikh Zayed Hub · Giza',
    locationAr: 'الشيخ زايد · الجيزة',
    area: '38 m²',
    ceiling: '2.9m Ceiling Datum',
    image: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1920&q=85',
    description: 'Certified Retailer Catalog Composition with true-to-scale clearance walkways and warm southern exposure.',
    descriptionAr: 'تكوين كتالوج معتمد بأبعاد حقيقية ١:١ وممرات مدروسة مع إضاءة طبيعية دافئة.',
    piecesCount: 4
  },
  {
    id: 'cairo-penthouse',
    tag: '02 / PENTHOUSE ATELIER',
    tagAr: '٠٢ / صالة بنتهاوس معمارية',
    title: 'New Cairo Travertine Sanctuary',
    titleAr: 'ملاذ الترافرتين بالقاهرة الجديدة',
    location: '5th Settlement · New Cairo',
    locationAr: 'التجمع الخامس · القاهرة الجديدة',
    area: '46 m²',
    ceiling: '3.1m Ceiling Datum',
    image: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1920&q=85',
    description: 'Minimalist open-concept living pavilion rendered with photorealistic shadow mapping and Statuario marble accents.',
    descriptionAr: 'مساحة معيشة مفتوحة وبسيطة مع ظلال شمس واقعية وتطعيمات رخام ستاتوريو الإيطالي.',
    piecesCount: 5
  },
  {
    id: 'zamalek-suite',
    tag: '03 / HERITAGE ATELIER',
    tagAr: '٠٣ / جناح تراثي معاصر',
    title: 'Zamalek High-Ceiling Heritage Suite',
    titleAr: 'جناح الزمالك المعماري العريق',
    location: 'Zamalek Island · Cairo',
    locationAr: 'جزيرة الزمالك · القاهرة',
    area: '34 m²',
    ceiling: '3.6m Ceiling Datum',
    image: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=1920&q=85',
    description: 'Restored colonial moulding datum balanced with floating contemporary upholstery and sculptural brass illumination.',
    descriptionAr: 'ارتفاعات أسقف تراثية متوازنة مع جلسات عصرية وإضاءة نحاسية معمارية ناعمة.',
    piecesCount: 3
  },
  {
    id: 'marassi-coastal',
    tag: '04 / COASTAL PAVILION',
    tagAr: '٠٤ / بافيليون ساحلي فاخر',
    title: 'Marassi Mediterranean Light Haven',
    titleAr: 'ملاذ مراسي المتوسطي المضاء',
    location: 'Sidi Abdel Rahman · North Coast',
    locationAr: 'سيدي عبد الرحمن · الساحل الشمالي',
    area: '52 m²',
    ceiling: '3.2m Horizon Glazing',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1920&q=85',
    description: 'Bleached European white oak floor datum with low-profile linen lounge collection and panoramic coastal illumination.',
    descriptionAr: 'أرضيات خشب بلوط أوروبي مبيض وجلسات كتان صيفية بمحاذاة أفق البحر.',
    piecesCount: 6
  }
];

interface AtelierSpatialSliderProps {
  slides?: SpatialSlide[];
  className?: string;
}

export const AtelierSpatialSlider: React.FC<AtelierSpatialSliderProps> = ({
  slides = DEFAULT_SLIDES,
  className = ''
}) => {
  const { isRTL } = useLanguage();
  const { openExperienceA } = useVisualizer();
  const navigate = useNavigate();

  const [activeIndex, setActiveIndex] = useState(0);
  const [nextIndex, setNextIndex] = useState(1);
  const [isAnimating, setIsAnimating] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const activeSlideRef = useRef<HTMLDivElement>(null);
  const activeImageRef = useRef<HTMLImageElement>(null);
  const nextSlideRef = useRef<HTMLDivElement>(null);
  const nextImageWrapRef = useRef<HTMLDivElement>(null);
  const nextImageRef = useRef<HTMLImageElement>(null);
  const titleActiveRef = useRef<HTMLHeadingElement>(null);
  const titleNextRef = useRef<HTMLHeadingElement>(null);
  const previewCardRef = useRef<HTMLDivElement>(null);

  const ArrowIcon = isRTL ? ArrowLeft : ArrowRight;

  const currentSlide = slides[activeIndex];
  const upcomingSlide = slides[nextIndex];

  // Helper to split text for stagger animation
  const renderSplitTitle = (text: string) => {
    return text.split(' ').map((word, wIdx) => (
      <span key={wIdx} className="inline-block overflow-hidden mr-[0.25em] align-top">
        <span className="char-span inline-block will-change-transform">
          {word}
        </span>
      </span>
    ));
  };

  // Setup preview card clip path
  useEffect(() => {
    if (!nextImageWrapRef.current) return;
    gsap.set(nextImageWrapRef.current, {
      clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
      width: '100%',
      height: '100%',
    });
    if (previewCardRef.current) {
      gsap.fromTo(
        previewCardRef.current,
        { scale: 0.94, opacity: 0, y: 15 },
        { scale: 1, opacity: 1, y: 0, duration: 0.7, ease: 'power3.out' }
      );
    }
  }, [activeIndex]);

  const handleNextTransition = () => {
    if (isAnimating) return;
    setIsAnimating(true);

    const activeImg = activeImageRef.current;
    const nextWrap = previewCardRef.current;
    const titleActive = titleActiveRef.current;
    const titleNext = titleNextRef.current;

    const tl = gsap.timeline({
      onComplete: () => {
        const newActive = nextIndex;
        const newNext = (nextIndex + 1) % slides.length;
        setActiveIndex(newActive);
        setNextIndex(newNext);

        // Reset positions
        if (activeImg) gsap.set(activeImg, { scale: 1, opacity: 1 });
        if (titleActive) gsap.set(titleActive.querySelectorAll('.char-span'), { yPercent: 0, opacity: 1 });
        if (nextWrap) {
          gsap.set(nextWrap, {
            scale: 1,
            opacity: 1,
            clearProps: 'all'
          });
        }
        setIsAnimating(false);
      }
    });

    // 1. Zoom active image smoothly
    if (activeImg) {
      tl.to(activeImg, {
        scale: 1.15,
        opacity: 0.4,
        duration: 0.95,
        ease: 'power3.inOut'
      }, 0);
    }

    // 2. Animate out active title
    if (titleActive) {
      const chars = titleActive.querySelectorAll('.char-span');
      tl.to(chars, {
        yPercent: -110,
        opacity: 0,
        stagger: 0.02,
        duration: 0.45,
        ease: 'power3.in'
      }, 0);
    }

    // 3. Expand the next preview card to fill the container (Atelier Nova signature effect)
    if (nextWrap && containerRef.current) {
      tl.to(nextWrap, {
        scale: 1.08,
        duration: 0.85,
        boxShadow: '0 30px 60px -12px rgba(0,0,0,0.4)',
        ease: 'power3.out'
      }, 0);

      tl.to(nextWrap, {
        opacity: 0,
        duration: 0.35,
        ease: 'power2.in'
      }, 0.65);
    }

    // 4. Stagger reveal next title
    if (titleNext) {
      const nextChars = titleNext.querySelectorAll('.char-span');
      gsap.set(nextChars, { yPercent: 110, opacity: 0 });
      tl.to(nextChars, {
        yPercent: 0,
        opacity: 1,
        stagger: 0.025,
        duration: 0.65,
        ease: 'power3.out'
      }, 0.35);
    }
  };

  const handlePrevTransition = () => {
    if (isAnimating) return;
    const prevIdx = (activeIndex - 1 + slides.length) % slides.length;
    setNextIndex(activeIndex);
    setActiveIndex(prevIdx);
  };

  return (
    <div 
      ref={containerRef}
      className={`relative w-full rounded-3xl overflow-hidden bg-[#161412] text-[#F8F7F3] border border-[#2D2A26] shadow-xl select-none ${className}`}
      style={{ minHeight: '520px' }}
    >
      {/* ACTIVE BACKGROUND SLIDE */}
      <div ref={activeSlideRef} className="absolute inset-0 overflow-hidden">
        <img
          ref={activeImageRef}
          src={currentSlide.image}
          alt={isRTL ? currentSlide.titleAr : currentSlide.title}
          className="w-full h-full object-cover object-center will-change-transform"
        />
        {/* Cinematic Vignette Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-black/45 pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-transparent to-black/40 pointer-events-none" />
      </div>

      {/* TOP HEADER STATUS BAR */}
      <div className="absolute top-4 sm:top-6 inset-x-4 sm:inset-x-8 z-30 flex items-center justify-between gap-3 pointer-events-auto">
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-[10px] tracking-[0.14em] uppercase font-bold text-[#F8F7F3]">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span>{isRTL ? currentSlide.tagAr : currentSlide.tag}</span>
        </div>

        <div className="flex items-center gap-2">
          {/* Spatial Specs Pill */}
          <div className="hidden sm:flex items-center gap-3 px-3.5 py-1.5 rounded-full bg-black/40 backdrop-blur-md border border-white/10 text-[11px] text-[#E8E2D9]">
            <span className="flex items-center gap-1 font-mono text-[#D5C1A7]">
              <Compass className="w-3.5 h-3.5 text-[#B58A54]" />
              {currentSlide.area}
            </span>
            <span className="w-1 h-1 rounded-full bg-white/30" />
            <span className="flex items-center gap-1 font-mono text-[#E8E2D9]">
              <Ruler className="w-3.5 h-3.5 text-[#B58A54]" />
              {currentSlide.ceiling}
            </span>
          </div>

          {/* Quick Studio Action */}
          <button
            onClick={() => navigate('/visualizer')}
            className="flex items-center gap-1.5 px-3 sm:px-4 py-1.5 rounded-full bg-[#F8F7F3] text-[#1E1E1E] text-xs font-bold uppercase tracking-wider hover:bg-white hover:scale-105 active:scale-95 transition-all shadow-md cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#B58A54]" />
            <span className="hidden sm:inline">{isRTL ? 'جرّب بالذكاء الاصطناعي' : 'Launch Studio'}</span>
            <span className="sm:hidden">{isRTL ? 'الاستوديو' : 'Studio'}</span>
          </button>
        </div>
      </div>

      {/* CENTER & BOTTOM CONTENT LAYER */}
      <div className="absolute inset-x-4 sm:inset-x-8 bottom-4 sm:bottom-8 z-20 flex flex-col lg:flex-row lg:items-end justify-between gap-6 pointer-events-none">
        {/* Left: Typographic Title & Description */}
        <div className="max-w-xl space-y-3 pointer-events-auto">
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-[0.16em] text-[#D5C1A7]">
            <span>{isRTL ? currentSlide.locationAr : currentSlide.location}</span>
            <span>·</span>
            <span>{currentSlide.piecesCount} {isRTL ? 'قطع أثاث معتمدة' : 'Verified Pieces'}</span>
          </div>

          <h2 
            ref={titleActiveRef}
            className="text-2xl sm:text-4xl lg:text-5xl font-editorial font-bold tracking-tight text-white leading-tight drop-shadow-sm"
          >
            {renderSplitTitle(isRTL ? currentSlide.titleAr : currentSlide.title)}
          </h2>

          <p className="text-xs sm:text-sm text-[#E2DBD0]/90 leading-relaxed max-w-lg font-light">
            {isRTL ? currentSlide.descriptionAr : currentSlide.description}
          </p>

          {/* Slide Indicator Bar & Action Buttons */}
          <div className="flex items-center gap-3 pt-2">
            <div className="flex items-center gap-1.5">
              {slides.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    if (idx === activeIndex || isAnimating) return;
                    setNextIndex(idx);
                    handleNextTransition();
                  }}
                  className={`h-1.5 rounded-full transition-all duration-500 cursor-pointer ${
                    idx === activeIndex 
                      ? 'w-8 bg-[#B58A54]' 
                      : 'w-2 bg-white/30 hover:bg-white/60'
                  }`}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>
            <span className="text-[11px] font-mono text-[#D5C1A7] tracking-widest pl-2">
              0{activeIndex + 1} / 0{slides.length}
            </span>
          </div>
        </div>

        {/* Right: ATELIER NOVA FLOATING NEXT SLIDE CARD */}
        <div className="flex flex-col items-end gap-3 pointer-events-auto">
          <div className="text-[10px] uppercase font-mono tracking-widest text-[#D5C1A7]/90 flex items-center gap-1.5">
            <Layers className="w-3 h-3 text-[#B58A54]" />
            <span>{isRTL ? 'الزاوية المعمارية التالية' : 'Upcoming Spatial Angle'}</span>
          </div>

          {/* Floating Next Preview Card */}
          <div 
            ref={previewCardRef}
            onClick={handleNextTransition}
            className="group relative w-48 sm:w-56 h-28 sm:h-34 rounded-2xl overflow-hidden border border-white/25 shadow-2xl backdrop-blur-md cursor-pointer transition-transform duration-300 hover:scale-105 active:scale-98"
          >
            <div ref={nextImageWrapRef} className="absolute inset-0 overflow-hidden">
              <img
                ref={nextImageRef}
                src={upcomingSlide.image}
                alt={isRTL ? upcomingSlide.titleAr : upcomingSlide.title}
                className="w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-black/35 group-hover:bg-black/20 transition-colors" />
            </div>

            {/* Floating Card Inner Meta */}
            <div className="absolute inset-0 p-3 flex flex-col justify-between z-10 text-white">
              <div className="flex items-center justify-between text-[9px] font-mono uppercase tracking-wider text-[#D5C1A7]">
                <span>{isRTL ? upcomingSlide.tagAr : upcomingSlide.tag}</span>
                <span className="px-1.5 py-0.5 rounded-sm bg-black/50 text-white">
                  {upcomingSlide.area}
                </span>
              </div>
              <div className="space-y-0.5">
                <p className="text-xs font-editorial font-bold text-white line-clamp-1 group-hover:text-[#D5C1A7] transition-colors">
                  {isRTL ? upcomingSlide.titleAr : upcomingSlide.title}
                </p>
                <div className="flex items-center gap-1 text-[10px] text-white/80 font-medium">
                  <span>{isRTL ? 'انقر للانتقال' : 'Click to transition'}</span>
                  <ArrowIcon className="w-3 h-3 text-[#B58A54] group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </div>
          </div>

          {/* Navigation Controls: Prev / Next */}
          <div className="flex items-center gap-2 pt-1">
            <button
              onClick={handlePrevTransition}
              disabled={isAnimating}
              className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 active:scale-95 text-white border border-white/15 flex items-center justify-center transition shadow-sm cursor-pointer disabled:opacity-40"
              aria-label="Previous Slide"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={handleNextTransition}
              disabled={isAnimating}
              className="w-9 h-9 rounded-full bg-[#F8F7F3] hover:bg-white active:scale-95 text-[#1E1E1E] flex items-center justify-center transition shadow-md cursor-pointer disabled:opacity-40"
              aria-label="Next Slide"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

