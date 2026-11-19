# Rajesh Chilukuri – Iconic DevOps Portfolio

A world-class, immersive DevOps & Platform Engineer portfolio built with plain HTML/CSS/JS. Designed to impress clients and engineering leaders with business outcomes, interactive demos, and cinematic visuals.

🌐 **Live:** https://rajesh-210.github.io/devops-portfolio/

---

## 🎯 Overview

This portfolio is built for **Rajesh Chilukuri**, a Senior DevOps & Platform Engineer with 4+ years of experience in AWS, Kubernetes, Terraform, ArgoCD, Jenkins, Prometheus, Grafana, and FinOps. Every section is designed to convert visitors into clients by showcasing measurable business impact (cost reduction, MTTR, deployment velocity, zero downtime).

---

## 🚀 Features

### Visual & Cinematic
- **Animated DevOps Tools Background** – 16 tool logos (AWS, Kubernetes, Docker, Terraform, Jenkins, ArgoCD, Prometheus, Grafana, Helm, Ansible, GitHub, GitLab, Nginx, Python, Go, Linux) auto-float continuously without mouse interaction
- **Dark/Light Animated Glass Themes** – Toggle between deep abyss dark mode and frosted glass light mode with animated radial mesh gradients; persists via localStorage and respects system preference
- **Custom Animated Cursor** – Neon ring cursor that follows the mouse and expands on clickable elements
- **Film Grain Overlay** – Subtle cinematic film grain texture across the page
- **Letterbox Bars** – Top/bottom widescreen bars for a movie-theater feel
- **Light Leaks** – Drifting colored radial glows (purple, cyan, pink, amber)
- **Parallax Depth Layers** – Background glow layers that scroll slower than foreground content

### Interactive Sections
- **Hero Section** – Dynamic typing effect cycling through roles: DevOps Engineer → Platform Architect → Cloud Native Specialist → SRE Practitioner → FinOps Optimizer; includes trust metrics (99.9% SLA, 30% cost saved, 15 min MTTR, Daily deployments)
- **Interactive Terminal** – Press `` ` `` or Ctrl+K to open a macOS-style terminal with commands: `help`, `whoami`, `stack`, `projects`, `contact`, `clear`, `exit`
- **FinOps Savings Calculator** – Interactive slider showing monthly/annual cloud savings with spot instance orchestration breakdown
- **CI/CD Pipeline Simulator** – 6-stage pipeline (Lint → Security Scan → Build & Push → ArgoCD Sync → Canary → Production Live) with live logs, progress bars, and duration timer
- **SRE Incident Post-Mortem** – Full war story with timeline (T+0 to T+15), root cause analysis, and 3 preventive actions
- **Case Study Results** – 3 quantified case studies (Fintech Cost Optimization, Logistics Reliability, SaaS Deployment Velocity) with metrics and CTAs
- **Technical Blog** – 3 engineering articles (FinOps Karpenter, ArgoCD GitOps, Prometheus MTTR) with read times and email CTAs
- **Interactive Architecture Diagram** – 7 clickable nodes (AWS Cloud, VPC, EKS, ArgoCD, Jenkins, Prometheus, Grafana) with data flow labels and role/impact details
- **GitHub Live Stats** – Real-time public repos, stars, followers, and contributions fetched from GitHub API; featured repos list with stars, languages, and last updated dates
- **One-Page Résumé Download** – Downloadable .docx résumé matching portfolio typography

### Navigation & UX
- **Navigation** – Work, Stack, Impact, Dashboard, Let's Talk, Theme Toggle
- **Page Load Entrance Animations** – Sections fade in and slide up in staggered sequence
- **Scroll Progress Bar** – Neon gradient bar at top showing scroll position
- **Back to Top Button** – Floating neon button with smooth scroll, appears after 300px
- **Enhanced Card Micro-interactions** – Inner glow, text color shifts, icon lift on hover for project/case study/blog cards
- **Mobile Menu** – Slide-in full-screen overlay with close button
- **IntersectionObserver Reveal** – Scroll-triggered animations for all sections

---

## 🛠 Tech Stack

| Layer | Technology |
|-------|-----------|
| Markup | HTML5 |
| Styling | Tailwind CSS (CDN), Custom CSS |
| Scripting | Vanilla JavaScript (ES6+) |
| Fonts | Outfit (headings), JetBrains Mono (monospace), Inter (body) |
| Icons | skillicons.dev, Devicon, SVG |
| Charts | Chart.js (Dashboard) |
| Hosting | GitHub Pages (main branch) |

---

## 📁 Project Structure

```
devops-portfolio/
├── index.html              # Main portfolio page (all sections)
├── dashboard.html          # Telemetry observability page (Chart.js)
├── projects.html           # Production case studies page
├── share-card.html         # WhatsApp/Instagram share card
├── instagram-reel.html     # 30s animated vertical video reel
├── README.md               # This file
├── build_resume.py         # Script to generate résumé PDF
├── Rajesh_Chilukuri_DevOps_Resume.pdf   # Generated résumé PDF
└── Rajesh_Chilukuri_DevOps_Resume.docx  # Downloadable résumé (Word)
```

---

## 🚀 Getting Started

### Local Development

1. Clone the repository:
   ```bash
   git clone https://github.com/Rajesh-210/devops-portfolio.git
   cd devops-portfolio
   ```

2. Open `index.html` in your browser:
   ```bash
   # Using Python
   python -m http.server 8000
   
   # Then visit http://localhost:8000
   ```

### Deployment (GitHub Pages)

1. Push to the `main` branch:
   ```bash
   git add -A
   git commit -m "your changes"
   git push -u origin main
   ```

2. Enable GitHub Pages in repository settings → Pages → Source: main branch

3. Your site will be live at: `https://rajesh-210.github.io/devops-portfolio/`

---

## 🎨 Customization

### Colors
Edit the CSS variables in `index.html`:
- `--neon-purple`: `#8b5cf6`
- `--neon-cyan`: `#06b6d4`
- `--neon-pink`: `#ec4899`
- `--neon-emerald`: `#10b981`
- `--neon-amber`: `#f59e0b`

### Theme Toggle
Located in the navigation. Respects `prefers-color-scheme` and saves to `localStorage` under key `portfolio-theme`.

### Adding a New Section
1. Copy an existing `<section>` block
2. Update the `id` and content
3. Add `entrance-hidden` class for scroll/reveal animation
4. Add navigation link in `<nav>`

---

## 📞 Contact

- **Email:** rajeshchilukuri210@gmail.com
- **LinkedIn:** https://www.linkedin.com/in/rajesh-chilukuri-692506406
- **GitHub:** https://github.com/Rajesh-210
- **Portfolio:** https://rajesh-210.github.io/devops-portfolio/

---

## 📄 License

MIT License – feel free to use as a template for your own portfolio.

---

*Built with precision for engineering excellence. Crafted to impress clients and engineering leaders.*