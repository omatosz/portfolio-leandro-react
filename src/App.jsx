import React, { useState, useEffect, useRef, useCallback } from "react";
import emailjs from "@emailjs/browser";

// ---- EmailJS (preencha depois de criar a conta em emailjs.com) --------
// 1. Crie uma conta em https://www.emailjs.com/
// 2. Crie um Service (ex.: Gmail) e um Template com os campos: nome, email, assunto, mensagem
// 3. Cole os 3 IDs abaixo. O PUBLIC_KEY pode ficar exposto no front, é feito pra isso.
const EMAILJS_SERVICE_ID = "service_sybifue";
const EMAILJS_TEMPLATE_ID = "template_m80cy6o";
const EMAILJS_PUBLIC_KEY = "fAY7b5B9FGnpPEKlj";

// ---- Conteúdo (edite aqui) ---------------------------------------------
const NAME = "Leandro Matos";
const INITIALS = "LM";
const ROLE = "Analista de Cibersegurança e Suporte especializado";
const BIO = [
  "Sou analista especializado em Cibersegurança, atuando no blue team foco em monitorar, detectar e responder a ameaças antes que elas virem incidentes.",
  "Minha base em suporte técnico me deu uma visão prática de infraestrutura: redes, sistemas e o dia a dia de quem depende deles funcionando. Isso molda a forma como penso segurança não só teoria, mas o que realmente protege um ambiente real.",
  "Atualmente também estou me especializando para atuar como Analista NOC (Network Operations Center), unindo monitoramento de rede e disponibilidade de infraestrutura à resposta a incidentes de segurança.",
  "Construo e estudo ferramentas de detecção (honeypots, SIEM) para entender o comportamento de um atacante e transformar isso em alertas e respostas mais rápidas.",
];

const CONTACTS = {
  github: "https://github.com/omatosz",
  linkedin: "https://www.linkedin.com/in/leandromatossilva/",
  email: "lehleoooo@icloud.com",
  whatsapp: "https://wa.me/5511949737730",
};

const FOCUS_CARDS = [
  { title: "Monitoramento & Detecção", desc: "Acompanhamento de logs e tráfego em busca de sinais de comportamento anômalo." },
  { title: "NOC em especialização", desc: "Monitoramento de disponibilidade e saúde de rede, correlacionando falhas de infraestrutura com possíveis incidentes de segurança." },
  { title: "Resposta a Incidentes", desc: "Triagem e contenção de ameaças, do primeiro alerta até a mitigação." },
  { title: "Hardening & Suporte", desc: "Redução de superfície de ataque e suporte técnico especializado em infraestrutura." },
];

const TABS = {
  Stack: [
    { title: "Linux & Redes", desc: "Base sólida em administração de sistemas Linux e fundamentos de TCP/IP." },
    { title: "Python", desc: "Scripts de automação, parsing de logs e ferramentas de detecção sob medida." },
  ],
  Ferramentas: [
    { title: "SIEM & Logging", desc: "Centralização e correlação de eventos para gerar alertas acionáveis." },
    { title: "Honeypots", desc: "Ambientes-isca para observar e registrar táticas reais de atacantes." },
  ],
  Conceitos: [
    { title: "Blue Team", desc: "Postura defensiva contínua: detectar, conter, aprender, repetir." },
    { title: "NOC", desc: "Visibilidade de rede 24/7: disponibilidade, performance e continuidade como base da segurança." },
  ],
};

const TECH_RADAR = ["Linux", "Python", "SQL", "Redes TCP/IP", "Wireshark", "SIEM", "Honeypots", "Firewall", "Nmap", "Blue Team", "NOC", "Hardening", "Suporte N1", "Git"];

const PROJECTS = [
  {
    tag: "PROJETO EM DESENVOLVIMENTO",
    title: "HoneyPot SSH",
    desc: "Honeypot que simula um serviço SSH vulnerável para atrair tentativas de invasão. Registra IPs, credenciais testadas e comandos executados pelo atacante, gerando dados reais de comportamento para análise de ameaças.",
    tags: ["Python", "Linux", "Docker", "SSH", "Logging"],
  },
  {
    tag: "PROJETO EM DESENVOLVIMENTO",
    title: "SIEM Simples",
    desc: "Sistema simplificado de SIEM que centraliza logs de diferentes fontes, correlaciona eventos suspeitos e dispara alertas em tempo real, pensado para dar visibilidade rápida sobre o que está acontecendo na rede.",
    tags: ["Python", "SQL", "Log Parsing", "Dashboards", "Alertas"],
  },
];

const TERMINAL_LINES = [
  "$ tail -f /var/log/auth.log",
  "[INFO] honeypot ssh iniciado na porta 22",
  "[ALERT] 14 tentativas de login falhas — 45.9.12.x",
  "[INFO] credenciais capturadas: admin / 123456",
  "[OK] evento encaminhado ao SIEM",
  "[ALERT] padrão de força bruta identificado",
  "[OK] IP adicionado à lista de bloqueio",
];

