import React from 'react';
import { Smartphone, Monitor, Apple } from 'lucide-react';
import { StepCard } from '../StepCard';
import { Platform } from '../../types';

interface Props {
  onSelect: (platform: Platform) => void;
}

export const PlatformSelect: React.FC<Props> = ({ onSelect }) => {
  const platforms: { id: Platform; label: string; icon: React.ReactNode; desc: string }[] = [
    {
      id: 'ANDROID',
      label: 'ANDROID',
      icon: <Smartphone size={40} />,
      desc: 'Samsung, Xiaomi, Motorola...'
    },
    {
      id: 'IPHONE',
      label: 'IPHONE (iOS)',
      icon: <Apple size={40} />,
      desc: 'iPhone 8 ao 15 Pro Max'
    },
    {
      id: 'EMULATOR',
      label: 'EMULADOR',
      icon: <Monitor size={40} />,
      desc: 'Bluestacks, MSI, LDPlayer'
    }
  ];

  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] p-4">
      <StepCard title="Plataforma" subtitle="Onde você joga Free Fire?">
        <div className="grid grid-cols-1 gap-4 mt-4">
          {platforms.map((p) => (
            <button
              key={p.id}
              onClick={() => onSelect(p.id)}
              className="group relative flex items-center p-6 bg-elite-900/50 border border-white/5 hover:border-elite-primary/50 rounded-xl transition-all hover:bg-elite-800 active:scale-[0.98] text-left shadow-lg overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-elite-primary/0 to-elite-primary/5 group-hover:to-elite-primary/20 transition-all" />
              <div className="mr-6 text-elite-accent group-hover:text-white transition-colors group-hover:scale-110 duration-300">
                {p.icon}
              </div>
              <div className="z-10">
                <h3 className="font-tech font-bold text-xl text-white tracking-wide">{p.label}</h3>
                <p className="text-sm text-gray-400">{p.desc}</p>
              </div>
              <div className="absolute right-4 opacity-0 group-hover:opacity-100 transition-opacity text-elite-primary font-bold text-2xl">
                &rarr;
              </div>
            </button>
          ))}
        </div>
      </StepCard>
    </div>
  );
};