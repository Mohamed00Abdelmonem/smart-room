import React from 'react';
import { useStoreBuilder } from '../../context/StoreBuilderContext';
import { StoreRenderer } from '../renderer/StoreRenderer';
import { 
  Monitor, 
  Tablet, 
  Smartphone, 
  Undo2, 
  Redo2, 
  Eye, 
  Globe, 
  Check, 
  Sparkles,
  ChevronDown,
  PanelLeftClose,
  PanelLeftOpen,
  PanelRightClose,
  PanelRightOpen,
  Layers,
  Sliders,
  X
} from 'lucide-react';

interface BuilderCanvasProps {
  showLeftPanel?: boolean;
  onToggleLeftPanel?: () => void;
  showRightPanel?: boolean;
  onToggleRightPanel?: () => void;
  onOpenMobilePanel?: () => void;
  onOpenMobileInspector?: () => void;
}

export const BuilderCanvas: React.FC<BuilderCanvasProps> = ({
  showLeftPanel = true,
  onToggleLeftPanel,
  showRightPanel = true,
  onToggleRightPanel,
  onOpenMobilePanel,
  onOpenMobileInspector,
}) => {
  const {
    store,
    activePage,
    activePageId,
    setActivePageId,
    deviceViewport,
    setDeviceViewport,
    selectedSectionId,
    setSelectedSectionId,
    reorderSections,
    duplicateSection,
    deleteSection,
    toggleSectionVisibility,
    undo,
    redo,
    canUndo,
    canRedo,
    isSaving,
    lastSavedAt,
    publishStore,
    setIsPreviewMode,
  } = useStoreBuilder();

  // Width styling based on device viewport
  const viewportWidth = {
    desktop: 'w-full max-w-full',
    tablet: 'w-[768px] max-w-full',
    mobile: 'w-[375px] max-w-full',
  }[deviceViewport];

  return (
    <div className="flex-1 h-full flex flex-col bg-[#EBE5DC] dark:bg-[#100E0D] overflow-hidden select-none relative">
      {/* =========================================================================
          TOP CONTROL BAR (Viewport, Undo/Redo, Page Selector, Publish)
          ========================================================================= */}
      <div className="h-14 border-b border-[#E2DBD0] dark:border-[#2D2A26] bg-[#F6F3EE] dark:bg-[#161412] px-2 sm:px-4 flex items-center justify-between gap-2 shrink-0 z-20 overflow-x-auto">
        {/* Left: Toggle Panel Button + Active Page Dropdown */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          {/* Toggle Tools Button (Desktop) */}
          {onToggleLeftPanel && (
            <button
              onClick={onToggleLeftPanel}
              className="hidden lg:flex p-1.5 sm:p-2 rounded-xl border border-[#E2DBD0] dark:border-[#2D2A26] bg-white dark:bg-[#1E1C1A] text-stone-700 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800 transition shadow-2xs items-center gap-1.5 text-xs font-bold cursor-pointer"
              title={showLeftPanel ? "Hide Tools & Pages Panel" : "Show Tools & Pages Panel"}
            >
              {showLeftPanel ? <PanelLeftClose className="w-4 h-4 text-amber-600" /> : <PanelLeftOpen className="w-4 h-4 text-stone-500" />}
              <span className="hidden xl:inline text-[11px] font-semibold">{showLeftPanel ? 'Hide Tools' : 'Show Tools'}</span>
            </button>
          )}

          {/* Toggle Tools Button (Mobile/Tablet < 1024px) */}
          {onOpenMobilePanel && (
            <button
              onClick={onOpenMobilePanel}
              className="lg:hidden px-2.5 py-1.5 rounded-xl bg-stone-900 text-white text-xs font-bold flex items-center gap-1.5 shadow-2xs cursor-pointer"
            >
              <Layers className="w-3.5 h-3.5 text-amber-400" />
              <span className="text-[11px]">Tools</span>
            </button>
          )}

          {/* Active Page Select */}
          <div className="relative">
            <select
              value={activePageId}
              onChange={(e) => {
                setActivePageId(e.target.value);
                setSelectedSectionId(null);
              }}
              className="appearance-none pl-2.5 sm:pl-3 pr-7 sm:pr-8 py-1.5 rounded-xl border text-xs font-bold bg-white dark:bg-[#1E1C1A] border-[#E2DBD0] dark:border-[#2D2A26] outline-hidden cursor-pointer max-w-[130px] sm:max-w-[180px] truncate"
            >
              {store.pages.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.title} {p.isHome ? '(Home)' : ''}
                </option>
              ))}
            </select>
            <ChevronDown className="w-3.5 h-3.5 absolute right-2 top-2 text-stone-400 pointer-events-none" />
          </div>

          <div className="hidden 2xl:flex items-center gap-1.5 text-[10px] text-stone-400 font-mono">
            <span className={`w-1.5 h-1.5 rounded-full ${isSaving ? 'bg-amber-500 animate-ping' : 'bg-emerald-500'}`} />
            <span>{isSaving ? 'Saving...' : 'Saved'}</span>
          </div>
        </div>

        {/* Center: Device Viewport Switcher & Undo/Redo */}
        <div className="flex items-center gap-1 bg-[#EAE2D6]/80 dark:bg-[#1E1C1A] p-1 rounded-xl border border-[#E2DBD0] dark:border-[#2D2A26] shrink-0">
          {/* Desktop View */}
          <button
            onClick={() => setDeviceViewport('desktop')}
            className={`p-1.5 rounded-lg text-xs font-bold transition cursor-pointer ${
              deviceViewport === 'desktop'
                ? 'bg-white dark:bg-[#2A2622] text-[#1E1E1E] dark:text-white shadow-xs'
                : 'text-stone-500 hover:text-stone-800'
            }`}
            title="Desktop View (100%)"
          >
            <Monitor className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
          </button>

          {/* Tablet View */}
          <button
            onClick={() => setDeviceViewport('tablet')}
            className={`p-1.5 rounded-lg text-xs font-bold transition cursor-pointer ${
              deviceViewport === 'tablet'
                ? 'bg-white dark:bg-[#2A2622] text-[#1E1E1E] dark:text-white shadow-xs'
                : 'text-stone-500 hover:text-stone-800'
            }`}
            title="Tablet View (768px)"
          >
            <Tablet className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
          </button>

          {/* Mobile View */}
          <button
            onClick={() => setDeviceViewport('mobile')}
            className={`p-1.5 rounded-lg text-xs font-bold transition cursor-pointer ${
              deviceViewport === 'mobile'
                ? 'bg-white dark:bg-[#2A2622] text-[#1E1E1E] dark:text-white shadow-xs'
                : 'text-stone-500 hover:text-stone-800'
            }`}
            title="Mobile View (375px)"
          >
            <Smartphone className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
          </button>

          <span className="w-px h-3.5 bg-stone-300 dark:bg-stone-700 mx-0.5 sm:mx-1" />

          {/* Undo */}
          <button
            disabled={!canUndo}
            onClick={undo}
            className="p-1 sm:p-1.5 rounded-lg text-stone-500 hover:text-stone-800 disabled:opacity-30 cursor-pointer"
            title="Undo"
          >
            <Undo2 className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
          </button>

          {/* Redo */}
          <button
            disabled={!canRedo}
            onClick={redo}
            className="p-1 sm:p-1.5 rounded-lg text-stone-500 hover:text-stone-800 disabled:opacity-30 cursor-pointer"
            title="Redo"
          >
            <Redo2 className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
          </button>
        </div>

        {/* Right: Fullscreen Preview & Publish + Toggle Inspector Button */}
        <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
          {/* Preview Button */}
          <button
            onClick={() => setIsPreviewMode(true)}
            className="px-2.5 sm:px-3 py-1.5 rounded-xl border border-[#E2DBD0] dark:border-[#2D2A26] bg-white dark:bg-[#1E1C1A] hover:bg-stone-50 text-xs font-bold text-stone-700 dark:text-stone-200 flex items-center gap-1 cursor-pointer shadow-xs"
          >
            <Eye className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Preview</span>
          </button>

          {/* Publish Button */}
          <button
            onClick={() => {
              publishStore();
              alert(`Congratulations! Your store is published live at: /store/${store.storeSlug}`);
            }}
            className="px-3 sm:px-4 py-1.5 rounded-xl bg-[#1E1E1E] hover:bg-black text-white text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 cursor-pointer shadow-xs"
          >
            <Globe className="w-3.5 h-3.5 text-emerald-400" />
            <span className="hidden sm:inline">Publish</span>
          </button>

          {/* Toggle Inspector (Desktop) */}
          {onToggleRightPanel && (
            <button
              onClick={onToggleRightPanel}
              className="hidden lg:flex p-2 rounded-xl border border-[#E2DBD0] dark:border-[#2D2A26] bg-white dark:bg-[#1E1C1A] text-stone-700 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800 transition shadow-2xs items-center gap-1.5 text-xs font-bold cursor-pointer"
              title={showRightPanel ? "Hide Properties Inspector" : "Show Properties Inspector"}
            >
              {showRightPanel ? <PanelRightClose className="w-4 h-4 text-amber-600" /> : <PanelRightOpen className="w-4 h-4 text-stone-500" />}
            </button>
          )}
        </div>
      </div>

      {/* =========================================================================
          CANVAS WORKING AREA
          ========================================================================= */}
      <div 
        className="flex-1 overflow-y-auto p-2 sm:p-6 lg:p-8 flex justify-center items-start"
        onClick={() => setSelectedSectionId(null)}
      >
        <div 
          className={`transition-all duration-300 rounded-xl sm:rounded-3xl shadow-2xl overflow-hidden bg-white dark:bg-[#141210] border border-black/10 will-change-transform ${viewportWidth}`}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Simulated Browser Bar if tablet or mobile */}
          {deviceViewport !== 'desktop' && (
            <div className="bg-stone-200 dark:bg-stone-800 px-3 sm:px-4 py-1.5 sm:py-2 border-b flex items-center justify-between text-[10px] font-mono text-stone-500">
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-red-400 inline-block" />
                <span className="w-2 h-2 rounded-full bg-amber-400 inline-block" />
                <span className="w-2 h-2 rounded-full bg-emerald-400 inline-block" />
              </div>
              <span className="truncate max-w-[180px] sm:max-w-none">{store.storeSlug}.vestaai.com/{activePage.slug}</span>
              <span className="text-[9px] uppercase font-bold">{deviceViewport}</span>
            </div>
          )}

          {/* Actual Live Website Rendered From Schema */}
          <StoreRenderer
            page={activePage}
            theme={store.theme}
            products={store.products}
            allPages={store.pages}
            currency={store.currency}
            isBuilderMode={true}
            viewport={deviceViewport}
            selectedSectionId={selectedSectionId}
            onSelectSection={(id) => setSelectedSectionId(id)}
            onMoveUp={(idx) => reorderSections(idx, idx - 1)}
            onMoveDown={(idx) => reorderSections(idx, idx + 1)}
            onDuplicate={(id) => duplicateSection(id)}
            onDelete={(id) => deleteSection(id)}
            onToggleVisibility={(id) => toggleSectionVisibility(id)}
            onNavigatePage={(pageId) => {
              setActivePageId(pageId);
              setSelectedSectionId(null);
            }}
          />
        </div>
      </div>

      {/* Floating Section Inspector Button on Mobile Screens */}
      {selectedSectionId && onOpenMobileInspector && (
        <button
          onClick={onOpenMobileInspector}
          className="lg:hidden fixed bottom-18 sm:bottom-6 right-4 sm:right-6 z-40 px-4 py-2.5 rounded-full bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold shadow-xl flex items-center gap-2 transition animate-bounce cursor-pointer"
        >
          <Sliders className="w-4 h-4" />
          <span>Edit Properties</span>
        </button>
      )}
    </div>
  );
};
