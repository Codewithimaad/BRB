import { useTranslation } from "react-i18next";
import { useEffect } from "react";

export default function LanguageSwitcher({ scrolled = false }) {
  const { i18n } = useTranslation();

  const toggleLanguage = () => {
    const newLang = i18n.language === "ar" ? "en" : "ar";
    i18n.changeLanguage(newLang);

    // Update HTML attributes for RTL/LTR
    if (newLang === "ar") {
      document.documentElement.dir = "rtl";
      document.documentElement.lang = "ar";
    } else {
      document.documentElement.dir = "ltr";
      document.documentElement.lang = "en";
    }

    // Persist in localStorage
    localStorage.setItem("i18nextLng", newLang);

    // Dispatch event so other components can listen
    window.dispatchEvent(
      new CustomEvent("languageChanged", { detail: { language: newLang } })
    );
  };

  // Ensure correct dir/lang on first load
  useEffect(() => {
    if (i18n.language === "ar") {
      document.documentElement.dir = "rtl";
      document.documentElement.lang = "ar";
    } else {
      document.documentElement.dir = "ltr";
      document.documentElement.lang = "en";
    }
  }, [i18n.language]);

  return (
    <button
      onClick={toggleLanguage}
      className={`px-4 py-2 text-xl font-bold text-transparent bg-clip-text transition-all duration-300 
        ${
          scrolled
            ? "bg-gradient-to-r from-green-500 to-green-700 hover:from-green-600 hover:to-green-800"
            : "bg-gradient-to-r from-green-400 to-green-700 hover:from-green-500 hover:to-green-800"
        }`}
    >
      {i18n.language === "ar" ? "English" : "العربية"}
    </button>
  );
}
