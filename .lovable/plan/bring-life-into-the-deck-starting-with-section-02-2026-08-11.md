# Bring "life" into the deck, starting with Section 02

The attached sample shows the direction: a dark section canvas, one distinct accent colour per card, a visual/illustration inside each card, and a strong closing statement band. Copy stays exactly as written today.

## Design foundation (reusable across the deck)

- Add a six-slot accent token set in `src/styles.css` (`--accent-1` … `--accent-6` plus soft/tint variants): indigo-blue, alert red, emerald-teal, violet, steel-blue, amber-gold — the palette used in the sample. All semantic tokens, no hardcoded colours.
- Add a `dark` tone variant to `SectionShell` (deep navy canvas, brand eyebrow, light heading) so any section can be flipped to the "hero deck" look without duplicating layout.
- Add a small `AccentCard` primitive: tinted card surface, coloured hairline, accent-glow icon medallion, accent-tinted heading rule. This is what gives every future section per-item colour instead of uniform white cards.

## Section 02 rebuild

1. **Section canvas** goes dark navy, matching the sample.
2. **Outcome strip** ("Detect earlier / Decide faster / Recover with less operational impact") becomes three colour-coded statements separated by vertical rules — amber, red, teal — with the judging note in a bordered side plate.
3. **Six driver cards** each get:
   - its own restrained, desaturated accent colour (muted, boardroom-tasteful — no neon or garish glow) and a softly tinted circular icon medallion,
   - a numbered title (1..6) as in the sample,
   - a card-right visual: a generated abstract illustration per driver (grid/transmission tower, drone-and-intruder silhouette, isometric plant blocks, control-room video wall, KPI dashboard, integrated platform node graph) rendered at low opacity inside the card so text stays fully readable,
   - a faint accent gradient wash and accent-coloured border, with a lift-on-hover.
4. **Closing statement band** across the full width: "Security is no longer a support function. It is a force multiplier for reliability, safety and national resilience." — accent-highlighted phrase, bordered plate.
5. Layout stays a 2-column grid collapsing to single column; on mobile the illustrations shrink to a corner watermark so cards stay compact and deck-mode still fits a screen.

## Images

Six abstract illustrations generated into `src/assets/` (dark background, single-hue, schematic/technical style — not stock photos), each imported as an ES6 asset and used as a masked card visual. No people-photography, keeps the consulting tone.

## Rollout

Section 02 is built first as the reference treatment. Once approved, the same accent-card + dark-canvas language can be applied selectively to Sections 03, 08 and 10 so the deck alternates light and dark rather than every section becoming dark.

## Technical notes

- Files: `src/styles.css` (accent tokens), `src/components/site/SectionShell.tsx` (dark tone), new `src/components/site/AccentCard.tsx`, rewrite of `src/components/site/WhyNow.tsx`, six new asset pointers in `src/assets/`.
- Existing section id (`why-now`), nav labels and deck navigation unchanged.
- The unused `plantRiskExamples` table block in `WhyNow.tsx` is removed since `hasTable` is false everywhere.
