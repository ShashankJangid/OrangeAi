import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import { X, Key, Check, ExternalLink, Sparkles, Zap } from 'lucide-react';

export default function ApiKeyModal({ isOpen, onClose, apiKey, onSaveApiKey }) {
  const [tempKey, setTempKey] = useState(apiKey || '');
  const [saved, setSaved] = useState(false);

  if (!isOpen) return null;

  const handleSave = e => {
    e.preventDefault();
    onSaveApiKey(tempKey.trim());
    setSaved(true);
    setTimeout(() => { setSaved(false); onClose(); }, 1200);
  };

  return createPortal(
    <div
      onClick={e => e.target === e.currentTarget && onClose()}
      style={{
        position: 'fixed', inset: 0, zIndex: 99999,
        display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 16,
        background: 'rgba(0,0,0,0.75)', backdropFilter: 'blur(12px)',
      }}
    >
      <div className="glass" style={{ width: '100%', maxWidth: 440, borderRadius: 24, padding: 28, position: 'relative' }}>
        
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{
              width: 36, height: 36, borderRadius: 10,
              background: 'rgba(249,115,22,0.12)', border: '1px solid rgba(249,115,22,0.25)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <Zap size={16} style={{ color: '#f97316' }} />
            </div>
            <div>
              <div style={{ fontSize: 15, fontWeight: 700, color: '#f5f5f5', letterSpacing: -0.3 }}>Gemini API Key</div>
              <div style={{ fontSize: 11, color: '#71717a', fontFamily: 'monospace' }}>Saved only in your browser</div>
            </div>
          </div>
          <button
            onClick={onClose}
            style={{
              width: 32, height: 32, borderRadius: 8, border: 'none', cursor: 'pointer',
              background: 'rgba(255,255,255,0.05)', color: '#71717a',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              transition: 'all 0.2s',
            }}
            onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.1)'; e.currentTarget.style.color = '#f5f5f5'; }}
            onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.05)'; e.currentTarget.style.color = '#71717a'; }}
          >
            <X size={15} />
          </button>
        </div>

        <div style={{ height: 1, background: 'rgba(255,255,255,0.06)', marginBottom: 20 }} />

        <p style={{ fontSize: 13, color: '#a1a1aa', lineHeight: 1.65, marginBottom: 20 }}>
          Add your free <strong style={{ color: '#f5f5f5' }}>Google Gemini API key</strong> to power Er. Orange B with real-time AI responses. Without it, the built-in CEO Knowledge Engine responds automatically.
        </p>

        <form onSubmit={handleSave} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div>
            <label style={{ display: 'block', fontSize: 11, fontWeight: 600, color: '#71717a', textTransform: 'uppercase', letterSpacing: 0.5, marginBottom: 8, fontFamily: 'monospace' }}>
              API Key
            </label>
            <input
              className="input-field"
              type="text"
              value={tempKey}
              onChange={e => setTempKey(e.target.value)}
              placeholder="AIzaSy..."
              autoComplete="off"
              autoCorrect="off"
              autoCapitalize="off"
            />
          </div>

          <a
            href="https://aistudio.google.com/app/apikey"
            target="_blank"
            rel="noreferrer"
            style={{ display: 'inline-flex', alignItems: 'center', gap: 5, fontSize: 12, color: '#f97316', fontWeight: 600, textDecoration: 'none' }}
          >
            Get a free Gemini API key <ExternalLink size={11} />
          </a>

          <div style={{
            padding: '12px 14px', borderRadius: 12,
            background: 'rgba(249,115,22,0.06)', border: '1px solid rgba(249,115,22,0.15)',
            fontSize: 12, color: '#a1a1aa', lineHeight: 1.6,
          }}>
            🔒 Your key is stored in <code style={{ color: '#f97316', fontFamily: 'monospace' }}>localStorage</code> only — never sent to our servers.
          </div>

          <div style={{ display: 'flex', gap: 10, justifyContent: 'flex-end', paddingTop: 4 }}>
            <button
              type="button"
              onClick={onClose}
              className="btn-ghost"
              style={{ padding: '10px 20px', borderRadius: 10, fontSize: 13, fontFamily: 'inherit' }}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn-orange"
              style={{ display: 'flex', alignItems: 'center', gap: 7, padding: '10px 22px', borderRadius: 10, fontSize: 13, fontFamily: 'inherit' }}
            >
              {saved ? <Check size={14} /> : <Sparkles size={14} />}
              {saved ? 'Saved!' : 'Save Key'}
            </button>
          </div>
        </form>
      </div>
    </div>,
    document.body
  );
}
