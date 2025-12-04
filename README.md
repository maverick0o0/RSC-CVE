# CVE Showcase (Next.js)

A lightweight React + Next.js page that walks through two hypothetical vulnerabilities: **CVE-2025-55182** and **CVE-2025-66478**. The UI contains cards summarizing the scenario, why it matters, and mitigation ideas.

## Getting started

1. Install dependencies:
   ```bash
   npm install
   ```
2. Run the dev server:
   ```bash
   npm run dev
   ```
3. Open http://localhost:3000 to view the page.

> If you are offline or behind a restricted network, dependency downloads may fail. The project files still illustrate how to render the CVE information within a Next.js app.

## Project structure

- `app/` – Next.js App Router entry point with page and layout.
- `components/` – Reusable UI cards for CVE content.
- `public/` – Reserved for static assets.

## Notes

- The CVE entries are educational and do not include real exploit code.
- Styling lives in `app/globals.css` for quick customization.
