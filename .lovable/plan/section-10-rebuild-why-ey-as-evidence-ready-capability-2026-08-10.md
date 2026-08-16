# Section 10 — Rebuild "Why EY" as evidence-ready capability

Replace the five generic advisory statements with a capability grid plus a clearly marked, insertable credentials area.

## New structure

**Heading:** What EY Brings (Section 10, kept on the deep navy band)

**Capability cards (4, icon-led):**
1. Power-sector domain understanding — Generation operations, critical assets and the Indian regulatory environment.
2. Physical + cyber + OT convergence — Architecture across plant security, networks and operational systems.
3. Procurement-grade engineering — Requirements translated into DPRs, BoQs, SLAs and acceptance criteria.
4. Programme governance — From pilot design through multi-site implementation.

**Credential dimensions strip (small tags, no claims):** power & utilities, security/surveillance programmes, command-centre design, OT/cyber, major infrastructure programme management, tender/RFP procurement, deployment governance, India public sector. Presented as the dimensions on which credentials will be evidenced — factual framing, no achievements asserted.

**Credentials placeholder block:** three empty proof slots (client type / scope / outcome) rendered as dashed-outline cards with the line: "Relevant credentials and case studies — to be inserted subject to approval." This makes the space visually designed for later insertion without fabricating anything.

Keeps the existing "Discuss a pilot engagement" CTA.

## Technical notes
- Single file edit: `src/components/site/WhyEy.tsx`; Lucide icons; existing navy/brand tokens only.
- Nav label updated from "Why EY" to "What EY brings" in `SiteNav.tsx` and `DeckNavigation.tsx`; the `#why-ey` anchor id stays so deck navigation and links keep working.
- No new dependencies, no data or backend changes.
