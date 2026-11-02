export type Language = 'en' | 'ar';

export interface Translations {
  // Brand
  brandName: string;
  tagline: string;
  announcement: string;
  bookShowroomDemoTop: string;

  // Nav
  navOverview: string;
  navStoreDemo: string;
  navVisualizer: string;
  navDashboard: string;
  navIntegration: string;
  tryInRoomBtn: string;
  bookDemoBtn: string;
  langSwitchLabel: string;
  
  // Hero
  heroEyebrow: string;
  heroTitleLine1: string;
  heroTitleLine2: string;
  heroTitleItalic: string;
  heroSubtitle: string;
  heroCtaDemo: string;
  heroCtaRetailer: string;
  heroInteractiveHint: string;
  heroBeforeLabel: string;
  heroAfterLabel: string;
  heroTrustLabel: string;

  // How it works
  howItWorksEyebrow: string;
  howItWorksTitle: string;
  howItWorksSubtitle: string;
  step1Title: string;
  step1Desc: string;
  step2Title: string;
  step2Desc: string;
  step3Title: string;
  step3Desc: string;
  step4Title: string;
  step4Desc: string;

  // Experiences
  expABadge: string;
  expATitle: string;
  expASubtitle: string;
  expAPoint1: string;
  expAPoint2: string;
  expAPoint3: string;
  expACta: string;
  expAStoreLink: string;

  expBBadge: string;
  expBTitle: string;
  expBSubtitle: string;
  expBPromptLabel: string;
  expBSamplePrompt: string;
  expBCta: string;

  // Catalog Showcase
  catalogEyebrow: string;
  catalogTitle: string;
  catalogSubtitle: string;
  viewAllProducts: string;

  // Retailer ROI
  roiEyebrow: string;
  roiTitle: string;
  roiSubtitle: string;
  roiStat1Val: string;
  roiStat1Title: string;
  roiStat1Desc: string;
  roiStat2Val: string;
  roiStat2Title: string;
  roiStat2Desc: string;
  roiStat3Val: string;
  roiStat3Title: string;
  roiStat3Desc: string;
  roiStat4Val: string;
  roiStat4Title: string;
  roiStat4Desc: string;
  portalPeekBadge: string;
  portalPeekTitle: string;
  portalPeekDesc: string;
  portalPeekCta: string;

  // Store Demo
  storeLiveNotice: string;
  storeLocationTitle: string;
  storePageTitle: string;
  storePageDesc: string;
  storeTryModalBtn: string;
  storeRetailerSetupBtn: string;
  allCategories: string;
  allStylesLabel: string;
  maxPriceLabel: string;
  sortByLabel: string;
  sortFeatured: string;
  sortPriceAsc: string;
  sortPriceDesc: string;
  searchPlaceholder: string;
  showingProductsCount: string;
  resetFilters: string;
  noProductsFound: string;
  noProductsHint: string;
  storeBannerEyebrow: string;
  storeBannerTitle: string;
  storeBannerDesc: string;
  storeBannerCta: string;

  // Visualizer Multi-step
  visBadge: string;
  visPageTitle: string;
  visPageDesc: string;
  stepUpload: string;
  stepInfo: string;
  stepStyle: string;
  stepBudgetPrompt: string;
  stepResults: string;

  // Step 1
  s1Title: string;
  s1Desc: string;
  s1DragTitle: string;
  s1DragDesc: string;
  s1BrowseBtn: string;
  s1CurrentAngles: string;
  s1ClickPrimaryHint: string;
  s1PrimaryTag: string;
  s1PresetsTitle: string;
  s1NextBtn: string;
  valVerifiedTitle: string;
  valVerifiedDesc: string;
  valRejectedTitle: string;
  valRejectedDesc: string;
  valUncertainTitle: string;
  valUncertainDesc: string;
  valTestScenariosTitle: string;
  valInspectDiagnostics: string;
  propGridEyebrow: string;
  propGridTitle: string;
  propGridDesc: string;
  propSelectBtn: string;
  propSelectedTag: string;
  propInspectBtn: string;
  propCompareCheckbox: string;
  propGenerateMoreBtn: string;
  propCompareProposalsBtn: string;
  suggestedProductsEyebrow: string;
  suggestedProductsTitle: string;
  suggestedProductsDesc: string;
  filterAllSuggested: string;
  filterInConcept: string;

  // Step 2
  s2Title: string;
  s2Desc: string;
  s2RoomTypeLabel: string;
  s2WidthLabel: string;
  s2LengthLabel: string;
  s2HeightLabel: string;
  s2StandardHeightNote: string;
  s2DoorsLabel: string;
  s2DoorsSub: string;
  s2WindowsLabel: string;
  s2WindowsSub: string;
  s2BackBtn: string;
  s2NextBtn: string;

  // Step 3
  s3Title: string;
  s3Desc: string;
  s3BackBtn: string;
  s3NextBtn: string;

  // Step 4
  s4Title: string;
  s4Desc: string;
  s4SuggestedPills: string;
  s4PromptLabel: string;
  s4PromptPlaceholder: string;
  s4BudgetLabel: string;
  s4BudgetSub: string;
  s4RequiredPieces: string;
  s4BackBtn: string;
  s4GenerateBtn: string;

  // Step 5
  s5GenTitle: string;
  s5CompleteBadge: string;
  s5RegenerateBtn: string;
  s5AddAllBtn: string;
  s5SelectedPieces: string;
  s5AllInStock: string;
  s5ClearancesPassed: string;
  s5AuditTitle: string;
  s5AuditSub: string;
  s5AllocatedBudget: string;
  s5FurnishedTotal: string;
  s5RemainingBudget: string;
  s5GeomTitle: string;
  s5Geom1: string;
  s5Geom2: string;
  s5Geom3: string;
  s5AddAllToBag: string;
  s5AdjustBtn: string;

