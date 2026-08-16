# Section 07 — Make use cases unmistakably power-sector

Replace the generic detection list (loitering, unauthorised entry, object left behind) with 12 plant-specific scenarios so the section reads as "we understand power plants", not a generic smart-city analytics list.

## New use-case set (replaces current 12)

Grouped so the left-hand list reads in a logical operational order:

Generation & electrical assets
1. Intrusion near switchyard / transformer zone
2. Unauthorised approach to coal conveyor or CHP
3. Contractor entering restricted generation block
4. Unauthorised access to control-room approaches

Material & movement integrity
5. Material removal from stores / scrap area
6. Wrong vehicle entering fuel or hazardous-material route

Safety-linked
7. Personnel remaining inside hazardous zone after shutdown
8. Fire / smoke visual corroboration

Resilience & airspace
9. Camera loss or tampering at critical perimeter
10. Drone approach towards switchyard / cooling tower / boiler area
11. Abnormal activity near water intake / dam / reservoir
12. Crowd build-up at gate during labour disturbance

Each keeps the existing three-part structure, rewritten in plant language:
- What it detects — sensor/analytic trigger and the exact zone
- Why it matters — consequence in generation terms (outage risk, safety, fuel-quantity integrity, regulatory exposure)
- How the control room responds — 4 steps naming real roles (shift in-charge, CHP control room, fire station, unit control room, plant HR/IR, designated agency)

Perimeter intrusion is retained but retitled to a plant-specific framing rather than a generic line-crossing item.

## Presentation changes

- Add a small group label above each cluster in the left button list (Generation & electrical, Material & movement, Safety-linked, Resilience & airspace) so the plant-specific spread is visible at a glance without clicking.
- Add a short lead-in line under the section intro reinforcing that every scenario is drawn from generation-plant operating reality, and a closing note that the final scenario library is confirmed per plant type during the as-is assessment.
- Optionally tag each card with the plant zone it maps to (Zone A/B/C/D from Section 04) so Section 07 visibly connects back to the plant map.

## Technical notes

- Single file: `src/components/site/UseCases.tsx` — rewrite the `useCases` array, extend the type with `group` and `zone`, and render group headings in the left rail. Existing two-column layout, styling and design tokens stay unchanged.
