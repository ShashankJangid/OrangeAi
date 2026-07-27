import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import VoiceCeoChat from './components/VoiceCeoChat';
import ExecutiveIdCard from './components/ExecutiveIdCard';
import ExecutiveDashboard from './components/ExecutiveDashboard';
import VercelDeployGuideModal from './components/VercelDeployGuideModal';
import ApiKeyModal from './components/ApiKeyModal';
import BackgroundMesh from './components/CyberBackgroundCanvas';
import { Globe, Shield } from 'lucide-react';

const NAVBAR_H = 64; // px — keep in sync with Navbar min-height

export default function App() {
  const [activeTab, setActiveTab] = useState('voice');
  const [apiKey, setApiKey] = useState('');
  const [apiKeyOpen, setApiKeyOpen] = useState(false);
  const [vercelOpen, setVercelOpen] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('orange_gemini_api_key') || import.meta.env.VITE_GEMINI_API_KEY || '';
    if (saved) setApiKey(saved);
  }, []);

  const saveKey = (key) => {
    setApiKey(key);
    key ? localStorage.setItem('orange_gemini_api_key', key) : localStorage.removeItem('orange_gemini_api_key');
  };

  const isVoice = activeTab === 'voice';

  return (
    <div style={{ minHeight: '100dvh', overflow: isVoice ? 'hidden' : 'auto', position: 'relative', background: '#0a0a0a' }}>
      <BackgroundMesh />

      {/* NAVBAR — sticky, always 64px */}
      <div style={{ position: 'sticky', top: 0, zIndex: 50, height: NAVBAR_H }}>
        <Navbar
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          onOpenApiKeyModal={() => setApiKeyOpen(true)}
          onOpenVercelModal={() => setVercelOpen(true)}
          hasApiKey={Boolean(apiKey)}
        />
      </div>

      {/* VOICE TAB — exact remaining viewport height, no page scroll */}
      {isVoice && (
        <div style={{
          position: 'fixed',
          top: NAVBAR_H,
          left: 0,
          right: 0,
          bottom: 0,
          padding: '14px 20px',
          zIndex: 1,
          boxSizing: 'border-box',
        }}>
          <VoiceCeoChat
            apiKey={apiKey}
            onSelectIdCardTab={() => setActiveTab('id-card')}
            onSelectVercelModal={() => setVercelOpen(true)}
          />
        </div>
      )}

      {/* ID CARD TAB — normal scroll */}
      {activeTab === 'id-card' && (
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '28px 24px 120px', position: 'relative', zIndex: 1 }}>
          <ExecutiveIdCard />
        </div>
      )}

      {/* DASHBOARD TAB — normal scroll */}
      {activeTab === 'dashboard' && (
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '28px 24px 120px', position: 'relative', zIndex: 1 }}>
          <ExecutiveDashboard
            onSelectVoiceTab={() => setActiveTab('voice')}
            onSelectIdCardTab={() => setActiveTab('id-card')}
            onSelectVercelModal={() => setVercelOpen(true)}
          />
        </div>
      )}

      {/* FOOTER — only on non-voice tabs */}
      {!isVoice && (
        <footer style={{
          borderTop: '1px solid rgba(255,255,255,0.06)',
          background: 'rgba(10,10,10,0.9)',
          padding: '14px 24px',
          position: 'relative',
          zIndex: 1,
        }}>
          <div style={{ maxWidth: 1200, margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 10 }}>
            <span style={{ fontSize: 12, color: '#71717a', fontFamily: 'monospace' }}>
              © 2026 Orange Future Tech · <span style={{ color: '#f97316' }}>ai.orangefuturetech.com</span>
            </span>
            <div style={{ display: 'flex', gap: 16 }}>
              <button onClick={() => setVercelOpen(true)} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: 12, color: '#71717a', fontFamily: 'inherit', display: 'flex', alignItems: 'center', gap: 5 }}>
                <Globe size={12} style={{ color: '#06b6d4' }} /> Deploy Guide
              </button>
              <button onClick={() => setActiveTab('id-card')} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: 12, color: '#71717a', fontFamily: 'inherit', display: 'flex', alignItems: 'center', gap: 5 }}>
                <Shield size={12} style={{ color: '#f97316' }} /> ID Badges
              </button>
            </div>
          </div>
        </footer>
      )}

      <VercelDeployGuideModal isOpen={vercelOpen} onClose={() => setVercelOpen(false)} />
      <ApiKeyModal isOpen={apiKeyOpen} onClose={() => setApiKeyOpen(false)} apiKey={apiKey} onSaveApiKey={saveKey} />
    </div>
  );
}
