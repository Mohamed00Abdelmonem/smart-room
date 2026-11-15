import React, { useState, useEffect } from 'react';
import { useStoreBuilder } from '../context/StoreBuilderContext';
import { BuilderPanel } from '../components/builder/BuilderPanel';
import { BuilderCanvas } from '../components/builder/BuilderCanvas';
import { PropertiesInspector } from '../components/builder/PropertiesInspector';
import { StoreRenderer } from '../components/renderer/StoreRenderer';
import { 
  X, 
  Globe, 
  Eye, 
  Layout, 
  Layers, 
  Sliders 
} from 'lucide-react';

export const WebsiteBuilderView: React.FC = () => {
  const { 
    isPreviewMode, 
    setIsPreviewMode, 
    store, 
    activePage, 
    setActivePageId, 
    publishStore,
    selectedSectionId 
  } = useStoreBuilder();

  // Mobile/Tablet sub-panel switcher: 'canvas' | 'panel' | 'inspector'
  const [mobileActiveView, setMobileActiveView] = useState<'canvas' | 'panel' | 'inspector'>('canvas');

  // Desktop panel collapse toggles
  const [showLeftPanel, setShowLeftPanel] = useState(true);
  const [showRightPanel, setShowRightPanel] = useState(true);

  // If in Fullscreen Preview Mode: render clean uninterrupted store with floating exit bar
  if (isPreviewMode) {
    return (
      <div className="fixed inset-0 z-50 overflow-y-auto bg-white dark:bg-[#121110]">
        {/* Floating Top Exit Control */}
        <div className="sticky top-4 z-50 flex items-center justify-between px-6 py-2.5 max-w-xl mx-auto rounded-full bg-black/85 text-white backdrop-blur-md shadow-2xl border border-white/20">
          <div className="flex items-center gap-2 text-xs">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="font-bold">Live Store Preview</span>
            <span className="text-[10px] text-white/60 font-mono">({activePage.title})</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                publishStore();
                alert(`Store published successfully to /store/${store.storeSlug}`);
              }}
              className="px-3 py-1 rounded-full bg-amber-500 hover:bg-amber-600 text-white text-[11px] font-bold uppercase tracking-wider flex items-center gap-1 cursor-pointer"
            >
              <Globe className="w-3 h-3" />
              <span>Publish</span>
            </button>

            <button
              onClick={() => setIsPreviewMode(false)}
              className="p-1 rounded-full hover:bg-white/20 text-white cursor-pointer"
              title="Close Preview and Return to Editor"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Full-width clean store renderer */}
        <StoreRenderer
          page={activePage}
          theme={store.theme}
          products={store.products}
          allPages={store.pages}
          currency={store.currency}
          isBuilderMode={false}
          onNavigatePage={(pageId) => setActivePageId(pageId)}
        />
      </div>
    );
  }

  return (
    <div className="w-full h-[calc(100vh-64px)] flex flex-col lg:flex-row overflow-hidden relative">
      {/* =========================================================================
          1. LEFT BUILDER PANEL (Pages, Sections, Layers, Styles, AI)
          ========================================================================= */}
      {/* Desktop docked panel */}
      <div className={`hidden lg:block h-full transition-all duration-200 ${showLeftPanel ? 'w-80 shrink-0' : 'w-0 overflow-hidden'}`}>
        <BuilderPanel onClose={() => setShowLeftPanel(false)} />
      </div>

      {/* Mobile/Tablet drawer modal (< 1024px) */}
      {mobileActiveView === 'panel' && (
        <div className="lg:hidden fixed inset-0 top-16 z-50 bg-[#F6F3EE] dark:bg-[#161412] flex flex-col animate-fadeIn">
          <div className="flex-1 overflow-hidden">
            <BuilderPanel onClose={() => setMobileActiveView('canvas')} />
          </div>
        </div>
      )}

      {/* =========================================================================
          2. CENTER LIVE INTERACTIVE CANVAS
          ========================================================================= */}
      <div className="flex-1 h-full flex flex-col overflow-hidden relative">
        <BuilderCanvas 
          showLeftPanel={showLeftPanel}
          onToggleLeftPanel={() => {
            if (window.innerWidth < 1024) {
              setMobileActiveView(mobileActiveView === 'panel' ? 'canvas' : 'panel');
            } else {
              setShowLeftPanel(!showLeftPanel);
            }
          }}
          showRightPanel={showRightPanel}
          onToggleRightPanel={() => setShowRightPanel(!showRightPanel)}
          onOpenMobilePanel={() => setMobileActiveView('panel')}
          onOpenMobileInspector={() => setMobileActiveView('inspector')}
        />

        {/* Mobile / Tablet Bottom Navigation Bar */}
        <div className="lg:hidden h-14 bg-white dark:bg-[#161412] border-t border-stone-200 dark:border-stone-800 flex items-center justify-around px-2 z-30 shrink-0">
          <button
            onClick={() => setMobileActiveView(mobileActiveView === 'panel' ? 'canvas' : 'panel')}
            className={`flex flex-col items-center gap-1 py-1 px-4 rounded-xl text-[10px] font-bold uppercase tracking-wider transition ${
              mobileActiveView === 'panel'
                ? 'text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/40'
                : 'text-stone-500'
            }`}
          >
            <Layers className="w-4 h-4" />
            <span>Tools & Pages</span>
          </button>

          <button
            onClick={() => setMobileActiveView('canvas')}
            className={`flex flex-col items-center gap-1 py-1 px-4 rounded-xl text-[10px] font-bold uppercase tracking-wider transition ${
              mobileActiveView === 'canvas'
                ? 'text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/40'
                : 'text-stone-500'
            }`}
          >
            <Layout className="w-4 h-4" />
            <span>Live Canvas</span>
          </button>

          <button
            onClick={() => setMobileActiveView(mobileActiveView === 'inspector' ? 'canvas' : 'inspector')}
            className={`flex flex-col items-center gap-1 py-1 px-4 rounded-xl text-[10px] font-bold uppercase tracking-wider transition relative ${
              mobileActiveView === 'inspector'
                ? 'text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/40'
                : 'text-stone-500'
            }`}
          >
            <Sliders className="w-4 h-4" />
            <span>Inspector</span>
            {selectedSectionId && (
              <span className="w-2 h-2 rounded-full bg-amber-500 absolute top-1 right-3 animate-ping" />
            )}
          </button>
        </div>
      </div>

      {/* =========================================================================
          3. RIGHT PROPERTIES INSPECTOR
          ========================================================================= */}
      {/* Desktop docked panel */}
      <div className={`hidden lg:block h-full transition-all duration-200 ${showRightPanel ? 'w-80 shrink-0' : 'w-0 overflow-hidden'}`}>
        <PropertiesInspector onClose={() => setShowRightPanel(false)} />
      </div>

      {/* Mobile/Tablet drawer modal (< 1024px) */}
      {mobileActiveView === 'inspector' && (
        <div className="lg:hidden fixed inset-0 top-16 z-50 bg-[#F6F3EE] dark:bg-[#161412] flex flex-col animate-fadeIn">
          <div className="flex-1 overflow-hidden">
            <PropertiesInspector onClose={() => setMobileActiveView('canvas')} />
          </div>
        </div>
      )}
    </div>
  );
};
