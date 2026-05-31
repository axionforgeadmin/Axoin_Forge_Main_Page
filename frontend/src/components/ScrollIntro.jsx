import React, { useRef, useState, useEffect } from 'react';
import { AFScrollSpace } from '../lib/scrollspace';
import Button from './Button';

// ScrollIntro — scroll-driven 3D space flight with stage-by-stage narration.
// A pinned canvas hosts AFScrollSpace; scrolling the tall section flies the
// camera through the object corridor while concept panels crossfade in/out.

export default function ScrollIntro({ onOpenApply }) {
  const introRef = useRef(null);
  const canvasRef = useRef(null);
  const ctrlRef = useRef(null);
  const [prog, setProg] = useState(0);

  useEffect(() => {
    if (canvasRef.current && AFScrollSpace) {
      ctrlRef.current = AFScrollSpace(canvasRef.current);
    }
    let raf = 0;
    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        const el = introRef.current; if (!el) return;
        const total = el.offsetHeight - window.innerHeight;
        const scrolled = -el.getBoundingClientRect().top;
        const p = Math.max(0, Math.min(1, scrolled / Math.max(1, total)));
        setProg(p);
        if (ctrlRef.current) ctrlRef.current.setProgress(p);
      });
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      if (ctrlRef.current) ctrlRef.current.destroy();
    };
  }, []);

  // crossfade helper
  const bump = (center, width = 0.17) => Math.max(0, 1 - Math.abs(prog - center) / width);

  const panels = [
    {
      c: 0.0,
      eyebrow: '// Founder Operating System · India',
      title: <>AXION<span className="af-spectrum">FORGE</span></>,
      sub: <>Not Just Learning. <span className="af-spark">Building.</span></>,
      body: 'Scroll to travel through the system that turns an idea into a company.',
    },
    {
      c: 0.25,
      eyebrow: '// 01 · The Idea',
      title: <>It starts with a <span className="af-spectrum">spark</span></>,
      body: 'Most people stop at the idea. A note in an app, a conversation that fades. AXIONFORGE begins exactly where others stop.',
    },
    {
      c: 0.5,
      eyebrow: '// 02 · The Build',
      title: <>We build the <span className="af-spectrum">company</span> around it</>,
      body: 'Strategy, branding, legal structuring, and technology — assembled into one operating system so you execute like a real company from day one.',
    },
    {
      c: 0.75,
      eyebrow: '// 03 · The Founder',
      title: <>Founders, not <span className="af-spectrum">students</span></>,
      body: 'A 10-step journey, four expert divisions, and three program tiers — hands-on, professional, execution-driven.',
    },
    {
      c: 1.0,
      eyebrow: '// 04 · The Mission',
      title: <>Building India&apos;s next generation of <span className="af-spectrum">founders</span></>,
      body: 'Become the founder you aspire to be — don\u2019t just learn, build.',
      cta: true,
    },
  ];

  const depthPct = Math.round(prog * 100);
  const bars = 12, filled = Math.round(prog * bars);

  return (
    <section ref={introRef} className="intro" id="top">
      <div className="intro-sticky">
        <div ref={canvasRef} className="space-canvas" />
        <div className="space-veil" />

        {/* HUD */}
        <div className="hud hud-tl"><span className="hud-dot" /> SYSTEM ONLINE</div>
        <div className="hud hud-tr">FOUNDER OS · v2026</div>
        <div className="hud hud-bl">
          DEPTH {String(depthPct).padStart(3, '0')}%&nbsp;
          <span className="hud-meter">{'\u2593'.repeat(filled)}{'\u2591'.repeat(bars - filled)}</span>
        </div>
        <div className="hud hud-br">LAT 17.3850°N · LON 78.4867°E</div>

        {/* narration panels */}
        {panels.map((p, i) => {
          const o = bump(p.c);
          return (
            <div key={i} className="intro-panel" style={{ opacity: o, pointerEvents: o > 0.5 ? 'auto' : 'none' }}>
              <div className="eyebrow">{p.eyebrow}</div>
              <h1 className="intro-title">{p.title}</h1>
              {p.sub && <p className="intro-sub">{p.sub}</p>}
              <p className="intro-body">{p.body}</p>
              {p.cta && (
                <div className="intro-cta">
                  <Button variant="primary" onClick={() => onOpenApply('apply')}>Launch Application →</Button>
                  <Button variant="secondary" onClick={() => onOpenApply('register')}>Register Interest</Button>
                </div>
              )}
            </div>
          );
        })}

        {/* scroll hint, fades after start */}
        <div className="intro-scroll" style={{ opacity: Math.max(0, 1 - prog * 6) }}>
          <span>SCROLL TO ENTER</span>
          <span className="intro-scroll-line" />
        </div>
      </div>
    </section>
  );
}
