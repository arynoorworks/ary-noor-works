# Runtime and environment

ARY NOOR WORKS is a self-contained static website. It has no package manager, build system, server-side code, database, API key, secret, or required environment variable.

## Local preview

Open `index.html` in a browser, or serve the directory with any static server. For example, if Python is installed:

```sh
python3 -m http.server 4173
```

Then visit `http://localhost:4173`.

## Deployment

Deploy the repository root as static files. For Cloudflare Pages, use framework preset **None**, build command `exit 0`, and output directory `.`. The hash routes work without a server rewrite rule.

## Secrets policy

Do not add passwords, GitHub tokens, service keys, or private credentials to this repository. The contact interaction creates a user-reviewed WhatsApp handoff from the public contact data in `content.js`; it does not require a secret.
