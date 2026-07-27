import React, { useState, useRef, useEffect } from 'react';
import { Mic, MicOff, Send, VolumeX, Volume2, RefreshCw, User, Radio } from 'lucide-react';
import CeoAvatarCanvas from './CeoAvatarCanvas';
import { askCeoAI } from '../services/aiCeoService';
import { speechManager } from '../services/speechService';

const INITIAL_MSG = {
  id: 1,
  sender: 'ceo',
  text: "Hello. I'm Er. Orange B, CEO of Orange Future Tech. How can I assist you today? Feel free to type or use voice.",
  ts: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
};

export default function VoiceCeoChat({ apiKey, onSelectIdCardTab, onSelectVercelModal }) {
  const [messages, setMessages] = useState([INITIAL_MSG]);
  const [input, setInput] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isThinking, setIsThinking] = useState(false);
  const [voiceLoop, setVoiceLoop] = useState(false);
  const [liveTranscript, setLiveTranscript] = useState('');
  const [autoSpeak, setAutoSpeak] = useState(true);
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isThinking]);

  const speakText = (text) => {
    if (!autoSpeak) return;
    setIsSpeaking(true);
    speechManager.speak(text, () => setIsSpeaking(true), () => {
      setIsSpeaking(false);
      if (voiceLoop) setTimeout(() => startListen(true), 400);
    });
  };

  const sendMessage = async (text) => {
    const q = (text || input).trim();
    if (!q) return;
    setMessages(prev => [...prev, {
      id: Date.now(), sender: 'user', text: q,
      ts: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }]);
    setInput('');
    setLiveTranscript('');
    setIsThinking(true);
    speechManager.stopSpeaking();

    if (q.toLowerCase().includes('id card') || q.toLowerCase().includes('badge')) onSelectIdCardTab();
    if (q.toLowerCase().includes('vercel') || q.toLowerCase().includes('host') || q.toLowerCase().includes('domain')) onSelectVercelModal();

    try {
      const answer = await askCeoAI(q, apiKey);
      setMessages(prev => [...prev, {
        id: Date.now() + 1, sender: 'ceo', text: answer,
        ts: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }]);
      setIsThinking(false);
      speakText(answer);
    } catch {
      setIsThinking(false);
    }
  };

  const startListen = (force = false) => {
    if (isListening && !force) { speechManager.stopListening(); setIsListening(false); return; }
    setIsListening(true);
    setLiveTranscript('');
    speechManager.startListening(
      (t, isFinal) => {
        setLiveTranscript(t);
        if (isFinal && t.trim()) { setIsListening(false); sendMessage(t); }
      },
      () => setIsListening(false),
      () => setIsListening(false),
    );
  };

  const PROMPTS = [
    { emoji: '🏢', label: 'About company', q: 'Tell me about Orange Future Tech and your services.' },
    { emoji: '🚀', label: 'Vercel deploy', q: 'How do I deploy to ai.orangefuturetech.com on Vercel?' },
    { emoji: '⚡', label: 'AI solutions', q: 'What hardware, software, and AI solutions do you offer?' },
    { emoji: '🪪', label: 'ID card', q: 'Generate an Executive ID Card for me' },
  ];

  /* 
   * This component fills a position:fixed parent that spans from 
   * below-navbar to bottom of screen. 
   * width/height: 100% is reliable here.
   */
  return (
    <div style={{ width: '100%', height: '100%', display: 'grid', gridTemplateColumns: '260px 1fr', gap: 12 }}>

      {/* ════════════════════ LEFT PANEL ════════════════════ */}
      <div style={{
        display: 'flex', flexDirection: 'column', gap: 12,
        background: 'rgba(17,17,17,0.85)',
        border: '1px solid rgba(255,255,255,0.07)',
        borderRadius: 20,
        backdropFilter: 'blur(24px)',
        WebkitBackdropFilter: 'blur(24px)',
        padding: '16px 14px',
        overflow: 'hidden',
      }}>

        {/* Status row */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexShrink: 0 }}>
          <span style={{
            fontSize: 10, fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase',
            padding: '3px 9px', borderRadius: 99,
            background: 'rgba(249,115,22,0.12)', border: '1px solid rgba(249,115,22,0.3)', color: '#f97316',
          }}>AI CEO</span>
          <span style={{ display: 'flex', alignItems: 'center', gap: 5, fontSize: 10, color: '#71717a', fontFamily: 'monospace' }}>
            <span style={{
              width: 6, height: 6, borderRadius: '50%', display: 'inline-block', flexShrink: 0,
              background: isSpeaking ? '#f97316' : isListening ? '#06b6d4' : '#22c55e',
              boxShadow: isSpeaking ? '0 0 6px #f97316' : isListening ? '0 0 6px #06b6d4' : '0 0 6px #22c55e',
            }} />
            {isSpeaking ? 'Speaking' : isListening ? 'Listening' : isThinking ? 'Thinking' : 'Ready'}
          </span>
        </div>

        {/* Avatar */}
        <div style={{ flexShrink: 0 }}>
          <CeoAvatarCanvas isSpeaking={isSpeaking} isListening={isListening} isThinking={isThinking} />
        </div>

        {/* Name */}
        <div style={{ textAlign: 'center', flexShrink: 0 }}>
          <div style={{ fontSize: 18, fontWeight: 800, color: '#f5f5f5', letterSpacing: -0.5 }}>Er. Orange B</div>
          <div style={{ fontSize: 10, color: '#f97316', fontFamily: 'monospace', marginTop: 3 }}>
            Chief Executive Officer · Orange Future Tech
          </div>
        </div>

        {/* Voice wave bars */}
        {isSpeaking && (
          <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'center', gap: 3, height: 24, flexShrink: 0 }}>
            {[0.3, 0.7, 0.5, 1, 0.6, 0.9, 0.4, 0.8, 0.5, 0.7].map((h, i) => (
              <div key={i} className="wave-bar" style={{
                width: 3, height: 24, borderRadius: 99,
                background: 'linear-gradient(to top, #f97316, #fb923c)',
                animationDelay: `${i * 0.08}s`,
                animationDuration: `${0.4 + h * 0.5}s`,
              }} />
            ))}
          </div>
        )}

        {/* Live transcript */}
        {liveTranscript && (
          <div style={{
            flexShrink: 0, padding: '8px 10px', borderRadius: 10,
            background: 'rgba(6,182,212,0.08)', border: '1px solid rgba(6,182,212,0.2)',
            fontSize: 11, color: '#67e8f9', fontFamily: 'monospace', lineHeight: 1.5,
          }}>
            🎙 {liveTranscript}
          </div>
        )}

        {/* Push controls to bottom */}
        <div style={{ flex: 1, minHeight: 0 }} />

        {/* Voice Loop */}
        <div style={{
          flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: '10px 12px', borderRadius: 12,
          background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)',
        }}>
          <div>
            <div style={{ fontSize: 12, fontWeight: 600, color: '#f5f5f5' }}>Continuous Voice</div>
            <div style={{ fontSize: 10, color: '#71717a', marginTop: 1 }}>Auto-listen after reply</div>
          </div>
          <label className="toggle">
            <input type="checkbox" checked={voiceLoop} onChange={e => setVoiceLoop(e.target.checked)} />
            <span className="toggle-slider" />
          </label>
        </div>

        {/* Mute */}
        <button
          onClick={() => setAutoSpeak(p => !p)}
          style={{
            flexShrink: 0, width: '100%', padding: '9px', borderRadius: 10,
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 7,
            fontSize: 12, fontFamily: 'inherit', cursor: 'pointer',
            background: 'transparent', color: '#a1a1aa',
            border: '1px solid rgba(255,255,255,0.07)',
            transition: 'all 0.2s',
          }}
          onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.05)'; e.currentTarget.style.color = '#f5f5f5'; }}
          onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#a1a1aa'; }}
        >
          {autoSpeak ? <Volume2 size={13} style={{ color: '#f97316' }} /> : <VolumeX size={13} />}
          {autoSpeak ? 'Voice Output On' : 'Voice Output Off'}
        </button>
      </div>

      {/* ════════════════════ RIGHT PANEL ════════════════════ */}
      <div style={{
        display: 'flex', flexDirection: 'column',
        background: 'rgba(17,17,17,0.85)',
        border: '1px solid rgba(255,255,255,0.07)',
        borderRadius: 20,
        backdropFilter: 'blur(24px)',
        WebkitBackdropFilter: 'blur(24px)',
        overflow: 'hidden',
        minHeight: 0,
      }}>

        {/* ── Chat Header ── */}
        <div style={{
          flexShrink: 0,
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: '14px 18px',
          borderBottom: '1px solid rgba(255,255,255,0.06)',
        }}>
          <div>
            <div style={{ fontSize: 14, fontWeight: 700, color: '#f5f5f5', letterSpacing: -0.3 }}>CEO Strategic Console</div>
            <div style={{ fontSize: 11, color: '#71717a', fontFamily: 'monospace', marginTop: 2 }}>
              Er. Orange B · ai.orangefuturetech.com
            </div>
          </div>
          <div style={{ display: 'flex', gap: 6 }}>
            <button
              onClick={() => { speechManager.stopSpeaking(); setIsSpeaking(false); }}
              style={{
                display: 'flex', alignItems: 'center', gap: 4,
                padding: '5px 10px', borderRadius: 8, border: '1px solid rgba(255,255,255,0.07)',
                background: 'transparent', color: '#71717a', fontSize: 11, fontFamily: 'inherit', cursor: 'pointer',
                transition: 'all 0.2s',
              }}
              onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.05)'; e.currentTarget.style.color = '#f5f5f5'; }}
              onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#71717a'; }}
            >
              <VolumeX size={11} /> Mute
            </button>
            <button
              onClick={() => { setMessages([INITIAL_MSG]); speechManager.stopSpeaking(); }}
              style={{
                display: 'flex', alignItems: 'center', gap: 4,
                padding: '5px 10px', borderRadius: 8, border: '1px solid rgba(255,255,255,0.07)',
                background: 'transparent', color: '#71717a', fontSize: 11, fontFamily: 'inherit', cursor: 'pointer',
                transition: 'all 0.2s',
              }}
              onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.05)'; e.currentTarget.style.color = '#f5f5f5'; }}
              onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#71717a'; }}
            >
              <RefreshCw size={11} /> Clear
            </button>
          </div>
        </div>

        {/* ── Messages (scrollable) ── */}
        <div style={{
          flex: 1, minHeight: 0, overflowY: 'auto',
          padding: '16px 18px',
          display: 'flex', flexDirection: 'column', gap: 14,
        }}>
          {messages.map(msg => (
            <div key={msg.id} style={{
              display: 'flex', gap: 10,
              justifyContent: msg.sender === 'user' ? 'flex-end' : 'flex-start',
            }}>
              {msg.sender === 'ceo' && (
                <div style={{
                  width: 30, height: 30, borderRadius: 9, flexShrink: 0,
                  background: 'linear-gradient(135deg, #f97316, #fb923c)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 9, fontWeight: 800, color: '#fff',
                  boxShadow: '0 0 12px rgba(249,115,22,0.3)',
                }}>CEO</div>
              )}
              <div style={{
                maxWidth: '76%', padding: '10px 14px',
                borderRadius: msg.sender === 'user' ? '14px 14px 4px 14px' : '14px 14px 14px 4px',
                background: msg.sender === 'user' ? 'rgba(249,115,22,0.12)' : 'rgba(255,255,255,0.04)',
                border: `1px solid ${msg.sender === 'user' ? 'rgba(249,115,22,0.2)' : 'rgba(255,255,255,0.07)'}`,
              }}>
                <div style={{
                  fontSize: 10, color: msg.sender === 'user' ? '#fb923c' : '#71717a',
                  fontFamily: 'monospace', marginBottom: 5,
                  display: 'flex', justifyContent: 'space-between', gap: 14,
                }}>
                  <span>{msg.sender === 'user' ? 'You' : 'Er. Orange B'}</span>
                  <span>{msg.ts}</span>
                </div>
                <p style={{ fontSize: 13, color: '#e5e5e5', lineHeight: 1.65, whiteSpace: 'pre-wrap', margin: 0 }}>{msg.text}</p>
                {msg.sender === 'ceo' && (
                  <button
                    onClick={() => speakText(msg.text)}
                    style={{
                      marginTop: 8, display: 'flex', alignItems: 'center', gap: 4,
                      fontSize: 10, color: '#71717a', background: 'none', border: 'none',
                      cursor: 'pointer', fontFamily: 'inherit', padding: 0, transition: 'color 0.2s',
                    }}
                    onMouseEnter={e => e.currentTarget.style.color = '#f97316'}
                    onMouseLeave={e => e.currentTarget.style.color = '#71717a'}
                  >
                    <Volume2 size={10} /> Replay
                  </button>
                )}
              </div>
              {msg.sender === 'user' && (
                <div style={{
                  width: 30, height: 30, borderRadius: 9, flexShrink: 0,
                  background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  <User size={13} style={{ color: '#a1a1aa' }} />
                </div>
              )}
            </div>
          ))}

          {isThinking && (
            <div style={{ display: 'flex', gap: 10 }}>
              <div style={{
                width: 30, height: 30, borderRadius: 9, flexShrink: 0,
                background: 'linear-gradient(135deg, #f97316, #fb923c)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 9, fontWeight: 800, color: '#fff',
              }}>CEO</div>
              <div style={{
                padding: '12px 16px', borderRadius: '14px 14px 14px 4px',
                background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)',
                display: 'flex', alignItems: 'center', gap: 5,
              }}>
                {[0, 0.15, 0.3].map(d => (
                  <div key={d} style={{
                    width: 5, height: 5, borderRadius: '50%', background: '#f97316',
                    animation: 'dotBounce 0.8s ease-in-out infinite',
                    animationDelay: `${d}s`,
                  }} />
                ))}
              </div>
            </div>
          )}
          <div ref={bottomRef} />
        </div>

        {/* ── Suggestion Chips ── */}
        <div style={{
          flexShrink: 0,
          padding: '8px 16px',
          borderTop: '1px solid rgba(255,255,255,0.04)',
          display: 'flex', gap: 6, overflowX: 'auto',
        }}>
          {PROMPTS.map(p => (
            <button
              key={p.label}
              onClick={() => sendMessage(p.q)}
              style={{
                flexShrink: 0, padding: '5px 11px', borderRadius: 7,
                border: '1px solid rgba(255,255,255,0.07)',
                background: 'transparent', color: '#a1a1aa',
                fontSize: 11, fontFamily: 'inherit', whiteSpace: 'nowrap',
                display: 'flex', alignItems: 'center', gap: 4,
                cursor: 'pointer', transition: 'all 0.2s',
              }}
              onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.05)'; e.currentTarget.style.color = '#f5f5f5'; }}
              onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#a1a1aa'; }}
            >
              {p.emoji} {p.label}
            </button>
          ))}
        </div>

        {/* ── Input Bar ── */}
        <div style={{ flexShrink: 0, padding: '10px 16px 14px', display: 'flex', gap: 8, alignItems: 'center' }}>
          <input
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && !e.shiftKey && sendMessage()}
            placeholder="Ask Er. Orange B anything…"
            style={{
              flex: 1, background: 'rgba(255,255,255,0.05)',
              border: '1px solid rgba(255,255,255,0.09)',
              borderRadius: 12, padding: '11px 16px',
              color: '#f5f5f5', fontSize: 13, fontFamily: 'inherit', outline: 'none',
              transition: 'border-color 0.2s, box-shadow 0.2s',
            }}
            onFocus={e => { e.currentTarget.style.borderColor = '#f97316'; e.currentTarget.style.boxShadow = '0 0 0 3px rgba(249,115,22,0.12)'; }}
            onBlur={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.09)'; e.currentTarget.style.boxShadow = 'none'; }}
          />

          {/* Mic */}
          <button
            onClick={() => startListen()}
            style={{
              width: 42, height: 42, borderRadius: 10, border: 'none', cursor: 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
              background: isListening ? 'rgba(6,182,212,0.15)' : 'rgba(255,255,255,0.05)',
              outline: `1px solid ${isListening ? 'rgba(6,182,212,0.4)' : 'rgba(255,255,255,0.09)'}`,
              boxShadow: isListening ? '0 0 18px rgba(6,182,212,0.3)' : 'none',
              transition: 'all 0.2s',
              color: isListening ? '#06b6d4' : '#71717a',
            }}
          >
            {isListening ? <MicOff size={16} /> : <Mic size={16} />}
          </button>

          {/* Send */}
          <button
            onClick={() => sendMessage()}
            disabled={!input.trim()}
            style={{
              width: 42, height: 42, borderRadius: 10, border: 'none', cursor: 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
              background: input.trim() ? '#f97316' : 'rgba(249,115,22,0.2)',
              color: '#fff', transition: 'all 0.2s',
              boxShadow: input.trim() ? '0 0 18px rgba(249,115,22,0.35)' : 'none',
            }}
          >
            <Send size={15} />
          </button>
        </div>
      </div>

      <style>{`
        @keyframes dotBounce {
          0%, 100% { transform: translateY(0); opacity: 0.4; }
          50% { transform: translateY(-4px); opacity: 1; }
        }
        @media (max-width: 700px) {
          .voice-root { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}
