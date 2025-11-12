import { create } from "zustand";

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
  selectedIndex: null;

  // --- ADD THIS SECTION ---
  zoom: number; // This will hold the current zoom level
  zoomIn: () => void;
  zoomOut: () => void;
  // --- END ADD ---
}

export const useAppStore = create<AppState>((set) => ({
  posters: [],
  selectedProduct: null,
  selectedIndex: null,
  // Set the clicked product + its index
  setSelectedProduct: (product, index = null) =>
    set({ selectedProduct: product, selectedIndex: index }),
  // --- ADD THIS SECTION ---
  zoom: 90, // Set a default zoom
  zoomIn: () => set((state) => ({ zoom: state.zoom * 1.2 })), // Increase zoom by 20%
  zoomOut: () => set((state) => ({ zoom: state.zoom / 1.2 })), // Decrease zoom by 20%
  // --- END ADD ---
}));
