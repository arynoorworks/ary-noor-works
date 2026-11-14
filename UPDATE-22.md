# Full-frame layout correction

Main project images now use `object-fit: contain`; their entire prepared film frame remains visible. Image areas include safe margins so the subtle 1.5% slideshow motion does not clip the frame. Existing source files were not overwritten. Previously requested UNTAG player/subtitle-strip cleanup remains.

Landing titles reduced by 30% from the previous version. The locker cover is placed in the rightmost 72% of the desktop panel. Mobile uses a full-width image above the title/list rather than cropping into a tall background.

The home category section is inside the sticky film sequence and scrolls over the final film. Its incoming shadow and the outgoing film blur are driven by native scroll. Five-second slideshow timing and direct preview links remain.

## Generated background

Built-in image generation produced `assets/shifu-forest-extension.png`, with an optimized `assets/shifu-forest-extension.webp` for the website. Only the left forest region is displayed as an auxiliary backdrop; the complete original Shifu image remains in the foreground. The generated subject area is not used. On mobile the auxiliary layer is hidden because the full-width source already fits.

Prompt: “Edit target: supplied film still. Create a seamless LEFT outpainting for a filmmaker website. Widen canvas to 2.4:1. Keep the ENTIRE original 16:9 frame unchanged, uncut, at the RIGHT of the expanded canvas, including man, face, hands, bottle, tree, wardrobe and all original pixels/colour. Only extend empty forest/tree natural background to the LEFT, matching film lighting, colour grading and shallow depth. No new people, objects, text, no blur over original subject. Left 25% quiet dim forest negative space for website text. Output high resolution landscape. Original composition on right intact; no cropping or zooming.”

Other projects use their full frames without generated fill where layout can provide the required separation. No frontend dependencies added.
