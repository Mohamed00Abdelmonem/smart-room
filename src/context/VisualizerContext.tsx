import React, { createContext, useContext, useState } from 'react';
import { 
  FurnitureProduct, 
  FurnishedRoomDesignResult, 
  RoomDesignState, 
  UploadedRoomPhoto, 
  DesignProposal, 
  RoomValidationResult 
} from '../types';
import { LUXURY_PRODUCTS } from '../data/products';
import { DEFAULT_PRESET_PHOTOS, INITIAL_DESIGN_RESULT } from '../data/sampleRooms';
import { generateProposalsForRoom } from '../data/proposalsData';
import { validateRoomImage } from '../utils/roomValidation';

interface VisualizerContextType {
  // Experience A modal
  isExperienceAOpen: boolean;
  selectedProductForA: FurnitureProduct | null;
  openExperienceA: (product?: FurnitureProduct) => void;
  closeExperienceA: () => void;

  // Experience B Room Designer state
  roomDesignState: RoomDesignState;
  setRoomDesignState: React.Dispatch<React.SetStateAction<RoomDesignState>>;
  designResult: FurnishedRoomDesignResult | null;
  setDesignResult: React.Dispatch<React.SetStateAction<FurnishedRoomDesignResult | null>>;
  
  // Proposals & Selection (User Controlled - NEVER auto-selected)
  proposals: DesignProposal[];
  selectedProposalId: string | null;
  setSelectedProposalId: (id: string | null) => void;
  comparedProposalIds: string[];
  toggleCompareProposal: (id: string) => void;
  clearComparedProposals: () => void;
  generateMoreProposals: () => Promise<void>;
  isGeneratingMore: boolean;
  activeProposalForDetail: DesignProposal | null;
  setActiveProposalForDetail: (proposal: DesignProposal | null) => void;
  isComparisonModalOpen: boolean;
  setIsComparisonModalOpen: (open: boolean) => void;

  // Image Validation
  validateUploadedPhoto: (photoId: string, url: string, fileName?: string) => Promise<RoomValidationResult>;
  isValidatingPhoto: boolean;

  // Generation status
  isGenerating: boolean;
  generationStep: number;
  generationProgress: number;
  triggerGenerateDesign: () => Promise<void>;
  resetDesign: () => void;

  // B2B Demo Modal
  isBookDemoOpen: boolean;
  openBookDemo: () => void;
  closeBookDemo: () => void;

  // Quick View Product Modal
  quickViewProduct: FurnitureProduct | null;
  setQuickViewProduct: (product: FurnitureProduct | null) => void;
}

const defaultRoomState: RoomDesignState = {
  roomType: 'Living Room',
  dimensions: {
    widthM: 5.0,
    lengthM: 4.0,
    heightM: 2.9,
    unit: 'meters',
  },
  doorsCount: 2,
  windowsCount: 2,
  style: 'Minimalist',
  budgetEgp: 80000,
  prompt: 'I want to furnish my living room with a modern minimalist style. My budget is 80,000 EGP. I need a comfortable L-shaped sofa, a TV unit, a coffee table, and a carpet. The room is 5m x 4m. I prefer warm beige and natural wood colors.',
  requiredPieces: ['L-Shaped Sofa', 'Coffee Table', 'TV / Media Unit', 'Area Rug'],
  uploadedPhotos: DEFAULT_PRESET_PHOTOS,
};

const VisualizerContext = createContext<VisualizerContextType | undefined>(undefined);

