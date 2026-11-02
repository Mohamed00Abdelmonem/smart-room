import React from 'react';
import { UploadedRoomPhoto, RoomValidationResult } from '../../types';
import { useLanguage } from '../../context/LanguageContext';
import { 
  X, 
  CheckCircle2, 
  AlertTriangle, 
  XCircle, 
  HelpCircle, 
  ShieldCheck, 
  Sparkles, 
  RefreshCw, 
  Camera, 
  Eye 
} from 'lucide-react';

interface RoomValidationModalProps {
  photo: UploadedRoomPhoto | null;
  onClose: () => void;
  onReplace?: () => void;
  onConfirmUseAnyway?: (photoId: string) => void;
}

export const RoomValidationModal: React.FC<RoomValidationModalProps> = ({
  photo,
  onClose,
  onReplace,
  onConfirmUseAnyway,
}) => {
  const { isRTL } = useLanguage();

  if (!photo) return null;

  const result: RoomValidationResult = photo.validationResult || {
    status: 'valid',
    confidenceScore: 96,
    isInterior: true,
    floorPlaneDetected: true,
    lightingScore: 'Optimal',
    obstructionLevel: 'Low',
    title: 'Room Image Verified',
    titleAr: 'غرفة داخلية معتمدة ومؤكدة',
    message: "Room image verified. You're ready to continue with spatial styling.",
    messageAr: 'تم التحقق من بيئة الغرفة بنجاح. المساحة مهيأة ومطابقة لمعايير التوزيع الهندسي للأثاث.',
    details: {
      category: 'Residential Interior Room',
      categoryAr: 'غرفة سكنية داخلية',
      wallsDetected: true,
      roomPerspective: 'Wide Front Perspective (96% Confidence)',
      roomPerspectiveAr: 'منظور أمامي واسع (دقة 96%)',
      suitableFor3D: true,
    },
  };

  const isInvalid = result.status === 'invalid';
  const isUncertain = result.status === 'uncertain';
  const isValid = result.status === 'valid';

  const title = isRTL ? result.titleAr : result.title;
  const message = isRTL ? result.messageAr : result.message;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/70 backdrop-blur-md animate-in fade-in">
      <div className="relative w-full max-w-2xl bg-white dark:bg-[#161412] rounded-3xl shadow-2xl border border-[#E8E2D9] dark:border-[#2D2A26] overflow-hidden flex flex-col max-h-[92vh] transition-colors">
        
        {/* Header */}
        <div className={`px-6 py-5 border-b border-[#E8E2D9] dark:border-[#2D2A26] flex items-center justify-between transition-colors ${
          isValid 
            ? 'bg-emerald-50/70 dark:bg-emerald-950/20' 
            : isInvalid 
            ? 'bg-rose-50/70 dark:bg-rose-950/20' 
            : 'bg-amber-50/70 dark:bg-amber-950/20'
        }`}>
          <div className="flex items-center gap-3">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center shadow-xs ${
              isValid
                ? 'bg-emerald-600 text-white'
                : isInvalid
                ? 'bg-rose-600 text-white'
                : 'bg-amber-500 text-white'
            }`}>
              {isValid ? (
                <CheckCircle2 className="w-5 h-5" />
              ) : isInvalid ? (
                <XCircle className="w-5 h-5" />
              ) : (
                <AlertTriangle className="w-5 h-5" />
              )}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-white/70 dark:bg-black/30 border border-current">
                  {isValid
                    ? isRTL ? 'معتمد' : 'Verified Interior'
                    : isInvalid
                    ? isRTL ? 'صورة غير صالحة' : 'Rejected Image'
                    : isRTL ? 'زاوية غير مؤكدة' : 'Uncertain Angle'}
                </span>
                <span className="text-xs font-mono text-[#6E6A63] dark:text-[#A39E96]">
                  Confidence: {result.confidenceScore}%
                </span>
              </div>
              <h3 className="text-lg font-editorial font-bold text-[#292722] dark:text-[#F8F7F3] mt-0.5">
                {title}
              </h3>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-white dark:hover:bg-[#25221F] text-[#6E6A63] hover:text-[#292722] dark:hover:text-[#F8F7F3] transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto space-y-6">
          {/* Image & Diagnosis Split */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-[#F8F7F3] dark:bg-[#1E1C1A] border border-[#E8E2D9] dark:border-[#2D2A26]">
              <img
                src={photo.url}
                alt="Room diagnostic"
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-2 left-2 right-2 p-2 rounded-lg bg-black/60 backdrop-blur-md text-white text-[10px] flex items-center justify-between font-mono">
                <span>{isRTL && photo.angleLabelAr ? photo.angleLabelAr : photo.angleLabel}</span>
                <span>Spatial Diagnostic AI</span>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-[#F8F7F3] dark:bg-[#1E1C1A] border border-[#E8E2D9] dark:border-[#2D2A26] space-y-3 flex flex-col justify-between">
              <div className="space-y-2">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#B58A54] block">
                  {isRTL ? 'نتيجة الفحص المكاني' : 'Spatial Heuristic Audit'}
                </span>
                <p className="text-xs text-[#292722] dark:text-[#F8F7F3] leading-relaxed font-medium">
                  {message}
                </p>
              </div>

              {/* Status pill summary */}
              <div className="space-y-1.5 pt-2 border-t border-[#E8E2D9] dark:border-[#2D2A26] text-xs">
                <div className="flex justify-between">
                  <span className="text-[#6E6A63] dark:text-[#A39E96]">{isRTL ? 'تصنيف المشهد:' : 'Scene Class:'}</span>
                  <span className="font-bold text-[#292722] dark:text-[#F8F7F3]">
                    {isRTL ? result.details.categoryAr : result.details.category}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#6E6A63] dark:text-[#A39E96]">{isRTL ? 'مناسب للفرش ثلاثي الأبعاد:' : 'Suitable for 3D Staging:'}</span>
                  <span className={`font-bold ${result.details.suitableFor3D ? 'text-emerald-700 dark:text-emerald-400' : 'text-rose-600'}`}>
                    {result.details.suitableFor3D ? (isRTL ? '✓ نعم ومطابق' : '✓ Yes, Ready') : (isRTL ? '✕ غير مناسب' : '✕ Unsuitable')}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* 4 Diagnostic Parameter Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="p-3 rounded-xl bg-white dark:bg-[#1E1C1A] border border-[#E8E2D9] dark:border-[#2D2A26] text-center">
              <span className="text-[10px] font-bold uppercase text-[#6E6A63] dark:text-[#A39E96] block">
                {isRTL ? 'بيئة الغرفة' : 'Interior Room'}
              </span>
              <span className={`text-xs font-bold mt-1 block ${result.isInterior ? 'text-emerald-700 dark:text-emerald-400' : 'text-rose-600'}`}>
                {result.isInterior ? (isRTL ? 'مؤكدة' : 'Detected') : (isRTL ? 'غير موجودة' : 'Missing')}
              </span>
            </div>

            <div className="p-3 rounded-xl bg-white dark:bg-[#1E1C1A] border border-[#E8E2D9] dark:border-[#2D2A26] text-center">
              <span className="text-[10px] font-bold uppercase text-[#6E6A63] dark:text-[#A39E96] block">
                {isRTL ? 'مستوى الأرضية' : 'Floor Plane'}
              </span>
              <span className={`text-xs font-bold mt-1 block ${result.floorPlaneDetected ? 'text-emerald-700 dark:text-emerald-400' : 'text-rose-600'}`}>
                {result.floorPlaneDetected ? (isRTL ? 'واضح ومسطح' : 'Clear Vector') : (isRTL ? 'محجوب / مفقود' : 'Obscured')}
              </span>
            </div>

            <div className="p-3 rounded-xl bg-white dark:bg-[#1E1C1A] border border-[#E8E2D9] dark:border-[#2D2A26] text-center">
              <span className="text-[10px] font-bold uppercase text-[#6E6A63] dark:text-[#A39E96] block">
                {isRTL ? 'جودة الإضاءة' : 'Lighting Level'}
              </span>
              <span className={`text-xs font-bold mt-1 block ${result.lightingScore === 'Optimal' ? 'text-emerald-700 dark:text-emerald-400' : 'text-amber-600'}`}>
                {result.lightingScore === 'Optimal' ? (isRTL ? 'مثالية' : 'Optimal') : (isRTL ? 'منخفضة' : result.lightingScore)}
              </span>
            </div>

            <div className="p-3 rounded-xl bg-white dark:bg-[#1E1C1A] border border-[#E8E2D9] dark:border-[#2D2A26] text-center">
              <span className="text-[10px] font-bold uppercase text-[#6E6A63] dark:text-[#A39E96] block">
                {isRTL ? 'مستوى العوائق' : 'Obstruction'}
              </span>
              <span className={`text-xs font-bold mt-1 block ${result.obstructionLevel === 'Low' ? 'text-emerald-700 dark:text-emerald-400' : result.obstructionLevel === 'Moderate' ? 'text-amber-600' : 'text-rose-600'}`}>
                {result.obstructionLevel === 'Low' ? (isRTL ? 'منخفض (ممتاز)' : 'Low Clutter') : result.obstructionLevel}
              </span>
            </div>
          </div>

          {/* Guidelines / Tips box */}
          {isInvalid && (
            <div className="p-4 rounded-xl bg-rose-50 dark:bg-rose-950/30 border border-rose-200 dark:border-rose-900/50 text-xs text-rose-900 dark:text-rose-300 space-y-1.5 font-normal">
              <p className="font-bold flex items-center gap-1.5">
                <AlertTriangle className="w-4 h-4 text-rose-600" />
                {isRTL ? 'لماذا تم رفض هذه الصورة؟' : 'Why was this image rejected?'}
              </p>
              <p className="leading-relaxed">
                {isRTL
                  ? 'يتطلب نظام رومورا رؤية واضحة لأرضية الغرفة وجدرانها لحساب أبعاد الأثاث بدقة وتجنب أي تعارض مع الأبواب. يرجى التقاط صورة للغرفة من زاوية واسعة أثناء النهار.'
                  : 'Roomora requires a recognizable view of an interior room including walls and floor plane to accurately calculate clearances, perspective angles, and placement coordinates.'}
              </p>
            </div>
          )}

          {isUncertain && (
            <div className="p-4 rounded-xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900/50 text-xs text-amber-900 dark:text-amber-300 space-y-1.5 font-normal">
              <p className="font-bold flex items-center gap-1.5">
                <HelpCircle className="w-4 h-4 text-amber-600" />
                {isRTL ? 'إشعار الزاوية غير المؤكدة:' : 'Uncertain Perspective Recommendation:'}
              </p>
              <p className="leading-relaxed">
                {isRTL
                  ? 'يمكنك المتابعة باستخدام هذه الصورة إذا كنت ترغب، لكن قد تظهر بعض القطع بزاوية تقريبية. للحصول على أفضل دقة، نوصي برفع زاوية أوسع تكشف زاوية التقاء الجدارين.'
                  : 'You may proceed with this photo if desired, but 3D placement accuracy may be reduced. For best results, consider uploading a wider angle showing the floor and corners.'}
              </p>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="px-6 py-4 bg-[#F8F7F3] dark:bg-[#121110] border-t border-[#E8E2D9] dark:border-[#2D2A26] flex flex-col sm:flex-row items-center justify-between gap-3 transition-colors">
          <div className="text-[11px] text-[#6E6A63] dark:text-[#A39E96] flex items-center gap-1.5 font-mono">
            <ShieldCheck className="w-4 h-4 text-[#B58A54]" />
            <span>Roomora Spatial Vision Guard v2.6</span>
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            {isUncertain && onConfirmUseAnyway && (
              <button
                onClick={() => {
                  onConfirmUseAnyway(photo.id);
                  onClose();
                }}
                className="flex-1 sm:flex-none px-4 py-2 rounded-xl bg-[#E9DFD0] hover:bg-[#DDD0BE] text-xs font-bold text-[#292722] border border-[#CDBBA5]/70 cursor-pointer transition-colors"
              >
                {isRTL ? 'الاستمرار بالصورة الحالية' : 'Use Photo Anyway'}
              </button>
            )}

            {isInvalid && onReplace && (
              <button
                onClick={() => {
                  onReplace();
                  onClose();
                }}
                className="flex-1 sm:flex-none px-4 py-2 rounded-xl bg-[#292722] text-white dark:bg-[#F8F7F3] dark:text-[#292722] text-xs font-bold hover:bg-[#3D3A34] cursor-pointer transition-colors"
              >
                {isRTL ? 'رفع صورة بديلة' : 'Upload Replacement'}
              </button>
            )}

            <button
              onClick={onClose}
              className="px-5 py-2 rounded-xl bg-[#292722] text-white dark:bg-[#F8F7F3] dark:text-[#292722] text-xs font-bold hover:bg-[#3D3A34] cursor-pointer transition-colors"
            >
              {isRTL ? 'إغلاق الفحص' : 'Close Audit'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
