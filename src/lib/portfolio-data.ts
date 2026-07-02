export type SkillGroup = { title: string; gradient: string; items: { name: string; pct: number; warn?: boolean }[] };

export const profile = {
  name: "Fatima Rehman",
  role: "GRAPHIC DESIGNER · CYBERSECURITY SOPHOMORE · AI RESEARCHER",
  initials: "FR",
  bio: "Creative graphic designer and cybersecurity sophomore at GIKI. I craft compelling brand identities, UI/UX prototypes, and social media visuals using Canva, Figma, and the Adobe Suite — bridging aesthetics with technical precision. Also an active AI researcher working on EEG-based Alzheimer's classification, and an offensive security enthusiast comfortable with Burp Suite, Wireshark, and Kali Linux.",
  tags: [
    { label: "Graphic Design", cls: "tag-pink" },
    { label: "Brand Identity", cls: "tag-pink" },
    { label: "UI/UX Design", cls: "tag-purple" },
    { label: "Canva · Figma", cls: "tag-orange" },
    { label: "Cybersecurity", cls: "tag-cyan" },
    { label: "AI Researcher", cls: "tag-green" },
    { label: "Full-Stack Dev", cls: "tag-green" },
    { label: "Linux", cls: "tag-orange" },
  ],
  stats: [
    { val: "6+", lbl: "PROJECTS" },
    { val: "2×", lbl: "NAT. CHAMPION" },
    { val: "4+", lbl: "DESIGN WORKS" },
  ],
  contact: {
    email: "fatta929@gmail.com",
    location: "Abbottabad, Pakistan",
    school: "GIKI — BS Cybersecurity",
    linkedin: "linkedin.com/in/fatima-rehman09",
    github: "github.com/fatimaatta-09",
  },
};

export const skills: SkillGroup[] = [
  { title: "SECURITY", gradient: "linear-gradient(90deg,var(--cyan),var(--cyan2))", items: [
    { name: "Burp Suite", pct: 75 }, { name: "Wireshark", pct: 70 },
    { name: "OWASP ZAP", pct: 65 }, { name: "GoPhish", pct: 60 },
  ]},
  { title: "PROGRAMMING", gradient: "linear-gradient(90deg,var(--purple),var(--purple2))", items: [
    { name: "Python", pct: 80 }, { name: "C++", pct: 72 },
    { name: "SQL / Postgres", pct: 68 }, { name: "HTML / CSS", pct: 75 },
  ]},
  { title: "AI / ML", gradient: "linear-gradient(90deg,var(--green),var(--cyan))", items: [
    { name: "EEG Processing", pct: 78 }, { name: "SVM / RF", pct: 70 },
    { name: "Deep Learning", pct: 30, warn: true },
  ]},
  { title: "DEVOPS", gradient: "linear-gradient(90deg,var(--orange),var(--yellow))", items: [
    { name: "Linux / Bash", pct: 72 }, { name: "Docker", pct: 60 }, { name: "Git / GitHub", pct: 75 },
  ]},
];

