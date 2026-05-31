import React from 'react';
import SectionHeader from './SectionHeader';

// Programs — three pricing cards. Signature is featured with spark glow.

function Programs({ onOpenApply }) {
  const programs = [
    {
      name: 'Basic',
      tagline: 'For aspiring founders starting their journey.',
      features: [
        'Idea validation',
        'Founder mentorship',
        'Startup strategy guidance',
        'Business model training',
        'Founder development sessions',
        'Startup blueprint support',
      ],
      featured: false,
    },
    {
      name: 'Signature',
      tagline: 'For founders ready for advanced execution and structuring.',
      features: [
        'Everything in Basic',
        'Advanced execution guidance',
        'Startup branding support',
        'Legal and business structuring',
        'Operational planning',
        'Growth strategy support',
        'Founder execution systems',
      ],
      featured: true,
    },
    {
      name: 'Premium',
      tagline: 'For founders seeking full-spectrum support from idea to execution.',
      features: [
        'Everything in Signature',
        'Full execution support',
        'Technology and digital infrastructure',
        'Marketing and growth systems',
        'Operational support',
        'Advanced founder mentorship',
        'Long-term scaling guidance',
      ],
      featured: false,
    },
  ];

  return (
    <section id="programs" className="section">
      <div className="container">
        <SectionHeader eyebrow="Our Programs" title="Choose your path" spark="path" />

        <div style={{
          display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 20,
          marginTop: 72, alignItems: 'stretch',
        }}>
          {programs.map(p => <ProgramCard key={p.name} p={p} onOpenApply={onOpenApply} />)}
        </div>
      </div>
    </section>
  );
}

function ProgramCard({ p, onOpenApply }) {
  return (
    <div style={{
      position: 'relative', borderRadius: 20, padding: '28px 26px 26px',
      background: p.featured
        ? 'linear-gradient(180deg, rgba(14,165,233,0.10), rgba(14,165,233,0.03))'
        : 'var(--af-surface)',
      border: '1px solid ' + (p.featured ? 'var(--af-border-spark)' : 'var(--af-border)'),
      backdropFilter: 'blur(8px)',
      boxShadow: p.featured
        ? '0 0 0 1px rgba(14,165,233,0.3), 0 0 60px rgba(14,165,233,0.2), 0 24px 60px rgba(0,0,0,0.4)'
        : 'none',
      display: 'flex', flexDirection: 'column',
      transform: p.featured ? 'scale(1.02)' : 'scale(1)',
    }}>
      {p.featured && (
        <div style={{
          position: 'absolute', top: -12, left: '50%', transform: 'translateX(-50%)',
          background: 'var(--af-spark)', color: 'white',
          padding: '5px 14px', borderRadius: 9999, fontSize: 10, fontWeight: 700,
          letterSpacing: '0.18em', textTransform: 'uppercase',
          boxShadow: '0 0 20px rgba(14,165,233,0.5)',
        }}>Most Popular</div>
      )}
      <h3 style={{ margin: 0, fontSize: 22, fontWeight: 700, color: 'var(--af-fg)' }}>{p.name} Program</h3>
      <p style={{ margin: '6px 0 22px', fontSize: 13, color: 'var(--af-fg-5)', lineHeight: 1.5 }}>{p.tagline}</p>
      <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 26px', display: 'flex', flexDirection: 'column', gap: 8, flex: 1 }}>
        {p.features.map((f, i) => (
          <li key={i} style={{ display: 'flex', gap: 10, fontSize: 13.5, color: 'var(--af-fg-3)', alignItems: 'flex-start' }}>
            <span style={{ color: 'var(--af-spark)', fontWeight: 700, flexShrink: 0 }}>→</span>{f}
          </li>
        ))}
      </ul>
      <button
        onClick={() => onOpenApply(p.name.toLowerCase())}
        className={'btn ' + (p.featured ? 'btn-primary' : 'btn-secondary')}
        style={{ width: '100%' }}
      >
        Apply for {p.name}
      </button>
    </div>
  );
}

export default Programs;