export const VisualizerProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isExperienceAOpen, setIsExperienceAOpen] = useState(false);
  const [selectedProductForA, setSelectedProductForA] = useState<FurnitureProduct | null>(null);

  const [roomDesignState, setRoomDesignState] = useState<RoomDesignState>(defaultRoomState);
  const [designResult, setDesignResult] = useState<FurnishedRoomDesignResult | null>(INITIAL_DESIGN_RESULT);
  
  // Proposals: Initialize 4 initial concepts. selectedProposalId starts as NULL (no auto-selection!)
  const [proposals, setProposals] = useState<DesignProposal[]>(() => generateProposalsForRoom(defaultRoomState, 4, 1));
  const [selectedProposalId, setSelectedProposalId] = useState<string | null>(null);
  const [comparedProposalIds, setComparedProposalIds] = useState<string[]>([]);
  const [activeProposalForDetail, setActiveProposalForDetail] = useState<DesignProposal | null>(null);
  const [isComparisonModalOpen, setIsComparisonModalOpen] = useState(false);
  const [isGeneratingMore, setIsGeneratingMore] = useState(false);
  const [isValidatingPhoto, setIsValidatingPhoto] = useState(false);

  const [isGenerating, setIsGenerating] = useState(false);
  const [generationStep, setGenerationStep] = useState(0);
  const [generationProgress, setGenerationProgress] = useState(0);

  const [isBookDemoOpen, setIsBookDemoOpen] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState<FurnitureProduct | null>(null);

  const openExperienceA = (product?: FurnitureProduct) => {
    setSelectedProductForA(product || LUXURY_PRODUCTS[0]);
    setIsExperienceAOpen(true);
  };

  const closeExperienceA = () => {
    setIsExperienceAOpen(false);
  };

  const openBookDemo = () => setIsBookDemoOpen(true);
  const closeBookDemo = () => setIsBookDemoOpen(false);

  const resetDesign = () => {
    setRoomDesignState(defaultRoomState);
    const initialProposals = generateProposalsForRoom(defaultRoomState, 4, 1);
    setProposals(initialProposals);
    setSelectedProposalId(null); // Never auto-select
    setComparedProposalIds([]);
    setActiveProposalForDetail(null);
    setDesignResult(INITIAL_DESIGN_RESULT);
  };

  // Compare proposals toggler
  const toggleCompareProposal = (id: string) => {
    setComparedProposalIds((prev) => {
      if (prev.includes(id)) {
        return prev.filter((pId) => pId !== id);
      }
      if (prev.length >= 4) {
        return [...prev.slice(1), id]; // keep max 4 for comparison
      }
      return [...prev, id];
    });
  };

  const clearComparedProposals = () => {
    setComparedProposalIds([]);
  };

  // Validate an individual photo
  const validateUploadedPhoto = async (photoId: string, url: string, fileName?: string): Promise<RoomValidationResult> => {
    setIsValidatingPhoto(true);

    // Set immediate analyzing state for spinner & scanner overlay
    setRoomDesignState((prev) => ({
      ...prev,
      uploadedPhotos: prev.uploadedPhotos.map((p) =>
        p.id === photoId
          ? {
              ...p,
              validationResult: {
                status: 'analyzing',
                confidenceScore: 0,
                isInterior: false,
                floorPlaneDetected: false,
                lightingScore: 'Optimal',
                obstructionLevel: 'Low',
                title: 'Scanning Room Environment...',
                titleAr: 'جاري فحص بيئة الغرفة بالذكاء الاصطناعي...',
                message: 'Analyzing wall boundaries, floor plane coordinates, and ambient daylight vectors...',
                messageAr: 'جاري فحص زوايا الجدران ومستوى الأرضية واتجاهات الضوء الطبيعي...',
                details: {
                  category: 'Spatial AI Scan',
                  categoryAr: 'فحص مكاني ذكي',
                  wallsDetected: false,
                  roomPerspective: 'Scanning Vector Coordinates...',
                  roomPerspectiveAr: 'جاري قياس الإحداثيات...',
                  suitableFor3D: false,
                },
              },
            }
          : p
      ),
    }));

    const result = await validateRoomImage(url, fileName);
    
    setRoomDesignState((prev) => ({
      ...prev,
      uploadedPhotos: prev.uploadedPhotos.map((p) =>
        p.id === photoId ? { ...p, validationResult: result } : p
      ),
    }));

    setIsValidatingPhoto(false);
    return result;
  };

  // Generate more proposals (append to existing, never delete)
  const generateMoreProposals = async () => {
    setIsGeneratingMore(true);
    await new Promise((resolve) => setTimeout(resolve, 900));

    const nextStartIndex = proposals.length + 1;
    const additionalProposals = generateProposalsForRoom(roomDesignState, 3, nextStartIndex);

    setProposals((prev) => [...prev, ...additionalProposals]);
    setIsGeneratingMore(false);
  };

  // Main proposal generation triggered at Step 4 -> Step 5
  const triggerGenerateDesign = async () => {
    setIsGenerating(true);
    setGenerationStep(1);
    setGenerationProgress(15);

    await new Promise((resolve) => setTimeout(resolve, 700));
    setGenerationStep(2);
    setGenerationProgress(45);

    await new Promise((resolve) => setTimeout(resolve, 800));
    setGenerationStep(3);
    setGenerationProgress(75);

    await new Promise((resolve) => setTimeout(resolve, 750));
    setGenerationStep(4);
    setGenerationProgress(100);

    await new Promise((resolve) => setTimeout(resolve, 500));

    // Generate 4 distinct proposals based on room parameters
    const generatedProposals = generateProposalsForRoom(roomDesignState, 4, 1);
    setProposals(generatedProposals);

    // CRITICAL USER REQUIREMENT:
    // Do NOT automatically select any proposal. Keep selectedProposalId null!
    setSelectedProposalId(null);
    setComparedProposalIds([]);
    setActiveProposalForDetail(null);

    // Default designResult for legacy compatibility
    const firstProposal = generatedProposals[0];
    setDesignResult({
      id: `roomora-design-${Math.floor(10000 + Math.random() * 90000)}`,
      title: firstProposal.title,
      titleAr: firstProposal.titleAr,
      style: firstProposal.style,
      originalImageUrl: firstProposal.beforeImageUrl,
      furnishedImageUrl: firstProposal.previewImageUrl,
      generatedAt: 'Just now',
      roomDimensionsLabel: `${roomDesignState.dimensions.widthM.toFixed(1)}m × ${roomDesignState.dimensions.lengthM.toFixed(1)}m (${roomDesignState.dimensions.heightM.toFixed(1)}m Ceiling)`,
      budgetEgp: roomDesignState.budgetEgp,
      totalCostEgp: firstProposal.totalCostEgp,
      selectedProducts: firstProposal.selectedProducts,
      designNotes: firstProposal.description,
      designNotesAr: firstProposal.descriptionAr,
      hotspots: firstProposal.hotspots,
    });

    setIsGenerating(false);
  };

  return (
    <VisualizerContext.Provider
      value={{
        isExperienceAOpen,
        selectedProductForA,
        openExperienceA,
        closeExperienceA,
        roomDesignState,
        setRoomDesignState,
        designResult,
        setDesignResult,
        proposals,
        selectedProposalId,
        setSelectedProposalId,
        comparedProposalIds,
        toggleCompareProposal,
        clearComparedProposals,
        generateMoreProposals,
        isGeneratingMore,
        activeProposalForDetail,
        setActiveProposalForDetail,
        isComparisonModalOpen,
        setIsComparisonModalOpen,
        validateUploadedPhoto,
        isValidatingPhoto,
        isGenerating,
        generationStep,
        generationProgress,
        triggerGenerateDesign,
        resetDesign,
        isBookDemoOpen,
        openBookDemo,
        closeBookDemo,
        quickViewProduct,
        setQuickViewProduct,
      }}
    >
      {children}
    </VisualizerContext.Provider>
  );
};

export const useVisualizer = () => {
  const context = useContext(VisualizerContext);
  if (!context) {
    throw new Error('useVisualizer must be used within a VisualizerProvider');
  }
  return context;
};
