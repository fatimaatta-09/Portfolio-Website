import { createFileRoute } from "@tanstack/react-router";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  profile, projects, tools, certs, skillTree,
  dockItems, desktopIcons, defaultPositions, windowTitles, designProjects,
} from "@/lib/portfolio-data";
// contact form posts directly to Web3Forms; no backend client needed
import dragonAsset from "@/assets/kali-dragon.png";
import {
  Brain as IconBrain, Mail as IconMail,
  FileText as IconFile, CheckCircle2, AlertTriangle, RefreshCw, Loader2,
  Github, ExternalLink, Bug, Network, ScanSearch, Radar, Cpu, Code2, Database,
  Globe, Activity, Sparkles, Award, Lock, Eye, Bot, Rocket, GraduationCap,
  Medal, BookOpen, FileBadge, Mail, Linkedin, MapPin, TerminalSquare, Fingerprint,
  type LucideIcon,
} from "lucide-react";


/* Unified icon sizing — applied across Skills, Projects, and Certs */
const TAB_ICON_SIZE = 16;
const TAB_ICON_STROKE = 1.75;
const INLINE_ICON_SIZE = 14;

const SKILL_ICONS: Record<string, LucideIcon> = {
  burp: Bug, wshark: Network, zap: ScanSearch, nmap: Radar,
  eeg: Activity, svm: Sparkles, "py-ai": IconBrain,
  py: Code2, cpp: Cpu, sql: Database, web: Globe,
};

const PROJECT_ICONS: LucideIcon[] = [Lock, Eye, Globe, Bot, Rocket, Cpu];

const CERT_ICONS: Record<string, LucideIcon> = {
  AWARDS: Medal,
  RESEARCH: IconBrain,
  EDUCATION: GraduationCap,
  CERTIFICATION: Award,
  PLANNED: FileBadge,
  DEFAULT: BookOpen,
};

// Web3Forms public access key — safe to ship in client code.
// Get yours free at https://web3forms.com (enter your email, they send the key).
const WEB3FORMS_ACCESS_KEY = "b5e09d6c-d151-460d-b38f-0007a4872635";

const ICONS: Record<string, LucideIcon> = {
  terminal: TerminalSquare, about: Fingerprint, skills: Cpu, projects: Network,
  design: Sparkles, tools: ScanSearch, research: IconBrain, certs: Award,
  contact: IconMail, resume: IconFile,
};

// MD Accent palette — built for dark backgrounds, high contrast, matte
const ICON_COLORS: Record<string, string> = {
  terminal: "#00E5FF",
  about:    "#69F0AE",
  skills:   "#FFAB40",
  projects: "#448AFF",
  design:   "#FF4081",
  tools:    "#FF5252",
  research: "#E040FB",
  certs:    "#FFD740",
  contact:  "#1DE9B6",
  resume:   "#FF6D00",
};

type ResumeState = "checking" | "ok" | "fail";
function useResumeStatus(url: string) {
  const [status, setStatus] = useState<ResumeState>("checking");
  const [nonce, setNonce] = useState(0);
  useEffect(() => {
    let alive = true;
    setStatus("checking");
    fetch(url, { method: "HEAD", cache: "no-store" })
      .then(r => { if (alive) setStatus(r.ok ? "ok" : "fail"); })
      .catch(() => { if (alive) setStatus("fail"); });
    return () => { alive = false; };
  }, [url, nonce]);
  return { status, retry: () => setNonce(n => n + 1) };
}

function ResumeStatus({ url, compact = false }: { url: string; compact?: boolean }) {
  const { status, retry } = useResumeStatus(url);
  if (status === "checking") {
    return (
      <div className={"resume-chip checking" + (compact ? " compact" : "")} title="Verifying resume…">
        <Loader2 size={12} className="spin" />
        {!compact && <span>Verifying resume…</span>}
      </div>
    );
  }
  if (status === "ok") {
    return (
      <a className={"resume-chip ok" + (compact ? " compact" : "")} href={url} target="_blank" rel="noopener noreferrer" title="Resume available — click to open">
        <CheckCircle2 size={12} />
        {!compact && <span>resume.pdf · ready</span>}
      </a>
    );
  }
  return (
    <div className={"resume-chip fail" + (compact ? " compact" : "")} role="alert">
      <AlertTriangle size={12} />
      <span>{compact ? "resume failed" : "resume.pdf failed to load"}</span>
      <button type="button" className="resume-retry" onClick={retry} aria-label="retry">
        <RefreshCw size={11} /> retry
      </button>
    </div>
  );
}

const AppIcon = ({ id, size = 22, color }: { id: string; size?: number; color?: string }) => {
  const I = ICONS[id];
  const c = color ?? ICON_COLORS[id];
  return I ? <I size={size} strokeWidth={3} color={c} /> : null;
};



const SCRAMBLE_CHARS = "$&%#@!*?<>[]{}+=/\\01";

function DecryptText({ text }: { text: string }) {
  const [display, setDisplay] = useState(text);
  const [scrambling, setScrambling] = useState(false);
  const rafRef = useRef<number | null>(null);
  useEffect(() => setDisplay(text), [text]);

  const start = () => {
    setScrambling(true);
    const start = performance.now();
    const duration = 300;
    const tick = (now: number) => {
      const p = Math.min(1, (now - start) / duration);
      const revealed = Math.floor(text.length * p);
      const out = text.split("").map((ch, i) => {
        if (i < revealed || ch === " ") return ch;
        return SCRAMBLE_CHARS[Math.floor(Math.random() * SCRAMBLE_CHARS.length)];
      }).join("");
      setDisplay(out);
      if (p < 1) rafRef.current = requestAnimationFrame(tick);
      else { setDisplay(text); setScrambling(false); }
    };
    rafRef.current = requestAnimationFrame(tick);
  };
  const stop = () => {
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    setDisplay(text); setScrambling(false);
  };
  useEffect(() => () => { if (rafRef.current) cancelAnimationFrame(rafRef.current); }, []);
  return <span className={"decrypt" + (scrambling ? " scrambling" : "")} onMouseEnter={start} onMouseLeave={stop}>{display}</span>;
}

function CursorTrail() {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const dpr = window.devicePixelRatio || 1;
    const resize = () => {
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      ctx.scale(dpr, dpr);
    };
    resize();
    window.addEventListener("resize", resize);
    const chars = "01アイウエオ$#@<>/";
    type P = { x: number; y: number; c: string; life: number };
    let particles: P[] = [];
    const onMove = (e: MouseEvent) => {
      if (Math.random() < 0.55) {
        particles.push({
          x: e.clientX + (Math.random() - 0.5) * 8,
          y: e.clientY + (Math.random() - 0.5) * 8,
          c: chars[Math.floor(Math.random() * chars.length)],
          life: 1,
        });
      }
      if (particles.length > 80) particles = particles.slice(-80);
    };
    window.addEventListener("mousemove", onMove);
    let raf = 0;
    const loop = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.font = "11px 'JetBrains Mono', monospace";
      particles.forEach(p => {
        p.life -= 0.025;
        const accent = getComputedStyle(document.body).getPropertyValue("--accent").trim() || "#00C8FF";
        ctx.fillStyle = accent;
        ctx.globalAlpha = Math.max(0, p.life);
        ctx.shadowColor = accent;
        ctx.shadowBlur = 8;
        ctx.fillText(p.c, p.x, p.y);
      });
      ctx.globalAlpha = 1;
      ctx.shadowBlur = 0;
      particles = particles.filter(p => p.life > 0);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMove);
    };
  }, []);
  return <canvas ref={ref} className="cursor-trail" />;
}


export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "FR-OS — Fatima Rehman | Graphic Designer & Cybersecurity Portfolio" },
      { name: "description", content: "Interactive OS portfolio of Fatima Rehman: graphic design, brand identity, UI/UX, cybersecurity, AI/ML research, and robotics." },
      { property: "og:title", content: "FR-OS — Fatima Rehman" },
      { property: "og:description", content: "Interactive desktop portfolio: graphic design, cybersecurity, AI research, and robotics." },
    ],
  }),
  component: FROS,
});

type WinName = keyof typeof windowTitles;

interface WinState {
  open: boolean;
  max: boolean;
  x: number; y: number; w: number; h: number;
  z: number;
}

const ALL_WINS: WinName[] = Object.keys(windowTitles) as WinName[];

