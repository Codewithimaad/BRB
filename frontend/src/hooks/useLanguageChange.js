import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

export const useLanguageChange = () => {
  const { i18n } = useTranslation();
  const [currentLanguage, setCurrentLanguage] = useState(i18n.language);

  useEffect(() => {
    const handleLanguageChange = (event) => {
      const { language } = event.detail;
      setCurrentLanguage(language);
    };

    // Listen for custom language change events
    window.addEventListener('languageChanged', handleLanguageChange);
    
    // Listen for i18n language changes
    const handleI18nLanguageChange = (lng) => {
      setCurrentLanguage(lng);
    };

    i18n.on('languageChanged', handleI18nLanguageChange);

    return () => {
      window.removeEventListener('languageChanged', handleLanguageChange);
      i18n.off('languageChanged', handleI18nLanguageChange);
    };
  }, [i18n]);

  return currentLanguage;
};