const BOOT_LINES = [
  "inicializando ambiente seguro...",
  "carregando módulos de monitoramento...",
  "sincronizando feed de ameaças...",
  "sistema pronto.",
];

const NAV_ITEMS = [
  { id: "visao", label: "Visão" },
  { id: "expertise", label: "Expertise" },
  { id: "projetos", label: "Projetos" },
  { id: "contato", label: "Contato" },
];

// ---- Tema (aplicado via inline style — evita bug de classe arbitrária) --
const THEME = {
  dark: {
    bg: "#080b12",
    bgSoft: "rgba(255,255,255,0.045)",
    card: "rgba(255,255,255,0.045)",
    border: "rgba(255,255,255,0.12)",
    text: "#e7edf6",
    textMuted: "#93a4bd",
    navBg: "rgba(8,11,18,0.86)",
    accent: "#22d3ee",
    accent2: "#f472ff",
    gridLine: "rgba(34,211,238,0.08)",
    terminalBg: "#0c1017",
    terminalText: "#67e8f9",
    terminalAlert: "#fbbf24",
    glow: "0 0 26px rgba(34,211,238,0.38)",
    btnText: "#04121a",
  },
  light: {
    bg: "#eef2f8",
    bgSoft: "rgba(15,23,42,0.05)",
    card: "#ffffff",
    border: "rgba(15,23,42,0.12)",
    text: "#0f172a",
    textMuted: "#4c5872",
    navBg: "rgba(238,242,248,0.92)",
    accent: "#0891b2",
    accent2: "#c026d3",
    gridLine: "rgba(8,145,178,0.11)",
    terminalBg: "#0f172a",
    terminalText: "#67e8f9",
    terminalAlert: "#f59e0b",
    glow: "0 0 22px rgba(8,145,178,0.32)",
    btnText: "#ffffff",
  },
};

// ---- Hooks -----------------------------------------------------------

function useTypedLines(lines, speed = 45, pause = 1200) {
  const [display, setDisplay] = useState([]);
  const idxRef = useRef(0);
  const charRef = useRef(0);

  useEffect(() => {
    let timeout;
    const tick = () => {
      const lineIdx = idxRef.current;
      const line = lines[lineIdx];
      charRef.current += 1;
      setDisplay((prev) => {
        const copy = prev.slice(0, lineIdx);
        copy[lineIdx] = line.slice(0, charRef.current);
        return copy;
      });
      if (charRef.current >= line.length) {
        charRef.current = 0;
        idxRef.current = (lineIdx + 1) % lines.length;
        if (idxRef.current === 0) setTimeout(() => setDisplay([]), pause);
        timeout = setTimeout(tick, pause);
      } else {
        timeout = setTimeout(tick, speed);
      }
    };
    timeout = setTimeout(tick, speed);
    return () => clearTimeout(timeout);
  }, [lines, speed, pause]);

  return display;
}

// detecta se é um dispositivo com mouse de verdade (não celular/tablet no touch)
function useIsDesktop() {
  const query = "(hover: hover) and (pointer: fine)";
  const [isDesktop, setIsDesktop] = useState(
    () => typeof window !== "undefined" && window.matchMedia(query).matches
  );
  useEffect(() => {
    const mql = window.matchMedia(query);
    const handler = (e) => setIsDesktop(e.matches);
    mql.addEventListener("change", handler);
    return () => mql.removeEventListener("change", handler);
  }, []);
  return isDesktop;
}

function useMouse(enabled) {
  const [pos, setPos] = useState({ x: -200, y: -200, nx: 0, ny: 0, active: false });
  useEffect(() => {
    if (!enabled) return;
    const handleMove = (e) => {
      const nx = (e.clientX / window.innerWidth) * 2 - 1;
      const ny = (e.clientY / window.innerHeight) * 2 - 1;
      setPos({ x: e.clientX, y: e.clientY, nx, ny, active: true });
    };
    // some quando o mouse sai da janela (ex.: sobe até a barra de URL) ou
    // quando a aba perde o foco, senão o cursor customizado e o brilho
    // ficam "travados" no último ponto capturado
    const handleLeave = () => setPos((p) => ({ ...p, active: false }));

    window.addEventListener("mousemove", handleMove);
    document.documentElement.addEventListener("mouseleave", handleLeave);
    window.addEventListener("blur", handleLeave);
    return () => {
      window.removeEventListener("mousemove", handleMove);
      document.documentElement.removeEventListener("mouseleave", handleLeave);
      window.removeEventListener("blur", handleLeave);
    };
  }, [enabled]);
  return pos;
}

function useReveal() {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          obs.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return [ref, visible];
}

function useActiveSection(ids) {
  const [active, setActive] = useState(ids[0]);
  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: "-45% 0px -45% 0px" }
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
  }, [ids]);
  return active;
}

function Icon({ children, size = 16, ...props }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      {children}
    </svg>
  );
}

