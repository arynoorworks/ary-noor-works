# Showcase clipping and framing fix

The fixed viewport panel previously used a flex layout with a 35vh text margin. Long two-line headings could exceed its height and were clipped by overflow. The heading and actions now occupy an anchored bottom area with responsive type and safe text parallax travel. Panel height is exactly 100svh without a conflicting minimum height. A 30svh scroll runway lets the final panel reach and remain at full viewport height before leaving the sequence.

Removed the Explore all roles / Meet Ary Noor strip. All featured images now use object-position:left center and transform-origin:left center, preserving the left edge through parallax scaling. Original image files unchanged.
