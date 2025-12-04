// This server component intentionally demonstrates CVE-2025-55182 for educational purposes only.
// Do NOT deploy this code to production environments.

async function getLabData() {
  // Simulated server-side data fetch to show this runs on the server.
  return [
    { id: 1, title: 'Server-rendered note', detail: 'Rendered by a React Server Component.' },
    { id: 2, title: 'Backend insight', detail: 'Data fetched in the server layer before streaming to the client.' },
  ];
}

export async function insecureDeserializeAction(formData) {
  'use server';
  const rawPayload = formData.get('payload') || '{}';

  // Vulnerability root cause: blindly deserializing untrusted JSON and merging it into
  // server objects without verifying allowed properties. Attackers can pass `__proto__`
  // or constructor-shaped keys to pollute prototypes and control downstream behavior.
  // When combined with gadget chains, this can lead to arbitrary code execution (RCE)
  // under the Node.js process that handles the request.
  let parsedPayload;
  try {
    parsedPayload = JSON.parse(rawPayload);
  } catch (error) {
    // Error handling is also unsafe here because it silently falls back to an empty
    // object, hiding exploitation attempts.
    parsedPayload = {};
  }

  const baseConfig = {
    role: 'viewer',
    flags: { safeDefaults: true },
  };

  // Another insecure decision: merging arbitrary properties directly. A payload such as
  // { "__proto__": { "polluted": true } } contaminates all future object creations,
  // which is a classic prototype pollution primitive that can be escalated to RCE in
  // vulnerable dependency graphs.
  Object.assign(baseConfig, parsedPayload);

  // Mitigation guidance: upgrade to patched versions of React and Next.js, restrict
  // accepted keys (e.g., whitelist specific fields), strip dangerous properties like
  // __proto__/constructor/prototype, and consider deep-cloning with libraries that guard
  // against prototype pollution.
  // This handler intentionally omits those protections to keep the lab vulnerable.
  return {
    stored: baseConfig,
  };
}

export default async function Page() {
  const labData = await getLabData();

  return (
    <main className="container">
      <header className="hero">
        <div>
          <p className="eyebrow">Educational vulnerability lab</p>
          <h1>CVE-2025-55182: Insecure deserialization in React Server Components</h1>
          <p className="lede">
            This minimal Next.js 15 / React 19 app intentionally ships an insecure server action
            to highlight how unsafe deserialization of user-supplied data can trigger prototype
            pollution and potential remote code execution (RCE). Use it only in isolated lab
            environments—never in production.
          </p>
          <div className="warning">⚠️ Danger: intentionally vulnerable. Do not expose publicly.</div>
        </div>
      </header>

      <section className="panel">
        <h2>Server component data fetch</h2>
        <p>
          The list below is rendered by a React Server Component that fetches data before the page
          streams to the client. This confirms the server-side execution path used in the
          vulnerable deserialization flow.
        </p>
        <ul className="list">
          {labData.map((item) => (
            <li key={item.id}>
              <strong>{item.title}</strong>
              <span>{item.detail}</span>
            </li>
          ))}
        </ul>
      </section>

      <section className="panel">
        <h2>Insecure server action</h2>
        <p>
          Submit any JSON payload below. The server action will deserialize and merge it without
          validation, reproducing the insecure pattern behind CVE-2025-55182.
        </p>
        <form action={insecureDeserializeAction} className="form">
          <label htmlFor="payload">Raw JSON payload (unvalidated)</label>
          <textarea
            id="payload"
            name="payload"
            defaultValue='{"__proto__":{"polluted":true}, "featureFlag": "enabled"}'
            rows={6}
          />
          <button type="submit">Send to vulnerable server action</button>
        </form>
        <p className="note">
          Try payloads that inject <code>__proto__</code> or <code>constructor</code> keys to observe how
          prototype pollution could be achieved. In real exploit chains, polluted prototypes can
          redirect property lookups to attacker-controlled getters/setters, enabling RCE through
          gadget code paths.
        </p>
        <div className="fix">
          <strong>How to fix:</strong> upgrade to patched React/Next.js releases, validate incoming
          payloads with strict schemas, strip dangerous keys before merging, and prefer safe
          structured cloning utilities that block prototype mutation.
        </div>
      </section>

      <section className="panel danger">
        <h2>Warning</h2>
        <p>
          This project is for learning and testing only. Running it outside a sandboxed Docker
          environment or exposing it to the internet could allow attackers to exploit the
          deserialization flaw and execute arbitrary code on the host.
        </p>
      </section>
    </main>
  );
}
