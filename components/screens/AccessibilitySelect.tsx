import React from 'react';
import { StepCard } from '../StepCard';
import { AccessibilityLevel } from '../../types';
import { Button } from '../Button';
import { ChevronLeft, Zap, Shield, Activity } from 'lucide-react';

interface Props {
  onSelect: (level: AccessibilityLevel) => void;
  onBack: () => void;
}

export const AccessibilitySelect: React.FC<Props> = ({ onSelect, onBack }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] p-4">
      <StepCard title="Tipo de Sensibilidade" subtitle="Qual seu perfil de movimentação?">
        <div className="space-y-4">
          
          <button
            onClick={() => onSelect('BAIXA')}
            className="w-full group relative p-5 rounded-xl bg-elite-900 border border-white/10 hover:border-blue-500 hover:bg-elite-800 transition-all text-left"
          >
            <div className="flex items-center gap-4">
              <Shield className="text-blue-500 w-8 h-8" />
              <div>
                <h3 className="font-tech font-bold text-lg text-white">SENSIBILIDADE BAIXA</h3>
                <p className="text-xs text-gray-400">Movimentos controlados. Foco em estabilidade e menos tremedeira.</p>
              </div>
            </div>
          </button>

          <button
            onClick={() => onSelect('MEDIA')}
            className="w-full group relative p-5 rounded-xl bg-elite-900 border border-white/10 hover:border-yellow-500 hover:bg-elite-800 transition-all text-left"
          >
            <div className="flex items-center gap-4">
              <Activity className="text-yellow-500 w-8 h-8" />
              <div>
                <h3 className="font-tech font-bold text-lg text-white">SENSIBILIDADE MÉDIA</h3>
                <p className="text-xs text-gray-400">Padrão competitivo. Equilíbrio perfeito entre velocidade e precisão.</p>
              </div>
            </div>
          </button>

          <button
            onClick={() => onSelect('ALTA')}
            className="w-full group relative p-5 rounded-xl bg-elite-900 border border-white/10 hover:border-red-500 hover:bg-elite-800 transition-all text-left"
          >
            <div className="flex items-center gap-4">
              <Zap className="text-red-500 w-8 h-8" />
              <div>
                <h3 className="font-tech font-bold text-lg text-white">SENSIBILIDADE ALTA</h3>
                <p className="text-xs text-gray-400">Movimentação rápida (Instaplayer). Subida de capa agressiva.</p>
              </div>
            </div>
          </button>

          <Button variant="secondary" onClick={onBack} fullWidth className="mt-4">
            <ChevronLeft size={20} /> Voltar
          </Button>
        </div>
      </StepCard>
    </div>
  );
};