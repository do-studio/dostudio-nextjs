import { create } from 'zustand';

export interface Product {
  id: string;
  name: string;
  image: string;
  position: [number, number, number];
  // Add other fields like collection_images here
}

interface AppState {
  selectedProduct: Product | null;
  setSelectedProduct: (product: Product | null) => void;
  
  // --- ADD THIS SECTION ---
  zoom: number; // This will hold the current zoom level
  zoomIn: () => void;
  zoomOut: () => void;
  // --- END ADD ---
}

export const useAppStore = create<AppState>((set) => ({
  selectedProduct: null,
  setSelectedProduct: (product) => set({ selectedProduct: product }),

  // --- ADD THIS SECTION ---
  zoom: 50, // Set a default zoom
  zoomIn: () => set((state) => ({ zoom: state.zoom * 1.2 })), // Increase zoom by 20%
  zoomOut: () => set((state) => ({ zoom: state.zoom / 1.2 })), // Decrease zoom by 20%
  // --- END ADD ---
}));