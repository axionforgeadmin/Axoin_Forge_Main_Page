import React from 'react';

// WhoWeAre — intro with an image showcase (user-fillable slots) + principle cards.

function WhoWeAre() {
  const blocks = [
    { k: '01', title: 'Who We Are', body: 'A next-generation startup execution and founder development ecosystem — empowering students and early-stage entrepreneurs to turn ideas into scalable companies.' },
    { k: '02', title: 'Our Mission', body: 'To bridge the gap between "having an idea" and "building a real company" — providing the systems, guidance, and resources to launch and grow.' },
    { k: '03', title: 'What\u2019s Different', body: 'We build founders, not just teach startups. The approach is hands-on, professional, and execution-driven from day one.' },
  ];

  return (
    <section id="about" className="section" style={{ position: 'relative', overflow: 'hidden' }}>
      <div className="ghost-wordmark" style={{ top: '50%', transform: 'translateY(-50%)' }}>AXIONFORGE</div>

      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        {/* split: copy + image mosaic */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 48, alignItems: 'center' }}>
          <div>
            <div className="eyebrow">// Who We Are</div>
            <h2 className="section-title" style={{ maxWidth: 460 }}>Founders, not <span className="af-spectrum">students</span></h2>
            <p className="section-sub">
              AXIONFORGE LLP operates like an execution layer for ambitious builders — running
              mentorship, strategy, branding, legal, and technology as one coordinated system.
            </p>
            <div style={{ marginTop: 28, display: 'flex', gap: 12, flexWrap: 'wrap' }}>
              {['Mentorship', 'Strategy', 'Branding', 'Legal', 'Technology'].map(t => (
                <span key={t} style={{
                  fontFamily: 'var(--af-font-mono)', fontSize: 11, letterSpacing: '0.08em',
                  color: 'var(--af-fg-3)', padding: '7px 14px', borderRadius: 9999,
                  border: '1px solid var(--af-border)', background: 'var(--af-glass)',
                }}>{t}</span>
              ))}
            </div>
          </div>

          {/* image mosaic — user drops their own photos */}
          <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gridTemplateRows: 'repeat(2, 150px)', gap: 12 }}>
            <image-slot id="who-1" src="/assets/who-1.png" style={{ gridRow: 'span 2', borderRadius: '18px' }} shape="rounded" radius="18" placeholder="Drop a cohort / workshop photo"></image-slot>
            <image-slot id="who-2" src="/assets/who-2.png" style={{ borderRadius: '18px' }} shape="rounded" radius="18" placeholder="Founders at work"></image-slot>
            <image-slot id="who-3" src="/assets/who-3.png" style={{ borderRadius: '18px' }} shape="rounded" radius="18" placeholder="Demo day / pitch"></image-slot>
          </div>
        </div>

        {/* principle cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 18, marginTop: 64 }}>
          {blocks.map((b) => (
            <div key={b.k} className="glass-card">
              <div className="tile-num">{b.k} / 03</div>
              <h3 style={{ margin: '0 0 12px', fontSize: 21, fontWeight: 700, color: 'var(--af-fg)' }}>{b.title}</h3>
              <p style={{ margin: 0, color: 'var(--af-fg-3)', fontSize: 14.5, lineHeight: 1.65 }}>{b.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default WhoWeAre;
