import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import { X, Globe, Check, Copy, Terminal, ShieldCheck, ExternalLink } from 'lucide-react';

export default function VercelDeployGuideModal({ isOpen, onClose }) {
  const [copied, setCopied] = useState(null);
  if (!isOpen) return null;

  const copy = (text, idx) => {
    navigator.clipboard.writeText(text);
    setCopied(idx);
    setTimeout(() => setCopied(null), 2000);
  };

  const steps = [
    {
      icon: Terminal,
      title: 'Step 1 — Deploy to Vercel',
      desc: 'Run from your project root, or import your GitHub repo at vercel.com/new',
      code: 'npx vercel --prod',
      copyIdx: 1,
    },
    {
      icon: Globe,
      title: 'Step 2 — Add Custom Domain',
      desc: 'In Vercel Dashboard → Project → Settings → Domains → Add:',
      code: 'ai.orangefuturetech.com',
      copyIdx: 2,
    },
    {
      icon: ShieldCheck,
      title: 'Step 3 — DNS CNAME Record',
      desc: 'In Hostinger DNS for orangefuturetech.com, add a new CNAME record:',
      table: true,
      copyIdx: 3,
    },
  ];

  return createPortal(
    <div
      onClick={e => e.target === e.currentTarget && onClose()}
      style={{
        position: 'fixed', inset: 0, zIndex: 99999,
        display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 16,
        background: 'rgba(0,0,0,0.75)', backdropFilter: 'blur(12px)',
      }}
    >
      <div className="glass" style={{ width: '100%', maxWidth: 560, borderRadius: 24, padding: 28, maxHeight: '90vh', overflowY: 'auto', position: 'relative' }}>

        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{
              width: 36, height: 36, borderRadius: 10,
              background: 'rgba(6,182,212,0.12)', border: '1px solid rgba(6,182,212,0.25)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <Globe size={16} style={{ color: '#06b6d4' }} />
            </div>
            <div>
              <div style={{ fontSize: 15, fontWeight: 700, color: '#f5f5f5', letterSpacing: -0.3 }}>Vercel Hosting Setup</div>
              <div style={{ fontSize: 11, color: '#71717a', fontFamily: 'monospace' }}>Connect ai.orangefuturetech.com</div>
            </div>
          </div>
          <button
            onClick={onClose}
            style={{
              width: 32, height: 32, borderRadius: 8, border: 'none', cursor: 'pointer',
              background: 'rgba(255,255,255,0.05)', color: '#71717a',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}
          >
            <X size={15} />
          </button>
        </div>

        <div style={{ height: 1, background: 'rgba(255,255,255,0.06)', marginBottom: 24 }} />

        {/* Steps */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          {steps.map((s, i) => {
            const Icon = s.icon;
            return (
              <div key={i} style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <div style={{
                    width: 28, height: 28, borderRadius: 8,
                    background: 'rgba(249,115,22,0.1)', border: '1px solid rgba(249,115,22,0.2)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                  }}>
                    <Icon size={13} style={{ color: '#f97316' }} />
                  </div>
                  <span style={{ fontSize: 13, fontWeight: 700, color: '#f5f5f5' }}>{s.title}</span>
                </div>
                <p style={{ fontSize: 12, color: '#71717a', lineHeight: 1.6, paddingLeft: 36 }}>{s.desc}</p>

                {s.code && (
                  <div style={{
                    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                    background: 'rgba(0,0,0,0.4)', border: '1px solid rgba(255,255,255,0.06)',
                    borderRadius: 10, padding: '10px 14px', marginLeft: 36,
                  }}>
                    <code style={{ fontSize: 13, color: '#22d3ee', fontFamily: 'monospace' }}>{s.code}</code>
                    <button
                      onClick={() => copy(s.code, s.copyIdx)}
                      style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#71717a', padding: 4, transition: 'color 0.2s' }}
                      onMouseEnter={e => e.currentTarget.style.color = '#f5f5f5'}
                      onMouseLeave={e => e.currentTarget.style.color = '#71717a'}
                    >
                      {copied === s.copyIdx ? <Check size={14} style={{ color: '#22c55e' }} /> : <Copy size={14} />}
                    </button>
                  </div>
                )}

                {s.table && (
                  <div style={{
                    background: 'rgba(0,0,0,0.4)', border: '1px solid rgba(255,255,255,0.06)',
                    borderRadius: 10, overflow: 'hidden', marginLeft: 36,
                  }}>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', padding: '8px 14px', borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                      {['Type', 'Name', 'Value'].map(h => (
                        <span key={h} style={{ fontSize: 10, color: '#71717a', fontFamily: 'monospace', textTransform: 'uppercase', letterSpacing: 0.5 }}>{h}</span>
                      ))}
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', padding: '10px 14px', alignItems: 'center' }}>
                      <span style={{ fontSize: 12, color: '#22c55e', fontFamily: 'monospace', fontWeight: 700 }}>CNAME</span>
                      <span style={{ fontSize: 12, color: '#fb923c', fontFamily: 'monospace', fontWeight: 700 }}>ai</span>
                      <span style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 12, color: '#22d3ee', fontFamily: 'monospace' }}>
                        cname.vercel-dns.com
                        <button
                          onClick={() => copy('cname.vercel-dns.com', 3)}
                          style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#71717a', padding: 2 }}
                        >
                          {copied === 3 ? <Check size={12} style={{ color: '#22c55e' }} /> : <Copy size={12} />}
                        </button>
                      </span>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Footer */}
        <div style={{ marginTop: 24, paddingTop: 20, borderTop: '1px solid rgba(255,255,255,0.06)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <a
            href="https://vercel.com/new"
            target="_blank"
            rel="noreferrer"
            style={{ display: 'inline-flex', alignItems: 'center', gap: 5, fontSize: 12, color: '#06b6d4', fontWeight: 600, textDecoration: 'none' }}
          >
            Open Vercel Dashboard <ExternalLink size={11} />
          </a>
          <button
            onClick={onClose}
            className="btn-orange"
            style={{ padding: '9px 20px', borderRadius: 10, fontSize: 13, fontFamily: 'inherit' }}
          >
            Got it
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
}
