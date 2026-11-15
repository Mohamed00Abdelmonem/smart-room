import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useVisualizer } from '../context/VisualizerContext';
import { useLanguage } from '../context/LanguageContext';
import { useCart } from '../context/CartContext';
import { BeforeAfterSlider } from '../components/common/BeforeAfterSlider';
import { LUXURY_PRODUCTS } from '../data/products';
import Antigravity from '../components/common/Antigravity';
import { 
  ArrowRight, 
  ArrowLeft, 
  ChevronDown,
  ChevronRight,
  ChevronLeft,
  ShieldCheck,
  Smartphone,
  CreditCard,
  Percent,
  Sparkles,
  Ruler,
  CheckCircle2,
  Maximize2
} from 'lucide-react';

export const HomePage: React.FC = () => {
  const { openBookDemo, openExperienceA } = useVisualizer();
  const { openPaymentModal } = useCart();
  const { isRTL } = useLanguage();

  const Arrow = isRTL ? ArrowLeft : ArrowRight;

  const heroHotspots = [
    {
      id: 'h1',
      productId: 'sofa-caelum-l',
      x: 48,
      y: 65,
      label: isRTL ? 'كنبة سيلوم زاوية (48,500 ج.م)' : 'Caelum L-Sectional (48,500 EGP)',
    },
    {
      id: 'h2',
      productId: 'table-aura-marble',
      x: 52,
      y: 78,
      label: isRTL ? 'طاولة رخام أورا (14,800 ج.م)' : 'Aura Statuario Coffee Table (14,800 EGP)',
    },
    {
      id: 'h3',
      productId: 'rug-seren-wool',
      x: 35,
      y: 84,
      label: isRTL ? 'سجادة صوف سيرين (8,200 ج.م)' : 'Seren Wool Rug (8,200 EGP)',
    },
  ];

  // Spatial Room Presets Slider
  const [activeSlide, setActiveSlide] = useState(0);
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);
  const [showMeasurements, setShowMeasurements] = useState(true);

  const roomSlides = [
    {
      id: 'living',
      title: isRTL ? 'صالون معاصر مشمس ٠١' : 'Sunlit Contemporary Salon 01',
      tag: isRTL ? '٠١ معيشة' : '01 LIVING',
      image: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1800&q=85',
      nodes: [
        {
          id: 'armchair',
          title: isRTL ? 'كرسي كيفيك إسكندنافي فاخر' : 'Kivik Accent Armchair',
          subtitle: isRTL ? 'إيكيا مصر ٢٠٢٦ · رمادي تيبول' : 'IKEA Egypt 2026 · Tibbleby Grey',
          dims: '88W × 95D × 83H cm',
          price: '12,200 EGP',
          x: 28,
          y: 64,
          clearance: isRTL ? 'مسافة ممر: 1.25 متر' : 'Clearance: 1.25m Walkway',
        },
        {
          id: 'table',
          title: isRTL ? 'طاولة قهوة ليسابو رماد طبيعي' : 'Lisabo Solid Ash Coffee Table',
          subtitle: isRTL ? 'إيكيا مصر ٢٠٢٦ · حائز على Red Dot' : 'IKEA Egypt 2026 · Red Dot Winner',
          dims: '140W × 78D × 45H cm',
          price: '9,995 EGP',
          x: 54,
          y: 74,
          clearance: isRTL ? 'ارتفاع متناسق مع الجلسة' : 'Low Profile Height 45cm',
        },
        {
          id: 'plant',
          title: isRTL ? 'مصباح هليوس المعماري' : 'Helios Architectural Floor Lamp',
          subtitle: isRTL ? 'لوميير ستوديو · زجاج أوبال ثلاثي' : 'Lumière Studio · Triplex Opal Glass',
          dims: '45W × 45D × 175H cm',
          price: '7,400 EGP',
          x: 82,
          y: 56,
          clearance: isRTL ? 'إضاءة زاوية دافئة ٢٧٠٠ كلفن' : 'Corner Ambient Luminescence',
        },
      ],
      measurements: [
        { x1: 28, y1: 64, x2: 54, y2: 74, label: '1.45 m Walkway', midX: 41, midY: 67 },
        { x1: 44, y1: 82, x2: 64, y2: 82, label: '140 cm Width', midX: 54, midY: 82 },
        { x1: 82, y1: 30, x2: 82, y2: 76, label: '1.75 m Height', midX: 84, midY: 53 },
      ],
    },
    {
      id: 'dining',
      title: isRTL ? 'جناح طعام نورديك مشمس ٠٢' : 'Scandinavian Dining Atelier 02',
      tag: isRTL ? '٠٢ طعام' : '02 DINING',
      image: 'https://images.unsplash.com/photo-1617806118233-18e1de247200?auto=format&fit=crop&w=1800&q=85',
      nodes: [
        {
          id: 'd_table',
          title: isRTL ? 'طاولة طعام ليسابو خشب رماد' : 'Lisabo Ash Dining Table',
          subtitle: isRTL ? 'إيكيا مصر ٢٠٢٦ · قشرة رماد متينة' : 'IKEA Egypt 2026 · Ash Veneer',
          dims: '140W × 78D × 74H cm',
          price: '9,995 EGP',
          x: 50,
          y: 65,
          clearance: isRTL ? 'سعة ٤-٦ أفراد' : '4-6 Person Capacity',
        },
        {
          id: 'd_pendant',
          title: isRTL ? 'ثريا لوميير نحاس مصقول' : 'Lumière Brass Drop Pendant',
          subtitle: isRTL ? 'إضاءة دافئة بدون وهج' : 'Anti-glare Warm Downlight',
          dims: '38W × 38D × 120H cm',
          price: '5,800 EGP',
          x: 50,
          y: 28,
          clearance: isRTL ? 'تعليق ٧٥ سم فوق الطاولة' : '75cm Suspension Clearance',
        },
        {
          id: 'd_chairs',
          title: isRTL ? 'كراسي نورديك مينيمال' : 'Nordic Solid Oak Chairs',
          subtitle: isRTL ? 'خشب زان صلب مع راحة مدروسة' : 'Molded Beech & Ergonomics',
          dims: '48W × 52D × 82H cm',
          price: '6,995 EGP',
          x: 26,
          y: 68,
          clearance: isRTL ? 'مجال حركة مريح للخلف' : '85cm Pull-back Zone',
        },
      ],
      measurements: [
        { x1: 50, y1: 28, x2: 50, y2: 65, label: '0.75 m Drop', midX: 52, midY: 46 },
        { x1: 38, y1: 76, x2: 62, y2: 76, label: '1.40 m Table', midX: 50, midY: 76 },
      ],
    },
    {
      id: 'bedroom',
      title: isRTL ? 'جناح النوم الهادئ ٠٣' : 'Minimalist Master Suite 03',
      tag: isRTL ? '٠٣ نوم' : '03 BEDROOM',
      image: 'https://images.unsplash.com/photo-1598928506311-c55ded91a20c?auto=format&fit=crop&w=1800&q=85',
      nodes: [
        {
          id: 'bed',
          title: isRTL ? 'سرير مالم تصميم منخفض هيدروليك' : 'Malm Low Profile Bed Frame',
          subtitle: isRTL ? 'إيكيا مصر ٢٠٢٦ · كينج ١٨٠ سم' : 'IKEA Egypt 2026 · King 180cm',
          dims: '180W × 200L × 100H cm',
          price: '24,995 EGP',
          x: 50,
          y: 64,
          clearance: isRTL ? 'ممرات محيطية ٩٥ سم' : '95cm Clearance',
        },
        {
          id: 'nightstand',
          title: isRTL ? 'كومود هيمنيس صنوبر صلب' : 'Hemnes Solid Pine Nightstand',
          subtitle: isRTL ? 'أرجل خشب صلب كلاسيكي' : 'Solid Pine Craftsmanship',
          dims: '46W × 35D × 70H cm',
          price: '4,495 EGP',
          x: 20,
          y: 68,
          clearance: isRTL ? 'محاذاة ارتفاع المرتبة' : 'Mattress Level Alignment',
        },
        {
          id: 'sconce',
          title: isRTL ? 'إضاءة جدارية زجاج أوبال' : 'Fluted Opal Wall Sconce',
          subtitle: isRTL ? 'إضاءة قراءة مهدئة' : 'Ambient Bedside Illumination',
          dims: '18W × 22D × 32H cm',
          price: '3,850 EGP',
          x: 78,
          y: 44,
          clearance: isRTL ? 'ارتفاع ١٤٠ سم عن الأرضية' : '1.40m Height Datum',
        },
      ],
      measurements: [
        { x1: 34, y1: 76, x2: 66, y2: 76, label: '1.80 m King Span', midX: 50, midY: 76 },
        { x1: 18, y1: 24, x2: 82, y2: 24, label: '2.95 m Ceiling Span', midX: 50, midY: 24 },
      ],
    },
  ];

  const currentSlide = roomSlides[activeSlide];

  // Intersection observers for cinematic slide-in cards
  const [propertyCardVisible, setPropertyCardVisible] = useState(false);
  const propertyCardRef = useRef<HTMLDivElement>(null);

  const [section3CardVisible, setSection3CardVisible] = useState(false);
  const section3Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            if (entry.target === propertyCardRef.current) {
              setPropertyCardVisible(true);
            }
            if (entry.target === section3Ref.current) {
              setSection3CardVisible(true);
            }
          }
        });
      },
      { threshold: 0.15 }
    );

    if (propertyCardRef.current) observer.observe(propertyCardRef.current);
    if (section3Ref.current) observer.observe(section3Ref.current);

    return () => observer.disconnect();
  }, []);

  return (
    <div className="bg-white dark:bg-[#121110] text-[#292722] dark:text-[#F8F7F3] overflow-hidden transition-colors duration-300">
      {/* =========================================================================
          SPLIT-SCREEN HERO & SLIDE SECTION (VESTAIA System)
          ========================================================================= */}
      <section className="w-full min-h-[calc(100vh-80px)] grid grid-cols-1 lg:grid-cols-2 border-b border-[#E2DBD0] dark:border-[#2D2A26]">
        {/* Left Column (Content Panel): #F6F3EE */}
        <div className="bg-[#F6F3EE] dark:bg-[#141210] flex flex-col justify-center px-5 sm:px-8 lg:px-16 py-10 sm:py-12 lg:py-16 transition-colors">
          {/* Eyebrow Badge */}
          <div className="bg-[#EAE2D6] dark:bg-[#25211D] text-[#1E1E1E] dark:text-[#F8F7F3] text-[10px] sm:text-[11px] tracking-[0.14em] uppercase px-3 py-1 sm:px-3.5 sm:py-1.5 rounded-md w-fit mb-4 sm:mb-6 font-semibold select-none">
            {isRTL ? 'الذكاء المكاني للأثاث الفاخر' : 'SPATIAL FURNITURE INTELLIGENCE'}
          </div>

          {/* Headline (<h1>): Modern font like in navbar, responsive sizes leading-[1.08] tracking-[-0.02em] text-[#1E1E1E] mb-6 */}
          <h1 className="text-4xl sm:text-5xl lg:text-[60px] xl:text-[64px] font-bold leading-[1.1] sm:leading-[1.08] tracking-[-0.02em] text-[#1E1E1E] dark:text-white mb-4 sm:mb-6">
            {isRTL ? (
              <>
                صمم مساحتك<br />
                بدقة معمارية<br />
                <span className="text-[#8C6D45]">ذكية.</span>
              </>
            ) : (
              <>
                Curate Your Space<br />
                With Intelligent<br />
                <span className="text-[#8C6D45]">Precision.</span>
              </>
            )}
          </h1>

          {/* Subheadline (<p>): Sans-serif font, text-sm sm:text-base lg:text-lg leading-relaxed text-[#4A4A4A] max-w-md mb-8 sm:mb-10 */}
          <p className="text-sm sm:text-base lg:text-lg leading-relaxed text-[#4A4A4A] dark:text-[#B5B0A8] max-w-md mb-8 sm:mb-10">
            {isRTL
              ? 'اختبر مستقبل الذكاء المكاني. عاين، نسق، ورتب قطع الأثاث الفاخرة بدقة أبعاد متناهية في مساحتك الخاصة.'
              : 'Experience the future of spatial intelligence. Visualize, configure, and curate designer furniture flawlessly in your own home.'}
          </p>

          {/* CTA Button Group: Mobile full-width / Desktop inline */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4">
            {/* Primary Button: Solid dark pill */}
            <Link
              to="/visualizer"
              className="bg-[#1E1E1E] text-[#F6F3EE] dark:bg-[#F8F7F3] dark:text-[#1E1E1E] rounded-full px-7 py-3.5 text-xs tracking-[0.12em] uppercase font-medium flex items-center justify-center gap-2 hover:bg-[#333333] dark:hover:bg-white transition-all shadow-xs cursor-pointer group text-center"
            >
              <span>{isRTL ? 'إطلاق استوديو الذكاء الاصطناعي ↗' : 'LAUNCH AI STUDIO ↗'}</span>
            </Link>

            {/* Secondary Button: Outlined pill */}
            <Link
              to="/integration"
              className="border border-[#1E1E1E] dark:border-[#F8F7F3] text-[#1E1E1E] dark:text-[#F8F7F3] bg-transparent rounded-full px-7 py-3.5 text-xs tracking-[0.12em] uppercase font-medium hover:bg-[#1E1E1E] hover:text-[#F6F3EE] dark:hover:bg-[#F8F7F3] dark:hover:text-[#1E1E1E] transition-all cursor-pointer text-center"
            >
              <span>{isRTL ? 'لمعارض الأثاث' : 'FOR RETAILERS'}</span>
            </Link>
          </div>
        </div>

        {/* Right Column (Interactive Spatial Slider): #EBE5DC */}
        <div className="bg-[#EBE5DC] dark:bg-[#1A1815] p-4 sm:p-6 lg:p-10 flex flex-col justify-center gap-3 sm:gap-4 relative transition-colors w-full">
          {/* Framed rounded image container - Unobstructed view */}
          <div className="w-full aspect-[4/3] sm:aspect-[16/10] lg:aspect-auto lg:h-[520px] xl:h-[580px] rounded-2xl sm:rounded-3xl overflow-hidden relative shadow-sm border border-[#E2DBD0] dark:border-[#2D2A26] bg-[#EAE2D6]/40 select-none group flex items-center justify-center">
            {/* Sunlit Contemporary Room Slide Image */}
            <img
              src={currentSlide.image}
              alt={currentSlide.title}
              key={currentSlide.id}
              className="w-full h-full object-cover object-center animate-in fade-in duration-500"
            />

            {/* Subtle Gradient Vignette to Enhance SVG Lines & Nodes */}
            <div className="absolute inset-0 bg-black/15 pointer-events-none" />

            {/* Top Status Pill: Spatial Calibration Active (Responsive for mobile screen) */}
            <div className="absolute top-3.5 left-3.5 sm:top-5 sm:left-5 z-20 flex items-center gap-1.5 sm:gap-2 bg-[#1E1E1E]/80 dark:bg-[#141210]/90 backdrop-blur-md text-[#F6F3EE] px-2.5 sm:px-3.5 py-1 sm:py-1.5 rounded-full text-[9px] sm:text-[10px] tracking-[0.12em] uppercase font-medium border border-white/10 shadow-xs max-w-[calc(100%-4rem)]">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse shrink-0" />
              <span className="hidden sm:inline truncate">{isRTL ? 'المعايرة المكانية: نشطة · المقياس ١:١' : 'SPATIAL CALIBRATION: ACTIVE · SCALE 1:1'}</span>
              <span className="sm:hidden">{isRTL ? 'معايرة ١:١' : '1:1 SCALE'}</span>
            </div>

            {/* Top Right Tool: Toggle Measurement Overlays */}
            <div className="absolute top-3.5 right-3.5 sm:top-5 sm:right-5 z-20 flex items-center gap-1.5">
              <button
                onClick={() => setShowMeasurements(!showMeasurements)}
                className={`p-2 rounded-full text-xs transition-all backdrop-blur-md shadow-xs cursor-pointer ${
                  showMeasurements
                    ? 'bg-white text-[#1E1E1E] border border-white'
                    : 'bg-[#1E1E1E]/70 text-[#F6F3EE] hover:bg-[#1E1E1E] border border-white/15'
                }`}
                title={showMeasurements ? 'Hide Dimensions' : 'Show Dimensions'}
                aria-label="Toggle spatial dimensions"
              >
                <Ruler className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Interactive SVG Overlay for Spatial Measurement Lines */}
            {showMeasurements && (
              <svg 
                className="absolute inset-0 w-full h-full pointer-events-none z-10" 
                viewBox="0 0 100 100" 
                preserveAspectRatio="none"
              >
                <defs>
                  <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
                    <feDropShadow dx="0" dy="1" stdDeviation="1" floodColor="#000000" floodOpacity="0.6"/>
                  </filter>
                </defs>
                {currentSlide.measurements.map((m, idx) => (
                  <g key={idx} filter="url(#shadow)">
                    {/* Dimension Line */}
                    <line
                      x1={`${m.x1}%`}
                      y1={`${m.y1}%`}
                      x2={`${m.x2}%`}
                      y2={`${m.y2}%`}
                      stroke="#FFFFFF"
                      strokeWidth="0.5"
                      strokeDasharray="1.5 1.5"
                      opacity="0.85"
                    />
                    {/* Tick Mark 1 */}
                    <circle cx={`${m.x1}%`} cy={`${m.y1}%`} r="0.6" fill="#FFFFFF" />
                    {/* Tick Mark 2 */}
                    <circle cx={`${m.x2}%`} cy={`${m.y2}%`} r="0.6" fill="#FFFFFF" />
                  </g>
                ))}
              </svg>
            )}

            {/* HTML Dimension Label Badges rendered on top of SVG lines */}
            {showMeasurements && currentSlide.measurements.map((m, idx) => (
              <div
                key={`badge-${idx}`}
                className="absolute z-15 pointer-events-none transform -translate-x-1/2 -translate-y-1/2 px-1.5 sm:px-2 py-0.5 rounded-md bg-[#1E1E1E]/85 backdrop-blur-md text-[#F6F3EE] text-[8px] sm:text-[9px] font-mono tracking-wider border border-white/20 shadow-xs whitespace-nowrap"
                style={{ left: `${m.midX}%`, top: `${m.midY}%` }}
              >
                {m.label}
              </div>
            ))}

            {/* Interactive Anchor Nodes on Key Furniture Pieces */}
            {currentSlide.nodes.map((node, idx) => {
              const isHovered = hoveredNode === node.id;

              return (
                <div
                  key={node.id}
                  className="absolute z-20 transform -translate-x-1/2 -translate-y-1/2"
                  style={{ left: `${node.x}%`, top: `${node.y}%` }}
                  onMouseEnter={() => setHoveredNode(node.id)}
                  onMouseLeave={() => setHoveredNode(null)}
                  onClick={() => setHoveredNode(isHovered ? null : node.id)}
                >
                  {/* Pulsing ring halo */}
                  <div className="relative flex items-center justify-center cursor-pointer">
                    <span className="absolute -inset-2 rounded-full bg-white/40 animate-ping duration-1000 pointer-events-none" />
                    <button
                      className={`w-6 h-6 sm:w-7 sm:h-7 rounded-full flex items-center justify-center text-[9px] sm:text-[10px] font-bold border transition-all shadow-md ${
                        isHovered
                          ? 'bg-[#1E1E1E] text-white border-white scale-110'
                          : 'bg-white/95 text-[#1E1E1E] border-black/10 hover:scale-105'
                      }`}
                      aria-label={node.title}
                    >
                      <span>0{idx + 1}</span>
                    </button>
                  </div>

                  {/* Sleek Tooltip Popover on Hover / Click */}
                  {isHovered && (
                    <div 
                      className={`absolute z-30 bottom-8 ${
                        node.x > 60 ? 'right-0' : node.x < 40 ? 'left-0' : '-left-20 sm:-left-24'
                      } w-56 sm:w-64 bg-white/95 dark:bg-[#1A1815]/95 backdrop-blur-md rounded-xl p-3 sm:p-3.5 border border-[#E2DBD0] dark:border-[#3D3833] shadow-xl text-start animate-in fade-in zoom-in-95 duration-150`}
                    >
                      <div className="flex items-center justify-between gap-2 pb-1.5 border-b border-[#E2DBD0]/60 dark:border-[#2D2A26] mb-1.5 sm:mb-2">
                        <span className="text-[9px] uppercase tracking-wider font-bold text-[#8C6D45] truncate">
                          {node.subtitle}
                        </span>
                        <div className="flex items-center gap-1 text-[9px] font-semibold text-emerald-600 dark:text-emerald-400 shrink-0">
                          <CheckCircle2 className="w-3 h-3" />
                          <span>{isRTL ? 'مطابق ١:١' : 'True Fit'}</span>
                        </div>
                      </div>

                      <h4 className="font-editorial text-xs sm:text-sm font-bold text-[#1E1E1E] dark:text-white leading-tight mb-1">
                        {node.title}
                      </h4>

                      <div className="flex items-center justify-between text-xs text-[#4A4A4A] dark:text-[#A39E96] pt-0.5 sm:pt-1">
                        <span className="font-mono text-[9px] sm:text-[10px] bg-[#EAE2D6] dark:bg-[#25211D] px-1.5 py-0.5 rounded text-[#1E1E1E] dark:text-[#F8F7F3]">
                          {node.dims}
                        </span>
                        <span className="font-bold text-[11px] sm:text-xs text-[#1E1E1E] dark:text-white">
                          {node.price}
                        </span>
                      </div>

                      <p className="text-[9px] sm:text-[10px] text-[#6E6A63] dark:text-[#A39E96] mt-1.5 sm:mt-2 italic border-t border-[#E2DBD0]/40 dark:border-[#2D2A26] pt-1 truncate">
                        {node.clearance}
                      </p>

                      <div className="mt-2 pt-1.5 sm:pt-2 border-t border-[#E2DBD0]/60 dark:border-[#2D2A26] flex items-center justify-between gap-2">
                        <Link
                          to="/showroom"
                          className="text-[9px] sm:text-[10px] uppercase tracking-wider font-bold text-[#1E1E1E] dark:text-white hover:underline flex items-center gap-1"
                        >
                          <span>{isRTL ? 'معاينة' : 'Showroom'}</span>
                          <Arrow className="w-2.5 h-2.5" />
                        </Link>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            openExperienceA();
                          }}
                          className="px-2 py-1 rounded bg-[#1E1E1E] text-white text-[9px] font-bold uppercase tracking-wider hover:bg-[#333333] transition"
                        >
                          {isRTL ? 'جرّب في غرفتك' : 'Try in Room'}
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* DEDICATED SLIDER CONTROL BAR BELOW THE IMAGE (Down image, not in image) */}
          <div className="w-full flex items-center justify-between gap-2 p-1.5 sm:p-2 rounded-2xl bg-[#EAE2D6]/70 dark:bg-[#141210]/70 backdrop-blur-md border border-[#E2DBD0] dark:border-[#2D2A26] shadow-xs">
            {/* Presets Tab Switcher */}
            <div className="flex items-center gap-1 flex-1 sm:flex-initial">
              {roomSlides.map((slide, idx) => (
                <button
                  key={slide.id}
                  onClick={() => {
                    setActiveSlide(idx);
                    setHoveredNode(null);
                  }}
                  className={`flex-1 sm:flex-initial px-2.5 sm:px-4 py-2 sm:py-1.5 rounded-xl text-[10px] sm:text-[11px] tracking-[0.12em] uppercase font-bold transition-all text-center whitespace-nowrap cursor-pointer ${
                    activeSlide === idx
                      ? 'bg-[#1E1E1E] text-[#F6F3EE] dark:bg-[#F8F7F3] dark:text-[#1E1E1E] shadow-sm'
                      : 'text-[#6E6A63] hover:text-[#1E1E1E] dark:text-[#A39E96] dark:hover:text-white hover:bg-[#EAE2D6] dark:hover:bg-[#25211D]'
                  }`}
                >
                  {slide.tag}
                </button>
              ))}
            </div>

            {/* Prev / Next Arrows */}
            <div className="flex items-center gap-1 shrink-0">
              <button
                onClick={() => {
                  setActiveSlide((prev) => (prev === 0 ? roomSlides.length - 1 : prev - 1));
                  setHoveredNode(null);
                }}
                className="w-8 h-8 rounded-xl bg-white dark:bg-[#1E1C1A] hover:bg-[#F6F3EE] dark:hover:bg-[#25211D] border border-[#E2DBD0] dark:border-[#2D2A26] text-[#1E1E1E] dark:text-white flex items-center justify-center transition shadow-2xs cursor-pointer active:scale-95"
                aria-label="Previous room preset"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={() => {
                  setActiveSlide((prev) => (prev === roomSlides.length - 1 ? 0 : prev + 1));
                  setHoveredNode(null);
                }}
                className="w-8 h-8 rounded-xl bg-white dark:bg-[#1E1C1A] hover:bg-[#F6F3EE] dark:hover:bg-[#25211D] border border-[#E2DBD0] dark:border-[#2D2A26] text-[#1E1E1E] dark:text-white flex items-center justify-center transition shadow-2xs cursor-pointer active:scale-95"
                aria-label="Next room preset"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          EGYPTIAN PAYMENT GATEWAYS STRIP (CBE Standards, InstaPay & ValU)
          ========================================================================= */}
      <section className="bg-[#F8F7F3] dark:bg-[#181614] border-y border-[#E8E2D9] dark:border-[#2D2A26] py-5 px-4 sm:px-8 transition-colors">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#292722] text-white dark:bg-[#F8F7F3] dark:text-[#292722] flex items-center justify-center shrink-0 shadow-xs">
              <ShieldCheck className="w-5 h-5 text-[#B58A54]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-editorial font-bold text-sm text-[#292722] dark:text-[#F8F7F3]">
                  {isRTL ? 'معتمد رسمياً للمدفوعات وتقسيط الأثاث في مصر' : 'Certified Egyptian Furniture Checkout & Installments'}
                </span>
                <span className="px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 text-[9px] font-bold uppercase tracking-wider">
                  CBE 2026
                </span>
              </div>
              <p className="text-[11px] text-[#6E6A63] dark:text-[#A39E96]">
                {isRTL ? 'تحويل لحظي إنستاباي · محافظ كاش · كروت ميزة الوطنية · تقسيط فاليو 0% فوائد · فوري' : 'InstaPay (IPN) · Mobile Wallets · Meeza Cards · ValU 0% Installments · Fawry Pay'}
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-2.5">
            <button
              onClick={() => openPaymentModal(48500, isRTL ? 'تجربة سداد صالون سيلوم المعماري' : 'Caelum Architectural Sofa Simulation')}
              className="px-3 py-1.5 rounded-xl bg-white dark:bg-[#25211D] border border-[#E8E2D9] dark:border-[#3D3833] hover:border-[#B58A54] text-xs font-bold text-[#292722] dark:text-[#F8F7F3] flex items-center gap-2 shadow-xs cursor-pointer transition-all"
            >
              <div className="w-4 h-4 rounded-full bg-[#532677] text-white flex items-center justify-center text-[8px] font-black">
                IPN
              </div>
              <span>{isRTL ? 'إنستاباي لحظي' : 'InstaPay'}</span>
            </button>

            <button
              onClick={() => openPaymentModal(48500, isRTL ? 'تجربة سداد بالمحفظة الإلكترونية' : 'Mobile Wallet Simulation')}
              className="px-3 py-1.5 rounded-xl bg-white dark:bg-[#25211D] border border-[#E8E2D9] dark:border-[#3D3833] hover:border-[#B58A54] text-xs font-bold text-[#292722] dark:text-[#F8F7F3] flex items-center gap-2 shadow-xs cursor-pointer transition-all"
            >
              <Smartphone className="w-3.5 h-3.5 text-red-600" />
              <span>{isRTL ? 'فودافون كاش' : 'Vodafone Cash'}</span>
            </button>

            <button
              onClick={() => openPaymentModal(48500, isRTL ? 'تجربة سداد ببطاقة ميزة الوطنية' : 'Meeza National Card Simulation')}
              className="px-3 py-1.5 rounded-xl bg-white dark:bg-[#25211D] border border-[#E8E2D9] dark:border-[#3D3833] hover:border-[#B58A54] text-xs font-bold text-[#292722] dark:text-[#F8F7F3] flex items-center gap-2 shadow-xs cursor-pointer transition-all"
            >
              <CreditCard className="w-3.5 h-3.5 text-blue-600" />
              <span>{isRTL ? 'ميزة الوطنية' : 'Meeza'}</span>
            </button>

            <button
              onClick={() => openPaymentModal(48500, isRTL ? 'تجربة خطة تقسيط ValU بدون فوائد' : 'ValU 0% Installments Simulation')}
              className="px-3 py-1.5 rounded-xl bg-white dark:bg-[#25211D] border border-[#E8E2D9] dark:border-[#3D3833] hover:border-[#B58A54] text-xs font-bold text-[#292722] dark:text-[#F8F7F3] flex items-center gap-2 shadow-xs cursor-pointer transition-all"
            >
              <Percent className="w-3.5 h-3.5 text-amber-600" />
              <span className="text-emerald-700 dark:text-emerald-400">{isRTL ? 'تقسيط 0% ValU' : 'ValU 0%'}</span>
            </button>

            <button
              onClick={() => openPaymentModal(48500, isRTL ? 'إصدار كود دفع فوري وأمان' : 'Fawry Pay Kiosk Code')}
              className="px-3 py-1.5 rounded-xl bg-white dark:bg-[#25211D] border border-[#E8E2D9] dark:border-[#3D3833] hover:border-[#B58A54] text-xs font-bold text-[#292722] dark:text-[#F8F7F3] flex items-center gap-2 shadow-xs cursor-pointer transition-all"
            >
              <span className="font-black text-[9px] text-yellow-700 dark:text-yellow-400">FAWRY</span>
              <span>{isRTL ? 'كود فوري' : 'Fawry'}</span>
            </button>
          </div>
        </div>
      </section>


      {/* =========================================================================
          SECTION 1 – THE EXPERIENCE (VESTAIA Pure White & Warm Ivory Atelier)
          ========================================================================= */}
      <section id="about" className="py-20 sm:py-32 bg-[#F6F3EE] dark:bg-[#141210] border-t border-[#E2DBD0] dark:border-[#2D2A26] transition-colors">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
          {/* Section Header Strip */}
          <div className="flex items-center justify-between pb-6 mb-12 sm:mb-16 border-b border-[#E2DBD0] dark:border-[#2D2A26]">
            <div className="flex items-center gap-2.5">
              <span className="w-2 h-2 rounded-full bg-[#1E1E1E] dark:bg-[#F8F7F3]" />
              <span className="text-[11px] uppercase tracking-[0.2em] font-bold text-[#1E1E1E] dark:text-[#F8F7F3]">
                {isRTL ? '٠١ / الفلسفة المكانية' : '01 / SPATIAL PHILOSOPHY'}
              </span>
            </div>
            <span className="text-[10px] font-mono text-[#8C6D45] uppercase tracking-widest bg-[#EAE2D6] dark:bg-[#25211D] px-2.5 py-1 rounded-md font-semibold">
              ATELIER SUITE 2026
            </span>
          </div>

          {/* Balanced Editorial Split Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
            {/* Left Column: Real Designer Interior Architecture Photography */}
            <div className="lg:col-span-7 relative group" ref={propertyCardRef}>
              <div className="relative aspect-[4/3] rounded-3xl overflow-hidden bg-[#EBE5DC] dark:bg-[#1E1C1A] shadow-md border border-[#E2DBD0] dark:border-[#2D2A26]">
                <img
                  src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1800&q=85"
                  alt="Curated Contemporary Interior Architecture"
                  className="w-full h-full object-cover object-center transform group-hover:scale-105 transition-transform duration-1000 ease-out"
                />

                {/* Subtle Ambient Vignette */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/10 pointer-events-none" />

                {/* Top Corner Calibration Badge */}
                <div className="absolute top-4 left-4 z-10 flex items-center gap-2 bg-[#1E1E1E]/80 backdrop-blur-md text-[#F6F3EE] px-3 py-1 rounded-full text-[9px] uppercase tracking-wider font-semibold border border-white/10 shadow-xs">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span>{isRTL ? 'معايرة هندسية حقيقية' : 'True-to-Scale 1:1'}</span>
                </div>

                {/* Floating Architectural Property Information Card */}
                <div 
                  className={`absolute bottom-3 sm:bottom-5 ${
                    isRTL ? 'left-3 sm:left-5' : 'right-3 sm:right-5'
                  } z-10 p-3.5 sm:p-4 rounded-2xl bg-[#F6F3EE]/90 dark:bg-[#1A1815]/90 backdrop-blur-xl border border-[#E2DBD0]/80 dark:border-[#2D2A26] w-[calc(100%-1.5rem)] sm:w-auto max-w-[320px] sm:max-w-[350px] text-xs shadow-xl space-y-1.5 transition-all duration-300 hover:shadow-2xl hover:border-[#8C6D45]/40 select-none ${
                    propertyCardVisible
                      ? 'animate-property-card-float'
                      : 'opacity-0 translate-x-8 pointer-events-none'
                  }`}
                >
                  <div className="flex items-center justify-between gap-3">
                    <p className="font-bold text-xs sm:text-sm text-[#1E1E1E] dark:text-[#F8F7F3] leading-snug">
                      {isRTL ? 'صالون المرمر وخشب الرماد المدخن' : 'The Alabaster & Smoked Ash Salon'}
                    </p>
                    <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-[#EAE2D6] dark:bg-[#25211D] text-[#1E1E1E] dark:text-[#F8F7F3] shrink-0 font-medium">
                      38m²
                    </span>
                  </div>
                  <p className="text-[10px] sm:text-[11px] text-[#6E6A63] dark:text-[#A39E96] leading-tight">
                    {isRTL ? 'كتالوج معتمد رسمياً · مركز الشيخ زايد للمعارض الفاخرة' : 'Certified Retailer Catalog Composition · Sheikh Zayed Hub'}
                  </p>
                  <div className="flex items-center gap-2 pt-1 border-t border-[#E2DBD0]/60 dark:border-[#2D2A26] text-[10px] text-[#8C6D45] font-semibold">
                    <span>✓ {isRTL ? 'ارتفاع السقف: ٢.٩م' : '2.9m Ceiling Datum'}</span>
                    <span>·</span>
                    <span>✓ {isRTL ? 'ممرات حركة مريحة' : 'Optimal Walkways'}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Editorial Typography & Stat Cards in Plus Jakarta Sans */}
            <div className="lg:col-span-5 space-y-7">
              {/* Eyebrow Pill */}
              <div className="bg-[#EAE2D6] dark:bg-[#25211D] text-[#1E1E1E] dark:text-[#F8F7F3] text-[10px] sm:text-[11px] tracking-[0.14em] uppercase px-3 py-1 rounded-md w-fit font-semibold select-none">
                {isRTL ? 'التحول المعماري الرقمي' : 'THE ARCHITECTURAL SHIFT'}
              </div>

              {/* Headline in Plus Jakarta Sans */}
              <h2 className="text-3xl sm:text-4xl lg:text-[44px] font-bold leading-[1.14] tracking-[-0.02em] text-[#1E1E1E] dark:text-[#F8F7F3]">
                {isRTL ? (
                  <>
                    أكثر من مجرد أثاث.<br />
                    <span className="text-[#8C6D45]">رؤية جديدة لمساحتك الخاصة.</span>
                  </>
                ) : (
                  <>
                    More Than Furniture.<br />
                    <span className="text-[#8C6D45]">A New Way To See Your Space.</span>
                  </>
                )}
              </h2>

              {/* Body Prose */}
              <p className="text-sm sm:text-base text-[#4A4A4A] dark:text-[#A39E96] leading-relaxed font-normal">
                {isRTL
                  ? 'لطالما كانت تجربة شراء الأثاث الفاخر محاطة بالتردد: محاولة تخيل تناسق الأقمشة، الخوف من عدم ملائمة الأبعاد للمداخل، والقلق من خيبة الأمل بعد التسليم. تمنحك فيستايا يقيناً تاماً بوضع قطع الأثاث المعتمدة داخل منزلك بضوئها الطبيعي ونسبها الحقيقية.'
                  : 'For decades, acquiring luxury furniture required a leap of faith: guessing how proportions interact with daylight, hoping upholstery tones harmonize with your flooring, and praying sectionals clear elevator doors. VESTAIA bridges the imagination gap by placing certified showroom digital twins directly inside your space.'}
              </p>

              {/* Upgraded Feature Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-[#1A1815] border border-[#E2DBD0] dark:border-[#2D2A26] shadow-xs space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono font-bold text-[#8C6D45] bg-[#EAE2D6] dark:bg-[#25211D] px-2 py-0.5 rounded">01</span>
                    <span className="text-[10px] uppercase font-bold text-[#1E1E1E] dark:text-white tracking-wider">{isRTL ? 'دقة ملمترية' : 'PRECISION'}</span>
                  </div>
                  <h4 className="font-bold text-sm text-[#1E1E1E] dark:text-[#F8F7F3]">{isRTL ? 'مقاسات دقيقة ١:١' : 'True-to-Scale Fit'}</h4>
                  <p className="text-[#6E6A63] dark:text-[#A39E96] text-xs leading-relaxed">
                    {isRTL ? 'فحص تلقائي لمسارات فتح الأبواب وعرض الممرات ومصاعد العمارات.' : 'Millimeter clearance audits verify door swings, pathways, and elevator clearance.'}
                  </p>
                </div>

                <div className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-[#1A1815] border border-[#E2DBD0] dark:border-[#2D2A26] shadow-xs space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono font-bold text-[#8C6D45] bg-[#EAE2D6] dark:bg-[#25211D] px-2 py-0.5 rounded">02</span>
                    <span className="text-[10px] uppercase font-bold text-[#1E1E1E] dark:text-white tracking-wider">{isRTL ? 'إضاءة طبيعية' : 'DAYLIGHT'}</span>
                  </div>
                  <h4 className="font-bold text-sm text-[#1E1E1E] dark:text-[#F8F7F3]">{isRTL ? 'محاكاة واقعية للظلال' : 'Ambient Realism'}</h4>
                  <p className="text-[#6E6A63] dark:text-[#A39E96] text-xs leading-relaxed">
                    {isRTL ? 'محاكاة ثلاثية الأبعاد لاتجاه أشعة الشمس من نوافذ غرفتك الفعلية.' : 'Ray-traced shadow simulation matches your room\'s actual window angles.'}
                  </p>
                </div>
              </div>

              {/* Action Button */}
              <div className="pt-2">
                <Link
                  to="/showroom"
                  className="inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-full bg-[#1E1E1E] hover:bg-[#333333] text-[#F6F3EE] dark:bg-[#F8F7F3] dark:hover:bg-white dark:text-[#1E1E1E] text-xs uppercase tracking-[0.12em] font-bold transition-all shadow-xs cursor-pointer group"
                >
                  <span>{isRTL ? 'استكشف تشكيلة المعرض الحقيقية' : 'EXPLORE SHOWROOM CATALOG'}</span>
                  <Arrow className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* =========================================================================
          SECTION 2 – VISUALIZE YOUR FURNITURE (Warm Sand Subtle Contrast)
          ========================================================================= */}
      <section className="py-24 sm:py-32 bg-[#EBE5DC]/40 dark:bg-[#181614] border-t border-[#E2DBD0] dark:border-[#2D2A26] transition-colors">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 space-y-14">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 border-b border-[#E2DBD0] dark:border-[#2D2A26] pb-8">
            <div className="space-y-3 max-w-2xl">
              <span className="inline-block bg-[#EAE2D6] dark:bg-[#25211D] text-[#1E1E1E] dark:text-[#EAE2D6] text-[11px] tracking-[0.14em] uppercase px-3.5 py-1.5 rounded-md font-semibold">
                {isRTL ? '٠٢ / معاينة القطعة في غرفتك' : '02 / INDIVIDUAL PIECE PLACEMENT'}
              </span>
              <h2 className="text-3xl sm:text-4xl lg:text-[44px] font-bold tracking-[-0.02em] text-[#1E1E1E] dark:text-[#F8F7F3] leading-[1.14]">
                {isRTL ? (
                  <>
                    عاينه في مساحتك.<br />
                    <span className="text-[#8C6D45]">قبل أن يصبح</span> ملكك.
                  </>
                ) : (
                  <>
                    See It In Your Space.<br />
                    <span className="text-[#8C6D45]">Before It's</span> Yours.
                  </>
                )}
              </h2>
            </div>

            <div className="space-y-4 max-w-md">
              <p className="text-xs sm:text-sm text-[#4A4A4A] dark:text-[#A39E96] leading-relaxed font-normal">
                {isRTL
                  ? 'لا مزيد من أشرطة القياس والحيرة. اختر أي قطعة من كتالوج المعارض الشريكة، وارفع صورة من هاتفك لتشاهدها موضوعة بحجمها الحقيقي وتفاصيل خاماتها.'
                  : 'No more tape measures and hesitation. Browse any piece in our retail partner showrooms, upload a smartphone photo of your room, and witness that exact sofa or table rendered at true scale with ambient light and directional shadows.'}
              </p>
              <button
                onClick={() => openExperienceA(LUXURY_PRODUCTS[0])}
                className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full bg-[#1E1E1E] hover:bg-[#333333] text-[#F6F3EE] dark:bg-[#F8F7F3] dark:hover:bg-white dark:text-[#1E1E1E] text-xs uppercase tracking-[0.12em] font-bold transition-all cursor-pointer shadow-xs"
              >
                <span>{isRTL ? 'جرّب المعاينة الآن' : 'TRY THE VISUALIZER'}</span>
                <Arrow className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Large Before/After Composition */}
          <div className="rounded-3xl overflow-hidden border border-[#E2DBD0] dark:border-[#2D2A26] shadow-sm bg-white dark:bg-[#121110]">
            <BeforeAfterSlider
              beforeImage="https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=2200&q=85"
              afterImage="https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=2200&q=85"
              beforeLabel={isRTL ? 'الغرفة الأصلية الفارغة' : 'RAW CUSTOMER ROOM'}
              afterLabel={isRTL ? 'مؤثثة بقطع فيستايا المعتمدة' : 'VESTAIA SCALE-PLACED'}
              hotspots={heroHotspots}
              onHotspotClick={() => openExperienceA(LUXURY_PRODUCTS[0])}
              aspectRatio="aspect-[16/10] sm:aspect-[21/10]"
            />
          </div>

          {/* Under-slider details */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 pt-2 text-xs">
            <div className="p-5 rounded-2xl bg-white dark:bg-[#1A1815] border border-[#E2DBD0] dark:border-[#2D2A26] space-y-1.5 shadow-xs">
              <span className="font-bold text-[#1E1E1E] dark:text-[#F8F7F3] uppercase tracking-wider block">{isRTL ? 'منتج معتمد وأصيل' : 'Authentic Catalog SKU'}</span>
              <p className="text-[#6E6A63] dark:text-[#A39E96] leading-relaxed">
                {isRTL ? 'القطعة المعروضة مطابقة للمخزون الفعلي القابل للتسليم بمصر.' : 'The rendered item matches the exact SKU available in retail fulfillment.'}
              </p>
            </div>
            <div className="p-5 rounded-2xl bg-white dark:bg-[#1A1815] border border-[#E2DBD0] dark:border-[#2D2A26] space-y-1.5 shadow-xs">
              <span className="font-bold text-[#1E1E1E] dark:text-[#F8F7F3] uppercase tracking-wider block">{isRTL ? 'فحص الممرات والأبواب' : 'Spatial Flow Verification'}</span>
              <p className="text-[#6E6A63] dark:text-[#A39E96] leading-relaxed">
                {isRTL ? 'يتحقق النظام من ترك مسافة 110 سم على الأقل لحرية المرور.' : 'System validates minimum 110cm circulation pathways.'}
              </p>
            </div>
            <div className="p-5 rounded-2xl bg-white dark:bg-[#1A1815] border border-[#E2DBD0] dark:border-[#2D2A26] space-y-1.5 shadow-xs">
              <span className="font-bold text-[#1E1E1E] dark:text-[#F8F7F3] uppercase tracking-wider block">{isRTL ? 'تنسيق المواد والألوان' : 'Material Harmonization'}</span>
              <p className="text-[#6E6A63] dark:text-[#A39E96] leading-relaxed">
                {isRTL ? 'يقيم تناغم قماش البوكليه ورخام ستاتوريو مع أرضيات الغرفة.' : 'Evaluates bouclé texture and marble tones against your existing floor.'}
              </p>
            </div>
          </div>
        </div>
      </section>


      {/* =========================================================================
          SECTION 3 – DESIGN YOUR ENTIRE ROOM (Warm Alabaster Studio Workspace)
          ========================================================================= */}
      <section className="py-24 sm:py-32 bg-[#F6F3EE] dark:bg-[#121110] border-t border-[#E2DBD0] dark:border-[#2D2A26] transition-colors">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          {/* Eyebrow */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-6 mb-10 sm:mb-12 border-b border-[#E2DBD0] dark:border-[#2D2A26]">
            <span className="inline-block bg-[#EAE2D6] dark:bg-[#25211D] text-[#1E1E1E] dark:text-[#EAE2D6] text-[11px] tracking-[0.14em] uppercase px-3.5 py-1.5 rounded-md font-semibold w-fit">
              {isRTL ? '٠٣ / تأثيث الغرفة المتكاملة' : '03 / COMPLETE ROOM DESIGN'}
            </span>
            <span className="text-[11px] font-mono text-[#6E6A63] dark:text-[#A39E96] uppercase tracking-widest font-medium">
              BUDGET & SPATIAL CURATION
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            {/* Left Content (5 cols) */}
            <div className="lg:col-span-5 space-y-8 order-2 lg:order-1">
              <h2 className="text-3xl sm:text-4xl lg:text-[44px] font-bold leading-[1.14] tracking-[-0.02em] text-[#1E1E1E] dark:text-[#F8F7F3]">
                {isRTL ? (
                  <>
                    غرفة أحلامك.<br />
                    <span className="text-[#8C6D45]">في حدود ميزانيتك</span> تماماً.
                  </>
                ) : (
                  <>
                    Your Dream Room.<br />
                    <span className="text-[#8C6D45]">Strictly Within</span> Your Budget.
                  </>
                )}
              </h2>

              <p className="text-sm sm:text-base text-[#4A4A4A] dark:text-[#A39E96] leading-relaxed font-normal">
                {isRTL
                  ? 'حوّل أي غرفة إلى تحفة معمارية متناسقة. أدخل مقاسات جدرانك، وحدد ميزانيتك بالجنيه المصري، واكتب رؤيتك بكلماتك البسيطة. يقوم منسق فيستايا الذكي باختيار وترتيب قطع أثاث متوافقة من كتالوج المعرض الفعلي دون تجاوز ميزانيتك.'
                  : 'Transform an entire empty room or apartment into an architecturally coordinated sanctuary. Enter your room dimensions, state your target budget, and express your stylistic desires in natural language. VESTAIA matches and arranges certified pieces from real showrooms, strictly within budget.'}
              </p>

              {/* 4 Steps Checklist in White / Alabaster Cards */}
              <div className="space-y-3 pt-2 text-xs">
                <div className="flex items-start gap-3 p-4 sm:p-4.5 rounded-2xl bg-white dark:bg-[#1A1815] border border-[#E2DBD0] dark:border-[#2D2A26] shadow-xs">
                  <span className="font-mono text-[#8C6D45] font-bold bg-[#EAE2D6] dark:bg-[#25211D] px-2 py-0.5 rounded text-[11px]">01</span>
                  <div>
                    <h5 className="font-bold text-[#1E1E1E] dark:text-[#F8F7F3] uppercase tracking-wider">{isRTL ? 'رفع صور متعددة للغرفة' : 'Upload Multiple Room Angles'}</h5>
                    <p className="text-[#6E6A63] dark:text-[#A39E96] text-[11px] mt-0.5">{isRTL ? 'منظور أمامي، زوايا، ومصادر الضوء الطبيعي' : 'Front view, corner perspectives, and window daylight angles'}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-4 sm:p-4.5 rounded-2xl bg-white dark:bg-[#1A1815] border border-[#E2DBD0] dark:border-[#2D2A26] shadow-xs">
                  <span className="font-mono text-[#8C6D45] font-bold bg-[#EAE2D6] dark:bg-[#25211D] px-2 py-0.5 rounded text-[11px]">02</span>
                  <div>
                    <h5 className="font-bold text-[#1E1E1E] dark:text-[#F8F7F3] uppercase tracking-wider">{isRTL ? 'وصف النمط المفضل' : 'Describe Your Desired Style'}</h5>
                    <p className="text-[#6E6A63] dark:text-[#A39E96] text-[11px] mt-0.5">{isRTL ? 'مينيمالي، مودرن، معاصر، أو إسكندنافي هادئ' : 'Warm minimalist, modern architectural, contemporary, or Nordic calm'}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-4 sm:p-4.5 rounded-2xl bg-white dark:bg-[#1A1815] border border-[#E2DBD0] dark:border-[#2D2A26] shadow-xs">
                  <span className="font-mono text-[#8C6D45] font-bold bg-[#EAE2D6] dark:bg-[#25211D] px-2 py-0.5 rounded text-[11px]">03</span>
                  <div>
                    <h5 className="font-bold text-[#1E1E1E] dark:text-[#F8F7F3] uppercase tracking-wider">{isRTL ? 'تحديد الميزانية الكلية' : 'Set Your Total Budget'}</h5>
                    <p className="text-[#6E6A63] dark:text-[#A39E96] text-[11px] mt-0.5">{isRTL ? 'التحكم الدقيق بالجنيه المصري (مثلاً 80,000 ج.م)' : 'Exact spend control in EGP with itemized breakdown'}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-4 sm:p-4.5 rounded-2xl bg-white dark:bg-[#1A1815] border border-[#E2DBD0] dark:border-[#2D2A26] shadow-xs">
                  <span className="font-mono text-[#8C6D45] font-bold bg-[#EAE2D6] dark:bg-[#25211D] px-2 py-0.5 rounded text-[11px]">04</span>
                  <div>
                    <h5 className="font-bold text-[#1E1E1E] dark:text-[#F8F7F3] uppercase tracking-wider">{isRTL ? 'تنسيق كتالوج المعرض الفعلي' : 'Coordinated Showroom Recommendation'}</h5>
                    <p className="text-[#6E6A63] dark:text-[#A39E96] text-[11px] mt-0.5">{isRTL ? 'قطع أثاث حقيقية متوفرة بمستودعات القاهرة للتسليم' : 'Real in-stock pieces mapped into your actual room photo'}</p>
                  </div>
                </div>
              </div>

              <div className="pt-2">
                <Link
                  to="/visualizer"
                  className="inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-full bg-[#1E1E1E] hover:bg-[#333333] text-[#F6F3EE] dark:bg-[#F8F7F3] dark:hover:bg-white dark:text-[#1E1E1E] text-xs uppercase tracking-[0.12em] font-bold transition-all shadow-xs group cursor-pointer"
                >
                  <span>{isRTL ? 'ابدأ مصمم الغرف بالذكاء الاصطناعي' : 'START ROOM DESIGNER'}</span>
                  <Arrow className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>

            {/* Right Large Image with Sample Prompt Overlay (7 cols) */}
            <div className="lg:col-span-7 order-1 lg:order-2 space-y-6" ref={section3Ref}>
              <div className="relative aspect-[4/3] sm:aspect-[16/10] lg:aspect-auto lg:h-[500px] rounded-3xl overflow-hidden bg-stone-900 shadow-md border border-[#E2DBD0] dark:border-[#2D2A26] group">
                <img
                  src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1800&q=85"
                  alt="Coordinated Living Room Interior Design"
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-1000 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/15 pointer-events-none" />

                {/* Top Corner Calibration Badge */}
                <div className="absolute top-4 left-4 z-10 flex items-center gap-2 bg-[#1E1E1E]/80 backdrop-blur-md text-[#F6F3EE] px-3 py-1 rounded-full text-[9px] uppercase tracking-wider font-semibold border border-white/10 shadow-xs">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span>{isRTL ? 'تنسيق مكاني ذكي' : 'Spatial AI Curation'}</span>
                </div>

                {/* Floating Customer Prompt Card with Slide-In Animation */}
                <div 
                  className={`absolute bottom-3 sm:bottom-5 ${
                    isRTL ? 'left-3 sm:left-5' : 'right-3 sm:right-5'
                  } z-10 p-3.5 sm:p-4 rounded-2xl bg-[#F6F3EE]/90 dark:bg-[#1A1815]/90 backdrop-blur-xl border border-[#E2DBD0]/80 dark:border-[#2D2A26] w-[calc(100%-1.5rem)] sm:w-auto max-w-[320px] sm:max-w-[360px] text-xs shadow-xl space-y-2 transition-all duration-300 hover:shadow-2xl hover:border-[#8C6D45]/40 select-none ${
                    section3CardVisible
                      ? 'animate-property-card-float'
                      : 'opacity-0 translate-x-8 pointer-events-none'
                  }`}
                >
                  <div className="flex items-center justify-between text-xs pb-1 border-b border-[#E2DBD0]/60 dark:border-[#2D2A26]">
                    <span className="uppercase tracking-[0.14em] font-bold text-[#8C6D45] text-[10px] sm:text-[11px]">
                      {isRTL ? 'طلب العميل' : 'CUSTOMER PROMPT'}
                    </span>
                    <span className="font-mono text-emerald-700 dark:text-emerald-400 font-bold text-[10px] sm:text-[11px]">
                      {isRTL ? 'الميزانية: 80,000 ج.م' : 'Budget: 80,000 EGP'}
                    </span>
                  </div>
                  <p className="text-[11px] sm:text-xs font-medium text-[#1E1E1E] dark:text-[#F8F7F3] leading-relaxed line-clamp-3 sm:line-clamp-4">
                    {isRTL
                      ? '«أريد تأثيث غرفة المعيشة بأسلوب مينيمالي حديث. ميزانيتي 80,000 ج.م. أحتاج لكنبة مريحة على شكل حرف L، وحدة تلفزيون، طاولة قهوة وسجادة.»'
                      : '"Modern minimalist living room: comfortable L-sofa, media console, coffee table, and area rug. Warm beige and natural oak palette."'}
                  </p>
                  <div className="flex items-center justify-between text-[10px] sm:text-[11px] text-[#6E6A63] dark:text-[#A39E96] pt-1.5 border-t border-[#E2DBD0]/60 dark:border-[#2D2A26]">
                    <span>{isRTL ? '٤ قطع معتمدة' : '4 Matched Pieces'}</span>
                    <span className="font-bold text-[#1E1E1E] dark:text-[#F8F7F3]">{isRTL ? 'التكلفة: 78,500 ج.م' : 'Cost: 78,500 EGP'}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* =========================================================================
          SECTION 4 – FOR FURNITURE RETAILERS (Warm Sand Subtle Surface)
          ========================================================================= */}
      <section className="py-24 sm:py-32 bg-[#EBE5DC]/40 dark:bg-[#181614] border-t border-[#E2DBD0] dark:border-[#2D2A26] transition-colors">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 space-y-14">
          {/* Section Header */}
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <span className="inline-block bg-[#EAE2D6] dark:bg-[#25211D] text-[#1E1E1E] dark:text-[#EAE2D6] text-[11px] tracking-[0.14em] uppercase px-3.5 py-1.5 rounded-md font-semibold">
              {isRTL ? '٠٤ / لقطاع المعارض والمصنعين' : '04 / FOR FURNITURE RETAILERS'}
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-[46px] font-bold tracking-[-0.02em] text-[#1E1E1E] dark:text-[#F8F7F3] leading-[1.12]">
              {isRTL ? (
                <>
                  مستقبل تجارة<br />
                  <span className="text-[#8C6D45]">الأثاث الفاخر في الشرق الأوسط.</span>
                </>
              ) : (
                <>
                  The Future of<br />
                  <span className="text-[#8C6D45]">Luxury Furniture Commerce.</span>
                </>
              )}
            </h2>
            <p className="text-sm sm:text-base text-[#4A4A4A] dark:text-[#A39E96] font-normal max-w-2xl mx-auto leading-relaxed">
              {isRTL
                ? 'تمنح فيستايا معارض الأثاث والمصنعين بنية تحتية برمجية متطورة تندمج في موقعهم الحالي بسلاسة. اربط كتالوج منتجاتك، ومكن عملاءك من تجربة الأثاث في منازلهم، وضاعف مبيعاتك مع القضاء على مشاكل المرتجعات.'
                : 'VESTAIA equips luxury showrooms, manufacturers, and design houses with an embeddable spatial infrastructure that integrates into your existing store in minutes. Digitize your catalog, empower customer spatial decisions, and eliminate return friction.'}
            </p>
          </div>

          {/* 4 Feature Columns in Clean White Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-7 rounded-2xl bg-white dark:bg-[#1A1815] border border-[#E2DBD0] dark:border-[#2D2A26] space-y-3 shadow-xs hover:border-[#1E1E1E] dark:hover:border-white transition-all">
              <span className="text-[10px] font-mono text-[#8C6D45] bg-[#EAE2D6] dark:bg-[#25211D] px-2 py-0.5 rounded font-bold inline-block">01 / INTEGRATION</span>
              <h3 className="text-lg font-bold text-[#1E1E1E] dark:text-[#F8F7F3]">{isRTL ? 'اندماج سلس في موقعك' : 'Integrate into Existing Websites'}</h3>
              <p className="text-xs text-[#6E6A63] dark:text-[#A39E96] leading-relaxed font-normal">
                {isRTL
                  ? 'سطر كود جافاسكريبت واحد أو تطبيق شوبيفاي بنقرة واحدة، دون الحاجة لتغيير نظامك أو إعادة برمجة موقعك.'
                  : 'Drop-in JavaScript widget or 1-click Shopify app. Zero complex backend rewrites or theme disruptions.'}
              </p>
            </div>

            <div className="p-7 rounded-2xl bg-white dark:bg-[#1A1815] border border-[#E2DBD0] dark:border-[#2D2A26] space-y-3 shadow-xs hover:border-[#1E1E1E] dark:hover:border-white transition-all">
              <span className="text-[10px] font-mono text-[#8C6D45] bg-[#EAE2D6] dark:bg-[#25211D] px-2 py-0.5 rounded font-bold inline-block">02 / CATALOG</span>
              <h3 className="text-lg font-bold text-[#1E1E1E] dark:text-[#F8F7F3]">{isRTL ? 'ربط كتالوج الأثاث الفعلي' : 'Connect Real Furniture Catalogs'}</h3>
              <p className="text-xs text-[#6E6A63] dark:text-[#A39E96] leading-relaxed font-normal">
                {isRTL
                  ? 'مزامنة أبعاد المنتجات الدقيقة والمواد والمخزون في القاهرة والشيخ زايد والأسعار بالجنيه المصري.'
                  : 'Sync certified physical dimensions (W×D×H), fabric shaders, stock fulfillment hubs, and EGP pricing.'}
              </p>
            </div>

            <div className="p-7 rounded-2xl bg-white dark:bg-[#1A1815] border border-[#E2DBD0] dark:border-[#2D2A26] space-y-3 shadow-xs hover:border-[#1E1E1E] dark:hover:border-white transition-all">
              <span className="text-[10px] font-mono text-[#8C6D45] bg-[#EAE2D6] dark:bg-[#25211D] px-2 py-0.5 rounded font-bold inline-block">03 / SPATIAL AI</span>
              <h3 className="text-lg font-bold text-[#1E1E1E] dark:text-[#F8F7F3]">{isRTL ? 'معاينة مكانية ذكية' : 'AI-Powered Spatial Studio'}</h3>
              <p className="text-xs text-[#6E6A63] dark:text-[#A39E96] leading-relaxed font-normal">
                {isRTL
                  ? 'يضع العميل القطع في منزله بدقة المليمتر مع ظلال طبيعية ومراعاة اتجاه إضاءة النوافذ.'
                  : 'True-to-scale photorealistic placement with automatic wall boundary and daylight ray detection.'}
              </p>
            </div>

            <div className="p-7 rounded-2xl bg-white dark:bg-[#1A1815] border border-[#E2DBD0] dark:border-[#2D2A26] space-y-3 shadow-xs hover:border-[#1E1E1E] dark:hover:border-white transition-all">
              <span className="text-[10px] font-mono text-[#8C6D45] bg-[#EAE2D6] dark:bg-[#25211D] px-2 py-0.5 rounded font-bold inline-block">04 / CONVERSION</span>
              <h3 className="text-lg font-bold text-[#1E1E1E] dark:text-[#F8F7F3]">{isRTL ? 'قرارات شراء حاسمة' : 'Confident Purchasing Decisions'}</h3>
              <p className="text-xs text-[#6E6A63] dark:text-[#A39E96] leading-relaxed font-normal">
                {isRTL
                  ? 'زوال الشكوك والمخاوف يحول التردد إلى شراء فوري، رافعاً متوسط سلة المشتريات ومقلصاً المرتجعات.'
                  : 'Eliminating spatial anxiety drives higher basket conversions and protects margins against rejection costs.'}
              </p>
            </div>
          </div>

          {/* Metric KPI Numbers in Crisp White Surface */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 p-8 rounded-2xl bg-white dark:bg-[#1A1815] border border-[#E2DBD0] dark:border-[#2D2A26] text-center shadow-xs">
            <div className="space-y-1">
              <span className="text-4xl sm:text-5xl font-bold tracking-tight text-[#8C6D45]">+38%</span>
              <p className="text-[11px] text-[#6E6A63] dark:text-[#A39E96] uppercase tracking-[0.14em] font-semibold">{isRTL ? 'نسبة التحويل للشراء' : 'Conversion Lift'}</p>
            </div>
            <div className="space-y-1">
              <span className="text-4xl sm:text-5xl font-bold tracking-tight text-[#1E1E1E] dark:text-[#F8F7F3]">-41%</span>
              <p className="text-[11px] text-[#6E6A63] dark:text-[#A39E96] uppercase tracking-[0.14em] font-semibold">{isRTL ? 'انخفاض المرتجعات' : 'Return Reduction'}</p>
            </div>
            <div className="space-y-1">
              <span className="text-4xl sm:text-5xl font-bold tracking-tight text-[#8C6D45]">+52%</span>
              <p className="text-[11px] text-[#6E6A63] dark:text-[#A39E96] uppercase tracking-[0.14em] font-semibold">{isRTL ? 'متوسط قيمة السلة' : 'Average Basket'}</p>
            </div>
            <div className="space-y-1">
              <span className="text-4xl sm:text-5xl font-bold tracking-tight text-[#1E1E1E] dark:text-[#F8F7F3]">3.4x</span>
              <p className="text-[11px] text-[#6E6A63] dark:text-[#A39E96] uppercase tracking-[0.14em] font-semibold">{isRTL ? 'وقت تصفح الكتالوج' : 'Catalog Dwell Time'}</p>
            </div>
          </div>

          {/* B2B Call to Action */}
          <div className="text-center pt-2">
            <button
              onClick={openBookDemo}
              className="inline-flex items-center gap-2.5 px-8 py-4 rounded-full bg-[#1E1E1E] hover:bg-[#333333] text-[#F6F3EE] dark:bg-[#F8F7F3] dark:hover:bg-white dark:text-[#1E1E1E] text-xs uppercase tracking-[0.12em] font-bold transition-all shadow-xs group cursor-pointer"
            >
              <span>{isRTL ? 'انضم إلى شبكة معارض فيستايا' : 'PARTNER WITH VESTAIA'}</span>
              <Arrow className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </section>


      {/* =========================================================================
          SECTION 5 – FINAL CTA (Cinematic Close)
          ========================================================================= */}
      <section className="relative py-32 sm:py-44 px-6 sm:px-8 lg:px-12 overflow-hidden text-center flex items-center justify-center">
        {/* Immersive Photography Background */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=2600&q=85"
            alt="Reimagine the way you furnish - luxury villa interior"
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-black/75 backdrop-blur-[2px]" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#121110] via-transparent to-[#121110]" />
        </div>

        {/* Interactive Spatial Particle Field (Antigravity by React Bits) */}
        <div className="absolute inset-0 z-[1] pointer-events-auto opacity-75">
          <Antigravity
            colors={['#CDBBA5', '#B58A54', '#E9DFD0', '#FFFFFF']}
            count={1200}
            magnetRadius={10}
            ringRadius={8}
            particleSize={0.85}
            particleVariance={1}
            autoAnimate={true}
            interactive={true}
            clickBurst={true}
            ambient={0.2}
          />
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-4xl mx-auto space-y-8">
          <span className="inline-block bg-white/15 backdrop-blur-md text-white text-[11px] tracking-[0.18em] uppercase px-4 py-1.5 rounded-full font-semibold border border-white/20">
            {isRTL ? 'بداية التجربة' : 'THE NEXT CHAPTER'}
          </span>

          <h2 className="text-4xl sm:text-6xl lg:text-7xl font-bold tracking-[-0.02em] text-white leading-[1.05]">
            {isRTL ? (
              <>
                أعد ابتكار طريقتك<br />
                <span className="text-[#EAE2D6]">في التأثيث المعماري.</span>
              </>
            ) : (
              <>
                Reimagine The Way<br />
                <span className="text-[#EAE2D6]">You Furnish Your Space.</span>
              </>
            )}
          </h2>

          <p className="text-sm sm:text-base text-stone-300 font-normal max-w-xl mx-auto leading-relaxed">
            {isRTL
              ? 'ادخل إلى استوديو التصميم المكاني. عاين قطع الأثاث الحقيقية في منزلك، ونسق مساحات استثنائية بدقة معمارية مطلقة.'
              : 'Step into the spatial studio. Experience how architectural refinement meets intelligent furniture visualization.'}
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Link
              to="/visualizer"
              className="w-full sm:w-auto px-9 py-4 rounded-full bg-[#F6F3EE] hover:bg-white text-[#1E1E1E] text-xs uppercase tracking-[0.12em] font-bold transition-all duration-300 shadow-xl flex items-center justify-center gap-2.5 cursor-pointer group"
            >
              <span>{isRTL ? 'ابدأ تجربتك الآن' : 'START YOUR EXPERIENCE'}</span>
              <Arrow className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </Link>

            <button
              onClick={openBookDemo}
              className="w-full sm:w-auto px-9 py-4 rounded-full bg-white/10 hover:bg-white/20 text-white border border-white/25 text-xs uppercase tracking-[0.12em] font-bold transition-all cursor-pointer"
            >
              {isRTL ? 'طلب استشارة للمعرض' : 'SCHEDULE CONSULTATION'}
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