const Sun = (props) => (
  <Icon {...props}>
    <circle cx="12" cy="12" r="4" />
    <line x1="12" y1="2" x2="12" y2="4" />
    <line x1="12" y1="20" x2="12" y2="22" />
    <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
    <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
    <line x1="2" y1="12" x2="4" y2="12" />
    <line x1="20" y1="12" x2="22" y2="12" />
    <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
    <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
  </Icon>
);

const Moon = (props) => (
  <Icon {...props}>
    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
  </Icon>
);

const Terminal = (props) => (
  <Icon {...props}>
    <polyline points="4 17 10 11 4 5" />
    <line x1="12" y1="19" x2="20" y2="19" />
  </Icon>
);

const ShieldCheck = (props) => (
  <Icon {...props}>
    <path d="M12 2 4 5v6c0 5 3.5 9 8 11 4.5-2 8-6 8-11V5l-8-3z" />
    <polyline points="9 12 11 14 15 10" />
  </Icon>
);

const Radar = (props) => (
  <Icon {...props}>
    <circle cx="12" cy="12" r="9" />
    <path d="M12 3a9 9 0 0 1 9 9" />
    <circle cx="17" cy="7" r="1.3" fill="currentColor" stroke="none" />
  </Icon>
);

const Send = (props) => (
  <Icon {...props}>
    <line x1="22" y1="2" x2="11" y2="13" />
    <polygon points="22 2 15 22 11 13 2 9 22 2" />
  </Icon>
);

const Mail = (props) => (
  <Icon {...props}>
    <rect x="2" y="4" width="20" height="16" rx="2" />
    <polyline points="2 7 12 13 22 7" />
  </Icon>
);

const MapPin = (props) => (
  <Icon {...props}>
    <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0z" />
    <circle cx="12" cy="10" r="3" />
  </Icon>
);

const Check = (props) => (
  <Icon {...props}>
    <polyline points="20 6 9 17 4 12" />
  </Icon>
);

const ArrowUpRight = (props) => (
  <Icon {...props}>
    <line x1="7" y1="17" x2="17" y2="7" />
    <polyline points="7 7 17 7 17 17" />
  </Icon>
);

const MenuIcon = (props) => (
  <Icon {...props}>
    <line x1="3" y1="6" x2="21" y2="6" />
    <line x1="3" y1="12" x2="21" y2="12" />
    <line x1="3" y1="18" x2="21" y2="18" />
  </Icon>
);

const XIcon = (props) => (
  <Icon {...props}>
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </Icon>
);

function GithubIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16" {...props}>
      <path d="M12 2C6.48 2 2 6.58 2 12.25c0 4.53 2.87 8.37 6.84 9.73.5.1.68-.22.68-.49 0-.24-.01-1.03-.01-1.87-2.78.61-3.37-1.21-3.37-1.21-.45-1.18-1.11-1.49-1.11-1.49-.9-.63.07-.62.07-.62 1 .07 1.53 1.05 1.53 1.05.89 1.56 2.34 1.11 2.91.85.09-.66.35-1.11.63-1.37-2.22-.26-4.56-1.14-4.56-5.06 0-1.12.39-2.03 1.03-2.75-.1-.26-.45-1.31.1-2.72 0 0 .84-.28 2.75 1.05a9.29 9.29 0 0 1 5 0c1.91-1.33 2.75-1.05 2.75-1.05.55 1.41.2 2.46.1 2.72.64.72 1.03 1.63 1.03 2.75 0 3.93-2.34 4.79-4.57 5.05.36.32.68.94.68 1.9 0 1.37-.01 2.47-.01 2.81 0 .27.18.6.69.49A10.26 10.26 0 0 0 22 12.25C22 6.58 17.52 2 12 2z" />
    </svg>
  );
}

function LinkedinIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16" {...props}>
      <path d="M6.94 5a1.94 1.94 0 1 1-3.88 0 1.94 1.94 0 0 1 3.88 0zM3.4 8.75h3.08V21H3.4V8.75zm6.02 0h2.95v1.68h.04c.41-.78 1.42-1.6 2.93-1.6 3.13 0 3.71 2.06 3.71 4.74V21h-3.07v-5.68c0-1.36-.02-3.1-1.89-3.1-1.9 0-2.19 1.48-2.19 3v5.78H9.42V8.75z" />
    </svg>
  );
}

function WhatsAppIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18" {...props}>
      <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.46 1.32 4.96L2 22l5.25-1.38a9.9 9.9 0 0 0 4.79 1.22h.01c5.46 0 9.9-4.45 9.9-9.9 0-2.65-1.03-5.14-2.9-7.01A9.87 9.87 0 0 0 12.04 2zm0 18.06h-.01a8.2 8.2 0 0 1-4.18-1.15l-.3-.18-3.12.82.83-3.04-.19-.31a8.2 8.2 0 0 1-1.26-4.39c0-4.54 3.7-8.24 8.25-8.24 2.2 0 4.27.86 5.83 2.42a8.17 8.17 0 0 1 2.41 5.82c0 4.55-3.7 8.25-8.26 8.25zm4.52-6.19c-.25-.12-1.46-.72-1.69-.8-.23-.08-.39-.12-.56.13-.16.24-.64.8-.78.96-.14.16-.29.18-.53.06-.25-.12-1.04-.38-1.98-1.22-.73-.65-1.23-1.45-1.37-1.7-.14-.24-.01-.37.11-.5.11-.11.25-.29.37-.43.12-.14.16-.24.25-.4.08-.16.04-.3-.02-.43-.06-.12-.56-1.36-.77-1.86-.2-.48-.41-.42-.56-.42-.14-.01-.31-.01-.48-.01-.16 0-.43.06-.66.3-.23.24-.87.85-.87 2.08 0 1.23.89 2.42 1.02 2.58.12.16 1.75 2.68 4.25 3.76.59.26 1.06.41 1.42.53.6.19 1.14.16 1.57.1.48-.07 1.46-.6 1.67-1.17.2-.58.2-1.07.14-1.18-.06-.1-.22-.16-.47-.28z" />
    </svg>
  );
}

// componente de seção que "revela" ao entrar na tela
function Reveal({ as: Tag = "div", className = "", children, ...rest }) {
  const [ref, visible] = useReveal();
  return (
    <Tag ref={ref} className={`reveal ${visible ? "reveal-visible" : ""} ${className}`} {...rest}>
      {children}
    </Tag>
  );
}

// foto de perfil, com fallback pras iniciais caso o arquivo ainda não exista em /public
function PhotoBadge({ t, size = 36 }) {
  const [failed, setFailed] = useState(false);
  if (failed) {
    return (
      <div
        className="neon-btn flex items-center justify-center rounded-lg text-sm font-bold"
        style={{ width: size, height: size, background: `linear-gradient(135deg, ${t.accent}, ${t.accent2})`, color: t.btnText }}
      >
        {INITIALS}
      </div>
    );
  }
  return (
    <img
      src="/profile.jpg"
      alt={NAME}
      onError={() => setFailed(true)}
      className="neon-btn rounded-lg object-cover"
      style={{ width: size, height: size }}
    />
  );
}

// ---- App ---------------------------------------------------------------

