import React, { useState } from 'react';
import { Layout } from './components/Layout';
import { AppState, DeviceConfig, TechConfig, Platform, AccessibilityLevel, PlayStyle, SensitivityResult } from './types';
import { SplashScreen } from './components/screens/SplashScreen';
import { ProfilesScreen } from './components/screens/ProfilesScreen';
import { PlatformSelect } from './components/screens/PlatformSelect';
import { DeviceSelect } from './components/screens/DeviceSelect';
import { TechBase } from './components/screens/TechBase';
import { AccessibilitySelect } from './components/screens/AccessibilitySelect';
import { PlayStyleSelect } from './components/screens/PlayStyleSelect';
import { LoadingScreen } from './components/screens/LoadingScreen';
import { ResultsScreen } from './components/screens/ResultsScreen';
import { generateSensitivity } from './services/generator';

export default function App() {
  const [state, setState] = useState<AppState>({
    view: 'HOME',
    step: 0,
    platform: null,
    device: {},
    tech: {
      useAiDpi: true,
      currentDpi: 411,
      iosCursorSpeed: 100,
    },
    accessibility: null,
    playStyle: null,
    currentResult: null
  });

  // Navigation Logic
  const startWizard = () => setState(prev => ({ ...prev, view: 'WIZARD', step: 1 }));
  const openProfiles = () => setState(prev => ({ ...prev, view: 'PROFILES' }));
  const goHome = () => setState(prev => ({ 
    ...prev, 
    view: 'HOME', 
    step: 0,
    platform: null,
    device: {},
    currentResult: null
  }));

  const nextStep = () => setState(prev => ({ ...prev, step: prev.step + 1 }));
  const prevStep = () => setState(prev => ({ ...prev, step: prev.step - 1 }));

  // State Updaters
  const updatePlatform = (platform: Platform) => {
    setState(prev => ({ ...prev, platform }));
    nextStep();
  };

  const updateDevice = (device: DeviceConfig) => {
    setState(prev => ({ ...prev, device }));
    nextStep();
  };

  const updateTech = (tech: TechConfig) => {
    setState(prev => ({ ...prev, tech }));
    nextStep();
  };

  const updateAccessibility = (level: AccessibilityLevel) => {
    setState(prev => ({ ...prev, accessibility: level }));
    nextStep();
  };

  const updatePlayStyle = (style: PlayStyle) => {
    setState(prev => ({ ...prev, playStyle: style }));
    nextStep();
  };

  const handleFinishLoading = () => {
    // Generate fresh results
    const results = generateSensitivity(state);
    setState(prev => ({ ...prev, view: 'RESULTS', currentResult: results }));
  };

  const loadSavedProfile = (result: SensitivityResult) => {
    // Hydrate state from result (partial) and show result
    setState(prev => ({
        ...prev,
        platform: result.platform,
        view: 'RESULTS',
        currentResult: result
    }));
  };

  const renderContent = () => {
    if (state.view === 'HOME') {
      return <SplashScreen onStart={startWizard} onOpenProfiles={openProfiles} />;
    }

    if (state.view === 'PROFILES') {
      return <ProfilesScreen onBack={goHome} onLoadProfile={loadSavedProfile} />;
    }

    if (state.view === 'RESULTS' && state.currentResult) {
      return (
        <ResultsScreen 
            results={state.currentResult} 
            state={state} 
            onReset={goHome} 
            onRegenerate={() => setState(prev => ({ ...prev, view: 'WIZARD', step: 6 }))} // Go to loading
        />
      );
    }

    if (state.view === 'WIZARD') {
      switch (state.step) {
        case 1:
          return <PlatformSelect onSelect={updatePlatform} />;
        case 2:
          return <DeviceSelect platform={state.platform} onSelect={updateDevice} onBack={prevStep} />;
        case 3:
          return <TechBase platform={state.platform} onSave={updateTech} onBack={prevStep} />;
        case 4:
          return <PlayStyleSelect onSelect={updatePlayStyle} onBack={prevStep} />; // Swapped order for better UX
        case 5:
          return <AccessibilitySelect onSelect={updateAccessibility} onBack={prevStep} />;
        case 6:
          return <LoadingScreen onComplete={handleFinishLoading} />;
        default:
          return <SplashScreen onStart={startWizard} onOpenProfiles={openProfiles} />;
      }
    }
  };

  return (
    <Layout>
      {renderContent()}
    </Layout>
  );
}