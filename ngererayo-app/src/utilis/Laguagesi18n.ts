import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

// Import JSON translations
import en from "../languages/english/translation.json";
import rw from "../languages/kinya/translation.json";
import fr from "../languages/french/translation.json";

i18n
  .use(LanguageDetector) // Detects browser language automatically
  .use(initReactI18next)
  .init({
    fallbackLng: "en", // Default language
    debug: true,
    interpolation: {
      escapeValue: false,
    },
    resources: {
      en: { translation: en },
      rw: { translation: rw },
      fr: { translation: fr },
    },
  });

export default i18n;
