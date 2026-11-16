import React from 'react';
import { Link } from 'react-router-dom';
import { useVisualizer } from '../../context/VisualizerContext';
import { useLanguage } from '../../context/LanguageContext';
import { 
  Building2, 
  MapPin, 
  ShieldCheck, 
  Code, 
  Layers
} from 'lucide-react';

export const Footer: React.FC = () => {
  const { openBookDemo } = useVisualizer();
  const { isRTL } = useLanguage();

  return (
    <footer className="bg-[#1C1814] text-[#F8F7F3] border-t border-[#2E2822] transition-colors duration-300">
      {/* Top Banner / Showroom CTA */}
      <div className="border-b border-[#2E2822] relative overflow-hidden">
        {/* Subtle warm glow in background */}
        <div className="absolute top-0 right-1/4 w-80 h-80 bg-[#B58A54]/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 flex flex-col md:flex-row items-center justify-between gap-6 relative z-10">
          <div className="space-y-1.5 text-center md:text-start">
            <span className="text-[11px] uppercase tracking-[0.25em] text-[#B58A54] font-bold">
              {isRTL ? 'لمعارض ومصنعي الأثاث الفاخر' : 'FOR FURNITURE SHOWROOMS & RETAILERS'}
            </span>
            <h3 className="font-editorial text-2xl sm:text-3xl font-bold text-white">
              {isRTL ? 'مستعد لحسم تردد عملائك ومضاعفة مبيعاتك؟' : 'Ready to eliminate spatial hesitation?'}
            </h3>
            <p className="text-xs sm:text-sm text-[#A39E96] max-w-xl font-normal">
              {isRTL
                ? 'ادمج ويدجت فيستايا الذكي في كتالوج متجرك خلال ١٥ دقيقة. ارفع نسبة الشراء بنسبة +٣٨٪ وخفّض المرتجعات بنسبة -٤١٪.'
                : 'Integrate Vestaia’s 3D AI spatial widget into your e-commerce catalog in under 15 minutes. Boost conversions by +38% and cut returns by -41%.'}
            </p>
          </div>
          <button
            onClick={openBookDemo}
            className="px-6 py-3.5 rounded-xl bg-white hover:bg-white/90 text-[#141210] text-xs font-bold uppercase tracking-wider transition-all shadow-sm flex items-center gap-2 shrink-0 cursor-pointer"
          >
            <Building2 className="w-4 h-4 text-[#B58A54]" />
            <span>{isRTL ? 'حجز موعد استشارة تقنية' : 'Schedule Retailer Demo'}</span>
          </button>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
        {/* Brand Column */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-white/10 text-white flex items-center justify-center font-editorial font-bold text-base border border-white/15 shadow-xs">
              V
            </div>
            <div>
              <span className="font-editorial text-xl font-black tracking-[0.15em] uppercase text-white block">
                {isRTL ? 'ڤيستا AI' : 'VESTA-AI'}
              </span>
              <span className="text-[10px] tracking-wider uppercase font-semibold text-[#B58A54] block -mt-0.5">
                {isRTL ? 'عاين أثاثك في غرفتك قبل الشراء' : 'See It Before You Buy It'}
              </span>
            </div>
          </div>
          <p className="text-xs text-[#A39E96] leading-relaxed max-w-sm font-normal">
            {isRTL
              ? 'منظومة الذكاء الاصطناعي المكاني الرائدة لمعارض الأثاث في الشرق الأوسط. نربط كتالوجات المعارض بغرف العملاء بدقة أبعاد واقعية وتوزيع إضاءة حقيقي.'
              : 'The premier B2B spatial AI visualization platform for Middle East furniture showrooms. Bridging physical furniture catalogs with true-scale customer rooms.'}
          </p>
          <div className="flex items-center gap-2 text-xs text-[#CDBBA5]">
            <MapPin className="w-3.5 h-3.5 text-[#B58A54] shrink-0" />
            <span>{isRTL ? 'القاهرة · الشيخ زايد · دبي · الرياض' : 'Cairo · Sheikh Zayed · Dubai · Riyadh'}</span>
          </div>
        </div>

        {/* Column 1: Platform */}
        <div className="space-y-3">
          <h4 className="text-xs uppercase tracking-[0.2em] font-bold text-white">
            {isRTL ? 'المنصة والتجربة' : 'EXPERIENCE'}
          </h4>
          <ul className="space-y-2 text-xs text-[#A39E96]">
            <li>
              <Link to="/showroom" className="hover:text-white transition-colors">
                {isRTL ? 'المعرض التجريبي الحي' : 'Showroom Demo'}
              </Link>
            </li>
            <li>
              <Link to="/visualizer" className="hover:text-white transition-colors">
                {isRTL ? 'مصمم الغرفة الذكي' : 'AI Room Designer'}
              </Link>
            </li>
            <li>
              <Link to="/#experience-a" className="hover:text-white transition-colors">
                {isRTL ? 'عاين القطعة في غرفتك' : 'See It In Your Space'}
              </Link>
            </li>
            <li>
              <Link to="/#before-after" className="hover:text-white transition-colors">
                {isRTL ? 'مقارنة قبل وبعد' : 'Before & After Spatial'}
              </Link>
            </li>
          </ul>
        </div>

        {/* Column 2: Retailers */}
        <div className="space-y-3">
          <h4 className="text-xs uppercase tracking-[0.2em] font-bold text-white">
            {isRTL ? 'لأصحاب المعارض' : 'FOR RETAILERS'}
          </h4>
          <ul className="space-y-2 text-xs text-[#A39E96]">
            <li>
              <Link to="/integration" className="hover:text-white transition-colors">
                {isRTL ? 'طرق الربط والدمج' : 'Integration Hub'}
              </Link>
            </li>
            <li>
              <Link to="/dashboard" className="hover:text-white transition-colors">
                {isRTL ? 'لوحة تحكم المعرض' : 'Retailer Portal'}
              </Link>
            </li>
            <li>
              <button onClick={openBookDemo} className="hover:text-white transition-colors cursor-pointer text-start">
                {isRTL ? 'باقات الاشتراك والأسعار' : 'B2B Pricing & Plans'}
              </button>
            </li>
            <li>
              <button onClick={openBookDemo} className="hover:text-white transition-colors cursor-pointer text-start">
                {isRTL ? 'طلب عرض مخصص لمعرضك' : 'Request Staging Demo'}
              </button>
            </li>
          </ul>
        </div>

        {/* Column 3: Trust & Architecture */}
        <div className="space-y-3">
          <h4 className="text-xs uppercase tracking-[0.2em] font-bold text-white">
            {isRTL ? 'المعايير المعمارية' : 'STANDARDS'}
          </h4>
          <ul className="space-y-2 text-xs text-[#A39E96]">
            <li className="flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-[#B58A54]" />
              <span>{isRTL ? 'دقة أبعاد معتمدة' : 'Verified Scale Precision'}</span>
            </li>
            <li className="flex items-center gap-1.5">
              <Layers className="w-3.5 h-3.5 text-[#B58A54]" />
              <span>{isRTL ? 'توائم رقمية للكتالوج' : 'Retailer 3D Twins'}</span>
            </li>
            <li className="flex items-center gap-1.5">
              <Code className="w-3.5 h-3.5 text-[#B58A54]" />
              <span>{isRTL ? 'دمج بـ 15 دقيقة' : '15-Min Embed'}</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Payment Gateway Icons Bar (Icons Only) */}
      <div className="border-t border-[#2E2822] py-4 bg-[#16120E]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-wrap items-center justify-center gap-2.5">
          {/* InstaPay */}
          <span
            title="InstaPay (IPN Egypt)"
            aria-label="InstaPay"
            className="w-11 h-7 rounded-md bg-[#241B2F] border border-[#532677]/50 flex items-center justify-center hover:border-[#9E5CE6] transition-colors"
          >
            <svg viewBox="0 0 36 22" className="w-7 h-4" fill="none" aria-hidden="true">
              <path d="M19.5 3L11 12.5h5.8L15 19l9.5-9.5H18.4L19.5 3z" fill="#D5A5FF" />
            </svg>
          </span>

          {/* Vodafone Cash */}
          <span
            title="Vodafone Cash"
            aria-label="Vodafone Cash"
            className="w-11 h-7 rounded-md bg-[#2A1617] border border-red-900/50 flex items-center justify-center hover:border-red-500/70 transition-colors"
          >
            <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" aria-hidden="true">
              <circle cx="12" cy="12" r="9" fill="#E60000" />
              <path d="M12.3 6.5c-2.6 0-4.7 2-4.7 4.7 0 2.2 1.5 3.9 3.6 4.1 1.6.1 2.7-.8 2.8-2.1.1-1.3-.8-2.2-2-2.2-.5 0-1 .2-1.3.5.3-1.7 1.4-3 2.9-3.5l-1.3-1.5z" fill="#FFFFFF" />
            </svg>
          </span>

          {/* Orange Money */}
          <span
            title="Orange Money"
            aria-label="Orange Money"
            className="w-11 h-7 rounded-md bg-[#2A1C12] border border-orange-900/50 flex items-center justify-center hover:border-orange-500/70 transition-colors"
          >
            <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" aria-hidden="true">
              <rect x="4" y="4" width="16" height="16" rx="3" fill="#FF7900" />
              <rect x="7" y="15.5" width="10" height="2" fill="#FFFFFF" />
            </svg>
          </span>

          {/* Meeza */}
          <span
            title="Meeza National Card"
            aria-label="Meeza"
            className="w-11 h-7 rounded-md bg-[#162032] border border-blue-900/50 flex items-center justify-center hover:border-blue-400/70 transition-colors"
          >
            <svg viewBox="0 0 32 20" className="w-7 h-4" fill="none" aria-hidden="true">
              <rect x="3" y="4" width="26" height="12" rx="2" stroke="#60A5FA" strokeWidth="1.5" />
              <path d="M8 13V7l4 4 4-4v6" stroke="#93C5FD" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
              <circle cx="23" cy="10" r="2.2" fill="#3B82F6" />
            </svg>
          </span>

          {/* ValU */}
          <span
            title="ValU 0% Installments"
            aria-label="ValU"
            className="w-11 h-7 rounded-md bg-[#292014] border border-amber-900/50 flex items-center justify-center hover:border-amber-400/70 transition-colors"
          >
            <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" aria-hidden="true">
              <path d="M5 7l7 10 7-10" stroke="#FBBF24" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>

          {/* Fawry */}
          <span
            title="Fawry Pay"
            aria-label="Fawry"
            className="w-11 h-7 rounded-md bg-[#292313] border border-yellow-900/50 flex items-center justify-center hover:border-yellow-400/70 transition-colors"
          >
            <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" aria-hidden="true">
              <rect x="4" y="5" width="16" height="14" rx="2.5" fill="#FACC15" />
              <path d="M9 15V9h6M9 12h4.5" stroke="#1E3A8A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>

          {/* Visa */}
          <span
            title="Visa"
            aria-label="Visa"
            className="w-11 h-7 rounded-md bg-[#1C1917] border border-[#36312B] flex items-center justify-center hover:border-white/40 transition-colors"
          >
            <svg viewBox="0 0 36 20" className="w-7 h-4" fill="none" aria-hidden="true">
              <path d="M7 5l4.2 10h2.4L17.8 5h-2.5l-2.9 7.2L9.5 5H7zm13 0l-2 10h2.3l2-10H20zm7.4 0c-1.7 0-2.9.9-2.9 2.3 0 1 .9 1.6 1.6 2 .7.3 1 .6 1 .9 0 .5-.6.7-1.2.7-.8 0-1.3-.1-2-.4l-.3 1.7c.5.2 1.4.4 2.3.4 2.1 0 3.5-1 3.5-2.5 0-1-.6-1.7-1.7-2.2-.7-.3-1.1-.5-1.1-.9 0-.3.4-.6 1.1-.6.6 0 1.1.1 1.5.3l.3-1.6c-.5-.1-1.1-.3-2.1-.3z" fill="#E5E7EB" />
            </svg>
          </span>

          {/* Mastercard */}
          <span
            title="Mastercard"
            aria-label="Mastercard"
            className="w-11 h-7 rounded-md bg-[#1C1917] border border-[#36312B] flex items-center justify-center hover:border-white/40 transition-colors"
          >
            <svg viewBox="0 0 32 20" className="w-7 h-4" fill="none" aria-hidden="true">
              <circle cx="12.5" cy="10" r="5.5" fill="#EB001B" fillOpacity="0.9" />
              <circle cx="19.5" cy="10" r="5.5" fill="#F79E1B" fillOpacity="0.9" />
            </svg>
          </span>
        </div>
      </div>

      {/* Bottom Legal & Copyright Bar */}
      <div className="border-t border-[#2D2A26] py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between text-xs text-[#A39E96] gap-4">
          <p className="font-normal text-[#7A756D]">
            © {new Date().getFullYear()} VESTA-AI Inc. {isRTL ? 'جميع الحقوق محفوظة. منصة التجارة المكانية لمعارض الأثاث.' : 'All rights reserved. Spatial intelligence for furniture retail.'}
          </p>
          <div className="flex items-center gap-6 text-[11px] font-medium">
            <span className="hover:text-white cursor-pointer transition-colors">{isRTL ? 'سياسة الخصوصية' : 'Privacy Policy'}</span>
            <span>·</span>
            <span className="hover:text-white cursor-pointer transition-colors">{isRTL ? 'شروط الخدمة' : 'Terms of Service'}</span>
            <span>·</span>
            <span className="hover:text-white cursor-pointer transition-colors">{isRTL ? 'اتفاقية سرية المعارض NDA' : 'Showroom NDA'}</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
