import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useStoreBuilder } from '../context/StoreBuilderContext';
import { useLanguage } from '../../../context/LanguageContext';
import { FileText, Home, Plus, Copy, Trash2, Sliders } from 'lucide-react';

export const PagesManagementView: React.FC = () => {
  const {
    store,
    createPage,
    deletePage,
    duplicatePage,
    setHomePage,
    setActivePageId,
    updatePageMeta,
  } = useStoreBuilder();
  const { isRTL } = useLanguage();
  const navigate = useNavigate();

  const [newPageTitle, setNewPageTitle] = useState('');
  const [newPageSlug, setNewPageSlug] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingPageId, setEditingPageId] = useState<string | null>(null);
  const [editTitle, setEditTitle] = useState('');
  const [editSlug, setEditSlug] = useState('');
  const [editSeoTitle, setEditSeoTitle] = useState('');
  const [editSeoDesc, setEditSeoDesc] = useState('');

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (newPageTitle.trim()) {
      createPage(newPageTitle.trim(), newPageSlug.trim() || undefined);
      setNewPageTitle('');
      setNewPageSlug('');
      setShowAddModal(false);
    }
  };

  const startEdit = (p: (typeof store.pages)[0]) => {
    setEditingPageId(p.id);
    setEditTitle(p.title);
    setEditSlug(p.slug);
    setEditSeoTitle(p.seoTitle || '');
    setEditSeoDesc(p.seoDescription || '');
  };

  const saveEdit = () => {
    if (editingPageId) {
      updatePageMeta(editingPageId, {
        title: editTitle,
        slug: editSlug,
        seoTitle: editSeoTitle,
        seoDescription: editSeoDesc,
      });
      setEditingPageId(null);
    }
  };

  return (
    <div className="space-y-6 text-start max-w-6xl mx-auto p-4 sm:p-8 md:p-10">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#E2DBD0] dark:border-[#2D2A26]">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-[#1E1E1E] dark:text-white">
            {isRTL ? 'الصفحات والتنقل' : 'Pages & Navigation'}
          </h1>
          <p className="text-xs text-stone-500 mt-1">
            {isRTL
              ? 'إدارة صفحات متجرك وعناوين محركات البحث (SEO) والروابط.'
              : "Manage your store's multi-page architecture, SEO titles, and layout structure."}
          </p>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="px-5 py-2.5 rounded-full bg-[#1E1E1E] text-white text-xs font-bold uppercase tracking-wider flex items-center gap-2 hover:bg-stone-800 transition shadow-xs cursor-pointer w-fit"
        >
          <Plus className="w-4 h-4" />
          <span>{isRTL ? 'إنشاء صفحة جديدة' : 'Create New Page'}</span>
        </button>
      </div>

      {/* Pages Table */}
      <div className="rounded-3xl border border-[#E2DBD0] dark:border-[#2D2A26] bg-white dark:bg-[#1A1815] shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-start text-xs">
            <thead className="bg-[#FAF8F5] dark:bg-[#151311] border-b border-[#E2DBD0] dark:border-[#2D2A26] text-stone-500 uppercase text-[10px] tracking-wider">
              <tr>
                <th className="py-3 px-4">{isRTL ? 'عنوان الصفحة' : 'Page Title'}</th>
                <th className="py-3 px-4">{isRTL ? 'الرابط (Slug)' : 'URL Slug'}</th>
                <th className="py-3 px-4">{isRTL ? 'الأقسام' : 'Sections'}</th>
                <th className="py-3 px-4">{isRTL ? 'الدور' : 'Role'}</th>
                <th className="py-3 px-4 text-end">{isRTL ? 'إجراءات' : 'Actions'}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100 dark:divide-stone-800">
              {store.pages.map((page) => (
                <tr key={page.id} className="hover:bg-stone-50/50 dark:hover:bg-stone-900/50 transition">
                  <td className="py-3.5 px-4 font-bold text-[#1E1E1E] dark:text-white">
                    <div className="flex items-center gap-2">
                      {page.isHome ? (
                        <Home className="w-4 h-4 text-amber-600 shrink-0" />
                      ) : (
                        <FileText className="w-4 h-4 text-stone-400 shrink-0" />
                      )}
                      <span>{page.title}</span>
                    </div>
                  </td>

                  <td dir="ltr" className="py-3.5 px-4 font-mono text-stone-500 text-start">
                    /{page.slug}
                  </td>

                  <td className="py-3.5 px-4">
                    <span className="px-2 py-0.5 rounded bg-stone-100 dark:bg-stone-800 text-[10px] font-mono">
                      {page.sections.length} {isRTL ? 'أقسام' : 'sections'}
                    </span>
                  </td>

                  <td className="py-3.5 px-4">
                    {page.isHome ? (
                      <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 font-bold text-[10px] uppercase">
                        {isRTL ? 'الرئيسية' : 'Homepage'}
                      </span>
                    ) : (
                      <button
                        onClick={() => setHomePage(page.id)}
                        className="text-[10px] text-stone-400 hover:text-stone-700 underline cursor-pointer"
                      >
                        {isRTL ? 'تعيين كرئيسية' : 'Set as Home'}
                      </button>
                    )}
                  </td>

                  <td className="py-3.5 px-4 text-end">
                    <div className="flex items-center justify-end gap-1.5">
                      <button
                        onClick={() => {
                          setActivePageId(page.id);
                          navigate('/my-store/builder');
                        }}
                        className="px-3 py-1 rounded-lg bg-stone-100 dark:bg-stone-800 hover:bg-stone-200 text-stone-700 dark:text-stone-200 font-bold text-[11px] cursor-pointer"
                      >
                        {isRTL ? 'تعديل في المحرر' : 'Edit in Builder'}
                      </button>

                      <button
                        onClick={() => startEdit(page)}
                        className="p-1.5 text-stone-400 hover:text-stone-700 rounded cursor-pointer"
                        title={isRTL ? 'إعدادات SEO' : 'SEO Settings'}
                      >
                        <Sliders className="w-3.5 h-3.5" />
                      </button>

                      <button
                        onClick={() => duplicatePage(page.id)}
                        className="p-1.5 text-stone-400 hover:text-stone-700 rounded cursor-pointer"
                        title={isRTL ? 'نسخ' : 'Duplicate'}
                      >
                        <Copy className="w-3.5 h-3.5" />
                      </button>

                      {!page.isHome && store.pages.length > 1 && (
                        <button
                          onClick={() => deletePage(page.id)}
                          className="p-1.5 text-stone-400 hover:text-red-500 rounded cursor-pointer"
                          title={isRTL ? 'حذف' : 'Delete'}
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Page Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
          <form
            onSubmit={handleCreate}
            className="w-full max-w-md bg-white dark:bg-[#1A1815] rounded-3xl p-6 shadow-2xl border space-y-4 text-start"
          >
            <h3 className="font-bold text-base">{isRTL ? 'إنشاء صفحة متجر جديدة' : 'Create New Store Page'}</h3>
            <div>
              <label className="block text-xs font-semibold mb-1">{isRTL ? 'عنوان الصفحة *' : 'Page Title *'}</label>
              <input
                type="text"
                required
                value={newPageTitle}
                onChange={(e) => setNewPageTitle(e.target.value)}
                placeholder={isRTL ? 'مثال: صالة المعيشة' : 'e.g. Living Room Lookbook'}
                className="w-full px-3 py-2 rounded-xl border text-xs bg-stone-50 dark:bg-stone-900 outline-hidden"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold mb-1">{isRTL ? 'الرابط المختصر (اختياري)' : 'URL Slug (Optional)'}</label>
              <input
                type="text"
                value={newPageSlug}
                onChange={(e) => setNewPageSlug(e.target.value)}
                placeholder="lookbook"
                className="w-full px-3 py-2 rounded-xl border text-xs bg-stone-50 dark:bg-stone-900 outline-hidden"
              />
            </div>
            <div className="flex justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setShowAddModal(false)}
                className="px-4 py-2 rounded-xl text-xs text-stone-500"
              >
                {isRTL ? 'إلغاء' : 'Cancel'}
              </button>
              <button type="submit" className="px-5 py-2 rounded-xl bg-[#1E1E1E] text-white text-xs font-bold">
                {isRTL ? 'إنشاء الصفحة' : 'Create Page'}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* SEO & Meta Editor Modal */}
      {editingPageId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
          <div className="w-full max-w-lg bg-white dark:bg-[#1A1815] rounded-3xl p-6 shadow-2xl border space-y-4 text-start">
            <h3 className="font-bold text-base">{isRTL ? 'إعدادات الصفحة و SEO' : 'Page Settings & SEO Metadata'}</h3>

            <div className="space-y-3 text-xs">
              <div>
                <label className="block font-semibold mb-1">{isRTL ? 'عنوان الصفحة' : 'Page Title'}</label>
                <input
                  type="text"
                  value={editTitle}
                  onChange={(e) => setEditTitle(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border bg-stone-50 dark:bg-stone-900 outline-hidden"
                />
              </div>

              <div>
                <label className="block font-semibold mb-1">{isRTL ? 'الرابط (Slug)' : 'URL Slug'}</label>
                <input
                  type="text"
                  value={editSlug}
                  onChange={(e) => setEditSlug(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border bg-stone-50 dark:bg-stone-900 outline-hidden font-mono"
                />
              </div>

              <div>
                <label className="block font-semibold mb-1">{isRTL ? 'عنوان SEO لمحركات البحث' : 'SEO Meta Title'}</label>
                <input
                  type="text"
                  value={editSeoTitle}
                  onChange={(e) => setEditSeoTitle(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border bg-stone-50 dark:bg-stone-900 outline-hidden"
                />
              </div>

              <div>
                <label className="block font-semibold mb-1">{isRTL ? 'وصف SEO' : 'SEO Description'}</label>
                <textarea
                  rows={3}
                  value={editSeoDesc}
                  onChange={(e) => setEditSeoDesc(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border bg-stone-50 dark:bg-stone-900 outline-hidden"
                />
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-2 border-t">
              <button onClick={() => setEditingPageId(null)} className="px-4 py-2 rounded-xl text-xs text-stone-500">
                {isRTL ? 'إلغاء' : 'Cancel'}
              </button>
              <button onClick={saveEdit} className="px-5 py-2 rounded-xl bg-[#1E1E1E] text-white text-xs font-bold">
                {isRTL ? 'حفظ التغييرات' : 'Save Changes'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
