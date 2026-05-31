import React from 'react';
import SectionHeader from './SectionHeader';

// OurTeams — 4 internal divisions, each keyed to a spectrum accent for vibrancy.

function OurTeams() {
  const teams = [
    { name: 'Outreach Crew',     role: 'Acquisition · Community',   body: 'Founder acquisition, marketing, community engagement, and applicant support.', c: '#22D3EE' },
    { name: 'Strategy Division', role: 'Planning · Mentorship',     body: 'Startup planning, idea validation, business strategy, mentorship, and execution systems.', c: '#6366F1' },
    { name: 'Structuring Unit',  role: 'Legal · Compliance',        body: 'Legal structuring, registrations, compliance, and professional business setup.', c: '#8B5CF6' },
    { name: 'CodeForge Team',    role: 'Technology · Automation',   body: 'Technology development, websites, digital infrastructure, and automation.', c: '#E879F9' },
  ];

  return (
    <section id="teams" className="section">
      <div className="container">
        <SectionHeader eyebrow="// Our Teams" title="Built to execute" spark="execute" />

        <div style={{
          display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 16,
          marginTop: 64,
        }}>
          {teams.map((t) => (
            <div key={t.name} className="glass-card" style={{ padding: 28 }}>
              <div style={{
                position: 'absolute', top: 0, left: 0, right: 0, height: 3,
                background: `linear-gradient(90deg, ${t.c}, transparent)`,
              }}/>
              <div style={{
                width: 44, height: 44, borderRadius: 12,
                background: `linear-gradient(135deg, ${t.c}38, ${t.c}0D)`,
                border: `1px solid ${t.c}66`,
                display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 18,
                boxShadow: `0 0 24px ${t.c}2E`,
              }}>
                <span style={{ color: t.c, fontFamily: 'var(--af-font-display)', fontSize: 15 }}>
                  {t.name.split(' ').map(w => w[0]).join('').slice(0,2)}
                </span>
              </div>
              <h3 style={{ margin: '0 0 5px', fontSize: 18, fontWeight: 700, color: 'var(--af-fg)' }}>{t.name}</h3>
              <p style={{ margin: '0 0 14px', fontSize: 10.5, color: t.c, letterSpacing: '0.18em', textTransform: 'uppercase', fontFamily: 'var(--af-font-mono)' }}>{t.role}</p>
              <p style={{ margin: 0, fontSize: 13.5, color: 'var(--af-fg-4)', lineHeight: 1.6 }}>{t.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default OurTeams;
