import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import VoiceCeoChat from './components/VoiceCeoChat';
import ExecutiveIdCard from './components/ExecutiveIdCard';
import ExecutiveDashboard from './components/ExecutiveDashboard';
import VercelDeployGuideModal from './components/VercelDeployGuideModal';
import ApiKeyModal from './components/ApiKeyModal';
import BackgroundMesh from './components/CyberBackgroundCanvas';
import { Globe, Shield } from 'lucide-react';

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

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', position: 'relative' }}>
      <BackgroundMesh />

      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenApiKeyModal={() => setApiKeyOpen(true)}
        onOpenVercelModal={() => setVercelOpen(true)}
        hasApiKey={Boolean(apiKey)}
      />

      <main style={{ flex: 1, maxWidth: 1200, width: '100%', margin: '0 auto', padding: '28px 24px 100px', position: 'relative', zIndex: 1 }}>
        {activeTab === 'voice' && (
          <VoiceCeoChat
            apiKey={apiKey}
            onSelectIdCardTab={() => setActiveTab('id-card')}
            onSelectVercelModal={() => setVercelOpen(true)}
          />
        )}
        {activeTab === 'id-card' && <ExecutiveIdCard />}
        {activeTab === 'dashboard' && (
          <ExecutiveDashboard
            onSelectVoiceTab={() => setActiveTab('voice')}
            onSelectIdCardTab={() => setActiveTab('id-card')}
            onSelectVercelModal={() => setVercelOpen(true)}
          />
        )}
      </main>

      {/* Footer */}
      <footer style={{
        borderTop: '1px solid rgba(255,255,255,0.06)',
        background: 'rgba(10,10,10,0.8)',
        backdropFilter: 'blur(12px)',
        padding: '16px 24px',
        position: 'relative', zIndex: 1,
      }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12 }}>
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

      <VercelDeployGuideModal isOpen={vercelOpen} onClose={() => setVercelOpen(false)} />
      <ApiKeyModal isOpen={apiKeyOpen} onClose={() => setApiKeyOpen(false)} apiKey={apiKey} onSaveApiKey={saveKey} />
    </div>
  );
}
