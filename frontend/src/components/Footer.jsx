import React from 'react';

// Footer — minimal: wordmark, tagline, contact line.

function Footer() {
  return (
    <footer style={{
      padding: '40px 0 32px',
      borderTop: '1px solid var(--af-border)',
      background: 'var(--af-surface)',
    }}>
      <div className="container" style={{
        display: 'flex', flexWrap: 'wrap', gap: 18, alignItems: 'center', justifyContent: 'space-between',
      }}>
        <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
          <img src="/assets/logo-mark-color.png" alt="" style={{ height: 22, width: 'auto', borderRadius: 3 }}/>
          <span style={{ fontFamily: 'var(--af-font-sans)', fontWeight: 800, fontSize: 14, letterSpacing: '0.02em', color: 'var(--af-fg)' }}>AXIONFORGE</span>
        </div>
        <p style={{ margin: 0, fontSize: 13, color: 'var(--af-fg-5)' }}>Not Just Learning. <span style={{ color: 'var(--af-spark)' }}>Building.</span></p>
        <div style={{ display: 'flex', gap: 20, fontSize: 12, color: 'var(--af-fg-5)' }}>
          <a href="mailto:axionforge.in@gmail.com" style={{ color: 'var(--af-fg-4)', textDecoration: 'none' }}>Contact</a>
          <span>© 2026 AXIONFORGE LLP</span>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
