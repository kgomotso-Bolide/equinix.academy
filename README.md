# Equinix · AI Skills Programme — Website Blueprint

## Changed on 19 August 2026

Kgomotso's five changes, rolled out of SPS. Anything below this note that
contradicts it is out of date.

1. **Occupational Certificate: Computer Technician is withdrawn.** Out of the
   catalogue, the course template, the assistant and `learner_catalogue()`.
   Enrolment rows already filed against it are untouched.
2. **Occupational Certificate: Project Manager is first** on the home page and
   the catalogue, and is what a bare `/course` renders. It was not on the home
   page at all before this — the qualification arrived after that page was
   built, so the one course anybody can enrol on was the one not shown.
3. **Courses run online or in person.** Only the ones we deliver ourselves; the
   Coursera, Google and Helsinki courses still say ONLINE, because they are.
4. **Less reading.** The accreditation essay is one sentence and the "Ask us"
   panel has gone. **Skills Gap, RPL and AI in Action are removed**, left as
   redirects rather than deleted because links to them have already been
   emailed out and a 404 on this host serves the client's own homepage.
   `skills-gap.js` and `demo.js` are deleted. The profile page lost its skills
   panel and the four background selects that only fed it.
5. **New Graduates page** — `graduates.html` + `graduates.js`, in the nav
   between Courses and Contact. It ships with an empty list and renders an
   honest "we are still collecting these" panel rather than invented people.
   Every entry needs `consent: true`: a name, a photograph and an employer on
   a public page are personal information under POPIA.

Two things that were already broken and were fixed on the way through:

- `profile-page.js` read `window.FungiProfile` / `MazivProfile` /
  `EquinixProfile`, but the shared `profile.js` names its API
  `window.SPSProfile`. This page had thrown on its first line since the day
  that file was synced. It now finds the store by what it implements.
- The injected **Sign in** link was body-grey on a saturated brand nav bar.

---

> **AI Skills, Built In-House**
> Equinix Academy is Equinix's own training academy, for Equinix staff: a catalogue of 800
> qualifications and courses, fully funded by the company and delivered online. Accredited
> qualifications are delivered in association with Centenary Networks, a QCTO-accredited
> Skills Development Provider.

This repository is the public-facing website for the programme. This README is the **blueprint**:
it captures the positioning and messaging spine and documents how the site is built so anyone can
maintain or extend it.

---

## 1. The Spine (positioning — do not drift from this)

**What this is:** an **in-house academy**, not a product being sold. The site speaks to Equinix staff
in Equinix's voice: courses are **fully funded by Equinix**, you **register your interest with HR**,
and the primary action is **Upskill Yourself** rather than "Talk to Our Team". The catalogue runs to
**800 qualifications and courses** (20 live on the site today), including the nationally accredited
**Occupational Certificate: Computer Technician**.

