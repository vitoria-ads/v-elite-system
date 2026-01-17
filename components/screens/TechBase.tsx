import React, { useState } from 'react';
import { StepCard } from '../StepCard';
import { Platform, TechConfig } from '../../types';
import { Button } from '../Button';
import { ChevronLeft, Info, Cpu, MousePointer2 } from 'lucide-react';

interface Props {
  platform: Platform;
  onSave: (tech: TechConfig) => void;
  onBack: () => void;
}

export const TechBase: React.FC<Props> = ({ platform, onSave, onBack }) => {
  const [useAiDpi, setUseAiDpi] = useState(true);
  const [inputValue, setInputValue] = useState<string>(''); // Generic input handler
  const [iosCursor, setIosCursor] = useState<number>(100);

  const handleNext = () => {
    // Basic validation
    let val = parseInt(inputValue);
    
    // Default values if empty based on platform logic
    if (isNaN(val)) {
      if (platform === 'EMULATOR') val = 800; // Default mouse DPI
      else val = 411; // Default Android DPI
    }

    if (platform === 'EMULATOR' && (val < 100 || val > 16000)) {
        alert("DPI do Mouse inválida. Use entre 100 e 16000.");
        return;
    }

    onSave({
      useAiDpi,
      currentDpi: val, // In Emulator context, this is Mouse DPI
      iosCursorSpeed: iosCursor
    });
  };

  const inputClass = "w-full bg-black/50 border border-white/20 rounded-lg p-4 text-white text-xl font-mono outline-none focus:border-elite-accent focus:shadow-[0_0_20px_rgba(6,182,212,0.2)] transition-all [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none";

  // --- IOS VIEW ---
  if (platform === 'IPHONE') {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-4">
        <StepCard title="Ajuste do iOS" subtitle="Sistema Operacional">
          <div className="space-y-6">
            <div className="bg-white/5 p-6 rounded-xl border border-white/10">
              <label className="flex justify-between text-sm text-gray-300 mb-4 font-bold uppercase tracking-wider">
                Velocidade do Cursor (Ajustes)
                <span className="text-elite-accent">{iosCursor}</span>
              </label>
              <input 
                type="range" 
                min="31" 
                max="120" 
                value={iosCursor} 
                onChange={(e) => setIosCursor(Number(e.target.value))}
                className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-elite-primary"
              />
              <div className="flex justify-between text-[10px] text-gray-500 mt-2 uppercase font-bold">
                <span>Lento (31)</span>
                <span>Rápido (120)</span>
              </div>
            </div>

            <div className="p-4 bg-blue-500/10 rounded-xl border border-blue-500/20 flex gap-3">
              <Info className="text-blue-400 shrink-0" size={20} />
              <p className="text-xs text-blue-200 leading-relaxed">
                No iPhone, a "DPI" é controlada pela velocidade do cursor no menu de Acessibilidade. O sistema V-ELITE usará este valor como base.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4 mt-8">
              <Button variant="secondary" onClick={onBack}>Voltar</Button>
              <Button onClick={handleNext}>Continuar</Button>
            </div>
          </div>
        </StepCard>
      </div>
    );
  }

  // --- EMULATOR VIEW ---
  if (platform === 'EMULATOR') {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-4">
        <StepCard title="Configuração do Mouse" subtitle="Input Físico">
          <div className="space-y-6">
             <div className="bg-white/5 p-6 rounded-xl border border-white/10 relative overflow-hidden group">
               <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                 <MousePointer2 size={64} />
               </div>
               
               <label className="text-xs font-bold text-elite-primary uppercase mb-2 block tracking-widest">
                 DPI do Mouse (Hardware)
               </label>
               
               <input 
                  type="number" 
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="Ex: 800, 1000..."
                  className={inputClass}
                />
                <p className="text-[10px] text-gray-500 mt-2">
                  Digite o valor exato que você usa no software do mouse (Logitech, Razer, etc).
                </p>
             </div>

             <div className="p-4 bg-red-500/10 rounded-xl border border-red-500/20">
               <p className="text-xs text-red-200">
                 ⚠ <strong>IMPORTANTE:</strong> Não confunda com a DPI do emulador (BS5/MSI). O sistema irá calcular a DPI interna ideal baseada no seu mouse.
               </p>
             </div>

             <div className="grid grid-cols-2 gap-4 mt-8">
               <Button variant="secondary" onClick={onBack}><ChevronLeft size={20}/></Button>
               <Button onClick={handleNext}>CALCULAR</Button>
             </div>
          </div>
        </StepCard>
      </div>
    );
  }

  // --- ANDROID VIEW ---
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <StepCard title="Densidade (DPI)" subtitle="Configuração de Tela Android">
        <div className="space-y-4">
          
          <button 
            onClick={() => setUseAiDpi(true)}
            className={`w-full p-5 rounded-xl border-2 flex items-center gap-4 transition-all ${useAiDpi ? 'bg-elite-primary/20 border-elite-primary shadow-[0_0_20px_rgba(109,40,217,0.3)]' : 'bg-white/5 border-white/5 opacity-60 hover:opacity-100'}`}
          >
            <div className={`p-3 rounded-full ${useAiDpi ? 'bg-elite-primary text-white' : 'bg-gray-800 text-gray-400'}`}>
              <Cpu size={24} />
            </div>
            <div className="text-left">
              <div className="font-bold text-white text-lg">IA GERA DPI IDEAL</div>
              <div className="text-xs text-gray-400">Calcula com base no hardware do seu modelo.</div>
            </div>
          </button>

          <button 
            onClick={() => setUseAiDpi(false)}
            className={`w-full p-5 rounded-xl border-2 flex flex-col gap-3 transition-all ${!useAiDpi ? 'bg-elite-primary/20 border-elite-primary' : 'bg-white/5 border-white/5 opacity-60 hover:opacity-100'}`}
          >
            <div className="flex items-center gap-4">
               <div className={`p-3 rounded-full ${!useAiDpi ? 'bg-elite-primary text-white' : 'bg-gray-800 text-gray-400'}`}>
                  <MousePointer2 size={24} />
               </div>
               <div className="text-left">
                  <div className="font-bold text-white text-lg">USAR DPI MANUAL</div>
                  <div className="text-xs text-gray-400">Você define um valor fixo.</div>
               </div>
            </div>
            
            {!useAiDpi && (
               <input 
                 type="number" 
                 value={inputValue}
                 onChange={(e) => setInputValue(e.target.value)}
                 className={`${inputClass} mt-2`}
                 placeholder="Ex: 411, 500..."
               />
            )}
          </button>

          <div className="grid grid-cols-2 gap-4 mt-8">
            <Button variant="secondary" onClick={onBack}>
               <ChevronLeft size={20} />
            </Button>
            <Button onClick={handleNext}>
              AVANÇAR
            </Button>
          </div>
        </div>
      </StepCard>
    </div>
  );
};