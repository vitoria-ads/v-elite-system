import React from 'react';
import { StepCard } from '../StepCard';
import { PlayStyle } from '../../types';
import { Button } from '../Button';
import { ChevronLeft, Crosshair, Target, Skull, Crown } from 'lucide-react';

interface Props {
  onSelect: (style: PlayStyle) => void;
  onBack: () => void;
}

export const PlayStyleSelect: React.FC<Props> = ({ onSelect, onBack }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] p-4">
      <StepCard title="Estilo de Jogo" subtitle="Como você joga?">
        <div className="grid grid-cols-1 gap-4">
          
          <button onClick={() => onSelect('CASUAL')} className="style-btn border-green-500/30 hover:bg-green-500/10">
            <Target className="text-green-500 mb-2" />
            <span className="font-bold">CASUAL</span>
            <span className="text-xs text-gray-400 mt-1">Diversão e Rankeada</span>
          </button>

          <button onClick={() => onSelect('BALANCEADO')} className="style-btn border-blue-500/30 hover:bg-blue-500/10">
            <Crosshair className="text-blue-500 mb-2" />
            <span className="font-bold">BALANCEADO</span>
            <span className="text-xs text-gray-400 mt-1">Preciso e Rápido</span>
          </button>

          <button onClick={() => onSelect('AGRESSIVO')} className="style-btn border-red-500/30 hover:bg-red-500/10">
            <Skull className="text-red-500 mb-2" />
            <span className="font-bold">AGRESSIVO (RUSH)</span>
            <span className="text-xs text-gray-400 mt-1">Sensibilidade Alta</span>
          </button>

          <div className="my-2 border-t border-white/10"></div>

          <button 
            onClick={() => onSelect('APOSTADO')} 
            className="relative overflow-hidden p-6 rounded-xl border-2 border-yellow-500 bg-yellow-500/5 hover:bg-yellow-500/20 transition-all flex flex-col items-center justify-center group shadow-[0_0_15px_rgba(234,179,8,0.2)]"
          >
            <div className="absolute top-0 right-0 bg-yellow-500 text-black text-[10px] font-bold px-2 py-1">
              RECOMENDADO
            </div>
            <Crown className="text-yellow-500 w-10 h-10 mb-2 group-hover:scale-110 transition-transform" />
            <span className="font-tech text-xl font-bold text-yellow-400 tracking-widest">MODO APOSTADO</span>
            <span className="text-xs text-yellow-200/70 mt-2 text-center">
              Foco 100% em UMP, XM8 e DESERT. <br/>Otimizado para campeonatos.
            </span>
          </button>

          <Button variant="secondary" onClick={onBack} fullWidth className="mt-4">
            <ChevronLeft size={20} /> Voltar
          </Button>
        </div>

        <style>{`
          .style-btn {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            padding: 1rem;
            border-radius: 0.75rem;
            background-color: rgba(17, 17, 24, 0.5);
            border-width: 1px;
            transition: all 0.3s ease;
          }
          .style-btn:hover {
            transform: translateY(-2px);
          }
        `}</style>
      </StepCard>
    </div>
  );
};