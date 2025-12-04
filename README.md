# CVE-2025-55182 Insecure Deserialization Lab (Next.js 15 / React 19)

This repository contains a **deliberately vulnerable** Next.js application used to study
CVE-2025-55182 (insecure deserialization in React Server Components). It runs the App Router
with a server action that deserializes user-controlled JSON without validation, illustrating
how prototype pollution can lead to remote code execution (RCE) in affected versions.

> ⚠️ **Warning:** This code is for educational security testing only. Do **not** deploy or
> expose it to the internet. Run it only in isolated environments such as disposable Docker
> containers.

## How it is vulnerable
- The server action uses `JSON.parse` on untrusted input and merges the result into server-side
  objects with `Object.assign`, allowing keys like `__proto__` to pollute prototypes.
- With the vulnerable React/Next.js versions, polluted prototypes can be chained with gadget
  code paths to achieve RCE under the Node.js process.
- Inline comments in `app/page.js` explain the root cause and remediation steps (upgrade, key
  whitelisting, and sanitization).

## Quick start (Docker isolation recommended)
1. Build the image:
   ```bash
   docker build -t rsc-cve-lab .
   ```
2. Run the app in an isolated container:
   ```bash
   docker run --rm -it -p 3000:3000 rsc-cve-lab
   ```
3. Open http://localhost:3000 to experiment with the vulnerable form.

## Local (non-Docker) usage
If you prefer running directly on your host:
1. Install dependencies:
   ```bash
   npm install
   ```
2. Start the dev server:
   ```bash
   npm run dev
   ```

## Safety notes
- Never use this project as a baseline for production code.
- When testing, avoid reusing host directories or credentials inside the container.
- To harden the demo, upgrade to patched React/Next.js releases and validate/sanitize all
  inbound data before merging it into server state.
