import React from 'react';
import Button from './Button';

// FinalCTA — closing call to action.

function FinalCTA({ onOpenApply }) {
  return (
    <section className="section section--wide" style={{
      position: 'relative',
      background: 'linear-gradient(180deg, rgba(14,165,233,0.04) 0%, transparent 100%)',
    }}>
      <div className="container" style={{ textAlign: 'center', maxWidth: 720 }}>
        <h2 style={{
          margin: 0, fontFamily: 'var(--af-font-sans)', fontWeight: 800,
          fontSize: 'clamp(40px, 6vw, 72px)', lineHeight: 1.05, letterSpacing: '-0.025em',
          color: 'var(--af-fg)', textTransform: 'uppercase',
        }}>
          Ready to <span style={{ color: 'var(--af-spark)' }}>build</span> your startup?
        </h2>
        <p style={{ marginTop: 18, fontSize: 17, color: 'var(--af-fg-4)' }}>
          Become the founder you aspire to be — don't just learn, build.
        </p>
        <div style={{ marginTop: 36, display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
          <Button variant="primary" onClick={() => onOpenApply('apply')}>Apply Now</Button>
          <Button variant="secondary" onClick={() => onOpenApply('register')}>Register Today</Button>
        </div>
      </div>
    </section>
  );
}

export default FinalCTA;
