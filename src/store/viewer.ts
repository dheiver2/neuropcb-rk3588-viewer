import { create } from "zustand";
import type { ViewerState, ViewMode } from "../types";

interface ViewerStore extends ViewerState {
  setZoom: (zoom: number) => void;
  setPan: (x: number, y: number) => void;
  selectComponent: (id: string | null) => void;
  setHighlightedPins: (pins: string[]) => void;
  setActiveLayer: (layerId: string | null) => void;
  setViewMode: (mode: ViewMode) => void;
  resetView: () => void;
}

const defaultState: ViewerState = {
  zoom: 1,
  panX: 0,
  panY: 0,
  selectedComponentId: null,
  highlightedPins: [],
  activeLayer: null,
  viewMode: "2d",
};

export const useViewerStore = create<ViewerStore>((set) => ({
  ...defaultState,
  setZoom: (zoom) => set({ zoom: Math.min(Math.max(zoom, 0.1), 10) }),
  setPan: (panX, panY) => set({ panX, panY }),
  selectComponent: (selectedComponentId) => set({ selectedComponentId }),
  setHighlightedPins: (highlightedPins) => set({ highlightedPins }),
  setActiveLayer: (activeLayer) => set({ activeLayer }),
  setViewMode: (viewMode) => set({ viewMode }),
  resetView: () => set(defaultState),
}));
