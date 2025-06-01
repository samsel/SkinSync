import { create } from 'zustand';
import { SkinAnalysisResult, Product } from '../lib/supabase';

interface AppState {
  // App state
  currentStep: 'landing' | 'camera' | 'analyzing' | 'results';
  setCurrentStep: (step: AppState['currentStep']) => void;
  
  // Camera data
  capturedImage: string | null;
  setCapturedImage: (image: string | null) => void;
  
  // Analysis results
  skinAnalysis: SkinAnalysisResult | null;
  setSkinAnalysis: (analysis: SkinAnalysisResult | null) => void;
  
  // Product recommendations
  recommendations: Record<string, Product[]>;
  setRecommendations: (recommendations: Record<string, Product[]>) => void;
}

export const useAppStore = create<AppState>((set) => ({
  // Initial state
  currentStep: 'landing',
  setCurrentStep: (step) => set({ currentStep: step }),
  
  capturedImage: null,
  setCapturedImage: (image) => set({ capturedImage: image }),
  
  skinAnalysis: null,
  setSkinAnalysis: (analysis) => set({ skinAnalysis: analysis }),
  
  recommendations: {},
  setRecommendations: (recommendations) => set({ recommendations }),
}));