import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import VoiceCeoChat from './components/VoiceCeoChat';
import ExecutiveIdCard from './components/ExecutiveIdCard';
import ExecutiveDashboard from './components/ExecutiveDashboard';
import VercelDeployGuideModal from './components/VercelDeployGuideModal';
import ApiKeyModal from './components/ApiKeyModal';
import CyberBackgroundCanvas from './components/CyberBackgroundCanvas';
import { Globe, Radio, Shield, Heart } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState('voice');
  const [apiKey, setApiKey] = useState('');
  const [isApiKeyModalOpen, setIsApiKeyModalOpen] = useState(false);
  const [isVercelModalOpen, setIsVercelModalOpen] = useState(false);

  useEffect(() => {
    const savedKey = localStorage.getItem('orange_gemini_api_key') || import.meta.env.VITE_GEMINI_API_KEY || '';
    if (savedKey) {
      setApiKey(savedKey);
    }
  }, []);

  const handleSaveApiKey = (key) => {
    setApiKey(key);
    if (key) {
      localStorage.setItem('orange_gemini_api_key', key);
    } else {
      localStorage.removeItem('orange_gemini_api_key');
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 font-sans selection:bg-orange-500 selection:text-white relative overflow-x-hidden">
      
      {/* Light Cyber Background Canvas */}
      <CyberBackgroundCanvas />

      {/* Top Header Navbar */}
      <Navbar 
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenApiKeyModal={() => setIsApiKeyModalOpen(true)}
        onOpenVercelModal={() => setIsVercelModalOpen(true)}
        hasApiKey={Boolean(apiKey)}
      />

      {/* Main Container View */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 relative z-10">
        {activeTab === 'voice' && (
          <VoiceCeoChat 
            apiKey={apiKey}
            onSelectIdCardTab={() => setActiveTab('id-card')}
            onSelectVercelModal={() => setIsVercelModalOpen(true)}
          />
        )}

        {activeTab === 'id-card' && (
          <ExecutiveIdCard />
        )}

        {activeTab === 'dashboard' && (
          <ExecutiveDashboard 
            onSelectVoiceTab={() => setActiveTab('voice')}
            onSelectIdCardTab={() => setActiveTab('id-card')}
            onSelectVercelModal={() => setIsVercelModalOpen(true)}
          />
        )}
      </main>

      {/* Footer */}
      <footer className="w-full border-t border-slate-200 bg-white/90 backdrop-blur-md py-6 mt-12 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-600">
          <div className="flex items-center space-x-2 font-mono">
            <Radio className="w-3.5 h-3.5 text-orange-500 animate-pulse" />
            <span>Orange Future Tech AI CEO Console</span>
            <span className="text-slate-300">|</span>
            <span className="text-orange-600 font-bold">ai.orangefuturetech.com</span>
          </div>

          <div className="flex items-center space-x-6">
            <button 
              onClick={() => setIsVercelModalOpen(true)} 
              className="hover:text-slate-900 transition flex items-center gap-1 font-semibold"
            >
              <Globe className="w-3.5 h-3.5 text-cyan-600" /> Vercel Deployment Guide
            </button>
            <button 
              onClick={() => setActiveTab('id-card')} 
              className="hover:text-slate-900 transition flex items-center gap-1 font-semibold"
            >
              <Shield className="w-3.5 h-3.5 text-orange-600" /> Security ID Badges
            </button>
          </div>
        </div>
      </footer>

      {/* Modals */}
      <VercelDeployGuideModal 
        isOpen={isVercelModalOpen}
        onClose={() => setIsVercelModalOpen(false)}
      />

      <ApiKeyModal 
        isOpen={isApiKeyModalOpen}
        onClose={() => setIsApiKeyModalOpen(false)}
        apiKey={apiKey}
        onSaveApiKey={handleSaveApiKey}
      />

    </div>
  );
}
