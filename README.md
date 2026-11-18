# Rajesh Chilukuri — DevOps Portfolio

Iconic, static DevOps portfolio built with plain HTML/CSS/JS. Features:

* **Landing page** with hero banner, DevOps stack badges, About section, and project previews
* **Dashboard page** with Grafana-style charts (Chart.js), KPI cards, and simulated cluster health
* **Projects page** with deep-dive case studies for your three flagship projects

## Files

| File | Purpose |
|------|---------|
| `index.html` | Landing page (hero, skills, about, projects preview, dashboard preview, contact) |
| `styles.css` | Dark-tech theme styling |
| `script.js` | Landing page interactivity (typing effect, particles, inline charts) |
| `dashboard.html` | Full interactive performance dashboard with Chart.js visualizations |
| `dashboard.js` | Dashboard charts, particle background, and time-range handling |
| `projects.html` | Three detailed project case studies with code snippets and metrics |
| `assets/` | Folder for images (e.g., your banner, screenshots) |
| `README.md` | This file |

## Assets

Your banner image is referenced as `assets/devops_banner.png`. Download it from your GitHub repo and place it here:

```
assets/devops_banner.png
```

You can also add architecture screenshots (EKS topology, Grafana dashboards, Jenkins pipelines) to `assets/` and reference them in your project pages.

## Deploying to GitHub Pages

1. Create a new repository on GitHub, e.g., `devops-portfolio`
2. Upload all files from this folder to the repo (keep the same structure)
3. In GitHub, go to **Settings → Pages**
4. Under **Build and deployment**, select **Deploy from a branch**
5. Choose `main` branch and `/ (root)` folder
6. Click **Save**
7. Your portfolio will be live at `https://<your-username>.github.io/devops-portfolio/`

## Customising

* **Colours:** Edit the `--accent-cyan` and `--bg-dark` variables in `styles.css`
* **Chart data:** Modify the datasets in `script.js` (landing) and `dashboard.js` (dashboard page)
* **Content:** Update text in `index.html`, `dashboard.html`, and `projects.html`
