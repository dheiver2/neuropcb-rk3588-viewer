// NeuroPCB · Mock data layer
// In a real product this would be a database. Stored in localStorage.

const PROJECTS_KEY = "neuropcb_projects";

export const TEMPLATES = [
  {
    id: "tpl-neurion-x1",
    name: "VESPER · NEURION X1 Reference",
    desc: "Chip CIM custom da NeuroPCB · 32 TOPS @ 0.5W · primeiro NPU do mundo desenhado do zero para LLMs destilados",
    chip: "NEURION X1",
    chipType: "Compute-in-Memory NPU",
    compat: ["VESPER rev-A DevKit"],
    tops: 32,
    ram: "128 MB SRAM on-die + 4 GB HBM2e",
    models: ["Qwen2.5 1.5B (180 tok/s)", "Llama 3.2 1B (240 tok/s)", "Phi-3 Mini (95 tok/s)", "DeepSeek-R1-Distill (165 tok/s)"],
    tier: "enterprise",
    flagship: true,
    customPage: "chip-neurion.html",
    color: "linear-gradient(135deg, #5b8def, #8b5cf6, #2dd4bf)",
    icon: "⚛️",
    components: 142,
    layers: 6,
    benchmark: "180 tok/s · Qwen2.5-1.5B · 0.5W"
  },
  {
    id: "tpl-rk3588",
    name: "RK3588 Edge LLM Board",
    desc: "Placa de referência para LLMs destilados · NPU 6 TOPS · 8 GB LPDDR4X",
    chip: "Rockchip RK3588",
    chipType: "SoC + NPU",
    compat: ["Radxa Rock 5B", "Orange Pi 5+", "Banana Pi M7"],
    tops: 6,
    ram: "8 GB",
    models: ["Qwen2.5", "Llama 3.2", "Phi-3", "DeepSeek-R1-Distill", "Gemma 2"],
    tier: "free",
    color: "linear-gradient(135deg, #5b8def, #8b5cf6)",
    icon: "🧠",
    components: 47,
    layers: 6,
    benchmark: "16.5 tok/s · Qwen2.5-1.5B"
  },
  {
    id: "tpl-jetson",
    name: "Jetson Orin Nano Companion",
    desc: "Carrier board para NVIDIA Jetson Orin Nano Super · 40 TOPS",
    chip: "NVIDIA Jetson Orin Nano",
    chipType: "GPU + Tensor Cores",
    compat: ["Jetson Orin Nano 8GB"],
    tops: 40,
    ram: "8 GB LPDDR5",
    models: ["Llama 3.1 8B", "Mistral 7B", "Phi-3.5 Medium", "Stable Diffusion XL"],
    tier: "pro",
    color: "linear-gradient(135deg, #76b900, #34d399)",
    icon: "⚡",
    components: 92,
    layers: 10,
    benchmark: "33 tok/s · Llama 3.1 8B Q4"
  },
  {
    id: "tpl-coral",
    name: "Coral Edge TPU HAT",
    desc: "HAT para Raspberry Pi com Google Coral Edge TPU · 4 TOPS INT8",
    chip: "Google Edge TPU",
    chipType: "ASIC",
    compat: ["Raspberry Pi 4", "Raspberry Pi 5"],
    tops: 4,
    ram: "8 MB SRAM",
    models: ["MobileNet V2", "EfficientNet-Lite", "BERT-Tiny", "YOLOv8n"],
    tier: "free",
    color: "linear-gradient(135deg, #ea580c, #fbbf24)",
    icon: "🌊",
    components: 28,
    layers: 4,
    benchmark: "350 inf/s · MobileNet V2"
  },
  {
    id: "tpl-hailo",
    name: "Hailo-8L AI Accelerator HAT",
    desc: "Co-processador Hailo-8L para Raspberry Pi 5 · 13 TOPS",
    chip: "Hailo-8L M.2",
    chipType: "Dataflow AI",
    compat: ["Raspberry Pi 5"],
    tops: 13,
    ram: "Compartilhada",
    models: ["YOLOv8m", "MobileCLIP", "RetinaFace", "PoseNet"],
    tier: "free",
    color: "linear-gradient(135deg, #06b6d4, #2dd4bf)",
    icon: "🦅",
    components: 35,
    layers: 6,
    benchmark: "120 fps · YOLOv8m 1080p"
  },
  {
    id: "tpl-esp32-ai",
    name: "ESP32-S3 Voice AI Module",
    desc: "Microcontrolador com Whisper Tiny on-device · I²S mic array",
    chip: "ESP32-S3",
    chipType: "MCU + Vector",
    compat: ["ESP32-S3-DevKitC", "Custom"],
    tops: 0.05,
    ram: "8 MB PSRAM",
    models: ["Whisper Tiny INT8", "Wake Word Detection", "Voice Activity"],
    tier: "free",
    color: "linear-gradient(135deg, #e11d48, #f472b6)",
    icon: "🎙️",
    components: 22,
    layers: 4,
    benchmark: "0.4x realtime · Whisper Tiny"
  },
  {
    id: "tpl-rpi-llm",
    name: "RPi 5 + Hailo LLM Hat",
    desc: "Combinação RPi 5 + Hailo-10H para LLMs locais (preview)",
    chip: "Hailo-10H",
    chipType: "Dataflow AI",
    compat: ["Raspberry Pi 5"],
    tops: 40,
    ram: "8 GB",
    models: ["Llama 3 8B INT4", "Qwen 7B", "Whisper Large"],
    tier: "enterprise",
    color: "linear-gradient(135deg, #8b5cf6, #ec4899)",
    icon: "💎",
    components: 48,
    layers: 8,
    benchmark: "25 tok/s · Llama 3 8B"
  },
];

