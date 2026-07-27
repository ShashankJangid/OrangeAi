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
      text: "Greetings. I am Victor Vane, CEO of Orange Future Tech. Welcome to ai.orangefuturetech.com. Speak or type to discuss our software solutions, hardware systems, or enterprise AI strategy.",
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
    setInputText('');
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
      
      {/* Left Column: Holographic CEO Avatar & Sci-Fi Control Terminal */}
      <div className="lg:col-span-5 glass-panel rounded-2xl p-6 flex flex-col items-center justify-between border-2 border-cyan-500/40 shadow-2xl relative overflow-hidden bg-slate-950/95">
        
        {/* Sci-Fi Corner Brackets */}
        <div className="absolute top-2 left-2 w-3.5 h-3.5 border-t-2 border-l-2 border-cyan-400" />
        <div className="absolute top-2 right-2 w-3.5 h-3.5 border-t-2 border-r-2 border-cyan-400" />
        <div className="absolute bottom-2 left-2 w-3.5 h-3.5 border-b-2 border-l-2 border-cyan-400" />
        <div className="absolute bottom-2 right-2 w-3.5 h-3.5 border-b-2 border-r-2 border-cyan-400" />

        {/* Header Telemetry */}
        <div className="w-full flex items-center justify-between border-b border-cyan-500/30 pb-4 mb-2">
          <div className="flex items-center space-x-2">
            <div className="w-3.5 h-3.5 rounded-full bg-cyan-400 animate-ping" />
            <span className="font-orbitron text-xs tracking-wider text-cyan-400 font-black uppercase">
              AI CEO EXECUTIVE CORE
            </span>
          </div>
          <span className="text-xs bg-cyan-500/20 border border-cyan-400 text-cyan-300 px-3 py-1 rounded-full font-mono font-bold flex items-center gap-1 shadow-md">
            <Radio className="w-3.5 h-3.5 text-cyan-400 animate-pulse" /> ai.orangefuturetech.com
          </span>
        </div>

        {/* Dynamic Canvas Hologram Avatar */}
        <CeoAvatarCanvas isSpeaking={isSpeaking} isListening={isListening} isThinking={isThinking} />

        {/* CEO Identity Info */}
        <div className="text-center my-3">
          <h2 className="text-2xl font-black font-orbitron text-white flex items-center justify-center gap-2 text-shadow-glow">
            Victor Vane <Award className="w-5 h-5 text-yellow-400" />
          </h2>
          <p className="text-xs text-cyan-300 font-mono font-bold tracking-wide mt-1">Chief Executive Officer | Orange Future Tech</p>
          
          <div className="flex items-center justify-center gap-2 mt-2">
            <span className={`text-xs font-mono font-black uppercase px-3.5 py-1 rounded-full border-2 shadow-lg ${
              isSpeaking ? 'bg-amber-500/25 text-amber-300 border-amber-400 animate-pulse' :
              isListening ? 'bg-cyan-500/25 text-cyan-300 border-cyan-400 animate-pulse' :
              isThinking ? 'bg-purple-500/25 text-purple-300 border-purple-400 animate-pulse' :
              'bg-emerald-500/20 text-emerald-300 border-emerald-400'
            }`}>
              {isSpeaking ? '🔊 VOICE ACTIVE' : isListening ? '🎙️ LISTENING...' : isThinking ? '⚡ ANALYZING...' : '● EXECUTIVE READY'}
            </span>
          </div>
        </div>

        {/* Equalizer Visualizer Strip when Speaking */}
        {isSpeaking && (
          <div className="w-full flex items-center justify-center space-x-1.5 py-2">
            {[40, 75, 35, 95, 55, 85, 45, 100, 65, 35].map((h, idx) => (
              <div 
                key={idx}
                style={{ height: `${h * 0.28}px`, animationDelay: `${idx * 0.1}s` }}
                className="w-1.5 bg-gradient-to-t from-cyan-500 via-blue-400 to-yellow-400 rounded-full animate-wave-bar"
              />
            ))}
          </div>
        )}

        {/* High-Contrast Voice Controls */}
        <div className="w-full space-y-3 pt-3 border-t border-cyan-500/30">
          
          {/* Big Microphone Push-to-Talk Button */}
          <div className="flex items-center justify-center space-x-3">
            <button
              onClick={() => toggleListening()}
              className={`w-full py-4 px-6 rounded-2xl font-black font-orbitron flex items-center justify-center gap-3 transition-all duration-300 shadow-2xl ${
                isListening 
                  ? 'bg-cyan-400 text-black shadow-[0_0_35px_rgba(0,240,255,1)] scale-105 animate-pulse' 
                  : 'glass-button-cyan text-black hover:scale-[1.02]'
              }`}
            >
              {isListening ? <MicOff className="w-6 h-6" /> : <Mic className="w-6 h-6 animate-bounce" />}
              <span>{isListening ? 'STOP LISTENING' : 'PUSH TO TALK (VOICE)'}</span>
            </button>
            
            <button
              onClick={stopAllAudio}
              title="Mute / Stop Speech"
              className="p-4 rounded-2xl glass-button-secondary text-white hover:border-cyan-300"
            >
              {isSpeaking ? <VolumeX className="w-6 h-6 text-orange-400" /> : <Volume2 className="w-6 h-6 text-cyan-400" />}
            </button>
          </div>

          {/* Voice-to-Voice Loop Toggle */}
          <div className="flex items-center justify-between bg-slate-950 p-3.5 rounded-2xl border border-cyan-500/40 shadow-inner">
            <div className="flex items-center gap-2.5">
              <div className="p-1.5 bg-cyan-500/20 rounded-lg">
                <Zap className="w-4 h-4 text-cyan-400" />
              </div>
              <div>
                <p className="text-xs font-black text-white font-orbitron">Continuous Voice Loop</p>
                <p className="text-[10px] text-slate-300 font-mono">Auto-listen after CEO responds</p>
              </div>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input 
                type="checkbox" 
                checked={voiceToVoiceMode}
                onChange={(e) => setVoiceToVoiceMode(e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-10 h-5 bg-slate-800 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-cyan-400"></div>
            </label>
          </div>

          {/* Live STT Display */}
          {sttTranscript && (
            <div className="p-3 bg-cyan-950 border-2 border-cyan-400 rounded-xl text-xs text-white shadow-lg animate-fadeIn font-mono">
              <span className="font-bold text-cyan-400">Live Speech: </span>"{sttTranscript}"
            </div>
          )}

        </div>
      </div>

      {/* Right Column: High Contrast Chat Console */}
      <div className="lg:col-span-7 glass-panel rounded-2xl p-6 flex flex-col h-[600px] border-2 border-cyan-500/40 shadow-2xl relative bg-slate-950/95">
        
        {/* Chat Console Header */}
        <div className="flex items-center justify-between pb-4 border-b border-cyan-500/30 mb-4">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-cyan-500/20 rounded-xl border border-cyan-400">
              <Bot className="w-6 h-6 text-cyan-400" />
            </div>
            <div>
              <h3 className="font-orbitron font-black text-white text-base">CEO Strategic Terminal</h3>
              <p className="text-xs text-orange-400 font-mono font-bold">Voice & Text Executive Stream</p>
            </div>
          </div>

          <button
            onClick={() => setMessages([messages[0]])}
            className="text-xs text-slate-300 hover:text-cyan-300 flex items-center gap-1 font-mono transition bg-white/10 px-3.5 py-1.5 rounded-lg border border-white/20 font-bold"
            title="Reset Terminal"
          >
            <RefreshCw className="w-3.5 h-3.5" /> Clear Log
          </button>
        </div>

        {/* Message Log Stream */}
        <div className="flex-1 overflow-y-auto space-y-4 pr-2">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex gap-3 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              {msg.sender === 'ceo' && (
                <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-400 via-blue-600 to-indigo-600 flex items-center justify-center text-black text-xs font-black font-orbitron shrink-0 shadow-lg shadow-cyan-500/50 border border-cyan-300">
                  CEO
                </div>
              )}
              
              <div
                className={`max-w-[85%] rounded-2xl p-4 text-sm leading-relaxed ${
                  msg.sender === 'user'
                    ? 'bg-gradient-to-r from-cyan-400 via-blue-500 to-indigo-600 text-black font-bold rounded-br-none shadow-[0_0_20px_rgba(0,240,255,0.4)]'
                    : 'bg-slate-900 border-2 border-orange-500/50 text-slate-100 rounded-bl-none shadow-md backdrop-blur-md font-medium'
                }`}
              >
                <div className="flex items-center justify-between gap-4 mb-1.5">
                  <span className={`text-[11px] font-mono font-black uppercase tracking-wider ${
                    msg.sender === 'user' ? 'text-black' : 'text-orange-400'
                  }`}>
                    {msg.sender === 'user' ? 'Executive Visitor' : 'Victor Vane (CEO)'}
                  </span>
                  <span className={`text-[10px] font-mono ${msg.sender === 'user' ? 'text-black/80' : 'text-slate-400'}`}>{msg.timestamp}</span>
                </div>
                
                <p className="whitespace-pre-wrap">{msg.text}</p>

                {msg.sender === 'ceo' && (
                  <button
                    onClick={() => handleSpeakCeo(msg.text)}
                    className="mt-2.5 text-xs text-cyan-300 hover:text-white flex items-center gap-1.5 font-mono transition bg-cyan-500/20 px-3 py-1 rounded-lg border border-cyan-400 font-bold"
                  >
                    <Volume2 className="w-3.5 h-3.5 text-cyan-400" /> Replay Speech
                  </button>
                )}
              </div>

              {msg.sender === 'user' && (
                <div className="w-10 h-10 rounded-xl bg-orange-500 border-2 border-orange-400 flex items-center justify-center text-white shrink-0 shadow-lg">
                  <User className="w-5 h-5" />
                </div>
              )}
            </div>
          ))}

          {isThinking && (
            <div className="flex items-center space-x-3 text-cyan-300 text-xs font-mono font-bold p-3 bg-cyan-500/20 rounded-xl border-2 border-cyan-400 w-fit">
              <Sparkles className="w-4 h-4 animate-spin text-cyan-400" />
              <span>Analyzing executive query...</span>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Quick Suggestion Pills */}
        <div className="py-3 flex items-center gap-2 overflow-x-auto no-scrollbar border-t border-cyan-500/30 mt-2">
          <span className="text-xs uppercase font-mono text-cyan-400 font-bold shrink-0">Prompts:</span>
          <button 
            onClick={() => handleSendMessage("Introduce yourself and Orange Future Tech")}
            className="text-xs text-white font-semibold bg-white/10 hover:bg-cyan-500/30 border border-cyan-400/50 hover:border-cyan-300 px-3.5 py-1.5 rounded-full whitespace-nowrap transition"
          >
            🏢 Introduce Company
          </button>
          <button 
            onClick={() => handleSendMessage("How do I deploy this app to ai.orangefuturetech.com on Vercel?")}
            className="text-xs text-white font-semibold bg-white/10 hover:bg-cyan-500/30 border border-cyan-400/50 hover:border-cyan-300 px-3.5 py-1.5 rounded-full whitespace-nowrap transition"
          >
            🚀 Vercel Hosting Guide
          </button>
          <button 
            onClick={() => handleSendMessage("What hardware, software, and AI solutions do you build?")}
            className="text-xs text-white font-semibold bg-white/10 hover:bg-cyan-500/30 border border-cyan-400/50 hover:border-cyan-300 px-3.5 py-1.5 rounded-full whitespace-nowrap transition"
          >
            ⚡ Solutions & Products
          </button>
          <button 
            onClick={() => handleSendMessage("Generate an Executive ID Card for me")}
            className="text-xs text-white font-semibold bg-white/10 hover:bg-cyan-500/30 border border-cyan-400/50 hover:border-cyan-300 px-3.5 py-1.5 rounded-full whitespace-nowrap transition"
          >
            🪪 Create ID Card
          </button>
        </div>

        {/* Text Input Bar */}
        <form 
          onSubmit={(e) => { e.preventDefault(); handleSendMessage(); }} 
          className="flex items-center gap-2 pt-2"
        >
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Type your message to CEO Victor Vane..."
            className="flex-1 bg-slate-900 border-2 border-cyan-500/40 focus:border-cyan-300 rounded-xl px-4 py-3.5 text-sm text-white placeholder-slate-400 outline-none transition font-medium"
          />
          <button
            type="submit"
            disabled={!inputText.trim()}
            className="glass-button-cyan p-3.5 rounded-xl text-black font-black disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
          >
            <Send className="w-5 h-5" />
          </button>
        </form>

      </div>

    </div>
  );
}