export type Project = {
  title: string;
  desc: string;
  bullets?: string[];
  stack?: string[];
  blueprint?: string[];
  tags: [string, string][];
  award?: string;
  repo?: string;
  demo?: string;
};
export const projects: Project[] = [
  { title: "⏱ Temporal Instruction Micro-Engine", desc: "Compact instruction scheduler exploring time-sliced micro-ops — a research-grade engine focused on deterministic ordering.", blueprint: ["PARSE OPS", "TIME SLICE", "DISPATCH", "TRACE LOG"], tags: [["C++","tag-cyan"],["Systems","tag-orange"],["Research","tag-purple"]], repo: "https://github.com/fatimaatta-09/Temporal-Instruction-Micro-Engine-" },
  { title: "💚 SerenityCare", desc: "Collaborative full-stack care platform — appointment flows, patient records, and a calming, accessible interface.", blueprint: ["CLIENT UI", "REST API", "AUTH", "DATABASE"], tags: [["Full-Stack","tag-green"],["UI/UX","tag-purple"],["Healthcare","tag-cyan"]], repo: "https://github.com/alikamran21/Serenitycare" },
  {
    title: "🤖 Bibble — Autonomous Intruder Detection Robot",
    desc: "Firmware + hardware architecture for an autonomous tracking robot on the Arduino Mega 2560. Actively tracks human motion while concurrently processing real-time environmental data for dynamic obstacle avoidance.",
    bullets: [
      "Architected a modular C++ framework using strict OOP — unified base class for polymorphic sensor management and encapsulated hardware states.",
      "Centralized MotorController class coordinating sensor polling, prioritizing omnidirectional PIR motion inputs over HC-SR04 ultrasonic and IR collision data.",
      "Hardware integration layer mapping a dual H-Bridge L298N motor driver across a 7-node sensor array, with iterative threshold calibration to mitigate noisy data.",
    ],
    stack: ["C++", "OOP", "Embedded Systems", "Sensor Fusion", "Arduino", "Hardware Integration"],
    blueprint: ["PIR ARRAY", "MEGA 2560", "MOTOR CTRL", "L298N DRIVE"],
    tags: [["C++","tag-cyan"],["Embedded","tag-orange"],["OOP","tag-purple"]],
    repo: "https://github.com/fatimaatta-09/Bibble-Intruder-Detector",
  },
  {
    title: "🧬 Behavioral Fingerprint IDS (BFIDS)",
    desc: "Custom behavioral anomaly detection system built from scratch in pure C++ to identify insider threats by analyzing unique user behavioral fingerprints — bypassing the limits of static heuristics.",
    bullets: [
      "Algorithmic framework without external ML libraries: Tries (prefix trees) for command-sequence mapping and adjacency-list graphs for user action transitions.",
      "Active detection pipeline using Dynamic Programming (Edit Distance) and Dijkstra's shortest-path to compute behavioral similarity and deviation costs across live sessions.",
      "High-efficiency storage engine: AVL trees for balanced profile scaling and hash tables for O(1) fingerprint mapping.",
      "Dynamic threat-alert architecture with Min/Max heaps to rank anomaly scores and trigger priority alerts for system administrators.",
    ],
    stack: ["C++", "DSA", "Threat Detection", "Graph Theory", "Algorithm Optimization"],
    blueprint: ["TELEMETRY", "TRIE + GRAPH", "DP / DIJKSTRA", "HEAP ALERTS"],
    tags: [["C++","tag-cyan"],["IDS","tag-cyan"],["Research","tag-purple"]],
    repo: "https://github.com/alikamran21/Behavioral-Fingerprint-Based-Intrusion-Detection-System",
  },
  { title: "👁 AI-Based Face Recognition Web", desc: "Browser-based face recognition with live webcam capture, embeddings matching, and a clean web dashboard for managing known faces.", blueprint: ["WEBCAM", "FACE EMBED", "VECTOR MATCH", "WEB UI"], tags: [["Python","tag-purple"],["OpenCV","tag-purple"],["Web","tag-green"]], repo: "https://github.com/fatimaatta-09/AI-Based-Face-Recognition-Web" },
  { title: "🚀 Line Following Robot", desc: "High-speed precision IR sensor tracking with PID-style motor control.", blueprint: ["IR ARRAY", "ARDUINO MCU", "PID CTRL", "DUAL MOTORS"], tags: [["Arduino","tag-orange"],["IR Sensors","tag-orange"]], award: "🏆 1st Place — National Electronics Olympiad 2024" },
];


