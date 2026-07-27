import React from 'react';
import { 
  Cpu, Layers, Zap, Globe, ShieldCheck, Activity, Users, Server, 
  Sparkles, ArrowUpRight, Code, Radio
} from 'lucide-react';

export default function ExecutiveDashboard({ onSelectVoiceTab, onSelectIdCardTab, onSelectVercelModal }) {
  const stats = [
    { label: 'Active AI Core Models', value: '4 Engines', detail: 'Gemini 1.5 + Fallback Engine', icon: Sparkles, color: 'text-orange-500' },
    { label: 'Platform Domain', value: 'ai.orangefuturetech.com', detail: 'Vercel Edge Global Network', icon: Globe, color: 'text-cyan-600' },
    { label: 'Hardware Solutions', value: 'IoT & Microcontrollers', detail: 'ESP32, STM32, PCB Design', icon: Cpu, color: 'text-amber-600' },
    { label: 'Security & Credentials', value: 'SSL & Verifiable ID', detail: 'Holographic Badge Engine', icon: ShieldCheck, color: 'text-emerald-600' },
  ];

  return (
    <div className="w-full space-y-8">
      
      {/* Top Banner Hero Card */}
      <div className="glass-panel-light rounded-3xl p-8 md:p-10 border border-slate-200/80 relative overflow-hidden shadow-xl bg-white/90">
        <div className="absolute top-0 right-0 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="relative z-10 max-w-3xl space-y-5">
          <div className="inline-flex items-center gap-2.5 bg-orange-50 border border-orange-200 px-4 py-1.5 rounded-full text-xs font-mono font-bold text-orange-600 shadow-sm">
            <Radio className="w-4 h-4 text-orange-500 animate-pulse" />
            <span>ORANGE FUTURE TECH EXECUTIVE AI PORTAL</span>
          </div>

          <h1 className="text-3xl md:text-5xl font-black font-orbitron text-slate-900 leading-tight">
            Communicate with <span className="text-orange-600">Er. Orange B, CEO</span>
          </h1>

          <p className="text-sm md:text-base text-slate-600 leading-relaxed font-medium">
            The official AI leadership platform for <strong>ai.orangefuturetech.com</strong>. Interact via continuous Voice-to-Voice speech, query our software and hardware solutions, and generate verifiable digital ID credentials.
          </p>

          <div className="flex flex-wrap items-center gap-4 pt-3">
            <button
              onClick={onSelectVoiceTab}
              className="glass-button-orange px-8 py-4 rounded-2xl font-bold text-sm text-white flex items-center gap-2.5 shadow-lg"
            >
              <Zap className="w-5 h-5" /> Start Voice-to-Voice Conversation
            </button>

            <button
              onClick={onSelectIdCardTab}
              className="glass-button-secondary-light px-8 py-4 rounded-2xl font-bold text-sm flex items-center gap-2.5 shadow-sm"
            >
              <ShieldCheck className="w-5 h-5 text-orange-600" /> Executive ID Card Generator
            </button>

            <button
              onClick={onSelectVercelModal}
              className="px-6 py-4 rounded-2xl bg-white border border-slate-300 hover:border-orange-500 text-xs font-mono font-bold text-slate-800 flex items-center gap-2 transition shadow-sm"
            >
              <Globe className="w-4 h-4 text-cyan-600" /> Vercel Setup Guide
            </button>
          </div>
        </div>
      </div>

      {/* Corporate Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((item, idx) => {
          const IconComp = item.icon;
          return (
            <div 
              key={idx} 
              className="glass-panel-light glass-panel-hover rounded-3xl p-6 border border-slate-200 flex flex-col justify-between bg-white/90"
            >
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-mono font-bold text-slate-500">{item.label}</span>
                <div className="p-2.5 rounded-2xl bg-slate-50 border border-slate-200 shadow-sm">
                  <IconComp className={`w-5 h-5 ${item.color}`} />
                </div>
              </div>
              <div>
                <p className="text-xl font-bold font-orbitron text-slate-900">{item.value}</p>
                <p className="text-[11px] text-slate-500 font-medium mt-1">{item.detail}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Solutions & Capabilities Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        <div className="glass-panel-light rounded-3xl p-7 border border-slate-200 space-y-4 bg-white/90">
          <div className="w-12 h-12 rounded-2xl bg-orange-50 border border-orange-200 flex items-center justify-center text-orange-600 shadow-sm">
            <Code className="w-6 h-6" />
          </div>
          <h3 className="font-orbitron font-bold text-slate-900 text-lg">Software Engineering</h3>
          <p className="text-xs text-slate-600 leading-relaxed font-medium">
            Scalable cloud infrastructure, microservices, Next.js / Vite web applications, and enterprise web applications deployed seamlessly to Vercel.
          </p>
        </div>

        <div className="glass-panel-light rounded-3xl p-7 border border-slate-200 space-y-4 bg-white/90">
          <div className="w-12 h-12 rounded-2xl bg-cyan-50 border border-cyan-200 flex items-center justify-center text-cyan-600 shadow-sm">
            <Cpu className="w-6 h-6" />
          </div>
          <h3 className="font-orbitron font-bold text-slate-900 text-lg">Hardware & IoT Division</h3>
          <p className="text-xs text-slate-600 leading-relaxed font-medium">
            Custom PCB design, ESP32 and STM32 embedded C/C++ firmware development, sensor telemetry, and edge-device hardware prototyping.
          </p>
        </div>

        <div className="glass-panel-light rounded-3xl p-7 border border-slate-200 space-y-4 bg-white/90">
          <div className="w-12 h-12 rounded-2xl bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-600 shadow-sm">
            <Sparkles className="w-6 h-6" />
          </div>
          <h3 className="font-orbitron font-bold text-slate-900 text-lg">AI Model Integration</h3>
          <p className="text-xs text-slate-600 leading-relaxed font-medium">
            Generative AI fine-tuning, voice-to-voice agents, RAG systems, and custom LLM deployment for enterprise workflows.
          </p>
        </div>

      </div>

    </div>
  );
}
