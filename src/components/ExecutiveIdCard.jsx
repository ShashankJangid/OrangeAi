import React, { useState, useRef } from 'react';
import { 
  Award, Shield, QrCode, Download, Printer, CheckCircle, 
  Sparkles, RefreshCw, Cpu, UserCheck, Lock, Globe, Zap, Radio
} from 'lucide-react';
import confetti from 'canvas-confetti';

export default function ExecutiveIdCard() {
  const [formData, setFormData] = useState({
    name: 'Alex Vance',
    role: 'Senior AI Systems Engineer',
    department: 'AI & Quantum Robotics Lab',
    clearance: 'LEVEL-5 EXECUTIVE',
    empId: 'OFT-2026-9042',
    issueDate: '2026-07-27',
    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80'
  });

  const [tilt, setTilt] = useState({ rx: 0, ry: 0, shineX: 50, shineY: 50 });
  const cardRef = useRef(null);

  const avatarOptions = [
    'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
    'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
    'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80',
    'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80'
  ];

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rx = ((y - centerY) / centerY) * -16;
    const ry = ((x - centerX) / centerX) * 16;
    
    const shineX = (x / rect.width) * 100;
    const shineY = (y / rect.height) * 100;

    setTilt({ rx, ry, shineX, shineY });
  };

  const handleMouseLeave = () => {
    setTilt({ rx: 0, ry: 0, shineX: 50, shineY: 50 });
  };

  const handleGenerateId = (e) => {
    e.preventDefault();
    confetti({
      particleCount: 120,
      spread: 90,
      origin: { y: 0.6 }
    });
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
      
      <div className="lg:col-span-5 glass-panel-futuristic rounded-3xl p-6 border-2 border-cyan-400/50 shadow-[0_0_50px_rgba(0,240,255,0.2)] relative bg-slate-950/95">
        <div className="flex items-center space-x-3 border-b border-cyan-500/30 pb-4 mb-5">
          <div className="p-2.5 bg-amber-500/20 border-2 border-amber-400 rounded-2xl">
            <Award className="w-6 h-6 text-amber-400" />
          </div>
          <div>
            <h3 className="font-orbitron font-black text-white text-lg">ID Card Hosting & Generator</h3>
            <p className="text-xs text-cyan-300 font-mono font-bold">Verifiable Badges on ai.orangefuturetech.com</p>
          </div>
        </div>

        <form onSubmit={handleGenerateId} className="space-y-4 text-sm">
          <div>
            <label className="block text-xs font-bold text-cyan-300 mb-1">Full Executive Name</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full bg-slate-950 border-2 border-cyan-500/40 focus:border-cyan-300 rounded-2xl px-4 py-3 text-white font-medium outline-none shadow-inner"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-cyan-300 mb-1">Designation / Executive Role</label>
            <input
              type="text"
              value={formData.role}
              onChange={(e) => setFormData({ ...formData, role: e.target.value })}
              className="w-full bg-slate-950 border-2 border-cyan-500/40 focus:border-cyan-300 rounded-2xl px-4 py-3 text-white font-medium outline-none shadow-inner"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-cyan-300 mb-1">Department</label>
              <input
                type="text"
                value={formData.department}
                onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                className="w-full bg-slate-950 border-2 border-cyan-500/40 focus:border-cyan-300 rounded-2xl px-4 py-3 text-white font-medium outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-cyan-300 mb-1">Clearance Tier</label>
              <select
                value={formData.clearance}
                onChange={(e) => setFormData({ ...formData, clearance: e.target.value })}
                className="w-full bg-slate-950 border-2 border-cyan-500/40 focus:border-cyan-300 rounded-2xl px-4 py-3 text-white font-bold outline-none"
              >
                <option value="LEVEL-5 EXECUTIVE">Level-5 Executive</option>
                <option value="LEVEL-4 ARCHITECT">Level-4 Lead Architect</option>
                <option value="LEVEL-3 RESEARCHER">Level-3 AI Researcher</option>
                <option value="VISITOR PASS">Verified Visitor Pass</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-cyan-300 mb-2">Select Avatar Photo</label>
            <div className="flex items-center gap-3">
              {avatarOptions.map((img, idx) => (
                <img
                  key={idx}
                  src={img}
                  alt={`Avatar ${idx}`}
                  onClick={() => setFormData({ ...formData, avatarUrl: img })}
                  className={`w-12 h-12 rounded-2xl object-cover cursor-pointer border-2 transition ${
                    formData.avatarUrl === img ? 'border-amber-400 scale-110 shadow-lg shadow-amber-500/50 ring-2 ring-amber-400' : 'border-transparent opacity-60 hover:opacity-100'
                  }`}
                />
              ))}
            </div>
          </div>

          <div className="pt-2">
            <button
              type="submit"
              className="w-full glass-button-orange py-4 rounded-2xl text-white font-black font-orbitron flex items-center justify-center gap-2 tracking-wider shadow-2xl"
            >
              <Sparkles className="w-5 h-5 text-yellow-300" /> ISSUE HOLOGRAPHIC ID BADGE
            </button>
          </div>
        </form>
      </div>

      <div className="lg:col-span-7 flex flex-col items-center justify-center space-y-6">
        
        <p className="text-xs text-cyan-400 font-mono font-bold flex items-center gap-1.5 animate-pulse">
          <Zap className="w-4 h-4 text-amber-400" /> Hover over card for 3D Holographic Tilt effect
        </p>

        <div className="perspective-1000 w-full max-w-md">
          <div 
            ref={cardRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{
              transform: `rotateX(${tilt.rx}deg) rotateY(${tilt.ry}deg)`,
              transition: tilt.rx === 0 ? 'all 0.5s ease' : 'none'
            }}
            className="relative w-full bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950 rounded-3xl p-6 border-2 border-cyan-400 shadow-[0_0_60px_rgba(0,240,255,0.4)] overflow-hidden text-white cursor-pointer select-none"
          >
            <div 
              className="absolute inset-0 pointer-events-none transition-opacity duration-300 opacity-75"
              style={{
                background: `radial-gradient(circle at ${tilt.shineX}% ${tilt.shineY}%, rgba(255, 255, 255, 0.4) 0%, rgba(0, 240, 255, 0.18) 40%, transparent 80%)`
              }}
            />

            <div className="absolute inset-0 bg-cyber-grid opacity-30 pointer-events-none" />

            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-cyan-400 to-transparent animate-hologram-scan" />

            <div className="flex items-center justify-between border-b border-cyan-500/40 pb-4 mb-5 relative z-10">
              <div className="flex items-center space-x-2.5">
                <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-cyan-400 to-blue-600 flex items-center justify-center font-black font-orbitron text-black text-sm shadow-lg">
                  OF
                </div>
                <div>
                  <h4 className="font-orbitron font-black text-sm tracking-wider text-white">ORANGE FUTURE TECH</h4>
                  <p className="text-[11px] text-cyan-300 font-mono font-bold flex items-center gap-1">
                    <Radio className="w-3 h-3 text-cyan-400 animate-pulse" /> ai.orangefuturetech.com
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-1 bg-amber-500/20 border-2 border-amber-400 px-3 py-1 rounded-full text-xs text-amber-300 font-mono font-black shadow-md">
                <Shield className="w-3.5 h-3.5 text-amber-400" />
                <span>SECURE BADGE</span>
              </div>
            </div>

            <div className="grid grid-cols-12 gap-4 items-center relative z-10">
              
              <div className="col-span-4 relative">
                <div className="relative rounded-2xl overflow-hidden border-2 border-cyan-400 shadow-xl shadow-cyan-500/30">
                  <img 
                    src={formData.avatarUrl} 
                    alt={formData.name} 
                    className="w-full h-32 object-cover"
                  />
                  <div className="absolute bottom-0 inset-x-0 bg-gradient-to-r from-amber-500 to-orange-600 text-center py-0.5 text-[9px] font-black font-mono tracking-widest text-white uppercase">
                    CLEARANCE
                  </div>
                </div>
              </div>

              <div className="col-span-8 space-y-1.5 pl-2">
                <span className="text-[10px] font-mono uppercase tracking-widest text-amber-300 font-black bg-amber-500/20 border border-amber-400 px-2.5 py-0.5 rounded-md">
                  {formData.clearance}
                </span>
                
                <h3 className="text-xl font-black font-orbitron text-white leading-tight mt-1 text-shadow-glow">
                  {formData.name}
                </h3>
                
                <p className="text-xs text-cyan-300 font-bold">{formData.role}</p>
                <p className="text-[11px] text-slate-300 font-medium">{formData.department}</p>
                
                <div className="pt-2.5 flex items-center justify-between border-t border-cyan-500/30 text-[10px] font-mono">
                  <div>
                    <span className="text-slate-400 block font-bold">EMPLOYEE ID</span>
                    <span className="text-cyan-400 font-black">{formData.empId}</span>
                  </div>
                  <div className="text-right">
                    <span className="text-slate-400 block font-bold">ISSUED</span>
                    <span className="text-slate-200 font-bold">{formData.issueDate}</span>
                  </div>
                </div>
              </div>

            </div>

            <div className="mt-5 pt-3 border-t border-cyan-500/40 flex items-center justify-between relative z-10 bg-slate-950 p-3 rounded-2xl border border-cyan-400/30">
              <div className="flex items-center space-x-2.5">
                <div className="p-1.5 bg-cyan-500/20 border border-cyan-400 rounded-xl">
                  <QrCode className="w-7 h-7 text-cyan-400" />
                </div>
                <div className="text-[10px] font-mono">
                  <p className="text-slate-100 font-bold flex items-center gap-1">
                    <CheckCircle className="w-3.5 h-3.5 text-emerald-400" /> Verifiable SSL Badge
                  </p>
                  <p className="text-cyan-400 font-bold">https://ai.orangefuturetech.com/id-card</p>
                </div>
              </div>
              
              <div className="text-right">
                <Cpu className="w-6 h-6 text-amber-400 opacity-90 animate-pulse" />
              </div>
            </div>

          </div>
        </div>

        <div className="flex items-center space-x-4 pt-2">
          <button
            onClick={handlePrint}
            className="glass-button-secondary px-6 py-3 rounded-2xl text-xs font-bold text-cyan-300 flex items-center gap-2 hover:border-cyan-300 transition"
          >
            <Printer className="w-4 h-4 text-cyan-400" /> Print Security Badge
          </button>
          
          <a
            href={`data:text/html;charset=utf-8,${encodeURIComponent(`
              <html>
                <head><title>Executive ID Card - ${formData.name}</title></head>
                <body style="background:#030712; color:white; font-family:sans-serif; text-align:center; padding:50px;">
                  <h2>Orange Future Tech Verifiable Credential</h2>
                  <p>Name: ${formData.name}</p>
                  <p>Role: ${formData.role}</p>
                  <p>Clearance: ${formData.clearance}</p>
                  <p>Hosted on: ai.orangefuturetech.com</p>
                </body>
              </html>
            `)}`}
            download={`${formData.name.replace(/\s+/g, '_')}_ID_Badge.html`}
            className="glass-button-cyan px-6 py-3 rounded-2xl text-xs font-black text-black flex items-center gap-2"
          >
            <Download className="w-4 h-4" /> Download Badge File
          </a>
        </div>

      </div>

    </div>
  );
}
