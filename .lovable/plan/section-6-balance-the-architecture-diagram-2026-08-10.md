# Section 6 — balance the architecture diagram

Two problems today: the left (cyber) and right (integrations) rails are fixed 13rem columns stretched to the full height of the stack, so they end in dead space; and the pending SOC → ICCC relabel is not yet applied.

## How the rails will mesh with the centre

1. **Rails become sticky, self-sized panels, not stretched columns.**
   Drop `h-full` / `items-stretch`. Each rail sizes to its content and becomes `lg:sticky lg:top-24` so it tracks the centre stack while it scrolls instead of padding itself out with blank space.

2. **Rails get the same visual grammar as a layer card.**
   Each rail gets a number/eyebrow, a one-line purpose, and an "applies to" output pill — mirroring the `Layer 0X / title / purpose / output` header of the centre cards, so the three columns read as one system.

3. **Widen rails slightly and let chips be single-column on desktop.**
   Grid becomes `minmax(0,15rem)_minmax(0,1fr)_minmax(0,15rem)` so rail labels stop wrapping awkwardly; chips stay one per row on `lg+`, two per row on tablet.

4. **Group rail items into 2–3 labelled clusters** so their vertical rhythm roughly matches the four centre layers instead of being one flat list:
   - Cyber rail: *Network & segmentation* / *Identity & hardening* / *Monitoring & recovery* (SOC/SIEM lives here).
   - Integrations rail: *Emergency response* / *Plant & enterprise systems* / *Government & grid*.
   Each cluster gets a thin divider and a tiny uppercase caption, which fills the height with meaning rather than air.

5. **Add cross-links so the meshing is visible.**
   A subtle horizontal tick on both edges of every centre layer card (left = cyber, right = integrations) plus a hairline vertical connector inside each rail, signalling "this rail touches every layer".

6. **Mobile order stays deliberate:** cyber rail → stack → integrations rail, full width, clusters collapsed to two columns.

## Terminology fix (carried over)

- Layer 03 title → **"VMS, analytics, PSIM & ICCC"**; item **"PSIM / SOC platform"** → **"PSIM / ICCC platform"**.
- Cyber rail gains **"Cyber SOC / SIEM"**; **"IAM with MFA for SOC"** → **"IAM with MFA for operators"**.
- Intro sentence updated to mention the ICCC layer and the cyber SOC.

## Technical notes

- Single file: `src/components/site/ToBeArchitecture.tsx`.
- `Rail` gains `clusters: { caption: string; items: Item[] }[]` instead of a flat `items` array; `ItemChip` unchanged.
- Only existing semantic tokens (`navy`, `navy-foreground`, `navy-muted`, `brand`) — no hardcoded colours.
- Verify with a Playwright screenshot at 1280 wide and 390 wide that neither rail ends in a large empty block and that heights read as balanced.
