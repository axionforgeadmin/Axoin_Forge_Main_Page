import React from 'react';
import SectionHeader from './SectionHeader';

// Challenges — split-screen problems vs solutions.

function Challenges() {
  const problems = [
    'Uncertainty about where to begin',
    'No clear business structure or roadmap',
    'Lack of mentorship and professional guidance',
    'Difficulty validating ideas',
    'Limited knowledge in branding and technology',
    'Fear of failure, lack of confidence',
    'No professional network or support ecosystem',
    'Struggling to balance academics and startup building',
  ];
  const solutions = [
    'Validating and refining your startup ideas',
    'Building strong business models and execution',
    'Personalized mentorship and founder development',
    'Creating professional brands and digital presence',
    'Legal and business structuring support',
    'Developing operational systems and workflows',
    'Teaching real-world execution and habits',
    'Supporting you through every stage',
  ];

  return (
    <section id="challenges" className="section" style={{
      background: 'linear-gradient(180deg, transparent 0%, rgba(14,165,233,0.04) 50%, transparent 100%)',
    }}>
      <div className="container">
        <SectionHeader eyebrow="The Reality" title="The gap we bridge" spark="gap" />

        <div style={{
          display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 20,
          marginTop: 64,
        }}>
          <div style={{
            padding: 32, borderRadius: 18,
            background: 'linear-gradient(180deg, rgba(229,72,77,0.06), rgba(229,72,77,0.02))',
            border: '1px solid rgba(229,72,77,0.18)',
          }}>
            <h3 style={{ margin: '0 0 24px', fontSize: 14, fontWeight: 700, color: '#F87171', letterSpacing: '0.18em', textTransform: 'uppercase' }}>
              What Students Face
            </h3>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 12 }}>
              {problems.map((p, i) => (
                <li key={i} style={{ display: 'flex', gap: 12, color: 'var(--af-fg-3)', fontSize: 14, lineHeight: 1.5, alignItems: 'flex-start' }}>
                  <span style={{ color: '#F87171', fontWeight: 700, flexShrink: 0, marginTop: 1 }}>✕</span>
                  {p}
                </li>
              ))}
            </ul>
          </div>

          <div style={{
            padding: 32, borderRadius: 18,
            background: 'linear-gradient(180deg, rgba(14,165,233,0.10), rgba(14,165,233,0.03))',
            border: '1px solid rgba(14,165,233,0.30)',
            boxShadow: '0 0 0 1px rgba(14,165,233,0.10), 0 0 40px rgba(14,165,233,0.10)',
          }}>
            <h3 style={{ margin: '0 0 24px', fontSize: 14, fontWeight: 700, color: 'var(--af-spark)', letterSpacing: '0.18em', textTransform: 'uppercase' }}>
              How AXIONFORGE Solves It
            </h3>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 12 }}>
              {solutions.map((s, i) => (
                <li key={i} style={{ display: 'flex', gap: 12, color: 'var(--af-fg-2)', fontSize: 14, lineHeight: 1.5, alignItems: 'flex-start' }}>
                  <span style={{ color: 'var(--af-spark)', fontWeight: 700, flexShrink: 0, marginTop: 1 }}>✓</span>
                  {s}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Challenges;
