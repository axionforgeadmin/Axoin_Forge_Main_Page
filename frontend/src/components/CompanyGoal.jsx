import React from 'react';
import Scene3D from './Scene3D';

// CompanyGoal — mission statement over an animated 3D crystal field.

function CompanyGoal() {
  return (
    <section id="goal" className="section section--wide" style={{
      position: 'relative', overflow: 'hidden',
      background:
        'radial-gradient(circle at 20% 30%, rgba(56,189,248,0.30), transparent 55%),' +
        'radial-gradient(circle at 80% 70%, rgba(129,140,248,0.20), transparent 60%),' +
        'linear-gradient(180deg, #F2F7FF 0%, #E0EBFC 100%)',
    }}>
      {/* animated 3D crystal centerpiece */}
      <div style={{ position: 'absolute', inset: 0, opacity: 0.7, zIndex: 0 }}>
        <Scene3D shape="crystal" />
      </div>

      <div className="container" style={{ position: 'relative', zIndex: 1, textAlign: 'center' }}>
        <div className="eyebrow">// Our Goal</div>
        <h2 style={{
          margin: '20px auto 0', maxWidth: 1000,
          fontFamily: 'var(--af-font-display)', fontWeight: 400,
          fontSize: 'clamp(40px, 6vw, 78px)', lineHeight: 1.04, letterSpacing: '0.01em',
          color: 'var(--af-fg)', textTransform: 'uppercase',
        }}>
          Building India&apos;s next generation of <span className="af-spectrum">founders</span>
        </h2>
        <p style={{ marginTop: 28, color: 'var(--af-fg-3)', fontSize: 18, lineHeight: 1.6, maxWidth: 640, marginLeft: 'auto', marginRight: 'auto' }}>
          Each program moves you from learning about startups to building and operating real companies.
        </p>
      </div>
    </section>
  );
}

export default CompanyGoal;
