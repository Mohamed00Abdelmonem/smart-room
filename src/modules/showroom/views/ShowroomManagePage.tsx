import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useShowroomMarketplace } from '../context/ShowroomMarketplaceContext';
import type { ListingStatus, MarketplaceBrand, MarketplacePlace, MarketplaceProduct } from '../types';
import { useLanguage } from '../../../context/LanguageContext';
import {
  ArrowLeft,
  ArrowRight,
  Building2,
  MapPin,
  Layers,
  Star,
  Plus,
  RotateCcw,
  Upload,
  CheckCircle2,
  AlertCircle,
  Edit3,
} from 'lucide-react';

type ManageTab = 'brands' | 'places' | 'products';

const slugify = (text: string) =>
  text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');

const readFileAsDataUrl = (file: File, onLoad: (url: string) => void) => {
  const reader = new FileReader();
  reader.onload = () => {
    if (typeof reader.result === 'string') onLoad(reader.result);
  };
  reader.readAsDataURL(file);
};

export const ShowroomManagePage: React.FC = () => {
  const {
    brands,
    places,
    products,
    getBrandById,
    saveBrand,
    toggleBrandFeatured,
    setBrandStatus,
    savePlace,
    togglePlaceFeatured,
    setPlaceStatus,
    saveProduct,
    toggleProductFeatured,
    setProductStatus,
    resetMarketplaceData,
  } = useShowroomMarketplace();
  const { isRTL, formatPrice } = useLanguage();

  const BackArrow = isRTL ? ArrowRight : ArrowLeft;

  const [tab, setTab] = useState<ManageTab>('brands');
  const [feedback, setFeedback] = useState<{ type: 'ok' | 'err'; msg: string } | null>(null);

  // Brand form state
  const [editingBrandId, setEditingBrandId] = useState<string | undefined>(undefined);
  const [brandName, setBrandName] = useState('');
  const [brandNameAr, setBrandNameAr] = useState('');
  const [brandOrigin, setBrandOrigin] = useState('Cairo, Egypt');
  const [brandLogo, setBrandLogo] = useState('');
  const [brandCover, setBrandCover] = useState('');
  const [brandDesc, setBrandDesc] = useState('');
  const [brandCategories, setBrandCategories] = useState('Sofas, Living, Tables');
  const [brandCollections, setBrandCollections] = useState('Living Room Collection, Modern Collection');
  const [brandVerified, setBrandVerified] = useState(true);

  // Place form state
  const [editingPlaceId, setEditingPlaceId] = useState<string | undefined>(undefined);
  const [placeName, setPlaceName] = useState('');
  const [placeNameAr, setPlaceNameAr] = useState('');
  const [placeLocation, setPlaceLocation] = useState('New Cairo');
  const [placeAddress, setPlaceAddress] = useState('');
  const [placePhone, setPlacePhone] = useState('+20 2 2410 8890');
  const [placeEmail, setPlaceEmail] = useState('concierge@vestaia.eg');
  const [placeHours, setPlaceHours] = useState('Daily: 10:00 AM – 10:00 PM');
  const [placeLogo, setPlaceLogo] = useState('');
  const [placeCover, setPlaceCover] = useState('');
  const [placeDesc, setPlaceDesc] = useState('');
  const [placeBrandIds, setPlaceBrandIds] = useState<string[]>([]);

  // Product form state
  const [editingProductId, setEditingProductId] = useState<string | undefined>(undefined);
  const [prodName, setProdName] = useState('');
  const [prodNameAr, setProdNameAr] = useState('');
  const [prodSku, setProdSku] = useState('');
  const [prodBrandId, setProdBrandId] = useState<string>(brands[0]?.id || '');
  const [prodStoreIds, setProdStoreIds] = useState<string[]>(places[0] ? [places[0].id] : []);
  const [prodCategory, setProdCategory] = useState('sofas');
  const [prodCollection, setProdCollection] = useState('Living Room Collection');
  const [prodPrice, setProdPrice] = useState('32500');
  const [prodMaterials, setProdMaterials] = useState('Solid European Oak, Belgian Bouclé');
  const [prodColors, setProdColors] = useState('Warm Ivory, Charcoal Slate');
  const [prodWidth, setProdWidth] = useState('240');
  const [prodDepth, setProdDepth] = useState('102');
  const [prodHeight, setProdHeight] = useState('78');
  const [prodImage, setProdImage] = useState('');
  const [prodDesc, setProdDesc] = useState('');

  const notify = (type: 'ok' | 'err', msg: string) => {
    setFeedback({ type, msg });
    window.setTimeout(() => setFeedback(null), 4000);
  };

  // --- Brand Handlers ---
  const loadBrandIntoForm = (b: MarketplaceBrand) => {
    setEditingBrandId(b.id);
    setBrandName(b.name);
    setBrandNameAr(b.nameAr);
    setBrandOrigin(b.origin);
    setBrandLogo(b.logo);
    setBrandCover(b.coverImage);
    setBrandDesc(b.description);
    setBrandCategories(b.categories.join(', '));
    setBrandCollections(b.collections.join(', '));
    setBrandVerified(b.verified);
    setTab('brands');
  };

  const resetBrandForm = () => {
    setEditingBrandId(undefined);
    setBrandName('');
    setBrandNameAr('');
    setBrandOrigin('Cairo, Egypt');
    setBrandLogo('');
    setBrandCover('');
    setBrandDesc('');
    setBrandCategories('Sofas, Living, Tables');
    setBrandCollections('Living Room Collection, Modern Collection');
    setBrandVerified(true);
  };

  const handleSaveBrand = (e: React.FormEvent) => {
    e.preventDefault();
    if (!brandName.trim() || !brandDesc.trim()) {
      notify('err', isRTL ? 'يرجى إدخال اسم العلامة التجارية والوصف.' : 'Brand name and description are required.');
      return;
    }
    const slug = slugify(brandName) || `brand-${Date.now()}`;
    saveBrand({
      id: editingBrandId,
      name: brandName.trim(),
      nameAr: brandNameAr.trim() || brandName.trim(),
      slug,
      logo:
        brandLogo.trim() ||
        'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=300&q=80',
      coverImage:
        brandCover.trim() ||
        'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=80',
      description: brandDesc.trim(),
      descriptionAr: brandDesc.trim(),
      origin: brandOrigin.trim() || 'Cairo, Egypt',
      categories: brandCategories
        .split(',')
        .map((c) => c.trim())
        .filter(Boolean),
      collections: brandCollections
        .split(',')
        .map((c) => c.trim())
        .filter(Boolean),
      featured: false,
      verified: brandVerified,
      status: 'published',
    });
    notify('ok', isRTL ? 'تم حفظ العلامة التجارية بنجاح.' : 'Brand saved cleanly.');
    resetBrandForm();
  };

  // --- Place Handlers ---
  const loadPlaceIntoForm = (p: MarketplacePlace) => {
    setEditingPlaceId(p.id);
    setPlaceName(p.name);
    setPlaceNameAr(p.nameAr);
    setPlaceLocation(p.location);
    setPlaceAddress(p.address);
    setPlacePhone(p.contactInfo.phone);
    setPlaceEmail(p.contactInfo.email);
    setPlaceHours(p.openingHours);
    setPlaceLogo(p.logo);
    setPlaceCover(p.coverImage);
    setPlaceDesc(p.description);
    setPlaceBrandIds(p.brandIds);
    setTab('places');
  };

  const resetPlaceForm = () => {
    setEditingPlaceId(undefined);
    setPlaceName('');
    setPlaceNameAr('');
    setPlaceLocation('New Cairo');
    setPlaceAddress('');
    setPlaceLogo('');
    setPlaceCover('');
    setPlaceDesc('');
    setPlaceBrandIds([]);
  };

  const handleSavePlace = (e: React.FormEvent) => {
    e.preventDefault();
    if (!placeName.trim() || !placeAddress.trim()) {
      notify('err', isRTL ? 'يرجى إدخال اسم صالة العرض والعنوان.' : 'Showroom name and address are required.');
      return;
    }
    const slug = slugify(placeName) || `place-${Date.now()}`;
    savePlace({
      id: editingPlaceId,
      name: placeName.trim(),
      nameAr: placeNameAr.trim() || placeName.trim(),
      slug,
      logo:
        placeLogo.trim() ||
        'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=300&q=80',
      coverImage:
        placeCover.trim() ||
        'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80',
      description: placeDesc.trim() || `Flagship VESTAIA showroom located in ${placeLocation}.`,
      descriptionAr: placeDesc.trim() || `صالة عرض رئيسية في ${placeLocation}.`,
      address: placeAddress.trim(),
      addressAr: placeAddress.trim(),
      location: placeLocation.trim() || 'Cairo',
      locationAr: placeLocation.trim() || 'القاهرة',
      contactInfo: {
        phone: placePhone.trim() || '+20 2 2410 8890',
        email: placeEmail.trim() || 'concierge@vestaia.eg',
      },
      openingHours: placeHours.trim() || 'Daily: 10:00 AM – 10:00 PM',
      openingHoursAr: placeHours.trim() || 'يومياً: ١٠ ص – ١٠ م',
      brandIds: placeBrandIds,
      featured: false,
      status: 'published',
    });
    notify('ok', isRTL ? 'تم حفظ بيانات صالة العرض.' : 'Showroom saved cleanly.');
    resetPlaceForm();
  };

  // --- Product Handlers ---
  const loadProductIntoForm = (prod: MarketplaceProduct) => {
    setEditingProductId(prod.id);
    setProdName(prod.name);
    setProdNameAr(prod.nameAr);
    setProdSku(prod.sku);
    setProdBrandId(prod.brandId);
    setProdStoreIds(prod.storeIds);
    setProdCategory(prod.categoryId);
    setProdCollection(prod.collection);
    setProdPrice(String(prod.price));
    setProdMaterials(prod.materials);
    setProdColors(prod.colors.join(', '));
    setProdWidth(String(prod.dimensions.widthCm));
    setProdDepth(String(prod.dimensions.depthCm));
    setProdHeight(String(prod.dimensions.heightCm));
    setProdImage(prod.images[0] || '');
    setProdDesc(prod.description);
    setTab('products');
  };

  const resetProductForm = () => {
    setEditingProductId(undefined);
    setProdName('');
    setProdNameAr('');
    setProdSku('');
    setProdBrandId(brands[0]?.id || '');
    setProdStoreIds(places[0] ? [places[0].id] : []);
    setProdPrice('32500');
    setProdImage('');
    setProdDesc('');
  };

  const handleSaveProduct = (e: React.FormEvent) => {
    e.preventDefault();
    const numericPrice = Number(prodPrice);
    if (!prodName.trim() || !prodBrandId || Number.isNaN(numericPrice) || numericPrice <= 0) {
      notify(
        'err',
        isRTL
          ? 'يرجى إدخال اسم القطعة، الماركة، وسعر صحيح.'
          : 'Product name, brand, and a valid positive price are required.'
      );
      return;
    }
    const slug = slugify(prodName) || `product-${Date.now()}`;
    saveProduct({
      id: editingProductId,
      slug,
      sku: prodSku.trim() || `VST-${Math.floor(1000 + Math.random() * 9000)}`,
      name: prodName.trim(),
      nameAr: prodNameAr.trim() || prodName.trim(),
      description: prodDesc.trim() || `Crafted with ${prodMaterials} for refined modern interiors.`,
      descriptionAr: prodDesc.trim() || `مصمم بخامات ${prodMaterials} للمساحات الراقية.`,
      brandId: prodBrandId,
      storeIds: prodStoreIds,
      categoryId: prodCategory,
      categoryLabel: prodCategory.charAt(0).toUpperCase() + prodCategory.slice(1),
      categoryLabelAr: prodCategory,
      collection: prodCollection.trim() || 'Modern Collection',
      style: 'Modern',
      price: numericPrice,
      currency: 'EGP',
      dimensions: {
        widthCm: Number(prodWidth) || 220,
        depthCm: Number(prodDepth) || 95,
        heightCm: Number(prodHeight) || 78,
      },
      materials: prodMaterials.trim() || 'Solid Oak, Performance Fabric',
      materialsAr: prodMaterials.trim(),
      colors: prodColors
        .split(',')
        .map((c) => c.trim())
        .filter(Boolean),
      colorsAr: prodColors
        .split(',')
        .map((c) => c.trim())
        .filter(Boolean),
      images: [
        prodImage.trim() ||
          'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=1200&q=85',
      ],
      featured: false,
      status: 'published',
    });
    notify('ok', isRTL ? 'تم حفظ المنتج وربطه بالمعارض المحددة.' : 'Product saved and linked to selected stores.');
    resetProductForm();
  };

  const toggleIdInList = (id: string, list: string[], setter: (next: string[]) => void) => {
    setter(list.includes(id) ? list.filter((x) => x !== id) : [...list, id]);
  };

  return (
    <div
      dir={isRTL ? 'rtl' : 'ltr'}
      className="min-h-screen bg-[#F8F7F3] dark:bg-[#121110] pt-28 pb-24 transition-colors duration-300"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <Link
              to="/showroom"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-[#B58A54] hover:underline"
            >
              <BackArrow className="w-3.5 h-3.5" />
              <span>{isRTL ? 'العودة إلى سوق العرض' : 'Back to Showroom Marketplace'}</span>
            </Link>
            <h1 className="font-editorial text-3xl sm:text-4xl font-medium text-[#292722] dark:text-[#F8F7F3]">
              {isRTL ? 'إدارة سوق المعرض والماركات' : 'Showroom Marketplace Management'}
            </h1>
            <p className="text-xs text-[#8A8175]">
              {isRTL
                ? 'أضف وعدّل الماركات، وصالات العرض، والمنتجات المرتبطة بعدة متاجر، وتحكم في النشر والتمييز.'
                : 'Manage furniture brands, physical showrooms, and shared catalog products linked across multiple stores.'}
            </p>
          </div>

          <button
            type="button"
            onClick={() => {
              resetMarketplaceData();
              notify('ok', isRTL ? 'تمت استعادة البيانات الافتراضية.' : 'Marketplace reset to seed catalog.');
            }}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white dark:bg-[#1C1A17] border border-[#E2DAD0] dark:border-[#2D2A26] text-xs font-bold text-[#5C544B] dark:text-[#BDB5AA] hover:border-[#B58A54]"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>{isRTL ? 'استعادة البيانات الأولية' : 'Reset Demo Data'}</span>
          </button>
        </div>

        {/* Feedback Toast */}
        {feedback && (
          <div
            className={`p-4 rounded-2xl border flex items-center gap-2.5 text-xs font-semibold ${
              feedback.type === 'ok'
                ? 'bg-emerald-50 dark:bg-emerald-950/30 border-emerald-200 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300'
                : 'bg-red-50 dark:bg-red-950/30 border-red-200 dark:border-red-800 text-red-800 dark:text-red-300'
            }`}
          >
            {feedback.type === 'ok' ? (
              <CheckCircle2 className="w-4 h-4 shrink-0" />
            ) : (
              <AlertCircle className="w-4 h-4 shrink-0" />
            )}
            <span>{feedback.msg}</span>
          </div>
        )}

        {/* Section Tabs */}
        <div className="flex flex-wrap items-center gap-2 border-b border-[#E8E2D9] dark:border-[#26231F] pb-3">
          {[
            { id: 'brands' as const, labelEn: 'Brands', labelAr: 'الماركات', count: brands.length, icon: Building2 },
            { id: 'places' as const, labelEn: 'Places & Showrooms', labelAr: 'الأماكن والمعارض', count: places.length, icon: MapPin },
            { id: 'products' as const, labelEn: 'Products & Store Links', labelAr: 'المنتجات وربط المتاجر', count: products.length, icon: Layers },
          ].map((item) => {
            const Icon = item.icon;
            const active = tab === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => setTab(item.id)}
                className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
                  active
                    ? 'bg-[#292722] dark:bg-[#F8F7F3] text-white dark:text-[#1C1A17]'
                    : 'bg-white dark:bg-[#1C1A17] text-[#5C544B] dark:text-[#A89F92] border border-[#E2DAD0] dark:border-[#2D2A26]'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{isRTL ? item.labelAr : item.labelEn}</span>
                <span className="px-1.5 py-0.5 rounded-md bg-[#B58A54]/20 text-[#B58A54] text-[10px]">
                  {item.count}
                </span>
              </button>
            );
          })}
        </div>

        {/* TAB 1: BRANDS */}
        {tab === 'brands' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <form
              onSubmit={handleSaveBrand}
              className="lg:col-span-5 p-6 rounded-3xl bg-white dark:bg-[#1C1A17] border border-[#E8E2D9] dark:border-[#2D2A26] space-y-4"
            >
              <div className="flex items-center justify-between">
                <h2 className="font-editorial text-xl text-[#292722] dark:text-[#F8F7F3]">
                  {editingBrandId
                    ? isRTL ? 'تعديل علامة تجارية' : 'Edit Brand'
                    : isRTL ? 'إضافة علامة تجارية جديدة' : 'Add Furniture Brand'}
                </h2>
                {editingBrandId && (
                  <button
                    type="button"
                    onClick={resetBrandForm}
                    className="text-xs font-semibold text-[#B58A54] hover:underline"
                  >
                    {isRTL ? 'إلغاء التعديل' : 'Cancel Edit'}
                  </button>
                )}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <input
                  type="text"
                  value={brandName}
                  onChange={(e) => setBrandName(e.target.value)}
                  placeholder={isRTL ? 'اسم الماركة (EN) *' : 'Brand Name *'}
                  className="px-3.5 py-2.5 rounded-xl bg-[#F8F7F3] dark:bg-[#141210] border border-[#E2DAD0] dark:border-[#2D2A26] text-xs"
                />
                <input
                  type="text"
                  value={brandNameAr}
                  onChange={(e) => setBrandNameAr(e.target.value)}
                  placeholder={isRTL ? 'اسم الماركة (عربي)' : 'Arabic Name'}
                  className="px-3.5 py-2.5 rounded-xl bg-[#F8F7F3] dark:bg-[#141210] border border-[#E2DAD0] dark:border-[#2D2A26] text-xs"
                />
              </div>

              <input
                type="text"
                value={brandOrigin}
                onChange={(e) => setBrandOrigin(e.target.value)}
                placeholder={isRTL ? 'بلد المنشأ (مثال: القاهرة، مصر)' : 'Origin (e.g., Milan / Cairo)'}
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#F8F7F3] dark:bg-[#141210] border border-[#E2DAD0] dark:border-[#2D2A26] text-xs"
              />

              <div className="space-y-2">
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={brandLogo}
                    onChange={(e) => setBrandLogo(e.target.value)}
                    placeholder={isRTL ? 'رابط الشعار (Logo URL)' : 'Logo Image URL'}
                    className="flex-1 px-3.5 py-2.5 rounded-xl bg-[#F8F7F3] dark:bg-[#141210] border border-[#E2DAD0] dark:border-[#2D2A26] text-xs"
                  />
                  <label className="px-3 py-2.5 rounded-xl bg-[#F5F1EA] dark:bg-[#25221E] text-xs font-bold cursor-pointer inline-flex items-center gap-1.5">
                    <Upload className="w-3.5 h-3.5 text-[#B58A54]" />
                    <span>{isRTL ? 'رفع' : 'Upload'}</span>
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => {
                        const f = e.target.files?.[0];
                        if (f) readFileAsDataUrl(f, setBrandLogo);
                      }}
                    />
                  </label>
                </div>

                <div className="flex gap-2">
                  <input
                    type="text"
                    value={brandCover}
                    onChange={(e) => setBrandCover(e.target.value)}
                    placeholder={isRTL ? 'رابط صورة الغلاف (Cover URL)' : 'Cover Image URL'}
                    className="flex-1 px-3.5 py-2.5 rounded-xl bg-[#F8F7F3] dark:bg-[#141210] border border-[#E2DAD0] dark:border-[#2D2A26] text-xs"
                  />
                  <label className="px-3 py-2.5 rounded-xl bg-[#F5F1EA] dark:bg-[#25221E] text-xs font-bold cursor-pointer inline-flex items-center gap-1.5">
                    <Upload className="w-3.5 h-3.5 text-[#B58A54]" />
                    <span>{isRTL ? 'رفع' : 'Upload'}</span>
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => {
                        const f = e.target.files?.[0];
                        if (f) readFileAsDataUrl(f, setBrandCover);
                      }}
                    />
                  </label>
                </div>
              </div>

              <input
                type="text"
                value={brandCategories}
                onChange={(e) => setBrandCategories(e.target.value)}
                placeholder={isRTL ? 'الفئات (مفصولة بفاصلة)' : 'Categories (comma-separated)'}
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#F8F7F3] dark:bg-[#141210] border border-[#E2DAD0] dark:border-[#2D2A26] text-xs"
              />

              <input
                type="text"
                value={brandCollections}
                onChange={(e) => setBrandCollections(e.target.value)}
                placeholder={isRTL ? 'التشكيلات (مفصولة بفاصلة)' : 'Collections (comma-separated)'}
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#F8F7F3] dark:bg-[#141210] border border-[#E2DAD0] dark:border-[#2D2A26] text-xs"
              />

              <textarea
                rows={3}
                value={brandDesc}
                onChange={(e) => setBrandDesc(e.target.value)}
                placeholder={isRTL ? 'وصف العلامة التجارية *' : 'Brand Description *'}
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#F8F7F3] dark:bg-[#141210] border border-[#E2DAD0] dark:border-[#2D2A26] text-xs"
              />

              <label className="flex items-center gap-2 text-xs font-medium text-[#292722] dark:text-[#EAE6DF]">
                <input
                  type="checkbox"
                  checked={brandVerified}
                  onChange={(e) => setBrandVerified(e.target.checked)}
                  className="accent-[#B58A54]"
                />
                <span>{isRTL ? 'علامة موثقة (Verified Badge)' : 'Verified Partner Brand'}</span>
              </label>

              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-[#292722] dark:bg-[#F8F7F3] text-white dark:text-[#1C1A17] text-xs font-bold hover:bg-[#B58A54] dark:hover:bg-[#B58A54] dark:hover:text-white transition-colors inline-flex items-center justify-center gap-1.5"
              >
                <Plus className="w-4 h-4" />
                <span>
                  {editingBrandId
                    ? isRTL ? 'تحديث العلامة التجارية' : 'Update Brand'
                    : isRTL ? 'حفظ ونشر الماركة' : 'Save & Publish Brand'}
                </span>
              </button>
            </form>

            {/* Brands Table */}
            <div className="lg:col-span-7 space-y-3">
              {brands.map((brand) => (
                <div
                  key={brand.id}
                  className="p-4 rounded-2xl bg-white dark:bg-[#1C1A17] border border-[#E8E2D9] dark:border-[#2D2A26] flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                >
                  <div className="flex items-center gap-3.5">
                    <img
                      src={brand.logo}
                      alt={brand.name}
                      className="w-12 h-12 rounded-xl object-cover shrink-0 border border-[#E8E2D9]"
                    />
                    <div>
                      <div className="flex items-center gap-2">
                        <Link
                          to={`/showroom/brands/${brand.slug}`}
                          className="font-bold text-sm text-[#292722] dark:text-[#F8F7F3] hover:text-[#B58A54]"
                        >
                          {isRTL && brand.nameAr ? brand.nameAr : brand.name}
                        </Link>
                        <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#F5F1EA] dark:bg-[#25221E] text-[#8A8175]">
                          {brand.status}
                        </span>
                      </div>
                      <p className="text-xs text-[#8A8175] mt-0.5">{brand.origin}</p>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-2">
                    <button
                      type="button"
                      onClick={() => toggleBrandFeatured(brand.id)}
                      className={`p-2 rounded-lg border text-xs ${
                        brand.featured
                          ? 'bg-[#B58A54]/15 border-[#B58A54] text-[#B58A54]'
                          : 'border-[#E2DAD0] dark:border-[#2D2A26] text-[#8A8175]'
                      }`}
                      title="Feature / Unfeature"
                    >
                      <Star className="w-3.5 h-3.5 fill-current" />
                    </button>

                    <select
                      value={brand.status}
                      onChange={(e) => setBrandStatus(brand.id, e.target.value as ListingStatus)}
                      aria-label="Brand status"
                      className="px-2.5 py-1.5 rounded-lg bg-[#F8F7F3] dark:bg-[#141210] border border-[#E2DAD0] dark:border-[#2D2A26] text-[11px] font-semibold"
                    >
                      <option value="published">Published</option>
                      <option value="draft">Draft</option>
                      <option value="archived">Archived</option>
                    </select>

                    <button
                      type="button"
                      onClick={() => loadBrandIntoForm(brand)}
                      className="p-2 rounded-lg border border-[#E2DAD0] dark:border-[#2D2A26] text-[#5C544B] hover:border-[#B58A54]"
                      title="Edit Brand"
                    >
                      <Edit3 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 2: PLACES / PHYSICAL SHOWROOMS */}
        {tab === 'places' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <form
              onSubmit={handleSavePlace}
              className="lg:col-span-5 p-6 rounded-3xl bg-white dark:bg-[#1C1A17] border border-[#E8E2D9] dark:border-[#2D2A26] space-y-4"
            >
              <div className="flex items-center justify-between">
                <h2 className="font-editorial text-xl text-[#292722] dark:text-[#F8F7F3]">
                  {editingPlaceId
                    ? isRTL ? 'تعديل صالة العرض' : 'Edit Showroom Place'
                    : isRTL ? 'إضافة صالة عرض جديدة' : 'Add Physical Showroom'}
                </h2>
                {editingPlaceId && (
                  <button
                    type="button"
                    onClick={resetPlaceForm}
                    className="text-xs font-semibold text-[#B58A54] hover:underline"
                  >
                    {isRTL ? 'إلغاء' : 'Cancel Edit'}
                  </button>
                )}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <input
                  type="text"
                  value={placeName}
                  onChange={(e) => setPlaceName(e.target.value)}
                  placeholder={isRTL ? 'اسم المعرض (EN) *' : 'Showroom Name *'}
                  className="px-3.5 py-2.5 rounded-xl bg-[#F8F7F3] dark:bg-[#141210] border border-[#E2DAD0] dark:border-[#2D2A26] text-xs"
                />
                <input
                  type="text"
                  value={placeNameAr}
                  onChange={(e) => setPlaceNameAr(e.target.value)}
                  placeholder={isRTL ? 'اسم المعرض (عربي)' : 'Arabic Name'}
                  className="px-3.5 py-2.5 rounded-xl bg-[#F8F7F3] dark:bg-[#141210] border border-[#E2DAD0] dark:border-[#2D2A26] text-xs"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <input
                  type="text"
                  value={placeLocation}
                  onChange={(e) => setPlaceLocation(e.target.value)}
                  placeholder={isRTL ? 'المدينة / المنطقة' : 'City / District'}
                  className="px-3.5 py-2.5 rounded-xl bg-[#F8F7F3] dark:bg-[#141210] border border-[#E2DAD0] dark:border-[#2D2A26] text-xs"
                />
                <input
                  type="text"
                  value={placeHours}
                  onChange={(e) => setPlaceHours(e.target.value)}
                  placeholder={isRTL ? 'ساعات العمل' : 'Opening Hours'}
                  className="px-3.5 py-2.5 rounded-xl bg-[#F8F7F3] dark:bg-[#141210] border border-[#E2DAD0] dark:border-[#2D2A26] text-xs"
                />
              </div>

              <input
                type="text"
                value={placeAddress}
                onChange={(e) => setPlaceAddress(e.target.value)}
                placeholder={isRTL ? 'العنوان بالتفصيل *' : 'Full Street Address *'}
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#F8F7F3] dark:bg-[#141210] border border-[#E2DAD0] dark:border-[#2D2A26] text-xs"
              />

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <input
                  type="text"
                  value={placePhone}
                  onChange={(e) => setPlacePhone(e.target.value)}
                  placeholder="Phone"
                  className="px-3.5 py-2.5 rounded-xl bg-[#F8F7F3] dark:bg-[#141210] border border-[#E2DAD0] dark:border-[#2D2A26] text-xs"
                />
                <input
                  type="email"
                  value={placeEmail}
                  onChange={(e) => setPlaceEmail(e.target.value)}
                  placeholder="Email"
                  className="px-3.5 py-2.5 rounded-xl bg-[#F8F7F3] dark:bg-[#141210] border border-[#E2DAD0] dark:border-[#2D2A26] text-xs"
                />
              </div>

              <div className="flex gap-2">
                <input
                  type="text"
                  value={placeCover}
                  onChange={(e) => setPlaceCover(e.target.value)}
                  placeholder={isRTL ? 'رابط صورة صالة العرض' : 'Showroom Cover URL'}
                  className="flex-1 px-3.5 py-2.5 rounded-xl bg-[#F8F7F3] dark:bg-[#141210] border border-[#E2DAD0] dark:border-[#2D2A26] text-xs"
                />
                <label className="px-3 py-2.5 rounded-xl bg-[#F5F1EA] dark:bg-[#25221E] text-xs font-bold cursor-pointer inline-flex items-center gap-1.5">
                  <Upload className="w-3.5 h-3.5 text-[#B58A54]" />
                  <span>{isRTL ? 'رفع' : 'Upload'}</span>
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => {
                      const f = e.target.files?.[0];
                      if (f) readFileAsDataUrl(f, setPlaceCover);
                    }}
                  />
                </label>
              </div>

              <div className="space-y-1.5">
                <p className="text-[11px] font-bold text-[#8A8175]">
                  {isRTL ? 'الماركات المتوفرة بالمعرض:' : 'Associated Brands:'}
                </p>
                <div className="flex flex-wrap gap-2">
                  {brands.map((b) => (
                    <label
                      key={b.id}
                      className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs cursor-pointer ${
                        placeBrandIds.includes(b.id)
                          ? 'bg-[#B58A54]/12 border-[#B58A54] text-[#9C7240]'
                          : 'border-[#E2DAD0] dark:border-[#2D2A26]'
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={placeBrandIds.includes(b.id)}
                        onChange={() => toggleIdInList(b.id, placeBrandIds, setPlaceBrandIds)}
                        className="accent-[#B58A54]"
                      />
                      <span>{b.name}</span>
                    </label>
                  ))}
                </div>
              </div>

              <textarea
                rows={2}
                value={placeDesc}
                onChange={(e) => setPlaceDesc(e.target.value)}
                placeholder={isRTL ? 'وصف صالة العرض' : 'Showroom Description'}
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#F8F7F3] dark:bg-[#141210] border border-[#E2DAD0] dark:border-[#2D2A26] text-xs"
              />

              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-[#292722] dark:bg-[#F8F7F3] text-white dark:text-[#1C1A17] text-xs font-bold hover:bg-[#B58A54] transition-colors inline-flex items-center justify-center gap-1.5"
              >
                <Plus className="w-4 h-4" />
                <span>{editingPlaceId ? 'Update Showroom' : 'Save & Publish Showroom'}</span>
              </button>
            </form>

            {/* Places Table */}
            <div className="lg:col-span-7 space-y-3">
              {places.map((place) => (
                <div
                  key={place.id}
                  className="p-4 rounded-2xl bg-white dark:bg-[#1C1A17] border border-[#E8E2D9] dark:border-[#2D2A26] flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                >
                  <div className="flex items-center gap-3.5">
                    <img
                      src={place.coverImage}
                      alt={place.name}
                      className="w-14 h-12 rounded-xl object-cover shrink-0"
                    />
                    <div>
                      <Link
                        to={`/showroom/places/${place.slug}`}
                        className="font-bold text-sm text-[#292722] dark:text-[#F8F7F3] hover:text-[#B58A54]"
                      >
                        {isRTL && place.nameAr ? place.nameAr : place.name}
                      </Link>
                      <p className="text-xs text-[#8A8175]">
                        {place.location} · {place.brandIds.length} brands
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-2">
                    <button
                      type="button"
                      onClick={() => togglePlaceFeatured(place.id)}
                      className={`p-2 rounded-lg border text-xs ${
                        place.featured
                          ? 'bg-[#B58A54]/15 border-[#B58A54] text-[#B58A54]'
                          : 'border-[#E2DAD0] dark:border-[#2D2A26] text-[#8A8175]'
                      }`}
                    >
                      <Star className="w-3.5 h-3.5 fill-current" />
                    </button>

                    <select
                      value={place.status}
                      onChange={(e) => setPlaceStatus(place.id, e.target.value as ListingStatus)}
                      aria-label="Showroom status"
                      className="px-2.5 py-1.5 rounded-lg bg-[#F8F7F3] dark:bg-[#141210] border border-[#E2DAD0] dark:border-[#2D2A26] text-[11px] font-semibold"
                    >
                      <option value="published">Published</option>
                      <option value="draft">Draft</option>
                      <option value="archived">Archived</option>
                    </select>

                    <button
                      type="button"
                      onClick={() => loadPlaceIntoForm(place)}
                      className="p-2 rounded-lg border border-[#E2DAD0] dark:border-[#2D2A26] text-[#5C544B] hover:border-[#B58A54]"
                    >
                      <Edit3 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 3: PRODUCTS & MULTI-STORE LINKING */}
        {tab === 'products' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <form
              onSubmit={handleSaveProduct}
              className="lg:col-span-5 p-6 rounded-3xl bg-white dark:bg-[#1C1A17] border border-[#E8E2D9] dark:border-[#2D2A26] space-y-4"
            >
              <div className="flex items-center justify-between">
                <h2 className="font-editorial text-xl text-[#292722] dark:text-[#F8F7F3]">
                  {editingProductId
                    ? isRTL ? 'تعديل قطعة أثاث' : 'Edit Product'
                    : isRTL ? 'إضافة قطعة وربطها بالمتاجر' : 'Add Product & Store Links'}
                </h2>
                {editingProductId && (
                  <button
                    type="button"
                    onClick={resetProductForm}
                    className="text-xs font-semibold text-[#B58A54] hover:underline"
                  >
                    {isRTL ? 'إلغاء' : 'Cancel Edit'}
                  </button>
                )}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <input
                  type="text"
                  value={prodName}
                  onChange={(e) => setProdName(e.target.value)}
                  placeholder={isRTL ? 'اسم القطعة *' : 'Product Name *'}
                  className="px-3.5 py-2.5 rounded-xl bg-[#F8F7F3] dark:bg-[#141210] border border-[#E2DAD0] dark:border-[#2D2A26] text-xs"
                />
                <input
                  type="text"
                  value={prodNameAr}
                  onChange={(e) => setProdNameAr(e.target.value)}
                  placeholder={isRTL ? 'الاسم بالعربية' : 'Arabic Name'}
                  className="px-3.5 py-2.5 rounded-xl bg-[#F8F7F3] dark:bg-[#141210] border border-[#E2DAD0] dark:border-[#2D2A26] text-xs"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <select
                  value={prodBrandId}
                  onChange={(e) => setProdBrandId(e.target.value)}
                  aria-label="Associate Brand"
                  className="px-3.5 py-2.5 rounded-xl bg-[#F8F7F3] dark:bg-[#141210] border border-[#E2DAD0] dark:border-[#2D2A26] text-xs font-semibold"
                >
                  {brands.map((b) => (
                    <option key={b.id} value={b.id}>
                      {b.name}
                    </option>
                  ))}
                </select>

                <select
                  value={prodCategory}
                  onChange={(e) => setProdCategory(e.target.value)}
                  aria-label="Category"
                  className="px-3.5 py-2.5 rounded-xl bg-[#F8F7F3] dark:bg-[#141210] border border-[#E2DAD0] dark:border-[#2D2A26] text-xs font-semibold"
                >
                  <option value="sofas">Sofas</option>
                  <option value="tables">Tables</option>
                  <option value="chairs">Chairs</option>
                  <option value="storage">Storage</option>
                  <option value="lighting">Lighting</option>
                  <option value="rugs">Rugs</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <input
                  type="number"
                  value={prodPrice}
                  onChange={(e) => setProdPrice(e.target.value)}
                  placeholder="Price (EGP) *"
                  className="px-3.5 py-2.5 rounded-xl bg-[#F8F7F3] dark:bg-[#141210] border border-[#E2DAD0] dark:border-[#2D2A26] text-xs"
                />
                <input
                  type="text"
                  value={prodCollection}
                  onChange={(e) => setProdCollection(e.target.value)}
                  placeholder="Collection"
                  className="px-3.5 py-2.5 rounded-xl bg-[#F8F7F3] dark:bg-[#141210] border border-[#E2DAD0] dark:border-[#2D2A26] text-xs"
                />
              </div>

              <div className="grid grid-cols-3 gap-2">
                <input
                  type="number"
                  value={prodWidth}
                  onChange={(e) => setProdWidth(e.target.value)}
                  placeholder="Width cm"
                  className="px-3 py-2 rounded-xl bg-[#F8F7F3] dark:bg-[#141210] border border-[#E2DAD0] dark:border-[#2D2A26] text-xs"
                />
                <input
                  type="number"
                  value={prodDepth}
                  onChange={(e) => setProdDepth(e.target.value)}
                  placeholder="Depth cm"
                  className="px-3 py-2 rounded-xl bg-[#F8F7F3] dark:bg-[#141210] border border-[#E2DAD0] dark:border-[#2D2A26] text-xs"
                />
                <input
                  type="number"
                  value={prodHeight}
                  onChange={(e) => setProdHeight(e.target.value)}
                  placeholder="Height cm"
                  className="px-3 py-2 rounded-xl bg-[#F8F7F3] dark:bg-[#141210] border border-[#E2DAD0] dark:border-[#2D2A26] text-xs"
                />
              </div>

              <div className="flex gap-2">
                <input
                  type="text"
                  value={prodImage}
                  onChange={(e) => setProdImage(e.target.value)}
                  placeholder={isRTL ? 'رابط صورة المنتج' : 'Product Image URL'}
                  className="flex-1 px-3.5 py-2.5 rounded-xl bg-[#F8F7F3] dark:bg-[#141210] border border-[#E2DAD0] dark:border-[#2D2A26] text-xs"
                />
                <label className="px-3 py-2.5 rounded-xl bg-[#F5F1EA] dark:bg-[#25221E] text-xs font-bold cursor-pointer inline-flex items-center gap-1.5">
                  <Upload className="w-3.5 h-3.5 text-[#B58A54]" />
                  <span>{isRTL ? 'رفع' : 'Upload'}</span>
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => {
                      const f = e.target.files?.[0];
                      if (f) readFileAsDataUrl(f, setProdImage);
                    }}
                  />
                </label>
              </div>

              {/* Many-to-Many Store Association */}
              <div className="space-y-1.5">
                <p className="text-[11px] font-bold text-[#8A8175]">
                  {isRTL
                    ? 'متوفر في صالات العرض (متاجر متعددة دون تكرار المنتج):'
                    : 'Available At Showrooms (Multi-Store Association):'}
                </p>
                <div className="flex flex-wrap gap-2">
                  {places.map((p) => (
                    <label
                      key={p.id}
                      className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs cursor-pointer ${
                        prodStoreIds.includes(p.id)
                          ? 'bg-[#B58A54]/12 border-[#B58A54] text-[#9C7240]'
                          : 'border-[#E2DAD0] dark:border-[#2D2A26]'
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={prodStoreIds.includes(p.id)}
                        onChange={() => toggleIdInList(p.id, prodStoreIds, setProdStoreIds)}
                        className="accent-[#B58A54]"
                      />
                      <span>{p.name}</span>
                    </label>
                  ))}
                </div>
              </div>

              <input
                type="text"
                value={prodMaterials}
                onChange={(e) => setProdMaterials(e.target.value)}
                placeholder="Materials"
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#F8F7F3] dark:bg-[#141210] border border-[#E2DAD0] dark:border-[#2D2A26] text-xs"
              />

              <textarea
                rows={2}
                value={prodDesc}
                onChange={(e) => setProdDesc(e.target.value)}
                placeholder="Description"
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#F8F7F3] dark:bg-[#141210] border border-[#E2DAD0] dark:border-[#2D2A26] text-xs"
              />

              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-[#292722] dark:bg-[#F8F7F3] text-white dark:text-[#1C1A17] text-xs font-bold hover:bg-[#B58A54] transition-colors inline-flex items-center justify-center gap-1.5"
              >
                <Plus className="w-4 h-4" />
                <span>{editingProductId ? 'Update Product' : 'Save & Publish Product'}</span>
              </button>
            </form>

            {/* Products Table */}
            <div className="lg:col-span-7 space-y-3 max-h-[820px] overflow-y-auto pr-1">
              {products.map((prod) => {
                const brand = getBrandById(prod.brandId);
                return (
                  <div
                    key={prod.id}
                    className="p-4 rounded-2xl bg-white dark:bg-[#1C1A17] border border-[#E8E2D9] dark:border-[#2D2A26] flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                  >
                    <div className="flex items-center gap-3.5">
                      <img
                        src={prod.images[0]}
                        alt={prod.name}
                        className="w-14 h-12 rounded-xl object-cover shrink-0"
                      />
                      <div>
                        <Link
                          to={`/showroom/products/${prod.slug}`}
                          className="font-bold text-sm text-[#292722] dark:text-[#F8F7F3] hover:text-[#B58A54]"
                        >
                          {isRTL && prod.nameAr ? prod.nameAr : prod.name}
                        </Link>
                        <p className="text-xs text-[#8A8175]">
                          {brand?.name || 'VESTA'} · {formatPrice(prod.price)} · {prod.storeIds.length}{' '}
                          {isRTL ? 'متاجر' : 'stores'}
                        </p>
                      </div>
                    </div>

                    <div className="flex flex-wrap items-center gap-2">
                      <button
                        type="button"
                        onClick={() => toggleProductFeatured(prod.id)}
                        className={`p-2 rounded-lg border text-xs ${
                          prod.featured
                            ? 'bg-[#B58A54]/15 border-[#B58A54] text-[#B58A54]'
                            : 'border-[#E2DAD0] dark:border-[#2D2A26] text-[#8A8175]'
                        }`}
                      >
                        <Star className="w-3.5 h-3.5 fill-current" />
                      </button>

                      <select
                        value={prod.status}
                        onChange={(e) => setProductStatus(prod.id, e.target.value as ListingStatus)}
                        aria-label="Product status"
                        className="px-2.5 py-1.5 rounded-lg bg-[#F8F7F3] dark:bg-[#141210] border border-[#E2DAD0] dark:border-[#2D2A26] text-[11px] font-semibold"
                      >
                        <option value="published">Published</option>
                        <option value="draft">Draft</option>
                        <option value="archived">Archived</option>
                      </select>

                      <button
                        type="button"
                        onClick={() => loadProductIntoForm(prod)}
                        className="p-2 rounded-lg border border-[#E2DAD0] dark:border-[#2D2A26] text-[#5C544B] hover:border-[#B58A54]"
                      >
                        <Edit3 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
