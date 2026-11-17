import React, { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { useShowroomMarketplace } from '../context/ShowroomMarketplaceContext';
import { BrandCard } from '../components/BrandCard';
import { PlaceCard } from '../components/PlaceCard';
import { MarketplaceProductCard } from '../components/MarketplaceProductCard';
import { useLanguage } from '../../../context/LanguageContext';
import { useCart } from '../../../context/CartContext';
import { useVisualizer } from '../../../context/VisualizerContext';
import { CATEGORIES, STYLES } from '../../../data/products';
import {
  Search,
  Sparkles,
  Building2,
  MapPin,
  Layers,
  LayoutGrid,
  List as ListIcon,
  X,
  ShieldCheck,
  CreditCard,
  Smartphone,
  SlidersHorizontal,
  Settings2,
  ArrowRight,
  ArrowLeft,
} from 'lucide-react';

type ActiveSectionTab = 'discover' | 'brands' | 'places' | 'products';
type BrandSort = 'featured' | 'most-products' | 'az';
type PlaceSort = 'featured' | 'most-products' | 'az';
type ProductSort = 'featured' | 'price-asc' | 'price-desc' | 'newest';

const BRAND_PAGE_STEP = 6;
const PLACE_PAGE_STEP = 6;
const PRODUCT_PAGE_STEP = 9;

export const ShowroomMarketplacePage: React.FC = () => {
  const {
    publishedBrands,
    publishedPlaces,
    publishedProducts,
    getBrandById,
    getProductsByBrand,
    getProductsByPlace,
    getBrandsForPlace,
    getPlacesForProduct,
  } = useShowroomMarketplace();
  const { isRTL, formatPrice } = useLanguage();
  const { openPaymentModal } = useCart();
  const { openExperienceA } = useVisualizer();

  const Arrow = isRTL ? ArrowLeft : ArrowRight;

  // Navigation & hero global search
  const [activeTab, setActiveTab] = useState<ActiveSectionTab>('discover');
  const [globalQuery, setGlobalQuery] = useState('');

  // Brands state
  const [brandCategoryFilter, setBrandCategoryFilter] = useState<string>('all');
  const [brandSort, setBrandSort] = useState<BrandSort>('featured');
  const [brandsVisible, setBrandsVisible] = useState(BRAND_PAGE_STEP);

  // Places state
  const [placeLocationFilter, setPlaceLocationFilter] = useState<string>('all');
  const [placeSort, setPlaceSort] = useState<PlaceSort>('featured');
  const [placesVisible, setPlacesVisible] = useState(PLACE_PAGE_STEP);

  // Products state
  const [productCategory, setProductCategory] = useState<string>('all');
  const [productBrandFilter, setProductBrandFilter] = useState<string>('all');
  const [productPlaceFilter, setProductPlaceFilter] = useState<string>('all');
  const [productStyleFilter, setProductStyleFilter] = useState<string>('all');
  const [maxPrice, setMaxPrice] = useState<number>(120000);
  const [productSort, setProductSort] = useState<ProductSort>('featured');
  const [productLayout, setProductLayout] = useState<'grid' | 'list'>('grid');
  const [productsVisible, setProductsVisible] = useState(PRODUCT_PAGE_STEP);

  const normalizedQuery = globalQuery.trim().toLowerCase();

  // Derive distinct locations & brand categories dynamically
  const availableLocations = useMemo(() => {
    const locs = Array.from(new Set(publishedPlaces.map((p) => p.location))).filter(Boolean);
    return locs;
  }, [publishedPlaces]);

  const availableBrandCategories = useMemo(() => {
    const cats = new Set<string>();
    publishedBrands.forEach((b) => b.categories.forEach((c) => cats.add(c)));
    return Array.from(cats);
  }, [publishedBrands]);

  // Filtered Brands
  const filteredBrands = useMemo(() => {
    const list = publishedBrands.filter((brand) => {
      const matchesQuery =
        !normalizedQuery ||
        brand.name.toLowerCase().includes(normalizedQuery) ||
        brand.nameAr.includes(normalizedQuery) ||
        brand.description.toLowerCase().includes(normalizedQuery) ||
        brand.origin.toLowerCase().includes(normalizedQuery);
      const matchesCat =
        brandCategoryFilter === 'all' || brand.categories.includes(brandCategoryFilter);
      return matchesQuery && matchesCat;
    });

    return [...list].sort((a, b) => {
      if (brandSort === 'featured') {
        if (a.featured !== b.featured) return a.featured ? -1 : 1;
        return getProductsByBrand(b.id).length - getProductsByBrand(a.id).length;
      }
      if (brandSort === 'most-products') {
        return getProductsByBrand(b.id).length - getProductsByBrand(a.id).length;
      }
      return a.name.localeCompare(b.name);
    });
  }, [publishedBrands, normalizedQuery, brandCategoryFilter, brandSort, getProductsByBrand]);

  const featuredBrands = useMemo(
    () => publishedBrands.filter((b) => b.featured),
    [publishedBrands]
  );

  // Filtered Places
  const filteredPlaces = useMemo(() => {
    const list = publishedPlaces.filter((place) => {
      const matchesQuery =
        !normalizedQuery ||
        place.name.toLowerCase().includes(normalizedQuery) ||
        place.nameAr.includes(normalizedQuery) ||
        place.location.toLowerCase().includes(normalizedQuery) ||
        place.address.toLowerCase().includes(normalizedQuery) ||
        place.description.toLowerCase().includes(normalizedQuery);
      const matchesLocation =
        placeLocationFilter === 'all' || place.location === placeLocationFilter;
      return matchesQuery && matchesLocation;
    });

    return [...list].sort((a, b) => {
      if (placeSort === 'featured') {
        if (a.featured !== b.featured) return a.featured ? -1 : 1;
        return getProductsByPlace(b.id).length - getProductsByPlace(a.id).length;
      }
      if (placeSort === 'most-products') {
        return getProductsByPlace(b.id).length - getProductsByPlace(a.id).length;
      }
      return a.name.localeCompare(b.name);
    });
  }, [publishedPlaces, normalizedQuery, placeLocationFilter, placeSort, getProductsByPlace]);

  // Filtered Products
  const filteredProducts = useMemo(() => {
    const list = publishedProducts.filter((product) => {
      const brand = getBrandById(product.brandId);
      const matchesQuery =
        !normalizedQuery ||
        product.name.toLowerCase().includes(normalizedQuery) ||
        product.nameAr.includes(normalizedQuery) ||
        product.sku.toLowerCase().includes(normalizedQuery) ||
        product.materials.toLowerCase().includes(normalizedQuery) ||
        (brand?.name.toLowerCase().includes(normalizedQuery) ?? false);
      const matchesCategory =
        productCategory === 'all' || product.categoryId === productCategory;
      const matchesBrand =
        productBrandFilter === 'all' || product.brandId === productBrandFilter;
      const matchesPlace =
        productPlaceFilter === 'all' || product.storeIds.includes(productPlaceFilter);
      const matchesStyle =
        productStyleFilter === 'all' || product.style === productStyleFilter;
      const matchesPrice = product.price <= maxPrice;

      return (
        matchesQuery &&
        matchesCategory &&
        matchesBrand &&
        matchesPlace &&
        matchesStyle &&
        matchesPrice
      );
    });

    return [...list].sort((a, b) => {
      if (productSort === 'price-asc') return a.price - b.price;
      if (productSort === 'price-desc') return b.price - a.price;
      if (productSort === 'newest') return b.createdAt.localeCompare(a.createdAt);
      if (a.featured !== b.featured) return a.featured ? -1 : 1;
      return 0;
    });
  }, [
    publishedProducts,
    normalizedQuery,
    productCategory,
    productBrandFilter,
    productPlaceFilter,
    productStyleFilter,
    maxPrice,
    productSort,
    getBrandById,
  ]);

  const resetAllFilters = () => {
    setGlobalQuery('');
    setBrandCategoryFilter('all');
    setPlaceLocationFilter('all');
    setProductCategory('all');
    setProductBrandFilter('all');
    setProductPlaceFilter('all');
    setProductStyleFilter('all');
    setMaxPrice(120000);
  };

  const hasActiveFilters =
    Boolean(globalQuery) ||
    brandCategoryFilter !== 'all' ||
    placeLocationFilter !== 'all' ||
    productCategory !== 'all' ||
    productBrandFilter !== 'all' ||
    productPlaceFilter !== 'all' ||
    productStyleFilter !== 'all' ||
    maxPrice < 120000;

  return (
    <div
      dir={isRTL ? 'rtl' : 'ltr'}
      className="min-h-screen bg-[#F8F7F3] dark:bg-[#121110] pt-24 pb-24 transition-colors duration-300"
    >
      {/* 1. LUXURY EDITORIAL HERO SECTION */}
      <section className="relative overflow-hidden border-b border-[#E8E2D9] dark:border-[#26231F] bg-white dark:bg-[#161412]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            {/* Left Copy & Search */}
            <div className="lg:col-span-7 space-y-6">
              <div className="flex flex-wrap items-center gap-3">
                <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#B58A54]/10 border border-[#B58A54]/25 text-[#9C7240] dark:text-[#D1A971] text-[11px] font-bold uppercase tracking-[0.18em]">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>
                    {isRTL ? 'سوق فيستايا للأثاث الفاخر' : 'VESTAIA Curated Marketplace'}
                  </span>
                </span>
                <Link
                  to="/showroom/manage"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-[#E8E2D9] dark:border-[#2D2A26] text-[11px] font-semibold text-[#5C544B] dark:text-[#BDB5AA] hover:border-[#B58A54] hover:text-[#B58A54] transition-colors"
                >
                  <Settings2 className="w-3.5 h-3.5" />
                  <span>{isRTL ? 'إدارة المعرض والماركات' : 'Manage Catalog'}</span>
                </Link>
              </div>

              <h1 className="font-editorial text-4xl sm:text-5xl lg:text-[3.4rem] leading-[1.08] font-medium tracking-tight text-[#292722] dark:text-[#F8F7F3]">
                {isRTL
                  ? 'اكتشف الأثاث بلا حدود'
                  : 'Discover Furniture Without Limits'}
              </h1>

              <p className="text-base sm:text-lg text-[#5C544B] dark:text-[#A89F92] max-w-2xl leading-relaxed">
                {isRTL
                  ? 'استكشف نخبة علامات الأثاث، والتشكيلات المختارة، وصالات العرض الفعلية في مكان واحد — وجرّب كل قطعة في غرفتك بالذكاء الاصطناعي.'
                  : 'Explore exceptional furniture brands, curated collections, and inspiring showrooms — all in one place.'}
              </p>

              {/* Unified Search Bar */}
              <div className="relative max-w-2xl">
                <Search
                  className={`w-5 h-5 text-[#8A8175] absolute ${
                    isRTL ? 'right-4' : 'left-4'
                  } top-1/2 -translate-y-1/2`}
                />
                <input
                  type="text"
                  value={globalQuery}
                  onChange={(e) => setGlobalQuery(e.target.value)}
                  placeholder={
                    isRTL
                      ? 'ابحث عن ماركة، صالة عرض، قطعة أثاث، أو خامة...'
                      : 'Search furniture brands, physical showrooms, products, or materials...'
                  }
                  className={`w-full py-4 ${
                    isRTL ? 'pr-12 pl-12' : 'pl-12 pr-12'
                  } rounded-2xl bg-[#F8F7F3] dark:bg-[#1C1A17] border border-[#E2DAD0] dark:border-[#2D2A26] text-sm text-[#292722] dark:text-[#F8F7F3] placeholder-[#8A8175] focus:outline-none focus:border-[#B58A54] shadow-2xs`}
                />
                {globalQuery && (
                  <button
                    type="button"
                    onClick={() => setGlobalQuery('')}
                    aria-label="Clear search"
                    className={`absolute ${
                      isRTL ? 'left-3.5' : 'right-3.5'
                    } top-1/2 -translate-y-1/2 p-1.5 rounded-full hover:bg-[#E8E2D9] dark:hover:bg-[#2D2A26] text-[#8A8175]`}
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>

              {/* Quick Discovery Stats + Navigation */}
              <div className="flex flex-wrap items-center gap-3 pt-1">
                <button
                  type="button"
                  onClick={() => setActiveTab('brands')}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#292722] dark:bg-[#F8F7F3] text-white dark:text-[#1C1A17] text-xs font-bold tracking-wide hover:bg-[#B58A54] dark:hover:bg-[#B58A54] dark:hover:text-white transition-colors"
                >
                  <Building2 className="w-4 h-4" />
                  <span>
                    {isRTL
                      ? `تصفح الماركات (${publishedBrands.length})`
                      : `Explore Brands (${publishedBrands.length})`}
                  </span>
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab('places')}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#F5F1EA] dark:bg-[#25221E] text-[#292722] dark:text-[#F8F7F3] border border-[#E2DAD0] dark:border-[#34302A] text-xs font-bold tracking-wide hover:border-[#B58A54] transition-colors"
                >
                  <MapPin className="w-4 h-4 text-[#B58A54]" />
                  <span>
                    {isRTL
                      ? `صالات العرض (${publishedPlaces.length})`
                      : `Visit Showrooms (${publishedPlaces.length})`}
                  </span>
                </button>
                <button
                  type="button"
                  onClick={() => openExperienceA()}
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold text-[#9C7240] dark:text-[#D1A971] hover:bg-[#B58A54]/10 transition-colors"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>{isRTL ? 'افتح استوديو AI للغرف' : 'Launch AI Room Studio'}</span>
                </button>
              </div>
            </div>

            {/* Right Editorial Imagery Collage */}
            <div className="lg:col-span-5 grid grid-cols-12 gap-3.5 items-stretch">
              <div className="col-span-7 relative rounded-3xl overflow-hidden aspect-[4/5] bg-[#F5F1EA] dark:bg-[#25221E] shadow-lg">
                <img
                  src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1000&q=85"
                  alt="Architectural luxury living interior"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <div className={`absolute bottom-4 ${isRTL ? 'right-4' : 'left-4'} text-white`}>
                  <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#E6CFAF]">
                    {isRTL ? 'تشكيلة مختارة' : 'CURATED ATELIER'}
                  </p>
                  <p className="font-editorial text-lg font-medium">
                    {isRTL ? `${publishedProducts.length} قطعة أصلية` : `${publishedProducts.length} Bespoke Pieces`}
                  </p>
                </div>
              </div>
              <div className="col-span-5 flex flex-col gap-3.5">
                <div className="relative flex-1 rounded-3xl overflow-hidden bg-[#F5F1EA] dark:bg-[#25221E] shadow-md">
                  <img
                    src="https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=900&q=85"
                    alt="Flagship furniture gallery"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-4 rounded-2xl bg-[#1C1A17] text-white flex flex-col justify-between">
                  <p className="text-[10px] uppercase tracking-[0.18em] text-[#B58A54] font-bold">
                    {isRTL ? 'معاينة فورية بالذكاء الاصطناعي' : 'AI SPATIAL PREVIEW'}
                  </p>
                  <p className="text-xs text-[#EAE6DF] mt-1 leading-relaxed">
                    {isRTL
                      ? 'قارن الأسعار والخامات عبر المعارض وجرّب أي قطعة داخل مساحتك.'
                      : 'Compare pieces across physical stores and test them inside your room.'}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. MAIN BROWSE TABS */}
      <div className="sticky top-[72px] z-30 bg-[#F8F7F3]/92 dark:bg-[#121110]/92 backdrop-blur-md border-b border-[#E8E2D9] dark:border-[#26231F]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar">
            {[
              {
                id: 'discover' as const,
                labelEn: 'Discover All',
                labelAr: 'اكتشف الكل',
                count: publishedBrands.length + publishedPlaces.length + publishedProducts.length,
                icon: Sparkles,
              },
              {
                id: 'brands' as const,
                labelEn: 'All Brands',
                labelAr: 'كل الماركات',
                count: filteredBrands.length,
                icon: Building2,
              },
              {
                id: 'places' as const,
                labelEn: 'All Places',
                labelAr: 'كل المعارض',
                count: filteredPlaces.length,
                icon: MapPin,
              },
              {
                id: 'products' as const,
                labelEn: 'All Products',
                labelAr: 'كل المنتجات',
                count: filteredProducts.length,
                icon: Layers,
              },
            ].map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveTab(tab.id)}
                  className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                    isActive
                      ? 'bg-[#292722] dark:bg-[#F8F7F3] text-white dark:text-[#1C1A17] shadow-sm'
                      : 'text-[#5C544B] dark:text-[#A89F92] hover:bg-white dark:hover:bg-[#1C1A17]'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{isRTL ? tab.labelAr : tab.labelEn}</span>
                  <span
                    className={`px-1.5 py-0.5 rounded-md text-[10px] ${
                      isActive
                        ? 'bg-white/20 dark:bg-black/15'
                        : 'bg-[#EBE4DA] dark:bg-[#25221E] text-[#5C544B] dark:text-[#BDB5AA]'
                    }`}
                  >
                    {tab.count}
                  </span>
                </button>
              );
            })}
          </div>

          {hasActiveFilters && (
            <button
              type="button"
              onClick={resetAllFilters}
              className="text-xs font-semibold text-[#B58A54] hover:underline flex items-center gap-1"
            >
              <X className="w-3.5 h-3.5" />
              <span>{isRTL ? 'إعادة ضبط الفلاتر' : 'Reset Filters'}</span>
            </button>
          )}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 space-y-16">
        {/* EGYPTIAN PAYMENT TRUST STRIP (Preserved from original /showroom) */}
        <div className="p-5 sm:p-6 bg-[#1C1A17] text-white rounded-3xl flex flex-col lg:flex-row lg:items-center justify-between gap-4 border border-[#2D2A26] shadow-sm">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#B58A54]/20 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-5 h-5 text-[#B58A54]" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-white">
                {isRTL
                  ? 'خيارات الدفع الإلكتروني والتقسيط المعتمدة في مصر'
                  : 'Certified Egyptian Payment Gateways & 0% Installments'}
              </h2>
              <p className="text-xs text-[#BDB5AA] mt-0.5">
                {isRTL
                  ? 'ادفع فوراً عبر إنستاباي، فودافون كاش، أورانج موني، بطاقة ميزة، أو تقسيط فاليو.'
                  : 'Pay seamlessly via InstaPay (IPN), Vodafone Cash, Meeza National Card, or ValU 0% APR up to 60 months.'}
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2 shrink-0">
            <span className="px-2.5 py-1 rounded-lg bg-[#2D2A26] text-[11px] font-semibold flex items-center gap-1.5">
              <CreditCard className="w-3.5 h-3.5 text-[#B58A54]" />
              Meeza & Visa
            </span>
            <span className="px-2.5 py-1 rounded-lg bg-[#2D2A26] text-[11px] font-semibold flex items-center gap-1.5">
              <Smartphone className="w-3.5 h-3.5 text-purple-400" />
              InstaPay
            </span>
            <button
              type="button"
              onClick={() => openPaymentModal(38500, 'VESTAIA Showroom Reservation')}
              className="px-4 py-2 bg-[#B58A54] text-white rounded-xl text-xs font-bold hover:bg-[#9C7240] transition-colors"
            >
              {isRTL ? 'معاينة الدفع المصري' : 'Preview Egypt Checkout'}
            </button>
          </div>
        </div>

        {/* SECTION A: BRANDS */}
        {(activeTab === 'discover' || activeTab === 'brands') && (
          <section className="space-y-8">
            {/* Featured Brands Spotlight (shown on Discover & Brands when unfiltered) */}
            {featuredBrands.length > 0 && !normalizedQuery && brandCategoryFilter === 'all' && (
              <div className="space-y-4">
                <div className="flex items-end justify-between gap-4">
                  <div>
                    <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#B58A54]">
                      {isRTL ? 'شركاء التميز' : 'FEATURED ATELIERS'}
                    </p>
                    <h2 className="font-editorial text-2xl sm:text-3xl font-medium text-[#292722] dark:text-[#F8F7F3] mt-1">
                      {isRTL ? 'أبرز علامات الأثاث المختارة' : 'Signature Furniture Houses'}
                    </h2>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {featuredBrands.slice(0, 3).map((brand) => (
                    <BrandCard
                      key={`feat-${brand.id}`}
                      brand={brand}
                      productCount={getProductsByBrand(brand.id).length}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* All Brands Header + Filters */}
            <div className="space-y-5 pt-2">
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                <div>
                  <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#8A8175]">
                    {isRTL ? 'دليل الماركات' : 'BRAND DIRECTORY'}
                  </p>
                  <h2 className="font-editorial text-2xl sm:text-3xl font-medium text-[#292722] dark:text-[#F8F7F3] mt-1">
                    {isRTL ? 'جميع العلامات التجارية' : 'All Furniture Brands'}
                  </h2>
                </div>

                <div className="flex flex-wrap items-center gap-2.5">
                  <select
                    value={brandCategoryFilter}
                    onChange={(e) => setBrandCategoryFilter(e.target.value)}
                    aria-label="Filter brands by category"
                    className="px-3.5 py-2 rounded-xl bg-white dark:bg-[#1C1A17] border border-[#E2DAD0] dark:border-[#2D2A26] text-xs font-semibold text-[#292722] dark:text-[#F8F7F3]"
                  >
                    <option value="all">{isRTL ? 'كل الفئات' : 'All Categories'}</option>
                    {availableBrandCategories.map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>

                  <select
                    value={brandSort}
                    onChange={(e) => setBrandSort(e.target.value as BrandSort)}
                    aria-label="Sort brands"
                    className="px-3.5 py-2 rounded-xl bg-white dark:bg-[#1C1A17] border border-[#E2DAD0] dark:border-[#2D2A26] text-xs font-semibold text-[#292722] dark:text-[#F8F7F3]"
                  >
                    <option value="featured">{isRTL ? 'المميزة أولاً' : 'Sort: Featured'}</option>
                    <option value="most-products">{isRTL ? 'الأكثر منتجات' : 'Sort: Most Products'}</option>
                    <option value="az">{isRTL ? 'أبجدياً (A–Z)' : 'Sort: A–Z'}</option>
                  </select>

                  {activeTab === 'discover' && (
                    <button
                      type="button"
                      onClick={() => setActiveTab('brands')}
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-[#B58A54] hover:underline px-2"
                    >
                      <span>{isRTL ? 'عرض الكل' : 'View All'}</span>
                      <Arrow className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              </div>

              {filteredBrands.length === 0 ? (
                <div className="py-12 px-6 rounded-3xl bg-white dark:bg-[#1C1A17] border border-[#E8E2D9] dark:border-[#2D2A26] text-center">
                  <p className="text-sm font-medium text-[#5C544B] dark:text-[#A89F92]">
                    {isRTL
                      ? 'لا توجد علامات تجارية مطابقة للبحث الحالي.'
                      : 'No furniture brands match your current filters.'}
                  </p>
                </div>
              ) : (
                <>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {(activeTab === 'discover'
                      ? filteredBrands.slice(0, 3)
                      : filteredBrands.slice(0, brandsVisible)
                    ).map((brand) => (
                      <BrandCard
                        key={brand.id}
                        brand={brand}
                        productCount={getProductsByBrand(brand.id).length}
                      />
                    ))}
                  </div>

                  {activeTab === 'brands' && filteredBrands.length > brandsVisible && (
                    <div className="flex justify-center pt-2">
                      <button
                        type="button"
                        onClick={() => setBrandsVisible((v) => v + BRAND_PAGE_STEP)}
                        className="px-6 py-3 rounded-xl bg-white dark:bg-[#1C1A17] border border-[#E2DAD0] dark:border-[#2D2A26] text-xs font-bold text-[#292722] dark:text-[#F8F7F3] hover:border-[#B58A54] transition-colors"
                      >
                        {isRTL ? 'تحميل المزيد من الماركات' : 'Load More Brands'}
                      </button>
                    </div>
                  )}
                </>
              )}
            </div>
          </section>
        )}

        {/* SECTION B: PLACES / PHYSICAL SHOWROOMS */}
        {(activeTab === 'discover' || activeTab === 'places') && (
          <section className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
              <div>
                <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#B58A54]">
                  {isRTL ? 'صالات العرض والمتاجر' : 'PHYSICAL SHOWROOMS & RETAILERS'}
                </p>
                <h2 className="font-editorial text-2xl sm:text-3xl font-medium text-[#292722] dark:text-[#F8F7F3] mt-1">
                  {isRTL ? 'الأماكن والمعارض المعتمدة' : 'Inspiring Places & Showrooms'}
                </h2>
              </div>

              <div className="flex flex-wrap items-center gap-2.5">
                <select
                  value={placeLocationFilter}
                  onChange={(e) => setPlaceLocationFilter(e.target.value)}
                  aria-label="Filter places by location"
                  className="px-3.5 py-2 rounded-xl bg-white dark:bg-[#1C1A17] border border-[#E2DAD0] dark:border-[#2D2A26] text-xs font-semibold text-[#292722] dark:text-[#F8F7F3]"
                >
                  <option value="all">{isRTL ? 'كل المدن والمناطق' : 'All Locations'}</option>
                  {availableLocations.map((loc) => (
                    <option key={loc} value={loc}>
                      {loc}
                    </option>
                  ))}
                </select>

                <select
                  value={placeSort}
                  onChange={(e) => setPlaceSort(e.target.value as PlaceSort)}
                  aria-label="Sort places"
                  className="px-3.5 py-2 rounded-xl bg-white dark:bg-[#1C1A17] border border-[#E2DAD0] dark:border-[#2D2A26] text-xs font-semibold text-[#292722] dark:text-[#F8F7F3]"
                >
                  <option value="featured">{isRTL ? 'المميزة أولاً' : 'Sort: Featured'}</option>
                  <option value="most-products">{isRTL ? 'الأكبر تشكيلاً' : 'Sort: Most Pieces'}</option>
                  <option value="az">{isRTL ? 'أبجدياً (A–Z)' : 'Sort: A–Z'}</option>
                </select>

                {activeTab === 'discover' && (
                  <button
                    type="button"
                    onClick={() => setActiveTab('places')}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-[#B58A54] hover:underline px-2"
                  >
                    <span>{isRTL ? 'عرض الكل' : 'View All'}</span>
                    <Arrow className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            </div>

            {filteredPlaces.length === 0 ? (
              <div className="py-12 px-6 rounded-3xl bg-white dark:bg-[#1C1A17] border border-[#E8E2D9] dark:border-[#2D2A26] text-center">
                <p className="text-sm font-medium text-[#5C544B] dark:text-[#A89F92]">
                  {isRTL
                    ? 'لا توجد صالات عرض مطابقة للموقع أو البحث المحدد.'
                    : 'No showrooms match your selected location or search.'}
                </p>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {(activeTab === 'discover'
                    ? filteredPlaces.slice(0, 3)
                    : filteredPlaces.slice(0, placesVisible)
                  ).map((place) => (
                    <PlaceCard
                      key={place.id}
                      place={place}
                      productCount={getProductsByPlace(place.id).length}
                      associatedBrands={getBrandsForPlace(place)}
                    />
                  ))}
                </div>

                {activeTab === 'places' && filteredPlaces.length > placesVisible && (
                  <div className="flex justify-center pt-2">
                    <button
                      type="button"
                      onClick={() => setPlacesVisible((v) => v + PLACE_PAGE_STEP)}
                      className="px-6 py-3 rounded-xl bg-white dark:bg-[#1C1A17] border border-[#E2DAD0] dark:border-[#2D2A26] text-xs font-bold text-[#292722] dark:text-[#F8F7F3] hover:border-[#B58A54] transition-colors"
                    >
                      {isRTL ? 'عرض المزيد من المعارض' : 'Load More Showrooms'}
                    </button>
                  </div>
                )}
              </>
            )}
          </section>
        )}

        {/* SECTION C: ALL PRODUCTS CATALOG */}
        {(activeTab === 'discover' || activeTab === 'products') && (
          <section className="space-y-6">
            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4">
              <div>
                <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#8A8175]">
                  {isRTL ? 'الكتالوج الموحد' : 'CURATED FURNITURE CATALOG'}
                </p>
                <h2 className="font-editorial text-2xl sm:text-3xl font-medium text-[#292722] dark:text-[#F8F7F3] mt-1">
                  {isRTL ? 'اكتشف القطع وجرّبها في غرفتك' : 'Explore Pieces & Try in Your Room'}
                </h2>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setProductLayout('grid')}
                  aria-label="Grid view"
                  className={`p-2 rounded-xl border text-xs transition-colors ${
                    productLayout === 'grid'
                      ? 'bg-[#292722] text-white border-[#292722]'
                      : 'bg-white dark:bg-[#1C1A17] text-[#5C544B] border-[#E2DAD0] dark:border-[#2D2A26]'
                  }`}
                >
                  <LayoutGrid className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => setProductLayout('list')}
                  aria-label="List view"
                  className={`p-2 rounded-xl border text-xs transition-colors ${
                    productLayout === 'list'
                      ? 'bg-[#292722] text-white border-[#292722]'
                      : 'bg-white dark:bg-[#1C1A17] text-[#5C544B] border-[#E2DAD0] dark:border-[#2D2A26]'
                  }`}
                >
                  <ListIcon className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Category Pills + Filter Strip */}
            <div className="p-4 sm:p-5 rounded-3xl bg-white dark:bg-[#1C1A17] border border-[#E8E2D9] dark:border-[#2D2A26] space-y-4">
              <div className="flex flex-wrap items-center gap-2">
                {CATEGORIES.map((cat) => (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => setProductCategory(cat.id)}
                    className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all ${
                      productCategory === cat.id
                        ? 'bg-[#B58A54] text-white shadow-xs'
                        : 'bg-[#F8F7F3] dark:bg-[#25221E] text-[#5C544B] dark:text-[#BDB5AA] hover:border-[#B58A54]'
                    }`}
                  >
                    {isRTL ? cat.labelAr : cat.label}
                  </button>
                ))}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 pt-2 border-t border-[#F0EBE3] dark:border-[#2A2622]">
                <select
                  value={productBrandFilter}
                  onChange={(e) => setProductBrandFilter(e.target.value)}
                  aria-label="Filter products by brand"
                  className="px-3.5 py-2.5 rounded-xl bg-[#F8F7F3] dark:bg-[#141210] border border-[#E2DAD0] dark:border-[#2D2A26] text-xs font-medium text-[#292722] dark:text-[#F8F7F3]"
                >
                  <option value="all">{isRTL ? 'كل الماركات' : 'Brand: All Brands'}</option>
                  {publishedBrands.map((b) => (
                    <option key={b.id} value={b.id}>
                      {isRTL && b.nameAr ? b.nameAr : b.name}
                    </option>
                  ))}
                </select>

                <select
                  value={productPlaceFilter}
                  onChange={(e) => setProductPlaceFilter(e.target.value)}
                  aria-label="Filter products by store"
                  className="px-3.5 py-2.5 rounded-xl bg-[#F8F7F3] dark:bg-[#141210] border border-[#E2DAD0] dark:border-[#2D2A26] text-xs font-medium text-[#292722] dark:text-[#F8F7F3]"
                >
                  <option value="all">{isRTL ? 'كل صالات العرض' : 'Showroom: Any Location'}</option>
                  {publishedPlaces.map((p) => (
                    <option key={p.id} value={p.id}>
                      {isRTL && p.nameAr ? p.nameAr : p.name}
                    </option>
                  ))}
                </select>

                <select
                  value={productStyleFilter}
                  onChange={(e) => setProductStyleFilter(e.target.value)}
                  aria-label="Filter products by style"
                  className="px-3.5 py-2.5 rounded-xl bg-[#F8F7F3] dark:bg-[#141210] border border-[#E2DAD0] dark:border-[#2D2A26] text-xs font-medium text-[#292722] dark:text-[#F8F7F3]"
                >
                  <option value="all">{isRTL ? 'كل الأنماط التصميمية' : 'Style: All Aesthetics'}</option>
                  {STYLES.map((s) => (
                    <option key={s.id} value={s.id}>
                      {isRTL ? s.labelAr : s.label}
                    </option>
                  ))}
                </select>

                <select
                  value={productSort}
                  onChange={(e) => setProductSort(e.target.value as ProductSort)}
                  aria-label="Sort products"
                  className="px-3.5 py-2.5 rounded-xl bg-[#F8F7F3] dark:bg-[#141210] border border-[#E2DAD0] dark:border-[#2D2A26] text-xs font-medium text-[#292722] dark:text-[#F8F7F3]"
                >
                  <option value="featured">{isRTL ? 'الترتيب: المميزة' : 'Sort: Featured'}</option>
                  <option value="price-asc">{isRTL ? 'السعر: من الأقل للأعلى' : 'Price: Low to High'}</option>
                  <option value="price-desc">{isRTL ? 'السعر: من الأعلى للأقل' : 'Price: High to Low'}</option>
                  <option value="newest">{isRTL ? 'الأحدث وصولاً' : 'Sort: Newest'}</option>
                </select>
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-1">
                <div className="flex items-center gap-3 flex-1 max-w-md">
                  <SlidersHorizontal className="w-4 h-4 text-[#B58A54] shrink-0" />
                  <span className="text-xs font-medium text-[#5C544B] dark:text-[#A89F92] whitespace-nowrap">
                    {isRTL ? 'أقصى سعر:' : 'Max Price:'}{' '}
                    <strong className="text-[#292722] dark:text-[#F8F7F3]">{formatPrice(maxPrice)}</strong>
                  </span>
                  <input
                    type="range"
                    min={5000}
                    max={120000}
                    step={2500}
                    value={maxPrice}
                    onChange={(e) => setMaxPrice(Number(e.target.value))}
                    className="flex-1 accent-[#B58A54] cursor-pointer"
                  />
                </div>
                <span className="text-xs text-[#8A8175]">
                  {isRTL
                    ? `عرض ${Math.min(productsVisible, filteredProducts.length)} من ${filteredProducts.length} قطعة`
                    : `Showing ${Math.min(productsVisible, filteredProducts.length)} of ${filteredProducts.length} pieces`}
                </span>
              </div>
            </div>

            {filteredProducts.length === 0 ? (
              <div className="py-16 px-6 rounded-3xl bg-white dark:bg-[#1C1A17] border border-[#E8E2D9] dark:border-[#2D2A26] text-center space-y-3">
                <p className="font-editorial text-xl text-[#292722] dark:text-[#F8F7F3]">
                  {isRTL ? 'لم يتم العثور على قطع مطابقة' : 'No matching furniture pieces found'}
                </p>
                <p className="text-xs text-[#8A8175]">
                  {isRTL
                    ? 'جرّب توسيع نطاق السعر أو إعادة ضبط فلاتر البحث.'
                    : 'Try expanding your price range or resetting the active filters.'}
                </p>
                <button
                  type="button"
                  onClick={resetAllFilters}
                  className="px-5 py-2.5 rounded-xl bg-[#292722] text-white text-xs font-bold hover:bg-[#B58A54] transition-colors"
                >
                  {isRTL ? 'إعادة ضبط البحث' : 'Reset All Filters'}
                </button>
              </div>
            ) : (
              <>
                <div
                  className={
                    productLayout === 'list'
                      ? 'flex flex-col gap-5'
                      : 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'
                  }
                >
                  {filteredProducts.slice(0, productsVisible).map((product) => (
                    <MarketplaceProductCard
                      key={product.id}
                      product={product}
                      brand={getBrandById(product.brandId)}
                      places={getPlacesForProduct(product)}
                      layout={productLayout}
                    />
                  ))}
                </div>

                {filteredProducts.length > productsVisible && (
                  <div className="flex justify-center pt-4">
                    <button
                      type="button"
                      onClick={() => setProductsVisible((v) => v + PRODUCT_PAGE_STEP)}
                      className="px-8 py-3.5 rounded-2xl bg-[#292722] dark:bg-[#F8F7F3] text-white dark:text-[#1C1A17] text-xs font-bold hover:bg-[#B58A54] dark:hover:bg-[#B58A54] dark:hover:text-white transition-colors shadow-sm"
                    >
                      {isRTL
                        ? `عرض المزيد من القطع (${filteredProducts.length - productsVisible} متبقية)`
                        : `Load More Furniture (${filteredProducts.length - productsVisible} remaining)`}
                    </button>
                  </div>
                )}
              </>
            )}
          </section>
        )}
      </div>
    </div>
  );
};
