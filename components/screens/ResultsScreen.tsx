import React, { useState } from 'react';
import { SensitivityResult, AppState } from '../../types';
import { saveProfile } from '../../services/storage';
import { WHATSAPP_LINK_REGEDIT, WHATSAPP_LINK_SENS } from '../../constants';
import { Button } from '../Button';
import { Copy, Save, RefreshCw, Crosshair, BarChart3, Medal, Zap, ShieldCheck, Home, Instagram } from 'lucide-react';

interface Props {
  results: SensitivityResult;
  state: AppState;
  onReset: () => void;
  onRegenerate: () => void;
}

export const ResultsScreen: React.FC<Props> = ({ results, state, onReset, onRegenerate }) => {
  const [copied, setCopied] = useState(false);
  const [showSaveModal, setShowSaveModal] = useState(false);
  const [profileName, setProfileName] = useState('');

  const isEmulator = state.platform === 'EMULATOR';
  const isApostado = state.playStyle === 'APOSTADO';

  const handleCopy = () => {
    let text = `⚡ V-ELITE SYSTEM 2026 ⚡\n\n`;
    text += `Criado por: @vitoriaq083\n`;
    text += `Perfil: ${results.proSimilarity}\n`;
    
    if (isEmulator && results.emulatorSensitivity) {
      text += `[EMULADOR]\n`;
      text += `Mouse DPI: ${results.emulatorSensitivity.mouseDpi}\n`;
      text += `Emulador DPI: ${results.emulatorSensitivity.emulatorDpi}\n`;
      text += `X: ${results.emulatorSensitivity.x} | Y: ${results.emulatorSensitivity.y}\n`;
    } else {
      text += `[MOBILE]\n`;
      text += `DPI: ${results.dpi}\n`;
      text += `Geral: ${results.general}\n`;
      text += `Olhadinha: ${results.freeLook}\n`;
    }

    text += `[MIRAS]\n`;
    text += `Red Dot: ${results.redDot}\n`;
    text += `2x: ${results.scope2x} | 4x: ${results.scope4x}\n`;
    text += `AWM: ${results.sniper}\n`;
    text += `Botão: ${results.buttonSize}%\n`;
    
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSaveProfile = () => {
    if (!profileName.trim()) return;
    saveProfile(profileName, results);
    setShowSaveModal(false);
    alert("Perfil Salvo com Sucesso!");
  };

  const SensBar = ({ label, value, highlight }: { label: string, value: number, highlight?: boolean }) => {
    const percentage = Math.min(100, (value / 200) * 100);
    return (
      <div className={`mb-4 ${highlight ? 'order-first' : ''}`}>
        <div className="flex justify-between mb-1 items-end">
          <span className={`font-tech font-bold uppercase text-sm tracking-wider ${highlight ? 'text-yellow-400' : 'text-gray-400'}`}>
            {label} {highlight && '★'}
          </span>
          <span className={`font-mono font-bold text-lg ${value > 100 ? 'text-elite-accent' : 'text-white'}`}>
            {value}
          </span>
        </div>
        <div className="h-2 bg-gray-800 rounded-full overflow-hidden border border-white/5 relative">
          <div className="absolute left-1/4 h-full w-[1px] bg-white/5"></div>
          <div className="absolute left-1/2 h-full w-[1px] bg-white/5"></div>
          <div className="absolute left-3/4 h-full w-[1px] bg-white/5"></div>
          <div 
            className={`h-full rounded-full transition-all duration-1000 shadow-[0_0_10px_currentColor] ${highlight ? 'bg-yellow-500 text-yellow-500' : 'bg-elite-primary text-elite-primary'}`}
            style={{ width: `${percentage}%` }}
          />
        </div>
      </div>
    );
  };

  return (
    <div className="flex flex-col items-center min-h-screen w-full relative">
      
      {/* HEADER */}
      <div className="w-full bg-gradient-to-b from-elite-900 to-transparent p-6 pb-2 text-center sticky top-0 z-20 backdrop-blur-md border-b border-white/5">
        <div className="inline-flex items-center gap-2 bg-elite-primary/10 text-elite-primary px-3 py-1 rounded-full text-[10px] font-bold mb-2 border border-elite-primary/20 uppercase tracking-widest">
           {state.platform} • {state.playStyle}
        </div>
        <h2 className="text-2xl font-tech font-bold text-white drop-shadow-md">RESULTADO FINAL</h2>
      </div>

      <div className="w-full max-w-lg p-4 pb-32 space-y-6">

        {/* PRO BADGE */}
        <div className="w-full bg-gradient-to-r from-yellow-900/20 to-transparent border-l-4 border-yellow-500 p-4 rounded-r-xl flex items-center gap-4 shadow-lg backdrop-blur-sm relative overflow-hidden">
          {/* Watermark inside badge */}
          <div className="absolute right-[-10px] bottom-[-10px] text-white/5 font-tech font-bold text-4xl rotate-[-15deg]">@vitoriaq083</div>
          
          <div className="bg-yellow-500 p-2 rounded-lg text-black shadow-[0_0_15px_rgba(234,179,8,0.4)] relative z-10">
            <Medal size={24} />
          </div>
          <div className="relative z-10">
            <h3 className="text-yellow-500 font-bold font-tech text-lg tracking-wide">{results.proSimilarity}</h3>
            <p className="text-xs text-gray-400">Arquétipo competitivo identificado.</p>
          </div>
        </div>

        {/* EMULATOR CARD */}
        {isEmulator && results.emulatorSensitivity && (
          <div className="p-6 bg-white/5 rounded-2xl border border-white/10 relative overflow-hidden group">
             <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-transparent opacity-50"></div>
             {/* Watermark inside emulator card */}
             <div className="absolute top-2 right-2 text-[8px] text-white/10">@vitoriaq083</div>

             <div className="relative z-10 grid grid-cols-2 gap-8 text-center">
              <div>
                <div className="text-gray-400 text-[10px] uppercase font-bold mb-1">EIXO X (Lateral)</div>
                <div className="text-4xl font-mono font-bold text-white">{results.emulatorSensitivity.x.toFixed(2)}</div>
              </div>
              <div>
                <div className="text-yellow-500 text-[10px] uppercase font-bold mb-1">EIXO Y (Capa)</div>
                <div className="text-4xl font-mono font-bold text-yellow-400 drop-shadow-[0_0_10px_rgba(234,179,8,0.5)]">
                    {results.emulatorSensitivity.y.toFixed(2)}
                </div>
              </div>
            </div>
            <div className="relative z-10 mt-4 pt-4 border-t border-white/10 flex justify-between text-xs text-gray-400 font-mono">
                <span>MOUSE: {results.emulatorSensitivity.mouseDpi} DPI</span>
                <span>EMULADOR: {results.emulatorSensitivity.emulatorDpi} DPI</span>
            </div>
          </div>
        )}

        {/* SENSITIVITY GRID */}
        <div className="bg-elite-800/50 backdrop-blur-xl border border-white/10 rounded-2xl p-6 shadow-2xl relative overflow-hidden">
          {/* Watermark inside sens grid */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white/5 font-tech font-bold text-6xl rotate-[-45deg] pointer-events-none">@vitoriaq083</div>

          <div className="flex items-center gap-2 mb-6 border-b border-white/5 pb-2 relative z-10">
            <Crosshair size={16} className="text-elite-accent" />
            <h3 className="text-gray-300 text-xs font-bold uppercase tracking-widest">
              Calibragem de Mira
            </h3>
          </div>
          
          <div className="relative z-10">
            <SensBar label="Geral" value={results.general} />
            <SensBar label="Red Dot (Ponto)" value={results.redDot} highlight={isApostado} />
            <SensBar label="Mira 2x" value={results.scope2x} />
            <SensBar label="Mira 4x" value={results.scope4x} />
            <SensBar label="AWM (Sniper)" value={results.sniper} />
            {!isEmulator && <SensBar label="Olhadinha" value={results.freeLook} />}
          </div>

          <div className="mt-6 pt-4 border-t border-white/5 grid grid-cols-2 gap-4 relative z-10">
             <div className="bg-black/40 p-3 rounded-lg border border-white/5 text-center">
                <div className="text-[10px] text-gray-500 font-bold uppercase">DPI OTIMIZADA</div>
                <div className="text-xl font-mono font-bold text-elite-accent">{results.dpi}</div>
             </div>
             <div className="bg-black/40 p-3 rounded-lg border border-white/5 text-center">
                <div className="text-[10px] text-gray-500 font-bold uppercase">TAMANHO BOTÃO</div>
                <div className="text-xl font-mono font-bold text-white">{results.buttonSize}%</div>
             </div>
          </div>
        </div>

        {/* ANALYSIS REPORT */}
        <div className="p-4 bg-white/5 rounded-xl border border-white/10">
          <div className="flex items-center gap-2 mb-3 text-elite-primary font-bold text-xs uppercase tracking-widest">
             <BarChart3 size={14} /> Análise Técnica
          </div>
          <ul className="space-y-2">
            {results.analysisReport.map((line, i) => (
                <li key={i} className="text-xs text-gray-300 flex gap-2">
                    <span className="text-elite-accent mt-0.5">›</span> {line}
                </li>
            ))}
          </ul>
        </div>

        {/* ACTION BUTTONS */}
        <div className="grid grid-cols-2 gap-3">
            <Button variant="primary" onClick={handleCopy} disabled={copied}>
            <Copy size={18} /> {copied ? 'COPIADO!' : 'COPIAR CONFIG'}
            </Button>
            <Button variant="secondary" onClick={() => setShowSaveModal(true)}>
            <Save size={18} /> SALVAR PERFIL
            </Button>
        </div>
        
        <div className="grid grid-cols-2 gap-3">
            <Button variant="outline" onClick={onRegenerate} className="text-xs py-3 h-12">
            <RefreshCw size={14} /> RECALCULAR
            </Button>
            <Button variant="outline" onClick={onReset} className="text-xs py-3 h-12 text-gray-400 border-gray-700">
            <Home size={14} /> INÍCIO
            </Button>
        </div>

        {/* --- MONETIZATION SECTION --- */}
        <div className="pt-8 border-t border-white/10 mt-8 space-y-3">
             <p className="text-center text-[10px] uppercase tracking-widest text-gray-500 font-bold mb-2">
                Produtos Oficiais V-Elite
             </p>
             <a 
                href={WHATSAPP_LINK_SENS}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between bg-gradient-to-r from-yellow-600 to-yellow-500 p-4 rounded-xl shadow-lg hover:brightness-110 transition-all group"
            >
                <div className="flex items-center gap-3">
                    <div className="bg-black/20 p-2 rounded text-black">
                        <ShieldCheck size={24} />
                    </div>
                    <div className="text-left">
                        <div className="text-black font-bold font-tech text-md leading-none max-w-[200px]">SENSIBILIDADE GERADA POR HUMANO (MAIS CONFIG) – R$10</div>
                    </div>
                </div>
                <div className="bg-black/20 px-3 py-1 rounded text-black text-xs font-bold group-hover:bg-black/30">VER</div>
            </a>

            <a 
                href={WHATSAPP_LINK_REGEDIT}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between bg-gradient-to-r from-green-600 to-green-500 p-4 rounded-xl shadow-lg hover:brightness-110 transition-all group"
            >
                <div className="flex items-center gap-3">
                    <div className="bg-black/20 p-2 rounded text-white">
                        <Zap size={24} />
                    </div>
                    <div className="text-left">
                        <div className="text-white font-bold font-tech text-md leading-none max-w-[200px]">
                           REGEDIT FULL CAPA ANTI-BAN (EMULADOR)
                        </div>
                    </div>
                </div>
                <div className="bg-black/20 px-3 py-1 rounded text-white text-xs font-bold group-hover:bg-black/30">VER</div>
            </a>
            
             {/* Instagram Link */}
            <div className="mt-4 flex justify-center pb-4">
                <a 
                href="https://www.instagram.com/vitoriaq083/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-gray-500 hover:text-pink-500 transition-colors text-xs uppercase tracking-wider font-bold"
                >
                <Instagram size={14} /> Siga @vitoriaq083
                </a>
            </div>
        </div>

      </div>

      {/* SAVE MODAL */}
      {showSaveModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
            <div className="bg-elite-900 border border-white/10 p-6 rounded-2xl w-full max-w-sm shadow-2xl animate-in zoom-in-95 relative overflow-hidden">
                {/* Modal Watermark */}
                <div className="absolute bottom-2 right-2 text-white/5 text-[10px]">@vitoriaq083</div>
                
                <h3 className="text-xl font-tech font-bold text-white mb-4">Salvar Perfil</h3>
                <input 
                    type="text"
                    value={profileName}
                    onChange={(e) => setProfileName(e.target.value)}
                    placeholder="Nome do perfil (ex: Meu Xiaomi)"
                    className="w-full bg-black/50 border border-white/20 rounded-lg p-3 text-white mb-6 outline-none focus:border-elite-primary"
                    autoFocus
                />
                <div className="flex gap-3">
                    <Button variant="secondary" onClick={() => setShowSaveModal(false)} fullWidth>Cancelar</Button>
                    <Button variant="primary" onClick={handleSaveProfile} fullWidth>Salvar</Button>
                </div>
            </div>
        </div>
      )}

    </div>
  );
};