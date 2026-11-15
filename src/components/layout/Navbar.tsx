import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { useLanguage } from '../../context/LanguageContext';
import { useTheme } from '../../context/ThemeContext';
import { 
  ShoppingBag, 
  Menu, 
  X, 
  Sun, 
  Moon, 
  Globe 
} from 'lucide-react';

export const Navbar: React.FC = () => {
  const { totalItems, setIsCartOpen } = useCart();
  const { toggleLanguage, isRTL } = useLanguage();
  const { toggleTheme, isDark } = useTheme();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isHomepage = location.pathname === '/';

  const navLinks = [
    { 
      label: isRTL ? 'عن المنصة' : 'ABOUT', 
      href: isHomepage ? '#about' : '/#about', 
      isAnchor: true 
    },
    { 
      label: isRTL ? 'المعرض التجريبي' : 'SHOWROOM', 
      path: '/showroom' 
    },
    { 
      label: isRTL ? 'استوديو الذكاء الاصطناعي' : 'AI STUDIO', 
      path: '/visualizer' 
    },
    { 
      label: isRTL ? 'للمعارض' : 'RETAILERS', 
      path: '/integration' 
    },
    { 
      label: isRTL ? 'متجري' : 'MY STORE', 
      path: '/my-store' 
    },
  ];

  const isActive = (path?: string) => {
    if (!path) return false;
    return location.pathname === path;
  };

  return (
    <header className="sticky top-0 left-0 right-0 z-50 w-full h-[80px] bg-[#F6F3EE] dark:bg-[#141210] border-b border-[#E2DBD0] dark:border-[#2D2A26] px-4 sm:px-8 lg:px-16 transition-colors duration-200">
      <div className="w-full h-full flex items-center justify-between gap-3 sm:gap-6">
        {/* Left: VESTAIA Brand in Editorial Serif */}
        <Link 
          to="/" 
          className="flex items-center gap-2 sm:gap-3 shrink-0 group focus:outline-hidden"
        >
          <div className="w-8 h-8 rounded-full bg-[#1E1E1E] text-[#F6F3EE] dark:bg-[#F8F7F3] dark:text-[#1E1E1E] flex items-center justify-center font-editorial font-bold text-sm tracking-widest shadow-xs group-hover:scale-105 transition-transform">
            V
          </div>
          <span className="font-editorial text-xl sm:text-2xl tracking-[0.15em] text-[#1E1E1E] dark:text-[#F8F7F3] uppercase font-medium">
            {isRTL ? 'ڤيستا AI' : 'VESTA-AI'}
          </span>
        </Link>

        {/* Center: Horizontal nav links in uppercase sans-serif */}
        <nav className="hidden lg:flex items-center gap-8 shrink-0">
          {navLinks.map((item) => {
            const active = isActive(item.path);

            if (item.isAnchor && isHomepage) {
              return (
                <a
                  key={item.label}
                  href={item.href}
                  className="text-xs tracking-[0.12em] font-medium text-[#1E1E1E] dark:text-[#F8F7F3] hover:opacity-70 transition-opacity uppercase cursor-pointer"
                >
                  {item.label}
                </a>
              );
            }

            return (
              <Link
                key={item.label}
                to={item.path || item.href || '/'}
                className={`text-xs tracking-[0.12em] font-medium transition-all uppercase relative py-1 ${
                  active 
                    ? 'text-[#1E1E1E] dark:text-white font-semibold' 
                    : 'text-[#1E1E1E] dark:text-[#F8F7F3] hover:opacity-70'
                }`}
              >
                <span>{item.label}</span>
                {active && (
                  <span className="absolute -bottom-1 left-0 right-0 h-[1.5px] bg-[#1E1E1E] dark:bg-white rounded-full" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Right: Controls & TRY STUDIO Solid Dark Pill */}
        <div className="flex items-center gap-1 sm:gap-2.5 shrink-0">
          {/* Subtle Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="p-1.5 sm:p-2 rounded-full text-[#4A4A4A] hover:text-[#1E1E1E] dark:text-[#A39E96] dark:hover:text-[#F8F7F3] hover:bg-[#EAE2D6]/60 dark:hover:bg-[#25211D] transition-colors cursor-pointer"
            title={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            aria-label="Toggle theme"
          >
            {isDark ? <Sun className="w-4 h-4 text-[#C9A474]" /> : <Moon className="w-4 h-4" />}
          </button>

          {/* Subtle Language Toggle */}
          <button
            onClick={toggleLanguage}
            className="flex items-center gap-1 px-2 sm:px-3 py-1 sm:py-1.5 rounded-full text-xs font-medium text-[#1E1E1E] dark:text-[#F8F7F3] hover:bg-[#EAE2D6]/60 dark:hover:bg-[#25211D] transition-colors cursor-pointer"
            title={isRTL ? 'Switch to English' : 'التحويل للغة العربية'}
          >
            <Globe className="w-3.5 h-3.5 text-[#4A4A4A] dark:text-[#A39E96]" />
            <span className="text-[10px] sm:text-[11px] tracking-wider uppercase font-medium">{isRTL ? 'EN' : 'العربية'}</span>
          </button>

          {/* Cart Bag Drawer Trigger */}
          <button
            onClick={() => setIsCartOpen(true)}
            className="relative p-1.5 sm:p-2 rounded-full text-[#1E1E1E] dark:text-[#F8F7F3] hover:bg-[#EAE2D6]/60 dark:hover:bg-[#25211D] transition-colors cursor-pointer"
            title="Shopping Bag"
            aria-label="View shopping bag"
          >
            <ShoppingBag className="w-4 h-4" />
            {totalItems > 0 && (
              <span className="absolute -top-0.5 -right-0.5 w-4 h-4 rounded-full bg-[#1E1E1E] text-[#F6F3EE] dark:bg-[#F8F7F3] dark:text-[#1E1E1E] text-[9px] font-bold flex items-center justify-center">
                {totalItems}
              </span>
            )}
          </button>

          {/* Right Action: Solid dark pill button reading TRY STUDIO */}
          <Link
            to="/visualizer"
            className="hidden sm:inline-flex items-center justify-center bg-[#1E1E1E] text-[#F6F3EE] dark:bg-[#F8F7F3] dark:text-[#1E1E1E] rounded-full px-5 lg:px-6 py-2.5 text-xs tracking-[0.12em] uppercase font-medium hover:bg-[#333333] dark:hover:bg-white transition-all shadow-xs"
          >
            <span>{isRTL ? 'جرّب الاستوديو' : 'TRY STUDIO'}</span>
          </Link>

          {/* Mobile Menu Hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-1.5 sm:p-2 rounded-full text-[#1E1E1E] dark:text-[#F8F7F3] hover:bg-[#EAE2D6] dark:hover:bg-[#25211D] border border-[#E2DBD0] dark:border-[#2D2A26] transition-colors cursor-pointer"
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? <X className="w-4 h-4 sm:w-5 sm:h-5" /> : <Menu className="w-4 h-4 sm:w-5 sm:h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden absolute top-[80px] left-0 right-0 bg-[#F6F3EE] dark:bg-[#141210] border-b border-[#E2DBD0] dark:border-[#2D2A26] px-8 py-6 space-y-4 shadow-lg animate-in fade-in transition-colors">
          <nav className="flex flex-col space-y-3">
            {navLinks.map((item) => (
              <Link
                key={item.label}
                to={item.path || item.href || '/'}
                onClick={() => setMobileMenuOpen(false)}
                className="text-xs tracking-[0.12em] font-medium text-[#1E1E1E] dark:text-[#F8F7F3] hover:opacity-70 py-2 border-b border-[#E2DBD0]/60 dark:border-[#2D2A26] uppercase"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="pt-2">
            <Link
              to="/visualizer"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full flex items-center justify-center py-3 rounded-full bg-[#1E1E1E] text-[#F6F3EE] dark:bg-[#F8F7F3] dark:text-[#1E1E1E] text-xs uppercase tracking-[0.12em] font-medium shadow-sm"
            >
              <span>{isRTL ? 'جرّب الاستوديو' : 'TRY STUDIO'}</span>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};
