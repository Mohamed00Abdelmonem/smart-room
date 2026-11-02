import { FurnishedRoomDesignResult, UploadedRoomPhoto } from '../types';
import { LUXURY_PRODUCTS } from './products';

export interface SampleRoomPreset {
  id: string;
  title: string;
  type: string;
  dimensions: string;
  emptyImage: string;
  furnishedImage: string;
  style: string;
  description: string;
}

export const SAMPLE_ROOM_PRESETS: SampleRoomPreset[] = [
  {
    id: 'room-cairo-living',
    title: 'Sheikh Zayed Sunlit Living Room',
    type: 'Living Room',
    dimensions: '5.0m × 4.0m (20 m²)',
    emptyImage: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1600&q=80',
    furnishedImage: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1600&q=80',
    style: 'Warm Minimalist',
    description: 'Generous daylight living room with natural oak flooring and 2.9m ceiling height in Sheikh Zayed penthouse.',
  },
  {
    id: 'room-penthouse-dining',
    title: 'New Cairo Open-Concept Lounge & Dining',
    type: 'Open Penthouse',
    dimensions: '6.2m × 4.5m (28 m²)',
    emptyImage: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1600&q=80',
    furnishedImage: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=80',
    style: 'Modern Architectural',
    description: 'Floor-to-ceiling panoramic glass windows overlooking landscaped gardens.',
  },
  {
    id: 'room-master-suite',
    title: 'Zamalek Heritage Apartment Suite',
    type: 'Master Bedroom',
    dimensions: '4.8m × 3.8m (18.2 m²)',
    emptyImage: 'https://images.unsplash.com/photo-1598928506311-c55ded91a20c?auto=format&fit=crop&w=1600&q=80',
    furnishedImage: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=1600&q=80',
    style: 'Contemporary Chic',
    description: 'High 3.2m ornate cornices with gentle north-facing diffused daylight.',
  },
];

export const DEFAULT_PRESET_PHOTOS: UploadedRoomPhoto[] = [
  {
    id: 'preset-photo-1',
    url: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1600&q=80',
    angleLabel: 'Front Perspective',
    angleLabelAr: 'المنظور الأمامي',
    isPrimary: true,
    dimensionsEstimated: '5.0m wide × 4.0m deep wall',
    validationResult: {
      status: 'valid',
      confidenceScore: 98,
      isInterior: true,
      floorPlaneDetected: true,
      lightingScore: 'Optimal',
      obstructionLevel: 'Low',
      title: 'Room Image Verified',
      titleAr: 'غرفة داخلية معتمدة ومؤكدة',
      message: "Room image verified. You're ready to continue with spatial styling.",
      messageAr: 'تم التحقق من بيئة الغرفة بنجاح. المساحة مهيأة ومطابقة لمعايير التوزيع الهندسي للأثاث.',
      details: {
        category: 'Residential Interior Room',
        categoryAr: 'غرفة سكنية داخلية',
        wallsDetected: true,
        roomPerspective: 'Wide Front Perspective (98% Confidence)',
        roomPerspectiveAr: 'منظور أمامي واسع (دقة 98%)',
        suitableFor3D: true,
      },
    },
  },
  {
    id: 'preset-photo-2',
    url: 'https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=1600&q=80',
    angleLabel: 'Corner Angle',
    angleLabelAr: 'زاوية الغرفة الجانبية',
    isPrimary: false,
    dimensionsEstimated: 'Window wall clearance 2.4m',
    validationResult: {
      status: 'valid',
      confidenceScore: 93,
      isInterior: true,
      floorPlaneDetected: true,
      lightingScore: 'Optimal',
      obstructionLevel: 'Low',
      title: 'Corner Perspective Verified',
      titleAr: 'زاوية جانبية معتمدة',
      message: 'Visible window wall and floor corner vector verified.',
      messageAr: 'تم التحقق من جدار النافذة وزاوية التقاء الأرضية بنجاح.',
      details: {
        category: 'Residential Interior Room',
        categoryAr: 'غرفة سكنية داخلية',
        wallsDetected: true,
        roomPerspective: 'Corner Perspective (93% Confidence)',
        roomPerspectiveAr: 'منظور زاوي جانبي (دقة 93%)',
        suitableFor3D: true,
      },
    },
  },
  {
    id: 'preset-photo-3',
    url: 'https://images.unsplash.com/photo-1512915922686-57c11dde9b6b?auto=format&fit=crop&w=1600&q=80',
    angleLabel: 'Opposite Wall',
    angleLabelAr: 'الجدار المقابل',
    isPrimary: false,
    dimensionsEstimated: 'Balcony access door clearance',
    validationResult: {
      status: 'valid',
      confidenceScore: 95,
      isInterior: true,
      floorPlaneDetected: true,
      lightingScore: 'Optimal',
      obstructionLevel: 'Low',
      title: 'Opposite Wall Verified',
      titleAr: 'الجدار المقابل معتمد',
      message: 'Doorway clearance and opposite wall coordinates verified.',
      messageAr: 'تم رصد فتحة الباب والمسار المقابل بدقة.',
      details: {
        category: 'Residential Interior Room',
        categoryAr: 'غرفة سكنية داخلية',
        wallsDetected: true,
        roomPerspective: 'Opposite Wall Vector (95% Confidence)',
        roomPerspectiveAr: 'متجه الجدار المقابل (دقة 95%)',
        suitableFor3D: true,
      },
    },
  },
];

export const INITIAL_DESIGN_RESULT: FurnishedRoomDesignResult = {
  id: 'roomora-design-88219',
  title: 'Curated Warm Minimalist Living Room Suite',
  style: 'Minimalist',
  originalImageUrl: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1600&q=80',
  furnishedImageUrl: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1600&q=80',
  generatedAt: 'Just now',
  roomDimensionsLabel: '5.0m × 4.0m (2.9m Ceiling Height)',
  budgetEgp: 80000,
  totalCostEgp: 78500, // 48,500 (sofa special bundle) + 14,800 (table) + 18,500 (media unit) with special retail package
  selectedProducts: [
    LUXURY_PRODUCTS[0], // Caelum Curved L-Sectional Sofa
    LUXURY_PRODUCTS[1], // Aura Statuario Low Coffee Table
    LUXURY_PRODUCTS[2], // Kanso Fluted Oak Media & TV Unit
    LUXURY_PRODUCTS[4], // Seren Hand-Knotted Wool & Silk Rug
  ],
  designNotes: 'Optimized for a 5.0m × 4.0m space. The Caelum L-sectional anchors the main conversation zone leaving a generous 1.2m clear passageway to the balcony. Natural oak fluting on the Kanso media console harmonizes with the honed statuario marble top of the coffee table, maintaining warm beige and organic wood tones.',
  hotspots: [
    {
      id: 'hotspot-1',
      productId: 'sofa-caelum-l',
      x: 48,
      y: 65,
      label: 'Caelum L-Sectional Sofa (285cm)',
    },
    {
      id: 'hotspot-2',
      productId: 'table-aura-marble',
      x: 52,
      y: 78,
      label: 'Aura Statuario Coffee Table (120cm)',
    },
    {
      id: 'hotspot-3',
      productId: 'media-kanso-oak',
      x: 85,
      y: 52,
      label: 'Kanso Oak Media Unit (220cm)',
    },
    {
      id: 'hotspot-4',
      productId: 'rug-seren-wool',
      x: 35,
      y: 84,
      label: 'Seren Hand-Knotted Wool Rug (3x2m)',
    },
  ],
};

