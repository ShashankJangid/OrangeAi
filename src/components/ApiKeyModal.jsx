import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import { X, Key, Check, ExternalLink, Sparkles } from 'lucide-react';

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

  return createPortal(
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-md bg-white rounded-3xl p-6 border border-slate-200 shadow-2xl overflow-hidden text-slate-900 z-[10000]">
        
        {/* Modal Header */}
        <div className="flex items-center justify-between border-b border-slate-200 pb-4 mb-4">
          <div className="flex items-center space-x-2.5">
            <div className="p-2 bg-orange-100 rounded-xl border border-orange-200">
              <Key className="w-5 h-5 text-orange-600" />
            </div>
            <h3 className="font-orbitron font-bold text-base text-slate-900">AI Model API Key</h3>
          </div>
          <button 
            onClick={onClose}
            className="p-1.5 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Description */}
        <p className="text-xs text-slate-600 leading-relaxed mb-4 font-medium">
          Connect your free <strong>Google Gemini API key</strong> for unlimited open-domain LLM responses from Er. Orange B AI CEO.
        </p>

        <form onSubmit={handleSave} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5">Google Gemini API Key</label>
            <input
              type="password"
              value={tempKey}
              onChange={(e) => setTempKey(e.target.value)}
              placeholder="AIzaSy..."
              className="w-full bg-slate-50 border border-slate-300 focus:border-orange-500 rounded-2xl px-4 py-3 text-xs text-slate-900 placeholder-slate-400 outline-none font-mono shadow-sm"
            />
          </div>

          <div className="flex items-center justify-between text-[11px] text-slate-500 font-medium">
            <a 
              href="https://aistudio.google.com/app/apikey" 
              target="_blank" 
              rel="noreferrer"
              className="text-orange-600 hover:underline flex items-center gap-1 font-bold"
            >
              Get Free Gemini API Key <ExternalLink className="w-3.5 h-3.5" />
            </a>
            <span>Saved locally in browser</span>
          </div>

          <div className="p-3 bg-orange-50 border border-orange-200 rounded-2xl text-[11px] text-orange-700 font-medium leading-relaxed">
            <strong>Note:</strong> If no API key is provided, the platform automatically utilizes the built-in Er. Orange B Knowledge Engine for zero-setup answers.
          </div>

          <div className="pt-2 flex items-center justify-end space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl text-xs font-bold text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="glass-button-orange px-5 py-2.5 rounded-xl text-xs font-bold text-white flex items-center gap-1.5 shadow-md"
            >
              {savedSuccess ? <Check className="w-4 h-4 text-white" /> : <Sparkles className="w-4 h-4 text-yellow-300" />}
              {savedSuccess ? 'Saved!' : 'Save Key'}
            </button>
          </div>
        </form>

      </div>
    </div>,
    document.body
  );
}
