import React, { useEffect, useMemo, useState } from 'react';
import { FurnitureStore } from '../../types';
import { useLanguage } from '../../../../context/LanguageContext';
import { TrendingUp, Sparkles, BarChart3, PieChart } from 'lucide-react';

interface StoreAnalyticsChartsProps {
  store: FurnitureStore;
}

type TimeRange = '7d' | '30d' | '6m';

interface TrendPoint {
  label: string;
  revenueEgp: number;
  aiPreviews: number;
  orders: number;
}

const CHART_COLORS = ['#AF8439', '#1E1E1E', '#10B981', '#3B82F6', '#8B5CF6'];

/** Builds a smooth Catmull-Rom-style cubic Bezier SVG path across normalized chart coordinates. */
function buildSmoothPath(points: Array<{ x: number; y: number }>): string {
  if (points.length === 0) return '';
  if (points.length === 1) return `M ${points[0].x} ${points[0].y}`;

  let path = `M ${points[0].x.toFixed(1)} ${points[0].y.toFixed(1)}`;
  for (let i = 0; i < points.length - 1; i++) {
    const p0 = points[i];
    const p1 = points[i + 1];
    const midX = ((p0.x + p1.x) / 2).toFixed(1);
    path += ` C ${midX} ${p0.y.toFixed(1)}, ${midX} ${p1.y.toFixed(1)}, ${p1.x.toFixed(1)} ${p1.y.toFixed(1)}`;
  }
  return path;
}

/**
 * Interactive, animated store analytics dashboard charts (Revenue & AI Conversion Trend
 * plus dynamic Catalog Category Donut and Payment Gateway Breakdown).
 */
