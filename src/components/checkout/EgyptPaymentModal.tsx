import React, { useState, useEffect } from 'react';
import { useCart } from '../../context/CartContext';
import { useLanguage } from '../../context/LanguageContext';
import { useVisualizer } from '../../context/VisualizerContext';
import { generateArchitecturalSpecSheetPdf } from '../../utils/pdfGenerator';
import type { EgyptPaymentMethod, EgyptWalletProvider, EgyptBnplProvider } from '../../types';
import { 
  X, 
  ShieldCheck, 
  CheckCircle2, 
  Copy, 
  Check, 
  QrCode, 
  Smartphone, 
  CreditCard, 
  Clock, 
  Receipt, 
  Download, 
  ArrowRight, 
  ArrowLeft,
  Building,
  PhoneCall,
  Sparkles,
  RefreshCw,
  ExternalLink,
  Lock,
  Percent
} from 'lucide-react';

export const EgyptPaymentModal: React.FC = () => {
  const { 
    isPaymentOpen, 
    closePaymentModal, 
    paymentAmount, 
    paymentTitle, 
    clearCart, 
    cart, 
    subtotalEgp, 
    showToast 
  } = useCart();
  const { roomDesignState, proposals, selectedProposalId, activeProposalForDetail } = useVisualizer();
  const { t, isRTL, formatPrice } = useLanguage();

  const [activeMethod, setActiveMethod] = useState<EgyptPaymentMethod>('instapay');
  const [isProcessing, setIsProcessing] = useState(false);
  const [processingStep, setProcessingStep] = useState<string>('');
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [copiedField, setCopiedField] = useState<string | null>(null);

  // InstaPay State
  const instapayIpa = 'roomora.cairo@instapay';
  const instapayPhone = '010 9982 7741';
  const instapayBank = isRTL ? 'البنك التجاري الدولي (CIB مصر)' : 'Commercial International Bank (CIB Egypt)';
  const [instapaySenderIpa, setInstapaySenderIpa] = useState('');

  // Mobile Wallet State
  const [selectedWallet, setSelectedWallet] = useState<EgyptWalletProvider>('vodafone');
  const [walletPhone, setWalletPhone] = useState('01012345678');
  const [walletOtp, setWalletOtp] = useState('');
  const [walletStep, setWalletStep] = useState<'phone' | 'otp'>('phone');

  // Card / Meeza State
  const [cardNumber, setCardNumber] = useState('5078 0321 8842 9015');
  const [cardHolder, setCardHolder] = useState('AHMED M. EL-SAYED');
  const [cardExpiry, setCardExpiry] = useState('08/28');
  const [cardCvv, setCardCvv] = useState('842');
  const [cardNetwork, setCardNetwork] = useState<'meeza' | 'visa' | 'mastercard'>('meeza');
  const [is3DSecureOpen, setIs3DSecureOpen] = useState(false);
  const [otpCode, setOtpCode] = useState('7492');

  // ValU & Installments State
  const [selectedBnpl, setSelectedBnpl] = useState<EgyptBnplProvider>('valu');
  const [installmentMonths, setInstallmentMonths] = useState<number>(6);
  const [bnplPhone, setBnplPhone] = useState('01223456789');

  // Fawry State
  const [fawryRefNumber] = useState(() => Math.floor(700000000 + Math.random() * 299999999).toString());
  const [fawryExpiryHours] = useState(48);

  // Generated Order Ref
  const [generatedOrderRef] = useState(() => `RM-EG-${Math.floor(100000 + Math.random() * 900000)}`);

  const effectiveAmount = paymentAmount > 0 ? paymentAmount : (subtotalEgp > 50000 ? subtotalEgp : subtotalEgp + 1500);

  // Auto-detect card network from number
  useEffect(() => {
    const cleanNum = cardNumber.replace(/\s+/g, '');
    if (cleanNum.startsWith('5078') || cleanNum.startsWith('50')) {
      setCardNetwork('meeza');
    } else if (cleanNum.startsWith('4')) {
      setCardNetwork('visa');
    } else if (cleanNum.startsWith('5')) {
      setCardNetwork('mastercard');
    } else {
      setCardNetwork('meeza');
    }
  }, [cardNumber]);

  if (!isPaymentOpen) return null;

  const handleCopy = (text: string, fieldName: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(fieldName);
    showToast(isRTL ? 'تم النسخ إلى الحافظة' : 'Copied to clipboard');
    setTimeout(() => setCopiedField(null), 2500);
  };

  const fillDemoCard = () => {
    setCardNumber('5078 4492 1083 6629');
    setCardHolder('ENG. KARIM AL-MASRY');
    setCardExpiry('11/29');
    setCardCvv('481');
    setCardNetwork('meeza');
  };

  const handleExecutePayment = () => {
    setIsProcessing(true);

    if (activeMethod === 'instapay') {
      setProcessingStep(isRTL ? 'الاتصال بشبكة المدفوعات اللحظية IPN (البنك المركزي المصري)...' : 'Connecting to Instant Payment Network IPN (CBE Egypt)...');
      setTimeout(() => {
        setProcessingStep(isRTL ? 'التحقق من صحة المعاملة ومطابقة الحساب المصرفي...' : 'Validating transaction matching & settlement account...');
      }, 1100);
      setTimeout(() => {
        setIsProcessing(false);
        setPaymentSuccess(true);
        clearCart();
        showToast(isRTL ? 'تم تأكيد التحويل اللحظي عبر إنستاباي بنجاح!' : 'InstaPay transfer confirmed successfully!');
      }, 2300);
    } else if (activeMethod === 'wallet') {
      if (walletStep === 'phone') {
        setProcessingStep(isRTL ? 'إرسال طلب الخصم USSD Push إلى هاتفك...' : 'Pushing USSD deduction prompt to your mobile...');
        setTimeout(() => {
          setIsProcessing(false);
          setWalletStep('otp');
          showToast(isRTL ? 'أدخل الرقم السري / OTP للمحفظة لتأكيد الخصم' : 'Enter Wallet PIN / OTP to authorize');
        }, 1200);
      } else {
        setProcessingStep(isRTL ? 'التحقق من رصيد المحفظة واعتماد الخصم الفوري...' : 'Authorizing wallet balance & final settlement...');
        setTimeout(() => {
          setIsProcessing(false);
          setPaymentSuccess(true);
          clearCart();
          showToast(isRTL ? 'تم خصم المبلغ من المحفظة وتأكيد الطلب!' : 'Wallet deduction approved! Order confirmed.');
        }, 1800);
      }
    } else if (activeMethod === 'card') {
      setProcessingStep(isRTL ? 'الاتصال ببوابة البنك المصدِر للبطاقة (3D Secure)...' : 'Authenticating with Egyptian Issuer Bank (3D Secure)...');
      setTimeout(() => {
        setIsProcessing(false);
        setIs3DSecureOpen(true);
      }, 1200);
    } else if (activeMethod === 'valu') {
      setProcessingStep(isRTL ? `حساب خطة التقسيط على ${installmentMonths} أشهر بدون فوائد...` : `Structuring ${installmentMonths}-month 0% interest installment plan...`);
      setTimeout(() => {
        setProcessingStep(isRTL ? 'التحقق من حد الائتمان لدى ValU والبنك المركزي...' : 'Verifying ValU line of credit & I-Score...');
      }, 1000);
      setTimeout(() => {
        setIsProcessing(false);
        setPaymentSuccess(true);
        clearCart();
        showToast(isRTL ? 'تمت الموافقة على خطة التقسيط واعتماد الطلب!' : 'ValU Installment Plan Approved & Confirmed!');
      }, 2200);
    } else if (activeMethod === 'fawry') {
      setProcessingStep(isRTL ? 'إصدار كود الدفع المرجعي وتعميمه على شبكة فوري وأمان...' : 'Broadcasting payment reference to Fawry & Aman POS network...');
      setTimeout(() => {
        setIsProcessing(false);
        setPaymentSuccess(true);
        clearCart();
        showToast(isRTL ? 'تم إصدار كود الدفع لدى فوري بنجاح!' : 'Fawry Pay reference code generated successfully!');
      }, 1500);
    }
  };

  const handleVerify3DSecure = () => {
    setIs3DSecureOpen(false);
    setIsProcessing(true);
    setProcessingStep(isRTL ? 'مصادقة البنك المركزي والبنك الأهلي المصري...' : 'Verifying 3DS OTP token with CBE gateway...');
    setTimeout(() => {
      setIsProcessing(false);
      setPaymentSuccess(true);
      clearCart();
      showToast(isRTL ? 'تمت عملية الدفع ببطاقة ميزة/البنك بنجاح!' : 'Card payment settled successfully!');
    }, 1800);
  };

  const handleDownloadInvoice = () => {
    generateArchitecturalSpecSheetPdf({
      roomType: roomDesignState.roomType,
      dimensions: roomDesignState.dimensions,
      style: roomDesignState.style,
      budgetEgp: roomDesignState.budgetEgp,
      prompt: roomDesignState.prompt,
      proposal: activeProposalForDetail || proposals.find(p => p.id === selectedProposalId) || null,
      items: cart,
      subtotalEgp,
      totalEgp: effectiveAmount,
      isRTL,
    });
    showToast(isRTL ? 'جاري تحميل إيصال الدفع والمقايسة المعمارية...' : 'Downloading Architectural Spec Sheet & Official Receipt (.PDF)...');
  };

  const Arrow = isRTL ? ArrowLeft : ArrowRight;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/75 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-in fade-in">
      <div className="relative w-full max-w-3xl bg-white dark:bg-[#141210] rounded-3xl shadow-2xl border border-[#E8E2D9] dark:border-[#2D2A26] overflow-hidden flex flex-col transition-all">
        
        {/* Top Header */}
        <div className="p-5 sm:p-6 bg-[#F8F7F3] dark:bg-[#1A1816] border-b border-[#E8E2D9] dark:border-[#2D2A26] flex items-center justify-between transition-colors">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#292722] dark:bg-[#F8F7F3] text-white dark:text-[#292722] flex items-center justify-center shadow-sm">
              <Building className="w-5 h-5 text-[#B58A54]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-editorial font-bold text-lg text-[#292722] dark:text-[#F8F7F3]">
                  {isRTL ? 'بوابة الدفع الإلكتروني المعتمدة في مصر' : 'Egyptian Virtual Payment Gateway'}
                </h3>
                <span className="hidden sm:inline-flex px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 text-[10px] font-bold uppercase tracking-wider items-center gap-1 border border-emerald-500/20">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                  {isRTL ? 'معتمد CBE' : 'CBE Certified'}
                </span>
              </div>
              <p className="text-xs text-[#6E6A63] dark:text-[#A39E96] font-normal">
                {paymentTitle || (isRTL ? 'حجز وتأكيد قطع الأثاث من معارض القاهرة والشيخ زايد' : 'Furniture Showroom Order Checkout · Cairo & Sheikh Zayed')}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="text-end">
              <span className="text-[10px] uppercase font-bold text-[#6E6A63] dark:text-[#A39E96] block">
                {isRTL ? 'المبلغ الإجمالي' : 'Total Payable'}
              </span>
              <span className="font-editorial text-lg sm:text-xl font-bold text-[#292722] dark:text-[#F8F7F3]">
                {formatPrice(effectiveAmount)}
              </span>
            </div>

            <button
              onClick={closePaymentModal}
              className="p-2 rounded-full hover:bg-white dark:hover:bg-[#25221F] text-[#6E6A63] hover:text-[#292722] dark:hover:text-[#F8F7F3] transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto max-h-[75vh]">
          {paymentSuccess ? (
            /* ================= SUCCESS RECEIPT SCREEN ================= */
            <div className="py-6 text-center space-y-6 animate-in zoom-in-95">
              <div className="w-20 h-20 rounded-full bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto border-2 border-emerald-300 dark:border-emerald-800 shadow-lg">
                <CheckCircle2 className="w-10 h-10 animate-bounce" />
              </div>

              <div className="space-y-2">
                <span className="px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-900/40 text-emerald-800 dark:text-emerald-300 text-xs font-bold uppercase tracking-wider">
                  {isRTL ? 'تم تأكيد السداد المالي بنجاح' : 'Payment Successfully Settled'}
                </span>
                <h4 className="text-3xl font-editorial font-bold text-[#292722] dark:text-[#F8F7F3]">
                  {isRTL ? 'تم اعتماد طلبك وإخطار المعرض' : 'Order Confirmed & Showroom Notified'}
                </h4>
                <p className="text-xs text-[#6E6A63] dark:text-[#A39E96] max-w-md mx-auto leading-relaxed">
                  {isRTL 
                    ? `تم سداد ${formatPrice(effectiveAmount)} بنجاح وحجز القطع في مستودع المعرض بالقاهرة. تم إرسال رسالة تأكيد SMS ورقم التتبع إلى هاتفك.`
                    : `Payment of ${formatPrice(effectiveAmount)} authorized and reserved at Cairo showroom inventory. An SMS receipt with your delivery tracking code has been dispatched.`}
                </p>
              </div>

              {/* Receipt Summary Card */}
              <div className="max-w-md mx-auto bg-[#F8F7F3] dark:bg-[#1A1816] rounded-2xl border border-[#E8E2D9] dark:border-[#2D2A26] p-5 text-start space-y-3">
                <div className="flex justify-between items-center text-xs pb-3 border-b border-[#E8E2D9] dark:border-[#2D2A26]">
                  <span className="text-[#6E6A63] dark:text-[#A39E96]">{isRTL ? 'رقم الطلب المرجعي:' : 'Order Reference:'}</span>
                  <span className="font-mono font-bold text-[#292722] dark:text-[#F8F7F3]">{generatedOrderRef}</span>
                </div>
                <div className="flex justify-between items-center text-xs pb-3 border-b border-[#E8E2D9] dark:border-[#2D2A26]">
                  <span className="text-[#6E6A63] dark:text-[#A39E96]">{isRTL ? 'طريقة الدفع المصرية:' : 'Gateway Used:'}</span>
                  <span className="font-bold uppercase text-[#B58A54]">
                    {activeMethod === 'instapay' ? 'InstaPay (IPN Egypt)' :
                     activeMethod === 'wallet' ? `Mobile Wallet (${selectedWallet.toUpperCase()})` :
                     activeMethod === 'card' ? `Bank Card (${cardNetwork.toUpperCase()})` :
                     activeMethod === 'valu' ? `ValU Installments (${installmentMonths}M)` :
                     'Fawry Pay Kiosk Code'}
                  </span>
                </div>
                <div className="flex justify-between items-center text-xs pb-3 border-b border-[#E8E2D9] dark:border-[#2D2A26]">
                  <span className="text-[#6E6A63] dark:text-[#A39E96]">{isRTL ? 'تاريخ ووقت المعاملة:' : 'Timestamp:'}</span>
                  <span className="text-[#292722] dark:text-[#F8F7F3]">{new Date().toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center text-xs">
                  <span className="text-[#6E6A63] dark:text-[#A39E96]">{isRTL ? 'حالة التوصيل والمعاينة:' : 'Delivery & Assembly:'}</span>
                  <span className="font-bold text-emerald-700 dark:text-emerald-400">
                    {isRTL ? 'توصيل مجاني خلال 48 ساعة مع التركيب' : 'Free 48h Delivery & White-Glove Staging'}
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
                <button
                  onClick={handleDownloadInvoice}
                  className="w-full sm:w-auto px-6 py-3 rounded-xl bg-[#E9DFD0] hover:bg-[#DDD0BE] dark:bg-[#25211D] dark:hover:bg-[#2F2A25] border border-[#CDBBA5]/70 text-xs font-bold text-[#292722] dark:text-[#F8F7F3] flex items-center justify-center gap-2 cursor-pointer transition-colors shadow-xs"
                >
                  <Download className="w-4 h-4 text-[#B58A54]" />
                  <span>{isRTL ? 'تحميل المقايسة وإيصال السداد (PDF)' : 'Download Architectural Spec Sheet (.PDF)'}</span>
                </button>
                <button
                  onClick={closePaymentModal}
                  className="w-full sm:w-auto px-8 py-3 rounded-xl bg-[#292722] hover:bg-[#3D3A34] text-white dark:bg-[#F8F7F3] dark:hover:bg-white dark:text-[#292722] text-xs font-bold uppercase tracking-wider cursor-pointer transition-all shadow-sm"
                >
                  {isRTL ? 'العودة للمنصة' : 'Done & Return'}
                </button>
              </div>
            </div>
          ) : (
            /* ================= PAYMENT GATEWAYS SELECTION ================= */
            <div className="space-y-6">
              
              {/* Egyptian Gateway Tabs */}
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 p-1.5 bg-[#F8F7F3] dark:bg-[#1E1C1A] rounded-2xl border border-[#E8E2D9] dark:border-[#2D2A26]">
                
                {/* 1. InstaPay */}
                <button
                  onClick={() => setActiveMethod('instapay')}
                  className={`flex flex-col items-center justify-center p-3 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    activeMethod === 'instapay'
                      ? 'bg-white dark:bg-[#2A2622] text-[#292722] dark:text-[#F8F7F3] shadow-sm border border-[#E8E2D9] dark:border-[#3D3833]'
                      : 'text-[#6E6A63] hover:text-[#292722] dark:text-[#A39E96] dark:hover:text-[#F8F7F3]'
                  }`}
                >
                  <div className="w-8 h-8 rounded-lg bg-[#532677]/10 text-[#532677] dark:text-[#B07AE3] flex items-center justify-center mb-1.5 font-black text-sm">
                    IPN
                  </div>
                  <span>{isRTL ? 'إنستاباي' : 'InstaPay'}</span>
                  <span className="text-[9px] font-normal text-[#B58A54]">
                    {isRTL ? 'لحظي 0% رسوم' : 'Instant 0%'}
                  </span>
                </button>

                {/* 2. Mobile Wallets */}
                <button
                  onClick={() => setActiveMethod('wallet')}
                  className={`flex flex-col items-center justify-center p-3 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    activeMethod === 'wallet'
                      ? 'bg-white dark:bg-[#2A2622] text-[#292722] dark:text-[#F8F7F3] shadow-sm border border-[#E8E2D9] dark:border-[#3D3833]'
                      : 'text-[#6E6A63] hover:text-[#292722] dark:text-[#A39E96] dark:hover:text-[#F8F7F3]'
                  }`}
                >
                  <div className="w-8 h-8 rounded-lg bg-red-500/10 text-red-600 dark:text-red-400 flex items-center justify-center mb-1.5">
                    <Smartphone className="w-4 h-4" />
                  </div>
                  <span>{isRTL ? 'محافظ كاش' : 'Wallets'}</span>
                  <span className="text-[9px] font-normal text-[#6E6A63] dark:text-[#A39E96]">
                    {isRTL ? 'فودافون/أورنج' : 'VF/Orange/WE'}
                  </span>
                </button>

                {/* 3. Bank Cards & Meeza */}
                <button
                  onClick={() => setActiveMethod('card')}
                  className={`flex flex-col items-center justify-center p-3 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    activeMethod === 'card'
                      ? 'bg-white dark:bg-[#2A2622] text-[#292722] dark:text-[#F8F7F3] shadow-sm border border-[#E8E2D9] dark:border-[#3D3833]'
                      : 'text-[#6E6A63] hover:text-[#292722] dark:text-[#A39E96] dark:hover:text-[#F8F7F3]'
                  }`}
                >
                  <div className="w-8 h-8 rounded-lg bg-blue-500/10 text-blue-600 dark:text-blue-400 flex items-center justify-center mb-1.5">
                    <CreditCard className="w-4 h-4" />
                  </div>
                  <span>{isRTL ? 'ميزة وكروت' : 'Cards'}</span>
                  <span className="text-[9px] font-normal text-[#6E6A63] dark:text-[#A39E96]">
                    {isRTL ? 'ميزة / فيزا' : 'Meeza/Visa'}
                  </span>
                </button>

                {/* 4. ValU Installments */}
                <button
                  onClick={() => setActiveMethod('valu')}
                  className={`flex flex-col items-center justify-center p-3 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    activeMethod === 'valu'
                      ? 'bg-white dark:bg-[#2A2622] text-[#292722] dark:text-[#F8F7F3] shadow-sm border border-[#E8E2D9] dark:border-[#3D3833]'
                      : 'text-[#6E6A63] hover:text-[#292722] dark:text-[#A39E96] dark:hover:text-[#F8F7F3]'
                  }`}
                >
                  <div className="w-8 h-8 rounded-lg bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center mb-1.5">
                    <Percent className="w-4 h-4" />
                  </div>
                  <span>{isRTL ? 'تقسيط فاليو' : 'ValU BNPL'}</span>
                  <span className="text-[9px] font-normal text-emerald-600 dark:text-emerald-400 font-bold">
                    {isRTL ? '0% فوائد' : '0% Interest'}
                  </span>
                </button>

                {/* 5. Fawry Pay */}
                <button
                  onClick={() => setActiveMethod('fawry')}
                  className={`flex flex-col items-center justify-center p-3 rounded-xl text-xs font-bold transition-all cursor-pointer col-span-2 sm:col-span-1 ${
                    activeMethod === 'fawry'
                      ? 'bg-white dark:bg-[#2A2622] text-[#292722] dark:text-[#F8F7F3] shadow-sm border border-[#E8E2D9] dark:border-[#3D3833]'
                      : 'text-[#6E6A63] hover:text-[#292722] dark:text-[#A39E96] dark:hover:text-[#F8F7F3]'
                  }`}
                >
                  <div className="w-8 h-8 rounded-lg bg-yellow-500/10 text-yellow-700 dark:text-yellow-400 flex items-center justify-center mb-1.5 font-black text-xs">
                    FAWRY
                  </div>
                  <span>{isRTL ? 'فوري وأمان' : 'Fawry Pay'}</span>
                  <span className="text-[9px] font-normal text-[#6E6A63] dark:text-[#A39E96]">
                    {isRTL ? 'كود دفع' : 'POS Kiosks'}
                  </span>
                </button>
              </div>

              {/* TAB 1: INSTAPAY */}
              {activeMethod === 'instapay' && (
                <div className="space-y-5 animate-in fade-in">
                  <div className="p-4 rounded-2xl bg-[#532677]/5 dark:bg-[#532677]/20 border border-[#532677]/20 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div className="space-y-1 text-center sm:text-start">
                      <div className="flex items-center gap-2 justify-center sm:justify-start">
                        <span className="px-2 py-0.5 rounded bg-[#532677] text-white text-[10px] font-bold tracking-wider">
                          INSTAPAY EGYPT
                        </span>
                        <span className="text-xs font-bold text-[#532677] dark:text-[#D1A7FF]">
                          {isRTL ? 'شبكة المدفوعات اللحظية المعتمدة (IPN)' : 'Instant Payment Network (CBE)'}
                        </span>
                      </div>
                      <p className="text-xs text-[#6E6A63] dark:text-[#B5B0A8]">
                        {isRTL 
                          ? 'حوّل المبلغ مباشرة عبر تطبيق إنستاباي باستخدام عنوان الدفع اللحظي (IPA) أو مسح رمز الاستجابة السريعة (QR Code).'
                          : 'Transfer directly using the Instant Payment Address (IPA) or scan the official dynamic QR.'}
                      </p>
                    </div>

                    <div className="shrink-0 flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
                      <span className="text-xs font-mono font-bold text-emerald-700 dark:text-emerald-400">
                        {isRTL ? 'الشبكة تعمل لحظياً' : 'IPN Gateway Online'}
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5 items-center">
                    {/* QR Code Section */}
                    <div className="p-5 rounded-2xl bg-[#F8F7F3] dark:bg-[#1A1816] border border-[#E8E2D9] dark:border-[#2D2A26] text-center space-y-3">
                      <div className="relative inline-block p-4 bg-white rounded-2xl shadow-sm border border-[#E8E2D9]">
                        <svg className="w-36 h-36 mx-auto" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                          {/* Stylized QR Code Pattern */}
                          <rect width="100" height="100" fill="white" />
                          <rect x="10" y="10" width="28" height="28" fill="#292722" rx="4" />
                          <rect x="16" y="16" width="16" height="16" fill="white" />
                          <rect x="20" y="20" width="8" height="8" fill="#532677" />
                          <rect x="62" y="10" width="28" height="28" fill="#292722" rx="4" />
                          <rect x="68" y="16" width="16" height="16" fill="white" />
                          <rect x="72" y="20" width="8" height="8" fill="#532677" />
                          <rect x="10" y="62" width="28" height="28" fill="#292722" rx="4" />
                          <rect x="16" y="68" width="16" height="16" fill="white" />
                          <rect x="20" y="72" width="8" height="8" fill="#532677" />
                          <rect x="44" y="14" width="8" height="16" fill="#B58A54" />
                          <rect x="44" y="38" width="12" height="12" fill="#292722" />
                          <rect x="60" y="44" width="26" height="8" fill="#292722" />
                          <rect x="44" y="60" width="16" height="26" fill="#532677" />
                          <rect x="68" y="68" width="18" height="18" fill="#B58A54" />
                        </svg>
                        <div className="absolute inset-0 m-auto w-9 h-9 rounded-full bg-white shadow-md flex items-center justify-center font-black text-xs text-[#532677] border border-[#532677]/30">
                          IPN
                        </div>
                      </div>
                      <p className="text-[11px] text-[#6E6A63] dark:text-[#A39E96]">
                        {isRTL ? 'امسح الرمز بكاميرا تطبيق إنستاباي للدفع' : 'Scan in InstaPay app for instant 1-tap checkout'}
                      </p>
                    </div>

                    {/* Transfer Details Details */}
                    <div className="space-y-3">
                      {/* IPA Handle */}
                      <div className="space-y-1">
                        <label className="text-[11px] font-bold text-[#6E6A63] dark:text-[#A39E96] uppercase tracking-wider block">
                          {isRTL ? 'عنوان الدفع اللحظي الرسمي (IPA)' : 'Official InstaPay IPA Address'}
                        </label>
                        <div className="flex items-center gap-2 p-2.5 rounded-xl bg-[#F8F7F3] dark:bg-[#1A1816] border border-[#E8E2D9] dark:border-[#2D2A26]">
                          <span className="font-mono font-bold text-sm text-[#292722] dark:text-[#F8F7F3] flex-1">
                            {instapayIpa}
                          </span>
                          <button
                            onClick={() => handleCopy(instapayIpa, 'ipa')}
                            className="p-1.5 rounded-lg bg-white dark:bg-[#25211D] border border-[#E8E2D9] dark:border-[#3D3833] text-xs font-bold text-[#292722] dark:text-[#F8F7F3] flex items-center gap-1 cursor-pointer hover:bg-stone-50"
                          >
                            {copiedField === 'ipa' ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5 text-[#B58A54]" />}
                            <span className="text-[10px]">{copiedField === 'ipa' ? (isRTL ? 'تم' : 'Copied') : (isRTL ? 'نسخ' : 'Copy')}</span>
                          </button>
                        </div>
                      </div>

                      {/* Bank & Phone */}
                      <div className="grid grid-cols-2 gap-2 text-xs">
                        <div className="p-2.5 rounded-xl bg-[#F8F7F3] dark:bg-[#1A1816] border border-[#E8E2D9] dark:border-[#2D2A26]">
                          <span className="text-[10px] text-[#6E6A63] dark:text-[#A39E96] block">{isRTL ? 'المصرف الشريك:' : 'Settlement Bank:'}</span>
                          <span className="font-bold text-[#292722] dark:text-[#F8F7F3] truncate block">{instapayBank}</span>
                        </div>
                        <div className="p-2.5 rounded-xl bg-[#F8F7F3] dark:bg-[#1A1816] border border-[#E8E2D9] dark:border-[#2D2A26]">
                          <span className="text-[10px] text-[#6E6A63] dark:text-[#A39E96] block">{isRTL ? 'رقم الهاتف:' : 'Registered Mobile:'}</span>
                          <span className="font-mono font-bold text-[#292722] dark:text-[#F8F7F3]">{instapayPhone}</span>
                        </div>
                      </div>

                      {/* Sender verification input */}
                      <div className="space-y-1 pt-1">
                        <label className="text-[11px] font-bold text-[#6E6A63] dark:text-[#A39E96] block">
                          {isRTL ? 'عنوان حسابك في إنستاباي أو رقم هاتفك (للمطابقة اللحظية):' : 'Your InstaPay IPA or Mobile Number (Optional):'}
                        </label>
                        <input
                          type="text"
                          value={instapaySenderIpa}
                          onChange={(e) => setInstapaySenderIpa(e.target.value)}
                          placeholder="e.g. name@instapay or 010xxxxxxxx"
                          className="w-full px-3 py-2 rounded-xl bg-white dark:bg-[#1A1816] border border-[#E8E2D9] dark:border-[#2D2A26] text-xs font-mono text-[#292722] dark:text-[#F8F7F3] focus:outline-none focus:border-[#B58A54]"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 2: MOBILE WALLETS */}
              {activeMethod === 'wallet' && (
                <div className="space-y-5 animate-in fade-in">
                  <div className="space-y-2">
                    <label className="text-[11px] font-bold text-[#6E6A63] dark:text-[#A39E96] uppercase tracking-wider block">
                      {isRTL ? 'اختر مزوّد المحفظة الإلكترونية في مصر:' : 'Select Egyptian Mobile Wallet Provider:'}
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                      {([
                        { id: 'vodafone', name: 'فودافون كاش', nameEn: 'Vodafone Cash', color: '#E60000', prefix: '010' },
                        { id: 'orange', name: 'أورنج كاش', nameEn: 'Orange Cash', color: '#FF7900', prefix: '012' },
                        { id: 'etisalat', name: 'اتصالات كاش', nameEn: 'Etisalat Cash', color: '#719E19', prefix: '011' },
                        { id: 'we', name: 'وي باي', nameEn: 'WE Pay', color: '#5F259F', prefix: '015' },
                      ] as const).map((w) => (
                        <button
                          key={w.id}
                          onClick={() => setSelectedWallet(w.id)}
                          className={`p-3 rounded-2xl border text-center transition-all cursor-pointer ${
                            selectedWallet === w.id
                              ? 'bg-white dark:bg-[#25211D] border-[#B58A54] shadow-sm ring-1 ring-[#B58A54]'
                              : 'bg-[#F8F7F3] dark:bg-[#1A1816] border-[#E8E2D9] dark:border-[#2D2A26] opacity-75 hover:opacity-100'
                          }`}
                        >
                          <div
                            className="w-8 h-8 rounded-full text-white mx-auto flex items-center justify-center font-bold text-xs mb-1.5 shadow-xs"
                            style={{ backgroundColor: w.color }}
                          >
                            {w.prefix}
                          </div>
                          <span className="text-xs font-bold text-[#292722] dark:text-[#F8F7F3] block">
                            {isRTL ? w.name : w.nameEn}
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {walletStep === 'phone' ? (
                    <div className="p-4 rounded-2xl bg-[#F8F7F3] dark:bg-[#1A1816] border border-[#E8E2D9] dark:border-[#2D2A26] space-y-3">
                      <label className="text-xs font-bold text-[#292722] dark:text-[#F8F7F3] block">
                        {isRTL ? 'رقم الهاتف المسجل بالمحفظة (11 رقم):' : 'Registered Egyptian Mobile Number (11 digits):'}
                      </label>
                      <div className="relative">
                        <input
                          type="tel"
                          value={walletPhone}
                          onChange={(e) => setWalletPhone(e.target.value)}
                          placeholder="010xxxxxxxx"
                          className="w-full px-4 py-2.5 rounded-xl bg-white dark:bg-[#141210] border border-[#E8E2D9] dark:border-[#2D2A26] text-sm font-mono font-bold text-[#292722] dark:text-[#F8F7F3] focus:outline-none focus:border-[#B58A54]"
                        />
                        <span className="absolute top-2.5 right-3 text-xs font-bold text-emerald-600">
                          {isRTL ? 'مقبول' : 'Valid'}
                        </span>
                      </div>
                      <p className="text-[11px] text-[#6E6A63] dark:text-[#A39E96]">
                        {isRTL 
                          ? 'عند الضغط على المتابعة، سيصلك إشعار فوري على هاتفك لطلب إدخال الرقم السري لتأكيد المعاملة.'
                          : 'Upon clicking proceed, an instant USSD popup will trigger on your phone asking for your wallet PIN.'}
                      </p>
                    </div>
                  ) : (
                    <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/20 space-y-3 animate-in fade-in">
                      <div className="flex items-center gap-2 text-amber-800 dark:text-amber-300 text-xs font-bold">
                        <Clock className="w-4 h-4 animate-spin" />
                        <span>{isRTL ? 'أدخل كود التحقق السريع (OTP) المرسل لهاتفك:' : 'Enter OTP Verification Code Sent to Phone:'}</span>
                      </div>
                      <input
                        type="text"
                        value={walletOtp}
                        onChange={(e) => setWalletOtp(e.target.value)}
                        placeholder="8492"
                        maxLength={6}
                        className="w-full px-4 py-2.5 rounded-xl bg-white dark:bg-[#141210] border border-amber-500/40 text-center text-lg font-mono tracking-[0.5em] font-bold text-[#292722] dark:text-[#F8F7F3] focus:outline-none"
                      />
                      <button
                        onClick={() => setWalletOtp('8492')}
                        className="text-[11px] text-[#B58A54] hover:underline cursor-pointer block text-center mx-auto"
                      >
                        {isRTL ? 'إدراج كود تجريبي تلقائي (8492)' : 'Insert Simulated OTP (8492)'}
                      </button>
                    </div>
                  )}
                </div>
              )}

              {/* TAB 3: CARDS & MEEZA */}
              {activeMethod === 'card' && (
                <div className="space-y-5 animate-in fade-in">
                  
                  {/* Luxury Egyptian Card Mockup */}
                  <div className="relative w-full max-w-sm mx-auto h-48 rounded-2xl bg-gradient-to-tr from-[#1E1C1A] via-[#2D2A26] to-[#403B35] text-white p-5 shadow-xl border border-white/10 flex flex-col justify-between overflow-hidden">
                    <div className="absolute top-0 right-0 w-48 h-48 bg-[#B58A54]/15 rounded-full blur-2xl pointer-events-none" />
                    
                    <div className="flex justify-between items-center relative z-10">
                      <div className="flex items-center gap-1.5">
                        <span className="font-editorial font-bold text-sm tracking-widest text-[#E9DFD0]">ROOMORA</span>
                        <span className="text-[9px] text-[#B58A54] font-mono">BLACK VIP</span>
                      </div>
                      <span className="px-2 py-0.5 rounded bg-white/10 text-[10px] font-bold tracking-wider uppercase border border-white/15">
                        {cardNetwork.toUpperCase()}
                      </span>
                    </div>

                    {/* Chip + Contactless */}
                    <div className="flex items-center gap-2 relative z-10 my-2">
                      <div className="w-9 h-7 rounded bg-gradient-to-br from-[#E2C792] to-[#B38E46] border border-amber-200/50 shadow-xs flex items-center justify-center">
                        <div className="w-5 h-4 border border-black/20 rounded-xs" />
                      </div>
                      <svg className="w-4 h-4 text-white/70" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M8.5 16.5a5 5 0 0 1 0-9M12 19a8.5 8.5 0 0 0 0-14M15.5 21.5a12 12 0 0 0 0-19" />
                      </svg>
                    </div>

                    <div className="relative z-10 space-y-1">
                      <div className="font-mono text-base tracking-[0.2em] font-bold text-stone-100">
                        {cardNumber}
                      </div>
                      <div className="flex justify-between items-center text-[10px] text-stone-300 font-mono pt-1">
                        <span className="truncate max-w-[170px] uppercase font-semibold">{cardHolder}</span>
                        <span>EXP: {cardExpiry}</span>
                      </div>
                    </div>
                  </div>

                  {/* Card Form Inputs */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                    <div className="sm:col-span-2 space-y-1">
                      <div className="flex justify-between items-center">
                        <label className="font-bold text-[#6E6A63] dark:text-[#A39E96]">
                          {isRTL ? 'رقم البطاقة (ميزة الوطنية أو فيزا أو ماستركارد):' : 'Card Number (Meeza, Visa, Mastercard):'}
                        </label>
                        <button
                          onClick={fillDemoCard}
                          className="text-[10px] text-[#B58A54] hover:underline cursor-pointer font-bold"
                        >
                          {isRTL ? 'تعبئة بطاقة ميزة تجريبية' : 'Fill Demo Meeza Card'}
                        </button>
                      </div>
                      <input
                        type="text"
                        value={cardNumber}
                        onChange={(e) => setCardNumber(e.target.value)}
                        className="w-full px-3 py-2 rounded-xl bg-[#F8F7F3] dark:bg-[#1A1816] border border-[#E8E2D9] dark:border-[#2D2A26] font-mono font-bold text-[#292722] dark:text-[#F8F7F3] focus:outline-none focus:border-[#B58A54]"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="font-bold text-[#6E6A63] dark:text-[#A39E96]">
                        {isRTL ? 'اسم حامل البطاقة:' : 'Cardholder Name:'}
                      </label>
                      <input
                        type="text"
                        value={cardHolder}
                        onChange={(e) => setCardHolder(e.target.value)}
                        className="w-full px-3 py-2 rounded-xl bg-[#F8F7F3] dark:bg-[#1A1816] border border-[#E8E2D9] dark:border-[#2D2A26] font-medium text-[#292722] dark:text-[#F8F7F3] focus:outline-none focus:border-[#B58A54]"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <div className="space-y-1">
                        <label className="font-bold text-[#6E6A63] dark:text-[#A39E96]">
                          {isRTL ? 'الانتهاء:' : 'Expiry:'}
                        </label>
                        <input
                          type="text"
                          value={cardExpiry}
                          onChange={(e) => setCardExpiry(e.target.value)}
                          placeholder="MM/YY"
                          className="w-full px-3 py-2 rounded-xl bg-[#F8F7F3] dark:bg-[#1A1816] border border-[#E8E2D9] dark:border-[#2D2A26] font-mono text-center text-[#292722] dark:text-[#F8F7F3] focus:outline-none focus:border-[#B58A54]"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="font-bold text-[#6E6A63] dark:text-[#A39E96]">
                          CVV:
                        </label>
                        <input
                          type="password"
                          value={cardCvv}
                          onChange={(e) => setCardCvv(e.target.value)}
                          maxLength={4}
                          placeholder="•••"
                          className="w-full px-3 py-2 rounded-xl bg-[#F8F7F3] dark:bg-[#1A1816] border border-[#E8E2D9] dark:border-[#2D2A26] font-mono text-center text-[#292722] dark:text-[#F8F7F3] focus:outline-none focus:border-[#B58A54]"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 4: VALU & INSTALLMENTS */}
              {activeMethod === 'valu' && (
                <div className="space-y-5 animate-in fade-in">
                  
                  {/* BNPL Provider Selector */}
                  <div className="grid grid-cols-3 gap-2">
                    {([
                      { id: 'valu', name: 'فاليو (valU)', note: '0% فوائد حتى 6 أشهر' },
                      { id: 'sympl', name: 'سيمبل (Sympl)', note: 'قسطها على 3 أو 4 دفعات' },
                      { id: 'tabby', name: 'تابي (Tabby)', note: '4 دفعات شهرية متساوية' },
                    ] as const).map((b) => (
                      <button
                        key={b.id}
                        onClick={() => setSelectedBnpl(b.id)}
                        className={`p-3 rounded-2xl border text-center transition-all cursor-pointer ${
                          selectedBnpl === b.id
                            ? 'bg-white dark:bg-[#25211D] border-[#B58A54] ring-1 ring-[#B58A54] shadow-sm'
                            : 'bg-[#F8F7F3] dark:bg-[#1A1816] border-[#E8E2D9] dark:border-[#2D2A26] opacity-75 hover:opacity-100'
                        }`}
                      >
                        <span className="text-xs font-bold text-[#292722] dark:text-[#F8F7F3] block">
                          {b.name}
                        </span>
                        <span className="text-[9px] text-[#B58A54] block mt-0.5">
                          {b.note}
                        </span>
                      </button>
                    ))}
                  </div>

                  {/* Installment Term Selector */}
                  <div className="space-y-2">
                    <label className="text-[11px] font-bold text-[#6E6A63] dark:text-[#A39E96] uppercase tracking-wider block">
                      {isRTL ? 'اختر مدة التقسيط الأنسب لميزانيتك:' : 'Select Installment Duration:'}
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                      {[3, 6, 12, 24].map((m) => {
                        const monthly = Math.round(effectiveAmount / m);
                        const isZeroInterest = m <= 6;
                        return (
                          <button
                            key={m}
                            onClick={() => setInstallmentMonths(m)}
                            className={`p-3 rounded-2xl border text-start transition-all cursor-pointer ${
                              installmentMonths === m
                                ? 'bg-[#292722] text-white dark:bg-[#F8F7F3] dark:text-[#292722] border-[#292722] dark:border-white shadow-sm'
                                : 'bg-[#F8F7F3] dark:bg-[#1A1816] border-[#E8E2D9] dark:border-[#2D2A26] text-[#292722] dark:text-[#F8F7F3]'
                            }`}
                          >
                            <div className="flex justify-between items-center mb-1">
                              <span className="font-bold text-xs">{m} {isRTL ? 'أشهر' : 'Months'}</span>
                              {isZeroInterest && (
                                <span className={`text-[8px] font-black uppercase px-1.5 py-0.5 rounded ${
                                  installmentMonths === m ? 'bg-[#B58A54] text-white' : 'bg-emerald-500/15 text-emerald-700 dark:text-emerald-400'
                                }`}>
                                  0% فوائد
                                </span>
                              )}
                            </div>
                            <span className="font-editorial font-bold text-sm block">
                              {formatPrice(monthly)}
                            </span>
                            <span className={`text-[9px] block ${installmentMonths === m ? 'opacity-80' : 'text-[#6E6A63] dark:text-[#A39E96]'}`}>
                              {isRTL ? 'لكل شهر' : '/ month'}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Summary & ValU Phone Verification */}
                  <div className="p-4 rounded-2xl bg-[#F8F7F3] dark:bg-[#1A1816] border border-[#E8E2D9] dark:border-[#2D2A26] space-y-3">
                    <div className="flex justify-between items-center text-xs">
                      <span className="text-[#6E6A63] dark:text-[#A39E96]">{isRTL ? 'الدفعة الأولى الآن (مقدم):' : 'Down Payment Today:'}</span>
                      <span className="font-bold text-emerald-700 dark:text-emerald-400">0.00 EGP (0%)</span>
                    </div>
                    <div className="flex justify-between items-center text-xs">
                      <span className="text-[#6E6A63] dark:text-[#A39E96]">{isRTL ? 'المصاريف الإدارية:' : 'Admin Fees:'}</span>
                      <span className="font-bold text-emerald-700 dark:text-emerald-400">0.00 EGP (مجاناً)</span>
                    </div>
                    <div className="pt-2 border-t border-[#E8E2D9] dark:border-[#2D2A26] flex justify-between items-center">
                      <span className="text-xs font-bold text-[#292722] dark:text-[#F8F7F3]">{isRTL ? 'القسط الشهري الثابت:' : 'Fixed Monthly Installment:'}</span>
                      <span className="font-editorial text-base font-bold text-[#B58A54]">
                        {formatPrice(Math.round(effectiveAmount / installmentMonths))} / {isRTL ? 'شهر' : 'mo'}
                      </span>
                    </div>
                    <div className="pt-1">
                      <label className="text-[10px] font-bold text-[#6E6A63] dark:text-[#A39E96] block mb-1">
                        {isRTL ? 'رقم الهاتف المسجل بحساب ValU / الرقم القومي:' : 'Registered ValU Mobile / National ID:'}
                      </label>
                      <input
                        type="tel"
                        value={bnplPhone}
                        onChange={(e) => setBnplPhone(e.target.value)}
                        className="w-full px-3 py-2 rounded-xl bg-white dark:bg-[#141210] border border-[#E8E2D9] dark:border-[#2D2A26] text-xs font-mono font-bold text-[#292722] dark:text-[#F8F7F3] focus:outline-none focus:border-[#B58A54]"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 5: FAWRY PAY */}
              {activeMethod === 'fawry' && (
                <div className="space-y-5 animate-in fade-in">
                  <div className="p-5 rounded-2xl bg-[#FFF9E6] dark:bg-[#242014] border border-[#E8C872]/40 text-center space-y-3">
                    <span className="px-3 py-0.5 rounded-full bg-yellow-500/20 text-yellow-800 dark:text-yellow-300 text-[10px] font-bold uppercase tracking-wider">
                      FAWRY PAY KIOSK SLIP
                    </span>
                    <h4 className="text-xs font-bold text-[#292722] dark:text-[#F8F7F3]">
                      {isRTL ? 'كود الدفع المرجعي لدى منافذ فوري وأمان:' : 'Fawry & Aman Kiosk Reference Code:'}
                    </h4>

                    {/* Big Reference Number */}
                    <div className="inline-flex items-center gap-3 px-6 py-3 rounded-2xl bg-white dark:bg-[#181614] border-2 border-[#B58A54] shadow-sm">
                      <span className="font-mono text-2xl sm:text-3xl font-black tracking-widest text-[#292722] dark:text-[#F8F7F3]">
                        {fawryRefNumber}
                      </span>
                      <button
                        onClick={() => handleCopy(fawryRefNumber, 'fawry')}
                        className="p-2 rounded-xl bg-[#F8F7F3] dark:bg-[#25211D] hover:bg-[#E9DFD0] text-[#292722] dark:text-[#F8F7F3] cursor-pointer"
                        title="Copy code"
                      >
                        {copiedField === 'fawry' ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4 text-[#B58A54]" />}
                      </button>
                    </div>

                    <div className="flex items-center justify-center gap-2 text-xs text-[#6E6A63] dark:text-[#A39E96]">
                      <Clock className="w-3.5 h-3.5 text-amber-600" />
                      <span>{isRTL ? `صالح لمدة ${fawryExpiryHours} ساعة في جميع أنحاء مصر` : `Valid for ${fawryExpiryHours} hours nationwide`}</span>
                    </div>
                  </div>

                  {/* Kiosk Instructions */}
                  <div className="p-4 rounded-2xl bg-[#F8F7F3] dark:bg-[#1A1816] border border-[#E8E2D9] dark:border-[#2D2A26] space-y-2 text-xs">
                    <h5 className="font-bold text-[#292722] dark:text-[#F8F7F3]">
                      {isRTL ? 'خطوات السداد عبر أي منفذ فوري:' : 'How to pay at any Fawry / Aman POS:'}
                    </h5>
                    <ol className="list-decimal list-inside space-y-1.5 text-[#6E6A63] dark:text-[#A39E96] font-normal">
                      <li>{isRTL ? 'توجه لأقرب سوبرماركت، صيدلية، أو كشك مزود بماكينة فوري أو أمان.' : 'Visit any local grocery, pharmacy, or kiosk equipped with a Fawry or Aman terminal.'}</li>
                      <li>{isRTL ? 'اطلب من التاجر خدمة "مدفوعات فوري باي" (كود الخدمة: 788).' : 'Ask the merchant for "Fawry Pay Online Services" (Service code: 788).'}</li>
                      <li>{isRTL ? `أعطِه الرقم المرجعي (${fawryRefNumber}) وادفع المبلغ نقدياً.` : `Provide your reference code (${fawryRefNumber}) and settle in cash.`}</li>
                      <li>{isRTL ? 'استلم إيصال السداد؛ سيتم تحديث حالة طلبك لدينا تلقائياً فوراً.' : 'Collect your paper receipt; Roomora updates order fulfillment in real-time.'}</li>
                    </ol>
                  </div>
                </div>
              )}

              {/* Processing Spinner Overlay */}
              {isProcessing && (
                <div className="p-6 rounded-2xl bg-[#F8F7F3] dark:bg-[#1E1C1A] border border-[#B58A54]/40 text-center space-y-3 animate-in fade-in">
                  <RefreshCw className="w-8 h-8 text-[#B58A54] animate-spin mx-auto" />
                  <h5 className="font-editorial font-bold text-sm text-[#292722] dark:text-[#F8F7F3]">
                    {isRTL ? 'جاري الاتصال والتحقق المالي...' : 'Connecting to Egyptian Payment Switch...'}
                  </h5>
                  <p className="text-xs text-[#6E6A63] dark:text-[#A39E96]">
                    {processingStep}
                  </p>
                </div>
              )}

              {/* Footer Checkout Action */}
              <div className="pt-4 border-t border-[#E8E2D9] dark:border-[#2D2A26] flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-2 text-xs text-[#6E6A63] dark:text-[#A39E96]">
                  <Lock className="w-4 h-4 text-[#B58A54]" />
                  <span>{isRTL ? 'تشفير آمن 256-Bit وفق معايير البنك المركزي المصري' : '256-Bit SSL Encrypted under CBE Egyptian Standards'}</span>
                </div>

                <div className="flex items-center gap-3 w-full sm:w-auto">
                  <button
                    onClick={closePaymentModal}
                    className="w-1/2 sm:w-auto px-5 py-3 rounded-xl border border-[#E8E2D9] dark:border-[#2D2A26] text-xs font-bold text-[#6E6A63] dark:text-[#A39E96] hover:bg-[#F8F7F3] dark:hover:bg-[#1E1C1A] cursor-pointer"
                  >
                    {isRTL ? 'إلغاء' : 'Cancel'}
                  </button>
                  <button
                    onClick={handleExecutePayment}
                    disabled={isProcessing}
                    className="w-1/2 sm:w-auto px-8 py-3.5 rounded-xl bg-[#292722] hover:bg-[#3D3A34] text-white dark:bg-[#F8F7F3] dark:hover:bg-white dark:text-[#292722] text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer shadow-md transition-all disabled:opacity-50"
                  >
                    <span>
                      {activeMethod === 'instapay' ? (isRTL ? 'تأكيد التحويل عبر إنستاباي' : 'Authorize via InstaPay') :
                       activeMethod === 'wallet' ? (walletStep === 'phone' ? (isRTL ? 'إرسال طلب الخصم للمحفظة' : 'Send Wallet USSD Push') : (isRTL ? 'تأكيد كود المحفظة' : 'Confirm Wallet OTP')) :
                       activeMethod === 'card' ? (isRTL ? 'متابعة الدفع بالبطاقة' : 'Proceed with Card') :
                       activeMethod === 'valu' ? (isRTL ? `اعتماد قسط (${formatPrice(Math.round(effectiveAmount / installmentMonths))}/شهر)` : `Approve (${formatPrice(Math.round(effectiveAmount / installmentMonths))}/mo)`) :
                       (isRTL ? 'إصدار كود فوري النهائي' : 'Generate Fawry Slip')}
                    </span>
                    <Arrow className="w-4 h-4 text-[#B58A54] dark:text-[#292722]" />
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

      </div>

      {/* 3D-Secure Egyptian Bank Simulation Modal */}
      {is3DSecureOpen && (
        <div className="fixed inset-0 z-60 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 animate-in zoom-in-95">
          <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl overflow-hidden text-[#292722]">
            <div className="p-4 bg-[#141210] text-white flex items-center justify-between">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-[#B58A54]" />
                <span className="font-bold text-xs uppercase tracking-wider">CBE 3-D SECURE VERIFICATION</span>
              </div>
              <span className="text-[10px] font-mono text-[#D5C1A7]">BANQUE MISR / NBE</span>
            </div>

            <div className="p-6 space-y-4 text-xs">
              <p className="text-[#6E6A63]">
                {isRTL 
                  ? 'تم إرسال كود التحقق الأمني (OTP) في رسالة نصية SMS إلى رقم الهاتف المرتبط ببطاقتك لتفويض الدفع.'
                  : 'An OTP has been sent via SMS to your mobile registered with your Egyptian issuing bank.'}
              </p>

              <div className="p-3 rounded-xl bg-stone-50 border border-stone-200 space-y-1 text-[11px]">
                <div className="flex justify-between">
                  <span>Merchant:</span>
                  <span className="font-bold">ROOMORA FURNITURE CAIRO</span>
                </div>
                <div className="flex justify-between">
                  <span>Amount:</span>
                  <span className="font-bold text-[#B58A54]">{formatPrice(effectiveAmount)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Card:</span>
                  <span className="font-mono">•••• {cardNumber.slice(-4)}</span>
                </div>
              </div>

              <div className="space-y-1">
                <label className="font-bold block">{isRTL ? 'رمز التحقق (OTP):' : 'Enter 4-Digit OTP Code:'}</label>
                <input
                  type="text"
                  value={otpCode}
                  onChange={(e) => setOtpCode(e.target.value)}
                  maxLength={6}
                  className="w-full px-4 py-2.5 rounded-xl border border-stone-300 text-center font-mono text-lg font-bold tracking-widest focus:outline-none focus:border-[#B58A54]"
                />
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  onClick={() => setIs3DSecureOpen(false)}
                  className="w-1/2 py-2.5 rounded-xl border border-stone-200 font-bold hover:bg-stone-50 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  onClick={handleVerify3DSecure}
                  className="w-1/2 py-2.5 rounded-xl bg-[#292722] hover:bg-[#3D3A34] text-white font-bold cursor-pointer"
                >
                  Authorize Payment
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