export type SkillNode = { id: string; label: string; tip: string };
export type SkillBranch = { id: string; label: string; color: string; nodes: SkillNode[] };
export const skillTree: SkillBranch[] = [
  { id: "sec", label: "SECURITY", color: "var(--cyan)", nodes: [
    { id: "burp", label: "Burp Suite", tip: "Web app pen-testing — intercepting proxy, repeater & intruder for OWASP Top 10 hunts." },
    { id: "wshark", label: "Wireshark", tip: "Packet capture & protocol analysis for network forensics on Kali Linux." },
    { id: "zap", label: "OWASP ZAP", tip: "Automated security scans baked into my dev workflow." },
    { id: "nmap", label: "Nmap", tip: "Recon & service enumeration on CTF targets and home-lab networks." },
  ]},
  { id: "ai", label: "AI / ML", color: "var(--purple)", nodes: [
    { id: "eeg", label: "EEG Processing", tip: "Bandpass filtering, artifact removal & frequency-band features for Alzheimer's research (97.71% acc)." },
    { id: "svm", label: "SVM / RF", tip: "Classical ML classifiers used in my published-track neuro-AI paper." },
    { id: "py-ai", label: "Python · scikit", tip: "Daily driver for ML pipelines, PsychoPy experiment scripts & data analysis." },
  ]},
  { id: "dev", label: "DEV", color: "var(--green)", nodes: [
    { id: "py", label: "Python", tip: "Flask APIs, security tooling, and ML — my most-used language." },
    { id: "cpp", label: "C++", tip: "DSA-heavy security tools and embedded robotics firmware." },
    { id: "sql", label: "SQL / Postgres", tip: "Schema design, indexing and parameterized queries against injection." },
    { id: "web", label: "Web / React", tip: "Modern full-stack UIs — HTML, CSS, JS/React on top of REST APIs." },
  ]},
  { id: "soft", label: "SOFT SKILLS", color: "var(--pink)", nodes: [
    { id: "comm", label: "Communication", tip: "Clear technical writing & confident presenting — from research papers to demo days." },
    { id: "team", label: "Team Collaboration", tip: "Pair-programmed BFIDS and SerenityCare end-to-end; comfortable in cross-functional squads." },
    { id: "lead", label: "Leadership", tip: "Captained the robotics team to two national titles — recruiting, planning, and shipping under pressure." },
    { id: "solve", label: "Problem Solving", tip: "First-principles thinker; love decomposing messy systems (CTFs, EEG pipelines) into clean modules." },
    { id: "adapt", label: "Adaptability", tip: "Picked up Burp, PsychoPy, and embedded C++ inside one semester each — fast ramp on new stacks." },
    { id: "time", label: "Time Management", tip: "Juggling research, coursework, CTFs, and side projects — Notion + tight sprints keep it on rails." },
  ]},
];



export const tools = [
  ["🎨","Canva"],["🖌","Figma"],["🖋","Typography"],["📐","Layout & Grid"],
  ["✨","Brand Identity"],["📱","UI/UX Design"],["🎞","Visual Storytelling"],["💡","Creative Strategy"],
  ["🔓","Burp Suite"],["🦈","Wireshark"],["🕷","OWASP ZAP"],["🎣","GoPhish"],
  ["🐉","Kali Linux"],["🔭","Nmap"],["🐳","Docker"],["🐧","Linux Bash"],
  ["🐙","Git / GitHub"],["🐍","Python"],["🧠","PsychoPy"],["📊","Jira"],
] as [string,string][];

