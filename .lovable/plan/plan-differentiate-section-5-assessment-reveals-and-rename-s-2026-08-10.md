# Plan: Differentiate Section 5 assessment reveals and rename surveillance label

## Goal
Fix Section 5 (As-Is Security Assessment) so each assessment domain shows its own relevant "What it reveals" insights, and rename the surveillance domain from "Surveillance estate" to "Surveillance systems".

## What we will change

### 1. Rename the surveillance domain
In `src/components/site/AsIsAssessment.tsx`, update the domain entry:
- Change `label` from `"Surveillance estate"` to `"Surveillance systems"`.
- Keep `short` as `"CCTV"` or consider updating to `"Surv"` if the label change makes the short code misleading. Default to keeping `"CCTV"` since it is still widely understood.

### 2. Add domain-specific reveal content
Add a `reveals` array directly to each domain object in the `domains` array. Each array will contain 3–5 bullets that explain what that specific assessment area actually exposes (e.g., camera coverage, perimeter gaps, access-control enforcement, command-centre maturity, SOP integrity, etc.).

Remove the current global `reveals` array so the same text no longer appears everywhere.

### 3. Update the right-hand detail panel
Modify the panel so it renders `active.reveals` instead of the global `reveals`. Preserve the existing numbered list styling and dark navy panel treatment.

## Expected result
- The surveillance card is labeled "Surveillance systems".
- Each of the eight assessment domains shows tailored insights under "What it reveals" instead of the current duplicated generic text.
- No visual regression to the radial maturity wheel, domain list, or layout.
