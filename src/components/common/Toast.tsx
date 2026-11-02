import React from 'react';
import { useCart } from '../../context/CartContext';
import { CheckCircle2, Info, X } from 'lucide-react';

export const Toast: React.FC = () => {
  const { toast } = useCart();

  if (!toast) return null;

  return (
    <aside
      aria-label="Notifications"
      aria-live="polite"
      className="fixed bottom-6 right-6 z-50 flex items-center gap-3 px-4 py-3 rounded-xl bg-[#292722] text-[#F8F7F3] shadow-2xl border border-[#CDBBA5]/30 transition-all duration-300 animate-in fade-in slide-in-from-bottom-5 max-w-md"
    >
      {toast.type === 'info' ? (
        <Info className="w-5 h-5 text-[#B58A54] shrink-0" />
      ) : (
        <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
      )}
      <p className="text-sm font-medium tracking-wide text-[#F8F7F3]">{toast.message}</p>
    </aside>
  );
};
