import React, { useState } from 'react';
import { StorePage, GlobalThemeSettings, StoreProduct, StoreSection, DeviceViewport } from '../../types';
import { HeaderSection } from './HeaderSection';
import { HeroSection } from './HeroSection';
import { ProductsSection } from './ProductsSection';
import { BrandSection } from './BrandSection';
import { MarketingSection } from './MarketingSection';
import { FooterSection } from './FooterSection';
import { 
  ChevronUp, 
  ChevronDown, 
  Copy, 
  Trash2, 
  Eye, 
  EyeOff, 
  Edit3, 
  Check, 
  X,
  ShoppingBag,
  Sparkles,
  ArrowRight
} from 'lucide-react';

interface StoreRendererProps {
  page: StorePage;
  theme: GlobalThemeSettings;
  products: StoreProduct[];
  allPages: StorePage[];
  currency?: string;
  isBuilderMode?: boolean;
  selectedSectionId?: string | null;
  onSelectSection?: (sectionId: string) => void;
  onMoveUp?: (index: number) => void;
  onMoveDown?: (index: number) => void;
  onDuplicate?: (sectionId: string) => void;
  onDelete?: (sectionId: string) => void;
  onToggleVisibility?: (sectionId: string) => void;
  onNavigatePage?: (pageId: string) => void;
  viewport?: DeviceViewport;
}

