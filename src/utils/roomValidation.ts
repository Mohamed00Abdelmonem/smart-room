import { RoomValidationResult, RoomValidationStatus } from '../types';

export interface ValidationScenario {
  id: string;
  label: string;
  labelAr: string;
  category: 'valid' | 'invalid' | 'uncertain';
  imageUrl: string;
  description: string;
  descriptionAr: string;
}

export const TEST_VALIDATION_SCENARIOS: ValidationScenario[] = [
  {
    id: 'test-valid-living',
    label: 'Valid Interior (Sunlit Living Room)',
    labelAr: 'غرفة داخلية صالحة (معيشة مشمسة)',
    category: 'valid',
    imageUrl: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1200&q=80',
    description: 'Clear floor plane, visible wall boundaries, balanced daylight.',
    descriptionAr: 'أرضية مكشوفة وجدران واضحة وإضاءة طبيعية متوازنة.',
  },
  {
    id: 'test-valid-empty',
    label: 'Valid Interior (Unfurnished Space)',
    labelAr: 'غرفة داخلية صالحة (مساحة غير مؤثثة)',
    category: 'valid',
    imageUrl: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80',
    description: 'High ceiling, distinct corners, open layout ready for staging.',
    descriptionAr: 'سقف مرتفع وزوايا واضحة ومساحة مفتوحة جاهزة للتأثيث.',
  },
  {
    id: 'test-invalid-portrait',
    label: 'Invalid (Person / Portrait)',
    labelAr: 'صورة غير صالحة (شخص / بورتريه)',
    category: 'invalid',
    imageUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80',
    description: 'Portrait photo. Lacks room environment and wall boundaries.',
    descriptionAr: 'صورة شخصية تخلو من بيئة الغرفة والجدران والأرضية.',
  },
  {
    id: 'test-invalid-pet',
    label: 'Invalid (Animal / Pet)',
    labelAr: 'صورة غير صالحة (حيوان أليف)',
    category: 'invalid',
    imageUrl: 'https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&w=800&q=80',
    description: 'Animal close-up without room geometry or placement surface.',
    descriptionAr: 'صورة مقربة لحيوان دون هندسة مكانية أو أسطح للفرش.',
  },
  {
    id: 'test-invalid-outdoor',
    label: 'Invalid (Outdoor Landscape)',
    labelAr: 'صورة غير صالحة (منظر طبيعي خارجي)',
    category: 'invalid',
    imageUrl: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80',
    description: 'Exterior landscape with mountains and lake. Not an interior.',
    descriptionAr: 'بيئة خارجية جبلية وبحيرة. غير مناسبة للتأثيث المنزلي الداخلي.',
  },
  {
    id: 'test-invalid-product',
    label: 'Invalid (Isolated Furniture Close-up)',
    labelAr: 'صورة غير صالحة (لقطة مقربة لقطعة أثاث)',
    category: 'invalid',
    imageUrl: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=800&q=80',
    description: 'Single chair close-up without room boundaries or room dimensions.',
    descriptionAr: 'لقطة مقربة لكرسي دون حدود الغرفة أو أبعاد المكان.',
  },
  {
    id: 'test-invalid-dark',
    label: 'Invalid (Dark / Blurry Image)',
    labelAr: 'صورة غير صالحة (مظلمة / ضبابية)',
    category: 'invalid',
    imageUrl: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=800&q=80',
    description: 'Extreme underexposure. Cannot extract depth or room coordinates.',
    descriptionAr: 'إضاءة مظلمة جداً وضبابية تحجب قياس العمق والأرضية.',
  },
  {
    id: 'test-uncertain-angle',
    label: 'Uncertain (Narrow Obstructed Angle)',
    labelAr: 'زاوية غير مؤكدة (زاوية ضيقة وعوائق)',
    category: 'uncertain',
    imageUrl: 'https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=800&q=80',
    description: 'Narrow perspective with partial obstruction. Recommendation: upload a wider angle.',
    descriptionAr: 'زاوية ضيقة مع عوائق جزئية. يفضل التقاط زاوية أوسع للغرفة.',
  },
];

