import { X, Cpu, Zap, Database, Activity } from "lucide-react";
import type { ElectronicComponent, DistilledModel } from "../../types";
import { useViewerStore } from "../../store/viewer";

interface Props {
  component: ElectronicComponent;
  model?: DistilledModel;
}

const PIN_COLOR: Record<string, string> = {
  power: "text-red-400",
  ground: "text-gray-400",
  input: "text-yellow-400",
  output: "text-green-400",
  bidirectional: "text-blue-400",
};

export function ChipDetail({ component, model }: Props) {
  const selectComponent = useViewerStore((s) => s.selectComponent);

  return (
    <div className="bg-gray-900 border border-gray-700 rounded-xl p-4 w-80 shadow-xl text-sm text-gray-100">
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-2">
          <Cpu size={18} className="text-blue-400" />
          <span className="font-semibold text-white">{component.label}</span>
        </div>
        <button
          onClick={() => selectComponent(null)}
          className="text-gray-500 hover:text-white transition-colors"
        >
          <X size={16} />
        </button>
      </div>

      {component.description && (
        <p className="text-gray-400 text-xs mb-3">{component.description}</p>
      )}

      {/* Properties */}
      {component.properties && (
        <div className="mb-3">
          <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Propriedades</p>
          <div className="grid grid-cols-2 gap-1">
            {Object.entries(component.properties).map(([k, v]) => (
              <div key={k} className="bg-gray-800 rounded px-2 py-1">
                <span className="text-gray-500 text-xs">{k}</span>
                <p className="text-white text-xs font-mono">{String(v)}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Pins */}
      <div className="mb-3">
        <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Pinos ({component.pins.length})</p>
        <div className="space-y-1 max-h-32 overflow-y-auto">
          {component.pins.map((pin) => (
            <div key={pin.id} className="flex items-center justify-between text-xs">
              <span className="font-mono text-gray-300">{pin.label}</span>
              <span className={`${PIN_COLOR[pin.direction]} capitalize`}>{pin.direction}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Linked model */}
      {model && (
        <div className="border-t border-gray-700 pt-3">
          <p className="text-xs text-gray-500 uppercase tracking-wider mb-2">Modelo Destilado</p>
          <div className="bg-blue-950 border border-blue-800 rounded-lg p-3 space-y-2">
            <p className="text-blue-300 font-semibold text-sm">{model.name}</p>
            <p className="text-gray-400 text-xs font-mono">{model.baseModel}</p>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="flex items-center gap-1 text-gray-300">
                <Database size={12} className="text-purple-400" />
                {model.parameters} params
              </div>
              <div className="flex items-center gap-1 text-gray-300">
                <Activity size={12} className="text-green-400" />
                {model.quantization}
              </div>
              <div className="flex items-center gap-1 text-gray-300">
                <Zap size={12} className="text-yellow-400" />
                {model.powerConsumption}
              </div>
              <div className="flex items-center gap-1 text-gray-300">
                <Activity size={12} className="text-blue-400" />
                {model.inferenceSpeed}
              </div>
            </div>
            <div className="flex flex-wrap gap-1">
              {model.tags.map((tag) => (
                <span
                  key={tag}
                  className="bg-blue-900 text-blue-300 text-xs px-2 py-0.5 rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