function useClock() {
  const [t, setT] = useState("");
  useEffect(() => {
    const tick = () => {
      const d = new Date();
      setT([d.getHours(), d.getMinutes(), d.getSeconds()].map(n => String(n).padStart(2, "0")).join(":"));
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);
  return t;
}

function FROS() {
  const clock = useClock();
  const [boot, setBoot] = useState(true);
  useEffect(() => { const id = setTimeout(() => setBoot(false), 3500); return () => clearTimeout(id); }, []);

  const [zTop, setZTop] = useState(30);
  const [wins, setWins] = useState<Record<string, WinState>>(() => {
    const o: Record<string, WinState> = {};
    for (const n of ALL_WINS) {
      const p = defaultPositions[n];
      o[n] = { open: false, max: false, x: p.x, y: p.y, w: p.w, h: p.h, z: 20 };
    }
    return o;
  });
  const [matrix, setMatrix] = useState<{
    id: number;
    origin?: { x: number; y: number };
    color?: string;
    chars: { x: number; y: number; c: string; d: number; dl: number; dx: number; dy: number; rot: number; size: number }[];
  } | null>(null);
  const matrixIdRef = useRef(0);
  const isMobile = useIsMobile();

  const triggerMatrix = useCallback((origin?: { x: number; y: number }, color?: string) => {
    const chars = "アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモ★✦✧◆◇01";
    const count = origin ? 36 : 25;
    const arr = Array.from({ length: count }, () => {
      const angle = Math.random() * Math.PI * 2;
      const dist = 80 + Math.random() * 180;
      return {
        x: origin ? 0 : Math.random() * 100,
        y: origin ? 0 : Math.random() * 100,
        c: chars[Math.floor(Math.random() * chars.length)],
        d: Math.random() * 0.4 + 0.7,
        dl: Math.random() * 0.08,
        dx: Math.cos(angle) * dist,
        dy: Math.sin(angle) * dist + (origin ? 120 : 0),
        rot: (Math.random() - 0.5) * 540,
        size: 12 + Math.random() * 10,
      };
    });
    matrixIdRef.current += 1;
    setMatrix({ id: matrixIdRef.current, origin, color, chars: arr });
    setTimeout(() => setMatrix(m => (m && m.id === matrixIdRef.current ? null : m)), 1100);
  }, []);

  const [popping, setPopping] = useState<string | null>(null);

  const openWin = useCallback((name: string, ev?: React.MouseEvent) => {
    let origin: { x: number; y: number } | undefined;
    if (ev && deskRef.current) {
      const r = deskRef.current.getBoundingClientRect();
      origin = { x: ev.clientX - r.left, y: ev.clientY - r.top };
    }
    const color = ICON_COLORS[name];
    if (name === "resume") {
      // open inline viewer window instead of new tab
      triggerMatrix(origin, color);
      setPopping("resume");
      setTimeout(() => setPopping(p => (p === "resume" ? null : p)), 320);
      setZTop(z => {
        const nz = z + 1;
        setWins(w => w[name] ? { ...w, [name]: { ...w[name], open: true, z: nz } } : w);
        return nz;
      });
      return;
    }
    triggerMatrix(origin, color);
    setPopping(name);
    setTimeout(() => setPopping(p => (p === name ? null : p)), 320);
    setZTop(z => {
      const nz = z + 1;
      setWins(w => w[name] ? { ...w, [name]: { ...w[name], open: true, z: nz } } : w);
      return nz;
    });
  }, [triggerMatrix]);

  const closeWin = useCallback((name: string) => {
    setWins(w => ({ ...w, [name]: { ...w[name], open: false, max: false } }));
  }, []);

  const focusWin = useCallback((name: string) => {
    setZTop(z => {
      const nz = z + 1;
      setWins(w => ({ ...w, [name]: { ...w[name], z: nz } }));
      return nz;
    });
  }, []);

  const toggleMax = useCallback((name: string) => {
    setWins(w => ({ ...w, [name]: { ...w[name], max: !w[name].max } }));
  }, []);

  // Command palette (Ctrl+K / Cmd+K)
  const [paletteOpen, setPaletteOpen] = useState(false);

  // Keyboard shortcuts
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && (e.key === "k" || e.key === "K")) {
        e.preventDefault(); setPaletteOpen(p => !p); return;
      }
      const t = e.target as HTMLElement;
      if (t && (t.tagName === "INPUT" || t.tagName === "TEXTAREA")) return;
      if (e.key === "t" || e.key === "T") openWin("terminal");
      else if (e.key === "a" || e.key === "A") openWin("about");
      else if (e.key === "s" || e.key === "S") openWin("skills");
      else if (e.key === "Escape") {
        setPaletteOpen(false);
        setWins(w => {
          const n = { ...w };
          for (const k of ALL_WINS) if (n[k].max) n[k] = { ...n[k], max: false };
          return n;
        });
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [openWin]);

  // Drag
  const deskRef = useRef<HTMLDivElement>(null);
  const dragRef = useRef<{ name: string; ox: number; oy: number } | null>(null);
  const [draggingName, setDraggingName] = useState<string | null>(null);
  const onHeaderMouseDown = (name: string) => (e: React.MouseEvent) => {
    if (isMobile || wins[name].max) return;
    focusWin(name);
    dragRef.current = { name, ox: e.clientX - wins[name].x, oy: e.clientY - wins[name].y };
    setDraggingName(name);
    e.preventDefault();
  };
  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      if (!dragRef.current || !deskRef.current) return;
      const d = dragRef.current;
      const r = deskRef.current.getBoundingClientRect();
      const w = wins[d.name];
      let nx = e.clientX - d.ox;
      let ny = e.clientY - d.oy;
      nx = Math.max(0, Math.min(nx, r.width - w.w));
      ny = Math.max(0, Math.min(ny, r.height - w.h));
      setWins(s => ({ ...s, [d.name]: { ...s[d.name], x: nx, y: ny } }));
    };
    const onUp = () => { dragRef.current = null; setDraggingName(null); };
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup", onUp);
    return () => { window.removeEventListener("mousemove", onMove); window.removeEventListener("mouseup", onUp); };
  }, [wins]);

  // Contact prefill (terminal easter egg)
  const [contactPrefill, setContactPrefill] = useState<string>("");
  const actions = useMemo(() => ({
    openWin,
    prefillContact: (msg: string) => setContactPrefill(msg),
    clearContactPrefill: () => setContactPrefill(""),
    contactPrefill,
  }), [openWin, contactPrefill]);

  return (
    <>
      <div className="bg-grid" />
      <div className="bg-glow1" />
      <div className="bg-glow2" />
      <div className="dragon-bg"><img src={dragonAsset} alt="" loading="lazy" /></div>
      <div className="scanlines" />
      {!isMobile && <CursorTrail />}


      {boot && (
        <div className="welcome-screen">
          <div className="welcome-logo">FR-OS</div>
          <div className="welcome-sub">CYBERSECURITY PORTFOLIO v2.0</div>
          <div className="boot-lines">
            <div className="boot-line">[ OK ] Loading kernel modules...</div>
            <div className="boot-line">[ OK ] Mounting filesystem...</div>
            <div className="boot-line">[ OK ] Starting network services...</div>
            <div className="boot-line">[ OK ] Initializing security tools...</div>
            <div className="boot-line">[ OK ] Loading AI research modules...</div>
            <div className="boot-line">[ OK ] Starting desktop environment...</div>
            <div className="boot-line" style={{ color: "var(--cyan)" }}>[ OK ] Welcome, Fatima Rehman ✓</div>
          </div>
        </div>
      )}

      <div className="topbar">
        <div className="topbar-left">
          <div className="kali-logo">FR-OS</div>
          <div className="topbar-apps">
            <div className="topbar-app" onClick={() => openWin("terminal")}><DecryptText text="Terminal" /></div>
            <div className="topbar-app" onClick={() => openWin("tools")}><DecryptText text="Tools" /></div>
            <div className="topbar-app" onClick={() => openWin("research")}><DecryptText text="Research" /></div>
            <a className="topbar-app topbar-cta" href={RESUME_URL} target="_blank" rel="noopener noreferrer">
              <IconFile size={12} strokeWidth={2} /> <span>Resume</span>
            </a>
            <div className="topbar-app topbar-cta-hire" onClick={() => openWin("contact")}>
              <IconMail size={12} strokeWidth={2} /> <span>Hire me</span>
            </div>
          </div>
        </div>
        <div className="topbar-right">
          <ResumeStatus url={RESUME_URL} compact />
          <div className="topbar-indicator"><div className="status-dot dot-green pulse" /><span style={{ fontSize: 9 }}>Available</span></div>
          <div className="topbar-indicator"><div className="status-dot dot-cyan" /><span style={{ fontSize: 9 }}>ONLINE</span></div>
          <div id="clock">{clock}</div>
        </div>
      </div>

      <div className="desktop" ref={deskRef}>
        <div className="icon-grid">
          {desktopIcons.map(d => (
            <div key={d.id} className={"desk-icon" + (popping === d.id ? " icon-pop" : "")} style={{ ["--icon-color" as never]: ICON_COLORS[d.id] }} onClick={(e) => openWin(d.id, e)}>
              <div className="desk-icon-img" style={{ background: d.bg }}>
                {ICONS[d.id] ? <AppIcon id={d.id} size={26} /> : d.icon}
              </div>
              <div className="desk-icon-label">{d.label}</div>
            </div>

          ))}
        </div>


        {(() => {
          const topZ = Math.max(0, ...ALL_WINS.filter(n => wins[n].open).map(n => wins[n].z));
          return ALL_WINS.map(name => (
            <Window
              key={name}
              name={name}
              state={wins[name]}
              isMobile={isMobile}
              dragging={draggingName === name}
              focused={wins[name].open && wins[name].z === topZ}
              actions={actions}
              onHeaderMouseDown={onHeaderMouseDown(name)}
              onClose={() => closeWin(name)}
              onMin={() => closeWin(name)}
              onMax={() => toggleMax(name)}
              onFocus={() => focusWin(name)}
            />
          ));
        })()}

        {matrix && (
          <div className={"page-transition" + (matrix.origin ? " burst" : "")} key={matrix.id}>
            {matrix.chars.map((c, i) => {
              const palette = ["#22d3ee", "#a855f7", "#34d399", "#fbbf24", "#f472b6", "#38bdf8"];
              const col = matrix.color ?? palette[i % palette.length];
              if (matrix.origin) {
                return (
                  <div
                    key={i}
                    className="burst-char"
                    style={{
                      left: matrix.origin.x + "px",
                      top: matrix.origin.y + "px",
                      animationDuration: c.d + "s",
                      animationDelay: c.dl + "s",
                      color: col,
                      fontSize: c.size + "px",
                      ["--dx" as never]: c.dx + "px",
                      ["--dy" as never]: c.dy + "px",
                      ["--rot" as never]: c.rot + "deg",
                      textShadow: `0 0 8px ${col}, 0 0 16px ${col}66`,
                    }}
                  >{c.c}</div>
                );
              }
              return (
                <div
                  key={i}
                  className="hacker-char"
                  style={{
                    left: c.x + "%", top: c.y + "%",
                    animationDuration: c.d + "s",
                    animationDelay: c.dl + "s",
                    color: col,
                  }}
                >{c.c}</div>
              );
            })}
          </div>
        )}
      </div>

      <div className="dock">
        {dockItems.map((d, i) => {
          if ((d as { sep?: boolean }).sep) return <div key={"sep" + i} className="dock-sep" />;
          const item = d as { id: string; icon: string; label: string; bg: string };
          const isWin = !!wins[item.id];
          const isOpen = isWin && wins[item.id].open;
          return (
            <div key={item.id} className={"dock-item" + (popping === item.id ? " icon-pop" : "")} style={{ ["--icon-color" as never]: ICON_COLORS[item.id] }} title={item.label} onClick={(e) => (isOpen ? closeWin(item.id) : openWin(item.id, e))}>
              <div className="dock-icon" style={{ background: item.bg }}>
                {ICONS[item.id] ? <AppIcon id={item.id} size={20} /> : item.icon}
              </div>
              <div className="dock-label"><DecryptText text={item.label} /></div>
              {isOpen && <div className="dock-dot" />}
            </div>


          );
        })}
      </div>

      {paletteOpen && (
        <CommandPalette
          onClose={() => setPaletteOpen(false)}
          onPick={(id) => { setPaletteOpen(false); openWin(id); }}
        />
      )}
    </>

  );
}

