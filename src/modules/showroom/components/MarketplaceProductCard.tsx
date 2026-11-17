import React from 'react';
import { Link } from 'react-router-dom';
import {
  MarketplaceBrand,
  MarketplacePlace,
  MarketplaceProduct,
  toStudioFurnitureProduct,
} from '../types';
import { useVisualizer } from '../../../context/VisualizerContext';
import { useCart } from '../../../context/CartContext';
import { useLanguage } from '../../../context/LanguageContext';
import { Sparkles, ShoppingBag, Ruler, Store, Eye } from 'lucide-react';

interface MarketplaceProductCardProps {
  product: MarketplaceProduct;
  brand?: MarketplaceBrand;
  places?: MarketplacePlace[];
  layout?: 'grid' | 'list';
}

const FALLBACK_PRODUCT_IMG =
  'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=1200&q=80';

export const MarketplaceProductCard: React.FC<MarketplaceProductCardProps> = ({
  product,
  brand,
  places = [],
  layout = 'grid',
}) => {
  const { openExperienceA } = useVisualizer();
  const { addToCart } = useCart();
  const { isRTL, formatPrice } = useLanguage();

  const displayName = isRTL && product.nameAr ? product.nameAr : product.name;
  const displayDesc = isRTL && product.descriptionAr ? product.descriptionAr : product.description;
  const displayBrand = brand ? (isRTL && brand.nameAr ? brand.nameAr : brand.name) : '';
  const studioProduct = toStudioFurnitureProduct(product, brand?.name);

  if (layout === 'list') {
    return (
      <div className="group flex flex-col sm:flex-row bg-white dark:bg-[#1C1A17] rounded-2xl border border-[#E8E2D9] dark:border-[#2D2A26] overflow-hidden hover:border-[#B58A54] transition-all shadow-2xs hover:shadow-md text-start">
        <Link
          to={`/showroom/products/${product.slug}`}
          className="relative w-full sm:w-64 aspect-[4/3] sm:aspect-auto shrink-0 overflow-hidden bg-[#F8F7F3] dark:bg-[#141210]"
        >
          <img
            src={product.images[0] || FALLBACK_PRODUCT_IMG}
            alt={displayName}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              if (target.src !== FALLBACK_PRODUCT_IMG) target.src = FALLBACK_PRODUCT_IMG;
            }}
          />
        </Link>

        <div className="flex-1 p-5 flex flex-col justify-between space-y-3">
          <div className="space-y-1.5">
            <div className="flex items-center justify-between gap-2">
              {brand && (
                <Link
                  to={`/showroom/brands/${brand.slug}`}
                  className="text-[10px] uppercase tracking-wider font-bold text-[#B58A54] hover:underline"
                >
                  {displayBrand}
                </Link>
              )}
              <span dir="ltr" className="text-[10px] font-mono text-stone-400">
                {product.dimensions.widthCm}W × {product.dimensions.depthCm}D × {product.dimensions.heightCm}H cm
              </span>
            </div>

            <Link to={`/showroom/products/${product.slug}`}>
              <h3 className="text-lg font-editorial font-bold text-[#292722] dark:text-[#F8F7F3] hover:text-[#B58A54] transition-colors">
                {displayName}
              </h3>
            </Link>

            <p className="text-xs text-[#6E6A63] dark:text-[#A39E96] line-clamp-2 leading-relaxed">
              {displayDesc}
            </p>
          </div>

          <div className="pt-3 border-t border-[#E8E2D9] dark:border-[#2D2A26] flex flex-wrap items-center justify-between gap-3">
            <div>
              <span className="text-base font-bold font-mono text-[#292722] dark:text-white block">
                {formatPrice(product.price)}
              </span>
              {places.length > 0 && (
                <span className="text-[10px] text-stone-500 flex items-center gap-1">
                  <Store className="w-3 h-3 text-[#B58A54]" />
                  {isRTL ? `متاح في ${places.length} معارض` : `Available in ${places.length} showrooms`}
                </span>
              )}
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => openExperienceA(studioProduct)}
                className="px-4 py-2 rounded-xl bg-[#292722] hover:bg-[#3D3A34] dark:bg-[#F8F7F3] dark:hover:bg-white text-white dark:text-[#121110] text-xs font-bold flex items-center gap-1.5 transition cursor-pointer shadow-xs"
              >
                <Sparkles className="w-3.5 h-3.5 text-[#B58A54]" />
                <span>{isRTL ? 'جرّب في غرفتك' : 'Try in Your Room'}</span>
              </button>

              <Link
                to={`/showroom/products/${product.slug}`}
                className="px-3.5 py-2 rounded-xl border border-[#E8E2D9] dark:border-[#2D2A26] hover:border-[#B58A54] text-xs font-semibold text-[#292722] dark:text-[#F8F7F3] flex items-center gap-1"
              >
                <Eye className="w-3.5 h-3.5" />
                <span>{isRTL ? 'التفاصيل' : 'Details'}</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      data-flip-id={product.id}
      className="product-flip-card group relative flex flex-col bg-white dark:bg-[#1C1A17] rounded-2xl border border-[#E8E2D9] dark:border-[#2D2A26] overflow-hidden hover:border-[#B58A54]/70 transition-all duration-300 hover:shadow-lg text-start"
    >
      {/* Image */}
      <Link
        to={`/showroom/products/${product.slug}`}
        className="relative aspect-[4/3] w-full overflow-hidden bg-[#F8F7F3] dark:bg-[#141210] block"
      >
        <img
          src={product.images[0] || FALLBACK_PRODUCT_IMG}
          alt={displayName}
          className="h-full w-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
          loading="lazy"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            if (target.src !== FALLBACK_PRODUCT_IMG) target.src = FALLBACK_PRODUCT_IMG;
          }}
        />

        <div className={`absolute top-3 ${isRTL ? 'right-3' : 'left-3'} flex flex-col gap-1.5 z-10`}>
          {brand && (
            <span className="px-2.5 py-1 rounded-full bg-[#292722]/85 backdrop-blur-md text-[10px] font-bold tracking-wider uppercase text-white">
              {displayBrand}
            </span>
          )}
          {product.featured && (
            <span className="px-2.5 py-0.5 rounded-full bg-[#B58A54] text-[10px] font-bold tracking-wider uppercase text-white shadow-sm w-fit">
              {isRTL ? 'مختار' : 'Curated'}
            </span>
          )}
        </div>

        <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between pointer-events-none">
          <div className="px-2.5 py-1 rounded-lg bg-[#292722]/85 backdrop-blur-sm text-white/95 text-[10px] font-medium flex items-center gap-1.5 shadow-sm">
            <Ruler className="w-3.5 h-3.5 text-[#E9DFD0]" />
            <span dir="ltr">
              {product.dimensions.widthCm}W × {product.dimensions.depthCm}D × {product.dimensions.heightCm}H cm
            </span>
          </div>
        </div>
      </Link>

      {/* Details */}
      <div className="flex flex-col flex-1 p-5 justify-between space-y-4">
        <div className="space-y-1.5">
          <div className="flex items-center justify-between text-[10px] uppercase tracking-wider font-bold">
            <span className="text-[#B58A54] truncate">{product.collection}</span>
            <span dir="ltr" className="text-stone-400 font-mono shrink-0">{product.sku}</span>
          </div>

          <Link to={`/showroom/products/${product.slug}`}>
            <h3 className="text-base font-bold font-editorial text-[#292722] dark:text-[#F8F7F3] hover:text-[#B58A54] transition-colors line-clamp-1">
              {displayName}
            </h3>
          </Link>

          <p className="text-xs text-[#6E6A63] dark:text-[#A39E96] line-clamp-2 leading-relaxed">
            {displayDesc}
          </p>

          {places.length > 0 && (
            <div className="flex items-center gap-1.5 text-[11px] text-[#6E6A63] dark:text-[#A39E96] pt-1">
              <Store className="w-3.5 h-3.5 text-[#B58A54] shrink-0" />
              <span className="truncate">
                {isRTL
                  ? `متوفر في ${places.length} ${places.length === 1 ? 'معرض' : 'معارض'}`
                  : `Available at ${places.length} ${places.length === 1 ? 'Showroom' : 'Showrooms'}`}
              </span>
            </div>
          )}
        </div>

        {/* Footer Price + Primary Try In Room CTA */}
        <div className="space-y-2.5 pt-3 border-t border-[#E8E2D9] dark:border-[#2D2A26]">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-base font-bold font-mono text-[#292722] dark:text-white">
                {formatPrice(product.price)}
              </span>
              {product.originalPrice && (
                <span className="text-[11px] line-through text-stone-400 ms-2 font-mono">
                  {formatPrice(product.originalPrice)}
                </span>
              )}
            </div>

            <button
              onClick={() => addToCart(studioProduct)}
              className="p-2 rounded-xl border border-[#E8E2D9] dark:border-[#2D2A26] hover:border-[#B58A54] text-[#292722] dark:text-[#F8F7F3] transition cursor-pointer"
              title={isRTL ? 'أضف إلى السلة' : 'Add to Shopping Bag'}
            >
              <ShoppingBag className="w-4 h-4" />
            </button>
          </div>

          <button
            onClick={() => openExperienceA(studioProduct)}
            className="w-full py-2.5 rounded-xl bg-[#292722] hover:bg-[#3D3A34] dark:bg-[#F8F7F3] dark:hover:bg-white text-white dark:text-[#121110] text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition shadow-xs cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#B58A54]" />
            <span>{isRTL ? 'جرّبها في غرفتك' : 'Try in Your Room'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
