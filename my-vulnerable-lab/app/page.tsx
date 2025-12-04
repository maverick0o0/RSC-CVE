async function fetchSomeData(): Promise<string> {
  return 'Server-rendered demo payload for observing RSC serialization.';
}

export default async function Home() {
  const data = await fetchSomeData();

  return (
    <div>
      <p>
        This lab uses a vulnerable Next.js setup with React Server Components to explore
        behavior prior to recent security patches.
      </p>
      <p>
        The async server component below fetches mock data so you can inspect how the App
        Router serializes responses and hydrates client navigation.
      </p>
      <p className="code">{data}</p>
    </div>
  );
}