function useIsMobile() {
  const [m, setM] = useState(false);
  useEffect(() => {
    const check = () => setM(window.innerWidth < 600);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);
  return m;
}

type WinActions = {
  openWin: (name: string) => void;
  prefillContact: (msg: string) => void;
  clearContactPrefill: () => void;
  contactPrefill: string;
};

function Window({ name, state, isMobile, dragging, focused, actions, onHeaderMouseDown, onClose, onMin, onMax, onFocus }: {
  name: string; state: WinState; isMobile: boolean; dragging: boolean; focused: boolean; actions: WinActions;
  onHeaderMouseDown: (e: React.MouseEvent) => void;
  onClose: () => void; onMin: () => void; onMax: () => void; onFocus: () => void;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const wasOpen = useRef(state.open);
  useEffect(() => {
    if (state.open && !wasOpen.current) {
      // animate in: trigger reflow-based class swap
      const el = ref.current;
      if (el) { el.classList.remove("win-enter"); void el.offsetWidth; el.classList.add("win-enter"); }
    }
    wasOpen.current = state.open;
  }, [state.open]);
  if (!state.open) return null;
  const fullscreen = isMobile || state.max;
  const baseStyle: React.CSSProperties = fullscreen
    ? { left: 0, top: 0, width: "100%", height: "100%", zIndex: state.z, borderRadius: 0 }
    : { left: state.x, top: state.y, width: state.w, height: state.h, zIndex: state.z };
  if (dragging && !fullscreen) {
    baseStyle.transform = "rotate(1deg) scale(1.01)";
  }

  return (
    <div
      ref={ref}
      className={"win win-enter" + (focused ? " focused" : " unfocused") + (dragging ? " dragging" : "")}
      style={baseStyle}
      onMouseDown={onFocus}
    >
      <div className="win-bar" onMouseDown={onHeaderMouseDown} style={{ cursor: fullscreen ? "default" : "move" }}>
        <div className="win-btns">
          <button type="button" aria-label="close window" className="win-btn close" onClick={(e) => { e.stopPropagation(); onClose(); }} />
          <button type="button" aria-label="minimize window" className="win-btn min" onClick={(e) => { e.stopPropagation(); onMin(); }} />
          <button type="button" aria-label="maximize window" className="win-btn max" onClick={(e) => { e.stopPropagation(); onMax(); }} />
        </div>
        <div className="win-title">{windowTitles[name]}</div>
        {focused && <div className="win-focus-indicator" aria-hidden="true" />}
      </div>
      <div className="win-body">
        <WindowBody name={name} actions={actions} />
      </div>
    </div>
  );
}


function WindowBody({ name, actions }: { name: string; actions: WinActions }) {
  switch (name) {
    case "terminal": return <Terminal actions={actions} />;
    case "about": return <About />;
    case "skills": return <Skills />;
    case "projects": return <Projects />;
    case "design": return <DesignPortfolio />;
    case "tools": return <Tools />;
    case "certs": return <Certs />;
    case "research": return <Research />;
    case "contact": return <Contact actions={actions} />;
    case "resume": return <ResumeViewer />;
  }
  return null;
}

/* ============ TERMINAL ============ */
const TERM_COMMANDS = [
  "help","whoami","about","skills","projects","certs","tools","contact",
  "github","linkedin","email","resume","open","ls","pwd","cd","tree","find",
  "date","neofetch","cat","echo","vibe","sudo","exit","clear","hire","research",
  "history","banner","inbox","design","canva","figma",
] as const;

const RESUME_URL = "/resume.pdf";

/* ── Virtual Filesystem ───────────────────────────────────────────── */
type VFile = { type: "file"; content: string | (() => string) };
type VDir = { type: "dir"; children: Record<string, VFile | VDir> };

const VFS: VDir = {
  type: "dir",
  children: {
    "about.md": { type: "file", content: () => "# Fatima Rehman\n" + profile.bio },
    "skills.json": { type: "file", content:
      '{\n  "security": ["Burp Suite","Wireshark","OWASP ZAP","Nmap"],\n' +
      '  "code":     ["Python","C++","SQL","React"],\n' +
      '  "ai_ml":    ["EEG Processing","SVM/RF","scikit-learn"]\n}' },
    "resume.pdf": { type: "file", content: "[binary] use `resume` command to download" },
    "contact.sh": { type: "file", content: "#!/bin/bash\n# Run `contact` or `hire` to reach me." },
    "projects": { type: "dir", children: Object.fromEntries(
      projects.map(p => [p.title.replace(/[^a-z0-9]+/gi,"_").toLowerCase().replace(/^_|_$/g,"") + ".md",
        { type: "file" as const, content: "# " + p.title + "\n\n" + p.desc + "\n\nPipeline: " + (p.blueprint||[]).join(" → ") }]) ) },
    "certs": { type: "dir", children: Object.fromEntries(
      certs.map(c => [c.name.replace(/[^a-z0-9]+/gi,"_").toLowerCase().replace(/^_|_$/g,"") + ".txt",
        { type: "file" as const, content: c.name + " — " + c.org + " [" + c.status + "]" }]) ) },
    "tools": { type: "dir", children: Object.fromEntries(
      tools.map(t => [t[1].replace(/[^a-z0-9]+/gi,"_").toLowerCase() + ".bin",
        { type: "file" as const, content: t[0] + " " + t[1] + " — security tool" }]) ) },
  },
};

function resolvePath(cwd: string, p: string): string {
  if (!p) return cwd;
  const segs = (p.startsWith("/") ? p : cwd + "/" + p).split("/").filter(Boolean);
  const out: string[] = [];
  for (const s of segs) {
    if (s === ".") continue;
    if (s === "..") out.pop();
    else out.push(s);
  }
  return "/" + out.join("/");
}
function getNode(path: string): VFile | VDir | null {
  const segs = path.split("/").filter(Boolean);
  let cur: VFile | VDir = VFS;
  for (const s of segs) {
    if (cur.type !== "dir") return null;
    const next: VFile | VDir | undefined = cur.children[s];
    if (!next) return null;
    cur = next;
  }
  return cur;
}
function listDir(path: string): string[] {
  const n = getNode(path);
  if (!n || n.type !== "dir") return [];
  return Object.entries(n.children).map(([name, v]) => v.type === "dir" ? name + "/" : name);
}
function findInVfs(root: string, name: string): string[] {
  const hits: string[] = [];
  const walk = (p: string, node: VFile | VDir) => {
    if (node.type === "dir") {
      for (const [k, v] of Object.entries(node.children)) {
        const full = (p === "/" ? "" : p) + "/" + k;
        if (k.toLowerCase().includes(name.toLowerCase())) hits.push(full);
        walk(full, v);
      }
    }
  };
  const start = getNode(root);
  if (start) walk(root, start);
  return hits;
}
function treeOf(path: string, depth = 0, max = 3): string[] {
  const n = getNode(path);
  if (!n) return [];
  const out: string[] = [];
  if (n.type !== "dir") return [path];
  for (const [k, v] of Object.entries(n.children)) {
    out.push("│ ".repeat(depth) + "├─ " + (v.type === "dir" ? k + "/" : k));
    if (v.type === "dir" && depth < max) out.push(...treeOf(path === "/" ? "/" + k : path + "/" + k, depth + 1, max));
  }
  return out;
}

function normalizeUrl(raw: string) {
  const u = raw.trim();
  if (!u) return "";
  if (/^(https?:|mailto:|tel:)/i.test(u)) return u;
  if (u.startsWith("//")) return "https:" + u;
  if (u.startsWith("/")) return u;
  return "https://" + u.replace(/^\/+/, "");
}

const GITHUB_URL = normalizeUrl(profile.contact.github);
const LINKEDIN_URL = normalizeUrl(profile.contact.linkedin);
const EMAIL_URL = "mailto:" + profile.contact.email;

function openExternal(url: string): boolean {
  const target = normalizeUrl(url);
  if (!target) return false;
  try {
    const a = document.createElement("a");
    a.href = target; a.target = "_blank"; a.rel = "noopener noreferrer";
    document.body.appendChild(a); a.click(); a.remove();
    return true;
  } catch {
    try { const w = window.open(target, "_blank", "noopener,noreferrer"); return !!w; } catch { return false; }
  }
}

/* ── Hoverable link preview card ──────────────────────────────────── */
function LinkPreview({ href, label }: { href: string; label: string }) {
  const [hover, setHover] = useState(false);
  let host = href;
  try { host = new URL(href).hostname.replace(/^www\./, ""); } catch { /* mailto, tel, relative */ }
  const isMail = href.startsWith("mailto:");
  const isPdf = href.endsWith(".pdf");
  const favicon = !isMail && /^https?:/.test(href) ? `https://www.google.com/s2/favicons?domain=${host}&sz=64` : null;
  return (
    <span className="link-wrap" onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}>
      <a href={href} target="_blank" rel="noopener noreferrer" className="term-anchor">{label}</a>
      {hover && (
        <span className="link-preview" role="tooltip">
          <span className="link-preview-head">
            {favicon ? <img src={favicon} alt="" className="link-fav" /> : <span className="link-fav-dot">{isMail ? "✉" : isPdf ? "📄" : "🔗"}</span>}
            <span className="link-host">{isMail ? "email" : isPdf ? "document" : host}</span>
            <span className="link-secure">{href.startsWith("https") ? "🔒 SECURE" : isMail ? "MAIL" : "LOCAL"}</span>
          </span>
          <span className="link-url">{href}</span>
          <span className="link-cta">↗ open in new tab</span>
        </span>
      )}
    </span>
  );
}

function Terminal({ actions }: { actions: WinActions }) {
  const [lines, setLines] = useState<{ kind: string; text?: string; cls?: string; items?: string[] }[]>(() => [
    { kind: "out", text: "FR-OS Terminal v3.2  (kali-rolling 2026.1)", cls: "term-highlight" },
    { kind: "out", text: "Last login: " + new Date().toUTCString() + " on tty1" },
    { kind: "br" },
    { kind: "out", text: "fatima_rehman — cybersecurity sophomore · ai researcher @ giki" },
    { kind: "out", text: "Type 'help' · explore filesystem with `ls`, `cd projects`, `tree`", cls: "term-highlight" },
  ]);
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<string[]>([]);
  const [histIdx, setHistIdx] = useState<number>(-1);
  const [cwd, setCwd] = useState<string>("/");
  const [tabCycle, setTabCycle] = useState<{ matches: string[]; idx: number } | null>(null);
  const bodyRef = useRef<HTMLDivElement>(null);
  useEffect(() => { if (bodyRef.current) bodyRef.current.scrollTop = bodyRef.current.scrollHeight; }, [lines]);

  const push = (more: any[]) => setLines(prev => [...prev, ...more]);

  // ghost-text autocomplete (first matching command)
  const ghost = useMemo(() => {
    const t = input.toLowerCase();
    if (!t || t.includes(" ")) return "";
    const m = TERM_COMMANDS.find(c => c.startsWith(t) && c !== t);
    return m ? m.slice(t.length) : "";
  }, [input]);

  const promptStr = "fr@kali:" + (cwd === "/" ? "~" : "~" + cwd) + "$";

  const run = (raw: string) => {
    const trimmed = raw.trim();
    const [cmd, ...args] = trimmed.split(/\s+/);
    const c = (cmd || "").toLowerCase();
    if (trimmed) setHistory(h => [...h, trimmed]);
    setHistIdx(-1);
    setTabCycle(null);
    const out: any[] = [{ kind: "cmd", text: raw, prompt: promptStr }];

    if (c === "clear") { setLines([]); return; }

    switch (c) {
      case "": break;
      case "help":
        out.push({ kind: "out", text: "Commands:", cls: "term-highlight" });
        out.push({ kind: "grid", items: [
          "whoami","skills","projects","certs",
          "research","contact","github","linkedin",
          "email","resume","tools","neofetch",
          "ls","cd","tree","find","cat","pwd",
          "history","banner","hire","clear",
        ]});
        out.push({ kind: "br" });
        out.push({ kind: "out", text: "Tip: ↑/↓ history · Tab autocomplete · → accept ghost · Ctrl+K palette", cls: "term-muted" });
        break;
      case "whoami": out.push({ kind: "out", text: "fatima_rehman" }); break;
      case "history":
        history.forEach((h, i) => out.push({ kind: "out", text: " " + String(i+1).padStart(3) + "  " + h }));
        break;
      case "banner":
        out.push({ kind: "out", text: "  ███████╗██████╗       ██████╗ ███████╗", cls: "term-highlight" });
        out.push({ kind: "out", text: "  ██╔════╝██╔══██╗     ██╔═══██╗██╔════╝", cls: "term-highlight" });
        out.push({ kind: "out", text: "  █████╗  ██████╔╝     ██║   ██║███████╗", cls: "term-highlight" });
        out.push({ kind: "out", text: "  ██╔══╝  ██╔══██╗     ██║   ██║╚════██║", cls: "term-highlight" });
        out.push({ kind: "out", text: "  ██║     ██║  ██║     ╚██████╔╝███████║", cls: "term-highlight" });
        out.push({ kind: "out", text: "  ╚═╝     ╚═╝  ╚═╝      ╚═════╝ ╚══════╝", cls: "term-highlight" });
        break;
      case "about":
      case "research":
      case "contact":
      case "inbox":
        out.push({ kind: "out", text: "→ opening " + c + " window…", cls: "term-success" });
        setTimeout(() => actions.openWin(c === "inbox" ? "contact" : c), 250);
        break;
      case "pwd": out.push({ kind: "out", text: cwd }); break;
      case "date": out.push({ kind: "out", text: new Date().toString() }); break;
      case "ls": {
        const target = args[0] ? resolvePath(cwd, args[0]) : cwd;
        const items = listDir(target);
        if (!items.length) { out.push({ kind: "out", text: "ls: cannot access '" + (args[0]||cwd) + "': No such directory", cls: "term-warn" }); break; }
        out.push({ kind: "grid", items });
        break;
      }
      case "cd": {
        if (!args[0] || args[0] === "~" || args[0] === "/") { setCwd("/"); break; }
        const np = resolvePath(cwd, args[0]);
        const n = getNode(np);
        if (!n) out.push({ kind: "out", text: "cd: " + args[0] + ": No such directory", cls: "term-warn" });
        else if (n.type !== "dir") out.push({ kind: "out", text: "cd: " + args[0] + ": Not a directory", cls: "term-warn" });
        else setCwd(np);
        break;
      }
      case "tree": {
        const target = args[0] ? resolvePath(cwd, args[0]) : cwd;
        const lines = treeOf(target);
        if (!lines.length) { out.push({ kind: "out", text: "tree: " + target + ": not found", cls: "term-warn" }); break; }
        out.push({ kind: "out", text: target, cls: "term-highlight" });
        lines.forEach(l => out.push({ kind: "out", text: l }));
        break;
      }
      case "find": {
        const q = args[0];
        if (!q) { out.push({ kind: "out", text: "usage: find <name>", cls: "term-warn" }); break; }
        const hits = findInVfs("/", q);
        if (!hits.length) out.push({ kind: "out", text: "find: no matches for '" + q + "'", cls: "term-warn" });
        else hits.forEach(h => out.push({ kind: "out", text: h, cls: "term-success" }));
        break;
      }
      case "echo": out.push({ kind: "out", text: args.join(" ") }); break;
      case "cat": {
        const f = args[0];
        if (!f) { out.push({ kind: "out", text: "cat: missing operand", cls: "term-warn" }); break; }
        const np = resolvePath(cwd, f);
        const n = getNode(np);
        if (!n) { out.push({ kind: "out", text: "cat: " + f + ": No such file", cls: "term-warn" }); break; }
        if (n.type !== "file") { out.push({ kind: "out", text: "cat: " + f + ": Is a directory", cls: "term-warn" }); break; }
        const body = typeof n.content === "function" ? n.content() : n.content;
        body.split("\n").forEach(line => out.push({ kind: "out", text: line }));
        break;
      }
      case "neofetch":
        out.push({ kind: "out", text: "        ┌─────┐    fatima@kali", cls: "term-success" });
        out.push({ kind: "out", text: "       /│ FR  │\\   ─────────────" });
        out.push({ kind: "out", text: "      ╱ │-OS  │ ╲  OS:       Kali Linux Rolling x86_64" });
        out.push({ kind: "out", text: "     ╱  └─────┘  ╲ Host:      FR-OS Portfolio v3.2" });
        out.push({ kind: "out", text: "    ╱   dragon    ╲Kernel:    6.6.0-fr-amd64" });
        out.push({ kind: "out", text: "                    Shell:     fr-shell 5.2" });
        out.push({ kind: "out", text: "                    Uptime:    " + Math.floor(performance.now()/1000) + "s" });
        out.push({ kind: "out", text: "                    Focus:     Cybersecurity · AI/ML" });
        break;
      case "skills":
        out.push({ kind: "out", text: "[security] burp · wireshark · owasp-zap · gophish · nmap" });
        out.push({ kind: "out", text: "[code]     python · c++ · sql · html/css · react" });
        out.push({ kind: "out", text: "[ai/ml]    eeg processing · svm/rf · scikit-learn" });
        break;
      case "projects":
        out.push({ kind: "out", text: "total " + projects.length, cls: "term-highlight" });
        projects.forEach((p, i) => out.push({ kind: "out", text: " " + String(i+1).padStart(2,"0") + "  " + p.title }));
        break;
      case "certs": certs.forEach(ct => out.push({ kind: "out", text: " ✓ " + ct.name + "  — " + ct.org })); break;
      case "tools": out.push({ kind: "out", text: tools.map(t => t[1]).join("  ·  ") }); break;
      case "github":
        out.push({ kind: "link", text: GITHUB_URL, href: GITHUB_URL, label: "→ " + GITHUB_URL });
        out.push({ kind: "out", text: openExternal(GITHUB_URL) ? "[OK] tab launched — github.com" : "[!] popup blocked", cls: "term-success" });
        break;
      case "linkedin":
        out.push({ kind: "link", text: LINKEDIN_URL, href: LINKEDIN_URL, label: "→ " + LINKEDIN_URL });
        out.push({ kind: "out", text: openExternal(LINKEDIN_URL) ? "[OK] tab launched — linkedin.com" : "[!] popup blocked", cls: "term-success" });
        break;
      case "email":
      case "mail":
        out.push({ kind: "link", text: profile.contact.email, href: EMAIL_URL, label: "→ " + profile.contact.email });
        out.push({ kind: "out", text: openExternal(EMAIL_URL) ? "[OK] opening default mail client…" : "[!] no mail handler", cls: "term-success" });
        break;
      case "resume":
      case "cv":
        out.push({ kind: "link", text: RESUME_URL, href: RESUME_URL, label: "→ GET " + RESUME_URL + " ▓▓▓▓▓░░ 200 OK" });
        out.push({ kind: "out", text: openExternal(RESUME_URL) ? "[OK] resume.pdf opened" : "[!] could not open resume.pdf", cls: "term-success" });
        break;
      case "open": {
        const t = args[0];
        if (!t) { out.push({ kind: "out", text: "usage: open <url>", cls: "term-warn" }); break; }
        const u = normalizeUrl(t);
        out.push({ kind: "link", text: u, href: u, label: "→ " + u });
        out.push({ kind: "out", text: openExternal(u) ? "[OK] tab launched" : "[!] popup blocked", cls: "term-success" });
        break;
      }
      case "hire":
        out.push({ kind: "out", text: "[System] Opening direct communication line with Fatima...", cls: "term-success" });
        out.push({ kind: "out", text: "[System] Pre-filling secure greeting payload ▓▓▓▓▓░░ 100%", cls: "term-highlight" });
        setLines(prev => [...prev, ...out]);
        setTimeout(() => {
          actions.prefillContact("Hi Fatima — I came in through your terminal (`hire`). I'd love to talk about an opportunity.");
          actions.openWin("contact");
        }, 450);
        return;
      case "vibe": {
        const on = document.body.classList.toggle("vibe-mode");
        out.push({ kind: "out", text: on ? "vibe mode: ENGAGED — neon overdrive ⚡" : "vibe mode: disengaged", cls: on ? "term-success" : "term-warn" });
        break;
      }
      case "sudo":
        out.push({ kind: "out", text: "[sudo] password for fatima: ", cls: "term-warn" });
        out.push({ kind: "out", text: "Sorry, try again. (nice try 😉)", cls: "term-warn" });
        break;
      case "exit":
        out.push({ kind: "out", text: "logout — session closed. Refresh to reconnect.", cls: "term-warn" });
        break;
      case "design":
        out.push({ kind: "out", text: "[System] Loading creative workspace...", cls: "term-success" });
        out.push({ kind: "out", text: "[OK] Brand Identity · UI/UX · Motion Graphics ▓▓▓▓▓ 100%", cls: "term-highlight" });
        out.push({ kind: "out", text: "🎨 Canva · Figma · Adobe Suite · Procreate" });
        setTimeout(() => actions.openWin("design"), 350);
        break;
      case "canva":
        out.push({ kind: "out", text: "[Canva] Initializing design environment...", cls: "term-success" });
        out.push({ kind: "out", text: "[OK] Templates loaded ▓▓▓▓▓ 100%", cls: "term-highlight" });
        out.push({ kind: "out", text: "[OK] Opening design portfolio — canva.com selected as primary tool" });
        out.push({ kind: "link", text: "https://canva.com", href: "https://canva.com", label: "→ https://canva.com" });
        setTimeout(() => actions.openWin("design"), 400);
        break;
      case "figma":
        out.push({ kind: "out", text: "[Figma] Connecting to design cloud...", cls: "term-success" });
        out.push({ kind: "out", text: "[OK] UI/UX prototypes ready ▓▓▓▓▓ 100%", cls: "term-highlight" });
        out.push({ kind: "link", text: "https://figma.com", href: "https://figma.com", label: "→ https://figma.com" });
        setTimeout(() => actions.openWin("design"), 400);
        break;
      default:
        out.push({ kind: "out", text: "bash: " + c + ": command not found", cls: "term-warn" });
        out.push({ kind: "out", text: "try 'help' to list available commands" });
    }
    push(out);
  };

  const acceptGhost = () => { if (ghost) setInput(input + ghost); };

  const onKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "ArrowUp") {
      e.preventDefault();
      if (!history.length) return;
      const ni = histIdx < 0 ? history.length - 1 : Math.max(0, histIdx - 1);
      setHistIdx(ni); setInput(history[ni] || "");
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (histIdx < 0) return;
      const ni = histIdx + 1;
      if (ni >= history.length) { setHistIdx(-1); setInput(""); }
      else { setHistIdx(ni); setInput(history[ni]); }
    } else if (e.key === "ArrowRight" && ghost && (e.currentTarget.selectionStart ?? 0) === input.length) {
      e.preventDefault(); acceptGhost();
    } else if (e.key === "Tab") {
      e.preventDefault();
      const parts = input.split(/\s+/);
      const isCmd = parts.length <= 1;
      if (isCmd) {
        const partial = (parts[0] || "").toLowerCase();
        if (!partial) return;
        const matches = TERM_COMMANDS.filter(c => c.startsWith(partial));
        if (matches.length === 1) { setInput(matches[0]); setTabCycle(null); }
        else if (matches.length > 1) {
          // cycle on repeat tab
          if (tabCycle && tabCycle.matches.join(",") === matches.join(",")) {
            const ni = (tabCycle.idx + 1) % matches.length;
            setInput(matches[ni]); setTabCycle({ matches, idx: ni });
          } else {
            setTabCycle({ matches, idx: 0 });
            push([{ kind: "out", text: matches.join("  "), cls: "term-highlight" }]);
            setInput(matches[0]);
          }
        }
      } else {
        // path completion for cat/cd/ls
        const last = parts[parts.length - 1];
        const dirPart = last.includes("/") ? last.slice(0, last.lastIndexOf("/")+1) : "";
        const basePart = last.slice(dirPart.length).toLowerCase();
        const baseDir = resolvePath(cwd, dirPart || ".");
        const entries = listDir(baseDir);
        const matches = entries.filter(e => e.toLowerCase().startsWith(basePart));
        if (matches.length === 1) {
          parts[parts.length - 1] = dirPart + matches[0].replace(/\/$/, matches[0].endsWith("/") ? "/" : "");
          setInput(parts.join(" "));
        } else if (matches.length > 1) {
          push([{ kind: "out", text: matches.join("  "), cls: "term-highlight" }]);
        }
      }
    } else {
      setTabCycle(null);
    }
  };

  return (
    <div className="term-body" ref={bodyRef}>
      {lines.map((l: any, i: number) => {
        if (l.kind === "br") return <div key={i} style={{ height: 6 }} />;
        if (l.kind === "cmd") return (
          <div key={i} className="term-line">
            <span className="term-prompt">{l.prompt || promptStr}</span>
            <span className="term-cmd"> {l.text}</span>
          </div>
        );
        if (l.kind === "grid") return (
          <div key={i} className="term-grid">
            {l.items.map((it: string) => <span key={it} className="term-grid-item">{it}</span>)}
          </div>
        );
        if (l.kind === "link") return (
          <div key={i} className="term-out term-link">
            <LinkPreview href={l.href} label={l.label} />
          </div>
        );
        return <div key={i} className={"term-out " + (l.cls || "")}>{l.text}</div>;
      })}
      <form
        className="term-line term-input-row"
        onSubmit={(e) => { e.preventDefault(); run(input); setInput(""); }}
      >
        <span className="term-prompt">{promptStr}</span>
        <div className="term-input-wrap">
          <input
            value={input}
            onChange={(e) => { setInput(e.target.value); setTabCycle(null); }}
            onKeyDown={onKey}
            autoFocus spellCheck={false} autoComplete="off"
            className="term-input" aria-label="Terminal input"
          />
          {ghost && <span className="term-ghost" aria-hidden>{input}<em>{ghost}</em></span>}
          {input === "" && <span className="term-cursor" aria-hidden />}
        </div>
      </form>
    </div>
  );
}
/* ============ RESUME VIEWER ============ */
function ResumeViewer() {
  const [errored, setErrored] = useState(false);
  return (
    <div className="resume-viewer" style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <div className="resume-toolbar" style={{ padding: '10px 14px', borderBottom: '1px solid rgba(255,255,255,0.1)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span className="resume-toolbar-label" style={{ fontSize: 13, fontWeight: 600 }}>📄 fatima_rehman_resume.pdf</span>
        <div style={{ display: 'flex', gap: 10 }}>
          <a
            className="resume-dl-btn"
            href={RESUME_URL}
            download="Fatima_Rehman_Resume.pdf"
            title="Download PDF"
            style={{ padding: '6px 12px', background: 'rgba(255,255,255,0.1)', borderRadius: 4, fontSize: 11, color: '#fff', textDecoration: 'none' }}
          >⬇ Download</a>
          <a
            className="resume-dl-btn resume-open-btn"
            href={RESUME_URL}
            target="_blank"
            rel="noopener noreferrer"
            title="Open in new tab"
            style={{ padding: '6px 12px', background: '#FF6D00', borderRadius: 4, fontSize: 11, color: '#000', fontWeight: 600, textDecoration: 'none' }}
          >↗ Open Fullscreen</a>
        </div>
      </div>

      {!errored ? (
        <div className="resume-iframe-wrap" style={{ flex: 1, position: 'relative', overflow: 'hidden' }}>
          <object
            data={`${RESUME_URL}#toolbar=0&navpanes=0&scrollbar=0&view=FitH`}
            type="application/pdf"
            width="100%"
            height="100%"
            style={{ border: 'none', width: '100%', height: '100%', display: 'block' }}
            onError={() => setErrored(true)}
          >
            <div style={{ padding: 40, textAlign: 'center' }}>
              <p>Your browser doesn't support embedded PDFs.</p>
              <p><a href={RESUME_URL} target="_blank" rel="noopener noreferrer" style={{ color: '#FF6D00' }}>Click here to view it directly.</a></p>
            </div>
          </object>
        </div>
      ) : (
        <div className="resume-error" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', flex: 1, padding: 40, textAlign: 'center' }}>
          <div style={{ fontSize: 32, marginBottom: 10 }}>📭</div>
          <div style={{ fontWeight: 700, color: "#FF6D00", marginBottom: 6 }}>Resume not displaying correctly?</div>
          <div style={{ fontSize: 11, color: "var(--text3)", lineHeight: 1.7, marginBottom: 20 }}>
            Make sure your <code>resume.pdf</code> is in the <code>public/</code> folder. <br/>
            Sometimes browsers block PDFs in iframes.
          </div>
          <a
            className="resume-dl-btn"
            href={RESUME_URL}
            target="_blank"
            rel="noopener noreferrer"
            style={{ padding: '8px 16px', background: '#FF6D00', color: '#000', borderRadius: 4, textDecoration: 'none', fontWeight: 'bold' }}
          >🔗 Open PDF Directly</a>
        </div>
      )}
    </div>
  );
}

/* ============ ABOUT ============ */
function About() {
  return (
    <div className="about-body">
      <div className="about-header">
        <div className="about-avatar">{profile.initials}</div>
        <div>
          <div className="about-name">FATIMA REHMAN</div>
          <div className="about-role">{profile.role}</div>
          <div style={{ marginTop: 6 }}>
            <span className="about-tag tag-cyan">GIKI 2024–28</span>
            <span className="about-tag tag-green">Available</span>
          </div>
        </div>
      </div>
      <p className="about-bio">{profile.bio}</p>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 4, marginBottom: 10 }}>
        {profile.tags.map(t => <span key={t.label} className={"about-tag " + t.cls}>{t.label}</span>)}
      </div>
      <div className="about-stats">
        {profile.stats.map(s => (
          <div key={s.lbl} className="stat-box"><div className="stat-val">{s.val}</div><div className="stat-lbl">{s.lbl}</div></div>
        ))}
      </div>
      <div className="section-hdr">CONTACT</div>
      <div style={{ fontSize: 10, color: "var(--text2)", display: "flex", flexDirection: "column", gap: 4 }}>
        <span>📧 {profile.contact.email}</span>
        <span>📍 {profile.contact.location}</span>
        <span>🎓 {profile.contact.school}</span>
        <span><ResumeStatus url={RESUME_URL} /></span>
      </div>
    </div>
  );
}