  // Experience A Modal
  expAModalTitle: string;
  expAModalLiveSim: string;
  expAModalRealItem: string;
  expAModalEmptyLabel: string;
  expAModalPlacedLabel: string;
  expAModalChooseRoom: string;
  expAModalUploadBtn: string;
  expAModalPriceLabel: string;
  expAModalReadyDelivery: string;
  expAModalFitAnalysis: string;
  expAModalProductWidth: string;
  expAModalDepthHeight: string;
  expAModalClearance: string;
  expAModalCraftsmanship: string;
  expAModalAddToCart: string;
  expAModalContinue: string;

  // Cart
  cartTitle: string;
  cartItemCount: string;
  cartEmptyTitle: string;
  cartEmptyDesc: string;
  cartBrowseBtn: string;
  cartSubtotal: string;
  cartDelivery: string;
  cartFreeDelivery: string;
  cartTotal: string;
  cartCheckoutBtn: string;
  cartGuarantee: string;
  cartOrderSuccessTitle: string;
  cartOrderSuccessDesc: string;
  cartDownloadSpec: string;

  // Dashboard
  dashPortalTitle: string;
  dashLiveStatus: string;
  dashStoreId: string;
  dashTabOverview: string;
  dashTabCatalog: string;
  dashTabSessions: string;
  dashTabEmbed: string;
  dashTabPlans: string;

  // Currency label
  currency: string;
}