export type Cert = {
  kind: string; icon: string; bg: string; name: string; org: string;
  status: string; statusCls: string; link?: string;
};
export const certs: Cert[] = [
  { kind: "AWARDS", icon: "🥇", bg: "rgba(255,215,0,0.12)", name: "Obstacle Avoidance Robot — 1st Place", org: "GIKI Innovation Summit", status: "FEB 2025", statusCls: "status-done" },
  { kind: "AWARDS", icon: "🥇", bg: "rgba(255,215,0,0.12)", name: "Line Following Robot — 1st Place", org: "National Electronics Olympiad", status: "DEC 2024", statusCls: "status-done" },
  { kind: "RESEARCH", icon: "🧠", bg: "rgba(139,92,246,0.12)", name: "EEG Alzheimer's Classification (97.71%)", org: "Air University NeuroImaging Lab", status: "IN PROGRESS", statusCls: "status-prog", link: "https://www.linkedin.com/in/fatima-rehman09" },
  { kind: "CERTIFICATION", icon: "🐧", bg: "rgba(16,240,128,0.12)", name: "Linux Commands & Shell Scripting Essentials V2", org: "Credly", status: "VERIFIED", statusCls: "status-done", link: "https://www.credly.com/badges/b9b4d1d7-9437-4113-ae05-78466f5cd676/linked_in?t=t780bv" },
  { kind: "CERTIFICATION", icon: "🛡", bg: "rgba(0,200,255,0.12)", name: "ISO/IEC 27001 Information Security Associate™", org: "SkillFront", status: "VERIFIED", statusCls: "status-done", link: "https://www.skillfront.com/Badges/89075189489789" },
  { kind: "CERTIFICATION", icon: "🐙", bg: "rgba(139,92,246,0.12)", name: "GitHub Foundations", org: "DataCamp", status: "VERIFIED", statusCls: "status-done", link: "https://www.datacamp.com/completed/statement-of-accomplishment/track/aeb4916d32e1ab8abe025159520ceb4fad9c21ee" },
  { kind: "CERTIFICATION", icon: "🛰", bg: "rgba(255,64,96,0.12)", name: "Security Operations Center Student Program", org: "SOC Student Program", status: "VERIFIED", statusCls: "status-done", link: "https://www.linkedin.com/in/fatima-rehman09/details/certifications/" },
  { kind: "CERTIFICATION", icon: "📖", bg: "rgba(16,240,128,0.12)", name: "Open Source Software Development Methods", org: "Coursera", status: "VERIFIED", statusCls: "status-done", link: "https://www.coursera.org/account/accomplishments/verify/4JO366ZQ2JA0" },
  { kind: "CERTIFICATION", icon: "🐍", bg: "rgba(0,200,255,0.12)", name: "Python Data Structures", org: "Coursera", status: "VERIFIED", statusCls: "status-done", link: "https://www.coursera.org/account/accomplishments/verify/JF9PGOSDH75B" },
  { kind: "CERTIFICATION", icon: "🐧", bg: "rgba(16,240,128,0.12)", name: "Hands-on Introduction to Linux Commands & Shell Scripting", org: "Coursera", status: "VERIFIED", statusCls: "status-done", link: "https://www.coursera.org/account/accomplishments/verify/XDD0GG1HSV92" },
  { kind: "CERTIFICATION", icon: "👁", bg: "rgba(139,92,246,0.12)", name: "Computer Vision with OpenCV: Beginner to Intermediate", org: "OpenCV", status: "VERIFIED", statusCls: "status-done", link: "https://courses.opencv.org/certificates/fd832c66831d4519b87470ed7a874fac" },
  { kind: "CERTIFICATION", icon: "🐍", bg: "rgba(255,215,0,0.12)", name: "Programming for Everybody (Getting Started with Python)", org: "Coursera", status: "VERIFIED", statusCls: "status-done", link: "https://www.coursera.org/account/accomplishments/verify/K8C67ZB45ZT5" },
  { kind: "EDUCATION", icon: "🎓", bg: "rgba(0,200,255,0.12)", name: "BS Cybersecurity", org: "GIKI · 2024–2028", status: "ENROLLED", statusCls: "status-done", link: "https://giki.edu.pk" },
  { kind: "PLANNED", icon: "📜", bg: "rgba(255,255,255,0.05)", name: "CompTIA Security+", org: "Self-study track", status: "PLANNED", statusCls: "status-plan", link: "https://www.comptia.org/certifications/security" },
];

// ── Design Projects ─────────────────────────────────────────────────────────
export type DesignProject = {
  id: string;
  title: string;
  category: "branding" | "uiux" | "motion" | "social" | "daily";
  desc: string;
  tools: string[];
  image: string;
  images?: string[];
  highlights: string[];
  color: string;
  badge?: string;
};

