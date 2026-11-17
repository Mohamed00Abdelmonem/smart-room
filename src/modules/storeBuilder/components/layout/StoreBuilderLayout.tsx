import React, { useState } from 'react';
import { NavLink, Outlet, useLocation, Link } from 'react-router-dom';
import { useStoreBuilder } from '../../context/StoreBuilderContext';
import { useLanguage } from '../../../../context/LanguageContext';
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
  ArrowRight,
  Menu,
  X,
  Globe,
  CheckCircle2,
  PanelLeftClose,
  PanelLeftOpen,
  Languages,
} from 'lucide-react';

export const StoreBuilderLayout: React.FC = () => {
  const { store, isSaving, lastSavedAt, publishStore, unpublishStore } = useStoreBuilder();
  const { language, setLanguage, isRTL } = useLanguage();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [desktopSidebarOpen, setDesktopSidebarOpen] = useState(true);

  const isBuilderFullscreen = location.pathname.includes('/my-store/builder');
  const BackArrow = isRTL ? ArrowRight : ArrowLeft;

  const navItems = [
    { name: isRTL ? 'نظرة عامة على المتجر' : 'Store Overview', path: '/my-store', icon: LayoutDashboard, exact: true },
    { name: isRTL ? 'منشئ المواقع' : 'Website Builder', path: '/my-store/builder', icon: Paintbrush },
    { name: isRTL ? 'الصفحات والتنقل' : 'Pages & Navigation', path: '/my-store/pages', icon: FileText },
    { name: isRTL ? 'التصميم والهوية' : 'Design & Branding', path: '/my-store/branding', icon: Palette },
    { name: isRTL ? 'المنتجات' : 'Products', path: '/my-store/products', icon: Package },
    { name: isRTL ? 'الفئات والمجموعات' : 'Categories & Collections', path: '/my-store/collections', icon: Layers },
    { name: isRTL ? 'الطلبات' : 'Orders', path: '/my-store/orders', icon: ShoppingCart },
    { name: isRTL ? 'العملاء' : 'Customers', path: '/my-store/customers', icon: Users },
    { name: isRTL ? 'إعدادات المتجر' : 'Store Settings', path: '/my-store/settings', icon: Settings },
  ];

  const handleToggleSidebar = () => {
    if (window.innerWidth < 768) {
      setMobileMenuOpen((prev) => !prev);
    } else {
      setDesktopSidebarOpen((prev) => !prev);
    }
  };

  return (
    <div
      dir={isRTL ? 'rtl' : 'ltr'}
      className="min-h-screen bg-[#FDFCFB] flex flex-col font-sans text-stone-900 antialiased selection:bg-amber-100 selection:text-amber-900"
    >
      {/* Top Header Navigation */}
      <header className="h-16 bg-white border-b border-stone-200 sticky top-0 z-40 px-4 md:px-6 flex items-center justify-between gap-2">
        <div className="flex items-center gap-2.5 sm:gap-3 min-w-0">
          {/* Unified Sidebar Hide/Show Toggle (Mobile + Desktop) */}
          <button
            onClick={handleToggleSidebar}
            className="p-2 text-stone-600 hover:text-stone-900 hover:bg-stone-100 rounded-lg transition-colors cursor-pointer shrink-0"
            aria-label={isRTL ? 'إظهار أو إخفاء القائمة الجانبية' : 'Toggle Sidebar'}
            title={
              desktopSidebarOpen
                ? isRTL
                  ? 'إخفاء القائمة الجانبية'
                  : 'Hide Sidebar'
                : isRTL
                ? 'إظهار القائمة الجانبية'
                : 'Show Sidebar'
            }
          >
            <span className="md:hidden">
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </span>
            <span className="hidden md:inline-flex">
              {desktopSidebarOpen ? (
                <PanelLeftClose className={`w-5 h-5 ${isRTL ? 'rotate-180' : ''}`} />
              ) : (
                <PanelLeftOpen className={`w-5 h-5 ${isRTL ? 'rotate-180' : ''}`} />
              )}
            </span>
          </button>

          {/* Platform Back Link */}
          <Link
            to="/"
            className="flex items-center gap-2 text-xs font-semibold text-stone-500 hover:text-stone-900 py-1.5 px-2.5 rounded-lg hover:bg-stone-100 transition-colors shrink-0"
            title={isRTL ? 'العودة إلى منصة VESTA-AI الرئيسية' : 'Return to Main VESTA AI Experience'}
          >
            <BackArrow className="w-4 h-4" />
            <span className="hidden sm:inline">VESTA-AI</span>
          </Link>

          <div className="h-5 w-px bg-stone-200 hidden sm:block" />

          {/* Module Title & Active Store */}
          <div className="flex items-center gap-2 min-w-0">
            <span className="text-sm font-serif font-bold text-stone-900 tracking-tight truncate">
              {isRTL ? 'متجر الأثاث الخاص بي' : 'My Furniture Store'}
            </span>
            <span className="text-xs px-2 py-0.5 rounded-full bg-amber-100 text-amber-900 font-medium hidden sm:inline-block shrink-0">
              {store.storeName}
            </span>
          </div>
        </div>

        {/* Status & Actions */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          {/* Autosave status indicator */}
          <div className="hidden lg:flex items-center gap-1.5 text-xs text-stone-500">
            {isSaving ? (
              <>
                <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
                <span>{isRTL ? 'جارٍ الحفظ التلقائي...' : 'Autosaving changes...'}</span>
              </>
            ) : (
              <>
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                <span>
                  {isRTL ? 'تم الحفظ' : 'Saved'}{' '}
                  {lastSavedAt ? lastSavedAt.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : isRTL ? 'الآن' : 'just now'}
                </span>
              </>
            )}
          </div>

          {/* Language Switcher */}
          <button
            onClick={() => setLanguage(language === 'en' ? 'ar' : 'en')}
            className="inline-flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-bold text-stone-700 bg-stone-100 hover:bg-stone-200 rounded-lg transition-colors cursor-pointer"
            title={isRTL ? 'Switch to English' : 'التبديل إلى العربية'}
          >
            <Languages className="w-3.5 h-3.5 text-amber-700" />
            <span>{language === 'en' ? 'عربي' : 'EN'}</span>
          </button>

          {/* Store Live Link */}
          <Link
            to={`/store/${store.storeSlug}`}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-stone-700 bg-stone-100 hover:bg-stone-200 rounded-lg transition-colors"
          >
            <Globe className="w-3.5 h-3.5 text-stone-600" />
            <span className="hidden md:inline">{isRTL ? 'معاينة المتجر الحي' : 'Preview Live Store'}</span>
            <ExternalLink className="w-3 h-3 text-stone-400" />
          </Link>

          {/* Publish / Unpublish CTA */}
          {store.isPublished ? (
            <button
              onClick={() => unpublishStore()}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-emerald-50 text-emerald-800 border border-emerald-200 hover:bg-emerald-100 text-xs font-semibold rounded-lg transition-all cursor-pointer"
            >
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>{isRTL ? 'منشور' : 'Published'}</span>
            </button>
          ) : (
            <button
              onClick={() => publishStore()}
              className="inline-flex items-center gap-1.5 px-4 py-1.5 bg-stone-900 hover:bg-stone-800 text-white text-xs font-semibold uppercase tracking-wider rounded-lg shadow-sm transition-all cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>{isRTL ? 'نشر المتجر' : 'Publish'}</span>
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

        {/* Sidebar Navigation (Collapsible on Desktop + Drawer on Mobile) */}
        <aside
          className={`
            bg-white border-stone-200 shrink-0 flex flex-col justify-between overflow-hidden
            fixed md:static inset-y-16 ${isRTL ? 'right-0 border-l' : 'left-0 border-r'} z-30
            transition-all duration-200 ease-in-out
            ${mobileMenuOpen ? 'translate-x-0 w-64' : isRTL ? 'translate-x-full md:translate-x-0' : '-translate-x-full md:translate-x-0'}
            ${desktopSidebarOpen ? 'md:w-64' : 'md:w-0 md:border-none'}
          `}
        >
          <div className="p-4 space-y-1 overflow-y-auto w-64">
            <div className="px-3 py-2 flex items-center justify-between">
              <span className="text-[10px] font-bold uppercase tracking-wider text-stone-400 font-mono">
                {isRTL ? 'إدارة المتجر' : 'Store Management'}
              </span>
              <button
                onClick={() => {
                  setDesktopSidebarOpen(false);
                  setMobileMenuOpen(false);
                }}
                className="p-1 rounded-md text-stone-400 hover:text-stone-900 hover:bg-stone-100 transition cursor-pointer"
                title={isRTL ? 'إخفاء القائمة' : 'Hide Sidebar'}
              >
                <X className="w-3.5 h-3.5" />
              </button>
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
                  <span className="truncate">{item.name}</span>
                </NavLink>
              );
            })}
          </div>

          {/* Quick Footer inside Sidebar */}
          <div className="p-4 border-t border-stone-200 bg-stone-50/50 space-y-2 w-64">
            <div className="text-[11px] text-stone-500 flex items-center justify-between">
              <span>{isRTL ? 'عناصر الكتالوج' : 'Catalog items'}</span>
              <span className="font-semibold text-stone-800">
                {store.products.length} {isRTL ? 'قطعة' : 'pieces'}
              </span>
            </div>
            <div className="text-[11px] text-stone-500 flex items-center justify-between">
              <span>{isRTL ? 'الصفحات المنشأة' : 'Pages built'}</span>
              <span className="font-semibold text-stone-800">
                {store.pages.length} {isRTL ? 'صفحات' : 'pages'}
              </span>
            </div>
            <div className="text-[11px] text-stone-500 flex items-center justify-between">
              <span>{isRTL ? 'الحالة' : 'Status'}</span>
              <span className={`font-semibold ${store.isPublished ? 'text-emerald-700' : 'text-amber-700'}`}>
                {store.isPublished ? (isRTL ? 'مباشر' : 'Live') : (isRTL ? 'مسودة' : 'Draft')}
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
