import React, { useState, useEffect } from 'react';
import { useVisualizer } from '../context/VisualizerContext';
import { useCart } from '../context/CartContext';
import { useLanguage } from '../context/LanguageContext';
import { BeforeAfterSlider } from '../components/common/BeforeAfterSlider';
import { DemoBadge } from '../components/common/DemoBadge';
import { ProductCard } from '../components/common/ProductCard';
import { RoomValidationModal } from '../components/experienceB/RoomValidationModal';
import { STYLES, LUXURY_PRODUCTS } from '../data/products';
import { DEFAULT_PRESET_PHOTOS, SAMPLE_ROOM_PRESETS } from '../data/sampleRooms';
import { TEST_VALIDATION_SCENARIOS } from '../utils/roomValidation';
import { generateArchitecturalSpecSheetPdf } from '../utils/pdfGenerator';
import type { RoomStyle, RoomType, UploadedRoomPhoto, DesignProposal, FurnitureProduct } from '../types';
import { 
  Upload, 
  Trash2, 
  Sparkles, 
  CheckCircle2, 
  ArrowRight, 
  ArrowLeft, 
  ShoppingBag, 
  RotateCcw, 
  Check,
  AlertTriangle,
  XCircle,
  Eye,
  Layers,
  Ruler,
  HelpCircle,
  Filter,
  Download
} from 'lucide-react';

