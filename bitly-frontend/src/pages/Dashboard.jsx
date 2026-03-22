import { useState, useEffect } from 'react';
import api from '../api/api';
import UrlCard from '../components/UrlCard';
import { useAuth } from '../context/useAuth';

export default function Dashboard() {
  const [urls, setUrls]       = useState([]);
  const [input, setInput]     = useState('');
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [deletingId, setDeletingId] = useState(null);
  const [error, setError]     = useState('');
  const { user } = useAuth();

  useEffect(() => {
    api.get('/api/urls')
      .then(r => setUrls(r.data))
      .catch(() => setError('Failed to load links'))
      .finally(() => setFetching(false));
  }, []);

  const shorten = async e => {
    e.preventDefault();
    if (!input.trim()) return;
    setLoading(true); setError('');
    try {
      const r = await api.post('/api/urls/shorten', { originalUrl: input });
      setUrls(prev => [r.data, ...prev]);
      setInput('');
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to shorten URL');
    } finally { setLoading(false); }
  };

  const deleteUrl = async id => {
    setError('');
    setDeletingId(id);
    try {
      await api.delete(`/api/urls/${id}`);
      setUrls(prev => prev.filter(url => url.id !== id));
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to delete URL');
    } finally {
      setDeletingId(null);
    }
  };

  const totalClicks = urls.reduce((a, u) => a + (u.clickCount || 0), 0);

  return (
    <div style={{ minHeight: '100vh', paddingTop: 80, paddingBottom: 60, position: 'relative', overflow: 'hidden' }}>

      {/* Background orbs */}
      <div style={{
        position: 'fixed', top: '-10%', left: '20%',
        width: 700, height: 700,
        background: 'radial-gradient(circle, rgba(212,168,83,0.03) 0%, transparent 60%)',
        pointerEvents: 'none', zIndex: 0,
        animation: 'orb-move 20s ease-in-out infinite',
      }} />
      <div style={{
        position: 'fixed', bottom: '10%', right: '5%',
        width: 500, height: 500,
        background: 'radial-gradient(circle, rgba(212,168,83,0.02) 0%, transparent 60%)',
        pointerEvents: 'none', zIndex: 0,
        animation: 'orb-move 25s ease-in-out infinite reverse',
      }} />

      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 24px', position: 'relative', zIndex: 1 }}>

        {/* ── Header ── */}
        <div className="anim-fadeUp" style={{ marginBottom: 40, paddingTop: 20 }}>
          <p style={{ fontFamily: 'JetBrains Mono', fontSize: 11, letterSpacing: '0.22em', color: 'var(--gold-dim)', textTransform: 'uppercase', marginBottom: 10 }}>
            Dashboard
          </p>
          <h1 style={{ fontFamily: 'Playfair Display', fontSize: 48, fontWeight: 600, lineHeight: 1, color: 'var(--text)' }}>
            Hello,{' '}
            <em className="gold-text" style={{ fontStyle: 'italic' }}>{user?.name}.</em>
          </h1>
        </div>

        {/* ── Stats ── */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16, marginBottom: 32 }}>
          {[
            { label: 'Total links', value: urls.length, icon: '🔗' },
            { label: 'Total clicks', value: totalClicks, icon: '👁' },
            { label: 'Avg clicks / link', value: urls.length ? (totalClicks / urls.length).toFixed(1) : '—', icon: '📈' },
          ].map((s, i) => (
            <div
              key={s.label}
              className={`anim-fadeUp d${i + 1}`}
              style={{
                background: 'var(--bg3)',
                border: '1px solid var(--border-dim)',
                borderRadius: 16, padding: '20px 24px',
                transition: 'border-color 0.3s, transform 0.3s',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.borderColor = 'var(--border)';
                e.currentTarget.style.transform = 'translateY(-2px)';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.borderColor = 'var(--border-dim)';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              <p style={{ fontSize: 11, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--text-soft)', fontFamily: 'JetBrains Mono', marginBottom: 10 }}>
                {s.label}
              </p>
              <p style={{ fontFamily: 'Playfair Display', fontSize: 44, fontWeight: 600, color: 'var(--text)', lineHeight: 1 }}>
                {s.value}
              </p>
            </div>
          ))}
        </div>

        {/* ── Shorten form ── */}
        <form
          onSubmit={shorten}
          className="anim-fadeUp d2"
          style={{
            background: 'linear-gradient(145deg, rgba(212,168,83,0.06), rgba(20,20,24,0.98), rgba(212,168,83,0.03))',
            border: '1px solid var(--border)',
            borderRadius: 20, padding: '28px 28px',
            marginBottom: 40,
          }}
        >
          <p style={{ fontSize: 11, letterSpacing: '0.16em', textTransform: 'uppercase', color: 'var(--text-soft)', fontFamily: 'JetBrains Mono', marginBottom: 16 }}>
            Shorten a new link
          </p>
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            <input
              type="url"
              value={input}
              onChange={e => setInput(e.target.value)}
              placeholder="https://your-very-long-url.com/paste/here"
              required
              className="inp"
              style={{
                flex: 1, minWidth: 200,
                borderRadius: 12, padding: '13px 18px',
                fontSize: 14, fontFamily: 'JetBrains Mono',
              }}
            />
            <button
              type="submit"
              disabled={loading}
              className="btn-primary"
              style={{
                padding: '13px 28px', borderRadius: 12,
                fontSize: 14, flexShrink: 0, whiteSpace: 'nowrap',
              }}
            >
              {loading
                ? <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <span className="spinner" style={{ borderColor: 'rgba(8,8,10,0.3)', borderTopColor: '#08080A' }} />
                    Snipping…
                  </span>
                : 'Snip it →'}
            </button>
          </div>
          {error && (
            <p style={{ marginTop: 12, fontSize: 13, color: '#E07070' }}>{error}</p>
          )}
        </form>

        {/* ── Links header ── */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }} className="anim-fadeUp d3">
          <p style={{ fontSize: 11, letterSpacing: '0.16em', textTransform: 'uppercase', color: 'var(--text-soft)', fontFamily: 'JetBrains Mono' }}>
            Your links —{' '}
            <span style={{ color: 'var(--gold-dim)' }}>{urls.length}</span>
          </p>
        </div>

        {/* ── Cards ── */}
        {fetching ? (
          <div style={{ textAlign: 'center', padding: '80px 0' }}>
            <div className="spinner" style={{
              width: 28, height: 28, margin: '0 auto',
              borderColor: 'var(--border)', borderTopColor: 'var(--gold)',
            }} />
            <p style={{ marginTop: 16, fontSize: 13, color: 'var(--text-muted)', fontFamily: 'JetBrains Mono' }}>
              Loading your links…
            </p>
          </div>
        ) : urls.length === 0 ? (
          <div style={{
            background: 'var(--bg3)', border: '1px solid var(--border-dim)',
            borderRadius: 20, padding: '80px 20px', textAlign: 'center',
          }} className="anim-fadeUp">
            <div style={{ fontSize: 40, marginBottom: 16, animation: 'float 3s ease-in-out infinite' }}>🔗</div>
            <p style={{ fontFamily: 'Playfair Display', fontSize: 26, fontWeight: 400, color: 'var(--text-muted)', marginBottom: 8 }}>
              No links yet
            </p>
            <p style={{ fontSize: 14, color: 'var(--text-soft)' }}>
              Paste a URL above to create your first Snip
            </p>
          </div>
        ) : (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
            gap: 16,
          }}>
            {urls.map((url, i) => (
              <UrlCard
                key={url.id}
                url={url}
                index={i}
                isDeleting={deletingId === url.id}
                onDelete={deleteUrl}
              />
            ))}
          </div>
        )}

      </div>
    </div>
  );
}
