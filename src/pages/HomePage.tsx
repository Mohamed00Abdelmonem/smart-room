import React from 'react';
import { Link } from 'react-router-dom';
import { useVisualizer } from '../context/VisualizerContext';
import { useLanguage } from '../context/LanguageContext';
import { BeforeAfterSlider } from '../components/common/BeforeAfterSlider';
import { LUXURY_PRODUCTS } from '../data/products';
import { 
  ArrowRight, 
  ArrowLeft, 
  ChevronDown 
} from 'lucide-react';

export const HomePage: React.FC = () => {
  const { openBookDemo, openExperienceA } = useVisualizer();
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

  return (
    <div className="bg-white dark:bg-[#121110] text-[#292722] dark:text-[#F8F7F3] overflow-hidden transition-colors duration-300">
      {/* =========================================================================
          HERO SECTION (~100vh Full-screen Cinematic Architecture)
          ========================================================================= */}
      <section className="relative min-h-screen w-full flex flex-col justify-between pt-28 pb-12 sm:pb-16 px-6 sm:px-8 lg:px-12">
        {/* Full-screen Background Photography */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=2600&q=85"
            alt="Luxury Architecture Living Room Interior"
            className="w-full h-full object-cover object-center scale-105 transform animate-pulse duration-[10000ms]"
          />
          {/* Subtle balanced dark gradient overlay so text is pristine */}
          <div className="absolute inset-0 editorial-hero-overlay" />
          <div className="absolute inset-0 bg-black/20" />
        </div>

        {/* Top spacer for clean layout */}
        <div className="relative z-10 hidden sm:block" />

        {/* Hero Central Content */}
        <div className="relative z-10 max-w-6xl mx-auto w-full my-auto py-12 text-center lg:text-start">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-end">
            {/* Main Headline (8 cols) */}
            <div className="lg:col-span-8 space-y-4">
              <span className="inline-block text-[11px] uppercase tracking-[0.3em] font-semibold text-[#D5C1A7] border-b border-[#D5C1A7]/40 pb-1">
                {isRTL ? 'منظومة التجارة المكانية المعمارية' : 'SPATIAL FURNITURE INTELLIGENCE'}
              </span>

              <h1 className="font-editorial text-5xl sm:text-7xl lg:text-8xl xl:text-9xl font-normal tracking-tight text-white leading-[0.95] uppercase">
                {isRTL ? (
                  <>
                    مساحتك.<br />
                    رؤيتك.<br />
                    <span className="italic text-[#D5C1A7]">بيتك.</span>
                  </>
                ) : (
                  <>
                    YOUR SPACE.<br />
                    YOUR VISION.<br />
                    <span className="italic text-[#D5C1A7]">YOUR HOME.</span>
                  </>
                )}
              </h1>
            </div>

            {/* Supporting Prose & CTAs (4 cols) */}
            <div className="lg:col-span-4 space-y-8 text-stone-200">
              <p className="text-sm sm:text-base leading-relaxed font-light max-w-md mx-auto lg:mx-0">
                {isRTL
                  ? 'اكتشف كيف يعيد التصميم الذكي صياغة تجربة اقتناء الأثاث الفاخر. عاين القطع الحقيقية داخل غرفتك بمقاساتها الفعلية، ونسق تصاميم متكاملة قبل اتخاذ قرار الشراء.'
                  : 'Discover how intelligent design transforms the way you experience furniture. Visualize real pieces in your own space, design complete rooms, and find the perfect fit before you buy.'}
              </p>

              <div className="flex flex-col sm:flex-row lg:flex-col gap-3 pt-2">
                <Link
                  to="/visualizer"
                  className="inline-flex items-center justify-center gap-3 px-8 py-4 rounded-full bg-white hover:bg-stone-50 text-[#292722] text-xs uppercase tracking-[0.2em] font-bold transition-all duration-300 shadow-xl group cursor-pointer"
                >
                  <span>{isRTL ? 'ابدأ تجربة رومورا' : 'EXPERIENCE ROOMORA'}</span>
                  <Arrow className="w-4 h-4 text-[#292722] group-hover:translate-x-1 transition-transform" />
                </Link>

                <Link
                  to="/integration"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-white/10 hover:bg-white/20 text-white border border-white/25 text-xs uppercase tracking-[0.2em] font-medium transition-all duration-300 cursor-pointer"
                >
                  <span>{isRTL ? 'لمعارض ومصنعي الأثاث' : 'FOR FURNITURE RETAILERS'}</span>
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Hero Footer Bar */}
        <div className="relative z-10 border-t border-white/15 pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-stone-300 gap-4">
          <div className="flex items-center gap-6 text-[11px] tracking-[0.2em] uppercase font-medium">
            <span>CAIRO</span>
            <span>·</span>
            <span>SHEIKH ZAYED</span>
            <span>·</span>
            <span>DUBAI</span>
            <span>·</span>
            <span>RIYADH</span>
          </div>

          <a
            href="#about"
            className="hidden sm:flex items-center gap-2 text-stone-300 hover:text-white transition-colors text-[11px] uppercase tracking-[0.2em]"
          >
            <span>{isRTL ? 'استكشف التجربة' : 'SCROLL TO EXPLORE'}</span>
            <ChevronDown className="w-3.5 h-3.5 animate-bounce" />
          </a>
        </div>
      </section>


      {/* =========================================================================
          SECTION 1 – THE EXPERIENCE (Pure White 60% Studio Workspace)
          ========================================================================= */}
      <section id="about" className="py-24 sm:py-36 bg-white dark:bg-[#121110] border-t border-[#E8E2D9] dark:border-[#2D2A26] transition-colors">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          {/* Eyebrow & Number */}
          <div className="flex items-center justify-between pb-8 mb-12 border-b border-[#E8E2D9] dark:border-[#2D2A26]">
            <span className="text-xs uppercase tracking-[0.3em] font-bold text-[#B58A54]">
              {isRTL ? '٠١ / التجربة المعمارية' : '01 / THE EXPERIENCE'}
            </span>
            <span className="text-xs font-mono text-[#6E6A63] dark:text-[#A39E96] uppercase tracking-widest">
              ATELIER ARCHITECTURE
            </span>
          </div>

          {/* Editorial Asymmetric Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            {/* Left Large Interior Artwork (7 cols) */}
            <div className="lg:col-span-7 relative group">
              <div className="relative aspect-[4/3] rounded-3xl overflow-hidden bg-[#F8F7F3] dark:bg-[#1E1C1A] shadow-sm border border-[#E8E2D9] dark:border-[#2D2A26]">
                <img
                  src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1800&q=85"
                  alt="High-end Interior Architecture"
                  className="w-full h-full object-cover object-center transform group-hover:scale-105 transition-transform duration-1000 ease-out"
                />
                <div className={`absolute bottom-6 ${isRTL ? 'right-6' : 'left-6'} p-4 rounded-2xl bg-white/95 dark:bg-[#1E1C1A]/95 backdrop-blur-md border border-[#E8E2D9] dark:border-[#2D2A26] text-xs shadow-md`}>
                  <p className="font-editorial text-base font-bold text-[#292722] dark:text-[#F8F7F3]">Statuario & Smoked Ash Salon</p>
                  <p className="text-[11px] text-[#6E6A63] dark:text-[#A39E96]">Authentic Catalog Composition · Sheikh Zayed Hub</p>
                </div>
              </div>
            </div>

            {/* Right Column Editorial Prose (5 cols) */}
            <div className="lg:col-span-5 space-y-8">
              <h2 className="font-editorial text-4xl sm:text-5xl lg:text-6xl font-normal leading-[1.05] tracking-tight text-[#292722] dark:text-[#F8F7F3] uppercase">
                {isRTL ? (
                  <>
                    أكثر من مجرد أثاث.<br />
                    <span className="italic text-[#B58A54]">رؤية جديدة</span><br />
                    لمساحتك.
                  </>
                ) : (
                  <>
                    MORE THAN FURNITURE.<br />
                    <span className="italic text-[#B58A54]">A NEW WAY</span><br />
                    TO SEE YOUR SPACE.
                  </>
                )}
              </h2>

              <p className="text-sm sm:text-base text-[#6E6A63] dark:text-[#A39E96] leading-relaxed font-normal">
                {isRTL
                  ? 'لطالما كانت تجربة شراء الأثاث الفاخر محاطة بالتردد: محاولة تخيل تناسق الأقمشة، الخوف من عدم ملائمة الأبعاد للمداخل، والقلق من خيبة الأمل بعد التسليم. تمنحك رومورا يقيناً تاماً بوضع قطع الأثاث المعتمدة داخل منزلك بضوئها الطبيعي ونسبها الحقيقية.'
                  : 'For decades, acquiring luxury furniture required a leap of faith: guessing how proportions interact with daylight, hoping upholstery tones harmonize with your flooring, and praying sectionals clear elevator doors. ROOMORA bridges the imagination gap by placing certified showroom digital twins directly inside your space.'}
              </p>

              <div className="grid grid-cols-2 gap-6 pt-4 border-t border-[#E8E2D9] dark:border-[#2D2A26] text-xs">
                <div className="p-4 rounded-2xl bg-[#F8F7F3] dark:bg-[#1E1C1A] border border-[#E8E2D9] dark:border-[#2D2A26] space-y-1">
                  <span className="font-mono text-[#B58A54] text-sm font-bold block">01</span>
                  <h4 className="font-bold text-[#292722] dark:text-[#F8F7F3] uppercase tracking-wider">{isRTL ? 'مقاسات دقيقة' : 'True-to-Scale'}</h4>
                  <p className="text-[#6E6A63] dark:text-[#A39E96] text-[11px] leading-relaxed">{isRTL ? 'دقة ملمترية مطابقة للمواصفات' : 'Certified millimeter clearance audits'}</p>
                </div>
                <div className="p-4 rounded-2xl bg-[#F8F7F3] dark:bg-[#1E1C1A] border border-[#E8E2D9] dark:border-[#2D2A26] space-y-1">
                  <span className="font-mono text-[#B58A54] text-sm font-bold block">02</span>
                  <h4 className="font-bold text-[#292722] dark:text-[#F8F7F3] uppercase tracking-wider">{isRTL ? 'إضاءة طبيعية' : 'Ambient Realism'}</h4>
                  <p className="text-[#6E6A63] dark:text-[#A39E96] text-[11px] leading-relaxed">{isRTL ? 'محاكاة لاتجاه أشعة الشمس والظلال' : 'Ray-traced shadow direction matching'}</p>
                </div>
              </div>

              <div className="pt-2">
                <Link
                  to="/showroom"
                  className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] font-bold text-[#292722] dark:text-[#F8F7F3] hover:text-[#B58A54] transition-colors group cursor-pointer"
                >
                  <span>{isRTL ? 'استكشف تشكيلة المعرض الحقيقية' : 'EXPLORE SHOWROOM CATALOG'}</span>
                  <Arrow className="w-3.5 h-3.5 text-[#B58A54] group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* =========================================================================
          SECTION 2 – VISUALIZE YOUR FURNITURE (Warm Ivory 25% Subtle Contrast)
          ========================================================================= */}
      <section className="py-24 sm:py-36 bg-[#F8F7F3] dark:bg-[#181614] border-t border-[#E8E2D9] dark:border-[#2D2A26] transition-colors">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 space-y-16">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 border-b border-[#E8E2D9] dark:border-[#2D2A26] pb-10">
            <div className="space-y-3 max-w-2xl">
              <span className="text-xs uppercase tracking-[0.3em] font-bold text-[#B58A54]">
                {isRTL ? '٠٢ / معاينة القطعة في غرفتك' : '02 / INDIVIDUAL PIECE PLACEMENT'}
              </span>
              <h2 className="font-editorial text-4xl sm:text-6xl font-normal tracking-tight text-[#292722] dark:text-[#F8F7F3] uppercase leading-[1.05]">
                {isRTL ? (
                  <>
                    عاينه في مساحتك.<br />
                    <span className="italic text-[#B58A54]">قبل أن يصبح</span> ملكك.
                  </>
                ) : (
                  <>
                    SEE IT IN YOUR SPACE.<br />
                    <span className="italic text-[#B58A54]">BEFORE IT'S</span> YOURS.
                  </>
                )}
              </h2>
            </div>

            <div className="space-y-4 max-w-md">
              <p className="text-xs sm:text-sm text-[#6E6A63] dark:text-[#A39E96] leading-relaxed font-normal">
                {isRTL
                  ? 'لا مزيد من أشرطة القياس والحيرة. اختر أي قطعة من كتالوج المعارض الشريكة، وارفع صورة من هاتفك لتشاهدها موضوعة بحجمها الحقيقي وتفاصيل خاماتها.'
                  : 'No more tape measures and hesitation. Browse any piece in our retail partner showrooms, upload a smartphone photo of your room, and witness that exact sofa or table rendered at true scale with ambient light and directional shadows.'}
              </p>
              <button
                onClick={() => openExperienceA(LUXURY_PRODUCTS[0])}
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-[#292722] hover:bg-[#3D3A34] text-white dark:bg-[#F8F7F3] dark:hover:bg-white dark:text-[#292722] text-xs uppercase tracking-[0.15em] font-bold transition-all cursor-pointer shadow-md"
              >
                <span>{isRTL ? 'جرّب المعاينة الآن' : 'TRY THE VISUALIZER'}</span>
                <Arrow className="w-3.5 h-3.5 text-[#B58A54] dark:text-[#292722]" />
              </button>
            </div>
          </div>

          {/* Large Before/After Composition */}
          <div className="rounded-3xl overflow-hidden border border-[#E8E2D9] dark:border-[#2D2A26] shadow-lg bg-white dark:bg-[#121110]">
            <BeforeAfterSlider
              beforeImage="https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=2200&q=85"
              afterImage="https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=2200&q=85"
              beforeLabel={isRTL ? 'الغرفة الأصلية الفارغة' : 'RAW CUSTOMER ROOM'}
              afterLabel={isRTL ? 'مؤثثة بقطع رومورا المعتمدة' : 'ROOMORA SCALE-PLACED'}
              hotspots={heroHotspots}
              onHotspotClick={() => openExperienceA(LUXURY_PRODUCTS[0])}
              aspectRatio="aspect-[16/10] sm:aspect-[21/10]"
            />
          </div>

          {/* Under-slider details */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2 text-xs">
            <div className="p-5 rounded-2xl bg-white dark:bg-[#1E1C1A] border border-[#E8E2D9] dark:border-[#2D2A26] space-y-1.5 shadow-xs">
              <span className="font-bold text-[#292722] dark:text-[#F8F7F3] uppercase tracking-wider block">{isRTL ? 'منتج معتمد وأصيل' : 'Authentic Catalog SKU'}</span>
              <p className="text-[#6E6A63] dark:text-[#A39E96] leading-relaxed">
                {isRTL ? 'القطعة المعروضة مطابقة للمخزون الفعلي القابل للتسليم بمصر.' : 'The rendered item matches the exact SKU available in retail fulfillment.'}
              </p>
            </div>
            <div className="p-5 rounded-2xl bg-white dark:bg-[#1E1C1A] border border-[#E8E2D9] dark:border-[#2D2A26] space-y-1.5 shadow-xs">
              <span className="font-bold text-[#292722] dark:text-[#F8F7F3] uppercase tracking-wider block">{isRTL ? 'فحص الممرات والأبواب' : 'Spatial Flow Verification'}</span>
              <p className="text-[#6E6A63] dark:text-[#A39E96] leading-relaxed">
                {isRTL ? 'يتحقق النظام من ترك مسافة 110 سم على الأقل لحرية المرور.' : 'System validates minimum 110cm circulation pathways.'}
              </p>
            </div>
            <div className="p-5 rounded-2xl bg-white dark:bg-[#1E1C1A] border border-[#E8E2D9] dark:border-[#2D2A26] space-y-1.5 shadow-xs">
              <span className="font-bold text-[#292722] dark:text-[#F8F7F3] uppercase tracking-wider block">{isRTL ? 'تنسيق المواد والألوان' : 'Material Harmonization'}</span>
              <p className="text-[#6E6A63] dark:text-[#A39E96] leading-relaxed">
                {isRTL ? 'يقيم تناغم قماش البوكليه ورخام ستاتوريو مع أرضيات الغرفة.' : 'Evaluates bouclé texture and marble tones against your existing floor.'}
              </p>
            </div>
          </div>
        </div>
      </section>


      {/* =========================================================================
          SECTION 3 – DESIGN YOUR ENTIRE ROOM (Pure White 60% Studio Workspace)
          ========================================================================= */}
      <section className="py-24 sm:py-36 bg-white dark:bg-[#121110] border-t border-[#E8E2D9] dark:border-[#2D2A26] transition-colors">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          {/* Eyebrow */}
          <div className="flex items-center justify-between pb-8 mb-12 border-b border-[#E8E2D9] dark:border-[#2D2A26]">
            <span className="text-xs uppercase tracking-[0.3em] font-bold text-[#B58A54]">
              {isRTL ? '٠٣ / تأثيث الغرفة المتكاملة' : '03 / COMPLETE ROOM DESIGN'}
            </span>
            <span className="text-xs font-mono text-[#6E6A63] dark:text-[#A39E96] uppercase tracking-widest">
              BUDGET & SPATIAL CURATION
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            {/* Left Content (5 cols) */}
            <div className="lg:col-span-5 space-y-8 order-2 lg:order-1">
              <h2 className="font-editorial text-4xl sm:text-5xl lg:text-6xl font-normal leading-[1.05] tracking-tight text-[#292722] dark:text-[#F8F7F3] uppercase">
                {isRTL ? (
                  <>
                    غرفة أحلامك.<br />
                    <span className="italic text-[#B58A54]">في حدود</span><br />
                    ميزانيتك.
                  </>
                ) : (
                  <>
                    YOUR DREAM ROOM.<br />
                    <span className="italic text-[#B58A54]">WITHIN YOUR</span><br />
                    BUDGET.
                  </>
                )}
              </h2>

              <p className="text-sm sm:text-base text-[#6E6A63] dark:text-[#A39E96] leading-relaxed font-normal">
                {isRTL
                  ? 'حوّل أي غرفة إلى تحفة معمارية متناسقة. أدخل مقاسات جدرانك، وحدد ميزانيتك بالجنيه المصري، واكتب رؤيتك بكلماتك البسيطة. يقوم منسق رومورا الذكي باختيار وترتيب قطع أثاث متوافقة من كتالوج المعرض الفعلي دون تجاوز ميزانيتك.'
                  : 'Transform an entire empty room or apartment into an architecturally coordinated sanctuary. Enter your room dimensions, state your target budget, and express your stylistic desires in natural language. ROOMORA matches and arranges certified pieces from real showrooms, strictly within budget.'}
              </p>

              {/* 4 Steps Checklist in Soft Sand Cards */}
              <div className="space-y-3 pt-2 text-xs">
                <div className="flex items-start gap-3 p-4 rounded-2xl bg-[#F8F7F3] dark:bg-[#1E1C1A] border border-[#E8E2D9] dark:border-[#2D2A26] shadow-xs">
                  <span className="font-mono text-[#B58A54] font-bold">01</span>
                  <div>
                    <h5 className="font-bold text-[#292722] dark:text-[#F8F7F3] uppercase tracking-wider">{isRTL ? 'رفع صور متعددة للغرفة' : 'Upload Multiple Room Angles'}</h5>
                    <p className="text-[#6E6A63] dark:text-[#A39E96] text-[11px] mt-0.5">{isRTL ? 'منظور أمامي، زوايا، ومصادر الضوء الطبيعي' : 'Front view, corner perspectives, and window daylight angles'}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-4 rounded-2xl bg-[#F8F7F3] dark:bg-[#1E1C1A] border border-[#E8E2D9] dark:border-[#2D2A26] shadow-xs">
                  <span className="font-mono text-[#B58A54] font-bold">02</span>
                  <div>
                    <h5 className="font-bold text-[#292722] dark:text-[#F8F7F3] uppercase tracking-wider">{isRTL ? 'وصف النمط المفضل' : 'Describe Your Desired Style'}</h5>
                    <p className="text-[#6E6A63] dark:text-[#A39E96] text-[11px] mt-0.5">{isRTL ? 'مينيمالي، مودرن، معاصر، أو إسكندنافي هادئ' : 'Warm minimalist, modern architectural, contemporary, or Nordic calm'}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-4 rounded-2xl bg-[#F8F7F3] dark:bg-[#1E1C1A] border border-[#E8E2D9] dark:border-[#2D2A26] shadow-xs">
                  <span className="font-mono text-[#B58A54] font-bold">03</span>
                  <div>
                    <h5 className="font-bold text-[#292722] dark:text-[#F8F7F3] uppercase tracking-wider">{isRTL ? 'تحديد الميزانية الكلية' : 'Set Your Total Budget'}</h5>
                    <p className="text-[#6E6A63] dark:text-[#A39E96] text-[11px] mt-0.5">{isRTL ? 'التحكم الدقيق بالجنيه المصري (مثلاً 80,000 ج.م)' : 'Exact spend control in EGP with itemized breakdown'}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-4 rounded-2xl bg-[#F8F7F3] dark:bg-[#1E1C1A] border border-[#E8E2D9] dark:border-[#2D2A26] shadow-xs">
                  <span className="font-mono text-[#B58A54] font-bold">04</span>
                  <div>
                    <h5 className="font-bold text-[#292722] dark:text-[#F8F7F3] uppercase tracking-wider">{isRTL ? 'تنسيق كتالوج المعرض الفعلي' : 'Coordinated Showroom Recommendation'}</h5>
                    <p className="text-[#6E6A63] dark:text-[#A39E96] text-[11px] mt-0.5">{isRTL ? 'قطع أثاث حقيقية متوفرة بمستودعات القاهرة للتسليم' : 'Real in-stock pieces mapped into your actual room photo'}</p>
                  </div>
                </div>
              </div>

              <div className="pt-2">
                <Link
                  to="/visualizer"
                  className="inline-flex items-center justify-center gap-3 px-8 py-4 rounded-full bg-[#292722] hover:bg-[#3D3A34] text-white dark:bg-[#F8F7F3] dark:hover:bg-white dark:text-[#292722] text-xs uppercase tracking-[0.2em] font-bold transition-all shadow-md group cursor-pointer"
                >
                  <span>{isRTL ? 'ابدأ مصمم الغرف بالذكاء الاصطناعي' : 'START ROOM DESIGNER'}</span>
                  <Arrow className="w-4 h-4 text-[#B58A54] dark:text-[#292722] group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>

            {/* Right Large Image with Sample Prompt Overlay (7 cols) */}
            <div className="lg:col-span-7 order-1 lg:order-2 space-y-6">
              <div className="relative aspect-[4/3] rounded-3xl overflow-hidden bg-stone-900 shadow-md border border-[#E8E2D9] dark:border-[#2D2A26] group">
                <img
                  src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1800&q=85"
                  alt="Coordinated Living Room Interior Design"
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-1000 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />

                {/* Editorial Prompt Card Float */}
                <div className="absolute bottom-6 left-6 right-6 p-6 rounded-2xl bg-white/95 dark:bg-[#1E1C1A]/95 backdrop-blur-xl border border-[#E8E2D9] dark:border-[#2D2A26] space-y-3 shadow-lg">
                  <div className="flex items-center justify-between text-xs">
                    <span className="uppercase tracking-[0.2em] font-bold text-[#B58A54]">
                      {isRTL ? 'طلب العميل باللغة الطبيعية' : 'CUSTOMER NATURAL PROMPT'}
                    </span>
                    <span className="font-mono text-emerald-700 dark:text-emerald-400 font-bold">
                      {isRTL ? 'الميزانية: 80,000 ج.م' : 'Budget: 80,000 EGP'}
                    </span>
                  </div>
                  <p className="font-editorial text-lg text-[#292722] dark:text-[#F8F7F3] leading-snug">
                    {isRTL
                      ? '«أريد تأثيث غرفة المعيشة بأسلوب مينيمالي حديث. ميزانيتي 80,000 ج.م. أحتاج لكنبة مريحة على شكل حرف L، وحدة تلفزيون، طاولة قهوة، وسجادة. الغرفة 5م × 4م. أفضل درجات البيج الدافئ وألوان الخشب الطبيعي.»'
                      : '"I want to furnish my living room with a modern minimalist style. My budget is 80,000 EGP. I need a comfortable L-shaped sofa, a TV unit, a coffee table, and a carpet. The room is 5m x 4m. I prefer warm beige and natural wood colors."'}
                  </p>
                  <div className="flex items-center justify-between text-[11px] text-[#6E6A63] dark:text-[#A39E96] pt-2 border-t border-[#E8E2D9] dark:border-[#2D2A26]">
                    <span>{isRTL ? 'النتيجة: 4 قطع أثاث متناسقة من الكتالوج' : 'Result: 4 Matched Showroom Pieces'}</span>
                    <span className="font-bold text-[#292722] dark:text-[#F8F7F3]">{isRTL ? 'التكلفة: 78,500 ج.م (وفر 1,500 ج.م)' : 'Cost: 78,500 EGP (1,500 Under)'}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* =========================================================================
          SECTION 4 – FOR FURNITURE RETAILERS (Warm Ivory 25% Section)
          ========================================================================= */}
      <section className="py-24 sm:py-36 bg-[#F8F7F3] dark:bg-[#181614] border-t border-[#E8E2D9] dark:border-[#2D2A26] transition-colors">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 space-y-16">
          {/* Section Header */}
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <span className="text-xs uppercase tracking-[0.3em] font-bold text-[#B58A54]">
              {isRTL ? '٠٤ / لقطاع المعارض والمصنعين' : '04 / FOR FURNITURE RETAILERS'}
            </span>
            <h2 className="font-editorial text-4xl sm:text-6xl font-normal tracking-tight text-[#292722] dark:text-[#F8F7F3] uppercase leading-[1.05]">
              {isRTL ? (
                <>
                  مستقبل تجارة<br />
                  <span className="italic text-[#B58A54]">الأثاث الفاخر.</span>
                </>
              ) : (
                <>
                  THE FUTURE OF<br />
                  <span className="italic text-[#B58A54]">FURNITURE COMMERCE.</span>
                </>
              )}
            </h2>
            <p className="text-sm sm:text-base text-[#6E6A63] dark:text-[#A39E96] font-normal max-w-2xl mx-auto leading-relaxed">
              {isRTL
                ? 'تمنح رومورا معارض الأثاث والمصنعين بنية تحتية برمجية متطورة تندمج في موقعهم الحالي بسلاسة. اربط كتالوج منتجاتك، ومكن عملاءك من تجربة الأثاث في منازلهم، وضاعف مبيعاتك مع القضاء على مشاكل المرتجعات.'
                : 'ROOMORA equips luxury showrooms, manufacturers, and design houses with an embeddable spatial infrastructure that integrates into your existing store in minutes. Digitize your catalog, empower customer spatial decisions, and eliminate return friction.'}
            </p>
          </div>

          {/* 4 Feature Columns in Crisp White Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-8 rounded-3xl bg-white dark:bg-[#1E1C1A] border border-[#E8E2D9] dark:border-[#2D2A26] space-y-3 shadow-xs hover:border-[#CDBBA5] transition-all">
              <span className="text-xs font-mono text-[#B58A54] font-bold block">01 / INTEGRATION</span>
              <h3 className="font-editorial text-2xl text-[#292722] dark:text-[#F8F7F3] font-bold uppercase">{isRTL ? 'اندماج سلس في موقعك' : 'Integrate into Existing Websites'}</h3>
              <p className="text-xs text-[#6E6A63] dark:text-[#A39E96] leading-relaxed font-normal">
                {isRTL
                  ? 'سطر كود جافاسكريبت واحد أو تطبيق شوبيفاي بنقرة واحدة، دون الحاجة لتغيير نظامك أو إعادة برمجة موقعك.'
                  : 'Drop-in JavaScript widget or 1-click Shopify app. Zero complex backend rewrites or theme disruptions.'}
              </p>
            </div>

            <div className="p-8 rounded-3xl bg-white dark:bg-[#1E1C1A] border border-[#E8E2D9] dark:border-[#2D2A26] space-y-3 shadow-xs hover:border-[#CDBBA5] transition-all">
              <span className="text-xs font-mono text-[#B58A54] font-bold block">02 / CATALOG</span>
              <h3 className="font-editorial text-2xl text-[#292722] dark:text-[#F8F7F3] font-bold uppercase">{isRTL ? 'ربط كتالوج الأثاث الفعلي' : 'Connect Real Furniture Catalogs'}</h3>
              <p className="text-xs text-[#6E6A63] dark:text-[#A39E96] leading-relaxed font-normal">
                {isRTL
                  ? 'مزامنة أبعاد المنتجات الدقيقة والمواد والمخزون في القاهرة والشيخ زايد والأسعار بالجنيه المصري.'
                  : 'Sync certified physical dimensions (W×D×H), fabric shaders, stock fulfillment hubs, and EGP pricing.'}
              </p>
            </div>

            <div className="p-8 rounded-3xl bg-white dark:bg-[#1E1C1A] border border-[#E8E2D9] dark:border-[#2D2A26] space-y-3 shadow-xs hover:border-[#CDBBA5] transition-all">
              <span className="text-xs font-mono text-[#B58A54] font-bold block">03 / SPATIAL AI</span>
              <h3 className="font-editorial text-2xl text-[#292722] dark:text-[#F8F7F3] font-bold uppercase">{isRTL ? 'معاينة مكانية ذكية' : 'AI-Powered Spatial Studio'}</h3>
              <p className="text-xs text-[#6E6A63] dark:text-[#A39E96] leading-relaxed font-normal">
                {isRTL
                  ? 'يضع العميل القطع في منزله بدقة المليمتر مع ظلال طبيعية ومراعاة اتجاه إضاءة النوافذ.'
                  : 'True-to-scale photorealistic placement with automatic wall boundary and daylight ray detection.'}
              </p>
            </div>

            <div className="p-8 rounded-3xl bg-white dark:bg-[#1E1C1A] border border-[#E8E2D9] dark:border-[#2D2A26] space-y-3 shadow-xs hover:border-[#CDBBA5] transition-all">
              <span className="text-xs font-mono text-[#B58A54] font-bold block">04 / CONVERSION</span>
              <h3 className="font-editorial text-2xl text-[#292722] dark:text-[#F8F7F3] font-bold uppercase">{isRTL ? 'قرارات شراء حاسمة' : 'Confident Purchasing Decisions'}</h3>
              <p className="text-xs text-[#6E6A63] dark:text-[#A39E96] leading-relaxed font-normal">
                {isRTL
                  ? 'زوال الشكوك والمخاوف يحول التردد إلى شراء فوري، رافعاً متوسط سلة المشتريات ومقلصاً المرتجعات.'
                  : 'Eliminating spatial anxiety drives higher basket conversions and protects margins against rejection costs.'}
              </p>
            </div>
          </div>

          {/* Metric KPI Numbers in Crisp White Surface */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 p-8 rounded-3xl bg-white dark:bg-[#1E1C1A] border border-[#E8E2D9] dark:border-[#2D2A26] text-center shadow-xs">
            <div className="space-y-1">
              <span className="font-editorial text-4xl sm:text-5xl font-bold text-[#B58A54]">+38%</span>
              <p className="text-xs text-[#6E6A63] dark:text-[#A39E96] uppercase tracking-widest font-semibold">{isRTL ? 'نسبة التحويل للشراء' : 'Conversion Lift'}</p>
            </div>
            <div className="space-y-1">
              <span className="font-editorial text-4xl sm:text-5xl font-bold text-[#292722] dark:text-[#F8F7F3]">-41%</span>
              <p className="text-xs text-[#6E6A63] dark:text-[#A39E96] uppercase tracking-widest font-semibold">{isRTL ? 'انخفاض المرتجعات' : 'Return Reduction'}</p>
            </div>
            <div className="space-y-1">
              <span className="font-editorial text-4xl sm:text-5xl font-bold text-[#B58A54]">+52%</span>
              <p className="text-xs text-[#6E6A63] dark:text-[#A39E96] uppercase tracking-widest font-semibold">{isRTL ? 'متوسط قيمة السلة' : 'Average Basket'}</p>
            </div>
            <div className="space-y-1">
              <span className="font-editorial text-4xl sm:text-5xl font-bold text-[#292722] dark:text-[#F8F7F3]">3.4x</span>
              <p className="text-xs text-[#6E6A63] dark:text-[#A39E96] uppercase tracking-widest font-semibold">{isRTL ? 'وقت تصفح الكتالوج' : 'Catalog Dwell Time'}</p>
            </div>
          </div>

          {/* B2B Call to Action */}
          <div className="text-center pt-2">
            <button
              onClick={openBookDemo}
              className="inline-flex items-center gap-3 px-10 py-5 rounded-full bg-[#292722] hover:bg-[#3D3A34] text-white dark:bg-[#F8F7F3] dark:hover:bg-white dark:text-[#292722] text-xs uppercase tracking-[0.2em] font-bold transition-all duration-300 shadow-md group cursor-pointer"
            >
              <span>{isRTL ? 'انضم إلى شبكة معارض رومورا' : 'PARTNER WITH ROOMORA'}</span>
              <Arrow className="w-4 h-4 text-[#B58A54] dark:text-[#292722] group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </section>


      {/* =========================================================================
          SECTION 5 – FINAL CTA (Cinematic Close)
          ========================================================================= */}
      <section className="relative py-32 sm:py-48 px-6 sm:px-8 lg:px-12 overflow-hidden text-center flex items-center justify-center">
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

        {/* Content */}
        <div className="relative z-10 max-w-4xl mx-auto space-y-8">
          <span className="inline-block text-xs uppercase tracking-[0.3em] font-semibold text-[#D5C1A7]">
            {isRTL ? 'بداية التجربة' : 'THE NEXT CHAPTER'}
          </span>

          <h2 className="font-editorial text-5xl sm:text-7xl lg:text-8xl font-normal tracking-tight text-white uppercase leading-[0.95]">
            {isRTL ? (
              <>
                أعد ابتكار طريقتك<br />
                <span className="italic text-[#D5C1A7]">في التأثيث.</span>
              </>
            ) : (
              <>
                REIMAGINE THE WAY<br />
                <span className="italic text-[#D5C1A7]">YOU FURNISH.</span>
              </>
            )}
          </h2>

          <p className="text-sm sm:text-base text-stone-300 font-light max-w-xl mx-auto leading-relaxed">
            {isRTL
              ? 'ادخل إلى استوديو التصميم المكاني. عاين قطع الأثاث الحقيقية في منزلك، ونسق مساحات استثنائية بدقة معمارية مطلقة.'
              : 'Step into the spatial studio. Experience how architectural refinement meets intelligent furniture visualization.'}
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Link
              to="/visualizer"
              className="w-full sm:w-auto px-10 py-5 rounded-full bg-white hover:bg-stone-50 text-[#292722] text-xs uppercase tracking-[0.2em] font-bold transition-all duration-300 shadow-2xl flex items-center justify-center gap-3 cursor-pointer group"
            >
              <span>{isRTL ? 'ابدأ تجربتك الآن' : 'START YOUR EXPERIENCE'}</span>
              <Arrow className="w-4 h-4 text-[#292722] group-hover:translate-x-1 transition-transform" />
            </Link>

            <button
              onClick={openBookDemo}
              className="w-full sm:w-auto px-10 py-5 rounded-full bg-white/10 hover:bg-white/20 text-white border border-white/25 text-xs uppercase tracking-[0.2em] font-semibold transition-all cursor-pointer"
            >
              {isRTL ? 'طلب استشارة للمعرض' : 'SCHEDULE CONSULTATION'}
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
