# Hero image visibility fix

## Goal
Make the power-generation imagery clearly visible behind the hero while keeping the text readable and the consulting-grade tone.

## Direction chosen
- Layout: split-screen effect — dark text-safe panel on the left, revealed image on the right.
- Image style: realistic industrial photograph of a power plant.

## Changes

### 1. Generate a new hero image
Create a realistic, wide-aspect hero photograph of a power generation plant at dusk/blue hour showing identifiable elements such as cooling towers, boiler house, switchyard, or transmission lines. The image should be atmospheric, premium, and suitable for a B2B consulting microsite. Save it to `src/assets/hero-power-plant.jpg` (16:9, 1600×1008 or 1536×1024 to match the existing hero slot).

### 2. Rebuild Hero layout as a split-screen reveal
Update `src/components/site/Hero.tsx`:
- Use the new `hero-power-plant.jpg` as the full-width background.
- Keep the dark navy overlay only on the left ~55–60% of the hero so the left side remains text-readable and the right side reveals the plant image.
- Use `bg-gradient-to-r from-navy via-navy/85 to-transparent` (or similar) so the transition is smooth and the right side shows the image at full brightness.
- Slightly raise the background image opacity from `opacity-45` to `opacity-60` or `opacity-70` on the right side only (via a CSS mask or by keeping the gradient strong on the left).
- Keep the text and CTAs on the left, aligned with the existing max-width container.
- Ensure the badge, heading, sub-headline, CTAs, and 4 focus markers remain readable and do not overlap the image.

### 3. Responsive behaviour
- On mobile/tablet: collapse the split effect and return to a dark overlay with lower image opacity (e.g., `opacity-40` to `opacity-50`) to preserve text readability.
- Maintain the existing `py-24 md:py-32` vertical spacing and `max-w-6xl` container.

### 4. Accessibility
- Keep the descriptive `alt` text on the image.
- Keep `aria-hidden` on the decorative grid overlay.
- Ensure the contrast ratio of the text against the overlay remains compliant.

## Outcome
The hero section will clearly show a realistic power plant on the right half of the screen while the left half stays dark and readable for the headline and CTAs.
