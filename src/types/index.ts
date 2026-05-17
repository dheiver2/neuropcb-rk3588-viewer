export type ComponentType =
  | "chip"
  | "resistor"
  | "capacitor"
  | "inductor"
  | "connector"
  | "led"
  | "transistor"
  | "ic";

export interface Position {
  x: number;
  y: number;
}

export interface Size {
  width: number;
  height: number;
}

export interface Pin {
  id: string;
  label: string;
  position: Position;
  direction: "input" | "output" | "bidirectional" | "power" | "ground";
}

export interface ElectronicComponent {
  id: string;
  type: ComponentType;
  label: string;
  description?: string;
  position: Position;
  size: Size;
  rotation?: number;
  pins: Pin[];
  properties?: Record<string, string | number>;
  modelRef?: string;
}

export interface Connection {
  id: string;
  fromComponentId: string;
  fromPinId: string;
  toComponentId: string;
  toPinId: string;
  label?: string;
}

export interface BoardLayer {
  id: string;
  name: "top" | "bottom" | "silkscreen" | "soldermask" | "copper";
  visible: boolean;
  color: string;
}

export interface Board {
  id: string;
  name: string;
  description?: string;
  version: string;
  size: Size;
  components: ElectronicComponent[];
  connections: Connection[];
  layers: BoardLayer[];
  createdAt: string;
  updatedAt: string;
}

export interface DistilledModel {
  id: string;
  name: string;
  baseModel: string;
  parameters: string;
  quantization: "INT4" | "INT8" | "FP16" | "FP32";
  targetChip: string;
  memoryRequirement: string;
  powerConsumption: string;
  inferenceSpeed: string;
  boardId: string;
  tags: string[];
}

export interface Project {
  id: string;
  name: string;
  description?: string;
  thumbnail?: string;
  board: Board;
  models: DistilledModel[];
  createdAt: string;
  updatedAt: string;
}

export type ViewMode = "2d" | "3d" | "schematic";

export interface ViewerState {
  zoom: number;
  panX: number;
  panY: number;
  selectedComponentId: string | null;
  highlightedPins: string[];
  activeLayer: string | null;
  viewMode: ViewMode;
}
