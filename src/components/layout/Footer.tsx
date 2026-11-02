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
    <footer className="bg-[#141210] text-[#F8F7F3] border-t border-[#2D2A26] transition-colors duration-300">
      {/* Top Banner / Showroom CTA */}
      <div className="border-b border-[#2D2A26] relative overflow-hidden">
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
                ? 'ادمج ويدجت رومورا الذكي في كتالوج متجرك خلال ١٥ دقيقة. ارفع نسبة الشراء بنسبة +٣٨٪ وخفّض المرتجعات بنسبة -٤١٪.'
                : 'Integrate Roomora’s 3D AI spatial widget into your e-commerce catalog in under 15 minutes. Boost conversions by +38% and cut returns by -41%.'}
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
            <div className="w-8 h-8 rounded-xl bg-white/10 text-white flex items-center justify-center font-editorial font-bold text-lg border border-white/15 shadow-xs">
              R
            </div>
            <div>
              <span className="font-editorial text-xl font-black tracking-[0.15em] uppercase text-white block">
                {isRTL ? 'رومورا' : 'ROOMORA'}
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

      {/* Bottom Legal & Copyright Bar */}
      <div className="border-t border-[#2D2A26] py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between text-xs text-[#A39E96] gap-4">
          <p className="font-normal text-[#7A756D]">
            © {new Date().getFullYear()} ROOMORA Inc. {isRTL ? 'جميع الحقوق محفوظة. منصة التجارة المكانية لمعارض الأثاث.' : 'All rights reserved. Spatial intelligence for furniture retail.'}
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
