import { SectionType, StoreSection } from '../types';

export interface SectionCatalogItem {
  id: string;
  type: SectionType;
  variant: string;
  category: 'Header & Navigation' | 'Hero Sections' | 'Products' | 'Brand & Content' | 'Marketing' | 'Footer';
  name: string;
  description: string;
  thumbnail: string;
  createDefault: (id: string) => StoreSection;
}

export const SECTION_CATALOG: SectionCatalogItem[] = [
  // 1. HERO SECTIONS
  {
    id: 'hero-split-modern',
    type: 'hero',
    variant: 'hero-split',
    category: 'Hero Sections',
    name: 'Editorial Split Hero',
    description: 'High-contrast typography with oversized architectural living room image and dual CTA buttons.',
    thumbnail: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=600&q=80',
    createDefault: (id: string): StoreSection => ({
      id,
      type: 'hero',
      variant: 'hero-split',
      name: 'Editorial Split Hero',
      visible: true,
      content: {
        tag: '2026 SIGNATURE LINE',
        title: 'Modern Architecture Crafted for Bespoke Living',
        subtitle: 'Experience true-to-scale designer furniture with certified Italian marble, rich walnut, and tactile bouclé textiles.',
        primaryButtonText: 'Shop New Arrivals',
        primaryButtonLink: '/shop',
        secondaryButtonText: 'Explore Collections',
        secondaryButtonLink: '/collections',
        imageUrl: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=85',
      },
      design: {
        paddingTop: 'lg',
        paddingBottom: 'lg',
        containerWidth: 'wide',
        textAlign: 'left',
      },
    }),
  },
  {
    id: 'hero-full-cinematic',
    type: 'hero',
    variant: 'hero-full',
    category: 'Hero Sections',
    name: 'Full-Width Cinematic Showcase',
    description: 'Immersive full-bleed background photograph with central luxury copy and floating glassmorphic badges.',
    thumbnail: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=600&q=80',
    createDefault: (id: string): StoreSection => ({
      id,
      type: 'hero',
      variant: 'hero-full',
      name: 'Full-Width Cinematic Showcase',
      visible: true,
      content: {
        tag: 'ATELIER FLAGSHIP',
        title: 'Quiet Luxury. Timeless Form.',
        subtitle: 'Sculpted for private residences and curated penthouses in Cairo and Sheikh Zayed.',
        primaryButtonText: 'Discover The Atelier',
        primaryButtonLink: '/shop',
        imageUrl: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1600&q=85',
      },
      design: {
        paddingTop: 'xl',
        paddingBottom: 'xl',
        containerWidth: 'full',
        textAlign: 'center',
        overlayOpacity: 0.45,
      },
    }),
  },

  // 2. PRODUCTS SECTIONS
  {
    id: 'products-grid-4col',
    type: 'products',
    variant: 'products-grid',
    category: 'Products',
    name: 'Curated 4-Column Product Grid',
    description: 'Displays certified furniture pieces with pricing, dimensions badge, category, and quick add-to-bag action.',
    thumbnail: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=600&q=80',
    createDefault: (id: string): StoreSection => ({
      id,
      type: 'products',
      variant: 'products-grid',
      name: 'Curated 4-Column Product Grid',
      visible: true,
      content: {
        tag: 'CURATED ATELIER PIECES',
        title: 'Showroom Masterpieces',
        subtitle: 'Each design twin is manufactured with high-resilience ergonomics and premium certified upholstery.',
        productCount: 4,
        primaryButtonText: 'Explore Entire Collection',
        primaryButtonLink: '/shop',
      },
      design: {
        paddingTop: 'lg',
        paddingBottom: 'lg',
        containerWidth: 'wide',
      },
    }),
  },
  {
    id: 'products-carousel-featured',
    type: 'products',
    variant: 'products-carousel',
    category: 'Products',
    name: 'Featured Best-Sellers Ribbon',
    description: 'Horizontal scrollable luxury furniture ribbon showcasing best-sellers with EGP pricing and dimensions.',
    thumbnail: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=600&q=80',
    createDefault: (id: string): StoreSection => ({
      id,
      type: 'products',
      variant: 'products-carousel',
      name: 'Featured Best-Sellers Ribbon',
      visible: true,
      content: {
        tag: 'BEST SELLERS',
        title: 'Most Desired Living Room Elements',
        subtitle: 'Hand-selected by Cairo’s leading architectural interior studios.',
        productCount: 6,
      },
      design: {
        paddingTop: 'md',
        paddingBottom: 'lg',
        containerWidth: 'wide',
      },
    }),
  },

  // 3. BRAND & CONTENT SECTIONS
  {
    id: 'brand-craftsmanship-split',
    type: 'brand',
    variant: 'brand-split',
    category: 'Brand & Content',
    name: 'Artisan Craftsmanship & Materials',
    description: 'Two-column story highlight showcasing Italian Statuario marble, solid American oak, and artisan joins.',
    thumbnail: 'https://images.unsplash.com/photo-1533090161767-e6ffed986c88?auto=format&fit=crop&w=600&q=80',
    createDefault: (id: string): StoreSection => ({
      id,
      type: 'brand',
      variant: 'brand-split',
      name: 'Artisan Craftsmanship',
      visible: true,
      content: {
        tag: 'HONEST MATERIALS',
        title: 'Crafted Without Compromise for Generations',
        description: 'Every dining table and credenza begins with hand-selected solid European hardwoods and raw marble quarried in Carrara. We preserve natural fissures, grain character, and tactile authenticity.',
        imageUrl: 'https://images.unsplash.com/photo-1533090161767-e6ffed986c88?auto=format&fit=crop&w=1200&q=85',
        primaryButtonText: 'Learn About Our Workshop',
        primaryButtonLink: '/about',
      },
      design: {
        paddingTop: 'lg',
        paddingBottom: 'lg',
        containerWidth: 'wide',
        backgroundColor: '#EBE5DC',
      },
    }),
  },

  // 4. MARKETING SECTIONS
  {
    id: 'testimonials-luxury-cards',
    type: 'testimonials',
    variant: 'testimonials-cards',
    category: 'Marketing',
    name: 'Designer & Architect Reviews',
    description: 'High-credibility quotation cards featuring verified Egyptian interior designers and home collectors.',
    thumbnail: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=600&q=80',
    createDefault: (id: string): StoreSection => ({
      id,
      type: 'testimonials',
      variant: 'testimonials-cards',
      name: 'Designer & Architect Reviews',
      visible: true,
      content: {
        tag: 'CLIENT PERSPECTIVES',
        title: 'Endorsed by Leading Architects',
        items: [
          {
            id: 'item-1',
            title: 'Exceptional Proportions & Finish',
            description: 'The Caelum curved sectional fit our Palm Hills penthouse living room flawlessly. The bouclé fabric quality is unmatched.',
            subtitle: 'Karim Sherif · Lead Architect, Studio K',
            rating: 5,
          },
          {
            id: 'item-2',
            title: 'True Statuario Masterpiece',
            description: 'Ordering custom marble coffee tables used to take 8 weeks. Palazzo delivered exact honed beauty with white-glove care in 5 days.',
            subtitle: 'Salma El-Badry · Interior Designer, New Cairo',
            rating: 5,
          },
        ],
      },
      design: {
        paddingTop: 'lg',
        paddingBottom: 'lg',
        containerWidth: 'wide',
      },
    }),
  },
  {
    id: 'faq-accordion-concierge',
    type: 'faq',
    variant: 'faq-accordion',
    category: 'Marketing',
    name: 'Bespoke Ordering FAQ',
    description: 'Expandable accordion answering questions about white-glove delivery, custom dimensions, and warranties.',
    thumbnail: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=600&q=80',
    createDefault: (id: string): StoreSection => ({
      id,
      type: 'faq',
      variant: 'faq-accordion',
      name: 'Bespoke Ordering FAQ',
      visible: true,
      content: {
        tag: 'CLIENT QUESTIONS',
        title: 'Frequently Asked Questions',
        subtitle: 'Everything you need to know about bespoke manufacturing, white-glove logistics in Cairo, and fabric warranties.',
        items: [
          {
            id: 'faq-1',
            title: 'How long does delivery take across Cairo & Giza?',
            description: 'In-stock showroom pieces are scheduled for white-glove room assembly within 48 to 72 hours. Custom bespoke textile or timber dimensions typically ship in 14-21 days.',
          },
          {
            id: 'faq-2',
            title: 'Can I request fabric swatches before placing an order?',
            description: 'Yes. We provide complimentary curated swatch boxes including our Italian textured bouclé, Belgian linen, and top-grain semi-aniline leather samples directly to your doorstep.',
          },
          {
            id: 'faq-3',
            title: 'What payment options and installment plans are supported?',
            description: 'We accept instant bank transfers via InstaPay (IPN), Meeza national debit cards, all major credit cards, and 0% interest installments through ValU.',
          },
        ],
      },
      design: {
        paddingTop: 'lg',
        paddingBottom: 'lg',
        containerWidth: 'wide',
      },
    }),
  },
  {
    id: 'newsletter-luxury-invite',
    type: 'newsletter',
    variant: 'newsletter-minimal',
    category: 'Marketing',
    name: 'VIP Private Client Invitation',
    description: 'Understated newsletter subscription box with dark alabaster background and private client messaging.',
    thumbnail: 'https://images.unsplash.com/photo-1595428774223-ef52624120d2?auto=format&fit=crop&w=600&q=80',
    createDefault: (id: string): StoreSection => ({
      id,
      type: 'newsletter',
      variant: 'newsletter-minimal',
      name: 'VIP Private Client Invitation',
      visible: true,
      content: {
        tag: 'VIP ACCESS',
        title: 'Join the Private Collectors Circle',
        subtitle: 'Receive first notice on limited seasonal capsule drops and private showroom preview events in Sheikh Zayed.',
        primaryButtonText: 'Request Invitation',
      },
      design: {
        paddingTop: 'lg',
        paddingBottom: 'lg',
        containerWidth: 'wide',
        backgroundColor: '#1E1E1E',
        textColor: '#F6F3EE',
      },
    }),
  },
];

