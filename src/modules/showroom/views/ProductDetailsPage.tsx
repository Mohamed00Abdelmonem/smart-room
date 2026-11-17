import React, { useMemo, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useShowroomMarketplace } from '../context/ShowroomMarketplaceContext';
import { toStudioFurnitureProduct } from '../types';
import { MarketplaceProductCard } from '../components/MarketplaceProductCard';
import { useLanguage } from '../../../context/LanguageContext';
import { useVisualizer } from '../../../context/VisualizerContext';
import { useCart } from '../../../context/CartContext';
import {
  ArrowLeft,
  ArrowRight,
  Sparkles,
  ShoppingBag,
  Ruler,
  Layers,
  MapPin,
  BadgeCheck,
  Palette,
  Box,
} from 'lucide-react';

const FALLBACK_IMG =
  'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=1200&q=85';

export const ProductDetailsPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const {
    getProductBySlug,
    getBrandById,
    getPlacesForProduct,
    getProductsByBrand,
  } = useShowroomMarketplace();
  const { isRTL, formatPrice } = useLanguage();
  const { openExperienceA } = useVisualizer();
  const { addToCart } = useCart();

  const product = slug ? getProductBySlug(slug) : undefined;
  const brand = product ? getBrandById(product.brandId) : undefined;
  const availablePlaces = useMemo(
    () => (product ? getPlacesForProduct(product) : []),
    [product, getPlacesForProduct]
  );

  const relatedProducts = useMemo(() => {
    if (!brand || !product) return [];
    return getProductsByBrand(brand.id)
      .filter((p) => p.id !== product.id)
      .slice(0, 3);
  }, [brand, product, getProductsByBrand]);

  const [selectedImageIdx, setSelectedImageIdx] = useState(0);
  const [selectedColorIdx, setSelectedColorIdx] = useState(0);

  const BackArrow = isRTL ? ArrowRight : ArrowLeft;

  if (!product) {
    return (
      <div
        dir={isRTL ? 'rtl' : 'ltr'}
        className="min-h-screen bg-[#F8F7F3] dark:bg-[#121110] pt-36 pb-24 px-4"
      >
        <div className="max-w-xl mx-auto p-10 rounded-3xl bg-white dark:bg-[#1C1A17] border border-[#E8E2D9] dark:border-[#2D2A26] text-center space-y-4">
          <h1 className="font-editorial text-2xl text-[#292722] dark:text-[#F8F7F3]">
            {isRTL ? 'القطعة غير متوفرة' : 'Product Not Found'}
          </h1>
          <Link
            to="/showroom"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#292722] text-white text-xs font-bold hover:bg-[#B58A54]"
          >
            <BackArrow className="w-4 h-4" />
            <span>{isRTL ? 'العودة إلى المعرض' : 'Back to Showroom'}</span>
          </Link>
        </div>
      </div>
    );
  }

  const displayName = isRTL && product.nameAr ? product.nameAr : product.name;
  const displayDesc = isRTL && product.descriptionAr ? product.descriptionAr : product.description;
  const displayMaterials = isRTL && product.materialsAr ? product.materialsAr : product.materials;
  const displayCategory = isRTL && product.categoryLabelAr ? product.categoryLabelAr : product.categoryLabel;
  const displayBrand = brand ? (isRTL && brand.nameAr ? brand.nameAr : brand.name) : '';
  const colorOptions = isRTL && product.colorsAr.length > 0 ? product.colorsAr : product.colors;

  const images = product.images.length > 0 ? product.images : [FALLBACK_IMG];
  const activeImage = images[selectedImageIdx] || images[0] || FALLBACK_IMG;
  const studioProduct = toStudioFurnitureProduct(product, brand?.name);

  return (
    <div
      dir={isRTL ? 'rtl' : 'ltr'}
      className="min-h-screen bg-[#F8F7F3] dark:bg-[#121110] pt-28 pb-24 transition-colors duration-300"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Breadcrumb */}
        <nav className="flex flex-wrap items-center gap-2 text-xs text-[#8A8175]">
          <Link to="/showroom" className="hover:text-[#B58A54] font-semibold">
            {isRTL ? 'المعرض الرئيسي' : 'Showroom'}
          </Link>
          <span>/</span>
          {brand && (
            <>
              <Link to={`/showroom/brands/${brand.slug}`} className="hover:text-[#B58A54] font-semibold">
                {displayBrand}
              </Link>
              <span>/</span>
            </>
          )}
          <span className="text-[#292722] dark:text-[#F8F7F3] font-bold">{displayName}</span>
        </nav>

        {/* Product Detail Two-Column Showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          {/* Left: Gallery */}
          <div className="lg:col-span-7 space-y-4">
            <div className="relative aspect-[4/3] rounded-3xl overflow-hidden bg-white dark:bg-[#1C1A17] border border-[#E8E2D9] dark:border-[#2D2A26] shadow-sm">
              <img
                src={activeImage}
                alt={displayName}
                className="w-full h-full object-cover"
                onError={(e) => {
                  const t = e.target as HTMLImageElement;
                  if (t.src !== FALLBACK_IMG) t.src = FALLBACK_IMG;
                }}
              />
              <span
                className={`absolute top-4 ${
                  isRTL ? 'right-4' : 'left-4'
                } px-3 py-1 rounded-full bg-white/92 dark:bg-black/75 text-[11px] font-bold text-[#292722] dark:text-white backdrop-blur-xs`}
              >
                {displayCategory} · {product.sku}
              </span>
            </div>

            {images.length > 1 && (
              <div className="flex items-center gap-3 overflow-x-auto pb-1">
                {images.map((img, idx) => (
                  <button
                    key={`${img}-${idx}`}
                    type="button"
                    onClick={() => setSelectedImageIdx(idx)}
                    className={`w-24 h-20 rounded-2xl overflow-hidden border-2 shrink-0 transition-all ${
                      idx === selectedImageIdx
                        ? 'border-[#B58A54] shadow-sm'
                        : 'border-transparent opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img
                      src={img}
                      alt={`${displayName} view ${idx + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right: Specifications & Try in Room CTA */}
          <div className="lg:col-span-5 space-y-6">
            {brand && (
              <Link
                to={`/showroom/brands/${brand.slug}`}
                className="inline-flex items-center gap-2.5 px-3.5 py-2 rounded-2xl bg-white dark:bg-[#1C1A17] border border-[#E8E2D9] dark:border-[#2D2A26] hover:border-[#B58A54] transition-colors"
              >
                <img
                  src={brand.logo}
                  alt={displayBrand}
                  className="w-6 h-6 rounded-full object-cover"
                />
                <span className="text-xs font-bold text-[#292722] dark:text-[#F8F7F3]">
                  {displayBrand}
                </span>
                {brand.verified && <BadgeCheck className="w-4 h-4 text-emerald-500" />}
              </Link>
            )}

            <div className="space-y-2">
              <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#B58A54]">
                {product.collection}
              </p>
              <h1 className="font-editorial text-3xl sm:text-4xl font-medium text-[#292722] dark:text-[#F8F7F3] leading-tight">
                {displayName}
              </h1>
              <div className="flex items-baseline gap-3 pt-1">
                <span className="text-2xl sm:text-3xl font-bold text-[#292722] dark:text-[#F8F7F3]">
                  {formatPrice(product.price)}
                </span>
                {product.originalPrice && product.originalPrice > product.price && (
                  <span className="text-sm text-[#8A8175] line-through">
                    {formatPrice(product.originalPrice)}
                  </span>
                )}
              </div>
            </div>

            <p className="text-sm text-[#5C544B] dark:text-[#A89F92] leading-relaxed">
              {displayDesc}
            </p>

            {/* Primary VESTAIA AI Studio CTA */}
            <div className="p-4 rounded-3xl bg-[#1C1A17] text-white space-y-3 border border-[#2D2A26]">
              <button
                type="button"
                onClick={() => openExperienceA(studioProduct)}
                className="w-full py-3.5 px-5 rounded-2xl bg-[#B58A54] hover:bg-[#9C7240] text-white font-bold text-sm flex items-center justify-center gap-2 transition-colors shadow-md"
              >
                <Sparkles className="w-4 h-4" />
                <span>{isRTL ? 'جرّب القطعة في غرفتك بالـ AI' : 'TRY IN YOUR ROOM'}</span>
              </button>

              <div className="flex items-center justify-between gap-2 text-[11px] text-[#BDB5AA]">
                <span>
                  {isRTL
                    ? 'معاينة فورية مع الحفاظ على الأبعاد الفعلية للقطعة.'
                    : 'Real-scale spatial visualization preserving exact dimensions.'}
                </span>
                <Link
                  to="/visualizer"
                  className="text-[#E6CFAF] font-semibold hover:underline shrink-0"
                >
                  {isRTL ? 'الاستوديو الكامل' : 'Full AI Studio'}
                </Link>
              </div>
            </div>

            {/* Add to Bag Button */}
            <button
              type="button"
              onClick={() => addToCart(studioProduct)}
              className="w-full py-3.5 px-5 rounded-2xl bg-white dark:bg-[#1C1A17] border border-[#292722] dark:border-[#F8F7F3] text-[#292722] dark:text-[#F8F7F3] font-bold text-sm flex items-center justify-center gap-2 hover:bg-[#292722] hover:text-white dark:hover:bg-[#F8F7F3] dark:hover:text-[#1C1A17] transition-colors"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>{isRTL ? 'أضف إلى حقيبة التسوق' : 'Add to Shopping Bag'}</span>
            </button>

            {/* Color / Finish Swatches */}
            {colorOptions.length > 0 && (
              <div className="space-y-2.5 pt-2">
                <div className="flex items-center gap-2 text-xs font-bold text-[#292722] dark:text-[#F8F7F3]">
                  <Palette className="w-4 h-4 text-[#B58A54]" />
                  <span>{isRTL ? 'الألوان والتشطيبات المتاحة:' : 'Colors & Finishes:'}</span>
                  <span className="text-[#8A8175] font-normal">
                    {colorOptions[selectedColorIdx] || colorOptions[0]}
                  </span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {colorOptions.map((col, idx) => (
                    <button
                      key={col}
                      type="button"
                      onClick={() => setSelectedColorIdx(idx)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all ${
                        idx === selectedColorIdx
                          ? 'border-[#B58A54] bg-[#B58A54]/10 text-[#9C7240] dark:text-[#D1A971]'
                          : 'border-[#E2DAD0] dark:border-[#2D2A26] text-[#5C544B] dark:text-[#A89F92]'
                      }`}
                    >
                      {col}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Technical Specs Box */}
            <div className="p-5 rounded-3xl bg-white dark:bg-[#1C1A17] border border-[#E8E2D9] dark:border-[#2D2A26] space-y-3.5 text-xs">
              <div className="flex items-start gap-3">
                <Ruler className="w-4 h-4 text-[#B58A54] shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold text-[#292722] dark:text-[#F8F7F3]">
                    {isRTL ? 'الأبعاد الدقيقة' : 'Exact Dimensions'}
                  </p>
                  <p className="text-[#5C544B] dark:text-[#A89F92] mt-0.5">
                    {product.dimensions.widthCm}W × {product.dimensions.depthCm}D ×{' '}
                    {product.dimensions.heightCm}H cm
                    {product.dimensions.seatHeightCm
                      ? ` · ${isRTL ? 'ارتفاع الجلوس' : 'Seat'} ${product.dimensions.seatHeightCm} cm`
                      : ''}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 pt-2 border-t border-[#F0EBE3] dark:border-[#2A2622]">
                <Layers className="w-4 h-4 text-[#B58A54] shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold text-[#292722] dark:text-[#F8F7F3]">
                    {isRTL ? 'الخامات والتصنيع' : 'Materials & Craftsmanship'}
                  </p>
                  <p className="text-[#5C544B] dark:text-[#A89F92] mt-0.5">{displayMaterials}</p>
                </div>
              </div>

              <div className="flex items-start gap-3 pt-2 border-t border-[#F0EBE3] dark:border-[#2A2622]">
                <Box className="w-4 h-4 text-[#B58A54] shrink-0 mt-0.5" />
                <div className="w-full">
                  <p className="font-bold text-[#292722] dark:text-[#F8F7F3]">
                    {isRTL ? 'متوفرة في صالات العرض التالية' : 'Available Physical Showrooms'}
                  </p>
                  {availablePlaces.length === 0 ? (
                    <p className="text-[#8A8175] mt-1">
                      {isRTL ? 'متوفرة للطلب المباشر أونلاين' : 'Available for direct online order'}
                    </p>
                  ) : (
                    <div className="flex flex-wrap gap-2 mt-2">
                      {availablePlaces.map((place) => (
                        <Link
                          key={place.id}
                          to={`/showroom/places/${place.slug}`}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#F8F7F3] dark:bg-[#25221E] border border-[#E2DAD0] dark:border-[#34302A] font-semibold text-[#292722] dark:text-[#F8F7F3] hover:border-[#B58A54] transition-colors"
                        >
                          <MapPin className="w-3 h-3 text-[#B58A54]" />
                          <span>{isRTL && place.nameAr ? place.nameAr : place.name}</span>
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* More from Same Brand */}
        {relatedProducts.length > 0 && brand && (
          <section className="space-y-6 pt-8 border-t border-[#E8E2D9] dark:border-[#26231F]">
            <div className="flex items-end justify-between">
              <div>
                <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#B58A54]">
                  {isRTL ? 'المزيد من نفس الدار' : 'MORE FROM THIS HOUSE'}
                </p>
                <h2 className="font-editorial text-2xl sm:text-3xl font-medium text-[#292722] dark:text-[#F8F7F3] mt-1">
                  {displayBrand}
                </h2>
              </div>
              <Link
                to={`/showroom/brands/${brand.slug}`}
                className="text-xs font-bold text-[#B58A54] hover:underline"
              >
                {isRTL ? 'عرض كل منتجات الماركة' : 'View Brand Collection'}
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedProducts.map((rel) => (
                <MarketplaceProductCard
                  key={rel.id}
                  product={rel}
                  brand={brand}
                  places={getPlacesForProduct(rel)}
                />
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
};
