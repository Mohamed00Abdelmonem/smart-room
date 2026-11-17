import React from 'react';
import { Link } from 'react-router-dom';
import type { MarketplaceBrand } from '../types';
import { useLanguage } from '../../../context/LanguageContext';
import { BadgeCheck, ArrowRight, ArrowLeft, Layers } from 'lucide-react';

interface BrandCardProps {
  brand: MarketplaceBrand;
  productCount: number;
}

const FALLBACK_BRAND_COVER =
  'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=80';

export const BrandCard: React.FC<BrandCardProps> = ({ brand, productCount }) => {
  const { isRTL } = useLanguage();
  const Arrow = isRTL ? ArrowLeft : ArrowRight;
  const displayName = isRTL && brand.nameAr ? brand.nameAr : brand.name;
  const displayDesc = isRTL && brand.descriptionAr ? brand.descriptionAr : brand.description;

  return (
    <Link
      to={`/showroom/brands/${brand.slug}`}
      className="group flex flex-col bg-white dark:bg-[#1C1A17] rounded-3xl border border-[#E8E2D9] dark:border-[#2D2A26] overflow-hidden hover:border-[#B58A54] transition-all duration-300 shadow-2xs hover:shadow-xl text-start"
    >
      {/* Editorial Cover Banner */}
      <div className="relative h-44 w-full overflow-hidden bg-[#F5F1EA] dark:bg-[#141210]">
        <img
          src={brand.coverImage || FALLBACK_BRAND_COVER}
          alt={displayName}
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
          loading="lazy"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            if (target.src !== FALLBACK_BRAND_COVER) target.src = FALLBACK_BRAND_COVER;
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/15 to-transparent" />

        {/* Status Badges */}
        <div className={`absolute top-3.5 ${isRTL ? 'right-3.5' : 'left-3.5'} flex items-center gap-1.5`}>
          {brand.featured && (
            <span className="px-2.5 py-0.5 rounded-full bg-[#B58A54] text-white text-[10px] font-bold uppercase tracking-wider shadow-xs">
              {isRTL ? 'ماركة مميزة' : 'Featured'}
            </span>
          )}
          {brand.verified && (
            <span className="px-2.5 py-0.5 rounded-full bg-white/95 text-[#1E1E1E] text-[10px] font-bold flex items-center gap-1 shadow-xs">
              <BadgeCheck className="w-3 h-3 text-emerald-600" />
              <span>{isRTL ? 'موثق' : 'Verified'}</span>
            </span>
          )}
        </div>

        {/* Floating Brand Monogram / Logo */}
        <div className={`absolute -bottom-6 ${isRTL ? 'right-5' : 'left-5'} w-14 h-14 rounded-2xl border-2 border-white dark:border-[#1C1A17] bg-white overflow-hidden shadow-lg`}>
          <img
            src={brand.logo || brand.coverImage || FALLBACK_BRAND_COVER}
            alt={displayName}
            className="w-full h-full object-cover"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              if (target.src !== FALLBACK_BRAND_COVER) target.src = FALLBACK_BRAND_COVER;
            }}
          />
        </div>
      </div>

      {/* Content */}
      <div className="pt-9 px-5 pb-5 flex-1 flex flex-col justify-between space-y-4">
        <div className="space-y-1.5">
          <div className="flex items-center justify-between gap-2">
            <h3 className="text-lg font-editorial font-bold text-[#1E1E1E] dark:text-white group-hover:text-[#B58A54] transition-colors truncate">
              {displayName}
            </h3>
            <span className="text-[10px] font-mono text-stone-400 shrink-0">{brand.origin}</span>
          </div>

          <p className="text-xs text-[#6E6A63] dark:text-[#A39E96] line-clamp-2 leading-relaxed">
            {displayDesc}
          </p>
        </div>

        <div className="space-y-3">
          {/* Available Categories */}
          <div className="flex flex-wrap gap-1.5">
            {brand.categories.slice(0, 3).map((cat) => (
              <span
                key={cat}
                className="px-2 py-0.5 rounded-md bg-[#F8F7F3] dark:bg-[#25211D] border border-[#E8E2D9] dark:border-[#2D2A26] text-[10px] uppercase tracking-wider font-semibold text-[#6E6A63] dark:text-[#A39E96]"
              >
                {cat}
              </span>
            ))}
          </div>

          {/* Footer Action */}
          <div className="pt-3 border-t border-[#E8E2D9] dark:border-[#2D2A26] flex items-center justify-between text-xs">
            <span className="flex items-center gap-1.5 text-stone-500 font-mono text-[11px]">
              <Layers className="w-3.5 h-3.5 text-[#B58A54]" />
              {productCount} {isRTL ? 'منتج' : productCount === 1 ? 'Product' : 'Products'}
            </span>

            <span className="inline-flex items-center gap-1 font-bold text-[#1E1E1E] dark:text-white group-hover:text-[#B58A54] transition-colors">
              <span>{isRTL ? 'تصفح التشكيلة' : 'View Collection'}</span>
              <Arrow className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
};
