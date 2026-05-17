# NeuroPCB · RK3588 Edge LLM Reference Board Viewer

Visualizador web profissional de projetos eletrônicos com foco em placas para **modelos de IA destilados** rodando na borda. Plataforma de referência: **Rockchip RK3588** (compatível com Radxa Rock 5B / Orange Pi 5+ / Banana Pi M7).

![Tech](https://img.shields.io/badge/Three.js-WebGL_2.0-5b8def)
![Tech](https://img.shields.io/badge/RKLLM-1.1.4-fbbf24)
![License](https://img.shields.io/badge/license-MIT-success)

## Recursos

### 6 modos de visualização
- **2D Vector** — render SVG técnico com 47 componentes
- **3D Realtime** — WebGL/Three.js fotorrealista com PBR materials
- **X-Ray** — multicamadas translúcidas
- **Thermal** — heatmap de TDP por componente
- **Signal Flow** — animação de partículas pelas trilhas
- **AI Inference** — visualização ao vivo do NPU rodando Qwen2.5

### Hardware modelado (componentes reais)
| Ref | Componente | Part Number | Fabricante |
|-----|-----------|-------------|------------|
| U1 | RK3588 SoC · 8-core · NPU 6 TOPS | `RK3588` | Rockchip |
| U2 | LPDDR4X 8GB · 4266 Mbps | `H9HCNNNBKMMLXR-NEE` | SK hynix |
| U3 | eMMC 5.1 64GB | `SDINBDG4-64G` | SanDisk |
| U4 | PMIC · 3 buck + 4 LDO | `TPS65219RNQR` | Texas Instruments |
| U5 | 2.5GbE PCIe controller | `RTL8125BG-CG` | Realtek |
| U6 | Companion MCU Cortex-M0+ | `STM32G031K8T6` | STMicro |
| U7 | USB-C PD 3.0 controller | `TUSB422RUKR` | TI |

### 8 modelos destilados com benchmarks reais
Medidos via [RKLLM v1.1.4](https://github.com/airockchip/rknn-llm) no RK3588 NPU @ max freq.

| Modelo | Decode | Prefill | RAM | Ctx |
|--------|--------|---------|-----|-----|
| TinyLlama 1.1B Chat | 24.7 tok/s | 285 tok/s | 0.8 GB | 2K |
| Llama 3.2 1B Instruct | 22.3 tok/s | 260 tok/s | 0.7 GB | 128K |
| SmolLM2 1.7B Instruct | 17.4 tok/s | 205 tok/s | 1.2 GB | 8K |
| Qwen2.5 1.5B Instruct | 16.5 tok/s | 195 tok/s | 1.0 GB | 32K |
| DeepSeek-R1-Distill-Qwen-1.5B | 15.9 tok/s | 180 tok/s | 1.0 GB | 32K |
| Gemma 2 2B Instruct | 14.2 tok/s | 165 tok/s | 1.4 GB | 8K |
| Llama 3.2 3B Instruct | 11.8 tok/s | 110 tok/s | 2.1 GB | 128K |
| Phi-3 Mini 4K Instruct | 10.6 tok/s | 95 tok/s | 2.4 GB | 4K |

### 5 projetos de deployment integrados
1. **[RKLLM Runtime](https://github.com/airockchip/rknn-llm)** — NPU acelerado · w4a16
2. **[Ollama](https://github.com/ollama/ollama)** — API OpenAI · GGUF Q4_K_M
3. **[llama.cpp](https://github.com/ggerganov/llama.cpp)** — OpenCL Mali backend
4. **[MLC-LLM](https://github.com/mlc-ai/mlc-llm)** — TVM cross-platform
5. **[ExecuTorch](https://github.com/pytorch/executorch)** — PyTorch Edge · XNNPACK

### Outras features
- **AI Copilot** conversacional com conhecimento factual sobre RK3588 e modelos
- **Osciloscópio virtual** ao clicar em qualquer trilha
- **Mini-mapa** navegável
- **Command palette** (`Ctrl+K`) estilo VSCode
- **Métricas live**: tokens/s, potência (W), temperatura NPU, RAM
- **28 barras** de atividade neural (camadas do Qwen2.5)
- **Multi-cursor presence** (header colaborativo)

## Uso rápido

### Preview standalone (sem build)
Abra `public/index.html` diretamente no navegador. Standalone, usa CDNs:
- Tailwind via JIT CDN
- Three.js 0.160 via importmap

### Versão React/TypeScript (Vite)
```bash
npm install
npm run dev
```

Estrutura `src/`:
- `components/board/BoardCanvas.tsx` — canvas SVG via react-konva
- `components/chip/ChipDetail.tsx` — painel do componente
- `components/ui/Toolbar.tsx` · `ModelList.tsx`
- `store/viewer.ts` — estado global (zustand)
- `types/index.ts` — Board, Pin, DistilledModel, etc.
- `data/boards/example-board.ts`
- `data/models/distilled-models.ts`

## Stack

- **React 18** + **TypeScript 5.4**
- **Vite 5** + **Tailwind 3.4**
- **Three.js 0.160** com OrbitControls e ACES Filmic Tone Mapping
- **react-konva 18** (canvas 2D)
- **Zustand 4** (state)

## Atalhos

| Tecla | Ação |
|-------|------|
| `Ctrl+K` | Command palette |
| `1`-`6` | Trocar modo de visualização |
| `2` | Vista 2D |
| `3` | Vista 3D |
| `X` | X-Ray |
| `T` | Thermal |
| `S` | Signal flow |
| `Esc` | Fechar painéis |
| Scroll | Zoom no cursor |
| Arrastar | Pan |

## Licença

MIT