export const designProjects: DesignProject[] = [
  // ── RESTAURANT SOCIAL MEDIA (pinned first — real AI-assisted client work) ──
  {
    id: "restaurant-social",
    title: "Restaurant Social Media Pack",
    category: "social",
    badge: "REAL CLIENT WORK · AI-ASSISTED",
    desc: "Full social media content system for a local restaurant — scroll-stopping Instagram posts, Stories, menu highlights and weekend promos. Designed end-to-end using Canva + AI image generation for a genuine small-business brand voice.",
    tools: ["Canva", "Figma"],
    image: "/design/restaurant-insta-post.png",
    images: [
      "/design/restaurant-insta-post.png",
      "/design/restaurant-story.png",
      "/design/restaurant-menu.png",
      "/design/restaurant-promo.png",
      "/design/restaurant-grid.png",
    ],
    highlights: [
      "Instagram feed post — moody dark aesthetic, bold editorial typography",
      "Story template — retro-modern pizza night, Gen-Z energy",
      "Menu carousel slide — clean split-layout with food photography",
      "Weekend promo post — bright & funky, tacos + Happy Hour badge",
      "Full 9-grid Instagram feed plan — cohesive warm-tone visual identity",
    ],
    color: "#FF6B35",
  },
  // ── USER'S REAL DESIGNS ──
  {
    id: "farewell-invite",
    title: "Farewell Invitation",
    category: "daily",
    badge: "MY ORIGINAL DESIGN",
    desc: "A warm, vintage-style farewell invitation design for the Cyber Security batch at GIKI. Features elegant script typography, layered textured backgrounds, and a cohesive warm color palette.",
    tools: ["Canva"],
    image: "/design/farewell.png",
    highlights: [
      "Vintage textured aesthetic with floral and stamp elements",
      "Elegant script typography for the main heading",
      "Personalized message layout with clear event details",
    ],
    color: "#D4A373",
  },
  {
    id: "batch35-poster",
    title: "Welcome Batch 35 Poster",
    category: "daily",
    badge: "MY ORIGINAL DESIGN",
    desc: "A bold, energetic poster welcoming Batch 35. Features a striking red smoke effect, tech-inspired background elements, and fun robot characters wearing fedoras and sunglasses.",
    tools: ["Canva"],
    image: "/design/batch35.png",
    highlights: [
      "High-contrast red and white typography on a tech-themed background",
      "Dynamic red smoke visual element",
      "Playful robot characters reflecting the tech/cyber theme",
    ],
    color: "#C1121F",
  },
  // ── EVERYDAY DESIGNS ──
  {
    id: "everyday-designs",
    title: "Everyday Canva Designs",
    category: "daily",
    badge: "REAL EVERYDAY WORK · CANVA",
    desc: "The real stuff — college event flyers, birthday posts, cafe daily specials, and quote templates. These are the designs people actually build themselves for their societies, friends, and small pages.",
    tools: ["Canva", "Figma"],
    image: "/design/everyday-event-flyer.png",
    images: [
      "/design/everyday-event-flyer.png",
      "/design/everyday-birthday.png",
      "/design/everyday-cafe.png",
      "/design/everyday-quote.png",
    ],
    highlights: [
      "College Culture Fest 2025 poster — navy + gold, flat Canva layout",
      "Birthday celebration post — pastel flat design for WhatsApp/Instagram",
      "Neighbourhood cafe daily special — warm tones, handwritten-feel",
      "Motivational quote template — lavender minimal, personal brand style",
    ],
    color: "#A855F7",
  },
  {
    id: "brand-identity",
    title: "Brand Identity System",
    category: "branding",
    desc: "End-to-end brand identity: logo design, color palette, typography scale, and a full brand guidelines document — built in Canva & Illustrator.",
    tools: ["Canva", "Adobe Illustrator", "Figma"],
    image: "/design/brand-identity.png",
    highlights: [
      "Geometric logo mark with 3 variants (primary, mono, icon)",
      "Curated 5-color palette with accessibility-checked contrast ratios",
      "Typographic system: Display / Body / Caption hierarchy",
      "Brand guidelines PDF: 12-page style guide",
    ],
    color: "#FFD740",
  },
  {
    id: "social-media-pack",
    title: "Social Media Campaign Pack",
    category: "branding",
    desc: "A cohesive social media design system — Instagram posts, LinkedIn banners, story templates, and carousel layouts in a trendy 2025 aesthetic.",
    tools: ["Canva", "Adobe Photoshop"],
    image: "/design/social-media-pack.png",
    highlights: [
      "12-post Instagram grid with coral-to-violet gradient system",
      "3 carousel templates with bold editorial typography",
      "LinkedIn banner + profile photo frame kit",
      "Animated story templates (GIF export)",
    ],
    color: "#FF4081",
  },
  {
    id: "mobile-app-ui",
    title: "Wellness App UI/UX Prototype",
    category: "uiux",
    desc: "High-fidelity mobile app prototype for a wellness/lifestyle app — full design from wireframes to interactive Figma prototype with dark mode.",
    tools: ["Figma", "Adobe XD", "Procreate"],
    image: "/design/mobile-app-ui.png",
    highlights: [
      "User research → persona → information architecture",
      "Lo-fi wireframes to hi-fi screens (20+ screens)",
      "Interactive Figma prototype with micro-animations",
      "Dark mode UI: glassmorphism + purple-cyan gradient system",
    ],
    color: "#7C4DFF",
  },
  {
    id: "motion-graphics",
    title: "Motion Graphics Campaign",
    category: "motion",
    desc: "Cyberpunk-meets-editorial motion graphics concept: animated poster series with glitch effects, neon typography, and layered visual storytelling.",
    tools: ["Adobe After Effects", "Adobe Photoshop", "Canva"],
    image: "/design/motion-graphics.png",
    highlights: [
      "3-poster series with unified neon cyberpunk aesthetic",
      "Glitch text animation loops (3-5 sec GIFs)",
      "Chromatic aberration + grain texture treatment",
      "Storyboard: 8-frame motion design narrative",
    ],
    color: "#00E5FF",
  },
];

