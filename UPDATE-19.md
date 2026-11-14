# Full-height showcase and right-aligned images

Preserved existing absolute title layout and the prior removal of the home-film-end actions. Extended the sticky sequence's end runway from 30svh to 100svh so the last film has a complete viewport of hold time. Images now anchor to the right for both object-position and transform-origin. Zoom reduced from 1.16 to 1.12; vertical travel reduced to stay within the image overscan and avoid exposing edges. Featured images load eagerly for this small three-panel sequence. CSS and JS version URLs updated to 19 to avoid stale browser files.

Validation: JS syntax passed. At a 1280 x 720 viewport, Shifu panel bounds were top 0 / bottom 720 and the full title bounds top 556.6 / bottom 666, leaving 54px below. Image computed object-position 100% 50%. Neither Explore all roles nor Meet Ary Noor link remains in the home DOM. Screenshot saved as shifu-full-panel-preview.png. Local changes only.