export const StoreRenderer: React.FC<StoreRendererProps> = ({
  page,
  theme,
  products,
  allPages,
  currency = 'EGP',
  isBuilderMode = false,
  selectedSectionId = null,
  onSelectSection,
  onMoveUp,
  onMoveDown,
  onDuplicate,
  onDelete,
  onToggleVisibility,
  onNavigatePage,
  viewport = 'desktop',
}) => {
  // Shopping Cart & Product Detail Modal for Interactive Experience
  const [cartItems, setCartItems] = useState<Array<{ product: StoreProduct; quantity: number }>>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [inspectProduct, setInspectProduct] = useState<StoreProduct | null>(null);

  const handleAddToCart = (product: StoreProduct) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { product, quantity: 1 }];
    });
    setIsCartOpen(true);
  };

  const handleRemoveFromCart = (productId: string) => {
    setCartItems((prev) => prev.filter((item) => item.product.id !== productId));
  };

  const cartTotal = cartItems.reduce(
    (sum, item) => sum + item.product.priceEgp * item.quantity,
    0
  );
  const totalItemCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const renderSectionComponent = (sec: StoreSection) => {
    switch (sec.type) {
      case 'header':
        return (
          <HeaderSection
            section={sec}
            theme={theme}
            pages={allPages}
            activePageId={page.id}
            onNavigate={onNavigatePage}
            cartCount={totalItemCount}
            onOpenCart={() => setIsCartOpen(true)}
            isEditable={isBuilderMode}
            viewport={viewport}
          />
        );
      case 'hero':
        return (
          <HeroSection
            section={sec}
            theme={theme}
            onNavigateToShop={() => {
              const shop = allPages.find((p) => p.slug === 'shop');
              if (shop && onNavigatePage) onNavigatePage(shop.id);
            }}
            onNavigateToAbout={() => {
              const about = allPages.find((p) => p.slug === 'about');
              if (about && onNavigatePage) onNavigatePage(about.id);
            }}
            viewport={viewport}
          />
        );
      case 'products':
        return (
          <ProductsSection
            section={sec}
            theme={theme}
            products={products}
            currency={currency}
            onAddToCart={handleAddToCart}
            onSelectProduct={(p) => setInspectProduct(p)}
            onViewAll={() => {
              const shop = allPages.find((p) => p.slug === 'shop');
              if (shop && onNavigatePage) onNavigatePage(shop.id);
            }}
            viewport={viewport}
          />
        );
      case 'brand':
        return (
          <BrandSection
            section={sec}
            theme={theme}
            onNavigateToAbout={() => {
              const about = allPages.find((p) => p.slug === 'about');
              if (about && onNavigatePage) onNavigatePage(about.id);
            }}
            viewport={viewport}
          />
        );
      case 'testimonials':
      case 'faq':
      case 'newsletter':
      case 'contact':
      case 'features':
      case 'gallery':
        return <MarketingSection section={sec} theme={theme} viewport={viewport} />;
      case 'footer':
        return (
          <FooterSection
            section={sec}
            theme={theme}
            pages={allPages}
            onNavigate={onNavigatePage}
            viewport={viewport}
          />
        );
      default:
        return (
          <div className="p-8 border border-dashed border-stone-300 text-center text-xs text-stone-500">
            Unrecognized section type: {sec.type}
          </div>
        );
    }
  };

  return (
    <div 
      className="w-full min-h-screen flex flex-col transition-colors relative"
      style={{
        backgroundColor: theme.colors.background,
        color: theme.colors.text,
        fontFamily: theme.typography.bodyFont,
      }}
    >
      {/* Sections List */}
      {page.sections.map((section, idx) => {
        const isSelected = isBuilderMode && selectedSectionId === section.id;
        const isFirst = idx === 0;
        const isLast = idx === page.sections.length - 1;

        if (!section.visible && !isBuilderMode) {
          return null;
        }

        return (
          <div
            key={section.id}
            onClick={(e) => {
              if (isBuilderMode && onSelectSection) {
                e.stopPropagation();
                onSelectSection(section.id);
              }
            }}
            className={`relative group transition-all ${
              !section.visible && isBuilderMode ? 'opacity-40 grayscale-[50%]' : ''
            } ${
              isBuilderMode
                ? isSelected
                  ? 'ring-2 ring-amber-500 ring-offset-2 z-20 shadow-md'
                  : 'hover:ring-1 hover:ring-blue-400'
                : ''
            }`}
          >
            {/* BUILDER ACTION TOOLBAR (Shown on select/hover in builder) */}
            {isBuilderMode && (
              <div 
                className={`absolute top-2 right-2 sm:right-4 z-30 flex items-center gap-1 sm:gap-1.5 p-1 rounded-xl bg-black/85 text-white backdrop-blur-md shadow-lg transition-opacity duration-200 max-w-[calc(100%-1rem)] overflow-x-auto ${
                  isSelected ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
                }`}
                onClick={(e) => e.stopPropagation()}
              >
                {/* Section Name Tag */}
                <span className="text-[9px] sm:text-[10px] font-mono uppercase tracking-wider px-1.5 sm:px-2 font-bold text-amber-400 border-r border-white/20 shrink-0">
                  {section.name}
                </span>

                {/* Move Up */}
                <button
                  disabled={isFirst}
                  onClick={() => onMoveUp && onMoveUp(idx)}
                  className="p-1 hover:bg-white/20 rounded disabled:opacity-30 cursor-pointer"
                  title="Move section up"
                  aria-label="Move Up"
                >
                  <ChevronUp className="w-3.5 h-3.5" />
                </button>

                {/* Move Down */}
                <button
                  disabled={isLast}
                  onClick={() => onMoveDown && onMoveDown(idx)}
                  className="p-1 hover:bg-white/20 rounded disabled:opacity-30 cursor-pointer"
                  title="Move section down"
                  aria-label="Move Down"
                >
                  <ChevronDown className="w-3.5 h-3.5" />
                </button>

                {/* Toggle Visibility */}
                <button
                  onClick={() => onToggleVisibility && onToggleVisibility(section.id)}
                  className="p-1 hover:bg-white/20 rounded cursor-pointer"
                  title={section.visible ? 'Hide section' : 'Show section'}
                  aria-label="Toggle Visibility"
                >
                  {section.visible ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5 text-amber-400" />}
                </button>

                {/* Duplicate */}
                <button
                  onClick={() => onDuplicate && onDuplicate(section.id)}
                  className="p-1 hover:bg-white/20 rounded cursor-pointer"
                  title="Duplicate section"
                  aria-label="Duplicate"
                >
                  <Copy className="w-3.5 h-3.5" />
                </button>

                {/* Delete */}
                <button
                  onClick={() => onDelete && onDelete(section.id)}
                  className="p-1 hover:bg-red-500 rounded cursor-pointer text-red-300 hover:text-white"
                  title="Delete section"
                  aria-label="Delete"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            )}

            {/* Render the actual section component */}
            {renderSectionComponent(section)}
          </div>
        );
      })}

      {/* =========================================================================
          INTERACTIVE PRODUCT QUICK DETAIL MODAL
          ========================================================================= */}
      {inspectProduct && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in"
          onClick={() => setInspectProduct(null)}
        >
          <div 
            className="w-full max-w-2xl rounded-3xl overflow-hidden shadow-2xl border text-start animate-in zoom-in-95"
            style={{
              backgroundColor: theme.colors.surface,
              borderColor: theme.colors.border,
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="grid grid-cols-1 sm:grid-cols-2">
              <div className="aspect-square bg-stone-100 dark:bg-stone-900 overflow-hidden">
                <img 
                  src={inspectProduct.images[0]} 
                  alt={inspectProduct.name} 
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="p-6 flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono tracking-wider uppercase font-bold text-stone-500">
                      {inspectProduct.category}
                    </span>
                    <button 
                      onClick={() => setInspectProduct(null)}
                      className="p-1 rounded-full hover:bg-stone-100 cursor-pointer"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>

                  <h3 className="font-bold text-lg leading-tight" style={{ color: theme.colors.text }}>
                    {inspectProduct.name}
                  </h3>

                  <div className="text-sm font-bold font-mono" style={{ color: theme.colors.accent }}>
                    {inspectProduct.priceEgp.toLocaleString()} {currency}
                  </div>

                  <p className="text-xs text-stone-500 leading-relaxed line-clamp-3">
                    {inspectProduct.description}
                  </p>

                  <div className="pt-3 border-t text-[11px] space-y-1 font-mono text-stone-600 dark:text-stone-400" style={{ borderColor: theme.colors.border }}>
                    <div>Dimensions: {inspectProduct.dimensions}</div>
                    <div>Materials: {inspectProduct.materials}</div>
                    <div className="text-emerald-600 font-bold">✓ Ready for Cairo White-Glove Dispatch</div>
                  </div>
                </div>

                <button
                  onClick={() => {
                    handleAddToCart(inspectProduct);
                    setInspectProduct(null);
                  }}
                  className="w-full py-3 rounded-xl text-xs font-bold uppercase tracking-wider transition shadow-md flex items-center justify-center gap-2 cursor-pointer"
                  style={{
                    backgroundColor: theme.colors.primary,
                    color: theme.colors.background,
                  }}
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>Add to Shopping Bag</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* =========================================================================
          INTERACTIVE SHOPPING BAG SLIDE-OUT DRAWER
          ========================================================================= */}
      {isCartOpen && (
        <div 
          className="fixed inset-0 z-50 flex justify-end bg-black/50 backdrop-blur-xs animate-in fade-in"
          onClick={() => setIsCartOpen(false)}
        >
          <div 
            className="w-full max-w-md h-full bg-white dark:bg-[#1A1815] p-6 flex flex-col justify-between shadow-2xl border-l animate-in slide-in-from-right duration-300"
            style={{ borderColor: theme.colors.border }}
            onClick={(e) => e.stopPropagation()}
          >
            <div>
              <div className="flex items-center justify-between pb-4 border-b" style={{ borderColor: theme.colors.border }}>
                <div className="flex items-center gap-2">
                  <ShoppingBag className="w-5 h-5" style={{ color: theme.colors.accent }} />
                  <h3 className="font-bold text-base">Shopping Bag ({totalItemCount})</h3>
                </div>
                <button 
                  onClick={() => setIsCartOpen(false)}
                  className="p-1 rounded-full hover:bg-stone-100 cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Items List */}
              <div className="py-4 space-y-3 max-h-[60vh] overflow-y-auto">
                {cartItems.length === 0 ? (
                  <div className="py-12 text-center text-xs text-stone-500">
                    Your shopping bag is empty.
                  </div>
                ) : (
                  cartItems.map((item) => (
                    <div 
                      key={item.product.id}
                      className="flex items-center gap-3 p-2.5 rounded-xl border"
                      style={{ borderColor: theme.colors.border }}
                    >
                      <img 
                        src={item.product.images[0]} 
                        alt={item.product.name} 
                        className="w-14 h-14 object-cover rounded-lg shrink-0"
                      />
                      <div className="flex-1 text-start min-w-0">
                        <h4 className="text-xs font-bold truncate">{item.product.name}</h4>
                        <span className="text-[11px] font-mono text-stone-500 block">
                          {item.product.priceEgp.toLocaleString()} {currency} × {item.quantity}
                        </span>
                      </div>
                      <button
                        onClick={() => handleRemoveFromCart(item.product.id)}
                        className="p-1 text-stone-400 hover:text-red-500 rounded cursor-pointer"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* Cart Footer */}
            <div className="pt-4 border-t space-y-3" style={{ borderColor: theme.colors.border }}>
              <div className="flex items-center justify-between text-sm font-bold">
                <span>Subtotal:</span>
                <span className="font-mono text-base" style={{ color: theme.colors.accent }}>
                  {cartTotal.toLocaleString()} {currency}
                </span>
              </div>
              <p className="text-[10px] text-stone-400">
                White-glove assembly in Cairo/Giza & CBE Certified checkout included.
              </p>
              <button
                disabled={cartItems.length === 0}
                onClick={() => alert('Demo checkout completed! In production this submits order to your store management dashboard.')}
                className="w-full py-3.5 rounded-xl text-xs font-bold uppercase tracking-wider transition shadow-md disabled:opacity-50 cursor-pointer flex items-center justify-center gap-2"
                style={{
                  backgroundColor: theme.colors.primary,
                  color: theme.colors.background,
                }}
              >
                <span>Proceed to Store Checkout</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

