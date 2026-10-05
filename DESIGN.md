# Aradhya Singh — Portfolio Design (V4)

## Intent
A personal developer portfolio, about Aradhya first. Projects are evidence of the work, not the identity of the site. No metrics, traction, or invented claims; the résumé PDF carries the detail.

## Layout
- Sticky top bar: name on the left; Work, Experience, About, Résumé on the right. It is transparent at the top of the page and gains a solid ground and hairline once the page scrolls. The active section's link is underlined in the accent colour.
- Full-width editorial page (max 1440px) on a 12-column grid. Each section places its content differently:
  - Hero (full first screen, vertically centred): headline in columns 1–7; columns 9–12 hold a square slot for a hero SVG (`.hero-art`, outlined with a dashed border in development only, hidden at 900px and below). No facts row or social links; nothing repeats what the sections below say.
  - 01 Selected Work: six equal cards, three per row across the content column (two at 900px and below, one at 640px and below) (components/WorkCards.tsx). Each card is a 3:2 stage over a caption (name, one sentence, links/status); the name's click area covers the whole card. Stages show the product doing its one thing, rebuilt as UI rather than screenshots of marketing images: Hushfield's rain scene with the home screen, QueryIO passing an agent's query through to PostgreSQL, PageMind answering from a highlighted line, v2.aradhya's first screen with its stepping nav, v1.aradhya's intro typing out the name. The sixth card, More projects, lists the rest of the archive (components/projects.ts) as a slow scrolling ledger.
  - Card motion (components/CardMotion.tsx): each stage plays its story once on scroll-in and again on hover, a soft light follows the pointer, and ambient loops (rain, sound bars, ledger) run only while the card is on screen. Every stage is finished at rest, so reduced motion and no-JS show the complete frame.
  - 02 More Work: two-column text-only list. The /project_archive link is a pill-shaped chip, the only chip on the site, because it goes to another page.
  - 03 Experience: the header runs across the top. Below it is a full-width table: date (columns 1–3), company and role (4–8), note (9–12).
  - 04 About: narrow column offset to columns 6–10.
  - 05 Contact: a short statement in the content column, one line of copy, the email address itself as the main link, then GitHub and LinkedIn.
- At 900px and below, the grid collapses to one column. At 640px and below, a cover sits above its row at 10rem wide.

## Visual system
- Dark only. Warm black #0b0b0a, primary text #ebe6dc, body text #bdb8ae, metadata #8d887f, oversized section numbers #7d7972, rules #23221f. One champagne accent (#c9b68f) for the active nav underline, link hover, and the hovered project dash.
- Links are plain text with a hairline underline, with no arrow glyphs anywhere.
- Instrument Sans for all text. Geist (light) for the big section numbers and dates, because its zero is plain (Geist Mono slashes it). Geist Mono for small labels and status.
- Tokens are in tokens.css. Styles are in app/portfolio.css.

## Motion
Nearly static. Allowed motion: the active-nav underline, link colour on hover, cover brightness/scale and dash growth on project-row hover, and smooth anchor scrolling. prefers-reduced-motion disables transitions (globals.css).
