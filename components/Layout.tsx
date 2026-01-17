import React from 'react';

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-elite-900 text-white flex flex-col relative overflow-hidden font-sans selection:bg-elite-primary selection:text-white">
      {/* Premium Background Ambience */}
      <div className="fixed inset-0 pointer-events-none z-0 bg-black">
        <div className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] bg-elite-primary/10 rounded-full blur-[120px] animate-pulse-fast" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[600px] h-[600px] bg-elite-accent/10 rounded-full blur-[120px]" />
        
        {/* Grid Texture */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,#000_70%,transparent_100%)]" />
        
        {/* Global Watermark (Background) */}
        <div className="absolute bottom-20 right-[-20px] rotate-[-45deg] text-9xl font-tech font-bold text-white/[0.02] pointer-events-none whitespace-nowrap select-none">
          @vitoriaq083
        </div>
      </div>

      {/* Main Content */}
      <main className="flex-1 flex flex-col z-10 relative w-full max-w-lg mx-auto shadow-2xl min-h-screen border-x border-white/5 bg-black/40 backdrop-blur-sm">
        {children}
        
        {/* Discrete Footer Signature */}
        <div className="absolute bottom-1 w-full text-center py-2 pointer-events-none z-20">
          <p className="text-[10px] text-white/10 font-tech uppercase tracking-widest">
            Desenvolvido por @vitoriaq083
          </p>
        </div>
      </main>
    </div>
  );
};