import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { useLanguage } from '../../context/LanguageContext';
import { useTheme } from '../../context/ThemeContext';
import { 
  ShoppingBag, 
  Menu, 
  X, 
  Sparkles, 
  Sun, 
  Moon, 
  Globe 
} from 'lucide-react';

export const Navbar: React.FC = () => {
  const { totalItems, setIsCartOpen } = useCart();
  const { language, toggleLanguage, t, isRTL } = useLanguage();
  const { toggleTheme, isDark } = useTheme();
  const location = useLocation();

  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isHomepage = location.pathname === '/';

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 30) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: isRTL ? 'عن المنصة' : 'About', href: isHomepage ? '#about' : '/#about', isAnchor: true },
    { label: isRTL ? 'المعرض التجريبي' : 'Store Demo', path: '/showroom' },
    { label: isRTL ? 'مصمم الغرف' : 'AI Designer', path: '/visualizer' },
    { label: isRTL ? 'لوحة التحكم' : 'Retailer Portal', path: '/dashboard' },
    { label: isRTL ? 'للمعارض' : 'For Retailers', path: '/integration' },
  ];

  const isActive = (path?: string) => {
    if (!path) return false;
    return location.pathname === path;
  };

  // On hero of homepage (unscrolled), we use transparent header with crisp white text.
  // Everywhere else or when scrolled, we use the White-dominant surface.
  const isTransparentHero = isHomepage && !isScrolled;

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isTransparentHero
          ? 'bg-transparent py-5 sm:py-6 border-b border-white/15'
          : 'bg-white/95 dark:bg-[#121110]/95 backdrop-blur-md border-b border-[#E8E2D9] dark:border-[#2D2A26] py-3.5 sm:py-4 shadow-xs'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between flex-nowrap gap-4">
        {/* Brand Logo */}
        <Link to="/" className="flex items-center gap-2.5 group shrink-0">
          <div
            className={`w-9 h-9 rounded-xl flex items-center justify-center transition-all ${
              isTransparentHero
                ? 'bg-white/10 text-white border border-white/20 group-hover:bg-white/20'
                : 'bg-[#F8F7F3] dark:bg-[#1E1C1A] text-[#292722] dark:text-[#F8F7F3] border border-[#E8E2D9] dark:border-[#2D2A26]'
            }`}
          >
            <span className="font-editorial text-lg font-bold">R</span>
          </div>
          <div className="flex flex-col">
            <span
              className={`font-editorial text-2xl font-black tracking-[0.15em] uppercase transition-colors ${
                isTransparentHero
                  ? 'text-white'
                  : 'text-[#292722] dark:text-[#F8F7F3]'
              }`}
            >
              {isRTL ? 'رومورا' : 'ROOMORA'}
            </span>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-4 xl:gap-7 shrink-0 whitespace-nowrap">
          {navLinks.map((item) => {
            const active = isActive(item.path);

            if (item.isAnchor && isHomepage) {
              return (
                <a
                  key={item.label}
                  href={item.href}
                  className={`text-xs uppercase tracking-[0.15em] font-medium transition-colors cursor-pointer ${
                    isTransparentHero
                      ? 'text-white/85 hover:text-white'
                      : 'text-[#6E6A63] hover:text-[#292722] dark:text-[#A39E96] dark:hover:text-[#F8F7F3]'
                  }`}
                >
                  {item.label}
                </a>
              );
            }

            return (
              <Link
                key={item.label}
                to={item.path || item.href || '/'}
                className={`text-xs uppercase tracking-[0.15em] font-medium transition-colors cursor-pointer relative py-1 ${
                  isTransparentHero
                    ? active ? 'text-white font-bold' : 'text-white/85 hover:text-white'
                    : active 
                      ? 'text-[#292722] dark:text-[#F8F7F3] font-bold' 
                      : 'text-[#6E6A63] hover:text-[#292722] dark:text-[#A39E96] dark:hover:text-[#F8F7F3]'
                }`}
              >
                <span>{item.label}</span>
                {active && !isTransparentHero && (
                  <span className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-[#B58A54] rounded-full" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Right Controls: Theme + Language + Cart + CTA */}
        <div className="flex items-center gap-2.5 sm:gap-3 shrink-0">
          {/* Theme Toggle (Light / Dark) */}
          <button
            onClick={toggleTheme}
            className={`p-2 rounded-xl transition-all cursor-pointer ${
              isTransparentHero
                ? 'text-white/80 hover:text-white hover:bg-white/10 border border-white/15'
                : 'text-[#6E6A63] hover:text-[#292722] dark:text-[#A39E96] dark:hover:text-[#F8F7F3] bg-[#F8F7F3] hover:bg-[#E9DFD0] dark:bg-[#1E1C1A] dark:hover:bg-[#2A2621] border border-[#E8E2D9] dark:border-[#2D2A26]'
            }`}
            title={isDark ? 'Switch to White Luxury Light Mode' : 'Switch to Dark Mode'}
            aria-label="Toggle theme"
          >
            {isDark ? <Sun className="w-4 h-4 text-[#C9A474]" /> : <Moon className="w-4 h-4" />}
          </button>

          {/* Language Toggle (Arabic / English) */}
          <button
            onClick={toggleLanguage}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium transition-all cursor-pointer ${
              isTransparentHero
                ? 'text-white/90 hover:text-white hover:bg-white/10 border border-white/15'
                : 'text-[#292722] dark:text-[#F8F7F3] bg-[#F8F7F3] hover:bg-[#E9DFD0] dark:bg-[#1E1C1A] dark:hover:bg-[#2A2621] border border-[#E8E2D9] dark:border-[#2D2A26]'
            }`}
            title={language === 'en' ? 'التحويل للغة العربية' : 'Switch to English'}
          >
            <Globe className="w-3.5 h-3.5 text-[#B58A54]" />
            <span className="font-semibold">{t.langSwitchLabel}</span>
          </button>

          {/* Cart Bag Drawer Trigger */}
          <button
            onClick={() => setIsCartOpen(true)}
            className={`relative p-2 rounded-xl transition-all cursor-pointer ${
              isTransparentHero
                ? 'text-white hover:bg-white/10 border border-white/15'
                : 'text-[#292722] dark:text-[#F8F7F3] bg-[#F8F7F3] hover:bg-[#E9DFD0] dark:bg-[#1E1C1A] dark:hover:bg-[#2A2621] border border-[#E8E2D9] dark:border-[#2D2A26]'
            }`}
            title={t.cartTitle}
            aria-label="View shopping bag"
          >
            <ShoppingBag className="w-4 h-4 text-[#B58A54]" />
            {totalItems > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-[#292722] text-white dark:bg-[#F8F7F3] dark:text-[#292722] text-[9px] font-bold flex items-center justify-center">
                {totalItems}
              </span>
            )}
          </button>

          {/* Explore Experience Action Button */}
          <Link
            to="/visualizer"
            className={`hidden sm:inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs uppercase tracking-[0.1em] font-bold transition-all shadow-sm ${
              isTransparentHero
                ? 'bg-white hover:bg-white/90 text-[#292722]'
                : 'bg-[#292722] hover:bg-[#3D3A34] dark:bg-[#F8F7F3] dark:hover:bg-white text-white dark:text-[#292722]'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 text-[#B58A54] dark:text-[#292722]" />
            <span>{isRTL ? 'تجربة الغرفة' : 'Explore Demo'}</span>
          </Link>

          {/* Mobile Menu Hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className={`lg:hidden p-2 rounded-xl transition-colors ${
              isTransparentHero 
                ? 'text-white hover:bg-white/10 border border-white/15' 
                : 'text-[#292722] dark:text-[#F8F7F3] bg-[#F8F7F3] dark:bg-[#1E1C1A] border border-[#E8E2D9] dark:border-[#2D2A26]'
            }`}
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white dark:bg-[#121110] border-b border-[#E8E2D9] dark:border-[#2D2A26] px-6 py-6 space-y-4 animate-in fade-in transition-colors">
          <nav className="flex flex-col space-y-3">
            {navLinks.map((item) => (
              <Link
                key={item.label}
                to={item.path || item.href || '/'}
                onClick={() => setMobileMenuOpen(false)}
                className="text-xs uppercase tracking-[0.15em] font-medium text-[#6E6A63] hover:text-[#292722] dark:text-[#A39E96] dark:hover:text-[#F8F7F3] py-2 border-b border-[#E8E2D9]/60 dark:border-[#2D2A26]"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="pt-2">
            <Link
              to="/visualizer"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-[#292722] text-white text-xs uppercase tracking-[0.15em] font-bold shadow-md"
            >
              <Sparkles className="w-4 h-4 text-[#B58A54]" />
              <span>{isRTL ? 'تجربة الذكاء الاصطناعي' : 'Explore Experience'}</span>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};
