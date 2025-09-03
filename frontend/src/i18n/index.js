import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import en from "./en.json";
import ar from "./ar.json";

// Detect user's preferred language
const getDefaultLanguage = () => {
  const savedLang = localStorage.getItem('i18nextLng');
  if (savedLang) return savedLang;
  
  const browserLang = navigator.language || navigator.userLanguage;
  if (browserLang.startsWith('ar')) return 'ar';
  return 'en';
};

i18n.use(initReactI18next).init({
  resources: {
    en: { translation: en },
    ar: { translation: ar }
  },
  lng: getDefaultLanguage(),
  fallbackLng: "en",
  interpolation: { escapeValue: false },
  react: {
    useSuspense: false
  }
});

// Set initial document direction
const currentLang = i18n.language;
if (currentLang === 'ar') {
  document.documentElement.dir = 'rtl';
  document.documentElement.lang = 'ar';
} else {
  document.documentElement.dir = 'ltr';
  document.documentElement.lang = 'en';
}

// Listen for language changes and update document attributes
i18n.on('languageChanged', (lng) => {
  if (lng === 'ar') {
    document.documentElement.dir = 'rtl';
    document.documentElement.lang = 'ar';
  } else {
    document.documentElement.dir = 'ltr';
    document.documentElement.lang = 'en';
  }
  
  // Force re-render by dispatching a custom event
  window.dispatchEvent(new CustomEvent('languageChanged', { detail: { language: lng } }));
  
  // Update localStorage
  localStorage.setItem('i18nextLng', lng);
});

export default i18n;
