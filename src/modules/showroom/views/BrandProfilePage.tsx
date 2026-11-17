import React, { useMemo, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useShowroomMarketplace } from '../context/ShowroomMarketplaceContext';
import { MarketplaceProductCard } from '../components/MarketplaceProductCard';
import { useLanguage } from '../../../context/LanguageContext';
import {
  ArrowLeft,
  ArrowRight,
  BadgeCheck,
  MapPin,
  Search,
  LayoutGrid,
  List as ListIcon,
  Layers,
  Globe,
} from 'lucide-react';

type BrandProductSort = 'featured' | 'newest' | 'price-asc' | 'price-desc';

const FALLBACK_COVER =
  'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1400&q=85';

export const BrandProfilePage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const {
    getBrandBySlug,
    getProductsByBrand,
    getPlacesForBrand,
    getPlacesForProduct,
  } = useShowroomMarketplace();
  const { isRTL, formatPrice } = useLanguage();

  const brand = slug ? getBrandBySlug(slug) : undefined;
  const BackArrow = isRTL ? ArrowRight : ArrowLeft;

  const [selectedCollection, setSelectedCollection] = useState<string>('all');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [maxPrice, setMaxPrice] = useState<number>(120000);
  const [sortBy, setSortBy] = useState<BrandProductSort>('featured');
  const [layout, setLayout] = useState<'grid' | 'list'>('grid');

  const brandProducts = useMemo(
    () => (brand ? getProductsByBrand(brand.id) : []),
    [brand, getProductsByBrand]
  );

  const brandShowrooms = useMemo(
    () => (brand ? getPlacesForBrand(brand.id) : []),
    [brand, getPlacesForBrand]
  );

  const distinctCategories = useMemo(
    () => Array.from(new Set(brandProducts.map((p) => p.categoryId))),
    [brandProducts]
  );

  const distinctCollections = useMemo(() => {
    const fromBrand = brand?.collections || [];
    const fromProducts = brandProducts.map((p) => p.collection).filter(Boolean);
    return Array.from(new Set([...fromBrand, ...fromProducts]));
  }, [brand, brandProducts]);

  const filteredProducts = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    const list = brandProducts.filter((item) => {
      const matchCol =
        selectedCollection === 'all' || item.collection === selectedCollection;
      const matchCat =
        selectedCategory === 'all' || item.categoryId === selectedCategory;
      const matchPrice = item.price <= maxPrice;
      const matchQuery =
        !q ||
        item.name.toLowerCase().includes(q) ||
        item.nameAr.includes(q) ||
        item.materials.toLowerCase().includes(q) ||
        item.sku.toLowerCase().includes(q);
      return matchCol && matchCat && matchPrice && matchQuery;
    });

    return [...list].sort((a, b) => {
      if (sortBy === 'price-asc') return a.price - b.price;
      if (sortBy === 'price-desc') return b.price - a.price;
      if (sortBy === 'newest') return b.createdAt.localeCompare(a.createdAt);
      if (a.featured !== b.featured) return a.featured ? -1 : 1;
      return 0;
    });
  }, [
    brandProducts,
    selectedCollection,
    selectedCategory,
    maxPrice,
    searchQuery,
    sortBy,
  ]);

  if (!brand) {
    return (
      <div
        dir={isRTL ? 'rtl' : 'ltr'}
        className="min-h-screen bg-[#F8F7F3] dark:bg-[#121110] pt-36 pb-24 px-4"
      >
        <div className="max-w-xl mx-auto p-10 rounded-3xl bg-white dark:bg-[#1C1A17] border border-[#E8E2D9] dark:border-[#2D2A26] text-center space-y-4">
          <h1 className="font-editorial text-2xl text-[#292722] dark:text-[#F8F7F3]">
            {isRTL ? 'العلامة التجارية غير موجودة' : 'Brand Not Found'}
          </h1>
          <p className="text-sm text-[#8A8175]">
            {isRTL
              ? 'قد يكون الرابط غير صحيح أو تمت أرشفة العلامة التجارية.'
              : 'This furniture house could not be found or has been archived.'}
          </p>
          <Link
            to="/showroom"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#292722] text-white text-xs font-bold hover:bg-[#B58A54] transition-colors"
          >
            <BackArrow className="w-4 h-4" />
            <span>{isRTL ? 'العودة إلى المعرض' : 'Back to Showroom'}</span>
          </Link>
        </div>
      </div>
    );
  }

  const displayName = isRTL && brand.nameAr ? brand.nameAr : brand.name;
  const displayDesc = isRTL && brand.descriptionAr ? brand.descriptionAr : brand.description;

  return (
    <div
      dir={isRTL ? 'rtl' : 'ltr'}
      className="min-h-screen bg-[#F8F7F3] dark:bg-[#121110] pt-20 pb-24 transition-colors duration-300"
    >
      {/* 1. BRAND COVER & HEADER */}
      <section className="relative bg-white dark:bg-[#161412] border-b border-[#E8E2D9] dark:border-[#26231F]">
        <div className="relative h-64 sm:h-80 w-full overflow-hidden bg-[#1C1A17]">
          <img
            src={brand.coverImage || FALLBACK_COVER}
            alt={displayName}
            className="w-full h-full object-cover object-center opacity-85"
            onError={(e) => {
              const t = e.target as HTMLImageElement;
              if (t.src !== FALLBACK_COVER) t.src = FALLBACK_COVER;
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#121110] via-[#121110]/35 to-black/25" />

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full relative">
            <Link
              to="/showroom"
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/90 text-[#1C1A17] text-xs font-bold backdrop-blur-xs hover:bg-[#B58A54] hover:text-white transition-colors absolute top-6 ${
                isRTL ? 'right-4 sm:right-6 lg:right-8' : 'left-4 sm:left-6 lg:left-8'
              }`}
            >
              <BackArrow className="w-3.5 h-3.5" />
              <span>{isRTL ? 'كل الماركات والمعارض' : 'All Brands & Places'}</span>
            </Link>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div className="flex flex-col sm:flex-row sm:items-center gap-5">
              <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-3xl bg-[#F8F7F3] dark:bg-[#1C1A17] border-2 border-white dark:border-[#2D2A26] shadow-lg overflow-hidden shrink-0 -mt-16 sm:-mt-20 relative z-10">
                <img
                  src={brand.logo}
                  alt={displayName}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="space-y-2">
                <div className="flex flex-wrap items-center gap-2.5">
                  <h1 className="font-editorial text-3xl sm:text-4xl font-medium text-[#292722] dark:text-[#F8F7F3]">
                    {displayName}
                  </h1>
                  {brand.verified && (
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 text-[11px] font-bold">
                      <BadgeCheck className="w-3.5 h-3.5" />
                      <span>{isRTL ? 'علامة موثقة' : 'Verified Atelier'}</span>
                    </span>
                  )}
                </div>

                <p className="text-sm text-[#5C544B] dark:text-[#A89F92] max-w-2xl leading-relaxed">
                  {displayDesc}
                </p>

                <div className="flex flex-wrap items-center gap-4 text-xs text-[#8A8175] pt-1">
                  <span className="inline-flex items-center gap-1.5 font-semibold text-[#292722] dark:text-[#E5DFD5]">
                    <Globe className="w-3.5 h-3.5 text-[#B58A54]" />
                    {brand.origin}
                  </span>
                  <span className="inline-flex items-center gap-1.5 font-semibold text-[#292722] dark:text-[#E5DFD5]">
                    <Layers className="w-3.5 h-3.5 text-[#B58A54]" />
                    {brandProducts.length} {isRTL ? 'قطعة متاحة' : 'Catalog Pieces'}
                  </span>
                  <span className="inline-flex items-center gap-1.5 font-semibold text-[#292722] dark:text-[#E5DFD5]">
                    <MapPin className="w-3.5 h-3.5 text-[#B58A54]" />
                    {brandShowrooms.length}{' '}
                    {isRTL ? 'معارض معتمدة' : 'Physical Showrooms'}
                  </span>
                </div>
              </div>
            </div>

            {/* Available Physical Showrooms Pills */}
            {brandShowrooms.length > 0 && (
              <div className="lg:max-w-sm w-full p-4 rounded-2xl bg-[#F8F7F3] dark:bg-[#1C1A17] border border-[#E8E2D9] dark:border-[#2D2A26] space-y-2.5">
                <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#8A8175]">
                  {isRTL ? 'متوفرة في صالات العرض' : 'AVAILABLE AT SHOWROOMS'}
                </p>
                <div className="flex flex-wrap gap-2">
                  {brandShowrooms.map((place) => (
                    <Link
                      key={place.id}
                      to={`/showroom/places/${place.slug}`}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white dark:bg-[#25221E] border border-[#E2DAD0] dark:border-[#34302A] text-xs font-semibold text-[#292722] dark:text-[#F8F7F3] hover:border-[#B58A54] transition-colors"
                    >
                      <MapPin className="w-3 h-3 text-[#B58A54]" />
                      <span>{isRTL && place.nameAr ? place.nameAr : place.name}</span>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* 2. BRAND COLLECTIONS & CATALOG */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 space-y-8">
        {/* Collections Strip */}
        {distinctCollections.length > 0 && (
          <div className="space-y-3">
            <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-[#8A8175]">
              {isRTL ? 'التشكيلات المميزة' : 'CURATED COLLECTIONS'}
            </h2>
            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => setSelectedCollection('all')}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                  selectedCollection === 'all'
                    ? 'bg-[#292722] dark:bg-[#F8F7F3] text-white dark:text-[#1C1A17]'
                    : 'bg-white dark:bg-[#1C1A17] border border-[#E2DAD0] dark:border-[#2D2A26] text-[#5C544B] dark:text-[#BDB5AA] hover:border-[#B58A54]'
                }`}
              >
                {isRTL ? 'كل التشكيلات' : 'All Collections'}
              </button>
              {distinctCollections.map((col) => (
                <button
                  key={col}
                  type="button"
                  onClick={() => setSelectedCollection(col)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                    selectedCollection === col
                      ? 'bg-[#B58A54] text-white'
                      : 'bg-white dark:bg-[#1C1A17] border border-[#E2DAD0] dark:border-[#2D2A26] text-[#5C544B] dark:text-[#BDB5AA] hover:border-[#B58A54]'
                  }`}
                >
                  {col}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Filters & Layout Toolbar */}
        <div className="p-4 sm:p-5 rounded-3xl bg-white dark:bg-[#1C1A17] border border-[#E8E2D9] dark:border-[#2D2A26] flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-3 flex-1">
            <div className="relative flex-1 min-w-[200px] max-w-xs">
              <Search
                className={`w-4 h-4 text-[#8A8175] absolute ${
                  isRTL ? 'right-3.5' : 'left-3.5'
                } top-1/2 -translate-y-1/2`}
              />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={isRTL ? 'ابحث في منتجات الماركة...' : 'Search this brand catalog...'}
                className={`w-full py-2 ${
                  isRTL ? 'pr-9 pl-3' : 'pl-9 pr-3'
                } rounded-xl bg-[#F8F7F3] dark:bg-[#141210] border border-[#E2DAD0] dark:border-[#2D2A26] text-xs`}
              />
            </div>

            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              aria-label="Filter brand products by category"
              className="px-3.5 py-2 rounded-xl bg-[#F8F7F3] dark:bg-[#141210] border border-[#E2DAD0] dark:border-[#2D2A26] text-xs font-medium"
            >
              <option value="all">{isRTL ? 'كل الفئات' : 'All Categories'}</option>
              {distinctCategories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat.toUpperCase()}
                </option>
              ))}
            </select>

            <div className="flex items-center gap-2 text-xs text-[#5C544B] dark:text-[#A89F92]">
              <span>{isRTL ? 'السعر حتى:' : 'Up to'}</span>
              <strong>{formatPrice(maxPrice)}</strong>
              <input
                type="range"
                min={5000}
                max={120000}
                step={2500}
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                className="w-24 accent-[#B58A54]"
              />
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as BrandProductSort)}
              aria-label="Sort brand products"
              className="px-3.5 py-2 rounded-xl bg-[#F8F7F3] dark:bg-[#141210] border border-[#E2DAD0] dark:border-[#2D2A26] text-xs font-semibold"
            >
              <option value="featured">{isRTL ? 'المميزة' : 'Sort: Featured'}</option>
              <option value="newest">{isRTL ? 'الأحدث' : 'Sort: Newest'}</option>
              <option value="price-asc">{isRTL ? 'السعر: الأقل أولاً' : 'Price: Low–High'}</option>
              <option value="price-desc">{isRTL ? 'السعر: الأعلى أولاً' : 'Price: High–Low'}</option>
            </select>

            <button
              type="button"
              onClick={() => setLayout('grid')}
              aria-label="Grid view"
              className={`p-2 rounded-xl border ${
                layout === 'grid'
                  ? 'bg-[#292722] text-white border-[#292722]'
                  : 'border-[#E2DAD0] dark:border-[#2D2A26] text-[#5C544B]'
              }`}
            >
              <LayoutGrid className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() => setLayout('list')}
              aria-label="List view"
              className={`p-2 rounded-xl border ${
                layout === 'list'
                  ? 'bg-[#292722] text-white border-[#292722]'
                  : 'border-[#E2DAD0] dark:border-[#2D2A26] text-[#5C544B]'
              }`}
            >
              <ListIcon className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Catalog Grid / List */}
        {filteredProducts.length === 0 ? (
          <div className="py-16 px-6 rounded-3xl bg-white dark:bg-[#1C1A17] border border-[#E8E2D9] dark:border-[#2D2A26] text-center space-y-3">
            <p className="font-editorial text-xl text-[#292722] dark:text-[#F8F7F3]">
              {isRTL ? 'لا توجد قطع في هذه التشكيلة حالياً' : 'No matching pieces in this collection'}
            </p>
            <button
              type="button"
              onClick={() => {
                setSelectedCollection('all');
                setSelectedCategory('all');
                setSearchQuery('');
                setMaxPrice(120000);
              }}
              className="px-5 py-2.5 rounded-xl bg-[#292722] text-white text-xs font-bold hover:bg-[#B58A54] transition-colors"
            >
              {isRTL ? 'عرض جميع قطع الماركة' : 'Show All Brand Pieces'}
            </button>
          </div>
        ) : (
          <div
            className={
              layout === 'list'
                ? 'flex flex-col gap-5'
                : 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'
            }
          >
            {filteredProducts.map((product) => (
              <MarketplaceProductCard
                key={product.id}
                product={product}
                brand={brand}
                places={getPlacesForProduct(product)}
                layout={layout}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
