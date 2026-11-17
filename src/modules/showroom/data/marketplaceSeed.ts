import { LUXURY_PRODUCTS } from '../../../data/products';
import type { MarketplaceBrand, MarketplacePlace, MarketplaceProduct } from '../types';

export const INITIAL_BRANDS: MarketplaceBrand[] = [
  {
    id: 'brand-palazzo',
    name: 'Palazzo Atelier',
    nameAr: 'بالاتزو أتيليه',
    slug: 'palazzo-atelier',
    logo: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=240&q=80',
    coverImage: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1600&q=85',
    description: 'Architectural luxury furniture crafted with Italian Statuario marble, kiln-dried European beechwood, and Belgian bouclé textiles.',
    descriptionAr: 'أثاث معماري فاخر مصنوع من رخام ستاتوريو الإيطالي وخشب الزان الأوروبي المجفف وأقمشة البوكليه البلجيكية.',
    origin: 'Cairo & Milan',
    categories: ['sofas', 'tables', 'chairs'],
    collections: ['Living Room Collection', 'Luxury Collection', 'Modern Collection'],
    featured: true,
    verified: true,
    status: 'published',
    createdAt: '2026-01-10T10:00:00Z',
  },
  {
    id: 'brand-ikea',
    name: 'IKEA Egypt',
    nameAr: 'أيكيا مصر',
    slug: 'ikea',
    logo: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=240&q=80',
    coverImage: 'https://images.unsplash.com/photo-1617806118233-18e1de247200?auto=format&fit=crop&w=1600&q=85',
    description: 'Certified Scandinavian functional furniture designed for modern everyday Egyptian homes with immediate stock fulfillment.',
    descriptionAr: 'أثاث إسكندنافي عملي معتمد مصمم للبيوت المصرية الحديثة مع توافر فوري في المخزون.',
    origin: 'Sweden · Egypt',
    categories: ['sofas', 'tables', 'chairs', 'storage'],
    collections: ['Living Room Collection', 'Dining Collection', 'Bedroom Collection', 'Modern Collection'],
    featured: true,
    verified: true,
    status: 'published',
    createdAt: '2026-01-15T10:00:00Z',
  },
  {
    id: 'brand-kanso',
    name: 'Kanso Nordic Studio',
    nameAr: 'كانسو نورديك استوديو',
    slug: 'kanso-nordic',
    logo: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=240&q=80',
    coverImage: 'https://images.unsplash.com/photo-1598928506311-c55ded91a20c?auto=format&fit=crop&w=1600&q=85',
    description: 'Minimalist solid white oak media units, sculptural lounge chairs, and artisanal highland wool rugs shaped with quiet restraint.',
    descriptionAr: 'وحدات تلفاز من خشب البلوط الأبيض وكراسي استرخاء وسجاد صوف يدوي بتصميم هادئ ومريح.',
    origin: 'Copenhagen & Cairo',
    categories: ['storage', 'chairs', 'rugs'],
    collections: ['Living Room Collection', 'Modern Collection'],
    featured: true,
    verified: true,
    status: 'published',
    createdAt: '2026-02-01T10:00:00Z',
  },
  {
    id: 'brand-solis',
    name: 'Solis & Vesper',
    nameAr: 'سوليس آند فيسبر',
    slug: 'solis-vesper',
    logo: 'https://images.unsplash.com/photo-1533090161767-e6ffed986c88?auto=format&fit=crop&w=240&q=80',
    coverImage: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1600&q=85',
    description: 'Monolithic smoked-walnut credenzas, architectural dining tables, and upholstered dining seating for bespoke villas.',
    descriptionAr: 'كريدنزا خشب الجوز المدخن وطاولات الطعام المعمارية وكراسي السفرة الفاخرة للفلل الحديثة.',
    origin: 'Damietta & Milan',
    categories: ['tables', 'chairs', 'storage'],
    collections: ['Dining Collection', 'Luxury Collection'],
    featured: false,
    verified: true,
    status: 'published',
    createdAt: '2026-02-20T10:00:00Z',
  },
  {
    id: 'brand-helios',
    name: 'Helios Lumière',
    nameAr: 'هيليوس لوميير',
    slug: 'helios-lumiere',
    logo: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=240&q=80',
    coverImage: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=1600&q=85',
    description: 'Hand-carved alabaster floor lamps, brushed brass pendants, and warm sculptural evening luminaires.',
    descriptionAr: 'مصابيح أرضية منحوتة من الألاباستر الطبيعي وثريات نحاسية تمنح غرفتك إضاءة دافئة ساحرة.',
    origin: 'Cairo Atelier',
    categories: ['lighting'],
    collections: ['Luxury Collection', 'Modern Collection'],
    featured: false,
    verified: true,
    status: 'published',
    createdAt: '2026-03-04T10:00:00Z',
  },
];

