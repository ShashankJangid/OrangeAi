import React, { useState, useRef } from 'react';
import { Award, Shield, Download, Printer, Check, QrCode, RefreshCw, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';

const AVATARS = [
  'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
  'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80',
  'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80',
];

const CLEARANCES = ['LEVEL-5 EXECUTIVE', 'LEVEL-4 LEAD ARCHITECT', 'LEVEL-3 RESEARCHER', 'VISITOR PASS'];

export default function ExecutiveIdCard() {
  const [form, setForm] = useState({
    name: 'Er. Orange B',
    role: 'Chief Executive Officer',
    dept: 'Executive Board & AI Division',
    clearance: 'LEVEL-5 EXECUTIVE',
    empId: 'OFT-2026-0001',
    date: '2026-07-27',
    avatar: AVATARS[0],
  });
  const [tilt, setTilt] = useState({ rx: 0, ry: 0, sx: 50, sy: 50 });
  const cardRef = useRef(null);

  const set = (k, v) => setForm(p => ({ ...p, [k]: v }));

  const onMouseMove = e => {
    const r = cardRef.current?.getBoundingClientRect();
    if (!r) return;
    const x = e.clientX - r.left, y = e.clientY - r.top;
    setTilt({ rx: ((y - r.height / 2) / r.height) * -12, ry: ((x - r.width / 2) / r.width) * 12, sx: (x / r.width) * 100, sy: (y / r.height) * 100 });
  };
  const onMouseLeave = () => setTilt({ rx: 0, ry: 0, sx: 50, sy: 50 });

  const issue = e => {
    e.preventDefault();
    confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
  };

  const clearanceColor = {
    'LEVEL-5 EXECUTIVE': '#f97316',
    'LEVEL-4 LEAD ARCHITECT': '#a855f7',
    'LEVEL-3 RESEARCHER': '#06b6d4',
    'VISITOR PASS': '#71717a',
  }[form.clearance] || '#f97316';

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '380px 1fr', gap: 24, alignItems: 'start' }}>

      {/* Form Panel */}
      <div className="glass" style={{ padding: 28, display: 'flex', flexDirection: 'column', gap: 20 }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 6 }}>
            <div style={{
              width: 36, height: 36, borderRadius: 10,
              background: 'rgba(249,115,22,0.12)', border: '1px solid rgba(249,115,22,0.25)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <Award size={16} style={{ color: '#f97316' }} />
            </div>
            <div>
              <div style={{ fontSize: 15, fontWeight: 700, color: '#f5f5f5', letterSpacing: -0.3 }}>ID Card Generator</div>
              <div style={{ fontSize: 11, color: '#71717a', fontFamily: 'monospace' }}>ai.orangefuturetech.com/id</div>
            </div>
          </div>
          <div style={{ height: 1, background: 'rgba(255,255,255,0.06)', marginTop: 16 }} />
        </div>

        <form onSubmit={issue} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          {[
            { label: 'Full Name', key: 'name', placeholder: 'Er. Orange B' },
            { label: 'Designation', key: 'role', placeholder: 'Chief Executive Officer' },
            { label: 'Department', key: 'dept', placeholder: 'Executive Board' },
            { label: 'Employee ID', key: 'empId', placeholder: 'OFT-2026-0001' },
          ].map(f => (
            <div key={f.key}>
              <label style={{ display: 'block', fontSize: 11, fontWeight: 600, color: '#71717a', textTransform: 'uppercase', letterSpacing: 0.5, marginBottom: 6, fontFamily: 'monospace' }}>{f.label}</label>
              <input
                className="input-field"
                value={form[f.key]}
                onChange={e => set(f.key, e.target.value)}
                placeholder={f.placeholder}
                required
              />
            </div>
          ))}

          <div>
            <label style={{ display: 'block', fontSize: 11, fontWeight: 600, color: '#71717a', textTransform: 'uppercase', letterSpacing: 0.5, marginBottom: 6, fontFamily: 'monospace' }}>Clearance Level</label>
            <select
              className="input-field"
              value={form.clearance}
              onChange={e => set('clearance', e.target.value)}
              style={{ cursor: 'pointer' }}
            >
              {CLEARANCES.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>

          <div>
            <label style={{ display: 'block', fontSize: 11, fontWeight: 600, color: '#71717a', textTransform: 'uppercase', letterSpacing: 0.5, marginBottom: 8, fontFamily: 'monospace' }}>Avatar</label>
            <div style={{ display: 'flex', gap: 8 }}>
              {AVATARS.map((a, i) => (
                <img key={i} src={a} alt="" onClick={() => set('avatar', a)}
                  style={{
                    width: 48, height: 48, borderRadius: 10, objectFit: 'cover', cursor: 'pointer',
                    border: `2px solid ${form.avatar === a ? '#f97316' : 'rgba(255,255,255,0.08)'}`,
                    boxShadow: form.avatar === a ? '0 0 12px rgba(249,115,22,0.4)' : 'none',
                    transform: form.avatar === a ? 'scale(1.08)' : 'scale(1)',
                    transition: 'all 0.2s',
                  }}
                />
              ))}
            </div>
          </div>

          <button
            type="submit"
            className="btn-orange"
            style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, padding: '13px', borderRadius: 12, fontSize: 14, fontFamily: 'inherit', marginTop: 4 }}
          >
            <Sparkles size={15} /> Issue Security Badge
          </button>
        </form>
      </div>

      {/* Card Preview */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 20 }}>
        <div style={{ fontSize: 12, color: '#71717a', fontFamily: 'monospace' }}>↕ Hover card for 3D tilt</div>

        <div
          ref={cardRef}
          onMouseMove={onMouseMove}
          onMouseLeave={onMouseLeave}
          style={{
            width: '100%', maxWidth: 420,
            transform: `perspective(1000px) rotateX(${tilt.rx}deg) rotateY(${tilt.ry}deg)`,
            transition: tilt.rx === 0 ? 'transform 0.5s ease' : 'none',
            borderRadius: 20, overflow: 'hidden',
            background: 'linear-gradient(135deg, #111111 0%, #1a1a1a 60%, #0a0a0a 100%)',
            border: `1px solid ${clearanceColor}40`,
            boxShadow: `0 24px 60px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.04), inset 0 1px 0 rgba(255,255,255,0.06)`,
            cursor: 'pointer', userSelect: 'none', position: 'relative',
          }}
        >
          {/* Shine layer */}
          <div style={{
            position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 2, borderRadius: 20,
            background: `radial-gradient(circle at ${tilt.sx}% ${tilt.sy}%, rgba(255,255,255,0.08) 0%, transparent 60%)`,
          }} />

          {/* Card body */}
          <div style={{ padding: '24px 24px 20px', position: 'relative', zIndex: 3 }}>

            {/* Header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 20 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <div style={{
                  width: 36, height: 36, borderRadius: 9,
                  background: 'linear-gradient(135deg, #f97316, #fb923c)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 11, fontWeight: 800, color: '#fff',
                }}>OF</div>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 700, color: '#f5f5f5', letterSpacing: -0.3 }}>ORANGE FUTURE TECH</div>
                  <div style={{ fontSize: 10, color: '#f97316', fontFamily: 'monospace' }}>ai.orangefuturetech.com</div>
                </div>
              </div>
              <div style={{
                display: 'flex', alignItems: 'center', gap: 5, padding: '4px 10px', borderRadius: 99,
                background: `${clearanceColor}15`, border: `1px solid ${clearanceColor}35`,
              }}>
                <Shield size={10} style={{ color: clearanceColor }} />
                <span style={{ fontSize: 9, fontWeight: 700, color: clearanceColor, fontFamily: 'monospace', letterSpacing: 0.5 }}>SECURE</span>
              </div>
            </div>

            {/* Photo + Info */}
            <div style={{ display: 'flex', gap: 18, alignItems: 'flex-start' }}>
              <div style={{ position: 'relative', flexShrink: 0 }}>
                <img
                  src={form.avatar} alt={form.name}
                  style={{
                    width: 90, height: 110, objectFit: 'cover', borderRadius: 12,
                    border: `2px solid ${clearanceColor}50`,
                    boxShadow: `0 0 20px ${clearanceColor}30`,
                  }}
                />
                <div style={{
                  position: 'absolute', bottom: 0, insetX: 0, left: 0, right: 0,
                  background: clearanceColor, borderRadius: '0 0 10px 10px',
                  textAlign: 'center', padding: '2px 0',
                  fontSize: 8, fontWeight: 700, color: '#fff', fontFamily: 'monospace', letterSpacing: 0.5,
                }}>CLEAR</div>
              </div>

              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{
                  display: 'inline-block', padding: '3px 9px', borderRadius: 99, marginBottom: 8,
                  background: `${clearanceColor}12`, border: `1px solid ${clearanceColor}30`,
                  fontSize: 9, fontWeight: 700, color: clearanceColor, fontFamily: 'monospace', letterSpacing: 0.5,
                }}>{form.clearance}</div>

                <div style={{ fontSize: 20, fontWeight: 800, color: '#f5f5f5', letterSpacing: -0.5, lineHeight: 1.2, marginBottom: 6, wordBreak: 'break-word' }}>{form.name}</div>
                <div style={{ fontSize: 12, color: '#f97316', fontWeight: 600, marginBottom: 4 }}>{form.role}</div>
                <div style={{ fontSize: 11, color: '#71717a', marginBottom: 12 }}>{form.dept}</div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
                  <div>
                    <div style={{ fontSize: 9, color: '#71717a', fontFamily: 'monospace', textTransform: 'uppercase', letterSpacing: 0.5 }}>Employee ID</div>
                    <div style={{ fontSize: 11, color: '#f97316', fontWeight: 700, fontFamily: 'monospace', marginTop: 2 }}>{form.empId}</div>
                  </div>
                  <div>
                    <div style={{ fontSize: 9, color: '#71717a', fontFamily: 'monospace', textTransform: 'uppercase', letterSpacing: 0.5 }}>Issued</div>
                    <div style={{ fontSize: 11, color: '#a1a1aa', fontWeight: 600, fontFamily: 'monospace', marginTop: 2 }}>{form.date}</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div style={{
              marginTop: 18, paddingTop: 14, borderTop: '1px solid rgba(255,255,255,0.06)',
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <div style={{ padding: 6, background: 'rgba(255,255,255,0.04)', borderRadius: 8 }}>
                  <QrCode size={28} style={{ color: '#f97316' }} />
                </div>
                <div>
                  <div style={{ fontSize: 10, color: '#a1a1aa', fontWeight: 600 }}>
                    <Check size={9} style={{ display: 'inline', color: '#22c55e', marginRight: 3 }} />Verified SSL Badge
                  </div>
                  <div style={{ fontSize: 9, color: '#71717a', fontFamily: 'monospace' }}>https://ai.orangefuturetech.com/id</div>
                </div>
              </div>
              <div style={{ fontSize: 11, color: '#71717a', fontFamily: 'monospace' }}>2026</div>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', justifyContent: 'center' }}>
          <button
            onClick={() => window.print()}
            className="btn-ghost"
            style={{ display: 'flex', alignItems: 'center', gap: 7, padding: '10px 20px', borderRadius: 10, fontSize: 13, fontFamily: 'inherit' }}
          >
            <Printer size={14} /> Print Badge
          </button>
          <button
            onClick={issue}
            className="btn-orange"
            style={{ display: 'flex', alignItems: 'center', gap: 7, padding: '10px 20px', borderRadius: 10, fontSize: 13, fontFamily: 'inherit' }}
          >
            <Download size={14} /> Download
          </button>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .id-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}
