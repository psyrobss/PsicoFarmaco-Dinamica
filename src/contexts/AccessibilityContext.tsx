import React, { createContext, useContext, useState, useEffect } from 'react';

type FontSize = 'normal' | 'large' | 'xlarge';

interface AccessibilitySettings {
  fontSize: FontSize;
  highContrast: boolean;
  autoRead: boolean;
  speechRate: number;
  speechVolume: number;
}

interface AccessibilityContextType extends AccessibilitySettings {
  setFontSize: (size: FontSize) => void;
  setHighContrast: (enabled: boolean) => void;
  setAutoRead: (enabled: boolean) => void;
  setSpeechRate: (rate: number) => void;
  setSpeechVolume: (volume: number) => void;
}

const AccessibilityContext = createContext<AccessibilityContextType | undefined>(undefined);

export function AccessibilityProvider({ children }: { children: React.ReactNode }) {
  const [fontSize, setFontSizeState] = useState<FontSize>(() => {
    return (localStorage.getItem('a11y_fontSize') as FontSize) || 'normal';
  });
  
  const [highContrast, setHighContrastState] = useState<boolean>(() => {
    return localStorage.getItem('a11y_highContrast') === 'true';
  });
  
  const [autoRead, setAutoReadState] = useState<boolean>(() => {
    return localStorage.getItem('a11y_autoRead') === 'true';
  });

  const [speechRate, setSpeechRateState] = useState<number>(() => {
    const saved = localStorage.getItem('a11y_speechRate');
    return saved ? parseFloat(saved) : 1.3;
  });

  const [speechVolume, setSpeechVolumeState] = useState<number>(() => {
    const saved = localStorage.getItem('a11y_speechVolume');
    return saved ? parseFloat(saved) : 1.0;
  });

  const setFontSize = (size: FontSize) => {
    setFontSizeState(size);
    localStorage.setItem('a11y_fontSize', size);
  };

  const setHighContrast = (enabled: boolean) => {
    setHighContrastState(enabled);
    localStorage.setItem('a11y_highContrast', String(enabled));
  };

  const setAutoRead = (enabled: boolean) => {
    setAutoReadState(enabled);
    localStorage.setItem('a11y_autoRead', String(enabled));
  };

  const setSpeechRate = (rate: number) => {
    setSpeechRateState(rate);
    localStorage.setItem('a11y_speechRate', String(rate));
  };

  const setSpeechVolume = (volume: number) => {
    setSpeechVolumeState(volume);
    localStorage.setItem('a11y_speechVolume', String(volume));
  };

  useEffect(() => {
    const html = document.documentElement;
    html.classList.remove('text-size-normal', 'text-size-large', 'text-size-xlarge', 'theme-high-contrast');
    
    html.classList.add(`text-size-${fontSize}`);
    if (highContrast) {
      html.classList.add('theme-high-contrast');
    }
  }, [fontSize, highContrast]);

  return (
    <AccessibilityContext.Provider value={{
      fontSize, highContrast, autoRead, speechRate, speechVolume,
      setFontSize, setHighContrast, setAutoRead, setSpeechRate, setSpeechVolume
    }}>
      {children}
    </AccessibilityContext.Provider>
  );
}

export function useAccessibility() {
  const context = useContext(AccessibilityContext);
  if (context === undefined) {
    throw new Error('useAccessibility must be used within an AccessibilityProvider');
  }
  return context;
}
