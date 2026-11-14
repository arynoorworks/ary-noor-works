# Fill category image areas without letterboxing

All category grabstills now use the minimum `object-fit: cover` scale needed to fill their image canvas, instead of fitting the full frame with `contain`. This removes layout-generated top/bottom and side bars. Only the small amount of edge cropping required by the source/canvas aspect ratio is applied. The subtle animation starts at 100% of that fill size and ends at 101.5%, so it never exposes the background during motion. Two-second crossfade, five-second still interval, no generated extension, and landing optimizations remain.
