import React, { useState, useMemo } from 'react';
import { LUXURY_PRODUCTS, CATEGORIES } from '../data/products';
import { ProductCard } from '../components/common/ProductCard';
import { useVisualizer } from '../context/VisualizerContext';
import { useLanguage } from '../context/LanguageContext';
import { 
  Search, 
  Sparkles, 
  X, 
  Building2
} from 'lucide-react';
import type { ProductCategory, RoomStyle } from '../types';

export const ShowroomPage: React.FC = () => {
  const { openExperienceA, openBookDemo } = useVisualizer();
  const { t, isRTL, formatPrice } = useLanguage();

  const [selectedCategory, setSelectedCategory] = useState<ProductCategory>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStyle, setSelectedStyle] = useState<string>('all');
  const [maxPrice, setMaxPrice] = useState<number>(65000);
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc'>('featured');

  const filteredProducts = useMemo(() => {
    return LUXURY_PRODUCTS.filter((product) => {
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
        if (!matchName && !matchDesc && !matchMat && !matchSku) return false;
      }
      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-asc') return a.priceEgp - b.priceEgp;
      if (sortBy === 'price-desc') return b.priceEgp - a.priceEgp;
      return (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0);
    });
  }, [selectedCategory, selectedStyle, maxPrice, searchQuery, sortBy]);

  const allStyles: { id: RoomStyle; label: string; labelAr: string }[] = [
    { id: 'Minimalist', label: 'Minimalist', labelAr: 'مينيمالي دافئ' },
    { id: 'Modern', label: 'Modern', labelAr: 'مودرن معماري' },
    { id: 'Contemporary', label: 'Contemporary', labelAr: 'معاصر أنيق' },
    { id: 'Scandinavian', label: 'Scandinavian', labelAr: 'إسكندنافي هادئ' },
    { id: 'Luxury', label: 'Luxury', labelAr: 'فاخر راقي' },
  ];

  const handleResetFilters = () => {
    setSelectedCategory('all');
    setSelectedStyle('all');
    setSearchQuery('');
    setMaxPrice(65000);
    setSortBy('featured');
  };

  return (
    <div className="min-h-screen bg-white dark:bg-[#121110] pb-24 transition-colors">
      {/* Showroom Header Banner - Dark Luxury Editorial Section */}
      <div className="bg-[#141210] text-[#F8F7F3] pt-36 pb-14 sm:pt-40 sm:pb-16 border-b border-[#2D2A26] relative overflow-hidden transition-colors">
        {/* Subtle warm ambient glow */}
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#B58A54]/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-3 max-w-2xl">
              <div className="flex items-center gap-2">
                <span className="px-3 py-0.5 rounded-full bg-[#B58A54] text-[10px] font-bold uppercase tracking-wider text-white">
                  {t.storeLiveNotice}
                </span>
                <span className="text-xs text-[#CDBBA5] font-mono">
                  {t.storeLocationTitle}
                </span>
              </div>
              <h1 className="text-3xl sm:text-5xl font-editorial font-bold text-white tracking-tight">
                {t.storePageTitle}
              </h1>
              <p className="text-xs sm:text-sm text-[#A39E96] leading-relaxed font-normal">
                {t.storePageDesc}
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 shrink-0">
              <button
                onClick={() => openExperienceA(LUXURY_PRODUCTS[0])}
                className="px-5 py-3 rounded-xl bg-white hover:bg-white/90 text-[#141210] text-xs font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-2 shadow-sm cursor-pointer"
              >
                <Sparkles className="w-4 h-4 text-[#B58A54]" />
                <span>{t.storeTryModalBtn}</span>
              </button>

              <button
                onClick={openBookDemo}
                className="px-5 py-3 rounded-xl bg-white/10 hover:bg-white/15 text-white text-xs font-bold tracking-wide border border-white/20 transition-all flex items-center justify-center gap-2 cursor-pointer shadow-xs backdrop-blur-sm"
              >
                <Building2 className="w-4 h-4 text-[#CDBBA5]" />
                <span>{t.storeRetailerSetupBtn}</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Catalog Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        {/* Category Pills Navigation */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 scrollbar-none mb-6">
          {CATEGORIES.map((cat) => {
            const isSelected = selectedCategory === cat.id;
            const label = isRTL && cat.labelAr ? cat.labelAr : cat.label;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id as ProductCategory)}
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

          {/* Active filter counter and reset */}
          <div className="mt-3 pt-3 border-t border-[#E8E2D9] dark:border-[#2D2A26] flex items-center justify-between text-xs text-[#6E6A63] dark:text-[#A39E96]">
            <span>
              {isRTL
                ? `عرض ${filteredProducts.length} قطعة أثاث فاخرة من المعرض`
                : `Showing ${filteredProducts.length} luxury showroom products`}
            </span>
            {(selectedCategory !== 'all' || selectedStyle !== 'all' || searchQuery || maxPrice < 65000) && (
              <button
                onClick={handleResetFilters}
                className="text-xs text-[#B58A54] hover:text-[#292722] dark:hover:text-[#F8F7F3] underline font-bold cursor-pointer"
              >
                {t.resetFilters}
              </button>
            )}
          </div>
        </div>

        {/* Product Grid */}
        {filteredProducts.length === 0 ? (
          <div className="py-20 text-center bg-white dark:bg-[#1C1A17] rounded-3xl border border-[#E8E2D9] dark:border-[#2D2A26] p-8 space-y-3">
            <p className="text-base font-bold text-[#292722] dark:text-[#F8F7F3]">{t.noProductsFound}</p>
            <p className="text-xs text-[#6E6A63] dark:text-[#A39E96]">{t.noProductsHint}</p>
            <button
              onClick={handleResetFilters}
              className="mt-2 px-5 py-2.5 rounded-xl bg-[#292722] text-white dark:bg-[#F8F7F3] dark:text-[#292722] text-xs font-bold cursor-pointer"
            >
              {t.resetFilters}
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}

        {/* Bottom Banner Explaining Retail Integration */}
        <div className="mt-16 p-8 rounded-3xl bg-[#141210] text-[#F8F7F3] border border-[#2D2A26] shadow-xl flex flex-col md:flex-row items-center justify-between gap-6 transition-colors">
          <div className="space-y-2">
            <span className="text-[10px] uppercase font-bold tracking-widest text-[#B58A54]">
              {t.storeBannerEyebrow}
            </span>
            <h3 className="text-2xl font-editorial font-bold text-white">
              {t.storeBannerTitle}
            </h3>
            <p className="text-xs text-[#A39E96] max-w-xl leading-relaxed font-normal">
              {t.storeBannerDesc}
            </p>
          </div>
          <button
            onClick={openBookDemo}
            className="px-6 py-3.5 rounded-xl bg-white hover:bg-white/90 text-[#141210] text-xs font-bold uppercase tracking-wider transition-all shadow-sm flex items-center gap-2 shrink-0 cursor-pointer"
          >
            <Building2 className="w-4 h-4 text-[#B58A54]" />
            <span>{t.storeBannerCta}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