// Seed projects on first run
export function seedProjects(session) {
  const existing = listProjects();
  if (existing.length > 0) return;
  const now = Date.now();
  const seed = [
    {
      id: "prj_neurion_vesper",
      name: "VESPER rev-A · NEURION X1 DevBoard",
      template: "tpl-neurion-x1",
      desc: "Carrier board para o chip NEURION X1 · pronto para fabricação",
      tags: ["flagship", "cim", "novel-chip", "manufacturing-ready"],
      status: "active",
      updatedAt: now - 1000 * 60 * 8,
      createdAt: now - 1000 * 60 * 60 * 24 * 1,
      thumbnail: "⚛️",
      collaborators: [session.name, "Mariana R.", "Pedro L."],
      pages: 6, components: 142,
      flagship: true,
      customPage: "chip-neurion.html"
    },
    {
      id: "prj_" + Math.random().toString(36).slice(2, 10),
      name: "Voice Assistant MVP",
      template: "tpl-rk3588",
      desc: "Assistente de voz com Qwen2.5 1.5B rodando no NPU local",
      tags: ["llm", "voice", "edge"],
      status: "active",
      updatedAt: now - 1000 * 60 * 30,
      createdAt: now - 1000 * 60 * 60 * 24 * 4,
      thumbnail: "🎙️",
      collaborators: [session.name, "Ana M.", "Bruno S."],
      pages: 1, components: 47
    },
    {
      id: "prj_" + Math.random().toString(36).slice(2, 10),
      name: "Vision Quality Control",
      template: "tpl-hailo",
      desc: "Inspeção visual com YOLOv8 em linha de produção",
      tags: ["vision", "manufacturing", "yolo"],
      status: "active",
      updatedAt: now - 1000 * 60 * 60 * 5,
      createdAt: now - 1000 * 60 * 60 * 24 * 12,
      thumbnail: "👁️",
      collaborators: [session.name],
      pages: 2, components: 35
    },
    {
      id: "prj_" + Math.random().toString(36).slice(2, 10),
      name: "Edge Chatbot Prototype",
      template: "tpl-rk3588",
      desc: "POC de chatbot offline-first usando DeepSeek-R1 distill",
      tags: ["llm", "chatbot", "reasoning"],
      status: "draft",
      updatedAt: now - 1000 * 60 * 60 * 24 * 2,
      createdAt: now - 1000 * 60 * 60 * 24 * 7,
      thumbnail: "💬",
      collaborators: [session.name, "Carla R."],
      pages: 1, components: 47
    },
  ];
  localStorage.setItem(PROJECTS_KEY, JSON.stringify(seed));
}

export function listProjects() {
  try { return JSON.parse(localStorage.getItem(PROJECTS_KEY)) || []; }
  catch { return []; }
}

export function getProject(id) {
  return listProjects().find(p => p.id === id);
}

export function createProject(p) {
  const all = listProjects();
  const project = {
    id: "prj_" + Math.random().toString(36).slice(2, 10),
    createdAt: Date.now(),
    updatedAt: Date.now(),
    status: "draft",
    collaborators: [],
    pages: 1,
    ...p,
  };
  all.unshift(project);
  localStorage.setItem(PROJECTS_KEY, JSON.stringify(all));
  return project;
}

export function updateProject(id, patch) {
  const all = listProjects();
  const i = all.findIndex(p => p.id === id);
  if (i < 0) return null;
  all[i] = { ...all[i], ...patch, updatedAt: Date.now() };
  localStorage.setItem(PROJECTS_KEY, JSON.stringify(all));
  return all[i];
}

export function deleteProject(id) {
  const all = listProjects().filter(p => p.id !== id);
  localStorage.setItem(PROJECTS_KEY, JSON.stringify(all));
}

export function formatRelativeTime(ts) {
  const diff = Date.now() - ts;
  const m = Math.floor(diff / 60000);
  const h = Math.floor(m / 60);
  const d = Math.floor(h / 24);
  if (m < 1) return "agora mesmo";
  if (m < 60) return `há ${m} min`;
  if (h < 24) return `há ${h}h`;
  if (d < 7) return `há ${d}d`;
  return new Date(ts).toLocaleDateString("pt-BR");
}

export const ACTIVITY = [
  { type: "edit", who: "Ana M.", what: "editou trilhas em Voice Assistant MVP", when: Date.now() - 1000 * 60 * 18 },
  { type: "comment", who: "Bruno S.", what: "comentou no chip RK3588", when: Date.now() - 1000 * 60 * 45 },
  { type: "deploy", who: "Sistema", what: "deploy do Phi-3 Mini concluído", when: Date.now() - 1000 * 60 * 60 * 2 },
  { type: "invite", who: "Você", what: "convidou Carla R. para o workspace", when: Date.now() - 1000 * 60 * 60 * 6 },
  { type: "billing", who: "Sistema", what: "fatura de Out/2026 emitida", when: Date.now() - 1000 * 60 * 60 * 24 * 2 },
];

export const NOTIFICATIONS = [
  { id: 1, title: "Ana M. mencionou você", desc: "Em Voice Assistant MVP · trilha CLK", icon: "💬", unread: true, when: Date.now() - 1000 * 60 * 12 },
  { id: 2, title: "Deploy concluído", desc: "Phi-3 Mini está rodando no NPU", icon: "🚀", unread: true, when: Date.now() - 1000 * 60 * 45 },
  { id: 3, title: "Nova versão do RKLLM", desc: "RKLLM v1.1.5 disponível", icon: "📦", unread: false, when: Date.now() - 1000 * 60 * 60 * 24 },
];
