import React, { useState } from 'react';
import { useStoreBuilder } from '../context/StoreBuilderContext';
import { Layers, Plus, Package } from 'lucide-react';

export const CollectionsView: React.FC = () => {
  const { store } = useStoreBuilder();
  const [collections, setCollections] = useState<string[]>(store.collections);
  const [newColName, setNewColName] = useState('');
  const [showModal, setShowModal] = useState(false);

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (newColName.trim()) {
      setCollections([...collections, newColName.trim()]);
      setNewColName('');
      setShowModal(false);
    }
  };

  return (
    <div className="space-y-6 text-start max-w-6xl mx-auto p-4 sm:p-8 md:p-10">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#E2DBD0] dark:border-[#2D2A26]">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-[#1E1E1E] dark:text-white">
            Categories & Collections
          </h1>
          <p className="text-xs text-stone-500 mt-1">
            Group your furniture into curated design themes and room categories.
          </p>
        </div>

        <button
          onClick={() => setShowModal(true)}
          className="px-5 py-2.5 rounded-full bg-[#1E1E1E] text-white text-xs font-bold uppercase tracking-wider flex items-center gap-2 hover:bg-stone-800 transition shadow-xs cursor-pointer w-fit"
        >
          <Plus className="w-4 h-4" />
          <span>New Collection</span>
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {collections.map((col, idx) => {
          const count = store.products.filter((p) => p.collection === col || p.category === col).length;

          return (
            <div 
              key={idx}
              className="p-6 rounded-3xl border border-[#E2DBD0] dark:border-[#2D2A26] bg-white dark:bg-[#1A1815] shadow-xs space-y-3"
            >
              <div className="flex items-center justify-between">
                <span className="w-10 h-10 rounded-2xl bg-amber-500/10 text-amber-600 flex items-center justify-center font-bold text-sm">
                  <Layers className="w-5 h-5" />
                </span>
                <span className="text-[10px] font-mono text-stone-400">
                  {count} items
                </span>
              </div>

              <div>
                <h3 className="font-bold text-base text-[#1E1E1E] dark:text-white">{col}</h3>
                <p className="text-xs text-stone-500 mt-1">Curated furniture grouping active on your shop pages.</p>
              </div>
            </div>
          );
        })}
      </div>

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
          <form onSubmit={handleAdd} className="w-full max-w-md bg-white dark:bg-[#1A1815] rounded-3xl p-6 shadow-2xl border space-y-4">
            <h3 className="font-bold text-base">Add New Collection</h3>
            <div>
              <label className="block text-xs font-semibold mb-1">Collection Name *</label>
              <input
                type="text"
                required
                value={newColName}
                onChange={(e) => setNewColName(e.target.value)}
                placeholder="e.g. Modern Penthouse Series"
                className="w-full px-3 py-2 rounded-xl border text-xs bg-stone-50 dark:bg-stone-900 outline-hidden"
              />
            </div>
            <div className="flex justify-end gap-2 pt-2">
              <button type="button" onClick={() => setShowModal(false)} className="px-4 py-2 rounded-xl text-xs text-stone-500">
                Cancel
              </button>
              <button type="submit" className="px-5 py-2 rounded-xl bg-[#1E1E1E] text-white text-xs font-bold">
                Create Collection
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

