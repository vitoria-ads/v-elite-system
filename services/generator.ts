import { AppState, SensitivityResult } from "../types";

// ==========================================
// V-ELITE ENGINE 3.6 (HARD CLAMP FIXED)
// ==========================================

const clamp = (val: number, min: number, max: number) =>
  Math.min(max, Math.max(min, val));

const round = (val: number) => Math.round(val);
const randomFloat = (min: number, max: number) =>
  Math.random() * (max - min) + min;

// ✅ HUMANIZE + CLAMP FINAL (CRITICAL FIX)
const humanizeClamp = (value: number, min: number, max: number) => {
  if (value === 0) return 0;
  const noisy = value + round(randomFloat(-4, 4));
  return clamp(noisy, min, max);
};

export const generateSensitivity = (state: AppState): SensitivityResult => {
  const { platform, tech, accessibility, playStyle, device } = state;
  const analysisReport: string[] = [];

  const drift = randomFloat(0.94, 1.06);

  let general = 100;
  let redDot = 100;
  let x2 = 100;
  let x4 = 100;
  let awm = 50;
  let freeLook = 50;
  let finalDpi = 0;
  let emuConfig: any = undefined;

  // ================= MOBILE =================
  if (platform === "ANDROID" || platform === "IPHONE") {
    const isHighEnd =
      device.model?.toLowerCase().includes("rog") ||
      device.model?.toLowerCase().includes("ultra") ||
      device.model?.toLowerCase().includes("pro max");

    const isIphone = platform === "IPHONE";

    // DPI
    if (isIphone) {
      finalDpi = tech.iosCursorSpeed;
      analysisReport.push(`iOS Cursor: ${finalDpi}`);
    } else {
      let baseDpi = isHighEnd ? 580 : 411;

      if (accessibility === "BAIXA") baseDpi = 390;
      if (accessibility === "MEDIA") baseDpi = 450;
      if (accessibility === "ALTA") baseDpi = 580;
      if (playStyle === "APOSTADO") baseDpi += 100;

      if (!tech.useAiDpi && tech.currentDpi > 100) {
        baseDpi = tech.currentDpi;
      } else {
        baseDpi += round(randomFloat(-15, 15));
      }

      finalDpi = clamp(round(baseDpi), 320, 1440);
    }

    // BASE SENS
    let baseSens = 95;
    if (playStyle === "BALANCEADO") baseSens = 130;
    if (playStyle === "AGRESSIVO") baseSens = 165;
    if (playStyle === "APOSTADO") baseSens = 185;

    if (accessibility === "BAIXA") baseSens *= 0.85;
    if (accessibility === "ALTA") baseSens *= 1.15;

    baseSens *= drift;

    if (!isIphone && finalDpi > 600) baseSens *= 0.92;
    if (isIphone) baseSens = clamp(baseSens * 0.9, 80, 200);

    general = clamp(round(baseSens), 50, 200);
    redDot = clamp(round(general * 0.95 * randomFloat(0.98, 1.02)), 50, 200);
    x2 = clamp(round(general * 0.96 * randomFloat(0.98, 1.02)), 50, 200);
    x4 = clamp(round(general * 1.05 * randomFloat(0.98, 1.02)), 50, 200);
    awm = clamp(round(general * 0.45 * drift), 20, 100);
    freeLook = clamp(round(65 * drift), 40, 100);
  }

  // ================= EMULATOR =================
  else if (platform === "EMULATOR") {
    const mouseDpi = tech.currentDpi || 800;
    const emuDpi =
      playStyle === "APOSTADO" || accessibility === "ALTA" ? 440 : 240;

    let xBase = (800 / mouseDpi) * randomFloat(0.92, 1.08);
    if (playStyle === "AGRESSIVO") xBase += 0.2;
    if (accessibility === "ALTA") xBase += 0.15;
    if (accessibility === "BAIXA") xBase -= 0.1;

    let yRatio = 0.5;
    if (playStyle === "APOSTADO") yRatio = 0.65;
    if (accessibility === "ALTA") yRatio += 0.08;
    yRatio *= randomFloat(0.95, 1.05);

    let yBase = xBase * yRatio;

    xBase = clamp(xBase, 0.4, 4);
    yBase = clamp(yBase, 0.3, 3);

    emuConfig = {
      x: parseFloat(xBase.toFixed(2)),
      y: parseFloat(yBase.toFixed(2)),
      emulatorDpi: emuDpi,
      mouseDpi,
      yRatio: parseFloat(yRatio.toFixed(2)),
    };

    general = 0;
    redDot = clamp(round(20 * drift), 10, 50);
    x2 = clamp(round(30 * drift), 15, 60);
    x4 = clamp(round(30 * drift), 15, 60);
    awm = clamp(round(10 * drift), 5, 40);
    freeLook = 50;

    finalDpi = mouseDpi;
  }

  // ================= RETURN =================
  return {
    id: crypto.randomUUID(),
    timestamp: Date.now(),
    platform,
    general: platform === "EMULATOR" ? 0 : humanizeClamp(general, 0, 200),
    redDot: humanizeClamp(redDot, 0, 200),
    scope2x: humanizeClamp(x2, 0, 200),
    scope4x: humanizeClamp(x4, 0, 200),
    sniper: humanizeClamp(awm, 0, 200),
    freeLook,
    dpi: finalDpi,
    buttonSize: clamp(round(randomFloat(42, 58)), 40, 60),
    fireButtonPosition: "Baixo",
    proSimilarity: getProName(playStyle),
    analysisReport,
    emulatorSensitivity: emuConfig,
  };
};

const getProName = (style: any) => {
  if (style === "APOSTADO") return "INSTAPLAYER (STYLE WHITE444)";
  if (style === "AGRESSIVO") return "RUSHER (STYLE BAK)";
  if (style === "CASUAL") return "CASUAL (STYLE CEROL)";
  return "BALANCEADO (STYLE NOBRU)";
};
