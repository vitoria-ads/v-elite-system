import React, { useEffect, useState } from "react";
import { LOADING_MESSAGES } from "../../constants";
import { Cpu } from "lucide-react";

interface Props {
  onComplete: () => void;
}

export const LoadingScreen: React.FC<Props> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [messageIndex, setMessageIndex] = useState(0);

  useEffect(() => {
    let value = 0;

    const interval = setInterval(() => {
      value += 20; // sobe rápido e controlado
      setProgress(value);

      if (value >= 100) {
        clearInterval(interval);
      }
    }, 120); // 120ms = rápido e suave

    const messageInterval = setInterval(() => {
      setMessageIndex((prev) => (prev + 1) % LOADING_MESSAGES.length);
    }, 300); // mensagens mais dinâmicas

    return () => {
      clearInterval(interval);
      clearInterval(messageInterval);
    };
  }, []);
  useEffect(() => {
    if (progress >= 100) {
      setTimeout(() => {
        onComplete();
      }, 500);
    }
  }, [progress, onComplete]);

  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] p-8 text-center relative overflow-hidden">
      {/* Background Watermark */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <span className="text-9xl font-tech font-bold text-white/[0.03] rotate-[-45deg] whitespace-nowrap">
          @vitoriaq083
        </span>
      </div>

      <div className="relative mb-8">
        <div className="absolute inset-0 bg-elite-primary/20 blur-xl rounded-full"></div>
        <Cpu
          size={64}
          className="text-elite-primary animate-pulse relative z-10"
        />
      </div>

      <h2 className="text-2xl font-tech font-bold text-white mb-2 relative z-10">
        CALIBRANDO SISTEMA
      </h2>

      <div className="h-12 flex items-center justify-center mb-8 relative z-10">
        <p className="text-elite-accent font-mono text-sm animate-fade-in transition-all">
          {">"} {LOADING_MESSAGES[messageIndex]}
        </p>
      </div>

      <div className="w-full max-w-md h-2 bg-gray-800 rounded-full overflow-hidden border border-white/10 relative z-10">
        <div
          className="h-full bg-gradient-to-r from-elite-primary to-elite-accent transition-all duration-200 ease-out shadow-[0_0_10px_rgba(6,182,212,0.5)]"
          style={{ width: `${progress}%` }}
        ></div>
      </div>

      <div className="mt-4 font-mono text-xs text-gray-500 relative z-10">
        {Math.round(progress)}% COMPLETE
      </div>

      <div className="absolute bottom-8 text-[10px] text-white/10 font-tech">
        AI ENGINE BY @vitoriaq083
      </div>
    </div>
  );
};
