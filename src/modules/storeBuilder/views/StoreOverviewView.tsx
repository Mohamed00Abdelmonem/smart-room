import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useStoreBuilder } from '../context/StoreBuilderContext';
import { useLanguage } from '../../../context/LanguageContext';
import { StoreAnalyticsCharts } from '../components/dashboard/StoreAnalyticsCharts';
import {
  ShoppingBag,
  TrendingUp,
  Layers,
  Package,
  CheckCircle2,
  Sparkles,
  ExternalLink,
} from 'lucide-react';

export const StoreOverviewView: React.FC = () => {
  const { store } = useStoreBuilder();
  const { isRTL } = useLanguage();
  const navigate = useNavigate();

  const totalRevenue = store.orders.reduce((sum, o) => sum + o.totalEgp, 0);

  return (
    <div className="space-y-8 text-start max-w-7xl mx-auto p-4 sm:p-8 md:p-10">
      {/* Top Welcome Banner */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-[#1E1E1E] via-[#2A2622] to-[#3D3730] text-white flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-xl border border-white/10">
        <div className="space-y-2 max-w-xl">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono uppercase font-bold tracking-wider bg-amber-500/20 text-amber-300 border border-amber-500/30">
              {store.isPublished
                ? isRTL ? '● المتجر منشور ومباشر' : '● STORE IS LIVE'
                : isRTL ? '○ وضع المسودة' : '○ DRAFT MODE'}
            </span>
            <span dir="ltr" className="text-xs text-white/60 font-mono">
              {store.storeSlug}.vestaai.com
            </span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-bold tracking-tight">
            {store.storeName}
          </h1>

          <p className="text-xs sm:text-sm text-white/75 leading-relaxed">
            {store.tagline || (isRTL ? 'مرحباً بك في منشئ المتاجر الذاتي لإدارة وعرض أثاث معرضك.' : 'Welcome to your standalone furniture e-commerce website builder and store manager.')}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={() => navigate('/my-store/builder')}
            className="px-6 py-3 rounded-full bg-amber-500 hover:bg-amber-600 text-white font-bold text-xs uppercase tracking-wider flex items-center gap-2 transition shadow-lg cursor-pointer"
          >
            <Sparkles className="w-4 h-4" />
            <span>{isRTL ? 'فتح منشئ المواقع' : 'Open Website Builder'}</span>
          </button>

          <Link
            to={`/store/${store.storeSlug}`}
            target="_blank"
            className="px-5 py-3 rounded-full bg-white/10 hover:bg-white/20 text-white font-bold text-xs uppercase tracking-wider flex items-center gap-2 transition border border-white/20"
          >
            <span>{isRTL ? 'زيارة المتجر الحي' : 'Visit Live Store'}</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <div className="p-6 rounded-2xl bg-white dark:bg-[#1A1815] border border-[#E2DBD0] dark:border-[#2D2A26] shadow-xs space-y-1">
          <div className="flex items-center justify-between text-stone-400 mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider">{isRTL ? 'إجمالي المبيعات' : 'Total Sales'}</span>
            <TrendingUp className="w-4 h-4 text-emerald-500" />
          </div>
          <span className="text-2xl sm:text-3xl font-bold font-mono text-[#1E1E1E] dark:text-white">
            {totalRevenue.toLocaleString()} {isRTL ? 'ج.م' : 'EGP'}
          </span>
          <p className="text-[11px] text-emerald-600 font-semibold">{isRTL ? '+18% هذا الشهر' : '+18% this month'}</p>
        </div>

        <div className="p-6 rounded-2xl bg-white dark:bg-[#1A1815] border border-[#E2DBD0] dark:border-[#2D2A26] shadow-xs space-y-1">
          <div className="flex items-center justify-between text-stone-400 mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider">{isRTL ? 'منتجات الكتالوج' : 'Catalog Products'}</span>
            <Package className="w-4 h-4 text-amber-500" />
          </div>
          <span className="text-2xl sm:text-3xl font-bold font-mono text-[#1E1E1E] dark:text-white">
            {store.products.length} {isRTL ? 'قطعة' : 'Pieces'}
          </span>
          <p className="text-[11px] text-stone-500">{isRTL ? 'متاحة داخل المحرر المباشر' : 'All available in live builder'}</p>
        </div>

        <div className="p-6 rounded-2xl bg-white dark:bg-[#1A1815] border border-[#E2DBD0] dark:border-[#2D2A26] shadow-xs space-y-1">
          <div className="flex items-center justify-between text-stone-400 mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider">{isRTL ? 'الطلبات' : 'Orders'}</span>
            <ShoppingBag className="w-4 h-4 text-blue-500" />
          </div>
          <span className="text-2xl sm:text-3xl font-bold font-mono text-[#1E1E1E] dark:text-white">
            {store.orders.length}
          </span>
          <p className="text-[11px] text-stone-500">{isRTL ? 'عبر InstaPay و Meeza و ValU' : 'Via InstaPay, Meeza & ValU'}</p>
        </div>

        <div className="p-6 rounded-2xl bg-white dark:bg-[#1A1815] border border-[#E2DBD0] dark:border-[#2D2A26] shadow-xs space-y-1">
          <div className="flex items-center justify-between text-stone-400 mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider">{isRTL ? 'صفحات المتجر' : 'Store Pages'}</span>
            <Layers className="w-4 h-4 text-purple-500" />
          </div>
          <span className="text-2xl sm:text-3xl font-bold font-mono text-[#1E1E1E] dark:text-white">
            {store.pages.length} {isRTL ? 'صفحات' : 'Pages'}
          </span>
          <p className="text-[11px] text-stone-500">{isRTL ? 'أقسام قابلة للتخصيص الكامل' : 'Fully customizable sections'}</p>
        </div>
      </div>

      {/* Interactive Animated Analytics Charts */}
      <StoreAnalyticsCharts store={store} />

      {/* Quick Launch Checklist */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-[#1A1815] border border-[#E2DBD0] dark:border-[#2D2A26] shadow-xs space-y-5">
        <div>
          <h3 className="text-base font-bold text-[#1E1E1E] dark:text-white">
            {isRTL ? 'قائمة جاهزية إطلاق المتجر' : 'Store Launch Checklist'}
          </h3>
          <p className="text-xs text-stone-500">
            {isRTL ? 'أكمل هذه الخطوات الأساسية لتعزيز مبيعات متجرك الإلكتروني.' : 'Complete these essential steps to optimize your customer e-commerce conversion.'}
          </p>
        </div>

        <div className="space-y-3">
          <div className="flex items-center justify-between p-3.5 rounded-xl border border-emerald-500/30 bg-emerald-50/50 dark:bg-emerald-950/20">
            <div className="flex items-center gap-3">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
              <div>
                <h4 className="text-xs font-bold">{isRTL ? '١. هيكل الصفحات المتعددة جاهز' : '1. Multi-Page Website Structure Ready'}</h4>
                <p className="text-[11px] text-stone-500">
                  {isRTL ? 'تم إنشاء صفحات الرئيسية والمتجر ومن نحن وتواصل معنا بأقسام أثاث فاخرة.' : 'Home, Shop, About, and Contact pages generated with luxury furniture sections.'}
                </p>
              </div>
            </div>
            <Link to="/my-store/pages" className="text-xs font-bold text-amber-600 hover:underline shrink-0">
              {isRTL ? 'إدارة' : 'Manage'}
            </Link>
          </div>

          <div className="flex items-center justify-between p-3.5 rounded-xl border border-emerald-500/30 bg-emerald-50/50 dark:bg-emerald-950/20">
            <div className="flex items-center gap-3">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
              <div>
                <h4 className="text-xs font-bold">{isRTL ? '٢. ربط المنتجات والمخزون' : '2. Products & Inventory Connected'}</h4>
                <p className="text-[11px] text-stone-500">
                  {isRTL
                    ? `${store.products.length} قطعة أثاث متصلة بالأسعار والأبعاد والخامات.`
                    : `${store.products.length} showroom pieces with pricing, dimensions, and materials.`}
                </p>
              </div>
            </div>
            <Link to="/my-store/products" className="text-xs font-bold text-amber-600 hover:underline shrink-0">
              {isRTL ? 'عرض الكتالوج' : 'View Catalog'}
            </Link>
          </div>

          <div className="flex items-center justify-between p-3.5 rounded-xl border border-stone-200 dark:border-stone-800 bg-stone-50/50 dark:bg-stone-900">
            <div className="flex items-center gap-3">
              <div className="w-5 h-5 rounded-full border-2 border-stone-300 flex items-center justify-center text-[10px] font-bold text-stone-400 shrink-0">
                3
              </div>
              <div>
                <h4 className="text-xs font-bold">{isRTL ? '٣. تخصيص الهوية والألوان' : '3. Customize Branding & Colors'}</h4>
                <p className="text-[11px] text-stone-500">
                  {isRTL ? 'طابق الألوان والخطوط والشعار مع هوية معرضك الفعلي.' : 'Align primary colors, typography, and logo with your physical showroom identity.'}
                </p>
              </div>
            </div>
            <Link to="/my-store/branding" className="text-xs font-bold text-amber-600 hover:underline shrink-0">
              {isRTL ? 'تخصيص' : 'Customize'}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
