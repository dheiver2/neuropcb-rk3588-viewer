import { ZoomIn, ZoomOut, RotateCcw, Layers, Box, Grid3x3 } from "lucide-react";
import { useViewerStore } from "../../store/viewer";
import type { ViewMode } from "../../types";

export function Toolbar() {
  const { zoom, viewMode, setZoom, resetView, setViewMode } = useViewerStore();

  const modes: { mode: ViewMode; icon: React.ReactNode; label: string }[] = [
    { mode: "2d", icon: <Grid3x3 size={16} />, label: "2D" },
    { mode: "3d", icon: <Box size={16} />, label: "3D" },
    { mode: "schematic", icon: <Layers size={16} />, label: "Esquema" },
  ];

  return (
    <div className="flex items-center gap-2 bg-gray-900 border border-gray-700 rounded-xl px-3 py-2 shadow-lg">
      {/* View mode */}
      <div className="flex bg-gray-800 rounded-lg p-0.5">
        {modes.map(({ mode, icon, label }) => (
          <button
            key={mode}
            onClick={() => setViewMode(mode)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs transition-colors ${
              viewMode === mode
                ? "bg-blue-600 text-white"
                : "text-gray-400 hover:text-white hover:bg-gray-700"
            }`}
          >
            {icon}
            {label}
          </button>
        ))}
      </div>

      <div className="w-px h-6 bg-gray-700" />

      {/* Zoom */}
      <button
        onClick={() => setZoom(zoom * 1.2)}
        className="p-1.5 text-gray-400 hover:text-white hover:bg-gray-700 rounded-lg transition-colors"
        title="Aumentar zoom"
      >
        <ZoomIn size={16} />
      </button>
      <span className="text-xs text-gray-400 font-mono w-12 text-center">
        {Math.round(zoom * 100)}%
      </span>
      <button
        onClick={() => setZoom(zoom * 0.8)}
        className="p-1.5 text-gray-400 hover:text-white hover:bg-gray-700 rounded-lg transition-colors"
        title="Diminuir zoom"
      >
        <ZoomOut size={16} />
      </button>

      <div className="w-px h-6 bg-gray-700" />

      <button
        onClick={resetView}
        className="p-1.5 text-gray-400 hover:text-white hover:bg-gray-700 rounded-lg transition-colors"
        title="Resetar visualização"
      >
        <RotateCcw size={16} />
      </button>
    </div>
  );
}
