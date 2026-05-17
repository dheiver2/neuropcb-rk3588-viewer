import { Stage, Layer, Rect, Text, Group, Line, Circle } from "react-konva";
import type { Board } from "../../types";
import { useViewerStore } from "../../store/viewer";

interface Props {
  board: Board;
  width: number;
  height: number;
}

const SCALE = 5;

export function BoardCanvas({ board, width, height }: Props) {
  const { zoom, panX, panY, selectedComponentId, selectComponent, setZoom, setPan } =
    useViewerStore();

  function handleWheel(e: any) {
    e.evt.preventDefault();
    const delta = e.evt.deltaY > 0 ? 0.9 : 1.1;
    setZoom(zoom * delta);
  }

  return (
    <Stage
      width={width}
      height={height}
      scaleX={zoom}
      scaleY={zoom}
      x={panX}
      y={panY}
      onWheel={handleWheel}
      draggable
      onDragEnd={(e) => setPan(e.target.x(), e.target.y())}
    >
      <Layer>
        {/* Board outline */}
        <Rect
          x={10}
          y={10}
          width={board.size.width * SCALE}
          height={board.size.height * SCALE}
          fill="#1a3a2a"
          stroke="#40916c"
          strokeWidth={2}
          cornerRadius={4}
        />

        {/* Components */}
        {board.components.map((comp) => {
          const isSelected = comp.id === selectedComponentId;
          const x = 10 + comp.position.x * SCALE;
          const y = 10 + comp.position.y * SCALE;
          const w = comp.size.width * SCALE;
          const h = comp.size.height * SCALE;

          return (
            <Group key={comp.id} x={x} y={y} onClick={() => selectComponent(comp.id)}>
              <Rect
                width={w}
                height={h}
                fill={comp.type === "chip" ? "#0a1628" : comp.type === "led" ? "#003300" : "#1c2e1c"}
                stroke={isSelected ? "#f4c542" : comp.type === "chip" ? "#4fc3f7" : "#adb5bd"}
                strokeWidth={isSelected ? 2 : 1}
                cornerRadius={comp.type === "chip" ? 2 : 1}
                shadowColor={isSelected ? "#f4c542" : undefined}
                shadowBlur={isSelected ? 8 : 0}
              />
              <Text
                text={comp.label}
                fontSize={comp.type === "chip" ? 9 : 6}
                fill="#e0e0e0"
                width={w}
                height={h}
                align="center"
                verticalAlign="middle"
              />
              {/* Pins */}
              {comp.pins.map((pin) => (
                <Circle
                  key={pin.id}
                  x={pin.position.x * SCALE}
                  y={pin.position.y * SCALE}
                  radius={2}
                  fill={
                    pin.direction === "power"
                      ? "#e63946"
                      : pin.direction === "ground"
                      ? "#adb5bd"
                      : pin.direction === "output"
                      ? "#06d6a0"
                      : "#ffd166"
                  }
                />
              ))}
            </Group>
          );
        })}

        {/* Connections */}
        {board.connections.map((conn) => {
          const from = board.components.find((c) => c.id === conn.fromComponentId);
          const to = board.components.find((c) => c.id === conn.toComponentId);
          const fromPin = from?.pins.find((p) => p.id === conn.fromPinId);
          const toPin = to?.pins.find((p) => p.id === conn.toPinId);
          if (!from || !to || !fromPin || !toPin) return null;

          const x1 = 10 + (from.position.x + fromPin.position.x) * SCALE;
          const y1 = 10 + (from.position.y + fromPin.position.y) * SCALE;
          const x2 = 10 + (to.position.x + toPin.position.x) * SCALE;
          const y2 = 10 + (to.position.y + toPin.position.y) * SCALE;

          return (
            <Line
              key={conn.id}
              points={[x1, y1, x2, y2]}
              stroke="#d4a017"
              strokeWidth={1}
              dash={[4, 2]}
              opacity={0.7}
            />
          );
        })}
      </Layer>
    </Stage>
  );
}
