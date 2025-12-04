export const dynamic = 'force-static';

function fetchSomeData(): string {
  return 'Server-rendered demo payload for observing RSC serialization.';
}

export default function Home() {
  const data = fetchSomeData();

  return (
    <div>
      <p>
        This lab uses a vulnerable Next.js setup with React Server Components to explore
        behavior prior to recent security patches.
      </p>
      <p>
        The server component below uses mock data so you can inspect how the App Router
        serializes responses and hydrates client navigation without runtime drift.
      </p>
      <p className="code">{data}</p>
    </div>
  );
}
