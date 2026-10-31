# Qiang — Bioinformatics Engineer

An English, analysis-focused personal portfolio built with HTML, CSS and JavaScript.
The public name is **Qiang**. The site emphasizes sequencing data analysis, visualization and biological interpretation;
it makes no claims about academic degrees or student status.

## Preview

```sh
python3 -m http.server 8000
```

Open `http://localhost:8000`. No build step or package installation is needed.

## Content and design

1. Introduction and GitHub avatar
2. Skills: multi-omics, single-cell/spatial analysis, programming and visualization
3. Biology Knowledge Base: six linked content areas and six expandable analysis/workflow examples
4. Approach: define, check, analyze and interpret
5. Publications: two co-first-author citations with journal, year, volume/pages and paper links
6. Contact form to prepare an email draft, GitHub and ORCID

AI-driven drug discovery, PyTorch and virtual cell models are labeled as learning
interests. Publications support the portfolio rather than define its positioning.
Do not add personal project outcomes or contribution claims without verification.

The design uses system fonts, generous spacing, simple lists and gentle motion: a brief watercolor entrance, scroll reveals,
pointer-responsive profile depth and small button/tag interactions.
The Monet-inspired palette uses warm white, water-lily green, mist blue and muted
lilac. Colors are an interpretation, not sampled from a particular painting.
Light and dark themes and small-screen layouts are supported. Reduced-motion
preferences disable decorative movement and cancel active scroll animations.
Content stays visible without JavaScript or animation API support.
Each section occupies at least one viewport below the navigation bar. Longer
content expands naturally, including on phones and at larger text sizes.
The profile card includes icon links for GitHub, ORCID and Email, without programming-language labels.

## Personal information

- **Content and metadata:** `index.html`.
- **GitHub:** `https://github.com/nihaonewworld`.
- **Avatar:** `https://github.com/nihaonewworld.png?size=320`; GitHub/browser caching applies.
- **Email:** `qiangcao2014@gmail.com`. Update both `js/config.js` and the static
  email link in `index.html` when changing it. The static link works without JS.
- **ORCID:** `https://orcid.org/0000-0001-9547-9138`.
- **Content source:** [nihaonewworld/biology-knowledge-base](https://github.com/nihaonewworld/biology-knowledge-base), reviewed locally on 2026-10-31 at commit `1e2fd9b02d68f3ba28874168ff0bcf91a061f08a`.
- **Review scope:** all top-level directories, Markdown topic structure, notebook cells and saved-output presence, and representative workflow and R helper source. The public GitHub page could not be fetched in this review; linked paths were checked against the local repository on branch `main`.
- **Displayed areas:** biology, bioinformatics, computing, experimental resources, pipelines/environments and public data analyses. `07_Projects` is empty and is not presented as completed research. Assets support the notes rather than constitute a project area.
- **Selected examples:** transcriptomics study designs and translation analysis; TET1 multi-omics (GSE176389); single-cell clustering helpers; mouse-brain Visium/Visium HD notebooks; paired-end RNA-seq Snakemake workflow; differential-expression study-design notes.
- **Scope of claims:** materials vary in completeness and include unfinished notebooks. No notebook or workflow was executed for this portfolio refresh. Learning interests in AI are not presented as completed professional projects.

The contact section includes required name, email and message fields. It validates
input and opens an encoded `mailto:` draft in the visitor's email client; the visitor
must send it there. This static site does not send or store messages itself. The
recipient address is not displayed as page text. Input is retained after opening a
draft, and a direct email link is available without JavaScript. Direct submission
from the website would require a configured form endpoint or email backend.

## Publications

Only the co-first-author papers in Journal of Genetics and Genomics (2024) and
BMC Genomics (2023) are displayed. Bibliographic details were read from the public
ORCID record on 2026-09-29. Co-first authorship was checked against the
[institutional publication listing](https://szmed.sysu.edu.cn/zh-hans/node/1287)
and [PubMed](https://pubmed.ncbi.nlm.nih.gov/37138231/), respectively.

Author lists and real-name biography are omitted. External publication and ORCID
pages may display author names. The publication list is static, not automatically synced.

## Files and maintenance

```text
index.html       Content, navigation and accessible email fallback
css/style.css    Responsive layout and light/dark color tokens
js/config.js     Public email configuration
js/main.js       Theme, mobile navigation, active links and email draft form
.nojekyll        GitHub Pages static-site marker
```

Content and navigation remain accessible without JavaScript. Theme and menu
buttons are enabled progressively. The mobile menu supports Escape and closes
on outside clicks or when keyboard focus leaves the navigation.

CSS and script URLs include a version query to avoid reusing previous assets
after a redesign. Bump the version when publishing subsequent asset changes.

The repository is `nihaonewworld/nihaonewworld.github.io` and deploys through
GitHub Pages. Review and validate changes before committing and pushing.

Desktop wheel scrolling uses a short, frame-rate-independent easing curve and a
bounded travel buffer to avoid queuing several screens after a large wheel burst.
Touch, zoom gestures, nested scroll areas and reduced-motion preferences retain
native scrolling. Keyboard, anchor and pointer interactions cancel pending easing.
Sections retain their viewport minimum height, with content aligned toward the top.

Typography is enlarged for the full-viewport layout. Study-note topics include keyboard-accessible expandable examples. The approach
section explains analysis decisions and result context; publications remain citations only.

After scrolling into a new section, the page gently aligns its top below the
navigation bar once scrolling settles. It does not repeatedly realign the same
section, preserving access to content taller than the viewport. Internal links
retain their exact destinations. Reduced-motion preferences disable alignment.
A decorative mouse-wheel cue appears at the bottom center during scrolling and
fades afterwards; it is hidden from assistive technology and in reduced-motion mode.

## iPhone compatibility

The mobile layout includes viewport-fit and safe-area insets, single-column
content, 44px contact/navigation targets, scalable text and Safari backdrop-filter
fallbacks. Viewport-height sections use svh with a vh fallback; taller content
expands naturally. Browser zoom remains available.

Touch devices use native momentum scrolling. Automatic section alignment and
pointer tilt are desktop-only, so they do not interrupt iPhone swipes or pinch
zoom. The scroll indicator remains decorative and does not intercept touches.
Real-device iPhone/Safari testing is still required; static checks alone do not
verify browser rendering or touch behavior.

## September 2026 content refresh

Expanded study-note previews use native `details` elements and work without JavaScript.
The approach section now explains data context, analysis decisions and interpretation;
the contact section includes a short guide for an initial message. New copy draws on
existing portfolio content and the previously recorded study-note examples, without
adding credentials, project outcomes or publication contribution claims.

The canonical and social URL is `https://nihaonewworld.github.io/`. Update both if
moving to a custom domain. No build tools, web fonts or additional dependencies were added.

## October 2026 knowledge base refresh

Replaced the former Study Notes showcase with Biology Knowledge Base and direct GitHub
links to its six populated content areas. Updated the introduction, social metadata,
workflow skills, learning interests and approach copy. Six expandable examples reuse
the existing responsive layout and native `details` elements. Publication citations,
public name, contact details and theme behavior are retained.

The October visual refinement uses a two-column desktop grid for the four skill
cards and six knowledge-base examples, with single-column layouts on phones.
Responsive headings, 12px topic tags and 16px form inputs improve the type hierarchy.
The contact form uses a separate writing surface within the green-blue panel.
