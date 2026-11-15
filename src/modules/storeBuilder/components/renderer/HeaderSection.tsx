import React, { useState } from 'react';
import { StoreSection, GlobalThemeSettings, StorePage, DeviceViewport } from '../../types';
import { ShoppingBag, Menu, X, Search } from 'lucide-react';

interface HeaderSectionProps {
  section: StoreSection;
  theme: GlobalThemeSettings;
  pages: StorePage[];
  activePageId?: string;
  onNavigate?: (pageId: string) => void;
  cartCount?: number;
  onOpenCart?: () => void;
  isEditable?: boolean;
  viewport?: DeviceViewport;
}

export const HeaderSection: React.FC<HeaderSectionProps> = ({
  section,
  theme,
  pages,
  activePageId,
  onNavigate,
  cartCount = 0,
  onOpenCart,
  isEditable = false,
  viewport = 'desktop',
}) => {
  const { content, design } = section;
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isMobile = viewport === 'mobile';
  const isTablet = viewport === 'tablet';

  const brandTitle = content.title || theme.brandName || 'Furniture Atelier';
  const tag = content.tag;

  const publishedPages = pages.filter((p) => p.isPublished !== false);

  const handlePageClick = (e: React.MouseEvent, pageId: string) => {
    if (onNavigate) {
      e.preventDefault();
      onNavigate(pageId);
      setMobileMenuOpen(false);
    }
  };

  return (
    <header 
      className={`w-full relative z-30 transition-colors ${
        design.borderBottom ? 'border-b' : ''
      }`}
      style={{
        backgroundColor: design.backgroundColor || theme.colors.background,
        color: design.textColor || theme.colors.text,
        borderColor: theme.colors.border,
      }}
    >
      <div 
        className="mx-auto px-4 sm:px-6 lg:px-8 py-3.5 sm:py-5 flex items-center justify-between gap-3"
        style={{
          maxWidth: theme.layout.containerMaxWidth === 'full' ? '100%' : theme.layout.containerMaxWidth,
        }}
      >
        {/* Brand Logo & Name */}
        <div className="flex items-center gap-2.5 sm:gap-3 min-w-0">
          <div 
            className="w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center font-bold text-xs sm:text-sm shadow-xs shrink-0"
            style={{
              backgroundColor: theme.colors.primary,
              color: theme.colors.background,
            }}
          >
            {brandTitle.charAt(0)}
          </div>
          <div className="truncate">
            <span 
              className="font-bold text-base sm:text-xl tracking-wider uppercase block leading-none truncate"
              style={{
                fontFamily: theme.typography.headingFont,
              }}
            >
              {brandTitle}
            </span>
            {tag && (
              <span 
                className="text-[8px] sm:text-[9px] uppercase tracking-[0.2em] block mt-0.5 truncate"
                style={{ color: theme.colors.accent }}
              >
                {tag}
              </span>
            )}
          </div>
        </div>

        {/* Desktop Navigation Links */}
        {!isMobile && (
          <nav className={`hidden ${isTablet ? 'md:flex gap-4' : 'md:flex gap-6 lg:gap-8'} items-center shrink-0`}>
            {publishedPages.map((page) => {
              const isActive = activePageId === page.id;
              return (
                <button
                  key={page.id}
                  onClick={(e) => handlePageClick(e, page.id)}
                  className={`text-xs uppercase tracking-[0.14em] font-medium transition-colors cursor-pointer py-1 relative ${
                    isActive ? 'font-bold' : 'hover:opacity-75'
                  }`}
                  style={{
                    color: isActive ? theme.colors.primary : theme.colors.text,
                  }}
                >
                  {page.title}
                  {isActive && (
                    <span 
                      className="absolute bottom-0 left-0 right-0 h-0.5 rounded-full"
                      style={{ backgroundColor: theme.colors.accent }}
                    />
                  )}
                </button>
              );
            })}
          </nav>
        )}

        {/* Right Actions: CTA + Cart + Mobile Hamburger */}
        <div className="flex items-center gap-2 sm:gap-4 shrink-0">
          {/* Primary CTA (Shown on larger screens when not mobile viewport) */}
          {!isMobile && content.primaryButtonText && (
            <button
              onClick={() => {
                const shopPage = pages.find((p) => p.slug === 'shop' || p.title.toLowerCase().includes('shop'));
                if (shopPage && onNavigate) onNavigate(shopPage.id);
              }}
              className="hidden lg:inline-flex items-center justify-center px-4 py-2 rounded-full text-xs uppercase tracking-wider font-bold transition shadow-xs cursor-pointer hover:opacity-90"
              style={{
                backgroundColor: theme.colors.primary,
                color: theme.colors.background,
              }}
            >
              {content.primaryButtonText}
            </button>
          )}

          {/* Cart Icon */}
          <button
            onClick={onOpenCart}
            className="relative p-2 rounded-full hover:bg-black/5 dark:hover:bg-white/5 transition cursor-pointer"
            aria-label="Shopping Cart"
          >
            <ShoppingBag className="w-4 h-4 sm:w-5 sm:h-5" />
            {cartCount > 0 && (
              <span 
                className="absolute -top-1 -right-1 w-4 h-4 rounded-full text-[9px] font-bold flex items-center justify-center text-white"
                style={{ backgroundColor: theme.colors.accent }}
              >
                {cartCount}
              </span>
            )}
          </button>

          {/* Mobile Menu Button: Shown if isMobile or md:hidden */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className={`${isMobile ? 'flex' : 'md:hidden'} p-2 rounded-lg hover:bg-black/5 dark:hover:bg-white/5 transition cursor-pointer`}
            aria-label="Toggle Mobile Menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Slide-down Menu */}
      {mobileMenuOpen && (
        <div 
          className="border-t py-4 px-6 space-y-3 animate-fadeIn"
          style={{
            backgroundColor: design.backgroundColor || theme.colors.background,
            borderColor: theme.colors.border,
          }}
        >
          <div className="space-y-1">
            {publishedPages.map((page) => {
              const isActive = activePageId === page.id;
              return (
                <button
                  key={page.id}
                  onClick={(e) => handlePageClick(e, page.id)}
                  className={`w-full text-left py-2.5 px-3 rounded-lg text-sm uppercase tracking-wider transition font-medium ${
                    isActive ? 'font-bold bg-black/5 dark:bg-white/5' : 'hover:opacity-75'
                  }`}
                  style={{
                    color: isActive ? theme.colors.primary : theme.colors.text,
                  }}
                >
                  {page.title} {page.isHome ? '(Home)' : ''}
                </button>
              );
            })}
          </div>

          {content.primaryButtonText && (
            <div className="pt-2">
              <button
                onClick={() => {
                  const shopPage = pages.find((p) => p.slug === 'shop');
                  if (shopPage && onNavigate) onNavigate(shopPage.id);
                  setMobileMenuOpen(false);
                }}
                className="w-full py-2.5 rounded-xl text-xs uppercase tracking-wider font-bold transition shadow-xs text-center"
                style={{
                  backgroundColor: theme.colors.primary,
                  color: theme.colors.background,
                }}
              >
                {content.primaryButtonText}
              </button>
            </div>
          )}
        </div>
      )}
    </header>
  );
};
