// NeuroPCB · Auth helpers (localStorage-based)
// In a real product this would call an API. Stored under "neuropcb_auth" key.

const AUTH_KEY = "neuropcb_auth";
const SESSION_KEY = "neuropcb_session";

export function getSession() {
  try { return JSON.parse(localStorage.getItem(SESSION_KEY)) || null; }
  catch { return null; }
}

export function requireSession(redirectUrl = "login.html") {
  const s = getSession();
  if (!s) {
    const next = encodeURIComponent(location.pathname + location.search + location.hash);
    location.href = `${redirectUrl}?next=${next}`;
    return null;
  }
  return s;
}

export function signIn({ email, name, plan = "free" }) {
  const session = {
    id: "usr_" + Math.random().toString(36).slice(2, 11),
    email,
    name: name || email.split("@")[0],
    plan,
    avatar: avatarFor(name || email),
    signedInAt: new Date().toISOString(),
    workspace: { name: (name || email).split(" ")[0] + "'s Workspace", id: "ws_" + Math.random().toString(36).slice(2, 9) }
  };
  localStorage.setItem(SESSION_KEY, JSON.stringify(session));
  return session;
}

export function signOut() {
  localStorage.removeItem(SESSION_KEY);
  location.href = "index.html";
}

export function avatarFor(seed) {
  const colors = [
    ["#5b8def", "#8b5cf6"],
    ["#34d399", "#2dd4bf"],
    ["#f472b6", "#a855f7"],
    ["#fbbf24", "#f87171"],
    ["#60a5fa", "#34d399"],
  ];
  const idx = (seed?.charCodeAt(0) || 0) % colors.length;
  return colors[idx];
}

export function initials(name) {
  return name.split(/\s+/).slice(0, 2).map(s => s[0]?.toUpperCase()).join("");
}

// Render a user avatar element (returns HTML string)
export function avatarHTML(session, size = 28) {
  const [c1, c2] = session.avatar || avatarFor(session.name);
  return `<div style="width:${size}px;height:${size}px;border-radius:50%;background:linear-gradient(135deg,${c1},${c2});display:inline-flex;align-items:center;justify-content:center;font-size:${size*0.4}px;font-weight:600;color:white;">${initials(session.name)}</div>`;
}

export const PLANS = {
  free: { name: "Free", price: 0, projects: 3, ai: "100 msg/mês", collab: 1, export: ["PNG"] },
  pro: { name: "Pro", price: 29, projects: "Ilimitado", ai: "Ilimitado", collab: 5, export: ["PNG", "PDF", "Gerber", "BOM CSV"] },
  enterprise: { name: "Enterprise", price: null, projects: "Ilimitado", ai: "Ilimitado", collab: "Ilimitado", export: ["Todos + API"] }
};
