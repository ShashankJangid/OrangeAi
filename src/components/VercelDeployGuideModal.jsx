import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import { X, Globe, Check, Copy, ExternalLink, Terminal, ShieldCheck, Zap } from 'lucide-react';

export default function VercelDeployGuideModal({ isOpen, onClose }) {
  const [copiedIndex, setCopiedIndex] = useState(null);

  if (!isOpen) return null;

  const copyToClipboard = (text, index) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  return createPortal(
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-2xl bg-white rounded-3xl p-6 border border-slate-200 shadow-2xl overflow-hidden max-h-[90vh] overflow-y-auto text-slate-900 z-[10000]">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-200 pb-4 mb-5">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-2xl bg-cyan-50 border border-cyan-200 flex items-center justify-center">
              <Globe className="w-6 h-6 text-cyan-600" />
            </div>
            <div>
              <h3 className="font-orbitron font-bold text-lg text-slate-900">Vercel Hosting & Domain Setup</h3>
              <p className="text-xs text-orange-600 font-mono font-bold">Connecting ai.orangefuturetech.com</p>
            </div>
          </div>
          
          <button 
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Deploy Steps Content */}
        <div className="space-y-6 text-sm">
          
          {/* Step 1 */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-orbitron font-bold text-xs text-orange-600 uppercase tracking-wider flex items-center gap-1.5">
                <Terminal className="w-4 h-4 text-orange-600" /> Step 1: Deploy App to Vercel
              </span>
            </div>
            <p className="text-xs text-slate-600 font-medium">
              Run Vercel CLI from this project directory, or import your GitHub repository to your Vercel Dashboard.
            </p>
            
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-3.5 flex items-center justify-between font-mono text-xs text-cyan-300">
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
            <span className="font-orbitron font-bold text-xs text-orange-600 uppercase tracking-wider flex items-center gap-1.5">
              <Globe className="w-4 h-4 text-orange-600" /> Step 2: Add Subdomain in Vercel
            </span>
            <p className="text-xs text-slate-600 font-medium">
              In Vercel Dashboard → Select your project → Go to <strong>Settings</strong> → <strong>Domains</strong> → Add domain:
            </p>
            
            <div className="bg-slate-100 border border-slate-300 rounded-2xl p-3.5 flex items-center justify-between font-mono text-xs text-slate-900">
              <code className="text-orange-600 font-bold">ai.orangefuturetech.com</code>
              <button 
                onClick={() => copyToClipboard('ai.orangefuturetech.com', 2)}
                className="text-slate-500 hover:text-slate-900 p-1 rounded transition"
              >
                {copiedIndex === 2 ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Step 3: DNS Records */}
          <div className="space-y-2">
            <span className="font-orbitron font-bold text-xs text-orange-600 uppercase tracking-wider flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-orange-600" /> Step 3: Configure DNS Records
            </span>
            <p className="text-xs text-slate-600 font-medium">
              Open Hostinger DNS Manager for <strong>orangefuturetech.com</strong> and add this CNAME record:
            </p>

            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 space-y-3 font-mono text-xs text-white">
              <div className="grid grid-cols-3 gap-2 border-b border-slate-700 pb-2 text-[10px] text-slate-400 uppercase">
                <span>Record Type</span>
                <span>Name / Host</span>
                <span>Value / Target</span>
              </div>
              <div className="grid grid-cols-3 gap-2 items-center">
                <span className="text-emerald-400 font-bold">CNAME</span>
                <span className="text-orange-300 font-bold">ai</span>
                <span className="text-cyan-300 flex items-center justify-between font-bold">
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

        </div>

        {/* Modal Footer */}
        <div className="mt-6 pt-4 border-t border-slate-200 flex items-center justify-between">
          <a
            href="https://vercel.com/new"
            target="_blank"
            rel="noreferrer"
            className="text-xs text-orange-600 hover:underline flex items-center gap-1 font-bold"
          >
            Open Vercel New Project Dashboard <ExternalLink className="w-3.5 h-3.5" />
          </a>

          <button
            onClick={onClose}
            className="glass-button-orange px-5 py-2.5 rounded-xl text-xs font-bold text-white shadow-md"
          >
            Done / Close Guide
          </button>
        </div>

      </div>
    </div>,
    document.body
  );
}