export const INITIAL_PLACES: MarketplacePlace[] = [
  {
    id: 'place-zayed',
    name: 'Sheikh Zayed Design Flagship',
    nameAr: 'فلاجشيب الشيخ زايد للتصميم',
    slug: 'sheikh-zayed-flagship',
    logo: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=240&q=80',
    coverImage: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1600&q=85',
    description: 'A 2,400 sqm sunlit architectural showroom featuring multi-brand living rooms, material libraries, and VESTA AI Room Consultation suites.',
    descriptionAr: 'معرض معماري بمساحة 2,400 متر مربع يضم صالات عرض متعددة الماركات ومكتبة خامات وأجنحة استشارة بالذكاء الاصطناعي.',
    address: 'Plot 14, Arkan Plaza District, Sheikh Zayed City, Giza',
    addressAr: 'قطعة 14، منطقة أركان بلازا، مدينة الشيخ زايد، الجيزة',
    location: 'Sheikh Zayed',
    locationAr: 'الشيخ زايد',
    contactInfo: {
      phone: '+20 (2) 3851 9900',
      email: 'zayed@vestaia.eg',
      whatsapp: '+20 100 998 2774',
    },
    openingHours: 'Daily 10:00 AM — 10:00 PM',
    openingHoursAr: 'يومياً من 10:00 صباحاً حتى 10:00 مساءً',
    brandIds: ['brand-palazzo', 'brand-solis', 'brand-kanso', 'brand-helios'],
    featured: true,
    status: 'published',
    createdAt: '2026-01-05T10:00:00Z',
  },
  {
    id: 'place-new-cairo',
    name: 'New Cairo Fifth Settlement Hub',
    nameAr: 'مركز التجمع الخامس - القاهرة الجديدة',
    slug: 'new-cairo-hub',
    logo: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=240&q=80',
    coverImage: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=85',
    description: 'Premier destination for New Cairo homeowners showcasing complete multi-brand apartment & villa room vignettes ready for 48-hour dispatch.',
    descriptionAr: 'الوجهة الأولى لسكان القاهرة الجديدة لتصفح غرف كاملة من أشهر الماركات مع تجهيز وشحن خلال 48 ساعة.',
    address: 'Cairo Festival City Axis, 5th Settlement, New Cairo',
    addressAr: 'محور كايرو فستيفال سيتي، التجمع الخامس، القاهرة الجديدة',
    location: 'New Cairo',
    locationAr: 'التجمع الخامس',
    contactInfo: {
      phone: '+20 (2) 2618 4410',
      email: 'newcairo@vestaia.eg',
      whatsapp: '+20 102 441 8890',
    },
    openingHours: 'Daily 10:00 AM — 11:00 PM',
    openingHoursAr: 'يومياً من 10:00 صباحاً حتى 11:00 مساءً',
    brandIds: ['brand-palazzo', 'brand-ikea', 'brand-solis'],
    featured: true,
    status: 'published',
    createdAt: '2026-01-12T10:00:00Z',
  },
  {
    id: 'place-mall-of-arabia',
    name: 'IKEA & Nordic Mall of Arabia',
    nameAr: 'معرض أيكيا ونورديك - مول العرب',
    slug: 'mall-of-arabia',
    logo: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=240&q=80',
    coverImage: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=1600&q=85',
    description: 'Scandinavian showroom floor offering modular sofas, smart storage solutions, and solid wood dining suites with ValU 0% installments.',
    descriptionAr: 'صالة عرض إسكندنافية متكاملة للكنب المعياري وحلول التخزين الذكية وغرف الطعام مع تقسيط ValU 0%.',
    address: 'Gate 4, Mall of Arabia, 6th of October City',
    addressAr: 'بوابة 4، مول العرب، مدينة السادس من أكتوبر',
    location: '6th of October',
    locationAr: '6 أكتوبر',
    contactInfo: {
      phone: '+20 (2) 3826 1120',
      email: 'october@vestaia.eg',
    },
    openingHours: 'Sun–Thu 10:00 AM — 10:00 PM · Fri–Sat till 12 AM',
    openingHoursAr: 'الأحد–الخميس 10 ص – 10 م · الجمعة والسبت حتى 12 منتصف الليل',
    brandIds: ['brand-ikea', 'brand-kanso'],
    featured: true,
    status: 'published',
    createdAt: '2026-01-18T10:00:00Z',
  },
  {
    id: 'place-zamalek',
    name: 'Zamalek Curated Gallery',
    nameAr: 'جاليري الزمالك المختار',
    slug: 'zamalek-gallery',
    logo: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=240&q=80',
    coverImage: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=1600&q=85',
    description: 'Intimate heritage-villa gallery specializing in collectible lighting, marble tables, and private architect trade appointments.',
    descriptionAr: 'معرض بوتيكي في قلب الزمالك متخصص في الإضاءة المعمارية وطاولات الرخام وجلسات مهندسي الديكور.',
    address: '26 July Corridor, Zamalek Island, Cairo',
    addressAr: 'شارع 26 يوليو، جزيرة الزمالك، القاهرة',
    location: 'Zamalek',
    locationAr: 'الزمالك',
    contactInfo: {
      phone: '+20 (2) 2736 8800',
      email: 'zamalek@vestaia.eg',
    },
    openingHours: 'Mon–Sat 11:00 AM — 8:00 PM',
    openingHoursAr: 'الإثنين – السبت من 11:00 صباحاً حتى 8:00 مساءً',
    brandIds: ['brand-palazzo', 'brand-helios', 'brand-kanso', 'brand-solis'],
    featured: false,
    status: 'published',
    createdAt: '2026-02-05T10:00:00Z',
  },
  {
    id: 'place-sahel',
    name: 'Alexandria & Sahel Coastal Pavilion',
    nameAr: 'جناح الإسكندرية والساحل الشمالي',
    slug: 'north-coast-pavilion',
    logo: 'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=240&q=80',
    coverImage: 'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=1600&q=85',
    description: 'Bespoke coastal living hub serving Alexandria residences and North Coast summer villas with weekly climate-controlled deliveries.',
    descriptionAr: 'معرض متخصص في تأثيث فيلات الإسكندرية والساحل الشمالي مع شحن أسبوعي مبرد ومؤمّن.',
    address: 'Kafr Abdo Design Quarter, Alexandria & Sidi Abdel Rahman',
    addressAr: 'حي كفر عبده للتصميم، الإسكندرية وسيدي عبد الرحمن',
    location: 'Alexandria',
    locationAr: 'الإسكندرية',
    contactInfo: {
      phone: '+20 (3) 5420 7710',
      email: 'alexandria@vestaia.eg',
    },
    openingHours: 'Daily 11:00 AM — 9:00 PM',
    openingHoursAr: 'يومياً من 11:00 صباحاً حتى 9:00 مساءً',
    brandIds: ['brand-palazzo', 'brand-kanso', 'brand-ikea'],
    featured: false,
    status: 'published',
    createdAt: '2026-02-12T10:00:00Z',
  },
];

