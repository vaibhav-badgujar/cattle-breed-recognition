function Section({ title, eyebrow, children, align = 'left' }) {
  return (
    <section className="section-shell">
      <div className={`section-heading ${align === 'center' ? 'center' : ''}`}>
        {eyebrow ? <span className="eyebrow">{eyebrow}</span> : null}
        {title ? <h2>{title}</h2> : null}
      </div>
      {children}
    </section>
  );
}

export default Section;