export const dockItems = [
  { id: "terminal", icon: "💻", label: "Terminal", bg: "linear-gradient(135deg,rgba(110,231,183,0.5),rgba(125,211,252,0.4))" },
  { id: "about", icon: "👤", label: "About", bg: "linear-gradient(135deg,rgba(125,211,252,0.5),rgba(167,139,250,0.4))" },
  { id: "skills", icon: "⚡", label: "Skills", bg: "linear-gradient(135deg,rgba(167,139,250,0.5),rgba(244,114,182,0.4))" },
  { id: "projects", icon: "🗂", label: "Projects", bg: "linear-gradient(135deg,rgba(125,211,252,0.5),rgba(110,231,183,0.4))" },
  { id: "design", icon: "🎨", label: "Design", bg: "linear-gradient(135deg,rgba(255,64,129,0.5),rgba(252,211,77,0.4))" },
  { sep: true } as never,
  { id: "tools", icon: "🛡", label: "Tools", bg: "linear-gradient(135deg,rgba(248,113,113,0.5),rgba(251,146,60,0.4))" },
  { id: "research", icon: "🧠", label: "Research", bg: "linear-gradient(135deg,rgba(167,139,250,0.5),rgba(125,211,252,0.4))" },
  { id: "certs", icon: "🏆", label: "Certs", bg: "linear-gradient(135deg,rgba(252,211,77,0.55),rgba(251,146,60,0.4))" },
  { sep: true } as never,
  { id: "contact", icon: "✉", label: "Contact", bg: "linear-gradient(135deg,rgba(110,231,183,0.45),rgba(125,211,252,0.35))" },
  { id: "resume", icon: "📄", label: "Resume", bg: "linear-gradient(135deg,rgba(252,211,77,0.45),rgba(251,191,36,0.35))" },
];

export const desktopIcons = [
  { id: "about", icon: "👤", label: "About Me", bg: "linear-gradient(135deg,rgba(125,211,252,0.45),rgba(167,139,250,0.4))" },
  { id: "design", icon: "🎨", label: "Design", bg: "linear-gradient(135deg,rgba(255,64,129,0.45),rgba(252,211,77,0.4))" },
  { id: "skills", icon: "⚡", label: "Skills", bg: "linear-gradient(135deg,rgba(167,139,250,0.45),rgba(244,114,182,0.4))" },
  { id: "certs", icon: "🏆", label: "Certs", bg: "linear-gradient(135deg,rgba(252,211,77,0.45),rgba(251,146,60,0.4))" },
  { id: "contact", icon: "✉", label: "Hire Me", bg: "linear-gradient(135deg,rgba(110,231,183,0.45),rgba(125,211,252,0.4))" },
];

export const defaultPositions: Record<string, { x: number; y: number; w: number; h: number }> = {
  terminal: { x: 20, y: 10, w: 460, h: 320 },
  about: { x: 60, y: 30, w: 380, h: 460 },
  skills: { x: 100, y: 50, w: 360, h: 420 },
  projects: { x: 140, y: 20, w: 420, h: 460 },
  design: { x: 60, y: 20, w: 520, h: 520 },
  tools: { x: 180, y: 40, w: 380, h: 360 },
  certs: { x: 220, y: 60, w: 400, h: 420 },
  research: { x: 260, y: 30, w: 420, h: 380 },
  contact: { x: 300, y: 50, w: 360, h: 460 },
  resume: { x: 80, y: 20, w: 560, h: 520 },
};

export const windowTitles: Record<string, string> = {
  terminal: "💻 terminal — fr@kali-portfolio",
  about: "👤 about — fatima_rehman.profile",
  skills: "⚡ skills — technical_arsenal",
  projects: "🗂 projects — github.com/fatimaatta-09",
  design: "🎨 design — portfolio.creative",
  tools: "🛡 tools — /usr/bin/",
  certs: "🏆 certifications — /certs/",
  research: "🧠 research — neuro_ai_lab",
  contact: "✉ contact — send_message.sh",
  resume: "📄 resume — fatima_rehman.pdf",
};
