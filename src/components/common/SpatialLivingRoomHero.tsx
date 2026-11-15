import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { useLanguage } from '../../context/LanguageContext';
import { useVisualizer } from '../../context/VisualizerContext';
import { 
  Ruler, 
  CheckCircle2, 
  Sparkles, 
  ChevronLeft, 
  ChevronRight, 
  Scan, 
  Sun, 
  Moon,
  Sunset,
  Crosshair,
  Maximize2,
  ArrowRight,
  ArrowLeft,
  Volume2,
  Layers,
  Compass
} from 'lucide-react';

export interface SpatialNode {
  id: string;
  title: string;
  subtitle: string;
  dims: string;
  price: string;
  x: number; // percentage left
  y: number; // percentage top
  boxW?: number; // percentage width for AR bounding frame
  boxH?: number; // percentage height for AR bounding frame
  clearance: string;
  retailer?: string;
  material?: string;
}

export interface SpatialMeasurement {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  label: string;
  finalVal?: number;
  unit?: string;
  midX: number;
  midY: number;
}

export interface SpatialRoomSlide {
  id: string;
  title: string;
  tag: string;
  image: string;
  nodes: SpatialNode[];
  measurements: SpatialMeasurement[];
}

interface SpatialLivingRoomHeroProps {
  slides: SpatialRoomSlide[];
  activeSlide: number;
  onSlideChange: (index: number) => void;
  className?: string;
}

type LightingMode = 'day' | 'golden' | 'evening';

