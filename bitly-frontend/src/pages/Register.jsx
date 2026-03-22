import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../api/api';
import { useAuth } from '../context/useAuth';

export default function Register() {
  const [form, setForm]     = useState({ name: '', email: '', password: '' });
  const [error, setError]   = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate  = useNavigate();

  const onChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const onSubmit = async e => {
    e.preventDefault();
    setError(''); setLoading(true);
    try {
      const r = await api.post('/api/auth/register', form);
      login(r.data.token, { name: r.data.name, email: r.data.email });
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.error || 'Registration failed. Try again.');
    } finally { setLoading(false); }
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', position: 'relative', overflow: 'hidden' }}>

      {/* ── Left panel — form ── */}
      <div style={{
        flex: 1,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: '80px 24px 40px',
        position: 'relative',
      }} className="anim-slideRight">
        {/* Subtle bg orb */}
        <div style={{
          position: 'absolute', top: '20%', right: '10%',
          width: 350, height: 350,
          background: 'radial-gradient(circle, rgba(212,168,83,0.05) 0%, transparent 70%)',
          pointerEvents: 'none',
        }} />

        <div style={{ width: '100%', maxWidth: 420, position: 'relative', zIndex: 1 }}>

          {/* Heading */}
          <div className="anim-fadeUp" style={{ marginBottom: 36 }}>
            <p style={{ fontFamily: 'JetBrains Mono', fontSize: 11, letterSpacing: '0.2em', color: 'var(--gold-dim)', textTransform: 'uppercase', marginBottom: 12 }}>
              Step 1 of 1
            </p>
            <h1 style={{ fontFamily: 'Playfair Display', fontSize: 38, fontWeight: 600, lineHeight: 1.1, color: 'var(--text)', marginBottom: 8 }}>
              Create your<br />
              <em className="gold-text" style={{ fontStyle: 'italic' }}>free account</em>
            </h1>
            <p style={{ fontSize: 14, color: 'var(--text-muted)', marginTop: 10 }}>
              Join thousands shortening smarter.
            </p>
          </div>

          {/* Error */}
          {error && (
            <div className="anim-fadeIn" style={{
              background: 'rgba(200,50,50,0.08)', border: '1px solid rgba(200,50,50,0.25)',
              color: '#E07070', borderRadius: 10, padding: '11px 16px',
              fontSize: 13, marginBottom: 20, display: 'flex', gap: 8, alignItems: 'center',
            }}>
              <span style={{ fontSize: 16 }}>⚠</span> {error}
            </div>
          )}

          {/* Form */}
          <form onSubmit={onSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
            {[
              { label: 'Full name', name: 'name', type: 'text', ph: 'Sumit Kumar', delay: 'd1' },
              { label: 'Email address', name: 'email', type: 'email', ph: 'sumit@example.com', delay: 'd2' },
              { label: 'Password', name: 'password', type: 'password', ph: 'Minimum 6 characters', delay: 'd3' },
            ].map(f => (
              <div key={f.name} className={`anim-fadeUp ${f.delay}`}>
                <label style={{
                  display: 'block', fontSize: 11, fontWeight: 500,
                  letterSpacing: '0.14em', textTransform: 'uppercase',
                  color: 'var(--text-muted)', marginBottom: 8,
                  fontFamily: 'JetBrains Mono',
                }}>{f.label}</label>
                <input
                  type={f.type} name={f.name}
                  value={form[f.name]} onChange={onChange}
                  placeholder={f.ph} required
                  className="inp"
                  style={{ borderRadius: 12, padding: '13px 16px', fontSize: 14 }}
                />
              </div>
            ))}

            <div className="anim-fadeUp d4" style={{ marginTop: 4 }}>
              <button
                type="submit" disabled={loading}
                className="btn-primary"
                style={{ width: '100%', padding: '14px', borderRadius: 12, fontSize: 15 }}
              >
                {loading
                  ? <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10 }}>
                      <span className="spinner" /> Creating account…
                    </span>
                  : 'Create free account →'}
              </button>
            </div>
          </form>

          {/* Divider */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, margin: '24px 0' }} className="anim-fadeUp d5">
            <div style={{ flex: 1, height: 1, background: 'var(--border-dim)' }} />
            <span style={{ fontSize: 12, color: 'var(--text-soft)', fontFamily: 'JetBrains Mono' }}>or</span>
            <div style={{ flex: 1, height: 1, background: 'var(--border-dim)' }} />
          </div>

          <p style={{ textAlign: 'center', fontSize: 14, color: 'var(--text-muted)' }} className="anim-fadeUp d5">
            Already have an account?{' '}
            <Link to="/login" style={{ color: 'var(--gold)', textDecoration: 'none', fontWeight: 500 }}
              onMouseEnter={e => e.currentTarget.style.textDecoration = 'underline'}
              onMouseLeave={e => e.currentTarget.style.textDecoration = 'none'}
            >Sign in</Link>
          </p>
        </div>
      </div>

      {/* ── Right panel — decorative ── */}
      <div style={{
        width: '45%', position: 'relative',
        background: 'linear-gradient(160deg, #0E0E10 0%, #0A0A0C 100%)',
        borderLeft: '1px solid var(--border)',
        display: 'flex', flexDirection: 'column',
        justifyContent: 'space-between', padding: '60px 48px',
        overflow: 'hidden',
      }} className="hidden md:flex anim-slideLeft">

        {/* Animated orbs */}
        <div style={{
          position: 'absolute', top: '15%', left: '10%',
          width: 320, height: 320,
          background: 'radial-gradient(circle, rgba(212,168,83,0.12) 0%, transparent 65%)',
          animation: 'orb-move 12s ease-in-out infinite',
          pointerEvents: 'none',
        }} />
        <div style={{
          position: 'absolute', bottom: '20%', right: '5%',
          width: 220, height: 220,
          background: 'radial-gradient(circle, rgba(212,168,83,0.07) 0%, transparent 65%)',
          animation: 'orb-move 16s ease-in-out infinite reverse',
          pointerEvents: 'none',
        }} />

        {/* Top — logo */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }} className="anim-fadeIn">
          <div style={{
            width: 36, height: 36, borderRadius: 9,
            background: 'linear-gradient(135deg, #D4A853, #8A6A2E)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: '0 4px 16px rgba(212,168,83,0.4)',
          }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#08080A" strokeWidth="2.5" strokeLinecap="round">
              <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/>
              <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/>
            </svg>
          </div>
          <span style={{ fontFamily: 'Playfair Display', fontSize: 26, fontWeight: 600 }} className="gold-text">Snip</span>
        </div>

        {/* Middle — headline */}
        <div className="anim-fadeUp d2" style={{ position: 'relative', zIndex: 1 }}>
          <p style={{ fontFamily: 'JetBrains Mono', fontSize: 11, letterSpacing: '0.22em', color: 'var(--gold-dim)', textTransform: 'uppercase', marginBottom: 20 }}>
            Powerful link management
          </p>
          <h2 style={{ fontFamily: 'Playfair Display', fontSize: 42, fontWeight: 600, lineHeight: 1.15, color: 'var(--text)', marginBottom: 24 }}>
            Shorten links.<br />
            <em style={{ fontStyle: 'italic' }} className="gold-text">Track everything.</em>
          </h2>
          <div className="gold-line" style={{ marginBottom: 28 }} />
          {['Generate QR codes instantly', 'Track clicks in real time', 'Manage all your links'].map((f, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 14 }}
              className={`anim-slideLeft d${i + 3}`}>
              <div style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--gold)', flexShrink: 0 }} />
              <span style={{ fontSize: 14, color: 'var(--text-muted)' }}>{f}</span>
            </div>
          ))}
        </div>

        <div className="anim-fadeUp d4" style={{ position: 'relative', zIndex: 1 }}>
          <p style={{ fontFamily: 'Playfair Display', fontSize: 15, fontStyle: 'italic', color: 'var(--text-muted)', lineHeight: 1.6 }}>
            "Every great link starts with a great shortener."
          </p>
        </div>
      </div>
    </div>
  );
}
