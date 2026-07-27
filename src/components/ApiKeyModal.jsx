import React, { useState } from 'react';
import { X, Key, Check, ExternalLink, ShieldAlert, Sparkles } from 'lucide-react';

export default function ApiKeyModal({ isOpen, onClose, apiKey, onSaveApiKey }) {
  const [tempKey, setTempKey] = useState(apiKey || '');
  const [savedSuccess, setSavedSuccess] = useState(false);

  if (!isOpen) return null;

  const handleSave = (e) => {
    e.preventDefault();
    onSaveApiKey(tempKey.trim());
    setSavedSuccess(true);
    setTimeout(() => {
      setSavedSuccess(false);
      onClose();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-md glass-panel rounded-2xl p-6 border border-orange-500/30 shadow-2xl overflow-hidden text-white">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-4">
          <div className="flex items-center space-x-2">
            <Key className="w-5 h-5 text-orange-400" />
            <h3 className="font-orbitron font-bold text-base text-white">AI Model API Key</h3>
          </div>
          <button 
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white transition"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Info */}
        <p className="text-xs text-slate-300 leading-relaxed mb-4">
          Connect your free <strong>Google Gemini API key</strong> for unlimited open-domain LLM responses from Victor Vane AI CEO.
        </p>

        <form onSubmit={handleSave} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Google Gemini API Key</label>
            <input
              type="password"
              value={tempKey}
              onChange={(e) => setTempKey(e.target.value)}
              placeholder="AIzaSy..."
              className="w-full bg-slate-900 border border-white/20 focus:border-orange-500 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-500 outline-none font-mono"
            />
          </div>

          <div className="flex items-center justify-between text-[11px] text-slate-400">
            <a 
              href="https://aistudio.google.com/app/apikey" 
              target="_blank" 
              rel="noreferrer"
              className="text-orange-400 hover:underline flex items-center gap-1"
            >
              Get Free Gemini API Key <ExternalLink className="w-3 h-3" />
            </a>
            <span>Saved locally in browser</span>
          </div>

          <div className="p-3 bg-orange-500/10 border border-orange-500/20 rounded-xl text-[11px] text-orange-300">
            <strong>Note:</strong> If no API key is provided, the platform automatically utilizes the built-in Victor Vane CEO Knowledge Engine for zero-setup answers.
          </div>

          <div className="pt-2 flex items-center justify-end space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-xs text-slate-300 hover:text-white"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="glass-button-primary px-5 py-2 rounded-xl text-xs font-semibold text-white flex items-center gap-1.5"
            >
              {savedSuccess ? <Check className="w-4 h-4 text-emerald-400" /> : <Sparkles className="w-4 h-4" />}
              {savedSuccess ? 'Saved!' : 'Save Key'}
            </button>
          </div>
        </form>

      </div>
    </div>
  );
}
