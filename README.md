<div align="center">

<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 300" width="800" height="300">
  <defs>
    <radialGradient id="bgGrad" cx="50%" cy="50%" r="50%">
      <stop offset="0%" style="stop-color:#0a1628;stop-opacity:1" />
      <stop offset="100%" style="stop-color:#020810;stop-opacity:1" />
    </radialGradient>
    <filter id="glow">
      <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
      <feMerge><feMergeNode in="coloredBlur"/><feMergeNode in="SourceGraphic"/></feMerge>
    </filter>
    <filter id="strongGlow">
      <feGaussianBlur stdDeviation="6" result="coloredBlur"/>
      <feMerge><feMergeNode in="coloredBlur"/><feMergeNode in="SourceGraphic"/></feMerge>
    </filter>
  </defs>

  <!-- Background -->
  <rect width="800" height="300" fill="url(#bgGrad)" rx="12"/>

  <!-- Subtle grid lines -->
  <g stroke="#0d2a1a" stroke-width="0.5" opacity="0.4">
    <line x1="0" y1="50" x2="800" y2="50"/>
    <line x1="0" y1="100" x2="800" y2="100"/>
    <line x1="0" y1="150" x2="800" y2="150"/>
    <line x1="0" y1="200" x2="800" y2="200"/>
    <line x1="0" y1="250" x2="800" y2="250"/>
    <line x1="100" y1="0" x2="100" y2="300"/>
    <line x1="200" y1="0" x2="200" y2="300"/>
    <line x1="300" y1="0" x2="300" y2="300"/>
    <line x1="400" y1="0" x2="400" y2="300"/>
    <line x1="500" y1="0" x2="500" y2="300"/>
    <line x1="600" y1="0" x2="600" y2="300"/>
    <line x1="700" y1="0" x2="700" y2="300"/>
  </g>

  <!-- Dragon body (left side) -->
  <g filter="url(#glow)" opacity="0.9">
    <!-- Main body curve -->
    <path d="M 80 240 Q 60 180 90 140 Q 120 100 100 60 Q 110 40 130 50 Q 140 60 120 80 Q 110 100 130 130 Q 160 160 140 200 Q 130 230 150 250" 
          stroke="#00ffaa" stroke-width="8" fill="none" stroke-linecap="round"/>
    <!-- Neck -->
    <path d="M 100 60 Q 130 30 160 45 Q 175 55 165 75 Q 155 85 140 80"
          stroke="#00ffaa" stroke-width="6" fill="none" stroke-linecap="round"/>
    <!-- Head -->
    <ellipse cx="172" cy="42" rx="18" ry="12" fill="#001a0d" stroke="#00ffaa" stroke-width="2.5"/>
    <!-- Eye -->
    <circle cx="178" cy="38" r="4" fill="#00ffaa" filter="url(#strongGlow)"/>
    <circle cx="178" cy="38" r="2" fill="#ffffff"/>
    <!-- Snout -->
    <path d="M 185 44 L 196 48 L 185 52" stroke="#00ffaa" stroke-width="2" fill="none"/>
    <!-- Fire breath -->
    <path d="M 196 48 Q 215 42 225 35 Q 235 28 245 32" stroke="#4ade80" stroke-width="3" fill="none" opacity="0.8" filter="url(#glow)"/>
    <path d="M 196 50 Q 220 50 235 45" stroke="#86efac" stroke-width="1.5" fill="none" opacity="0.5"/>
    <!-- Left wing -->
    <path d="M 110 100 Q 50 60 20 80 Q 10 100 30 110 Q 55 120 90 120"
          stroke="#00cc88" stroke-width="5" fill="#001a0d" opacity="0.85"/>
    <path d="M 90 120 Q 40 130 15 150 Q 5 165 25 168 Q 55 170 95 155"
          stroke="#00cc88" stroke-width="4" fill="#001a0d" opacity="0.75"/>
    <!-- Wing details -->
    <path d="M 110 100 Q 70 85 30 110" stroke="#00ffaa" stroke-width="1" fill="none" opacity="0.5"/>
    <path d="M 95 120 Q 55 135 20 160" stroke="#00ffaa" stroke-width="1" fill="none" opacity="0.5"/>
    <!-- Tail -->
    <path d="M 150 250 Q 170 270 155 285 Q 140 295 125 280 Q 115 265 135 255"
          stroke="#00ffaa" stroke-width="5" fill="none" stroke-linecap="round"/>
    <!-- Scales hints -->
    <circle cx="105" cy="75" r="3" fill="none" stroke="#00ffaa" stroke-width="1" opacity="0.6"/>
    <circle cx="118" cy="105" r="3" fill="none" stroke="#00ffaa" stroke-width="1" opacity="0.6"/>
    <circle cx="112" cy="135" r="3" fill="none" stroke="#00ffaa" stroke-width="1" opacity="0.6"/>
    <circle cx="125" cy="160" r="3" fill="none" stroke="#00ffaa" stroke-width="1" opacity="0.6"/>
  </g>

  <!-- Right mirrored dragon (faint) -->
  <g filter="url(#glow)" opacity="0.35" transform="translate(800,0) scale(-1,1)">
    <path d="M 80 240 Q 60 180 90 140 Q 120 100 100 60 Q 110 40 130 50 Q 140 60 120 80 Q 110 100 130 130 Q 160 160 140 200 Q 130 230 150 250" 
          stroke="#00ffaa" stroke-width="6" fill="none" stroke-linecap="round"/>
    <path d="M 100 60 Q 130 30 160 45 Q 175 55 165 75 Q 155 85 140 80"
          stroke="#00ffaa" stroke-width="5" fill="none" stroke-linecap="round"/>
    <ellipse cx="172" cy="42" rx="16" ry="11" fill="#001a0d" stroke="#00ffaa" stroke-width="2"/>
    <circle cx="178" cy="38" r="3" fill="#00ffaa" filter="url(#strongGlow)"/>
    <path d="M 110 100 Q 50 60 20 80 Q 10 100 30 110 Q 55 120 90 120"
          stroke="#00cc88" stroke-width="4" fill="#001a0d" opacity="0.7"/>
    <path d="M 90 120 Q 40 130 15 150 Q 5 165 25 168 Q 55 170 95 155"
          stroke="#00cc88" stroke-width="3" fill="#001a0d" opacity="0.6"/>
  </g>

  <!-- Center glow orb -->
  <circle cx="400" cy="150" r="80" fill="none" stroke="#00ffaa" stroke-width="0.5" opacity="0.15"/>
  <circle cx="400" cy="150" r="55" fill="none" stroke="#00ffaa" stroke-width="0.5" opacity="0.1"/>

  <!-- Main Title -->
  <text x="400" y="118" text-anchor="middle" font-family="'Courier New', monospace" 
        font-size="52" font-weight="bold" fill="#00ffaa" filter="url(#strongGlow)" letter-spacing="8">FR-OS</text>

  <!-- Subtitle -->
  <text x="400" y="148" text-anchor="middle" font-family="'Courier New', monospace" 
        font-size="13" fill="#4ade80" letter-spacing="5" opacity="0.9">CYBERSECURITY PORTFOLIO v2.0</text>

  <!-- Divider line -->
  <line x1="250" y1="158" x2="550" y2="158" stroke="#00ffaa" stroke-width="0.8" opacity="0.4"/>

  <!-- Boot text -->
  <text x="400" y="178" text-anchor="middle" font-family="'Courier New', monospace" 
        font-size="11" fill="#4ade80" opacity="0.8">[ OK ] Welcome, Fatima Rehman ✓</text>

  <!-- URL -->
  <text x="400" y="200" text-anchor="middle" font-family="'Courier New', monospace" 
        font-size="12" fill="#86efac" opacity="0.7" letter-spacing="1">portfolio-website-3f8.pages.dev</text>

  <!-- Corner decorations -->
  <text x="20" y="20" font-family="monospace" font-size="10" fill="#00ffaa" opacity="0.4">┌─</text>
  <text x="760" y="20" font-family="monospace" font-size="10" fill="#00ffaa" opacity="0.4">─┐</text>
  <text x="20" y="292" font-family="monospace" font-size="10" fill="#00ffaa" opacity="0.4">└─</text>
  <text x="760" y="292" font-family="monospace" font-size="10" fill="#00ffaa" opacity="0.4">─┘</text>

  <!-- Particle dots -->
  <circle cx="300" cy="80" r="1.5" fill="#00ffaa" opacity="0.6" filter="url(#glow)"/>
  <circle cx="500" cy="65" r="1" fill="#00ffaa" opacity="0.4"/>
  <circle cx="350" cy="240" r="1.5" fill="#00ffaa" opacity="0.5" filter="url(#glow)"/>
  <circle cx="460" cy="230" r="1" fill="#4ade80" opacity="0.4"/>
  <circle cx="280" cy="200" r="1" fill="#00ffaa" opacity="0.3"/>
  <circle cx="530" cy="190" r="1.5" fill="#00ffaa" opacity="0.5"/>
