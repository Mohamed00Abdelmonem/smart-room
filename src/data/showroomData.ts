export interface ShowroomMetric {
  label: string;
  value: string;
  delta: string;
  trend: 'up' | 'down';
  description: string;
}

export interface ShowroomAnalytics {
  metrics: ShowroomMetric[];
  recentVisualizations: {
    id: string;
    customerCity: string;
    productName: string;
    productCategory: string;
    timestamp: string;
    durationSec: number;
    convertedToCart: boolean;
    orderValueEgp?: number;
  }[];
  topVisualizedProducts: {
    sku: string;
    name: string;
    views: number;
    conversions: number;
    conversionRate: string;
    revenueEgp: number;
  }[];
}

export const SHOWROOM_MOCK_DATA: ShowroomAnalytics = {
  metrics: [
    {
      label: 'AI Room Visualizations',
      value: '18,420',
      delta: '+28.4%',
      trend: 'up',
      description: 'Sessions in the last 30 days across Cairo & Giza web traffic',
    },
    {
      label: 'Visualization-to-Cart Conversion',
      value: '38.6%',
      delta: '+14.2%',
      trend: 'up',
      description: 'vs. 4.1% standard product page conversion benchmark',
    },
    {
      label: 'Average Order Value (AOV)',
      value: '64,200 EGP',
      delta: '+52.0%',
      trend: 'up',
      description: 'Driven by multi-item room designer bundles',
    },
    {
      label: 'Return Rate Reduction',
      value: '-41.8%',
      delta: '-12.5%',
      trend: 'down',
      description: 'Eliminates scale & dimensional surprises before delivery',
    },
  ],
  recentVisualizations: [
    {
      id: 'vis-9021',
      customerCity: 'New Cairo (Fifth Settlement)',
      productName: 'Caelum Curved L-Sectional Sofa',
      productCategory: 'Sofas',
      timestamp: '4 mins ago',
      durationSec: 142,
      convertedToCart: true,
      orderValueEgp: 63300,
    },
    {
      id: 'vis-9022',
      customerCity: 'Sheikh Zayed (Palm Hills)',
      productName: 'Aura Statuario Low Coffee Table',
      productCategory: 'Tables',
      timestamp: '18 mins ago',
      durationSec: 96,
      convertedToCart: true,
      orderValueEgp: 14800,
    },
    {
      id: 'vis-9023',
      customerCity: 'Zamalek, Cairo',
      productName: 'Kanso Fluted Oak Media & TV Unit',
      productCategory: 'Storage',
      timestamp: '35 mins ago',
      durationSec: 210,
      convertedToCart: false,
    },
    {
      id: 'vis-9024',
      customerCity: 'Maadi Degla, Cairo',
      productName: 'Full Room Designer Bundle (Warm Minimalist)',
      productCategory: 'AI Room Suite',
      timestamp: '1 hour ago',
      durationSec: 380,
      convertedToCart: true,
      orderValueEgp: 78500,
    },
    {
      id: 'vis-9025',
      customerCity: 'Alexandria (Kafr Abdo)',
      productName: 'Lumina Swivel Accent Armchair',
      productCategory: 'Chairs',
      timestamp: '2 hours ago',
      durationSec: 85,
      convertedToCart: true,
      orderValueEgp: 24400,
    },
  ],
  topVisualizedProducts: [
    {
      sku: 'RM-SOF-8821',
      name: 'Caelum Curved L-Sectional Sofa',
      views: 4210,
      conversions: 1620,
      conversionRate: '38.5%',
      revenueEgp: 78570000,
    },
    {
      sku: 'RM-TBL-4412',
      name: 'Aura Statuario Coffee Table',
      views: 3120,
      conversions: 1140,
      conversionRate: '36.5%',
      revenueEgp: 16872000,
    },
    {
      sku: 'RM-STR-1092',
      name: 'Kanso Fluted Oak Media Unit',
      views: 2890,
      conversions: 980,
      conversionRate: '33.9%',
      revenueEgp: 18130000,
    },
    {
      sku: 'RM-RUG-3041',
      name: 'Seren Hand-Knotted Wool Rug',
      views: 2450,
      conversions: 890,
      conversionRate: '36.3%',
      revenueEgp: 7298000,
    },
    {
      sku: 'RM-CHR-6231',
      name: 'Lumina Swivel Accent Armchair',
      views: 2110,
      conversions: 710,
      conversionRate: '33.6%',
      revenueEgp: 8662000,
    },
  ],
};

export const INTEGRATION_PLANS = [
  {
    name: 'Showroom Starter',
    badge: 'Single Showroom',
    price: '9,500',
    currency: 'EGP / month',
    description: 'Perfect for boutique luxury furniture galleries and single-location design studios.',
    features: [
      'Up to 1,500 monthly room visualizations',
      'Catalog digitization up to 50 active SKUs',
      'Drop-in JavaScript Widget with standard theme',
      'Experience A: "See in My Room" individual placement',
      'Basic monthly analytics report',
      'Email & WhatsApp priority support',
    ],
    cta: 'Start 14-Day Free Pilot',
    highlighted: false,
  },
  {
    name: 'Retailer Scale',
    badge: 'Most Popular for Retailers',
    price: '24,000',
    currency: 'EGP / month',
    description: 'Designed for established regional furniture chains and high-volume e-commerce stores.',
    features: [
      'Unlimited monthly room visualizations',
      'Catalog digitization up to 350 active SKUs',
      'Experience A + Experience B (Full AI Room Designer)',
      'Custom branded widget matching your showroom typography & colors',
      'Shopify, Magento & WooCommerce instant plugins',
      'Real-time conversion & analytics dashboard',
      'Dedicated showroom onboarding specialist in Cairo',
    ],
    cta: 'Book Showroom Deployment',
    highlighted: true,
  },
  {
    name: 'Enterprise Brand',
    badge: 'Manufacturers & Multi-Branch',
    price: 'Custom',
    currency: 'Bespoke Architecture',
    description: 'Tailored for nationwide manufacturers, franchise groups, and luxury development projects.',
    features: [
      'Full headless REST & GraphQL APIs + Mobile SDK (iOS / Android)',
      'Unlimited SKUs with photogrammetry 3D digital twin pipeline',
      'Custom fine-tuned room segmentation AI model',
      'In-store interactive showroom kiosks & tablet sales enablement',
      'ERP & SAP / Microsoft Dynamics real-time stock sync',
      '99.9% uptime SLA & 24/7 dedicated engineering support',
    ],
    cta: 'Speak with Solutions Architect',
    highlighted: false,
  },
];

