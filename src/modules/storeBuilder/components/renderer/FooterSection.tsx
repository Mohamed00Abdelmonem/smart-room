import React from 'react';
import { StoreSection, GlobalThemeSettings, StorePage, DeviceViewport } from '../../types';

interface FooterSectionProps {
  section: StoreSection;
  theme: GlobalThemeSettings;
  pages: StorePage[];
  onNavigate?: (pageId: string) => void;
  viewport?: DeviceViewport;
}

export const FooterSection: React.FC<FooterSectionProps> = ({
  section,
  theme,
  pages,
  onNavigate,
  viewport = 'desktop',
}) => {
  const { content, design, variant } = section;

  const isMobile = viewport === 'mobile';
  const isTablet = viewport === 'tablet';

  // VARIANT: MINIMAL SINGLE-BAND SCANDINAVIAN / STUDIO FOOTER
  if (variant === 'footer-minimal') {
    return (
      <footer
        className="w-full py-10 sm:py-12 transition-colors border-t"
        style={{
          backgroundColor: design.backgroundColor || '#1C1A17',
          color: design.textColor || '#D6D1C9',
          borderColor: theme.colors.border,
        }}
      >
        <div
          className="mx-auto px-4 sm:px-6 lg:px-8 space-y-6"
          style={{
            maxWidth: theme.layout.containerMaxWidth === 'full' ? '100%' : theme.layout.containerMaxWidth,
          }}
        >
          <div className={`flex ${isMobile ? 'flex-col text-center gap-4' : 'flex-col md:flex-row items-center justify-between gap-6'} pb-6 border-b border-white/10`}>
            <div className="flex items-center gap-2.5">
              <span
                className="font-bold text-base sm:text-lg tracking-[0.2em] uppercase"
                style={{ fontFamily: theme.typography.headingFont }}
              >
                {theme.brandName}
              </span>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-5 sm:gap-7 text-xs uppercase tracking-wider">
              {pages.map((p) => (
                <button
                  key={p.id}
                  onClick={() => onNavigate && onNavigate(p.id)}
                  className="hover:opacity-100 opacity-80 transition cursor-pointer"
                >
                  {p.title}
                </button>
              ))}
            </div>

            <div className="text-[11px] opacity-75">
              Cairo · Sheikh Zayed · Alexandria
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-2 text-[11px] opacity-70">
            <span>© {new Date().getFullYear()} {theme.brandName}. Curated Spatial Furniture.</span>
            <span>InstaPay · ValU 0% · Meeza</span>
          </div>
        </div>
      </footer>
    );
  }

  // STANDARD MULTI-COLUMN LUXURY FOOTER
  const gridClasses = isMobile
    ? 'grid grid-cols-1 gap-8 pb-10'
    : isTablet
    ? 'grid grid-cols-2 gap-8 pb-12'
    : 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-10 pb-12';

  return (
    <footer 
      className="w-full pt-12 sm:pt-16 pb-10 sm:pb-12 transition-colors border-t"
      style={{
        backgroundColor: design.backgroundColor || '#141210',
        color: design.textColor || '#A39E96',
        borderColor: '#2D2A26',
      }}
    >
      <div 
        className="mx-auto px-4 sm:px-6 lg:px-8"
        style={{
          maxWidth: theme.layout.containerMaxWidth === 'full' ? '100%' : theme.layout.containerMaxWidth,
        }}
      >
        <div className={`${gridClasses} border-b border-white/10 text-start`}>
          {/* Brand Info */}
          <div className={!isMobile ? 'lg:col-span-2 space-y-4' : 'space-y-4'}>
            <div className="flex items-center gap-2.5">
              <div 
                className="w-7 h-7 rounded-full flex items-center justify-center font-bold text-xs shrink-0"
                style={{
                  backgroundColor: theme.colors.accent,
                  color: '#FFFFFF',
                }}
              >
                {theme.brandName.charAt(0)}
              </div>
              <span 
                className="font-bold text-base sm:text-lg tracking-wider uppercase text-white"
                style={{ fontFamily: theme.typography.headingFont }}
              >
                {theme.brandName}
              </span>
            </div>

            <p className="text-xs leading-relaxed max-w-sm text-stone-400">
              {content.description || 'Architectural luxury furniture atelier offering heirloom quality, true 1:1 scale spatial fidelity, and white-glove curation.'}
            </p>

            <div className="text-[11px] text-stone-400 font-medium">
              Sheikh Zayed · New Cairo · Milan Design Studio
            </div>
          </div>

          {/* Navigation Column */}
          <div className="space-y-3">
            <h4 className="text-xs uppercase tracking-wider font-bold text-white">Pages</h4>
            <ul className="space-y-2 text-xs">
              {pages.map((p) => (
                <li key={p.id}>
                  <button
                    onClick={() => onNavigate && onNavigate(p.id)}
                    className="hover:text-white transition-colors cursor-pointer text-start block py-0.5"
                  >
                    {p.title}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Collections Column */}
          <div className="space-y-3">
            <h4 className="text-xs uppercase tracking-wider font-bold text-white">Collections</h4>
            <ul className="space-y-2 text-xs">
              <li><span className="hover:text-white cursor-pointer block py-0.5">Signature Atelier</span></li>
              <li><span className="hover:text-white cursor-pointer block py-0.5">Minimalist Line</span></li>
              <li><span className="hover:text-white cursor-pointer block py-0.5">Scandinavian Essence</span></li>
              <li><span className="hover:text-white cursor-pointer block py-0.5">Lumière Studio Lighting</span></li>
            </ul>
          </div>

          {/* Security & CBE Standards */}
          <div className="space-y-3">
            <h4 className="text-xs uppercase tracking-wider font-bold text-white">Accepted Payments</h4>
            <div className="space-y-2 text-xs text-stone-400">
              <p className="leading-relaxed">InstaPay (IPN) · Meeza · ValU 0% · Fawry</p>
              <div className="p-3 rounded-xl bg-white/5 border border-white/10 text-[10px] space-y-1">
                <span className="text-emerald-400 font-bold block">✓ CBE Certified Gateway</span>
                <span className="text-stone-300 leading-snug block">White-glove delivery &amp; in-home spatial assembly included.</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Copyright */}
        <div className={`pt-6 sm:pt-8 flex ${
          isMobile ? 'flex-col text-center gap-3' : 'flex-col sm:flex-row items-center justify-between gap-4'
        } text-xs text-stone-400`}>
          <p>© {new Date().getFullYear()} {theme.brandName}. All rights reserved.</p>
          <div className={`flex flex-wrap items-center ${isMobile ? 'justify-center' : ''} gap-3 sm:gap-4 text-[11px]`}>
            <span className="hover:text-white cursor-pointer">Privacy Policy</span>
            <span>·</span>
            <span className="hover:text-white cursor-pointer">Terms of Service</span>
            <span>·</span>
            <span className="hover:text-white cursor-pointer">White-Glove Guarantee</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
