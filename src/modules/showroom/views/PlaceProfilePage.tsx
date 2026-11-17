import React, { useMemo, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useShowroomMarketplace } from '../context/ShowroomMarketplaceContext';
import { MarketplaceProductCard } from '../components/MarketplaceProductCard';
import { useLanguage } from '../../../context/LanguageContext';
import {
  ArrowLeft,
  ArrowRight,
  MapPin,
  Phone,
  Mail,
  Clock,
  Search,
  LayoutGrid,
  List as ListIcon,
  Layers,
  BadgeCheck,
} from 'lucide-react';

type PlaceProductSort = 'featured' | 'newest' | 'price-asc' | 'price-desc';

const FALLBACK_PLACE_COVER =
  'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1400&q=85';

export const PlaceProfilePage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const {
    getPlaceBySlug,
    getProductsByPlace,
    getBrandsForPlace,
    getBrandById,
    getPlacesForProduct,
  } = useShowroomMarketplace();
  const { isRTL } = useLanguage();

  const place = slug ? getPlaceBySlug(slug) : undefined;
  const BackArrow = isRTL ? ArrowRight : ArrowLeft;

  const [selectedBrandId, setSelectedBrandId] = useState<string>('all');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedCollection, setSelectedCollection] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<PlaceProductSort>('featured');
  const [layout, setLayout] = useState<'grid' | 'list'>('grid');

  const storeProducts = useMemo(
    () => (place ? getProductsByPlace(place.id) : []),
    [place, getProductsByPlace]
  );

  const associatedBrands = useMemo(
    () => (place ? getBrandsForPlace(place) : []),
    [place, getBrandsForPlace]
  );

  const categories = useMemo(
    () => Array.from(new Set(storeProducts.map((p) => p.categoryId))),
    [storeProducts]
  );

  const collections = useMemo(
    () => Array.from(new Set(storeProducts.map((p) => p.collection).filter(Boolean))),
    [storeProducts]
  );

  const filteredProducts = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    const list = storeProducts.filter((item) => {
      const brand = getBrandById(item.brandId);
      const matchBrand = selectedBrandId === 'all' || item.brandId === selectedBrandId;
      const matchCat = selectedCategory === 'all' || item.categoryId === selectedCategory;
      const matchCol = selectedCollection === 'all' || item.collection === selectedCollection;
      const matchQuery =
        !q ||
        item.name.toLowerCase().includes(q) ||
        item.nameAr.includes(q) ||
        (brand?.name.toLowerCase().includes(q) ?? false);
      return matchBrand && matchCat && matchCol && matchQuery;
    });

    return [...list].sort((a, b) => {
      if (sortBy === 'price-asc') return a.price - b.price;
      if (sortBy === 'price-desc') return b.price - a.price;
      if (sortBy === 'newest') return b.createdAt.localeCompare(a.createdAt);
      if (a.featured !== b.featured) return a.featured ? -1 : 1;
      return 0;
    });
  }, [
    storeProducts,
    selectedBrandId,
    selectedCategory,
    selectedCollection,
    searchQuery,
    sortBy,
    getBrandById,
  ]);

  if (!place) {
    return (
      <div
        dir={isRTL ? 'rtl' : 'ltr'}
        className="min-h-screen bg-[#F8F7F3] dark:bg-[#121110] pt-36 pb-24 px-4"
      >
        <div className="max-w-xl mx-auto p-10 rounded-3xl bg-white dark:bg-[#1C1A17] border border-[#E8E2D9] dark:border-[#2D2A26] text-center space-y-4">
          <h1 className="font-editorial text-2xl text-[#292722] dark:text-[#F8F7F3]">
            {isRTL ? 'صالة العرض غير موجودة' : 'Showroom Not Found'}
          </h1>
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

  const displayName = isRTL && place.nameAr ? place.nameAr : place.name;
  const displayDesc = isRTL && place.descriptionAr ? place.descriptionAr : place.description;
  const displayAddress = isRTL && place.addressAr ? place.addressAr : place.address;
  const displayLocation = isRTL && place.locationAr ? place.locationAr : place.location;
  const displayHours = isRTL && place.openingHoursAr ? place.openingHoursAr : place.openingHours;

  return (
    <div
      dir={isRTL ? 'rtl' : 'ltr'}
      className="min-h-screen bg-[#F8F7F3] dark:bg-[#121110] pt-20 pb-24 transition-colors duration-300"
    >
      {/* 1. SHOWROOM HEADER */}
      <section className="relative bg-white dark:bg-[#161412] border-b border-[#E8E2D9] dark:border-[#26231F]">
        <div className="relative h-64 sm:h-80 w-full overflow-hidden bg-[#1C1A17]">
          <img
            src={place.coverImage || FALLBACK_PLACE_COVER}
            alt={displayName}
            className="w-full h-full object-cover object-center opacity-85"
            onError={(e) => {
              const t = e.target as HTMLImageElement;
              if (t.src !== FALLBACK_PLACE_COVER) t.src = FALLBACK_PLACE_COVER;
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#121110] via-[#121110]/40 to-black/25" />

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full relative">
            <Link
              to="/showroom"
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/90 text-[#1C1A17] text-xs font-bold backdrop-blur-xs hover:bg-[#B58A54] hover:text-white transition-colors absolute top-6 ${
                isRTL ? 'right-4 sm:right-6 lg:right-8' : 'left-4 sm:left-6 lg:left-8'
              }`}
            >
              <BackArrow className="w-3.5 h-3.5" />
              <span>{isRTL ? 'العودة للسوق' : 'Back to Showroom'}</span>
            </Link>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Store Info */}
            <div className="lg:col-span-8 flex flex-col sm:flex-row gap-5">
              <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-3xl bg-[#F8F7F3] dark:bg-[#1C1A17] border-2 border-white dark:border-[#2D2A26] shadow-lg overflow-hidden shrink-0 -mt-16 sm:-mt-20 relative z-10">
                <img
                  src={place.logo}
                  alt={displayName}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="space-y-3">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="px-3 py-1 rounded-full bg-[#B58A54]/12 text-[#9C7240] dark:text-[#D1A971] text-[11px] font-bold">
                    {displayLocation}
                  </span>
                  <span className="inline-flex items-center gap-1 text-xs font-semibold text-[#8A8175]">
                    <Layers className="w-3.5 h-3.5 text-[#B58A54]" />
                    {storeProducts.length} {isRTL ? 'قطعة معروضة' : 'Pieces Displayed'}
                  </span>
                </div>

                <h1 className="font-editorial text-3xl sm:text-4xl font-medium text-[#292722] dark:text-[#F8F7F3]">
                  {displayName}
                </h1>

                <p className="text-sm text-[#5C544B] dark:text-[#A89F92] leading-relaxed max-w-2xl">
                  {displayDesc}
                </p>

                {/* Associated Brands inside this multi-brand showroom */}
                {associatedBrands.length > 0 && (
                  <div className="pt-2 space-y-2">
                    <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#8A8175]">
                      {isRTL
                        ? 'العلامات التجارية المتوفرة في هذا الفرع'
                        : 'FEATURED BRANDS AT THIS SHOWROOM'}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {associatedBrands.map((brand) => (
                        <Link
                          key={brand.id}
                          to={`/showroom/brands/${brand.slug}`}
                          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-[#F8F7F3] dark:bg-[#1C1A17] border border-[#E2DAD0] dark:border-[#2D2A26] text-xs font-semibold text-[#292722] dark:text-[#F8F7F3] hover:border-[#B58A54] transition-colors"
                        >
                          <img
                            src={brand.logo}
                            alt={brand.name}
                            className="w-4 h-4 rounded-full object-cover"
                          />
                          <span>{isRTL && brand.nameAr ? brand.nameAr : brand.name}</span>
                          {brand.verified && <BadgeCheck className="w-3.5 h-3.5 text-emerald-500" />}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Store Address & Contact Card */}
            <div className="lg:col-span-4 p-5 rounded-3xl bg-[#F8F7F3] dark:bg-[#1C1A17] border border-[#E8E2D9] dark:border-[#2D2A26] space-y-3.5">
              <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#B58A54]">
                {isRTL ? 'تفاصيل الزيارة والتواصل' : 'VISIT & CONTACT'}
              </p>
              <div className="space-y-2.5 text-xs text-[#292722] dark:text-[#EAE6DF]">
                <div className="flex items-start gap-2.5">
                  <MapPin className="w-4 h-4 text-[#B58A54] shrink-0 mt-0.5" />
                  <span>{displayAddress}</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <Clock className="w-4 h-4 text-[#B58A54] shrink-0" />
                  <span>{displayHours}</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <Phone className="w-4 h-4 text-[#B58A54] shrink-0" />
                  <a href={`tel:${place.contactInfo.phone}`} className="hover:underline">
                    {place.contactInfo.phone}
                  </a>
                </div>
                <div className="flex items-center gap-2.5">
                  <Mail className="w-4 h-4 text-[#B58A54] shrink-0" />
                  <a href={`mailto:${place.contactInfo.email}`} className="hover:underline">
                    {place.contactInfo.email}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. STORE INVENTORY & FILTERS */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 space-y-8">
        {collections.length > 0 && (
          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={() => setSelectedCollection('all')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                selectedCollection === 'all'
                  ? 'bg-[#292722] dark:bg-[#F8F7F3] text-white dark:text-[#1C1A17]'
                  : 'bg-white dark:bg-[#1C1A17] border border-[#E2DAD0] dark:border-[#2D2A26] text-[#5C544B] dark:text-[#BDB5AA]'
              }`}
            >
              {isRTL ? 'جميع تشكيلات المعرض' : 'All Store Collections'}
            </button>
            {collections.map((col) => (
              <button
                key={col}
                type="button"
                onClick={() => setSelectedCollection(col)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                  selectedCollection === col
                    ? 'bg-[#B58A54] text-white'
                    : 'bg-white dark:bg-[#1C1A17] border border-[#E2DAD0] dark:border-[#2D2A26] text-[#5C544B] dark:text-[#BDB5AA]'
                }`}
              >
                {col}
              </button>
            ))}
          </div>
        )}

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
                placeholder={isRTL ? 'ابحث داخل هذا المعرض...' : 'Search pieces in this store...'}
                className={`w-full py-2 ${
                  isRTL ? 'pr-9 pl-3' : 'pl-9 pr-3'
                } rounded-xl bg-[#F8F7F3] dark:bg-[#141210] border border-[#E2DAD0] dark:border-[#2D2A26] text-xs`}
              />
            </div>

            <select
              value={selectedBrandId}
              onChange={(e) => setSelectedBrandId(e.target.value)}
              aria-label="Filter store products by brand"
              className="px-3.5 py-2 rounded-xl bg-[#F8F7F3] dark:bg-[#141210] border border-[#E2DAD0] dark:border-[#2D2A26] text-xs font-medium"
            >
              <option value="all">{isRTL ? 'كل الماركات بالمعرض' : 'All Brands in Store'}</option>
              {associatedBrands.map((b) => (
                <option key={b.id} value={b.id}>
                  {isRTL && b.nameAr ? b.nameAr : b.name}
                </option>
              ))}
            </select>

            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              aria-label="Filter store products by category"
              className="px-3.5 py-2 rounded-xl bg-[#F8F7F3] dark:bg-[#141210] border border-[#E2DAD0] dark:border-[#2D2A26] text-xs font-medium"
            >
              <option value="all">{isRTL ? 'كل الفئات' : 'All Categories'}</option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat.toUpperCase()}
                </option>
              ))}
            </select>
          </div>

          <div className="flex items-center gap-2.5">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as PlaceProductSort)}
              aria-label="Sort store products"
              className="px-3.5 py-2 rounded-xl bg-[#F8F7F3] dark:bg-[#141210] border border-[#E2DAD0] dark:border-[#2D2A26] text-xs font-semibold"
            >
              <option value="featured">{isRTL ? 'المميزة' : 'Sort: Featured'}</option>
              <option value="newest">{isRTL ? 'الأحدث' : 'Sort: Newest'}</option>
              <option value="price-asc">{isRTL ? 'السعر: الأقل' : 'Price: Low–High'}</option>
              <option value="price-desc">{isRTL ? 'السعر: الأعلى' : 'Price: High–Low'}</option>
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

        {filteredProducts.length === 0 ? (
          <div className="py-16 px-6 rounded-3xl bg-white dark:bg-[#1C1A17] border border-[#E8E2D9] dark:border-[#2D2A26] text-center space-y-3">
            <p className="font-editorial text-xl text-[#292722] dark:text-[#F8F7F3]">
              {isRTL ? 'لا توجد قطع مطابقة داخل هذا الفرع' : 'No matching pieces in this showroom'}
            </p>
            <button
              type="button"
              onClick={() => {
                setSelectedBrandId('all');
                setSelectedCategory('all');
                setSelectedCollection('all');
                setSearchQuery('');
              }}
              className="px-5 py-2.5 rounded-xl bg-[#292722] text-white text-xs font-bold hover:bg-[#B58A54]"
            >
              {isRTL ? 'عرض كل المعروضات' : 'Reset Filters'}
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
                brand={getBrandById(product.brandId)}
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
