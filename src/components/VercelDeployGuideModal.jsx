import React, { useState } from 'react';
import { X, Globe, Check, Copy, ExternalLink, Terminal, ShieldCheck, Zap } from 'lucide-react';

export default function VercelDeployGuideModal({ isOpen, onClose }) {
  const [copiedIndex, setCopiedIndex] = useState(null);

  if (!isOpen) return null;

  const copyToClipboard = (text, index) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-2xl glass-panel rounded-2xl p-6 border border-orange-500/30 shadow-2xl overflow-hidden max-h-[90vh] overflow-y-auto text-white">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-5">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-orange-500/20 border border-orange-500/40 flex items-center justify-center">
              <Globe className="w-6 h-6 text-orange-400" />
            </div>
            <div>
              <h3 className="font-orbitron font-bold text-lg text-white">Vercel Hosting & Domain Setup</h3>
              <p className="text-xs text-orange-300 font-mono">Connecting ai.orangefuturetech.com</p>
            </div>
          </div>
          
          <button 
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-white/10 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Deploy Steps Content */}
        <div className="space-y-6 text-sm">
          
          {/* Step 1 */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-orbitron font-bold text-xs text-orange-400 uppercase tracking-wider flex items-center gap-1.5">
                <Terminal className="w-4 h-4 text-orange-400" /> Step 1: Deploy App to Vercel
              </span>
            </div>
            <p className="text-xs text-slate-300">
              Run Vercel CLI from this project directory, or import this folder to your Vercel Dashboard from GitHub.
            </p>
            
            <div className="bg-slate-900 border border-white/10 rounded-xl p-3 flex items-center justify-between font-mono text-xs text-orange-300">
              <code>npx vercel --prod</code>
              <button 
                onClick={() => copyToClipboard('npx vercel --prod', 1)}
                className="text-slate-400 hover:text-white p-1 rounded transition"
              >
                {copiedIndex === 1 ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Step 2 */}
          <div className="space-y-2">
            <span className="font-orbitron font-bold text-xs text-orange-400 uppercase tracking-wider flex items-center gap-1.5">
              <Globe className="w-4 h-4 text-orange-400" /> Step 2: Add Subdomain in Vercel
            </span>
            <p className="text-xs text-slate-300">
              In Vercel Dashboard → Select your project → Go to <strong>Settings</strong> → <strong>Domains</strong> → Add domain:
            </p>
            
            <div className="bg-slate-900 border border-white/10 rounded-xl p-3 flex items-center justify-between font-mono text-xs text-white">
              <code className="text-orange-400 font-bold">ai.orangefuturetech.com</code>
              <button 
                onClick={() => copyToClipboard('ai.orangefuturetech.com', 2)}
                className="text-slate-400 hover:text-white p-1 rounded transition"
              >
                {copiedIndex === 2 ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Step 3: DNS Records */}
          <div className="space-y-2">
            <span className="font-orbitron font-bold text-xs text-orange-400 uppercase tracking-wider flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-orange-400" /> Step 3: Configure DNS Records
            </span>
            <p className="text-xs text-slate-300">
              Open your DNS Manager (Hostinger, Cloudflare, or GoDaddy for <strong>orangefuturetech.com</strong>) and add this CNAME record:
            </p>

            <div className="bg-slate-950 border border-orange-500/30 rounded-xl p-4 space-y-3 font-mono text-xs">
              <div className="grid grid-cols-3 gap-2 border-b border-white/10 pb-2 text-[10px] text-slate-400 uppercase">
                <span>Record Type</span>
                <span>Name / Host</span>
                <span>Value / Target</span>
              </div>
              <div className="grid grid-cols-3 gap-2 text-white items-center">
                <span className="text-emerald-400 font-bold">CNAME</span>
                <span className="text-orange-300">ai</span>
                <span className="text-cyan-300 flex items-center justify-between">
                  cname.vercel-dns.com
                  <button 
                    onClick={() => copyToClipboard('cname.vercel-dns.com', 3)}
                    className="text-slate-400 hover:text-white transition"
                  >
                    {copiedIndex === 3 ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>
                </span>
              </div>
            </div>
          </div>

          {/* Step 4 */}
          <div className="space-y-2">
            <span className="font-orbitron font-bold text-xs text-orange-400 uppercase tracking-wider flex items-center gap-1.5">
              <Zap className="w-4 h-4 text-orange-400" /> Step 4: Add Free Gemini API Key (Optional)
            </span>
            <p className="text-xs text-slate-300">
              To enable unlimited open-domain LLM responses from Victor Vane AI CEO, get a free key from <a href="https://aistudio.google.com/" target="_blank" rel="noreferrer" className="text-orange-400 underline">Google AI Studio</a> and set environment variable:
            </p>
            <div className="bg-slate-900 border border-white/10 rounded-xl p-3 font-mono text-xs text-slate-300">
              VITE_GEMINI_API_KEY = your_free_gemini_key
            </div>
          </div>

        </div>

        {/* Modal Footer */}
        <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between">
          <a
            href="https://vercel.com/new"
            target="_blank"
            rel="noreferrer"
            className="text-xs text-orange-400 hover:text-orange-300 flex items-center gap-1 font-semibold"
          >
            Open Vercel New Project Dashboard <ExternalLink className="w-3.5 h-3.5" />
          </a>

          <button
            onClick={onClose}
            className="glass-button-primary px-5 py-2 rounded-xl text-xs font-semibold text-white"
          >
            Done / Close Guide
          </button>
        </div>

      </div>
    </div>
  );
}
