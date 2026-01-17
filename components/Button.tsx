import React from 'react';
import { Loader2 } from 'lucide-react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'danger' | 'gold';
  isLoading?: boolean;
  fullWidth?: boolean;
}

export const Button: React.FC<ButtonProps> = ({ 
  children, 
  variant = 'primary', 
  isLoading, 
  fullWidth, 
  className = '', 
  ...props 
}) => {
  const baseStyles = "relative overflow-hidden font-tech font-bold uppercase tracking-wider transition-all duration-300 flex items-center justify-center gap-2 py-4 px-6 rounded-lg shadow-lg active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed";
  
  const variants = {
    primary: "bg-gradient-to-r from-elite-primary to-violet-500 text-white hover:shadow-violet-500/50 border border-violet-400/20",
    secondary: "bg-elite-700 text-white hover:bg-elite-600 border border-white/10",
    outline: "bg-transparent border-2 border-elite-primary text-elite-primary hover:bg-elite-primary/10",
    danger: "bg-gradient-to-r from-red-600 to-red-500 text-white hover:shadow-red-500/30",
    gold: "bg-gradient-to-r from-yellow-600 via-yellow-500 to-yellow-600 text-black hover:shadow-yellow-500/50 border border-yellow-400"
  };

  const widthClass = fullWidth ? "w-full" : "";

  return (
    <button 
      className={`${baseStyles} ${variants[variant]} ${widthClass} ${className}`}
      disabled={isLoading || props.disabled}
      {...props}
    >
      {/* Glossy effect overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-white/10 to-transparent pointer-events-none" />
      
      {isLoading ? (
        <>
          <Loader2 className="w-5 h-5 animate-spin" />
          <span>Processando...</span>
        </>
      ) : children}
    </button>
  );
};