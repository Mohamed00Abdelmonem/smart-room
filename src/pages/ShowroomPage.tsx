import React, { useState, useMemo, useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { Flip } from 'gsap/Flip';
import { LUXURY_PRODUCTS, CATEGORIES } from '../data/products';
import { ProductCard } from '../components/common/ProductCard';
import { useVisualizer } from '../context/VisualizerContext';
import { useLanguage } from '../context/LanguageContext';
import { useCart } from '../context/CartContext';
import { 
  Search, 
  Sparkles, 
  X, 
  Building2,
  ShieldCheck,
  CreditCard,
  Smartphone,
  Palette,
  LayoutGrid,
  Columns3,
  Columns2
} from 'lucide-react';
import type { ProductCategory, RoomStyle } from '../types';

gsap.registerPlugin(Flip);

const BANNER_THEMES = {
  sand: {
    id: 'sand',
    name: 'Warm Sand',
    nameAr: 'بيج رملي دافئ',
    colorCode: '#EFE8DE',
    bg: 'bg-[#EFE8DE] dark:bg-[#1E1914]',
    border: 'border-[#DCD0C0] dark:border-[#2E2620]',
    title: 'text-[#292722] dark:text-[#F8F7F3]',
    desc: 'text-[#6E6A63] dark:text-[#B5ACA0]',
    location: 'text-[#8C6D45] dark:text-[#D5C1A7]',
    badgeBg: 'bg-[#B58A54]',
    badgeText: 'text-white',
    btnPrimary: 'bg-[#292722] hover:bg-[#3D3A34] text-white dark:bg-[#F8F7F3] dark:text-[#292722] dark:hover:bg-white',
    btnSecondary: 'bg-white/80 hover:bg-white text-[#292722] border border-[#DCD0C0] dark:bg-[#2A231C] dark:text-[#F8F7F3] dark:border-[#3E342B]',
    glow: 'bg-[#B58A54]/15',
  },
  espresso: {
    id: 'espresso',
    name: 'Espresso Mocha',
    nameAr: 'موكا دافئ',
    colorCode: '#241C16',
    bg: 'bg-[#241C16] text-[#F8F7F3]',
    border: 'border-[#3D3025]',
    title: 'text-white',
    desc: 'text-[#C5B8AA]',
    location: 'text-[#D5C1A7]',
    badgeBg: 'bg-[#B58A54]',
    badgeText: 'text-white',
    btnPrimary: 'bg-white hover:bg-white/90 text-[#241C16]',
    btnSecondary: 'bg-white/10 hover:bg-white/15 text-white border border-white/20',
    glow: 'bg-[#B58A54]/20',
  },
  forest: {
    id: 'forest',
    name: 'Atelier Forest',
    nameAr: 'أخضر زمردي',
    colorCode: '#14241B',
    bg: 'bg-[#14241B] text-[#F8F7F3]',
    border: 'border-[#223B2D]',
    title: 'text-white',
    desc: 'text-[#B4C9BE]',
    location: 'text-[#A3E0C1]',
    badgeBg: 'bg-[#2E5E44]',
    badgeText: 'text-white',
    btnPrimary: 'bg-[#F4EFEB] hover:bg-white text-[#14241B]',
    btnSecondary: 'bg-white/10 hover:bg-white/15 text-white border border-white/20',
    glow: 'bg-emerald-500/15',
  },
  midnight: {
    id: 'midnight',
    name: 'Midnight Navy',
    nameAr: 'كحلي ليلي',
    colorCode: '#121A24',
    bg: 'bg-[#121A24] text-[#F8F7F3]',
    border: 'border-[#1E2C3D]',
    title: 'text-white',
    desc: 'text-[#AEC2D9]',
    location: 'text-[#94BCE8]',
    badgeBg: 'bg-[#274669]',
    badgeText: 'text-white',
    btnPrimary: 'bg-[#F8F7F3] hover:bg-white text-[#121A24]',
    btnSecondary: 'bg-white/10 hover:bg-white/15 text-white border border-white/20',
    glow: 'bg-blue-500/15',
  },
  ivory: {
    id: 'ivory',
    name: 'Pure Warm Ivory',
    nameAr: 'عاجي ناصع',
    colorCode: '#F8F6F0',
    bg: 'bg-[#F8F6F0] dark:bg-[#181614]',
    border: 'border-[#E8E2D9] dark:border-[#2D2A26]',
    title: 'text-[#292722] dark:text-[#F8F7F3]',
    desc: 'text-[#6E6A63] dark:text-[#A39E96]',
    location: 'text-[#B58A54]',
    badgeBg: 'bg-[#292722] dark:bg-[#F8F7F3]',
    badgeText: 'text-white dark:text-[#292722]',
    btnPrimary: 'bg-[#292722] hover:bg-[#3D3A34] text-white dark:bg-[#F8F7F3] dark:text-[#292722]',
    btnSecondary: 'bg-white hover:bg-stone-50 text-[#292722] border border-[#E8E2D9] dark:bg-[#25211D] dark:text-[#F8F7F3]',
    glow: 'bg-[#B58A54]/10',
  }
} as const;

type BannerThemeKey = keyof typeof BANNER_THEMES;

export const ShowroomPage: React.FC = () => {
  const { openExperienceA, openBookDemo } = useVisualizer();
  const { openPaymentModal } = useCart();
  const { t, isRTL, formatPrice } = useLanguage();

  const [selectedCategory, setSelectedCategory] = useState<ProductCategory>('all');
  const [selectedBrand, setSelectedBrand] = useState<'all' | 'ikea' | 'atelier'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStyle, setSelectedStyle] = useState<string>('all');
  const [maxPrice, setMaxPrice] = useState<number>(65000);
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc'>('featured');
  const [gridMode, setGridMode] = useState<'4-col' | '3-col' | '2-col'>('4-col');

  const gridRef = useRef<HTMLDivElement>(null);
  const lastStateRef = useRef<any>(null);

  // GSAP Flip state capture helper
  const captureFlip = () => {
    if (gridRef.current) {
      lastStateRef.current = Flip.getState(gridRef.current.querySelectorAll('.product-flip-card'));
    }
  };

  // Interactive Banner Color Theme Tester
  const [bannerColor, setBannerColor] = useState<BannerThemeKey>(() => {
    try {
      const saved = localStorage.getItem('roomora_showroom_banner_color');
      if (saved && Object.keys(BANNER_THEMES).includes(saved)) {
        return saved as BannerThemeKey;
      }
      return 'sand';
    } catch {
      return 'sand';
    }
  });

  const currentBannerTheme = BANNER_THEMES[bannerColor] || BANNER_THEMES.sand;

  const filteredProducts = useMemo(() => {
    return LUXURY_PRODUCTS.filter((product) => {
      // Brand filter
      if (selectedBrand === 'ikea' && !product.sku.startsWith('IK-')) {
        return false;
      }
      if (selectedBrand === 'atelier' && product.sku.startsWith('IK-')) {
        return false;
      }
      // Category filter
      if (selectedCategory !== 'all' && product.category !== selectedCategory) {
        return false;
      }
      // Style filter
      if (selectedStyle !== 'all' && product.style !== selectedStyle) {
        return false;
      }
      // Price filter
      if (product.priceEgp > maxPrice) {
        return false;
      }
      // Search query
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchName = product.name.toLowerCase().includes(query) || (product.nameAr && product.nameAr.toLowerCase().includes(query));
        const matchDesc = product.description.toLowerCase().includes(query) || (product.descriptionAr && product.descriptionAr.toLowerCase().includes(query));
        const matchMat = product.material.toLowerCase().includes(query) || (product.materialAr && product.materialAr.toLowerCase().includes(query));
        const matchSku = product.sku.toLowerCase().includes(query);
        const matchCollection = product.collection.toLowerCase().includes(query) || (product.collectionAr && product.collectionAr.toLowerCase().includes(query));
        if (!matchName && !matchDesc && !matchMat && !matchSku && !matchCollection) return false;
      }
      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-asc') return a.priceEgp - b.priceEgp;
      if (sortBy === 'price-desc') return b.priceEgp - a.priceEgp;
      return (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0);
    });
  }, [selectedCategory, selectedStyle, maxPrice, searchQuery, sortBy]);

  // GSAP Flip transition whenever filtered products or grid density changes
  useLayoutEffect(() => {
    if (!gridRef.current || !lastStateRef.current) return;
    Flip.from(lastStateRef.current, {
      duration: 0.65,
      ease: 'power3.out',
      stagger: 0.02,
      absolute: true,
      scale: true,
      onEnter: (elements) => {
        gsap.fromTo(elements, { opacity: 0, scale: 0.9, y: 15 }, { opacity: 1, scale: 1, y: 0, duration: 0.45, ease: 'power3.out' });
      },
      onLeave: (elements) => {
        gsap.to(elements, { opacity: 0, scale: 0.9, duration: 0.3, ease: 'power2.in' });
      }
    });
    lastStateRef.current = null;
  }, [filteredProducts, gridMode]);

  const allStyles: { id: RoomStyle; label: string; labelAr: string }[] = [
    { id: 'Minimalist', label: 'Minimalist', labelAr: 'مينيمالي دافئ' },
    { id: 'Modern', label: 'Modern', labelAr: 'مودرن معماري' },
    { id: 'Contemporary', label: 'Contemporary', labelAr: 'معاصر أنيق' },
    { id: 'Scandinavian', label: 'Scandinavian', labelAr: 'إسكندنافي هادئ' },
    { id: 'Luxury', label: 'Luxury', labelAr: 'فاخر راقي' },
  ];

  const handleResetFilters = () => {
    setSelectedCategory('all');
    setSelectedBrand('all');
    setSelectedStyle('all');
    setSearchQuery('');
    setMaxPrice(65000);
    setSortBy('featured');
  };

  return (
    <div className="min-h-screen bg-white dark:bg-[#121110] pb-24 transition-colors">
      {/* Showroom Header Banner - Customizable Architectural Color Theme */}
      <div className={`${currentBannerTheme.bg} pt-36 pb-14 sm:pt-40 sm:pb-16 border-b ${currentBannerTheme.border} relative overflow-hidden transition-all duration-500`}>
        {/* Subtle warm ambient glow */}
        <div className={`absolute top-0 right-1/4 w-96 h-96 ${currentBannerTheme.glow} rounded-full blur-3xl pointer-events-none transition-colors duration-500`} />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-3 max-w-2xl">
              <div className="flex items-center gap-2">
                <span className={`px-3 py-0.5 rounded-full ${currentBannerTheme.badgeBg} text-[10px] font-bold uppercase tracking-wider ${currentBannerTheme.badgeText}`}>
                  {t.storeLiveNotice}
                </span>
                <span className={`text-xs ${currentBannerTheme.location} font-mono`}>
                  {t.storeLocationTitle}
                </span>
              </div>

              <h1 className={`text-3xl sm:text-5xl font-editorial font-bold ${currentBannerTheme.title} tracking-tight transition-colors duration-300`}>
                {t.storePageTitle}
              </h1>

              <p className={`text-xs sm:text-sm ${currentBannerTheme.desc} leading-relaxed font-normal transition-colors duration-300`}>
                {t.storePageDesc}
              </p>

              {/* Interactive Color Switcher Toolbar */}
              <div className="pt-3 flex flex-wrap items-center gap-2">
                <div className="flex items-center gap-1.5 text-[11px] font-bold opacity-80">
                  <Palette className="w-3.5 h-3.5 text-[#B58A54]" />
                  <span className={currentBannerTheme.desc}>
                    {isRTL ? 'معاينة لون البانر:' : 'Test Banner Color:'}
                  </span>
                </div>

                <div className="flex items-center gap-1.5 p-1 rounded-2xl bg-black/5 dark:bg-white/10 backdrop-blur-md border border-black/10 dark:border-white/15">
                  {(Object.keys(BANNER_THEMES) as BannerThemeKey[]).map((key) => {
                    const themeOption = BANNER_THEMES[key];
                    const isSelected = bannerColor === key;
                    return (
                      <button
                        key={key}
                        onClick={() => {
                          setBannerColor(key);
                          try {
                            localStorage.setItem('roomora_showroom_banner_color', key);
                          } catch {}
                        }}
                        className={`flex items-center gap-1.5 px-3 py-1 rounded-xl text-[11px] font-bold transition-all cursor-pointer ${
                          isSelected
                            ? 'bg-white text-[#292722] shadow-sm ring-1 ring-black/10 scale-105'
                            : 'opacity-70 hover:opacity-100 hover:scale-102'
                        }`}
                        style={{ color: isSelected ? '#292722' : undefined }}
                        title={isRTL ? themeOption.nameAr : themeOption.name}
                      >
                        <span
                          className="w-3 h-3 rounded-full border border-black/20 shrink-0"
                          style={{ backgroundColor: themeOption.colorCode }}
                        />
                        <span className="hidden sm:inline">{isRTL ? themeOption.nameAr : themeOption.name}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 shrink-0">
              <button
                onClick={() => openExperienceA(LUXURY_PRODUCTS[0])}
                className={`px-5 py-3 rounded-xl ${currentBannerTheme.btnPrimary} text-xs font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-2 shadow-sm cursor-pointer`}
              >
                <Sparkles className="w-4 h-4 text-[#B58A54]" />
                <span>{t.storeTryModalBtn}</span>
              </button>

              <button
                onClick={openBookDemo}
                className={`px-5 py-3 rounded-xl ${currentBannerTheme.btnSecondary} text-xs font-bold tracking-wide transition-all flex items-center justify-center gap-2 cursor-pointer shadow-xs backdrop-blur-sm`}
              >
                <Building2 className="w-4 h-4 text-[#B58A54]" />
                <span>{t.storeRetailerSetupBtn}</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Catalog Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        {/* Brand & Collection Selector Tabs */}
        <div className="flex flex-wrap items-center gap-3 mb-5">
          <span className="text-xs font-bold text-[#6E6A63] dark:text-[#A39E96] uppercase tracking-wider">
            {isRTL ? 'الماركة والمعرض:' : 'Brand / Storefront:'}
          </span>
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => {
                captureFlip();
                setSelectedBrand('all');
              }}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                selectedBrand === 'all'
                  ? 'bg-[#292722] text-white dark:bg-[#F8F7F3] dark:text-[#292722] shadow-xs'
                  : 'bg-[#F8F7F3] dark:bg-[#1E1C1A] text-[#6E6A63] hover:text-[#292722] dark:text-[#A39E96] dark:hover:text-[#F8F7F3] border border-[#E8E2D9] dark:border-[#2D2A26]'
              }`}
            >
              {isRTL ? 'جميع المنتجات (20)' : 'All Products (20)'}
            </button>
            <button
              onClick={() => {
                captureFlip();
                setSelectedBrand('ikea');
              }}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                selectedBrand === 'ikea'
                  ? 'bg-[#0058A3] text-white shadow-xs'
                  : 'bg-[#0058A3]/10 text-[#0058A3] dark:text-[#6BB7FF] border border-[#0058A3]/25 hover:bg-[#0058A3]/20'
              }`}
            >
              <span className="font-black text-[10px] bg-yellow-400 text-blue-900 px-1 py-0.2 rounded">IKEA</span>
              <span>{isRTL ? 'أيكيا مصر (10 قطع أصلية)' : 'IKEA Egypt Store (10)'}</span>
            </button>
            <button
              onClick={() => {
                captureFlip();
                setSelectedBrand('atelier');
              }}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                selectedBrand === 'atelier'
                  ? 'bg-[#B58A54] text-white shadow-xs'
                  : 'bg-[#F8F7F3] dark:bg-[#1E1C1A] text-[#6E6A63] hover:text-[#292722] dark:text-[#A39E96] dark:hover:text-[#F8F7F3] border border-[#E8E2D9] dark:border-[#2D2A26]'
              }`}
            >
              {isRTL ? 'أتيليه القاهرة الفاخر (10)' : 'Atelier Signature Cairo (10)'}
            </button>
          </div>
        </div>

        {/* Category Pills Navigation with GSAP Flip */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 scrollbar-none mb-6">
          {CATEGORIES.map((cat) => {
            const isSelected = selectedCategory === cat.id;
            const label = isRTL && cat.labelAr ? cat.labelAr : cat.label;
            return (
              <button
                key={cat.id}
                onClick={() => {
                  captureFlip();
                  setSelectedCategory(cat.id as ProductCategory);
                }}
                className={`px-4 py-2.5 rounded-xl text-xs font-bold tracking-wide whitespace-nowrap transition-all cursor-pointer flex items-center gap-2 ${
                  isSelected
                    ? 'bg-[#292722] text-white dark:bg-[#F8F7F3] dark:text-[#292722] shadow-sm'
                    : 'bg-[#F8F7F3] dark:bg-[#1C1A17] hover:bg-[#E9DFD0] dark:hover:bg-[#24201C] text-[#6E6A63] dark:text-[#A39E96] border border-[#E8E2D9] dark:border-[#2D2A26]'
                }`}
              >
                <span>{label}</span>
                <span
                  className={`text-[10px] px-1.5 py-0.5 rounded-full ${
                    isSelected ? 'bg-white/20 dark:bg-black/20 text-current' : 'bg-[#E9DFD0] dark:bg-[#24201C] text-[#292722] dark:text-[#F8F7F3]'
                  }`}
                >
                  {cat.count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Egyptian Payment Gateways & Installment Banner */}
        <div className="mb-6 p-4 rounded-2xl bg-[#F8F7F3] dark:bg-[#1A1816] border border-[#E8E2D9] dark:border-[#2D2A26] flex flex-col sm:flex-row items-center justify-between gap-4 transition-colors">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-[#292722] text-white dark:bg-[#F8F7F3] dark:text-[#292722] flex items-center justify-center shrink-0">
              <ShieldCheck className="w-4 h-4 text-[#B58A54]" />
            </div>
            <div>
              <span className="text-xs font-bold text-[#292722] dark:text-[#F8F7F3] block">
                {isRTL ? 'قسّط أي قطعة أثاث حتى 6 أشهر بدون فوائد أو ادفع عبر إنستاباي' : 'Installments up to 6 months at 0% interest or instant pay via InstaPay'}
              </span>
              <span className="text-[10px] text-[#6E6A63] dark:text-[#A39E96]">
                {isRTL ? 'بوابات دفع معتمدة: إنستاباي (IPN) · فودافون كاش · بطاقة ميزة الوطنية · فاليو ValU · فوري' : 'Certified: InstaPay (IPN) · Vodafone Cash · Meeza Cards · ValU BNPL · Fawry Pay'}
              </span>
            </div>
          </div>

          <button
            onClick={() => openPaymentModal(filteredProducts[0]?.priceEgp || 35000, isRTL ? 'تجربة بوابة الدفع المصرية' : 'Test Egyptian Gateway')}
            className="shrink-0 px-4 py-2 rounded-xl bg-white dark:bg-[#25211D] border border-[#E8E2D9] dark:border-[#3D3833] hover:border-[#B58A54] text-xs font-bold text-[#292722] dark:text-[#F8F7F3] flex items-center gap-2 shadow-xs cursor-pointer transition-all"
          >
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>{isRTL ? 'جرّب بوابات الدفع المصرية' : 'Test Egyptian Gateways'}</span>
          </button>
        </div>

        {/* Filter and Search Bar */}
        <div className="bg-white dark:bg-[#1C1A17] rounded-2xl border border-[#E8E2D9] dark:border-[#2D2A26] p-4 sm:p-5 mb-8 shadow-xs transition-colors">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
            {/* Search Input (5 cols) */}
            <div className="md:col-span-5 relative">
              <Search className={`w-4 h-4 text-[#6E6A63] dark:text-[#A39E96] absolute ${isRTL ? 'right-3.5' : 'left-3.5'} top-1/2 -translate-y-1/2`} />
              <input
                type="text"
                placeholder={t.searchPlaceholder}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className={`w-full ${isRTL ? 'pr-10 pl-4' : 'pl-10 pr-4'} py-2.5 rounded-xl border border-[#E8E2D9] dark:border-[#2D2A26] bg-[#F8F7F3] dark:bg-[#141210] text-xs text-[#292722] dark:text-[#F8F7F3] focus:outline-none focus:ring-2 focus:ring-[#B58A54]`}
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className={`absolute ${isRTL ? 'left-3' : 'right-3'} top-1/2 -translate-y-1/2 text-stone-400 hover:text-[#292722] dark:hover:text-white`}
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* Style Selector (3 cols) */}
            <div className="md:col-span-3">
              <select
                value={selectedStyle}
                onChange={(e) => setSelectedStyle(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-[#E8E2D9] dark:border-[#2D2A26] bg-[#F8F7F3] dark:bg-[#141210] text-xs font-bold text-[#292722] dark:text-[#F8F7F3] focus:outline-none focus:ring-2 focus:ring-[#B58A54]"
              >
                <option value="all">{t.allStylesLabel}</option>
                {allStyles.map((style) => (
                  <option key={style.id} value={style.id}>
                    {isRTL ? style.labelAr : style.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Price Filter Slider (2 cols) */}
            <div className="md:col-span-2">
              <div className="flex items-center justify-between text-[11px] text-[#6E6A63] dark:text-[#A39E96] mb-1 font-bold">
                <span>{t.maxPriceLabel}</span>
                <span className="text-[#292722] dark:text-[#F8F7F3]">
                  {formatPrice(maxPrice)}
                </span>
              </div>
              <input
                type="range"
                min="10000"
                max="65000"
                step="5000"
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                className="w-full accent-[#292722] dark:accent-[#B58A54] cursor-pointer"
              />
            </div>

            {/* Sort Selector (2 cols) */}
            <div className="md:col-span-2">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="w-full px-3 py-2.5 rounded-xl border border-[#E8E2D9] dark:border-[#2D2A26] bg-[#F8F7F3] dark:bg-[#141210] text-xs font-bold text-[#292722] dark:text-[#F8F7F3] focus:outline-none focus:ring-2 focus:ring-[#B58A54]"
              >
                <option value="featured">{t.sortFeatured}</option>
                <option value="price-asc">{t.sortPriceAsc}</option>
                <option value="price-desc">{t.sortPriceDesc}</option>
              </select>
            </div>
          </div>

          {/* Active filter counter, GSAP Flip Layout Density Toggles, and reset */}
          <div className="mt-3 pt-3 border-t border-[#E8E2D9] dark:border-[#2D2A26] flex flex-wrap items-center justify-between gap-3 text-xs text-[#6E6A63] dark:text-[#A39E96]">
            <div className="flex items-center gap-4">
              <span>
                {isRTL
                  ? `عرض ${filteredProducts.length} قطعة أثاث فاخرة من المعرض`
                  : `Showing ${filteredProducts.length} luxury showroom products`}
              </span>
              {(selectedCategory !== 'all' || selectedStyle !== 'all' || searchQuery || maxPrice < 65000) && (
                <button
                  onClick={() => {
                    captureFlip();
                    handleResetFilters();
                  }}
                  className="text-xs text-[#B58A54] hover:text-[#292722] dark:hover:text-[#F8F7F3] underline font-bold cursor-pointer"
                >
                  {t.resetFilters}
                </button>
              )}
            </div>

            {/* GSAP Flip Layout Density Switcher */}
            <div className="flex items-center gap-1.5 p-1 rounded-xl bg-[#F8F7F3] dark:bg-[#141210] border border-[#E8E2D9] dark:border-[#2D2A26]">
              <span className="text-[10px] uppercase font-mono tracking-wider px-2 text-[#8C6D45] hidden sm:inline">
                {isRTL ? 'تنسيق الشبكة:' : 'Grid View:'}
              </span>
              <button
                onClick={() => {
                  if (gridMode === '4-col') return;
                  captureFlip();
                  setGridMode('4-col');
                }}
                className={`p-1.5 rounded-lg text-xs transition-all cursor-pointer flex items-center gap-1 ${
                  gridMode === '4-col'
                    ? 'bg-[#292722] text-white dark:bg-[#F8F7F3] dark:text-[#292722] shadow-xs'
                    : 'text-[#6E6A63] hover:text-[#292722] dark:text-[#A39E96]'
                }`}
                title="4-Column Showroom Grid"
              >
                <LayoutGrid className="w-3.5 h-3.5" />
                <span className="text-[10px] font-bold">4x</span>
              </button>
              <button
                onClick={() => {
                  if (gridMode === '3-col') return;
                  captureFlip();
                  setGridMode('3-col');
                }}
                className={`p-1.5 rounded-lg text-xs transition-all cursor-pointer flex items-center gap-1 ${
                  gridMode === '3-col'
                    ? 'bg-[#292722] text-white dark:bg-[#F8F7F3] dark:text-[#292722] shadow-xs'
                    : 'text-[#6E6A63] hover:text-[#292722] dark:text-[#A39E96]'
                }`}
                title="3-Column Editorial Grid"
              >
                <Columns3 className="w-3.5 h-3.5" />
                <span className="text-[10px] font-bold">3x</span>
              </button>
              <button
                onClick={() => {
                  if (gridMode === '2-col') return;
                  captureFlip();
                  setGridMode('2-col');
                }}
                className={`p-1.5 rounded-lg text-xs transition-all cursor-pointer flex items-center gap-1 ${
                  gridMode === '2-col'
                    ? 'bg-[#292722] text-white dark:bg-[#F8F7F3] dark:text-[#292722] shadow-xs'
                    : 'text-[#6E6A63] hover:text-[#292722] dark:text-[#A39E96]'
                }`}
                title="2-Column Architectural Focus"
              >
                <Columns2 className="w-3.5 h-3.5" />
                <span className="text-[10px] font-bold">2x</span>
              </button>
            </div>
          </div>
        </div>

        {/* Product Grid with GSAP Flip Transition */}
        {filteredProducts.length === 0 ? (
          <div className="py-20 text-center bg-white dark:bg-[#1C1A17] rounded-3xl border border-[#E8E2D9] dark:border-[#2D2A26] p-8 space-y-3">
            <p className="text-base font-bold text-[#292722] dark:text-[#F8F7F3]">{t.noProductsFound}</p>
            <p className="text-xs text-[#6E6A63] dark:text-[#A39E96]">{t.noProductsHint}</p>
            <button
              onClick={() => {
                captureFlip();
                handleResetFilters();
              }}
              className="mt-2 px-5 py-2.5 rounded-xl bg-[#292722] text-white dark:bg-[#F8F7F3] dark:text-[#292722] text-xs font-bold cursor-pointer"
            >
              {t.resetFilters}
            </button>
          </div>
        ) : (
          <div 
            ref={gridRef}
            className={`grid gap-6 transition-all duration-300 ${
              gridMode === '4-col'
                ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'
                : gridMode === '3-col'
                ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 sm:gap-8'
                : 'grid-cols-1 sm:grid-cols-2 lg:gap-8'
            }`}
          >
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}

        {/* Bottom Banner Explaining Retail Integration */}
        <div className={`mt-16 p-8 rounded-3xl ${currentBannerTheme.bg} border ${currentBannerTheme.border} shadow-xl flex flex-col md:flex-row items-center justify-between gap-6 transition-all duration-500`}>
          <div className="space-y-2">
            <span className={`text-[10px] uppercase font-bold tracking-widest ${currentBannerTheme.location}`}>
              {t.storeBannerEyebrow}
            </span>
            <h3 className={`text-2xl font-editorial font-bold ${currentBannerTheme.title}`}>
              {t.storeBannerTitle}
            </h3>
            <p className={`text-xs ${currentBannerTheme.desc} max-w-xl leading-relaxed font-normal`}>
              {t.storeBannerDesc}
            </p>
          </div>
          <button
            onClick={openBookDemo}
            className={`px-6 py-3.5 rounded-xl ${currentBannerTheme.btnPrimary} text-xs font-bold uppercase tracking-wider transition-all shadow-sm flex items-center gap-2 shrink-0 cursor-pointer`}
          >
            <Building2 className="w-4 h-4 text-[#B58A54]" />
            <span>{t.storeBannerCta}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
