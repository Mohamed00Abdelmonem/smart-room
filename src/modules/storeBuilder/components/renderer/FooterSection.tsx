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
  const { content, design } = section;

  const isMobile = viewport === 'mobile';
  const isTablet = viewport === 'tablet';

  // Responsive grid based on simulated viewport or desktop breakpoint
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
          {/* Brand Info (2 cols on desktop/tablet) */}
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
                <span className="text-stone-300 leading-snug block">White-glove delivery & in-home spatial assembly included.</span>
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
