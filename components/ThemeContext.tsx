import React, { createContext, useContext, useState, useEffect } from 'react';
import { ThemeSettings } from '../types';

interface ThemeContextType {
  settings: ThemeSettings;
  updateSettings: (newSettings: Partial<ThemeSettings>) => void;
}

const defaultSettings: ThemeSettings = {
  primaryColor: '#ef4444', // Red-500
  darkMode: false,
  headingFont: 'Poppins',
  bodyFont: 'Inter',
};

const ThemeContext = createContext<ThemeContextType>({
  settings: defaultSettings,
  updateSettings: () => {},
});

export const useTheme = () => useContext(ThemeContext);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [settings, setSettings] = useState<ThemeSettings>(defaultSettings);

  useEffect(() => {
    const root = document.documentElement;
    
    // Apply Colors
    root.style.setProperty('--color-primary', settings.primaryColor);
    
    // Apply Fonts
    root.style.setProperty('--font-heading', settings.headingFont);
    root.style.setProperty('--font-body', settings.bodyFont);

    // Apply Dark Mode
    if (settings.darkMode) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [settings]);

  const updateSettings = (newSettings: Partial<ThemeSettings>) => {
    setSettings(prev => ({ ...prev, ...newSettings }));
  };

  return (
    <ThemeContext.Provider value={{ settings, updateSettings }}>
      {children}
    </ThemeContext.Provider>
  );
};
