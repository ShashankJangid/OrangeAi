import React from 'react';
import { Zap, Globe, Cpu, Shield, Code, Sparkles, ArrowRight, Bot, Award } from 'lucide-react';

export default function ExecutiveDashboard({ onSelectVoiceTab, onSelectIdCardTab, onSelectVercelModal }) {
  const stats = [
    { label: 'AI Engine', value: 'Gemini 1.5 Flash', sub: 'REST + SDK with fallback', icon: Sparkles, color: '#f97316' },
    { label: 'Deployment', value: 'Vercel Edge', sub: 'Global CDN · Auto SSL', icon: Globe, color: '#06b6d4' },
    { label: 'Hardware', value: 'IoT & Embedded', sub: 'ESP32 · STM32 · PCB', icon: Cpu, color: '#a855f7' },
    { label: 'ID System', value: 'Verifiable Badges', sub: 'Holographic · QR verified', icon: Shield, color: '#22c55e' },
  ];

  const services = [
    { icon: Code, color: '#06b6d4', title: 'Software Engineering', desc: 'Cloud-native web apps, Next.js, Vite, microservices, APIs deployed to Vercel or AWS.' },
    { icon: Cpu, color: '#a855f7', title: 'Hardware & IoT', desc: 'Custom PCB design, ESP32/STM32 firmware, sensor networks and edge-AI prototypes.' },
    { icon: Sparkles, color: '#f97316', title: 'AI Integration', desc: 'Custom LLMs, RAG pipelines, voice agents, and Generative AI for enterprise workflows.' },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>

      {/* Hero Banner */}
      <div className="glass" style={{ padding: '40px 40px', position: 'relative', overflow: 'hidden' }}>
        {/* Glow orb */}
        <div style={{
          position: 'absolute', top: -60, right: -60,
          width: 280, height: 280, borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(249,115,22,0.15) 0%, transparent 70%)',
          pointerEvents: 'none',
        }} />

        <div style={{ position: 'relative', zIndex: 1, maxWidth: 640 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
            <span className="tag tag-orange" style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
              <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#f97316', display: 'inline-block', animation: 'pulseRing 2s ease-out infinite' }} />
              Live AI CEO · Er. Orange B
            </span>
          </div>

          <h1 style={{ fontSize: 40, fontWeight: 800, color: '#f5f5f5', letterSpacing: -1.5, lineHeight: 1.15, marginBottom: 16 }}>
            Enterprise AI,<br />
            <span style={{ color: '#f97316' }}>Built for Scale.</span>
          </h1>

          <p style={{ fontSize: 15, color: '#a1a1aa', lineHeight: 1.7, marginBottom: 28 }}>
            The official AI executive platform for Orange Future Tech. Speak directly with Er. Orange B — voice-to-voice intelligence, strategic answers, and instant executive decisions.
          </p>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12 }}>
            <button
              onClick={onSelectVoiceTab}
              className="btn-orange"
              style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '12px 24px', borderRadius: 12, fontSize: 14, fontFamily: 'inherit' }}
            >
              <Bot size={16} /> Talk to AI CEO
            </button>
            <button
              onClick={onSelectIdCardTab}
              className="btn-ghost"
              style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '12px 24px', borderRadius: 12, fontSize: 14, fontFamily: 'inherit' }}
            >
              <Award size={16} /> Generate ID Badge
            </button>
            <button
              onClick={onSelectVercelModal}
              className="btn-ghost"
              style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '12px 24px', borderRadius: 12, fontSize: 14, fontFamily: 'inherit' }}
            >
              <Globe size={16} /> Deploy Guide
            </button>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16 }}>
        {stats.map((s, i) => {
          const Icon = s.icon;
          return (
            <div key={i} className="glass glass-hover" style={{ padding: '20px 20px', display: 'flex', flexDirection: 'column', gap: 12 }}>
              <div style={{
                width: 36, height: 36, borderRadius: 10,
                background: `${s.color}15`, border: `1px solid ${s.color}30`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <Icon size={16} style={{ color: s.color }} />
              </div>
              <div>
                <div style={{ fontSize: 11, color: '#71717a', fontFamily: 'monospace', marginBottom: 4, textTransform: 'uppercase', letterSpacing: 0.5 }}>{s.label}</div>
                <div style={{ fontSize: 15, fontWeight: 700, color: '#f5f5f5', letterSpacing: -0.3 }}>{s.value}</div>
                <div style={{ fontSize: 12, color: '#71717a', marginTop: 3 }}>{s.sub}</div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Services */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
        {services.map((s, i) => {
          const Icon = s.icon;
          return (
            <div key={i} className="glass glass-hover" style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: 14 }}>
              <div style={{
                width: 44, height: 44, borderRadius: 12,
                background: `${s.color}12`, border: `1px solid ${s.color}25`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <Icon size={20} style={{ color: s.color }} />
              </div>
              <div>
                <h3 style={{ fontSize: 16, fontWeight: 700, color: '#f5f5f5', letterSpacing: -0.3, marginBottom: 8 }}>{s.title}</h3>
                <p style={{ fontSize: 13, color: '#71717a', lineHeight: 1.65 }}>{s.desc}</p>
              </div>
              <button
                onClick={onSelectVoiceTab}
                style={{
                  display: 'flex', alignItems: 'center', gap: 5, marginTop: 'auto',
                  background: 'none', border: 'none', cursor: 'pointer', padding: 0,
                  fontSize: 12, color: s.color, fontFamily: 'inherit', fontWeight: 600,
                  transition: 'gap 0.2s',
                }}
                onMouseEnter={e => e.currentTarget.style.gap = '8px'}
                onMouseLeave={e => e.currentTarget.style.gap = '5px'}
              >
                Ask the CEO <ArrowRight size={13} />
              </button>
            </div>
          );
        })}
      </div>

      <style>{`
        @media (max-width: 900px) {
          .stats-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
        @media (max-width: 640px) {
          .stats-grid { grid-template-columns: 1fr 1fr !important; }
          .services-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}
