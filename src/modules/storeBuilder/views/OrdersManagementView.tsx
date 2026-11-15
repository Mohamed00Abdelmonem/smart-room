import React from 'react';
import { useStoreBuilder } from '../context/StoreBuilderContext';
import { ShoppingBag, CheckCircle2, Clock, Truck, CreditCard } from 'lucide-react';

export const OrdersManagementView: React.FC = () => {
  const { store } = useStoreBuilder();

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'delivered':
        return <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 font-bold text-[10px] uppercase">Delivered</span>;
      case 'shipped':
        return <span className="px-2.5 py-0.5 rounded-full bg-blue-500/10 text-blue-700 dark:text-blue-400 font-bold text-[10px] uppercase">Shipped</span>;
      default:
        return <span className="px-2.5 py-0.5 rounded-full bg-amber-500/10 text-amber-700 dark:text-amber-400 font-bold text-[10px] uppercase">Processing</span>;
    }
  };

  return (
    <div className="space-y-6 text-start max-w-6xl mx-auto p-4 sm:p-8 md:p-10">
      <div className="pb-6 border-b border-[#E2DBD0] dark:border-[#2D2A26]">
        <h1 className="text-2xl sm:text-3xl font-bold text-[#1E1E1E] dark:text-white">
          Orders & Transactions
        </h1>
        <p className="text-xs text-stone-500 mt-1">
          Track customer furniture orders, CBE Egyptian payment gateways, and delivery fulfillment.
        </p>
      </div>

      <div className="rounded-3xl border border-[#E2DBD0] dark:border-[#2D2A26] bg-white dark:bg-[#1A1815] shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-start text-xs">
            <thead className="bg-[#FAF8F5] dark:bg-[#151311] border-b border-[#E2DBD0] dark:border-[#2D2A26] text-stone-500 uppercase text-[10px] tracking-wider">
              <tr>
                <th className="py-3 px-4">Order #</th>
                <th className="py-3 px-4">Customer</th>
                <th className="py-3 px-4">Payment Method</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 font-mono">Total (EGP)</th>
                <th className="py-3 px-4">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100 dark:divide-stone-800">
              {store.orders.map((ord) => (
                <tr key={ord.id} className="hover:bg-stone-50/50 dark:hover:bg-stone-900/50 transition">
                  <td className="py-3.5 px-4 font-mono font-bold text-[#1E1E1E] dark:text-white">
                    {ord.orderNumber}
                  </td>
                  <td className="py-3.5 px-4">
                    <span className="font-bold block">{ord.customerName}</span>
                    <span className="text-[10px] text-stone-400 font-mono">{ord.customerPhone}</span>
                  </td>
                  <td className="py-3.5 px-4">
                    <span className="flex items-center gap-1.5 font-medium">
                      <CreditCard className="w-3.5 h-3.5 text-stone-400" />
                      <span>{ord.paymentMethod}</span>
                    </span>
                  </td>
                  <td className="py-3.5 px-4">
                    {getStatusBadge(ord.status)}
                  </td>
                  <td className="py-3.5 px-4 font-mono font-bold text-[#1E1E1E] dark:text-white">
                    {ord.totalEgp.toLocaleString()} EGP
                  </td>
                  <td className="py-3.5 px-4 text-stone-400 text-[11px]">
                    {new Date(ord.createdAt).toLocaleDateString()}
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

