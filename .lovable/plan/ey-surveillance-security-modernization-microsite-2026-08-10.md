# EY Surveillance & Security Modernization Microsite

A single-page, boardroom-ready pitch microsite for power generation clients in India, built as the home route (`/`) with 11 stacked, presentation-ready sections.

## Visual direction

- Deep EY-style palette: deep navy/blue base, white surfaces, cool greys, one restrained amber/gold accent for emphasis and diagram highlights.
- Clean geometric sans typography (tight headings, generous line height for body), strong section spacing, thin borders, soft elevation on premium cards, sharp-ish radii.
- Icon-led layouts (Lucide), diagrams over paragraphs, no stock-photo collages. One generated abstract industrial/command-centre hero visual with subtle grid and monitoring cues.
- All colors as semantic tokens in `src/styles.css`; no hardcoded color utilities.

## Sections

1. **Hero** — full title, one-line value proposition, two CTAs ("Explore the framework", "Request an assessment"), generated abstract command-centre visual with subtle overlay grid.
2. **Why this matters now** — 5 insight cards with icons (critical infrastructure, risk spectrum, border/sensitive exposure, partial vs integrated surveillance, security as plant-wide risk function).
3. **Segments** — 3 side-by-side cards (PSU, State gencos, Border/sensitive plants) each with maturity note and a "What they need" line.
4. **Plant blocks** — zonal grid of all 15 blocks, grouped into perimeter / fuel & generation / utilities & support / people & digital bands, each with a one-line surveillance rationale.
5. **As-Is Security Assessment** — two-column layout: "What we examine" (all 16 dimensions as a compact checklist grid) vs "What it reveals" (paired insight statements), closing with the fact-base line.
6. **To-Be Integrated Security Architecture** — horizontal 5-stage layered flow (field devices → network/edge → VMS & analytics → command centre → incident response), component chips under each stage, plus the tailoring note.
7. **Use cases** — tabbed interface (Tabs component) or card grid for the 11 use cases; each shows Detects / Why it matters / Control-room response as a 3-step mini workflow.
8. **How EY Can Support** — capability matrix of the 13 offerings grouped into Assess / Design & Document / Procure / Implement & Sustain, with a vendor-neutral, governance-led positioning line.
9. **Engagement Roadmap** — 7-phase vertical/horizontal stepper timeline, each phase with its output.
10. **Why EY** — premium dark closing panel with 5 restrained credibility points and a statement CTA.
11. **Closing CTA** — simple strong band with the suggested copy and two CTAs.

Plus a slim sticky top nav with in-page anchors for meeting navigation, and a minimal footer with a placeholder note for client-specific facts.

## Behaviour

- CTAs scroll to the relevant section (framework → Section 6, assessment → Section 11). No backend, no forms submitted anywhere yet — CTA buttons are presentation-level and can later be wired to a contact flow.
- Fully responsive: multi-column grids collapse to single column, the architecture flow becomes vertical on mobile, tabs become stacked cards.
- Content-only placeholders (e.g. bracketed "[client-specific metric]") where facts aren't known.

## Technical notes

- Rewrite `src/routes/index.tsx` as the microsite page with `head()` metadata (unique title, description, og/twitter tags).
- Extract each section into its own component under `src/components/sections/` for maintainability; shared small pieces (SectionHeading, PremiumCard) under `src/components/`.
- Add design tokens (navy scale, accent, diagram surface colors, elevation shadows) to `src/styles.css` in the existing `@theme inline` + `:root` pattern; load fonts via `<link>` in `src/routes/__root.tsx`.
- Use existing shadcn primitives where present (Card, Tabs, Button, Badge, Accordion); add any missing primitive files as needed.
- Generate one hero visual into `src/assets/` and import it as an ES6 asset.
