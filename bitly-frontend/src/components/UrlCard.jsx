import { useState } from 'react';

export default function UrlCard({ url, index, onDelete, isDeleting = false }) {
  const [copied, setCopied] = useState(false);
  const [qrOpen, setQrOpen] = useState(false);

  const copy = () => {
    navigator.clipboard.writeText(url.shortUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const displayUrl = url.shortUrl;
  const date = new Date(url.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  const qrDataUrl = url.qrCode ? `data:image/png;base64,${url.qrCode}` : '';

  const downloadQr = () => {
    if (!qrDataUrl) return;
    const link = document.createElement('a');
    link.href = qrDataUrl;
    link.download = `snip-qr-${url.id ?? 'code'}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleDelete = async () => {
    if (!onDelete || isDeleting) return;
    const confirmed = window.confirm('Delete this URL permanently?');
    if (!confirmed) return;
    await onDelete(url.id);
  };

  return (
    <div
      className="anim-cardIn"
      style={{
        animationDelay: `${index * 0.06}s`,
        background: 'linear-gradient(145deg, rgba(212,168,83,0.04) 0%, var(--bg3) 50%, rgba(212,168,83,0.02) 100%)',
        border: '1px solid var(--border)',
        borderRadius: 16,
        padding: '20px',
        display: 'flex',
        flexDirection: 'column',
        gap: 14,
        transition: 'transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease',
        cursor: 'default',
      }}
      onMouseEnter={e => {
        e.currentTarget.style.transform = 'translateY(-4px)';
        e.currentTarget.style.boxShadow = '0 16px 48px rgba(0,0,0,0.4), 0 0 0 1px rgba(212,168,83,0.2)';
        e.currentTarget.style.borderColor = 'rgba(212,168,83,0.3)';
      }}
      onMouseLeave={e => {
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.boxShadow = 'none';
        e.currentTarget.style.borderColor = 'var(--border)';
      }}
    >
      {/* Original URL */}
      <div>
        <p style={{ fontSize: 10, letterSpacing: '0.16em', textTransform: 'uppercase', color: 'var(--text-soft)', fontFamily: 'JetBrains Mono', marginBottom: 5 }}>
          Original
        </p>
        <p style={{ fontSize: 12, color: 'var(--text-muted)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', lineHeight: 1.4 }}>
          {url.originalUrl}
        </p>
      </div>

      {/* Gold divider */}
      <div style={{ height: 1, background: 'linear-gradient(90deg, transparent, var(--border), transparent)' }} />

      {/* Short URL row */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <a
          href={url.shortUrl}
          target="_blank"
          rel="noreferrer"
          style={{
            flex: 1, fontFamily: 'JetBrains Mono', fontSize: 13,
            color: 'var(--gold)', textDecoration: 'none',
            overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
            transition: 'color 0.2s',
          }}
          onMouseEnter={e => e.currentTarget.style.color = 'var(--gold-light)'}
          onMouseLeave={e => e.currentTarget.style.color = 'var(--gold)'}
        >
          {displayUrl}
        </a>
        <button
          onClick={copy}
          style={{
            flexShrink: 0,
            padding: '5px 12px',
            borderRadius: 7,
            border: `1px solid ${copied ? 'rgba(212,168,83,0.5)' : 'var(--border-dim)'}`,
            background: copied ? 'rgba(212,168,83,0.08)' : 'transparent',
            color: copied ? 'var(--gold)' : 'var(--text-muted)',
            fontSize: 11,
            fontFamily: 'JetBrains Mono',
            cursor: 'pointer',
            transition: 'all 0.2s',
            whiteSpace: 'nowrap',
          }}
        >
          {copied ? '✓ copied' : 'copy'}
        </button>
      </div>

      {/* Stats */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="var(--gold-dim)" strokeWidth="2.5" strokeLinecap="round">
            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
            <circle cx="12" cy="12" r="3"/>
          </svg>
          <span style={{ fontFamily: 'JetBrains Mono', fontSize: 12, color: 'var(--text-muted)' }}>
            {url.clickCount}
            <span style={{ color: 'var(--text-soft)', marginLeft: 4 }}>clicks</span>
          </span>
        </div>
        <span style={{ fontFamily: 'JetBrains Mono', fontSize: 11, color: 'var(--text-soft)' }}>
          {date}
        </span>
      </div>

      {/* QR toggle */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 10, flexWrap: 'wrap' }}>
        <button
          onClick={() => setQrOpen(!qrOpen)}
          style={{
            background: 'none', border: 'none', padding: 0,
            display: 'flex', alignItems: 'center', gap: 6,
            color: 'var(--text-soft)',
            fontSize: 11, fontFamily: 'JetBrains Mono',
            letterSpacing: '0.1em', textTransform: 'uppercase',
            cursor: 'pointer',
            transition: 'color 0.2s',
          }}
          onMouseEnter={e => e.currentTarget.style.color = 'var(--gold)'}
          onMouseLeave={e => e.currentTarget.style.color = 'var(--text-soft)'}
        >
          <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
            <rect x="3" y="3" width="7" height="7" rx="1"/>
            <rect x="14" y="3" width="7" height="7" rx="1"/>
            <rect x="3" y="14" width="7" height="7" rx="1"/>
            <rect x="14" y="14" width="3" height="3" rx="0.5"/>
            <rect x="18" y="14" width="3" height="3" rx="0.5"/>
            <rect x="14" y="18" width="3" height="3" rx="0.5"/>
          </svg>
          {qrOpen ? 'hide qr' : 'show qr'}
        </button>

        {url.qrCode && (
          <button
            onClick={downloadQr}
            style={{
              background: 'rgba(212,168,83,0.06)',
              border: '1px solid var(--border-dim)',
              borderRadius: 8,
              padding: '6px 10px',
              display: 'flex',
              alignItems: 'center',
              gap: 6,
              color: 'var(--gold)',
              fontSize: 11,
              fontFamily: 'JetBrains Mono',
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              cursor: 'pointer',
              transition: 'all 0.2s',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.borderColor = 'rgba(212,168,83,0.35)';
              e.currentTarget.style.background = 'rgba(212,168,83,0.1)';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.borderColor = 'var(--border-dim)';
              e.currentTarget.style.background = 'rgba(212,168,83,0.06)';
            }}
          >
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 3v11"/>
              <path d="m7 10 5 5 5-5"/>
              <path d="M5 21h14"/>
            </svg>
            Download QR
          </button>
        )}
      </div>

      <button
        type="button"
        onClick={handleDelete}
        disabled={isDeleting}
        style={{
          alignSelf: 'flex-start',
          background: isDeleting ? 'rgba(224,112,112,0.12)' : 'transparent',
          border: '1px solid rgba(224,112,112,0.25)',
          borderRadius: 8,
          padding: '7px 11px',
          color: isDeleting ? '#F09A9A' : '#E07070',
          fontSize: 11,
          fontFamily: 'JetBrains Mono',
          letterSpacing: '0.08em',
          textTransform: 'uppercase',
          cursor: isDeleting ? 'not-allowed' : 'pointer',
          opacity: isDeleting ? 0.7 : 1,
          transition: 'all 0.2s',
        }}
        onMouseEnter={e => {
          if (isDeleting) return;
          e.currentTarget.style.background = 'rgba(224,112,112,0.08)';
          e.currentTarget.style.borderColor = 'rgba(224,112,112,0.4)';
        }}
        onMouseLeave={e => {
          if (isDeleting) return;
          e.currentTarget.style.background = 'transparent';
          e.currentTarget.style.borderColor = 'rgba(224,112,112,0.25)';
        }}
      >
        {isDeleting ? 'Deleting...' : 'Delete URL'}
      </button>

      {/* QR reveal */}
      {qrOpen && url.qrCode && (
        <div className="anim-fadeUp" style={{ display: 'flex', justifyContent: 'center', paddingTop: 4 }}>
          <div style={{
            background: '#FFFFFF',
            borderRadius: 12,
            padding: 12,
            boxShadow: '0 8px 40px rgba(0,0,0,0.5), 0 0 0 1px rgba(212,168,83,0.2)',
          }}>
            <img
              src={qrDataUrl}
              alt="QR Code"
              style={{ width: 148, height: 148, display: 'block', borderRadius: 4 }}
            />
          </div>
        </div>
      )}
    </div>
  );
}
