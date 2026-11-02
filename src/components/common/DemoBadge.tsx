import React from 'react';
import { Sparkles, Info } from 'lucide-react';

interface DemoBadgeProps {
  variant?: 'subtle' | 'prominent' | 'card';
  text?: string;
  className?: string;
}

export const DemoBadge: React.FC<DemoBadgeProps> = ({
  variant = 'subtle',
  text = 'Interactive Demo Simulation · Powered by Retailer Catalog Mapping',
  className = '',
}) => {
  if (variant === 'prominent') {
    return (
      <div className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#F8F7F3] dark:bg-[#1E1C1A] border border-[#CDBBA5]/60 text-[#292722] dark:text-[#F8F7F3] text-xs font-bold tracking-wide shadow-xs ${className}`}>
        <Sparkles className="w-3.5 h-3.5 text-[#B58A54] shrink-0" />
        <span>{text}</span>
      </div>
    );
  }

  if (variant === 'card') {
    return (
      <div className={`p-3.5 rounded-xl bg-[#F8F7F3] dark:bg-[#1A1816] border border-[#E8E2D9] dark:border-[#2D2A26] text-xs text-[#6E6A63] dark:text-[#A39E96] flex items-start gap-2.5 transition-colors ${className}`}>
        <Info className="w-4 h-4 text-[#B58A54] shrink-0 mt-0.5" />
        <div className="leading-relaxed">
          <span className="font-bold text-[#292722] dark:text-[#F8F7F3]">Roomora Simulation Notice:</span> {text}
        </div>
      </div>
    );
  }

  return (
    <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-[#F8F7F3] dark:bg-[#1E1C1A] text-[#6E6A63] dark:text-[#A39E96] text-[11px] font-bold tracking-wider uppercase border border-[#E8E2D9] dark:border-[#2D2A26] ${className}`}>
      <span className="w-1.5 h-1.5 rounded-full bg-[#B58A54]"></span>
      <span>{text}</span>
    </div>
  );
};
