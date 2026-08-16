# Merge Sections 08 and 09

Today both sections tell the same process story. Section 08 lists Assess / Design / Procure / Implement; Section 09 repeats it as a 7-phase roadmap. The fix: keep one lifecycle, and turn the second section into tangible deliverables.

## Section 08 — How EY Can Support (horizontal lifecycle)

Five stages across one row (stacked on mobile), each numbered, connected left-to-right, with 3-4 outputs beneath:

```text
Diagnose → Design → Procure → Deliver → Assure
```

- **Diagnose** — security maturity assessment, site risk assessment, coverage and gap analysis, threat and zoning baseline
- **Design** — to-be integrated architecture, zoning and control mapping, phasing and CAPEX bands, DPR preparation
- **Procure** — technical specifications, BoQ and cost estimation, RFP drafting, vendor evaluation framework
- **Deliver** — implementation PMU/PMC, milestone and issue governance, FAT/SAT/UAT support, SOP design and training
- **Assure** — acceptance sign-off, SLA and O&M framework, KPI and uptime reporting, continuous improvement roadmap

The existing vendor-neutral / governance-led / implementation-oriented stance strip stays below.

## Section 09 — What the Client Receives (deliverables, not process)

Replaces the roadmap timeline with a deliverables grid — one card per output, icon-led, with a one-line description of what it is and where it gets used:

1. Security Risk Register
2. Plant Security Zoning Plan
3. Coverage and Gap Heatmap
4. Target Architecture
5. Phased CAPEX Plan
6. Technical Specifications
7. Bill of Quantities (BoQ)
8. SOP Catalogue
9. Acceptance Test Framework
10. Operational KPI Dashboard

Each card shows the deliverable name, a short line of substance, and the lifecycle stage it comes from (Diagnose / Design / Procure / Deliver / Assure), so the two sections reinforce each other instead of repeating.

A closing note states that the final deliverable set is confirmed in the engagement scope.

## Technical notes

- `Offerings.tsx` — replace the 2x2 card grid with a 5-stage horizontal lifecycle (5-column grid on desktop, vertical stack on mobile), keep the stance strip.
- `Roadmap.tsx` — replace the vertical timeline with the deliverables grid; rename the exported component to `Deliverables` and the section id to `deliverables`, retitled "What the Client Receives".
- Update the section label to "Deliverables" in `SiteNav.tsx` and `DeckNavigation.tsx`, and the import/anchor in `src/routes/index.tsx`.
- Reuse existing tokens (navy, brand, hairline, surface, surface-2, shadow-card) and Lucide icons; no new dependencies.
