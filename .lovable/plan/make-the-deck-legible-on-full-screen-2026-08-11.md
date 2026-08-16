# Make the deck legible on full screen

## Problem

Sections are auto-shrunk to fit one screen (down to 42% scale). That is why the body text — and the detail box in Section 04 — reads as tiny on a projector or full screen. The fix is two-sided: stop over-shrinking, and raise the base type scale so a scaled section still lands at a readable size.

## What changes

1. **Legibility floor on fit-to-screen**
   - Raise the minimum scale from 0.42 to about 0.78, so no section is ever shrunk past readability.
   - Any section that still does not fit at that floor keeps its own internal scroll instead of being crushed.
   - Keep arrow-key navigation and click-to-section behaviour exactly as it is today.

2. **Larger base type scale**
   - Bump the small utility sizes used across sections (the `text-[0.6rem]`–`text-xs` eyebrows, chips, list items) up one step so that after fit-scaling they read comparably to today's `text-sm`.
   - Section headings and intros in `SectionShell` step up as well, keeping the current hierarchy ratio.
   - Applied consistently across sections 02–12 so the deck stays balanced, not just Section 04.

3. **Section 04 detail panel**
   - Make the right-hand panel wider and give its zone label, asset name, exposures and mapped-solutions lists larger text with more line spacing.
   - Enlarge the block labels inside the SVG schematic and the zone legend so they hold up at full screen.
   - Trim the amount of content shown at once where needed so the taller text still fits the section without reintroducing heavy shrinking.

4. **Density trims to preserve balance**
   - Where a section becomes too tall at larger type, reduce padding and gaps rather than font size, and shorten a few overlong helper notes.

## Technical notes

- `src/components/site/DeckNavigation.tsx`: change the scale clamp floor, add overflow handling for sections that cannot fit at the floor.
- `src/components/site/SectionShell.tsx`: heading/intro/eyebrow size bump.
- `src/components/site/PlantBlocks.tsx`: grid column width, panel typography, SVG label sizes; `plantMapData.ts` untouched.
- Remaining section components: one-step size increases on the smallest text classes; no content or logic changes.
- Verify at 1280x800 and 1920x1080 with screenshots after the change.
