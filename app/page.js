import CveCard from '../components/CveCard';

const cveEntries = [
  {
    id: 'CVE-2025-55182',
    title: 'Unsafe server-side rendering of untrusted data',
    description:
      'This simulated weakness represents a server component that reflects user-controlled markup during rendering. A malicious payload could reach the rendered HTML if input validation is missing, leading to cross-site scripting exposure in shared UI snippets.',
    severity: 'High',
    mitigation:
      'Sanitize user input on every boundary, prefer safe serialization helpers when passing data from server to client, and enable a trusted types policy for the rendering surface.',
    tags: ['SSR', 'XSS', 'Input validation', 'Escape late'],
  },
  {
    id: 'CVE-2025-66478',
    title: 'Client hydration data leak via debug overlay',
    description:
      'This hypothetical issue highlights an over-verbose debug overlay that exposes internal tokens inside the hydration payload. Attackers with DOM access could scrape the values before the overlay hides, enabling lateral movement.',
    severity: 'Medium',
    mitigation:
      'Strip secrets before serializing state, guard debugging utilities behind authenticated feature flags, and review hydration JSON for sensitive values.',
    tags: ['Hydration', 'Debug tooling', 'Data exposure', 'Hardening'],
  },
];

export default function Page() {
  return (
    <main>
      <header>
        <div className="logo" aria-label="CVE Demo">
          <span>Next.js</span>
          <div>
            <h1>Security scenario walkthrough</h1>
            <p className="description">
              A minimal React + Next.js page that outlines two fictional CVEs. Use the cards
              below to explain each scenario, how it could manifest, and how to mitigate it in a
              modern web app.
            </p>
          </div>
        </div>
      </header>

      <section className="grid" aria-label="CVE cards">
        {cveEntries.map((cve) => (
          <CveCard key={cve.id} cve={cve} />
        ))}
      </section>

      <p className="footer-note">
        This is an educational mock-up. No actual exploits are present—only guidance and
        awareness cues for the named identifiers.
      </p>
    </main>
  );
}