/* ============ SKILLS — READABLE CARDS WITH ICONS ============ */
function Skills() {
  const [active, setActive] = useState<Set<string>>(new Set());
  const tipMap = useMemo(() => {
    const m: Record<string, { tip: string; label: string }> = {};
    skillTree.forEach(b => b.nodes.forEach(n => (m[n.id] = { tip: n.tip, label: n.label })));
    return m;
  }, []);
  const toggle = (id: string) => setActive(prev => {
    const next = new Set(prev);
    if (next.has(id)) next.delete(id); else next.add(id);
    return next;
  });
  const clearAll = () => setActive(new Set());
  return (
    <div className="skills-v2">
      <div className="skills-intro">
        <Sparkles size={14} strokeWidth={2} style={{ color: "var(--cyan)" }} />
        <span>Tap any skill — pick as many as you like to compare side-by-side.</span>
        {active.size > 0 && (
          <button type="button" className="skill-clear" onClick={clearAll}>clear ({active.size})</button>
        )}
      </div>
      {skillTree.map(b => (
        <div key={b.id} className="skill-branch" style={{ ["--accent" as any]: b.color }}>
          <div className="skill-branch-hdr">
            <span className="skill-branch-dot" />
            <span className="skill-branch-name">{b.label}</span>
            <span className="skill-branch-count">{b.nodes.length}</span>
          </div>
          <div className="skill-grid">
            {b.nodes.map(n => {
              const Icon = SKILL_ICONS[n.id] ?? Sparkles;
              const isOpen = active.has(n.id);
              return (
                <button
                  key={n.id}
                  type="button"
                  className={"skill-chip" + (isOpen ? " open" : "")}
                  onClick={() => toggle(n.id)}
                >
                  <span className="tab-icon-tile">
                    <Icon size={TAB_ICON_SIZE} strokeWidth={TAB_ICON_STROKE} />
                  </span>
                  <span className="skill-chip-label">{n.label}</span>
                  {isOpen && <CheckCircle2 size={12} style={{ marginLeft: "auto", color: "var(--accent)" }} />}
                </button>
              );
            })}
          </div>
          {b.nodes.filter(n => active.has(n.id)).map(n => (
            <div key={n.id} className="skill-tip-card">
              <div className="skill-tip-title">{n.label}</div>
              <div className="skill-tip-body">{tipMap[n.id]?.tip}</div>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

/* ============ PROJECTS — BLUEPRINT CARDS ============ */
function Blueprint({ steps, color }: { steps: string[]; color: string }) {
  const W = 320, H = 70;
  const boxW = 64, boxH = 28;
  const gap = (W - steps.length * boxW) / (steps.length - 1);
  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="blueprint-svg" preserveAspectRatio="xMidYMid meet">
      <defs>
        <marker id="bp-arrow" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
          <path d="M0,0 L6,3 L0,6 z" fill={color} />
        </marker>
      </defs>
      {steps.map((s, i) => {
        const x = i * (boxW + gap);
        return (
          <g key={s + i}>
            {i > 0 && (
              <line x1={x - gap + 2} y1={H / 2} x2={x - 2} y2={H / 2}
                stroke={color} strokeWidth="1.2" strokeDasharray="3,3"
                markerEnd="url(#bp-arrow)"
                style={{ filter: "drop-shadow(0 0 3px " + color + ")" }} />
            )}
            <rect x={x} y={(H - boxH) / 2} width={boxW} height={boxH} rx="6"
              fill="rgba(2,6,15,0.85)" stroke={color} strokeWidth="1"
              style={{ filter: "drop-shadow(0 0 6px " + color + "55)" }} />
            <text x={x + boxW / 2} y={H / 2 + 3} textAnchor="middle"
              fontFamily="JetBrains Mono, monospace" fontSize="6.5" fill="#fff" letterSpacing="0.5">{s}</text>
          </g>
        );
      })}
    </svg>
  );
}

function Projects() {
  const colors = ["var(--cyan)", "var(--purple)", "var(--green)", "var(--orange)", "var(--pink)"];
  return (
    <div style={{ padding: 12 }}>
      {projects.map((p, idx) => {
        const accent = colors[idx % colors.length];
        const TitleIcon = PROJECT_ICONS[idx % PROJECT_ICONS.length];
        const cleanTitle = p.title.replace(/^\p{Extended_Pictographic}\s*/u, "");
        return (
          <div key={p.title} className="proj-card blueprint-card">
            <div className="proj-title-row">
              <div className="proj-title-left">
                <span className="tab-icon-tile" style={{ ["--accent" as any]: accent }}>
                  <TitleIcon size={TAB_ICON_SIZE} strokeWidth={TAB_ICON_STROKE} />
                </span>
                <div className="proj-title"><DecryptText text={cleanTitle} /></div>
              </div>
              {p.repo && (
                <a href={p.repo} target="_blank" rel="noreferrer noopener" className="proj-repo-btn" title="View source on GitHub">
                  <Github size={INLINE_ICON_SIZE} strokeWidth={TAB_ICON_STROKE} />
                  <span>Code</span>
                  <ExternalLink size={INLINE_ICON_SIZE - 2} strokeWidth={TAB_ICON_STROKE} />
                </a>
              )}
            </div>
            {p.award && (
              <div className="proj-badge"><Award size={INLINE_ICON_SIZE} strokeWidth={TAB_ICON_STROKE} /> {p.award}</div>
            )}
            <div className="proj-desc">{p.desc}</div>
            {p.bullets && (
              <ul className="proj-bullets">
                {p.bullets.map((b, i) => (
                  <li key={i}><span className="proj-bullet-mark" style={{ color: accent }}>▸</span><span>{b}</span></li>
                ))}
              </ul>
            )}
            {p.blueprint && <Blueprint steps={p.blueprint} color={accent} />}
            <div className="proj-tags">
              {p.tags.map(([n, cls]) => <span key={n} className={"about-tag " + cls}>{n}</span>)}
              {p.stack && p.stack.map(s => <span key={s} className="about-tag tag-mono">{s}</span>)}
            </div>
          </div>
        );
      })}
    </div>
  );
}

/* ============ DESIGN PORTFOLIO ============ */
type DesignTab = "all" | "branding" | "uiux" | "motion" | "social" | "daily";

function DesignCardSlideshow({ images, color }: { images: string[]; color: string }) {
  const [idx, setIdx] = useState(0);
  if (!images || images.length <= 1) return null;
  const prev = () => setIdx(i => (i - 1 + images.length) % images.length);
  const next = () => setIdx(i => (i + 1) % images.length);
  return (
    <div className="dslide-nav">
      <button type="button" className="dslide-btn" onClick={prev} aria-label="Previous">‹</button>
      <div className="dslide-dots">
        {images.map((_, i) => (
          <button
            key={i}
            type="button"
            className={"dslide-dot" + (i === idx ? " active" : "")}
            style={i === idx ? { background: color } : {}}
            onClick={() => setIdx(i)}
            aria-label={`Slide ${i + 1}`}
          />
        ))}
      </div>
      <button type="button" className="dslide-btn" onClick={next} aria-label="Next">›</button>
    </div>
  );
}

function Design3DAnimatic() {
  return (
    <div className="d3d-container">
      <div className="d3d-cube">
        <div className="d3d-face d3d-front">🎨</div>
        <div className="d3d-face d3d-back">✨</div>
        <div className="d3d-face d3d-right">💻</div>
        <div className="d3d-face d3d-left">🚀</div>
        <div className="d3d-face d3d-top"></div>
        <div className="d3d-face d3d-bottom"></div>
      </div>
    </div>
  );
}

function DesignPortfolio() {
  const [activeTab, setActiveTab] = useState<DesignTab>("all");
  const [lightbox, setLightbox] = useState<string | null>(null);
  const [slideIdxMap, setSlideIdxMap] = useState<Record<string, number>>({});

  const getSlideIdx = (id: string) => slideIdxMap[id] ?? 0;
  const setSlideIdx = (id: string, fn: (prev: number) => number, len: number) =>
    setSlideIdxMap(m => ({ ...m, [id]: ((fn(m[id] ?? 0)) + len) % len }));

  const tabs: { id: DesignTab; label: string; emoji: string }[] = [
    { id: "all",      label: "All Work",     emoji: "✦" },
    { id: "daily",    label: "Daily Designs", emoji: "🗒" },
    { id: "social",   label: "Social Media",  emoji: "📸" },
    { id: "branding", label: "Branding",      emoji: "🎨" },
    { id: "uiux",     label: "UI / UX",       emoji: "📱" },
    { id: "motion",   label: "Motion",        emoji: "🎬" },
  ];

  const filtered = activeTab === "all"
    ? designProjects
    : designProjects.filter(p => p.category === activeTab);

  return (
    <div className="design-portfolio">
      {/* Header */}
      <div className="design-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <div className="design-header-title">
            <span className="design-sparkle">✦</span>
            <span>Creative Portfolio</span>
          </div>
          <div className="design-header-sub">Brand Identity · Social Media · UI/UX · Motion Graphics</div>
          <div className="design-tools-strip">
            {["Canva","Figma","Adobe XD","Procreate","Typography","Spline 3D"].map(t => (
              <span key={t} className="design-tool-badge">{t}</span>
            ))}
          </div>
        </div>
        
        {/* 3D Animatic */}
        <Design3DAnimatic />
      </div>

      {/* Tabs */}
      <div className="design-tabs">
        {tabs.map(t => (
          <button
            key={t.id}
            type="button"
            className={"design-tab" + (activeTab === t.id ? " active" : "")}
            onClick={() => setActiveTab(t.id)}
          >
            <span>{t.emoji}</span>
            <span>{t.label}</span>
          </button>
        ))}
      </div>

      {/* Project Cards */}
      <div className="design-cards">
        {filtered.map(p => {
          const gallery = p.images && p.images.length > 1 ? p.images : null;
          const si = getSlideIdx(p.id);
          const currentImg = gallery ? gallery[si] : p.image;
          return (
            <div key={p.id} className="design-card" style={{ ["--dcard-color" as any]: p.color }}>
              {/* Badge */}
              {p.badge && (
                <div className="design-card-badge" style={{ borderColor: p.color, color: p.color }}>
                  {p.badge}
                </div>
              )}

              {/* Image preview with gallery */}
              <div className="design-card-img-wrap" style={{ position: "relative" }}>
                <img
                  src={currentImg}
                  alt={p.title}
                  className="design-card-img"
                  loading="lazy"
                  onClick={() => setLightbox(currentImg)}
                  style={{ cursor: "zoom-in" }}
                />
                <div className="design-card-img-overlay" onClick={() => setLightbox(currentImg)}>
                  <span className="design-expand-icon">⤢ Expand</span>
                </div>

                {/* Gallery arrows — only if multiple images */}
                {gallery && (
                  <>
                    <button
                      type="button"
                      className="dslide-arrow dslide-arrow-left"
                      onClick={e => { e.stopPropagation(); setSlideIdx(p.id, i => i - 1, gallery.length); }}
                      aria-label="Previous image"
                    >‹</button>
                    <button
                      type="button"
                      className="dslide-arrow dslide-arrow-right"
                      onClick={e => { e.stopPropagation(); setSlideIdx(p.id, i => i + 1, gallery.length); }}
                      aria-label="Next image"
                    >›</button>
                    <div className="dslide-counter">{si + 1} / {gallery.length}</div>
                  </>
                )}
              </div>

              {/* Dot nav */}
              {gallery && (
                <div className="dslide-dots-row">
                  {gallery.map((_, i) => (
                    <button
                      key={i}
                      type="button"
                      className={"dslide-dot" + (i === si ? " active" : "")}
                      style={i === si ? { background: p.color } : {}}
                      onClick={() => setSlideIdxMap(m => ({ ...m, [p.id]: i }))}
                      aria-label={`Image ${i + 1}`}
                    />
                  ))}
                </div>
              )}

              {/* Card body */}
              <div className="design-card-body">
                <div className="design-card-title" style={{ color: p.color }}>{p.title}</div>
                <div className="design-card-desc">{p.desc}</div>
                <ul className="design-highlights">
                  {p.highlights.map((h, i) => (
                    <li key={i}>
                      <span className="design-bullet" style={{ color: p.color }}>▸</span>
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>
                <div className="design-card-tools">
                  {p.tools.map(t => (
                    <span key={t} className="design-card-tool-badge">{t}</span>
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Design Philosophy */}
      <div className="design-philosophy">
        <div className="design-philosophy-mark">"</div>
        <div className="design-philosophy-text">
          Good design is where precision meets imagination — I bring both. Whether it's
          a local restaurant's Instagram or a full brand identity, I design content that
          feels real, scroll-stopping, and built for the audience.
        </div>
        <div className="design-philosophy-author">— Fatima Rehman</div>
      </div>

      {/* Lightbox */}
      {lightbox && (
        <div className="design-lightbox" onClick={() => setLightbox(null)}>
          <div className="design-lightbox-inner" onClick={e => e.stopPropagation()}>
            <button type="button" className="design-lightbox-close" onClick={() => setLightbox(null)}>✕</button>
            <img src={lightbox} alt="Design preview" className="design-lightbox-img" />
          </div>
        </div>
      )}
    </div>
  );
}

/* ============ TOOLS ============ */
function Tools() {
  return (
    <div className="tools-grid">
      {tools.map(([icon, name]) => (
        <div key={name} className="tool-card">
          <div className="tool-icon">{icon}</div>
          <div className="tool-name">{name}</div>
        </div>
      ))}
    </div>
  );
}

/* ============ CERTS ============ */
function Certs() {
  const groups = useMemo(() => {
    const m: Record<string, typeof certs> = {};
    certs.forEach(c => { (m[c.kind] ||= [] as never).push(c); });
    return m;
  }, []);
  return (
    <div>
      {Object.entries(groups).map(([k, items]) => (
        <div key={k}>
          <div style={{ padding: "8px 12px 4px", fontSize: 8, color: "var(--text3)", letterSpacing: 1 }}>{k}</div>
          {items.map(c => {
            const CIcon = CERT_ICONS[c.kind] ?? CERT_ICONS.DEFAULT;
            return (
              <div key={c.name} className="cert-item">
                <div className="cert-icon tab-icon-tile" style={{ background: c.bg }}>
                  <CIcon size={TAB_ICON_SIZE} strokeWidth={TAB_ICON_STROKE} />
                </div>
                <div className="cert-info">
                  <div className="cert-name">{c.name}</div>
                  <div className="cert-org">{c.org}</div>
                </div>
                <div className={"cert-status " + c.statusCls}>{c.status}</div>
                {c.link && (
                  <a href={c.link} target="_blank" rel="noreferrer noopener" className="cert-link" title="Open reference">
                    <ExternalLink size={INLINE_ICON_SIZE} strokeWidth={TAB_ICON_STROKE} />
                  </a>
                )}
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
}

/* ============ RESEARCH ============ */
function Research() {
  return (
    <div>
      <div className="research-card">
        <div className="research-badge">PAPER IN PROGRESS</div>
        <div className="research-title">"EEG-Based Alzheimer's Disease Classification Using Machine Learning"</div>
        <div style={{ fontSize: 10, color: "var(--text2)", marginBottom: 12, lineHeight: 1.6 }}>
          NeuroImaging Research Group · Air University · 2025<br />Target: IEEE / Springer Journal
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <div>
            <div className="accuracy-big">97.71%</div>
            <div style={{ fontSize: 9, color: "var(--text2)", letterSpacing: 1 }}>CLASSIFICATION ACCURACY</div>
          </div>
          <div style={{ fontSize: 10, color: "var(--text2)", lineHeight: 1.6, flex: 1 }}>
            SVM + Random Forest · EEG Preprocessing · Feature Extraction · PsychoPy Experiments
          </div>
        </div>
      </div>
      <div style={{ padding: 12 }}>
        <div className="section-hdr">PIPELINE</div>
        <div style={{ fontSize: 10, color: "var(--text2)", lineHeight: 1.9 }}>
          <div>📥 Raw EEG acquisition (multi-channel)</div>
          <div>🔧 Preprocessing: bandpass filter + artifact removal</div>
          <div>⚙️ Feature extraction: frequency-band power</div>
          <div>🤖 Classification: SVM → Random Forest</div>
          <div>📊 Result: <span style={{ color: "var(--green)", fontWeight: 700 }}>97.71% accuracy</span></div>
        </div>
        <div className="section-hdr" style={{ marginTop: 12 }}>ALSO EXPLORED</div>
        <div style={{ fontSize: 10, color: "var(--text2)", lineHeight: 1.9 }}>
          <div>🧪 fNIRS neuroimaging data acquisition (basics)</div>
          <div>🖥 PsychoPy cognitive experiment design</div>
          <div>🔬 Human-Computer Interaction via brain signals</div>
        </div>
      </div>
    </div>
  );
}

/* ============ CONTACT — QUICK-DEPLOY PIPELINE ============ */
const PIPELINE_STEPS = [
  { label: "Encrypting payload", ms: 500 },
  { label: "Establishing secure connection", ms: 550 },
  { label: "Authenticating sender", ms: 400 },
  { label: "Persisting to backend vault", ms: 0 }, // gated on supabase insert
  { label: "Message delivered", ms: 350 },
];

type LoggedMsg = { id: string; name: string; email: string; message: string; ts: number };
const LOG_KEY = "fros.tx_log.v1";

function loadLog(): LoggedMsg[] {
  if (typeof window === "undefined") return [];
  try { return JSON.parse(localStorage.getItem(LOG_KEY) || "[]"); } catch { return []; }
}
function saveLog(l: LoggedMsg[]) {
  try { localStorage.setItem(LOG_KEY, JSON.stringify(l.slice(0, 25))); } catch { /* quota */ }
}

function Contact({ actions }: { actions: WinActions }) {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [error, setError] = useState<string | null>(null);
  const [running, setRunning] = useState<number>(-1);
  const [log, setLog] = useState<LoggedMsg[]>(() => loadLog());
  const [showLog, setShowLog] = useState(false);
  const sending = running >= 0 && running < PIPELINE_STEPS.length;

  useEffect(() => {
    if (actions.contactPrefill) {
      setForm(f => ({ ...f, message: actions.contactPrefill }));
      actions.clearContactPrefill();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [actions.contactPrefill]);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    const name = form.name.trim();
    const email = form.email.trim().toLowerCase();
    const message = form.message.trim();
    if (name.length < 2) { setError("✗ Name must be at least 2 characters"); return; }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { setError("✗ Invalid email address"); return; }
    if (message.length < 5) { setError("✗ Message too short (min 5 chars)"); return; }
    setError(null);
    for (let i = 0; i < 3; i++) {
      setRunning(i);
      await new Promise(r => setTimeout(r, PIPELINE_STEPS[i].ms));
    }
    setRunning(3);
    let sendErr: string | null = null;
    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", "Accept": "application/json" },
        body: JSON.stringify({
          access_key: WEB3FORMS_ACCESS_KEY,
          name: name.slice(0, 120),
          email: email.slice(0, 200),
          message: message.slice(0, 5000),
          subject: `Portfolio contact from ${name}`,
          from_name: "Portfolio Terminal",
          botcheck: "",
        }),
      });
      const json = await res.json().catch(() => ({}));
      if (!res.ok || json?.success === false) {
        sendErr = json?.message || `HTTP ${res.status}`;
      }
    } catch (err) {
      sendErr = err instanceof Error ? err.message : "Network error";
    }
    if (sendErr) {
      setRunning(-1);
      setError("✗ Transmission failed: " + sendErr);
      return;
    }
    setRunning(4);
    await new Promise(r => setTimeout(r, PIPELINE_STEPS[4].ms));
    setRunning(PIPELINE_STEPS.length);
    const entry: LoggedMsg = {
      id: (crypto?.randomUUID?.() ?? String(Date.now())),
      name, email, message, ts: Date.now(),
    };
    const next = [entry, ...log];
    setLog(next); saveLog(next); setShowLog(true);
    setForm({ name: "", email: "", message: "" });
  };

  const clearLog = () => { setLog([]); saveLog([]); };

  return (
    <div className="contact-body">
      <p className="contact-blurb">
        Open to internships, research collaborations, bug-bounty partnerships, and freelance projects.
      </p>
      <div className="contact-meta">
        <a className="contact-chip" href={EMAIL_URL}><Mail size={13} strokeWidth={1.75} /><span>{profile.contact.email}</span></a>
        <a className="contact-chip" href={LINKEDIN_URL} target="_blank" rel="noreferrer noopener"><Linkedin size={13} strokeWidth={1.75} /><span>LinkedIn</span><ExternalLink size={11} strokeWidth={1.75} /></a>
        <a className="contact-chip" href={GITHUB_URL} target="_blank" rel="noreferrer noopener"><Github size={13} strokeWidth={1.75} /><span>GitHub</span><ExternalLink size={11} strokeWidth={1.75} /></a>
        <span className="contact-chip"><MapPin size={13} strokeWidth={1.75} /><span>{profile.contact.location}</span></span>
        <span className="contact-chip"><ResumeStatus url={RESUME_URL} compact /></span>
      </div>

      <form onSubmit={submit}>
        <div className="contact-field">
          <div className="contact-label">NAME</div>
          <input className="contact-input" placeholder="Your name" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />
        </div>
        <div className="contact-field">
          <div className="contact-label">EMAIL</div>
          <input className="contact-input" placeholder="your@email.com" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} />
        </div>
        <div className="contact-field">
          <div className="contact-label">MESSAGE</div>
          <textarea className="contact-input contact-textarea" placeholder="Tell me about the opportunity..." value={form.message} onChange={e => setForm({ ...form, message: e.target.value })} />
        </div>
        <button type="submit" className="contact-btn" disabled={sending}>
          {sending ? "DEPLOYING..." : "🚀 DEPLOY MESSAGE"}
        </button>
      </form>

      {error && <div className="contact-error">{error}</div>}

      {running >= 0 && (
        <div className="deploy-pipeline">
          {PIPELINE_STEPS.map((s, i) => {
            const state = i < running ? "done" : i === running ? (running >= PIPELINE_STEPS.length ? "done" : "active") : "pending";
            return (
              <div key={s.label} className={"deploy-step " + state}>
                <span className="deploy-bullet">{state === "done" ? "✓" : state === "active" ? "▸" : "·"}</span>
                <span className="deploy-label">[{i + 1}] {s.label}{state === "active" ? "..." : ""}</span>
              </div>
            );
          })}
          {running >= PIPELINE_STEPS.length && (
            <div className="deploy-success">✓ Pipeline complete — I'll be in touch.</div>
          )}
        </div>
      )}

      <div className="tx-log">
        <button type="button" className="tx-log-toggle" onClick={() => setShowLog(s => !s)}>
          <span className="tx-log-dot" /> TRANSMISSION LOG · {log.length} sent
          <span style={{ marginLeft: "auto" }}>{showLog ? "▾" : "▸"}</span>
        </button>
        {showLog && (
          <div className="tx-log-body">
            {log.length === 0 && <div className="tx-log-empty">— no transmissions yet —</div>}
            {log.map(m => (
              <div key={m.id} className="tx-log-item">
                <div className="tx-log-head">
                  <span className="tx-log-status">✓ DELIVERED</span>
                  <span className="tx-log-ts">{new Date(m.ts).toLocaleString()}</span>
                </div>
                <div className="tx-log-meta">{m.name} &lt;{m.email}&gt;</div>
                <div className="tx-log-msg">{m.message.length > 180 ? m.message.slice(0, 180) + "…" : m.message}</div>
              </div>
            ))}
            {log.length > 0 && (
              <button type="button" className="tx-log-clear" onClick={clearLog}>clear log</button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}


/* ============ COMMAND PALETTE (Ctrl+K) ============ */
const PALETTE_ITEMS: { id: string; label: string; hint: string; kbd?: string }[] = [
  { id: "terminal", label: "Terminal",  hint: "open shell",          kbd: "T" },
  { id: "about",    label: "About",     hint: "bio · contact info",  kbd: "A" },
  { id: "skills",   label: "Skills",    hint: "interactive tree",    kbd: "S" },
  { id: "projects", label: "Projects",  hint: "blueprints · awards" },
  { id: "tools",    label: "Tools",     hint: "security stack" },
  { id: "research", label: "Research",  hint: "EEG · neuro-AI" },
  { id: "certs",    label: "Certs",     hint: "awards · education" },
  { id: "contact",  label: "Contact",   hint: "deploy a message" },
];
function CommandPalette({ onClose, onPick }: { onClose: () => void; onPick: (id: string) => void }) {
  const [q, setQ] = useState("");
  const [idx, setIdx] = useState(0);
  const filtered = useMemo(
    () => PALETTE_ITEMS.filter(p =>
      (p.label + " " + p.hint + " " + p.id).toLowerCase().includes(q.toLowerCase())
    ), [q]
  );
  useEffect(() => { setIdx(0); }, [q]);
  const onKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "ArrowDown") { e.preventDefault(); setIdx(i => Math.min(filtered.length - 1, i + 1)); }
    else if (e.key === "ArrowUp") { e.preventDefault(); setIdx(i => Math.max(0, i - 1)); }
    else if (e.key === "Enter")    { e.preventDefault(); if (filtered[idx]) onPick(filtered[idx].id); }
    else if (e.key === "Escape")   { e.preventDefault(); onClose(); }
  };
  return (
    <div className="palette-overlay" onClick={onClose}>
      <div className="palette" onClick={e => e.stopPropagation()}>
        <div className="palette-bar">
          <span className="palette-prompt">⌘K</span>
          <input
            autoFocus value={q} onChange={e => setQ(e.target.value)} onKeyDown={onKey}
            className="palette-input" placeholder="jump to window… (try: ssh, eeg, robot)"
          />
          <kbd className="palette-kbd">ESC</kbd>
        </div>
        <div className="palette-list">
          {filtered.length === 0 && <div className="palette-empty">no matches</div>}
          {filtered.map((it, i) => (
            <button
              key={it.id}
              type="button"
              className={"palette-item" + (i === idx ? " active" : "")}
              onMouseEnter={() => setIdx(i)}
              onClick={() => onPick(it.id)}
            >
              <span className="palette-icon">{ICONS[it.id] ? <AppIcon id={it.id} size={16} /> : null}</span>
              <span className="palette-label">{it.label}</span>
              <span className="palette-hint">{it.hint}</span>
              {it.kbd && <kbd className="palette-kbd-sm">{it.kbd}</kbd>}
              <kbd className="palette-kbd-sm">↵</kbd>
            </button>
          ))}
        </div>
        <div className="palette-foot">↑↓ navigate · ↵ open · ESC close</div>
      </div>
    </div>
  );
}