</svg>

<br/>

<img src="https://readme-typing-svg.demolab.com?font=Fira+Code&size=13&pause=1000&color=4ADE80&center=true&vCenter=true&width=500&lines=%5B+OK+%5D+Loading+kernel+modules...;%5B+OK+%5D+Initializing+security+tools...;%5B+OK+%5D+Loading+AI+research+modules...;%5B+OK+%5D+Welcome%2C+Fatima+Rehman+%E2%9C%93" alt="Boot Sequence" />

<br/>

### 🌐 **[▶ BOOT INTO FR-OS — portfolio-website-3f8.pages.dev](https://portfolio-website-3f8.pages.dev)**

<br/>

[![React](https://img.shields.io/badge/React_+_Vite-20232A?style=flat-square&logo=react&logoColor=61DAFB)](https://react.dev)
[![TanStack](https://img.shields.io/badge/TanStack-FF4154?style=flat-square&logo=reactquery&logoColor=white)](https://tanstack.com)
[![Cloudflare](https://img.shields.io/badge/Cloudflare_Pages-F38020?style=flat-square&logo=cloudflare&logoColor=white)](https://pages.cloudflare.com)
[![Kali Inspired](https://img.shields.io/badge/Kali_Linux-Inspired-268BEE?style=flat-square&logo=kalilinux&logoColor=white)](https://portfolio-website-3f8.pages.dev)

</div>

---

> *Most portfolios are pages. This one is an **operating system**.*

**FR-OS** is an interactive desktop environment built as a portfolio — complete with a boot sequence, live terminal, draggable windows, and a Kali Linux dragon wallpaper. Built by **Fatima Rehman**, cybersecurity undergrad at GIKI, 2× national robotics champion, and AI/ML researcher.

---

## `$ ls ./features`

```bash
🐉  Kali-inspired boot animation    — loads like a real OS
💻  Interactive terminal             — type real commands
🪟  Draggable app windows           — actual desktop UX
🔬  AI/ML research showcase         — EEG neuro research
🛡️  Cybersecurity tools display     — hacker aesthetic
🏆  Achievements & certifications   — 6 certs + 2 trophies
📄  One-click resume download       — always up to date
📬  Contact form                    — no backend, no problem
```

---

## `$ git clone && run`

```bash
git clone https://github.com/fatimaatta-09/Portfolio-Website.git
cd Portfolio-Website
npm install && npm run dev
# Boot into FR-OS at http://localhost:3000
```

---

<div align="center">

```bash
[ SYSTEM ] Status .......... ONLINE
[ SYSTEM ] Kernel .......... Curiosity v∞
[ SYSTEM ] Uptime .......... Always building
```

<br/>

[![GitHub](https://img.shields.io/badge/GitHub-fatimaatta--09-181717?style=for-the-badge&logo=github)](https://github.com/fatimaatta-09)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-fatima--rehman09-0A66C2?style=for-the-badge&logo=linkedin)](https://linkedin.com/in/fatima-rehman09)
[![Portfolio](https://img.shields.io/badge/🌐_Portfolio-FR--OS-4ade80?style=for-the-badge)](https://portfolio-website-3f8.pages.dev)

<br/>

*Built with 🐉 claymorphism · Kali aesthetics · too much caffeine*

**© 2025 Fatima Rehman**

</div>
