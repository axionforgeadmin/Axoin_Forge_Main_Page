import React from 'react';

// SectionHeader — the canonical [eyebrow / display heading / optional sub] opener.

function SectionHeader({ eyebrow, title, sub, align = 'center', spark }) {
  // `spark` is an optional word inside `title` to color in orange.
  let titleNode = title;
  if (spark && typeof title === 'string' && title.includes(spark)) {
    const parts = title.split(spark);
    titleNode = (
      <>
        {parts[0]}
        <span className="af-spectrum">{spark}</span>
        {parts[1]}
      </>
    );
  }
  return (
    <div style={{ textAlign: align, maxWidth: align === 'center' ? 720 : 'none', margin: align === 'center' ? '0 auto' : '0' }}>
      {eyebrow && <div className="eyebrow">{eyebrow}</div>}
      <h2 className="section-title">{titleNode}</h2>
      {sub && <p className="section-sub" style={{ marginLeft: align === 'center' ? 'auto' : 0, marginRight: align === 'center' ? 'auto' : 0 }}>{sub}</p>}
    </div>
  );
}

export default SectionHeader;
