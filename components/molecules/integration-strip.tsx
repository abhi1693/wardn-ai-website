const integrations = [
  ["github", "GitHub"],
  ["slack", "Slack"],
  ["postgres", "Postgres"],
  ["linear", "Linear"],
  ["kubernetes", "Kubernetes"],
  ["internal", "Your APIs"],
] as const;

export function IntegrationStrip() {
  return (
    <section className="tool-strip" aria-label="Works across your stack">
      <div className="shell tool-strip-inner">
        <p>Govern tools across your stack</p>
        <div className="tool-list" aria-label="Example integrations">
          {integrations.map(([kind, label]) => (
            <span key={label}>
              <i className={`dot ${kind}`} />
              {label}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
