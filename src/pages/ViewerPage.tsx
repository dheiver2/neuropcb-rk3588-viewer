import { useEffect, useRef, useState } from "react";
import { BoardCanvas } from "../components/board/BoardCanvas";
import { ChipDetail } from "../components/chip/ChipDetail";
import { Toolbar } from "../components/ui/Toolbar";
import { ModelList } from "../components/ui/ModelList";
import { useViewerStore } from "../store/viewer";
import { exampleBoard } from "../data/boards/example-board";
import { distilledModels } from "../data/models/distilled-models";
import type { DistilledModel } from "../types";
import { Layers, Menu, X } from "lucide-react";

export function ViewerPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [size, setSize] = useState({ width: 800, height: 600 });
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [selectedModel, setSelectedModel] = useState<DistilledModel | null>(null);

  const selectedComponentId = useViewerStore((s) => s.selectedComponentId);

  const selectedComponent = exampleBoard.components.find(
    (c) => c.id === selectedComponentId
  );
  const linkedModel = selectedComponent?.modelRef
    ? distilledModels.find((m) => m.id === selectedComponent.modelRef)
    : undefined;

  useEffect(() => {
    function update() {
      if (!containerRef.current) return;
      setSize({
        width: containerRef.current.clientWidth,
        height: containerRef.current.clientHeight,
      });
    }
    update();
    const ro = new ResizeObserver(update);
    if (containerRef.current) ro.observe(containerRef.current);
    return () => ro.disconnect();
  }, []);

  return (
    <div className="flex h-screen bg-gray-950 text-gray-100 overflow-hidden">
      {/* Sidebar */}
      <aside
        className={`${
          sidebarOpen ? "w-72" : "w-0"
        } transition-all duration-200 overflow-hidden border-r border-gray-800 flex flex-col bg-gray-900`}
      >
        <div className="p-4 border-b border-gray-800">
          <div className="flex items-center gap-2 mb-1">
            <Layers size={18} className="text-blue-400" />
            <span className="font-semibold text-white">{exampleBoard.name}</span>
          </div>
          <p className="text-xs text-gray-500">{exampleBoard.description}</p>
          <p className="text-xs text-gray-600 mt-1 font-mono">v{exampleBoard.version}</p>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {/* Board stats */}
          <div className="grid grid-cols-2 gap-2">
            {[
              ["Componentes", exampleBoard.components.length],
              ["Conexões", exampleBoard.connections.length],
              ["Largura", `${exampleBoard.size.width}mm`],
              ["Altura", `${exampleBoard.size.height}mm`],
            ].map(([label, value]) => (
              <div key={label as string} className="bg-gray-800 rounded-lg p-2">
                <p className="text-gray-500 text-xs">{label}</p>
                <p className="text-white text-sm font-semibold">{value}</p>
              </div>
            ))}
          </div>

          {/* Models */}
          <ModelList
            models={distilledModels}
            onSelect={(m) => setSelectedModel(m === selectedModel ? null : m)}
          />
        </div>
      </aside>

      {/* Main canvas area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top bar */}
        <div className="flex items-center gap-3 px-4 py-3 border-b border-gray-800">
          <button
            onClick={() => setSidebarOpen((v) => !v)}
            className="p-1.5 text-gray-400 hover:text-white hover:bg-gray-800 rounded-lg transition-colors"
          >
            {sidebarOpen ? <X size={16} /> : <Menu size={16} />}
          </button>
          <Toolbar />
        </div>

        {/* Canvas */}
        <div ref={containerRef} className="flex-1 relative bg-gray-950 overflow-hidden">
          <BoardCanvas board={exampleBoard} width={size.width} height={size.height} />

          {/* Component detail overlay */}
          {selectedComponent && (
            <div className="absolute top-4 right-4 z-10">
              <ChipDetail component={selectedComponent} model={linkedModel} />
            </div>
          )}

          {/* Selected model overlay */}
          {selectedModel && !selectedComponent && (
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-gray-900 border border-blue-700 rounded-xl px-4 py-2 text-xs text-blue-300 shadow-lg">
              Modelo selecionado: <span className="font-semibold">{selectedModel.name}</span>
              {" — "}
              <span className="text-gray-400">
                clique no chip <strong>{selectedModel.targetChip}</strong> na placa para ver detalhes
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