/**
 * Intelligent room validation engine simulation.
 * In production: Triggers Roomora's Computer Vision CNN / Depth estimation pipeline.
 */
export async function validateRoomImage(
  imageUrl: string,
  fileName?: string
): Promise<RoomValidationResult> {
  // Simulate AI spatial processing latency (1200ms) to display scanner & loading status
  await new Promise((resolve) => setTimeout(resolve, 1200));

  const lowerUrl = (imageUrl || '').toLowerCase();
  const lowerName = (fileName || '').toLowerCase();

  // Match predefined test scenarios
  if (lowerUrl.includes('534528741775') || lowerName.includes('person') || lowerName.includes('portrait')) {
    return {
      status: 'invalid',
      confidenceScore: 98,
      isInterior: false,
      floorPlaneDetected: false,
      lightingScore: 'Optimal',
      obstructionLevel: 'Heavy',
      title: 'Human Portrait Detected',
      titleAr: 'تم رصد صورة شخصية / بورتريه',
      message: 'This image appears to be a portrait or person. ROOMORA requires an interior room space to visualize furniture.',
      messageAr: 'الصورة المرفوعة تبدو شخصية وليست غرفة. يتطلب نظام رومورا صورة لمساحة داخلية لتوزيع الأثاث بدقة.',
      rejectionReason: 'portrait_or_person',
      details: {
        category: 'Portrait / Human Subject',
        categoryAr: 'شخص / بورتريه بشري',
        wallsDetected: false,
        roomPerspective: 'None (Face / Upper Body Focus)',
        roomPerspectiveAr: 'لا يوجد (تركيز على الوجه أو الجسم)',
        suitableFor3D: false,
      },
    };
  }

  if (lowerUrl.includes('543466835') || lowerName.includes('dog') || lowerName.includes('cat') || lowerName.includes('pet') || lowerName.includes('animal')) {
    return {
      status: 'invalid',
      confidenceScore: 95,
      isInterior: false,
      floorPlaneDetected: false,
      lightingScore: 'Optimal',
      obstructionLevel: 'Heavy',
      title: 'Animal Subject Detected',
      titleAr: 'تم رصد حيوان أليف',
      message: 'This image contains an animal or pet without interior room geometry. Please upload a clear photo of an actual room.',
      messageAr: 'تحتوي الصورة على حيوان أليف وتخلو من أبعاد الغرفة وجدرانها. يرجى رفع صورة لغرفة سكنية.',
      rejectionReason: 'animal_or_pet',
      details: {
        category: 'Fauna / Pet',
        categoryAr: 'حيوان أليف',
        wallsDetected: false,
        roomPerspective: 'None',
        roomPerspectiveAr: 'لا توجد زاوية غرفة',
        suitableFor3D: false,
      },
    };
  }

  if (lowerUrl.includes('506744038136') || lowerName.includes('landscape') || lowerName.includes('outdoor') || lowerName.includes('nature')) {
    return {
      status: 'invalid',
      confidenceScore: 99,
      isInterior: false,
      floorPlaneDetected: false,
      lightingScore: 'Optimal',
      obstructionLevel: 'Low',
      title: 'Outdoor Landscape Detected',
      titleAr: 'تم رصد منظر طبيعي خارجي',
      message: 'This is an exterior outdoor scene. ROOMORA is an interior architectural staging engine requiring indoor walls and flooring.',
      messageAr: 'هذه صورة لبيئة طبيعية خارجية. رومورا محرك تأثيث داخلي يحتاج إلى أرضيات وجدران داخلية.',
      rejectionReason: 'outdoor_landscape',
      details: {
        category: 'Exterior Landscape',
        categoryAr: 'منظر طبيعي خارجي',
        wallsDetected: false,
        roomPerspective: 'Open Horizon',
        roomPerspectiveAr: 'أفق مفتوح بدون جدران',
        suitableFor3D: false,
      },
    };
  }

  if (lowerUrl.includes('586023492125') || lowerName.includes('product') || lowerName.includes('isolated')) {
    return {
      status: 'invalid',
      confidenceScore: 92,
      isInterior: true,
      floorPlaneDetected: false,
      lightingScore: 'Optimal',
      obstructionLevel: 'Heavy',
      title: 'Isolated Product Close-Up',
      titleAr: 'لقطة مقربة لقطعة أثاث فردية',
      message: 'This photo shows a tight furniture product close-up without room context or clearance pathways.',
      messageAr: 'تظهر الصورة لقطة مقربة لقطعة دون إظهار مساحة الغرفة أو الجدران المحيطة.',
      rejectionReason: 'product_only',
      details: {
        category: 'Macro Product View',
        categoryAr: 'لقطة مقربة لمنتج',
        wallsDetected: false,
        roomPerspective: 'Macro Object Focus',
        roomPerspectiveAr: 'تركيز مقرب على مجسم واحد',
        suitableFor3D: false,
      },
    };
  }

  if (lowerUrl.includes('518709268805') || lowerName.includes('dark') || lowerName.includes('blur')) {
    return {
      status: 'invalid',
      confidenceScore: 89,
      isInterior: false,
      floorPlaneDetected: false,
      lightingScore: 'Low',
      obstructionLevel: 'Heavy',
      title: 'Insufficient Light / Low Contrast',
      titleAr: 'إضاءة منخفضة جداً / صورة ضبابية',
      message: 'The image is too dark or blurry to reliably extract floor plane boundaries and perspective lines.',
      messageAr: 'الصورة مظلمة أو ضبابية للغاية، مما يمنع التعرف على حدود الأرضية وخطوط التقاء الجدران.',
      rejectionReason: 'dark_or_blurry',
      details: {
        category: 'Under-exposed / Blurry',
        categoryAr: 'منخفضة التعريض / ضبابية',
        wallsDetected: false,
        roomPerspective: 'Indeterminate',
        roomPerspectiveAr: 'غير محدد هندسياً',
        suitableFor3D: false,
      },
    };
  }

  if (lowerUrl.includes('505691938895') || lowerName.includes('uncertain') || lowerName.includes('corner-narrow')) {
    return {
      status: 'uncertain',
      confidenceScore: 68,
      isInterior: true,
      floorPlaneDetected: true,
      lightingScore: 'Optimal',
      obstructionLevel: 'Moderate',
      title: 'Uncertain Room Perspective',
      titleAr: 'زاوية داخلية جزئية / غير مؤكدة',
      message: 'Interior space detected, but the angle is narrow and parts of the floor are obscured. You can proceed, but a wider photo is recommended.',
      messageAr: 'تم رصد بيئة داخلية لكن الزاوية ضيقة وبعض حدود الأرضية محجوبة. يمكنك الاستمرار، لكن يفضل رفع لقطة أوسع.',
      rejectionReason: 'heavy_obstruction',
      details: {
        category: 'Obstructed / Tight Angle',
        categoryAr: 'زاوية ضيقة مع عوائق جزئية',
        wallsDetected: true,
        roomPerspective: 'Partial Corner Vector (68% Confidence)',
        roomPerspectiveAr: 'منظور زاوي جزئي (دقة 68%)',
        suitableFor3D: true,
        detectedObstaclesCount: 2,
      },
    };
  }

  // Default: Recognized as a valid interior room
  return {
    status: 'valid',
    confidenceScore: 96,
    isInterior: true,
    floorPlaneDetected: true,
    lightingScore: 'Optimal',
    obstructionLevel: 'Low',
    title: 'Room Image Verified',
    titleAr: 'غرفة داخلية معتمدة ومؤكدة',
    message: "Room image verified. You're ready to continue with spatial styling and furniture arrangement.",
    messageAr: 'تم التحقق من بيئة الغرفة بنجاح. المساحة مهيأة ومطابقة لمعايير التوزيع الهندسي للأثاث.',
    details: {
      category: 'Residential Interior Room',
      categoryAr: 'غرفة سكنية داخلية',
      wallsDetected: true,
      roomPerspective: 'Wide Spatial Perspective (96% Confidence)',
      roomPerspectiveAr: 'منظور مكاني واسع (دقة 96%)',
      suitableFor3D: true,
      detectedObstaclesCount: 0,
    },
  };
}

