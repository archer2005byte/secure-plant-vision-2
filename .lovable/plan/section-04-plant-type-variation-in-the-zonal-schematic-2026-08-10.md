# Section 04: Plant-type variation in the zonal schematic

Today Section 04 renders one fixed 15-block schematic that implicitly assumes a thermal station ("Power-generation block (boiler / turbine / aux)"). A hydro or solar audience has no way to see their own asset. The fix is a plant-type selector that swaps the generation-side blocks while keeping the common security spine intact.

## Selector

A segmented control above the diagram: **Thermal | Hydro | Solar / Renewable**. Default Thermal. Switching re-renders the schematic and resets the detail panel to the perimeter block, so the section still opens cleanly in a meeting.

Common blocks stay across all three types, with identical wording so the argument stays consistent: perimeter, entry and access control, stores and logistics, administrative areas, township, switchyard and power evacuation, control room / ICCC, water systems, emergency and safety, digital and communication, remote and off-site assets.

## What changes per plant type

**Thermal** — fuel logistics made explicit, since it is the largest security surface:
- Coal receipt: railway siding, wagon tippler / truck tippler
- Coal stockyard and conveyor system (transfer points, junction houses)
- Coal handling plant (CHP) control and crusher house
- Generation block: boiler, turbine hall, ESP, auxiliaries
- Ash handling and ash dyke / ash pond
- Captive coal mine and mine-to-plant corridor as an off-site asset

**Hydro**:
- Dam, spillway and gates
- Intake, penstock and surge shaft
- Power house (often underground) and machine hall
- Tailrace and downstream channel
- Reservoir waterbody and boundary approaches
- Access roads, tunnels and hill-slope corridors

**Solar / Renewable**:
- Module array fields (blocks / rows)
- Inverter stations and transformer skids
- Pooling substation and evacuation line corridor
- Battery energy storage enclosure
- O&M store, module washing and water storage
- Long remote unmanned perimeter with sparse power and connectivity

Each new block carries the same structure already used: zone letter, "why this matters", key exposures, mapped solutions — written to the same consulting standard (for example railway siding: wagon-tippler tamper detection, ANPR-linked wagon-to-tippler reconciliation, siding-corridor thermal and radar detection, coal-quality evidence capture).

## Zone colouring

The four zones stay as-is (A perimeter and access, B fuel and generation, C utilities and continuity, D people, digital and off-site). For hydro and solar, Zone B is relabelled in-panel to "Generation and energy conversion" so the fuel wording does not read oddly.

## Technical notes

- `plantMapData.ts`: introduce a `PlantType` union and export three block sets, each with its own `shape` coordinates so the SVG stays balanced — hydro reads as a linear water chain, solar as a wide field grid.
- `PlantBlocks.tsx`: add `plantType` state, render the segmented selector, source blocks from the active type, reset `activeId` on type change, keep the existing SVG click/keyboard interaction and detail panel unchanged.
- Icons: reuse Lucide (`TrainFront`, `Waves`, `SunMedium`, `BatteryCharging`, `Mountain`, `Wind`) so every block keeps an icon as in the current diagram.
- Presentation only; no backend or data changes.