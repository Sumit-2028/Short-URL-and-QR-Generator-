import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/useAuth';

const Navbar = () => {
  const { isLoggedIn, user, logout } = useAuth();
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 30);
    window.addEventListener('scroll', fn);
    return () => window.removeEventListener('scroll', fn);
  }, []);

  return (
    <header
      style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
        padding: '0 24px',
        height: 64,
        display: 'flex', alignItems: 'center',
        background: scrolled ? 'rgba(8,8,9,0.9)' : 'transparent',
        borderBottom: scrolled ? '1px solid rgba(212,168,83,0.12)' : '1px solid transparent',
        backdropFilter: scrolled ? 'blur(24px)' : 'none',
        transition: 'all 0.4s ease',
      }}
    >
      <div style={{ maxWidth: 1100, margin: '0 auto', width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>

        {/* Logo */}
        <Link to="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{
            width: 32, height: 32, borderRadius: 8,
            background: 'linear-gradient(135deg, #D4A853, #8A6A2E)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: '0 4px 12px rgba(212,168,83,0.3)',
            flexShrink: 0,
          }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#08080A" strokeWidth="2.5" strokeLinecap="round">
              <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/>
              <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/>
            </svg>
          </div>
          <span style={{
            fontFamily: 'Playfair Display, serif',
            fontSize: 22, fontWeight: 600,
            letterSpacing: '0.04em',
          }} className="gold-text">Snip</span>
        </Link>

        {/* Nav right */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          {isLoggedIn ? (
            <>
              <div style={{
                display: 'flex', alignItems: 'center', gap: 8,
                padding: '6px 14px',
                background: 'var(--bg3)',
                border: '1px solid var(--border-dim)',
                borderRadius: 8,
              }}>
                <div style={{
                  width: 24, height: 24, borderRadius: '50%',
                  background: 'linear-gradient(135deg, var(--gold-dim), var(--gold))',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 11, fontWeight: 700, color: '#08080A',
                }}>
                  {user?.name?.[0]?.toUpperCase()}
                </div>
                <span style={{ fontSize: 13, color: 'var(--text-muted)', fontFamily: 'Outfit' }}>
                  {user?.name}
                </span>
              </div>
              <button
                onClick={() => { logout(); navigate('/login'); }}
                className="btn-outline"
                style={{ padding: '7px 16px', borderRadius: 8, fontSize: 13 }}
              >
                Sign out
              </button>
            </>
          ) : (
            <>
              <Link to="/login" style={{
                fontSize: 14, color: 'var(--text-muted)',
                textDecoration: 'none', padding: '7px 14px',
                transition: 'color 0.2s',
              }}
                onMouseEnter={e => e.target.style.color = 'var(--text)'}
                onMouseLeave={e => e.target.style.color = 'var(--text-muted)'}
              >Sign in</Link>
              <Link to="/register"
                className="btn-primary"
                style={{ padding: '8px 20px', borderRadius: 8, fontSize: 13, textDecoration: 'none', display: 'inline-block' }}
              >Get started</Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
