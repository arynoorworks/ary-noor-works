# Simplified project showcase

Portfolio category pages now contain the shared role navigation and one project slideshow. The project title buttons overlay the slideshow; selecting a title switches its grabstills, and clicking the image opens its existing detail page. Project selection is remembered per category for the current visit, including when returning with Back. Both old project shelves are removed.

Frames use each project's `stills` and `cover` in content.js, with duplicates removed. Multiple unique frames crossfade every seven seconds. Single-frame projects use a slow zoom, without inventing additional stills. Dummy projects retain a dummy label. Reduced motion disables automatic cycling, zoom, and fade.

Role glass retains a rounded rectangle throughout movement. Label emphasis crossfades between regular and bold without changing the link's dimensions. Detail back links are now glass buttons labelled Back.
