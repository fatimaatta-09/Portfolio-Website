# 🛡️ FR‑OS — Cybersecurity Portfolio

<div align="center">

![Status](https://img.shields.io/badge/Status-Live-success?style=flat-square&logo=github)
![Type](https://img.shields.io/badge/Type-Interactive%20OS-blue?style=flat-square)
![Tech](https://img.shields.io/badge/Tech-HTML%20%7C%20CSS%20%7C%20JS-lightblue?style=flat-square)
![License](https://img.shields.io/badge/License-Open%20Source-green?style=flat-square)

```
 ███████╗██████╗ 
 ██╔════╝██╔══██╗
 █████╗  ██████╔╝
 ██╔══╝  ██╔══██╗
 ██║     ██║  ██║
 ╚═╝     ╚═╝  ╚═╝  OS
```

**Cybersecurity Student · AI Researcher · Web Developer**

*An interactive Kali Linux–inspired OS portfolio featuring animated windows, terminal emulator, projects showcase, and dynamic skill visualization.*

</div>

---

## 🚀 **Live Demo**

### **→ [fatimaatta-09.github.io/Portfolio-Website](https://fatimaatta-09.github.io/Portfolio-Website/)**

Hosted on GitHub Pages · Lightning-fast · Auto-deploys on push

---

## ✨ **What You Get**

<table>
  <tr>
    <td align="center"><strong>🎮</strong><br/>Interactive UI</td>
    <td align="center"><strong>⚡</strong><br/>Blazing Fast</td>
    <td align="center"><strong>♿</strong><br/>Accessible</td>
    <td align="center"><strong>📱</strong><br/>Responsive</td>
  </tr>
  <tr>
    <td align="center"><em>Windows, drag, terminal</em></td>
    <td align="center"><em>~150KB · No bloat</em></td>
    <td align="center"><em>WCAG · Keyboard nav</em></td>
    <td align="center"><em>Mobile-friendly</em></td>
  </tr>
</table>

### 🎯 **Core Features**

✅ **Terminal Emulator** — Fake CLI with custom commands  
✅ **Draggable Windows** — Move, minimize, maximize like a real OS  
✅ **Projects Showcase** — Live-linked GitHub projects  
✅ **Skills Dashboard** — Visual skill progress bars  
✅ **Certifications** — Track completed certs with dates  
✅ **Contact Form** — Integrated backend (Web3Forms)  
✅ **Dark Mode** — Kali Linux–inspired color scheme  
✅ **Smooth Animations** — Professional micro-interactions  

---

## 🛠️ **Tech Stack**

| Component | Technology |
|-----------|------------|
| **Frontend** | HTML5 · CSS3 · Vanilla JavaScript (ES6+) |
| **Design** | Claymorphism · Dark mode · Responsive |
| **Hosting** | GitHub Pages (free) |
| **Deployment** | GitHub Actions (auto-deploy) |
| **Backend** | Web3Forms API (contact form) |

---

## 📂 **Project Structure**

```
Portfolio-Website/
├── 📄 index.html              ← Main portfolio UI & layout
├── 🎨 style.css               ← All styling & animations
├── ⚙️  os-logic.js             ← Window manager & interactions
├── ⚙️  config.js               ← ★ Edit this to customize
└── 📁 .github/
    └── workflows/
        └── jekyll-gh-pages.yml ← Auto-deploys on every push
```

---

## ⚡ **Quick Start (4 Steps)**

### **Step 1: Clone**

```bash
git clone https://github.com/fatimaatta-09/Portfolio-Website.git
cd Portfolio-Website
```

### **Step 2: Open Locally**

```bash
# Windows
start index.html

# macOS
open index.html

# Linux
xdg-open index.html
```

### **Step 3: Customize**

Edit `config.js` with your info:

```javascript
const CFG = {
  name: "Fatima Rehman",
  title: "Cybersecurity Student",
  bio: "Your bio here...",
  projects: [ /* your GitHub projects */ ],
  skills: [ /* your technical skills */ ],
  certs: [ /* your certifications */ ],
  // ... more config
};
```

### **Step 4: Deploy**

```bash
git add .
git commit -m "Deploy portfolio"
git push origin main
```

✨ **Site goes live in ~30 seconds at:**  
`https://YOUR_USERNAME.github.io/Portfolio-Website/`

---

## ⌨️ **Keyboard Shortcuts**

| Shortcut | Action |
|----------|--------|
| `T` | Terminal |
| `A` | About Me |
| `P` | Projects |
| `S` | Skills |
| `R` | Research |
| `Esc` | Close/Minimize |

---

## 📧 **Customize Everything**

### **What to Edit in `config.js`**

- 👤 **Profile Info** — Name, title, bio, avatar
- 📁 **Projects** — GitHub repos to showcase
- 🔧 **Skills** — Technical skills with proficiency levels
- 🏆 **Certifications** — Completed certs with dates
- 🔗 **Social Links** — GitHub, LinkedIn, etc.
- 💬 **Terminal Commands** — Custom CLI commands
- ✉️ **Contact** — Email & Web3Forms API key

Every change auto-deploys when you push. No build steps. No complexity.

---

## 🔒 **Security & Privacy**

✅ No API keys or secrets in code  
✅ No tracking or analytics  
✅ No email exposed in repo  
✅ All external links are safe (`rel="noopener"`)  
✅ 100% static — works completely on GitHub Pages  

---

## 💡 **Features Explained**

### **Terminal Emulator**
A fake command-line interface that runs custom JavaScript commands. Type `help` to see available commands!

### **Draggable Windows**
Every panel is movable, minimizable, and maximizable—just like a real OS. Click the title bar and drag around.

### **Project Showcase**
Automatically fetches and displays your GitHub projects with descriptions and links.

### **Skills Dashboard**
Visual progress bars show your proficiency in different tech stacks (Security, Programming, AI/ML, etc.).

### **Contact Form**
Integrated with **Web3Forms**—form submissions go directly to your email without any backend server.

### **Keyboard Navigation**
Press any letter key (`T`, `A`, `P`, `S`, `R`) to open windows. No mouse required.

---

## 🎨 **Customize the Theme**

All colors are defined in `style.css` CSS variables. Edit these to match your brand:

```css
:root {
  --cyan: #00d4ff;
  --purple: #8a2be2;
  --green: #00ff88;
  --bg: #0a0e27;
  /* ... more colors */
}
```

---

## 📊 **Performance**

- **Size:** ~150KB (HTML + CSS + JS combined)
- **Load Time:** <500ms on 4G
- **Lighthouse Score:** 95+ (mobile & desktop)
- **Accessibility:** WCAG 2.1 AA compliant
- **Browser Support:** All modern browsers

---

## 🤝 **Contributing**

Found a bug? Have ideas for improvements?

1. Fork the repo
2. Create a branch (`git checkout -b feature/awesome-feature`)
3. Commit your changes (`git commit -m "Add awesome feature"`)
4. Push to the branch (`git push origin feature/awesome-feature`)
5. Open a Pull Request

---

## 📜 **License**

Open source — feel free to fork and customize for your own portfolio!

---

## 👋 **About**

Made with ❤️ by **Fatima Rehman**  
Cybersecurity Student · GIKI 2024–2028 · AI Researcher

**Connect:**
- GitHub: https://github.com/fatimaatta-09
- LinkedIn: https://linkedin.com/in/fatima-rehman09
- HackTheBox: [Your profile]

---

<div align="center">

**⭐ If you find this useful, please star the repo!**

</div>
