import React, { useState } from 'react';
import { useVisualizer } from '../context/VisualizerContext';
import { useCart } from '../context/CartContext';
import { useLanguage } from '../context/LanguageContext';
import { DemoBadge } from '../components/common/DemoBadge';
import { LUXURY_PRODUCTS } from '../data/products';
import { 
  Building2, 
  Sparkles, 
  CheckCircle2, 
  Copy, 
  Check 
} from 'lucide-react';

export const IntegrationPage: React.FC = () => {
  const { openBookDemo, openExperienceA } = useVisualizer();
  const { showToast } = useCart();
  const { isRTL, t } = useLanguage();

  const [activeIntegrationTab, setActiveIntegrationTab] = useState<'widget' | 'api' | 'plugins'>('widget');
  const [copiedSnippet, setCopiedSnippet] = useState(false);
  const [interactiveButtonText, setInteractiveButtonText] = useState(isRTL ? 'عاين في غرفتك' : 'See It in My Room');
  const [interactiveColor, setInteractiveColor] = useState('#292722');

  const widgetSnippet = `<!-- 1. Include Roomora Spatial Web Component -->
<script 
  src="https://cdn.roomora.ai/v2/roomora-widget.js" 
  data-retailer-id="eg_cairo_atelier_9021"
  data-accent-color="${interactiveColor}"
  async>
</script>

<!-- 2. Target Button Injected into Your Product Page -->
<div 
  id="roomora-visualize-trigger"
  data-product-sku="RM-SOF-8821"
  data-product-name="Caelum Curved L-Sectional"
  data-product-price="48500"
  data-dimensions="285x165x82"
  data-currency="EGP">
</div>`;

  const apiSnippet = `// POST /api/v2/spatial/place-furniture
const response = await fetch("https://api.roomora.ai/v2/spatial/place", {
  method: "POST",
  headers: {
    "Authorization": "Bearer rm_live_cairo_90218_sec...",
    "Content-Type": "application/json"
  },
  body: JSON.stringify({
    roomImageUrl: "https://your-showroom.com/uploads/room_1029.jpg",
    productSku: "RM-SOF-8821",
    clearanceCheck: true,
    shadowAccuracy: "high"
  })
});

const result = await response.json();
console.log(result.renderedImageUrl, result.fitClearancePassed);`;

  const handleCopy = () => {
    navigator.clipboard.writeText(activeIntegrationTab === 'widget' ? widgetSnippet : apiSnippet);
    setCopiedSnippet(true);
    showToast(isRTL ? 'تم نسخ الكود للحافظة' : 'Code copied to clipboard');
    setTimeout(() => setCopiedSnippet(false), 2500);
  };

  return (
    <div className="min-h-screen bg-white dark:bg-[#121110] pb-24 transition-colors">
      {/* Hero Section - 25% Warm Ivory Section */}
      <section className="bg-[#F8F7F3] dark:bg-[#181614] text-[#292722] dark:text-[#F8F7F3] pt-36 pb-16 sm:pt-40 lg:pb-24 border-b border-[#E8E2D9] dark:border-[#2D2A26] relative overflow-hidden transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center max-w-3xl mx-auto space-y-6">
          <DemoBadge
            variant="subtle"
            text={isRTL ? 'مركز دمج المعارض والتقنية' : 'B2B Retailer Integration Hub'}
            className="bg-white/90 dark:bg-white/10 text-[#6E6A63] dark:text-[#A39E96] border-[#E8E2D9] dark:border-white/10 mx-auto"
          />

          <h1 className="text-4xl sm:text-6xl font-editorial font-bold text-[#292722] dark:text-[#F8F7F3] leading-tight">
            {isRTL ? 'ادمج تقنية الذكاء الاصطناعي المكاني في موقع معرضك خلال 15 دقيقة' : 'Integrate Spatial AI into Your Showroom Website in 15 Minutes'}
          </h1>

          <p className="text-sm sm:text-base text-[#6E6A63] dark:text-[#A39E96] leading-relaxed max-w-2xl mx-auto font-normal">
            {isRTL
              ? 'سواء كان متجرك يعمل على شوبيفاي، ووكومرس، ماجنتو، أو بنية برمجية خاصة، يندمج رومورا دون الحاجة لإعادة كتابة كود الخادم، مع الحفاظ الكامل على بوابات الدفع ومخزونك الحالي.'
              : 'Whether you run on Shopify, WooCommerce, Magento, or a custom headless stack, Roomora embeds with zero backend rewrites. Keep your existing payment gateway and fulfillment workflows intact.'}
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
            <button
              onClick={openBookDemo}
              className="w-full sm:w-auto px-8 py-4 rounded-xl bg-[#292722] hover:bg-[#3D3A34] dark:bg-[#F8F7F3] dark:hover:bg-white text-white dark:text-[#292722] font-bold text-xs uppercase tracking-wider transition-all shadow-sm flex items-center justify-center gap-2 cursor-pointer"
            >
              <Building2 className="w-4 h-4 text-[#B58A54] dark:text-[#292722]" />
              <span>{isRTL ? 'حجز موعد استشارة للمعرض' : 'Schedule Retailer Consultation'}</span>
            </button>

            <button
              onClick={() => openExperienceA(LUXURY_PRODUCTS[0])}
              className="w-full sm:w-auto px-8 py-4 rounded-xl bg-white dark:bg-[#1E1C1A] hover:bg-[#E9DFD0] dark:hover:bg-[#2A2621] text-[#292722] dark:text-[#F8F7F3] font-bold text-xs tracking-wide border border-[#E8E2D9] dark:border-[#2D2A26] transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <Sparkles className="w-4 h-4 text-[#B58A54]" />
              <span>{isRTL ? 'تجربة عمل الزر مباشرة' : 'Test Widget Trigger Live'}</span>
            </button>
          </div>
        </div>
      </section>

      {/* 3-Step Simple Process - 60% Pure White Section */}
      <section className="py-20 bg-white dark:bg-[#121110] border-b border-[#E8E2D9] dark:border-[#2D2A26] transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
            <span className="text-xs uppercase tracking-widest font-bold text-[#B58A54]">
              {isRTL ? 'خطوات دمج سريعة ومبسطة' : 'Frictionless Deployment'}
            </span>
            <h2 className="text-3xl sm:text-4xl font-editorial font-bold text-[#292722] dark:text-[#F8F7F3]">
              {isRTL ? 'خطوات ربط المعرض في 3 مراحل' : 'The 3-Step Showroom Integration'}
            </h2>
            <p className="text-xs sm:text-sm text-[#6E6A63] dark:text-[#A39E96] font-normal">
              {isRTL ? 'من رفع كتالوج المنتجات حتى إطلاق أول معاينة مكانية للعملاء.' : 'From initial catalog onboarding to first live customer visualization.'}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Step 1 */}
            <div className="p-8 rounded-3xl bg-[#F8F7F3] dark:bg-[#1C1A17] border border-[#E8E2D9] dark:border-[#2D2A26] space-y-4 relative transition-colors">
              <span className="w-12 h-12 rounded-2xl bg-[#292722] text-[#F8F7F3] dark:bg-[#F8F7F3] dark:text-[#292722] font-bold text-lg flex items-center justify-center shadow-sm">
                1
              </span>
              <h3 className="text-xl font-editorial font-bold text-[#292722] dark:text-[#F8F7F3]">
                {isRTL ? 'ربط كتالوج الأثاث' : 'Connect Your Furniture Catalog'}
              </h3>
              <p className="text-xs text-[#6E6A63] dark:text-[#A39E96] leading-relaxed font-normal">
                {isRTL
                  ? 'ارفع صور منتجاتك عالية الدقة ومقاساتها الفعلية (العرض × العمق × الارتفاع). يقوم فريقنا في القاهرة بإعداد النماذج ثلاثية الأبعاد خلال 48 ساعة.'
                  : 'Upload your high-res product photos and physical dimensions (Width × Depth × Height). Our team in Cairo generates 3D spatial twins within 48 hours.'}
              </p>
              <ul className="text-[11px] text-[#6E6A63] dark:text-[#A39E96] space-y-1.5 pt-2 font-normal">
                <li className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#B58A54]" />
                  <span>{isRTL ? 'يدعم ملفات CSV أو إكسل أو رابط API مباشر' : 'Supports CSV, Excel, or live product feed'}</span>
                </li>
                <li className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#B58A54]" />
                  <span>{isRTL ? 'الأسعار بالجنيه المصري ومخزون فروع القاهرة' : 'Egyptian Pound pricing & Cairo stock sync'}</span>
                </li>
              </ul>
            </div>

            {/* Step 2 */}
            <div className="p-8 rounded-3xl bg-[#F8F7F3] dark:bg-[#1C1A17] border border-[#E8E2D9] dark:border-[#2D2A26] space-y-4 relative transition-colors">
              <span className="w-12 h-12 rounded-2xl bg-[#292722] text-[#F8F7F3] dark:bg-[#F8F7F3] dark:text-[#292722] font-bold text-lg flex items-center justify-center shadow-sm">
                2
              </span>
              <h3 className="text-xl font-editorial font-bold text-[#292722] dark:text-[#F8F7F3]">
                {isRTL ? 'تثبيت كود الويدجت' : 'Install the Integration Widget'}
              </h3>
              <p className="text-xs text-[#6E6A63] dark:text-[#A39E96] leading-relaxed font-normal">
                {isRTL
                  ? 'الصق سطر الجافاسكريبت البسيط في صفحات منتجاتك أو ثبت تطبيق شوبيفاي المعتمد. يظهر زر "عاين في غرفتك" تلقائياً بجانب زر الشراء.'
                  : 'Paste our lightweight JavaScript snippet onto your product pages or install our 1-click Shopify App. The "Try in My Room" button attaches automatically.'}
              </p>
              <ul className="text-[11px] text-[#6E6A63] dark:text-[#A39E96] space-y-1.5 pt-2 font-normal">
                <li className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#B58A54]" />
                  <span>{isRTL ? 'حجم خفيف جداً (أقل من 28 كيلوبايت غير متزامن)' : 'Lightweight bundle (< 28kb asynchronous)'}</span>
                </li>
                <li className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#B58A54]" />
                  <span>{isRTL ? 'بدون أي تأثير على سرعة تصفح موقعك' : 'Zero slowdown on Google Core Web Vitals'}</span>
                </li>
              </ul>
            </div>

            {/* Step 3 */}
            <div className="p-8 rounded-3xl bg-[#F8F7F3] dark:bg-[#1C1A17] border border-[#E8E2D9] dark:border-[#2D2A26] space-y-4 relative transition-colors">
              <span className="w-12 h-12 rounded-2xl bg-[#292722] text-[#F8F7F3] dark:bg-[#F8F7F3] dark:text-[#292722] font-bold text-lg flex items-center justify-center shadow-sm">
                3
              </span>
              <h3 className="text-xl font-editorial font-bold text-[#292722] dark:text-[#F8F7F3]">
                {isRTL ? 'معاينة مكانية وشراء فوري' : 'Customers Visualize & Shop'}
              </h3>
              <p className="text-xs text-[#6E6A63] dark:text-[#A39E96] leading-relaxed font-normal">
                {isRTL
                  ? 'يشاهد المتسوقون قطع الأثاث بمقاساتها الملمترية الحقيقية داخل غرفهم، ثم يضيفون القطعة لسلة متجرك مباشرة، مما يرفع نسبة الشراء بنسبة +38%.'
                  : 'Shoppers see furniture realistically scaled inside their actual rooms. They add directly to their existing cart, driving +38% higher conversion rates.'}
              </p>
              <ul className="text-[11px] text-[#6E6A63] dark:text-[#A39E96] space-y-1.5 pt-2 font-normal">
                <li className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#B58A54]" />
                  <span>{isRTL ? 'انخفاض 41% في طلبات إرجاع الأثاث' : '41% drop in dimensional return requests'}</span>
                </li>
                <li className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#B58A54]" />
                  <span>{isRTL ? 'تقارير فورية على لوحة تحكم المعرض' : 'Real-time analytics in your showroom portal'}</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Integration Playground Section */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white dark:bg-[#1C1A17] rounded-3xl border border-[#E8E2D9] dark:border-[#2D2A26] p-6 sm:p-10 shadow-sm space-y-8 transition-colors">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#E8E2D9] dark:border-[#2D2A26] pb-6">
            <div>
              <span className="text-xs uppercase font-bold text-[#B58A54] tracking-wider block mb-1">
                {isRTL ? 'مركز المطورين والمعماريين التقنيين' : 'Developer & Technical Architect Hub'}
              </span>
              <h2 className="text-2xl sm:text-3xl font-editorial font-bold text-[#292722] dark:text-[#F8F7F3]">
                {isRTL ? 'اختر الطريقة البرمجية المناسبة لمعرضك' : 'Choose Your Integration Architecture'}
              </h2>
            </div>

            {/* Method Tabs */}
            <div className="flex items-center gap-2 p-1 bg-[#F8F7F3] dark:bg-[#24201C] rounded-xl border border-[#E8E2D9] dark:border-[#2D2A26]">
              <button
                onClick={() => setActiveIntegrationTab('widget')}
                className={`px-4 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  activeIntegrationTab === 'widget' ? 'bg-[#292722] text-[#F8F7F3] dark:bg-[#F8F7F3] dark:text-[#292722]' : 'text-[#6E6A63] dark:text-[#A39E96]'
                }`}
              >
                {isRTL ? 'عنصر ويب سريع' : 'Drop-in Web Component'}
              </button>
              <button
                onClick={() => setActiveIntegrationTab('api')}
                className={`px-4 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  activeIntegrationTab === 'api' ? 'bg-[#292722] text-[#F8F7F3] dark:bg-[#F8F7F3] dark:text-[#292722]' : 'text-[#6E6A63] dark:text-[#A39E96]'
                }`}
              >
                {isRTL ? 'واجهة برمجة REST API' : 'Headless REST API'}
              </button>
              <button
                onClick={() => setActiveIntegrationTab('plugins')}
                className={`px-4 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  activeIntegrationTab === 'plugins' ? 'bg-[#292722] text-[#F8F7F3] dark:bg-[#F8F7F3] dark:text-[#292722]' : 'text-[#6E6A63] dark:text-[#A39E96]'
                }`}
              >
                {isRTL ? 'إضافات المنصات' : 'E-Commerce Plugins'}
              </button>
            </div>
          </div>

          {/* Interactive Playground Row */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Code Snippet Box (7 cols) */}
            <div className="lg:col-span-7 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-[#B58A54]" dir="ltr">
                  {activeIntegrationTab === 'widget' && 'embed.html (Single Tag)'}
                  {activeIntegrationTab === 'api' && 'server.js (Node / Python)'}
                  {activeIntegrationTab === 'plugins' && 'One-Click Platform Extensions'}
                </span>
                <button
                  onClick={handleCopy}
                  className="text-xs text-[#292722] dark:text-[#F8F7F3] hover:text-[#B58A54] font-bold flex items-center gap-1 cursor-pointer transition-colors"
                >
                  {copiedSnippet ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedSnippet ? (isRTL ? 'تم النسخ' : 'Copied') : (isRTL ? 'نسخ الكود' : 'Copy Code')}</span>
                </button>
              </div>

              {activeIntegrationTab === 'plugins' ? (
                <div className="p-6 rounded-2xl bg-[#F8F7F3] dark:bg-[#24201C] border border-[#E8E2D9] dark:border-[#2D2A26] space-y-4">
                  <h4 className="font-editorial font-bold text-lg text-[#292722] dark:text-[#F8F7F3]">
                    {isRTL ? 'المنصات المدعومة للإدماج الفوري' : 'Supported E-Commerce Platforms'}
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="p-4 bg-white dark:bg-[#1C1A17] rounded-xl border border-[#E8E2D9] dark:border-[#2D2A26]">
                      <h5 className="font-bold text-sm text-[#292722] dark:text-[#F8F7F3]">Shopify & Shopify Plus</h5>
                      <p className="text-xs text-[#6E6A63] dark:text-[#A39E96] mt-1 font-normal">{isRTL ? 'تطبيق معتمد يثبت بنقرة واحدة ويدمج الزر في قالب متجرك تلقائياً.' : 'App Store 1-click install with automatic theme app extension placement.'}</p>
                    </div>
                    <div className="p-4 bg-white dark:bg-[#1C1A17] rounded-xl border border-[#E8E2D9] dark:border-[#2D2A26]">
                      <h5 className="font-bold text-sm text-[#292722] dark:text-[#F8F7F3]">WooCommerce (WordPress)</h5>
                      <p className="text-xs text-[#6E6A63] dark:text-[#A39E96] mt-1 font-normal">{isRTL ? 'إضافة ووردبريس معتمدة تدعم كافة القوالب بمرونة تامة.' : 'WordPress plugin hook injecting into single product action filters.'}</p>
                    </div>
                    <div className="p-4 bg-white dark:bg-[#1C1A17] rounded-xl border border-[#E8E2D9] dark:border-[#2D2A26]">
                      <h5 className="font-bold text-sm text-[#292722] dark:text-[#F8F7F3]">Magento 2 / Adobe Commerce</h5>
                      <p className="text-xs text-[#6E6A63] dark:text-[#A39E96] mt-1 font-normal">{isRTL ? 'موديول مخصص للمؤسسات والمتاجر متعددة الفروع والعملات.' : 'Adobe Commerce module with enterprise multi-storefront support.'}</p>
                    </div>
                    <div className="p-4 bg-white dark:bg-[#1C1A17] rounded-xl border border-[#E8E2D9] dark:border-[#2D2A26]">
                      <h5 className="font-bold text-sm text-[#292722] dark:text-[#F8F7F3]">Headless React / Next.js</h5>
                      <p className="text-xs text-[#6E6A63] dark:text-[#A39E96] mt-1 font-normal">{isRTL ? 'حزمة npm متوافقة مع TypeScript لتجربة مخصصة بالكامل.' : 'SDK npm package with TypeScript types and custom UI component hooks.'}</p>
                    </div>
                  </div>
                </div>
              ) : (
                <pre className="p-5 rounded-2xl bg-[#1C1A17] text-[#CDBBA5] font-mono text-xs overflow-x-auto leading-relaxed border border-[#2D2A26]" dir="ltr">
                  {activeIntegrationTab === 'widget' ? widgetSnippet : apiSnippet}
                </pre>
              )}
            </div>

            {/* Live Interactive Sandbox Preview (5 cols) */}
            <div className="lg:col-span-5 p-6 rounded-2xl bg-[#F8F7F3] dark:bg-[#24201C] border border-[#E8E2D9] dark:border-[#2D2A26] space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-[#292722] dark:text-[#F8F7F3]">
                  {isRTL ? 'محاكاة حية على بطاقة المنتج' : 'Live Storefront Simulation'}
                </span>
                <span className="text-[10px] text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 px-2 py-0.5 rounded-full font-bold">
                  {isRTL ? 'تفاعلي' : 'Interactive'}
                </span>
              </div>

              {/* Simulated Retailer Product Card */}
              <div className="bg-white dark:bg-[#1C1A17] p-5 rounded-2xl border border-[#E8E2D9] dark:border-[#2D2A26] space-y-4 shadow-sm">
                <img
                  src={LUXURY_PRODUCTS[0].image}
                  alt="Product preview"
                  className="w-full h-40 object-cover rounded-xl"
                />
                <div>
                  <span className="text-[10px] text-[#B58A54] uppercase font-bold tracking-wider">
                    {isRTL ? LUXURY_PRODUCTS[0].collectionAr : LUXURY_PRODUCTS[0].collection}
                  </span>
                  <h4 className="font-editorial font-bold text-base text-[#292722] dark:text-[#F8F7F3]">
                    {isRTL ? LUXURY_PRODUCTS[0].nameAr : LUXURY_PRODUCTS[0].name}
                  </h4>
                  <span className="font-bold text-lg text-[#292722] dark:text-[#F8F7F3]">
                    {isRTL ? '٤٨,٥٠٠ ج.م' : '48,500 EGP'}
                  </span>
                </div>

                {/* The Embedded Roomora Button in Action */}
                <div className="space-y-2 pt-2">
                  <button
                    onClick={() => openExperienceA(LUXURY_PRODUCTS[0])}
                    style={{ backgroundColor: interactiveColor }}
                    className="w-full py-3 rounded-xl text-white text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 shadow-sm hover:opacity-90 transition-opacity cursor-pointer"
                  >
                    <Sparkles className="w-4 h-4 text-[#CDBBA5]" />
                    <span>{interactiveButtonText}</span>
                  </button>

                  <button className="w-full py-3 rounded-xl bg-[#F8F7F3] dark:bg-[#24201C] text-[#6E6A63] dark:text-[#A39E96] text-xs font-bold cursor-not-allowed">
                    {isRTL ? 'زر "أضف للسلة" العادي بالمتجر' : 'Standard "Add to Cart" Button'}
                  </button>
                </div>
              </div>

              {/* Customizer controls */}
              <div className="space-y-3 pt-2 text-xs">
                <div>
                  <label className="text-[11px] font-bold text-[#6E6A63] dark:text-[#A39E96] uppercase block mb-1">
                    {isRTL ? 'نص الزر' : 'Button Label'}
                  </label>
                  <input
                    type="text"
                    value={interactiveButtonText}
                    onChange={(e) => setInteractiveButtonText(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-white dark:bg-[#1C1A17] border border-[#E8E2D9] dark:border-[#2D2A26] text-xs font-bold text-[#292722] dark:text-[#F8F7F3]"
                  />
                </div>

                <div>
                  <label className="text-[11px] font-bold text-[#6E6A63] dark:text-[#A39E96] uppercase block mb-1">
                    {isRTL ? 'لون هوية المعرض' : 'Brand Color Palette'}
                  </label>
                  <div className="flex gap-2">
                    {['#292722', '#B58A54', '#858B70', '#5C5A53'].map((col) => (
                      <button
                        key={col}
                        onClick={() => setInteractiveColor(col)}
                        style={{ backgroundColor: col }}
                        className={`w-7 h-7 rounded-full border-2 transition-transform cursor-pointer ${
                          interactiveColor === col ? 'scale-110 border-white ring-2 ring-[#B58A54]' : 'border-transparent'
                        }`}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Egyptian Showroom Case Study & CTA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 sm:p-12 rounded-3xl bg-[#F8F7F3] dark:bg-[#1C1A17] border border-[#E8E2D9] dark:border-[#2D2A26] flex flex-col md:flex-row items-center justify-between gap-8 transition-colors">
          <div className="space-y-3 max-w-xl">
            <span className="text-xs uppercase font-bold text-[#B58A54] tracking-widest block">
              {isRTL ? 'دراسة حالة واقعية لمعرض في مصر' : 'Egyptian Showroom Case Study'}
            </span>
            <h3 className="text-2xl sm:text-3xl font-editorial font-bold text-[#292722] dark:text-[#F8F7F3]">
              {isRTL ? '"ساعدتنا رومورا في بيع 4 أضعاف الكنب والركنات عبر موقعنا في الشيخ زايد."' : '"Roomora helped our Sheikh Zayed showroom close 4x more sectionals online."'}
            </h3>
            <p className="text-xs sm:text-sm text-[#6E6A63] dark:text-[#A39E96] leading-relaxed font-normal">
              {isRTL
                ? '"تصميمات الشقق في مصر تتنوع بشدة. كان عملاؤنا يترددون خوفاً من عدم ملائمة الركنة ذات الـ 3 أمتار لمدخل الشقة أو مصعد العمارة. مع فحص المقاسات المكاني في رومورا، انخفضت نسبة الإرجاع إلى أقل من 1.5%."'
                : '"Egyptian apartment layouts vary tremendously. Our clients used to worry about fitting 3-meter sectionals past tight elevator shafts. With Roomora\'s dimensional checks, our return rate dropped to under 1.5%."'}
            </p>
            <p className="text-xs font-bold text-[#B58A54]">
              {isRTL ? '— م. كريم الجوهري، العضو المنتدب لمعرض لاتيلييه دي موبل - القاهرة' : '— Karim El-Gohary, Managing Director, L\'Atelier Du Meuble Cairo'}
            </p>
          </div>

          <button
            onClick={openBookDemo}
            className="px-8 py-4 rounded-xl bg-[#292722] hover:bg-[#3D3A34] dark:bg-[#F8F7F3] dark:hover:bg-white text-white dark:text-[#292722] text-xs font-bold uppercase tracking-wider transition-all shadow-sm flex items-center gap-2 shrink-0 cursor-pointer"
          >
            <Building2 className="w-4 h-4 text-[#B58A54] dark:text-[#292722]" />
            <span>{isRTL ? 'احجز موعد دمج النظام لمعرضك' : 'Book Your Showroom Integration'}</span>
          </button>
        </div>
      </section>
    </div>
  );
};
