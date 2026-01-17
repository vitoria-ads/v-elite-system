import React from 'react';
import { Target, Crosshair, Trophy, Zap, ShieldCheck, ExternalLink, Instagram } from 'lucide-react';
import { Button } from '../Button';
import { WHATSAPP_LINK_SENS, WHATSAPP_LINK_REGEDIT } from '../../constants';

interface Props {
  onStart: () => void;
  onOpenProfiles: () => void;
}

export const SplashScreen: React.FC<Props> = ({ onStart, onOpenProfiles }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-8 text-center space-y-8 relative overflow-hidden">
      
      {/* Decorative Background Elements */}
      <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-elite-primary/10 to-transparent pointer-events-none" />

      {/* Hero Section */}
      <div className="relative group z-10 mt-4">
        <div className="absolute -inset-8 bg-elite-primary/20 rounded-full blur-2xl animate-pulse-fast"></div>
        <div className="relative bg-gradient-to-br from-gray-900 to-black p-10 rounded-3xl border border-elite-primary/30 shadow-[0_0_50px_rgba(109,40,217,0.3)] transform transition-transform hover:scale-105 duration-500">
          <Target size={80} className="text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.5)]" />
          <Crosshair size={32} className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-elite-accent animate-[spin_5s_linear_infinite]" />
        </div>
      </div>

      <div className="space-y-4 z-10">
        <h1 className="text-6xl font-tech font-bold tracking-tighter text-white drop-shadow-lg">
          V-ELITE
          <span className="block text-3xl tracking-[0.2em] text-transparent bg-clip-text bg-gradient-to-r from-elite-accent to-elite-primary mt-2">
            SYSTEM 2026
          </span>
        </h1>
        <p className="text-gray-400 text-sm uppercase tracking-widest font-bold">
          Inteligência Artificial de Calibragem
        </p>
      </div>

      {/* Actions */}
      <div className="w-full max-w-xs space-y-4 z-10">
        <Button onClick={onStart} fullWidth variant="primary" className="h-16 text-xl shadow-[0_0_30px_rgba(109,40,217,0.4)] border-none">
          INICIAR CALIBRAÇÃO
        </Button>
        
        <Button onClick={onOpenProfiles} fullWidth variant="secondary" className="bg-transparent border border-white/20 hover:bg-white/5">
          <Trophy size={18} /> MEUS PERFIS SALVOS
        </Button>
      </div>

      {/* Premium Products Teaser (New) */}
      <div className="w-full max-w-xs z-10 pt-4 border-t border-white/5 mt-4">
         <p className="text-[10px] text-gray-500 uppercase font-bold tracking-widest mb-3">Soluções Profissionais</p>
         
         <div className="space-y-2">
           <a 
              href={WHATSAPP_LINK_SENS} 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-3 p-3 rounded-xl bg-gradient-to-r from-yellow-500/10 to-transparent border border-yellow-500/20 hover:border-yellow-500/50 hover:bg-yellow-500/20 transition-all group cursor-pointer"
           >
              <div className="bg-yellow-500/20 p-2 rounded-lg text-yellow-500 group-hover:text-yellow-400">
                <ShieldCheck size={18} />
              </div>
              <div className="flex-1 text-left">
                <div className="text-white font-tech font-bold text-sm leading-none">SENSIBILIDADE VIP</div>
                <div className="text-[10px] text-yellow-500/70 font-bold mt-0.5">Gerada por Humano • R$10</div>
              </div>
              <ExternalLink size={14} className="text-gray-500 group-hover:text-white" />
           </a>

           <a 
              href={WHATSAPP_LINK_REGEDIT} 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-3 p-3 rounded-xl bg-gradient-to-r from-green-500/10 to-transparent border border-green-500/20 hover:border-green-500/50 hover:bg-green-500/20 transition-all group cursor-pointer"
           >
              <div className="bg-green-500/20 p-2 rounded-lg text-green-500 group-hover:text-green-400">
                <Zap size={18} />
              </div>
              <div className="flex-1 text-left">
                <div className="text-white font-tech font-bold text-sm leading-none">REGEDIT ANTI-BAN</div>
                <div className="text-[10px] text-green-500/70 font-bold mt-0.5">Full Capa • Emulador</div>
              </div>
              <ExternalLink size={14} className="text-gray-500 group-hover:text-white" />
           </a>
         </div>

         {/* Instagram Link */}
         <div className="mt-6 flex justify-center">
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

      <div className="absolute bottom-2 text-[10px] text-gray-600 font-mono">
        SECURE CONNECTION • V4.5.1
      </div>
    </div>
  );
};