export const VisualizerPage: React.FC = () => {
  const {
    roomDesignState,
    setRoomDesignState,
    designResult,
    isGenerating,
    generationStep,
    generationProgress,
    triggerGenerateDesign,
    setQuickViewProduct,
    // Proposals state
    proposals,
    selectedProposalId,
    setSelectedProposalId,
    comparedProposalIds,
    toggleCompareProposal,
    generateMoreProposals,
    isGeneratingMore,
    activeProposalForDetail,
    setActiveProposalForDetail,
    setIsComparisonModalOpen,
    validateUploadedPhoto,
    isValidatingPhoto,
  } = useVisualizer();

  const { addToCart, setIsCartOpen, showToast } = useCart();
  const { t, isRTL, formatPrice } = useLanguage();

  const [currentStep, setCurrentStep] = useState<number>(1);
  const [selectedDiagnosticPhoto, setSelectedDiagnosticPhoto] = useState<UploadedRoomPhoto | null>(null);
  const [proposalStyleFilter, setProposalStyleFilter] = useState<string>('all');
  const [suggestedCategoryTab, setSuggestedCategoryTab] = useState<'all' | 'in-concept' | 'sofas' | 'tables' | 'chairs' | 'storage' | 'lighting' | 'rugs'>('all');
  const [step5ViewMode, setStep5ViewMode] = useState<'all' | 'proposals' | 'standalone-products'>('all');

  // Currently inspected proposal defaults to activeProposalForDetail, or selected proposal, or first proposal
  const currentDetailProposal = 
    activeProposalForDetail || 
    proposals.find((p) => p.id === selectedProposalId) || 
    proposals[0];

  // Validation calculations
  const totalPhotos = roomDesignState.uploadedPhotos.length;
  const isAnalyzingAny = roomDesignState.uploadedPhotos.some((p) => p.validationResult?.status === 'analyzing') || isValidatingPhoto;
  const invalidPhotos = roomDesignState.uploadedPhotos.filter((p) => p.validationResult?.status === 'invalid');
  const uncertainPhotos = roomDesignState.uploadedPhotos.filter((p) => p.validationResult?.status === 'uncertain');
  const validPhotos = roomDesignState.uploadedPhotos.filter(
    (p) => !p.validationResult || p.validationResult.status === 'valid'
  );
  const canProceedStep1 = validPhotos.length > 0 && invalidPhotos.length === 0 && !isAnalyzingAny;

  const SUGGESTED_PROMPTS = [
    {
      title: isRTL ? 'بيج دافئ ومينيمال (٨٠,٠٠٠ ج.م)' : 'Warm Sand Minimalist (80,000 EGP)',
      prompt: isRTL
        ? 'أريد تأثيث غرفة المعيشة بأسلوب مينيمالي حديث. ميزانيتي 80,000 ج.م. أحتاج لكنبة مريحة على شكل حرف L، وحدة تلفزيون، طاولة قهوة، وسجادة. الغرفة 5م × 4م. أفضل درجات البيج الدافئ وألوان الخشب الطبيعي.'
        : 'I want to furnish my living room with a modern minimalist style. My budget is 80,000 EGP. I need a comfortable L-shaped sofa, a TV unit, a coffee table, and a carpet. The room is 5m x 4m. I prefer warm beige and natural wood colors.',
      style: 'Minimalist' as RoomStyle,
      budget: 80000,
      roomType: 'Living Room' as RoomType,
    },
    {
      title: isRTL ? 'صالون معماري مودرن (١٢٠,٠٠٠ ج.م)' : 'Executive Modern Lounge (120,000 EGP)',
      prompt: isRTL
        ? 'تصميم صالون بنتهاوس معماري حديث مع لمسات رخام ستاتوريو الإيطالي، وجلسة منحنية مريحة مع إضاءة نحاسية دافئة. الميزانية 120,000 ج.م.'
        : 'Design a sleek modern architectural penthouse lounge with statuario marble accents, curved statement seating, and warm brass task lighting. Budget 120,000 EGP.',
      style: 'Modern' as RoomStyle,
      budget: 120000,
      roomType: 'Open Penthouse' as RoomType,
    },
    {
      title: isRTL ? 'طعام ومعيشة إسكندنافي (٦٥,٠٠٠ ج.م)' : 'Nordic Calm Dining & Living (65,000 EGP)',
      prompt: isRTL
        ? 'طراز إسكندنافي هادئ يركز على إضاءة النهار الطبيعية وأخشاب البلوط وكراسي السفرة المجدولة بالحبال الدنماركية وأقمشة محايدة مريحة.'
        : 'Scandinavian warm daylight concept with smoked oak textures, Danish cord dining chairs, and serene neutral textiles.',
      style: 'Scandinavian' as RoomStyle,
      budget: 65000,
      roomType: 'Dining Room' as RoomType,
    },
  ];

  const handleApplyPresetPrompt = (preset: typeof SUGGESTED_PROMPTS[0]) => {
    setRoomDesignState((prev) => ({
      ...prev,
      prompt: preset.prompt,
      style: preset.style,
      budgetEgp: preset.budget,
      roomType: preset.roomType,
    }));
    showToast(isRTL ? `تم تطبيق الطلب: ${preset.title}` : `Loaded prompt template: ${preset.title}`);
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const newPhotos: UploadedRoomPhoto[] = Array.from(files).map((file, idx) => ({
        id: `upload-${Date.now()}-${idx}`,
        url: URL.createObjectURL(file),
        angleLabel: idx === 0 ? 'Front Perspective' : 'Corner Angle',
        angleLabelAr: idx === 0 ? 'المنظور الأمامي' : 'زاوية الغرفة',
        isPrimary: roomDesignState.uploadedPhotos.length === 0 && idx === 0,
        validationResult: {
          status: 'analyzing',
          confidenceScore: 0,
          isInterior: false,
          floorPlaneDetected: false,
          lightingScore: 'Optimal',
          obstructionLevel: 'Low',
          title: 'Scanning Room...',
          titleAr: 'جاري فحص الغرفة...',
          message: 'Analyzing floor boundaries & daylight...',
          messageAr: 'جاري قياس زوايا الغرفة والأرضية...',
          details: {
            category: 'Scanning',
            categoryAr: 'جاري الفحص',
            wallsDetected: false,
            roomPerspective: 'Analyzing...',
            roomPerspectiveAr: 'جاري التحليل...',
            suitableFor3D: false,
          },
        },
      }));

      // Append photos immediately with analyzing state
      setRoomDesignState((prev) => ({
        ...prev,
        uploadedPhotos: [...prev.uploadedPhotos, ...newPhotos],
      }));

      showToast(isRTL ? `جاري فحص ${newPhotos.length} صورة بالذكاء الاصطناعي...` : `Running AI spatial validation on ${newPhotos.length} photo(s)...`);

      // Run validation for each newly uploaded image sequentially
      for (let i = 0; i < newPhotos.length; i++) {
        const photo = newPhotos[i];
        const file = files[i];
        await validateUploadedPhoto(photo.id, photo.url, file.name);
      }
    }
  };

  const handleRemovePhoto = (id: string) => {
    setRoomDesignState((prev) => ({
      ...prev,
      uploadedPhotos: prev.uploadedPhotos.filter((p) => p.id !== id),
    }));
  };

  const handleSetPrimaryPhoto = (id: string) => {
    setRoomDesignState((prev) => ({
      ...prev,
      uploadedPhotos: prev.uploadedPhotos.map((p) => ({
        ...p,
        isPrimary: p.id === id,
      })),
    }));
  };

  const handleLoadPresetRoom = (preset: typeof SAMPLE_ROOM_PRESETS[0]) => {
    const photo: UploadedRoomPhoto = {
      id: `preset-${preset.id}`,
      url: preset.emptyImage,
      angleLabel: 'Front Perspective',
      angleLabelAr: 'المنظور الأمامي',
      isPrimary: true,
      dimensionsEstimated: preset.dimensions,
      validationResult: {
        status: 'valid',
        confidenceScore: 98,
        isInterior: true,
        floorPlaneDetected: true,
        lightingScore: 'Optimal',
        obstructionLevel: 'Low',
        title: 'Verified Showroom Space',
        titleAr: 'غرفة معتمدة من الكتالوج',
        message: 'Room image verified. You\'re ready to continue.',
        messageAr: 'تم التحقق من بيئة الغرفة بنجاح. المساحة مهيأة للمتابعة.',
        details: {
          category: 'Residential Living Space',
          categoryAr: 'مساحة سكنية للمعيشة',
          wallsDetected: true,
          roomPerspective: 'Wide Front Perspective (98%)',
          roomPerspectiveAr: 'منظور أمامي واسع (98%)',
          suitableFor3D: true,
        },
      },
    };
    setRoomDesignState((prev) => ({
      ...prev,
      uploadedPhotos: [photo, DEFAULT_PRESET_PHOTOS[1]],
    }));
    showToast(isRTL ? `تم اختيار: ${preset.title}` : `Loaded showroom space: ${preset.title}`);
  };

  const handleTestValidationScenario = async (scenario: typeof TEST_VALIDATION_SCENARIOS[0]) => {
    const photoId = `test-scenario-${Date.now()}`;
    const newPhoto: UploadedRoomPhoto = {
      id: photoId,
      url: scenario.imageUrl,
      angleLabel: 'Front Perspective',
      angleLabelAr: 'المنظور الأمامي',
      isPrimary: roomDesignState.uploadedPhotos.length === 0,
      validationResult: {
        status: 'analyzing',
        confidenceScore: 0,
        isInterior: false,
        floorPlaneDetected: false,
        lightingScore: 'Optimal',
        obstructionLevel: 'Low',
        title: 'Scanning Room...',
        titleAr: 'جاري فحص الغرفة...',
        message: 'Analyzing floor boundaries & daylight...',
        messageAr: 'جاري قياس زوايا الغرفة والأرضية...',
        details: {
          category: 'Scanning',
          categoryAr: 'جاري الفحص',
          wallsDetected: false,
          roomPerspective: 'Analyzing...',
          roomPerspectiveAr: 'جاري التحليل...',
          suitableFor3D: false,
        },
      },
    };

    setRoomDesignState((prev) => ({
      ...prev,
      uploadedPhotos: [...prev.uploadedPhotos, newPhoto],
    }));

    showToast(isRTL ? `جاري فحص: ${scenario.labelAr}` : `AI scanning scenario: ${scenario.label}`);
    const result = await validateUploadedPhoto(photoId, scenario.imageUrl, scenario.id);
    
    // Automatically open diagnostic modal to show user the findings after validation finishes
    setSelectedDiagnosticPhoto({ ...newPhoto, validationResult: result });
  };

  const handleGenerate = async () => {
    setCurrentStep(5);
    await triggerGenerateDesign();
  };

  const handleSelectProposal = (proposal: DesignProposal) => {
    if (selectedProposalId === proposal.id) {
      setSelectedProposalId(null);
      showToast(isRTL ? 'تم إلغاء التحديد. اختر المقترح المفضل لديك.' : 'Deselected. You can choose any proposal.');
    } else {
      setSelectedProposalId(proposal.id);
      setActiveProposalForDetail(proposal);
      showToast(isRTL ? `تم اعتماد: ${proposal.titleAr || proposal.title}` : `Selected: ${proposal.title}`);
    }
  };

  const handleAddProposalToCart = (proposal: DesignProposal) => {
    proposal.selectedProducts.forEach((prod) => {
      addToCart(prod, 1);
    });
    showToast(isRTL ? `تمت إضافة جميع قطع (${proposal.titleAr || proposal.title}) إلى السلة!` : `Added all pieces from ${proposal.title} to your bag!`);
    setIsCartOpen(true);
  };

  const handleDownloadProposalSpecSheet = (proposalToDownload?: DesignProposal) => {
    const targetProposal = proposalToDownload || currentDetailProposal;
    if (!targetProposal) return;

    generateArchitecturalSpecSheetPdf({
      roomType: roomDesignState.roomType,
      dimensions: roomDesignState.dimensions,
      style: targetProposal.style || roomDesignState.style,
      budgetEgp: targetProposal.budgetEgp,
      prompt: roomDesignState.prompt,
      proposal: targetProposal,
      items: targetProposal.selectedProducts.map((p) => ({ product: p, quantity: 1 })),
      subtotalEgp: targetProposal.totalCostEgp,
      totalEgp: targetProposal.totalCostEgp,
      isRTL,
    });
    showToast(isRTL ? 'جاري فتح وتحميل المقايسة المعمارية بتنسيق PDF...' : 'Opening & downloading Architectural Spec Sheet (.PDF)...');
  };

  const stepTitles = [
    t.stepUpload,
    t.stepInfo,
    t.stepStyle,
    t.stepBudgetPrompt,
    t.stepResults,
  ];

  const ArrowNext = isRTL ? ArrowLeft : ArrowRight;
  const ArrowPrev = isRTL ? ArrowRight : ArrowLeft;

  const roomTypesList: { id: RoomType; label: string }[] = [
    { id: 'Living Room', label: isRTL ? 'غرفة المعيشة' : 'Living Room' },
    { id: 'Master Bedroom', label: isRTL ? 'غرفة النوم الرئيسية' : 'Master Bedroom' },
    { id: 'Dining Room', label: isRTL ? 'غرفة الطعام' : 'Dining Room' },
    { id: 'Home Office', label: isRTL ? 'مكتب منزلي' : 'Home Office' },
    { id: 'Open Penthouse', label: isRTL ? 'بنتهاوس مفتوح' : 'Open Penthouse' },
  ];

  const piecesList = isRTL
    ? [
        { en: 'L-Shaped Sofa', ar: 'كنبة زاوية L' },
        { en: 'Coffee Table', ar: 'طاولة قهوة' },
        { en: 'TV / Media Unit', ar: 'وحدة تلفزيون' },
        { en: 'Area Rug', ar: 'سجادة مساحة' },
        { en: 'Accent Armchair', ar: 'كرسي مريح مفرد' },
        { en: 'Architectural Lamp', ar: 'إضاءة أرضية معمارية' },
        { en: 'Side Table', ar: 'طاولة جانبية' },
        { en: 'Dining Table Set', ar: 'طقم طاولة طعام' },
      ]
    : [
        { en: 'L-Shaped Sofa', ar: 'L-Shaped Sofa' },
        { en: 'Coffee Table', ar: 'Coffee Table' },
        { en: 'TV / Media Unit', ar: 'TV / Media Unit' },
        { en: 'Area Rug', ar: 'Area Rug' },
        { en: 'Accent Armchair', ar: 'Accent Armchair' },
        { en: 'Architectural Lamp', ar: 'Architectural Lamp' },
        { en: 'Side Table', ar: 'Side Table' },
        { en: 'Dining Table Set', ar: 'Dining Table Set' },
      ];

  // Filter proposals
  const filteredProposals = proposalStyleFilter === 'all'
    ? proposals
    : proposals.filter((p) => p.style.toLowerCase() === proposalStyleFilter.toLowerCase());

  // Products featured in currently inspected proposal
  const proposalProducts: FurnitureProduct[] = currentDetailProposal
    ? currentDetailProposal.selectedProducts
    : [];

  // Standalone suggested products pool (proposal pieces first, then matching catalog items)
  const allSuggestedProducts: FurnitureProduct[] = [
    ...proposalProducts,
    ...LUXURY_PRODUCTS.filter((p) => !proposalProducts.some((item) => item.id === p.id)),
  ];

  const displayedSuggestedProducts = allSuggestedProducts.filter((p) => {
    if (suggestedCategoryTab === 'all') return true;
    if (suggestedCategoryTab === 'in-concept') {
      return proposalProducts.some((item) => item.id === p.id);
    }
    if (suggestedCategoryTab === 'sofas') return p.category === 'sofas';
    if (suggestedCategoryTab === 'tables') return p.category === 'tables';
    if (suggestedCategoryTab === 'chairs') return p.category === 'chairs';
    if (suggestedCategoryTab === 'storage') return p.category === 'storage';
    if (suggestedCategoryTab === 'lighting') return p.category === 'lighting';
    if (suggestedCategoryTab === 'rugs') return p.category === 'rugs';
    return true;
  });

  return (
    <div className="min-h-screen bg-white dark:bg-[#121110] pt-36 sm:pt-40 lg:pt-44 pb-28 transition-colors">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Header - with guaranteed top clearance from fixed navbar */}
        <div className="text-center max-w-2xl mx-auto mb-10 pt-2 sm:pt-4 space-y-4">
          <DemoBadge
            variant="prominent"
            text={t.visBadge}
            className="mx-auto shadow-sm"
          />
          <h1 className="text-3xl sm:text-5xl font-editorial font-bold text-[#292722] dark:text-[#F8F7F3] tracking-tight">
            {t.visPageTitle}
          </h1>
          <p className="text-xs sm:text-sm text-[#6E6A63] dark:text-[#A39E96] font-normal max-w-lg mx-auto">
            {t.visPageDesc}
          </p>
        </div>

        {/* 5-Step Stepper Progress Bar */}
        <div className="bg-white dark:bg-[#1C1A17] rounded-2xl border border-[#E8E2D9] dark:border-[#2D2A26] p-4 sm:p-5 mb-10 shadow-sm transition-colors">
          <div className="grid grid-cols-5 gap-2 sm:gap-4 text-center">
            {stepTitles.map((title, index) => {
              const stepNumber = index + 1;
              const isPassed = currentStep > stepNumber;
              const isCurrent = currentStep === stepNumber;

              return (
                <button
                  key={title}
                  onClick={() => setCurrentStep(stepNumber)}
                  disabled={isGenerating}
                  className={`flex flex-col items-center gap-1.5 transition-all cursor-pointer ${
                    isCurrent
                      ? 'text-[#292722] dark:text-[#F8F7F3]'
                      : isPassed
                      ? 'text-[#B58A54]'
                      : 'text-[#A39E96] hover:text-[#6E6A63] dark:hover:text-[#D5C1A7]'
                  }`}
                >
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                      isCurrent
                        ? 'bg-[#292722] text-[#F8F7F3] dark:bg-[#F8F7F3] dark:text-[#292722] ring-4 ring-[#B58A54]/20 scale-105'
                        : isPassed
                        ? 'bg-[#B58A54] text-white'
                        : 'bg-[#F8F7F3] dark:bg-[#1E1C1A] border border-[#E8E2D9] dark:border-[#2D2A26] text-[#6E6A63] dark:text-[#A39E96]'
                    }`}
                  >
                    {isPassed ? <Check className="w-4 h-4" /> : stepNumber}
                  </div>
                  <span className="text-[11px] sm:text-xs font-medium truncate max-w-[85px] sm:max-w-none">
                    {title}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* ================= STEP 1: UPLOAD ROOM WITH IMAGE VALIDATION ================= */}
        {currentStep === 1 && (
          <div className="bg-white dark:bg-[#1C1A17] rounded-3xl border border-[#E8E2D9] dark:border-[#2D2A26] p-6 sm:p-8 space-y-8 animate-in fade-in transition-colors">
            <div className="border-b border-[#E8E2D9] dark:border-[#2D2A26] pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h2 className="text-2xl font-editorial font-bold text-[#292722] dark:text-[#F8F7F3]">
                  {t.s1Title}
                </h2>
                <p className="text-xs text-[#6E6A63] dark:text-[#A39E96] mt-1 font-normal">
                  {t.s1Desc}
                </p>
              </div>
              <DemoBadge text={isRTL ? 'فحص تلقائي لمطابقة الغرفة بالذكاء الاصطناعي' : 'Spatial AI Room Verification Active'} />
            </div>

            {/* Validation Callout Alert Banner / Active Scanning State */}
            {isAnalyzingAny ? (
              <div className="p-4 sm:p-5 rounded-2xl bg-[#F8F7F3] dark:bg-[#1E1C1A] border-2 border-[#B58A54] shadow-md flex items-center gap-4 animate-in fade-in transition-all">
                <div className="relative w-12 h-12 rounded-2xl bg-[#292722] text-[#F8F7F3] dark:bg-[#F8F7F3] dark:text-[#292722] flex items-center justify-center shrink-0 shadow-sm">
                  <div className="absolute inset-0 rounded-2xl border-2 border-[#B58A54] border-t-transparent animate-spin"></div>
                  <Sparkles className="w-6 h-6 text-[#B58A54] animate-pulse" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <h4 className="font-bold text-sm text-[#292722] dark:text-[#F8F7F3]">
                      {isRTL ? 'جاري فحص وتحليل صورة الغرفة بالذكاء الاصطناعي...' : 'AI Spatial Vision: Checking Your Room Photo...'}
                    </h4>
                    <span className="px-2 py-0.5 rounded-full bg-[#B58A54]/15 text-[#B58A54] text-[10px] font-bold uppercase tracking-wider animate-pulse">
                      {isRTL ? 'تحليل هندسي مباشر' : 'Active Spatial Scan'}
                    </span>
                  </div>
                  <p className="text-xs text-[#6E6A63] dark:text-[#A39E96] mt-1 font-normal leading-relaxed">
                    {isRTL 
                      ? 'يقوم محرك رومورا الآن بفحص زوايا الغرفة ومستوى استواء الأرضية والتعرف على الجدران ومسارات الضوء الطبيعي لضمان تموضع الأثاث بدقة مليمترية.'
                      : "Roomora's spatial computer vision is currently detecting wall corners, floor plane levelness, daylight exposure, and clearance pathways to ensure millimeter-accurate furniture placement."}
                  </p>

                  {/* Animated Progress Bar */}
                  <div className="mt-2.5 w-full bg-[#E8E2D9] dark:bg-[#2D2A26] rounded-full h-1.5 overflow-hidden">
                    <div className="bg-[#B58A54] h-full rounded-full animate-pulse w-3/4 transition-all duration-500" />
                  </div>
                </div>
              </div>
            ) : invalidPhotos.length > 0 ? (
              <div className="p-4 rounded-2xl bg-rose-50 dark:bg-rose-950/30 border border-rose-300 dark:border-rose-900/60 flex items-start gap-3 text-rose-900 dark:text-rose-200">
                <XCircle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
                <div className="flex-1">
                  <h4 className="font-bold text-sm">
                    {t.valRejectedTitle}
                  </h4>
                  <p className="text-xs mt-1 leading-relaxed opacity-90">
                    {t.valRejectedDesc}
                  </p>
                </div>
              </div>
            ) : uncertainPhotos.length > 0 && validPhotos.length === 0 ? (
              <div className="p-4 rounded-2xl bg-amber-50 dark:bg-amber-950/30 border border-amber-300 dark:border-amber-900/60 flex items-start gap-3 text-amber-900 dark:text-amber-200">
                <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                <div className="flex-1">
                  <h4 className="font-bold text-sm">
                    {t.valUncertainTitle}
                  </h4>
                  <p className="text-xs mt-1 leading-relaxed opacity-90">
                    {t.valUncertainDesc}
                  </p>
                </div>
              </div>
            ) : validPhotos.length > 0 ? (
              <div className="p-4 rounded-2xl bg-emerald-50/70 dark:bg-emerald-950/20 border border-emerald-300 dark:border-emerald-900/60 flex items-start gap-3 text-emerald-900 dark:text-emerald-200">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                <div className="flex-1">
                  <h4 className="font-bold text-sm">
                    {t.valVerifiedTitle}
                  </h4>
                  <p className="text-xs mt-0.5 opacity-90">
                    {t.valVerifiedDesc}
                  </p>
                </div>
              </div>
            ) : null}

            {/* Drag & Drop Upload Zone */}
            <div className="border-2 border-dashed border-[#B58A54]/60 dark:border-[#B58A54]/40 rounded-3xl p-8 sm:p-12 text-center bg-[#F8F7F3]/60 dark:bg-[#1E1C1A]/40 hover:bg-[#F8F7F3] dark:hover:bg-[#24201C] transition-colors relative group">
              <input
                type="file"
                multiple
                accept="image/*"
                onChange={handleFileUpload}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
              />
              <div className="max-w-sm mx-auto space-y-3 pointer-events-none">
                <div className="w-14 h-14 rounded-2xl bg-white dark:bg-[#1C1A17] shadow-sm border border-[#E8E2D9] dark:border-[#2D2A26] flex items-center justify-center mx-auto text-[#B58A54] group-hover:scale-110 transition-transform">
                  <Upload className="w-6 h-6" />
                </div>
                <h3 className="text-base font-bold text-[#292722] dark:text-[#F8F7F3]">
                  {t.s1DragTitle}
                </h3>
                <p className="text-xs text-[#6E6A63] dark:text-[#A39E96] leading-relaxed font-normal">
                  {t.s1DragDesc}
                </p>
                <button
                  type="button"
                  className="px-5 py-2.5 rounded-xl bg-[#292722] dark:bg-[#F8F7F3] text-[#F8F7F3] dark:text-[#292722] text-xs font-bold shadow-sm inline-block"
                >
                  {t.s1BrowseBtn}
                </button>
              </div>
            </div>

            {/* Test Spatial AI Validation Scenarios Strip */}
            <div className="p-4 rounded-2xl bg-[#F8F7F3]/70 dark:bg-[#1E1C1A] border border-[#E8E2D9] dark:border-[#2D2A26] space-y-2.5">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-[#B58A54] flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>{t.valTestScenariosTitle}</span>
                </span>
                <span className="text-[10px] text-[#6E6A63] dark:text-[#A39E96]">
                  {isRTL ? 'اضغط لتجربة حالات الفحص الذكي' : 'Click to test real validation states'}
                </span>
              </div>

              <div className="flex flex-wrap gap-2">
                {TEST_VALIDATION_SCENARIOS.map((sc) => (
                  <button
                    key={sc.id}
                    type="button"
                    onClick={() => handleTestValidationScenario(sc)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer border shadow-2xs ${
                      sc.category === 'valid'
                        ? 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-300 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300 hover:bg-emerald-100'
                        : sc.category === 'invalid'
                        ? 'bg-rose-50 dark:bg-rose-950/40 border-rose-300 dark:border-rose-800 text-rose-800 dark:text-rose-300 hover:bg-rose-100'
                        : 'bg-amber-50 dark:bg-amber-950/40 border-amber-300 dark:border-amber-800 text-amber-800 dark:text-amber-300 hover:bg-amber-100'
                    }`}
                  >
                    {sc.category === 'valid' ? (
                      <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                    ) : sc.category === 'invalid' ? (
                      <XCircle className="w-3 h-3 text-rose-600" />
                    ) : (
                      <AlertTriangle className="w-3 h-3 text-amber-600" />
                    )}
                    <span>{isRTL ? sc.labelAr : sc.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Uploaded Photos List with Intelligent Status Chips */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#292722] dark:text-[#F8F7F3]">
                  {t.s1CurrentAngles} ({roomDesignState.uploadedPhotos.length})
                </h4>
                <span className="text-[11px] text-[#6E6A63] dark:text-[#A39E96]">
                  {t.s1ClickPrimaryHint}
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {roomDesignState.uploadedPhotos.map((photo) => {
                  const val = photo.validationResult;
                  const isAnalyzing = val?.status === 'analyzing';
                  const isValInvalid = val?.status === 'invalid';
                  const isValUncertain = val?.status === 'uncertain';
                  const isValValid = val?.status === 'valid' || (!val && !isAnalyzing);

                  return (
                    <div
                      key={photo.id}
                      className={`relative rounded-2xl overflow-hidden border transition-all p-2.5 bg-[#F8F7F3] dark:bg-[#1E1C1A] group flex flex-col justify-between ${
                        isAnalyzing
                          ? 'border-[#B58A54] ring-2 ring-[#B58A54]/40 animate-pulse'
                          : isValInvalid
                          ? 'border-rose-400 dark:border-rose-800 ring-2 ring-rose-500/20'
                          : photo.isPrimary
                          ? 'border-[#292722] dark:border-[#F8F7F3] shadow-md ring-1 ring-[#B58A54]'
                          : 'border-[#E8E2D9] dark:border-[#2D2A26]'
                      }`}
                    >
                      <div className="relative overflow-hidden rounded-xl">
                        <img
                          src={photo.url}
                          alt="Room view"
                          className="w-full h-36 object-cover cursor-pointer"
                          onClick={() => !isAnalyzing && handleSetPrimaryPhoto(photo.id)}
                        />

                        {/* High-Tech Animated Scanning Overlay & Spinner when checking image */}
                        {isAnalyzing && (
                          <div className="absolute inset-0 bg-black/55 backdrop-blur-[2px] flex flex-col items-center justify-center p-3 text-center z-10">
                            {/* Animated Laser Scan Bar */}
                            <div className="absolute left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#C9A474] to-transparent shadow-[0_0_12px_#C9A474] animate-laser-scan pointer-events-none" />

                            <div className="relative w-10 h-10 mb-2 flex items-center justify-center">
                              <div className="absolute inset-0 rounded-full border-2 border-[#B58A54]/30 border-t-[#B58A54] animate-spin" />
                              <Sparkles className="w-4 h-4 text-[#B58A54] animate-pulse" />
                            </div>
                            <span className="text-[11px] font-bold text-white tracking-wide">
                              {isRTL ? 'جاري فحص أبعاد الغرفة...' : 'Scanning Room Boundaries...'}
                            </span>
                            <span className="text-[9px] text-[#CDBBA5] mt-0.5">
                              {isRTL ? 'التحقق من مستوى الأرضية والجدران' : 'Detecting floor & boundary walls'}
                            </span>
                          </div>
                        )}

                        {/* Status Chip on Image */}
                        <div className="absolute top-2 left-2 right-2 flex items-center justify-between gap-1 pointer-events-none z-20">
                          {isAnalyzing ? (
                            <span className="pointer-events-auto px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider flex items-center gap-1.5 bg-[#B58A54] text-white shadow-sm animate-pulse">
                              <div className="w-2.5 h-2.5 rounded-full border border-white border-t-transparent animate-spin" />
                              <span>{isRTL ? 'جاري الفحص...' : 'AI Checking...'}</span>
                            </span>
                          ) : (
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                setSelectedDiagnosticPhoto(photo);
                              }}
                              className={`pointer-events-auto px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider flex items-center gap-1 backdrop-blur-md shadow-sm transition-transform hover:scale-105 cursor-pointer ${
                                isValValid
                                  ? 'bg-emerald-600/90 text-white'
                                  : isValInvalid
                                  ? 'bg-rose-600/90 text-white'
                                  : 'bg-amber-600/90 text-white'
                              }`}
                            >
                              {isValValid ? (
                                <CheckCircle2 className="w-3 h-3" />
                              ) : isValInvalid ? (
                                <XCircle className="w-3 h-3" />
                              ) : (
                                <AlertTriangle className="w-3 h-3" />
                              )}
                              <span>
                                {isValValid
                                  ? isRTL ? 'معتمد' : 'Verified'
                                  : isValInvalid
                                  ? isRTL ? 'مرفوض' : 'Invalid'
                                  : isRTL ? 'غير مؤكد' : 'Uncertain'}
                              </span>
                            </button>
                          )}

                          {photo.isPrimary && !isAnalyzing && (
                            <span className="px-2 py-0.5 rounded-full bg-[#292722]/90 text-white text-[10px] font-bold">
                              {t.s1PrimaryTag}
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Photo Footer Actions */}
                      <div className="mt-2.5 flex items-center justify-between px-1">
                        <div>
                          <span className="text-xs font-bold text-[#292722] dark:text-[#F8F7F3] block">
                            {isRTL && photo.angleLabelAr ? photo.angleLabelAr : photo.angleLabel}
                          </span>
                          {!isAnalyzing ? (
                            <button
                              type="button"
                              onClick={() => setSelectedDiagnosticPhoto(photo)}
                              className="text-[10px] text-[#B58A54] hover:underline font-bold flex items-center gap-1 mt-0.5 cursor-pointer"
                            >
                              <Eye className="w-2.5 h-2.5" />
                              <span>{t.valInspectDiagnostics}</span>
                            </button>
                          ) : (
                            <span className="text-[10px] text-[#B58A54] font-medium flex items-center gap-1 mt-0.5">
                              <span className="w-1.5 h-1.5 rounded-full bg-[#B58A54] animate-ping" />
                              <span>{isRTL ? 'تحليل مكاني نشط' : 'Active Spatial Scan'}</span>
                            </span>
                          )}
                        </div>

                        <button
                          onClick={() => handleRemovePhoto(photo.id)}
                          disabled={isAnalyzing}
                          className="p-1.5 rounded-lg text-[#A39E96] hover:text-rose-600 hover:bg-white dark:hover:bg-[#1C1A17] transition-colors cursor-pointer disabled:opacity-40"
                          title={isRTL ? 'حذف الصورة' : 'Remove photo'}
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Preloaded Sample Rooms */}
            <div className="p-5 rounded-2xl bg-[#F8F7F3] dark:bg-[#1E1C1A] border border-[#E8E2D9] dark:border-[#2D2A26] space-y-3">
              <span className="text-xs font-bold uppercase tracking-wider text-[#B58A54] dark:text-[#D5C1A7] flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" />
                <span>{t.s1PresetsTitle}</span>
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {SAMPLE_ROOM_PRESETS.map((preset) => (
                  <button
                    key={preset.id}
                    onClick={() => handleLoadPresetRoom(preset)}
                    className="p-2.5 rounded-xl bg-white dark:bg-[#1C1A17] border border-[#E8E2D9] dark:border-[#2D2A26] hover:border-[#B58A54] text-left transition-all cursor-pointer flex items-center gap-3"
                  >
                    <img
                      src={preset.emptyImage}
                      alt={preset.title}
                      className="w-12 h-12 rounded-lg object-cover bg-stone-100 shrink-0"
                    />
                    <div className="min-w-0">
                      <p className="text-xs font-bold text-[#292722] dark:text-[#F8F7F3] truncate">
                        {preset.title}
                      </p>
                      <p className="text-[11px] text-[#6E6A63] dark:text-[#A39E96] truncate mt-0.5">
                        {preset.dimensions} · {preset.style}
                      </p>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Step 1 Actions */}
            <div className="flex justify-end pt-4 border-t border-[#E8E2D9] dark:border-[#2D2A26]">
              <button
                onClick={() => setCurrentStep(2)}
                disabled={!canProceedStep1}
                className="px-8 py-3.5 rounded-xl bg-[#292722] hover:bg-[#3D3A34] dark:bg-[#F8F7F3] dark:hover:bg-white text-[#F8F7F3] dark:text-[#292722] text-xs font-bold uppercase tracking-wider flex items-center gap-2 cursor-pointer shadow-sm transition-all disabled:opacity-40 disabled:cursor-not-allowed"
              >
                <span>{t.s1NextBtn}</span>
                <ArrowNext className="w-4 h-4 text-[#B58A54] dark:text-[#292722]" />
              </button>
            </div>
          </div>
        )}

        {/* ================= STEP 2: ROOM INFORMATION ================= */}
        {currentStep === 2 && (
          <div className="bg-white dark:bg-[#1C1A17] rounded-3xl border border-[#E8E2D9] dark:border-[#2D2A26] p-6 sm:p-8 space-y-8 animate-in fade-in transition-colors">
            <div className="border-b border-[#E8E2D9] dark:border-[#2D2A26] pb-4">
              <h2 className="text-2xl font-editorial font-bold text-[#292722] dark:text-[#F8F7F3]">
                {t.s2Title}
              </h2>
              <p className="text-xs text-[#6E6A63] dark:text-[#A39E96] mt-1 font-normal">
                {t.s2Desc}
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {/* Room Type Selector */}
              <div className="sm:col-span-2">
                <label className="text-xs font-bold uppercase tracking-wider text-[#292722] dark:text-[#F8F7F3] block mb-2">
                  {t.s2RoomTypeLabel}
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5">
                  {roomTypesList.map((type) => {
                    const isSelected = roomDesignState.roomType === type.id;
                    return (
                      <button
                        key={type.id}
                        type="button"
                        onClick={() => setRoomDesignState((prev) => ({ ...prev, roomType: type.id }))}
                        className={`p-3 rounded-xl border text-xs font-bold transition-all cursor-pointer text-center ${
                          isSelected
                            ? 'border-[#292722] dark:border-[#F8F7F3] bg-[#F8F7F3] dark:bg-[#1E1C1A] text-[#292722] dark:text-[#F8F7F3] shadow-sm'
                            : 'border-[#E8E2D9] dark:border-[#2D2A26] bg-white dark:bg-[#1C1A17] text-[#6E6A63] dark:text-[#A39E96] hover:bg-[#F8F7F3]/60'
                        }`}
                      >
                        {type.label}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Width */}
              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-[#292722] dark:text-[#F8F7F3] block mb-1.5">
                  {t.s2WidthLabel}
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    step="0.1"
                    min="2"
                    max="15"
                    value={roomDesignState.dimensions.widthM}
                    onChange={(e) =>
                      setRoomDesignState((prev) => ({
                        ...prev,
                        dimensions: { ...prev.dimensions, widthM: parseFloat(e.target.value) || 0 },
                      }))
                    }
                    className="w-full px-4 py-2.5 rounded-xl border border-[#E8E2D9] dark:border-[#2D2A26] bg-[#F8F7F3] dark:bg-[#121110] text-sm text-[#292722] dark:text-[#F8F7F3] focus:outline-none focus:ring-2 focus:ring-[#B58A54]"
                  />
                  <span className="text-xs font-bold text-[#6E6A63] dark:text-[#A39E96]">m</span>
                </div>
              </div>

              {/* Length */}
              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-[#292722] dark:text-[#F8F7F3] block mb-1.5">
                  {t.s2LengthLabel}
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    step="0.1"
                    min="2"
                    max="15"
                    value={roomDesignState.dimensions.lengthM}
                    onChange={(e) =>
                      setRoomDesignState((prev) => ({
                        ...prev,
                        dimensions: { ...prev.dimensions, lengthM: parseFloat(e.target.value) || 0 },
                      }))
                    }
                    className="w-full px-4 py-2.5 rounded-xl border border-[#E8E2D9] dark:border-[#2D2A26] bg-[#F8F7F3] dark:bg-[#121110] text-sm text-[#292722] dark:text-[#F8F7F3] focus:outline-none focus:ring-2 focus:ring-[#B58A54]"
                  />
                  <span className="text-xs font-bold text-[#6E6A63] dark:text-[#A39E96]">m</span>
                </div>
              </div>

              {/* Height */}
              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-[#292722] dark:text-[#F8F7F3] block mb-1.5">
                  {t.s2HeightLabel}
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    step="0.05"
                    min="2.2"
                    max="5.0"
                    value={roomDesignState.dimensions.heightM}
                    onChange={(e) =>
                      setRoomDesignState((prev) => ({
                        ...prev,
                        dimensions: { ...prev.dimensions, heightM: parseFloat(e.target.value) || 0 },
                      }))
                    }
                    className="w-full px-4 py-2.5 rounded-xl border border-[#E8E2D9] dark:border-[#2D2A26] bg-[#F8F7F3] dark:bg-[#121110] text-sm text-[#292722] dark:text-[#F8F7F3] focus:outline-none focus:ring-2 focus:ring-[#B58A54]"
                  />
                  <span className="text-xs font-bold text-[#6E6A63] dark:text-[#A39E96]">m</span>
                </div>
                <span className="text-[10px] text-[#A39E96] block mt-1">
                  {t.s2StandardHeightNote}
                </span>
              </div>

              {/* Doors count */}
              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-[#292722] dark:text-[#F8F7F3] block mb-1.5">
                  {t.s2DoorsLabel}
                </label>
                <div className="flex items-center gap-3">
                  {[1, 2, 3, 4].map((num) => (
                    <button
                      key={num}
                      type="button"
                      onClick={() => setRoomDesignState((prev) => ({ ...prev, doorsCount: num }))}
                      className={`w-11 h-11 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                        roomDesignState.doorsCount === num
                          ? 'bg-[#292722] text-[#F8F7F3] dark:bg-[#F8F7F3] dark:text-[#292722] border-[#292722]'
                          : 'bg-[#F8F7F3] dark:bg-[#121110] text-[#6E6A63] dark:text-[#A39E96] border-[#E8E2D9] dark:border-[#2D2A26]'
                      }`}
                    >
                      {num}
                    </button>
                  ))}
                </div>
                <span className="text-[10px] text-[#A39E96] block mt-1">
                  {t.s2DoorsSub}
                </span>
              </div>
            </div>

            {/* Stepper Navigation */}
            <div className="flex justify-between pt-4 border-t border-[#E8E2D9] dark:border-[#2D2A26]">
              <button
                onClick={() => setCurrentStep(1)}
                className="px-5 py-2.5 rounded-xl border border-[#E8E2D9] dark:border-[#2D2A26] text-xs font-bold text-[#292722] dark:text-[#F8F7F3] hover:bg-[#F8F7F3] dark:hover:bg-[#24201C] cursor-pointer flex items-center gap-2 transition-colors"
              >
                <ArrowPrev className="w-4 h-4" />
                <span>{t.s2BackBtn}</span>
              </button>
              <button
                onClick={() => setCurrentStep(3)}
                className="px-7 py-3 rounded-xl bg-[#292722] hover:bg-[#3D3A34] dark:bg-[#F8F7F3] dark:hover:bg-white text-[#F8F7F3] dark:text-[#292722] text-xs font-bold uppercase tracking-wider flex items-center gap-2 cursor-pointer shadow-sm transition-all"
              >
                <span>{t.s2NextBtn}</span>
                <ArrowNext className="w-4 h-4 text-[#B58A54] dark:text-[#292722]" />
              </button>
            </div>
          </div>
        )}

        {/* ================= STEP 3: PREFERRED STYLE ================= */}
        {currentStep === 3 && (
          <div className="bg-white dark:bg-[#1C1A17] rounded-3xl border border-[#E8E2D9] dark:border-[#2D2A26] p-6 sm:p-8 space-y-8 animate-in fade-in transition-colors">
            <div className="border-b border-[#E8E2D9] dark:border-[#2D2A26] pb-4">
              <h2 className="text-2xl font-editorial font-bold text-[#292722] dark:text-[#F8F7F3]">
                {t.s3Title}
              </h2>
              <p className="text-xs text-[#6E6A63] dark:text-[#A39E96] mt-1 font-normal">
                {t.s3Desc}
              </p>
            </div>

            {/* Image-Based Style Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {STYLES.map((style) => {
                const isSelected = roomDesignState.style === style.id;
                const label = isRTL ? style.labelAr : style.label;
                const desc = isRTL ? style.descAr : style.desc;
                return (
                  <div
                    key={style.id}
                    onClick={() => setRoomDesignState((prev) => ({ ...prev, style: style.id }))}
                    className={`group relative rounded-2xl overflow-hidden border transition-all cursor-pointer ${
                      isSelected
                        ? 'border-[#292722] dark:border-[#F8F7F3] shadow-lg ring-1 ring-[#B58A54] scale-[1.01]'
                        : 'border-[#E8E2D9] dark:border-[#2D2A26] hover:border-[#B58A54]'
                    }`}
                  >
                    <div className="aspect-[4/3] w-full overflow-hidden bg-[#F8F7F3] dark:bg-[#1E1C1A]">
                      <img
                        src={style.image}
                        alt={label}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                    </div>
                    <div className="p-4 bg-white dark:bg-[#1C1A17]">
                      <div className="flex items-center justify-between mb-1">
                        <h3 className="font-editorial font-bold text-base text-[#292722] dark:text-[#F8F7F3]">
                          {label}
                        </h3>
                        {isSelected && (
                          <span className="w-5 h-5 rounded-full bg-[#292722] dark:bg-[#F8F7F3] text-[#F8F7F3] dark:text-[#292722] flex items-center justify-center">
                            <Check className="w-3.5 h-3.5" />
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-[#6E6A63] dark:text-[#A39E96] leading-relaxed font-normal">{desc}</p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Stepper Navigation */}
            <div className="flex justify-between pt-4 border-t border-[#E8E2D9] dark:border-[#2D2A26]">
              <button
                onClick={() => setCurrentStep(2)}
                className="px-5 py-2.5 rounded-xl border border-[#E8E2D9] dark:border-[#2D2A26] text-xs font-bold text-[#292722] dark:text-[#F8F7F3] hover:bg-[#F8F7F3] dark:hover:bg-[#24201C] cursor-pointer flex items-center gap-2 transition-colors"
              >
                <ArrowPrev className="w-4 h-4" />
                <span>{t.s3BackBtn}</span>
              </button>
              <button
                onClick={() => setCurrentStep(4)}
                className="px-7 py-3 rounded-xl bg-[#292722] hover:bg-[#3D3A34] dark:bg-[#F8F7F3] dark:hover:bg-white text-[#F8F7F3] dark:text-[#292722] text-xs font-bold uppercase tracking-wider flex items-center gap-2 cursor-pointer shadow-sm transition-all"
              >
                <span>{t.s3NextBtn}</span>
                <ArrowNext className="w-4 h-4 text-[#B58A54] dark:text-[#292722]" />
              </button>
            </div>
          </div>
        )}

        {/* ================= STEP 4: BUDGET & PROMPT ================= */}
        {currentStep === 4 && (
          <div className="bg-white dark:bg-[#1C1A17] rounded-3xl border border-[#E8E2D9] dark:border-[#2D2A26] p-6 sm:p-8 space-y-8 animate-in fade-in transition-colors">
            <div className="border-b border-[#E8E2D9] dark:border-[#2D2A26] pb-4">
              <h2 className="text-2xl font-editorial font-bold text-[#292722] dark:text-[#F8F7F3]">
                {t.s4Title}
              </h2>
              <p className="text-xs text-[#6E6A63] dark:text-[#A39E96] mt-1 font-normal">
                {t.s4Desc}
              </p>
            </div>

            {/* Suggested Prompt Presets Pills */}
            <div className="space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-[#B58A54] dark:text-[#D5C1A7] flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" />
                <span>{t.s4SuggestedPills}</span>
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {SUGGESTED_PROMPTS.map((preset) => (
                  <button
                    key={preset.title}
                    type="button"
                    onClick={() => handleApplyPresetPrompt(preset)}
                    className="p-3 rounded-xl bg-[#F8F7F3] dark:bg-[#1E1C1A] hover:bg-[#DDD0BE] dark:hover:bg-[#2A2622] border border-[#E8E2D9] dark:border-[#2D2A26] text-left transition-all cursor-pointer"
                  >
                    <p className="text-xs font-bold text-[#292722] dark:text-[#F8F7F3]">{preset.title}</p>
                    <p className="text-[11px] text-[#6E6A63] dark:text-[#A39E96] line-clamp-1 mt-0.5 font-normal">{preset.prompt}</p>
                  </button>
                ))}
              </div>
            </div>

            {/* Natural Language Prompt Area */}
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider text-[#292722] dark:text-[#F8F7F3] block">
                {t.s4PromptLabel}
              </label>
              <textarea
                rows={4}
                value={roomDesignState.prompt}
                onChange={(e) => setRoomDesignState((prev) => ({ ...prev, prompt: e.target.value }))}
                placeholder={t.s4PromptPlaceholder}
                className="w-full p-4 rounded-2xl border border-[#E8E2D9] dark:border-[#2D2A26] bg-[#F8F7F3] dark:bg-[#121110] text-sm text-[#292722] dark:text-[#F8F7F3] focus:outline-none focus:ring-2 focus:ring-[#B58A54] leading-relaxed font-normal"
              />
            </div>

            {/* Budget Slider & Input in EGP */}
            <div className="p-6 rounded-2xl bg-[#F8F7F3] dark:bg-[#1E1C1A] border border-[#E8E2D9] dark:border-[#2D2A26] space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <label className="text-xs font-bold uppercase tracking-wider text-[#292722] dark:text-[#F8F7F3] block">
                    {t.s4BudgetLabel}
                  </label>
                  <p className="text-[11px] text-[#6E6A63] dark:text-[#A39E96]">
                    {t.s4BudgetSub}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-2xl font-bold font-editorial text-[#292722] dark:text-[#F8F7F3]">
                    {formatPrice(roomDesignState.budgetEgp)}
                  </span>
                </div>
              </div>

              <input
                type="range"
                min="35000"
                max="250000"
                step="5000"
                value={roomDesignState.budgetEgp}
                onChange={(e) =>
                  setRoomDesignState((prev) => ({ ...prev, budgetEgp: parseInt(e.target.value) }))
                }
                className="w-full accent-[#292722] dark:accent-[#B58A54] cursor-pointer"
              />

              {/* Quick Budget Pills */}
              <div className="flex flex-wrap gap-2 pt-1">
                {[50000, 80000, 120000, 160000, 200000].map((b) => (
                  <button
                    key={b}
                    type="button"
                    onClick={() => setRoomDesignState((prev) => ({ ...prev, budgetEgp: b }))}
                    className={`px-3 py-1 rounded-lg text-xs font-bold cursor-pointer transition-all ${
                      roomDesignState.budgetEgp === b
                        ? 'bg-[#292722] text-[#F8F7F3] dark:bg-[#F8F7F3] dark:text-[#292722] shadow-sm'
                        : 'bg-white dark:bg-[#1C1A17] border border-[#E8E2D9] dark:border-[#2D2A26] text-[#6E6A63] dark:text-[#A39E96] hover:bg-[#DDD0BE] dark:hover:bg-[#2A2622]'
                    }`}
                  >
                    {formatPrice(b)}
                  </button>
                ))}
              </div>
            </div>

            {/* Required Pieces Checklist */}
            <div className="space-y-3">
              <label className="text-xs font-bold uppercase tracking-wider text-[#292722] dark:text-[#F8F7F3] block">
                {t.s4RequiredPieces}
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                {piecesList.map((item) => {
                  const isChecked = roomDesignState.requiredPieces.includes(item.en);
                  return (
                    <button
                      key={item.en}
                      type="button"
                      onClick={() => {
                        setRoomDesignState((prev) => ({
                          ...prev,
                          requiredPieces: isChecked
                            ? prev.requiredPieces.filter((p) => p !== item.en)
                            : [...prev.requiredPieces, item.en],
                        }));
                      }}
                      className={`p-3 rounded-xl border text-xs flex items-center justify-between transition-all cursor-pointer ${
                        isChecked
                          ? 'border-[#292722] dark:border-[#F8F7F3] bg-[#F8F7F3] dark:bg-[#1E1C1A] text-[#292722] dark:text-[#F8F7F3] font-bold'
                          : 'border-[#E8E2D9] dark:border-[#2D2A26] bg-white dark:bg-[#1C1A17] text-[#6E6A63] dark:text-[#A39E96]'
                      }`}
                    >
                      <span>{isRTL ? item.ar : item.en}</span>
                      {isChecked && <Check className="w-3.5 h-3.5 text-[#B58A54]" />}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Stepper Navigation */}
            <div className="flex justify-between pt-4 border-t border-[#E8E2D9] dark:border-[#2D2A26]">
              <button
                onClick={() => setCurrentStep(3)}
                className="px-5 py-2.5 rounded-xl border border-[#E8E2D9] dark:border-[#2D2A26] text-xs font-bold text-[#292722] dark:text-[#F8F7F3] hover:bg-[#F8F7F3] dark:hover:bg-[#24201C] cursor-pointer flex items-center gap-2 transition-colors"
              >
                <ArrowPrev className="w-4 h-4" />
                <span>{t.s4BackBtn}</span>
              </button>

              <button
                onClick={handleGenerate}
                className="px-8 py-3.5 rounded-xl bg-[#292722] hover:bg-[#3D3A34] dark:bg-[#F8F7F3] dark:hover:bg-white text-[#F8F7F3] dark:text-[#292722] text-xs font-bold uppercase tracking-wider flex items-center gap-2.5 shadow-lg cursor-pointer group transition-all"
              >
                <Sparkles className="w-4 h-4 text-[#B58A54] dark:text-[#292722] group-hover:rotate-12 transition-transform" />
                <span>{t.s4GenerateBtn}</span>
              </button>
            </div>
          </div>
        )}

        {/* ================= STEP 5: MULTIPLE AI DESIGN PROPOSALS (USER CONTROLS SELECTION) ================= */}
        {currentStep === 5 && (
          <div className="space-y-10 animate-in fade-in">
            {/* Generating State Overlay */}
            {isGenerating ? (
              <div className="bg-white dark:bg-[#1C1A17] rounded-3xl border border-[#E8E2D9] dark:border-[#2D2A26] p-12 text-center space-y-6 shadow-sm transition-colors">
                <div className="relative w-20 h-20 mx-auto">
                  <div className="absolute inset-0 rounded-full border-4 border-[#B58A54]/20"></div>
                  <div className="absolute inset-0 rounded-full border-4 border-[#292722] dark:border-[#F8F7F3] border-t-transparent animate-spin"></div>
                  <Sparkles className="absolute inset-0 m-auto w-8 h-8 text-[#B58A54] animate-pulse" />
                </div>

                <div className="space-y-2">
                  <h3 className="text-2xl font-editorial font-bold text-[#292722] dark:text-[#F8F7F3]">
                    {t.s5GenTitle}
                  </h3>
                  <p className="text-xs text-[#6E6A63] dark:text-[#A39E96] max-w-md mx-auto font-normal">
                    {isRTL
                      ? (generationStep === 1 ? 'المرحلة 1/4: تحليل أبعاد الجدران والأرضية وزوايا الضوء الطبيعي...' :
                         generationStep === 2 ? `المرحلة 2/4: مطابقة قطع الكتالوج لمقترحات متعددة تحت ميزانية ${formatPrice(roomDesignState.budgetEgp)}...` :
                         generationStep === 3 ? 'المرحلة 3/4: حساب مسارات الحركة والمقاسات ومسافة الأبواب...' :
                         'المرحلة 4/4: صياغة مفاهيم ديكور متعددة للمقارنة دون فرض اختيار مسبق...')
                      : (generationStep === 1 ? 'Step 1/4: Segmenting walls, floors, and daylight vectors from uploaded photo...' :
                         generationStep === 2 ? `Step 2/4: Querying showroom catalog for multiple concepts under ${roomDesignState.budgetEgp.toLocaleString()} EGP...` :
                         generationStep === 3 ? 'Step 3/4: Calculating spatial clearances and pathway traffic flow (1.1m standard)...' :
                         'Step 4/4: Formulating multiple distinct design proposals without imposing default selections...')}
                  </p>
                </div>

                {/* Progress bar */}
                <div className="w-full max-w-md mx-auto bg-[#F8F7F3] dark:bg-[#1E1C1A] rounded-full h-2 overflow-hidden border border-[#E8E2D9] dark:border-[#2D2A26]">
                  <div
                    className="bg-[#292722] dark:bg-[#F8F7F3] h-full transition-all duration-300 rounded-full"
                    style={{ width: `${generationProgress}%` }}
                  ></div>
                </div>

                <DemoBadge
                  variant="card"
                  text={isRTL ? 'توليد متعدد المقترحات: يمنح العميل التحكم التام في استكشاف ومقارنة عدة بدائل قبل اعتماد التصميم.' : 'Generating distinct design directions. Roomora never auto-selects; you maintain complete choice.'}
                  className="max-w-md mx-auto"
                />
              </div>
            ) : (
              <div className="space-y-10">
                {/* Proposal Deck Editorial Header */}
                <div className="bg-white dark:bg-[#1C1A17] rounded-3xl border border-[#E8E2D9] dark:border-[#2D2A26] p-6 sm:p-8 shadow-sm transition-colors space-y-4">
                  <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                    <div className="space-y-1">
                      <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#B58A54] block">
                        {t.propGridEyebrow}
                      </span>
                      <h2 className="text-2xl sm:text-3xl font-editorial font-bold text-[#292722] dark:text-[#F8F7F3]">
                        {t.propGridTitle} ({proposals.length})
                      </h2>
                      <p className="text-xs text-[#6E6A63] dark:text-[#A39E96] max-w-2xl font-normal leading-relaxed">
                        {t.propGridDesc}
                      </p>
                    </div>

                    {/* Toolbar Actions: Compare & Generate More */}
                    <div className="flex flex-wrap items-center gap-3">
                      <button
                        onClick={() => setIsComparisonModalOpen(true)}
                        className={`px-4 py-2.5 rounded-xl border text-xs font-bold flex items-center gap-2 cursor-pointer transition-all shadow-xs ${
                          comparedProposalIds.length >= 2
                            ? 'bg-[#B58A54] text-white border-[#B58A54] animate-pulse'
                            : 'bg-[#F8F7F3] dark:bg-[#1E1C1A] border-[#E8E2D9] dark:border-[#2D2A26] text-[#292722] dark:text-[#F8F7F3] hover:bg-[#DDD0BE]'
                        }`}
                      >
                        <Layers className="w-4 h-4" />
                        <span>
                          {isRTL
                            ? comparedProposalIds.length > 0
                              ? `مقارنة المحددة (${comparedProposalIds.length})`
                              : 'مقارنة المقترحات'
                            : comparedProposalIds.length > 0
                            ? `Compare Selected (${comparedProposalIds.length})`
                            : 'Compare Proposals'}
                        </span>
                      </button>

                      <button
                        onClick={generateMoreProposals}
                        disabled={isGeneratingMore}
                        className="px-5 py-2.5 rounded-xl bg-[#292722] hover:bg-[#3D3A34] dark:bg-[#F8F7F3] dark:hover:bg-white text-[#F8F7F3] dark:text-[#292722] text-xs font-bold uppercase tracking-wider flex items-center gap-2 shadow-sm cursor-pointer transition-all disabled:opacity-50"
                      >
                        <Sparkles className={`w-4 h-4 text-[#B58A54] ${isGeneratingMore ? 'animate-spin' : ''}`} />
                        <span>{isGeneratingMore ? (isRTL ? 'جاري التوليد...' : 'Generating...') : t.propGenerateMoreBtn}</span>
                      </button>
                    </div>
                  </div>

                  {/* View Mode Switcher + Filter Pills */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-3 border-t border-[#E8E2D9] dark:border-[#2D2A26]">
                    {/* View mode toggle */}
                    <div className="inline-flex p-1 rounded-xl bg-[#F8F7F3] dark:bg-[#1E1C1A] border border-[#E8E2D9] dark:border-[#2D2A26] self-start sm:self-auto">
                      <button
                        onClick={() => setStep5ViewMode('all')}
                        className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                          step5ViewMode === 'all'
                            ? 'bg-white dark:bg-[#1C1A17] text-[#292722] dark:text-[#F8F7F3] shadow-xs'
                            : 'text-[#6E6A63] dark:text-[#A39E96] hover:text-[#292722]'
                        }`}
                      >
                        {isRTL ? 'عرض الكل' : 'Show All'}
                      </button>
                      <button
                        onClick={() => setStep5ViewMode('proposals')}
                        className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                          step5ViewMode === 'proposals'
                            ? 'bg-white dark:bg-[#1C1A17] text-[#292722] dark:text-[#F8F7F3] shadow-xs'
                            : 'text-[#6E6A63] dark:text-[#A39E96] hover:text-[#292722]'
                        }`}
                      >
                        {isRTL ? `المقترحات الكاملة (${proposals.length})` : `Room Concepts (${proposals.length})`}
                      </button>
                      <button
                        onClick={() => setStep5ViewMode('standalone-products')}
                        className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                          step5ViewMode === 'standalone-products'
                            ? 'bg-white dark:bg-[#1C1A17] text-[#292722] dark:text-[#F8F7F3] shadow-xs'
                            : 'text-[#6E6A63] dark:text-[#A39E96] hover:text-[#292722]'
                        }`}
                      >
                        <span>{isRTL ? 'المنتجات المقترحة منفردة' : 'Suggested Products Alone'}</span>
                        <span className="px-1.5 py-0.2 rounded-full bg-[#B58A54] text-white text-[10px] font-bold">
                          {allSuggestedProducts.length}
                        </span>
                      </button>
                    </div>

                    {/* Filter Pills */}
                    {(step5ViewMode === 'all' || step5ViewMode === 'proposals') && (
                      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
                        <span className="text-xs text-[#6E6A63] dark:text-[#A39E96] font-medium flex items-center gap-1 shrink-0">
                          <Filter className="w-3.5 h-3.5" />
                          <span>{isRTL ? 'الطراز:' : 'Style:'}</span>
                        </span>
                        {['all', 'Minimalist', 'Modern', 'Scandinavian', 'Contemporary', 'Classic'].map((st) => (
                          <button
                            key={st}
                            onClick={() => setProposalStyleFilter(st)}
                            className={`px-2.5 py-1 rounded-lg text-xs font-bold cursor-pointer transition-all shrink-0 ${
                              proposalStyleFilter === st
                                ? 'bg-[#292722] text-[#F8F7F3] dark:bg-[#F8F7F3] dark:text-[#292722]'
                                : 'bg-[#F8F7F3]/90 dark:bg-[#1E1C1A] text-[#6E6A63] dark:text-[#A39E96] hover:bg-[#DDD0BE]'
                            }`}
                          >
                            {st === 'all' ? (isRTL ? 'الكل' : 'All') : st}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                {/* Multiple Proposals Editorial Grid */}
                {(step5ViewMode === 'all' || step5ViewMode === 'proposals') && (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {filteredProposals.map((proposal) => {
                    const isSelected = selectedProposalId === proposal.id;
                    const isCompared = comparedProposalIds.includes(proposal.id);
                    const isInspected = currentDetailProposal?.id === proposal.id;
                    const remainingBudget = proposal.budgetEgp - proposal.totalCostEgp;
                    const title = isRTL ? proposal.titleAr : proposal.title;
                    const conceptTag = isRTL ? proposal.conceptTagAr : proposal.conceptTag;
                    const style = isRTL ? proposal.styleAr : proposal.style;

                    return (
                      <div
                        key={proposal.id}
                        className={`rounded-3xl border transition-all flex flex-col bg-white dark:bg-[#1C1A17] overflow-hidden group shadow-sm hover:shadow-md ${
                          isSelected
                            ? 'border-[#B58A54] ring-2 ring-[#B58A54] scale-[1.01]'
                            : isInspected
                            ? 'border-[#292722] dark:border-[#F8F7F3]'
                            : 'border-[#E8E2D9] dark:border-[#2D2A26] hover:border-[#B58A54]'
                        }`}
                      >
                        {/* Image Preview with Badges */}
                        <div className="relative aspect-[4/3] overflow-hidden bg-[#F8F7F3] dark:bg-[#1E1C1A]">
                          <img
                            src={proposal.previewImageUrl}
                            alt={title}
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                          />
                          <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
                            <span className="px-2.5 py-1 rounded-md bg-[#292722]/90 text-[#F8F7F3] text-[10px] font-bold uppercase tracking-wider backdrop-blur-sm">
                              {proposal.code} · {style}
                            </span>
                            {isSelected && (
                              <span className="px-2.5 py-1 rounded-full bg-[#B58A54] text-white text-[10px] font-bold flex items-center gap-1 shadow-sm">
                                <Check className="w-3 h-3" />
                                <span>{isRTL ? 'معتمد' : 'Selected'}</span>
                              </span>
                            )}
                          </div>

                          {/* Quick Inspect Button on Image */}
                          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center p-4">
                            <button
                              onClick={() => setActiveProposalForDetail(proposal)}
                              className="px-4 py-2 rounded-xl bg-white/95 text-[#292722] text-xs font-bold shadow-lg flex items-center gap-1.5 cursor-pointer transform translate-y-2 group-hover:translate-y-0 transition-transform"
                            >
                              <Eye className="w-3.5 h-3.5 text-[#B58A54]" />
                              <span>{t.propInspectBtn}</span>
                            </button>
                          </div>
                        </div>

                        {/* Card Content */}
                        <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                          <div className="space-y-3">
                            {/* Title & Tag */}
                            <div>
                              <h3 className="text-base font-editorial font-bold text-[#292722] dark:text-[#F8F7F3] line-clamp-1">
                                {title}
                              </h3>
                              <p className="text-[11px] text-[#B58A54] font-bold uppercase tracking-wider line-clamp-1 mt-0.5">
                                {conceptTag}
                              </p>
                            </div>

                            {/* Color Palette Swatches */}
                            <div className="flex items-center gap-1.5">
                              {proposal.palette.map((c) => (
                                <div
                                  key={c.name}
                                  className="w-4 h-4 rounded-full border border-black/10 dark:border-white/10"
                                  style={{ backgroundColor: c.hex }}
                                  title={isRTL ? c.nameAr : c.name}
                                />
                              ))}
                              <span className="text-[10px] text-[#6E6A63] dark:text-[#A39E96] ml-1">
                                {proposal.spaceUtilizationScore}% Space Score
                              </span>
                            </div>

                            {/* Price / Budget breakdown */}
                            <div className="p-3 rounded-xl bg-[#F8F7F3]/80 dark:bg-[#1E1C1A] border border-[#E8E2D9] dark:border-[#2D2A26]">
                              <div className="flex justify-between items-baseline text-xs">
                                <span className="text-[#6E6A63] dark:text-[#A39E96] font-medium">
                                  {isRTL ? 'إجمالي التأثيث:' : 'Total Cost:'}
                                </span>
                                <span className="font-bold text-sm text-[#292722] dark:text-[#F8F7F3]">
                                  {formatPrice(proposal.totalCostEgp)}
                                </span>
                              </div>
                              <div className="flex justify-between items-center text-[11px] pt-1 mt-1 border-t border-[#E8E2D9]/60 dark:border-[#2D2A26]">
                                <span className="text-[#6E6A63] dark:text-[#A39E96]">
                                  {isRTL ? 'وفر الميزانية:' : 'Under Budget:'}
                                </span>
                                <span className="font-bold text-emerald-700 dark:text-emerald-400">
                                  +{formatPrice(remainingBudget)}
                                </span>
                              </div>
                            </div>

                            {/* Product Thumbnails mini row */}
                            <div className="flex items-center gap-1.5 pt-1">
                              {proposal.selectedProducts.slice(0, 4).map((prod) => (
                                <img
                                  key={prod.id}
                                  src={prod.image}
                                  alt={prod.name}
                                  title={`${prod.name} (${formatPrice(prod.priceEgp)})`}
                                  className="w-8 h-8 rounded-lg object-cover bg-[#F8F7F3] border border-[#E8E2D9] dark:border-[#2D2A26]"
                                />
                              ))}
                              <span className="text-[10px] text-[#6E6A63] dark:text-[#A39E96] font-bold ml-1">
                                +{proposal.selectedProducts.length} items
                              </span>
                            </div>
                          </div>

                          {/* Action Controls */}
                          <div className="space-y-2 pt-3 border-t border-[#E8E2D9] dark:border-[#2D2A26]">
                            {/* Primary Selection Button */}
                            <button
                              onClick={() => handleSelectProposal(proposal)}
                              className={`w-full py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                                isSelected
                                  ? 'bg-emerald-700 text-white shadow-sm ring-1 ring-emerald-600'
                                  : 'bg-[#292722] hover:bg-[#3D3A34] dark:bg-[#F8F7F3] dark:hover:bg-white text-[#F8F7F3] dark:text-[#292722]'
                              }`}
                            >
                              {isSelected ? (
                                <>
                                  <CheckCircle2 className="w-3.5 h-3.5" />
                                  <span>{t.propSelectedTag}</span>
                                </>
                              ) : (
                                <>
                                  <Check className="w-3.5 h-3.5 text-[#B58A54]" />
                                  <span>{t.propSelectBtn}</span>
                                </>
                              )}
                            </button>

                            {/* Compare & Inspect secondary actions */}
                            <div className="flex items-center justify-between text-xs pt-1">
                              <label className="flex items-center gap-1.5 cursor-pointer text-[#6E6A63] dark:text-[#A39E96] hover:text-[#292722] dark:hover:text-[#F8F7F3]">
                                <input
                                  type="checkbox"
                                  checked={isCompared}
                                  onChange={() => toggleCompareProposal(proposal.id)}
                                  className="rounded accent-[#B58A54] cursor-pointer"
                                />
                                <span className="text-[11px] font-bold">{t.propCompareCheckbox}</span>
                              </label>

                              <button
                                onClick={() => setActiveProposalForDetail(proposal)}
                                className="text-[11px] font-bold text-[#B58A54] hover:underline cursor-pointer"
                              >
                                {isInspected ? (isRTL ? 'المعروض حالياً' : 'Viewing Now') : (isRTL ? 'معاينة المواصفات' : 'Inspect 3D')}
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
                )}

                {/* ================= DETAILED 3D STAGING & SPEC AUDIT SECTION ================= */}
                {currentDetailProposal && (step5ViewMode === 'all' || step5ViewMode === 'proposals') && (
                  <div className="space-y-8 pt-6 border-t-2 border-[#E8E2D9] dark:border-[#2D2A26]">
                    {/* Visualizer Hero Card with Before/After Slider */}
                    <div className="bg-white dark:bg-[#1C1A17] rounded-3xl border border-[#E8E2D9] dark:border-[#2D2A26] p-6 sm:p-8 shadow-sm space-y-6 transition-colors">
                      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#E8E2D9] dark:border-[#2D2A26] pb-4">
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="px-3 py-0.5 rounded-full bg-[#B58A54]/15 text-[#B58A54] text-[10px] font-bold uppercase tracking-wider">
                              {currentDetailProposal.code} · {isRTL ? currentDetailProposal.styleAr : currentDetailProposal.style}
                            </span>
                            <span className="text-xs text-[#6E6A63] dark:text-[#A39E96] font-mono" dir="ltr">
                              {roomDesignState.dimensions.widthM.toFixed(1)}m × {roomDesignState.dimensions.lengthM.toFixed(1)}m
                            </span>
                          </div>
                          <h2 className="text-2xl sm:text-3xl font-editorial font-bold text-[#292722] dark:text-[#F8F7F3] mt-1">
                            {isRTL ? currentDetailProposal.titleAr : currentDetailProposal.title}
                          </h2>
                          <p className="text-xs text-[#6E6A63] dark:text-[#A39E96] mt-1 font-normal max-w-2xl leading-relaxed">
                            {isRTL ? currentDetailProposal.descriptionAr : currentDetailProposal.description}
                          </p>
                        </div>

                        <div className="flex items-center gap-3">
                          <button
                            onClick={() => handleSelectProposal(currentDetailProposal)}
                            className={`px-4 py-2.5 rounded-xl text-xs font-bold flex items-center gap-1.5 cursor-pointer transition-colors shadow-xs ${
                              selectedProposalId === currentDetailProposal.id
                                ? 'bg-emerald-700 text-white'
                                : 'bg-[#F8F7F3] dark:bg-[#1E1C1A] hover:bg-[#DDD0BE] text-[#292722] dark:text-[#F8F7F3] border border-[#E8E2D9] dark:border-[#2D2A26]'
                            }`}
                          >
                            <Check className="w-3.5 h-3.5 text-[#B58A54]" />
                            <span>
                              {selectedProposalId === currentDetailProposal.id
                                ? (isRTL ? 'الخيار المعتمد' : 'Selected Concept')
                                : (isRTL ? 'اعتماد هذا المقترح' : 'Select This Concept')}
                            </span>
                          </button>

                          <button
                            onClick={() => handleAddProposalToCart(currentDetailProposal)}
                            className="px-5 py-2.5 rounded-xl bg-[#292722] hover:bg-[#3D3A34] dark:bg-[#F8F7F3] dark:hover:bg-white text-[#F8F7F3] dark:text-[#292722] text-xs font-bold uppercase tracking-wider flex items-center gap-2 shadow-sm cursor-pointer transition-all"
                          >
                            <ShoppingBag className="w-4 h-4 text-[#B58A54] dark:text-[#292722]" />
                            <span>{t.s5AddAllBtn}</span>
                          </button>
                        </div>
                      </div>

                      {/* The Interactive Before/After Visualizer with Hotspots */}
                      <BeforeAfterSlider
                        beforeImage={currentDetailProposal.beforeImageUrl}
                        afterImage={currentDetailProposal.previewImageUrl}
                        beforeLabel={t.heroBeforeLabel}
                        afterLabel={t.heroAfterLabel}
                        hotspots={currentDetailProposal.hotspots}
                        onHotspotClick={(prodId) => {
                          const prod = LUXURY_PRODUCTS.find((p) => p.id === prodId);
                          if (prod) setQuickViewProduct(prod);
                        }}
                        aspectRatio="aspect-[16/10] sm:aspect-[16/9]"
                      />

                      <DemoBadge
                        variant="card"
                        text={isRTL ? 'إشعار المحاكاة التجريبية: هذا النموذج يوضح تجربة العميل الكاملة مع تعدد المقترحات. في التطبيق الواقعي، يربط النظام كتالوج معرضك الفعلي بالذكاء الاصطناعي دون فرض خيار افتراضي.' : 'Demo Simulation Note: This visualization models the complete customer experience with multiple proposals. In production, Roomora maps your showroom\'s actual inventory without auto-selecting on user\'s behalf.'}
                      />
                    </div>

                    {/* Coordinated Furniture List & Budget Tracker */}
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                      {/* Selected Furniture Items (8 cols) */}
                      <div className="lg:col-span-8 bg-white dark:bg-[#1C1A17] rounded-3xl border border-[#E8E2D9] dark:border-[#2D2A26] p-6 space-y-6 transition-colors">
                        <div className="flex items-center justify-between border-b border-[#E8E2D9] dark:border-[#2D2A26] pb-3">
                          <div>
                            <h3 className="text-xl font-editorial font-bold text-[#292722] dark:text-[#F8F7F3]">
                              {t.s5SelectedPieces} ({currentDetailProposal.selectedProducts.length})
                            </h3>
                            <p className="text-xs text-[#6E6A63] dark:text-[#A39E96] font-normal">
                              {isRTL ? 'جميع القطع من المخزون الفعلي للمعرض ومتاحة للتسليم الفوري في القاهرة.' : 'All items are authentic retailer inventory with stock in Cairo fulfillment centers.'}
                            </p>
                          </div>
                          <span className="text-xs text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 px-2.5 py-1 rounded-full font-bold">
                            {t.s5ClearancesPassed}
                          </span>
                        </div>

                        <div className="space-y-4">
                          {currentDetailProposal.selectedProducts.map((product) => {
                            const name = isRTL && product.nameAr ? product.nameAr : product.name;
                            const collection = isRTL && product.collectionAr ? product.collectionAr : product.collection;
                            return (
                              <div
                                key={product.id}
                                className="p-4 rounded-2xl bg-[#F8F7F3] dark:bg-[#1E1C1A] border border-[#E8E2D9] dark:border-[#2D2A26] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 group transition-colors"
                              >
                                <div className="flex items-center gap-3.5">
                                  <img
                                    src={product.image}
                                    alt={name}
                                    className="w-16 h-16 rounded-xl object-cover bg-white dark:bg-[#1C1A17] border border-[#E8E2D9] dark:border-[#2D2A26]"
                                  />
                                  <div>
                                    <span className="text-[10px] uppercase font-bold text-[#B58A54] tracking-wider block">
                                      {collection}
                                    </span>
                                    <h4
                                      onClick={() => setQuickViewProduct(product)}
                                      className="font-bold text-sm text-[#292722] dark:text-[#F8F7F3] hover:text-[#B58A54] cursor-pointer"
                                    >
                                      {name}
                                    </h4>
                                    <p className="text-[11px] text-[#6E6A63] dark:text-[#A39E96]" dir="ltr">
                                      {product.dimensions.widthCm}W × {product.dimensions.depthCm}D × {product.dimensions.heightCm}H cm
                                    </p>
                                  </div>
                                </div>

                                <div className="flex sm:flex-col items-center sm:items-end justify-between w-full sm:w-auto pt-2 sm:pt-0 border-t sm:border-0 border-[#E8E2D9] dark:border-[#2D2A26]">
                                  <span className="font-bold text-base text-[#292722] dark:text-[#F8F7F3]">
                                    {formatPrice(product.priceEgp)}
                                  </span>
                                  <div className="flex items-center gap-2 mt-1">
                                    <button
                                      onClick={() => setQuickViewProduct(product)}
                                      className="text-[11px] font-bold text-[#B58A54] hover:text-[#292722] dark:hover:text-[#F8F7F3] underline cursor-pointer"
                                    >
                                      {isRTL ? 'معاينة المواصفات' : 'View Specs'}
                                    </button>
                                    <span className="text-stone-300 dark:text-stone-600">·</span>
                                    <button
                                      onClick={() => addToCart(product)}
                                      className="text-[11px] font-bold text-[#292722] dark:text-[#F8F7F3] hover:text-[#B58A54] cursor-pointer"
                                    >
                                      {isRTL ? 'إضافة للسلة' : 'Add to Bag'}
                                    </button>
                                  </div>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>

                      {/* Budget & Spatial Breakdown (4 cols) */}
                      <div className="lg:col-span-4 bg-white dark:bg-[#1C1A17] rounded-3xl border border-[#E8E2D9] dark:border-[#2D2A26] p-6 space-y-6 flex flex-col justify-between transition-colors">
                        <div>
                          <h3 className="text-xl font-editorial font-bold text-[#292722] dark:text-[#F8F7F3] mb-1">
                            {t.s5AuditTitle}
                          </h3>
                          <p className="text-xs text-[#6E6A63] dark:text-[#A39E96] mb-4 font-normal">
                            {t.s5AuditSub}
                          </p>

                          {/* Budget comparison card */}
                          <div className="p-4 rounded-2xl bg-[#F8F7F3] dark:bg-[#1E1C1A] border border-[#E8E2D9] dark:border-[#2D2A26] space-y-3 mb-6">
                            <div className="flex justify-between text-xs">
                              <span className="text-[#6E6A63] dark:text-[#A39E96]">{t.s5AllocatedBudget}</span>
                              <span className="font-bold text-[#292722] dark:text-[#F8F7F3]">
                                {formatPrice(currentDetailProposal.budgetEgp)}
                              </span>
                            </div>
                            <div className="flex justify-between text-xs">
                              <span className="text-[#6E6A63] dark:text-[#A39E96]">{t.s5FurnishedTotal}</span>
                              <span className="font-bold text-[#292722] dark:text-[#F8F7F3]">
                                {formatPrice(currentDetailProposal.totalCostEgp)}
                              </span>
                            </div>

                            {/* Progress Bar */}
                            <div className="w-full bg-[#E8E2D9] dark:bg-[#2D2A26] rounded-full h-2 overflow-hidden">
                              <div
                                className="bg-emerald-600 h-full rounded-full"
                                style={{
                                  width: `${Math.min(100, (currentDetailProposal.totalCostEgp / currentDetailProposal.budgetEgp) * 100)}%`,
                                }}
                              ></div>
                            </div>

                            <div className="pt-2 border-t border-[#E8E2D9] dark:border-[#2D2A26] flex justify-between items-center text-xs">
                              <span className="text-emerald-700 dark:text-emerald-400 font-bold">{t.s5RemainingBudget}</span>
                              <span className="font-bold text-emerald-700 dark:text-emerald-400 text-sm">
                                +{formatPrice(currentDetailProposal.budgetEgp - currentDetailProposal.totalCostEgp)}
                              </span>
                            </div>
                          </div>

                          {/* Clearance verification checklist */}
                          <div className="space-y-2 text-xs text-[#6E6A63] dark:text-[#A39E96]">
                            <span className="font-bold text-[#292722] dark:text-[#F8F7F3] uppercase tracking-wider text-[11px] block">
                              {t.s5GeomTitle}
                            </span>
                            <div className="flex items-start gap-2">
                              <CheckCircle2 className="w-4 h-4 text-[#B58A54] shrink-0 mt-0.5" />
                              <span>{t.s5Geom1}</span>
                            </div>
                            <div className="flex items-start gap-2">
                              <CheckCircle2 className="w-4 h-4 text-[#B58A54] shrink-0 mt-0.5" />
                              <span>{t.s5Geom2}</span>
                            </div>
                            <div className="flex items-start gap-2">
                              <CheckCircle2 className="w-4 h-4 text-[#B58A54] shrink-0 mt-0.5" />
                              <span>{t.s5Geom3}</span>
                            </div>
                          </div>
                        </div>

                        {/* CTAs */}
                        <div className="pt-6 border-t border-[#E8E2D9] dark:border-[#2D2A26] space-y-2">
                          <button
                            onClick={() => handleAddProposalToCart(currentDetailProposal)}
                            className="w-full py-3.5 rounded-xl bg-[#292722] hover:bg-[#3D3A34] dark:bg-[#F8F7F3] dark:hover:bg-white text-[#F8F7F3] dark:text-[#292722] text-xs font-bold uppercase tracking-wider shadow-sm flex items-center justify-center gap-2 cursor-pointer transition-all"
                          >
                            <ShoppingBag className="w-4 h-4 text-[#B58A54] dark:text-[#292722]" />
                            <span>{t.s5AddAllToBag}</span>
                          </button>

                          <button
                            onClick={() => handleDownloadProposalSpecSheet(currentDetailProposal)}
                            className="w-full py-2.5 rounded-xl bg-[#E9DFD0] hover:bg-[#DDD0BE] border border-[#CDBBA5]/70 text-xs font-bold text-[#292722] flex items-center justify-center gap-2 cursor-pointer transition-colors shadow-xs"
                          >
                            <Download className="w-4 h-4 text-[#B58A54]" />
                            <span>{t.cartDownloadSpec}</span>
                          </button>

                          <button
                            onClick={() => setCurrentStep(4)}
                            className="w-full py-2.5 rounded-xl border border-[#E8E2D9] dark:border-[#2D2A26] text-xs font-bold text-[#292722] dark:text-[#F8F7F3] hover:bg-[#F8F7F3] dark:hover:bg-[#24201C] cursor-pointer transition-colors"
                          >
                            {t.s5AdjustBtn}
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* ================= STANDALONE SUGGESTED PRODUCTS SECTION (VIEWED INDIVIDUALLY) ================= */}
                {(step5ViewMode === 'all' || step5ViewMode === 'standalone-products') && (
                  <div id="suggested-products-alone" className="space-y-6 pt-6">
                    {/* Header */}
                    <div className="bg-white dark:bg-[#1C1A17] rounded-3xl border border-[#E8E2D9] dark:border-[#2D2A26] p-6 sm:p-8 shadow-sm transition-colors">
                      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div className="space-y-1">
                          <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#B58A54] block">
                            {t.suggestedProductsEyebrow}
                          </span>
                          <h3 className="text-2xl sm:text-3xl font-editorial font-bold text-[#292722] dark:text-[#F8F7F3]">
                            {t.suggestedProductsTitle} ({displayedSuggestedProducts.length})
                          </h3>
                          <p className="text-xs text-[#6E6A63] dark:text-[#A39E96] max-w-2xl font-normal leading-relaxed">
                            {t.suggestedProductsDesc}
                          </p>
                        </div>

                        <DemoBadge
                          text={isRTL ? 'قطع معتمدة ومطابقة لأبعاد غرفتك' : 'Certified Clearance & Authentic Catalog'}
                        />
                      </div>

                      {/* Standalone Product Filter Tabs */}
                      <div className="flex items-center gap-2 pt-4 mt-4 border-t border-[#E8E2D9] dark:border-[#2D2A26] overflow-x-auto pb-1">
                        <button
                          onClick={() => setSuggestedCategoryTab('all')}
                          className={`px-3.5 py-1.5 rounded-xl text-xs font-bold cursor-pointer transition-all shrink-0 ${
                            suggestedCategoryTab === 'all'
                              ? 'bg-[#292722] text-[#F8F7F3] dark:bg-[#F8F7F3] dark:text-[#292722]'
                              : 'bg-[#F8F7F3]/90 dark:bg-[#1E1C1A] text-[#6E6A63] dark:text-[#A39E96] hover:bg-[#DDD0BE]'
                          }`}
                        >
                          {t.filterAllSuggested} ({allSuggestedProducts.length})
                        </button>
                        <button
                          onClick={() => setSuggestedCategoryTab('in-concept')}
                          className={`px-3.5 py-1.5 rounded-xl text-xs font-bold cursor-pointer transition-all shrink-0 ${
                            suggestedCategoryTab === 'in-concept'
                              ? 'bg-[#B58A54] text-white'
                              : 'bg-[#F8F7F3]/90 dark:bg-[#1E1C1A] text-[#6E6A63] dark:text-[#A39E96] hover:bg-[#DDD0BE]'
                          }`}
                        >
                          {t.filterInConcept} ({proposalProducts.length})
                        </button>
                        {[
                          { id: 'sofas', label: isRTL ? 'كنب وأنتريهات' : 'Sofas & Sectionals' },
                          { id: 'tables', label: isRTL ? 'طاولات' : 'Tables' },
                          { id: 'chairs', label: isRTL ? 'كراسي وفوتيهات' : 'Chairs & Armchairs' },
                          { id: 'storage', label: isRTL ? 'وحدات تخزين وتلفزيون' : 'Storage & Media' },
                          { id: 'lighting', label: isRTL ? 'إضاءة معمارية' : 'Lighting' },
                          { id: 'rugs', label: isRTL ? 'سجاد ومفروشات' : 'Rugs' },
                        ].map((cat) => (
                          <button
                            key={cat.id}
                            onClick={() => setSuggestedCategoryTab(cat.id as any)}
                            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold cursor-pointer transition-all shrink-0 ${
                              suggestedCategoryTab === cat.id
                                ? 'bg-[#292722] text-[#F8F7F3] dark:bg-[#F8F7F3] dark:text-[#292722]'
                                : 'bg-[#F8F7F3]/90 dark:bg-[#1E1C1A] text-[#6E6A63] dark:text-[#A39E96] hover:bg-[#DDD0BE]'
                            }`}
                          >
                            {cat.label}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Products Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                      {displayedSuggestedProducts.map((product) => {
                        const isInCurrentProposal = proposalProducts.some((item) => item.id === product.id);
                        return (
                          <div key={product.id} className="relative group">
                            {isInCurrentProposal && (
                              <div className="absolute top-3 left-3 z-20 pointer-events-none">
                                <span className="px-2.5 py-1 rounded-full bg-[#B58A54] text-white text-[10px] font-bold tracking-wider uppercase shadow-sm">
                                  {isRTL ? 'ضمن المقترح المعروض' : 'In Selected Proposal'}
                                </span>
                              </div>
                            )}
                            <ProductCard product={product} />
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Image Validation Diagnostics Modal */}
      <RoomValidationModal
        photo={selectedDiagnosticPhoto}
        onClose={() => setSelectedDiagnosticPhoto(null)}
        onReplace={() => {
          setSelectedDiagnosticPhoto(null);
          // Scroll to upload zone
          window.scrollTo({ top: 350, behavior: 'smooth' });
        }}
        onConfirmUseAnyway={(photoId) => {
          setRoomDesignState((prev) => ({
            ...prev,
            uploadedPhotos: prev.uploadedPhotos.map((p) =>
              p.id === photoId
                ? {
                    ...p,
                    validationResult: {
                      ...p.validationResult!,
                      status: 'valid',
                    },
                  }
                : p
            ),
          }));
          showToast(isRTL ? 'تم تأكيد الصورة للاستخدام.' : 'Photo confirmed for room staging.');
        }}
      />
    </div>
  );
};
