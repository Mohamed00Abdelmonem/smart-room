import React, { useState } from 'react';
import { StoreSection, GlobalThemeSettings, StoreProduct, DeviceViewport } from '../../types';
import { ShoppingBag, Check, Eye } from 'lucide-react';

interface ProductsSectionProps {
  section: StoreSection;
  theme: GlobalThemeSettings;
  products: StoreProduct[];
  currency?: string;
  onAddToCart?: (product: StoreProduct) => void;
  onSelectProduct?: (product: StoreProduct) => void;
  onViewAll?: () => void;
  viewport?: DeviceViewport;
}

export const ProductsSection: React.FC<ProductsSectionProps> = ({
  section,
  theme,
  products,
  currency = 'EGP',
  onAddToCart,
  onSelectProduct,
  onViewAll,
  viewport = 'desktop',
}) => {
  const { content, design } = section;
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [addedId, setAddedId] = useState<string | null>(null);

  const isMobile = viewport === 'mobile';
  const isTablet = viewport === 'tablet';

  const categories = ['all', ...Array.from(new Set(products.map((p) => p.category)))];

  const filtered = products.filter((p) => {
    if (selectedCategory === 'all') return true;
    return p.category === selectedCategory;
  });

  const displayCount = content.productCount || 4;
  const displayedProducts = filtered.slice(0, displayCount);

  const handleAdd = (e: React.MouseEvent, product: StoreProduct) => {
    e.stopPropagation();
    if (onAddToCart) {
      onAddToCart(product);
      setAddedId(product.id);
      setTimeout(() => setAddedId(null), 1400);
    }
  };

  const gridClasses = isMobile
    ? 'grid grid-cols-1 gap-5'
    : isTablet
    ? 'grid grid-cols-2 gap-5'
    : 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8';

  return (
    <section 
      className={`w-full ${isMobile ? 'py-10' : 'py-16 sm:py-24'} transition-colors`}
      style={{
        backgroundColor: design.backgroundColor || theme.colors.surface,
        color: design.textColor || theme.colors.text,
      }}
    >
      <div 
        className="mx-auto px-4 sm:px-6 lg:px-8"
        style={{
          maxWidth: theme.layout.containerMaxWidth === 'full' ? '100%' : theme.layout.containerMaxWidth,
        }}
      >
        {/* Header Block */}
        <div className={`flex flex-col ${isMobile ? 'gap-3' : 'md:flex-row md:items-end justify-between gap-6'} pb-6 sm:pb-8 border-b mb-8 sm:mb-10`} style={{ borderColor: theme.colors.border }}>
          <div className="space-y-1.5 max-w-xl text-start">
            {content.tag && (
              <span 
                className="text-[9px] sm:text-[10px] tracking-[0.2em] font-bold uppercase block"
                style={{ color: theme.colors.accent }}
              >
                {content.tag}
              </span>
            )}
            <h2 
              className={`${isMobile ? 'text-xl' : 'text-2xl sm:text-4xl'} font-bold tracking-tight`}
              style={{ fontFamily: theme.typography.headingFont }}
            >
              {content.title || 'Curated Showroom Masterpieces'}
            </h2>
            {content.subtitle && (
              <p className="text-xs sm:text-sm leading-relaxed" style={{ color: theme.colors.mutedText }}>
                {content.subtitle}
              </p>
            )}
          </div>

          {/* Category Filter Tabs with horizontal overflow on mobile */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 max-w-full">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-lg text-[11px] sm:text-xs uppercase tracking-wider font-semibold transition cursor-pointer whitespace-nowrap shrink-0 ${
                  selectedCategory === cat ? 'shadow-xs' : 'hover:opacity-75'
                }`}
                style={{
                  backgroundColor: selectedCategory === cat ? theme.colors.primary : 'transparent',
                  color: selectedCategory === cat ? theme.colors.background : theme.colors.mutedText,
                  border: selectedCategory === cat ? 'none' : `1px solid ${theme.colors.border}`,
                }}
              >
                {cat === 'all' ? 'All Pieces' : cat}
              </button>
            ))}
          </div>
        </div>

        {/* Products Grid */}
        <div className={gridClasses}>
          {displayedProducts.map((prod) => {
            const isJustAdded = addedId === prod.id;

            return (
              <div
                key={prod.id}
                onClick={() => onSelectProduct && onSelectProduct(prod)}
                className="group flex flex-col rounded-2xl overflow-hidden border transition-all duration-300 hover:shadow-xl cursor-pointer bg-white dark:bg-[#1A1815]"
                style={{ borderColor: theme.colors.border }}
              >
                {/* Product Image Frame */}
                <div className={`relative ${isMobile ? 'aspect-[16/10]' : 'aspect-[4/3]'} overflow-hidden bg-stone-100 dark:bg-stone-900`}>
                  <img
                    src={prod.images[0] || 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc'}
                    alt={prod.name}
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                  />
                  
                  {/* Category Pill */}
                  <span 
                    className="absolute top-2.5 left-2.5 px-2 py-0.5 rounded-md text-[9px] font-mono tracking-wider font-bold uppercase backdrop-blur-md bg-white/85 text-black shadow-xs"
                  >
                    {prod.category}
                  </span>

                  {prod.isNew && (
                    <span 
                      className="absolute top-2.5 right-2.5 px-2 py-0.5 rounded-md text-[9px] font-bold uppercase text-white shadow-xs"
                      style={{ backgroundColor: theme.colors.accent }}
                    >
                      New
                    </span>
                  )}
                </div>

                {/* Details */}
                <div className="p-3.5 sm:p-5 flex-1 flex flex-col justify-between text-start space-y-2.5 sm:space-y-3">
                  <div>
                    <h3 
                      className="font-bold text-sm sm:text-base leading-snug line-clamp-1 group-hover:text-amber-700 transition-colors"
                      style={{ color: theme.colors.text }}
                    >
                      {prod.name}
                    </h3>
                    <p className="text-[10px] sm:text-[11px] font-mono text-stone-500 mt-0.5 line-clamp-1">
                      {prod.dimensions}
                    </p>
                  </div>

                  <div className="pt-2 border-t flex items-center justify-between gap-2" style={{ borderColor: theme.colors.border }}>
                    <div className="min-w-0">
                      <span className="text-xs sm:text-sm font-bold font-mono block truncate" style={{ color: theme.colors.primary }}>
                        {prod.priceEgp.toLocaleString()} {currency}
                      </span>
                    </div>

                    <div className="flex items-center gap-1.5 shrink-0">
                      <button
                        onClick={(e) => handleAdd(e, prod)}
                        className={`p-2 rounded-xl text-xs font-semibold flex items-center gap-1 transition shadow-xs cursor-pointer ${
                          isJustAdded ? 'bg-emerald-600 text-white' : 'hover:opacity-90'
                        }`}
                        style={{
                          backgroundColor: isJustAdded ? '#059669' : theme.colors.primary,
                          color: '#FFFFFF',
                        }}
                        title="Add to Shopping Cart"
                      >
                        {isJustAdded ? <Check className="w-3.5 h-3.5" /> : <ShoppingBag className="w-3.5 h-3.5" />}
                        <span className="hidden sm:inline text-[11px]">{isJustAdded ? 'Added' : 'Add'}</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* View All Button */}
        {products.length > displayCount && (
          <div className="mt-8 sm:mt-12 text-center">
            <button
              onClick={onViewAll}
              className="px-6 py-3 rounded-full text-xs uppercase tracking-wider font-bold transition border cursor-pointer hover:bg-black/5 dark:hover:bg-white/5"
              style={{
                borderColor: theme.colors.border,
                color: theme.colors.text,
              }}
            >
              Explore All {products.length} Furniture Pieces
            </button>
          </div>
        )}
      </div>
    </section>
  );
};
