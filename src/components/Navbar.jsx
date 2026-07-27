import React from 'react';
import { Bot, Award, LayoutDashboard, Key, Globe, Zap } from 'lucide-react';

export default function Navbar({ activeTab, setActiveTab, onOpenApiKeyModal, onOpenVercelModal, hasApiKey }) {
  const tabs = [
    { id: 'voice',     label: 'AI CEO',      icon: Bot },
    { id: 'id-card',   label: 'ID Card',     icon: Award },
    { id: 'dashboard', label: 'Dashboard',   icon: LayoutDashboard },
  ];

  return (
    <>
      <header style={{
        position: 'sticky',
        top: 0,
        zIndex: 40,
        borderBottom: '1px solid rgba(255,255,255,0.06)',
        background: 'rgba(10,10,10,0.85)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
      }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px', height: 64, display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16 }}>

          {/* Logo */}
          <div onClick={() => setActiveTab('dashboard')} style={{ display: 'flex', alignItems: 'center', gap: 10, cursor: 'pointer', flexShrink: 0 }}>
            <div style={{
              width: 36, height: 36, borderRadius: 10,
              background: 'linear-gradient(135deg, #f97316, #fb923c)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 12, fontWeight: 800, color: '#fff', letterSpacing: -0.5,
              boxShadow: '0 0 20px rgba(249,115,22,0.4)',
            }}>OF</div>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <span style={{ fontSize: 13, fontWeight: 700, color: '#f5f5f5', letterSpacing: -0.3, lineHeight: 1.2, whiteSpace: 'nowrap' }}>
                Orange Future Tech
              </span>
              <span style={{ fontSize: 11, color: '#f97316', fontFamily: 'monospace', lineHeight: 1 }}>
                ai.orangefuturetech.com
              </span>
            </div>
          </div>

          {/* Desktop Tab Nav */}
          <nav className="desktop-nav" style={{
            display: 'flex', alignItems: 'center', gap: 2,
            background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.06)',
            borderRadius: 12, padding: '4px',
          }}>
            {tabs.map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                onClick={() => setActiveTab(id)}
                style={{
                  display: 'flex', alignItems: 'center', gap: 6,
                  padding: '7px 16px', borderRadius: 9, border: 'none', cursor: 'pointer',
                  fontSize: 13, fontWeight: 600, fontFamily: 'inherit',
                  transition: 'all 0.2s',
                  background: activeTab === id ? 'rgba(249,115,22,0.15)' : 'transparent',
                  color: activeTab === id ? '#f97316' : '#a1a1aa',
                  outline: activeTab === id ? '1px solid rgba(249,115,22,0.3)' : 'none',
                }}
              >
                <Icon size={14} />
                {label}
              </button>
            ))}
          </nav>

          {/* Right actions */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexShrink: 0 }}>
            <button
              onClick={onOpenVercelModal}
              className="btn-ghost"
              style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '7px 14px', borderRadius: 10, fontSize: 12, fontWeight: 600, fontFamily: 'inherit' }}
            >
              <Globe size={13} style={{ color: '#06b6d4' }} />
              <span className="hide-mobile">Deploy</span>
            </button>

            <button
              onClick={onOpenApiKeyModal}
              style={{
                display: 'flex', alignItems: 'center', gap: 6,
                padding: '7px 14px', borderRadius: 10, border: 'none', cursor: 'pointer',
                fontSize: 12, fontWeight: 700, fontFamily: 'inherit',
                background: hasApiKey ? 'rgba(34,197,94,0.12)' : 'rgba(249,115,22,0.15)',
                color: hasApiKey ? '#22c55e' : '#f97316',
                outline: `1px solid ${hasApiKey ? 'rgba(34,197,94,0.3)' : 'rgba(249,115,22,0.3)'}`,
                transition: 'all 0.2s',
              }}
            >
              <Zap size={13} />
              <span>{hasApiKey ? 'API Active' : 'Add API Key'}</span>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile bottom nav */}
      <nav style={{
        position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: 40,
        display: 'none',
        borderTop: '1px solid rgba(255,255,255,0.06)',
        background: 'rgba(10,10,10,0.95)',
        backdropFilter: 'blur(20px)',
        padding: '8px 0 12px',
      }} className="mobile-nav">
        {tabs.map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            onClick={() => setActiveTab(id)}
            style={{
              flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4,
              border: 'none', background: 'transparent', cursor: 'pointer',
              color: activeTab === id ? '#f97316' : '#71717a',
              fontSize: 10, fontWeight: 600, fontFamily: 'inherit',
              transition: 'color 0.2s',
            }}
          >
            <Icon size={18} />
            {label}
          </button>
        ))}
        <button
          onClick={onOpenApiKeyModal}
          style={{
            flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4,
            border: 'none', background: 'transparent', cursor: 'pointer',
            color: hasApiKey ? '#22c55e' : '#f97316',
            fontSize: 10, fontWeight: 600, fontFamily: 'inherit',
          }}
        >
          <Key size={18} />
          {hasApiKey ? 'Active' : 'API Key'}
        </button>
      </nav>

      <style>{`
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .mobile-nav { display: flex !important; }
          .hide-mobile { display: none !important; }
        }
      `}</style>
    </>
  );
}
