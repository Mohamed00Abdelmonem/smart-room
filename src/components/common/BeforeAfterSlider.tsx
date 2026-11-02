import React, { useState, useRef, useCallback, useEffect } from 'react';
import { Sparkles, SlidersHorizontal, Eye } from 'lucide-react';

interface Hotspot {
  id: string;
  productId: string;
  x: number;
  y: number;
  label: string;
}

interface BeforeAfterSliderProps {
  beforeImage: string;
  afterImage: string;
  beforeLabel?: string;
  afterLabel?: string;
  hotspots?: Hotspot[];
  onHotspotClick?: (productId: string) => void;
  className?: string;
  aspectRatio?: string;
}

export const BeforeAfterSlider: React.FC<BeforeAfterSliderProps> = ({
  beforeImage,
  afterImage,
  beforeLabel = 'Original Room',
  afterLabel = 'Furnished with Roomora',
  hotspots = [],
  onHotspotClick,
  className = '',
  aspectRatio = 'aspect-[16/10] sm:aspect-[16/9]',
}) => {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const [showHotspots, setShowHotspots] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMove = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    let position = (x / rect.width) * 100;
    if (position < 2) position = 2;
    if (position > 98) position = 98;
    setSliderPosition(position);
  }, []);

  const handleTouchMove = useCallback((e: TouchEvent) => {
    if (!isDragging) return;
    handleMove(e.touches[0].clientX);
  }, [isDragging, handleMove]);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!isDragging) return;
    handleMove(e.clientX);
  }, [isDragging, handleMove]);

  const handleInteractionEnd = useCallback(() => {
    setIsDragging(false);
  }, []);

  useEffect(() => {
    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleInteractionEnd);
      window.addEventListener('touchmove', handleTouchMove);
      window.addEventListener('touchend', handleInteractionEnd);
    }
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleInteractionEnd);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleInteractionEnd);
    };
  }, [isDragging, handleMouseMove, handleTouchMove, handleInteractionEnd]);

  const handleContainerClick = (e: React.MouseEvent<HTMLDivElement>) => {
    handleMove(e.clientX);
  };

  return (
    <div className={`relative select-none overflow-hidden rounded-2xl border border-[#D8C7AE]/60 shadow-xl bg-[#22221F] ${className}`}>
      <div
        ref={containerRef}
        onClick={handleContainerClick}
        className={`relative w-full ${aspectRatio} overflow-hidden cursor-ew-resize group`}
      >
        {/* After Image (Background, fully visible on the right) */}
        <img
          src={afterImage}
          alt={afterLabel}
          className="absolute inset-0 w-full h-full object-cover pointer-events-none"
        />

        {/* Hotspots Overlay (only on After image) */}
        {showHotspots && hotspots.length > 0 && (
          <div className="absolute inset-0 pointer-events-none z-10">
            {hotspots.map((hs) => {
              // Only show hotspot if it's within the revealed "After" region or visible
              const isVisible = hs.x >= sliderPosition - 5;
              return (
                <div
                  key={hs.id}
                  style={{ left: `${hs.x}%`, top: `${hs.y}%` }}
                  className={`absolute -translate-x-1/2 -translate-y-1/2 pointer-events-auto transition-opacity duration-300 ${
                    isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-75 pointer-events-none'
                  }`}
                >
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      if (onHotspotClick) onHotspotClick(hs.productId);
                    }}
                    className="relative group/hotspot flex items-center justify-center"
                    title={`View ${hs.label}`}
                  >
                    <span className="absolute w-8 h-8 rounded-full bg-[#858B70]/40 animate-ping" />
                    <span className="relative flex items-center justify-center w-6 h-6 rounded-full bg-[#22221F] border-2 border-[#D8C7AE] text-white shadow-lg transition-transform hover:scale-125">
                      <Sparkles className="w-3 h-3 text-[#D8C7AE]" />
                    </span>

                    {/* Popover Tooltip */}
                    <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover/hotspot:flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#22221F]/95 backdrop-blur-md text-white text-xs font-medium whitespace-nowrap shadow-xl border border-[#D8C7AE]/30 z-30">
                      <span>{hs.label}</span>
                      <span className="text-[#858B70] text-[10px]">· Click to inspect</span>
                    </span>
                  </button>
                </div>
              );
            })}
          </div>
        )}

        {/* Before Image (Foreground, clipped by slider position) */}
        <div
          className="absolute inset-0 overflow-hidden pointer-events-none"
          style={{ width: `${sliderPosition}%` }}
        >
          <img
            src={beforeImage}
            alt={beforeLabel}
            className="absolute inset-0 w-full h-full object-cover max-w-none"
            style={{
              width: containerRef.current ? `${containerRef.current.clientWidth}px` : '100%',
              height: '100%',
            }}
          />
        </div>

        {/* Vertical Divider Line & Draggable Handle */}
        <div
          className="absolute top-0 bottom-0 z-20"
          style={{ left: `${sliderPosition}%` }}
        >
          {/* Vertical line with subtle glow */}
          <div className="absolute top-0 bottom-0 -left-[1.5px] w-[3px] bg-[#F7F5F0] shadow-[0_0_12px_rgba(0,0,0,0.5)]" />

          {/* Central Handle Pill */}
          <div
            onMouseDown={(e) => {
              e.stopPropagation();
              setIsDragging(true);
            }}
            onTouchStart={(e) => {
              e.stopPropagation();
              setIsDragging(true);
            }}
            className="absolute top-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center w-10 h-10 rounded-full bg-[#22221F] border-2 border-[#D8C7AE] text-white shadow-2xl cursor-grab active:cursor-grabbing hover:scale-110 transition-transform"
          >
            <SlidersHorizontal className="w-4 h-4 text-[#D8C7AE]" />
          </div>
        </div>

        {/* Labels in Corners */}
        <div className="absolute top-4 left-4 z-10 pointer-events-none">
          <div className="px-3 py-1.5 rounded-full bg-[#22221F]/80 backdrop-blur-md border border-white/10 text-white text-xs font-semibold tracking-wider uppercase flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-stone-400"></span>
            {beforeLabel}
          </div>
        </div>

        <div className="absolute top-4 right-4 z-10 pointer-events-none">
          <div className="px-3 py-1.5 rounded-full bg-[#22221F]/80 backdrop-blur-md border border-[#858B70]/40 text-[#D8C7AE] text-xs font-semibold tracking-wider uppercase flex items-center gap-1.5 shadow-md">
            <span className="w-2 h-2 rounded-full bg-[#858B70] animate-pulse"></span>
            {afterLabel}
          </div>
        </div>

        {/* Instruction hint at bottom */}
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-10 pointer-events-none">
          <div className="px-3 py-1 rounded-full bg-[#22221F]/70 backdrop-blur-sm text-[11px] text-[#D8C7AE]/90 tracking-wide flex items-center gap-1.5">
            <span>‹ Drag or tap to compare ›</span>
          </div>
        </div>
      </div>

      {/* Control bar below the image if hotspots exist */}
      {hotspots.length > 0 && (
        <div className="px-4 py-2.5 bg-[#1C1C19] border-t border-[#D8C7AE]/20 flex items-center justify-between text-xs text-[#D8C7AE]">
          <div className="flex items-center gap-2">
            <span className="inline-block w-2 h-2 rounded-full bg-[#858B70]" />
            <span className="text-white/80 font-medium">
              {hotspots.length} Retailer Catalog Pieces Placed
            </span>
          </div>
          <button
            onClick={() => setShowHotspots(!showHotspots)}
            className="flex items-center gap-1.5 text-xs text-[#D8C7AE] hover:text-white transition-colors cursor-pointer"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>{showHotspots ? 'Hide Product Pins' : 'Show Product Pins'}</span>
          </button>
        </div>
      )}
    </div>
  );
};