function assignBrandAndStores(id: string, sku: string, category: string): { brandId: string; storeIds: string[] } {
  if (sku.startsWith('IK-')) {
    return {
      brandId: 'brand-ikea',
      storeIds: ['place-mall-of-arabia', 'place-new-cairo', 'place-sahel'],
    };
  }
  if (category === 'lighting' || id.includes('helios')) {
    return {
      brandId: 'brand-helios',
      storeIds: ['place-zamalek', 'place-zayed'],
    };
  }
  if (id.includes('kanso') || id.includes('seren') || id.includes('lumina')) {
    return {
      brandId: 'brand-kanso',
      storeIds: ['place-zayed', 'place-mall-of-arabia', 'place-zamalek', 'place-sahel'],
    };
  }
  if (id.includes('solis') || id.includes('paloma') || id.includes('vesper')) {
    return {
      brandId: 'brand-solis',
      storeIds: ['place-zayed', 'place-new-cairo', 'place-zamalek'],
    };
  }
  return {
    brandId: 'brand-palazzo',
    storeIds: ['place-zayed', 'place-new-cairo', 'place-zamalek', 'place-sahel'],
  };
}

function mapCategoryCollection(category: string): string {
  switch (category) {
    case 'tables':
      return 'Dining Collection';
    case 'storage':
      return 'Modern Collection';
    case 'lighting':
      return 'Luxury Collection';
    default:
      return 'Living Room Collection';
  }
}

export const INITIAL_MARKETPLACE_PRODUCTS: MarketplaceProduct[] = LUXURY_PRODUCTS.map((p, index) => {
  const { brandId, storeIds } = assignBrandAndStores(p.id, p.sku, p.category);
  return {
    id: p.id,
    slug: p.id,
    sku: p.sku,
    name: p.name,
    nameAr: p.nameAr || p.name,
    description: p.description,
    descriptionAr: p.descriptionAr || p.description,
    brandId,
    storeIds,
    categoryId: p.category,
    categoryLabel: p.category.charAt(0).toUpperCase() + p.category.slice(1),
    categoryLabelAr: p.categoryAr || p.category,
    collection: mapCategoryCollection(p.category),
    collectionAr: p.collectionAr,
    style: p.style,
    styleAr: p.styleAr,
    price: p.priceEgp,
    originalPrice: p.originalPriceEgp,
    currency: 'EGP',
    dimensions: { ...p.dimensions },
    materials: p.material,
    materialsAr: p.materialAr || p.material,
    colors: [...p.colors],
    colorsAr: [...(p.colorsAr || p.colors)],
    images: [p.image, ...(p.alternateImages || [])],
    featured: Boolean(p.isFeatured),
    status: 'published',
    createdAt: new Date(Date.UTC(2026, 2, 20 - index)).toISOString(),
    legacyProduct: p,
  };
});
