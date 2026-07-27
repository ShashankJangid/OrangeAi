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
    <header className="sticky top-0 z-40 w-full bg-white/90 border-b border-slate-200 backdrop-blur-xl shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 min-h-[72px] py-2 flex items-center justify-between gap-4">
        
        {/* Brand Logo & CEO Tag */}
        <div 
          onClick={() => setActiveTab('dashboard')} 
          className="flex items-center space-x-3 cursor-pointer group shrink-0"
        >
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-orange-500 to-amber-500 flex items-center justify-center font-orbitron font-bold text-white text-base shadow-md group-hover:scale-105 transition-transform shrink-0">
            OF
          </div>
          <div className="flex flex-col">
            <div className="flex items-center space-x-2">
              <span className="font-orbitron font-bold text-slate-900 text-sm sm:text-base tracking-wide whitespace-nowrap">ORANGE FUTURE TECH</span>
              <span className="hidden lg:flex bg-orange-50 border border-orange-200 text-orange-600 text-[10px] font-mono font-bold px-2 py-0.5 rounded-full items-center gap-1">
                <Radio className="w-2.5 h-2.5 animate-pulse text-orange-500" /> Er. Orange B
              </span>
            </div>
            <p className="text-[11px] text-slate-500 font-mono tracking-tight group-hover:text-orange-600 transition">
              ai.orangefuturetech.com
            </p>
          </div>
        </div>

        {/* Navigation Tabs */}
        <nav className="hidden md:flex items-center bg-slate-100/90 border border-slate-200 p-1.5 rounded-2xl">
          <button
            onClick={() => setActiveTab('voice')}
            className={`flex items-center space-x-2 px-4 py-2 rounded-xl text-xs font-bold font-orbitron transition-all whitespace-nowrap ${
              activeTab === 'voice'
                ? 'bg-orange-500 text-white shadow-md'
                : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
            }`}
          >
            <Bot className="w-4 h-4" />
            <span>VOICE CEO AI</span>
          </button>

          <button
            onClick={() => setActiveTab('id-card')}
            className={`flex items-center space-x-2 px-4 py-2 rounded-xl text-xs font-bold font-orbitron transition-all whitespace-nowrap ${
              activeTab === 'id-card'
                ? 'bg-orange-500 text-white shadow-md'
                : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
            }`}
          >
            <Award className="w-4 h-4" />
            <span>ID CARD HUB</span>
          </button>

          <button
            onClick={() => setActiveTab('dashboard')}
            className={`flex items-center space-x-2 px-4 py-2 rounded-xl text-xs font-bold font-orbitron transition-all whitespace-nowrap ${
              activeTab === 'dashboard'
                ? 'bg-orange-500 text-white shadow-md'
                : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
            }`}
          >
            <LayoutDashboard className="w-4 h-4" />
            <span>DASHBOARD</span>
          </button>
        </nav>

        {/* Right Action Buttons */}
        <div className="flex items-center space-x-2.5 shrink-0">
          
          <button
            onClick={onOpenVercelModal}
            className="hidden sm:flex items-center space-x-1.5 px-3.5 py-2 rounded-xl glass-button-secondary-light text-xs font-bold transition shadow-sm whitespace-nowrap"
          >
            <Globe className="w-4 h-4 text-cyan-600" />
            <span>VERCEL DOMAIN</span>
          </button>

          <button
            onClick={onOpenApiKeyModal}
            className={`flex items-center space-x-1.5 px-3.5 py-2 rounded-xl text-xs font-bold font-orbitron transition shadow-sm whitespace-nowrap ${
              hasApiKey 
                ? 'bg-emerald-50 border border-emerald-300 text-emerald-700' 
                : 'glass-button-orange text-white'
            }`}
          >
            <Key className="w-4 h-4" />
            <span>{hasApiKey ? 'KEY ACTIVE' : 'SET GEMINI KEY'}</span>
          </button>

        </div>

      </div>

      {/* Mobile Navigation Bar */}
      <div className="md:hidden flex items-center justify-around border-t border-slate-200 py-2.5 bg-white">
        <button
          onClick={() => setActiveTab('voice')}
          className={`flex flex-col items-center text-xs font-bold ${
            activeTab === 'voice' ? 'text-orange-600' : 'text-slate-500'
          }`}
        >
          <Bot className="w-5 h-5 mb-0.5" /> VOICE CEO
        </button>
        <button
          onClick={() => setActiveTab('id-card')}
          className={`flex flex-col items-center text-xs font-bold ${
            activeTab === 'id-card' ? 'text-orange-600' : 'text-slate-500'
          }`}
        >
          <Award className="w-5 h-5 mb-0.5" /> ID BADGE
        </button>
        <button
          onClick={() => setActiveTab('dashboard')}
          className={`flex flex-col items-center text-xs font-bold ${
            activeTab === 'dashboard' ? 'text-orange-600' : 'text-slate-500'
          }`}
        >
          <LayoutDashboard className="w-5 h-5 mb-0.5" /> DASHBOARD
        </button>
      </div>

    </header>
  );
}
