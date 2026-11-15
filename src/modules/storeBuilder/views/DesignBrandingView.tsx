import React from 'react';
import { useStoreBuilder } from '../context/StoreBuilderContext';
import { Palette, Type, Layout, Sparkles, Check } from 'lucide-react';

export const DesignBrandingView: React.FC = () => {
  const { store, updateTheme } = useStoreBuilder();
  const { theme } = store;

  return (
    <div className="space-y-8 text-start max-w-4xl mx-auto p-4 sm:p-8 md:p-10">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-[#1E1E1E] dark:text-white">
          Design & Branding
        </h1>
        <p className="text-xs text-stone-500 mt-1">
          Customize your furniture store's visual identity, palette, typography, and container metrics.
        </p>
      </div>

      {/* Brand Identity */}
      <div className="p-6 rounded-3xl bg-white dark:bg-[#1A1815] border border-[#E2DBD0] dark:border-[#2D2A26] shadow-xs space-y-4">
        <h3 className="font-bold text-sm uppercase tracking-wider text-stone-400 border-b pb-2">
          1. Brand Identity
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div>
            <label className="block font-semibold mb-1">Store / Brand Name</label>
            <input
              type="text"
              value={theme.brandName}
              onChange={(e) => updateTheme({ brandName: e.target.value })}
              className="w-full px-3 py-2 rounded-xl border bg-stone-50 dark:bg-stone-900 outline-hidden"
            />
          </div>

          <div>
            <label className="block font-semibold mb-1">Tagline / Motto</label>
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
          2. Color System
        </h3>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
          <div>
            <label className="block font-semibold mb-1.5 text-stone-600 dark:text-stone-300">Primary Color</label>
            <div className="flex items-center gap-2 p-2 rounded-xl border bg-stone-50 dark:bg-stone-900">
              <input
                type="color"
                value={theme.colors.primary}
                onChange={(e) => updateTheme({ colors: { ...theme.colors, primary: e.target.value } })}
                className="w-7 h-7 rounded-lg cursor-pointer border-none"
              />
              <span className="font-mono text-xs">{theme.colors.primary}</span>
            </div>
          </div>

          <div>
            <label className="block font-semibold mb-1.5 text-stone-600 dark:text-stone-300">Accent Gold/Sand</label>
            <div className="flex items-center gap-2 p-2 rounded-xl border bg-stone-50 dark:bg-stone-900">
              <input
                type="color"
                value={theme.colors.accent}
                onChange={(e) => updateTheme({ colors: { ...theme.colors, accent: e.target.value } })}
                className="w-7 h-7 rounded-lg cursor-pointer border-none"
              />
              <span className="font-mono text-xs">{theme.colors.accent}</span>
            </div>
          </div>

          <div>
            <label className="block font-semibold mb-1.5 text-stone-600 dark:text-stone-300">Background</label>
            <div className="flex items-center gap-2 p-2 rounded-xl border bg-stone-50 dark:bg-stone-900">
              <input
                type="color"
                value={theme.colors.background}
                onChange={(e) => updateTheme({ colors: { ...theme.colors, background: e.target.value } })}
                className="w-7 h-7 rounded-lg cursor-pointer border-none"
              />
              <span className="font-mono text-xs">{theme.colors.background}</span>
            </div>
          </div>

          <div>
            <label className="block font-semibold mb-1.5 text-stone-600 dark:text-stone-300">Secondary</label>
            <div className="flex items-center gap-2 p-2 rounded-xl border bg-stone-50 dark:bg-stone-900">
              <input
                type="color"
                value={theme.colors.secondary}
                onChange={(e) => updateTheme({ colors: { ...theme.colors, secondary: e.target.value } })}
                className="w-7 h-7 rounded-lg cursor-pointer border-none"
              />
              <span className="font-mono text-xs">{theme.colors.secondary}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Typography & Layout */}
      <div className="p-6 rounded-3xl bg-white dark:bg-[#1A1815] border border-[#E2DBD0] dark:border-[#2D2A26] shadow-xs space-y-4">
        <h3 className="font-bold text-sm uppercase tracking-wider text-stone-400 border-b pb-2">
          3. Typography & Architecture
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div>
            <label className="block font-semibold mb-1">Heading Typography</label>
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
            <label className="block font-semibold mb-1">Max Container Width</label>
            <select
              value={theme.layout.containerMaxWidth}
              onChange={(e) => updateTheme({ layout: { ...theme.layout, containerMaxWidth: e.target.value as any } })}
              className="w-full px-3 py-2 rounded-xl border bg-stone-50 dark:bg-stone-900 outline-hidden font-mono"
            >
              <option value="1200px">1200px (Compact Atelier)</option>
              <option value="1320px">1320px (Luxury Standard)</option>
              <option value="1440px">1440px (Wide Cinematic)</option>
              <option value="full">100% Full-Bleed</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};

