import React, { createContext, useContext, useState, useEffect } from 'react';
import { Language, ThemePalette } from '../types';

interface AppContextType {
  lang: Language;
  setLang: (lang: Language) => void;
  theme: ThemePalette;
  setTheme: (theme: ThemePalette) => void;
  isDark: boolean;
  setIsDark: (dark: boolean) => void;
  taglineIndex: number;
  setTaglineIndex: (idx: number) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [lang, setLang] = useState<Language>('vi');
  const [theme, setTheme] = useState<ThemePalette>('spring');
  const [isDark, setIsDark] = useState<boolean>(true);
  const [taglineIndex, setTaglineIndex] = useState<number>(0);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    document.documentElement.classList.toggle('dark', isDark);
  }, [theme, isDark]);

  return (
    <AppContext.Provider
      value={{
        lang,
        setLang,
        theme,
        setTheme,
        isDark,
        setIsDark,
        taglineIndex,
        setTaglineIndex,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
