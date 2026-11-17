import React from 'react';
import { Link } from 'react-router-dom';
import type { MarketplaceBrand, MarketplacePlace } from '../types';
import { useLanguage } from '../../../context/LanguageContext';
import { MapPin, ArrowRight, ArrowLeft, Store } from 'lucide-react';

interface PlaceCardProps {
  place: MarketplacePlace;
  productCount: number;
  associatedBrands: MarketplaceBrand[];
}

const FALLBACK_PLACE_COVER =
  'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80';

export const PlaceCard: React.FC<PlaceCardProps> = ({
  place,
  productCount,
  associatedBrands,
}) => {
  const { isRTL } = useLanguage();
  const Arrow = isRTL ? ArrowLeft : ArrowRight;
  const displayName = isRTL && place.nameAr ? place.nameAr : place.name;
  const displayDesc = isRTL && place.descriptionAr ? place.descriptionAr : place.description;
  const displayAddress = isRTL && place.addressAr ? place.addressAr : place.address;
  const displayLocation = isRTL && place.locationAr ? place.locationAr : place.location;

  return (
    <Link
      to={`/showroom/places/${place.slug}`}
      className="group flex flex-col bg-white dark:bg-[#1C1A17] rounded-3xl border border-[#E8E2D9] dark:border-[#2D2A26] overflow-hidden hover:border-[#B58A54] transition-all duration-300 shadow-2xs hover:shadow-xl text-start"
    >
      {/* Showroom Cover Image */}
      <div className="relative h-48 w-full overflow-hidden bg-[#F5F1EA] dark:bg-[#141210]">
        <img
          src={place.coverImage || FALLBACK_PLACE_COVER}
          alt={displayName}
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
          loading="lazy"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            if (target.src !== FALLBACK_PLACE_COVER) target.src = FALLBACK_PLACE_COVER;
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />

        {/* Location Pill */}
        <div className={`absolute top-3.5 ${isRTL ? 'right-3.5' : 'left-3.5'} flex items-center gap-1.5`}>
          <span className="px-3 py-1 rounded-full bg-white/95 text-[#1E1E1E] text-[10px] font-bold flex items-center gap-1 shadow-xs">
            <MapPin className="w-3 h-3 text-[#B58A54]" />
            <span>{displayLocation}</span>
          </span>
          {place.featured && (
            <span className="px-2.5 py-1 rounded-full bg-[#B58A54] text-white text-[10px] font-bold uppercase tracking-wider shadow-xs">
              {isRTL ? 'صالة رئيسية' : 'Flagship'}
            </span>
          )}
        </div>

        {/* Store Logo & Title Overlay */}
        <div className="absolute bottom-3.5 left-4 right-4 flex items-center gap-3">
          <div className="w-11 h-11 rounded-xl border border-white/40 bg-white overflow-hidden shrink-0 shadow-md">
            <img
              src={place.logo || place.coverImage || FALLBACK_PLACE_COVER}
              alt={displayName}
              className="w-full h-full object-cover"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                if (target.src !== FALLBACK_PLACE_COVER) target.src = FALLBACK_PLACE_COVER;
              }}
            />
          </div>
          <div className="min-w-0 text-white">
            <h3 className="font-editorial font-bold text-base sm:text-lg truncate group-hover:text-amber-300 transition-colors">
              {displayName}
            </h3>
            <p className="text-[11px] text-white/80 truncate">{displayAddress}</p>
          </div>
        </div>
      </div>

      {/* Store Details & Associated Brands */}
      <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
        <p className="text-xs text-[#6E6A63] dark:text-[#A39E96] line-clamp-2 leading-relaxed">
          {displayDesc}
        </p>

        <div className="space-y-3">
          {/* Associated Brands */}
          <div>
            <span className="text-[9px] uppercase tracking-widest font-bold text-stone-400 block mb-1.5">
              {isRTL ? 'الماركات المتوفرة داخل المعرض:' : 'Associated Brands Inside:'}
            </span>
            <div className="flex flex-wrap gap-1.5">
              {associatedBrands.map((b) => (
                <span
                  key={b.id}
                  className="px-2 py-0.5 rounded-md bg-[#F8F7F3] dark:bg-[#25211D] border border-[#E8E2D9] dark:border-[#2D2A26] text-[10px] font-semibold text-[#1E1E1E] dark:text-[#F8F7F3]"
                >
                  {isRTL && b.nameAr ? b.nameAr : b.name}
                </span>
              ))}
            </div>
          </div>

          <div className="pt-3 border-t border-[#E8E2D9] dark:border-[#2D2A26] flex items-center justify-between text-xs">
            <span className="flex items-center gap-1.5 text-stone-500 font-mono text-[11px]">
              <Store className="w-3.5 h-3.5 text-[#B58A54]" />
              {productCount} {isRTL ? 'قطعة متاحة' : 'Available'}
            </span>

            <span className="inline-flex items-center gap-1 font-bold text-[#1E1E1E] dark:text-white group-hover:text-[#B58A54] transition-colors">
              <span>{isRTL ? 'زيارة المعرض' : 'View Store'}</span>
              <Arrow className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
};
