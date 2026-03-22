import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../api/api';
import { useAuth } from '../context/useAuth';

export default function Login() {
  const [form, setForm]       = useState({ email: '', password: '' });
  const [error, setError]     = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate  = useNavigate();

  const onChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const onSubmit = async e => {
    e.preventDefault();
    setError(''); setLoading(true);
    try {
      const r = await api.post('/api/auth/login', form);
      login(r.data.token, { name: r.data.name, email: r.data.email });
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.error || 'Invalid email or password.');
    } finally { setLoading(false); }
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', position: 'relative', overflow: 'hidden' }}>

      {/* ── Left panel ── */}
      <div style={{
        width: '45%',
        background: 'linear-gradient(160deg, #0E0E10 0%, #0A0A0C 100%)',
        borderRight: '1px solid var(--border)',
        display: 'flex', flexDirection: 'column',
        justifyContent: 'space-between', padding: '60px 48px',
        position: 'relative', overflow: 'hidden',
      }} className="hidden md:flex anim-slideRight">

        <div style={{
          position: 'absolute', top: '25%', left: '15%',
          width: 300, height: 300,
          background: 'radial-gradient(circle, rgba(212,168,83,0.1) 0%, transparent 65%)',
          animation: 'orb-move 14s ease-in-out infinite',
          pointerEvents: 'none',
        }} />

        {/* Logo */}
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

        {/* Center content */}
        <div className="anim-fadeUp d2" style={{ position: 'relative', zIndex: 1 }}>
          <p style={{ fontFamily: 'JetBrains Mono', fontSize: 11, letterSpacing: '0.22em', color: 'var(--gold-dim)', textTransform: 'uppercase', marginBottom: 20 }}>
            Welcome back
          </p>
          <h2 style={{ fontFamily: 'Playfair Display', fontSize: 40, fontWeight: 600, lineHeight: 1.15, color: 'var(--text)', marginBottom: 28 }}>
            Your links are<br />
            <em className="gold-text" style={{ fontStyle: 'italic' }}>waiting for you.</em>
          </h2>
          <div className="gold-line" style={{ marginBottom: 28 }} />
          {/* Stats teaser */}
          {[
            { num: '10K+', label: 'links shortened daily' },
            { num: '99.9%', label: 'uptime guaranteed' },
            { num: '< 1ms', label: 'redirect latency' },
          ].map((s, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 16 }}
              className={`anim-slideRight d${i + 3}`}>
              <span style={{ fontFamily: 'Playfair Display', fontSize: 22, fontWeight: 600, color: 'var(--gold)', minWidth: 60 }}>{s.num}</span>
              <span style={{ fontSize: 13, color: 'var(--text-muted)' }}>{s.label}</span>
            </div>
          ))}
        </div>

        <div className="anim-fadeUp d5">
          <p style={{ fontFamily: 'Playfair Display', fontSize: 15, fontStyle: 'italic', color: 'var(--text-muted)', lineHeight: 1.6 }}>
            "Simplicity is the ultimate sophistication."
          </p>
          <p style={{ fontSize: 12, color: 'var(--text-soft)', marginTop: 6, fontFamily: 'JetBrains Mono' }}>— Leonardo da Vinci</p>
        </div>
      </div>

      {/* ── Right panel — form ── */}
      <div style={{
        flex: 1,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: '80px 24px 40px',
        position: 'relative',
      }} className="anim-slideLeft">
        <div style={{
          position: 'absolute', bottom: '20%', left: '20%',
          width: 300, height: 300,
          background: 'radial-gradient(circle, rgba(212,168,83,0.04) 0%, transparent 70%)',
          pointerEvents: 'none',
        }} />

        <div style={{ width: '100%', maxWidth: 400, position: 'relative', zIndex: 1 }}>

          <div className="anim-fadeUp" style={{ marginBottom: 36 }}>
            <p style={{ fontFamily: 'JetBrains Mono', fontSize: 11, letterSpacing: '0.2em', color: 'var(--gold-dim)', textTransform: 'uppercase', marginBottom: 12 }}>
              Sign in
            </p>
            <h1 style={{ fontFamily: 'Playfair Display', fontSize: 38, fontWeight: 600, lineHeight: 1.1, color: 'var(--text)', marginBottom: 8 }}>
              Welcome<br />
              <em className="gold-text" style={{ fontStyle: 'italic' }}>back.</em>
            </h1>
            <p style={{ fontSize: 14, color: 'var(--text-muted)', marginTop: 10 }}>
              Sign in to manage your links.
            </p>
          </div>

          {error && (
            <div className="anim-fadeIn" style={{
              background: 'rgba(200,50,50,0.08)', border: '1px solid rgba(200,50,50,0.25)',
              color: '#E07070', borderRadius: 10, padding: '11px 16px',
              fontSize: 13, marginBottom: 20, display: 'flex', gap: 8, alignItems: 'center',
            }}>
              <span>⚠</span> {error}
            </div>
          )}

          <form onSubmit={onSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
            {[
              { label: 'Email address', name: 'email', type: 'email', ph: 'sumit@example.com', delay: 'd1' },
              { label: 'Password', name: 'password', type: 'password', ph: '••••••••', delay: 'd2' },
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

            <div className="anim-fadeUp d3" style={{ marginTop: 4 }}>
              <button
                type="submit" disabled={loading}
                className="btn-primary"
                style={{ width: '100%', padding: '14px', borderRadius: 12, fontSize: 15 }}
              >
                {loading
                  ? <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10 }}>
                      <span className="spinner" /> Signing in…
                    </span>
                  : 'Sign in →'}
              </button>
            </div>
          </form>

          <div style={{ display: 'flex', alignItems: 'center', gap: 12, margin: '24px 0' }} className="anim-fadeUp d4">
            <div style={{ flex: 1, height: 1, background: 'var(--border-dim)' }} />
            <span style={{ fontSize: 12, color: 'var(--text-soft)', fontFamily: 'JetBrains Mono' }}>or</span>
            <div style={{ flex: 1, height: 1, background: 'var(--border-dim)' }} />
          </div>

          <p style={{ textAlign: 'center', fontSize: 14, color: 'var(--text-muted)' }} className="anim-fadeUp d5">
            New to Snip?{' '}
            <Link to="/register" style={{ color: 'var(--gold)', textDecoration: 'none', fontWeight: 500 }}
              onMouseEnter={e => e.currentTarget.style.textDecoration = 'underline'}
              onMouseLeave={e => e.currentTarget.style.textDecoration = 'none'}
            >Create an account</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
