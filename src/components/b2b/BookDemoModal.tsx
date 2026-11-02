import React, { useState } from 'react';
import { useVisualizer } from '../../context/VisualizerContext';
import { useCart } from '../../context/CartContext';
import { useLanguage } from '../../context/LanguageContext';
import { X, CheckCircle2, Building2, Send, Calendar, ShieldCheck } from 'lucide-react';

export const BookDemoModal: React.FC = () => {
  const { isBookDemoOpen, closeBookDemo } = useVisualizer();
  const { showToast } = useCart();
  const { isRTL } = useLanguage();

  const [showroomName, setShowroomName] = useState('');
  const [contactName, setContactName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [location, setLocation] = useState(isRTL ? 'القاهرة / الشيخ زايد، مصر' : 'Cairo / Sheikh Zayed, Egypt');
  const [catalogSize, setCatalogSize] = useState('50 - 200 SKUs');
  const [platform, setPlatform] = useState('Shopify');
  const [isSubmitted, setIsSubmitted] = useState(false);

  if (!isBookDemoOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    showToast(isRTL ? 'تم استلام طلبكم بنجاح! سيتواصل معكم فريق حلول المعارض بالقاهرة خلال ساعتي عمل.' : 'Consultation request received! Our Cairo B2B team will contact you within 2 business hours.');
  };

  const handleClose = () => {
    setIsSubmitted(false);
    closeBookDemo();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in">
      <div className="relative w-full max-w-xl bg-white dark:bg-[#161412] rounded-3xl shadow-2xl border border-[#E8E2D9] dark:border-[#2D2A26] overflow-hidden transition-colors">
        {/* Header - Warm Ivory in Light, Dark Charcoal in Dark */}
        <div className="px-6 py-5 bg-[#F8F7F3] dark:bg-[#1E1C1A] border-b border-[#E8E2D9] dark:border-[#2D2A26] flex items-center justify-between transition-colors">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-[#292722] text-[#F8F7F3] dark:bg-[#F8F7F3] dark:text-[#292722] flex items-center justify-center font-bold">
              <Building2 className="w-5 h-5 text-[#B58A54] dark:text-[#292722]" />
            </div>
            <div>
              <h3 className="text-lg font-editorial font-bold text-[#292722] dark:text-[#F8F7F3]">
                {isRTL ? 'حجز عرض تجريبي لمعرض الأثاث' : 'Schedule Showroom Partner Demo'}
              </h3>
              <p className="text-xs text-[#6E6A63] dark:text-[#A39E96] font-normal">
                {isRTL ? 'انضم إلى نخبة معارض الأثاث في مصر والشرق الأوسط' : 'Join premier furniture retailers across Egypt & MENA'}
              </p>
            </div>
          </div>
          <button
            onClick={handleClose}
            className="p-1.5 rounded-full hover:bg-white dark:hover:bg-[#25221F] text-[#6E6A63] hover:text-[#292722] dark:text-[#A39E96] dark:hover:text-[#F8F7F3] transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {isSubmitted ? (
            <div className="py-8 text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto border-2 border-emerald-200 dark:border-emerald-800">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h4 className="text-2xl font-editorial font-bold text-[#292722] dark:text-[#F8F7F3]">
                {isRTL ? 'تم تأكيد طلب العرض التجريبي!' : 'Demo Request Confirmed!'}
              </h4>
              <p className="text-sm text-[#6E6A63] dark:text-[#A39E96] max-w-md mx-auto leading-relaxed font-normal">
                {isRTL
                  ? `شكراً لك أستاذ ${contactName || 'الشريك الفاضل'}. سيتواصل معك فريقنا في القاهرة عبر الواتساب والبريد لمراجعة جدول دمج المعرض وتجهيز عينات ثلاثية الأبعاد لأهم 5 قطع في كتالوجك.`
                  : `Thank you, ${contactName || 'Partner'}. Our B2B solutions team in New Cairo will contact you via WhatsApp / email to review your showroom integration timeline and provide sample 3D rendering for your top 5 SKUs.`}
              </p>
              <div className="p-4 rounded-xl bg-[#F8F7F3] dark:bg-[#1E1C1A] border border-[#E8E2D9] dark:border-[#2D2A26] text-xs text-[#6E6A63] dark:text-[#A39E96] max-w-sm mx-auto text-start space-y-1.5 font-normal">
                <p className="font-bold text-[#292722] dark:text-[#F8F7F3] flex items-center gap-1.5">
                  <Calendar className="w-4 h-4 text-[#B58A54]" />
                  {isRTL ? 'الخطوات التالية المباشرة:' : 'What happens next:'}
                </p>
                <p>{isRTL ? '1. تدقيق الكتالوج وجاهزية المقاسات والصور' : '1. Catalog audit & 3D readiness review'}</p>
                <p>{isRTL ? `2. عرض الويدجت التفاعلي مخصصاً لـ ${showroomName || 'معرضكم'}` : `2. Interactive staging widget demo for ${showroomName || 'your brand'}`}</p>
                <p>{isRTL ? '3. فترة تجربة مجانية كاملة لمدة 14 يوماً' : '3. 14-day zero-risk live showroom pilot'}</p>
              </div>
              <button
                onClick={handleClose}
                className="mt-4 px-6 py-2.5 rounded-xl bg-[#292722] text-white dark:bg-[#F8F7F3] dark:text-[#292722] text-xs font-bold hover:bg-[#3D3A34] dark:hover:bg-white cursor-pointer transition-colors"
              >
                {isRTL ? 'إغلاق والعودة للموقع' : 'Close & Return to Website'}
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-[#292722] dark:text-[#F8F7F3] uppercase tracking-wider mb-1.5">
                    {isRTL ? 'اسم المعرض أو شركة الأثاث *' : 'Furniture Brand / Showroom *'}
                  </label>
                  <input
                    type="text"
                    required
                    placeholder={isRTL ? 'مثال: معرض لاتيلييه دي موبل' : "e.g. L'Atelier Interiors Cairo"}
                    value={showroomName}
                    onChange={(e) => setShowroomName(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#E8E2D9] dark:border-[#2D2A26] bg-[#F8F7F3] dark:bg-[#121110] text-sm text-[#292722] dark:text-[#F8F7F3] focus:outline-none focus:ring-2 focus:ring-[#B58A54]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-[#292722] dark:text-[#F8F7F3] uppercase tracking-wider mb-1.5">
                    {isRTL ? 'اسم المسؤول والمنصب *' : 'Your Name & Title *'}
                  </label>
                  <input
                    type="text"
                    required
                    placeholder={isRTL ? 'مثال: طارق منصور (المدير العام)' : 'e.g. Tarek Mansour (Founder & CEO)'}
                    value={contactName}
                    onChange={(e) => setContactName(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#E8E2D9] dark:border-[#2D2A26] bg-[#F8F7F3] dark:bg-[#121110] text-sm text-[#292722] dark:text-[#F8F7F3] focus:outline-none focus:ring-2 focus:ring-[#B58A54]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-[#292722] dark:text-[#F8F7F3] uppercase tracking-wider mb-1.5">
                    {isRTL ? 'البريد الإلكتروني للعمل *' : 'Business Email *'}
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="tarek@showroom.eg"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#E8E2D9] dark:border-[#2D2A26] bg-[#F8F7F3] dark:bg-[#121110] text-sm text-[#292722] dark:text-[#F8F7F3] focus:outline-none focus:ring-2 focus:ring-[#B58A54]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-[#292722] dark:text-[#F8F7F3] uppercase tracking-wider mb-1.5">
                    {isRTL ? 'رقم الهاتف / واتساب *' : 'Phone / WhatsApp *'}
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="+20 100 123 4567"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#E8E2D9] dark:border-[#2D2A26] bg-[#F8F7F3] dark:bg-[#121110] text-sm text-[#292722] dark:text-[#F8F7F3] focus:outline-none focus:ring-2 focus:ring-[#B58A54]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-bold text-[#292722] dark:text-[#F8F7F3] uppercase tracking-wider mb-1.5">
                    {isRTL ? 'المنطقة' : 'Primary Region'}
                  </label>
                  <select
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-xl border border-[#E8E2D9] dark:border-[#2D2A26] bg-[#F8F7F3] dark:bg-[#121110] text-xs font-bold text-[#292722] dark:text-[#F8F7F3] focus:outline-none focus:ring-2 focus:ring-[#B58A54]"
                  >
                    <option>{isRTL ? 'القاهرة / الجيزة (مصر)' : 'Cairo / Giza (Egypt)'}</option>
                    <option>{isRTL ? 'الإسكندرية والساحل' : 'Alexandria (Egypt)'}</option>
                    <option>{isRTL ? 'الرياض / دبي (الخليج)' : 'Dubai / Riyadh (GCC)'}</option>
                    <option>{isRTL ? 'دول أخرى' : 'Other International'}</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#292722] dark:text-[#F8F7F3] uppercase tracking-wider mb-1.5">
                    {isRTL ? 'عدد قطع الكتالوج' : 'Active Catalog Size'}
                  </label>
                  <select
                    value={catalogSize}
                    onChange={(e) => setCatalogSize(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-xl border border-[#E8E2D9] dark:border-[#2D2A26] bg-[#F8F7F3] dark:bg-[#121110] text-xs font-bold text-[#292722] dark:text-[#F8F7F3] focus:outline-none focus:ring-2 focus:ring-[#B58A54]"
                  >
                    <option>{isRTL ? 'أقل من 50 قطعة' : 'Under 50 SKUs'}</option>
                    <option>{isRTL ? '50 - 200 قطعة' : '50 - 200 SKUs'}</option>
                    <option>{isRTL ? '200 - 1,000 قطعة' : '200 - 1,000 SKUs'}</option>
                    <option>{isRTL ? 'أكثر من 1,000 قطعة' : '1,000+ Enterprise SKUs'}</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#292722] dark:text-[#F8F7F3] uppercase tracking-wider mb-1.5">
                    {isRTL ? 'منصة المتجر' : 'E-Commerce Platform'}
                  </label>
                  <select
                    value={platform}
                    onChange={(e) => setPlatform(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-xl border border-[#E8E2D9] dark:border-[#2D2A26] bg-[#F8F7F3] dark:bg-[#121110] text-xs font-bold text-[#292722] dark:text-[#F8F7F3] focus:outline-none focus:ring-2 focus:ring-[#B58A54]"
                  >
                    <option>Shopify / Shopify Plus</option>
                    <option>WooCommerce</option>
                    <option>Magento / Adobe Commerce</option>
                    <option>Custom React / Next.js</option>
                    <option>{isRTL ? 'معرض فعلي (بدون متجر حالياً)' : 'Showroom Only (No website yet)'}</option>
                  </select>
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-3.5 rounded-xl bg-[#292722] hover:bg-[#3D3A34] dark:bg-[#F8F7F3] dark:hover:bg-white text-white dark:text-[#292722] text-xs font-bold uppercase tracking-wider shadow-sm flex items-center justify-center gap-2 cursor-pointer transition-all"
                >
                  <Send className="w-4 h-4 text-[#B58A54] dark:text-[#292722]" />
                  <span>{isRTL ? 'إرسال طلب العرض التجريبي المباشر' : 'Request Live Showroom Staging Demo'}</span>
                </button>
              </div>

              <div className="flex items-center justify-center gap-2 text-[11px] text-[#6E6A63] dark:text-[#A39E96] pt-1 font-normal">
                <ShieldCheck className="w-3.5 h-3.5 text-[#B58A54]" />
                <span>{isRTL ? 'خصوصية بيانات الكتالوج مضمونة باتفاقية سرية NDA.' : 'NDA & Catalog Data Privacy guaranteed. No commitment required.'}</span>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
