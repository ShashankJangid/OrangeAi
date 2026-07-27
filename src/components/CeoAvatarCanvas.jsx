import React, { useEffect, useRef } from 'react';

export default function CeoAvatarCanvas({ isSpeaking, isListening, isThinking }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let angle = 0;
    let hudAngle = 0;

    const resize = () => {
      const parent = canvas.parentElement;
      if (parent) {
        canvas.width = parent.clientWidth || 320;
        canvas.height = parent.clientHeight || 320;
      }
    };
    resize();
    window.addEventListener('resize', resize);

    const particles = Array.from({ length: 50 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      radius: Math.random() * 2.5 + 1.2,
      speedX: (Math.random() - 0.5) * 1.5,
      speedY: (Math.random() - 0.5) * 1.5,
    }));

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;
      const baseRadius = Math.min(centerX, centerY) * 0.42;

      particles.forEach(p => {
        p.x += p.speedX * (isSpeaking ? 2 : 1);
        p.y += p.speedY * (isSpeaking ? 2 : 1);

        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = isListening ? '#00F0FF' : isSpeaking ? '#FF5500' : '#FFD700';
        ctx.shadowColor = isListening ? '#00F0FF' : '#FF5500';
        ctx.shadowBlur = 12;
        ctx.fill();
      });

      let pulseMultiplier = 1;
      if (isSpeaking) {
        pulseMultiplier = 1 + Math.sin(Date.now() * 0.018) * 0.14;
      } else if (isListening) {
        pulseMultiplier = 1 + Math.sin(Date.now() * 0.022) * 0.09;
      } else if (isThinking) {
        pulseMultiplier = 1 + Math.sin(Date.now() * 0.035) * 0.11;
      }

      const currentRadius = baseRadius * pulseMultiplier;

      const coreGrad = ctx.createRadialGradient(
        centerX, centerY, 5,
        centerX, centerY, currentRadius * 1.7
      );

      if (isSpeaking) {
        coreGrad.addColorStop(0, '#FFFFFF');
        coreGrad.addColorStop(0.3, '#FFD700');
        coreGrad.addColorStop(0.7, '#FF3300');
        coreGrad.addColorStop(1, 'rgba(255, 51, 0, 0)');
      } else if (isListening) {
        coreGrad.addColorStop(0, '#FFFFFF');
        coreGrad.addColorStop(0.3, '#00F0FF');
        coreGrad.addColorStop(0.75, '#0044FF');
        coreGrad.addColorStop(1, 'rgba(0, 68, 255, 0)');
      } else if (isThinking) {
        coreGrad.addColorStop(0, '#FFFFFF');
        coreGrad.addColorStop(0.3, '#E082FF');
        coreGrad.addColorStop(0.75, '#7C3AED');
        coreGrad.addColorStop(1, 'rgba(124, 58, 237, 0)');
      } else {
        coreGrad.addColorStop(0, '#FFFFFF');
        coreGrad.addColorStop(0.35, '#00F0FF');
        coreGrad.addColorStop(0.8, '#FF5500');
        coreGrad.addColorStop(1, 'rgba(255, 85, 0, 0)');
      }

      ctx.beginPath();
      ctx.arc(centerX, centerY, currentRadius * 1.6, 0, Math.PI * 2);
      ctx.fillStyle = coreGrad;
      ctx.fill();

      hudAngle += isSpeaking ? 0.05 : 0.02;

      ctx.save();
      ctx.translate(centerX, centerY);
      ctx.rotate(-hudAngle);
      ctx.beginPath();
      ctx.arc(0, 0, currentRadius * 1.52, 0, Math.PI * 2);
      ctx.setLineDash([10, 14]);
      ctx.strokeStyle = isListening ? '#00F0FF' : '#FF5500';
      ctx.lineWidth = 2.5;
      ctx.shadowColor = isListening ? '#00F0FF' : '#FF5500';
      ctx.shadowBlur = 15;
      ctx.stroke();
      ctx.restore();

      const numBars = 44;
      for (let b = 0; b < numBars; b++) {
        const barAngle = (b / numBars) * Math.PI * 2;
        let barHeight = 10;

        if (isSpeaking) {
          barHeight = Math.sin(Date.now() * 0.016 + b * 0.6) * 28 + 22;
        } else if (isListening) {
          barHeight = Math.sin(Date.now() * 0.02 + b * 0.5) * 14 + 12;
        }

        const x1 = centerX + Math.cos(barAngle) * (currentRadius * 1.12);
        const y1 = centerY + Math.sin(barAngle) * (currentRadius * 1.12);
        const x2 = centerX + Math.cos(barAngle) * (currentRadius * 1.12 + barHeight);
        const y2 = centerY + Math.sin(barAngle) * (currentRadius * 1.12 + barHeight);

        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        
        ctx.strokeStyle = isSpeaking 
          ? (b % 2 === 0 ? '#FFD700' : '#FF5500')
          : isListening 
          ? '#00F0FF' 
          : '#00F0FF';

        ctx.lineWidth = 3;
        ctx.shadowColor = ctx.strokeStyle;
        ctx.shadowBlur = 12;
        ctx.stroke();
      }

      ctx.save();
      ctx.font = '900 26px Orbitron, sans-serif';
      ctx.fillStyle = '#FFFFFF';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.shadowColor = '#00F0FF';
      ctx.shadowBlur = 20;
      ctx.fillText('CEO', centerX, centerY - 4);

      ctx.font = '800 11px Inter, sans-serif';
      ctx.fillStyle = isListening ? '#00F0FF' : isSpeaking ? '#FFD700' : '#00F0FF';
      ctx.shadowColor = ctx.fillStyle;
      ctx.shadowBlur = 10;
      ctx.fillText(
        isSpeaking ? '● VOICE ACTIVE' : isListening ? '● LISTENING...' : isThinking ? '● ANALYZING...' : 'VICTOR VANE',
        centerX,
        centerY + 18
      );
      ctx.restore();

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [isSpeaking, isListening, isThinking]);

  return (
    <div className="relative w-full h-72 md:h-80 flex items-center justify-center">
      <canvas ref={canvasRef} className="w-full h-full cursor-pointer" />
    </div>
  );
}
