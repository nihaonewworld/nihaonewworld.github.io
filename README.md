# Bioinformatics Engineer - Personal Website

A modern, responsive personal website for a bioinformatics engineer, deployable on GitHub Pages.

## Features

- **Responsive Design** - Mobile, tablet, and desktop optimized
- **Dark/Light Theme** - Auto-saved to localStorage, one-click toggle
- **Scroll Animations** - Reveal-on-scroll, progress bar, skill bar animation
- **Smooth Navigation** - Active section highlighting, smooth scroll, mobile hamburger menu
- **Contact Form** - Static-site friendly (opens user's email client via `mailto:`)
- **No Dependencies** - Pure HTML/CSS/JS, no build step required

## Sections

1. **Hero** - Landing with animated background
2. **About** - Bio, skill tags, profile card with social links (GitHub, ORCID)
3. **Research** - 4 research interest cards (Multi-omics, Single-Cell & Spatial, Virtual Cell, AIDD)
4. **Skills** - 4 cards reusing the Research Interests layout: Programming (progress bars: R Expert / Python Advanced / Shell Advanced), Multi-omics Analysis (chips: WGBS, ChIP-seq, ATAC-seq, CUT&Tag, RNA-seq, RIP-seq, WGS/WES, Ribo-seq), Single-Cell & Spatial (chips: Droplet-based scRNA-seq, Smart-seq2, Seurat, Scanpy), AI (PyTorch)
5. **Projects** - Featured project: bio_know_base (comprehensive bioinformatics knowledge repository)
6. **Publications** - ORCID profile card + selected publications list
7. **Contact** - Contact methods + mailto form

## File Structure

```
.
├── index.html        # Main HTML
├── css/
│   └── style.css     # All styles
├── js/
│   └── main.js       # All JavaScript
├── .nojekyll         # Disable Jekyll on GitHub Pages
└── README.md         # This file
```

## Deploy to GitHub Pages

### Method 1: Direct Push (Recommended)

1. Create a new repository on GitHub (e.g., `your-username.github.io` or any repo name)
2. Push these files to the repository:

```bash
git init
git add .
git commit -m "Initial commit: bioinformatics personal website"
git branch -M main
git remote add origin https://github.com/your-username/your-repo.git
git push -u origin main
```

3. Go to **Settings > Pages** in your GitHub repository
4. Under **Source**, select **Deploy from a branch**
5. Select branch `main` and folder `/ (root)`
6. Click **Save**

Your site will be live at:
- If repo is `your-username.github.io`: `https://your-username.github.io`
- Otherwise: `https://your-username.github.io/your-repo`

### Method 2: GitHub Desktop

1. Download [GitHub Desktop](https://desktop.github.com/)
2. Create a new repository, add all files
3. Publish to GitHub
4. Enable Pages in repo Settings as above

## Customization Guide

### Personal Information
Edit `index.html`:
- Replace `your.email@example.com` with your email
- Replace `@your-username` with your GitHub username
- Replace `0000-0000-0000-0000` with your ORCID ID (in the Publications ORCID card)
- Update social links `href="#"` with real URLs (About card: GitHub, ORCID)
- Update `bio_know_base` GitHub repo link
- Add your real publications in the `#publications` section (a template is provided as an HTML comment)

### Colors / Theme
Edit `css/style.css`:
- Modify CSS variables in `:root` (light theme) and `[data-theme="dark"]` (dark theme)
- Key variables: `--accent`, `--accent-gradient`, `--bg-primary`, `--text-primary`

### Content
- **Research cards**: Add/remove cards in `#research` section
- **Skills**: Edit the progress bars (`skill-bars`) in the Programming card and the chips (`research-tools` spans) in the other `research-card`s of the `#skills` section
- **Projects**: Add/remove cards in `#projects` section

## Tech Stack

- HTML5 (semantic)
- CSS3 (custom properties, Grid, Flexbox, animations)
- Vanilla JavaScript (ES5-compatible, Intersection Observer API)
- Google Fonts: Inter, JetBrains Mono

## License

MIT - feel free to use and modify.