> ⚠️ **Do not reintroduce the "credit-bearing" framing.** An earlier revision positioned the product
> as credit-bearing modules laddering toward a qualification, with B-BBEE Skills Development returns
> as the buying reason. That was reverted (30 Jul 2026, boss's instruction): **no "credit-bearing,"
> no "stackable credits," no B-BBEE sales angle.** We offer courses, straight. Credit counts may
> still appear as a factual attribute of the accredited qualification (NQF 5, 282 credits) — never
> as the product model.

The three supporting pillars on the home page:

1. **800 Courses and Growing** — the catalogue spans technical, business, compliance, safety and admin, so this isn't only for the people whose jobs already touch AI.
2. **Built Around Your Job** — every course is grounded in the work we actually do, so what you learn this week you can use next week.
3. **Fully Online** — study from any site or from home; no travel, no lost shifts, training that fits around operational duties.

> ⚠️ **Structure is shared with the Fungi and SPS academies.** The three sites run the same pages,
> components and JS; only brand, palette, logo and industry vocabulary differ. Change the structure
> on one and it should be ported to the other two, or they drift apart.

**Audience:** Equinix staff — a **digital infrastructure business** (data centres, interconnection).
Everyone from data centre technicians and field engineers to network operations, support, admin and
management. No technical background assumed.

**The industry line:** *"Data centre technicians, field engineers, network operations and support
staff — all building real technical and AI capability. Practical courses that fit around the working
day, and a credentialed path for anyone who wants to take it further as infrastructure gets smarter."*

**Industry vocabulary** (what changes from the Fungi original): metering → data centre operations.
The Skills Gap roles are Data Centre Technician · Field Engineering · Network Operations · Customer
Support · Data & Systems · Team Lead · Manager · Admin & Support. Same eight keys as the other two
sites — `skills-gap.js`, `profile.html` and `profile-page.js` must agree on them.

**Primary calls to action:** `Explore Courses` · `Upskill Yourself`

### Approved hero copy (current)
- **Badge / eyebrow:** AI · Live & Hands-On — Our In-House Academy · Online · For Equinix Employees
- **Headline:** AI Skills, Built *In-House*
- **Subtext:** Equinix Academy is our own training academy — open to you, funded by Equinix, and delivered
  online so it fits around your work. AI is where we started, and our catalogue now runs to 800
  qualifications and courses across every part of the business.

---

## The Engine — One Platform, Many Companies (white-label)

This site is the **first instance of a reusable platform ("the engine")**. The *same* platform will be
**replicated across Newgx-invested companies** — e.g. **SPS, Fungi, Equinix, Maziv, Inhance** — each as its own
website: identical engine and product model, different company brand.

The **product never changes** between companies: professional online AI courses, plus an accredited
qualification delivered through an accredited provider.

| Changes per company (the re-skin) | Stays the same (the engine) |
|---|---|
| Company name & logo (`sps-dark-logo.svg`) | Page structure, sections & components |
| Brand palette (`:root` colour tokens in `styles.css`) | Design system & component styling |
| Contact details (email, phone, hours) | The three pillars + courses-first positioning |
| Industry line (Equinix = data centres; SPS = solar; etc.) | `course.html` template + catalog/content model |
| Hero wording nuance | Video-lightbox + PDF-download mechanics |
| Accreditation partner/number (if not Centenary Networks) | Nav, footer, CTA patterns (`Explore Courses` / `Talk to Our Team`) |

**Recommended build:** centralise every company-specific value into a single **`BRAND` config block**
(name, logo path, accent colours, contact, industry line, accreditation details). Launching a new
company site then = copy the repo, edit one block, drop in the logo. *Status: proposed — not yet
refactored; the current site has Equinix values inline.*

**Repo model:** one repo + GitHub Pages site per company (this one is `kgomotso-bolide/equinix.academy`).

---

## 2. Brand & Design System

| Token | Value | Use |
|-------|-------|-----|
| **Red (primary)** | `--orange: #e91c24` / `--orange-deep: #c1141b` / `--orange-light: #ff4d57` | Buttons, eyebrows, nav active state, CTA bands, card titles |
| **Purple (secondary)** | `--green: #6c4ba6` / `--green-deep: #513a7d` | QCTO badge, live dot, accents |
| Canvas | `#ffffff` / `#f7f5f9` (white / cool off-white) | Backgrounds |
| Ink | `#2b2b2b` / `#4d4c4d` | Body & heading text |
| Dark | `--dark: #23182c` (Equinix plum) | Nav CTA pill, footer, dark sections |

**Rule:** the site leads with the **Equinix red** (`#e91c24`, taken from equinix.com), with purple as the secondary accent, on a white
canvas. (A monochrome black/white/grey revision existed briefly and was reverted on 30 Jul 2026 —
don't reintroduce it.)

- **Logo:** `equinix-logo.jpg` 
- **Type:** system font stack led by Inter — no external font files.
- **Imagery:** real topic-matched photography (Unsplash CDN) on course cards; the rest is
  self-contained CSS gradients + inline SVG, so there are almost no binary image assets to manage.
- **Motion:** subtle scroll-reveal; a low-key grey neural-network canvas in the hero; all respects
  `prefers-reduced-motion`.

---

## 3. Site Map & Files

```
sps/
├── index.html              # Home: hero + NQF explainer, 800-catalogue band, GM message,
│                           #   3 pillars, course teaser, photo posters, CTA
├── courses.html            # Courses hub: search + credential/subject filters, three bands
│                           #   (ours · more AI · free international), accreditation badges
├── about.html              # About: positioning, industry line, accreditation, photo posters
├── skills-gap.html         # Skills Gap Analysis — 3-step self-assessment, runs in-browser
├── rpl.html                # Recognition of Prior Learning: the three QCTO purposes,
│                           #   portfolio of evidence, the process, and what RPL is not
├── profile.html            # Optional local profile (no account, localStorage only)
├── ai-in-action.html       # Interactive AI demo + impact stats
├── contact.html            # Contact details + working registration form
├── course.html             # ONE data-driven COURSE template — renders any course via ?c=<slug>
├── ai-fundamentals.html    # Legacy URL → redirects to course.html?c=ai-fundamentals
├── thanks.html             # Form submission confirmation page
│
├── styles.css              # SHARED stylesheet for every page (brand tokens in :root)
├── site.js                 # SHARED: nav toggle, scroll shadow, ?course= prefill
├── cards.js                # SHARED: course-card photo banners + links (Home + Courses)
├── courses-index.js        # Courses page: search/filter, external cards, badge popovers
├── profile.js              # SHARED: profile store, nav avatar, form prefill, save-a-course
├── profile-page.js         # Profile page: hydrate form, skills snapshot, saved courses
├── skills-gap.js           # Skills Gap model + rendering (also runs headless under Node)
├── assistant.js            # SHARED: client-side "Ask the Academy" AI assistant
├── neural.js               # Home hero neural-network canvas (motion PAUSED — see file)
├── demo.js                 # AI-in-Action typewriter demo + counters
│
├── images/gm-photo.svg     # PLACEHOLDER — General Manager portrait, awaiting the real photo
├── images/poster-1.svg     # PLACEHOLDER — academy photograph 1
├── images/poster-2.svg     # PLACEHOLDER — academy photograph 2
│
├── sps-dark-logo.svg       # Brand mark
├── resources/*.pdf         # Downloadable PDF resources (placeholders, swappable)
├── .gitattributes          # Marks PDFs/images as binary (prevents corruption)
└── README.md               # This blueprint
```

**Multi-page, shared-asset architecture** (no build step). Every page links `styles.css` + `site.js`
+ `assistant.js`, so design/behaviour lives in **one place** — ideal for the white-label goal
(re-skin = edit `styles.css` tokens + swap logo). Nav links navigate between real pages; the current
page is marked with `class="active"`.

### Key pages
- **Home / About / Courses / AI in Action / Contact** — one independent, lean, course-focused page each.
- **`course.html`** — the **Harvard-Online-style** COURSE template, **video-heavy with PDF
  downloads**, driven by a JS catalog (20 courses, each with its own curriculum). Sections: hero with
  intro video · "what you'll learn" · module/lesson accordion (video lightbox) · video gallery ·
  downloadable resources · facilitator · CTA. ("Module" here means a *unit inside a course* — a
  chapter of lessons — not a product.)

---

## 4. Content Model

All course content lives in one place: the **`COURSES` catalog** inside `course.html`.

```js
"<slug>": {
  title:  "…",            // course title
  cat:    "Business",     // category → drives the "what you'll learn" defaults
  mode:   "Online · Self-paced",
  level:  "Beginner",
  img:    "<unsplash-id>", // hero/card photo
  lead:   "…",            // description paragraph
  avail:  "Coming Soon",  // optional status
  accred: true,           // optional — flags the accredited qualification
  modules:[ { t:"Module title", lessons:[ "Lesson 1", … ] }, … ]  // optional bespoke curriculum
}
```

- **20 courses** are catalogued today. Cards on the home page auto-link to `course.html?c=<slug>`.
- **Videos:** each lesson has a `data-src`. Empty = "unlocks on enrolment"; `SAMPLE` = a placeholder
  preview stream. Swap in a real `.mp4`/Vimeo/YouTube URL to go live.
- **PDFs:** the five files in `resources/` are real, valid, downloadable placeholders. Replace the
  files (keep the names) to ship real content.

> ⚠️ **Placeholder content:** module outlines, durations ("6 weeks / 18 videos"), the facilitator,
> the sample videos and the PDFs are **demonstration placeholders**. The footers say so. Replace
> before any public launch.

---

## 5. Tech Stack & Hosting

- **Static HTML/CSS/JS** — no framework, no backend, no database, no build.
- **Hosting:** GitHub Pages (free), served from `main` branch root.
  - Repo: `https://github.com/kgomotso-bolide/equinix.academy`
  - Live: **https://kgomotso-bolide.github.io/equinix.academy/**
- **Deploy = push.** Every push to `main` triggers a Pages rebuild (~1 min).

```bash
# from the Equinix/ folder
git add -A
git commit -m "…"
git push          # site updates automatically
```

---

## 6. How To… (maintenance recipes)

- **Add a course** → add one entry to the `COURSES` object in `course.html`, and one
  `["<title fragment>","<slug>","<unsplash-id>"]` row to the `CARDS` array in `cards.js`.
  No new file needed.
- **Swap in a real video** → set the lesson's `data-src` to the video URL in the catalog.
- **Swap a PDF** → replace the file in `resources/` with the same filename.
- **Change copy** → hero copy lives in `index.html`; course copy in the `COURSES` catalog.
- **Adjust colour** → edit the CSS variables in `:root` in `styles.css`.

---

## 7. Accreditation (legal — keep verbatim)

> Accredited qualifications are delivered in association with **Centenary Networks (Pty) Ltd**,
> accredited by the **Quality Council for Trades and Occupations (QCTO)** as a Skills Development
> Provider. Accreditation No. **07-QCTO/SDP180526182035**, valid **15 May 2026 – 14 May 2031**.

The accredited qualification itself is the **Occupational Certificate: Computer Technician**
(NQF 5, Qualification ID **101408**, 282 credits).

Per the boss, this block should appear on the **credentials / about section** (it's rendered in the
About section's accreditation note) as well as the footer.

Non-accredited short courses must be labelled as such; only the Computer Technician pathway is the
accredited qualification.

---

## 8. Roadmap / Open Items

- [x] **Reverted to courses-first positioning (30 Jul 2026)** — removed all credit-bearing / stackable-credits / B-BBEE language site-wide, restored the courses-first palette, renamed `modules.html` → `courses.html` and "Modules" → "Courses" throughout. See the warning in §1.
- [x] **Per-course outlines** — each of the 20 courses has its own tailored curriculum (`MOD_*` arrays in `course.html`).
- [x] **Working contact form** — wired to **FormSubmit.co → accounts@cn.co.za** (redirects to `thanks.html`); real email/phone in place. *First submission triggers a one-time activation email to accounts@cn.co.za — click it to start receiving enquiries.*
- [x] **AI assistant** — self-contained client-side helper (`Ask the Academy`) on every page: finds courses, explains how the training and accreditation work, routes to the team. No backend/API key (safe on static hosting); upgradeable to a live LLM later if a backend is added.
- [x] **Ported the Fungi structure (4 Aug 2026)** — same pages, components and JS as the Fungi and
  SPS academies; only brand, palette, logo and industry vocabulary differ. Added Skills Gap,
  Profile, the course search/filter index, the 800-catalogue band, the GM message and the poster band.
- [x] **Internal voice** — the site speaks as Equinix's own academy to Equinix staff: "Fully funded by
  Equinix", "register your interest with HR", "Upskill Yourself". No group rates, no corporate quotes.
- [x] **Intake announced: 10 September 2026 (12 Aug 2026)** — Centenary confirmed the start date, so it's
  on the landing page as a dark band under the hero, on the catalogue card, on the qualification page
  (via a `starts` field on the course record) and as the planner default. The date is the provider's;
  the per-module dates on `pm-schedule` are still ours, and that page now names the difference rather
  than blurring it. `OFFICIAL_DATES` stays null — we have a start, not a programme calendar.
- [ ] **GM name, photograph and message** — `images/gm-photo.svg` is a placeholder; the name reads
  "Name to follow" and the quote is generic. Replace all three when Equinix supplies them.
- [ ] **Academy photographs** — `images/poster-1.svg` and `poster-2.svg` are placeholders on both the
  home and about pages, with "Caption to follow" captions. Swap the images and rewrite the captions.
- [x] **Recognition of Prior Learning (11 Aug 2026)** — `rpl.html` plus the Skills Gap wiring, ported
  from Fungi on Kgomotso's instruction that RPL is available to staff at all three companies. The Skills
  Gap result now reads an RPL case off answers it already collects (qualification, years, self-rating)
  and offers it in three tiers. Access is offered only to candidates holding nothing formal, since Matric
  is normally the NQF 5 entry requirement — telling a Matric holder they need RPL to get in would be
  wrong. Linked from every footer, from the accreditation explainer on `courses.html`, and from any
  course flagged `acc:"local"`.
- [x] **Project Manager NQF 5, in full (12 Aug 2026)** — ported from SPS so all three academies carry
  the same structure. Adds the registered qualification (SAQA **101869**, curriculum 121905000, NQF 5,
  240 credits) plus everything around it:
  - `module.html` + `pm-modules.js` — the 11 knowledge modules as study guides: 51 topics with their
    registered weightings, 265 sub-topic areas, the defining idea for each. Credits sum to 80 and every
    module's weightings sum to 100, asserted in the browser so a bad edit fails loudly.
  - `pm-pathway.html` — how the Google Project Management Certificate maps onto the qualification.
    Carries **Centenary's own 50% overlap figure**, attributed to them, not our earlier mapping.
  - `pm-schedule.html` / `pm-schedule.js` — pace → module dates → `.ics` calendar invites. Its
    `BRAND`/`UID_HOST` constants name this academy, because they end up inside the downloaded file.
  - `pm-progress.html` / `pm-progress.js` — self-reported progress, submitted to HR, printable with a
    manager countersignature. Deliberately **no backend**; see the SPS README for the POPIA reasoning.
  - `locks.js` — the switch for narrowing the catalogue to a named set of courses. **Off here** (12 Aug
    2026): the whole catalogue is open. SPS runs it on while the Project Manager material is prepared;
    each academy sets it independently. Set `LOCKS_ON = true` in that one file to narrow this one, and
    the `OPEN_TITLES` / `OPEN_SLUGS` lists are left intact so it returns to exactly its previous state.
  - **Documents are not hosted here.** Assessment papers, marking memos and facilitator guides are
    excluded outright; learner guides and workbooks sit behind Drive/SharePoint links set in `DOCS`.
  - Bug found during this port: `pm-progress.js` hardcoded `window.SPSProfile`, so progress silently
    disabled itself on Equinix (`EquinixProfile`). It now discovers whichever profile global the site
    exposes. Worth remembering — the three sites do not share global names.
- [ ] **Fill in the `DOCS` links in `pm-modules.js`** — 33 slots (guide/workbook/video × 11) are `null`,
  so every module currently reads "Ask HR for a copy". Set each file's sharing permissions *before*
  pasting its link: these pages are public, so a link is only as private as its own sharing setting.
- [ ] **Sign off the Skills Gap role targets** — the eight per-role targets in `skills-gap.js` were
  written from this site's own description of the work and have **not** been reviewed by the people who
  run those teams. The page says so; get them checked before anyone treats the output as authoritative.
- [ ] **Load the remaining catalogue** — only 20 of the 800 are on the site, and the Skills Gap tool
  only recommends from those 20. The copy is explicit about this and points staff at HR.
- [ ] **Real content** — videos + PDFs + facilitator bios from Equinix/Centenary.
- [ ] **Real phone number** — `012 345 6789` is still a placeholder on the contact page and in the assistant.
- [ ] **Custom domain** (e.g. `academy.sps…`) once decided.

---

*Project for Equinix, in association with Centenary Networks (QCTO).
Blueprint shared with the SPS and Fungi Academy sites (same engine, different brand).*
