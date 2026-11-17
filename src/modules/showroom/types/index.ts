import type { FurnitureProduct, ProductCategory, RoomStyle } from '../../../types';

export type ListingStatus = 'published' | 'draft' | 'archived';

export interface MarketplaceBrand {
  id: string;
  name: string;
  nameAr: string;
  slug: string;
  logo: string;
  coverImage: string;
  description: string;
  descriptionAr: string;
  origin: string;
  categories: string[];
  collections: string[];
  featured: boolean;
  verified: boolean;
  status: ListingStatus;
  createdAt: string;
}

export interface MarketplacePlace {
  id: string;
  name: string;
  nameAr: string;
  slug: string;
  logo: string;
  coverImage: string;
  description: string;
  descriptionAr: string;
  address: string;
  addressAr: string;
  location: string; // e.g., "Sheikh Zayed", "New Cairo", "Zamalek", "Alexandria"
  locationAr: string;
  contactInfo: {
    phone: string;
    email: string;
    whatsapp?: string;
  };
  openingHours: string;
  openingHoursAr: string;
  brandIds: string[]; // Associated brands carried at this physical store
  featured: boolean;
  status: ListingStatus;
  createdAt: string;
}

export interface MarketplaceProduct {
  id: string;
  slug: string;
  sku: string;
  name: string;
  nameAr: string;
  description: string;
  descriptionAr: string;
  brandId: string;
  storeIds: string[]; // Many-to-many: a single product record can be stocked at multiple stores
  categoryId: Exclude<ProductCategory, 'all'> | string;
  categoryLabel: string;
  categoryLabelAr: string;
  collection: string;
  collectionAr?: string;
  style: RoomStyle;
  styleAr?: string;
  price: number;
  originalPrice?: number;
  currency: string;
  dimensions: {
    widthCm: number;
    depthCm: number;
    heightCm: number;
    seatHeightCm?: number;
  };
  materials: string;
  materialsAr: string;
  colors: string[];
  colorsAr: string[];
  images: string[];
  featured: boolean;
  status: ListingStatus;
  createdAt: string;
  legacyProduct?: FurnitureProduct;
}

/**
 * Converts a normalized MarketplaceProduct into the platform's shared FurnitureProduct
 * contract so it passes directly into the existing AI Studio / TryInRoomModal without duplication.
 */
export function toStudioFurnitureProduct(
  item: MarketplaceProduct,
  brandName?: string
): FurnitureProduct {
  if (item.legacyProduct) {
    return item.legacyProduct;
  }

  const validCategory = (
    ['sofas', 'tables', 'chairs', 'storage', 'lighting', 'rugs'].includes(item.categoryId)
      ? item.categoryId
      : 'sofas'
  ) as Exclude<ProductCategory, 'all'>;

  return {
    id: item.id,
    sku: item.sku,
    name: item.name,
    nameAr: item.nameAr || item.name,
    category: validCategory,
    categoryAr: item.categoryLabelAr || item.categoryLabel,
    priceEgp: item.price,
    originalPriceEgp: item.originalPrice,
    dimensions: {
      widthCm: item.dimensions.widthCm,
      depthCm: item.dimensions.depthCm,
      heightCm: item.dimensions.heightCm,
      seatHeightCm: item.dimensions.seatHeightCm,
    },
    style: item.style || 'Modern',
    styleAr: item.styleAr || item.style || 'مودرن',
    collection: item.collection || (brandName ? `${brandName} Collection` : 'Showroom Curated'),
    collectionAr: item.collectionAr || item.collection,
    material: item.materials,
    materialAr: item.materialsAr || item.materials,
    colors: item.colors.length > 0 ? item.colors : ['Natural Oat'],
    colorsAr: item.colorsAr.length > 0 ? item.colorsAr : item.colors,
    inStock: true,
    stockLocation: brandName ? `${brandName} Flagship` : 'Cairo Showroom Hub',
    stockLocationAr: brandName ? `معرض ${brandName}` : 'معرض القاهرة الرئيسي',
    image: item.images[0] || 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=1200&q=80',
    alternateImages: item.images.slice(1),
    description: item.description,
    descriptionAr: item.descriptionAr || item.description,
    clearanceNotes: `Recommended minimum clearance: ${Math.max(item.dimensions.widthCm + 80, 240)}cm wall span.`,
    clearanceNotesAr: `المسافة الموصى بها للحائط: ${Math.max(item.dimensions.widthCm + 80, 240)} سم على الأقل.`,
    features: [
      `Brand: ${brandName || 'VESTA Partner'}`,
      `Materials: ${item.materials}`,
      `Dimensions: ${item.dimensions.widthCm}W × ${item.dimensions.depthCm}D × ${item.dimensions.heightCm}H cm`,
    ],
    featuresAr: [
      `العلامة التجارية: ${brandName || 'شريك VESTA'}`,
      `الخامات: ${item.materialsAr || item.materials}`,
      `الأبعاد: ${item.dimensions.widthCm} × ${item.dimensions.depthCm} × ${item.dimensions.heightCm} سم`,
    ],
    isFeatured: item.featured,
  };
}
