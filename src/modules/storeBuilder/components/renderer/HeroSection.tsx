import React from 'react';
import { StoreSection, GlobalThemeSettings, DeviceViewport } from '../../types';
import { ArrowRight } from 'lucide-react';

interface HeroSectionProps {
  section: StoreSection;
  theme: GlobalThemeSettings;
  onNavigateToShop?: () => void;
  onNavigateToAbout?: () => void;
  viewport?: DeviceViewport;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  section,
  theme,
  onNavigateToShop,
  onNavigateToAbout,
  viewport = 'desktop',
}) => {
  const { content, design, variant } = section;

  const isMobile = viewport === 'mobile';
  const isTablet = viewport === 'tablet';

  const paddingClasses = isMobile
    ? 'py-10 px-4'
    : {
        none: 'py-0',
        sm: 'py-8 sm:py-12',
        md: 'py-12 sm:py-16',
        lg: 'py-16 sm:py-24',
        xl: 'py-20 sm:py-32',
      }[design.paddingTop || 'lg'];

  // 1. FULL WIDTH CINEMATIC VARIANT
  if (variant === 'hero-full') {
    return (
      <section 
        className={`relative w-full overflow-hidden ${paddingClasses} flex items-center justify-center`}
        style={{
          backgroundColor: design.backgroundColor || theme.colors.primary,
          color: design.textColor || '#FFFFFF',
        }}
      >
        {/* Background Image with Overlay */}
        {content.imageUrl && (
          <div className="absolute inset-0 z-0">
            <img 
              src={content.imageUrl} 
              alt={content.title || 'Furniture Hero'} 
              className="w-full h-full object-cover object-center"
            />
            <div 
              className="absolute inset-0 bg-black" 
              style={{ opacity: design.overlayOpacity ?? 0.5 }}
            />
          </div>
        )}

        <div 
          className="relative z-10 mx-auto px-4 sm:px-6 text-center max-w-3xl"
        >
          {content.tag && (
            <span 
              className="inline-block px-3 py-1 rounded-full text-[9px] sm:text-[10px] tracking-[0.2em] font-bold uppercase mb-3 sm:mb-4 shadow-xs"
              style={{
                backgroundColor: theme.colors.accent,
                color: '#FFFFFF',
              }}
            >
              {content.tag}
            </span>
          )}

          <h1 
            className={`${
              isMobile ? 'text-2xl leading-tight' : 'text-3xl sm:text-5xl lg:text-6xl leading-[1.12]'
            } font-bold tracking-tight mb-4 sm:mb-5 text-white`}
            style={{
              fontFamily: theme.typography.headingFont,
            }}
          >
            {content.title || 'Architectural Living Spaces'}
          </h1>

          {content.subtitle && (
            <p className={`${
              isMobile ? 'text-xs leading-relaxed' : 'text-base sm:text-lg'
            } text-white/85 max-w-2xl mx-auto mb-6 sm:mb-8`}>
              {content.subtitle}
            </p>
          )}

          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4">
            {content.primaryButtonText && (
              <button
                onClick={onNavigateToShop}
                className="px-6 sm:px-7 py-3 sm:py-3.5 rounded-full text-xs uppercase tracking-[0.14em] font-bold transition shadow-lg flex items-center gap-2 cursor-pointer hover:scale-105"
                style={{
                  backgroundColor: theme.colors.accent,
                  color: '#FFFFFF',
                }}
              >
                <span>{content.primaryButtonText}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            )}

            {content.secondaryButtonText && (
              <button
                onClick={onNavigateToAbout}
                className="px-5 sm:px-6 py-3 sm:py-3.5 rounded-full text-xs uppercase tracking-[0.14em] font-semibold transition border border-white/40 hover:bg-white/10 text-white cursor-pointer"
              >
                {content.secondaryButtonText}
              </button>
            )}
          </div>
        </div>
      </section>
    );
  }

  // 2. SPLIT IMAGE & EDITORIAL TEXT VARIANT (Default)
  return (
    <section 
      className={`w-full overflow-hidden ${paddingClasses} transition-colors`}
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
          isMobile ? 'grid-cols-1 gap-6' : isTablet ? 'grid-cols-1 md:grid-cols-2 gap-8 items-center' : 'grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center'
        }`}>
          {/* Text Column */}
          <div className={`${!isMobile && !isTablet ? 'lg:col-span-5' : ''} space-y-4 sm:space-y-6 text-start`}>
            {content.tag && (
              <span 
                className="inline-block px-3 py-1 rounded-md text-[9px] sm:text-[10px] tracking-[0.18em] font-bold uppercase"
                style={{
                  backgroundColor: theme.colors.surface,
                  color: theme.colors.secondary,
                  border: `1px solid ${theme.colors.border}`,
                }}
              >
                {content.tag}
              </span>
            )}

            <h1 
              className={`${
                isMobile ? 'text-2xl leading-tight' : 'text-3xl sm:text-4xl lg:text-5xl leading-[1.12]'
              } font-bold tracking-tight`}
              style={{
                fontFamily: theme.typography.headingFont,
              }}
            >
              {content.title || 'Modern Architecture Crafted for Bespoke Living.'}
            </h1>

            {content.subtitle && (
              <p 
                className={`${isMobile ? 'text-xs' : 'text-sm sm:text-base'} leading-relaxed`}
                style={{ color: theme.colors.mutedText }}
              >
                {content.subtitle}
              </p>
            )}

            <div className="flex flex-wrap items-center gap-3 pt-1">
              {content.primaryButtonText && (
                <button
                  onClick={onNavigateToShop}
                  className="px-5 sm:px-7 py-2.5 sm:py-3.5 rounded-full text-xs uppercase tracking-[0.14em] font-bold transition shadow-md flex items-center gap-2 cursor-pointer hover:opacity-90"
                  style={{
                    backgroundColor: theme.colors.primary,
                    color: theme.colors.background,
                  }}
                >
                  <span>{content.primaryButtonText}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              )}

              {content.secondaryButtonText && (
                <button
                  onClick={onNavigateToAbout}
                  className="px-4 sm:px-6 py-2.5 sm:py-3.5 rounded-full text-xs uppercase tracking-[0.14em] font-semibold transition border cursor-pointer hover:bg-black/5 dark:hover:bg-white/5"
                  style={{
                    borderColor: theme.colors.border,
                    color: theme.colors.text,
                  }}
                >
                  {content.secondaryButtonText}
                </button>
              )}
            </div>
          </div>

          {/* Right Image Frame Column */}
          <div className={`${!isMobile && !isTablet ? 'lg:col-span-7' : ''} relative`}>
            <div 
              className={`w-full ${
                isMobile ? 'aspect-[16/10] rounded-xl' : 'aspect-[4/3] sm:aspect-[16/10] rounded-2xl sm:rounded-3xl'
              } overflow-hidden shadow-xl sm:shadow-2xl border`}
              style={{ borderColor: theme.colors.border }}
            >
              <img 
                src={content.imageUrl || 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6'} 
                alt={content.title || 'Palazzo Furniture'}
                className="w-full h-full object-cover object-center"
              />
            </div>

            {/* Subtle Floating Feature Badge (Shown on non-mobile viewports or compact on mobile) */}
            <div 
              className={`${
                isMobile 
                  ? 'mt-3 p-2.5 rounded-xl border bg-white/90 dark:bg-[#1C1A17]/90 text-[10px]' 
                  : 'absolute -bottom-5 -left-5 p-4 rounded-2xl bg-white dark:bg-[#1C1A17] border shadow-xl max-w-xs'
              } text-start`}
              style={{ borderColor: theme.colors.border }}
            >
              <span className="text-[9px] uppercase tracking-wider font-bold block" style={{ color: theme.colors.accent }}>
                AUTHENTIC CRAFT
              </span>
              <span className="text-[11px] font-medium leading-tight block text-stone-600 dark:text-stone-300">
                100% Solid Kiln-Dried Beechwood & Italian Aniline Leathers
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
