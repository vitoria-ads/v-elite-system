import React, { useEffect, useState } from 'react';
import { StepCard } from '../StepCard';
import { SavedProfile, SensitivityResult } from '../../types';
import { getProfiles, deleteProfile } from '../../services/storage';
import { Button } from '../Button';
import { ChevronLeft, Trash2, Smartphone, Monitor, ChevronRight } from 'lucide-react';

interface Props {
  onBack: () => void;
  onLoadProfile: (result: SensitivityResult) => void;
}

export const ProfilesScreen: React.FC<Props> = ({ onBack, onLoadProfile }) => {
  const [profiles, setProfiles] = useState<SavedProfile[]>([]);

  useEffect(() => {
    setProfiles(getProfiles());
  }, []);

  const handleDelete = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    deleteProfile(id);
    setProfiles(getProfiles());
  };

  return (
    <div className="flex flex-col items-center min-h-screen p-4 pt-12">
      <StepCard title="Meus Perfis" subtitle="Configurações salvas">
        <div className="space-y-4 mt-4 min-h-[50vh]">
          {profiles.length === 0 ? (
            <div className="text-center py-12 text-gray-500 border-2 border-dashed border-white/5 rounded-xl">
              <p>Nenhum perfil salvo.</p>
              <p className="text-xs mt-2">Faça uma calibração para salvar.</p>
            </div>
          ) : (
            profiles.map((p) => (
              <div 
                key={p.id}
                onClick={() => onLoadProfile(p.result)}
                className="group relative flex items-center justify-between p-4 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 hover:border-elite-primary/50 transition-all cursor-pointer"
              >
                <div className="flex items-center gap-4">
                  <div className={`p-3 rounded-lg ${p.result.platform === 'EMULATOR' ? 'bg-purple-500/20 text-purple-400' : 'bg-cyan-500/20 text-cyan-400'}`}>
                    {p.result.platform === 'EMULATOR' ? <Monitor size={20} /> : <Smartphone size={20} />}
                  </div>
                  <div>
                    <h3 className="font-tech font-bold text-white text-lg">{p.name}</h3>
                    <p className="text-xs text-gray-400">{p.date} • {p.result.proSimilarity}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  <button 
                    onClick={(e) => handleDelete(e, p.id)}
                    className="p-2 hover:bg-red-500/20 text-gray-500 hover:text-red-500 rounded-full transition-colors z-10"
                  >
                    <Trash2 size={18} />
                  </button>
                  <ChevronRight className="text-gray-600 group-hover:text-white transition-colors" />
                </div>
              </div>
            ))
          )}
        </div>
        
        <Button variant="secondary" onClick={onBack} fullWidth className="mt-6">
          <ChevronLeft size={20} /> Voltar
        </Button>
      </StepCard>
    </div>
  );
};