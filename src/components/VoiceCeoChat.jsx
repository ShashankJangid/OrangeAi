import React, { useState, useRef, useEffect } from 'react';
import { Mic, MicOff, Send, VolumeX, Volume2, RefreshCw, Sparkles, User, Zap, Radio } from 'lucide-react';
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

  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: 'smooth' }); }, [messages, isThinking]);

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
    setMessages(prev => [...prev, { id: Date.now(), sender: 'user', text: q, ts: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }]);
    setInput('');
    setLiveTranscript('');
    setIsThinking(true);
    speechManager.stopSpeaking();

    if (q.toLowerCase().includes('id card') || q.toLowerCase().includes('badge')) onSelectIdCardTab();
    if (q.toLowerCase().includes('vercel') || q.toLowerCase().includes('host') || q.toLowerCase().includes('domain')) onSelectVercelModal();

    try {
      const answer = await askCeoAI(q, apiKey);
      setMessages(prev => [...prev, { id: Date.now() + 1, sender: 'ceo', text: answer, ts: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }]);
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
    { emoji: '🏢', label: 'Introduce company', q: 'Tell me about Orange Future Tech and your services.' },
    { emoji: '🚀', label: 'Vercel deploy', q: 'How do I deploy to ai.orangefuturetech.com on Vercel?' },
    { emoji: '⚡', label: 'Our solutions', q: 'What hardware, software, and AI solutions do you offer?' },
    { emoji: '🪪', label: 'ID card', q: 'Generate an Executive ID Card for me' },
  ];

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '340px 1fr', gap: 20, alignItems: 'start', height: 'calc(100vh - 128px)', minHeight: 560 }}>

      {/* LEFT: Avatar Panel */}
      <div className="glass" style={{ display: 'flex', flexDirection: 'column', gap: 20, padding: 24, height: '100%' }}>

        {/* Status tag */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <span className="tag tag-orange">AI CEO</span>
          <span style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 11, color: '#71717a', fontFamily: 'monospace' }}>
            <Radio size={11} style={{ color: isSpeaking ? '#f97316' : isListening ? '#06b6d4' : '#22c55e' }} />
            {isSpeaking ? 'Speaking' : isListening ? 'Listening' : isThinking ? 'Thinking' : 'Ready'}
          </span>
        </div>

        {/* Avatar Canvas */}
        <CeoAvatarCanvas isSpeaking={isSpeaking} isListening={isListening} isThinking={isThinking} />

        {/* CEO identity */}
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: 22, fontWeight: 800, color: '#f5f5f5', letterSpacing: -0.5 }}>Er. Orange B</div>
          <div style={{ fontSize: 12, color: '#f97316', fontFamily: 'monospace', marginTop: 4 }}>
            Chief Executive Officer · Orange Future Tech
          </div>
        </div>

        {/* Voice Equalizer when speaking */}
        {isSpeaking && (
          <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'center', gap: 3, height: 32 }}>
            {[0.2, 0.7, 0.4, 1, 0.6, 0.9, 0.3, 0.8, 0.5, 0.7, 0.2, 0.6].map((h, i) => (
              <div
                key={i}
                className="wave-bar"
                style={{
                  width: 3, height: 32, borderRadius: 99,
                  background: `linear-gradient(to top, #f97316, #fb923c)`,
                  animationDelay: `${i * 0.07}s`,
                  animationDuration: `${0.5 + h * 0.5}s`,
                }}
              />
            ))}
          </div>
        )}

        {/* Live transcript */}
        {liveTranscript && (
          <div style={{
            padding: '10px 14px', borderRadius: 10,
            background: 'rgba(6,182,212,0.08)', border: '1px solid rgba(6,182,212,0.2)',
            fontSize: 12, color: '#67e8f9', fontFamily: 'monospace', lineHeight: 1.5,
          }}>
            🎙 {liveTranscript}
          </div>
        )}

        {/* Voice Loop Toggle */}
        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: '12px 14px', borderRadius: 12,
          background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)',
        }}>
          <div>
            <div style={{ fontSize: 13, fontWeight: 600, color: '#f5f5f5' }}>Continuous Voice</div>
            <div style={{ fontSize: 11, color: '#71717a', marginTop: 2 }}>Auto-listen after CEO replies</div>
          </div>
          <label className="toggle">
            <input type="checkbox" checked={voiceLoop} onChange={e => setVoiceLoop(e.target.checked)} />
            <span className="toggle-slider" />
          </label>
        </div>

        {/* Mute Toggle */}
        <button
          onClick={() => setAutoSpeak(p => !p)}
          className="btn-ghost"
          style={{
            width: '100%', padding: '10px', borderRadius: 10,
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
            fontSize: 13, fontFamily: 'inherit',
          }}
        >
          {autoSpeak ? <Volume2 size={15} style={{ color: '#f97316' }} /> : <VolumeX size={15} />}
          {autoSpeak ? 'Voice Output On' : 'Voice Output Off'}
        </button>
      </div>

      {/* RIGHT: Chat Panel */}
      <div className="glass" style={{ display: 'flex', flexDirection: 'column', height: '100%', overflow: 'hidden' }}>

        {/* Chat Header */}
        <div style={{
          padding: '16px 20px',
          borderBottom: '1px solid rgba(255,255,255,0.06)',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        }}>
          <div>
            <div style={{ fontSize: 15, fontWeight: 700, color: '#f5f5f5', letterSpacing: -0.3 }}>CEO Strategic Console</div>
            <div style={{ fontSize: 11, color: '#71717a', fontFamily: 'monospace', marginTop: 2 }}>Er. Orange B · ai.orangefuturetech.com</div>
          </div>
          <div style={{ display: 'flex', gap: 8 }}>
            <button
              onClick={() => { speechManager.stopSpeaking(); setIsSpeaking(false); }}
              className="btn-ghost"
              style={{ padding: '6px 12px', borderRadius: 8, fontSize: 12, fontFamily: 'inherit', display: 'flex', alignItems: 'center', gap: 5 }}
            >
              <VolumeX size={12} /> Mute
            </button>
            <button
              onClick={() => { setMessages([INITIAL_MSG]); speechManager.stopSpeaking(); }}
              className="btn-ghost"
              style={{ padding: '6px 12px', borderRadius: 8, fontSize: 12, fontFamily: 'inherit', display: 'flex', alignItems: 'center', gap: 5 }}
            >
              <RefreshCw size={12} /> Clear
            </button>
          </div>
        </div>

        {/* Message List */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '20px', display: 'flex', flexDirection: 'column', gap: 16 }}>
          {messages.map((msg) => (
            <div key={msg.id} className="fade-up" style={{ display: 'flex', gap: 12, justifyContent: msg.sender === 'user' ? 'flex-end' : 'flex-start' }}>

              {msg.sender === 'ceo' && (
                <div style={{
                  width: 32, height: 32, borderRadius: 10, flexShrink: 0,
                  background: 'linear-gradient(135deg, #f97316, #fb923c)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 10, fontWeight: 800, color: '#fff',
                  boxShadow: '0 0 16px rgba(249,115,22,0.3)',
                }}>CEO</div>
              )}

              <div style={{
                maxWidth: '78%',
                padding: '12px 16px',
                borderRadius: msg.sender === 'user' ? '16px 16px 4px 16px' : '16px 16px 16px 4px',
                background: msg.sender === 'user'
                  ? 'rgba(249,115,22,0.12)'
                  : 'rgba(255,255,255,0.04)',
                border: `1px solid ${msg.sender === 'user' ? 'rgba(249,115,22,0.2)' : 'rgba(255,255,255,0.07)'}`,
              }}>
                <div style={{ fontSize: 11, color: msg.sender === 'user' ? '#fb923c' : '#71717a', fontFamily: 'monospace', marginBottom: 6, display: 'flex', justifyContent: 'space-between', gap: 16 }}>
                  <span>{msg.sender === 'user' ? 'You' : 'Er. Orange B'}</span>
                  <span>{msg.ts}</span>
                </div>
                <p style={{ fontSize: 14, color: '#e5e5e5', lineHeight: 1.65, whiteSpace: 'pre-wrap', margin: 0 }}>{msg.text}</p>
                {msg.sender === 'ceo' && (
                  <button
                    onClick={() => speakText(msg.text)}
                    style={{
                      marginTop: 10, display: 'flex', alignItems: 'center', gap: 5,
                      fontSize: 11, color: '#71717a', background: 'none', border: 'none', cursor: 'pointer',
                      fontFamily: 'inherit', padding: 0, transition: 'color 0.2s',
                    }}
                    onMouseEnter={e => e.target.style.color = '#f97316'}
                    onMouseLeave={e => e.target.style.color = '#71717a'}
                  >
                    <Volume2 size={11} /> Replay
                  </button>
                )}
              </div>

              {msg.sender === 'user' && (
                <div style={{
                  width: 32, height: 32, borderRadius: 10, flexShrink: 0,
                  background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.08)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  <User size={14} style={{ color: '#a1a1aa' }} />
                </div>
              )}
            </div>
          ))}

          {/* Thinking indicator */}
          {isThinking && (
            <div style={{ display: 'flex', gap: 12, justifyContent: 'flex-start' }}>
              <div style={{
                width: 32, height: 32, borderRadius: 10, flexShrink: 0,
                background: 'linear-gradient(135deg, #f97316, #fb923c)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 10, fontWeight: 800, color: '#fff',
              }}>CEO</div>
              <div style={{
                padding: '14px 18px', borderRadius: '16px 16px 16px 4px',
                background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)',
                display: 'flex', alignItems: 'center', gap: 6,
              }}>
                {[0, 0.15, 0.3].map(d => (
                  <div key={d} style={{
                    width: 6, height: 6, borderRadius: '50%', background: '#f97316',
                    animation: 'dotBounce 0.8s ease-in-out infinite',
                    animationDelay: `${d}s`,
                  }} />
                ))}
              </div>
            </div>
          )}
          <div ref={bottomRef} />
        </div>

        {/* Suggestion Chips */}
        <div style={{
          padding: '10px 20px',
          borderTop: '1px solid rgba(255,255,255,0.04)',
          display: 'flex', gap: 8, overflowX: 'auto',
        }}>
          {PROMPTS.map(p => (
            <button
              key={p.label}
              onClick={() => sendMessage(p.q)}
              className="btn-ghost"
              style={{
                flexShrink: 0, padding: '6px 12px', borderRadius: 8,
                fontSize: 12, fontFamily: 'inherit', whiteSpace: 'nowrap',
                display: 'flex', alignItems: 'center', gap: 5,
              }}
            >
              {p.emoji} {p.label}
            </button>
          ))}
        </div>

        {/* Input Bar */}
        <div style={{ padding: '12px 20px 16px', display: 'flex', gap: 10, alignItems: 'center' }}>
          <input
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && !e.shiftKey && sendMessage()}
            placeholder="Ask Er. Orange B anything…"
            className="input-field"
            style={{ flex: 1 }}
          />

          {/* Mic button */}
          <button
            onClick={() => startListen()}
            style={{
              width: 44, height: 44, borderRadius: 11, border: 'none', cursor: 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
              background: isListening ? 'rgba(6,182,212,0.15)' : 'rgba(255,255,255,0.05)',
              outline: `1px solid ${isListening ? 'rgba(6,182,212,0.4)' : 'rgba(255,255,255,0.08)'}`,
              boxShadow: isListening ? '0 0 20px rgba(6,182,212,0.3)' : 'none',
              transition: 'all 0.2s',
              color: isListening ? '#06b6d4' : '#71717a',
            }}
          >
            {isListening ? <MicOff size={18} /> : <Mic size={18} />}
          </button>

          {/* Send button */}
          <button
            onClick={() => sendMessage()}
            disabled={!input.trim()}
            className="btn-orange"
            style={{
              width: 44, height: 44, borderRadius: 11, flexShrink: 0,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              opacity: input.trim() ? 1 : 0.4,
            }}
          >
            <Send size={16} />
          </button>
        </div>
      </div>

      <style>{`
        @keyframes dotBounce {
          0%, 100% { transform: translateY(0); opacity: 0.4; }
          50% { transform: translateY(-5px); opacity: 1; }
        }
        @media (max-width: 768px) {
          .voice-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}
