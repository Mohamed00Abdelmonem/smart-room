import React from 'react';
import { useVisualizer } from '../../context/VisualizerContext';
import { useCart } from '../../context/CartContext';
import { useLanguage } from '../../context/LanguageContext';
import { generateArchitecturalSpecSheetPdf } from '../../utils/pdfGenerator';
import { 
  X, 
  Check, 
  Sparkles, 
  ShoppingBag, 
  Ruler, 
  ShieldCheck, 
  Layers, 
  CheckCircle2, 
  ArrowRight,
  ArrowLeft,
  Download
} from 'lucide-react';

export const ProposalComparisonModal: React.FC = () => {
  const { 
    roomDesignState,
    proposals, 
    comparedProposalIds, 
    toggleCompareProposal, 
    clearComparedProposals,
    selectedProposalId, 
    setSelectedProposalId, 
    isComparisonModalOpen, 
    setIsComparisonModalOpen,
    setActiveProposalForDetail,
    setQuickViewProduct
  } = useVisualizer();

  const { addToCart, setIsCartOpen, showToast } = useCart();
  const { t, isRTL, formatPrice } = useLanguage();

  if (!isComparisonModalOpen) return null;

  const comparedProposals = proposals.filter((p) => comparedProposalIds.includes(p.id));

  // If user opened comparison without at least 2 selected, default to first 2 proposals
  const activeList = comparedProposals.length >= 2 
    ? comparedProposals 
    : proposals.slice(0, 3);

  const handleSelectProposal = (id: string) => {
    setSelectedProposalId(id);
    const chosen = proposals.find((p) => p.id === id);
    if (chosen) {
      showToast(isRTL ? `تم اختيار: ${chosen.titleAr || chosen.title}` : `Selected: ${chosen.title}`);
    }
  };

  const handleInspectProposal = (proposal: typeof proposals[0]) => {
    setActiveProposalForDetail(proposal);
    setIsComparisonModalOpen(false);
  };

  const handleAddProposalToCart = (proposal: typeof proposals[0]) => {
    proposal.selectedProducts.forEach((prod) => {
      addToCart(prod, 1);
    });
    showToast(isRTL ? `تمت إضافة قطع ${proposal.titleAr || proposal.title} للسلة!` : `Added pieces from ${proposal.title} to your bag!`);
    setIsCartOpen(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/70 backdrop-blur-md animate-in fade-in">
      <div className="relative w-full max-w-6xl max-h-[92vh] bg-white dark:bg-[#161412] rounded-3xl shadow-2xl border border-[#E8E2D9] dark:border-[#2D2A26] flex flex-col overflow-hidden transition-colors">
        
        {/* Modal Header */}
        <div className="px-6 py-5 bg-[#F8F7F3] dark:bg-[#1E1C1A] border-b border-[#E8E2D9] dark:border-[#2D2A26] flex items-center justify-between transition-colors">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#292722] text-[#F8F7F3] dark:bg-[#F8F7F3] dark:text-[#292722] flex items-center justify-center shadow-xs">
              <Layers className="w-5 h-5 text-[#B58A54]" />
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-editorial font-bold text-[#292722] dark:text-[#F8F7F3]">
                {isRTL ? 'مقارنة مقترحات التصميم جنباً إلى جنب' : 'Side-by-Side Design Proposal Comparison'}
              </h2>
              <p className="text-xs text-[#6E6A63] dark:text-[#A39E96] font-normal">
                {isRTL 
                  ? 'قارن بين الخطوط التصميمية وتوزيع الأثاث والميزانية قبل اتخاذ قرار التأثيث النهائي.'
                  : 'Compare aesthetic directions, furniture specs, and budget utilization before finalizing.'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {comparedProposalIds.length > 0 && (
              <button
                onClick={clearComparedProposals}
                className="hidden sm:inline-block text-xs text-[#6E6A63] dark:text-[#A39E96] hover:text-[#292722] dark:hover:text-[#F8F7F3] underline cursor-pointer"
              >
                {isRTL ? 'إلغاء التحديد' : 'Clear Comparison'}
              </button>
            )}
            <button
              onClick={() => setIsComparisonModalOpen(false)}
              className="p-2 rounded-full hover:bg-white dark:hover:bg-[#25221F] text-[#6E6A63] hover:text-[#292722] dark:hover:text-[#F8F7F3] transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Comparison Grid Scroll Container */}
        <div className="flex-1 overflow-x-auto overflow-y-auto p-4 sm:p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 min-w-[720px] md:min-w-0">
            {activeList.map((proposal) => {
              const isSelected = selectedProposalId === proposal.id;
              const remainingBudget = proposal.budgetEgp - proposal.totalCostEgp;
              const title = isRTL ? proposal.titleAr : proposal.title;
              const conceptTag = isRTL ? proposal.conceptTagAr : proposal.conceptTag;
              const style = isRTL ? proposal.styleAr : proposal.style;

              return (
                <div
                  key={proposal.id}
                  className={`rounded-2xl border transition-all flex flex-col bg-white dark:bg-[#1E1C1A] overflow-hidden ${
                    isSelected
                      ? 'border-[#292722] dark:border-[#F8F7F3] ring-2 ring-[#B58A54] shadow-lg'
                      : 'border-[#E8E2D9] dark:border-[#2D2A26] hover:border-[#CDBBA5]'
                  }`}
                >
                  {/* Proposal Image Header */}
                  <div className="relative aspect-[16/10] overflow-hidden bg-[#F8F7F3] dark:bg-[#141210]">
                    <img
                      src={proposal.previewImageUrl}
                      alt={title}
                      className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                    />
                    <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
                      <span className="px-2.5 py-1 rounded-md bg-[#292722]/90 text-[#F8F7F3] text-[10px] font-bold uppercase tracking-wider backdrop-blur-sm">
                        {proposal.code} · {style}
                      </span>
                      {isSelected && (
                        <span className="px-2.5 py-1 rounded-full bg-[#B58A54] text-white text-[10px] font-bold flex items-center gap-1 shadow-sm">
                          <Check className="w-3 h-3" />
                          <span>{isRTL ? 'الخيار المعتمد' : 'Selected'}</span>
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-5 flex-1 flex flex-col space-y-4">
                    {/* Title & Tag */}
                    <div>
                      <h3 className="text-lg font-editorial font-bold text-[#292722] dark:text-[#F8F7F3] leading-snug">
                        {title}
                      </h3>
                      <p className="text-[11px] text-[#B58A54] font-bold uppercase tracking-wider mt-0.5">
                        {conceptTag}
                      </p>
                    </div>

                    {/* Color Palette */}
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-[#6E6A63] dark:text-[#A39E96] block mb-1.5">
                        {isRTL ? 'لوحة الألوان المعتمدة' : 'Curated Color Palette'}
                      </span>
                      <div className="flex items-center gap-2">
                        {proposal.palette.map((c) => (
                          <div
                            key={c.name}
                            className="w-6 h-6 rounded-full border border-black/10 dark:border-white/10 shadow-2xs"
                            style={{ backgroundColor: c.hex }}
                            title={isRTL ? c.nameAr : c.name}
                          />
                        ))}
                      </div>
                    </div>

                    {/* Budget & Price Comparison */}
                    <div className="p-3.5 rounded-xl bg-[#F8F7F3] dark:bg-[#141210] border border-[#E8E2D9] dark:border-[#2D2A26] space-y-2">
                      <div className="flex items-baseline justify-between">
                        <span className="text-xs text-[#6E6A63] dark:text-[#A39E96] font-normal">
                          {isRTL ? 'تكلفة التأثيث الكلية:' : 'Total Furnishing Cost:'}
                        </span>
                        <span className="text-base font-bold font-editorial text-[#292722] dark:text-[#F8F7F3]">
                          {formatPrice(proposal.totalCostEgp)}
                        </span>
                      </div>
                      <div className="flex items-center justify-between text-xs pt-1 border-t border-[#E8E2D9] dark:border-[#2D2A26]">
                        <span className="text-[#6E6A63] dark:text-[#A39E96]">
                          {isRTL ? 'المتبقي من الميزانية:' : 'Budget Remaining:'}
                        </span>
                        <span className={`font-bold ${remainingBudget >= 0 ? 'text-emerald-700 dark:text-emerald-400' : 'text-rose-600'}`}>
                          {remainingBudget >= 0 ? `+${formatPrice(remainingBudget)}` : formatPrice(remainingBudget)}
                        </span>
                      </div>
                    </div>

                    {/* Space Utilization & Clearances */}
                    <div className="space-y-1.5 text-xs text-[#6E6A63] dark:text-[#A39E96]">
                      <div className="flex justify-between items-center">
                        <span className="flex items-center gap-1">
                          <Ruler className="w-3.5 h-3.5 text-[#B58A54]" />
                          {isRTL ? 'كفاءة استغلال المساحة:' : 'Space Utilization:'}
                        </span>
                        <span className="font-bold text-[#292722] dark:text-[#F8F7F3]">
                          {proposal.spaceUtilizationScore}%
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span>{isRTL ? 'ممرات الحركة:' : 'Traffic Clearance:'}</span>
                        <span className="font-bold text-emerald-700 dark:text-emerald-400">
                          {isRTL ? proposal.clearanceRatingAr : proposal.clearanceRating}
                        </span>
                      </div>
                    </div>

                    {/* Selected Products List */}
                    <div className="space-y-2 pt-2 border-t border-[#E8E2D9] dark:border-[#2D2A26]">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-[#6E6A63] dark:text-[#A39E96] block">
                        {isRTL ? `القطع المختارة (${proposal.selectedProducts.length}):` : `Included Items (${proposal.selectedProducts.length}):`}
                      </span>
                      <div className="space-y-2">
                        {proposal.selectedProducts.map((p) => {
                          const prodName = isRTL && p.nameAr ? p.nameAr : p.name;
                          return (
                            <div
                              key={p.id}
                              onClick={() => setQuickViewProduct(p)}
                              className="flex items-center justify-between gap-2 p-1.5 rounded-lg hover:bg-[#F8F7F3] dark:hover:bg-[#141210] cursor-pointer transition-colors text-xs"
                            >
                              <div className="flex items-center gap-2 min-w-0">
                                <img
                                  src={p.image}
                                  alt={prodName}
                                  className="w-8 h-8 rounded-md object-cover bg-white dark:bg-[#1C1A17] shrink-0 border border-[#E8E2D9] dark:border-[#2D2A26]"
                                />
                                <span className="text-[#292722] dark:text-[#F8F7F3] truncate font-medium">
                                  {prodName}
                                </span>
                              </div>
                              <span className="text-[11px] font-bold text-[#292722] dark:text-[#F8F7F3] shrink-0">
                                {formatPrice(p.priceEgp)}
                              </span>
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    {/* Card Actions */}
                    <div className="mt-auto pt-4 space-y-2">
                      <button
                        onClick={() => handleSelectProposal(proposal.id)}
                        className={`w-full py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer ${
                          isSelected
                            ? 'bg-emerald-700 text-white shadow-sm'
                            : 'bg-[#292722] text-white hover:bg-[#3D3A34] dark:bg-[#F8F7F3] dark:text-[#292722] dark:hover:bg-white'
                        }`}
                      >
                        {isSelected ? (
                          <>
                            <CheckCircle2 className="w-4 h-4" />
                            <span>{isRTL ? 'الخيار المعتمد حالياً' : 'Currently Selected'}</span>
                          </>
                        ) : (
                          <>
                            <Check className="w-4 h-4 text-[#B58A54]" />
                            <span>{isRTL ? 'اختيار هذا التصميم' : 'Select This Design'}</span>
                          </>
                        )}
                      </button>

                      <div className="grid grid-cols-2 gap-2">
                        <button
                          onClick={() => handleInspectProposal(proposal)}
                          className="py-2 px-2 rounded-lg bg-[#E9DFD0] hover:bg-[#DDD0BE] text-[11px] font-bold text-[#292722] border border-[#CDBBA5]/70 cursor-pointer transition-colors text-center"
                        >
                          {isRTL ? 'معاينة ثلاثية الأبعاد' : 'Inspect 3D'}
                        </button>

                        <button
                          onClick={() => handleAddProposalToCart(proposal)}
                          className="py-2 px-2 rounded-lg bg-[#E9DFD0] hover:bg-[#DDD0BE] text-[11px] font-bold text-[#292722] border border-[#CDBBA5]/70 cursor-pointer transition-colors flex items-center justify-center gap-1"
                        >
                          <ShoppingBag className="w-3.5 h-3.5 text-[#B58A54]" />
                          <span>{isRTL ? 'إضافة للسلة' : 'Add to Bag'}</span>
                        </button>
                      </div>

                      <button
                        onClick={() => {
                          generateArchitecturalSpecSheetPdf({
                            roomType: roomDesignState.roomType,
                            dimensions: roomDesignState.dimensions,
                            style: proposal.style || roomDesignState.style,
                            budgetEgp: proposal.budgetEgp,
                            prompt: roomDesignState.prompt,
                            proposal,
                            items: proposal.selectedProducts.map((p) => ({ product: p, quantity: 1 })),
                            subtotalEgp: proposal.totalCostEgp,
                            totalEgp: proposal.totalCostEgp,
                            isRTL,
                          });
                          showToast(isRTL ? 'جاري فتح وتحميل المقايسة المعمارية بتنسيق PDF...' : 'Opening & downloading Architectural Spec Sheet (.PDF)...');
                        }}
                        className="w-full py-2 px-2 mt-2 rounded-lg bg-[#E9DFD0] hover:bg-[#DDD0BE] text-[11px] font-bold text-[#292722] border border-[#CDBBA5]/70 cursor-pointer transition-colors flex items-center justify-center gap-1.5"
                      >
                        <Download className="w-3.5 h-3.5 text-[#B58A54]" />
                        <span>{t.cartDownloadSpec}</span>
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-4 bg-[#F8F7F3] dark:bg-[#121110] border-t border-[#E8E2D9] dark:border-[#2D2A26] flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-[#6E6A63] dark:text-[#A39E96] transition-colors">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-[#B58A54]" />
            <span>
              {isRTL 
                ? 'جميع القطع المعروضة في المقترحات أصلية ومتوفرة في مستودعات المعارض بالقاهرة والشيخ زايد.'
                : 'All furniture proposals are calculated with certified showroom digital twins and authentic Egyptian inventory.'}
            </span>
          </div>

          <button
            onClick={() => setIsComparisonModalOpen(false)}
            className="px-5 py-2 rounded-xl bg-[#292722] text-white dark:bg-[#F8F7F3] dark:text-[#292722] font-bold text-xs cursor-pointer hover:bg-[#3D3A34] dark:hover:bg-white transition-colors"
          >
            {isRTL ? 'إغلاق المقارنة' : 'Done Comparing'}
          </button>
        </div>
      </div>
    </div>
  );
};
