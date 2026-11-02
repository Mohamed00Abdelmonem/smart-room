import { DesignProposal, RoomDesignState } from '../types';
import { LUXURY_PRODUCTS } from './products';

export function generateProposalsForRoom(
  state: RoomDesignState,
  count = 4,
  startIndex = 1
): DesignProposal[] {
  const primaryBeforeImage =
    state.uploadedPhotos.find((p) => p.isPrimary)?.url ||
    state.uploadedPhotos[0]?.url ||
    'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1600&q=80';

  const budget = state.budgetEgp || 80000;

  // Catalogue of curated concepts
  const CONCEPTS_BANK = [
    {
      code: 'PROP-01',
      title: 'Warm Minimalist Sanctuary',
      titleAr: 'الملاذ المينيمالي الدافئ',
      conceptTag: 'Warm Minimalism & Tactile Linen',
      conceptTagAr: 'مينيمالية دافئة وكتان طبيعي',
      style: 'Minimalist' as const,
      styleAr: 'مينيمالي دافئ',
      description:
        'Focused on uncluttered horizontal serenity, breathable natural light, and organic Belgian bouclé. Prioritizes spacious walking paths (1.2m clearance) to balconies and corridors.',
      descriptionAr:
        'يركز على السكون والخطوط الأفقية الهادئة والمساحات المفتوحة مع قماش البوكليه البلجيكي الفاخر. يضمن مسارات حركة مريحة بعرض 1.2 متر نحو الشرفة والممرات.',
      palette: [
        { name: 'Warm Oat', nameAr: 'شوفان دافئ', hex: '#EDE4D5' },
        { name: 'Natural Sand', nameAr: 'رملي طبيعي', hex: '#D5C1A7' },
        { name: 'Smoked Oak', nameAr: 'بلوط مدخن', hex: '#8C7A6B' },
        { name: 'Pure Pearl', nameAr: 'لؤلؤي نقي', hex: '#FFFDF9' },
      ],
      previewImageUrl:
        'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1600&q=80',
      productIds: ['sofa-caelum-l', 'table-aura-marble', 'media-kanso-oak', 'rug-seren-wool'],
      spaceUtilizationScore: 82,
      clearanceRating: 'Optimal' as const,
      clearanceRatingAr: 'مثالي وانسيابي (1.2م)',
      clearanceNotes: 'Generous 1.2m central pathway. Coffee table sits exactly 45cm from sofa edge.',
      clearanceNotesAr: 'مسار حركة رئيسي رحب 1.2م. طاولة القهوة تبعد 45 سم عن حافة الكنبة.',
      features: [
        'Belgian bouclé sofa with reversible chaise',
        'Italian statuario honed marble table slab',
        'Acoustically transparent slatted oak media console',
        'Zero synthetic chemicals in hand-carded wool rug',
      ],
      featuresAr: [
        'كنبة بوكليه بلجيكي بشيزلونج مرن يميناً أو يساراً',
        'سطح رخام ستاتوريو إيطالي فاخر معزول ضد البقع',
        'وحدة تلفزيون مضلعة تسمح بمرور الصوت وإخفاء الأسلاك',
        'سجادة صوف طبيعي 100% بدون مواد كيميائية',
      ],
      hotspots: [
        { id: 'h-1', productId: 'sofa-caelum-l', x: 45, y: 64, label: 'Caelum L-Sectional (285cm)' },
        { id: 'h-2', productId: 'table-aura-marble', x: 52, y: 76, label: 'Aura Marble Coffee Table' },
        { id: 'h-3', productId: 'media-kanso-oak', x: 82, y: 55, label: 'Kanso Fluted TV Console' },
        { id: 'h-4', productId: 'rug-seren-wool', x: 34, y: 84, label: 'Seren Hand-Knotted Wool Rug' },
      ],
    },
    {
      code: 'PROP-02',
      title: 'Contemporary Architectural Luxury',
      titleAr: 'الفخامة المعمارية المعاصرة',
      conceptTag: 'Statuary Marble & Ambient Brass',
      conceptTagAr: 'رخام ستاتوريو ولمسات النحاس الدافئة',
      style: 'Modern' as const,
      styleAr: 'مودرن معماري',
      description:
        'Elevated penthouse aesthetic featuring sculptural curved forms, honed Italian marble, brushed warm brass task lighting, and tailored seating proportions.',
      descriptionAr:
        'طابع بنتهاوس راقٍ يبرز المنحنيات النحتية ورخام ستاتوريو الإيطالي وإضاءة نحاسية دافئة تخلق تبايناً ساحراً مع الجدران والأرضيات.',
      palette: [
        { name: 'Desert Sandstone', nameAr: 'حجر رملي', hex: '#DECDB8' },
        { name: 'Brushed Brass', nameAr: 'نحاس مسحوب', hex: '#B58A54' },
        { name: 'Deep Espresso', nameAr: 'إسبريسو غامق', hex: '#2C241D' },
        { name: 'Cream Velvet', nameAr: 'مخمل كريمي', hex: '#F6F1E8' },
      ],
      previewImageUrl:
        'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=80',
      productIds: ['sofa-caelum-l', 'table-aura-marble', 'chair-lumina-armchair', 'lighting-helios-lamp'],
      spaceUtilizationScore: 86,
      clearanceRating: 'Spacious' as const,
      clearanceRatingAr: 'واسع وفسيح (1.3م)',
      clearanceNotes: 'Full 360-degree rotation clearance around the Lumina swivel lounge chair.',
      clearanceNotesAr: 'دوران كامل 360 درجة لكرسي لومينا دون ملامسة الجدران أو الطاولة.',
      features: [
        'Curved architectural seating that anchors the room',
        'Continuous touch-dimmable museum-grade LED floor lamp',
        'Memory-return swivel lounge chair in textured wool',
        'Bullnose-edge natural stone with anti-scratch pedestal',
      ],
      featuresAr: [
        'كنبة منحوتة ترسم حدود منطقة المحادثة بأناقة',
        'مصباح أرضي نحاسي مع تخفيت إضاءة تدريجي مريح',
        'كرسي دوار بقاعدة نحاسية مدمجة تعود تلقائياً لموضعها',
        'قاعدة رخامية ثقيلة مبطنة باللباد لحماية الأرضيات',
      ],
      hotspots: [
        { id: 'h-1', productId: 'sofa-caelum-l', x: 48, y: 62, label: 'Caelum Curved Sectional' },
        { id: 'h-2', productId: 'table-aura-marble', x: 50, y: 78, label: 'Aura Statuario Table' },
        { id: 'h-3', productId: 'chair-lumina-armchair', x: 24, y: 70, label: 'Lumina Swivel Chair' },
        { id: 'h-4', productId: 'lighting-helios-lamp', x: 18, y: 48, label: 'Helios Floor Lamp' },
      ],
    },
    {
      code: 'PROP-03',
      title: 'Nordic Calm & Smoked Oak',
      titleAr: 'الهدوء الإسكندنافي والبلوط المدخن',
      conceptTag: 'Natural Daylight & Danish Cord',
      conceptTagAr: 'ضوء طبيعي وأخشاب إسكندنافية دافئة',
      style: 'Scandinavian' as const,
      styleAr: 'إسكندنافي هادئ',
      description:
        'Inspired by calm Nordic light and tactile craftsmanship. Blends washed Belgian linen, un-dyed handspun wool, and precision Japanese-Danish joinery.',
      descriptionAr:
        'مستوحى من ضوء النهار الإسكندنافي الهادئ. يدمج بين الكتان البلجيكي المغسول وصوف نيوزيلندا الخام مع أخشاب البلوط الأبيض المدخن وتفاصيل التعشيق اليدوية.',
      palette: [
        { name: 'Oatmeal Weave', nameAr: 'نسيج الشوفان', hex: '#EDE4D5' },
        { name: 'Chalk White', nameAr: 'أبيض طباشيري', hex: '#FFFDF9' },
        { name: 'Smoked Ash', nameAr: 'رماد مدخن', hex: '#786957' },
        { name: 'Warm Clay', nameAr: 'طين دافئ', hex: '#B58A54' },
      ],
      previewImageUrl:
        'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=1600&q=80',
      productIds: ['sofa-elysian-3seat', 'media-kanso-oak', 'chair-lumina-armchair', 'rug-seren-wool'],
      spaceUtilizationScore: 79,
      clearanceRating: 'Spacious' as const,
      clearanceRatingAr: 'فسيح ومريح (1.4م)',
      clearanceNotes: 'Deep sofa sits 1.1m from TV unit, maximizing natural daylight penetration.',
      clearanceNotesAr: 'مسافة 1.1م بين الكنبة ووحدة التلفزيون تسمح بنفاذ الضوء بالكامل.',
      features: [
        'Cloud-like deep feather-topped seat cushions',
        'Concealed acoustic slatting for smart soundbars',
        'Washable natural linen covers for easy lifestyle maintenance',
        'Hand-knotted 3m x 2m wool rug providing thermal insulation',
      ],
      featuresAr: [
        'وسائد جلوس عميقة محشوة بالريش توفر استرخاءً تاماً',
        'تضليع خفي يسمح بمرور الصوت من الساوند بار بدون أسلاك',
        'كسوة كتانية قابلة للفك والغسيل بسهولة',
        'سجادة صوفية عازلة للصوت والحرارة بمقاس 3م × 2م',
      ],
      hotspots: [
        { id: 'h-1', productId: 'sofa-elysian-3seat', x: 42, y: 64, label: 'Elysian 3-Seater Linen Sofa' },
        { id: 'h-2', productId: 'media-kanso-oak', x: 80, y: 52, label: 'Kanso Oak Media Unit' },
        { id: 'h-3', productId: 'chair-lumina-armchair', x: 26, y: 72, label: 'Lumina Swivel Chair' },
        { id: 'h-4', productId: 'rug-seren-wool', x: 48, y: 84, label: 'Seren Wool Rug' },
      ],
    },
    {
      code: 'PROP-04',
      title: 'Modern Organic Earth & Stone',
      titleAr: 'العضوي الحديث ولمسات الحجر الطبيعي',
      conceptTag: 'Biophilic Curves & Roman Travertine',
      conceptTagAr: 'خطوط بيوفيلية وحجر الترافرتين الروماني',
      style: 'Contemporary' as const,
      styleAr: 'معاصر عضوي',
      description:
        'Celebrates organic earth textures and curvilinear silhouettes. Anchored by solid Roman travertine stone, rounded bouclé profiles, and earthen desert tones.',
      descriptionAr:
        'يحتفي بالمواد الطبيعية والمنحنيات العضوية الانسيابية. يتوسطه حجر الترافرتين الروماني المسامي وأقمشة البوكليه وألوان الصحراء الدافئة.',
      palette: [
        { name: 'Roman Travertine', nameAr: 'ترافرتين روماني', hex: '#E4D5C0' },
        { name: 'Desert Dune', nameAr: 'كثبان رملية', hex: '#EDE4D5' },
        { name: 'Warm Terracotta', nameAr: 'تراكوتا دافئة', hex: '#C49A6C' },
        { name: 'Deep Sandstone', nameAr: 'حجر رملي داكن', hex: '#2C241D' },
      ],
      previewImageUrl:
        'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1600&q=80',
      productIds: ['sofa-caelum-l', 'table-aura-marble', 'chair-lumina-armchair', 'rug-seren-wool'],
      spaceUtilizationScore: 84,
      clearanceRating: 'Optimal' as const,
      clearanceRatingAr: 'متوازن وعضوي (1.25م)',
      clearanceNotes: 'Circular flow pathways eliminate sharp corners for family and guest safety.',
      clearanceNotesAr: 'مسارات حركة دائرية انسيابية خالية من الحواف الحادة لسلامة الحركة.',
      features: [
        'Curved corner profiles that soften angular room corners',
        'Stain-sealed Roman stone slab with organic sedimentary grain',
        'High-density resilient foam that retains organic shape',
        'Handspun wool weave with high-low tactile pile relief',
      ],
      featuresAr: [
        'زوايا منحنية تكسر حدة الجدران الصماء وتمنح انسيابية',
        'لوح حجري معالج ضد السوائل يبرز العروق الطبيعية',
        'إسفنج عالي الكثافة يحافظ على المنحنيات دون هبوط',
        'حياكة صوفية متباينة الملمس توفر دفئاً وثراءً بصرياً',
      ],
      hotspots: [
        { id: 'h-1', productId: 'sofa-caelum-l', x: 44, y: 62, label: 'Caelum Curved Sectional' },
        { id: 'h-2', productId: 'table-aura-marble', x: 50, y: 78, label: 'Aura Marble Table' },
        { id: 'h-3', productId: 'chair-lumina-armchair', x: 22, y: 68, label: 'Lumina Accent Chair' },
        { id: 'h-4', productId: 'rug-seren-wool', x: 45, y: 86, label: 'Seren Wool Rug' },
      ],
    },
    {
      code: 'PROP-05',
      title: 'Japandi Zen Balance',
      titleAr: 'جابان دي: سكينة التوازن الياباني الإسكندنافي',
      conceptTag: 'Low-Slung Profiles & Acoustic Harmony',
      conceptTagAr: 'ارتفاعات منخفضة وتناغم صوتي هادئ',
      style: 'Minimalist' as const,
      styleAr: 'مينيمالي ياباني',
      description:
        'A fusion of Japanese wabi-sabi simplicity and Scandinavian functionalism. Low-slung furniture visually expands ceiling heights while natural oak slates diffuse acoustics.',
      descriptionAr:
        'مزيج متناغم بين بساطة الوابي سابي اليابانية والوظيفية الإسكندنافية. ارتفاعات أثاث منخفضة تمنح شعوراً باتساع السقف، مع شرائح البلوط الممتصة للصدى.',
      palette: [
        { name: 'Soft Sand', nameAr: 'رملي ناعم', hex: '#F6F1E8' },
        { name: 'Dark Charcoal Ash', nameAr: 'رماد فحمي', hex: '#2C241D' },
        { name: 'Natural Oak', nameAr: 'بلوط طبيعي', hex: '#D5C1A7' },
        { name: 'Olive Taupe', nameAr: 'زيتي هادئ', hex: '#786957' },
      ],
      previewImageUrl:
        'https://images.unsplash.com/photo-1598928506311-c55ded91a20c?auto=format&fit=crop&w=1600&q=80',
      productIds: ['sofa-elysian-3seat', 'table-aura-marble', 'media-kanso-oak', 'lighting-helios-lamp'],
      spaceUtilizationScore: 81,
      clearanceRating: 'Optimal' as const,
      clearanceRatingAr: 'انسيابي هادئ (1.2م)',
      clearanceNotes: 'Low center of gravity enhances perceived ceiling volume by 15%.',
      clearanceNotesAr: 'مركز ثقل منخفض يمنح إيحاءً بارتفاع السقف بنسبة 15%.',
      features: [
        'Minimalist visual footprint keeping views open and serene',
        'Natural wood grains finished with organic beeswax oil',
        'Discrete sliding tambour doors concealing all electronic gear',
        'Anti-glare triplex glass globe for warm nighttime tea and reading',
      ],
      featuresAr: [
        'حجم بصري خفيف يحافظ على اتساع الرؤية والهدوء',
        'أخشاب طبيعية معالجة بزيوت شمع العسل الطبيعي',
        'أبواب سحاب ذكية تخفي كافة الأجهزة وأسلاك الشاشات',
        'إضاءة دافئة مريحة للقراءة والاسترخاء المسائي',
      ],
      hotspots: [
        { id: 'h-1', productId: 'sofa-elysian-3seat', x: 44, y: 64, label: 'Elysian Low 3-Seater' },
        { id: 'h-2', productId: 'table-aura-marble', x: 50, y: 78, label: 'Aura Low Table' },
        { id: 'h-3', productId: 'media-kanso-oak', x: 78, y: 54, label: 'Kanso Oak Console' },
        { id: 'h-4', productId: 'lighting-helios-lamp', x: 20, y: 50, label: 'Helios Brass Lamp' },
      ],
    },
    {
      code: 'PROP-06',
      title: 'Mid-Century Architectural Lounge',
      titleAr: 'الصالون المعماري الكلاسيكي المعاصر',
      conceptTag: 'Warm Canaletto Walnut & Fluted Glass',
      conceptTagAr: 'خشب الجوز الأمريكي والزجاج المضلع الفاخر',
      style: 'Classic' as const,
      styleAr: 'كلاسيكي معاصر',
      description:
        'Rich walnut woods paired with fluted bronze glass, warm brass details, and deep tailored linen seating creating an enduring timeless ambiance.',
      descriptionAr:
        'أخشاب الجوز الأمريكي الدافئة مع الزجاج البرونزي المضلع وتفاصيل النحاس، وجلسة كتانية عميقة تمنح المكان فخامة تدوم عبر الزمن.',
      palette: [
        { name: 'Canaletto Walnut', nameAr: 'جوز كاناليتو', hex: '#634B35' },
        { name: 'Bronze Amber', nameAr: 'عنبر برونزي', hex: '#B58A54' },
        { name: 'Warm Cream', nameAr: 'كريمي دافئ', hex: '#F6F1E8' },
        { name: 'Rich Charcoal', nameAr: 'فحمي عميق', hex: '#2C241D' },
      ],
      previewImageUrl:
        'https://images.unsplash.com/photo-1512915922686-57c11dde9b6b?auto=format&fit=crop&w=1600&q=80',
      productIds: ['sofa-elysian-3seat', 'storage-vesper-credenza', 'chair-lumina-armchair', 'lighting-helios-lamp'],
      spaceUtilizationScore: 88,
      clearanceRating: 'Optimal' as const,
      clearanceRatingAr: 'محكم ومدروس (1.15م)',
      clearanceNotes: 'Credenza door clearance of 50cm is preserved with ample corridor passing space.',
      clearanceNotesAr: 'مسافة 50 سم لفتح أبواب البوفيه مع ممر حركة جانبي مريح.',
      features: [
        'Vesper sideboard with warm LED proximity illumination',
        'Deep Belgian linen sofa with flange edge seams',
        '360° brass swivel lounge chair for conversational versatility',
        'Rich timber contrasts adding architectural grounding',
      ],
      featuresAr: [
        'بوفيه فيسبر مزود بإضاءة LED داخلية ذكية ومستشعر حركة',
        'كنبة كتان بلجيكي بخياطة فرنسية بارزة',
        'كرسي دوار 360 درجة للتواصل السلس مع الحضور',
        'تباين لوني غني بالأخشاب يرسخ الهوية المعمارية',
      ],
      hotspots: [
        { id: 'h-1', productId: 'sofa-elysian-3seat', x: 42, y: 64, label: 'Elysian Tailored Sofa' },
        { id: 'h-2', productId: 'storage-vesper-credenza', x: 78, y: 54, label: 'Vesper Walnut Credenza' },
        { id: 'h-3', productId: 'chair-lumina-armchair', x: 22, y: 72, label: 'Lumina Swivel Chair' },
        { id: 'h-4', productId: 'lighting-helios-lamp', x: 16, y: 46, label: 'Helios Brass Lamp' },
      ],
    },
  ];

  // Select a slice based on startIndex and count (wrapping if necessary)
  const proposals: DesignProposal[] = [];

  for (let i = 0; i < count; i++) {
    const conceptIndex = (startIndex - 1 + i) % CONCEPTS_BANK.length;
    const template = CONCEPTS_BANK[conceptIndex];

    const proposalNumber = startIndex + i;
    const formattedCode = `PROP-0${proposalNumber}`;

    // Resolve products from catalogue
    const selectedProducts = template.productIds
      .map((id) => LUXURY_PRODUCTS.find((p) => p.id === id))
      .filter((p): p is typeof LUXURY_PRODUCTS[0] => Boolean(p));

    const totalCostEgp = selectedProducts.reduce((sum, p) => sum + p.priceEgp, 0);

    proposals.push({
      id: `proposal-${proposalNumber}-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
      proposalNumber,
      code: formattedCode,
      title: template.title,
      titleAr: template.titleAr,
      conceptTag: template.conceptTag,
      conceptTagAr: template.conceptTagAr,
      style: template.style,
      styleAr: template.styleAr,
      description: template.description,
      descriptionAr: template.descriptionAr,
      palette: template.palette,
      previewImageUrl: template.previewImageUrl,
      beforeImageUrl: primaryBeforeImage,
      selectedProducts,
      totalCostEgp,
      budgetEgp: budget,
      spaceUtilizationScore: template.spaceUtilizationScore,
      clearanceRating: template.clearanceRating,
      clearanceRatingAr: template.clearanceRatingAr,
      clearanceNotes: template.clearanceNotes,
      clearanceNotesAr: template.clearanceNotesAr,
      features: template.features,
      featuresAr: template.featuresAr,
      hotspots: template.hotspots,
    });
  }

  return proposals;
}

