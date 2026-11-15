import React, { useState } from 'react';
import { useStoreBuilder } from '../../context/StoreBuilderContext';
import { SECTION_CATALOG } from '../../data/sectionDefinitions';
import { STORE_TEMPLATES } from '../../data/defaultTemplates';
import { 
  FileText, 
  Layers, 
  Plus, 
  Palette, 
  Sparkles, 
  Trash2, 
  Copy, 
  Home, 
  Eye, 
  EyeOff, 
  Search, 
  Check, 
  ArrowRight,
  Sliders,
  ChevronRight,
  ExternalLink,
  X
} from 'lucide-react';

interface BuilderPanelProps {
  onClose?: () => void;
}

export const BuilderPanel: React.FC<BuilderPanelProps> = ({ onClose }) => {
  const {
    store,
    activePageId,
    setActivePageId,
    sidebarTab,
    setSidebarTab,
    createPage,
    deletePage,
    duplicatePage,
    setHomePage,
    selectedSectionId,
    setSelectedSectionId,
    addSection,
    deleteSection,
    toggleSectionVisibility,
    updateTheme,
    applyTemplate,
    applyAiPrompt,
    isAiGenerating,
  } = useStoreBuilder();

  const [sectionSearch, setSectionSearch] = useState('');
  const [selectedSectionCategory, setSelectedSectionCategory] = useState<string>('all');
  const [newPageTitle, setNewPageTitle] = useState('');
  const [isAddingPage, setIsAddingPage] = useState(false);
  const [aiPromptInput, setAiPromptInput] = useState('');
  const [aiFeedback, setAiFeedback] = useState<string | null>(null);

  const categories = ['all', 'Hero Sections', 'Products', 'Brand & Content', 'Marketing'];

  const filteredCatalog = SECTION_CATALOG.filter((item) => {
    const matchesSearch = item.name.toLowerCase().includes(sectionSearch.toLowerCase()) ||
      item.description.toLowerCase().includes(sectionSearch.toLowerCase());
    const matchesCat = selectedSectionCategory === 'all' || item.category === selectedSectionCategory;
    return matchesSearch && matchesCat;
  });

  const activePage = store.pages.find((p) => p.id === activePageId) || store.pages[0];

  const handleCreatePage = (e: React.FormEvent) => {
    e.preventDefault();
    if (newPageTitle.trim()) {
      createPage(newPageTitle.trim());
      setNewPageTitle('');
      setIsAddingPage(false);
    }
  };

  const handleAiSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!aiPromptInput.trim()) return;

    setAiFeedback(null);
    const res = await applyAiPrompt(aiPromptInput);
    setAiFeedback(res.message);
    setAiPromptInput('');
  };

  return (
    <aside className="w-full lg:w-80 h-full border-r border-[#E2DBD0] dark:border-[#2D2A26] bg-[#F6F3EE] dark:bg-[#161412] flex flex-col shrink-0 select-none transition-colors">
      {/* Panel Header with Hide/Close Action */}
      <div className="px-3.5 py-2.5 border-b border-[#E2DBD0] dark:border-[#2D2A26] flex items-center justify-between bg-white dark:bg-[#1A1815]">
        <div className="flex items-center gap-2">
          <span className="text-[11px] font-bold uppercase tracking-wider text-stone-800 dark:text-stone-200">
            Builder Tools
          </span>
          <span className="text-[9px] px-1.5 py-0.5 rounded-md bg-stone-100 dark:bg-stone-800 text-stone-500 font-mono uppercase">
            {sidebarTab}
          </span>
        </div>
        {onClose && (
          <button
            onClick={onClose}
            className="p-1 rounded-lg hover:bg-stone-100 dark:hover:bg-stone-800 text-stone-500 hover:text-stone-900 transition flex items-center gap-1 text-[11px] font-semibold cursor-pointer"
            title="Hide Tools Panel"
          >
            <span className="text-[10px]">Hide</span>
            <X className="w-3.5 h-3.5" />
          </button>
        )}
      </div>

      {/* Tab Switcher */}
      <div className="p-2 border-b border-[#E2DBD0] dark:border-[#2D2A26] grid grid-cols-5 gap-1 bg-[#EAE2D6]/60 dark:bg-[#1A1815]">
        <button
          onClick={() => setSidebarTab('pages')}
          className={`py-2 rounded-xl text-[10px] uppercase tracking-wider font-bold transition flex flex-col items-center gap-1 cursor-pointer ${
            sidebarTab === 'pages'
              ? 'bg-white dark:bg-[#25211D] text-[#1E1E1E] dark:text-white shadow-xs'
              : 'text-[#6E6A63] hover:text-[#1E1E1E] dark:hover:text-white'
          }`}
          title="Pages & Navigation"
        >
          <FileText className="w-3.5 h-3.5" />
          <span>Pages</span>
        </button>

        <button
          onClick={() => setSidebarTab('sections')}
          className={`py-2 rounded-xl text-[10px] uppercase tracking-wider font-bold transition flex flex-col items-center gap-1 cursor-pointer ${
            sidebarTab === 'sections'
              ? 'bg-white dark:bg-[#25211D] text-[#1E1E1E] dark:text-white shadow-xs'
              : 'text-[#6E6A63] hover:text-[#1E1E1E] dark:hover:text-white'
          }`}
          title="Add Sections Library"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Add</span>
        </button>

        <button
          onClick={() => setSidebarTab('layers')}
          className={`py-2 rounded-xl text-[10px] uppercase tracking-wider font-bold transition flex flex-col items-center gap-1 cursor-pointer ${
            sidebarTab === 'layers'
              ? 'bg-white dark:bg-[#25211D] text-[#1E1E1E] dark:text-white shadow-xs'
              : 'text-[#6E6A63] hover:text-[#1E1E1E] dark:hover:text-white'
          }`}
          title="Page Layers & Hierarchy"
        >
          <Layers className="w-3.5 h-3.5" />
          <span>Layers</span>
        </button>

        <button
          onClick={() => setSidebarTab('styles')}
          className={`py-2 rounded-xl text-[10px] uppercase tracking-wider font-bold transition flex flex-col items-center gap-1 cursor-pointer ${
            sidebarTab === 'styles'
              ? 'bg-white dark:bg-[#25211D] text-[#1E1E1E] dark:text-white shadow-xs'
              : 'text-[#6E6A63] hover:text-[#1E1E1E] dark:hover:text-white'
          }`}
          title="Global Theme & Styles"
        >
          <Palette className="w-3.5 h-3.5" />
          <span>Styles</span>
        </button>

        <button
          onClick={() => setSidebarTab('ai')}
          className={`py-2 rounded-xl text-[10px] uppercase tracking-wider font-bold transition flex flex-col items-center gap-1 cursor-pointer ${
            sidebarTab === 'ai'
              ? 'bg-amber-500 text-white shadow-xs'
              : 'text-amber-700 dark:text-amber-400 hover:text-amber-900'
          }`}
          title="AI Website Assistant"
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>AI</span>
        </button>
      </div>

      {/* Tab Contents */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {/* =========================================================================
            TAB 1: PAGES MANAGER
            ========================================================================= */}
        {sidebarTab === 'pages' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-bold text-xs uppercase tracking-wider text-[#1E1E1E] dark:text-white">Website Pages</h3>
                <p className="text-[10px] text-stone-500">Manage multi-page store navigation</p>
              </div>
              <button
                onClick={() => setIsAddingPage(!isAddingPage)}
                className="p-1.5 rounded-lg bg-stone-900 text-white text-[11px] font-bold flex items-center gap-1 hover:bg-stone-700 cursor-pointer shadow-xs"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>New</span>
              </button>
            </div>

            {/* Create Page Form */}
            {isAddingPage && (
              <form onSubmit={handleCreatePage} className="p-3 rounded-xl bg-white dark:bg-[#1E1C1A] border border-[#E2DBD0] dark:border-[#2D2A26] space-y-2">
                <label className="block text-[11px] font-semibold">Page Title</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Gallery, Bespoke, FAQ"
                  value={newPageTitle}
                  onChange={(e) => setNewPageTitle(e.target.value)}
                  className="w-full px-2.5 py-1.5 rounded-lg border text-xs bg-stone-50 dark:bg-stone-900 outline-hidden focus:ring-1 focus:ring-amber-500"
                />
                <div className="flex justify-end gap-2 pt-1">
                  <button
                    type="button"
                    onClick={() => setIsAddingPage(false)}
                    className="px-2.5 py-1 rounded text-xs text-stone-500 hover:bg-stone-100"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-3 py-1 rounded bg-[#1E1E1E] text-white text-xs font-bold"
                  >
                    Create
                  </button>
                </div>
              </form>
            )}

            {/* Pages List */}
            <div className="space-y-1.5">
              {store.pages.map((page) => {
                const isActive = page.id === activePageId;

                return (
                  <div
                    key={page.id}
                    onClick={() => setActivePageId(page.id)}
                    className={`group flex items-center justify-between p-2.5 rounded-xl border transition cursor-pointer ${
                      isActive
                        ? 'bg-white dark:bg-[#1E1C1A] border-amber-500/80 shadow-xs'
                        : 'bg-white/60 dark:bg-[#181614] border-stone-200/80 dark:border-stone-800 hover:bg-white dark:hover:bg-[#1E1C1A]'
                    }`}
                  >
                    <div className="flex items-center gap-2 min-w-0">
                      {page.isHome ? (
                        <Home className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                      ) : (
                        <FileText className="w-3.5 h-3.5 text-stone-400 shrink-0" />
                      )}
                      <div className="truncate text-start">
                        <span className={`text-xs block leading-tight truncate ${isActive ? 'font-bold' : 'font-medium'}`}>
                          {page.title}
                        </span>
                        <span className="text-[9px] font-mono text-stone-400">/{page.slug}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      {!page.isHome && (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setHomePage(page.id);
                          }}
                          className="p-1 text-stone-400 hover:text-amber-600 rounded"
                          title="Set as Home"
                        >
                          <Home className="w-3 h-3" />
                        </button>
                      )}
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          duplicatePage(page.id);
                        }}
                        className="p-1 text-stone-400 hover:text-stone-700 rounded"
                        title="Duplicate Page"
                      >
                        <Copy className="w-3 h-3" />
                      </button>
                      {!page.isHome && store.pages.length > 1 && (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            deletePage(page.id);
                          }}
                          className="p-1 text-stone-400 hover:text-red-500 rounded"
                          title="Delete Page"
                        >
                          <Trash2 className="w-3 h-3" />
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* =========================================================================
            TAB 2: SECTIONS LIBRARY
            ========================================================================= */}
        {sidebarTab === 'sections' && (
          <div className="space-y-4">
            <div>
              <h3 className="font-bold text-xs uppercase tracking-wider text-[#1E1E1E] dark:text-white">Add Sections</h3>
              <p className="text-[10px] text-stone-500">Insert furniture sections onto "{activePage.title}"</p>
            </div>

            {/* Search Input */}
            <div className="relative">
              <Search className="w-3.5 h-3.5 absolute left-3 top-2.5 text-stone-400" />
              <input
                type="text"
                value={sectionSearch}
                onChange={(e) => setSectionSearch(e.target.value)}
                placeholder="Search sections (Hero, Grid, Reviews)..."
                className="w-full pl-8 pr-3 py-1.5 rounded-xl border text-xs bg-white dark:bg-stone-900 border-[#E2DBD0] dark:border-[#2D2A26] outline-hidden focus:ring-1 focus:ring-amber-500"
              />
            </div>

            {/* Category Ribbon */}
            <div className="flex gap-1 overflow-x-auto pb-1 scrollbar-none">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedSectionCategory(cat)}
                  className={`px-2 py-1 rounded-lg text-[9px] uppercase tracking-wider font-bold whitespace-nowrap cursor-pointer ${
                    selectedSectionCategory === cat
                      ? 'bg-[#1E1E1E] text-white'
                      : 'bg-stone-200/60 dark:bg-stone-800 text-stone-600 dark:text-stone-300'
                  }`}
                >
                  {cat === 'all' ? 'All' : cat.split(' ')[0]}
                </button>
              ))}
            </div>

            {/* Catalog Grid */}
            <div className="space-y-3">
              {filteredCatalog.map((item) => (
                <div
                  key={item.id}
                  onClick={() => addSection(item.id)}
                  className="group rounded-2xl border border-[#E2DBD0] dark:border-[#2D2A26] overflow-hidden bg-white dark:bg-[#1E1C1A] hover:border-amber-500 transition-all cursor-pointer shadow-xs hover:shadow-md"
                >
                  <div className="aspect-[16/9] w-full overflow-hidden bg-stone-100 dark:bg-stone-800 relative">
                    <img
                      src={item.thumbnail}
                      alt={item.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                      <span className="px-3 py-1 rounded-full bg-amber-500 text-white font-bold text-[10px] uppercase tracking-wider flex items-center gap-1 shadow-md">
                        <Plus className="w-3 h-3" />
                        <span>Insert Section</span>
                      </span>
                    </div>
                  </div>
                  <div className="p-2.5 text-start">
                    <div className="flex items-center justify-between">
                      <h4 className="text-xs font-bold truncate group-hover:text-amber-700">{item.name}</h4>
                      <span className="text-[8px] font-mono uppercase bg-stone-100 dark:bg-stone-800 px-1.5 py-0.5 rounded text-stone-500">
                        {item.type}
                      </span>
                    </div>
                    <p className="text-[10px] text-stone-500 line-clamp-1 mt-0.5">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* =========================================================================
            TAB 3: LAYERS & ELEMENT HIERARCHY
            ========================================================================= */}
        {sidebarTab === 'layers' && (
          <div className="space-y-3 text-start">
            <div>
              <h3 className="font-bold text-xs uppercase tracking-wider text-[#1E1E1E] dark:text-white">Page Layers</h3>
              <p className="text-[10px] text-stone-500">{activePage.sections.length} sections on "{activePage.title}"</p>
            </div>

            <div className="space-y-1">
              {activePage.sections.map((sec, idx) => {
                const isSelected = selectedSectionId === sec.id;

                return (
                  <div
                    key={sec.id}
                    onClick={() => setSelectedSectionId(sec.id)}
                    className={`flex items-center justify-between p-2.5 rounded-xl border transition cursor-pointer ${
                      isSelected
                        ? 'bg-amber-50 dark:bg-amber-950/30 border-amber-400 text-amber-950 dark:text-amber-200 font-bold'
                        : 'bg-white dark:bg-[#1A1815] border-stone-200 dark:border-stone-800 hover:bg-stone-50'
                    }`}
                  >
                    <div className="flex items-center gap-2 min-w-0">
                      <span className="text-[9px] font-mono text-stone-400 w-3">{idx + 1}</span>
                      <span className="text-xs truncate">{sec.name}</span>
                    </div>

                    <div className="flex items-center gap-1">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleSectionVisibility(sec.id);
                        }}
                        className="p-1 text-stone-400 hover:text-stone-700"
                      >
                        {sec.visible ? <Eye className="w-3 h-3" /> : <EyeOff className="w-3 h-3 text-amber-500" />}
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          deleteSection(sec.id);
                        }}
                        className="p-1 text-stone-400 hover:text-red-500"
                      >
                        <Trash2 className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* =========================================================================
            TAB 4: GLOBAL DESIGN SYSTEM & STYLES
            ========================================================================= */}
        {sidebarTab === 'styles' && (
          <div className="space-y-4 text-start">
            <div>
              <h3 className="font-bold text-xs uppercase tracking-wider text-[#1E1E1E] dark:text-white">Global Theme</h3>
              <p className="text-[10px] text-stone-500">Colors, typography, and container width</p>
            </div>

            {/* Template Switcher */}
            <div className="p-3 rounded-2xl bg-white dark:bg-[#1A1815] border border-[#E2DBD0] dark:border-[#2D2A26] space-y-2">
              <span className="text-[11px] font-bold block">Apply Store Template</span>
              <div className="grid grid-cols-2 gap-2">
                {STORE_TEMPLATES.map((t) => (
                  <button
                    key={t.id}
                    onClick={() => applyTemplate(t.id)}
                    className="p-2 rounded-xl border text-start hover:border-amber-500 transition cursor-pointer bg-stone-50 dark:bg-stone-900 border-stone-200 dark:border-stone-800"
                  >
                    <span className="font-bold text-[10px] block truncate">{t.name}</span>
                    <span className="text-[8px] text-stone-400 block truncate">{t.category}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Brand Colors */}
            <div className="p-3 rounded-2xl bg-white dark:bg-[#1A1815] border border-[#E2DBD0] dark:border-[#2D2A26] space-y-3">
              <span className="text-[11px] font-bold block">Theme Palette</span>
              
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div>
                  <label className="text-[9px] text-stone-500 uppercase font-bold block mb-1">Primary</label>
                  <div className="flex items-center gap-1.5 border rounded-lg p-1 bg-stone-50 dark:bg-stone-900">
                    <input 
                      type="color" 
                      value={store.theme.colors.primary}
                      onChange={(e) => updateTheme({ colors: { ...store.theme.colors, primary: e.target.value } })}
                      className="w-5 h-5 rounded cursor-pointer border-none"
                    />
                    <span className="text-[9px] font-mono">{store.theme.colors.primary}</span>
                  </div>
                </div>

                <div>
                  <label className="text-[9px] text-stone-500 uppercase font-bold block mb-1">Accent</label>
                  <div className="flex items-center gap-1.5 border rounded-lg p-1 bg-stone-50 dark:bg-stone-900">
                    <input 
                      type="color" 
                      value={store.theme.colors.accent}
                      onChange={(e) => updateTheme({ colors: { ...store.theme.colors, accent: e.target.value } })}
                      className="w-5 h-5 rounded cursor-pointer border-none"
                    />
                    <span className="text-[9px] font-mono">{store.theme.colors.accent}</span>
                  </div>
                </div>

                <div>
                  <label className="text-[9px] text-stone-500 uppercase font-bold block mb-1">Background</label>
                  <div className="flex items-center gap-1.5 border rounded-lg p-1 bg-stone-50 dark:bg-stone-900">
                    <input 
                      type="color" 
                      value={store.theme.colors.background}
                      onChange={(e) => updateTheme({ colors: { ...store.theme.colors, background: e.target.value } })}
                      className="w-5 h-5 rounded cursor-pointer border-none"
                    />
                    <span className="text-[9px] font-mono">{store.theme.colors.background}</span>
                  </div>
                </div>

                <div>
                  <label className="text-[9px] text-stone-500 uppercase font-bold block mb-1">Secondary</label>
                  <div className="flex items-center gap-1.5 border rounded-lg p-1 bg-stone-50 dark:bg-stone-900">
                    <input 
                      type="color" 
                      value={store.theme.colors.secondary}
                      onChange={(e) => updateTheme({ colors: { ...store.theme.colors, secondary: e.target.value } })}
                      className="w-5 h-5 rounded cursor-pointer border-none"
                    />
                    <span className="text-[9px] font-mono">{store.theme.colors.secondary}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Typography */}
            <div className="p-3 rounded-2xl bg-white dark:bg-[#1A1815] border border-[#E2DBD0] dark:border-[#2D2A26] space-y-3">
              <span className="text-[11px] font-bold block">Typography</span>
              <div>
                <label className="text-[10px] text-stone-500 uppercase font-bold block mb-1">Heading Font</label>
                <select
                  value={store.theme.typography.headingFont}
                  onChange={(e) => updateTheme({ typography: { ...store.theme.typography, headingFont: e.target.value as any } })}
                  className="w-full px-2.5 py-1.5 rounded-lg border text-xs bg-stone-50 dark:bg-stone-900 outline-hidden"
                >
                  <option value="Playfair Display">Playfair Display (Haute Luxury Serif)</option>
                  <option value="Plus Jakarta Sans">Plus Jakarta Sans (Modern Editorial)</option>
                  <option value="Inter">Inter (Swiss Minimalist)</option>
                  <option value="Alexandria">Alexandria (Arabic Contemporary)</option>
                </select>
              </div>
            </div>
          </div>
        )}

        {/* =========================================================================
            TAB 5: AI WEBSITE ASSISTANT
            ========================================================================= */}
        {sidebarTab === 'ai' && (
          <div className="space-y-4 text-start">
            <div className="flex items-center gap-2 text-amber-600 dark:text-amber-400">
              <Sparkles className="w-4 h-4" />
              <h3 className="font-bold text-xs uppercase tracking-wider">AI Website Assistant</h3>
            </div>
            <p className="text-[11px] text-stone-500 leading-relaxed">
              Describe your desired look in natural language. VESTA AI will adjust color themes, typography, or content.
            </p>

            <form onSubmit={handleAiSubmit} className="space-y-3">
              <textarea
                rows={3}
                required
                value={aiPromptInput}
                onChange={(e) => setAiPromptInput(e.target.value)}
                placeholder="e.g. 'Make this homepage feel like a luxury Italian penthouse with warm beige and dark marble.'"
                className="w-full p-3 rounded-xl border text-xs bg-white dark:bg-stone-900 border-[#E2DBD0] dark:border-[#2D2A26] outline-hidden focus:ring-1 focus:ring-amber-500"
              />

              <button
                type="submit"
                disabled={isAiGenerating}
                className="w-full py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-bold text-xs uppercase tracking-wider transition flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 shadow-xs"
              >
                {isAiGenerating ? (
                  <>
                    <Sparkles className="w-3.5 h-3.5 animate-spin" />
                    <span>Applying Changes...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Apply With AI</span>
                  </>
                )}
              </button>
            </form>

            {aiFeedback && (
              <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-800 dark:text-emerald-300 text-xs">
                {aiFeedback}
              </div>
            )}

            {/* Quick Inspiration Pills */}
            <div className="space-y-1.5 pt-2 border-t text-[10px]">
              <span className="font-bold text-stone-400 uppercase tracking-wider block">Prompt Ideas:</span>
              <button
                onClick={() => setAiPromptInput('Make this feel like a warm alabaster luxury atelier with beige and gold')}
                className="w-full text-start p-1.5 rounded-lg bg-stone-100 dark:bg-stone-800 hover:bg-stone-200 transition truncate cursor-pointer text-stone-600 dark:text-stone-300"
              >
                • Warm alabaster luxury atelier
              </button>
              <button
                onClick={() => setAiPromptInput('Transform to Scandinavian organic minimalism with smoked oak and calm lines')}
                className="w-full text-start p-1.5 rounded-lg bg-stone-100 dark:bg-stone-800 hover:bg-stone-200 transition truncate cursor-pointer text-stone-600 dark:text-stone-300"
              >
                • Scandinavian organic minimalism
              </button>
            </div>
          </div>
        )}
      </div>
    </aside>
  );
};

