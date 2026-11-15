import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { useLanguage } from '../../context/LanguageContext';
import { useVisualizer } from '../../context/VisualizerContext';
import { 
  Play, 
  RotateCcw, 
  Sparkles, 
  Ruler, 
  CheckCircle2, 
  Compass,
  Layers,
  ShieldCheck,
  Maximize2
} from 'lucide-react';

interface StaggeredDropSimulatorProps {
  className?: string;
  autoStart?: boolean;
}

export const StaggeredDropSimulator: React.FC<StaggeredDropSimulatorProps> = ({
  className = '',
  autoStart = true
}) => {
  const { isRTL, formatPrice } = useLanguage();
  const { openExperienceA } = useVisualizer();

  const [animStatus, setAnimStatus] = useState<'idle' | 'dropping' | 'settled'>('idle');
  const [selectedPiece, setSelectedPiece] = useState<string | null>(null);
  const [showRuler, setShowRuler] = useState(true);

  const containerRef = useRef<HTMLDivElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);

  // References for dropping furniture pieces
  const credenzaRef = useRef<HTMLDivElement>(null);
  const credenzaShadowRef = useRef<HTMLDivElement>(null);

  const plantRef = useRef<HTMLDivElement>(null);
  const plantShadowRef = useRef<HTMLDivElement>(null);

  const sofaRef = useRef<HTMLDivElement>(null);
  const sofaShadowRef = useRef<HTMLDivElement>(null);

  const armchair1Ref = useRef<HTMLDivElement>(null);
  const armchair1ShadowRef = useRef<HTMLDivElement>(null);

  const armchair2Ref = useRef<HTMLDivElement>(null);
  const armchair2ShadowRef = useRef<HTMLDivElement>(null);

  const tableRef = useRef<HTMLDivElement>(null);
  const tableShadowRef = useRef<HTMLDivElement>(null);

  const sideTableRef = useRef<HTMLDivElement>(null);
  const sideTableShadowRef = useRef<HTMLDivElement>(null);

  // Dust puff references
  const dustCredenzaRef = useRef<HTMLDivElement>(null);
  const dustSofaRef = useRef<HTMLDivElement>(null);
  const dustArmchairsRef = useRef<HTMLDivElement>(null);
  const dustTableRef = useRef<HTMLDivElement>(null);

  // UI dimensional callouts references
  const overlaysRef = useRef<HTMLDivElement>(null);
  const pinsRef = useRef<HTMLDivElement>(null);

  const furnitureItems = [
    {
      id: 'sofa',
      title: isRTL ? 'كنبة سيلوم جلد طبيعي زاوية' : 'Caelum L-Sectional Tan Leather',
      specs: '280W × 165D × 82H cm · 48,500 EGP',
      clearance: isRTL ? 'مطابق ١:١ · ممر حركة ١٢٥ سم' : 'True Fit 1:1 · 1.25m Optimal Walkway',
    },
    {
      id: 'table',
      title: isRTL ? 'طاولة قهوة مستديرة خشب بلوط' : 'Aura Nordic Round Coffee Table',
      specs: '110Ø × 42H cm · 14,800 EGP',
      clearance: isRTL ? 'ارتفاع منخفض متناغم مع الجلسة' : 'Low Profile Ergonomic 42cm',
    },
    {
      id: 'armchairs',
      title: isRTL ? 'زوج كراسي لاونج مينيمالي إسكندنافي' : 'Dual Minimalist Steel Armchairs',
      specs: '78W × 84D × 74H cm · 18,200 EGP (Pair)',
      clearance: isRTL ? 'زاوية رؤية ٤٥ درجة نحو الشرفة' : '45° Balcony Convergence Angle',
    },
    {
      id: 'credenza',
      title: isRTL ? 'بوفيه خشب جوز معاصر ولوحات جدارية' : 'Smoked Walnut Credenza & Frames',
      specs: '180W × 45D × 78H cm · 24,000 EGP',
      clearance: isRTL ? 'محاذاة جدارية دقيقة' : 'Flush Wall Alignment',
    }
  ];

  const runAnimation = () => {
    if (timelineRef.current) {
      timelineRef.current.kill();
    }

    setAnimStatus('dropping');
    setSelectedPiece(null);

    const tl = gsap.timeline({
      onComplete: () => {
        setAnimStatus('settled');
      }
    });
    timelineRef.current = tl;

    // 1. Initial State: Furniture off-screen top (Y ≈ -380px to -500px), opacity 0
    const allPieces = [
      credenzaRef.current,
      plantRef.current,
      sofaRef.current,
      armchair1Ref.current,
      armchair2Ref.current,
      tableRef.current,
      sideTableRef.current
    ];

    const allShadows = [
      credenzaShadowRef.current,
      plantShadowRef.current,
      sofaShadowRef.current,
      armchair1ShadowRef.current,
      armchair2ShadowRef.current,
      tableShadowRef.current,
      sideTableShadowRef.current
    ];

    const allDust = [
      dustCredenzaRef.current,
      dustSofaRef.current,
      dustArmchairsRef.current,
      dustTableRef.current
    ];

    // Reset initial positions
    gsap.set(allPieces, { y: -450, opacity: 0, scale: 0.96 });
    gsap.set(allShadows, { scale: 0.15, opacity: 0 });
    gsap.set(allDust, { scale: 0, opacity: 0 });
    if (overlaysRef.current) gsap.set(overlaysRef.current, { opacity: 0, scale: 0.92 });
    if (pinsRef.current) gsap.set(pinsRef.current.querySelectorAll('.pin-callout'), { scale: 0, opacity: 0 });

    const triggerPuff = (dustEl: HTMLDivElement | null) => {
      if (!dustEl) return;
      gsap.fromTo(
        dustEl,
        { scale: 0.3, opacity: 0.8 },
        { scale: 1.6, opacity: 0, duration: 0.55, ease: 'power2.out' }
      );
    };

    const triggerImpactShake = (intensity = 2.5) => {
      if (!viewportRef.current) return;
      gsap.to(viewportRef.current, {
        y: intensity,
        duration: 0.04,
        yoyo: true,
        repeat: 3,
        ease: 'power2.inOut',
        onComplete: () => {
          gsap.set(viewportRef.current, { y: 0 });
        }
      });
    };

    // Stagger Sequence: Back to Front
    // ----------------------------------------------------
    // Drop 1: Credenza & Wall Frames (Back wall anchor)
    // ----------------------------------------------------
    tl.to(credenzaRef.current, {
      y: 0,
      opacity: 1,
      scale: 1,
      duration: 0.78,
      ease: 'power4.out',
      onComplete: () => {
        triggerImpactShake(2.5);
        triggerPuff(dustCredenzaRef.current);
      }
    }, 0.1);

    tl.to(credenzaShadowRef.current, {
      scale: 1,
      opacity: 0.6,
      duration: 0.78,
      ease: 'power3.out'
    }, 0.1);

    // ----------------------------------------------------
    // Drop 2: Indoor Ficus Plants
    // ----------------------------------------------------
    tl.to(plantRef.current, {
      y: 0,
      opacity: 1,
      scale: 1,
      duration: 0.72,
      ease: 'power3.out',
    }, 0.45);

    tl.to(plantShadowRef.current, {
      scale: 1,
      opacity: 0.5,
      duration: 0.72,
      ease: 'power2.out'
    }, 0.45);

    // ----------------------------------------------------
    // Drop 3: Brown Leather Sectional Sofa (Heavy landing impact)
    // ----------------------------------------------------
    tl.to(sofaRef.current, {
      y: 0,
      opacity: 1,
      scale: 1,
      duration: 0.85,
      ease: 'power4.out',
      onComplete: () => {
        triggerImpactShake(4);
        triggerPuff(dustSofaRef.current);
      }
    }, 0.75);

    tl.to(sofaShadowRef.current, {
      scale: 1,
      opacity: 0.75,
      duration: 0.85,
      ease: 'power3.out'
    }, 0.75);

    // ----------------------------------------------------
    // Drop 4: Two White Armchairs (Left seating pair)
    // ----------------------------------------------------
    tl.to([armchair1Ref.current, armchair2Ref.current], {
      y: 0,
      opacity: 1,
      scale: 1,
      stagger: 0.12,
      duration: 0.75,
      ease: 'power4.out',
      onComplete: () => {
        triggerImpactShake(2);
        triggerPuff(dustArmchairsRef.current);
      }
    }, 1.1);

    tl.to([armchair1ShadowRef.current, armchair2ShadowRef.current], {
      scale: 1,
      opacity: 0.65,
      stagger: 0.12,
      duration: 0.75,
      ease: 'power3.out'
    }, 1.1);

    // ----------------------------------------------------
    // Drop 5: Coffee Table (Center anchor)
    // ----------------------------------------------------
    tl.to(tableRef.current, {
      y: 0,
      opacity: 1,
      scale: 1,
      duration: 0.7,
      ease: 'power4.out',
      onComplete: () => {
        triggerPuff(dustTableRef.current);
      }
    }, 1.45);

    tl.to(tableShadowRef.current, {
      scale: 1,
      opacity: 0.7,
      duration: 0.7,
      ease: 'power3.out'
    }, 1.45);

    // ----------------------------------------------------
    // Drop 6: Side Table (Front Right Accent)
    // ----------------------------------------------------
    tl.to(sideTableRef.current, {
      y: 0,
      opacity: 1,
      scale: 1,
      duration: 0.65,
      ease: 'power4.out'
    }, 1.7);

    tl.to(sideTableShadowRef.current, {
      scale: 1,
      opacity: 0.55,
      duration: 0.65,
      ease: 'power2.out'
    }, 1.7);

    // ----------------------------------------------------
    // UI OVERLAYS: Elastic Pop-In after all furniture settles
    // ----------------------------------------------------
    if (overlaysRef.current) {
      tl.to(overlaysRef.current, {
        opacity: 1,
        scale: 1,
        duration: 0.6,
        ease: 'power3.out'
      }, 2.4);
    }

    if (pinsRef.current) {
      tl.to(pinsRef.current.querySelectorAll('.pin-callout'), {
        scale: 1,
        opacity: 1,
        stagger: 0.12,
        duration: 0.55,
        ease: 'back.out(2)'
      }, 2.5);
    }
  };

  useEffect(() => {
    if (autoStart) {
      const timer = setTimeout(() => {
        runAnimation();
      }, 350);
      return () => clearTimeout(timer);
    }
  }, [autoStart]);

  return (
    <div 
      ref={containerRef}
      className={`relative w-full rounded-3xl overflow-hidden bg-[#161412] border border-[#2D2A26] shadow-2xl select-none ${className}`}
    >
      {/* TOP HUD BAR */}
      <div className="absolute top-4 sm:top-6 inset-x-4 sm:inset-x-6 z-40 flex items-center justify-between gap-3 pointer-events-auto">
        {/* Spatial Simulation Badge */}
        <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-white/15 text-[10px] tracking-[0.14em] uppercase font-bold text-white shadow-md">
          <span className={`w-2 h-2 rounded-full ${animStatus === 'dropping' ? 'bg-amber-400 animate-ping' : 'bg-emerald-400'}`} />
          <span>
            {animStatus === 'dropping'
              ? (isRTL ? 'جاري محاكاة الإسقاط الفيزيائي للأثاث...' : 'PHYSICS DROP IN PROGRESS...')
              : (isRTL ? 'معايرة الأبعاد الحقيقية ١:١ نشطة' : 'TRUE-TO-SCALE 1:1 CALIBRATION')}
          </span>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2">
          {/* Toggle Dimension Lines */}
          <button
            onClick={() => setShowRuler(!showRuler)}
            className={`p-2 rounded-full text-xs transition-all backdrop-blur-md shadow-xs cursor-pointer ${
              showRuler 
                ? 'bg-white text-[#1E1E1E] border border-white' 
                : 'bg-black/50 text-[#F6F3EE] hover:bg-black/70 border border-white/15'
            }`}
            title="Toggle Dimensions"
          >
            <Ruler className="w-3.5 h-3.5" />
          </button>

          {/* Replay Simulation Button */}
          <button
            onClick={runAnimation}
            disabled={animStatus === 'dropping'}
            className="flex items-center gap-1.5 px-3.5 sm:px-4 py-1.5 rounded-full bg-[#B58A54] hover:bg-[#C99B62] active:scale-95 text-white text-xs font-bold uppercase tracking-wider transition-all shadow-md cursor-pointer disabled:opacity-50"
          >
            <RotateCcw className={`w-3.5 h-3.5 ${animStatus === 'dropping' ? 'animate-spin' : ''}`} />
            <span>{isRTL ? 'إعادة الإسقاط' : 'Replay Drop'}</span>
          </button>
        </div>
      </div>

      {/* SHAKEABLE VIEWPORT CONTAINER */}
      <div 
        ref={viewportRef}
        className="relative w-full aspect-[16/10] sm:aspect-[16/9] lg:aspect-[21/10] overflow-hidden bg-[#181614] flex items-center justify-center will-change-transform"
      >
        {/* ROOM BACKGROUND (Clean Sunlit Architecture) */}
        <img
          src="/furniture/empty_living_room.jpg"
          alt="Clean Living Room"
          className="absolute inset-0 w-full h-full object-cover object-center"
        />

        {/* Ambient Room Lighting Gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/20 pointer-events-none" />

        {/* =========================================================================
            DROPPING FURNITURE PIECES & CONTACT SHADOW LAYERS
            ========================================================================= */}

        {/* 1. CREDENZA & WALL FRAMES (Back Wall Center) */}
        <div
          ref={credenzaShadowRef}
          className="absolute pointer-events-none rounded-full blur-md bg-black/70 will-change-transform"
          style={{ top: '48%', left: '33%', width: '28%', height: '5%' }}
        />
        <div
          ref={credenzaRef}
          onClick={() => setSelectedPiece('credenza')}
          className="absolute cursor-pointer will-change-transform group z-10"
          style={{ top: '16%', left: '34%', width: '26%' }}
        >
          <img
            src="/furniture/credenza_frames.png"
            alt="Credenza"
            className="w-full h-auto drop-shadow-lg group-hover:brightness-105 transition-all"
          />
        </div>
        {/* Dust puff credenza */}
        <div 
          ref={dustCredenzaRef} 
          className="absolute pointer-events-none rounded-full bg-white/30 blur-md will-change-transform z-15"
          style={{ top: '46%', left: '42%', width: '12%', height: '6%' }}
        />

        {/* 2. INDOOR FICUS PLANTS (Back Left Corner) */}
        <div
          ref={plantShadowRef}
          className="absolute pointer-events-none rounded-full blur-sm bg-black/65 will-change-transform"
          style={{ top: '56%', left: '17%', width: '12%', height: '5%' }}
        />
        <div
          ref={plantRef}
          className="absolute pointer-events-none will-change-transform z-12"
          style={{ top: '22%', left: '16%', width: '13%' }}
        >
          <img
            src="/furniture/indoor_plant.png"
            alt="Indoor Plants"
            className="w-full h-auto drop-shadow-md"
          />
        </div>

        {/* 3. BROWN LEATHER SOFA (Right side anchor) */}
        <div
          ref={sofaShadowRef}
          className="absolute pointer-events-none rounded-full blur-lg bg-black/80 will-change-transform"
          style={{ top: '65%', right: '5%', width: '42%', height: '11%' }}
        />
        <div
          ref={sofaRef}
          onClick={() => setSelectedPiece('sofa')}
          className="absolute cursor-pointer will-change-transform group z-20"
          style={{ top: '34%', right: '4%', width: '44%' }}
        >
          <img
            src="/furniture/leather_sofa.png"
            alt="Brown Leather Sofa"
            className="w-full h-auto drop-shadow-2xl group-hover:scale-[1.02] transition-transform duration-300"
          />
        </div>
        {/* Dust puff sofa impact */}
        <div 
          ref={dustSofaRef} 
          className="absolute pointer-events-none rounded-full bg-white/40 blur-lg will-change-transform z-25"
          style={{ top: '68%', right: '15%', width: '22%', height: '10%' }}
        />

        {/* 4. TWO WHITE ARMCHAIRS (Left Seating Pair) */}
        {/* Armchair 1 (Rear Left) */}
        <div
          ref={armchair1ShadowRef}
          className="absolute pointer-events-none rounded-full blur-md bg-black/70 will-change-transform"
          style={{ top: '64%', left: '10%', width: '20%', height: '8%' }}
        />
        <div
          ref={armchair1Ref}
          onClick={() => setSelectedPiece('armchairs')}
          className="absolute cursor-pointer will-change-transform group z-18"
          style={{ top: '42%', left: '10%', width: '20%' }}
        >
          <img
            src="/furniture/armchair_1.png"
            alt="Armchair With Blanket"
            className="w-full h-auto drop-shadow-xl group-hover:scale-[1.02] transition-transform duration-300"
          />
        </div>

        {/* Armchair 2 (Front Left) */}
        <div
          ref={armchair2ShadowRef}
          className="absolute pointer-events-none rounded-full blur-md bg-black/75 will-change-transform"
          style={{ top: '76%', left: '21%', width: '22%', height: '9%' }}
        />
        <div
          ref={armchair2Ref}
          onClick={() => setSelectedPiece('armchairs')}
          className="absolute cursor-pointer will-change-transform group z-24"
          style={{ top: '53%', left: '21%', width: '22%' }}
        >
          <img
            src="/furniture/armchair_2.png"
            alt="Armchair Minimalist"
            className="w-full h-auto drop-shadow-2xl group-hover:scale-[1.02] transition-transform duration-300"
          />
        </div>
        {/* Dust puff armchairs */}
        <div 
          ref={dustArmchairsRef} 
          className="absolute pointer-events-none rounded-full bg-white/35 blur-md will-change-transform z-26"
          style={{ top: '75%', left: '18%', width: '16%', height: '8%' }}
        />

        {/* 5. COFFEE TABLE (Center of seating area) */}
        <div
          ref={tableShadowRef}
          className="absolute pointer-events-none rounded-full blur-md bg-black/80 will-change-transform"
          style={{ top: '74%', left: '41%', width: '22%', height: '8%' }}
        />
        <div
          ref={tableRef}
          onClick={() => setSelectedPiece('table')}
          className="absolute cursor-pointer will-change-transform group z-22"
          style={{ top: '56%', left: '40%', width: '24%' }}
        >
          <img
            src="/furniture/coffee_table.png"
            alt="Coffee Table"
            className="w-full h-auto drop-shadow-2xl group-hover:scale-[1.03] transition-transform duration-300"
          />
        </div>
        {/* Dust puff coffee table */}
        <div 
          ref={dustTableRef} 
          className="absolute pointer-events-none rounded-full bg-white/30 blur-md will-change-transform z-23"
          style={{ top: '74%', left: '46%', width: '12%', height: '6%' }}
        />

        {/* 6. SIDE TABLE (Front Right) */}
        <div
          ref={sideTableShadowRef}
          className="absolute pointer-events-none rounded-full blur-sm bg-black/60 will-change-transform"
          style={{ top: '78%', right: '3%', width: '10%', height: '6%' }}
        />
        <div
          ref={sideTableRef}
          className="absolute pointer-events-none will-change-transform z-28"
          style={{ top: '58%', right: '2%', width: '11%' }}
        >
          <img
            src="/furniture/side_table.png"
            alt="Side Table"
            className="w-full h-auto drop-shadow-xl"
          />
        </div>

        {/* =========================================================================
            DIMENSIONAL OVERLAYS & SPATIAL CALLOUTS (Elastic Pop-Up)
            ========================================================================= */}
        {showRuler && (
          <div ref={overlaysRef} className="absolute inset-0 pointer-events-none z-30 opacity-0">
            <svg
              className="absolute inset-0 w-full h-full"
              viewBox="0 0 100 100"
              preserveAspectRatio="none"
            >
              {/* Distance Line 1: Sofa to Table */}
              <line x1="48%" y1="67%" x2="62%" y2="60%" stroke="#FFFFFF" strokeWidth="0.5" strokeDasharray="1.5 1.5" opacity="0.85" />
              <circle cx="48%" cy="67%" r="0.6" fill="#B58A54" />
              <circle cx="62%" cy="60%" r="0.6" fill="#B58A54" />

              {/* Distance Line 2: Table to Armchair */}
              <line x1="38%" y1="68%" x2="44%" y2="67%" stroke="#FFFFFF" strokeWidth="0.5" strokeDasharray="1.5 1.5" opacity="0.85" />
              <circle cx="38%" cy="68%" r="0.6" fill="#B58A54" />

              {/* Clearance Datum Line */}
              <line x1="22%" y1="84%" x2="78%" y2="84%" stroke="#FFFFFF" strokeWidth="0.4" strokeDasharray="2 2" opacity="0.6" />
            </svg>

            {/* Measurement Badges */}
            <div 
              className="absolute transform -translate-x-1/2 -translate-y-1/2 px-2 py-0.5 rounded bg-black/85 backdrop-blur-md text-white text-[8px] sm:text-[9px] font-mono border border-white/20 shadow-md"
              style={{ left: '55%', top: '63%' }}
            >
              {isRTL ? 'ممر ٨٥ سم' : '85cm Walkway'}
            </div>

            <div 
              className="absolute transform -translate-x-1/2 -translate-y-1/2 px-2 py-0.5 rounded bg-black/85 backdrop-blur-md text-white text-[8px] sm:text-[9px] font-mono border border-white/20 shadow-md"
              style={{ left: '50%', top: '84%' }}
            >
              {isRTL ? 'مسافة الحركة الإجمالية: ٤.٢٠ متر' : 'Total Seating Span: 4.20 m'}
            </div>
          </div>
        )}

        {/* NUMBERED INTERACTIVE PINS (01, 02, 03) */}
        <div ref={pinsRef} className="absolute inset-0 pointer-events-none z-35">
          {/* Pin 01: Leather Sofa */}
          <div 
            onClick={() => setSelectedPiece('sofa')}
            className="pin-callout absolute transform -translate-x-1/2 -translate-y-1/2 pointer-events-auto cursor-pointer"
            style={{ top: '48%', right: '22%' }}
          >
            <div className="relative flex items-center justify-center">
              <span className="absolute -inset-2 rounded-full bg-white/40 animate-ping duration-1000" />
              <div className="w-6 h-6 rounded-full bg-[#1E1E1E] border border-white text-white text-[9px] font-bold flex items-center justify-center shadow-lg hover:scale-110 transition-transform">
                01
              </div>
            </div>
          </div>

          {/* Pin 02: Coffee Table */}
          <div 
            onClick={() => setSelectedPiece('table')}
            className="pin-callout absolute transform -translate-x-1/2 -translate-y-1/2 pointer-events-auto cursor-pointer"
            style={{ top: '62%', left: '52%' }}
          >
            <div className="relative flex items-center justify-center">
              <span className="absolute -inset-2 rounded-full bg-white/40 animate-ping duration-1000" />
              <div className="w-6 h-6 rounded-full bg-[#1E1E1E] border border-white text-white text-[9px] font-bold flex items-center justify-center shadow-lg hover:scale-110 transition-transform">
                02
              </div>
            </div>
          </div>

          {/* Pin 03: Armchair */}
          <div 
            onClick={() => setSelectedPiece('armchairs')}
            className="pin-callout absolute transform -translate-x-1/2 -translate-y-1/2 pointer-events-auto cursor-pointer"
            style={{ top: '58%', left: '26%' }}
          >
            <div className="relative flex items-center justify-center">
              <span className="absolute -inset-2 rounded-full bg-white/40 animate-ping duration-1000" />
              <div className="w-6 h-6 rounded-full bg-[#1E1E1E] border border-white text-white text-[9px] font-bold flex items-center justify-center shadow-lg hover:scale-110 transition-transform">
                03
              </div>
            </div>
          </div>
        </div>

        {/* PIECE INSPECTION POPUP TOOLTIP */}
        {selectedPiece && (
          <div 
            className="absolute z-50 bottom-6 inset-x-6 sm:inset-x-auto sm:left-6 sm:w-80 bg-white/95 dark:bg-[#181614]/95 backdrop-blur-md rounded-2xl p-4 border border-[#E2DBD0] dark:border-[#3D3833] shadow-2xl text-start animate-in fade-in zoom-in-95 duration-200"
          >
            {(() => {
              const item = furnitureItems.find(f => f.id === selectedPiece) || furnitureItems[0];
              return (
                <div className="space-y-2 text-[#1E1E1E] dark:text-[#F8F7F3]">
                  <div className="flex items-center justify-between border-b border-black/10 dark:border-white/10 pb-2">
                    <span className="text-[10px] uppercase font-bold tracking-wider text-[#8C6D45]">
                      {isRTL ? 'بيانات القطعة المسقطة ١:١' : 'SPATIAL PIECE TELEMETRY'}
                    </span>
                    <button 
                      onClick={() => setSelectedPiece(null)}
                      className="text-stone-400 hover:text-black dark:hover:text-white text-xs font-bold"
                    >
                      ✕
                    </button>
                  </div>
                  <h4 className="font-editorial text-sm font-bold leading-snug">
                    {item.title}
                  </h4>
                  <div className="text-xs font-mono text-[#8C6D45] dark:text-[#D5C1A7]">
                    {item.specs}
                  </div>
                  <div className="flex items-center gap-1.5 text-[11px] text-emerald-600 dark:text-emerald-400 font-semibold pt-1">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>{item.clearance}</span>
                  </div>
                  <div className="pt-2 flex items-center justify-between gap-2 border-t border-black/10 dark:border-white/10">
                    <button
                      onClick={() => openExperienceA()}
                      className="w-full py-1.5 rounded-lg bg-[#1E1E1E] text-white dark:bg-[#F8F7F3] dark:text-[#1E1E1E] text-[10px] font-bold uppercase tracking-wider hover:bg-[#333] transition"
                    >
                      {isRTL ? 'معاينة في مساحتك' : 'Try In Your Room'}
                    </button>
                  </div>
                </div>
              );
            })()}
          </div>
        )}
      </div>

      {/* FOOTER BAR: METRICS & REPLAY HINT */}
      <div className="p-3.5 sm:p-4 bg-[#141210] border-t border-[#2D2A26] flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-[#A39E96]">
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1.5 font-mono text-[#D5C1A7]">
            <Layers className="w-3.5 h-3.5 text-[#B58A54]" />
            <span>6 {isRTL ? 'قطع مسقطة فيزيائياً' : 'Physics-Anchored Pieces'}</span>
          </span>
          <span className="w-1 h-1 rounded-full bg-white/20" />
          <span className="flex items-center gap-1.5 text-emerald-400 font-semibold">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>{isRTL ? 'فحص الاصطدام والظلال: منجز' : 'Contact Shadow & Dust: Rendered'}</span>
          </span>
        </div>

        <div className="flex items-center gap-2 text-[11px]">
          <span>{isRTL ? 'انقر على أي قطعة لإظهار أبعادها' : 'Click any piece to inspect spatial telemetry'}</span>
        </div>
      </div>
    </div>
  );
};

