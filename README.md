# Qiang — Bioinformatics & Multi-omics

An English personal website for Qiang, focused on NGS analysis, multi-omics,
single-cell and spatial transcriptomics. Plain HTML, CSS and JavaScript;
no build step, external fonts or runtime dependencies.

## Preview

From the repository directory:

```sh
python3 -m http.server 8000
```

Open `http://localhost:8000`. The page can also be opened directly from
`index.html`.

## Content

- Introduction and research focus centered on gene regulation
- Established analysis work distinguished from AI learning interests
- Technical skills described by practical use
- `bio_know_base` overview: method notes, analysis scripts and workflow templates
- Four-step analysis approach
- Two selected co-first-author publications from the supplied public ORCID record
- GitHub profile and collaboration brief

The public display name is **Qiang**. Real-name biography and author lists
are intentionally omitted. ORCID and DOI links lead to external records that
may show author names.

## Update personal information

- **Biography, research, projects:** edit `index.html`.
- **Avatar:** loaded directly from `https://github.com/nihaonewworld.png?size=240`;
  follows your GitHub avatar subject to browser/GitHub caching.
- **GitHub:** links use `https://github.com/nihaonewworld`, matching this
  repository's Git remote. The knowledge-base link currently opens the profile;
  replace it with a verified repository URL when available.
- **ORCID:** `https://orcid.org/0000-0001-9547-9138`.
- **Publications:** titles, journals, years and DOIs were read from the ORCID
  public API on 2026-09-29. They are static content, not automatically synced.
  Only the co-first-author papers in Journal of Genetics and Genomics (2024)
  and BMC Genomics (2023) are displayed. Co-first authorship was checked against
  the [institutional publication listing](https://szmed.sysu.edu.cn/zh-hans/node/1287)
  and [PubMed](https://pubmed.ncbi.nlm.nih.gov/37138231/), respectively.
  Add or update `<article class="pub-item">` elements in `#publications`.
- **Email:** the public contact address is `qcao2020@outlook.com`, configured
  in `js/config.js`. A valid address enables the email link and email-draft
  form; leave it blank to show the collaboration brief instead.

The form opens a `mailto:` draft in the visitor's email application. It does
not send or store messages on a server. The visitor must send the draft;
form text is retained if no email application opens. Do not put secrets in
`js/config.js`: its contents are public.

## Files

```text
index.html       Page content and metadata
css/style.css    Responsive styles, themes, reduced-motion and print styles
js/config.js     Public email configuration
js/main.js       Theme, menu, scroll state and email-draft interactions
.nojekyll        Static GitHub Pages marker
```

## Accessibility and resilience

- Semantic main/navigation regions, skip link and visible keyboard focus
- Mobile menu supports Escape, outside clicks and expanded-state announcements
- System color preference with optional saved override; storage failure tolerated
- Content readable without JavaScript; section links use native browser navigation
- Reduced-motion support and layouts for small screens
- No example email addresses, fake publications or empty destination links

## Publishing

This repository's remote is `nihaonewworld/nihaonewworld.github.io`.
The site is compatible with GitHub Pages deployment from the repository root.
Review changes locally before committing and pushing. This update does not
change deployment settings or publish the site.
