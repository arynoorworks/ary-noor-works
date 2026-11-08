# Draft 0.9 — expanding contact form and spectral outline

## Contact interaction

The existing Start a conversation pill retains its visual styling, but now opens a semantic native dialog. A 150ms press precedes a 500ms shared-shell transform from the pill's viewport rectangle to the centered panel. The navy overlay blurs in over 400ms; fields reveal with 50ms stagger. Closing reverses toward the original pill over 400ms and restores focus. Escape, the X button, and clicking outside close it. Native modal semantics make the page behind it inert; scrolling is locked and restored.

The form requires name, phone, valid email, and a project description. Phone validation requires 8–15 digits; whitespace-only entries are rejected. The form uses the configured `whatsapp` value if present, otherwise the existing `phone` from content.js (the number supplied in the portfolio PDF). No new destination number was invented.

Send Inquiry opens wa.me with the requested formatted message. It never sends a WhatsApp message automatically and does not claim successful delivery. A continuation link is also shown if the popup is blocked. Visitor data is not stored by the website; the WhatsApp handoff shares the entered message with that platform only when initiated by the visitor.

The 540px desktop panel uses 92vw on mobile, max-height 90dvh, internal scrolling, 16px controls, and reduced-motion support. No backend, paid service, or new library is required.

## Logo

The outline is thicker and uses moving cyan, violet, pink, silver-white and warm spectral highlights. Glow is applied outside a masked inner layer so the mask no longer clips the halo. The tiny subtitle is excluded from the glow mask to keep it readable. Highlight tracking is active only for the large opening logo. Final watermark center is aligned to the menu center, with matching outer horizontal margins.

## Changed files

- contact.js (new): dialog, morph animation, validation, focus/keyboard behavior and WhatsApp handoff.
- app.js: contact trigger and logo docking alignment.
- index.html: contact script, spectral outline layer and version label.
- style.css: scoped form styling and stronger logo outline treatment.
- assets/logo-outline-bold-2k.png (new): alpha-derived thick outline for the glow.

This note supersedes earlier contact descriptions. The main landing page remains otherwise unchanged.
