import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { StoreRenderer } from '../components/renderer/StoreRenderer';
import { FurnitureStore, StorePage } from '../types';
import { createDefaultStore } from '../data/defaultTemplates';
import { ArrowLeft, Sparkles, AlertCircle, ShoppingBag, Store as StoreIcon, ShieldCheck } from 'lucide-react';

export const PublicStoreView: React.FC = () => {
  const { storeSlug, pageSlug } = useParams<{ storeSlug: string; pageSlug?: string }>();
  const navigate = useNavigate();

  const [store, setStore] = useState<FurnitureStore | null>(null);
  const [activePageId, setActivePageId] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [notFound, setNotFound] = useState<boolean>(false);

  useEffect(() => {
    // Attempt to locate store from localStorage keys
    let foundStore: FurnitureStore | null = null;

    try {
      // Check default tenant first
      const defaultData = localStorage.getItem('vesta_store_builder_default_tenant');
      if (defaultData) {
        const parsed = JSON.parse(defaultData) as FurnitureStore;
        if (!storeSlug || parsed.storeSlug === storeSlug || storeSlug === 'preview') {
          foundStore = parsed;
        }
      }

      // If still not found, search all localStorage keys starting with vesta_store_builder_
      if (!foundStore) {
        for (let i = 0; i < localStorage.length; i++) {
          const key = localStorage.key(i);
          if (key && key.startsWith('vesta_store_builder_')) {
            const raw = localStorage.getItem(key);
            if (raw) {
              const parsed = JSON.parse(raw) as FurnitureStore;
              if (parsed.storeSlug === storeSlug) {
                foundStore = parsed;
                break;
              }
            }
          }
        }
      }
    } catch (e) {
      console.warn('Error reading store data:', e);
    }

    // Fallback: If not found in localStorage, instantiate default store with this slug
    if (!foundStore) {
      const fallback = createDefaultStore('default_tenant');
      if (storeSlug === fallback.storeSlug || storeSlug === 'preview' || !storeSlug) {
        foundStore = fallback;
      }
    }

    if (foundStore) {
      setStore(foundStore);

      // Determine initial active page
      if (pageSlug) {
        const matchingPage = foundStore.pages.find((p) => p.slug === pageSlug);
        if (matchingPage) {
          setActivePageId(matchingPage.id);
        } else {
          setActivePageId(foundStore.pages.find((p) => p.isHome)?.id || foundStore.pages[0]?.id || '');
        }
      } else {
        setActivePageId(foundStore.pages.find((p) => p.isHome)?.id || foundStore.pages[0]?.id || '');
      }
      setNotFound(false);
    } else {
      setNotFound(true);
    }

    setIsLoading(false);
  }, [storeSlug, pageSlug]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-stone-50 flex flex-col items-center justify-center p-6 text-stone-800">
        <div className="w-12 h-12 border-4 border-stone-300 border-t-stone-900 rounded-full animate-spin mb-4" />
        <p className="font-serif text-lg text-stone-700">Connecting to Furniture Atelier...</p>
      </div>
    );
  }

  if (notFound || !store) {
    return (
      <div className="min-h-screen bg-stone-50 flex flex-col items-center justify-center p-6 text-center">
        <div className="w-16 h-16 rounded-2xl bg-amber-100 text-amber-800 flex items-center justify-center mb-4">
          <StoreIcon className="w-8 h-8" />
        </div>
        <h1 className="text-2xl font-serif font-bold text-stone-900 mb-2">Storefront Not Found</h1>
        <p className="text-sm text-stone-600 max-w-md mb-6">
          We could not locate an active furniture store at <code className="bg-stone-200 px-1.5 py-0.5 rounded font-mono text-xs">/store/{storeSlug}</code>. It might be unpublished or the address was mistyped.
        </p>
        <div className="flex gap-3">
          <Link
            to="/my-store"
            className="px-5 py-2.5 bg-stone-900 hover:bg-stone-800 text-white rounded-lg text-xs font-semibold uppercase tracking-wider transition-all"
          >
            Go to My Furniture Store
          </Link>
          <Link
            to="/"
            className="px-5 py-2.5 bg-white border border-stone-300 hover:border-stone-400 text-stone-800 rounded-lg text-xs font-semibold uppercase tracking-wider transition-all"
          >
            VESTA AI Platform
          </Link>
        </div>
      </div>
    );
  }

  const activePage: StorePage = store.pages.find((p) => p.id === activePageId) || store.pages[0];

  return (
    <div className="min-h-screen bg-stone-100 flex flex-col antialiased">
      {/* Top Banner indicating published storefront */}
      <div className="bg-stone-950 text-stone-300 text-xs px-4 py-2 flex items-center justify-between z-50">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="font-medium text-white tracking-wide">
            LIVE STOREFRONT · {store.storeName.toUpperCase()}
          </span>
          <span className="text-stone-500 hidden sm:inline">|</span>
          <span className="text-stone-400 text-[11px] hidden sm:inline">
            Powered by VESTA AI Retail Architecture
          </span>
        </div>

        <div className="flex items-center gap-3">
          <Link
            to="/my-store/builder"
            className="inline-flex items-center gap-1.5 px-3 py-1 bg-stone-800 hover:bg-stone-700 text-stone-200 rounded-md text-[11px] font-semibold transition-colors"
          >
            <ArrowLeft className="w-3 h-3" />
            Edit in Website Builder
          </Link>
          <Link
            to="/my-store"
            className="inline-flex items-center gap-1.5 px-3 py-1 bg-amber-600 hover:bg-amber-500 text-white rounded-md text-[11px] font-semibold transition-colors"
          >
            Manage Orders & Products
          </Link>
        </div>
      </div>

      {/* Main Storefront Canvas */}
      <div className="flex-1 bg-white">
        <StoreRenderer
          page={activePage}
          theme={store.theme}
          products={store.products}
          allPages={store.pages}
          currency={store.currency || 'EGP'}
          isBuilderMode={false}
          onNavigatePage={(pageId: string) => {
            setActivePageId(pageId);
            const target = store.pages.find((p) => p.id === pageId);
            if (target) {
              window.history.pushState(null, '', `/store/${store.storeSlug}/${target.slug}`);
            }
          }}
        />
      </div>

      {/* Footer Branding Bar */}
      <div className="bg-stone-900 border-t border-stone-800 py-4 px-6 text-center text-xs text-stone-400">
        <p>
          &copy; {new Date().getFullYear()} {store.storeName}. All rights reserved.
          An autonomous furniture boutique built with <Link to="/" className="text-amber-400 hover:underline font-semibold ml-1">VESTA-AI</Link>.
        </p>
      </div>
    </div>
  );
};
