# Scroll parallax and panel overlap

Reference: supplied Screen Recording 2026-11-14 at 1.56.28 PM.mov. Five sample frames inspected locally using AVFoundation, including forward and reverse scrolling across A24 film panels.

Home order restored to welcome, profile, featured projects, role categories, contact. Welcome CTA scrolls to profile; Explore project scrolls to the featured sequence.

Featured panels stick at the viewport top while the next panel overlaps. Image and text move at different rates. Coverage progress smoothly increases image blur up to 5px (3px on mobile), darkening, and the incoming panel's upward shadow. Effects reverse with scroll. Native document scrolling retained. Event listeners are disposed and recreated on route changes. Reduced motion uses normal static panels with no parallax, blur, or sticky overlap.

Validation: JavaScript syntax passed; browser DOM order confirmed; overlap observed with an outgoing panel at top 0, incoming panel at 166px, and outgoing blur approximately 4.6px. Local preview server restarted on port 4174. No deployment performed.
