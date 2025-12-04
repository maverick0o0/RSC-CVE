# Vulnerable Next.js Lab

This lab scaffolds a deliberately vulnerable Next.js application for testing React Server Component behavior prior to recent patches.

## Getting Started Locally

1. Install dependencies:
   ```bash
   npm install
   ```
2. Start the dev server with verbose fetch logging enabled:
   ```bash
   npm run dev
   ```
3. Visit [http://localhost:3000](http://localhost:3000) to exercise the server component and API route.

The `app/page.tsx` file is an async server component that fetches mock data, while `app/api/actions/route.ts` exposes a simple POST endpoint for observing server action serialization.

## Docker Usage

Build and run the lab in an isolated container:

```bash
docker build -t vulnerable-nextjs-lab .
docker run -p 3000:3000 vulnerable-nextjs-lab
```

This uses the provided `Dockerfile` (Node 18 Alpine) to install dependencies, start the production server, and expose port 3000.

## Dependency Pinning

The project pins pre-patch framework versions (`next@15.0.0` with `react`/`react-dom`/`react-server-dom-webpack@19.0.0-rc.1`) to reproduce RSC serialization behaviors under investigation.
