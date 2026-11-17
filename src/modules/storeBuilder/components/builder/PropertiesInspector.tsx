import React from 'react';
import { useStoreBuilder } from '../../context/StoreBuilderContext';
import { useLanguage } from '../../../../context/LanguageContext';
import { Sliders, Trash2, Copy, Eye, EyeOff, X } from 'lucide-react';

interface PropertiesInspectorProps {
  onClose?: () => void;
}

export const PropertiesInspector: React.FC<PropertiesInspectorProps> = ({ onClose }) => {
  const {
    selectedSection,
    setSelectedSectionId,
    updateSection,
    deleteSection,
    duplicateSection,
    toggleSectionVisibility,
  } = useStoreBuilder();
  const { isRTL } = useLanguage();

  if (!selectedSection) {
    return (
        <aside className="w-full lg:w-80 h-full border-s border-[#E2DBD0] dark:border-[#2D2A26] bg-[#F6F3EE] dark:bg-[#161412] p-5 flex flex-col items-center justify-center text-center select-none relative">
          {onClose && (
            <button
              onClick={onClose}
              className="absolute top-3 end-3 p-1 rounded-lg hover:bg-stone-200 dark:hover:bg-stone-800 text-stone-500 hover:text-stone-900 transition flex items-center gap-1 text-[11px] font-semibold cursor-pointer"
            >
              <span className="text-[10px]">{isRTL ? 'إغلاق' : 'Close'}</span>
              <X className="w-4 h-4" />
            </button>
          )}
          <div className="w-12 h-12 rounded-2xl bg-stone-200/80 dark:bg-stone-800 flex items-center justify-center text-stone-400 mb-3">
            <Sliders className="w-6 h-6" />
          </div>
          <h4 className="font-bold text-xs uppercase tracking-wider text-stone-700 dark:text-stone-300">
            {isRTL ? 'لم يتم تحديد قسم' : 'No Section Selected'}
          </h4>
          <p className="text-[11px] text-stone-400 max-w-xs mt-1 leading-relaxed">
            {isRTL
              ? 'اضغط على أي قسم مباشرة داخل المحرر لتعديل النصوص والصور والألوان والتخطيط.'
              : 'Click any section directly on the live canvas to inspect and edit its content, images, colors, and layout.'}
          </p>
        </aside>
        );
  }

        const {content, design} = selectedSection;

        return (
          <aside className="w-full lg:w-80 h-full border-s border-[#E2DBD0] dark:border-[#2D2A26] bg-[#F6F3EE] dark:bg-[#161412] flex flex-col shrink-0 select-none overflow-hidden transition-colors">
            {/* Top Header */}
            <div className="p-3.5 border-b border-[#E2DBD0] dark:border-[#2D2A26] flex items-center justify-between bg-white dark:bg-[#1A1815]">
              <div className="text-start truncate">
                <span className="text-[9px] font-mono uppercase font-bold text-amber-600 dark:text-amber-400 block">
                  {selectedSection.type} {isRTL ? 'قسم' : 'section'}
                </span>
                <h3 className="font-bold text-xs text-[#1E1E1E] dark:text-white truncate">
                  {selectedSection.name}
                </h3>
              </div>

              <button
                onClick={() => {
                  setSelectedSectionId(null);
                  if (onClose) onClose();
                }}
                className="p-1 rounded-lg hover:bg-stone-100 dark:hover:bg-stone-800 text-stone-500 hover:text-stone-900 flex items-center gap-1 text-[11px] font-semibold cursor-pointer"
                title={isRTL ? 'إغلاق المفتش' : 'Close Inspector'}
              >
                <span className="text-[10px]">{isRTL ? 'إغلاق' : 'Close'}</span>
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Editable Fields Form */}
            <div className="flex-1 overflow-y-auto p-4 space-y-5 text-start">
              <div className="space-y-3.5">
                <span className="text-[10px] font-mono uppercase tracking-wider font-bold text-stone-400 block border-b pb-1">
                  {isRTL ? 'المحتوى والنصوص' : 'Content & Copy'}
                </span>

                <div>
                  <label className="block text-[11px] font-semibold mb-1">{isRTL ? 'العنوان الفرعي الصغير (Tag)' : 'Eyebrow / Tag'}</label>
                  <input
                    type="text"
                    value={content.tag || ''}
                    onChange={(e) => updateSection(selectedSection.id, { content: { ...content, tag: e.target.value } })}
                    placeholder="e.g. 2026 SIGNATURE LINE"
                    className="w-full px-3 py-1.5 rounded-xl border text-xs bg-white dark:bg-stone-900 border-[#E2DBD0] dark:border-[#2D2A26] outline-hidden focus:ring-1 focus:ring-amber-500"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-semibold mb-1">{isRTL ? 'العنوان الرئيسي' : 'Heading Title'}</label>
                  <textarea
                    rows={2}
                    value={content.title || ''}
                    onChange={(e) => updateSection(selectedSection.id, { content: { ...content, title: e.target.value } })}
                    className="w-full px-3 py-1.5 rounded-xl border text-xs bg-white dark:bg-stone-900 border-[#E2DBD0] dark:border-[#2D2A26] outline-hidden focus:ring-1 focus:ring-amber-500"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-semibold mb-1">{isRTL ? 'الوصف / النص التفصيلي' : 'Subtitle / Body Text'}</label>
                  <textarea
                    rows={3}
                    value={content.subtitle || content.description || ''}
                    onChange={(e) => {
                      const val = e.target.value;
                      updateSection(selectedSection.id, {
                        content: { ...content, subtitle: val, description: val },
                      });
                    }}
                    className="w-full px-3 py-1.5 rounded-xl border text-xs bg-white dark:bg-stone-900 border-[#E2DBD0] dark:border-[#2D2A26] outline-hidden focus:ring-1 focus:ring-amber-500"
                  />
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-[10px] font-semibold mb-1">{isRTL ? 'نص الزر' : 'Button Label'}</label>
                    <input
                      type="text"
                      value={content.primaryButtonText || ''}
                      onChange={(e) => updateSection(selectedSection.id, { content: { ...content, primaryButtonText: e.target.value } })}
                      className="w-full px-2.5 py-1.5 rounded-xl border text-xs bg-white dark:bg-stone-900 border-[#E2DBD0] dark:border-[#2D2A26] outline-hidden"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-semibold mb-1">{isRTL ? 'رابط الوجهة' : 'Target Link'}</label>
                    <input
                      dir="ltr"
                      type="text"
                      value={content.primaryButtonLink || ''}
                      onChange={(e) => updateSection(selectedSection.id, { content: { ...content, primaryButtonLink: e.target.value } })}
                      className="w-full px-2.5 py-1.5 rounded-xl border text-xs bg-white dark:bg-stone-900 border-[#E2DBD0] dark:border-[#2D2A26] outline-hidden"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-semibold mb-1">{isRTL ? 'رابط الصورة' : 'Hero / Feature Image URL'}</label>
                  <input
                    dir="ltr"
                    type="url"
                    value={content.imageUrl || ''}
                    onChange={(e) => updateSection(selectedSection.id, { content: { ...content, imageUrl: e.target.value } })}
                    placeholder="https://images.unsplash.com/..."
                    className="w-full px-3 py-1.5 rounded-xl border text-[11px] bg-white dark:bg-stone-900 border-[#E2DBD0] dark:border-[#2D2A26] outline-hidden"
                  />

                  <div className="grid grid-cols-3 gap-1.5 mt-2">
                    {[
                      { label: isRTL ? 'معيشة' : 'Living', url: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=85' },
                      { label: isRTL ? 'رخام' : 'Marble', url: 'https://images.unsplash.com/photo-1533090161767-e6ffed986c88?auto=format&fit=crop&w=1200&q=85' },
                      { label: isRTL ? 'طعام' : 'Dining', url: 'https://images.unsplash.com/photo-1617806118233-18e1de247200?auto=format&fit=crop&w=1200&q=85' },
                    ].map((p, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => updateSection(selectedSection.id, { content: { ...content, imageUrl: p.url } })}
                        className="px-2 py-1 rounded bg-stone-200/80 dark:bg-stone-800 text-[10px] font-bold hover:bg-stone-300 transition truncate cursor-pointer"
                      >
                        {p.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* DESIGN & STYLES */}
              <div className="space-y-3.5 pt-3 border-t">
                <span className="text-[10px] font-mono uppercase tracking-wider font-bold text-stone-400 block border-b pb-1">
                  {isRTL ? 'التصميم والمسافات' : 'Design & Spacing'}
                </span>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-[10px] font-semibold mb-1">{isRTL ? 'حشو علوي' : 'Padding Top'}</label>
                    <select
                      value={design.paddingTop || 'lg'}
                      onChange={(e) => updateSection(selectedSection.id, { design: { ...design, paddingTop: e.target.value as any } })}
                      className="w-full px-2 py-1.5 rounded-lg border text-xs bg-white dark:bg-stone-900 border-[#E2DBD0] dark:border-[#2D2A26] outline-hidden"
                    >
                      <option value="none">{isRTL ? 'بدون (0px)' : 'None (0px)'}</option>
                      <option value="sm">{isRTL ? 'صغير (32px)' : 'Small (32px)'}</option>
                      <option value="md">{isRTL ? 'متوسط (56px)' : 'Medium (56px)'}</option>
                      <option value="lg">{isRTL ? 'كبير (80px)' : 'Large (80px)'}</option>
                      <option value="xl">{isRTL ? 'كبير جداً (112px)' : 'Extra Large (112px)'}</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[10px] font-semibold mb-1">{isRTL ? 'حشو سفلي' : 'Padding Bottom'}</label>
                    <select
                      value={design.paddingBottom || 'lg'}
                      onChange={(e) => updateSection(selectedSection.id, { design: { ...design, paddingBottom: e.target.value as any } })}
                      className="w-full px-2 py-1.5 rounded-lg border text-xs bg-white dark:bg-stone-900 border-[#E2DBD0] dark:border-[#2D2A26] outline-hidden"
                    >
                      <option value="none">{isRTL ? 'بدون (0px)' : 'None (0px)'}</option>
                      <option value="sm">{isRTL ? 'صغير (32px)' : 'Small (32px)'}</option>
                      <option value="md">{isRTL ? 'متوسط (56px)' : 'Medium (56px)'}</option>
                      <option value="lg">{isRTL ? 'كبير (80px)' : 'Large (80px)'}</option>
                      <option value="xl">{isRTL ? 'كبير جداً (112px)' : 'Extra Large (112px)'}</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] font-semibold mb-1">{isRTL ? 'تخصيص لون الخلفية' : 'Background Override'}</label>
                  <div className="flex items-center gap-2 border rounded-xl p-1.5 bg-white dark:bg-stone-900">
                    <input
                      type="color"
                      value={design.backgroundColor || '#F6F3EE'}
                      onChange={(e) => updateSection(selectedSection.id, { design: { ...design, backgroundColor: e.target.value } })}
                      className="w-6 h-6 rounded border-none cursor-pointer"
                    />
                    <span dir="ltr" className="text-xs font-mono">{design.backgroundColor || (isRTL ? 'افتراضي' : 'Default Theme')}</span>
                    <button
                      type="button"
                      onClick={() => updateSection(selectedSection.id, { design: { ...design, backgroundColor: undefined } })}
                      className="ms-auto text-[10px] text-stone-400 hover:text-stone-700"
                    >
                      {isRTL ? 'إعادة ضبط' : 'Reset'}
                    </button>
                  </div>
                </div>
              </div>

              {/* Action Controls */}
              <div className="pt-4 border-t space-y-2">
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => toggleSectionVisibility(selectedSection.id)}
                    className="py-2 px-3 rounded-xl border text-xs font-bold transition flex items-center justify-center gap-1.5 hover:bg-stone-100 dark:hover:bg-stone-800 cursor-pointer"
                  >
                    {selectedSection.visible ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
                    <span>{selectedSection.visible ? (isRTL ? 'إخفاء' : 'Hide') : isRTL ? 'إظهار' : 'Show'}</span>
                  </button>

                  <button
                    onClick={() => duplicateSection(selectedSection.id)}
                    className="py-2 px-3 rounded-xl border text-xs font-bold transition flex items-center justify-center gap-1.5 hover:bg-stone-100 dark:hover:bg-stone-800 cursor-pointer"
                  >
                    <Copy className="w-3.5 h-3.5" />
                    <span>{isRTL ? 'تكرار' : 'Duplicate'}</span>
                  </button>
                </div>

                <button
                  onClick={() => deleteSection(selectedSection.id)}
                  className="w-full py-2 px-3 rounded-xl bg-red-50 dark:bg-red-950/40 text-red-600 dark:text-red-400 border border-red-200 dark:border-red-900/50 text-xs font-bold transition flex items-center justify-center gap-1.5 hover:bg-red-100 cursor-pointer"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>{isRTL ? 'حذف القسم' : 'Delete Section'}</span>
                </button>
              </div>
            </div>
          </aside>
          );
};
