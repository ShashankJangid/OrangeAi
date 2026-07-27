import React from 'react';
import { 
  Bot, Award, LayoutDashboard, Key, Globe, Radio, Sparkles 
} from 'lucide-react';

export default function Navbar({ 
  activeTab, 
  setActiveTab, 
  onOpenApiKeyModal, 
  onOpenVercelModal,
  hasApiKey 
}) {
  return (
    <header className="sticky top-0 z-40 w-full bg-[#030712]/95 border-b-2 border-cyan-500/40 backdrop-blur-2xl shadow-[0_4px_30px_rgba(0,240,255,0.15)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        
        {/* Brand Logo & High Contrast Subdomain Tag */}
        <div 
          onClick={() => setActiveTab('dashboard')} 
          className="flex items-center space-x-3 cursor-pointer group"
        >
          <div className="w-11 h-11 rounded-xl bg-gradient-to-tr from-cyan-400 via-blue-500 to-indigo-600 flex items-center justify-center font-orbitron font-black text-black text-xl shadow-[0_0_20px_rgba(0,240,255,0.8)] group-hover:scale-110 transition-transform border border-cyan-300">
            OF
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="font-orbitron font-black text-white text-base tracking-wider">ORANGE FUTURE TECH</span>
              <span className="bg-cyan-500/20 border-2 border-cyan-400 text-cyan-300 text-[10px] font-mono font-black px-2.5 py-0.5 rounded-full flex items-center gap-1 shadow-md">
                <Radio className="w-3 h-3 animate-pulse text-cyan-400" /> AI CEO
              </span>
            </div>
            <p className="text-xs text-orange-400 font-mono font-bold tracking-wide group-hover:text-cyan-300 transition">
              ai.orangefuturetech.com
            </p>
          </div>
        </div>

        {/* High-Contrast Navigation Tabs */}
        <nav className="hidden md:flex items-center bg-slate-950 border-2 border-cyan-500/30 p-1.5 rounded-2xl shadow-inner">
          <button
            onClick={() => setActiveTab('voice')}
            className={`flex items-center space-x-2 px-5 py-2.5 rounded-xl text-xs font-black font-orbitron transition-all ${
              activeTab === 'voice'
                ? 'bg-gradient-to-r from-cyan-400 to-blue-600 text-black shadow-[0_0_25px_rgba(0,240,255,0.8)] scale-105'
                : 'text-slate-300 hover:text-white hover:bg-white/10'
            }`}
          >
            <Bot className="w-4 h-4" />
            <span>VOICE CEO AI</span>
          </button>

          <button
            onClick={() => setActiveTab('id-card')}
            className={`flex items-center space-x-2 px-5 py-2.5 rounded-xl text-xs font-black font-orbitron transition-all ${
              activeTab === 'id-card'
                ? 'bg-gradient-to-r from-orange-500 to-amber-500 text-white shadow-[0_0_25px_rgba(255,85,0,0.8)] scale-105'
                : 'text-slate-300 hover:text-white hover:bg-white/10'
            }`}
          >
            <Award className="w-4 h-4" />
            <span>ID CARD HUB</span>
          </button>

          <button
            onClick={() => setActiveTab('dashboard')}
            className={`flex items-center space-x-2 px-5 py-2.5 rounded-xl text-xs font-black font-orbitron transition-all ${
              activeTab === 'dashboard'
                ? 'bg-gradient-to-r from-cyan-400 to-blue-600 text-black shadow-[0_0_25px_rgba(0,240,255,0.8)] scale-105'
                : 'text-slate-300 hover:text-white hover:bg-white/10'
            }`}
          >
            <LayoutDashboard className="w-4 h-4" />
            <span>DASHBOARD</span>
          </button>
        </nav>

        {/* High-Contrast Right Action Buttons */}
        <div className="flex items-center space-x-3">
          
          <button
            onClick={onOpenVercelModal}
            className="hidden sm:flex items-center space-x-1.5 px-4 py-2 rounded-xl glass-button-secondary text-xs font-bold text-cyan-300 border-2 border-cyan-400/50 hover:border-cyan-300 shadow-md transition"
          >
            <Globe className="w-4 h-4 text-cyan-400" />
            <span>VERCEL DOMAIN</span>
          </button>

          <button
            onClick={onOpenApiKeyModal}
            className={`flex items-center space-x-1.5 px-4 py-2 rounded-xl text-xs font-bold font-orbitron transition shadow-md ${
              hasApiKey 
                ? 'bg-emerald-500/20 border-2 border-emerald-400 text-emerald-300' 
                : 'glass-button-orange text-white'
            }`}
          >
            <Key className="w-4 h-4" />
            <span>{hasApiKey ? 'KEY ACTIVE' : 'SET GEMINI KEY'}</span>
          </button>

        </div>

      </div>

      {/* Mobile Sub Navigation Bar */}
      <div className="md:hidden flex items-center justify-around border-t-2 border-cyan-500/30 py-3 bg-slate-950">
        <button
          onClick={() => setActiveTab('voice')}
          className={`flex flex-col items-center text-xs font-black ${
            activeTab === 'voice' ? 'text-cyan-400' : 'text-slate-400'
          }`}
        >
          <Bot className="w-5 h-5 mb-0.5" /> VOICE CEO
        </button>
        <button
          onClick={() => setActiveTab('id-card')}
          className={`flex flex-col items-center text-xs font-black ${
            activeTab === 'id-card' ? 'text-orange-400' : 'text-slate-400'
          }`}
        >
          <Award className="w-5 h-5 mb-0.5" /> ID BADGE
        </button>
        <button
          onClick={() => setActiveTab('dashboard')}
          className={`flex flex-col items-center text-xs font-black ${
            activeTab === 'dashboard' ? 'text-cyan-400' : 'text-slate-400'
          }`}
        >
          <LayoutDashboard className="w-5 h-5 mb-0.5" /> DASHBOARD
        </button>
      </div>

    </header>
  );
}
