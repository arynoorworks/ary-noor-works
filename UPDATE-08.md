# Draft 0.8 — smoother glass entrance

- Opening logo width is half the previous value: max 400px instead of 800px; the responsive ratio is also halved. Watermark sizes remain small.
- Logo restoration uses the built-in image editor to smooth chrome texture and reduce damaged pixel fringes. The selected result is exported as assets/logo-anw-refined-2k.png at 2048 × 683 pixels, with alpha and 300 dpi metadata. Geometry remains based on the provided mark; this is a restored raster asset, not a vector master. Original assets remain available.
- Outline highlight follows the alpha edges of the restored 2K logo.
- Intro menu, scroll button, background and logo now share continuous opacity/blur/translation transitions with staggered entrances. Changing intro state no longer toggles menu/button visibility abruptly. Body background is fixed to prevent a gradient jump when intro scroll locking ends.
- The supplied iridescent glass reference is used directly as assets/welcome-glass-reference.webp. Perspective camera motion, depth translation and a separate reflection sweep create a restrained 3D-like moving composition. This is animated 2.5D artwork, not a realtime volumetric glass simulation.
- A full-width dark backdrop blur now fades from the top edge through a vertical gradient and spans behind both logo and menu. It has no round-rectangle boundary. Header controls stay above the blur layer.
- Category hover/focus increases glass thickness through inset highlights, edge light, shadow, scale, subtle perspective tilt and a pointer-following sheen. Touch devices retain the same navigation. Reduced motion disables repetitive movement and tilt.

Image restoration prompt (built-in tool): reconstruct the provided ANW chrome logo with the same linked letter silhouette, proportions, subtitle ARY NOOR WORKS and transparent canvas; remove noisy white fringes, grain and compression artifacts; restore clean antialiased contours and smooth reflective silver gradients without redesigning the mark.
