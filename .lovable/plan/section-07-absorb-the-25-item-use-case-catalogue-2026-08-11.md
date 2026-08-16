# Section 07 — Absorb the 25-item use-case catalogue

The uploaded appendix lists 25 use cases as short detection chains (DETECT -> CORRELATE -> RESPOND). Section 07 today has 12 richly written plant scenarios in four groups. Rather than replace depth with a flat list, Section 07 becomes two coordinated views.

## What gets incorporated

Kept as-is (already present in Section 07, matching catalogue items):
- Perimeter intrusion, switchyard intrusion, restricted/generation-block access, control-room approaches (1, 2, 7)
- Fuel/material theft and unauthorised vehicle (4, 5, 6)
- Transformer fire / smoke corroboration (3, 15)
- Drone intrusion (8), crowd formation (11), loitering (12), camera tampering (24)
- Dam intrusion (20), personnel in hazardous zone (9-adjacent)

New scenarios added from the catalogue (genuinely missing today):
1. Worker fall / person-down (safety)
2. PPE violation (safety)
3. Thermal hotspot — conveyor, mill, cable gallery, correlated to SCADA/FAS
4. Gas-area intrusion — Ex-rated zone
5. BESS thermal event — heat anomaly via BMS/FAS
6. Solar-field intrusion (module theft / panel-row breach)
7. Wind turbine / remote asset access
8. Tunnel or water-conductor intrusion (hydro)
9. Suspicious vehicle behaviour (dwell, repeat pass, ANPR behaviour)
10. Abandoned object
11. Multi-camera investigation (post-event forensic search)
12. Equipment tampering (asset protection, CMMS-linked)

Result: the detailed scenario set grows from 12 to about 20 curated scenarios, organised into five groups — Generation and electrical, Material and movement integrity, Safety and process (fire, gas, thermal, PPE, person-down), Remote and distributed assets (solar, wind, dam, tunnel, intake), and System integrity and investigation (tampering, camera loss, abandoned object, multi-camera search).

Where a plant type is relevant (solar, BESS, wind, hydro tunnel), the scenario is tagged so it reads as conditional, consistent with Section 04's plant-type logic.

## Presentation

- Keep the existing left rail of grouped buttons plus right-hand detail card, now with five group headings.
- Each scenario detail card gains a compact chain line at the top in the catalogue's language: `DETECT <sensor/analytic> -> CORRELATE <system> -> RESPOND <owner>`, above the existing What it detects / Why it matters / Control-room response content. This is the visual bridge to the appendix format.
- Add a collapsible "Full catalogue" view below the detail card: a two-column, numbered, dense list of all scenarios in one-line chain form, so the whole span is visible at a glance the way the appendix slides read.
- Closing note stays: final scenario library, thresholds and escalation matrix confirmed per plant type during the as-is assessment.

## Technical notes

- Single file: `src/components/site/UseCases.tsx`. Extend the `UseCase` type with `id`, `chain` (detect/correlate/respond strings) and optional `plantTypes`; extend `groupOrder` to five groups; add the chain line and the collapsible catalogue list.
- If the file grows past comfortable size, move the array to `src/components/site/useCaseData.ts` and keep the component presentational.
- Existing cream/green tokens, layout and fit-to-screen behaviour unchanged. The catalogue list is collapsed by default so Section 07 still fits one screen.
