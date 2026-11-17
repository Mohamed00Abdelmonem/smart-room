import React from 'react';
import { useStoreBuilder } from '../context/StoreBuilderContext';
import { useLanguage } from '../../../context/LanguageContext';
import { STORE_TEMPLATES } from '../data/defaultTemplates';
import { Check } from 'lucide-react';

export const DesignBrandingView: React.FC = () => {
  const { store, updateTheme, applyTemplate } = useStoreBuilder();
  const { isRTL } = useLanguage();
  const { theme } = store;

  return (
    <div className="space-y-8 text-start max-w-4xl mx-auto p-4 sm:p-8 md:p-10">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-[#1E1E1E] dark:text-white">
          {isRTL ? 'التصميم والهوية البصرية' : 'Design & Branding'}
        </h1>
        <p className="text-xs text-stone-500 mt-1">
          {isRTL
            ? 'خصّص الهوية البصرية لمتجر الأثاث والألوان والخطوط وأبعاد الحاويات.'
            : "Customize your furniture store's visual identity, palette, typography, and container metrics."}
        </p>
      </div>

      {/* Curated Store Themes (5 Presets) */}
      <div className="p-6 rounded-3xl bg-white dark:bg-[#1A1815] border border-[#E2DBD0] dark:border-[#2D2A26] shadow-xs space-y-4">
        <div className="flex items-center justify-between border-b pb-2">
          <h3 className="font-bold text-sm uppercase tracking-wider text-stone-400">
            {isRTL ? `٠. قوالب وثيمات المتجر (${STORE_TEMPLATES.length})` : `0. Curated Store Themes (${STORE_TEMPLATES.length})`}
          </h3>
          <span className="text-[11px] font-mono text-stone-400">
            {isRTL ? 'تبديل فوري بنقرة واحدة' : '1-Click Theme Switcher'}
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 text-xs">
          {STORE_TEMPLATES.map((t) => {
            const isActive = theme.brandName === t.theme.brandName;
            return (
              <button
                key={t.id}
                onClick={() => applyTemplate(t.id)}
                className={`p-3.5 rounded-2xl border text-start transition cursor-pointer flex flex-col justify-between gap-2.5 ${
                  isActive
                    ? 'bg-amber-50/70 dark:bg-amber-950/20 border-amber-500 ring-1 ring-amber-400/50'
                    : 'bg-stone-50 dark:bg-stone-900 border-stone-200 dark:border-stone-800 hover:border-amber-500'
                }`}
              >
                <div className="space-y-1">
                  <div className="flex items-center justify-between gap-2">
                    <span className="font-bold text-xs text-[#1E1E1E] dark:text-white truncate">{t.name}</span>
                    {isActive && <Check className="w-3.5 h-3.5 text-amber-600 shrink-0" />}
                  </div>
                  <span className="text-[10px] text-stone-500 block truncate">{t.category}</span>
                </div>
                <div className="flex items-center gap-1.5 pt-1">
                  <span className="w-4 h-4 rounded-full border border-stone-300" style={{ backgroundColor: t.theme.colors.background }} />
                  <span className="w-4 h-4 rounded-full border border-stone-300" style={{ backgroundColor: t.theme.colors.primary }} />
                  <span className="w-4 h-4 rounded-full border border-stone-300" style={{ backgroundColor: t.theme.colors.accent }} />
                  <span className="text-[9px] font-mono text-stone-400 ms-auto">{t.theme.typography.headingFont}</span>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Brand Identity */}
      <div className="p-6 rounded-3xl bg-white dark:bg-[#1A1815] border border-[#E2DBD0] dark:border-[#2D2A26] shadow-xs space-y-4">
        <h3 className="font-bold text-sm uppercase tracking-wider text-stone-400 border-b pb-2">
          {isRTL ? '١. هوية العلامة التجارية' : '1. Brand Identity'}
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div>
            <label className="block font-semibold mb-1">{isRTL ? 'اسم المتجر / العلامة التجارية' : 'Store / Brand Name'}</label>
            <input
              type="text"
              value={theme.brandName}
              onChange={(e) => updateTheme({ brandName: e.target.value })}
              className="w-full px-3 py-2 rounded-xl border bg-stone-50 dark:bg-stone-900 outline-hidden"
            />
          </div>

          <div>
            <label className="block font-semibold mb-1">{isRTL ? 'الشعار اللفظي' : 'Tagline / Motto'}</label>
            <input
              type="text"
              value={theme.tagline}
              onChange={(e) => updateTheme({ tagline: e.target.value })}
              className="w-full px-3 py-2 rounded-xl border bg-stone-50 dark:bg-stone-900 outline-hidden"
            />
          </div>
        </div>
      </div>

      {/* Color Palette */}
      <div className="p-6 rounded-3xl bg-white dark:bg-[#1A1815] border border-[#E2DBD0] dark:border-[#2D2A26] shadow-xs space-y-4">
        <h3 className="font-bold text-sm uppercase tracking-wider text-stone-400 border-b pb-2">
          {isRTL ? '٢. نظام الألوان' : '2. Color System'}
        </h3>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
          <div>
            <label className="block font-semibold mb-1.5 text-stone-600 dark:text-stone-300">{isRTL ? 'اللون الأساسي' : 'Primary Color'}</label>
            <div className="flex items-center gap-2 p-2 rounded-xl border bg-stone-50 dark:bg-stone-900">
              <input
                type="color"
                value={theme.colors.primary}
                onChange={(e) => updateTheme({ colors: { ...theme.colors, primary: e.target.value } })}
                className="w-7 h-7 rounded-lg cursor-pointer border-none"
              />
              <span dir="ltr" className="font-mono text-xs">{theme.colors.primary}</span>
            </div>
          </div>

          <div>
            <label className="block font-semibold mb-1.5 text-stone-600 dark:text-stone-300">{isRTL ? 'اللون المميز' : 'Accent Gold/Sand'}</label>
            <div className="flex items-center gap-2 p-2 rounded-xl border bg-stone-50 dark:bg-stone-900">
              <input
                type="color"
                value={theme.colors.accent}
                onChange={(e) => updateTheme({ colors: { ...theme.colors, accent: e.target.value } })}
                className="w-7 h-7 rounded-lg cursor-pointer border-none"
              />
              <span dir="ltr" className="font-mono text-xs">{theme.colors.accent}</span>
            </div>
          </div>

          <div>
            <label className="block font-semibold mb-1.5 text-stone-600 dark:text-stone-300">{isRTL ? 'لون الخلفية' : 'Background'}</label>
            <div className="flex items-center gap-2 p-2 rounded-xl border bg-stone-50 dark:bg-stone-900">
              <input
                type="color"
                value={theme.colors.background}
                onChange={(e) => updateTheme({ colors: { ...theme.colors, background: e.target.value } })}
                className="w-7 h-7 rounded-lg cursor-pointer border-none"
              />
              <span dir="ltr" className="font-mono text-xs">{theme.colors.background}</span>
            </div>
          </div>

          <div>
            <label className="block font-semibold mb-1.5 text-stone-600 dark:text-stone-300">{isRTL ? 'اللون الثانوي' : 'Secondary'}</label>
            <div className="flex items-center gap-2 p-2 rounded-xl border bg-stone-50 dark:bg-stone-900">
              <input
                type="color"
                value={theme.colors.secondary}
                onChange={(e) => updateTheme({ colors: { ...theme.colors, secondary: e.target.value } })}
                className="w-7 h-7 rounded-lg cursor-pointer border-none"
              />
              <span dir="ltr" className="font-mono text-xs">{theme.colors.secondary}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Typography & Layout */}
      <div className="p-6 rounded-3xl bg-white dark:bg-[#1A1815] border border-[#E2DBD0] dark:border-[#2D2A26] shadow-xs space-y-4">
        <h3 className="font-bold text-sm uppercase tracking-wider text-stone-400 border-b pb-2">
          {isRTL ? '٣. الخطوط وهيكلة العرض' : '3. Typography & Architecture'}
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div>
            <label className="block font-semibold mb-1">{isRTL ? 'خط العناوين' : 'Heading Typography'}</label>
            <select
              value={theme.typography.headingFont}
              onChange={(e) => updateTheme({ typography: { ...theme.typography, headingFont: e.target.value as any } })}
              className="w-full px-3 py-2 rounded-xl border bg-stone-50 dark:bg-stone-900 outline-hidden"
            >
              <option value="Playfair Display">Playfair Display (Haute Luxury Serif)</option>
              <option value="Plus Jakarta Sans">Plus Jakarta Sans (Modern Editorial)</option>
              <option value="Inter">Inter (Swiss Minimalist)</option>
              <option value="Alexandria">Alexandria (Arabic Contemporary)</option>
            </select>
          </div>

          <div>
            <label className="block font-semibold mb-1">{isRTL ? 'أقصى عرض للحاوية' : 'Max Container Width'}</label>
            <select
              value={theme.layout.containerMaxWidth}
              onChange={(e) => updateTheme({ layout: { ...theme.layout, containerMaxWidth: e.target.value as any } })}
              className="w-full px-3 py-2 rounded-xl border bg-stone-50 dark:bg-stone-900 outline-hidden font-mono"
            >
              <option value="1200px">1200px ({isRTL ? 'مضغوط' : 'Compact Atelier'})</option>
              <option value="1320px">1320px ({isRTL ? 'قياسي فاخر' : 'Luxury Standard'})</option>
              <option value="1440px">1440px ({isRTL ? 'عريض سينمائي' : 'Wide Cinematic'})</option>
              <option value="full">100% ({isRTL ? 'كامل العرض' : 'Full-Bleed'})</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};
