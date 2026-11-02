import React, { useState } from 'react';
import { SHOWROOM_MOCK_DATA, INTEGRATION_PLANS } from '../data/showroomData';
import { LUXURY_PRODUCTS } from '../data/products';
import { DemoBadge } from '../components/common/DemoBadge';
import { useCart } from '../context/CartContext';
import { useVisualizer } from '../context/VisualizerContext';
import { useLanguage } from '../context/LanguageContext';
import { 
  BarChart3, 
  TrendingUp, 
  TrendingDown, 
  Layers, 
  Code, 
  CreditCard, 
  Copy, 
  Check, 
  Sparkles, 
  CheckCircle2, 
  Clock, 
  Search,
  RefreshCw
} from 'lucide-react';

export const DashboardPage: React.FC = () => {
  const { showToast } = useCart();
  const { openBookDemo } = useVisualizer();
  const { t, isRTL, formatPrice } = useLanguage();

  const [activeTab, setActiveTab] = useState<'overview' | 'catalog' | 'sessions' | 'integration' | 'plans'>('overview');
  const [apiKeyCopied, setApiKeyCopied] = useState(false);
  const [embedCopied, setEmbedCopied] = useState(false);
  const [catalogSearch, setCatalogSearch] = useState('');
  const [activePlan, setActivePlan] = useState('Retailer Scale');

  const apiKey = 'rm_live_cairo_90218_sec_77a91bf9e8a';
  const embedCode = `<script 
  src="https://cdn.roomora.ai/v2/roomora-widget.js" 
  data-retailer-id="eg_cairo_atelier_9021"
  data-theme="modern-luxury"
  async>
</script>`;

  const handleCopyApiKey = () => {
    navigator.clipboard.writeText(apiKey);
    setApiKeyCopied(true);
    showToast(isRTL ? 'تم نسخ مفتاح API للحافظة' : 'API Key copied to clipboard');
    setTimeout(() => setApiKeyCopied(false), 2500);
  };

  const handleCopyEmbed = () => {
    navigator.clipboard.writeText(embedCode);
    setEmbedCopied(true);
    showToast(isRTL ? 'تم نسخ كود التثبيت للحافظة' : 'Embed script snippet copied to clipboard');
    setTimeout(() => setEmbedCopied(false), 2500);
  };

  const filteredCatalog = LUXURY_PRODUCTS.filter((item) =>
    item.name.toLowerCase().includes(catalogSearch.toLowerCase()) ||
    (item.nameAr && item.nameAr.toLowerCase().includes(catalogSearch.toLowerCase())) ||
    item.sku.toLowerCase().includes(catalogSearch.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-white dark:bg-[#121110] pb-24 transition-colors">
      {/* Top B2B Portal Banner - 25% Warm Ivory Section */}
      <div className="bg-[#F8F7F3] dark:bg-[#181614] text-[#292722] dark:text-[#F8F7F3] pt-36 pb-10 sm:pt-40 sm:pb-12 border-b border-[#E8E2D9] dark:border-[#2D2A26] transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-[#B58A54] text-white flex items-center justify-center font-bold text-xl shadow-sm">
                R
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h1 className="text-2xl font-editorial font-bold text-[#292722] dark:text-[#F8F7F3]">
                    {t.dashPortalTitle}
                  </h1>
                  <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/15 text-emerald-700 dark:text-emerald-400 text-[10px] font-bold uppercase tracking-wider flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                    {t.dashLiveStatus}
                  </span>
                </div>
                <p className="text-xs text-[#6E6A63] dark:text-[#A39E96] font-normal">
                  {t.dashStoreId}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <DemoBadge
                variant="subtle"
                text={isRTL ? 'بوابة إدارة المعارض B2B' : 'Retailer B2B Management View'}
                className="bg-white/90 dark:bg-white/10 text-[#6E6A63] dark:text-[#A39E96] border-[#E8E2D9] dark:border-white/10"
              />
              <button
                onClick={openBookDemo}
                className="px-4 py-2 rounded-xl bg-[#292722] text-white dark:bg-[#F8F7F3] dark:text-[#292722] text-xs font-bold uppercase tracking-wider hover:bg-[#3D3A34] dark:hover:bg-white transition-all cursor-pointer shadow-sm"
              >
                {isRTL ? 'طلب ترقية الحساب' : 'Request Enterprise Expansion'}
              </button>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="flex items-center gap-2 mt-8 overflow-x-auto scrollbar-none border-b border-[#E8E2D9] dark:border-[#2D2A26]">
            {[
              { id: 'overview', label: t.dashTabOverview, icon: BarChart3 },
              { id: 'catalog', label: t.dashTabCatalog, icon: Layers },
              { id: 'sessions', label: t.dashTabSessions, icon: Clock },
              { id: 'integration', label: t.dashTabEmbed, icon: Code },
              { id: 'plans', label: t.dashTabPlans, icon: CreditCard },
            ].map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`px-4 py-3 text-xs font-bold tracking-wide flex items-center gap-2 border-b-2 transition-all whitespace-nowrap cursor-pointer ${
                    isActive
                      ? 'border-[#292722] text-[#292722] dark:border-[#F8F7F3] dark:text-[#F8F7F3]'
                      : 'border-transparent text-[#6E6A63] hover:text-[#292722] dark:text-[#A39E96] dark:hover:text-[#F8F7F3]'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Main Content Area - 60% Pure White */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        {/* ================= TAB 1: OVERVIEW ================= */}
        {activeTab === 'overview' && (
          <div className="space-y-8 animate-in fade-in">
            {/* Top Metrics Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {SHOWROOM_MOCK_DATA.metrics.map((metric, idx) => {
                const arabicLabels = [
                  'معاينات الغرف بالذكاء الاصطناعي',
                  'نسبة التحويل من المعاينة للسلة',
                  'متوسط قيمة الطلب (AOV)',
                  'انخفاض نسبة المرتجعات',
                ];
                const label = isRTL ? arabicLabels[idx] : metric.label;
                return (
                  <div
                    key={metric.label}
                    className="p-6 rounded-2xl bg-white dark:bg-[#1C1A17] border border-[#E8E2D9] dark:border-[#2D2A26] space-y-3 shadow-sm hover:border-[#CDBBA5] transition-all"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold uppercase tracking-wider text-[#6E6A63] dark:text-[#A39E96]">
                        {label}
                      </span>
                      <span className="text-xs font-bold px-2 py-0.5 rounded-full flex items-center gap-1 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-400">
                        {metric.trend === 'up' ? (
                          <TrendingUp className="w-3 h-3" />
                        ) : (
                          <TrendingDown className="w-3 h-3" />
                        )}
                        <span dir="ltr">{metric.delta}</span>
                      </span>
                    </div>
                    <div className="text-3xl font-editorial font-bold text-[#292722] dark:text-[#F8F7F3]">
                      {isRTL && idx === 2 ? '٦٤,٢٠٠ ج.م' : metric.value}
                    </div>
                    <p className="text-[11px] text-[#6E6A63] dark:text-[#A39E96] leading-tight font-normal">
                      {isRTL
                        ? (idx === 0 ? 'خلال الـ 30 يوماً الماضية عبر زوار القاهرة والجيزة' :
                           idx === 1 ? 'مقارنة بمعدل 4.1% للمتاجر التقليدية' :
                           idx === 2 ? 'مدفوع بحزم تأثيث الغرفة المتكاملة' :
                           'يقضي على مفاجآت المقاسات قبل الشحن')
                        : metric.description}
                    </p>
                  </div>
                );
              })}
            </div>

            {/* Top Visualized Products Table */}
            <div className="bg-white dark:bg-[#1C1A17] rounded-3xl border border-[#E8E2D9] dark:border-[#2D2A26] p-6 sm:p-8 space-y-6 shadow-sm transition-colors">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#E8E2D9] dark:border-[#2D2A26] pb-4">
                <div>
                  <h3 className="text-xl font-editorial font-bold text-[#292722] dark:text-[#F8F7F3]">
                    {isRTL ? 'المنتجات الأكثر معاينة (خلال آخر 30 يوماً)' : 'Top Visualized Catalog Items (Last 30 Days)'}
                  </h3>
                  <p className="text-xs text-[#6E6A63] dark:text-[#A39E96] font-normal">
                    {isRTL ? 'قطع الأثاث التي سجلت أعلى تفاعل مكاني وأعلى معدل تحويل للسلة.' : 'Products with the highest customer room engagement and subsequent cart conversions.'}
                  </p>
                </div>
                <span className="text-xs text-[#B58A54] font-bold">
                  {isRTL ? 'إجمالي فروع القاهرة والشيخ زايد والإسكندرية' : 'Aggregated across Cairo, Sheikh Zayed & Alex'}
                </span>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-start text-xs">
                  <thead>
                    <tr className="border-b border-[#E8E2D9] dark:border-[#2D2A26] text-[#6E6A63] dark:text-[#A39E96] uppercase tracking-wider font-bold">
                      <th className="pb-3">{isRTL ? 'قطعة الأثاث وكود SKU' : 'Furniture Item & SKU'}</th>
                      <th className="pb-3 text-center">{isRTL ? 'معاينات الغرفة' : 'Room Visualizations'}</th>
                      <th className="pb-3 text-center">{isRTL ? 'طلبات الشراء' : 'Direct Conversions'}</th>
                      <th className="pb-3 text-center">{isRTL ? 'نسبة التحويل' : 'Conversion Rate'}</th>
                      <th className="pb-3 text-end">{isRTL ? 'المبيعات المحققة' : 'Attributed Revenue'}</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#E8E2D9] dark:divide-[#2D2A26]">
                    {SHOWROOM_MOCK_DATA.topVisualizedProducts.map((item, idx) => {
                      const arabicNames = [
                        'كنبة زاوية سيلوم L',
                        'طاولة رخام أورا الإيطالية',
                        'وحدة تلفزيون كانسو مضلعة',
                        'سجادة صوف سيرين يدوية',
                        'كرسي لومينا الدوار الفاخر',
                      ];
                      const name = isRTL ? arabicNames[idx] : item.name;
                      return (
                        <tr key={item.sku} className="hover:bg-[#F8F7F3] dark:hover:bg-[#24201C]/60 transition-colors">
                          <td className="py-4 font-bold text-[#292722] dark:text-[#F8F7F3]">
                            <span className="text-sm block">{name}</span>
                            <span className="text-[10px] text-[#B58A54] font-mono" dir="ltr">{item.sku}</span>
                          </td>
                          <td className="py-4 text-center font-mono text-[#6E6A63] dark:text-[#A39E96]">
                            {item.views.toLocaleString()}
                          </td>
                          <td className="py-4 text-center font-mono font-bold text-[#292722] dark:text-[#F8F7F3]">
                            {item.conversions.toLocaleString()}
                          </td>
                          <td className="py-4 text-center">
                            <span className="px-2.5 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-400 font-bold">
                              {item.conversionRate}
                            </span>
                          </td>
                          <td className="py-4 text-end font-bold text-sm text-[#292722] dark:text-[#F8F7F3]">
                            {formatPrice(item.revenueEgp)}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Quick Conversion Funnel Visualizer */}
            <div className="p-6 rounded-3xl bg-[#F8F7F3] dark:bg-[#1C1A17] border border-[#E8E2D9] dark:border-[#2D2A26] space-y-4 transition-colors">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-[10px] uppercase font-bold text-[#B58A54] tracking-widest block">
                    {isRTL ? 'تحليل مسار التحويل للشراء' : 'Conversion Funnel Analysis'}
                  </span>
                  <h4 className="text-lg font-editorial font-bold text-[#292722] dark:text-[#F8F7F3]">
                    {isRTL ? 'مسار الشراء من المعاينة المكانية إلى السلة' : 'Roomora Visualization to Checkout Funnel'}
                  </h4>
                </div>
                <span className="text-xs text-[#6E6A63] dark:text-[#A39E96]">{isRTL ? 'عينة من 10,000 زائر للموقع' : 'Sample cohort of 10,000 visitors'}</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 text-center">
                <div className="p-4 rounded-2xl bg-white dark:bg-[#24201C] border border-[#E8E2D9] dark:border-[#2D2A26]">
                  <span className="text-xs text-[#6E6A63] dark:text-[#A39E96] uppercase tracking-wider block font-bold">{isRTL ? 'مشاهدات المنتجات' : 'Product Views'}</span>
                  <span className="text-2xl font-bold font-editorial text-[#292722] dark:text-[#F8F7F3] block my-1">10,000</span>
                  <span className="text-[10px] text-[#6E6A63] dark:text-[#A39E96]">{isRTL ? 'إجمالي زيارات الكتالوج' : 'Baseline Catalog Traffic'}</span>
                </div>
                <div className="p-4 rounded-2xl bg-white dark:bg-[#24201C] border border-[#E8E2D9] dark:border-[#2D2A26]">
                  <span className="text-xs text-[#B58A54] uppercase tracking-wider block font-bold">{isRTL ? 'نقروا "عاين في غرفتك"' : 'Clicked "Try in Room"'}</span>
                  <span className="text-2xl font-bold font-editorial text-[#B58A54] block my-1">4,820 (48.2%)</span>
                  <span className="text-[10px] text-[#6E6A63] dark:text-[#A39E96]">{isRTL ? 'تفاعل عالي النية' : 'High intent engagement'}</span>
                </div>
                <div className="p-4 rounded-2xl bg-white dark:bg-[#24201C] border border-[#E8E2D9] dark:border-[#2D2A26]">
                  <span className="text-xs text-[#6E6A63] dark:text-[#A39E96] uppercase tracking-wider block font-bold">{isRTL ? 'عاينوا بالمقاس الحقيقي' : 'Viewed True-Scale Render'}</span>
                  <span className="text-2xl font-bold font-editorial text-[#292722] dark:text-[#F8F7F3] block my-1">4,120 (85.4%)</span>
                  <span className="text-[10px] text-[#6E6A63] dark:text-[#A39E96]">{isRTL ? 'أكملوا مقارنة الغرفة' : 'Completed room comparison'}</span>
                </div>
                <div className="p-4 rounded-2xl bg-white dark:bg-[#24201C] border border-emerald-500/40">
                  <span className="text-xs text-emerald-700 dark:text-emerald-400 uppercase tracking-wider block font-bold">{isRTL ? 'أتموا الشراء' : 'Completed Checkout'}</span>
                  <span className="text-2xl font-bold font-editorial text-emerald-700 dark:text-emerald-400 block my-1">1,860 (38.6%)</span>
                  <span className="text-[10px] text-emerald-600 dark:text-emerald-300">{isRTL ? 'مقارنة بـ 4.1% تقليدي' : 'vs 4.1% standard e-comm'}</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ================= TAB 2: CATALOG 3D MANAGEMENT ================= */}
        {activeTab === 'catalog' && (
          <div className="bg-white dark:bg-[#1C1A17] rounded-3xl border border-[#E8E2D9] dark:border-[#2D2A26] p-6 sm:p-8 space-y-6 animate-in fade-in transition-colors">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#E8E2D9] dark:border-[#2D2A26] pb-4">
              <div>
                <h3 className="text-xl font-editorial font-bold text-[#292722] dark:text-[#F8F7F3]">
                  {isRTL ? `إدارة نماذج 3D للكتالوج (${LUXURY_PRODUCTS.length} قطعة)` : `Showroom Catalog 3D Pipeline (${LUXURY_PRODUCTS.length} Items)`}
                </h3>
                <p className="text-xs text-[#6E6A63] dark:text-[#A39E96] font-normal">
                  {isRTL ? 'يتم تدقيق مقاسات كل قطعة والمواد والمجسم ثلاثي الأبعاد عالي الدقة.' : 'Every catalog item is verified for exact dimensions, materials, and 3D digital twin rendering.'}
                </p>
              </div>

              <div className="relative w-full sm:w-64">
                <Search className={`w-4 h-4 text-[#6E6A63] dark:text-[#A39E96] absolute ${isRTL ? 'right-3' : 'left-3'} top-1/2 -translate-y-1/2`} />
                <input
                  type="text"
                  placeholder={isRTL ? 'بحث بالاسم أو الكود...' : 'Search SKU or name...'}
                  value={catalogSearch}
                  onChange={(e) => setCatalogSearch(e.target.value)}
                  className={`w-full ${isRTL ? 'pr-9 pl-3' : 'pl-9 pr-3'} py-2 rounded-xl border border-[#E8E2D9] dark:border-[#2D2A26] bg-[#F8F7F3] dark:bg-[#141210] text-xs text-[#292722] dark:text-[#F8F7F3] focus:outline-none`}
                />
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-start text-xs">
                <thead>
                  <tr className="border-b border-[#E8E2D9] dark:border-[#2D2A26] text-[#6E6A63] dark:text-[#A39E96] uppercase tracking-wider font-bold">
                    <th className="pb-3">{isRTL ? 'المنتج' : 'Product'}</th>
                    <th className="pb-3">{isRTL ? 'المقاسات المعتمدة' : 'Certified Dimensions'}</th>
                    <th className="pb-3">{isRTL ? 'السعر' : 'Price (EGP)'}</th>
                    <th className="pb-3 text-center">{isRTL ? 'حالة النموذج 3D' : '3D Spatial Status'}</th>
                    <th className="pb-3 text-center">{isRTL ? 'المستودع' : 'Stock Hub'}</th>
                    <th className="pb-3 text-end">{isRTL ? 'التفعيل المكاني' : 'Roomora Toggle'}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#E8E2D9] dark:divide-[#2D2A26]">
                  {filteredCatalog.map((prod) => {
                    const name = isRTL && prod.nameAr ? prod.nameAr : prod.name;
                    const location = isRTL && prod.stockLocationAr ? prod.stockLocationAr : prod.stockLocation;
                    return (
                      <tr key={prod.id} className="hover:bg-[#F8F7F3] dark:hover:bg-[#24201C]/60 transition-colors">
                        <td className="py-4">
                          <div className="flex items-center gap-3">
                            <img
                              src={prod.image}
                              alt={name}
                              className="w-12 h-12 rounded-lg object-cover border border-[#E8E2D9] dark:border-[#2D2A26]"
                            />
                            <div>
                              <span className="font-bold text-[#292722] dark:text-[#F8F7F3] block">{name}</span>
                              <span className="text-[10px] text-[#B58A54] font-mono" dir="ltr">{prod.sku}</span>
                            </div>
                          </div>
                        </td>
                        <td className="py-4 font-mono text-[#6E6A63] dark:text-[#A39E96]" dir="ltr">
                          {prod.dimensions.widthCm}W × {prod.dimensions.depthCm}D × {prod.dimensions.heightCm}H cm
                        </td>
                        <td className="py-4 font-bold text-[#292722] dark:text-[#F8F7F3]">
                          {formatPrice(prod.priceEgp)}
                        </td>
                        <td className="py-4 text-center">
                          <span className="px-2.5 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-400 text-[10px] font-bold uppercase tracking-wider">
                            {isRTL ? '✓ جاهز ثلاثي الأبعاد' : '✓ High-Poly 3D Ready'}
                          </span>
                        </td>
                        <td className="py-4 text-center text-[11px] text-[#6E6A63] dark:text-[#A39E96]">
                          {location}
                        </td>
                        <td className="py-4 text-end">
                          <span className="px-3 py-1 rounded-lg bg-[#292722] text-white dark:bg-[#F8F7F3] dark:text-[#292722] text-[11px] font-bold">
                            {isRTL ? 'مفعل في المعاينة' : 'Active in AR'}
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ================= TAB 3: LIVE SESSIONS ================= */}
        {activeTab === 'sessions' && (
          <div className="bg-white dark:bg-[#1C1A17] rounded-3xl border border-[#E8E2D9] dark:border-[#2D2A26] p-6 sm:p-8 space-y-6 animate-in fade-in transition-colors">
            <div className="flex items-center justify-between border-b border-[#E8E2D9] dark:border-[#2D2A26] pb-4">
              <div>
                <h3 className="text-xl font-editorial font-bold text-[#292722] dark:text-[#F8F7F3]">
                  {isRTL ? 'بث مباشر لجلسات معاينة العملاء' : 'Real-Time Room Visualization Stream'}
                </h3>
                <p className="text-xs text-[#6E6A63] dark:text-[#A39E96] font-normal">
                  {isRTL ? 'جلسات حية من زوار في القاهرة، الشيخ زايد، التجمع الخامس، والإسكندرية.' : 'Live customer sessions originating from Cairo, Sheikh Zayed, New Cairo, and Alexandria.'}
                </p>
              </div>
              <button
                onClick={() => showToast(isRTL ? 'تم تحديث سجل الجلسات المباشر' : 'Refreshed live customer telemetry feed')}
                className="p-2 rounded-xl bg-[#E9DFD0] hover:bg-[#DDD0BE] text-[#292722] text-xs font-bold flex items-center gap-1.5 cursor-pointer transition-colors border border-[#CDBBA5]/70"
              >
                <RefreshCw className="w-3.5 h-3.5 text-[#B58A54]" />
                <span>{isRTL ? 'تحديث البث' : 'Refresh Stream'}</span>
              </button>
            </div>

            <div className="space-y-3">
              {SHOWROOM_MOCK_DATA.recentVisualizations.map((session, idx) => {
                const arabicCities = [
                  'القاهرة الجديدة (التجمع الخامس)',
                  'الشيخ زايد (بالم هيلز)',
                  'حي الزمالك، القاهرة',
                  'المعادي دجلة، القاهرة',
                  'الإسكندرية (كفر عبده)',
                ];
                const city = isRTL ? arabicCities[idx] : session.customerCity;
                return (
                  <div
                    key={session.id}
                    className="p-4 rounded-2xl bg-[#F8F7F3] dark:bg-[#24201C] border border-[#E8E2D9] dark:border-[#2D2A26] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-white dark:bg-[#1C1A17] flex items-center justify-center font-mono font-bold text-xs text-[#B58A54] border border-[#E8E2D9] dark:border-[#2D2A26]">
                        AR
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="font-bold text-sm text-[#292722] dark:text-[#F8F7F3]">
                            {session.productName}
                          </h4>
                          <span className="text-[10px] px-2 py-0.5 rounded-full bg-white dark:bg-[#1C1A17] text-[#6E6A63] dark:text-[#A39E96] border border-[#E8E2D9] dark:border-[#2D2A26]">
                            {session.productCategory}
                          </span>
                        </div>
                        <p className="text-[11px] text-[#6E6A63] dark:text-[#A39E96] mt-0.5 font-normal">
                          {isRTL ? `عميل في ${city} · وقت التجربة: ${session.durationSec} ثانية` : `Customer in ${city} · Dwell time: ${session.durationSec}s`}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 sm:text-end w-full sm:w-auto justify-between sm:justify-end pt-2 sm:pt-0 border-t sm:border-0 border-[#E8E2D9] dark:border-[#2D2A26]">
                      <span className="text-xs text-[#6E6A63] dark:text-[#A39E96]">{session.timestamp}</span>
                      {session.convertedToCart ? (
                        <span className="px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-400 text-xs font-bold flex items-center gap-1">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          <span>{isRTL ? `أضاف للسلة (${formatPrice(session.orderValueEgp || 0)})` : `Added to Cart (${formatPrice(session.orderValueEgp || 0)})`}</span>
                        </span>
                      ) : (
                        <span className="px-3 py-1 rounded-full bg-white dark:bg-[#1C1A17] text-[#6E6A63] dark:text-[#A39E96] text-xs font-medium border border-[#E8E2D9] dark:border-[#2D2A26]">
                          {isRTL ? 'فحص المقاسات فقط' : 'Browsed Dimensions'}
                        </span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* ================= TAB 4: INTEGRATION & API ================= */}
        {activeTab === 'integration' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 animate-in fade-in">
            {/* Left Column: Embed code & API Key (8 cols) */}
            <div className="lg:col-span-8 bg-white dark:bg-[#1C1A17] rounded-3xl border border-[#E8E2D9] dark:border-[#2D2A26] p-6 sm:p-8 space-y-6 transition-colors">
              <div className="border-b border-[#E8E2D9] dark:border-[#2D2A26] pb-4">
                <h3 className="text-xl font-editorial font-bold text-[#292722] dark:text-[#F8F7F3]">
                  {isRTL ? 'كود التثبيت في الموقع وإعدادات API' : 'Website Widget & API Configuration'}
                </h3>
                <p className="text-xs text-[#6E6A63] dark:text-[#A39E96] font-normal">
                  {isRTL ? 'ادمج رومورا في متجر شوبيفاي أو ووكومرس أو ماجنتو بكود جافاسكريبت واحد فقط.' : 'Embed Roomora into your Shopify, WooCommerce, Magento, or custom React storefront with a single script tag.'}
                </p>
              </div>

              {/* API Key Box */}
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-[#292722] dark:text-[#F8F7F3] block">
                  {isRTL ? 'مفتاح API المباشر للمعرض' : 'Showroom Live Secret API Key'}
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="password"
                    readOnly
                    value={apiKey}
                    className="flex-1 px-4 py-2.5 rounded-xl border border-[#E8E2D9] dark:border-[#2D2A26] bg-[#F8F7F3] dark:bg-[#141210] font-mono text-xs text-[#292722] dark:text-[#F8F7F3]"
                  />
                  <button
                    onClick={handleCopyApiKey}
                    className="px-4 py-2.5 rounded-xl bg-[#292722] hover:bg-[#3D3A34] dark:bg-[#F8F7F3] dark:hover:bg-white text-white dark:text-[#292722] text-xs font-bold flex items-center gap-1.5 cursor-pointer shadow-sm transition-all"
                  >
                    {apiKeyCopied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5 text-[#B58A54]" />}
                    <span>{apiKeyCopied ? (isRTL ? 'تم النسخ' : 'Copied') : (isRTL ? 'نسخ' : 'Copy')}</span>
                  </button>
                </div>
                <p className="text-[11px] text-[#6E6A63] dark:text-[#A39E96] font-normal">
                  {isRTL ? 'استخدم هذا المفتاح لمزامنة كتالوج المنتجات ومخزون الفروع تلقائياً.' : 'Use this key to authorize server-to-server catalog synchronizations.'}
                </p>
              </div>

              {/* Embed Script Box */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold uppercase tracking-wider text-[#292722] dark:text-[#F8F7F3] block">
                    {isRTL ? 'كود الجافاسكريبت السريع' : 'Drop-in HTML Script Tag'}
                  </label>
                  <button
                    onClick={handleCopyEmbed}
                    className="text-xs text-[#B58A54] hover:text-[#292722] dark:hover:text-[#F8F7F3] font-bold flex items-center gap-1 cursor-pointer transition-colors"
                  >
                    {embedCopied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{embedCopied ? (isRTL ? 'تم النسخ للحافظة' : 'Copied to Clipboard') : (isRTL ? 'نسخ الكود' : 'Copy Code')}</span>
                  </button>
                </div>

                <pre className="p-4 rounded-2xl bg-[#1C1A17] text-[#CDBBA5] font-mono text-xs overflow-x-auto leading-relaxed border border-[#2D2A26]" dir="ltr">
                  {embedCode}
                </pre>
              </div>
            </div>

            {/* Right Column: Live Widget Customizer Preview (4 cols) */}
            <div className="lg:col-span-4 bg-white dark:bg-[#1C1A17] rounded-3xl border border-[#E8E2D9] dark:border-[#2D2A26] p-6 space-y-6 flex flex-col justify-between transition-colors">
              <div>
                <span className="text-[10px] uppercase font-bold text-[#B58A54] tracking-widest block mb-1">
                  {isRTL ? 'مخصص المظهر' : 'Customizer'}
                </span>
                <h4 className="text-lg font-editorial font-bold text-[#292722] dark:text-[#F8F7F3] mb-1">
                  {isRTL ? 'تخصيص مظهر الزر' : 'Widget Visual Style'}
                </h4>
                <p className="text-xs text-[#6E6A63] dark:text-[#A39E96] mb-4 font-normal">
                  {isRTL ? 'نسق ألوان الزر والخطوط مع هوية معرضك.' : 'Match the Roomora button to your showroom\'s exact brand colors.'}
                </p>

                <div className="p-4 rounded-2xl bg-[#F8F7F3] dark:bg-[#24201C] border border-[#E8E2D9] dark:border-[#2D2A26] mb-6 space-y-3">
                  <span className="text-xs font-bold text-[#292722] dark:text-[#F8F7F3] uppercase tracking-wider block">
                    {isRTL ? 'معاينة حية على صفحة المنتج' : 'Storefront Live Preview'}
                  </span>
                  <div className="bg-white dark:bg-[#1C1A17] p-4 rounded-xl border border-[#E8E2D9] dark:border-[#2D2A26] space-y-3 shadow-sm">
                    <div className="h-4 w-28 bg-[#E8E2D9] dark:bg-[#2D2A26] rounded"></div>
                    <div className="h-6 w-44 bg-[#292722] dark:bg-[#F8F7F3] rounded"></div>
                    {/* The Live Button */}
                    <button className="w-full py-3 rounded-xl bg-[#292722] text-white dark:bg-[#F8F7F3] dark:text-[#292722] text-xs font-bold flex items-center justify-center gap-2 shadow-sm">
                      <Sparkles className="w-3.5 h-3.5 text-[#B58A54]" />
                      <span>{t.tryInRoomBtn} (Roomora)</span>
                    </button>
                    <button className="w-full py-3 rounded-xl bg-[#E9DFD0] dark:bg-[#24201C] text-[#292722] dark:text-[#F8F7F3] text-xs font-bold border border-[#CDBBA5]/70">
                      {isRTL ? 'أضف لسلة المعرض' : 'Add to Showroom Cart'}
                    </button>
                  </div>
                </div>
              </div>

              <button
                onClick={() => showToast(isRTL ? 'تم حفظ تفضيلات المظهر بنجاح' : 'Widget configuration preferences saved')}
                className="w-full py-3 rounded-xl bg-[#292722] hover:bg-[#3D3A34] dark:bg-[#F8F7F3] dark:hover:bg-white text-white dark:text-[#292722] text-xs font-bold uppercase tracking-wider cursor-pointer transition-all shadow-sm"
              >
                {isRTL ? 'حفظ إعدادات المظهر' : 'Save Widget Styling'}
              </button>
            </div>
          </div>
        )}

        {/* ================= TAB 5: PLANS & SUBSCRIPTIONS ================= */}
        {activeTab === 'plans' && (
          <div className="space-y-8 animate-in fade-in">
            <div className="text-center max-w-2xl mx-auto space-y-2">
              <span className="text-xs uppercase font-bold text-[#B58A54] tracking-widest">
                {isRTL ? 'أسعار واضحة ومباشرة' : 'Transparent B2B Pricing'}
              </span>
              <h3 className="text-3xl font-editorial font-bold text-[#292722] dark:text-[#F8F7F3]">
                {isRTL ? 'باقات الاشتراك لمعارض الأثاث' : 'Subscription Plans for Showrooms'}
              </h3>
              <p className="text-xs sm:text-sm text-[#6E6A63] dark:text-[#A39E96] font-normal">
                {isRTL ? 'بالجنيه المصري مع دعم فني وزيارات ميدانية لمعرضك في القاهرة والشيخ زايد.' : 'Priced in Egyptian Pounds with dedicated local support across Cairo and Sheikh Zayed.'}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {INTEGRATION_PLANS.map((plan) => {
                const isCurrent = activePlan === plan.name;
                return (
                  <div
                    key={plan.name}
                    className={`rounded-3xl p-6 sm:p-8 flex flex-col justify-between transition-all ${
                      plan.highlighted
                        ? 'bg-[#292722] text-[#F8F7F3] dark:bg-[#24201C] dark:text-[#F8F7F3] border-2 border-[#B58A54] shadow-lg relative'
                        : 'bg-white dark:bg-[#1C1A17] text-[#292722] dark:text-[#F8F7F3] border border-[#E8E2D9] dark:border-[#2D2A26] shadow-sm'
                    }`}
                  >
                    <div>
                      {plan.highlighted && (
                        <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-3.5 py-1 rounded-full bg-[#B58A54] text-white text-[10px] font-bold uppercase tracking-wider shadow-sm">
                          {isRTL ? 'الأكثر طلباً للمعارض' : plan.badge}
                        </span>
                      )}

                      <h4 className="text-xl font-editorial font-bold mb-1">{plan.name}</h4>
                      <p className={`text-xs mb-4 font-normal ${plan.highlighted ? 'text-stone-300' : 'text-[#6E6A63] dark:text-[#A39E96]'}`}>
                        {plan.description}
                      </p>

                      <div className="flex items-baseline gap-1 mb-6">
                        <span className="text-3xl font-editorial font-bold">{plan.price}</span>
                        <span className={`text-xs ${plan.highlighted ? 'text-stone-300' : 'text-[#6E6A63] dark:text-[#A39E96]'}`}>
                          {isRTL ? 'ج.م / شهرياً' : plan.currency}
                        </span>
                      </div>

                      <ul className="space-y-2.5 text-xs mb-8 font-normal">
                        {plan.features.map((feature, idx) => (
                          <li key={idx} className="flex items-start gap-2">
                            <CheckCircle2
                              className={`w-4 h-4 shrink-0 mt-0.5 ${
                                plan.highlighted ? 'text-[#B58A54]' : 'text-[#B58A54]'
                              }`}
                            />
                            <span className={plan.highlighted ? 'text-stone-200' : 'text-[#6E6A63] dark:text-[#A39E96]'}>
                              {feature}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <button
                      onClick={() => {
                        setActivePlan(plan.name);
                        showToast(isRTL ? `تم اختيار باقة ${plan.name}` : `Selected ${plan.name} subscription plan`);
                      }}
                      className={`w-full py-3.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                        plan.highlighted
                          ? 'bg-[#B58A54] text-white hover:bg-[#a17743] shadow-sm'
                          : 'bg-[#292722] text-white dark:bg-[#F8F7F3] dark:text-[#292722] hover:bg-[#3D3A34] dark:hover:bg-white'
                      }`}
                    >
                      {isCurrent ? (isRTL ? 'الباقة الحالية للمعرض' : 'Current Showroom Plan') : (isRTL ? 'اختيار هذه الباقة' : plan.cta)}
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
