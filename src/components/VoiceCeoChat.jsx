import React, { useState, useEffect, useRef } from 'react';
import { 
  Mic, MicOff, Volume2, VolumeX, Send, Sparkles, RefreshCw, 
  Bot, User, Radio, Cpu, Award, HelpCircle, Layers, Zap, Activity
} from 'lucide-react';
import CeoAvatarCanvas from './CeoAvatarCanvas';
import { askCeoAI } from '../services/aiCeoService';
import { speechManager } from '../services/speechService';

export default function VoiceCeoChat({ apiKey, onSelectIdCardTab, onSelectVercelModal }) {
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'ceo',
      text: "Greetings. I am Er. Orange B, CEO of Orange Future Tech. Welcome to ai.orangefuturetech.com. Speak or type to discuss our software solutions, hardware systems, or enterprise AI strategy.",
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isThinking, setIsThinking] = useState(false);
  const [voiceToVoiceMode, setVoiceToVoiceMode] = useState(false);
  const [sttTranscript, setSttTranscript] = useState('');
  const [autoSpeechEnabled, setAutoSpeechEnabled] = useState(true);

  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, sttTranscript, isThinking]);

  const handleSpeakCeo = (text) => {
    if (!autoSpeechEnabled) return;
    setIsSpeaking(true);
    speechManager.speak(
      text,
      () => setIsSpeaking(true),
      () => {
        setIsSpeaking(false);
        if (voiceToVoiceMode) {
          setTimeout(() => {
            toggleListening(true);
          }, 400);
        }
      }
    );
  };

  const handleSendMessage = async (textToSend) => {
    const query = textToSend || inputText;
    if (!query.trim()) return;

    const userMsg = {
      id: Date.now(),
      sender: 'user',
      text: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    setInputText(''); // Clear text bar when text message is submitted
    setSttTranscript('');
    setIsThinking(true);
    speechManager.stopSpeaking();

    if (query.toLowerCase().includes("id card") || query.toLowerCase().includes("badge")) {
      setTimeout(() => {
        onSelectIdCardTab();
      }, 1000);
    }
    if (query.toLowerCase().includes("vercel") || query.toLowerCase().includes("host") || query.toLowerCase().includes("domain")) {
      setTimeout(() => {
        onSelectVercelModal();
      }, 1500);
    }

    try {
      const ceoAnswer = await askCeoAI(query, apiKey);
      const ceoMsg = {
        id: Date.now() + 1,
        sender: 'ceo',
        text: ceoAnswer,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, ceoMsg]);
      setIsThinking(false);

      handleSpeakCeo(ceoAnswer);
    } catch (err) {
      console.error(err);
      setIsThinking(false);
    }
  };

  const toggleListening = (forceStart = false) => {
    if (isListening && !forceStart) {
      speechManager.stopListening();
      setIsListening(false);
      return;
    }

    setIsListening(true);
    setSttTranscript('');
    
    // Voice STT stays in sttTranscript and does NOT fill or overwrite inputText field!
    speechManager.startListening(
      (transcript, isFinal) => {
        setSttTranscript(transcript);
        if (isFinal && transcript.trim().length > 0) {
          setIsListening(false);
          handleSendMessage(transcript);
        }
      },
      (error) => {
        console.warn("STT Error:", error);
        setIsListening(false);
      },
      () => {
        setIsListening(false);
      }
    );
  };

  const stopAllAudio = () => {
    speechManager.stopSpeaking();
    speechManager.stopListening();
    setIsSpeaking(false);
    setIsListening(false);
  };

  return (
    <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
      
      {/* Left Column: Holographic CEO Avatar & Glass Profile */}
      <div className="lg:col-span-5 glass-panel-light rounded-3xl p-6 flex flex-col items-center justify-between shadow-xl relative overflow-hidden">
        
        {/* Header Telemetry */}
        <div className="w-full flex items-center justify-between border-b border-slate-200/80 pb-4 mb-2">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 rounded-full bg-orange-500 animate-pulse" />
            <span className="font-orbitron text-xs tracking-wider text-slate-800 font-bold uppercase">
              AI CEO EXECUTIVE CORE
            </span>
          </div>
          <span className="text-xs bg-orange-50 border border-orange-200 text-orange-600 px-3 py-1 rounded-full font-mono font-bold flex items-center gap-1 shadow-sm">
            <Radio className="w-3.5 h-3.5 text-orange-500 animate-pulse" /> ai.orangefuturetech.com
          </span>
        </div>

        {/* Dynamic Canvas Avatar */}
        <CeoAvatarCanvas isSpeaking={isSpeaking} isListening={isListening} isThinking={isThinking} />

        {/* CEO Identity Info */}
        <div className="text-center my-3">
          <h2 className="text-2xl font-black font-orbitron text-slate-900 flex items-center justify-center gap-2">
            Er. Orange B <Award className="w-5 h-5 text-orange-500" />
          </h2>
          <p className="text-xs text-orange-600 font-mono font-bold tracking-wide mt-1">Chief Executive Officer | Orange Future Tech</p>
          
          <div className="flex items-center justify-center gap-2 mt-2">
            <span className={`text-xs font-mono font-bold uppercase px-4 py-1 rounded-full border shadow-sm ${
              isSpeaking ? 'bg-orange-100 text-orange-700 border-orange-300 animate-pulse' :
              isListening ? 'bg-cyan-100 text-cyan-700 border-cyan-300 animate-pulse' :
              isThinking ? 'bg-purple-100 text-purple-700 border-purple-300 animate-pulse' :
              'bg-emerald-50 text-emerald-700 border-emerald-300'
            }`}>
              {isSpeaking ? '🔊 VOICE ACTIVE' : isListening ? '🎙️ LISTENING...' : isThinking ? '⚡ ANALYZING...' : '● EXECUTIVE READY'}
            </span>
          </div>
        </div>

        {/* Voice Equalizer Bar when Speaking */}
        {isSpeaking && (
          <div className="w-full flex items-center justify-center space-x-1.5 py-2">
            {[40, 75, 35, 95, 55, 85, 45, 100, 65, 35].map((h, idx) => (
              <div 
                key={idx}
                style={{ height: `${h * 0.26}px`, animationDelay: `${idx * 0.1}s` }}
                className="w-1.5 bg-gradient-to-t from-orange-500 to-amber-400 rounded-full animate-wave-bar"
              />
            ))}
          </div>
        )}

        {/* Voice Loop & Mute Options */}
        <div className="w-full space-y-3 pt-3 border-t border-slate-200/80">
          
          <div className="flex items-center justify-between bg-slate-100/80 p-3 rounded-2xl border border-slate-200 shadow-inner">
            <div className="flex items-center gap-2.5">
              <div className="p-1.5 bg-orange-100 rounded-lg">
                <Zap className="w-4 h-4 text-orange-600" />
              </div>
              <div>
                <p className="text-xs font-bold text-slate-800 font-orbitron">Continuous Voice Loop</p>
                <p className="text-[10px] text-slate-500 font-mono">Auto-listen after CEO responds</p>
              </div>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input 
                type="checkbox" 
                checked={voiceToVoiceMode}
                onChange={(e) => setVoiceToVoiceMode(e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-10 h-5 bg-slate-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-orange-500"></div>
            </label>
          </div>

          {/* Live Voice STT Floating Speech Banner */}
          {sttTranscript && (
            <div className="p-3 bg-cyan-50 border border-cyan-200 rounded-xl text-xs text-cyan-900 shadow-md animate-fadeIn font-mono">
              <span className="font-bold text-cyan-600">🎙️ Spoken Voice: </span>"{sttTranscript}"
            </div>
          )}

        </div>
      </div>

      {/* Right Column: Glassmorphism White Minimalist Terminal */}
      <div className="lg:col-span-7 glass-panel-light rounded-3xl p-6 flex flex-col h-[610px] shadow-xl relative">
        
        {/* Terminal Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-200/80 mb-4">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-orange-500/10 rounded-xl border border-orange-200">
              <Bot className="w-6 h-6 text-orange-600" />
            </div>
            <div>
              <h3 className="font-orbitron font-bold text-slate-900 text-base">CEO Strategic Terminal</h3>
              <p className="text-xs text-orange-600 font-mono font-bold">Er. Orange B Executive Console</p>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={stopAllAudio}
              className="text-xs text-slate-600 hover:text-orange-600 flex items-center gap-1 font-mono transition bg-slate-100 hover:bg-slate-200 px-3 py-1.5 rounded-xl border border-slate-200 font-bold"
              title="Stop Speech"
            >
              {isSpeaking ? <VolumeX className="w-3.5 h-3.5 text-orange-600" /> : <Volume2 className="w-3.5 h-3.5 text-slate-600" />}
              <span>{isSpeaking ? 'Mute' : 'Audio'}</span>
            </button>

            <button
              onClick={() => setMessages([messages[0]])}
              className="text-xs text-slate-600 hover:text-slate-900 flex items-center gap-1 font-mono transition bg-slate-100 hover:bg-slate-200 px-3 py-1.5 rounded-xl border border-slate-200 font-bold"
              title="Reset Terminal"
            >
              <RefreshCw className="w-3.5 h-3.5" /> Clear
            </button>
          </div>
        </div>

        {/* Message Log */}
        <div className="flex-1 overflow-y-auto space-y-4 pr-2">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex gap-3 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              {msg.sender === 'ceo' && (
                <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-orange-500 to-amber-500 flex items-center justify-center text-white text-xs font-bold font-orbitron shrink-0 shadow-md">
                  CEO
                </div>
              )}
              
              <div
                className={`max-w-[85%] rounded-2xl p-4 text-sm leading-relaxed ${
                  msg.sender === 'user'
                    ? 'bg-slate-900 text-white font-medium rounded-br-none shadow-md'
                    : 'bg-white border border-slate-200/90 text-slate-800 rounded-bl-none shadow-sm font-medium'
                }`}
              >
                <div className="flex items-center justify-between gap-4 mb-1.5">
                  <span className={`text-[11px] font-mono font-bold uppercase tracking-wider ${
                    msg.sender === 'user' ? 'text-orange-400' : 'text-orange-600'
                  }`}>
                    {msg.sender === 'user' ? 'Executive Visitor' : 'Er. Orange B (CEO)'}
                  </span>
                  <span className={`text-[10px] font-mono ${msg.sender === 'user' ? 'text-slate-400' : 'text-slate-400'}`}>{msg.timestamp}</span>
                </div>
                
                <p className="whitespace-pre-wrap">{msg.text}</p>

                {msg.sender === 'ceo' && (
                  <button
                    onClick={() => handleSpeakCeo(msg.text)}
                    className="mt-2.5 text-xs text-orange-600 hover:text-orange-700 flex items-center gap-1.5 font-mono transition bg-orange-50 px-3 py-1 rounded-lg border border-orange-200 font-bold"
                  >
                    <Volume2 className="w-3.5 h-3.5 text-orange-600" /> Replay Speech
                  </button>
                )}
              </div>

              {msg.sender === 'user' && (
                <div className="w-10 h-10 rounded-xl bg-orange-500 flex items-center justify-center text-white shrink-0 shadow-md">
                  <User className="w-5 h-5" />
                </div>
              )}
            </div>
          ))}

          {isThinking && (
            <div className="flex items-center space-x-3 text-orange-600 text-xs font-mono font-bold p-3 bg-orange-50 rounded-xl border border-orange-200 w-fit">
              <Sparkles className="w-4 h-4 animate-spin text-orange-600" />
              <span>Er. Orange B is analyzing query...</span>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Quick Suggestion Pills */}
        <div className="py-3 flex items-center gap-2 overflow-x-auto no-scrollbar border-t border-slate-200/80 mt-2">
          <span className="text-xs uppercase font-mono text-slate-500 font-bold shrink-0">Prompts:</span>
          <button 
            onClick={() => handleSendMessage("Introduce yourself and Orange Future Tech")}
            className="text-xs text-slate-700 font-semibold bg-white hover:bg-orange-50 border border-slate-300 hover:border-orange-400 px-3.5 py-1.5 rounded-full whitespace-nowrap transition shadow-sm"
          >
            🏢 Introduce Company
          </button>
          <button 
            onClick={() => handleSendMessage("How do I deploy this app to ai.orangefuturetech.com on Vercel?")}
            className="text-xs text-slate-700 font-semibold bg-white hover:bg-orange-50 border border-slate-300 hover:border-orange-400 px-3.5 py-1.5 rounded-full whitespace-nowrap transition shadow-sm"
          >
            🚀 Vercel Hosting Guide
          </button>
          <button 
            onClick={() => handleSendMessage("What hardware, software, and AI solutions do you build?")}
            className="text-xs text-slate-700 font-semibold bg-white hover:bg-orange-50 border border-slate-300 hover:border-orange-400 px-3.5 py-1.5 rounded-full whitespace-nowrap transition shadow-sm"
          >
            ⚡ Solutions & Products
          </button>
          <button 
            onClick={() => handleSendMessage("Generate an Executive ID Card for me")}
            className="text-xs text-slate-700 font-semibold bg-white hover:bg-orange-50 border border-slate-300 hover:border-orange-400 px-3.5 py-1.5 rounded-full whitespace-nowrap transition shadow-sm"
          >
            🪪 Create ID Card
          </button>
        </div>

        {/* Text Bar & Push to Talk Microphone Button Next to Input Bar */}
        <form 
          onSubmit={(e) => { e.preventDefault(); handleSendMessage(); }} 
          className="flex items-center gap-2 pt-2"
        >
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Type your message to CEO Er. Orange B..."
            className="flex-1 bg-white border border-slate-300 focus:border-orange-500 rounded-2xl px-4 py-3.5 text-sm text-slate-900 placeholder-slate-400 outline-none transition font-medium shadow-sm"
          />

          {/* PUSH TO TALK MICROPHONE BUTTON RIGHT NEXT TO TEXT BAR */}
          <button
            type="button"
            onClick={() => toggleListening()}
            title="Push to Talk Microphone"
            className={`p-3.5 rounded-2xl font-bold transition-all shadow-md flex items-center justify-center ${
              isListening
                ? 'bg-cyan-500 text-white shadow-[0_0_20px_rgba(0,180,216,0.6)] animate-pulse scale-105'
                : 'bg-orange-500 text-white hover:bg-orange-600'
            }`}
          >
            {isListening ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5 animate-bounce" />}
          </button>

          {/* Send Text Button */}
          <button
            type="submit"
            disabled={!inputText.trim()}
            className="glass-button-orange p-3.5 rounded-2xl text-white disabled:opacity-40 disabled:cursor-not-allowed shadow-md"
          >
            <Send className="w-5 h-5" />
          </button>
        </form>

      </div>

    </div>
  );
}
