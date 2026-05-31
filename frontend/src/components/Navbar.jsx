import React, { useState, useEffect } from 'react';

// Navbar — fixed top, transparent → blurred on scroll. Section links scroll-snap.

function Navbar({ onOpenApply }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const links = [
    { label: 'About', href: '#about' },
    { label: 'Teams', href: '#teams' },
    { label: 'Journey', href: '#journey' },
    { label: 'Programs', href: '#programs' },
  ];

  return (
    <nav
      style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 50,
        transition: 'all 280ms cubic-bezier(0.16, 1, 0.3, 1)',
        background: scrolled ? 'rgba(248,251,255,0.72)' : 'transparent',
        backdropFilter: scrolled ? 'blur(16px) saturate(140%)' : 'none',
        WebkitBackdropFilter: scrolled ? 'blur(16px) saturate(140%)' : 'none',
        borderBottom: '1px solid ' + (scrolled ? 'var(--af-border)' : 'transparent'),
      }}
    >
      <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px 24px' }}>
        <a href="#top" style={{ display: 'flex', alignItems: 'center', gap: 10, textDecoration: 'none' }}>
          <img src="/assets/logo-mark-color.png" alt="" style={{ height: 28, width: 'auto', borderRadius: 4 }}/>
          <span style={{ fontFamily: 'var(--af-font-sans)', fontWeight: 800, fontSize: 16, letterSpacing: '0.02em', color: 'var(--af-fg)' }}>
            AXIONFORGE
          </span>
        </a>

        <div className="nav-desktop" style={{ display: 'flex', alignItems: 'center', gap: 28 }}>
          {links.map(l => (
            <a key={l.label} href={l.href} style={{
              fontSize: 13, color: 'var(--af-fg-3)', textDecoration: 'none',
              transition: 'color 180ms ease',
            }}
            onMouseEnter={(e) => e.currentTarget.style.color = 'var(--af-spark)'}
            onMouseLeave={(e) => e.currentTarget.style.color = 'var(--af-fg-3)'}>
              {l.label}
            </a>
          ))}
          <button onClick={() => onOpenApply('apply')} className="btn btn-primary" style={{ padding: '8px 18px', fontSize: 13 }}>
            Apply Now
          </button>
        </div>

        <button
          className="nav-mobile"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Menu"
          style={{ display: 'none', background: 'transparent', border: 0, cursor: 'pointer', padding: 8 }}
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
            <span style={{ display: 'block', width: 22, height: 2, background: 'white', transition: 'all 280ms', transform: menuOpen ? 'rotate(45deg) translate(5px, 5px)' : 'none' }}/>
            <span style={{ display: 'block', width: 22, height: 2, background: 'white', opacity: menuOpen ? 0 : 1, transition: 'all 280ms' }}/>
            <span style={{ display: 'block', width: 22, height: 2, background: 'white', transition: 'all 280ms', transform: menuOpen ? 'rotate(-45deg) translate(5px, -5px)' : 'none' }}/>
          </div>
        </button>
      </div>

      {menuOpen && (
        <div className="nav-mobile" style={{
          background: 'rgba(248,251,255,0.97)', borderTop: '1px solid var(--af-border)',
          padding: 24, display: 'flex', flexDirection: 'column', gap: 16,
        }}>
          {links.map(l => (
            <a key={l.label} href={l.href} onClick={() => setMenuOpen(false)} style={{ color: 'var(--af-fg-3)', textDecoration: 'none', fontSize: 14 }}>{l.label}</a>
          ))}
          <button onClick={() => { setMenuOpen(false); onOpenApply('apply'); }} className="btn btn-primary" style={{ marginTop: 8 }}>Apply Now</button>
        </div>
      )}

      <style>{`
        @media (max-width: 760px) {
          .nav-desktop { display: none !important; }
          .nav-mobile { display: block !important; }
        }
      `}</style>
    </nav>
  );
}

export default Navbar;
