import React, { useState } from 'react';
import { useStoreBuilder } from '../context/StoreBuilderContext';
import { useLanguage } from '../../../context/LanguageContext';
import {
  Globe,
  Check,
  Copy,
  ExternalLink,
  Truck,
  CreditCard,
  Save,
  Download,
  AlertTriangle,
  QrCode,
} from 'lucide-react';
import { Link } from 'react-router-dom';

export const StoreSettingsView: React.FC = () => {
  const {
    store,
    updateStoreMeta,
    publishStore,
    unpublishStore,
    applyTemplate,
    saveStore,
    isSaving,
  } = useStoreBuilder();
  const { isRTL } = useLanguage();

  const [storeName, setStoreName] = useState(store.storeName);
  const [storeSlug, setStoreSlug] = useState(store.storeSlug);
  const [tagline, setTagline] = useState(store.tagline);
  const [currency, setCurrency] = useState(store.currency || 'EGP');
  const [copiedLink, setCopiedLink] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  const publicUrl = `${window.location.origin}/store/${store.storeSlug}`;

  const handleSaveGeneral = (e: React.FormEvent) => {
    e.preventDefault();
    updateStoreMeta({
      storeName,
      storeSlug: storeSlug.toLowerCase().replace(/[^a-z0-9-]/g, '-'),
      tagline,
      currency,
    });
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(publicUrl);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const handleExportJson = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(store, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `${store.storeSlug}_config.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  return (
    <div className="p-4 sm:p-8 max-w-6xl mx-auto space-y-6 sm:space-y-8 animate-fadeIn text-start">
      {/* Top Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-stone-200">
        <div>
          <h1 className="text-2xl font-serif font-bold text-stone-900 tracking-tight">
            {isRTL ? 'إعدادات المتجر' : 'Store Settings'}
          </h1>
          <p className="text-sm text-stone-500 mt-1">
            {isRTL
              ? 'إعداد بيانات العلامة التجارية، العملة، خيارات الشحن والدفع وحالة النشر.'
              : 'Configure your brand identity, checkout currency, regional logistics, and publication state.'}
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => saveStore()}
            disabled={isSaving}
            className="flex items-center gap-2 px-4 py-2.5 bg-stone-900 hover:bg-stone-800 text-white rounded-lg text-xs font-semibold uppercase tracking-wider transition-all shadow-sm cursor-pointer"
          >
            <Save className="w-4 h-4" />
            {isSaving ? (isRTL ? 'جارٍ الحفظ...' : 'Saving...') : isRTL ? 'حفظ كافة التغييرات' : 'Save All Changes'}
          </button>
        </div>
      </div>

      {/* Publication Status Card */}
      <div
        className={`p-6 rounded-2xl border transition-all ${
          store.isPublished
            ? 'bg-emerald-50/50 border-emerald-200 shadow-sm'
            : 'bg-amber-50/50 border-amber-200 shadow-sm'
        }`}
      >
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-start gap-3">
            <div
              className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                store.isPublished ? 'bg-emerald-600 text-white' : 'bg-amber-600 text-white'
              }`}
            >
              <Globe className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span
                  className={`inline-block w-2.5 h-2.5 rounded-full ${
                    store.isPublished ? 'bg-emerald-500 animate-pulse' : 'bg-amber-500'
                  }`}
                />
                <h3 className="font-serif font-bold text-stone-900 text-base">
                  {store.isPublished
                    ? isRTL
                      ? 'المتجر منشور ومتاح للعملاء'
                      : 'Store is Currently Live to the Public'
                    : isRTL
                    ? 'المتجر في وضع المسودة الخاصة'
                    : 'Store is in Private Draft Mode'}
                </h3>
              </div>
              <p className="text-xs text-stone-600 mt-1 max-w-xl">
                {store.isPublished
                  ? isRTL
                    ? `متجرك مباشر ويستقبل طلبات العملاء على /store/${store.storeSlug}.`
                    : `Your store is live and accepting customer orders at /store/${store.storeSlug}. Published on ${new Date(store.publishedAt || Date.now()).toLocaleDateString()}.`
                  : isRTL
                  ? 'المتجر مخفي عن الزوار حالياً ويمكنك معاينته من داخل استوديو VESTA AI فقط.'
                  : 'Your storefront is hidden from search engines and visitors. Only you can preview it inside the VESTA AI Studio.'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            {store.isPublished ? (
              <>
                <Link
                  to={`/store/${store.storeSlug}`}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-1.5 px-4 py-2 bg-white border border-stone-200 hover:border-stone-400 text-stone-800 rounded-lg text-xs font-medium shadow-2xs transition-colors"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  {isRTL ? 'عرض المتجر الحي' : 'View Live Store'}
                </Link>
                <button
                  onClick={handleCopyLink}
                  className="flex items-center gap-1.5 px-3 py-2 bg-white border border-stone-200 hover:border-stone-400 text-stone-800 rounded-lg text-xs font-medium shadow-2xs transition-colors cursor-pointer"
                >
                  {copiedLink ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                  {copiedLink ? (isRTL ? 'تم النسخ' : 'Copied') : isRTL ? 'مشاركة' : 'Share'}
                </button>
                <button
                  onClick={() => unpublishStore()}
                  className="px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white rounded-lg text-xs font-semibold shadow-2xs transition-colors cursor-pointer"
                >
                  {isRTL ? 'إيقاف النشر' : 'Unpublish'}
                </button>
              </>
            ) : (
              <button
                onClick={() => publishStore()}
                className="px-5 py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white rounded-lg text-xs font-semibold uppercase tracking-wider shadow-sm transition-all cursor-pointer"
              >
                {isRTL ? 'نشر المتجر الآن' : 'Publish Store Now'}
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left 2 Cols: Form Settings */}
        <div className="lg:col-span-2 space-y-6">
          {/* General Information */}
          <div className="bg-white rounded-2xl border border-stone-200 p-6 shadow-2xs">
            <h3 className="font-serif font-bold text-stone-900 text-lg mb-1">
              {isRTL ? 'الملف العام للمتجر' : 'General Store Profile'}
            </h3>
            <p className="text-xs text-stone-500 mb-6">
              {isRTL
                ? 'إدارة اسم المعرض والرابط المختصر والعملة الافتراضية للطلبات.'
                : 'Manage how your boutique appears on receipts, browsers, and social previews.'}
            </p>

            <form onSubmit={handleSaveGeneral} className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-stone-600 mb-1">
                  {isRTL ? 'اسم المتجر / المعرض' : 'Store & Atelier Name'}
                </label>
                <input
                  type="text"
                  value={storeName}
                  onChange={(e) => setStoreName(e.target.value)}
                  className="w-full px-3.5 py-2.5 border border-stone-200 rounded-lg text-sm text-stone-900 focus:outline-hidden focus:border-stone-900 bg-stone-50/50"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-stone-600 mb-1">
                  {isRTL ? 'رابط المتجر المختصر (Slug)' : 'Store Slug / Subpath'}
                </label>
                <div dir="ltr" className="flex items-center">
                  <span className="px-3 py-2.5 bg-stone-100 border border-r-0 border-stone-200 rounded-l-lg text-xs text-stone-500 select-none">
                    /store/
                  </span>
                  <input
                    type="text"
                    value={storeSlug}
                    onChange={(e) => setStoreSlug(e.target.value)}
                    className="flex-1 px-3.5 py-2.5 border border-stone-200 rounded-r-lg text-sm text-stone-900 focus:outline-hidden focus:border-stone-900 bg-stone-50/50 font-mono"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-stone-600 mb-1">
                  {isRTL ? 'الشعار اللفظي للمعرض' : 'Tagline / Brand Motto'}
                </label>
                <input
                  type="text"
                  value={tagline}
                  onChange={(e) => setTagline(e.target.value)}
                  className="w-full px-3.5 py-2.5 border border-stone-200 rounded-lg text-sm text-stone-900 focus:outline-hidden focus:border-stone-900 bg-stone-50/50"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-stone-600 mb-1">
                    {isRTL ? 'عملة المتجر' : 'Store Currency'}
                  </label>
                  <select
                    value={currency}
                    onChange={(e) => setCurrency(e.target.value)}
                    className="w-full px-3.5 py-2.5 border border-stone-200 rounded-lg text-sm text-stone-900 focus:outline-hidden focus:border-stone-900 bg-stone-50/50"
                  >
                    <option value="EGP">EGP — Egyptian Pound (ج.م)</option>
                    <option value="USD">USD — US Dollar ($)</option>
                    <option value="EUR">EUR — Euro (€)</option>
                    <option value="AED">AED — UAE Dirham (د.إ)</option>
                    <option value="SAR">SAR — Saudi Riyal (ر.س)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-stone-600 mb-1">
                    {isRTL ? 'خط خدمة العملاء' : 'Customer Care Hotline'}
                  </label>
                  <input
                    dir="ltr"
                    type="text"
                    defaultValue="+20 (2) 2736 8800"
                    className="w-full px-3.5 py-2.5 border border-stone-200 rounded-lg text-sm text-stone-900 focus:outline-hidden focus:border-stone-900 bg-stone-50/50"
                  />
                </div>
              </div>

              <div className="pt-3 flex items-center justify-between">
                <button
                  type="submit"
                  className="px-5 py-2.5 bg-stone-900 hover:bg-stone-800 text-white rounded-lg text-xs font-bold uppercase tracking-wider transition-all cursor-pointer"
                >
                  {isRTL ? 'تحديث البيانات' : 'Update Profile'}
                </button>
                {saveSuccess && (
                  <span className="text-xs font-medium text-emerald-600 flex items-center gap-1.5 animate-fadeIn">
                    <Check className="w-4 h-4" /> {isRTL ? 'تم حفظ البيانات بنجاح' : 'Profile saved successfully'}
                  </span>
                )}
              </div>
            </form>
          </div>

          {/* Regional Logistics */}
          <div className="bg-white rounded-2xl border border-stone-200 p-6 shadow-2xs">
            <div className="flex items-center gap-2 mb-1">
              <Truck className="w-5 h-5 text-stone-700" />
              <h3 className="font-serif font-bold text-stone-900 text-lg">
                {isRTL ? 'خدمات الشحن والتركيب في مصر' : 'Egyptian Logistics & Fulfillment'}
              </h3>
            </div>
            <p className="text-xs text-stone-500 mb-5">
              {isRTL ? 'توصيل احترافي مع الفك والتركيب داخل منزل العميل.' : 'White-glove assembly, room placement, and scheduled courier dispatch.'}
            </p>

            <div className="space-y-3">
              <div className="p-3.5 rounded-xl border border-stone-200 bg-stone-50/50 flex items-center justify-between">
                <div>
                  <div className="text-sm font-semibold text-stone-900">
                    {isRTL ? 'القاهرة الكبرى والشيخ زايد والتجمع' : 'Greater Cairo & Sheikh Zayed / New Cairo'}
                  </div>
                  <div className="text-xs text-stone-500">
                    {isRTL ? 'توصيل وتركيب مجاني للطلبات فوق 15,000 ج.م' : 'Free White-Glove Room Delivery & On-Site Assembly on orders over 15,000 EGP'}
                  </div>
                </div>
                <span className="px-2.5 py-1 bg-emerald-100 text-emerald-800 text-[11px] font-bold rounded-full">
                  {isRTL ? 'مفعّل' : 'ACTIVE'}
                </span>
              </div>

              <div className="p-3.5 rounded-xl border border-stone-200 bg-stone-50/50 flex items-center justify-between">
                <div>
                  <div className="text-sm font-semibold text-stone-900">
                    {isRTL ? 'الإسكندرية والساحل الشمالي' : 'Alexandria & North Coast (Sahel)'}
                  </div>
                  <div className="text-xs text-stone-500">
                    {isRTL ? 'رحلات أسبوعية بسيارات مجهزة · 1,200 ج.م' : 'Weekly climate-controlled flatbed dispatch · 1,200 EGP flat rate'}
                  </div>
                </div>
                <span className="px-2.5 py-1 bg-emerald-100 text-emerald-800 text-[11px] font-bold rounded-full">
                  {isRTL ? 'مفعّل' : 'ACTIVE'}
                </span>
              </div>
            </div>
          </div>

          {/* Payment Gateways */}
          <div className="bg-white rounded-2xl border border-stone-200 p-6 shadow-2xs">
            <div className="flex items-center gap-2 mb-1">
              <CreditCard className="w-5 h-5 text-stone-700" />
              <h3 className="font-serif font-bold text-stone-900 text-lg">
                {isRTL ? 'بوابات الدفع المصرية' : 'Egyptian Payment Gateways'}
              </h3>
            </div>
            <p className="text-xs text-stone-500 mb-5">
              {isRTL ? 'تفعيل وسائل الدفع المعتمدة والتقسيط للعملاء.' : 'Enable instant CBE-certified payment methods for your shoppers.'}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                { name: 'InstaPay (IPN)', desc: isRTL ? 'تحويل فوري بدون عمولة' : '0% fees, instant settlement' },
                { name: 'ValU & Souhoola BNPL', desc: isRTL ? 'تقسيط حتى 36 شهراً' : 'Up to 36 months installments' },
                { name: 'Meeza / Visa / Mastercard', desc: isRTL ? 'بطاقات الدفع المحلية والدولية' : 'National debit & international cards' },
                { name: 'Fawry Pay & COD', desc: isRTL ? 'أكواد فوري والدفع عند الاستلام' : 'POS kiosk reference numbers' },
              ].map((gw) => (
                <label key={gw.name} className="p-3.5 rounded-xl border border-emerald-200 bg-emerald-50/40 flex items-center justify-between cursor-pointer">
                  <div>
                    <div className="text-xs font-bold text-stone-900">{gw.name}</div>
                    <div className="text-[11px] text-stone-500">{gw.desc}</div>
                  </div>
                  <input type="checkbox" defaultChecked className="accent-stone-900 w-4 h-4" />
                </label>
              ))}
            </div>
          </div>
        </div>

        {/* Right Col: QR, Export, Reset */}
        <div className="space-y-6">
          <div className="bg-white rounded-2xl border border-stone-200 p-6 shadow-2xs text-center">
            <h4 className="font-serif font-bold text-stone-900 text-sm mb-1">
              {isRTL ? 'رمز QR الفوري للمتجر' : 'Instant Store QR Code'}
            </h4>
            <p className="text-xs text-stone-500 mb-4">
              {isRTL ? 'اطبعه على بطاقات المعرض أو قطع الأثاث.' : 'Print this QR code on showroom tags or business cards.'}
            </p>

            <div className="w-40 h-40 mx-auto bg-stone-50 border-2 border-stone-200 rounded-xl flex flex-col items-center justify-center p-3">
              <QrCode className="w-24 h-24 text-stone-800" />
              <span dir="ltr" className="text-[10px] font-mono font-bold text-stone-600 mt-1">
                /store/{store.storeSlug}
              </span>
            </div>

            <button
              onClick={handleCopyLink}
              className="mt-4 w-full py-2 bg-stone-100 hover:bg-stone-200 text-stone-800 text-xs font-semibold rounded-lg transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <Copy className="w-3.5 h-3.5" />
              {copiedLink ? (isRTL ? 'تم نسخ الرابط!' : 'Link Copied to Clipboard!') : isRTL ? 'نسخ رابط المتجر' : 'Copy Store Web Address'}
            </button>
          </div>

          <div className="bg-white rounded-2xl border border-stone-200 p-6 shadow-2xs">
            <h4 className="font-serif font-bold text-stone-900 text-sm mb-1">
              {isRTL ? 'نسخ احتياطي للمتجر' : 'Store Portability'}
            </h4>
            <p className="text-xs text-stone-500 mb-4">
              {isRTL ? 'تصدير بيانات المتجر والصفحات والكتالوج كملف JSON.' : 'Export or migrate your entire store structure, catalog, and theme.'}
            </p>

            <button
              onClick={handleExportJson}
              className="w-full flex items-center justify-center gap-2 py-2.5 px-3 border border-stone-200 hover:border-stone-400 bg-stone-50 rounded-lg text-xs font-medium text-stone-700 transition-colors cursor-pointer"
            >
              <Download className="w-4 h-4" />
              {isRTL ? 'تصدير إعدادات المتجر (JSON)' : 'Export Store Snapshot (JSON)'}
            </button>
          </div>

          <div className="bg-rose-50/40 rounded-2xl border border-rose-200 p-6">
            <div className="flex items-center gap-2 text-rose-800 mb-2">
              <AlertTriangle className="w-4 h-4" />
              <h4 className="font-serif font-bold text-sm">{isRTL ? 'إعادة ضبط القالب الافتراضي' : 'Reset to Preset Template'}</h4>
            </div>
            <p className="text-xs text-rose-700/80 mb-4">
              {isRTL
                ? 'استعادة القالب الافتراضي لإعادة تعيين الصفحات والتنسيقات.'
                : 'Restores the default Palazzo or Nordic luxury preset. All current pages and layouts will be reset to default.'}
            </p>

            <div className="space-y-2">
              <button
                onClick={() => {
                  if (window.confirm(isRTL ? 'هل تريد استعادة قالب Palazzo Atelier الافتراضي؟' : 'Reset store layout to Palazzo Luxury Atelier preset? This will overwrite section edits.')) {
                    applyTemplate('tpl-luxury-atelier');
                  }
                }}
                className="w-full py-2 bg-white hover:bg-rose-100 border border-rose-200 text-rose-900 text-xs font-semibold rounded-lg transition-colors cursor-pointer"
              >
                {isRTL ? 'استعادة Palazzo Atelier' : 'Reset to Palazzo Atelier'}
              </button>
              <button
                onClick={() => {
                  if (window.confirm(isRTL ? 'هل تريد استعادة قالب Nordic Calm الافتراضي؟' : 'Reset store layout to Nordic Calm Living preset? This will overwrite section edits.')) {
                    applyTemplate('tpl-nordic-scandi');
                  }
                }}
                className="w-full py-2 bg-white hover:bg-rose-100 border border-rose-200 text-rose-900 text-xs font-semibold rounded-lg transition-colors cursor-pointer"
              >
                {isRTL ? 'استعادة Nordic Calm' : 'Reset to Nordic Calm'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
