<div align="center">
  <!-- 3D Animated Header with Rotating Cube & Dynamic Elements -->
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 300" width="100%" height="300" style="background: linear-gradient(135deg, #0a0e27 0%, #1a0a3e 100%);">
    <defs>
      <!-- Glow filters for 3D effect -->
      <filter id="glow3d" x="-50%" y="-50%" width="200%" height="200%">
        <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
        <feMerge>
          <feMergeNode in="coloredBlur"/>
          <feMergeNode in="SourceGraphic"/>
        </feMerge>
      </filter>
      
      <!-- Radial gradient for depth -->
      <radialGradient id="radial1" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stop-color="#ff00ff" stop-opacity="0.8"/>
        <stop offset="100%" stop-color="#00ffff" stop-opacity="0.2"/>
      </radialGradient>
      
      <!-- Animated gradient -->
      <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#00d4ff">
          <animate attributeName="offset" values="-1;1;-1" dur="6s" repeatCount="indefinite"/>
        </stop>
        <stop offset="50%" stop-color="#ff00ff">
          <animate attributeName="offset" values="0;2;0" dur="6s" repeatCount="indefinite"/>
        </stop>
        <stop offset="100%" stop-color="#ffaa00">
          <animate attributeName="offset" values="1;3;1" dur="6s" repeatCount="indefinite"/>
        </stop>
      </linearGradient>
    </defs>
    
    <!-- Background animated shapes -->
    <circle cx="150" cy="80" r="60" fill="url(#radial1)" opacity="0.4">
      <animate attributeName="cx" values="150;200;150" dur="8s" repeatCount="indefinite"/>
      <animate attributeName="cy" values="80;120;80" dur="8s" repeatCount="indefinite"/>
    </circle>
    
    <!-- Rotating 3D Cube (isometric projection) -->
    <g transform="translate(150, 120)" filter="url(#glow3d)">
      <!-- Cube back faces -->
      <polygon points="0,-40 -35,-20 -35,40 0,60" fill="#8a2be2" opacity="0.6">
        <animateTransform attributeName="transform" type="rotate" values="0;360" dur="12s" repeatCount="indefinite" additive="sum"/>
      </polygon>
      <polygon points="0,-40 35,-20 35,40 0,60" fill="#00d4ff" opacity="0.6">
        <animateTransform attributeName="transform" type="rotate" values="0;360" dur="12s" repeatCount="indefinite" additive="sum"/>
      </polygon>
      <polygon points="-35,-20 35,-20 35,40 -35,40" fill="#ff00ff" opacity="0.7">
        <animateTransform attributeName="transform" type="rotate" values="0;360" dur="12s" repeatCount="indefinite" additive="sum"/>
      </polygon>
      
      <!-- Cube edges for emphasis -->
      <line x1="0" y1="-40" x2="-35" y2="-20" stroke="#00ffff" stroke-width="2" opacity="0.9">
        <animateTransform attributeName="transform" type="rotate" values="0;360" dur="12s" repeatCount="indefinite" additive="sum"/>
      </line>
      <line x1="0" y1="-40" x2="35" y2="-20" stroke="#ff00ff" stroke-width="2" opacity="0.9">
        <animateTransform attributeName="transform" type="rotate" values="0;360" dur="12s" repeatCount="indefinite" additive="sum"/>
      </line>
      <line x1="-35" y1="-20" x2="35" y2="-20" stroke="#00d4ff" stroke-width="2" opacity="0.9">
        <animateTransform attributeName="transform" type="rotate" values="0;360" dur="12s" repeatCount="indefinite" additive="sum"/>
      </line>
    </g>
    
    <!-- Main Title with 3D text effect -->
    <g transform="translate(500, 100)">
      <!-- Shadow/3D depth layers -->
      <text x="0" y="0" font-family="Syne, Arial, sans-serif" font-size="48" font-weight="800" fill="#1a0a3e" opacity="0.5" text-anchor="middle">Fatima Rehman</text>
      <text x="2" y="2" font-family="Syne, Arial, sans-serif" font-size="48" font-weight="800" fill="#8a2be2" opacity="0.7" text-anchor="middle">Fatima Rehman</text>
      
      <!-- Animated gradient text -->
      <text x="0" y="0" font-family="Syne, Arial, sans-serif" font-size="48" font-weight="800" fill="url(#grad1)" text-anchor="middle" filter="url(#glow3d)">Fatima Rehman</text>
      
      <!-- Glowing accent -->
      <text x="0" y="0" font-family="Syne, Arial, sans-serif" font-size="48" font-weight="800" fill="none" stroke="#00ffff" stroke-width="1" opacity="0.3" text-anchor="middle">Fatima Rehman</text>
    </g>
    
    <!-- Subtitle with animation -->
    <g transform="translate(500, 170)">
      <text x="0" y="0" font-family="JetBrains Mono, monospace" font-size="14" fill="#00d4ff" text-anchor="middle" opacity="0">
        Cybersecurity · AI Research · Web Development
        <animate attributeName="opacity" values="0;1;1;0" dur="4s" repeatCount="indefinite"/>
      </text>
      <text x="0" y="0" font-family="JetBrains Mono, monospace" font-size="14" fill="#ff00ff" text-anchor="middle" opacity="0">
        → FR‑OS Portfolio →
        <animate attributeName="opacity" values="0;0;1;1" dur="4s" repeatCount="indefinite"/>
      </text>
    </g>
    
    <!-- Orbiting particles around title -->
    <g opacity="0.8">
      <circle cx="500" cy="60" r="3" fill="#00ffff">
        <animateMotion dur="8s" repeatCount="indefinite">
          <mpath href="#orbit1"/>
        </animateMotion>
      </circle>
      <circle cx="500" cy="60" r="2" fill="#ff00ff">
        <animateMotion dur="10s" repeatCount="indefinite" keyPoints="0.5;1;0.5;0" keyTimes="0;0.5;1;1">
          <mpath href="#orbit2"/>
        </animateMotion>
      </circle>
      
      <!-- Orbit paths (invisible) -->
      <path id="orbit1" d="M 600,60 Q 650,20 600,-20 Q 550,20 600,60" fill="none"/>
      <path id="orbit2" d="M 400,60 Q 350,120 400,180 Q 450,120 400,60" fill="none"/>
    </g>
    
    <!-- Bottom accent bar with animation -->
    <line x1="250" y1="260" x2="750" y2="260" stroke="url(#grad1)" stroke-width="3" opacity="0.7">
      <animate attributeName="stroke-width" values="3;5;3" dur="2s" repeatCount="indefinite"/>
    </line>
    <circle cx="250" cy="260" r="5" fill="#00d4ff">
      <animate attributeName="cx" values="250;750;250" dur="6s" repeatCount="indefinite"/>
    </circle>
</div>

# FR‑OS — Fatima Rehman

> Cybersecurity student · AI researcher · web developer — portfolio and playground.

- Demo: https://fatimaatta-09.github.io/Portfolio-Website/ (GitHub Pages)

---

## Highlights

- Animated, OS-style portfolio UI with terminal, projects, and interactive shortcuts.
- Lightweight, static site (HTML/CSS/JS) — easy to host with GitHub Pages.
- Accessible markup, keyboard-friendly controls and progressive enhancement.

---

## Quick Start

Clone and open locally:

```bash
git clone https://github.com/fatimaatta-09/Portfolio-Website.git
cd Portfolio-Website
# Open index.html in your browser
start index.html  # Windows; or open index.html on macOS/Linux
```

## Files of interest

- `index.html` — main portfolio UI
- `style.css` — styles and layout
- `os-logic.js` — UI behaviour and interactions

---

## Contribute / Contact

PRs welcome — open an issue or reach out via GitHub: https://github.com/fatimaatta-09

Made with ❤️ by Fatima Rehman

