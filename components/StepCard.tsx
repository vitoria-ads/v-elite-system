import React from 'react';

interface StepCardProps {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}

export const StepCard: React.FC<StepCardProps> = ({ title, subtitle, children }) => {
  return (
    <div className="flex-1 flex flex-col w-full max-w-md mx-auto p-4 animate-in fade-in slide-in-from-bottom-8 duration-500">
      <div className="mb-6 text-center">
        <h2 className="text-3xl font-tech font-bold text-transparent bg-clip-text bg-gradient-to-r from-elite-accent to-elite-primary uppercase tracking-widest drop-shadow-md">
          {title}
        </h2>
        {subtitle && <p className="text-gray-400 text-sm mt-2">{subtitle}</p>}
      </div>
      
      <div className="bg-elite-800/50 backdrop-blur-md border border-white/10 rounded-2xl p-6 shadow-2xl flex-1 flex flex-col">
        {children}
      </div>
    </div>
  );
};