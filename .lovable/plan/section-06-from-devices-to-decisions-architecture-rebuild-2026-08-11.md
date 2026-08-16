# Section 06 — "From Devices to Decisions" architecture rebuild

Replaces the current three-column diagram (which is wider than every other section and forced 11px type) with an executive-first, five-layer architecture that a senior client reads in ten seconds and a technical reader can open up.

## Layout

Single container at the same width as every other section, so Section 06 stops being the odd one out.

```text
+--------+---------------------------------------------+------------+
| CYBER  |  05  GOVERNANCE & OPERATIONAL RESILIENCE    | ENTERPRISE |
|  &     |      Measure - Govern - Improve             |     &      |
| RESIL- |  ------------------------------------------ |  EXTERNAL  |
| IENCE  |  04  COMMAND, RESPONSE & DECISION           | INTEGRATION|
|        |      See - Decide - Act                     |            |
| spans  |      DETECT EARLIER . DECIDE FASTER .       |  Plant /   |
|  all   |      RESPOND BETTER                         | Enterprise |
|  five  |  ------------------------------------------ |            |
| layers |  03  SECURITY INTELLIGENCE & PLATFORM   *   |  External  |
|        |      Correlate - Analyse - Understand       |  Agencies  |
| SECURE |  ------------------------------------------ |            |
|  BY    |  02  EDGE COMPUTE & RESILIENT NETWORK       | integrates |
| DESIGN |      Process - Transport - Preserve         |  into the  |
|   .    |  ------------------------------------------ | architect- |
| RESIL- |  01  FIELD DETECTION & IDENTITY             |    ure     |
| IENT BY|      Sense - Detect - Identify              |            |
| DEFAULT|      (plant-perimeter illustration behind)  |            |
+--------+---------------------------------------------+------------+
         FROM DEVICES TO DECISIONS  +  five principles
```

Hierarchy, not a uniform grid:
- Layer 03 is the centre of gravity — taller panel, ivory surface, soft inner glow, a faint data-fusion / command-centre motif, and its components read as one platform (a single rounded platform frame containing the modules) rather than nine separate boxes.
- Layer 01 sits on a faint contextual illustration of plant perimeter, gate, transmission tower and camera coverage cones.
- Layers 02, 04, 05 are calmer sage/cream panels. Layer 04 carries the human-operator motif and the "detect earlier, decide faster, respond better" line as its own gold-accented strip.
- Between layers: a thin upward flow band carrying the payload wording ("VIDEO - TELEMETRY - IDENTITY - SENSOR EVENTS", "CORRELATED EVENTS - ALARMS - EVIDENCE - SITUATIONAL AWARENESS", and so on) instead of a plain arrow.
- The two rails are slim, visually continuous full-height strips (one background, hairline ticks into each layer), not stacked card lists. The right rail splits into "Plant / Enterprise" and "External Agencies" groups so integrations read as external to the core platform.

## Content

Exactly the component sets from your brief, per layer and per rail. The executive default shows only the principal components (4-5 per layer as chips with thin-line icons); the remainder opens on interaction.

## Interactivity

- Default: clean architecture, principal components only.
- Hover or focus a layer: it lifts slightly, its adjacent flow bands and the relevant rail items illuminate, other layers desaturate a little.
- Click a layer: an inline detail drawer expands under its title with the full component list, each with a one-line technical descriptor. Keyboard accessible, one layer open at a time.
- Entrance: on first scroll into view, layers reveal bottom-up (01 to 05) with a short stagger, flow bands fading in after their layers. Respects reduced-motion and stays subtle.

## Closing statement

A gold hairline, then FROM DEVICES TO DECISIONS with the supporting sentence, and five small principles beneath: Secure by Design | Resilient by Default | Open & Interoperable | Human in the Loop | Auditable Operations. The existing tailoring note and the drone-regulation / agency-led-mitigation note stay, condensed to one line each.

## Palette

Stays inside the site's cream-and-green system: deep forest green, sage, warm cream, ivory, restrained antique gold, charcoal text. No neon green, bright yellow or electric blue. Section 06 moves from the current dark panel to a cream/ivory canvas with deep-green structure, which is also what makes the type legible again.

## Also folding in: credentials at the end

Your credentials ask from the earlier message stays on the list as a separate section after "What EY Brings": power-sector engagements (MSPGCL/MAHAGENCO, UPRVUNL, DVC, NPCIL, NHDC with capacity, EY role and scope exactly as written in the deck) plus the surveillance / ICCC / ERSS footprint chips and the practice positioning line, replacing the three dashed placeholder slots in Section 10. Section 06 gets built first, then this, in the same pass.

## Technical notes

- Rewrite `src/components/site/ToBeArchitecture.tsx` with `ArchitectureLayer`, `FlowBand`, `CrossRail` and `ComponentChip` sub-components, plus a `toBeArchitectureData.ts` sibling holding layer and rail content.
- Layout: `lg:grid-cols-[minmax(0,9rem)_minmax(0,1fr)_minmax(0,11rem)]` inside the standard `max-w-6xl`. On mobile the rails move below the stack as two collapsible groups.
- Motion via CSS transitions plus a small IntersectionObserver stagger hook, no new animation dependency.
- Any new tokens (ivory, sage, gold hairline, platform glow, layer elevation shadow) go into `src/styles.css` under the existing `@theme inline` and `:root` pattern. No hardcoded colour utilities.
- Generate one faint plant-perimeter line illustration and one command-centre motif into `src/assets/`, used as low-opacity masked backgrounds behind layers 01 and 03.
- One icon family throughout (Lucide, thin stroke).
- Section 06 keeps `id="to-be"` so deck navigation, fit-to-screen zoom and existing anchors keep working. Verify with Playwright at 1280x800 and 390 wide that the whole architecture fits one desktop screen and neither rail ends in dead space.
