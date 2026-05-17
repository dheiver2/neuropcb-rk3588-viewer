# NeuroPCB · EDA AI-native para hardware de IA na borda

> **Software comercial completo** · landing page, autenticação, dashboard, editor, pricing, docs e API.

A primeira plataforma EDA construída para projetar placas com **modelos de IA destilados** rodando na borda. Suporte oficial para Rockchip RK3588, NVIDIA Jetson Orin, Google Coral, Hailo-8L e ESP32-S3.

![Stack](https://img.shields.io/badge/Three.js-0.160-5b8def)
![Stack](https://img.shields.io/badge/RKLLM-1.1.4-fbbf24)
![Plan](https://img.shields.io/badge/Free%20%E2%80%94-Pro%20R%24149-success)
![License](https://img.shields.io/badge/license-MIT-success)

## Páginas do produto

| Arquivo | Rota | Descrição |
|---------|------|-----------|
| `index.html` | `/` | Landing page comercial · hero, features, templates, pricing teaser, testimonials, CTA |
| `login.html` | `/login` | Autenticação · Google/GitHub OAuth (mock) + email/senha · signup com plano selecionado |
| `app.html` | `/app#/...` | Dashboard SPA · 7 rotas (overview, projects, templates, library, team, billing, settings) |
| `editor.html` | `/editor` | Editor de placas · 6 modos de visualização + AI Copilot |
| `pricing.html` | `/pricing` | Pricing comercial · toggle mensal/anual, tabela comparativa, FAQ |
| `docs.html` | `/docs` | Documentação técnica · quickstart, plataformas, deployment, API, CLI |

## Features comerciais

### 🏠 Landing page (`index.html`)
- Hero com produto rodando em iframe embed do editor
- Features grid · 9 cartões
- Templates preview · 6 placas
- Marquee de empresas (Radxa, Orange Pi, Banana Pi, Seeed, Waveshare, PINE64, Armbian)
- Stats numéricos animados
- 3 testimonials com avatar gradient
- Pricing teaser
- Footer completo · 4 colunas

### 🔐 Autenticação (`login.html`)
- Split layout · brand storytelling + form
- OAuth mock (Google + GitHub) com spinner
- Email/senha com toggle signup/login
- Persistence via `localStorage` (`assets/auth.js`)
- Redirect via `?next=` após login
- Plano pré-selecionado via `?plan=pro`

### 📊 Dashboard SPA (`app.html`)
Rotas hash-based:
- **Overview** — Stats (projetos ativos, AI usage, colaboradores, plano), projetos recentes, activity feed do time
- **Projetos** — Grid filtrado com busca em tempo real
- **Templates** — 6 placas reais (RK3588, Jetson Orin, Coral, Hailo, ESP32-S3, Hailo-10H)
- **Biblioteca de componentes** — Tabela com part numbers, fabricante, datasheets
- **Time** — Lista de membros com roles e status online
- **Faturamento** — Plano atual, histórico de faturas, método de pagamento, usage tracking
- **Configurações** — Perfil, API keys, notificações, zona de perigo

Mais: Sidebar com workspace + user menu, modal de criar projeto com seletor de template, Command Palette (`Ctrl+K`), toasts.

### 💳 Pricing (`pricing.html`)
- Toggle Mensal / Anual (−20%)
- 3 cards · Free, Pro destacado (R$149/mês), Enterprise
- Tabela comparativa com 6 seções (Projetos, AI Copilot, Simulação, Templates, Export, Time, Integração, Suporte)
- FAQ com 8 perguntas (cancelamento, Pix, LGPD, JLCPCB, etc)

### 📚 Documentação (`docs.html`)
- Sidebar com 4 seções de navegação (24 links)
- Quickstart de 5 minutos
- Specs detalhadas de cada plataforma
- Comandos copiáveis (RKLLM, Ollama, llama.cpp, MLC, ExecuTorch)
- API REST com endpoints e exemplos curl
- CLI `npcb` documentado

### 🎮 Editor (`editor.html`)
6 modos de visualização (2D/3D/X-Ray/Thermal/Signal/AI Inference) com:
- 47 componentes reais com part numbers
- 8 modelos LLM destilados com benchmarks RKLLM
- 5 projetos de deployment
- AI Copilot · Mini-mapa · Osciloscópio · Command palette

## Estrutura

```
electronic-viewer/
├── index.html         ← landing page comercial
├── login.html         ← autenticação
├── app.html           ← dashboard SPA (auth required)
├── editor.html        ← editor de placas
├── pricing.html       ← preços e planos
├── docs.html          ← documentação
├── assets/
│   ├── styles.css     ← design system compartilhado
│   ├── auth.js        ← session management
│   └── data.js        ← templates, projetos, activity
└── README.md
```

## Como executar

```powershell
# Mais simples
start index.html

# Servidor local (recomendado — auth.js usa ES modules)
npx serve .
# http://localhost:3000

# Ou Python
python -m http.server 8000
```

## Stack

- **HTML/CSS/JS puro** · ES modules · zero bundle
- **Three.js 0.160** via importmap (CDN jsdelivr)
- **Inter + JetBrains Mono** (Google Fonts)
- **WebGL 2.0** com ACES Filmic Tone Mapping
- **localStorage** para persistência (auth + projects)
- **Hash routing** no dashboard SPA

## Modelos de IA suportados

8 modelos destilados com benchmarks reais medidos via [RKLLM v1.1.4](https://github.com/airockchip/rknn-llm):

| Modelo | Decode | Prefill | RAM | Ctx |
|--------|--------|---------|-----|-----|
| TinyLlama 1.1B | 24.7 tok/s | 285 | 0.8 GB | 2K |
| Llama 3.2 1B | 22.3 tok/s | 260 | 0.7 GB | 128K |
| Qwen2.5 1.5B | 16.5 tok/s | 195 | 1.0 GB | 32K |
| DeepSeek-R1-Distill-1.5B | 15.9 tok/s | 180 | 1.0 GB | 32K |
| Phi-3 Mini 4K | 10.6 tok/s | 95 | 2.4 GB | 4K |
| Gemma 2 2B | 14.2 tok/s | 165 | 1.4 GB | 8K |

## Plataformas suportadas

- **Rockchip RK3588** — Radxa Rock 5B, Orange Pi 5+, Banana Pi M7
- **NVIDIA Jetson Orin Nano** — 40 TOPS, 8GB LPDDR5
- **Google Coral Edge TPU** — 4 TOPS INT8 ASIC
- **Hailo-8L** — 13 TOPS · RPi 5 HAT
- **ESP32-S3** — Whisper Tiny on-device
- **Hailo-10H** (preview) — 40 TOPS dataflow

## Roadmap

- [x] Landing page comercial
- [x] Autenticação OAuth + email
- [x] Dashboard SPA com 7 rotas
- [x] Editor de placas com 6 modos
- [x] Pricing comercial
- [x] Documentação técnica
- [ ] Integração Stripe real para billing
- [ ] Backend Node/Postgres para multi-usuário
- [ ] API REST production-ready
- [ ] CLI `npcb` npm package
- [ ] WebSocket para colaboração real-time

## Licença

MIT · © 2026 NeuroPCB Tecnologia LTDA
