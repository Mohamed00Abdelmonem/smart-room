import React from 'react';
import { useStoreBuilder } from '../context/StoreBuilderContext';
import { Users, Mail, Phone, MapPin } from 'lucide-react';

export const CustomersView: React.FC = () => {
  const { store } = useStoreBuilder();

  return (
    <div className="space-y-6 text-start max-w-6xl mx-auto p-4 sm:p-8 md:p-10">
      <div className="pb-6 border-b border-[#E2DBD0] dark:border-[#2D2A26]">
        <h1 className="text-2xl sm:text-3xl font-bold text-[#1E1E1E] dark:text-white">
          Customer Roster
        </h1>
        <p className="text-xs text-stone-500 mt-1">
          Review customer profiles, contact info, and lifetime furniture spend.
        </p>
      </div>

      <div className="rounded-3xl border border-[#E2DBD0] dark:border-[#2D2A26] bg-white dark:bg-[#1A1815] shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-start text-xs">
            <thead className="bg-[#FAF8F5] dark:bg-[#151311] border-b border-[#E2DBD0] dark:border-[#2D2A26] text-stone-500 uppercase text-[10px] tracking-wider">
              <tr>
                <th className="py-3 px-4">Customer</th>
                <th className="py-3 px-4">Location</th>
                <th className="py-3 px-4">Orders</th>
                <th className="py-3 px-4 font-mono">Lifetime Spend</th>
                <th className="py-3 px-4">Last Active</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100 dark:divide-stone-800">
              {store.customers.map((c) => (
                <tr key={c.id} className="hover:bg-stone-50/50 dark:hover:bg-stone-900/50 transition">
                  <td className="py-3.5 px-4">
                    <span className="font-bold text-[#1E1E1E] dark:text-white block">{c.name}</span>
                    <span className="text-[10px] text-stone-400 font-mono">{c.email} · {c.phone}</span>
                  </td>
                  <td className="py-3.5 px-4 text-stone-600 dark:text-stone-300">
                    <div className="flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-amber-600 shrink-0" />
                      <span>{c.city}</span>
                    </div>
                  </td>
                  <td className="py-3.5 px-4 font-mono font-semibold">
                    {c.ordersCount} orders
                  </td>
                  <td className="py-3.5 px-4 font-mono font-bold text-[#1E1E1E] dark:text-white">
                    {c.totalSpentEgp.toLocaleString()} EGP
                  </td>
                  <td className="py-3.5 px-4 text-stone-400 font-mono text-[11px]">
                    {c.lastOrderDate}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

