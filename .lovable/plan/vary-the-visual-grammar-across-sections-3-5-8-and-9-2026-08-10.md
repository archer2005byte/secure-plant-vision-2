# Vary the visual grammar across sections 3, 5, 8 and 9

Content stays exactly as written. Only the layout language changes, so consecutive sections stop reading as the same card grid repeated.

## Section 03 — Three horizontal archetype bands

Replace the three-column card grid with three full-width bands, stacked and separated by hairlines.

```text
┌──────────────────────────────────────────────────────────────┐
│ 01 [icon]  Enterprise-scale multi-plant operators            │
│            Typical challenge        │ Likely engagement      │
│            • ...  • ...  • ...      │ • ...  • ...  • ...    │
└──────────────────────────────────────────────────────────────┘
```

Each band: index number and icon in a narrow left gutter, archetype name as the band headline, then challenge and engagement side by side inside the band (stacked on mobile). Engagement column carries a subtle navy tint so the "so what" reads distinctly. No per-item card borders or shadows — one continuous surface.

## Section 05 — Radial maturity dial plus findings

Left: a compact SVG radial assessment wheel. Eight assessment domains (grouping the 16 examination items into: Architecture & zoning, Surveillance estate, Perimeter, Access & movement, Command centre, Network & storage, SOPs & drills, O&M & compliance) drawn as segments around a ring, each segment with a maturity band shown as fill depth on a shared 1–5 scale, with an interactive legend listing the underlying items on hover/select.

Right: the "what it reveals" findings as a plain numbered list on the navy band — no nested cards — with the selected domain's items surfacing above it.

Maturity values are shown as illustrative placeholder bands, labelled as such, since real scores come from the assessment.

## Section 08 — Lifecycle ribbon

Replace five stacked cards with a single continuous ribbon: one horizontal navy bar with five chevron/notch segments (Diagnose → Design → Procure → Deliver → Assure), and each stage's 3–4 outputs hanging directly under its segment as bare text columns with a thin connector tick. On mobile the ribbon becomes a vertical rail with a spine line. The vendor-neutral / governance-led / implementation-oriented stance line becomes a single inline text strip, not three tiles.

## Section 09 — Deliverables gallery

Replace the uniform 10-card grid with an asymmetric gallery: a filter row by lifecycle stage (All / Diagnose / Design / Procure / Deliver / Assure), then a mixed-size masonry-style arrangement where two anchor artefacts (Target Architecture, Coverage and Gap Heatmap) occupy wider tiles with a schematic thumbnail, and the rest render as compact borderless entries on a tinted plate with hairline dividers. Selecting a stage filters in place.

## Technical notes
- Files touched: `Segments.tsx`, `AsIsAssessment.tsx`, `Offerings.tsx`, `Deliverables.tsx`; assessment-domain grouping data added inside `AsIsAssessment.tsx`.
- Existing section ids, `SectionShell` usage, nav labels and deck navigation stay unchanged.
- Semantic tokens only (navy, brand, surface, hairline); Lucide icons; SVG for the radial dial and ribbon notches. No new dependencies.
- All layouts verified responsive: bands, ribbon and gallery collapse to single-column stacks on mobile.
