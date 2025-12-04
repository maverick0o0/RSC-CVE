export default function CveCard({ cve }) {
  return (
    <article className="panel" aria-labelledby={`${cve.id}-title`}>
      <header className="meta">
        <span className="badge">{cve.id}</span>
        <span className="severity" data-level={cve.severity.toLowerCase()}>
          {cve.severity} severity
        </span>
      </header>
      <h2 id={`${cve.id}-title`}>{cve.title}</h2>
      <p className="details">{cve.description}</p>
      <ul className="tag-list">
        {cve.tags.map((tag) => (
          <li key={tag}>{tag}</li>
        ))}
      </ul>
      <section className="mitigation" aria-label={`${cve.id} mitigation`}>
        <strong>Mitigation:</strong> {cve.mitigation}
      </section>
    </article>
  );
}
