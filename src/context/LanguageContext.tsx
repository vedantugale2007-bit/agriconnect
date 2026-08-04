import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Language } from '../types';
import { t, getCropName, getVehicleName, getMarketName } from '../utils/translations';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
  getCropName: (cropKey: string) => string;
  getVehicleName: (vehicleKey: string) => string;
  getMarketName: (marketKey: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('mr'); // Default language: Marathi

  const translate = (key: string) => t(key, language);
  const translateCrop = (cropKey: string) => getCropName(cropKey, language);
  const translateVehicle = (vehicleKey: string) => getVehicleName(vehicleKey, language);
  const translateMarket = (marketKey: string) => getMarketName(marketKey, language);

  return (
    <LanguageContext.Provider
      value={{
        language,
        setLanguage,
        t: translate,
        getCropName: translateCrop,
        getVehicleName: translateVehicle,
        getMarketName: translateMarket,
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
