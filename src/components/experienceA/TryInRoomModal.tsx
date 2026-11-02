import React, { useState } from 'react';
import { useVisualizer } from '../../context/VisualizerContext';
import { useCart } from '../../context/CartContext';
import { useLanguage } from '../../context/LanguageContext';
import { SAMPLE_ROOM_PRESETS } from '../../data/sampleRooms';
import { BeforeAfterSlider } from '../common/BeforeAfterSlider';
import { DemoBadge } from '../common/DemoBadge';
import { 
  X, 
  Upload, 
  Sparkles, 
  ShoppingBag, 
  CheckCircle2, 
  ShieldCheck, 
  MapPin
} from 'lucide-react';

export const TryInRoomModal: React.FC = () => {
  const { isExperienceAOpen, closeExperienceA, selectedProductForA } = useVisualizer();
  const { addToCart } = useCart();
  const { t, isRTL, formatPrice } = useLanguage();

  const [activeRoomPreset, setActiveRoomPreset] = useState(SAMPLE_ROOM_PRESETS[0]);
  const [customUploadedImage, setCustomUploadedImage] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [processingStage, setProcessingStage] = useState('');
  const [hasVisualized, setHasVisualized] = useState(true);

  if (!isExperienceAOpen || !selectedProductForA) return null;

  const product = selectedProductForA;
  const displayName = isRTL && product.nameAr ? product.nameAr : product.name;
  const displayMaterial = isRTL && product.materialAr ? product.materialAr : product.material;
  const displayCollection = isRTL && product.collectionAr ? product.collectionAr : product.collection;
  const displayLocation = isRTL && product.stockLocationAr ? product.stockLocationAr : product.stockLocation;

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setCustomUploadedImage(url);
      simulatePlacement();
    }
  };

  const handleSelectPreset = (preset: typeof SAMPLE_ROOM_PRESETS[0]) => {
    setActiveRoomPreset(preset);
    setCustomUploadedImage(null);
    simulatePlacement();
  };

  const simulatePlacement = async () => {
    setIsProcessing(true);
    setProcessingStage(isRTL ? 'تحليل مستوى الأرضية والإضاءة المحيطة...' : 'Analyzing floor plane geometry & ambient lighting...');
    await new Promise((r) => setTimeout(r, 600));

    setProcessingStage(isRTL ? `مطابقة أبعاد ${displayName} بدقة ${product.dimensions.widthCm} سم...` : `Scaling ${displayName} to exact ${product.dimensions.widthCm}cm clearance...`);
    await new Promise((r) => setTimeout(r, 700));

    setProcessingStage(isRTL ? 'إسقاط الظلال ثلاثية الأبعاد وزاوية الرؤية...' : 'Rendering directional contact shadows & perspective projection...');
    await new Promise((r) => setTimeout(r, 600));

    setIsProcessing(false);
    setHasVisualized(true);
  };

  const currentBeforeImage = customUploadedImage || activeRoomPreset.emptyImage;
  const currentAfterImage = activeRoomPreset.furnishedImage;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/60 backdrop-blur-sm overflow-y-auto animate-in fade-in">
      <div className="relative w-full max-w-5xl bg-[#F8F7F3] dark:bg-[#121110] rounded-3xl shadow-2xl border border-[#E8E2D9] dark:border-[#2D2A26] overflow-hidden my-auto transition-colors">
        {/* Header Bar */}
        <div className="px-6 py-4 bg-white dark:bg-[#1E1C1A] border-b border-[#E8E2D9] dark:border-[#2D2A26] flex items-center justify-between transition-colors">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-[#292722] text-[#F8F7F3] dark:bg-[#F8F7F3] dark:text-[#292722] flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-[#B58A54] dark:text-[#292722]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-editorial font-bold text-[#292722] dark:text-[#F8F7F3]">
                  {t.expAModalTitle}
                </h3>
                <span className="px-2 py-0.5 rounded-full bg-[#B58A54]/15 text-[#B58A54] text-[10px] font-bold uppercase tracking-wider">
                  {t.expAModalLiveSim}
                </span>
              </div>
              <p className="text-xs text-[#6E6A63] dark:text-[#A39E96] font-normal">
                {t.expAModalRealItem} <span className="font-bold text-[#292722] dark:text-[#F8F7F3]">{displayName}</span>
              </p>
            </div>
          </div>

          <button
            onClick={closeExperienceA}
            className="p-2 rounded-full hover:bg-[#E9DFD0] dark:hover:bg-[#25221F] text-[#6E6A63] hover:text-[#292722] dark:hover:text-[#F8F7F3] transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Main Body */}
        <div className="p-4 sm:p-6 grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Main Visualizer Area (8 cols) */}
          <div className="lg:col-span-8 flex flex-col space-y-4">
            {/* Visualizer Display */}
            <div className="relative rounded-2xl overflow-hidden bg-[#1C1A17] min-h-[340px] flex items-center justify-center">
              {isProcessing ? (
                <div className="flex flex-col items-center justify-center p-12 text-center text-white">
                  <div className="relative w-16 h-16 mb-4">
                    <div className="absolute inset-0 rounded-full border-2 border-[#B58A54]/20"></div>
                    <div className="absolute inset-0 rounded-full border-2 border-[#B58A54] border-t-transparent animate-spin"></div>
                    <Sparkles className="absolute inset-0 m-auto w-6 h-6 text-[#B58A54] animate-pulse" />
                  </div>
                  <h4 className="text-lg font-bold font-editorial text-[#F8F7F3] mb-1">
                    {isRTL ? 'جاري وضع القطعة داخل غرفتك...' : 'Placing Furniture Into Your Room Space'}
                  </h4>
                  <p className="text-xs text-[#CDBBA5] max-w-sm font-normal">{processingStage}</p>
                </div>
              ) : hasVisualized ? (
                <div className="w-full">
                  <BeforeAfterSlider
                    beforeImage={currentBeforeImage}
                    afterImage={currentAfterImage}
                    beforeLabel={t.expAModalEmptyLabel}
                    afterLabel={t.expAModalPlacedLabel}
                    aspectRatio="aspect-[16/10]"
                  />
                </div>
              ) : null}
            </div>

            {/* Room Source Selector & Upload Box */}
            <div className="p-4 bg-white dark:bg-[#1E1C1A] rounded-2xl border border-[#E8E2D9] dark:border-[#2D2A26] transition-colors">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3">
                <span className="text-xs font-bold text-[#292722] dark:text-[#F8F7F3] uppercase tracking-wider flex items-center gap-1.5">
                  <Upload className="w-3.5 h-3.5 text-[#B58A54]" />
                  <span>{t.expAModalChooseRoom}</span>
                </span>
                <label className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#292722] hover:bg-[#3D3A34] dark:bg-[#F8F7F3] dark:hover:bg-white text-white dark:text-[#292722] text-xs font-bold cursor-pointer transition-colors shadow-sm">
                  <Upload className="w-3.5 h-3.5 text-[#B58A54] dark:text-[#292722]" />
                  <span>{t.expAModalUploadBtn}</span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                </label>
              </div>

              {/* Preset Room Pills */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                {SAMPLE_ROOM_PRESETS.map((preset) => (
                  <button
                    key={preset.id}
                    onClick={() => handleSelectPreset(preset)}
                    className={`flex items-center gap-2.5 p-2 rounded-xl text-left border transition-all cursor-pointer ${
                      activeRoomPreset.id === preset.id && !customUploadedImage
                        ? 'border-[#292722] dark:border-[#F8F7F3] bg-[#E9DFD0] dark:bg-[#2A2621] font-bold'
                        : 'border-[#E8E2D9] dark:border-[#2D2A26] hover:border-[#CDBBA5] bg-white dark:bg-[#1E1C1A]'
                    }`}
                  >
                    <img
                      src={preset.emptyImage}
                      alt={preset.title}
                      className="w-12 h-10 rounded-lg object-cover"
                    />
                    <div className="overflow-hidden">
                      <p className="text-xs font-bold text-[#292722] dark:text-[#F8F7F3] truncate">{preset.title}</p>
                      <p className="text-[10px] text-[#6E6A63] dark:text-[#A39E96]">{preset.dimensions}</p>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Disclaimer badge */}
            <DemoBadge
              variant="card"
              text={isRTL ? 'يعرض هذا النموذج التفاعلي تدفق تجربة "عاين في غرفتك". تحافظ المعاينة على مقاسات الكتالوج ومواد التصنيع الحقيقية.' : 'This interactive demo illustrates the customer\'s \'See It In My Room\' flow. The visualization preserves the retailer\'s actual catalog specifications, materials, and dimensional scale.'}
            />
          </div>

          {/* Product Sidebar Details & Validation (4 cols) */}
          <div className="lg:col-span-4 flex flex-col justify-between bg-white dark:bg-[#1E1C1A] rounded-2xl p-5 border border-[#E8E2D9] dark:border-[#2D2A26] space-y-5 transition-colors">
            <div>
              {/* Product Thumbnail & Identity */}
              <div className="flex items-center gap-3 mb-4 pb-4 border-b border-[#E8E2D9] dark:border-[#2D2A26]">
                <img
                  src={product.image}
                  alt={displayName}
                  className="w-16 h-16 rounded-xl object-cover border border-[#E8E2D9] dark:border-[#2D2A26]"
                />
                <div>
                  <span className="text-[10px] uppercase font-bold text-[#B58A54] tracking-wider block">
                    {displayCollection}
                  </span>
                  <h4 className="font-editorial font-bold text-[#292722] dark:text-[#F8F7F3] text-base leading-snug">
                    {displayName}
                  </h4>
                  <div className="flex items-center gap-1 text-[11px] text-[#6E6A63] dark:text-[#A39E96] mt-0.5">
                    <ShieldCheck className="w-3.5 h-3.5 text-[#B58A54]" />
                    <span dir="ltr">SKU: {product.sku}</span>
                  </div>
                </div>
              </div>

              {/* Price & Availability */}
              <div className="mb-4">
                <span className="text-[10px] text-[#6E6A63] dark:text-[#A39E96] uppercase font-bold tracking-wider block">{t.expAModalPriceLabel}</span>
                <div className="flex items-baseline justify-between">
                  <span className="text-2xl font-bold font-editorial text-[#292722] dark:text-[#F8F7F3]">
                    {formatPrice(product.priceEgp)}
                  </span>
                  <span className="inline-flex items-center gap-1 text-xs font-bold text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 px-2.5 py-0.5 rounded-full">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                    {t.expAModalReadyDelivery}
                  </span>
                </div>
                <p className="text-[11px] text-[#6E6A63] dark:text-[#A39E96] mt-1 flex items-center gap-1">
                  <MapPin className="w-3 h-3 text-[#B58A54]" />
                  {displayLocation}
                </p>
              </div>

              {/* Spatial Clearance & Fit Assessment */}
              <div className="p-3.5 rounded-xl bg-[#F8F7F3] dark:bg-[#121110] border border-[#E8E2D9] dark:border-[#2D2A26] mb-4 space-y-2">
                <div className="flex items-center gap-1.5 text-xs font-bold text-[#292722] dark:text-[#F8F7F3] uppercase tracking-wider">
                  <CheckCircle2 className="w-4 h-4 text-[#B58A54]" />
                  <span>{t.expAModalFitAnalysis}</span>
                </div>
                <div className="text-xs text-[#6E6A63] dark:text-[#A39E96] space-y-1 leading-relaxed">
                  <div className="flex justify-between py-0.5 border-b border-[#E8E2D9] dark:border-[#2D2A26]">
                    <span>{t.expAModalProductWidth}</span>
                    <span className="font-bold text-[#292722] dark:text-[#F8F7F3]" dir="ltr">{product.dimensions.widthCm} cm</span>
                  </div>
                  <div className="flex justify-between py-0.5 border-b border-[#E8E2D9] dark:border-[#2D2A26]">
                    <span>{t.expAModalDepthHeight}</span>
                    <span className="font-bold text-[#292722] dark:text-[#F8F7F3]" dir="ltr">{product.dimensions.depthCm} × {product.dimensions.heightCm} cm</span>
                  </div>
                  <div className="flex justify-between py-0.5">
                    <span>{t.expAModalClearance}</span>
                    <span className="font-bold text-emerald-700 dark:text-emerald-400">✓</span>
                  </div>
                </div>
              </div>

              {/* Material Details */}
              <div className="text-xs text-[#6E6A63] dark:text-[#A39E96] space-y-1.5 mb-4">
                <span className="font-bold text-[#292722] dark:text-[#F8F7F3] block text-[11px] uppercase tracking-wider">{t.expAModalCraftsmanship}</span>
                <p className="leading-relaxed font-normal">{displayMaterial}</p>
              </div>
            </div>

            {/* CTAs */}
            <div className="space-y-2 pt-2 border-t border-[#E8E2D9] dark:border-[#2D2A26]">
              <button
                onClick={() => {
                  addToCart(product);
                  closeExperienceA();
                }}
                className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl bg-[#292722] hover:bg-[#3D3A34] dark:bg-[#F8F7F3] dark:hover:bg-white text-white dark:text-[#292722] text-xs font-bold tracking-wider uppercase transition-all shadow-sm cursor-pointer"
              >
                <ShoppingBag className="w-4 h-4 text-[#B58A54] dark:text-[#292722]" />
                <span>{t.expAModalAddToCart}</span>
              </button>

              <button
                onClick={closeExperienceA}
                className="w-full py-2.5 rounded-xl text-center text-xs font-bold text-[#6E6A63] dark:text-[#A39E96] hover:text-[#292722] dark:hover:text-[#F8F7F3] transition-colors cursor-pointer"
              >
                {t.expAModalContinue}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
