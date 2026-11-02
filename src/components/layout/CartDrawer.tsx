import React, { useState } from 'react';
import { useCart } from '../../context/CartContext';
import { useLanguage } from '../../context/LanguageContext';
import { useVisualizer } from '../../context/VisualizerContext';
import { generateArchitecturalSpecSheetPdf } from '../../utils/pdfGenerator';
import { X, Trash2, Plus, Minus, ShoppingBag, ArrowRight, ArrowLeft, CheckCircle2, ShieldCheck, Download, Truck } from 'lucide-react';
import { Link } from 'react-router-dom';

export const CartDrawer: React.FC = () => {
  const { cart, isCartOpen, setIsCartOpen, removeFromCart, updateQuantity, clearCart, subtotalEgp, totalItems, showToast } = useCart();
  const { roomDesignState, proposals, selectedProposalId, activeProposalForDetail } = useVisualizer();
  const { t, isRTL, formatPrice } = useLanguage();
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [checkoutComplete, setCheckoutComplete] = useState(false);

  if (!isCartOpen) return null;

  const deliveryFee = subtotalEgp > 50000 ? 0 : 1500;
  const formattedDelivery = deliveryFee === 0 ? t.cartFreeDelivery : formatPrice(deliveryFee);
  const totalEgp = subtotalEgp + deliveryFee;

  const ArrowIcon = isRTL ? ArrowLeft : ArrowRight;

  const handleCheckout = () => {
    setIsCheckingOut(true);
    setTimeout(() => {
      setIsCheckingOut(false);
      setCheckoutComplete(true);
      showToast(isRTL ? 'تم حجز الطلب التجريبي للمعرض بنجاح #RM-EG-9982' : 'Order simulation placed! Retailer showroom order #RM-EG-9982 created.');
    }, 1200);
  };

  const handleDownloadSpecSheet = () => {
    generateArchitecturalSpecSheetPdf({
      roomType: roomDesignState.roomType,
      dimensions: roomDesignState.dimensions,
      style: roomDesignState.style,
      budgetEgp: roomDesignState.budgetEgp,
      prompt: roomDesignState.prompt,
      proposal: activeProposalForDetail || proposals.find(p => p.id === selectedProposalId) || null,
      items: cart,
      subtotalEgp,
      totalEgp,
      isRTL,
    });
    showToast(isRTL ? 'جاري فتح وتحميل المقايسة المعمارية بتنسيق PDF...' : 'Opening & downloading Architectural Spec Sheet (.PDF)...');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/60 backdrop-blur-sm animate-in fade-in">
      <div className={`absolute inset-y-0 ${isRTL ? 'left-0 pr-10' : 'right-0 pl-10'} max-w-full flex`}>
        <div className="w-screen max-w-md bg-white dark:bg-[#161412] shadow-2xl border-l border-[#E8E2D9] dark:border-[#2D2A26] flex flex-col transition-colors">
          {/* Header */}
          <div className="p-6 bg-[#F8F7F3] dark:bg-[#1A1816] border-b border-[#E8E2D9] dark:border-[#2D2A26] flex items-center justify-between transition-colors">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-[#292722] text-white dark:bg-[#F8F7F3] dark:text-[#141210] flex items-center justify-center">
                <ShoppingBag className="w-4 h-4 text-[#B58A54] dark:text-[#292722]" />
              </div>
              <div>
                <h3 className="font-editorial font-bold text-lg text-[#292722] dark:text-[#F8F7F3]">
                  {t.cartTitle}
                </h3>
                <p className="text-xs text-[#6E6A63] dark:text-[#A39E96] font-normal">
                  {totalItems} {t.cartItemCount}
                </p>
              </div>
            </div>

            <button
              onClick={() => setIsCartOpen(false)}
              className="p-2 rounded-full hover:bg-white dark:hover:bg-[#24201C] text-[#6E6A63] hover:text-[#292722] dark:hover:text-[#F8F7F3] transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Cart Body */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {checkoutComplete ? (
              <div className="py-12 text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto border-2 border-emerald-200 dark:border-emerald-800">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h4 className="text-2xl font-editorial font-bold text-[#292722] dark:text-[#F8F7F3]">
                  {t.cartOrderSuccessTitle}
                </h4>
                <p className="text-xs text-[#6E6A63] dark:text-[#A39E96] leading-relaxed max-w-xs mx-auto font-normal">
                  {t.cartOrderSuccessDesc}
                </p>
                <div className="pt-4 flex flex-col gap-2">
                  <button
                    onClick={handleDownloadSpecSheet}
                    className="w-full py-2.5 rounded-xl bg-[#E9DFD0] hover:bg-[#DDD0BE] dark:bg-[#25211D] dark:hover:bg-[#2F2A25] border border-[#CDBBA5]/70 text-xs font-bold text-[#292722] dark:text-[#F8F7F3] flex items-center justify-center gap-2 cursor-pointer transition-colors shadow-xs"
                  >
                    <Download className="w-4 h-4 text-[#B58A54]" />
                    <span>{t.cartDownloadSpec}</span>
                  </button>
                  <button
                    onClick={() => {
                      clearCart();
                      setCheckoutComplete(false);
                      setIsCartOpen(false);
                    }}
                    className="w-full py-2.5 rounded-xl bg-[#292722] text-white dark:bg-[#F8F7F3] dark:text-[#141210] text-xs font-bold hover:bg-[#3D3A34] dark:hover:bg-white cursor-pointer transition-colors"
                  >
                    {isRTL ? 'مواصلة استكشاف المعرض' : 'Continue Exploring Showroom'}
                  </button>
                </div>
              </div>
            ) : cart.length === 0 ? (
              <div className="py-16 text-center space-y-3">
                <div className="w-16 h-16 rounded-full bg-[#F8F7F3] dark:bg-[#1E1C1A] border border-[#E8E2D9] dark:border-[#2D2A26] flex items-center justify-center mx-auto text-[#6E6A63] dark:text-[#A39E96]">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <h4 className="text-xl font-editorial font-bold text-[#292722] dark:text-[#F8F7F3]">
                  {t.cartEmptyTitle}
                </h4>
                <p className="text-xs text-[#6E6A63] dark:text-[#A39E96] max-w-xs mx-auto font-normal">
                  {t.cartEmptyDesc}
                </p>
                <div className="pt-4">
                  <Link
                    to="/showroom"
                    onClick={() => setIsCartOpen(false)}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#292722] text-white dark:bg-[#F8F7F3] dark:text-[#141210] text-xs font-bold hover:bg-[#3D3A34] dark:hover:bg-white shadow-sm"
                  >
                    <span>{t.cartBrowseBtn}</span>
                    <ArrowIcon className="w-3.5 h-3.5 text-[#B58A54] dark:text-[#292722]" />
                  </Link>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                {cart.map((item) => {
                  const name = isRTL && item.product.nameAr ? item.product.nameAr : item.product.name;
                  return (
                    <div
                      key={item.product.id}
                      className="p-3.5 rounded-2xl bg-white dark:bg-[#1E1C1A] border border-[#E8E2D9] dark:border-[#2D2A26] flex gap-3.5 relative group transition-colors shadow-xs"
                    >
                      <img
                        src={item.product.image}
                        alt={name}
                        className="w-20 h-20 rounded-xl object-cover bg-[#F8F7F3] dark:bg-[#141210] shrink-0 border border-[#E8E2D9] dark:border-[#2D2A26]"
                      />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-1">
                          <h4 className="text-sm font-editorial font-bold text-[#292722] dark:text-[#F8F7F3] truncate">
                            {name}
                          </h4>
                          <button
                            onClick={() => removeFromCart(item.product.id)}
                            className="text-[#A39E96] hover:text-rose-600 transition-colors p-1 cursor-pointer"
                            title={isRTL ? 'حذف العنصر' : 'Remove item'}
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>

                        <p className="text-[11px] text-[#6E6A63] dark:text-[#A39E96] truncate mt-0.5" dir="ltr">
                          {item.product.dimensions.widthCm}W × {item.product.dimensions.depthCm}D × {item.product.dimensions.heightCm}H cm
                        </p>

                        <div className="flex items-center justify-between mt-2.5">
                          <div className="flex items-center gap-1.5 bg-[#F8F7F3] dark:bg-[#141210] rounded-lg border border-[#E8E2D9] dark:border-[#2D2A26] p-0.5">
                            <button
                              onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                              className="p-1 hover:bg-[#E9DFD0] dark:hover:bg-[#24201C] rounded text-[#292722] dark:text-[#F8F7F3] cursor-pointer"
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="text-xs font-bold px-1.5 text-[#292722] dark:text-[#F8F7F3]">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                              className="p-1 hover:bg-[#E9DFD0] dark:hover:bg-[#24201C] rounded text-[#292722] dark:text-[#F8F7F3] cursor-pointer"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>

                          <span className="font-bold text-sm text-[#292722] dark:text-[#F8F7F3]">
                            {formatPrice(item.product.priceEgp * item.quantity)}
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Cart Footer */}
          {cart.length > 0 && !checkoutComplete && (
            <div className="p-6 bg-[#F8F7F3] dark:bg-[#1A1816] border-t border-[#E8E2D9] dark:border-[#2D2A26] space-y-3 transition-colors">
              <div className="space-y-1.5 text-xs text-[#6E6A63] dark:text-[#A39E96]">
                <div className="flex justify-between">
                  <span>{t.cartSubtotal}</span>
                  <span className="font-bold text-[#292722] dark:text-[#F8F7F3]">{formatPrice(subtotalEgp)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="flex items-center gap-1">
                    <Truck className="w-3 h-3 text-[#B58A54]" />
                    {t.cartDelivery}
                  </span>
                  <span className="font-bold text-emerald-700 dark:text-emerald-400">{formattedDelivery}</span>
                </div>
                <div className="flex justify-between text-base font-bold font-editorial text-[#292722] dark:text-[#F8F7F3] pt-2 border-t border-[#E8E2D9] dark:border-[#2D2A26]">
                  <span>{t.cartTotal}</span>
                  <span>{formatPrice(totalEgp)}</span>
                </div>
              </div>

              <button
                onClick={handleCheckout}
                disabled={isCheckingOut}
                className="w-full py-3.5 rounded-xl bg-[#292722] hover:bg-[#3D3A34] dark:bg-[#F8F7F3] dark:hover:bg-white text-white dark:text-[#292722] text-xs font-bold uppercase tracking-wider shadow-sm flex items-center justify-center gap-2 cursor-pointer transition-all disabled:opacity-50"
              >
                {isCheckingOut ? (
                  <span>{isRTL ? 'جاري تأكيد الحجز المكاني...' : 'Processing Spatial Reservation...'}</span>
                ) : (
                  <>
                    <span>{t.cartCheckoutBtn}</span>
                    <ArrowIcon className="w-4 h-4 text-[#B58A54] dark:text-[#292722]" />
                  </>
                )}
              </button>

              <button
                onClick={handleDownloadSpecSheet}
                className="w-full py-2.5 rounded-xl bg-[#E9DFD0] hover:bg-[#DDD0BE] dark:bg-[#25211D] dark:hover:bg-[#2F2A25] border border-[#CDBBA5]/70 text-xs font-bold text-[#292722] dark:text-[#F8F7F3] flex items-center justify-center gap-2 cursor-pointer transition-colors shadow-xs"
              >
                <Download className="w-4 h-4 text-[#B58A54]" />
                <span>{t.cartDownloadSpec}</span>
              </button>

              <div className="flex items-center justify-center gap-2 text-[10px] text-[#6E6A63] dark:text-[#A39E96] pt-1">
                <ShieldCheck className="w-3.5 h-3.5 text-[#B58A54]" />
                <span>{t.cartGuarantee}</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
