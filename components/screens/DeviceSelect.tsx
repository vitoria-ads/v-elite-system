import React, { useState } from 'react';
import { StepCard } from '../StepCard';
import { Platform, DeviceConfig } from '../../types';
import { ANDROID_BRANDS, ANDROID_MODELS, IOS_MODELS, EMULATORS } from '../../constants';
import { Button } from '../Button';
import { ChevronLeft } from 'lucide-react';

interface Props {
  platform: Platform;
  onSelect: (device: DeviceConfig) => void;
  onBack: () => void;
}

export const DeviceSelect: React.FC<Props> = ({ platform, onSelect, onBack }) => {
  const [selectedBrand, setSelectedBrand] = useState<string>('');

  // EMULATOR FLOW
  if (platform === 'EMULATOR') {
    return (
      <div className="flex flex-col items-center justify-center min-h-[80vh] p-4">
        <StepCard title="Emulador" subtitle="Qual software você utiliza?">
          <div className="space-y-3">
            {EMULATORS.map((emu) => (
              <button
                key={emu}
                onClick={() => onSelect({ brand: "Emulator", model: emu })}
                className="w-full text-left p-4 rounded-lg bg-elite-900 border border-white/10 hover:border-elite-accent/50 hover:bg-elite-800 transition-all font-tech text-lg"
              >
                {emu}
              </button>
            ))}
          </div>
          <Button variant="secondary" onClick={onBack} className="mt-6 w-full">
            <ChevronLeft size={20} /> Voltar
          </Button>
        </StepCard>
      </div>
    );
  }

  // IOS FLOW
  if (platform === 'IPHONE') {
    return (
      <div className="flex flex-col items-center justify-center min-h-[80vh] p-4">
        <StepCard title="Modelo iOS" subtitle="Selecione seu dispositivo Apple">
          <div className="space-y-2 max-h-[60vh] overflow-y-auto pr-2 custom-scrollbar">
            {IOS_MODELS.map((model) => (
              <button
                key={model.name}
                onClick={() => onSelect({ brand: "Apple", model: model.name, refreshRate: model.hz })}
                className="w-full flex justify-between items-center p-4 rounded-lg bg-elite-900 border border-white/10 hover:border-elite-accent/50 hover:bg-elite-800 transition-all group"
              >
                <span className="font-tech text-lg">{model.name}</span>
                <span className="text-xs bg-white/10 px-2 py-1 rounded text-elite-accent font-bold group-hover:bg-elite-accent group-hover:text-black transition-colors">
                  {model.hz}Hz
                </span>
              </button>
            ))}
          </div>
          <Button variant="secondary" onClick={onBack} className="mt-6 w-full">
             <ChevronLeft size={20} /> Voltar
          </Button>
        </StepCard>
      </div>
    );
  }

  // ANDROID FLOW
  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] p-4">
      <StepCard 
        title={selectedBrand ? "Modelo" : "Marca"} 
        subtitle={selectedBrand ? `Qual modelo da ${selectedBrand}?` : "Selecione a fabricante"}
      >
        {!selectedBrand ? (
          <div className="grid grid-cols-2 gap-3">
            {ANDROID_BRANDS.map((brand) => (
              <button
                key={brand}
                onClick={() => setSelectedBrand(brand)}
                className="p-4 rounded-lg bg-elite-900 border border-white/10 hover:border-elite-primary/50 hover:bg-elite-800 transition-all font-tech font-bold text-center"
              >
                {brand}
              </button>
            ))}
             <button
                onClick={() => setSelectedBrand("Outros")}
                className="p-4 rounded-lg bg-elite-900 border border-white/10 hover:border-elite-primary/50 hover:bg-elite-800 transition-all font-tech font-bold text-center col-span-2"
              >
                OUTROS / GENÉRICO
              </button>
          </div>
        ) : (
          <div className="space-y-3 max-h-[50vh] overflow-y-auto custom-scrollbar">
            {(ANDROID_MODELS[selectedBrand] || ["Modelo Padrão", "Modelo Pro", "Modelo Ultra", "Outro"]).map((model) => (
              <button
                key={model}
                onClick={() => onSelect({ brand: selectedBrand, model: model })}
                className="w-full text-left p-4 rounded-lg bg-elite-900 border border-white/10 hover:border-elite-accent/50 hover:bg-elite-800 transition-all font-tech"
              >
                {model}
              </button>
            ))}
          </div>
        )}

        <div className="mt-6 pt-4 border-t border-white/5">
          {selectedBrand ? (
            <Button variant="secondary" onClick={() => setSelectedBrand('')} fullWidth>
               <ChevronLeft size={20} /> Trocar Marca
            </Button>
          ) : (
            <Button variant="secondary" onClick={onBack} fullWidth>
               <ChevronLeft size={20} /> Voltar
            </Button>
          )}
        </div>
      </StepCard>
    </div>
  );
};