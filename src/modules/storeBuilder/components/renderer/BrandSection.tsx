import React from 'react';
import { StoreSection, GlobalThemeSettings, DeviceViewport } from '../../types';
import { ArrowRight, Sparkles, CheckCircle2 } from 'lucide-react';

interface BrandSectionProps {
  section: StoreSection;
  theme: GlobalThemeSettings;
  onNavigateToAbout?: () => void;
  viewport?: DeviceViewport;
}

export const BrandSection: React.FC<BrandSectionProps> = ({
  section,
  theme,
  onNavigateToAbout,
  viewport = 'desktop',
}) => {
  const { content, design } = section;

  const isMobile = viewport === 'mobile';
  const isTablet = viewport === 'tablet';

  return (
    <section 
      className={`w-full ${isMobile ? 'py-10' : 'py-16 sm:py-24'} transition-colors overflow-hidden`}
      style={{
        backgroundColor: design.backgroundColor || theme.colors.background,
        color: design.textColor || theme.colors.text,
      }}
    >
      <div 
        className="mx-auto px-4 sm:px-6 lg:px-8"
        style={{
          maxWidth: theme.layout.containerMaxWidth === 'full' ? '100%' : theme.layout.containerMaxWidth,
        }}
      >
        <div className={`grid ${
          isMobile 
            ? 'grid-cols-1 gap-8' 
            : isTablet 
            ? 'grid-cols-1 md:grid-cols-2 gap-8 items-center' 
            : 'grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center'
        }`}>
          {/* Visual Showcase */}
          <div className={`${!isMobile && !isTablet ? 'lg:col-span-6' : ''} relative ${isMobile ? 'order-2' : 'order-2 lg:order-1'}`}>
            <div 
              className={`w-full ${isMobile ? 'aspect-[16/10] rounded-xl' : 'aspect-[4/3] rounded-3xl'} overflow-hidden shadow-xl sm:shadow-2xl border`}
              style={{ borderColor: theme.colors.border }}
            >
              <img 
                src={content.imageUrl || 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7'} 
                alt={content.title || 'Craftsmanship'}
                className="w-full h-full object-cover object-center"
              />
            </div>
            
            {/* Architectural Callout Badge */}
            <div 
              className={`${
                isMobile 
                  ? 'mt-3 p-3 rounded-xl border bg-white dark:bg-[#1C1A17] text-start space-y-1' 
                  : 'absolute -bottom-6 -right-4 sm:-bottom-8 sm:right-6 p-4 sm:p-5 rounded-2xl bg-white dark:bg-[#1C1A17] border shadow-xl max-w-xs text-start space-y-1.5'
              }`}
              style={{ borderColor: theme.colors.border }}
            >
              <div className="flex items-center gap-1.5 text-xs font-bold" style={{ color: theme.colors.accent }}>
                <Sparkles className="w-3.5 h-3.5" />
                <span>ARTISAN PRECISION</span>
              </div>
              <p className="text-[10px] sm:text-[11px] text-stone-500 leading-snug">
                100% Solid European Hardwoods & Authentic Italian Marble Quarried in Carrara.
              </p>
            </div>
          </div>

          {/* Copy Column */}
          <div className={`${!isMobile && !isTablet ? 'lg:col-span-6' : ''} space-y-4 sm:space-y-6 text-start ${isMobile ? 'order-1' : 'order-1 lg:order-2'}`}>
            {content.tag && (
              <span 
                className="text-[9px] sm:text-[10px] tracking-[0.2em] font-bold uppercase block"
                style={{ color: theme.colors.accent }}
              >
                {content.tag}
              </span>
            )}

            <h2 
              className={`${isMobile ? 'text-xl sm:text-2xl' : 'text-2xl sm:text-4xl'} font-bold tracking-tight leading-tight`}
              style={{ fontFamily: theme.typography.headingFont }}
            >
              {content.title || 'Rooted in Heritage. Engineered for Spatial Majesty.'}
            </h2>

            <p className="text-xs sm:text-sm leading-relaxed" style={{ color: theme.colors.mutedText }}>
              {content.description || 'Every piece is born from a dialogue between raw material and architectural purpose. We collaborate with generational master carpenters in Damietta and marble masons in Carrara to sculpt furniture that matures with grace.'}
            </p>

            {/* Value checklist */}
            <div className="space-y-2.5 pt-1">
              {[
                'Kiln-dried beechwood frames backed by a 25-year structural warranty',
                'Hand-rubbed organic wax & low-VOC lacquer finishes',
                'Complimentary white-glove delivery, room placement, and packaging removal',
              ].map((point, idx) => (
                <div key={idx} className="flex items-start gap-2.5 text-xs">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span style={{ color: theme.colors.text }}>{point}</span>
                </div>
              ))}
            </div>

            {content.primaryButtonText && (
              <div className="pt-2">
                <button
                  onClick={onNavigateToAbout}
                  className="px-6 py-3 rounded-full text-xs uppercase tracking-wider font-bold transition shadow-md flex items-center gap-2 cursor-pointer hover:opacity-90"
                  style={{
                    backgroundColor: theme.colors.primary,
                    color: theme.colors.background,
                  }}
                >
                  <span>{content.primaryButtonText}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