export const SpatialLivingRoomHero: React.FC<SpatialLivingRoomHeroProps> = ({
  slides,
  activeSlide,
  onSlideChange,
  className = ''
}) => {
  const { isRTL } = useLanguage();
  const { openExperienceA } = useVisualizer();

  const [hoveredNode, setHoveredNode] = useState<string | null>(null);
  const [selectedNode, setSelectedNode] = useState<string | null>(null);
  const [showMeasurements, setShowMeasurements] = useState(true);
  const [isScanning, setIsScanning] = useState(false);
  const [lightingMode, setLightingMode] = useState<LightingMode>('day');
  const [showGrid, setShowGrid] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0, rawX: 50, rawY: 50 });
  const [isHovering, setIsHovering] = useState(false);
  const [countProgress, setCountProgress] = useState(1); // 0 to 1 for animated measurement numbers

  const containerRef = useRef<HTMLDivElement>(null);
  const card3DRef = useRef<HTMLDivElement>(null);
  const laserRef = useRef<HTMLDivElement>(null);
  const svgOverlayRef = useRef<SVGSVGElement>(null);
  const pinsRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<SVGSVGElement>(null);

  const currentSlide = slides[activeSlide] || slides[0];
  const Arrow = isRTL ? ArrowLeft : ArrowRight;

  // 1. 3D Tilt Parallax on Mouse Move with Layered Depth
  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current || !card3DRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const nx = (e.clientX - rect.left) / rect.width - 0.5; // -0.5 to 0.5
    const ny = (e.clientY - rect.top) / rect.height - 0.5; // -0.5 to 0.5
    const rawX = Math.round(((e.clientX - rect.left) / rect.width) * 100);
    const rawY = Math.round(((e.clientY - rect.top) / rect.height) * 100);

    setMousePos({ x: nx, y: ny, rawX, rawY });

    // Smooth subtle 3D rotation (max ±7 deg)
    gsap.to(card3DRef.current, {
      rotateY: nx * 9,
      rotateX: -ny * 7,
      scale: 1.012,
      duration: 0.45,
      ease: 'power2.out',
      transformPerspective: 1200
    });
  }, []);

  const handleMouseLeave = useCallback(() => {
    setIsHovering(false);
    if (!card3DRef.current) return;
    gsap.to(card3DRef.current, {
      rotateY: 0,
      rotateX: 0,
      scale: 1,
      duration: 0.75,
      ease: 'power3.out'
    });
  }, []);

  // 2. High-Tech Laser & Spatial Radar Calibration Sweep
  const triggerLaserScan = useCallback(() => {
    if (isScanning || !laserRef.current) return;
    setIsScanning(true);
    setShowGrid(true);

    // Number count-up animation
    gsap.fromTo(
      { val: 0 },
      { val: 1 },
      {
        val: 1,
        duration: 1.6,
        ease: 'power2.out',
        onUpdate: function () {
          setCountProgress(this.targets()[0].val);
        }
      }
    );

    const tl = gsap.timeline({
      onComplete: () => {
        setIsScanning(false);
        // Fade grid back down gently
        setTimeout(() => setShowGrid(false), 800);
      }
    });

    // Reset laser position to top
    gsap.set(laserRef.current, { top: '0%', opacity: 1 });

    // Laser sweeps from 0% to 100%
    tl.to(laserRef.current, {
      top: '100%',
      duration: 1.7,
      ease: 'power2.inOut'
    });

    tl.to(laserRef.current, {
      opacity: 0,
      duration: 0.35
    }, '-=0.25');

    // Pulse measurement lines and pins
    if (svgOverlayRef.current) {
      tl.fromTo(
        svgOverlayRef.current.querySelectorAll('.flow-measurement-line'),
        { strokeWidth: 0.4, opacity: 0.3 },
        { strokeWidth: 0.85, opacity: 1, duration: 0.4, yoyo: true, repeat: 1 },
        0.4
      );
    }

    if (pinsRef.current) {
      tl.fromTo(
        pinsRef.current.querySelectorAll('.spatial-pin-btn'),
        { scale: 0.85 },
        { scale: 1.3, duration: 0.35, stagger: 0.12, yoyo: true, repeat: 1, ease: 'back.out(2)' },
        0.6
      );
    }
  }, [isScanning]);

  // Initial scan entrance on mount or slide change
  useEffect(() => {
    const timer = setTimeout(() => {
      triggerLaserScan();
    }, 450);
    return () => clearTimeout(timer);
  }, [activeSlide, triggerLaserScan]);

  const activeNodeData = currentSlide.nodes.find(n => n.id === (hoveredNode || selectedNode));

  return (
    <div 
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={handleMouseLeave}
      className={`relative w-full rounded-2xl sm:rounded-3xl select-none perspective-[1200px] ${className}`}
    >
      {/* 3D TILT WRAPPER */}
      <div 
        ref={card3DRef}
        className="w-full aspect-[4/3] sm:aspect-[16/10] lg:aspect-auto lg:h-[520px] xl:h-[590px] rounded-2xl sm:rounded-3xl overflow-hidden relative shadow-2xl border border-[#E2DBD0] dark:border-[#2D2A26] bg-[#141210] will-change-transform"
        style={{ transformStyle: 'preserve-3d' }}
      >
        {/* =========================================================================
            ROOM PHOTO (Living Architecture Image)
            ========================================================================= */}
        <img
          src={currentSlide.image}
          alt={currentSlide.title}
          key={currentSlide.id}
          className="w-full h-full object-cover object-center animate-in fade-in duration-700 scale-100 will-change-transform transition-all"
        />

        {/* =========================================================================
            ATMOSPHERIC LIGHTING MOOD ENGINE (Day / Golden Hour / Evening)
            ========================================================================= */}
        {/* Morning / Daytime Natural Sunlight */}
        <div 
          className={`absolute inset-0 pointer-events-none mix-blend-screen transition-opacity duration-1000 ${
            lightingMode === 'day' ? 'opacity-40' : 'opacity-0'
          }`}
          style={{
            background: 'radial-gradient(ellipse 70% 60% at 85% 30%, rgba(255, 235, 190, 0.5) 0%, rgba(210, 160, 90, 0.15) 50%, transparent 100%)'
          }}
        />

        {/* Golden Hour Sunset Amber Glow */}
        <div 
          className={`absolute inset-0 pointer-events-none mix-blend-color-dodge transition-opacity duration-1000 ${
            lightingMode === 'golden' ? 'opacity-55' : 'opacity-0'
          }`}
          style={{
            background: 'radial-gradient(ellipse 80% 70% at 90% 25%, rgba(255, 170, 70, 0.6) 0%, rgba(230, 110, 40, 0.3) 45%, transparent 85%)'
          }}
        />

        {/* Atmospheric Evening Mood with Warm Floor Lamp Contrast */}
        <div 
          className={`absolute inset-0 pointer-events-none mix-blend-multiply transition-opacity duration-1000 ${
            lightingMode === 'evening' ? 'opacity-60 bg-[#120F1D]' : 'opacity-0'
          }`}
        />
        <div 
          className={`absolute inset-0 pointer-events-none mix-blend-screen transition-opacity duration-1000 ${
            lightingMode === 'evening' ? 'opacity-50' : 'opacity-0'
          }`}
          style={{
            background: 'radial-gradient(circle 35% at 32% 52%, rgba(255, 205, 120, 0.55) 0%, rgba(255, 160, 50, 0.2) 40%, transparent 80%)'
          }}
        />

        {/* Drifting Golden Sunlight Dust Motes (when Day or Golden) */}
        {(lightingMode === 'day' || lightingMode === 'golden') && (
          <div className="absolute inset-0 pointer-events-none overflow-hidden z-12">
            <div className="absolute top-[20%] right-[15%] w-2 h-2 rounded-full bg-amber-200/50 blur-[1px] animate-pulse duration-1000" />
            <div className="absolute top-[28%] right-[22%] w-1.5 h-1.5 rounded-full bg-white/60 blur-[0.5px] animate-ping duration-1500" />
            <div className="absolute top-[38%] right-[12%] w-2.5 h-2.5 rounded-full bg-amber-100/40 blur-[1px] animate-pulse duration-700" />
            <div className="absolute top-[48%] right-[28%] w-1.5 h-1.5 rounded-full bg-white/50 blur-[0.5px] animate-bounce duration-2000" />
          </div>
        )}

        {/* Ambient Darkened Vignette for Crisp Contrast */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-black/30 pointer-events-none" />

        {/* =========================================================================
            SPATIAL DEPTH & PERSPECTIVE FLOOR GRID (Appears on Scan & Toggle)
            ========================================================================= */}
        <svg
          ref={gridRef}
          className={`absolute inset-0 w-full h-full pointer-events-none z-14 transition-opacity duration-700 ${
            showGrid || isScanning ? 'opacity-65' : 'opacity-0'
          }`}
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
        >
          <defs>
            <linearGradient id="grid-fade" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#B58A54" stopOpacity="0" />
              <stop offset="60%" stopColor="#B58A54" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0.8" />
            </linearGradient>
          </defs>
          {/* Vanishing Floor Lines converging towards Room Center */}
          <line x1="0" y1="100" x2="48" y2="55" stroke="url(#grid-fade)" strokeWidth="0.3" strokeDasharray="1.5 2" />
          <line x1="20" y1="100" x2="49" y2="55" stroke="url(#grid-fade)" strokeWidth="0.3" strokeDasharray="1.5 2" />
          <line x1="40" y1="100" x2="50" y2="55" stroke="url(#grid-fade)" strokeWidth="0.3" strokeDasharray="1.5 2" />
          <line x1="60" y1="100" x2="51" y2="55" stroke="url(#grid-fade)" strokeWidth="0.3" strokeDasharray="1.5 2" />
          <line x1="80" y1="100" x2="52" y2="55" stroke="url(#grid-fade)" strokeWidth="0.3" strokeDasharray="1.5 2" />
          <line x1="100" y1="100" x2="53" y2="55" stroke="url(#grid-fade)" strokeWidth="0.3" strokeDasharray="1.5 2" />

          {/* Concentric Horizontal Floor Rungs */}
          <line x1="5" y1="92" x2="95" y2="92" stroke="url(#grid-fade)" strokeWidth="0.35" strokeDasharray="2 3" />
          <line x1="18" y1="82" x2="82" y2="82" stroke="url(#grid-fade)" strokeWidth="0.3" strokeDasharray="2 3" />
          <line x1="28" y1="72" x2="72" y2="72" stroke="url(#grid-fade)" strokeWidth="0.25" strokeDasharray="2 3" />
          <line x1="38" y1="62" x2="62" y2="62" stroke="url(#grid-fade)" strokeWidth="0.2" strokeDasharray="2 3" />
        </svg>

        {/* =========================================================================
            LASER HUD RADAR SWEEP (Spatial Calibration Bar)
            ========================================================================= */}
        <div 
          ref={laserRef}
          className="absolute inset-x-0 h-1 pointer-events-none z-25 opacity-0 will-change-transform"
          style={{ top: '0%' }}
        >
          {/* Laser Core Line */}
          <div className="w-full h-[2px] bg-gradient-to-r from-transparent via-[#C5A371] via-white via-[#C5A371] to-transparent shadow-[0_0_20px_#E2B87F]" />
          {/* Laser Light Gradient Glow Fan */}
          <div className="w-full h-16 -mt-8 bg-gradient-to-b from-[#B58A54]/30 via-[#B58A54]/12 to-transparent blur-xs pointer-events-none" />
          {/* Central Target Scanner Reticle */}
          <div className="absolute left-1/2 -top-3 transform -translate-x-1/2 flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-black/80 backdrop-blur-md text-[8px] font-mono font-bold text-amber-300 border border-amber-400/40">
            <Scan className="w-2.5 h-2.5 animate-spin" />
            <span>CALIBRATING SPATIAL DATUM...</span>
          </div>
        </div>

        {/* =========================================================================
            TOP HUD STATUS BAR & QUICK CONTROLS
            ========================================================================= */}
        <div className="absolute top-3.5 left-3.5 sm:top-5 sm:left-5 right-3.5 sm:right-5 z-30 flex items-center justify-between gap-2 pointer-events-auto">
          {/* Left: Spatial Calibration Status Pill */}
          <div className="flex items-center gap-1.5 sm:gap-2.5 bg-[#1E1E1E]/85 dark:bg-[#141210]/90 backdrop-blur-md text-[#F6F3EE] px-2.5 sm:px-3.5 py-1.5 rounded-full text-[9px] sm:text-[10px] tracking-[0.14em] uppercase font-bold border border-white/15 shadow-md max-w-[calc(100%-8rem)]">
            <span className={`w-2 h-2 rounded-full ${isScanning ? 'bg-amber-400 animate-ping' : 'bg-emerald-400 animate-pulse'} shrink-0`} />
            <span className="hidden sm:inline truncate">
              {isScanning 
                ? (isRTL ? 'جاري المسح المكاني بالأشعة...' : 'SPATIAL LASER SCANNING...') 
                : (isRTL ? 'المعايرة المكانية: نشطة · المقياس ١:١' : 'SPATIAL CALIBRATION: ACTIVE · SCALE 1:1')}
            </span>
            <span className="sm:hidden font-mono">
              {isScanning ? (isRTL ? 'مسح...' : 'SCAN') : (isRTL ? '١:١' : '1:1')}
            </span>
            {/* Live Mouse Datum Coordinates on Desktop */}
            <span className="hidden xl:inline text-[#A39E96] font-mono text-[9px] border-l border-white/20 pl-2">
              X: {(mousePos.x * 5 + 3.2).toFixed(2)}m · Y: {(mousePos.y * 3 + 2.1).toFixed(2)}m · Z: 0.85m
            </span>
          </div>

          {/* Right: Interactive Tools (Scan, Atmosphere Moods, Grid, Ruler) */}
          <div className="flex items-center gap-1.5 sm:gap-2">
            {/* Quick Laser Scan Button */}
            <button
              onClick={triggerLaserScan}
              disabled={isScanning}
              className={`p-1.5 sm:p-2 rounded-full text-xs transition-all backdrop-blur-md shadow-sm cursor-pointer flex items-center justify-center ${
                isScanning 
                  ? 'bg-[#B58A54] text-white animate-spin' 
                  : 'bg-[#1E1E1E]/75 hover:bg-[#1E1E1E] text-white border border-white/15 hover:border-amber-400/50'
              }`}
              title="Trigger Spatial Laser Calibration"
              aria-label="Laser Scan"
            >
              <Scan className="w-3.5 h-3.5" />
            </button>

            {/* Atmosphere Mood Selector (Day / Golden / Evening) */}
            <button
              onClick={() => {
                const nextMode: Record<LightingMode, LightingMode> = {
                  day: 'golden',
                  golden: 'evening',
                  evening: 'day'
                };
                setLightingMode(nextMode[lightingMode]);
              }}
              className="p-1.5 sm:p-2 rounded-full text-xs transition-all backdrop-blur-md shadow-sm cursor-pointer flex items-center justify-center bg-[#1E1E1E]/75 hover:bg-[#1E1E1E] border border-white/15 hover:border-amber-400/50 text-white"
              title={`Switch Lighting: Current ${lightingMode.toUpperCase()}`}
              aria-label="Switch Lighting Mood"
            >
              {lightingMode === 'day' && <Sun className="w-3.5 h-3.5 text-amber-300" />}
              {lightingMode === 'golden' && <Sunset className="w-3.5 h-3.5 text-orange-400" />}
              {lightingMode === 'evening' && <Moon className="w-3.5 h-3.5 text-indigo-300" />}
            </button>

            {/* Toggle Spatial Grid */}
            <button
              onClick={() => setShowGrid(!showGrid)}
              className={`p-1.5 sm:p-2 rounded-full text-xs transition-all backdrop-blur-md shadow-sm cursor-pointer flex items-center justify-center ${
                showGrid
                  ? 'bg-[#B58A54] text-white border border-amber-300'
                  : 'bg-[#1E1E1E]/75 text-[#F6F3EE] hover:bg-[#1E1E1E] border border-white/15'
              }`}
              title="Toggle Spatial Perspective Grid"
              aria-label="Perspective Grid"
            >
              <Layers className="w-3.5 h-3.5" />
            </button>

            {/* Measurement Overlays Toggle */}
            <button
              onClick={() => setShowMeasurements(!showMeasurements)}
              className={`p-1.5 sm:p-2 rounded-full text-xs transition-all backdrop-blur-md shadow-sm cursor-pointer flex items-center justify-center ${
                showMeasurements
                  ? 'bg-white text-[#1E1E1E] border border-white'
                  : 'bg-[#1E1E1E]/75 text-[#F6F3EE] hover:bg-[#1E1E1E] border border-white/15'
              }`}
              title={showMeasurements ? 'Hide Dimensions' : 'Show Dimensions'}
              aria-label="Toggle spatial dimensions"
            >
              <Ruler className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* =========================================================================
            ANIMATED FLOWING SVG MEASUREMENT LINES & TRAVELING PULSE BEADS
            ========================================================================= */}
        {showMeasurements && (
          <svg
            ref={svgOverlayRef}
            className="absolute inset-0 w-full h-full pointer-events-none z-16"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
          >
            <defs>
              <filter id="spatial-shadow" x="-25%" y="-25%" width="150%" height="150%">
                <feDropShadow dx="0" dy="1.5" stdDeviation="1.5" floodColor="#000000" floodOpacity="0.85" />
              </filter>
              {/* Flowing Animation Style for Dotted Lines */}
              <style>{`
                @keyframes flowDashes {
                  0% { stroke-dashoffset: 0; }
                  100% { stroke-dashoffset: -20; }
                }
                .flow-measurement-line {
                  animation: flowDashes 1.6s linear infinite;
                }
              `}</style>
            </defs>

            {currentSlide.measurements.map((m, idx) => (
              <g key={idx} filter="url(#spatial-shadow)">
                {/* Primary Flowing Dotted Measurement Line */}
                <line
                  className="flow-measurement-line"
                  x1={`${m.x1}%`}
                  y1={`${m.y1}%`}
                  x2={`${m.x2}%`}
                  y2={`${m.y2}%`}
                  stroke="#FFFFFF"
                  strokeWidth="0.55"
                  strokeDasharray="2.2 2"
                  opacity="0.94"
                />

                {/* Sub-line Glow Halo */}
                <line
                  x1={`${m.x1}%`}
                  y1={`${m.y1}%`}
                  x2={`${m.x2}%`}
                  y2={`${m.y2}%`}
                  stroke="#B58A54"
                  strokeWidth="0.2"
                  opacity="0.6"
                />

                {/* Luminous End Tick Marks (Crosshair Style) */}
                <circle cx={`${m.x1}%`} cy={`${m.y1}%`} r="0.8" fill="#B58A54" stroke="#FFFFFF" strokeWidth="0.35" />
                <circle cx={`${m.x2}%`} cy={`${m.y2}%`} r="0.8" fill="#B58A54" stroke="#FFFFFF" strokeWidth="0.35" />
              </g>
            ))}
          </svg>
        )}

        {/* =========================================================================
            FLOATING HTML DIMENSIONAL BADGES (Elevated in 3D Space)
            ========================================================================= */}
        {showMeasurements && currentSlide.measurements.map((m, idx) => {
          const match = m.label.match(/^([0-9.]+)\s*(m|cm)\b/i);
          const rawFinal = m.finalVal ?? (match ? parseFloat(match[1]) : 1);
          const unit = m.unit ?? (match ? match[2] : '');
          const labelSuffix = match ? m.label.replace(/^([0-9.]+)\s*(m|cm)\s*/i, '') : m.label;
          const displayVal = countProgress >= 0.98 
            ? (match ? `${match[1]} ${unit}` : m.label) 
            : `${(rawFinal * countProgress).toFixed(unit === 'm' ? 2 : 0)} ${unit}`;

          return (
            <div
              key={`badge-${idx}`}
              className="absolute z-22 pointer-events-none transform -translate-x-1/2 -translate-y-1/2 px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-md bg-[#1A1815]/92 dark:bg-[#100E0C]/95 backdrop-blur-md text-[#F6F3EE] text-[8px] sm:text-[9px] font-mono tracking-wider border border-white/25 shadow-lg whitespace-nowrap animate-in fade-in zoom-in-95 duration-300"
              style={{ 
                left: `${m.midX}%`, 
                top: `${m.midY}%`,
                boxShadow: '0 4px 16px rgba(0,0,0,0.5)',
                transform: `translate(-50%, -50%) translateZ(40px)`
              }}
            >
              <span className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#C5A371] animate-pulse" />
                <span className="font-bold text-white tracking-wide">
                  {displayVal} {labelSuffix}
                </span>
              </span>
            </div>
          );
        })}

        {/* =========================================================================
            AR WIREFRAME BOUNDING BOX (Hugging active furniture item)
            ========================================================================= */}
        {activeNodeData && activeNodeData.boxW && activeNodeData.boxH && (
          <div
            className="absolute pointer-events-none z-20 border border-amber-300/60 rounded-xl transition-all duration-300 animate-in fade-in zoom-in-95"
            style={{
              left: `${activeNodeData.x - (activeNodeData.boxW / 2)}%`,
              top: `${activeNodeData.y - (activeNodeData.boxH / 2)}%`,
              width: `${activeNodeData.boxW}%`,
              height: `${activeNodeData.boxH}%`,
              boxShadow: '0 0 25px rgba(181, 138, 84, 0.35)',
              background: 'radial-gradient(ellipse at center, rgba(181, 138, 84, 0.08) 0%, transparent 80%)'
            }}
          >
            {/* AR Corner Reticle Brackets ┌ ┐ └ ┘ */}
            <span className="absolute -top-1 -left-1 w-3 h-3 border-t-2 border-l-2 border-amber-400" />
            <span className="absolute -top-1 -right-1 w-3 h-3 border-t-2 border-r-2 border-amber-400" />
            <span className="absolute -bottom-1 -left-1 w-3 h-3 border-b-2 border-l-2 border-amber-400" />
            <span className="absolute -bottom-1 -right-1 w-3 h-3 border-b-2 border-r-2 border-amber-400" />

            {/* Micro Tag Label */}
            <div className="absolute -top-5 left-2 px-1.5 py-0.5 rounded bg-black/80 text-[7px] font-mono uppercase tracking-wider text-amber-300 border border-amber-400/40">
              TARGET LOCK · {activeNodeData.title}
            </div>
          </div>
        )}

        {/* =========================================================================
            ANIMATED INTERACTIVE PINS (01, 02, 03) WITH CONCENTRIC SONAR RIPPLES
            ========================================================================= */}
        <div ref={pinsRef} className="absolute inset-0 pointer-events-none z-25">
          {currentSlide.nodes.map((node, idx) => {
            const isHovered = hoveredNode === node.id || selectedNode === node.id;

            return (
              <div
                key={node.id}
                className="absolute transform -translate-x-1/2 -translate-y-1/2 pointer-events-auto"
                style={{ 
                  left: `${node.x}%`, 
                  top: `${node.y}%`,
                  transform: `translate(-50%, -50%) translateZ(60px)`
                }}
                onMouseEnter={() => setHoveredNode(node.id)}
                onMouseLeave={() => setHoveredNode(null)}
                onClick={() => setSelectedNode(selectedNode === node.id ? null : node.id)}
              >
                {/* Sonar Ping Concentric Ripples */}
                <div className="relative flex items-center justify-center cursor-pointer group">
                  {/* Outer Concentric Wave */}
                  <span className="absolute -inset-3.5 rounded-full bg-white/30 animate-ping duration-1000 pointer-events-none" />
                  {/* Inner Concentric Wave */}
                  <span className="absolute -inset-1.5 rounded-full bg-[#B58A54]/60 animate-pulse duration-700 pointer-events-none" />

                  {/* Pin Circle Button */}
                  <button
                    className={`spatial-pin-btn w-6 h-6 sm:w-7 sm:h-7 rounded-full flex items-center justify-center text-[9px] sm:text-[10px] font-bold border transition-all duration-300 shadow-lg ${
                      isHovered
                        ? 'bg-[#B58A54] text-white border-white scale-125 shadow-amber-500/50'
                        : 'bg-white/95 text-[#1E1E1E] border-black/15 group-hover:scale-115'
                    }`}
                    aria-label={node.title}
                  >
                    <span>0{idx + 1}</span>
                  </button>
                </div>

                {/* Sleek Tooltip Popover with Certified Egyptian SKU Details */}
                {isHovered && (
                  <div
                    className={`absolute z-40 bottom-9 ${
                      node.x > 60 ? 'right-0' : node.x < 40 ? 'left-0' : '-left-24 sm:-left-28'
                    } w-64 sm:w-72 bg-white/95 dark:bg-[#1A1815]/95 backdrop-blur-md rounded-2xl p-3.5 sm:p-4 border border-[#E2DBD0] dark:border-[#3D3833] shadow-2xl text-start animate-in fade-in zoom-in-95 duration-150`}
                  >
                    <div className="flex items-center justify-between gap-2 pb-1.5 border-b border-[#E2DBD0]/60 dark:border-[#2D2A26] mb-2">
                      <span className="text-[9px] uppercase tracking-wider font-bold text-[#8C6D45] truncate">
                        {node.subtitle}
                      </span>
                      <div className="flex items-center gap-1 text-[9px] font-semibold text-emerald-600 dark:text-emerald-400 shrink-0">
                        <CheckCircle2 className="w-3 h-3" />
                        <span>{isRTL ? 'مطابق ١:١' : 'True Fit 1:1'}</span>
                      </div>
                    </div>

                    <h4 className="font-editorial text-xs sm:text-sm font-bold text-[#1E1E1E] dark:text-white leading-tight mb-1">
                      {node.title}
                    </h4>

                    {node.material && (
                      <p className="text-[9px] text-[#8C6D45] dark:text-[#C5A371] font-medium mb-1.5">
                        {node.material}
                      </p>
                    )}

                    <div className="flex items-center justify-between text-xs text-[#4A4A4A] dark:text-[#A39E96] pt-1">
                      <span className="font-mono text-[9px] sm:text-[10px] bg-[#EAE2D6] dark:bg-[#25211D] px-2 py-0.5 rounded text-[#1E1E1E] dark:text-[#F8F7F3] font-medium">
                        {node.dims}
                      </span>
                      <span className="font-bold text-[11px] sm:text-xs text-[#1E1E1E] dark:text-white font-editorial">
                        {node.price}
                      </span>
                    </div>

                    <p className="text-[9px] sm:text-[10px] text-[#6E6A63] dark:text-[#A39E96] mt-2 italic border-t border-[#E2DBD0]/40 dark:border-[#2D2A26] pt-1.5 truncate">
                      {node.clearance}
                    </p>

                    <div className="mt-2.5 pt-2 border-t border-[#E2DBD0]/60 dark:border-[#2D2A26] flex items-center justify-between gap-2">
                      <Link
                        to="/showroom"
                        className="text-[9px] sm:text-[10px] uppercase tracking-wider font-bold text-[#1E1E1E] dark:text-white hover:underline flex items-center gap-1"
                      >
                        <span>{isRTL ? 'معاينة بالكتالوج' : 'Catalog SKU'}</span>
                        <Arrow className="w-2.5 h-2.5" />
                      </Link>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          openExperienceA();
                        }}
                        className="px-2.5 py-1 rounded-lg bg-[#1E1E1E] text-white text-[9px] font-bold uppercase tracking-wider hover:bg-[#333333] transition cursor-pointer shadow-xs active:scale-95"
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

      </div>

      {/* =========================================================================
          CONTROL BAR BELOW THE IMAGE (Preset Tabs & Prev/Next Arrows)
          ========================================================================= */}
      <div className="w-full flex items-center justify-between gap-2 p-1.5 sm:p-2 rounded-2xl bg-[#EAE2D6]/80 dark:bg-[#141210]/80 backdrop-blur-md border border-[#E2DBD0] dark:border-[#2D2A26] shadow-xs mt-3">
        {/* Presets Tab Switcher */}
        <div className="flex items-center gap-1 flex-1 sm:flex-initial">
          {slides.map((slide, idx) => (
            <button
              key={slide.id}
              onClick={() => {
                onSlideChange(idx);
                setHoveredNode(null);
                setSelectedNode(null);
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
              onSlideChange(activeSlide === 0 ? slides.length - 1 : activeSlide - 1);
              setHoveredNode(null);
              setSelectedNode(null);
            }}
            className="w-8 h-8 rounded-xl bg-white dark:bg-[#1E1C1A] hover:bg-[#F6F3EE] dark:hover:bg-[#25211D] border border-[#E2DBD0] dark:border-[#2D2A26] text-[#1E1E1E] dark:text-white flex items-center justify-center transition shadow-2xs cursor-pointer active:scale-95"
            aria-label="Previous room preset"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            onClick={() => {
              onSlideChange(activeSlide === slides.length - 1 ? 0 : activeSlide + 1);
              setHoveredNode(null);
              setSelectedNode(null);
            }}
            className="w-8 h-8 rounded-xl bg-white dark:bg-[#1E1C1A] hover:bg-[#F6F3EE] dark:hover:bg-[#25211D] border border-[#E2DBD0] dark:border-[#2D2A26] text-[#1E1E1E] dark:text-white flex items-center justify-center transition shadow-2xs cursor-pointer active:scale-95"
            aria-label="Next room preset"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
