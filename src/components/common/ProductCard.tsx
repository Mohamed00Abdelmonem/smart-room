import React from 'react';
import type { FurnitureProduct } from '../../types';
import { useVisualizer } from '../../context/VisualizerContext';
import { useCart } from '../../context/CartContext';
import { useLanguage } from '../../context/LanguageContext';
import { Sparkles, ShoppingBag, Eye, Ruler, MapPin } from 'lucide-react';

interface ProductCardProps {
  product: FurnitureProduct;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { openExperienceA, setQuickViewProduct } = useVisualizer();
  const { addToCart } = useCart();
  const { formatPrice, isRTL, t } = useLanguage();

  const displayName = isRTL && product.nameAr ? product.nameAr : product.name;
  const displayDesc = isRTL && product.descriptionAr ? product.descriptionAr : product.description;
  const displayCollection = isRTL && product.collectionAr ? product.collectionAr : product.collection;
  const displayStyle = isRTL && product.styleAr ? product.styleAr : product.style;
  const displayLocation = isRTL && product.stockLocationAr ? product.stockLocationAr : product.stockLocation;

  return (
    <div className="group relative flex flex-col bg-white dark:bg-[#1C1A17] rounded-2xl border border-[#E8E2D9] dark:border-[#2D2A26] overflow-hidden hover:border-[#CDBBA5] dark:hover:border-[#CDBBA5]/60 transition-all duration-300 hover:shadow-md">
      {/* Image Container with Badges */}
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#F8F7F3] dark:bg-[#141210]">
        <img
          src={product.image}
          alt={displayName}
          className="h-full w-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
          loading="lazy"
        />

        {/* Floating Badges */}
        <div className={`absolute top-3 ${isRTL ? 'right-3' : 'left-3'} flex flex-col gap-1.5 z-10`}>
          <span className="px-2.5 py-1 rounded-full bg-[#292722]/85 dark:bg-[#121110]/90 backdrop-blur-md text-[10px] font-bold tracking-wider uppercase text-white">
            {displayStyle}
          </span>
          {product.isFeatured && (
            <span className="px-2.5 py-0.5 rounded-full bg-[#B58A54] text-[10px] font-bold tracking-wider uppercase text-white shadow-sm">
              {isRTL ? 'اختيار المعرض' : 'Showroom Pick'}
            </span>
          )}
        </div>

        {/* Quick View Floating Action */}
        <button
          onClick={() => setQuickViewProduct(product)}
          className={`absolute top-3 ${isRTL ? 'left-3' : 'right-3'} p-2 rounded-full bg-white/95 dark:bg-[#24201C]/90 text-[#292722] dark:text-[#F8F7F3] opacity-0 group-hover:opacity-100 transition-all duration-200 hover:bg-[#292722] hover:text-white dark:hover:bg-white dark:hover:text-[#121110] shadow-md cursor-pointer`}
          title={isRTL ? 'معاينة المواصفات السريعة' : 'Quick View Specifications'}
        >
          <Eye className="w-4 h-4" />
        </button>

        {/* Dimension Overlay Badge on Bottom of Image */}
        <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between pointer-events-none">
          <div className="px-2.5 py-1 rounded-lg bg-[#292722]/85 dark:bg-[#121110]/90 backdrop-blur-sm text-white/90 text-[10px] font-medium flex items-center gap-1.5 shadow-sm">
            <Ruler className="w-3.5 h-3.5 text-[#E9DFD0]" />
            <span dir="ltr">
              {product.dimensions.widthCm}W × {product.dimensions.depthCm}D × {product.dimensions.heightCm}H cm
            </span>
          </div>
        </div>
      </div>

      {/* Content Details */}
      <div className="flex flex-col flex-1 p-5">
        <div className="text-[10px] uppercase tracking-wider text-[#B58A54] font-bold mb-1 flex items-center justify-between">
          <span className="truncate">{displayCollection}</span>
          <span className="text-[#6E6A63] dark:text-[#A39E96] font-mono text-[10px] shrink-0" dir="ltr">{product.sku}</span>
        </div>

        <h3
          onClick={() => setQuickViewProduct(product)}
          className="text-base font-bold font-editorial text-[#292722] dark:text-[#F8F7F3] hover:text-[#B58A54] transition-colors cursor-pointer line-clamp-1 mb-1.5 leading-snug"
        >
          {displayName}
        </h3>

        <p className="text-xs text-[#6E6A63] dark:text-[#A39E96] line-clamp-2 mb-4 leading-relaxed font-normal">
          {displayDesc}
        </p>

        {/* Stock Location */}
        <div className="flex items-center gap-1 text-[11px] text-[#6E6A63] dark:text-[#A39E96] mb-4">
          <MapPin className="w-3 h-3 text-[#B58A54] shrink-0" />
          <span className="truncate">{displayLocation}</span>
        </div>

        {/* Price Section */}
        <div className="mt-auto pt-3 border-t border-[#E8E2D9] dark:border-[#2D2A26] flex items-baseline justify-between mb-4">
          <div>
            <span className="text-[10px] text-[#6E6A63] dark:text-[#A39E96] uppercase font-bold tracking-wider block">
              {isRTL ? 'السعر' : 'Price'}
            </span>
            <div className="flex items-baseline gap-2">
              <span className="text-base font-bold text-[#292722] dark:text-[#F8F7F3]">
                {formatPrice(product.priceEgp)}
              </span>
              {product.originalPriceEgp && (
                <span className="text-xs text-[#6E6A63] line-through">
                  {formatPrice(product.originalPriceEgp)}
                </span>
              )}
            </div>
          </div>
          <span className="text-[10px] text-emerald-700 dark:text-emerald-400 font-bold bg-emerald-50 dark:bg-emerald-950/40 px-2 py-0.5 rounded-full">
            {product.inStock ? (isRTL ? 'متوفر للتسليم' : 'In Stock') : (isRTL ? 'حجز مسبق' : 'Backorder')}
          </span>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-2 gap-2">
          <button
            onClick={() => openExperienceA(product)}
            className="py-2.5 px-3 rounded-xl bg-[#292722] hover:bg-[#3D3A34] dark:bg-[#F8F7F3] dark:hover:bg-white text-white dark:text-[#292722] text-[11px] font-bold tracking-wide transition-all flex items-center justify-center gap-1.5 shadow-sm cursor-pointer group/btn"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#B58A54] group-hover/btn:rotate-12 transition-transform" />
            <span className="truncate">{t.tryInRoomBtn}</span>
          </button>

          <button
            onClick={() => addToCart(product)}
            className="py-2.5 px-3 rounded-xl bg-[#E9DFD0] hover:bg-[#DDD0BE] dark:bg-[#25211D] dark:hover:bg-[#2F2A25] text-[#292722] dark:text-[#F8F7F3] text-[11px] font-bold tracking-wide border border-[#CDBBA5]/70 transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-xs"
          >
            <ShoppingBag className="w-3.5 h-3.5 text-[#6E6A63] dark:text-[#A39E96]" />
            <span className="truncate">{isRTL ? 'أضف للسلة' : 'Add to Bag'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
