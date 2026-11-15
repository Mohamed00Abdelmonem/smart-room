import React, { useState } from 'react';
import { NavLink, Outlet, useLocation, Link } from 'react-router-dom';
import { useStoreBuilder } from '../../context/StoreBuilderContext';
import { 
  LayoutDashboard, 
  Paintbrush, 
  FileText, 
  Palette, 
  Package, 
  Layers, 
  ShoppingCart, 
  Users, 
  Settings, 
  ExternalLink, 
  Sparkles, 
  ArrowLeft, 
  Menu, 
  X,
  Globe,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';

export const StoreBuilderLayout: React.FC = () => {
  const { store, isSaving, lastSavedAt, publishStore, unpublishStore } = useStoreBuilder();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Is this the full-bleed Website Builder view? If so, the canvas manages its own toolbar
  const isBuilderFullscreen = location.pathname.includes('/my-store/builder');

  const navItems = [
    { name: 'Store Overview', path: '/my-store', icon: LayoutDashboard, exact: true },
    { name: 'Website Builder', path: '/my-store/builder', icon: Paintbrush },
    { name: 'Pages & Navigation', path: '/my-store/pages', icon: FileText },
    { name: 'Design & Branding', path: '/my-store/branding', icon: Palette },
    { name: 'Products', path: '/my-store/products', icon: Package },
    { name: 'Categories & Collections', path: '/my-store/collections', icon: Layers },
    { name: 'Orders', path: '/my-store/orders', icon: ShoppingCart },
    { name: 'Customers', path: '/my-store/customers', icon: Users },
    { name: 'Store Settings', path: '/my-store/settings', icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-[#FDFCFB] flex flex-col font-sans text-stone-900 antialiased selection:bg-amber-100 selection:text-amber-900">
      {/* Top Header Navigation */}
      <header className="h-16 bg-white border-b border-stone-200 sticky top-0 z-40 px-4 md:px-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          {/* Mobile menu toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-stone-600 hover:text-stone-900 hover:bg-stone-100 rounded-lg"
            aria-label="Toggle Navigation"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>

          {/* Platform Back Link */}
          <Link
            to="/"
            className="flex items-center gap-2 text-xs font-semibold text-stone-500 hover:text-stone-900 py-1.5 px-2.5 rounded-lg hover:bg-stone-100 transition-colors"
            title="Return to Main VESTA AI Experience"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="hidden sm:inline">VESTA-AI</span>
          </Link>

          <div className="h-5 w-px bg-stone-200 hidden sm:block" />

          {/* Module Title & Active Store */}
          <div className="flex items-center gap-2">
            <span className="text-sm font-serif font-bold text-stone-900 tracking-tight">
              My Furniture Store
            </span>
            <span className="text-xs px-2 py-0.5 rounded-full bg-amber-100 text-amber-900 font-medium hidden sm:inline-block">
              {store.storeName}
            </span>
          </div>
        </div>

        {/* Status & Actions */}
        <div className="flex items-center gap-3">
          {/* Autosave status indicator */}
          <div className="hidden lg:flex items-center gap-1.5 text-xs text-stone-500">
            {isSaving ? (
              <>
                <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
                <span>Autosaving changes...</span>
              </>
            ) : (
              <>
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                <span>Saved {lastSavedAt ? lastSavedAt.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : 'just now'}</span>
              </>
            )}
          </div>

          {/* Store Live Link */}
          <Link
            to={`/store/${store.storeSlug}`}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-stone-700 bg-stone-100 hover:bg-stone-200 rounded-lg transition-colors"
          >
            <Globe className="w-3.5 h-3.5 text-stone-600" />
            <span className="hidden md:inline">Preview Live Store</span>
            <ExternalLink className="w-3 h-3 text-stone-400" />
          </Link>

          {/* Publish / Unpublish CTA */}
          {store.isPublished ? (
            <button
              onClick={() => unpublishStore()}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-emerald-50 text-emerald-800 border border-emerald-200 hover:bg-emerald-100 text-xs font-semibold rounded-lg transition-all"
            >
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              Published
            </button>
          ) : (
            <button
              onClick={() => publishStore()}
              className="inline-flex items-center gap-1.5 px-4 py-1.5 bg-stone-900 hover:bg-stone-800 text-white text-xs font-semibold uppercase tracking-wider rounded-lg shadow-sm transition-all"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              Publish
            </button>
          )}
        </div>
      </header>

      {/* Main Area: Sidebar + Content */}
      <div className="flex-1 flex overflow-hidden relative">
        {/* Mobile Backdrop Overlay */}
        {mobileMenuOpen && (
          <div 
            onClick={() => setMobileMenuOpen(false)}
            className="md:hidden fixed inset-0 top-16 bg-black/40 backdrop-blur-xs z-25 transition-opacity"
          />
        )}

        {/* Sidebar Navigation */}
        <aside className={`
          w-64 bg-white border-r border-stone-200 shrink-0 flex flex-col justify-between
          fixed md:static inset-y-16 left-0 z-30 transition-transform duration-200 ease-in-out
          ${mobileMenuOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
        `}>
          <div className="p-4 space-y-1 overflow-y-auto">
            <div className="px-3 py-2 text-[10px] font-bold uppercase tracking-wider text-stone-400 font-mono">
              Store Management
            </div>

            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = item.exact 
                ? location.pathname === item.path 
                : location.pathname.startsWith(item.path);

              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  end={item.exact}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`
                    flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-medium transition-all
                    ${isActive 
                      ? 'bg-stone-900 text-white shadow-xs font-semibold' 
                      : 'text-stone-600 hover:text-stone-900 hover:bg-stone-100'}
                  `}
                >
                  <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-amber-400' : 'text-stone-500'}`} />
                  <span>{item.name}</span>
                </NavLink>
              );
            })}
          </div>

          {/* Quick Footer inside Sidebar */}
          <div className="p-4 border-t border-stone-200 bg-stone-50/50 space-y-2">
            <div className="text-[11px] text-stone-500 flex items-center justify-between">
              <span>Catalog items</span>
              <span className="font-semibold text-stone-800">{store.products.length} pieces</span>
            </div>
            <div className="text-[11px] text-stone-500 flex items-center justify-between">
              <span>Pages built</span>
              <span className="font-semibold text-stone-800">{store.pages.length} pages</span>
            </div>
            <div className="text-[11px] text-stone-500 flex items-center justify-between">
              <span>Status</span>
              <span className={`font-semibold ${store.isPublished ? 'text-emerald-700' : 'text-amber-700'}`}>
                {store.isPublished ? 'Live' : 'Draft'}
              </span>
            </div>
          </div>
        </aside>

        {/* Content Body */}
        <main className={`flex-1 overflow-y-auto ${isBuilderFullscreen ? 'p-0 overflow-hidden' : 'bg-stone-50/40'}`}>
          <Outlet />
        </main>
      </div>
    </div>
  );
};