export const StoreAnalyticsCharts: React.FC<StoreAnalyticsChartsProps> = ({ store }) => {
  const { isRTL } = useLanguage();
  const [range, setRange] = useState<TimeRange>('6m');
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
  const [hoveredCat, setHoveredCat] = useState<string | null>(null);
  const [animatedReady, setAnimatedReady] = useState(false);

  const totalRevenue = useMemo(
    () => store.orders.reduce((sum, o) => sum + o.totalEgp, 0),
    [store.orders]
  );

  // Re-trigger entrance animation cleanly on mount and timeframe switch
  useEffect(() => {
    setAnimatedReady(false);
    setHoveredIdx(null);
    const timer = window.setTimeout(() => setAnimatedReady(true), 60);
    return () => window.clearTimeout(timer);
  }, [range]);

  const seriesData: TrendPoint[] = useMemo(() => {
    const scaleBase = Math.max(totalRevenue, 120000);
    if (range === '7d') {
      return [
        { label: isRTL ? 'الإثنين' : 'Mon', revenueEgp: Math.round(scaleBase * 0.11), aiPreviews: 19, orders: 1 },
        { label: isRTL ? 'الثلاثاء' : 'Tue', revenueEgp: Math.round(scaleBase * 0.16), aiPreviews: 27, orders: 2 },
        { label: isRTL ? 'الأربعاء' : 'Wed', revenueEgp: Math.round(scaleBase * 0.14), aiPreviews: 23, orders: 1 },
        { label: isRTL ? 'الخميس' : 'Thu', revenueEgp: Math.round(scaleBase * 0.22), aiPreviews: 38, orders: 2 },
        { label: isRTL ? 'الجمعة' : 'Fri', revenueEgp: Math.round(scaleBase * 0.31), aiPreviews: 54, orders: 3 },
        { label: isRTL ? 'السبت' : 'Sat', revenueEgp: Math.round(scaleBase * 0.37), aiPreviews: 63, orders: 4 },
        { label: isRTL ? 'الأحد' : 'Sun', revenueEgp: Math.round(scaleBase * 0.28), aiPreviews: 46, orders: 3 },
      ];
    }
    if (range === '30d') {
      return [
        { label: isRTL ? 'أسبوع ١' : 'Wk 1', revenueEgp: Math.round(scaleBase * 0.58), aiPreviews: 112, orders: 4 },
        { label: isRTL ? 'أسبوع ٢' : 'Wk 2', revenueEgp: Math.round(scaleBase * 0.74), aiPreviews: 148, orders: 5 },
        { label: isRTL ? 'أسبوع ٣' : 'Wk 3', revenueEgp: Math.round(scaleBase * 0.89), aiPreviews: 184, orders: 6 },
        { label: isRTL ? 'أسبوع ٤' : 'Wk 4', revenueEgp: Math.round(scaleBase * 1.0), aiPreviews: 229, orders: 8 },
      ];
    }
    return [
      { label: isRTL ? 'يونيو' : 'Jun', revenueEgp: Math.round(scaleBase * 0.42), aiPreviews: 160, orders: 5 },
      { label: isRTL ? 'يوليو' : 'Jul', revenueEgp: Math.round(scaleBase * 0.51), aiPreviews: 215, orders: 6 },
      { label: isRTL ? 'أغسطس' : 'Aug', revenueEgp: Math.round(scaleBase * 0.63), aiPreviews: 268, orders: 7 },
      { label: isRTL ? 'سبتمبر' : 'Sep', revenueEgp: Math.round(scaleBase * 0.72), aiPreviews: 312, orders: 9 },
      { label: isRTL ? 'أكتوبر' : 'Oct', revenueEgp: Math.round(scaleBase * 0.85), aiPreviews: 390, orders: 11 },
      { label: isRTL ? 'نوفمبر' : 'Nov', revenueEgp: Math.round(scaleBase * 1.0), aiPreviews: 465, orders: 14 },
    ];
  }, [range, totalRevenue, isRTL]);

  const svgW = 640;
  const svgH = 210;
  const padX = 28;
  const padTop = 22;
  const padBottom = 24;
  const plotH = svgH - padTop - padBottom;
  const maxVal = Math.max(...seriesData.map((d) => d.revenueEgp), 1) * 1.12;

  const coords = seriesData.map((d, i) => {
    const x =
      seriesData.length === 1
        ? svgW / 2
        : padX + (i * (svgW - padX * 2)) / (seriesData.length - 1);
    const y = padTop + plotH - (d.revenueEgp / maxVal) * plotH;
    return { x, y, ...d };
  });

  const linePath = buildSmoothPath(coords);
  const areaPath =
    coords.length > 0
      ? `${linePath} L ${coords[coords.length - 1].x.toFixed(1)} ${(svgH - padBottom).toFixed(1)} L ${coords[0].x.toFixed(1)} ${(svgH - padBottom).toFixed(1)} Z`
      : '';

  const categoryBreakdown = useMemo(() => {
    const counts = new Map<string, number>();
    store.products.forEach((p) => {
      counts.set(p.category, (counts.get(p.category) || 0) + 1);
    });
    const total = Math.max(store.products.length, 1);
    return Array.from(counts.entries())
      .sort((a, b) => b[1] - a[1])
      .map(([name, count], idx) => ({
        name,
        count,
        percent: Math.round((count / total) * 100),
        color: CHART_COLORS[idx % CHART_COLORS.length],
      }));
  }, [store.products]);

  const paymentBreakdown = useMemo(() => {
    const totals = new Map<string, number>();
    store.orders.forEach((o) => {
      totals.set(o.paymentMethod, (totals.get(o.paymentMethod) || 0) + o.totalEgp);
    });
    const rev = Math.max(totalRevenue, 1);
    return Array.from(totals.entries())
      .sort((a, b) => b[1] - a[1])
      .map(([method, amount], idx) => ({
        method,
        amount,
        percent: Math.round((amount / rev) * 100),
        color: CHART_COLORS[idx % CHART_COLORS.length],
      }));
  }, [store.orders, totalRevenue]);

  const radius = 52;
  const circumference = 2 * Math.PI * radius;
  let cumulativeFraction = 0;

  const activePoint = hoveredIdx !== null ? coords[hoveredIdx] : coords[coords.length - 1];
  const avgOrderEgp = store.orders.length > 0 ? Math.round(totalRevenue / store.orders.length) : 0;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
      {/* 1. REVENUE & AI CONVERSION TREND CHART */}
      <div className="lg:col-span-8 p-6 sm:p-7 rounded-3xl bg-white dark:bg-[#1A1815] border border-[#E2DBD0] dark:border-[#2D2A26] shadow-xs flex flex-col justify-between space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#EBE4D8] dark:border-[#2D2A26] pb-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="p-1.5 rounded-lg bg-amber-50 dark:bg-amber-950/40 text-amber-600">
                <BarChart3 className="w-4 h-4" />
              </span>
              <h3 className="text-base font-bold text-[#1E1E1E] dark:text-white">
                {isRTL ? 'تحليلات الإيرادات وأداء المعاينة بالـ AI' : 'Revenue & Spatial AI Performance'}
              </h3>
              <span dir="ltr" className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800/40">
                <TrendingUp className="w-3 h-3" /> +18.4%
              </span>
            </div>
            <p className="text-xs text-stone-500">
              {isRTL
                ? 'معدل المبيعات التفاعلي مقترناً بجلسات المعاينة الثلاثية الأبعاد ١:١'
                : 'Interactive sales volume paired with 1:1 AI Room Visualizer sessions'}
            </p>
          </div>

          <div className="flex items-center gap-1 p-1 rounded-xl bg-stone-100 dark:bg-stone-900 border border-stone-200 dark:border-stone-800 w-fit">
            {([
              { id: '7d', label: isRTL ? '٧ أيام' : '7D' },
              { id: '30d', label: isRTL ? '٣٠ يوم' : '30D' },
              { id: '6m', label: isRTL ? '٦ أشهر' : '6M' },
            ] as const).map((t) => (
              <button
                key={t.id}
                onClick={() => setRange(t.id)}
                className={`px-3 py-1 rounded-lg text-[11px] font-bold transition cursor-pointer ${
                  range === t.id
                    ? 'bg-[#1E1E1E] text-white dark:bg-amber-500 dark:text-white shadow-xs'
                    : 'text-stone-500 hover:text-stone-900 dark:hover:text-white'
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>
        </div>

        {/* Summary Bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 px-4 py-3 rounded-2xl bg-[#FAF8F5] dark:bg-[#141210] border border-[#EBE4D8] dark:border-[#2D2A26] text-xs">
          <div className="flex items-center gap-5">
            <div>
              <span className="text-[10px] uppercase tracking-wider text-stone-400 block">
                {isRTL ? `الفترة المحددة (${activePoint?.label})` : `Selected Period (${activePoint?.label})`}
              </span>
              <span className="text-base font-bold font-mono text-[#1E1E1E] dark:text-white">
                {activePoint?.revenueEgp.toLocaleString()} {isRTL ? 'ج.م' : store.currency}
              </span>
            </div>
            <div className="h-7 w-px bg-stone-200 dark:bg-stone-800" />
            <div>
              <span className="text-[10px] uppercase tracking-wider text-stone-400 block">
                {isRTL ? 'معاينات الغرف بالـ AI' : 'AI Room Previews'}
              </span>
              <span className="text-sm font-bold font-mono text-amber-600 flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5" />
                {activePoint?.aiPreviews} {isRTL ? 'جلسة' : 'sessions'}
              </span>
            </div>
          </div>

          <div className="text-end">
            <span className="text-[10px] uppercase tracking-wider text-stone-400 block">
              {isRTL ? 'متوسط قيمة الطلب' : 'Avg Order Value'}
            </span>
            <span className="text-sm font-bold font-mono text-emerald-600">
              {avgOrderEgp.toLocaleString()} {isRTL ? 'ج.م' : store.currency}
            </span>
          </div>
        </div>

        {/* SVG Hybrid Bar + Bezier Curve */}
        <div className="relative w-full pt-2" dir="ltr">
          <svg
            viewBox={`0 0 ${svgW} ${svgH}`}
            className="w-full h-52 sm:h-60 overflow-visible"
            role="img"
            aria-label="Store Revenue Trend Chart"
          >
            <defs>
              <linearGradient id="vestaAreaGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#AF8439" stopOpacity="0.28" />
                <stop offset="100%" stopColor="#AF8439" stopOpacity="0.01" />
              </linearGradient>
              <linearGradient id="vestaBarGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#C59A4E" stopOpacity="0.85" />
                <stop offset="100%" stopColor="#E5D5B8" stopOpacity="0.25" />
              </linearGradient>
            </defs>

            {[0.25, 0.5, 0.75, 1].map((step) => {
              const yLine = padTop + plotH * (1 - step);
              return (
                <line
                  key={step}
                  x1={padX - 10}
                  y1={yLine}
                  x2={svgW - padX + 10}
                  y2={yLine}
                  stroke="currentColor"
                  className="text-stone-200 dark:text-stone-800"
                  strokeDasharray="3 4"
                  strokeWidth="1"
                />
              );
            })}

            {coords.map((pt, i) => {
              const barW = range === '30d' ? 42 : 28;
              const targetH = Math.max(8, svgH - padBottom - pt.y);
              const isHovered = hoveredIdx === i;
              return (
                <g
                  key={`bar-${pt.label}`}
                  onMouseEnter={() => setHoveredIdx(i)}
                  onMouseLeave={() => setHoveredIdx(null)}
                  className="cursor-pointer"
                >
                  <rect
                    x={pt.x - barW * 0.85}
                    y={padTop}
                    width={barW * 1.7}
                    height={plotH}
                    rx={8}
                    fill={isHovered ? 'rgba(175, 132, 57, 0.08)' : 'transparent'}
                  />
                  <rect
                    x={pt.x - barW / 2}
                    y={animatedReady ? pt.y : svgH - padBottom}
                    width={barW}
                    height={animatedReady ? targetH : 0}
                    rx={6}
                    fill={isHovered ? '#AF8439' : 'url(#vestaBarGrad)'}
                    style={{
                      transition: `y 650ms cubic-bezier(0.22, 1, 0.36, 1) ${i * 70}ms, height 650ms cubic-bezier(0.22, 1, 0.36, 1) ${i * 70}ms, fill 180ms ease`,
                    }}
                  />
                  <text
                    x={pt.x}
                    y={svgH - 4}
                    textAnchor="middle"
                    className={`text-[11px] font-mono ${
                      isHovered ? 'fill-amber-700 dark:fill-amber-400 font-bold' : 'fill-stone-400'
                    }`}
                  >
                    {pt.label}
                  </text>
                </g>
              );
            })}

            <path
              d={areaPath}
              fill="url(#vestaAreaGrad)"
              style={{
                opacity: animatedReady ? 1 : 0,
                transition: 'opacity 750ms ease 200ms',
                pointerEvents: 'none',
              }}
            />

            <path
              d={linePath}
              fill="none"
              stroke="#AF8439"
              strokeWidth="2.5"
              strokeLinecap="round"
              pathLength={1}
              style={{
                strokeDasharray: 1,
                strokeDashoffset: animatedReady ? 0 : 1,
                transition: 'stroke-dashoffset 950ms cubic-bezier(0.22, 1, 0.36, 1) 120ms',
                pointerEvents: 'none',
              }}
            />

            {coords.map((pt, i) => {
              const isHovered = hoveredIdx === i;
              return (
                <circle
                  key={`dot-${pt.label}`}
                  cx={pt.x}
                  cy={pt.y}
                  r={isHovered ? 6 : 4}
                  fill="#FFFFFF"
                  stroke="#AF8439"
                  strokeWidth={isHovered ? 3 : 2}
                  style={{
                    opacity: animatedReady ? 1 : 0,
                    transition: `opacity 350ms ease ${250 + i * 70}ms, r 160ms ease`,
                    pointerEvents: 'none',
                  }}
                />
              );
            })}
          </svg>
        </div>
      </div>

      {/* 2. CATEGORY DONUT CHART & PAYMENT GATEWAY BREAKDOWN */}
      <div className="lg:col-span-4 p-6 sm:p-7 rounded-3xl bg-white dark:bg-[#1A1815] border border-[#E2DBD0] dark:border-[#2D2A26] shadow-xs flex flex-col justify-between space-y-5">
        <div className="flex items-center justify-between border-b border-[#EBE4D8] dark:border-[#2D2A26] pb-4">
          <div className="space-y-0.5">
            <div className="flex items-center gap-2">
              <span className="p-1.5 rounded-lg bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300">
                <PieChart className="w-4 h-4" />
              </span>
              <h3 className="text-base font-bold text-[#1E1E1E] dark:text-white">
                {isRTL ? 'توزيع الكتالوج' : 'Catalog Mix'}
              </h3>
            </div>
            <p className="text-[11px] text-stone-500">
              {isRTL ? 'المخزون ووسائل الدفع' : 'Inventory & payment rails'}
            </p>
          </div>
          <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-stone-100 dark:bg-stone-900 text-stone-500">
            {store.products.length} {isRTL ? 'منتج' : 'SKUs'}
          </span>
        </div>

        {/* Animated SVG Donut */}
        <div className="flex items-center gap-4">
          <div className="relative w-32 h-32 shrink-0 flex items-center justify-center">
            <svg viewBox="0 0 140 140" className="w-full h-full -rotate-90">
              <circle
                cx="70"
                cy="70"
                r={radius}
                fill="transparent"
                stroke="currentColor"
                className="text-stone-100 dark:text-stone-800"
                strokeWidth="16"
              />
              {categoryBreakdown.map((cat, idx) => {
                const fraction = cat.count / Math.max(store.products.length, 1);
                const arcLen = fraction * circumference;
                const dashOffset = -(cumulativeFraction * circumference);
                cumulativeFraction += fraction;
                const isHovered = hoveredCat === cat.name;

                return (
                  <circle
                    key={cat.name}
                    cx="70"
                    cy="70"
                    r={radius}
                    fill="transparent"
                    stroke={cat.color}
                    strokeWidth={isHovered ? 19 : 15}
                    strokeDasharray={`${animatedReady ? Math.max(arcLen - 2, 0) : 0} ${circumference}`}
                    strokeDashoffset={dashOffset}
                    strokeLinecap="round"
                    onMouseEnter={() => setHoveredCat(cat.name)}
                    onMouseLeave={() => setHoveredCat(null)}
                    className="cursor-pointer"
                    style={{
                      transition: `stroke-dasharray 750ms cubic-bezier(0.22, 1, 0.36, 1) ${idx * 110}ms, stroke-width 180ms ease`,
                    }}
                  />
                );
              })}
            </svg>

            <div className="absolute inset-0 flex flex-col items-center justify-center text-center pointer-events-none px-2">
              {hoveredCat ? (
                <>
                  <span className="text-sm font-bold font-mono text-[#1E1E1E] dark:text-white">
                    {categoryBreakdown.find((c) => c.name === hoveredCat)?.percent}%
                  </span>
                  <span className="text-[9px] text-stone-500 truncate max-w-[74px]">
                    {hoveredCat}
                  </span>
                </>
              ) : (
                <>
                  <span className="text-base font-bold font-mono text-[#1E1E1E] dark:text-white">
                    {categoryBreakdown.length}
                  </span>
                  <span className="text-[9px] text-stone-500 uppercase tracking-wider">
                    {isRTL ? 'فئات' : 'Categories'}
                  </span>
                </>
              )}
            </div>
          </div>

          <div className="flex-1 space-y-1.5 min-w-0">
            {categoryBreakdown.map((cat) => (
              <div
                key={cat.name}
                onMouseEnter={() => setHoveredCat(cat.name)}
                onMouseLeave={() => setHoveredCat(null)}
                className={`flex items-center justify-between text-[11px] px-2 py-1 rounded-lg transition cursor-pointer ${
                  hoveredCat === cat.name ? 'bg-stone-100 dark:bg-stone-900 font-bold' : ''
                }`}
              >
                <div className="flex items-center gap-2 min-w-0">
                  <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: cat.color }} />
                  <span className="truncate text-stone-700 dark:text-stone-300">{cat.name}</span>
                </div>
                <span className="font-mono text-stone-500 shrink-0">{cat.percent}%</span>
              </div>
            ))}
          </div>
        </div>

        {/* Payment Gateway Progress Bars */}
        <div className="pt-3 border-t border-[#EBE4D8] dark:border-[#2D2A26] space-y-2.5">
          <span className="text-[10px] font-bold uppercase tracking-wider text-stone-400 block">
            {isRTL ? 'حصة بوابات الدفع' : 'Checkout Share by Gateway'}
          </span>
          {paymentBreakdown.map((pay, idx) => (
            <div key={pay.method} className="space-y-1">
              <div className="flex items-center justify-between text-[11px]">
                <span className="font-medium text-stone-700 dark:text-stone-300 truncate">{pay.method}</span>
                <span className="font-mono font-bold text-[#1E1E1E] dark:text-white">{pay.percent}%</span>
              </div>
              <div className="w-full h-1.5 rounded-full bg-stone-100 dark:bg-stone-800 overflow-hidden">
                <div
                  className="h-full rounded-full"
                  style={{
                    width: animatedReady ? `${pay.percent}%` : '0%',
                    backgroundColor: pay.color,
                    transition: `width 750ms cubic-bezier(0.22, 1, 0.36, 1) ${220 + idx * 100}ms`,
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
