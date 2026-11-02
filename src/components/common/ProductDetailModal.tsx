import React, { useState } from 'react';
import { useVisualizer } from '../../context/VisualizerContext';
import { useCart } from '../../context/CartContext';
import { useLanguage } from '../../context/LanguageContext';
import { X, Sparkles, ShoppingBag, Ruler, ShieldCheck, MapPin, Layers } from 'lucide-react';

export const ProductDetailModal: React.FC = () => {
  const { quickViewProduct, setQuickViewProduct, openExperienceA } = useVisualizer();
  const { addToCart } = useCart();
  const { t, isRTL, formatPrice } = useLanguage();
  const [selectedColor, setSelectedColor] = useState<string>('');
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  if (!quickViewProduct) return null;

  const product = quickViewProduct;
  const displayName = isRTL && product.nameAr ? product.nameAr : product.name;
  const displayDesc = isRTL && product.descriptionAr ? product.descriptionAr : product.description;
  const displayMaterial = isRTL && product.materialAr ? product.materialAr : product.material;
  const displayCollection = isRTL && product.collectionAr ? product.collectionAr : product.collection;
  const displayLocation = isRTL && product.stockLocationAr ? product.stockLocationAr : product.stockLocation;

  const currentColors = isRTL && product.colorsAr ? product.colorsAr : product.colors;
  const currentSelectedColor = selectedColor || currentColors[0];
  const allImages = [product.image, ...(product.alternateImages || [])];

  const handleLaunchExperienceA = () => {
    const prod = product;
    setQuickViewProduct(null);
    openExperienceA(prod);
  };

  const handleAddToCart = () => {
    addToCart(product, 1, currentSelectedColor);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-sm animate-in fade-in">
      <div className="relative w-full max-w-4xl bg-white dark:bg-[#161412] rounded-3xl shadow-2xl border border-[#E8E2D9] dark:border-[#2D2A26] overflow-hidden flex flex-col md:flex-row max-h-[90vh] transition-colors">
        {/* Close Button */}
        <button
          onClick={() => setQuickViewProduct(null)}
          className={`absolute top-4 ${isRTL ? 'left-4' : 'right-4'} z-20 p-2 rounded-full bg-white/90 dark:bg-[#25221F]/90 hover:bg-[#292722] hover:text-[#F8F7F3] dark:hover:bg-[#F8F7F3] dark:hover:text-[#292722] text-[#292722] dark:text-[#F8F7F3] backdrop-blur-sm transition-colors cursor-pointer shadow-sm`}
        >
          <X className="w-5 h-5" />
        </button>

        {/* Left Side: Images Gallery */}
        <div className="md:w-1/2 bg-[#F8F7F3] dark:bg-[#121110] p-6 flex flex-col justify-between transition-colors">
          <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-white dark:bg-[#1E1C1A] shadow-sm mb-4 border border-[#E8E2D9] dark:border-[#2D2A26]">
            <img
              src={allImages[activeImageIndex]}
              alt={displayName}
              className="w-full h-full object-cover transition-all duration-300"
            />
            <div className={`absolute top-3 ${isRTL ? 'right-3' : 'left-3'}`}>
              <span className="px-3 py-1 rounded-full bg-[#292722]/85 dark:bg-[#121110]/90 text-[#F8F7F3] text-[10px] font-bold uppercase tracking-wider">
                {displayCollection}
              </span>
            </div>
          </div>

          {/* Thumbnails */}
          {allImages.length > 1 && (
            <div className="flex gap-2">
              {allImages.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImageIndex(idx)}
                  className={`w-16 h-16 rounded-xl overflow-hidden border-2 transition-all cursor-pointer ${
                    activeImageIndex === idx ? 'border-[#292722] dark:border-[#F8F7F3] scale-95' : 'border-transparent opacity-70 hover:opacity-100'
                  }`}
                >
                  <img src={img} alt="Thumbnail" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}

          {/* Genuine Retailer Verification */}
          <div className="mt-4 p-3 rounded-xl bg-white dark:bg-[#1E1C1A] border border-[#E8E2D9] dark:border-[#2D2A26] flex items-center gap-2.5 text-xs text-[#6E6A63] dark:text-[#A39E96]">
            <ShieldCheck className="w-5 h-5 text-[#B58A54] shrink-0" />
            <div>
              <p className="font-bold text-[#292722] dark:text-[#F8F7F3]">
                {isRTL ? 'منتج معتمد وأصيل من كتالوج المعرض' : 'Authentic Retail Showroom Item'}
              </p>
              <p className="text-[11px] text-[#6E6A63] dark:text-[#A39E96]" dir="ltr">
                SKU: {product.sku} · Verified 3D Spatial Digital Twin
              </p>
            </div>
          </div>
        </div>

        {/* Right Side: Product Specs & Actions */}
        <div className="md:w-1/2 p-6 sm:p-8 flex flex-col overflow-y-auto">
          <div className="text-[10px] uppercase tracking-wider text-[#B58A54] font-bold mb-1">
            {isRTL ? product.categoryAr : product.category} · {isRTL ? product.styleAr : product.style}
          </div>

          <h2 className="text-2xl sm:text-3xl font-editorial font-bold text-[#292722] dark:text-[#F8F7F3] mb-3 leading-tight">
            {displayName}
          </h2>

          <div className="flex items-baseline gap-3 mb-4">
            <span className="text-2xl font-editorial font-bold text-[#292722] dark:text-[#F8F7F3]">
              {formatPrice(product.priceEgp)}
            </span>
            {product.originalPriceEgp && (
              <span className="text-sm text-[#6E6A63] dark:text-[#A39E96] line-through">
                {formatPrice(product.originalPriceEgp)}
              </span>
            )}
            <span className="text-xs text-[#B58A54] font-bold ml-auto mr-auto flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5" />
              {displayLocation}
            </span>
          </div>

          <p className="text-xs sm:text-sm text-[#6E6A63] dark:text-[#A39E96] leading-relaxed mb-6 font-normal">
            {displayDesc}
          </p>

          {/* Dimensions Breakdown Grid */}
          <div className="mb-6 p-4 rounded-2xl bg-[#F8F7F3] dark:bg-[#1E1C1A] border border-[#E8E2D9] dark:border-[#2D2A26] transition-colors">
            <div className="flex items-center gap-1.5 text-xs font-bold text-[#292722] dark:text-[#F8F7F3] uppercase tracking-wider mb-2.5">
              <Ruler className="w-4 h-4 text-[#B58A54]" />
              <span>{isRTL ? 'الأبعاد المعتمدة للقطعة' : 'Certified Product Dimensions'}</span>
            </div>
            <div className="grid grid-cols-3 gap-2 text-center text-xs">
              <div className="bg-white dark:bg-[#141210] p-2 rounded-xl border border-[#E8E2D9] dark:border-[#2D2A26]">
                <span className="text-[#6E6A63] dark:text-[#A39E96] block text-[10px] uppercase font-bold">{isRTL ? 'العرض' : 'Width'}</span>
                <span className="font-bold text-[#292722] dark:text-[#F8F7F3] text-sm" dir="ltr">{product.dimensions.widthCm} cm</span>
              </div>
              <div className="bg-white dark:bg-[#141210] p-2 rounded-xl border border-[#E8E2D9] dark:border-[#2D2A26]">
                <span className="text-[#6E6A63] dark:text-[#A39E96] block text-[10px] uppercase font-bold">{isRTL ? 'العمق' : 'Depth'}</span>
                <span className="font-bold text-[#292722] dark:text-[#F8F7F3] text-sm" dir="ltr">{product.dimensions.depthCm} cm</span>
              </div>
              <div className="bg-white dark:bg-[#141210] p-2 rounded-xl border border-[#E8E2D9] dark:border-[#2D2A26]">
                <span className="text-[#6E6A63] dark:text-[#A39E96] block text-[10px] uppercase font-bold">{isRTL ? 'الارتفاع' : 'Height'}</span>
                <span className="font-bold text-[#292722] dark:text-[#F8F7F3] text-sm" dir="ltr">{product.dimensions.heightCm} cm</span>
              </div>
            </div>
            {(isRTL ? product.clearanceNotesAr : product.clearanceNotes) && (
              <p className="mt-2.5 text-[11px] text-[#6E6A63] dark:text-[#A39E96] font-normal">
                * {isRTL ? product.clearanceNotesAr : product.clearanceNotes}
              </p>
            )}
          </div>

          {/* Material & Colors */}
          <div className="space-y-4 mb-6">
            <div>
              <span className="text-xs font-bold text-[#292722] dark:text-[#F8F7F3] uppercase tracking-wider block mb-1">
                {isRTL ? 'المواد وجودة التشطيب' : 'Material & Finish'}
              </span>
              <p className="text-xs text-[#6E6A63] dark:text-[#A39E96] flex items-center gap-1.5 font-normal">
                <Layers className="w-3.5 h-3.5 text-[#B58A54]" />
                {displayMaterial}
              </p>
            </div>

            <div>
              <span className="text-xs font-bold text-[#292722] dark:text-[#F8F7F3] uppercase tracking-wider block mb-2">
                {isRTL ? 'اللون المتاح:' : 'Colorway:'} <span className="font-normal text-[#6E6A63] dark:text-[#A39E96]">{currentSelectedColor}</span>
              </span>
              <div className="flex flex-wrap gap-2">
                {currentColors.map((color) => (
                  <button
                    key={color}
                    onClick={() => setSelectedColor(color)}
                    className={`px-3 py-1.5 rounded-xl text-xs transition-all cursor-pointer ${
                      currentSelectedColor === color
                        ? 'bg-[#292722] text-[#F8F7F3] dark:bg-[#F8F7F3] dark:text-[#292722] font-bold shadow-sm'
                        : 'bg-[#E9DFD0] dark:bg-[#25221F] hover:bg-[#DDD0BE] text-[#292722] dark:text-[#F8F7F3] border border-[#CDBBA5]/70 dark:border-[#2D2A26]'
                    }`}
                  >
                    {color}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="mt-auto pt-4 border-t border-[#E8E2D9] dark:border-[#2D2A26] flex flex-col sm:flex-row gap-3">
            {/* Experience A: See It in My Room */}
            <button
              onClick={handleLaunchExperienceA}
              className="flex-1 flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl bg-[#292722] hover:bg-[#3D3A34] dark:bg-[#F8F7F3] dark:hover:bg-white text-white dark:text-[#292722] text-xs font-bold tracking-wide shadow-sm transition-all cursor-pointer group"
            >
              <Sparkles className="w-4 h-4 text-[#B58A54] dark:text-[#292722] group-hover:rotate-12 transition-transform" />
              <span>{t.tryInRoomBtn}</span>
            </button>

            {/* Add to Cart */}
            <button
              onClick={handleAddToCart}
              className="flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl bg-[#E9DFD0] hover:bg-[#DDD0BE] text-[#292722] border border-[#CDBBA5]/70 text-xs font-bold tracking-wide transition-all cursor-pointer"
            >
              <ShoppingBag className="w-4 h-4 text-[#B58A54]" />
              <span>{isRTL ? 'أضف للسلة' : 'Add to Cart'}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
