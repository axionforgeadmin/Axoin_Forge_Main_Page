import React, { useState } from 'react';
import Button from './Button';
import { submitApplication } from '../services/api';

// ApplyModal — apply / register form, submits to the backend API.

const PROGRAMS = [
  { value: 'basic',     label: 'Basic Program' },
  { value: 'signature', label: 'Signature Program' },
  { value: 'premium',   label: 'Premium Program' },
  { value: 'apply',     label: 'Not sure yet' },
  { value: 'register',  label: 'Just registering interest' },
];

function ApplyModal({ program, onClose }) {
  const [submitted, setSubmitted] = useState(false);
  const [pending, setPending] = useState(false);
  const initialProgram = PROGRAMS.find(p => p.value === program) ? program : 'apply';
  const [form, setForm] = useState({ name: '', email: '', phone: '', college: '', selectedProgram: initialProgram });
  const [errors, setErrors] = useState({});
  const [submitError, setSubmitError] = useState(null);

  function update(k, v) { setForm(f => ({ ...f, [k]: v })); setErrors(e => ({ ...e, [k]: null })); setSubmitError(null); }

  async function submit(e) {
    e.preventDefault();
    const errs = {};
    if (!form.name.trim()) errs.name = 'Required';
    if (!form.email.trim()) errs.email = 'Required';
    if (!form.phone.trim()) errs.phone = 'Required';
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setPending(true);
    setSubmitError(null);
    try {
      await submitApplication({ ...form, program: form.selectedProgram });
      setPending(false);
      setSubmitted(true);
      setTimeout(onClose, 1600);
    } catch (err) {
      setPending(false);
      const data = err?.response?.data;
      if (data && typeof data === 'object') {
        const fieldErrs = {};
        for (const k of ['name', 'email', 'phone', 'college']) {
          if (Array.isArray(data[k]) && data[k][0]) fieldErrs[k] = data[k][0];
        }
        if (Object.keys(fieldErrs).length) setErrors(fieldErrs);
      }
      setSubmitError('Could not submit — please try again.');
    }
  }

  const programLabel = 'Apply to AXIONFORGE';

  return (
    <div
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
      style={{
        position: 'fixed', inset: 0, zIndex: 100, padding: 16,
        background: 'rgba(0,0,0,0.75)', backdropFilter: 'blur(8px)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        animation: 'af-fade 200ms ease-out',
      }}
    >
      <style>{`@keyframes af-fade { from { opacity: 0 } to { opacity: 1 } }`}</style>
      <div style={{
        width: '100%', maxWidth: 440, padding: 32, borderRadius: 20,
        background: 'rgba(255,255,255,0.97)', border: '1px solid var(--af-border)',
        backdropFilter: 'blur(20px)',
        boxShadow: '0 0 0 1px rgba(14,165,233,0.20), 0 30px 80px rgba(20,48,90,0.25)',
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
          <h3 style={{ margin: 0, fontSize: 18, fontWeight: 700, color: 'var(--af-fg)' }}>{programLabel}</h3>
          <button onClick={onClose} aria-label="Close" style={{
            background: 'transparent', border: 0, color: 'var(--af-fg-4)', fontSize: 22, cursor: 'pointer',
            lineHeight: 1, padding: 4,
          }}>×</button>
        </div>

        {submitted ? (
          <div style={{ textAlign: 'center', padding: '24px 0' }}>
            <div style={{ color: 'var(--af-spark)', fontSize: 18, fontWeight: 700, letterSpacing: '0.04em', textTransform: 'uppercase' }}>
              Application Received
            </div>
            <p style={{ color: 'var(--af-fg-4)', fontSize: 13, marginTop: 8 }}>We'll reach out to you shortly.</p>
          </div>
        ) : (
          <form onSubmit={submit} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            <Field label="Full Name" value={form.name} onChange={(v) => update('name', v)} error={errors.name} />
            <Field label="Email" type="email" value={form.email} onChange={(v) => update('email', v)} error={errors.email} />
            <Field label="Phone" value={form.phone} onChange={(v) => update('phone', v)} error={errors.phone} />
            <Field label="College / Institution" value={form.college} onChange={(v) => update('college', v)} optional />
            <div>
              <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: 'var(--af-fg-3)', marginBottom: 6, letterSpacing: '0.04em', textTransform: 'uppercase' }}>
                Program Interested In
              </label>
              <select
                value={form.selectedProgram}
                onChange={(e) => update('selectedProgram', e.target.value)}
                style={{
                  width: '100%', padding: '13px 16px', borderRadius: 12,
                  background: 'var(--af-surface-2)', color: 'var(--af-fg)',
                  fontFamily: 'var(--af-font-sans)', fontSize: 15,
                  border: '1px solid var(--af-border)', outline: 'none', cursor: 'pointer',
                  transition: 'all 180ms ease', appearance: 'none',
                  backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%236b7280' d='M6 8L1 3h10z'/%3E%3C/svg%3E")`,
                  backgroundRepeat: 'no-repeat', backgroundPosition: 'right 16px center',
                }}
              >
                {PROGRAMS.map(p => (
                  <option key={p.value} value={p.value}>{p.label}</option>
                ))}
              </select>
            </div>
            <Button type="submit" variant="primary" className="modal-submit" disabled={pending}>
              {pending ? 'Submitting…' : 'Submit Application'}
            </Button>
            {submitError && <p style={{ color: 'var(--af-danger)', fontSize: 12, textAlign: 'center', margin: 0 }}>{submitError}</p>}
          </form>
        )}
      </div>
    </div>
  );
}

function Field({ label, value, onChange, error, type = 'text', optional }) {
  const [focus, setFocus] = useState(false);
  return (
    <div>
      <input
        type={type}
        value={value}
        placeholder={label + (optional ? ' (optional)' : '')}
        onChange={(e) => onChange(e.target.value)}
        onFocus={() => setFocus(true)}
        onBlur={() => setFocus(false)}
        style={{
          width: '100%', padding: '13px 16px', borderRadius: 12,
          background: 'var(--af-surface-2)',
          color: 'var(--af-fg)',
          fontFamily: 'var(--af-font-sans)',
          fontSize: 15,
          border: '1px solid ' + (error ? 'var(--af-danger)' : focus ? 'var(--af-spark)' : 'var(--af-border)'),
          boxShadow: focus && !error ? '0 0 0 3px rgba(14,165,233,0.18)' : error ? '0 0 0 3px rgba(229,72,77,0.15)' : 'none',
          outline: 'none',
          transition: 'all 180ms ease',
        }}
      />
      {error && <p style={{ color: 'var(--af-danger)', fontSize: 11, marginTop: 6 }}>{error}</p>}
    </div>
  );
}

export default ApplyModal;
