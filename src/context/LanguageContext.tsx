import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Language } from '../types';
import {
  t,
  getCropName,
  getVehicleName,
  getMarketName,
  getRegionName,
  localizeNumber,
} from '../utils/translations';

type TriString = { mr: string; hi: string; en: string };

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
  tr: (value: TriString) => string;
  ln: (value: number | string) => string;
  getCropName: (cropKey: string) => string;
  getVehicleName: (vehicleKey: string) => string;
  getMarketName: (marketKey: string) => string;
  getRegionName: (regionKey: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('mr'); // Default language: Marathi

  const value: LanguageContextType = {
    language,
    setLanguage,
    t: (key: string) => t(key, language),
    tr: (value: TriString) => value[language],
    ln: (value: number | string) => localizeNumber(value, language),
    getCropName: (cropKey: string) => getCropName(cropKey, language),
    getVehicleName: (vehicleKey: string) => getVehicleName(vehicleKey, language),
    getMarketName: (marketKey: string) => getMarketName(marketKey, language),
    getRegionName: (regionKey: string) => getRegionName(regionKey, language),
  };

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
