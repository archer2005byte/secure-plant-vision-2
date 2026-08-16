# Plan: Fix Section 11 delivery framework button link

## Goal
Fix the "View the delivery framework" button in Section 11 so it scrolls to the correct section instead of a missing anchor.

## What we will change

In `src/components/site/ClosingCta.tsx`, update the second CTA button:
- Change the `href` from `"#roadmap"` to `"#offerings"`.

## Why this fixes it

The project was reorganized earlier: the original "Roadmap" section became Section 8 ("How EY Can Support" — the Diagnose → Design → Procure → Deliver → Assure lifecycle) and the old `id="roadmap"` no longer exists. That section now has `id="offerings"`, which is the delivery framework the button refers to.

## Expected result

Clicking "View the delivery framework" smoothly scrolls to Section 8, the lifecycle ribbon. No other behavior changes.
