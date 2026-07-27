import React, { useEffect, useRef } from 'react';

export default function CeoAvatarCanvas({ isSpeaking, isListening, isThinking }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let raf;
    const SIZE = 170;
    canvas.width = SIZE;
    canvas.height = SIZE;

    const cx = SIZE / 2;
    const cy = SIZE / 2;
    let t = 0;

    const render = () => {
      t += 0.02;
      ctx.clearRect(0, 0, SIZE, SIZE);

      // Outer glow ring
      const baseR = 80;
      const pulseR = baseR + (isSpeaking ? Math.sin(t * 3) * 12 : isListening ? Math.sin(t * 2) * 6 : 0);
      const ringColor = isListening ? '#06b6d4' : isSpeaking ? '#f97316' : '#f97316';

      // Glow
      const grd = ctx.createRadialGradient(cx, cy, 20, cx, cy, pulseR + 30);
      grd.addColorStop(0, isListening ? 'rgba(6,182,212,0.3)' : 'rgba(249,115,22,0.25)');
      grd.addColorStop(1, 'transparent');
      ctx.beginPath();
      ctx.arc(cx, cy, pulseR + 30, 0, Math.PI * 2);
      ctx.fillStyle = grd;
      ctx.fill();

      // Inner circle
      const innerGrd = ctx.createRadialGradient(cx - 10, cy - 10, 5, cx, cy, 62);
      innerGrd.addColorStop(0, isListening ? '#0e7490' : '#7c2d12');
      innerGrd.addColorStop(0.5, isListening ? '#0c4a6e' : '#431407');
      innerGrd.addColorStop(1, '#0a0a0a');
      ctx.beginPath();
      ctx.arc(cx, cy, 62, 0, Math.PI * 2);
      ctx.fillStyle = innerGrd;
      ctx.fill();

      // Ring dash
      ctx.save();
      ctx.translate(cx, cy);
      ctx.rotate(t * 0.8);
      ctx.beginPath();
      ctx.arc(0, 0, pulseR, 0, Math.PI * 2);
      ctx.setLineDash([6, 8]);
      ctx.strokeStyle = `${ringColor}88`;
      ctx.lineWidth = 1.5;
      ctx.stroke();
      ctx.restore();

      // Outer static ring
      ctx.beginPath();
      ctx.arc(cx, cy, baseR + 18, 0, Math.PI * 2);
      ctx.strokeStyle = 'rgba(255,255,255,0.04)';
      ctx.lineWidth = 1;
      ctx.setLineDash([]);
      ctx.stroke();

      // Audio bars (only when speaking or listening)
      if (isSpeaking || isListening) {
        const bars = 36;
        for (let i = 0; i < bars; i++) {
          const angle = (i / bars) * Math.PI * 2;
          const amp = isSpeaking
            ? Math.abs(Math.sin(t * 4 + i * 0.5)) * 22 + 6
            : Math.abs(Math.sin(t * 2 + i * 0.4)) * 10 + 4;
          const r1 = pulseR + 2;
          const r2 = r1 + amp;
          ctx.beginPath();
          ctx.moveTo(cx + Math.cos(angle) * r1, cy + Math.sin(angle) * r1);
          ctx.lineTo(cx + Math.cos(angle) * r2, cy + Math.sin(angle) * r2);
          ctx.strokeStyle = isListening ? '#06b6d4' : i % 2 === 0 ? '#f97316' : '#fb923c';
          ctx.lineWidth = 2;
          ctx.stroke();
        }
      }

      // Thinking spinner
      if (isThinking) {
        ctx.save();
        ctx.translate(cx, cy);
        ctx.rotate(t * 2);
        ctx.beginPath();
        ctx.arc(0, 0, pulseR + 5, 0, Math.PI * 1.6);
        ctx.strokeStyle = '#a855f7';
        ctx.lineWidth = 2;
        ctx.setLineDash([]);
        ctx.lineCap = 'round';
        ctx.stroke();
        ctx.restore();
      }

      // CEO Text
      ctx.save();
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.font = '700 18px Inter, sans-serif';
      ctx.fillStyle = '#f5f5f5';
      ctx.fillText('OF', cx, cy - 8);
      ctx.font = '500 10px Inter, sans-serif';
      ctx.fillStyle = isSpeaking ? '#f97316' : isListening ? '#06b6d4' : isThinking ? '#a855f7' : '#71717a';
      ctx.fillText(isSpeaking ? 'SPEAKING' : isListening ? 'LISTENING' : isThinking ? 'THINKING' : 'READY', cx, cy + 10);
      ctx.restore();

      raf = requestAnimationFrame(render);
    };

    render();
    return () => cancelAnimationFrame(raf);
  }, [isSpeaking, isListening, isThinking]);

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '10px 0' }}>
      <canvas ref={canvasRef} style={{ width: 170, height: 170 }} />
    </div>
  );
}
