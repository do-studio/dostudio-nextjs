import { create } from 'zustand';

export interface Product {
  id: string;
  name: string;
  image: string;
  position: [number, number, number];
  ratio?: string;

  // ✅ REQUIRED FIELDS TO FIX NEXT.JS BUILD ERROR
  screenPosition?: { x: number; y: number };
  elementSize?: { width: number; height: number };
}

interface AppState {
  selectedProduct: Product | null;
  setSelectedProduct: (product: Product | null) => void;

  zoom: number;
  zoomIn: () => void;
  zoomOut: () => void;

  // (You included posters + selectedIndex but didn't type them;
  // keeping them optional to avoid breaking anything)
  posters?: Product[];
  selectedIndex?: number | null;
}

export const useAppStore = create<AppState>((set) => ({
  posters: [],
  selectedProduct: null,
  selectedIndex: null,

  setSelectedProduct: (product) => set({ selectedProduct: product }),

  zoom: 90,
  zoomIn: () => set((state) => ({ zoom: state.zoom * 1.2 })),
  zoomOut: () => set((state) => ({ zoom: state.zoom / 1.2 })),
}));
