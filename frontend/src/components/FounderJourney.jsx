import React, { useState, useEffect, useRef } from 'react';
import SectionHeader from './SectionHeader';

// FounderJourney — 10-step timeline; uses IntersectionObserver for reveal.

function FounderJourney() {
  const steps = [
    { n: '01', t: 'Founder Evaluation',                  d: 'Assess your vision, goals, and startup readiness.' },
    { n: '02', t: 'Idea Validation & Refinement',        d: 'Analyze and improve your idea for market fit.' },
    { n: '03', t: 'Startup Blueprint & Strategy',        d: 'Build your business model, operational plan, and growth roadmap.' },
    { n: '04', t: 'Brand Identity & Positioning',        d: "Craft your startup's name, branding, and professional image." },
    { n: '05', t: 'Legal & Business Structuring',        d: 'Register, document, and set up your company the right way.' },
    { n: '06', t: 'Technology & Digital Infrastructure', d: 'Develop websites, automation, and digital systems.' },
    { n: '07', t: 'Professional Founder Development',    d: 'Train in leadership, communication, and execution discipline.' },
    { n: '08', t: 'Marketing & Growth Systems',          d: 'Launch outreach, lead generation, and growth frameworks.' },
    { n: '09', t: 'Operational Execution Support',       d: 'Manage workflows, customer systems, and daily operations.' },
    { n: '10', t: 'Launch & Scaling',                    d: 'Launch your startup and scale for long-term success.' },
  ];

  return (
    <section id="journey" className="section section--wide">
      <div className="container">
        <SectionHeader eyebrow="The Journey" title="Your founder journey" spark="founder journey" />

        <div style={{ maxWidth: 720, margin: '64px auto 0' }}>
          {steps.map((s, i) => <Step key={s.n} s={s} last={i === steps.length - 1} />)}
        </div>
      </div>
    </section>
  );
}

function Step({ s, last }) {
  const ref = useRef(null);
  const [show, setShow] = useState(false);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const io = new IntersectionObserver((es) => {
      es.forEach(e => { if (e.isIntersecting) { setShow(true); io.disconnect(); } });
    }, { rootMargin: '-60px' });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={ref} className={'reveal ' + (show ? 'in' : '')} style={{ display: 'flex', gap: 20, alignItems: 'flex-start' }}>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flexShrink: 0 }}>
        <div style={{
          width: 44, height: 44, borderRadius: 9999,
          background: 'rgba(14,165,233,0.12)',
          border: '1px solid rgba(14,165,233,0.45)',
          color: 'var(--af-spark)', fontWeight: 700, fontSize: 14,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          boxShadow: '0 0 20px rgba(14,165,233,0.18)',
        }}>{s.n}</div>
        {!last && <div style={{
          width: 1, flex: 1, minHeight: 50, marginTop: 6,
          background: 'linear-gradient(180deg, rgba(14,165,233,0.4), transparent)',
        }}/>}
      </div>
      <div style={{ paddingBottom: 32 }}>
        <h3 style={{ margin: '8px 0 6px', fontSize: 19, fontWeight: 600, color: 'var(--af-fg)', lineHeight: 1.2 }}>{s.t}</h3>
        <p style={{ margin: 0, fontSize: 14, color: 'var(--af-fg-4)', lineHeight: 1.65 }}>{s.d}</p>
      </div>
    </div>
  );
}

export default FounderJourney;