export const TRANSLATIONS: Record<Language, Translations> = {
  en: {
    brandName: 'ROOMORA',
    tagline: 'See It Before You Buy It',
    announcement: 'Transform your furniture retail website with true-to-scale AI room visualization.',
    bookShowroomDemoTop: 'Book Showroom Partner Demo →',

    navOverview: 'Overview',
    navStoreDemo: 'Store Demo',
    navVisualizer: 'AI Room Designer',
    navDashboard: 'Retailer Dashboard',
    navIntegration: 'Integration',
    tryInRoomBtn: 'Try in Room',
    bookDemoBtn: 'Showroom Demo',
    langSwitchLabel: 'العربية',

    heroEyebrow: 'B2B AI Spatial Commerce for Luxury Furniture Retailers',
    heroTitleLine1: 'Your Room. Your Style.',
    heroTitleLine2: 'Your Furniture.',
    heroTitleItalic: 'Before You Buy.',
    heroSubtitle: 'ROOMORA transforms online showroom browsing into an interactive spatial studio. Customers upload a photo of their room and visualize exact, true-to-scale furniture catalog items with photorealistic lighting and millimeter accuracy.',
    heroCtaDemo: 'Experience the Demo',
    heroCtaRetailer: 'For Furniture Retailers',
    heroInteractiveHint: '✨ Interactive Demo: Drag slider below to see an empty Cairo living room furnished with real catalog pieces.',
    heroBeforeLabel: 'Raw Customer Room Photo',
    heroAfterLabel: 'Roomora AI Placed Showroom Catalog',
    heroTrustLabel: 'Engineered for Leading Retail Showrooms:',

    howItWorksEyebrow: 'The Retail Technology Architecture',
    howItWorksTitle: 'How Roomora Works',
    howItWorksSubtitle: 'A complete end-to-end spatial pipeline connecting showroom inventory with customer rooms.',
    step1Title: 'Connect Product Catalog',
    step1Desc: 'Sync existing product imagery, dimensions (width, depth, height), prices in EGP, and materials via API or drop-in CSV.',
    step2Title: 'Customer Room Upload',
    step2Desc: 'Shoppers upload real smartphone photos of their room from any angle. Our computer vision computes perspective & floor planes.',
    step3Title: 'True-to-Scale AI Placement',
    step3Desc: 'Exact catalog pieces are realistically rendered into the scene with ambient contact shadows, light matching, and clearance validation.',
    step4Title: 'High-Conversion Checkout',
    step4Desc: 'With tape-measure doubts resolved, customers checkout with complete spatial confidence, boosting average basket size by +52%.',

    expABadge: 'Experience A',
    expATitle: '"See It in My Room" for Any Individual Piece',
    expASubtitle: 'Allow shoppers on any product page to tap a single button, upload their room photo, and instantly see that exact sofa or table rendered at true millimeter scale in their room.',
    expAPoint1: 'Guaranteed authentic catalog SKU (not a generic AI replacement)',
    expAPoint2: 'Interactive Before/After slider to evaluate color and lighting fit',
    expAPoint3: 'Automatic clearance verification against doors, windows & pathways',
    expACta: 'Test Experience A Live',
    expAStoreLink: 'Explore Furniture Store Demo',

    expBBadge: 'Experience B · Flagship',
    expBTitle: 'AI Room Designer: Furnish Entire Rooms from a Single Photo',
    expBSubtitle: 'Give customers their personal interior architect. They enter their room dimensions, specify a budget (e.g., 80,000 EGP), select a style, and describe their dream home in plain Arabic or English.',
    expBPromptLabel: 'Sample Customer Natural-Language Prompt:',
    expBSamplePrompt: '"I want to furnish my living room with a modern minimalist style. My budget is 80,000 EGP. I need a comfortable L-shaped sofa, a TV unit, a coffee table, and a carpet. The room is 5m x 4m. I prefer warm beige and natural wood colors."',
    expBCta: 'Launch 5-Step AI Room Designer',

    catalogEyebrow: 'Showroom Demo Catalog',
    catalogTitle: 'Real Retailer Inventory · Egyptian Pound Pricing',
    catalogSubtitle: 'Every piece in our demo is a real, manufacturable luxury item with certified dimensions and specs.',
    viewAllProducts: 'View All Showroom Products',

    roiEyebrow: 'B2B Commerce Impact',
    roiTitle: 'Why Furniture Showrooms Choose Roomora',
    roiSubtitle: 'The number one barrier to high-ticket furniture e-commerce is spatial uncertainty: "Will this fit through my door and match my existing flooring?" Roomora solves it instantly.',
    roiStat1Val: '+38%',
    roiStat1Title: 'Conversion Rate Lift',
    roiStat1Desc: 'Shoppers who visualize furniture in their room convert 8.5x higher than passive page viewers.',
    roiStat2Val: '-41%',
    roiStat2Title: 'Return Rate Reduction',
    roiStat2Desc: 'Eliminates expensive delivery rejections caused by dimensional miscalculations and door clearance issues.',
    roiStat3Val: '+52%',
    roiStat3Title: 'Average Basket Value',
    roiStat3Desc: 'The AI Room Designer naturally bundles sofas, coffee tables, lamps, and area rugs into coordinated sets.',
    roiStat4Val: '3.4x',
    roiStat4Title: 'Longer Catalog Dwell Time',
    roiStat4Desc: 'Customers spend an average of 4.2 minutes engaging with their customized room environments.',
    portalPeekBadge: 'Showroom Executive Portal',
    portalPeekTitle: 'Inspect the Retailer Management Dashboard',
    portalPeekDesc: 'See live session metrics, top-converting SKUs, widget branding controls, and catalog 3D model status.',
    portalPeekCta: 'Explore Retailer Dashboard',

    storeLiveNotice: 'Live Retailer Integration Simulation',
    storeLocationTitle: 'Storefront: L\'Atelier Du Meuble Cairo',
    storePageTitle: 'Showroom Collection 2026',
    storePageDesc: 'Notice the "Try in My Room" button on every product card below. In a live retail deployment, clicking it allows the customer to immediately visualize that exact catalog piece inside their own living space.',
    storeTryModalBtn: 'Test "Try in Room" Modal',
    storeRetailerSetupBtn: 'Retailer Setup',
    allCategories: 'All Collection',
    allStylesLabel: 'All Styles',
    maxPriceLabel: 'Max Price',
    sortByLabel: 'Sort by',
    sortFeatured: 'Featured First',
    sortPriceAsc: 'Price: Low to High',
    sortPriceDesc: 'Price: High to Low',
    searchPlaceholder: 'Search by furniture name, material, SKU...',
    showingProductsCount: 'Showing luxury showroom products',
    resetFilters: 'Reset all filters',
    noProductsFound: 'No furniture matches your criteria',
    noProductsHint: 'Try expanding your price range or clearing search keywords.',
    storeBannerEyebrow: 'B2B Technology Value',
    storeBannerTitle: 'How this works on your showroom website',
    storeBannerDesc: 'When you install the Roomora script onto your e-commerce store, the "Try in My Room" button automatically attaches beside your standard "Add to Cart" button. No redesign of your existing website required.',
    storeBannerCta: 'Schedule Showroom Installation',

    visBadge: 'Experience B · Retail AI Room Designer Simulator',
    visPageTitle: 'AI Room Designer',
    visPageDesc: 'Furnish your complete room with authentic showroom pieces matching your dimensions, style, and Egyptian Pound budget.',
    stepUpload: 'Upload Room',
    stepInfo: 'Room Information',
    stepStyle: 'Choose Style',
    stepBudgetPrompt: 'Budget & Prompt',
    stepResults: 'Design Results',

    s1Title: 'Step 1: Upload Your Room Photos',
    s1Desc: 'Upload multiple angles of your room. Multiple perspectives help the spatial engine map floor boundaries, windows, and electrical outlets accurately.',
    s1DragTitle: 'Drag and drop your room photos here',
    s1DragDesc: 'Support for JPEG, PNG, or HEIC. Take photos from corners and opposite walls with daytime natural light for best results.',
    s1BrowseBtn: 'Browse Files from Device',
    s1CurrentAngles: 'Current Room Angles',
    s1ClickPrimaryHint: 'Click photo to set as primary front perspective',
    s1PrimaryTag: '★ Primary Angle',
    s1PresetsTitle: 'Or Select a Pre-Loaded Cairo Room Preset (Instant Demo)',
    s1NextBtn: 'Continue to Room Information',
    valVerifiedTitle: 'Room Image Verified',
    valVerifiedDesc: "Room image verified. You're ready to continue with spatial styling.",
    valRejectedTitle: 'Invalid Room Image Detected',
    valRejectedDesc: 'One or more uploaded images could not be verified as an interior room. Please replace or remove invalid images before continuing.',
    valUncertainTitle: 'Uncertain Room Perspective',
    valUncertainDesc: 'Narrow perspective or partial obstruction detected. You can proceed, but a wider angle is recommended.',
    valTestScenariosTitle: 'Test Spatial AI Validation Scenarios:',
    valInspectDiagnostics: 'Inspect Spatial Diagnostics',
    propGridEyebrow: 'Multiple Creative Directions',
    propGridTitle: 'Explore Distinct AI Design Proposals',
    propGridDesc: 'ROOMORA generates multiple distinct concepts and never automatically selects one on your behalf. Compare options, inspect 3D placements, and select the design you love.',
    propSelectBtn: 'Select This Design',
    propSelectedTag: 'Selected Design Direction',
    propInspectBtn: 'Inspect Full 3D Specs',
    propCompareCheckbox: 'Compare',
    propGenerateMoreBtn: 'Generate More Designs',
    propCompareProposalsBtn: 'Compare Selected Proposals',
    suggestedProductsEyebrow: 'Standalone Catalog Pieces · Tested for Your Room',
    suggestedProductsTitle: 'Suggested Products for Your Space (Viewed Individually)',
    suggestedProductsDesc: 'Explore each recommended showroom piece on its own. Review true dimensions, material finishes, or launch "Try in Room" to see any individual piece inside your actual space.',
    filterAllSuggested: 'All Suggested Pieces',
    filterInConcept: 'Included in Current Proposal',

    s2Title: 'Step 2: Room Information & Spatial Dimensions',
    s2Desc: 'Enter your room\'s physical measurements so Roomora can verify that sofas, tables, and media units fit comfortably with appropriate walking clearances.',
    s2RoomTypeLabel: 'Select Room Type *',
    s2WidthLabel: 'Room Width (Wall A)',
    s2LengthLabel: 'Room Length (Wall B)',
    s2HeightLabel: 'Ceiling Height',
    s2StandardHeightNote: 'Standard Egyptian residential: 2.8m - 3.2m',
    s2DoorsLabel: 'Entry & Balcony Doors',
    s2DoorsSub: 'Preserves unobstructed door swing arc',
    s2WindowsLabel: 'Windows & Daylight Sources',
    s2WindowsSub: 'Calculates natural sun direction',
    s2BackBtn: 'Back',
    s2NextBtn: 'Continue to Choose Style',

    s3Title: 'Step 3: Choose Your Interior Design Style',
    s3Desc: 'Select the aesthetic direction that reflects your taste. The catalog engine will prioritize furniture pieces matching these silhouettes and materials.',
    s3BackBtn: 'Back',
    s3NextBtn: 'Continue to Budget & Prompt',

    s4Title: 'Step 4: Total Budget & Natural Language Prompt',
    s4Desc: 'Tell Roomora what pieces you need and your total spend limit. The system coordinates the furniture pieces while staying strictly within your budget.',
    s4SuggestedPills: 'Click a Curated Prompt Preset:',
    s4PromptLabel: 'Describe Your Room Needs (English or Arabic) *',
    s4PromptPlaceholder: 'Describe your furniture pieces, preferred colors, materials, and layout...',
    s4BudgetLabel: 'Total Furnishing Budget (Egyptian Pounds)',
    s4BudgetSub: 'Our optimizer ensures all selected items do not exceed this total.',
    s4RequiredPieces: 'Required Furniture Pieces',
    s4BackBtn: 'Back',
    s4GenerateBtn: 'Generate Coordinated Room Design',

    s5GenTitle: 'Synthesizing Coordinated Room Design',
    s5CompleteBadge: 'Design Complete',
    s5RegenerateBtn: 'Regenerate Variation',
    s5AddAllBtn: 'Add All to Bag',
    s5SelectedPieces: 'Selected Showroom Pieces',
    s5AllInStock: '✓ 100% In Stock Cairo Hub',
    s5ClearancesPassed: '✓ All Clearances Passed',
    s5AuditTitle: 'Budget & Spatial Audit',
    s5AuditSub: 'Transparent accounting based on your target budget.',
    s5AllocatedBudget: 'Allocated Budget:',
    s5FurnishedTotal: 'Furnished Total:',
    s5RemainingBudget: 'Remaining Budget:',
    s5GeomTitle: 'Spatial Geometry Validation',
    s5Geom1: '115cm clearance between L-sofa & coffee table maintained.',
    s5Geom2: '220cm TV console fits within Wall B with 90cm door margin.',
    s5Geom3: 'Natural wool rug anchors seating area without blocking vents.',
    s5AddAllToBag: 'Add Complete Room to Cart',
    s5AdjustBtn: 'Adjust Prompt & Budget',

    expAModalTitle: 'Experience A · See It In Your Room',
    expAModalLiveSim: 'Live Retailer Simulator',
    expAModalRealItem: 'Viewing real catalog item:',
    expAModalEmptyLabel: 'Your Empty Room',
    expAModalPlacedLabel: 'With Selected Furniture',
    expAModalChooseRoom: 'Choose Room Photo or Upload Your Own',
    expAModalUploadBtn: 'Upload My Room Photo',
    expAModalPriceLabel: 'Showroom Price',
    expAModalReadyDelivery: 'Ready for Delivery',
    expAModalFitAnalysis: 'Room Fit & Scale Analysis',
    expAModalProductWidth: 'Product Width:',
    expAModalDepthHeight: 'Depth × Height:',
    expAModalClearance: 'Clearance Walkway: 115 cm (Optimal)',
    expAModalCraftsmanship: 'Craftsmanship & Materials',
    expAModalAddToCart: 'Add to Showroom Cart',
    expAModalContinue: 'Continue Browsing Collection',

    cartTitle: 'Showroom Bag',
    cartItemCount: 'items selected',
    cartEmptyTitle: 'Your bag is empty',
    cartEmptyDesc: 'Browse our curated showroom collections or use the AI Room Designer to furnish an entire living space.',
    cartBrowseBtn: 'Browse Collection',
    cartSubtotal: 'Subtotal:',
    cartDelivery: 'White-Glove Delivery (Cairo/Giza):',
    cartFreeDelivery: 'Complimentary White-Glove',
    cartTotal: 'Total:',
    cartCheckoutBtn: 'Proceed to Showroom Checkout',
    cartGuarantee: 'Roomora True-Scale Spatial Fit Guarantee Included',
    cartOrderSuccessTitle: 'Showroom Order Reserved!',
    cartOrderSuccessDesc: 'Order simulation confirmed. The showroom logistics team in Cairo has verified your spatial clearances.',
    cartDownloadSpec: 'Download Architectural Spec Sheet',

    dashPortalTitle: 'L\'Atelier Du Meuble · Showroom Portal',
    dashLiveStatus: 'Live Integration',
    dashStoreId: 'Storefront ID: eg_cairo_atelier_9021 · Flagship Cairo & Sheikh Zayed Hub',
    dashTabOverview: 'Performance Overview',
    dashTabCatalog: 'Catalog 3D Management',
    dashTabSessions: 'Live Customer Sessions',
    dashTabEmbed: 'Widget & API Embed',
    dashTabPlans: 'Subscription & ROI Plan',

    currency: 'EGP',
  },
  ar: {
    brandName: 'رومورا',
    tagline: 'عاين أثاثك في غرفتك قبل الشراء',
    announcement: 'حوّل موقع معرضك إلى استوديو تأثيث ذكي بتقنية الذكاء الاصطناعي والمقاسات الحقيقية.',
    bookShowroomDemoTop: 'احجز عرضاً تجريبياً لمعرضك ←',

    navOverview: 'الرئيسية',
    navStoreDemo: 'معرض الأثاث التجريبي',
    navVisualizer: 'مصمم الغرف بالذكاء الاصطناعي',
    navDashboard: 'لوحة تحكم المعارض',
    navIntegration: 'طريقة الربط والدمج',
    tryInRoomBtn: 'جرّب في غرفتك',
    bookDemoBtn: 'عرض تجريبي للمعارض',
    langSwitchLabel: 'English',

    heroEyebrow: 'منصة التجارة المكانية والذكاء الاصطناعي لمعارض الأثاث الفاخر',
    heroTitleLine1: 'غرفتك. أسلوبك.',
    heroTitleLine2: 'أثاثك الحقيقي.',
    heroTitleItalic: 'قبل أن تشتري.',
    heroSubtitle: 'تمنح رومورا عملاء معارض الأثاث تجربة تفاعلية مذهلة: يرفع العميل صورة غرفته الحقيقية ليشاهد قطع الأثاث من كتالوج المعرض موضوعة بدقة المليمتر والإضاءة الواقعية وظلال ثلاثية الأبعاد.',
    heroCtaDemo: 'جرّب العرض التفاعلي الآن',
    heroCtaRetailer: 'لأصحاب معارض الأثاث',
    heroInteractiveHint: '✨ عرض تفاعلي: حرّك المؤشر لمشاهدة غرفة معيشة فارغة في الشيخ زايد بعد تأثيثها بقطع حقيقية.',
    heroBeforeLabel: 'صورة الغرفة الأصلية الفارغة',
    heroAfterLabel: 'الغرفة مؤثثة بقطع الكتالوج عبر رومورا',
    heroTrustLabel: 'صُممت لأكبر معارض الأثاث في مصر والشرق الأوسط:',

    howItWorksEyebrow: 'بنية تقنية المعارض الحديثة',
    howItWorksTitle: 'كيف تعمل منصة رومورا؟',
    howItWorksSubtitle: 'منظومة مكانية متكاملة تربط كتالوج مخزون معرضك بغرف العملاء الحقيقية دون أي تعقيد.',
    step1Title: 'ربط كتالوج الأثاث',
    step1Desc: 'مزامنة صور المنتجات الحقيقية ومقاساتها (العرض، العمق، الارتفاع) والأسعار بالجنيه المصري والمواد عبر ملف أو API.',
    step2Title: 'رفع صورة غرفة العميل',
    step2Desc: 'يلتقط المشتري صوراً لغرفته من هاتفه المحمول، ويقوم نظام الرؤية الحاسوبية بحساب زوايا المنظور وأرضية الغرفة فوراً.',
    step3Title: 'وضع الأثاث بالمقاس الحقيقي',
    step3Desc: 'تظهر القطع الواقعية داخل الغرفة مع ظلال طبيعية ومراعاة اتجاه إضاءة النوافذ والمسافات الحركية بدقة تامة.',
    step4Title: 'شراء فوري بدون تردد',
    step4Desc: 'مع زوال الشكوك حول المقاسات والألوان، يشتري العميل بثقة مطلقة مما يرفع متوسط سلة الشراء بنسبة +52%.',

    expABadge: 'التجربة الأولى (أ)',
    expATitle: '"عاين في غرفتك" لأي قطعة أثاث فردية',
    expASubtitle: 'يتيح لزوار موقع معرضك النقر على زر واحد في صفحة المنتج ورفع صورة غرفتهم لمعاينة تلك الكنبة أو الطاولة بمقاساتها الملمترية الحقيقية داخل المكان.',
    expAPoint1: 'قطعة حقيقية معتمدة من الكتالوج (وليست بديلاً مولداً عشوائياً)',
    expAPoint2: 'مؤشر مقارنة تفاعلي قبل / بعد لتقييم تناسق الألوان والإضاءة',
    expAPoint3: 'تحقق هندسي تلقائي من مسارات الأبواب والنوافذ والممرات',
    expACta: 'جرّب التجربة (أ) مباشرة',
    expAStoreLink: 'تصفح معرض الأثاث التجريبي',

    expBBadge: 'التجربة الثانية (ب) · النظام الرائد',
    expBTitle: 'مصمم الغرف بالذكاء الاصطناعي: تأثيث غرفة كاملة من صورة وميزانية',
    expBSubtitle: 'مهندس ديكور شخصي لكل عميل: يدخل العميل أبعاد غرفته وميزانيته بالجنيه المصري (مثلاً 80,000 ج.م) وأسلوبه المفضل، ثم يكتب طلبه بالعربية أو الإنجليزية ليحصل على تصميم متناسق بقطع حقيقية متوفرة في المعرض.',
    expBPromptLabel: 'مثال على طلب العميل باللغة الطبيعية:',
    expBSamplePrompt: '"أريد تأثيث غرفة المعيشة بأسلوب مينيمالي حديث. ميزانيتي 80,000 ج.م. أحتاج لكنبة مريحة على شكل حرف L، وحدة تلفزيون، طاولة قهوة، وسجادة. الغرفة 5م × 4م. أفضل درجات البيج الدافئ وألوان الخشب الطبيعي."',
    expBCta: 'ابدأ مصمم الغرف في 5 خطوات',

    catalogEyebrow: 'كتالوج المعرض التجريبي',
    catalogTitle: 'مخزون حقيقي لمعرض فاخر · الأسعار بالجنيه المصري',
    catalogSubtitle: 'كل قطعة أثاث في هذا العرض هي منتج حقيقي قابل للتصنيع والتسليم بمقاسات ومواصفات معتمدة.',
    viewAllProducts: 'عرض جميع منتجات المعرض',

    roiEyebrow: 'العائد التجاري للمعارض',
    roiTitle: 'لماذا تختار معارض الأثاث منصة رومورا؟',
    roiSubtitle: 'العائق الأكبر أمام مبيعات الأثاث الفاخر أونلاين هو عدم اليقين المكاني: "هل ستتسع الكنبة في مدخل الشقة؟ هل تلائم ألوان الباركيه؟" رومورا تحسم الإجابة فوراً.',
    roiStat1Val: '+38%',
    roiStat1Title: 'ارتفاع نسبة التحويل للشراء',
    roiStat1Desc: 'العملاء الذين يعاينون الأثاث في غرفهم يسجلون معدل شراء أعلى بـ 8.5 أضعاف مقارنة بالمشاهدة العادية.',
    roiStat2Val: '-41%',
    roiStat2Title: 'انخفاض المرتجعات والرفض',
    roiStat2Desc: 'القضاء التام على أخطاء المقاسات ورفض الاستلام عند باب العمارة أو المصعد.',
    roiStat3Val: '+52%',
    roiStat3Title: 'ارتفاع متوسط قيمة الفاتورة',
    roiStat3Desc: 'يقوم مصمم الغرف بتنسيق حزم كاملة تجمع الكنبة مع طاولة القهوة والسجادة والإضاءة معاً.',
    roiStat4Val: '3.4x',
    roiStat4Title: 'مضاعفة وقت تصفح الكتالوج',
    roiStat4Desc: 'يقضي العميل في المتوسط أكثر من 4 دقائق في تجربة وترتيب القطع داخل غرفته الخاصة.',
    portalPeekBadge: 'بوابة مديري المعارض',
    portalPeekTitle: 'اكتشف لوحة تحكم التاجر والمعرض',
    portalPeekDesc: 'شاهد تحليلات الزيارات الحية والمنتجات الأكثر طلباً ومؤشرات المبيعات وإدارة النماذج ثلاثية الأبعاد.',
    portalPeekCta: 'استكشف لوحة المعارض',

    storeLiveNotice: 'محاكاة حية لدمج النظام في متجر إلكتروني',
    storeLocationTitle: 'المتجر التجريبي: معرض لاتيلييه دي موبل - القاهرة',
    storePageTitle: 'تشكيلة المعرض لعام 2026',
    storePageDesc: 'لاحظ زر "عاين في غرفتك" الموجود على كل بطاقة منتج أدناه. عند دمج رومورا في موقع معرضك، يضغط العميل على الزر ليختبر القطعة في غرفته مباشرة بمقاساتها الحقيقية.',
    storeTryModalBtn: 'اختبر نافذة "عاين في غرفتك"',
    storeRetailerSetupBtn: 'إعدادات المعرض',
    allCategories: 'جميع التشكيلات',
    allStylesLabel: 'جميع الأنماط',
    maxPriceLabel: 'الحد الأقصى للسعر',
    sortByLabel: 'الترتيب حسب',
    sortFeatured: 'المميز أولاً',
    sortPriceAsc: 'السعر: من الأقل للأعلى',
    sortPriceDesc: 'السعر: من الأعلى للأقل',
    searchPlaceholder: 'ابحث باسم القطعة، المادة، أو كود SKU...',
    showingProductsCount: 'عرض منتجات المعرض الفاخرة',
    resetFilters: 'إعادة ضبط التصفية',
    noProductsFound: 'لم يتم العثور على أثاث يطابق خياراتك',
    noProductsHint: 'جرّب توسيع نطاق السعر أو تغيير كلمات البحث.',
    storeBannerEyebrow: 'القيمة التقنية لمعرضك',
    storeBannerTitle: 'كيف يظهر هذا النظام على موقع معرضك؟',
    storeBannerDesc: 'بمجرد إضافة كود رومورا البسيط إلى موقعك، يظهر زر "عاين في غرفتك" تلقائياً بجانب زر "أضف إلى السلة" دون الحاجة لإعادة تصميم موقعك أو تغيير منصتك الحالية.',
    storeBannerCta: 'احجز موعد تركيب النظام لمعرضك',

    visBadge: 'التجربة الثانية (ب) · محاكاة مصمم الغرف بالذكاء الاصطناعي',
    visPageTitle: 'مصمم الغرف الذكي',
    visPageDesc: 'أثّث غرفتك بالكامل بقطع أثاث حقيقية من المعرض تناسب أبعاد غرفتك وأسلوبك وميزانيتك بالجنيه المصري.',
    stepUpload: 'رفع الغرفة',
    stepInfo: 'بيانات الغرفة',
    stepStyle: 'اختيار النمط',
    stepBudgetPrompt: 'الميزانية والطلب',
    stepResults: 'نتيجة التصميم',

    s1Title: 'الخطوة 1: رفع صور غرفتك الحقيقية',
    s1Desc: 'ارفع صوراً لغرفتك من زوايا متعددة لمساعدة المحرك المكاني على تحديد أبعاد الأرضية والنوافذ ومسارات الحركة بدقة.',
    s1DragTitle: 'اسحب وأفلت صور غرفتك هنا',
    s1DragDesc: 'ندعم صيغ JPEG و PNG و HEIC. التقط الصور أثناء ضوء النهار من زوايا الغرفة للحصول على أفضل دقة.',
    s1BrowseBtn: 'تصفح الصور من جهازك',
    s1CurrentAngles: 'زوايا الغرفة الحالية',
    s1ClickPrimaryHint: 'اضغط على الصورة لتعيينها كواجهة منظور أساسية',
    s1PrimaryTag: '★ المنظور الأساسي',
    s1PresetsTitle: 'أو اختر نموذج غرفة جاهز في القاهرة (عرض فوري بنقرة واحدة)',
    s1NextBtn: 'المتابعة إلى بيانات الغرفة',
    valVerifiedTitle: 'غرفة داخلية معتمدة ومؤكدة',
    valVerifiedDesc: 'تم التحقق من بيئة الغرفة بنجاح. المساحة مهيأة ومطابقة لمعايير التوزيع الهندسي للأثاث.',
    valRejectedTitle: 'تم رصد صورة غير صالحة للغرفة',
    valRejectedDesc: 'تعذر التحقق من صورة واحدة أو أكثر كغرفة داخلية (مثل أشخاص أو مناظر خارجية أو لقطة مظلمة). يرجى استبدالها للمتابعة.',
    valUncertainTitle: 'زاوية داخلية غير مؤكدة',
    valUncertainDesc: 'تم رصد بيئة داخلية لكن الزاوية ضيقة أو العوائق كثيرة. يمكنك المتابعة، ولكن نوصي برفع لقطة أوسع.',
    valTestScenariosTitle: 'تجربة محاكي الذكاء الاصطناعي لفحص الصور:',
    valInspectDiagnostics: 'فحص الأبعاد والبيئة',
    propGridEyebrow: 'توجّهات إبداعية متعددة',
    propGridTitle: 'استكشف مقترحات التصميم المتنوعة بالذكاء الاصطناعي',
    propGridDesc: 'يقوم رومورا بابتكار عدة مفاهيم تصميمية مختلفة ولا يختار أبداً نيابة عنك بشكل تلقائي. قارن بين الخيارات، وعاين التوزيع ثلاثي الأبعاد، واختر ما يناسب ذوقك.',
    propSelectBtn: 'اختيار هذا التصميم',
    propSelectedTag: 'التصميم المعتمد حالياً',
    propInspectBtn: 'معاينة ثلاثية الأبعاد والمواصفات',
    propCompareCheckbox: 'مقارنة',
    propGenerateMoreBtn: 'توليد مقترحات إضافية',
    propCompareProposalsBtn: 'مقارنة المقترحات المحددة',
    suggestedProductsEyebrow: 'قطع الكتالوج المنفردة · مختارة خصيصاً لمقاسات غرفتك',
    suggestedProductsTitle: 'قطع الأثاث المقترحة لغرفتك (معاينة القطع منفردة)',
    suggestedProductsDesc: 'عاين كل قطعة أثاث مقترحة بمفردها مع المواصفات والمقاسات الحقيقية، مع إمكانية تجربة أي قطعة بشكل منفصل داخل غرفتك بنقرة واحدة.',
    filterAllSuggested: 'جميع القطع المقترحة',
    filterInConcept: 'المعتمدة في هذا المقترح',

    s2Title: 'الخطوة 2: مواصفات وأبعاد الغرفة',
    s2Desc: 'أدخل مقاسات غرفتك ليتحقق النظام تلقائياً من ملائمة الكنب ووحدة التلفزيون وطاولات القهوة مع ترك مسافة كافية للمرور.',
    s2RoomTypeLabel: 'نوع الغرفة *',
    s2WidthLabel: 'عرض الغرفة (الجدار أ)',
    s2LengthLabel: 'طول الغرفة (الجدار ب)',
    s2HeightLabel: 'ارتفاع السقف',
    s2StandardHeightNote: 'الارتفاع السكني المعتاد في مصر: 2.8م - 3.2م',
    s2DoorsLabel: 'أبواب الغرفة والبلكونة',
    s2DoorsSub: 'يراعي مسار فتح الباب دون عوائق',
    s2WindowsLabel: 'النوافذ ومصادر الضوء الطبيعي',
    s2WindowsSub: 'لحساب اتجاه أشعة الشمس والظلال',
    s2BackBtn: 'السابق',
    s2NextBtn: 'المتابعة لاختيار النمط',

    s3Title: 'الخطوة 3: حدد طابع الديكور المفضل',
    s3Desc: 'اختر الطراز الذي يعبر عن ذوقك، ليقوم محرك الكتالوج بفرز وتنسيق قطع الأثاث المناسبة لتلك الخطوط والمواد.',
    s3BackBtn: 'السابق',
    s3NextBtn: 'المتابعة للميزانية والطلب',

    s4Title: 'الخطوة 4: الميزانية والطلب باللغة الطبيعية',
    s4Desc: 'حدد ميزانيتك بالجنيه المصري واكتب ما تريده في غرفتك، وسيقوم النظام بتنسيق واختيار القطع بحيث لا تتخطى ميزانيتك.',
    s4SuggestedPills: 'اضغط لتطبيق طلب جاهز فوراً:',
    s4PromptLabel: 'اكتب رغبتك واحتياجاتك (بالعربية أو الإنجليزية) *',
    s4PromptPlaceholder: 'صف قطع الأثاث التي تحتاجها، وألوانك المفضلة والمواد...',
    s4BudgetLabel: 'الميزانية الكلية للتأثيث (بالجنيه المصري)',
    s4BudgetSub: 'يضمن نظامنا ألا يتعدى إجمالي القطع المختارة هذا الحد.',
    s4RequiredPieces: 'قطع الأثاث المطلوبة',
    s4BackBtn: 'السابق',
    s4GenerateBtn: 'توليد تصميم الغرفة المتناسق',

    s5GenTitle: 'جاري إنشاء وتنسيق تصميم غرفتك...',
    s5CompleteBadge: 'اكتمل التصميم بنجاح',
    s5RegenerateBtn: 'توليد خيار بديل',
    s5AddAllBtn: 'إضافة جميع القطع للسلة',
    s5SelectedPieces: 'قطع الأثاث المنسقة من المعرض',
    s5AllInStock: '✓ متوفر 100% في مستودع القاهرة',
    s5ClearancesPassed: '✓ مطابقة تامة للمقاسات والممرات',
    s5AuditTitle: 'مراجعة الميزانية والمسافات',
    s5AuditSub: 'حساب شفاف ودقيق للميزانية المحددة.',
    s5AllocatedBudget: 'الميزانية المخصصة:',
    s5FurnishedTotal: 'إجمالي القطع المؤثثة:',
    s5RemainingBudget: 'الميزانية المتبقية:',
    s5GeomTitle: 'التحقق الهندسي للمقاسات',
    s5Geom1: 'تم ترك مسافة مريحة 115 سم بين الكنبة وطاولة القهوة.',
    s5Geom2: 'وحدة التلفزيون 220 سم تناسب الجدار مع ترك 90 سم لفتحة الباب.',
    s5Geom3: 'سجادة الصوف الطبيعي تحدد جلسة المعيشة دون تغطية مسار التكييف.',
    s5AddAllToBag: 'أضف الغرفة بالكامل إلى السلة',
    s5AdjustBtn: 'تعديل الطلب والميزانية',

    expAModalTitle: 'التجربة (أ) · عاين القطعة داخل غرفتك',
    expAModalLiveSim: 'محاكي تجربة المعارض الحية',
    expAModalRealItem: 'معاينة قطعة حقيقية من الكتالوج:',
    expAModalEmptyLabel: 'غرفتك الأصلية',
    expAModalPlacedLabel: 'مع القطعة المحددة',
    expAModalChooseRoom: 'اختر غرفة أو ارفع صورة غرفتك الحقيقية',
    expAModalUploadBtn: 'رفع صورة غرفتي',
    expAModalPriceLabel: 'سعر المعرض',
    expAModalReadyDelivery: 'جاهز للشحن الفوري',
    expAModalFitAnalysis: 'تحليل المقاس وملاءمة الغرفة',
    expAModalProductWidth: 'عرض القطعة:',
    expAModalDepthHeight: 'العمق × الارتفاع:',
    expAModalClearance: 'ممر الحركة: 115 سم (مثالي جداً)',
    expAModalCraftsmanship: 'المواد ودقة التصنيع',
    expAModalAddToCart: 'أضف القطعة إلى سلة المعرض',
    expAModalContinue: 'مواصلة تصفح التشكيلة',

    cartTitle: 'سلة مشتريات المعرض',
    cartItemCount: 'قطع مختارة',
    cartEmptyTitle: 'سلة المشتريات فارغة',
    cartEmptyDesc: 'تصفح تشكيلة الأثاث أو استخدم مصمم الغرف بالذكاء الاصطناعي لتأثيث غرفة متكاملة.',
    cartBrowseBtn: 'تصفح التشكيلة',
    cartSubtotal: 'المجموع الفرعي:',
    cartDelivery: 'توصيل وتركيب فاخر (القاهرة والجيزة):',
    cartFreeDelivery: 'توصيل وتركيب مجاني',
    cartTotal: 'الإجمالي النهائي:',
    cartCheckoutBtn: 'إتمام حجز طلب المعرض',
    cartGuarantee: 'مشمول بضمان رومورا للتوافق المكاني الدقيق',
    cartOrderSuccessTitle: 'تم تأكيد حجز طلب المعرض!',
    cartOrderSuccessDesc: 'تم تسجيل الطلب التجريبي بنجاح. راجع فريق لوجستيات المعرض في القاهرة مقاسات غرفتك ومسارات التوصيل.',
    cartDownloadSpec: 'تحميل المقايسة المعمارية والمواصفات',

    dashPortalTitle: 'بوابة معرض لاتيلييه دي موبل - القاهرة',
    dashLiveStatus: 'ربط مفعل ونشط',
    dashStoreId: 'معرّف المعرض: eg_cairo_atelier_9021 · فرع القاهرة الرئيسي والشيخ زايد',
    dashTabOverview: 'نظرة عامة على الأداء',
    dashTabCatalog: 'إدارة نماذج 3D للكتالوج',
    dashTabSessions: 'جلسات العملاء الحية',
    dashTabEmbed: 'كود الدمج ومفتاح API',
    dashTabPlans: 'خطط الاشتراك والعائد',

    currency: 'ج.م',
  },
};

