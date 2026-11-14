# Category media rules and landing performance

## Category projects — shared across all roles

- Entire prepared film frame fits inside the full showcase canvas with `object-fit: contain`. No cover-cropping, fixed 78% column, or 3% inset. Mobile retains a full-width image area above the list.
- Every new still crossfades in over 2 seconds. The outgoing frame stays opaque underneath until the incoming frame reaches full opacity, avoiding a dip to black. Removal happens after 2.1 seconds.
- Each slide still advances every 5 seconds. A subtle 98.5% → 100% zoom stays inside its bounds.
- Wait for image decoding before insertion. Next still preloaded; stale loads ignored after selection or navigation.
- Generated forest extension is no longer inserted or requested. Its source assets remain preserved but unused.

## Landing

- Cover images now have 960/1600/native WebP responsive choices. The native image remains available to high-density screens. The 1600-pixel versions together are about 47% smaller than the three native covers.
- Covers load within one screen of the viewport, then decode before becoming visible. Their fixed geometry avoids layout shifts.
- Portrait is converted to high-quality WebP without changing composition or face. The existing matte is converted to lossless WebP; its mask values are preserved.
- Opening animation pauses outside the viewport.
- Covered sticky films stop displaying their media. Only active panels get transform layer hints; permanent filter layer hints removed.
- Scroll geometry reads are batched before style writes in one animation frame. Category shadow updates now use the same scheduled frame.
- Image parallax travel increased from 3.5%/1.5% to 5.25%/2.25%; text travel from 16/50 px to 24/75 px: exactly 150% of previous movement. Full frames remain fitted with safe space rather than zoom-to-cover.

No dependency or external image service added. Source images retained.
