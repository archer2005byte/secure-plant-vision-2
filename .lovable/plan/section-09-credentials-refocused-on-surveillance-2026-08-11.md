# Section 09 — Credentials, refocused on surveillance

Right now the section leads with five power-sector consulting engagements (ERP, procurement, CMS) and buries the surveillance footprint in a single dark band of chips. The redesign inverts that: the surveillance and security programme footprint becomes the hero, shown on an India map, and the native power-sector engagements become a supporting strip.

## New structure

```text
[ eyebrow + title + intro ]
[ 4 headline stats: surveillance programmes | cities covered | states/UTs | GW of generation ]

┌──────────────── SURVEILLANCE FOOTPRINT (dark charcoal panel) ────────────────┐
│  category filters:  All · Power Sector · Safe City · ICCC · ERSS · Fire      │
│                     · Police/Other Surveillance · Counter-drone             │
│                                                                              │
│  ┌ left column ┐   ┌──── India map (interactive SVG) ────┐  ┌ right column ┐ │
│  │ Safe Cities │   │  outline of India, programme dots    │  │ Power Sector │ │
│  │ Smart/ICCC  │   │  coloured by category, hover/click   │  │ Large-scale  │ │
│  │  lists      │   │  a dot -> detail card                │  │ ERSS / Fire  │ │
│  └─────────────┘   └─────────────────────────────────────┘  └──────────────┘ │
│  legend (dot colour = category)   +   selected-programme detail card          │
│  "largest and most diverse defence and surveillance consulting practice"      │
└──────────────────────────────────────────────────────────────────────────────┘

[ POWER-SECTOR ENGAGEMENTS — compact accordion / table, 5 rows ]
[ closing note: further credentials on request ]
```

## Surveillance map

- Inline SVG India outline with programme markers positioned from lat/long, so nothing depends on an external map service.
- Marker colour encodes category, using the existing EY spectrum tokens: yellow = power sector, coral = safe city / police surveillance, amber = ICCC / smart city, ivory = ERSS, resilience-green = fire & disaster, charcoal-outline = counter-drone / specialised.
- Hover shows the programme name; click pins a detail card (programme, client type, category, scope in one line). Filters dim non-matching markers rather than removing them, so the national spread stays readable.
- Marker clusters in dense states (Maharashtra, MP, UP) get slight offsets so each stays clickable.
- Flanking columns list the same programmes as text — the deck must still read without interaction, and selecting a list item highlights its marker.

## Content carried over and expanded

Surveillance side (from the existing footprint data plus the reference slide): Delhi Safe City, Safe City J&K, Bengaluru Safe City, AP statewide surveillance, MP Safe Cities statewide, Gujarat VISWAS, Ladakh surveillance, DTC bus CCTV, Gurugram MDA; ICCC/Smart City — Gurugram, Nagpur, Navi Mumbai, Pimpri-Chinchwad, Nashik, Chhatrapati Sambhaji Nagar, Jalandhar, Amritsar, Bhubaneshwar, Prayagraj, Jaipur, Faridabad, Noida ITMS, Lucknow, Guwahati; ERSS — Chhattisgarh, Odisha, Bihar, MP, Maharashtra, Assam, Haryana, UP, Bengaluru; Fire & disaster — Chhattisgarh, Odisha, MP, Maharashtra; large-scale — integrated security surveillance across 60 cities of MP, cloud IP CCTV in AP, SBI centralized monitoring station, police station CCTV in Haryana & Bihar; counter-drone feasibility study for Mangalore Refinery & Petrochemicals.

Power-sector side: the five existing engagements (MSPGCL, UPRVUNL, DVC, NPCIL, NHDC) keep their capacity / role / unit / scope detail, but collapse into a compact accordion with the headline row always visible, so the section stops being dominated by them and still fits the deck viewport.

## Technical notes

- Files: `src/components/site/Credentials.tsx` split into `credentialsData.ts` (programmes with lat/long, category, detail) plus an `IndiaMap.tsx` presentational SVG component.
- Semantic tokens only (`ey-yellow`, `ey-coral`, `ey-amber`, `ey-charcoal`, `ey-cream`, `ey-resilience`); Lucide icons; no new dependencies.
- Section id `credentials`, `SectionShell` usage, nav label and deck navigation unchanged; min font floor (text-base) preserved for body text.
- Mobile: map above, lists stacked below, filters wrap.
