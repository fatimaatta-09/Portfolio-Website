/**
 * FR-OS PORTFOLIO — CONFIG
 * ========================
 * This is the ONLY file you edit to update content or set up forms.
 * No email address appears in any other file.
 *
 * FORM SETUP (free, no backend needed):
 * ─────────────────────────────────────
 * 1. Go to https://web3forms.com
 * 2. Enter your email → get an Access Key
 * 3. Paste it below as FORM_KEY
 * 4. Your email stays private — never in the repo
 *
 * PAPER LINK:
 * ─────────────
 * Set PAPER_LINK to your DOI URL when published.
 * Leave as "" to hide the button.
 */

window.CFG = {

  /* ── Identity ──────────────────────────────────────────── */
  name:       "Fatima Rehman",
  title:      "Cybersecurity · AI Research · Web Development",
  university: "GIKI — BS Cybersecurity (2024–2028)",
  location:   "Abbottabad, Pakistan · Open to remote",

  /* ── Public profile links (safe to commit) ─────────────── */
  github:   "https://github.com/fatimaatta-09",
  linkedin: "https://linkedin.com/in/fatima-rehman09",

  /* ── Form endpoint (Web3Forms — email never in code) ────── */
  /* Get your key at https://web3forms.com — free, no backend */
  FORM_KEY: "YOUR_WEB3FORMS_ACCESS_KEY_HERE",

  /* ── Research paper DOI (set when published) ────────────── */
  PAPER_LINK: "",   /* e.g. "https://doi.org/10.xxxx/xxxxx" */

  /* ── Stats shown in About window ────────────────────────── */
  stats: [
    { value: "97.71%", label: "ML Accuracy"   },
    { value: "2×",     label: "Nat. Champion" },
    { value: "6",      label: "Certs Earned"  },
  ],

  /* ── Projects ───────────────────────────────────────────── */
  projects: [
    {
      title:  "Behavioral Anomaly Detection System",
      badge:  "SECURITY",
      color:  "cyan",
      desc:   "C++ DSA-based terminal security tool. Hash maps, queues, and threshold trees detect suspicious behavior in real time. Auto-triggers system shutdown at critical threat levels. Runs on Linux and Windows.",
      tech:   ["C++", "DSA", "Linux", "Windows"],
      github: "https://github.com/alikamran21/Behavioral-Fingerprint-Based-Intrusion-Detection-System.git",
      live:   "",
      award:  "",
    },
    {
      title:  "Face Recognition Access Control",
      badge:  "AI / CV",
      color:  "purple",
      desc:   "OpenCV Haar Cascade + LBPH on Raspberry Pi. Full pipeline from camera input to face recognition to servo-controlled door lock.",
      tech:   ["Python", "OpenCV", "Raspberry Pi", "Servo"],
      github: "https://github.com/fatimaatta-09/AI-Based-Face-Recognition-Web.git",
      live:   "",
      award:  "",
    },
    {
      title:  "Python Web Applications ×2",
      badge:  "WEB DEV",
      color:  "green",
      desc:   "Three full-stack apps with Flask backend, HTML/CSS frontend, PostgreSQL database. Authentication, schema design, REST APIs.",
      tech:   ["Python", "Flask", "PostgreSQL", "HTML/CSS"],
      github: ["https://github.com/fatimaatta-09/Temporal-Instruction-Micro-Engine-.git",
        "https://github.com/alikamran21/Serenitycare.git"],
      live:   "",
      award:  "",
    },
    {
      title:  "Obstacle Avoidance Robot",
      badge:  "ROBOTICS",
      color:  "orange",
      desc:   "Arduino + ultrasonic sensor autonomous navigation in dynamic environments with custom C++ pathfinding logic.",
      tech:   ["Arduino", "C++", "Ultrasonic Sensor"],
      github: "https://github.com/fatimaatta-09/Bibble-Intruder-Detector.git",
      live:   "",
      award:  "1st Place — GIKI Innovation Summit, Feb 2025",
    },
    {
      title:  "Line Following Robot",
      badge:  "ROBOTICS",
      color:  "orange",
      desc:   "High-speed precision IR sensor tracking with motor control for competitive-grade performance.",
      tech:   ["Arduino", "C++", "IR Sensors"],
      github: "",
      live:   "",
      award:  "1st Place — National Electronics Olympiad, Dec 2024",
    },
    {
      title:  "Motion Detection Surveillance Robot",
      badge:  "SECURITY",
      color:  "cyan",
      desc:   "PIR sensor-driven real-time surveillance robot with intelligent directional tracking and alert output.",
      tech:   ["Arduino", "C++", "PIR Sensor"],
      github: "https://github.com/fatimaatta-09/Bibble-Intruder-Detector.git",
      live:   "",
      award:  "",
    },
  ],

  /* ── Certifications ─────────────────────────────────────── */
  /* status: "done" | "progress" | "plan"                     */
  certs: [
    /* Awards */
    { section:"AWARDS", name:"Obstacle Avoidance Robot — 1st Place",              org:"GIKI Innovation Summit",             date:"Feb 2025",  status:"done",     credId:"", link:"" },
    { section:"AWARDS", name:"Line Following Robot — 1st Place",                   org:"National Electronics Olympiad",      date:"Dec 2024",  status:"done",     credId:"", link:"" },
    /* Earned */
    { section:"EARNED", name:"Open Source Software Development Methods",           org:"The Linux Foundation",               date:"Dec 2025",  status:"done",     credId:"4JO366ZQ2JA0",                               link:"https://www.linkedin.com/in/fatima-rehman/details/certifications/" },
    { section:"EARNED", name:"Linux Commands & Shell Scripting Essentials V2",     org:"IBM / Coursera",                     date:"Dec 2025",  status:"done",     credId:"",                                           link:"https://www.linkedin.com/in/fatima-rehman/details/certifications/" },
    { section:"EARNED", name:"Hands-on Introduction to Linux & Shell Scripting",   org:"IBM",                                date:"Dec 2025",  status:"done",     credId:"XDD0GG1HSV92",                               link:"https://www.linkedin.com/in/fatima-rehman/details/certifications/" },
    { section:"EARNED", name:"Python Data Structures",                             org:"University of Michigan / Coursera",  date:"Dec 2025",  status:"done",     credId:"JF9PGOSDH75B",                               link:"https://www.linkedin.com/in/fatima-rehman/details/certifications/" },
    { section:"EARNED", name:"Computer Vision with OpenCV: Beginner–Intermediate", org:"OpenCV University",                  date:"Jul 2025",  status:"done",     credId:"fd822c66821d4519b87470ed7a874fac",            link:"https://www.linkedin.com/in/fatima-rehman/details/certifications/" },
    { section:"EARNED", name:"Python for Beginners",                               org:"OpenCV University",                  date:"Jul 2025",  status:"done",     credId:"c24354afa3bf4a5abcea11983424a6bb",            link:"https://www.linkedin.com/in/fatima-rehman/details/certifications/" },
    /* In progress */
    { section:"IN PROGRESS", name:"TryHackMe — Pre-Security Path",  org:"TryHackMe",          date:"2026",     status:"progress", credId:"", link:"https://tryhackme.com" },
    /* Roadmap */
    { section:"ROADMAP", name:"Google Cybersecurity Certificate",    org:"Coursera / Google",  date:"Planned",  status:"plan",     credId:"", link:"" },
    { section:"ROADMAP", name:"CompTIA Security+",                   org:"CompTIA",            date:"Planned",  status:"plan",     credId:"", link:"" },
    { section:"ROADMAP", name:"eJPT — Junior Penetration Tester",   org:"eLearnSecurity",     date:"Planned",  status:"plan",     credId:"", link:"" },
  ],

  /* ── Security tools ─────────────────────────────────────── */
  tools: [
    { abbr:"BS",  name:"Burp Suite"    },
    { abbr:"WS",  name:"Wireshark"     },
    { abbr:"ZAP", name:"OWASP ZAP"     },
    { abbr:"GP",  name:"GoPhish"       },
    { abbr:"KL",  name:"Kali Linux"    },
    { abbr:"NM",  name:"Nmap"          },
    { abbr:"DK",  name:"Docker"        },
    { abbr:"LX",  name:"Linux Bash"    },
    { abbr:"GH",  name:"Git / GitHub"  },
    { abbr:"PY",  name:"Python"        },
    { abbr:"CV",  name:"OpenCV"        },
    { abbr:"PG",  name:"PostgreSQL"    },
    { abbr:"PP",  name:"PsychoPy"      },
    { abbr:"JR",  name:"Jira"          },
    { abbr:"AR",  name:"Arduino IDE"   },
    { abbr:"RP",  name:"Raspberry Pi"  },
  ],

  /* ── Soft skills ─────────────────────────────────────────── */
  softSkills: [
    { color:"c", title:"Self-Directed",       desc:"Ran a full ML research pipeline independently — scoped, built, and delivered with no day-to-day supervision.",                                    proof:"Neuro-AI Internship, Air University" },
    { color:"p", title:"Cross-Functional",    desc:"Coordinated research teams, industry partners, and three student organisations simultaneously.",                                                  proof:"IEEE · SOPHEP · Nexus — all concurrent" },
    { color:"g", title:"Fast Learner",        desc:"Entered neuroscience with zero background and produced publishable ML results in one summer internship.",                                         proof:"97.71% EEG classification accuracy" },
    { color:"o", title:"Clear Communicator",  desc:"Technical writing, industry liaison work, and presenting to both technical and business audiences.",                                              proof:"Paper in progress + SOPHEP Corporate Liaison" },
    { color:"c", title:"Deadline-Driven",     desc:"Three leadership roles and a research internship concurrently while maintaining full coursework at GIKI.",                                        proof:"Year 2 — all roles active" },
    { color:"p", title:"Detail-Oriented",     desc:"EEG preprocessing demands extreme precision — one uncleaned artifact corrupts downstream model accuracy.",                                        proof:"Signal processing, 97.71% final accuracy" },
    { color:"g", title:"Problem Solver",      desc:"Built a real-time anomaly detection system in C++ from pure DSA — no libraries, no shortcuts.",                                                  proof:"Behavioral Anomaly Detection System" },
    { color:"o", title:"Design-Aware",        desc:"Graphic design skills via Canva; UI/UX sensibility applied across web projects.",                                                                proof:"3 web applications + design work" },
  ],

  /* ── Terminal commands ───────────────────────────────────── */
  termCommands: {
    help:     `Commands:\n  whoami    skills    projects    certs\n  research  contact   github      linkedin\n  hire      neofetch  clear`,
    whoami:   `Fatima Rehman\n──────────────────────────────────\nRole    : Cybersecurity Student @ GIKI\nYear    : 2nd year (2024–2028)\nGitHub  : github.com/fatima-rehman\nLinkedIn: linkedin.com/in/fatima-rehman\n──────────────────────────────────\n+ 97.71% ML accuracy (EEG Alzheimer's)\n+ 2x National Robotics Champion\n+ 6 Certifications earned\n+ Research paper in progress`,
    skills:   `Security   : Burp Suite  Wireshark  OWASP ZAP  GoPhish  Kali  Nmap\nLanguages  : Python  C++ (learning)  SQL  HTML/CSS  Arduino\nAI/ML      : EEG Processing  SVM  Random Forest  PsychoPy\nDatabases  : PostgreSQL\nDevOps     : Docker  Linux/Bash  Git/GitHub  Raspberry Pi\nLearning   : Deep Learning  TryHackMe  Bug Bounty`,
    projects: `[1] Behavioral Anomaly Detection  — C++  DSA  Linux/Windows\n[2] Face Recognition Access Control — Python  OpenCV  RPi\n[3] Python Web Applications ×3     — Flask  PostgreSQL  HTML/CSS\n[4] Obstacle Avoidance Robot        — 1st Place GIS 2025\n[5] Line Following Robot            — 1st Place NEO 2024\n[6] Motion Detection Robot          — PIR Sensor`,
    certs:    `EARNED (6 total):\n  + Open Source Dev Methods      Linux Foundation   Dec 2025\n  + Python Data Structures       Univ. of Michigan  Dec 2025\n  + Linux Shell Scripting V2     IBM / Coursera     Dec 2025\n  + Hands-on Linux Scripting     IBM                Dec 2025\n  + Computer Vision w/ OpenCV    OpenCV University  Jul 2025\n  + Python for Beginners         OpenCV University  Jul 2025\n\nIN PROGRESS: TryHackMe Pre-Security Path\nROADMAP   : Google Cert · CompTIA Security+ · eJPT`,
    research: `Paper   : EEG-Based Alzheimer's Classification Using ML\nStatus  : IN PROGRESS — targeting IEEE / Springer\nLab     : NeuroImaging Research Group, Air University\nAccuracy: 97.71%  (SVM + Random Forest)\nPipeline: EEG Acquisition → Preprocessing → Feature Extraction → Classification`,
    contact:  `LinkedIn: linkedin.com/in/fatima-rehman\nGitHub  : github.com/fatima-rehman\nLocation: Abbottabad, Pakistan\nOpen to : Internships · Research · Bug Bounty · Remote`,
    neofetch: `        _____\n     __|_____|__    fatima@kali-os\n    |  _______|    ────────────────\n    | |  ____      OS    : FR-OS v3\n    | | |____|     Host  : GIKI · Pakistan\n    | |_____       Shell : zsh / bash\n    |_______|      Lang  : Python  C++  SQL\n                   Status: Available for hire`,
  },

  /* ── Updates / changelog ─────────────────────────────────── */
  updates: [
    { date:"Jun 2026",      tag:"PORTFOLIO",  title:"FR-OS Portfolio launched",                    desc:"Modular codebase, GitHub Actions deploy, Kali wallpaper, Formspree contact — zero hardcoded email." },
    { date:"2025",          tag:"RESEARCH",   title:"EEG Research Paper in Progress",                 desc:"97.71% accuracy achieved with SVM + Random Forest. Targeting IEEE / Springer submission." },
    { date:"Dec 2025",      tag:"CERT",       title:"Linux Foundation + IBM + Michigan Certs",        desc:"4 certifications earned: Open Source Dev Methods, Python Data Structures, Linux Shell Scripting V2, Hands-on Linux Scripting." },
    { date:"Jul 2025",      tag:"CERT",       title:"OpenCV University Certifications",               desc:"Computer Vision with OpenCV (Beginner–Intermediate) and Python for Beginners." },
    { date:"Jun–Aug 2025",  tag:"INTERNSHIP", title:"Neuro-AI Research Intern @ Air University",      desc:"NeuroImaging Research Group. EEG ML pipeline. 97.71% accuracy. Paper in progress." },
    { date:"Feb 2025",      tag:"AWARD",      title:"1st Place — GIKI Innovation Summit",             desc:"Obstacle Avoidance Robot category." },
    { date:"Dec 2024",      tag:"AWARD",      title:"1st Place — National Electronics Olympiad",      desc:"Line Following Robot category at NEO." },
  ],
};
