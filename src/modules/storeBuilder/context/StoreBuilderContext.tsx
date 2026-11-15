import React, { createContext, useContext, useState, useEffect, useCallback, useMemo } from 'react';
import { 
  FurnitureStore, 
  StorePage, 
  StoreSection, 
  GlobalThemeSettings, 
  DeviceViewport, 
  BuilderSidebarTab,
  StoreProduct
} from '../types';
import { createDefaultStore, STORE_TEMPLATES } from '../data/defaultTemplates';
import { SECTION_CATALOG } from '../data/sectionDefinitions';

interface StoreBuilderContextType {
  // Store & Tenant
  store: FurnitureStore;
  tenantId: string;
  isSaving: boolean;
  lastSavedAt: Date | null;
  saveStore: () => void;

  // Active Navigation in Builder
  activePageId: string;
  setActivePageId: (id: string) => void;
  activePage: StorePage;
  selectedSectionId: string | null;
  setSelectedSectionId: (id: string | null) => void;
  selectedSection: StoreSection | null;

  // Viewport & Editor State
  deviceViewport: DeviceViewport;
  setDeviceViewport: (vp: DeviceViewport) => void;
  sidebarTab: BuilderSidebarTab;
  setSidebarTab: (tab: BuilderSidebarTab) => void;
  isPreviewMode: boolean;
  setIsPreviewMode: (val: boolean) => void;

  // Section CRUD & Reordering
  updateSection: (sectionId: string, updates: Partial<StoreSection>) => void;
  addSection: (sectionTemplateId: string, targetIndex?: number) => void;
  deleteSection: (sectionId: string) => void;
  duplicateSection: (sectionId: string) => void;
  reorderSections: (fromIndex: number, toIndex: number) => void;
  toggleSectionVisibility: (sectionId: string) => void;

  // Page CRUD
  createPage: (title: string, slug?: string) => void;
  deletePage: (pageId: string) => void;
  duplicatePage: (pageId: string) => void;
  setHomePage: (pageId: string) => void;
  updatePageMeta: (pageId: string, updates: { title?: string; slug?: string; seoTitle?: string; seoDescription?: string; isPublished?: boolean }) => void;

  // Theme & Global Styles
  updateTheme: (updates: Partial<GlobalThemeSettings>) => void;
  applyTemplate: (templateId: string) => void;

  // Publishing & Store Info
  updateStoreMeta: (updates: { storeName?: string; storeSlug?: string; tagline?: string; currency?: string }) => void;
  publishStore: () => void;
  unpublishStore: () => void;

  // Products CRUD in Store
  updateProduct: (productId: string, updates: Partial<StoreProduct>) => void;
  addProduct: (product: Omit<StoreProduct, 'id'>) => void;
  deleteProduct: (productId: string) => void;

  // AI Assistant
  isAiGenerating: boolean;
  applyAiPrompt: (promptText: string) => Promise<{ success: boolean; message: string }>;

  // Undo / Redo
  undo: () => void;
  redo: () => void;
  canUndo: boolean;
  canRedo: boolean;
}

const StoreBuilderContext = createContext<StoreBuilderContextType | undefined>(undefined);

const STORAGE_KEY_PREFIX = 'vesta_store_builder_';

