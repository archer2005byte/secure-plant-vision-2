# Plan: Make risk logic and operational outcomes explicit

## What we will build

Two targeted additions that turn the architecture from a technology catalogue into a risk-led consulting proposition:

1. **Risk logic strip** between Sections 4 and 5.
   - Compact visual formula:
     ```
     Asset Criticality × Threat Exposure × Vulnerability × Consequence × Response Capability → Required Security Posture
     ```
   - One-line explanation: why one plant gets thermal cameras and fibre PIDS while another gets ordinary CCTV plus access-control rationalisation.
   - Acts as a hinge between the interactive plant schematic and the as-is assessment.

2. **Operational outcome statement** near the top of the page.
   - Three end outcomes a plant head can retain:
     ```
     Detect earlier. Decide faster. Recover with less operational impact.
     ```
   - Positioned as an early anchor so the rest of the page reads as the "how" behind these outcomes.

## Changes

### File: `src/routes/index.tsx`
- Insert a new `RiskLogicStrip` component between `<PlantBlocks />` and `<AsIsAssessment />`.

### File: `src/components/site/RiskLogicStrip.tsx` (new)
- Render a full-width navy band with the formula, the explanatory sentence, and a small icon.
- Keep it compact enough to fit cleanly in the deck-mode, single-section-per-viewport layout.
- Ensure it does not introduce a new section header that would compete with the numbered flow; it will read as a connecting insight strip.

### File: `src/components/site/Hero.tsx` (or `WhyNow.tsx` if it fits better)
- Add the outcome statement near the top. Candidate placements:
  - Hero sub-line below the current subtitle.
  - A short outcomes bar directly under Hero.
- Decision: place it inside `WhyNow.tsx` as the first visible element, so it carries the outcome language into the strategic-drivers section without cluttering the hero image.

### File: `src/components/site/WhyNow.tsx`
- Add a prominent three-outcome bar at the top of the section before the six driver cards.
- Style it as a large, spaced-out phrase with minimal decoration so it reads like a tagline, not a card.

## Why this placement

- The risk strip sits where the user has just seen the plant map and is about to see the assessment. It answers the implicit question: *how do we decide which controls go where?*
- The outcome statement sits early because every subsequent section (architecture, use cases, offerings, deliverables) should be interpretable as a means to one of those three ends.

## Acceptance criteria
- New risk strip is visible between Sections 4 and 5, readable on desktop and mobile, and does not break the existing deck-mode keyboard navigation.
- Outcome statement is visible in the first third of the page and uses the exact wording: *Detect earlier. Decide faster. Recover with less operational impact.*
- No existing section functionality is removed or rearranged; only these two additions are made.