export default function App() {
  const [theme, setTheme] = useState("dark");
  const [tab, setTab] = useState("Stack");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [booted, setBooted] = useState(false);
  const [bootStep, setBootStep] = useState(0);
  const typed = useTypedLines(TERMINAL_LINES);
  const [form, setForm] = useState({ nome: "", email: "", assunto: "", mensagem: "" });
  const [sendStatus, setSendStatus] = useState("idle"); // idle | sending | success | error
  const isDesktop = useIsDesktop();
  const mouse = useMouse(isDesktop);
  const active = useActiveSection(NAV_ITEMS.map((n) => n.id));

  const t = THEME[theme];

  useEffect(() => {
    if (bootStep >= BOOT_LINES.length) {
      const finish = setTimeout(() => setBooted(true), 350);
      return () => clearTimeout(finish);
    }
    const step = setTimeout(() => setBootStep((s) => s + 1), 420);
    return () => clearTimeout(step);
  }, [bootStep]);

  const toggleTheme = useCallback(() => setTheme((v) => (v === "dark" ? "light" : "dark")), []);

  const handleSend = async (e) => {
    e.preventDefault();
    setSendStatus("sending");
    try {
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        {
          nome: form.nome,
          email: form.email,
          assunto: form.assunto || "Contato pelo portfólio",
          mensagem: form.mensagem,
        },
        { publicKey: EMAILJS_PUBLIC_KEY }
      );
      setSendStatus("success");
      setForm({ nome: "", email: "", assunto: "", mensagem: "" });
    } catch (err) {
      console.error("Falha ao enviar via EmailJS:", err);
      setSendStatus("error");
    }
  };

  const scrollTo = (id) => (e) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const tiltStyle = {
    transform: `perspective(900px) rotateX(${(-mouse.ny * 6).toFixed(2)}deg) rotateY(${(mouse.nx * 8).toFixed(2)}deg)`,
  };

  return (
    <div
      style={{ background: t.bg, color: t.text }}
      className={`relative min-h-screen w-full font-sans transition-colors duration-500 selection:bg-cyan-500/30 ${isDesktop ? "cursor-none" : ""}`}
    >
      <style>{`
        html { scroll-behavior: smooth; }
        * { transition: background-color .4s ease, border-color .4s ease, color .3s ease; }
        @keyframes pulseDot { 0%,100%{opacity:1} 50%{opacity:.35} }
        .pulse-dot { animation: pulseDot 1.8s ease-in-out infinite; }
        @keyframes blinkCursor { 0%,49%{opacity:1} 50%,100%{opacity:0} }
        .blink { animation: blinkCursor 1s steps(1) infinite; }
        .grid-bg {
          background-image:
            linear-gradient(${t.gridLine} 1px, transparent 1px),
            linear-gradient(90deg, ${t.gridLine} 1px, transparent 1px);
          background-size: 42px 42px;
        }
        .mono { font-family: ui-monospace, "JetBrains Mono", Menlo, monospace; }
        .neon-card:hover { box-shadow: ${t.glow}; }
        .neon-btn { box-shadow: ${t.glow}; }
        .neon-ring { box-shadow: 0 0 0 1px ${t.accent}55, ${t.glow}; }
        .reveal { opacity: 0; transform: translateY(18px); transition: opacity .7s ease, transform .7s ease; }
        .reveal-visible { opacity: 1; transform: translateY(0); }

        .neon-cursor {
          position: fixed;
          top: 0; left: 0;
          pointer-events: none;
          z-index: 60;
          filter: drop-shadow(0 0 3px ${t.accent}) drop-shadow(0 0 9px ${t.accent}) drop-shadow(0 0 16px ${t.accent}aa);
        }

        @keyframes bootBar { from { width: 0% } to { width: 100% } }
        .boot-bar { animation: bootBar 1.9s ease forwards; }
      `}</style>

      {/* BOOT / SPA hydration overlay */}
      {!booted && (
        <div
          className="fixed inset-0 z-[90] flex flex-col items-center justify-center gap-4 mono text-sm"
          style={{ background: t.bg, color: t.accent }}
        >
          <ShieldCheck size={28} />
          <div className="w-64 space-y-1.5 text-left">
            {BOOT_LINES.slice(0, bootStep + 1).map((l, i) => (
              <div key={i} className="opacity-90">
                {"> "}
                {l}
              </div>
            ))}
          </div>
          <div className="h-1 w-64 overflow-hidden rounded-full" style={{ background: t.bgSoft }}>
            <div className="boot-bar h-full rounded-full" style={{ background: `linear-gradient(90deg, ${t.accent}, ${t.accent2})` }} />
          </div>
        </div>
      )}

      {/* cursor customizado: seta preta com brilho neon ao redor — só desktop, some quando o mouse sai da janela */}
      {isDesktop && (
        <svg
          className="neon-cursor"
          width="26"
          height="26"
          viewBox="0 0 26 26"
          style={{
            transform: `translate(${mouse.x - 2}px, ${mouse.y - 2}px)`,
            opacity: mouse.active ? 1 : 0,
            transition: "opacity .2s ease",
          }}
        >
          <path
            d="M3 2 L3 20 L8 15.5 L11.5 22.5 L14.5 21 L11 14 L18 14 Z"
            fill="#0a0a0a"
            stroke="#ffffff"
            strokeWidth="1.2"
            strokeLinejoin="round"
          />
        </svg>
      )}

      {/* spotlight seguindo o mouse — mesma regra: só desktop, some ao sair da janela */}
      {isDesktop && (
        <div
          className="pointer-events-none fixed inset-0 z-0 transition-opacity duration-300"
          style={{
            opacity: mouse.active ? 1 : 0,
            background: `radial-gradient(560px circle at ${mouse.x}px ${mouse.y}px, ${t.accent}1f, transparent 70%)`,
          }}
        />
      )}

      {/* NAV */}
      <header
        className="sticky top-0 z-30 border-b backdrop-blur"
        style={{ background: t.navBg, borderColor: t.border }}
      >
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-3">
            <PhotoBadge t={t} size={36} />
            <span className="font-semibold tracking-wide">{NAME.toUpperCase()}</span>
          </div>
          <div className="flex items-center gap-3 sm:gap-6">
            <nav className="hidden gap-8 text-sm sm:flex">
              {NAV_ITEMS.map((item) => (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  onClick={scrollTo(item.id)}
                  style={{ color: active === item.id ? t.accent : t.textMuted }}
                  className="font-medium transition-colors"
                >
                  {item.label}
                </a>
              ))}
            </nav>
            <button
              onClick={toggleTheme}
              aria-label="Alternar tema claro/escuro"
              className="flex h-9 w-9 items-center justify-center rounded-full border transition-colors"
              style={{ borderColor: t.border, color: t.textMuted }}
            >
              {theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
            </button>
            <button
              onClick={() => setMobileMenuOpen((v) => !v)}
              aria-label="Abrir menu"
              className="flex h-9 w-9 items-center justify-center rounded-full border transition-colors sm:hidden"
              style={{ borderColor: t.border, color: t.textMuted }}
            >
              {mobileMenuOpen ? <XIcon size={16} /> : <MenuIcon size={16} />}
            </button>
          </div>
        </div>

        {mobileMenuOpen && (
          <nav
            className="flex flex-col gap-1 border-t px-6 py-3 text-sm sm:hidden"
            style={{ borderColor: t.border, background: t.navBg }}
          >
            {NAV_ITEMS.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                onClick={scrollTo(item.id)}
                style={{ color: active === item.id ? t.accent : t.textMuted }}
                className="rounded-lg px-2 py-2.5 font-medium transition-colors"
              >
                {item.label}
              </a>
            ))}
          </nav>
        )}
      </header>

      {/* HERO */}
      <section className="grid-bg relative z-10 overflow-hidden border-b" style={{ borderColor: t.border }}>
        <div
          className="pointer-events-none absolute -top-32 right-0 h-96 w-96 rounded-full blur-3xl"
          style={{ background: `${t.accent}29`, transform: `translate(${mouse.nx * 24}px, ${mouse.ny * 24}px)` }}
        />
        <div
          className="pointer-events-none absolute bottom-0 left-0 h-72 w-72 rounded-full blur-3xl"
          style={{ background: `${t.accent2}24`, transform: `translate(${-mouse.nx * 18}px, ${-mouse.ny * 18}px)` }}
        />
        <div className="relative mx-auto grid max-w-6xl gap-12 px-5 py-14 sm:px-6 sm:py-20 lg:grid-cols-2 lg:items-center">
          <Reveal>
            <h1 className="text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl">
              Defesa vigilante.
              <br />
              Resposta rápida.
              <br />
              <span style={{ color: t.accent }}>
                Sinais que protegem.
              </span>
            </h1>
            <p className="mt-6 max-w-md" style={{ color: t.textMuted }}>
              {ROLE}, se especializando em NOC. Foco em detecção de ameaças, monitoramento de rede e resposta a incidentes, blue team no dia a dia.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <a
                href="#contato"
                onClick={scrollTo("contato")}
                className="neon-btn rounded-lg px-6 py-3 text-sm font-semibold transition-transform hover:scale-[1.03]"
                style={{ background: `linear-gradient(90deg, ${t.accent}, ${t.accent2})`, color: t.btnText }}
              >
                Falar comigo
              </a>
              <a
                href={CONTACTS.github}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-lg border px-6 py-3 text-sm font-semibold transition-colors"
                style={{ borderColor: t.border }}
              >
                Ver GitHub
              </a>
            </div>
            <div className="mt-10 flex flex-wrap gap-3">
              {[
                { icon: ShieldCheck, label: "Foco: Blue Team" },
                { icon: Radar, label: "Em especialização: NOC" },
                { icon: Terminal, label: "Stack: Linux & Python" },
              ].map(({ icon: Icon, label }) => (
                <div key={label} className="flex items-center gap-2 rounded-full border px-4 py-2 text-xs" style={{ borderColor: t.border, background: t.bgSoft }}>
                  <Icon size={14} style={{ color: t.accent }} />
                  {label}
                </div>
              ))}
            </div>
          </Reveal>

          {/* Terminal card — elemento assinatura */}
          <Reveal className="relative" style={tiltStyle}>
            <div
              className="absolute -inset-1 rounded-2xl blur-xl"
              style={{ background: `linear-gradient(135deg, ${t.accent}38, ${t.accent2}29)` }}
            />
            <div className="neon-ring relative rounded-2xl border shadow-2xl" style={{ borderColor: t.border, background: t.terminalBg }}>
              <div className="flex items-center gap-2 border-b border-white/5 px-4 py-3">
                <span className="h-2.5 w-2.5 rounded-full bg-red-400/70" />
                <span className="h-2.5 w-2.5 rounded-full bg-yellow-400/70" />
                <span className="h-2.5 w-2.5 rounded-full bg-green-400/70" />
                <span className="mono ml-2 text-xs text-slate-500">monitor.log</span>
              </div>
              <div className="h-52 space-y-2 overflow-hidden px-4 py-4 mono text-[13px]">
                {TERMINAL_LINES.map((line, i) => {
                  const shown = typed[i] || "";
                  const isCurrent = shown.length > 0 && shown.length < line.length;
                  const isAlert = line.includes("ALERT");
                  return shown ? (
                    <div key={i} style={{ color: isAlert ? t.terminalAlert : t.terminalText }}>
                      {shown}
                      {isCurrent && <span className="blink">▍</span>}
                    </div>
                  ) : null;
                })}
              </div>
              <div className="grid grid-cols-2 gap-3 border-t border-white/5 p-4">
                <div className="rounded-lg bg-white/[0.04] p-3">
                  <p className="text-[11px] uppercase tracking-wide" style={{ color: t.accent }}>Foco atual</p>
                  <p className="mt-1 text-xs text-slate-300">Detecção, resposta e monitoramento NOC</p>
                </div>
                <div className="rounded-lg bg-white/[0.04] p-3">
                  <p className="text-[11px] uppercase tracking-wide" style={{ color: t.accent }}>Stack principal</p>
                  <p className="mt-1 text-xs text-slate-300">Linux, Python, SIEM, SQL</p>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* VISÃO */}
      <section id="visao" className="relative z-10 border-b" style={{ borderColor: t.border }}>
        <div className="mx-auto grid max-w-6xl gap-12 px-5 py-14 sm:px-6 sm:py-20 lg:grid-cols-2">
          <Reveal>
            <p className="text-xs font-semibold uppercase tracking-widest" style={{ color: t.accent }}>Visão profissional</p>
            <h2 className="mt-3 text-3xl font-bold leading-snug sm:text-4xl">Uma defesa eficaz começa antes do primeiro alerta.</h2>
            <div className="mt-6 space-y-4" style={{ color: t.textMuted }}>
              {BIO.map((p, i) => <p key={i}>{p}</p>)}
            </div>
          </Reveal>

          <Reveal className="space-y-4">
            {FOCUS_CARDS.map((c) => (
              <div key={c.title} className="neon-card flex gap-4 rounded-xl border p-5" style={{ borderColor: t.border, background: t.card }}>
                <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full" style={{ background: `${t.accent}26` }}>
                  <Check size={16} style={{ color: t.accent }} />
                </div>
                <div>
                  <h3 className="font-semibold">{c.title}</h3>
                  <p className="mt-1 text-sm" style={{ color: t.textMuted }}>{c.desc}</p>
                </div>
              </div>
            ))}
          </Reveal>
        </div>
      </section>

      {/* EXPERTISE */}
      <section id="expertise" className="relative z-10 border-b" style={{ borderColor: t.border }}>
        <div className="mx-auto grid max-w-6xl gap-10 px-5 py-14 sm:px-6 sm:py-20 lg:grid-cols-[320px_1fr]">
          <Reveal>
            <p className="inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-semibold uppercase tracking-wide" style={{ borderColor: `${t.accent}59`, color: t.accent }}>
              <ShieldCheck size={12} /> Expertise
            </p>
            <h2 className="mt-4 text-3xl font-bold leading-tight">Capacidade técnica com leitura de ameaça real.</h2>
            <p className="mt-4" style={{ color: t.textMuted }}>
              A combinação entre suporte técnico, redes e segurança cria uma base sólida para atuar tanto na prevenção quanto na resposta e é essa base que sustenta minha transição para NOC.
            </p>
            <div className="mt-6 flex flex-wrap gap-2">
              {Object.keys(TABS).map((tabName) => (
                <button
                  key={tabName}
                  onClick={() => setTab(tabName)}
                  className="rounded-full px-4 py-2 text-xs font-semibold transition-colors"
                  style={
                    tab === tabName
                      ? { background: t.accent, color: t.btnText }
                      : { border: `1px solid ${t.border}`, color: t.textMuted }
                  }
                >
                  {tabName}
                </button>
              ))}
            </div>
          </Reveal>

          <Reveal className="space-y-6">
            <div className="grid gap-4 sm:grid-cols-2">
              {TABS[tab].map((item) => (
                <div key={item.title} className="neon-card rounded-xl border p-5" style={{ borderColor: t.border, background: t.card }}>
                  <h3 className="font-semibold">{item.title}</h3>
                  <p className="mt-2 text-sm" style={{ color: t.textMuted }}>{item.desc}</p>
                </div>
              ))}
            </div>

            <div className="rounded-xl border p-6" style={{ borderColor: t.border, background: t.card }}>
              <p className="text-xs font-semibold uppercase tracking-wide" style={{ color: t.accent }}>Tech radar</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {TECH_RADAR.map((tech) => (
                  <span key={tech} className="rounded-full border px-3 py-1.5 text-xs" style={{ borderColor: t.border, background: t.bgSoft }}>
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* PROJETOS */}
      <section id="projetos" className="relative z-10 border-b" style={{ borderColor: t.border }}>
        <div className="mx-auto max-w-6xl px-5 py-14 sm:px-6 sm:py-20">
          <Reveal>
            <p className="text-xs font-semibold uppercase tracking-widest" style={{ color: t.accent }}>Projetos em desenvolvimento</p>
            <h2 className="mt-3 max-w-2xl text-3xl font-bold leading-snug sm:text-4xl">Ferramentas construídas para detectar, registrar e responder.</h2>
          </Reveal>

          <Reveal className="mt-10 grid gap-6 sm:grid-cols-2">
            {PROJECTS.map((p) => (
              <div key={p.title} className="neon-card flex flex-col rounded-2xl border p-6" style={{ borderColor: t.border, background: t.card }}>
                <span className="w-fit rounded-full border px-3 py-1 text-[11px] font-semibold uppercase tracking-wide" style={{ borderColor: t.border, color: t.textMuted }}>
                  {p.tag}
                </span>
                <h3 className="mt-4 text-xl font-bold">{p.title}</h3>
                <p className="mt-3 flex-1 text-sm leading-relaxed" style={{ color: t.textMuted }}>{p.desc}</p>
                <div className="mt-5 flex flex-wrap gap-2">
                  {p.tags.map((tg) => (
                    <span key={tg} className="rounded-full px-3 py-1 text-xs font-medium" style={{ background: `${t.accent}24`, color: t.accent }}>
                      {tg}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </Reveal>
        </div>
      </section>

      {/* CONTATO */}
      <section id="contato" className="relative z-10">
        <div className="mx-auto max-w-6xl px-5 py-14 sm:px-6 sm:py-20">
          <Reveal className="grid gap-6 lg:grid-cols-[320px_1fr]">
            <div className="flex flex-col justify-between rounded-2xl border p-6" style={{ borderColor: t.border, background: t.card }}>
              <div>
                <PhotoBadge t={t} size={56} />
                <h3 className="mt-4 text-lg font-semibold">Vamos nos conectar</h3>
                <div className="mt-4 flex gap-3">
                  {[
                    { href: CONTACTS.github, icon: <GithubIcon /> },
                    { href: CONTACTS.linkedin, icon: <LinkedinIcon /> },
                    { href: CONTACTS.whatsapp, icon: <WhatsAppIcon /> },
                    { href: `mailto:${CONTACTS.email}`, icon: <Mail size={16} /> },
                  ].map((link, i) => (
                    <a key={i} href={link.href} target="_blank" rel="noopener noreferrer" className="flex h-9 w-9 items-center justify-center rounded-full border transition-colors" style={{ borderColor: t.border, color: t.textMuted }}>
                      {link.icon}
                    </a>
                  ))}
                </div>
              </div>

              <div className="mt-8 border-t pt-6" style={{ borderColor: t.border }}>
                <p className="text-[11px] font-semibold uppercase tracking-wide" style={{ color: t.textMuted }}>Base</p>
                <p className="mt-1 flex items-center gap-2 text-sm">
                  <MapPin size={14} style={{ color: t.accent }} /> São Paulo, Brasil
                </p>
                <div className="mt-4 flex items-center gap-2 text-sm text-emerald-400">
                  <span className="pulse-dot h-2 w-2 rounded-full bg-emerald-400" />
                  Disponível para oportunidades
                </div>
              </div>
            </div>

            <div className="rounded-2xl border p-6 sm:p-8" style={{ borderColor: t.border, background: t.card }}>
              <p className="text-xs font-semibold uppercase tracking-widest" style={{ color: t.accent }}>Contato direto</p>
              <h3 className="mt-2 text-2xl font-bold">Fale comigo por aqui</h3>
              <p className="mt-2 text-sm" style={{ color: t.textMuted }}>Empresas, recrutadores e clientes podem enviar uma mensagem por este formulário.</p>

              <form onSubmit={handleSend} className="mt-6 grid gap-4 sm:grid-cols-2">
                {[
                  { key: "nome", label: "Nome", placeholder: "Seu nome", type: "text", span: 1 },
                  { key: "email", label: "E-mail", placeholder: "voce@empresa.com", type: "email", span: 1 },
                  { key: "assunto", label: "Assunto", placeholder: "Ex.: oportunidade, projeto, parceria", type: "text", span: 2 },
                ].map((f) => (
                  <label key={f.key} className={`block text-xs font-semibold uppercase tracking-wide ${f.span === 2 ? "sm:col-span-2" : ""}`} style={{ color: t.textMuted }}>
                    {f.label}
                    <input
                      type={f.type}
                      value={form[f.key]}
                      onChange={(e) => setForm({ ...form, [f.key]: e.target.value })}
                      placeholder={f.placeholder}
                      className="mt-2 w-full rounded-lg border px-4 py-3 text-sm outline-none"
                      style={{ borderColor: t.border, background: t.bgSoft, color: t.text }}
                    />
                  </label>
                ))}
                <label className="block text-xs font-semibold uppercase tracking-wide sm:col-span-2" style={{ color: t.textMuted }}>
                  Mensagem
                  <textarea
                    rows={4}
                    value={form.mensagem}
                    onChange={(e) => setForm({ ...form, mensagem: e.target.value })}
                    placeholder="Conte um pouco sobre a oportunidade, projeto ou motivo do contato."
                    className="mt-2 w-full resize-none rounded-lg border px-4 py-3 text-sm outline-none"
                    style={{ borderColor: t.border, background: t.bgSoft, color: t.text }}
                  />
                </label>
                <button
                  type="submit"
                  disabled={sendStatus === "sending"}
                  className="neon-btn mt-2 flex w-fit items-center gap-2 rounded-lg px-6 py-3 text-sm font-semibold transition-transform hover:scale-[1.02] disabled:opacity-60 disabled:hover:scale-100 sm:col-span-2"
                  style={{ background: `linear-gradient(90deg, ${t.accent}, ${t.accent2})`, color: t.btnText }}
                >
                  <Send size={15} /> {sendStatus === "sending" ? "Enviando..." : "Enviar mensagem"}
                </button>
                {sendStatus === "success" && (
                  <p className="text-sm sm:col-span-2" style={{ color: t.accent }}>
                    Mensagem enviada. Retorno em breve.
                  </p>
                )}
                {sendStatus === "error" && (
                  <p className="text-sm text-red-400 sm:col-span-2">
                    Não deu pra enviar agora. Tenta de novo em instantes ou usa o e-mail direto.
                  </p>
                )}
              </form>
            </div>
          </Reveal>
        </div>
      </section>

      <footer className="relative z-10 border-t py-8" style={{ borderColor: t.border }}>
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 px-6 text-xs sm:flex-row" style={{ color: t.textMuted }}>
          <span>© 2026 {NAME}</span>
          <a href="#" onClick={scrollTo("visao")} className="flex items-center gap-1">
            Voltar ao topo <ArrowUpRight size={12} />
          </a>
        </div>
      </footer>
    </div>
  );
}