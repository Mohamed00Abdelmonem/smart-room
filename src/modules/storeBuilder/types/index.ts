export type DeviceViewport = 'desktop' | 'tablet' | 'mobile';

export type BuilderSidebarTab = 'pages' | 'sections' | 'layers' | 'styles' | 'ai';

export interface GlobalThemeSettings {
  brandName: string;
  tagline: string;
  logoUrl?: string;
  faviconUrl?: string;
  colors: {
    primary: string;
    secondary: string;
    accent: string;
    background: string;
    surface: string;
    text: string;
    mutedText: string;
    border: string;
  };
  typography: {
    headingFont: 'Playfair Display' | 'Plus Jakarta Sans' | 'Inter' | 'Alexandria';
    bodyFont: 'Plus Jakarta Sans' | 'Inter' | 'Alexandria';
    baseSize: number; // in px, e.g. 16
    headingWeight: 'normal' | 'medium' | 'bold' | 'extrabold';
  };
  layout: {
    containerMaxWidth: '1200px' | '1320px' | '1440px' | 'full';
    sectionSpacing: 'compact' | 'normal' | 'relaxed';
    borderRadius: 'none' | 'sm' | 'md' | 'lg' | 'full';
    buttonStyle: 'rounded' | 'pill' | 'sharp';
  };
}

export type SectionType = 
  | 'header'
  | 'hero'
  | 'products'
  | 'brand'
  | 'gallery'
  | 'features'
  | 'testimonials'
  | 'newsletter'
  | 'faq'
  | 'contact'
  | 'footer';

export interface SectionDesignSettings {
  backgroundColor?: string;
  textColor?: string;
  paddingTop?: 'none' | 'sm' | 'md' | 'lg' | 'xl';
  paddingBottom?: 'none' | 'sm' | 'md' | 'lg' | 'xl';
  containerWidth?: 'boxed' | 'wide' | 'full';
  textAlign?: 'left' | 'center' | 'right';
  overlayOpacity?: number; // 0 to 1
  backgroundImage?: string;
  borderRadius?: 'none' | 'sm' | 'md' | 'lg' | 'xl';
  shadow?: 'none' | 'sm' | 'md' | 'lg';
  borderBottom?: boolean;
}

export interface SectionContent {
  title?: string;
  subtitle?: string;
  tag?: string;
  description?: string;
  primaryButtonText?: string;
  primaryButtonLink?: string;
  secondaryButtonText?: string;
  secondaryButtonLink?: string;
  imageUrl?: string;
  videoUrl?: string;
  secondaryImageUrl?: string;
  // Dynamic collections/products settings
  collectionId?: string;
  productCount?: number;
  productCategory?: string;
  // Multiple repeatable items (e.g. features, testimonials, FAQ, links)
  items?: Array<{
    id: string;
    title: string;
    subtitle?: string;
    description?: string;
    icon?: string;
    imageUrl?: string;
    price?: number | string;
    rating?: number;
    link?: string;
    tag?: string;
  }>;
}

export interface StoreSection {
  id: string;
  type: SectionType;
  variant: string; // e.g., 'hero-split', 'hero-full', 'products-grid', 'products-carousel'
  name: string;
  visible: boolean;
  content: SectionContent;
  design: SectionDesignSettings;
}

export interface StorePage {
  id: string;
  title: string;
  slug: string;
  isHome: boolean;
  isPublished: boolean;
  seoTitle?: string;
  seoDescription?: string;
  sections: StoreSection[];
}

export interface StoreProduct {
  id: string;
  name: string;
  slug: string;
  priceEgp: number;
  compareAtPriceEgp?: number;
  category: string;
  collection: string;
  dimensions: string; // e.g. '210W x 95D x 82H cm'
  materials: string; // e.g. 'Solid Ash & Top Grain Leather'
  inStock: boolean;
  stockCount: number;
  featured: boolean;
  isNew: boolean;
  images: string[];
  description: string;
}

export interface StoreOrder {
  id: string;
  orderNumber: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  totalEgp: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  itemsCount: number;
  createdAt: string;
  paymentMethod: string;
}

export interface StoreCustomer {
  id: string;
  name: string;
  email: string;
  phone: string;
  city: string;
  ordersCount: number;
  totalSpentEgp: number;
  lastOrderDate: string;
}

export interface FurnitureStore {
  id: string;
  tenantId: string;
  storeName: string;
  storeSlug: string;
  tagline: string;
  currency: string;
  isPublished: boolean;
  publishedAt?: string;
  theme: GlobalThemeSettings;
  pages: StorePage[];
  products: StoreProduct[];
  orders: StoreOrder[];
  customers: StoreCustomer[];
  categories: string[];
  collections: string[];
}

