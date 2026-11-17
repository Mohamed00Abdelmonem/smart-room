import React, { useState } from 'react';
import { useStoreBuilder } from '../context/StoreBuilderContext';
import { useLanguage } from '../../../context/LanguageContext';
import { Plus, Trash2, Search } from 'lucide-react';

export const ProductsManagementView: React.FC = () => {
  const { store, addProduct, deleteProduct } = useStoreBuilder();
  const { isRTL } = useLanguage();
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);

  const [newName, setNewName] = useState('');
  const [newPrice, setNewPrice] = useState<number>(15000);
  const [newCategory, setNewCategory] = useState('Living Room');
  const [newDimensions, setNewDimensions] = useState('120W × 80D × 45H cm');
  const [newMaterials] = useState('Solid Ash & Marble');
  const [newImage, setNewImage] = useState('https://images.unsplash.com/photo-1555041469-a586c61ea9bc');
  const [newDesc] = useState('');

  const filteredProducts = store.products.filter(
    (p) =>
      p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName.trim()) return;

    addProduct({
      name: newName.trim(),
      slug: newName.toLowerCase().trim().replace(/[^a-z0-9]+/g, '-'),
      priceEgp: Number(newPrice),
      category: newCategory,
      collection: 'Signature Atelier',
      dimensions: newDimensions,
      materials: newMaterials,
      inStock: true,
      stockCount: 10,
      featured: true,
      isNew: true,
      images: [newImage],
      description: newDesc || 'Handcrafted luxury furniture piece with certified spatial dimensions.',
    });

    setNewName('');
    setShowAddModal(false);
  };

  return (
    <div className="space-y-6 text-start max-w-6xl mx-auto p-4 sm:p-8 md:p-10">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#E2DBD0] dark:border-[#2D2A26]">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-[#1E1E1E] dark:text-white">
            {isRTL ? 'منتجات المتجر' : 'Store Products'}
          </h1>
          <p className="text-xs text-stone-500 mt-1">
            {isRTL ? 'إدارة كتالوج الأثاث والأبعاد والأسعار ومخزون المعرض.' : 'Manage your furniture catalog, dimensions, prices, and showroom stock.'}
          </p>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="px-5 py-2.5 rounded-full bg-[#1E1E1E] text-white text-xs font-bold uppercase tracking-wider flex items-center gap-2 hover:bg-stone-800 transition shadow-xs cursor-pointer w-fit"
        >
          <Plus className="w-4 h-4" />
          <span>{isRTL ? 'إضافة منتج جديد' : 'Add New Product'}</span>
        </button>
      </div>

      {/* Search Input */}
      <div className="relative max-w-md">
        <Search className={`w-4 h-4 absolute ${isRTL ? 'right-3' : 'left-3'} top-3 text-stone-400`} />
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder={isRTL ? 'ابحث باسم القطعة أو الفئة...' : 'Search products by name or category...'}
          className={`w-full ${isRTL ? 'pr-9 pl-4' : 'pl-9 pr-4'} py-2 rounded-xl border text-xs bg-white dark:bg-[#1A1815] border-[#E2DBD0] dark:border-[#2D2A26] outline-hidden focus:ring-1 focus:ring-amber-500`}
        />
      </div>

      {/* Products Table */}
      <div className="rounded-3xl border border-[#E2DBD0] dark:border-[#2D2A26] bg-white dark:bg-[#1A1815] shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-start text-xs">
            <thead className="bg-[#FAF8F5] dark:bg-[#151311] border-b border-[#E2DBD0] dark:border-[#2D2A26] text-stone-500 uppercase text-[10px] tracking-wider">
              <tr>
                <th className="py-3 px-4">{isRTL ? 'المنتج والمواد' : 'Item & Silhouette'}</th>
                <th className="py-3 px-4">{isRTL ? 'الفئة' : 'Category'}</th>
                <th className="py-3 px-4">{isRTL ? 'الأبعاد' : 'Dimensions'}</th>
                <th className="py-3 px-4">{isRTL ? 'السعر (ج.م)' : 'Price (EGP)'}</th>
                <th className="py-3 px-4">{isRTL ? 'المخزون' : 'Inventory'}</th>
                <th className="py-3 px-4 text-end">{isRTL ? 'حذف' : 'Actions'}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100 dark:divide-stone-800">
              {filteredProducts.map((prod) => (
                <tr key={prod.id} className="hover:bg-stone-50/50 dark:hover:bg-stone-900/50 transition">
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-3">
                      <img src={prod.images[0]} alt={prod.name} className="w-12 h-12 rounded-xl object-cover border shrink-0" />
                      <div className="min-w-0">
                        <span className="font-bold text-[#1E1E1E] dark:text-white block truncate">{prod.name}</span>
                        <span className="text-[10px] text-stone-400 block truncate">{prod.materials}</span>
                      </div>
                    </div>
                  </td>

                  <td className="py-3 px-4">
                    <span className="px-2 py-0.5 rounded-md text-[10px] font-mono bg-stone-100 dark:bg-stone-800">{prod.category}</span>
                  </td>

                  <td dir="ltr" className="py-3 px-4 font-mono text-[11px] text-stone-600 dark:text-stone-400 text-start">
                    {prod.dimensions}
                  </td>

                  <td className="py-3 px-4 font-mono font-bold text-stone-900 dark:text-white">
                    {prod.priceEgp.toLocaleString()} {isRTL ? 'ج.م' : 'EGP'}
                  </td>

                  <td className="py-3 px-4">
                    <span className="text-[11px] font-mono text-emerald-600 font-semibold">
                      {prod.stockCount} {isRTL ? 'متوفر' : 'in stock'}
                    </span>
                  </td>

                  <td className="py-3 px-4 text-end">
                    <button
                      onClick={() => deleteProduct(prod.id)}
                      className="p-1.5 text-stone-400 hover:text-red-500 rounded cursor-pointer"
                      title={isRTL ? 'حذف المنتج' : 'Delete Product'}
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Product Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
          <form onSubmit={handleAddSubmit} className="w-full max-w-lg bg-white dark:bg-[#1A1815] rounded-3xl p-6 shadow-2xl border space-y-4 text-start">
            <h3 className="font-bold text-base">{isRTL ? 'إضافة قطعة أثاث جديدة' : 'Add New Furniture Product'}</h3>

            <div className="space-y-3 text-xs">
              <div>
                <label className="block font-semibold mb-1">{isRTL ? 'اسم المنتج *' : 'Product Name *'}</label>
                <input
                  type="text"
                  required
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  placeholder="e.g. Sculptural Boucle Lounge Chair"
                  className="w-full px-3 py-2 rounded-xl border bg-stone-50 dark:bg-stone-900 outline-hidden"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold mb-1">{isRTL ? 'السعر (ج.م) *' : 'Price (EGP) *'}</label>
                  <input
                    type="number"
                    required
                    value={newPrice}
                    onChange={(e) => setNewPrice(Number(e.target.value))}
                    className="w-full px-3 py-2 rounded-xl border bg-stone-50 dark:bg-stone-900 outline-hidden font-mono"
                  />
                </div>
                <div>
                  <label className="block font-semibold mb-1">{isRTL ? 'الفئة' : 'Category'}</label>
                  <select
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border bg-stone-50 dark:bg-stone-900 outline-hidden"
                  >
                    <option value="Living Room">Living Room</option>
                    <option value="Dining">Dining</option>
                    <option value="Bedroom">Bedroom</option>
                    <option value="Storage & TV">Storage & TV</option>
                    <option value="Lighting">Lighting</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-semibold mb-1">{isRTL ? 'الأبعاد (العرض × العمق × الارتفاع)' : 'Dimensions (W × D × H)'}</label>
                <input
                  type="text"
                  value={newDimensions}
                  onChange={(e) => setNewDimensions(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border bg-stone-50 dark:bg-stone-900 outline-hidden font-mono"
                />
              </div>

              <div>
                <label className="block font-semibold mb-1">{isRTL ? 'رابط صورة المنتج' : 'High-Res Product Image URL'}</label>
                <input
                  type="url"
                  value={newImage}
                  onChange={(e) => setNewImage(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border bg-stone-50 dark:bg-stone-900 outline-hidden"
                />
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-3 border-t">
              <button type="button" onClick={() => setShowAddModal(false)} className="px-4 py-2 rounded-xl text-xs text-stone-500 cursor-pointer">
                {isRTL ? 'إلغاء' : 'Cancel'}
              </button>
              <button type="submit" className="px-5 py-2 rounded-xl bg-[#1E1E1E] text-white text-xs font-bold cursor-pointer">
                {isRTL ? 'حفظ المنتج' : 'Save Product'}
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};