export const StoreBuilderProvider: React.FC<{ 
  tenantId?: string; 
  children: React.ReactNode 
}> = ({ 
  tenantId = 'default_tenant', 
  children 
}) => {
  const storageKey = `${STORAGE_KEY_PREFIX}${tenantId}`;

  // Initialize store from localStorage or create default
  const [store, setStore] = useState<FurnitureStore>(() => {
    try {
      const saved = localStorage.getItem(storageKey);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.warn('Failed to parse saved store configuration:', e);
    }
    return createDefaultStore(tenantId);
  });

  // History stack for Undo / Redo (max 25 states)
  const [history, setHistory] = useState<FurnitureStore[]>([store]);
  const [historyIndex, setHistoryIndex] = useState<number>(0);

  // Editor states
  const [activePageId, setActivePageId] = useState<string>(() => {
    return store.pages.find((p) => p.isHome)?.id || store.pages[0]?.id || 'page-home';
  });
  const [selectedSectionId, setSelectedSectionId] = useState<string | null>(null);
  const [deviceViewport, setDeviceViewport] = useState<DeviceViewport>('desktop');
  const [sidebarTab, setSidebarTab] = useState<BuilderSidebarTab>('pages');
  const [isPreviewMode, setIsPreviewMode] = useState<boolean>(false);
  const [isSaving, setIsSaving] = useState<boolean>(false);
  const [lastSavedAt, setLastSavedAt] = useState<Date | null>(new Date());
  const [isAiGenerating, setIsAiGenerating] = useState<boolean>(false);

  // Synchronize store updates with history
  const pushState = useCallback((newStore: FurnitureStore) => {
    setStore(newStore);
    setHistory((prev) => {
      const sliced = prev.slice(0, historyIndex + 1);
      return [...sliced, newStore].slice(-25); // cap at 25 revisions
    });
    setHistoryIndex((prev) => Math.min(prev + 1, 24));
  }, [historyIndex]);

  // Persist to localStorage with debounced save indicator
  useEffect(() => {
    setIsSaving(true);
    const timer = setTimeout(() => {
      try {
        localStorage.setItem(storageKey, JSON.stringify(store));
        setLastSavedAt(new Date());
      } catch (e) {
        console.error('Error persisting store:', e);
      } finally {
        setIsSaving(false);
      }
    }, 400);

    return () => clearTimeout(timer);
  }, [store, storageKey]);

  // Active page derived from ID
  const activePage = useMemo(() => {
    return store.pages.find((p) => p.id === activePageId) || store.pages[0];
  }, [store.pages, activePageId]);

  // Selected section derived from ID
  const selectedSection = useMemo(() => {
    if (!selectedSectionId) return null;
    return activePage.sections.find((s) => s.id === selectedSectionId) || null;
  }, [activePage.sections, selectedSectionId]);

  // Undo / Redo
  const canUndo = historyIndex > 0;
  const canRedo = historyIndex < history.length - 1;

  const undo = useCallback(() => {
    if (!canUndo) return;
    const targetIdx = historyIndex - 1;
    const previousState = history[targetIdx];
    setHistoryIndex(targetIdx);
    setStore(previousState);
  }, [canUndo, historyIndex, history]);

  const redo = useCallback(() => {
    if (!canRedo) return;
    const targetIdx = historyIndex + 1;
    const nextState = history[targetIdx];
    setHistoryIndex(targetIdx);
    setStore(nextState);
  }, [canRedo, historyIndex, history]);

  // Section Operations
  const updateSection = useCallback((sectionId: string, updates: Partial<StoreSection>) => {
    setStore((prevStore) => {
      const updatedPages = prevStore.pages.map((page) => {
        if (page.id !== activePageId) return page;

        return {
          ...page,
          sections: page.sections.map((sec) => {
            if (sec.id !== sectionId) return sec;
            return {
              ...sec,
              ...updates,
              content: { ...sec.content, ...(updates.content || {}) },
              design: { ...sec.design, ...(updates.design || {}) },
            };
          }),
        };
      });

      const next = { ...prevStore, pages: updatedPages };
      pushState(next);
      return next;
    });
  }, [activePageId, pushState]);

  const addSection = useCallback((sectionTemplateId: string, targetIndex?: number) => {
    const catalogItem = SECTION_CATALOG.find((item) => item.id === sectionTemplateId);
    if (!catalogItem) return;

    const newSection = catalogItem.createDefault(`sec_${Date.now()}`);

    setStore((prevStore) => {
      const updatedPages = prevStore.pages.map((page) => {
        if (page.id !== activePageId) return page;

        const newSections = [...page.sections];
        if (typeof targetIndex === 'number' && targetIndex >= 0) {
          newSections.splice(targetIndex, 0, newSection);
        } else {
          // If footer exists, insert before footer; otherwise at end
          const footerIdx = newSections.findIndex((s) => s.type === 'footer');
          if (footerIdx !== -1) {
            newSections.splice(footerIdx, 0, newSection);
          } else {
            newSections.push(newSection);
          }
        }

        return { ...page, sections: newSections };
      });

      const next = { ...prevStore, pages: updatedPages };
      pushState(next);
      return next;
    });

    setSelectedSectionId(newSection.id);
  }, [activePageId, pushState]);

  const deleteSection = useCallback((sectionId: string) => {
    setStore((prevStore) => {
      const updatedPages = prevStore.pages.map((page) => {
        if (page.id !== activePageId) return page;
        return {
          ...page,
          sections: page.sections.filter((s) => s.id !== sectionId),
        };
      });

      const next = { ...prevStore, pages: updatedPages };
      pushState(next);
      return next;
    });

    if (selectedSectionId === sectionId) {
      setSelectedSectionId(null);
    }
  }, [activePageId, pushState, selectedSectionId]);

  const duplicateSection = useCallback((sectionId: string) => {
    setStore((prevStore) => {
      const updatedPages = prevStore.pages.map((page) => {
        if (page.id !== activePageId) return page;

        const secIdx = page.sections.findIndex((s) => s.id === sectionId);
        if (secIdx === -1) return page;

        const original = page.sections[secIdx];
        const clone: StoreSection = {
          ...JSON.parse(JSON.stringify(original)),
          id: `sec_${Date.now()}`,
          name: `${original.name} (Copy)`,
        };

        const newSections = [...page.sections];
        newSections.splice(secIdx + 1, 0, clone);

        return { ...page, sections: newSections };
      });

      const next = { ...prevStore, pages: updatedPages };
      pushState(next);
      return next;
    });
  }, [activePageId, pushState]);

  const reorderSections = useCallback((fromIndex: number, toIndex: number) => {
    if (fromIndex === toIndex) return;

    setStore((prevStore) => {
      const updatedPages = prevStore.pages.map((page) => {
        if (page.id !== activePageId) return page;

        const newSections = [...page.sections];
        const [moved] = newSections.splice(fromIndex, 1);
        newSections.splice(toIndex, 0, moved);

        return { ...page, sections: newSections };
      });

      const next = { ...prevStore, pages: updatedPages };
      pushState(next);
      return next;
    });
  }, [activePageId, pushState]);

  const toggleSectionVisibility = useCallback((sectionId: string) => {
    setStore((prevStore) => {
      const updatedPages = prevStore.pages.map((page) => {
        if (page.id !== activePageId) return page;

        return {
          ...page,
          sections: page.sections.map((sec) => {
            if (sec.id !== sectionId) return sec;
            return { ...sec, visible: !sec.visible };
          }),
        };
      });

      const next = { ...prevStore, pages: updatedPages };
      pushState(next);
      return next;
    });
  }, [activePageId, pushState]);

  // Page Operations
  const createPage = useCallback((title: string, slug?: string) => {
    const rawSlug = slug || title.toLowerCase().trim().replace(/[^a-z0-9]+/g, '-');
    const newPage: StorePage = {
      id: `page_${Date.now()}`,
      title,
      slug: rawSlug,
      isHome: false,
      isPublished: true,
      seoTitle: `${title} — ${store.storeName}`,
      sections: [
        {
          id: `sec_hdr_${Date.now()}`,
          type: 'header',
          variant: 'header-classic',
          name: 'Navigation Bar',
          visible: true,
          content: { title: store.storeName },
          design: { borderBottom: true },
        },
        {
          id: `sec_hero_${Date.now()}`,
          type: 'hero',
          variant: 'hero-minimal',
          name: `${title} Header`,
          visible: true,
          content: {
            title,
            subtitle: `Welcome to our ${title.toLowerCase()} page.`,
          },
          design: { paddingTop: 'lg', paddingBottom: 'md', textAlign: 'center' },
        },
        {
          id: `sec_ftr_${Date.now()}`,
          type: 'footer',
          variant: 'footer-multi-column',
          name: 'Footer',
          visible: true,
          content: { title: store.storeName },
          design: {},
        },
      ],
    };

    setStore((prev) => {
      const next = { ...prev, pages: [...prev.pages, newPage] };
      pushState(next);
      return next;
    });

    setActivePageId(newPage.id);
  }, [store.storeName, pushState]);

  const deletePage = useCallback((pageId: string) => {
    if (store.pages.length <= 1) return; // Must keep at least 1 page

    setStore((prev) => {
      const filtered = prev.pages.filter((p) => p.id !== pageId);
      // If deleted page was home, make first page home
      if (prev.pages.find((p) => p.id === pageId)?.isHome && filtered[0]) {
        filtered[0].isHome = true;
      }
      const next = { ...prev, pages: filtered };
      pushState(next);
      return next;
    });

    if (activePageId === pageId) {
      const remaining = store.pages.filter((p) => p.id !== pageId);
      setActivePageId(remaining[0]?.id || 'page-home');
    }
  }, [activePageId, pushState, store.pages]);

  const duplicatePage = useCallback((pageId: string) => {
    const original = store.pages.find((p) => p.id === pageId);
    if (!original) return;

    const cloned: StorePage = {
      ...JSON.parse(JSON.stringify(original)),
      id: `page_${Date.now()}`,
      title: `${original.title} (Copy)`,
      slug: `${original.slug}-copy`,
      isHome: false,
    };

    setStore((prev) => {
      const next = { ...prev, pages: [...prev.pages, cloned] };
      pushState(next);
      return next;
    });

    setActivePageId(cloned.id);
  }, [pushState, store.pages]);

  const setHomePage = useCallback((pageId: string) => {
    setStore((prev) => {
      const updated = prev.pages.map((p) => ({
        ...p,
        isHome: p.id === pageId,
      }));
      const next = { ...prev, pages: updated };
      pushState(next);
      return next;
    });
  }, [pushState]);

  const updatePageMeta = useCallback((pageId: string, updates: { title?: string; slug?: string; seoTitle?: string; seoDescription?: string; isPublished?: boolean }) => {
    setStore((prev) => {
      const updated = prev.pages.map((p) => {
        if (p.id !== pageId) return p;
        return { ...p, ...updates };
      });
      const next = { ...prev, pages: updated };
      pushState(next);
      return next;
    });
  }, [pushState]);

  // Global Theme
  const updateTheme = useCallback((updates: Partial<GlobalThemeSettings>) => {
    setStore((prev) => {
      const nextTheme = {
        ...prev.theme,
        ...updates,
        colors: { ...prev.theme.colors, ...(updates.colors || {}) },
        typography: { ...prev.theme.typography, ...(updates.typography || {}) },
        layout: { ...prev.theme.layout, ...(updates.layout || {}) },
      };
      const next = { ...prev, theme: nextTheme };
      pushState(next);
      return next;
    });
  }, [pushState]);

  const applyTemplate = useCallback((templateId: string) => {
    const tpl = STORE_TEMPLATES.find((t) => t.id === templateId);
    if (!tpl) return;

    setStore((prev) => {
      const next: FurnitureStore = {
        ...prev,
        storeName: tpl.theme.brandName,
        tagline: tpl.theme.tagline,
        theme: JSON.parse(JSON.stringify(tpl.theme)),
        pages: JSON.parse(JSON.stringify(tpl.pages)),
      };
      pushState(next);
      return next;
    });

    setActivePageId(tpl.pages[0]?.id || 'page-home');
    setSelectedSectionId(null);
  }, [pushState]);

  // Publishing & Store Info
  const updateStoreMeta = useCallback((updates: { storeName?: string; storeSlug?: string; tagline?: string; currency?: string }) => {
    setStore((prev) => {
      const next: FurnitureStore = {
        ...prev,
        ...updates,
      };
      pushState(next);
      return next;
    });
  }, [pushState]);

  const publishStore = useCallback(() => {
    setStore((prev) => {
      const next: FurnitureStore = {
        ...prev,
        isPublished: true,
        publishedAt: new Date().toISOString(),
      };
      pushState(next);
      return next;
    });
  }, [pushState]);

  const unpublishStore = useCallback(() => {
    setStore((prev) => {
      const next: FurnitureStore = {
        ...prev,
        isPublished: false,
      };
      pushState(next);
      return next;
    });
  }, [pushState]);

  // Product Operations
  const updateProduct = useCallback((productId: string, updates: Partial<StoreProduct>) => {
    setStore((prev) => {
      const updatedProducts = prev.products.map((p) => {
        if (p.id !== productId) return p;
        return { ...p, ...updates };
      });
      const next = { ...prev, products: updatedProducts };
      pushState(next);
      return next;
    });
  }, [pushState]);

  const addProduct = useCallback((newProdData: Omit<StoreProduct, 'id'>) => {
    const newProd: StoreProduct = {
      ...newProdData,
      id: `prod_${Date.now()}`,
    };
    setStore((prev) => {
      const next = { ...prev, products: [newProd, ...prev.products] };
      pushState(next);
      return next;
    });
  }, [pushState]);

  const deleteProduct = useCallback((productId: string) => {
    setStore((prev) => {
      const next = { ...prev, products: prev.products.filter((p) => p.id !== productId) };
      pushState(next);
      return next;
    });
  }, [pushState]);

  // AI Assistant: Smart natural language modifications
  const applyAiPrompt = useCallback(async (promptText: string): Promise<{ success: boolean; message: string }> => {
    setIsAiGenerating(true);

    // Simulate AI thinking and intelligent schema transformation
    await new Promise((resolve) => setTimeout(resolve, 1400));

    const p = promptText.toLowerCase();

    try {
      setStore((prev) => {
        const next = JSON.parse(JSON.stringify(prev)) as FurnitureStore;

        // 1. Luxury / Warm Beige intent
        if (p.includes('luxury') || p.includes('warm') || p.includes('beige') || p.includes('alabaster')) {
          next.theme.colors.background = '#F6F3EE';
          next.theme.colors.surface = '#FFFFFF';
          next.theme.colors.primary = '#1E1E1E';
          next.theme.colors.secondary = '#8C6D45';
          next.theme.colors.accent = '#B58A54';
          next.theme.typography.headingFont = 'Playfair Display';

          // Update hero copy on home page if available
          const homePage = next.pages.find((page) => page.isHome);
          if (homePage) {
            const hero = homePage.sections.find((s) => s.type === 'hero');
            if (hero) {
              hero.content.tag = 'BESPOKE HAUTE INTERIORS';
              hero.content.title = 'Monolithic Marble & Tactile Warm Living';
              hero.content.subtitle = 'Designed for light-filled penthouses and private residences in Cairo and Sheikh Zayed.';
            }
          }
        } 
        // 2. Modern Minimalist intent
        else if (p.includes('minimalist') || p.includes('modern') || p.includes('clean') || p.includes('black')) {
          next.theme.colors.background = '#FFFFFF';
          next.theme.colors.surface = '#F9F9FB';
          next.theme.colors.primary = '#0F0F11';
          next.theme.colors.secondary = '#4A4A52';
          next.theme.colors.accent = '#10B981';
          next.theme.typography.headingFont = 'Plus Jakarta Sans';
          next.theme.layout.borderRadius = 'none';
        }
        // 3. Scandinavian / Oak intent
        else if (p.includes('scandinavian') || p.includes('nordic') || p.includes('wood') || p.includes('oak')) {
          next.theme.colors.background = '#FAF9F6';
          next.theme.colors.surface = '#FFFFFF';
          next.theme.colors.primary = '#242A2E';
          next.theme.colors.secondary = '#5C6B73';
          next.theme.colors.accent = '#9DB4C0';
          next.theme.typography.headingFont = 'Plus Jakarta Sans';
          next.theme.layout.borderRadius = 'md';
        }
        // 4. Content rewriting or general polish
        else {
          const homePage = next.pages.find((page) => page.isHome);
          if (homePage) {
            const hero = homePage.sections.find((s) => s.type === 'hero');
            if (hero) {
              hero.content.title = 'Curated Elegance for Contemporary Living';
              hero.content.subtitle = 'Precision crafted furniture pieces engineered with authentic natural materials and true scale.';
            }
          }
        }

        pushState(next);
        return next;
      });

      setIsAiGenerating(false);
      return {
        success: true,
        message: 'AI successfully applied aesthetic transformations and updated section styling.',
      };
    } catch {
      setIsAiGenerating(false);
      return {
        success: false,
        message: 'Could not process AI request. Please try another prompt.',
      };
    }
  }, [pushState]);

  return (
    <StoreBuilderContext.Provider
      value={{
        store,
        tenantId,
        isSaving,
        lastSavedAt,
        saveStore: () => {
          localStorage.setItem(storageKey, JSON.stringify(store));
          setLastSavedAt(new Date());
        },
        activePageId,
        setActivePageId,
        activePage,
        selectedSectionId,
        setSelectedSectionId,
        selectedSection,
        deviceViewport,
        setDeviceViewport,
        sidebarTab,
        setSidebarTab,
        isPreviewMode,
        setIsPreviewMode,
        updateSection,
        addSection,
        deleteSection,
        duplicateSection,
        reorderSections,
        toggleSectionVisibility,
        createPage,
        deletePage,
        duplicatePage,
        setHomePage,
        updatePageMeta,
        updateTheme,
        applyTemplate,
        updateStoreMeta,
        publishStore,
        unpublishStore,
        updateProduct,
        addProduct,
        deleteProduct,
        isAiGenerating,
        applyAiPrompt,
        undo,
        redo,
        canUndo,
        canRedo,
      }}
    >
      {children}
    </StoreBuilderContext.Provider>
  );
};

export const useStoreBuilder = (): StoreBuilderContextType => {
  const context = useContext(StoreBuilderContext);
  if (!context) {
    throw new Error('useStoreBuilder must be used within a StoreBuilderProvider');
  }
  return context;
};
