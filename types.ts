export type Platform = 'ANDROID' | 'IPHONE' | 'EMULATOR' | null;
export type AccessibilityLevel = 'BAIXA' | 'MEDIA' | 'ALTA' | null;
export type PlayStyle = 'CASUAL' | 'BALANCEADO' | 'AGRESSIVO' | 'APOSTADO' | null;

export interface DeviceConfig {
  brand?: string;
  model?: string;
  refreshRate?: number; // Hz
}

export interface TechConfig {
  useAiDpi: boolean;
  currentDpi: number; // DPI do aparelho (Android) ou Mouse DPI (Emulador)
  iosCursorSpeed: number; // iOS only
  mouseDpi?: number; // Explicit for emulator
}

export interface SensitivityResult {
  id: string; // Unique ID for saving
  timestamp: number;
  platform: Platform;
  
  // Mobile Fields
  general: number;
  redDot: number;
  scope2x: number;
  scope4x: number;
  sniper: number;
  freeLook: number; // OLHADINHA OBRIGATÓRIA
  dpi: number; // DPI Final sugerida
  buttonSize: number;
  fireButtonPosition: string;

  // Emulator Fields (Separated)
  emulatorSensitivity?: {
    x: number;
    y: number;
    emulatorDpi: number; // Internal Emulator DPI
    mouseDpi: number; // Physical Mouse DPI
    yRatio: number; // Engineering metric
  };

  // Analysis
  proSimilarity: string;
  analysisReport: string[];
}

export interface SavedProfile {
  id: string;
  name: string;
  date: string;
  result: SensitivityResult;
}

export interface AppState {
  view: 'HOME' | 'WIZARD' | 'PROFILES' | 'RESULTS'; // Better navigation state
  step: number;
  platform: Platform;
  device: DeviceConfig;
  tech: TechConfig;
  accessibility: AccessibilityLevel;
  playStyle: PlayStyle;
  currentResult: SensitivityResult | null;
}