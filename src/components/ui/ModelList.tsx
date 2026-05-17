import { Cpu, Zap, Database, Activity, ChevronRight } from "lucide-react";
import type { DistilledModel } from "../../types";

interface Props {
  models: DistilledModel[];
  onSelect?: (model: DistilledModel) => void;
}

const QUANT_COLOR: Record<string, string> = {
  INT4: "bg-red-900 text-red-300",
  INT8: "bg-yellow-900 text-yellow-300",
  FP16: "bg-blue-900 text-blue-300",
  FP32: "bg-green-900 text-green-300",
};

export function ModelList({ models, onSelect }: Props) {
  return (
    <div className="space-y-2">
      <p className="text-xs text-gray-500 uppercase tracking-wider px-1">
        Modelos Destilados ({models.length})
      </p>
      {models.map((model) => (
        <button
          key={model.id}
          onClick={() => onSelect?.(model)}
          className="w-full text-left bg-gray-800 hover:bg-gray-750 border border-gray-700 hover:border-blue-700 rounded-xl p-3 transition-all group"
        >
          <div className="flex items-start justify-between mb-2">
            <div className="flex items-center gap-2">
              <Cpu size={14} className="text-blue-400 mt-0.5 shrink-0" />
              <span className="text-white text-sm font-medium">{model.name}</span>
            </div>
            <ChevronRight
              size={14}
              className="text-gray-600 group-hover:text-blue-400 transition-colors mt-0.5"
            />
          </div>

          <p className="text-gray-500 text-xs font-mono mb-2 truncate">{model.baseModel}</p>

          <div className="flex items-center gap-3 text-xs text-gray-400">
            <span className="flex items-center gap-1">
              <Database size={11} />
              {model.parameters}
            </span>
            <span className="flex items-center gap-1">
              <Zap size={11} />
              {model.powerConsumption}
            </span>
            <span className="flex items-center gap-1">
              <Activity size={11} />
              {model.inferenceSpeed}
            </span>
            <span
              className={`ml-auto px-2 py-0.5 rounded text-xs font-mono ${
                QUANT_COLOR[model.quantization] ?? "bg-gray-700 text-gray-300"
              }`}
            >
              {model.quantization}
            </span>
          </div>
        </button>
      ))}
    </div>
  );
}
