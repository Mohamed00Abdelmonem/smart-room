export type ProductCategory = 
  | 'all'
  | 'sofas'
  | 'tables'
  | 'chairs'
  | 'storage'
  | 'lighting'
  | 'rugs';

export type RoomStyle = 
  | 'Modern'
  | 'Minimalist'
  | 'Contemporary'
  | 'Scandinavian'
  | 'Classic'
  | 'Luxury';

export type RoomType = 
  | 'Living Room'
  | 'Master Bedroom'
  | 'Dining Room'
  | 'Home Office'
  | 'Open Penthouse';

export interface ProductDimensions {
  widthCm: number;
  depthCm: number;
  heightCm: number;
  seatHeightCm?: number;
}

export interface FurnitureProduct {
  id: string;
  sku: string;
  name: string;
  nameAr?: string;
  category: ProductCategory;
  categoryAr?: string;
  priceEgp: number;
  originalPriceEgp?: number;
  dimensions: ProductDimensions;
  style: RoomStyle;
  styleAr?: string;
  collection: string;
  collectionAr?: string;
  material: string;
  materialAr?: string;
  colors: string[];
  colorsAr?: string[];
  inStock: boolean;
  stockLocation: string;
  stockLocationAr?: string;
  image: string;
  alternateImages?: string[];
  description: string;
  descriptionAr?: string;
  clearanceNotes?: string;
  clearanceNotesAr?: string;
  features: string[];
  featuresAr?: string[];
  isFeatured?: boolean;
}

export interface CartItem {
  product: FurnitureProduct;
  quantity: number;
  selectedColor?: string;
}

export type RoomValidationStatus = 'analyzing' | 'valid' | 'invalid' | 'uncertain';

export interface RoomValidationResult {
  status: RoomValidationStatus;
  confidenceScore: number; // 0 - 100%
  isInterior: boolean;
  floorPlaneDetected: boolean;
  lightingScore: 'Optimal' | 'Low' | 'Overexposed';
  obstructionLevel: 'Low' | 'Moderate' | 'Heavy';
  title: string;
  titleAr: string;
  message: string;
  messageAr: string;
  rejectionReason?: 
    | 'portrait_or_person'
    | 'animal_or_pet'
    | 'outdoor_landscape'
    | 'product_only'
    | 'dark_or_blurry'
    | 'unrelated_screenshot'
    | 'heavy_obstruction';
  details: {
    category: string;
    categoryAr: string;
    wallsDetected: boolean;
    roomPerspective: string;
    roomPerspectiveAr: string;
    suitableFor3D: boolean;
    detectedObstaclesCount?: number;
  };
}

export interface UploadedRoomPhoto {
  id: string;
  url: string;
  angleLabel: 'Front Perspective' | 'Corner Angle' | 'Opposite Wall' | 'Wide Room View';
  angleLabelAr?: string;
  isPrimary: boolean;
  dimensionsEstimated?: string;
  validationResult?: RoomValidationResult;
}

export interface DesignProposal {
  id: string;
  proposalNumber: number;
  code: string;
  title: string;
  titleAr: string;
  conceptTag: string;
  conceptTagAr: string;
  style: RoomStyle;
  styleAr: string;
  description: string;
  descriptionAr: string;
  palette: { name: string; nameAr: string; hex: string }[];
  previewImageUrl: string;
  beforeImageUrl: string;
  selectedProducts: FurnitureProduct[];
  totalCostEgp: number;
  budgetEgp: number;
  spaceUtilizationScore: number; // e.g. 84%
  clearanceRating: 'Optimal' | 'Spacious' | 'Cozy';
  clearanceRatingAr: string;
  clearanceNotes: string;
  clearanceNotesAr: string;
  features: string[];
  featuresAr: string[];
  hotspots: {
    id: string;
    productId: string;
    x: number;
    y: number;
    label: string;
    labelAr?: string;
  }[];
}

export interface RoomDesignState {
  roomType: RoomType;
  dimensions: {
    widthM: number;
    lengthM: number;
    heightM: number;
    unit: 'meters' | 'feet';
  };
  doorsCount: number;
  windowsCount: number;
  style: RoomStyle;
  budgetEgp: number;
  prompt: string;
  requiredPieces: string[];
  uploadedPhotos: UploadedRoomPhoto[];
}

export interface FurnishedRoomDesignResult {
  id: string;
  title: string;
  titleAr?: string;
  style: RoomStyle;
  originalImageUrl: string;
  furnishedImageUrl: string;
  generatedAt: string;
  roomDimensionsLabel: string;
  totalCostEgp: number;
  budgetEgp: number;
  selectedProducts: FurnitureProduct[];
  designNotes: string;
  designNotesAr?: string;
  hotspots: {
    id: string;
    productId: string;
    x: number; // percentage 0-100
    y: number; // percentage 0-100
    label: string;
    labelAr?: string;
  }[];
}
