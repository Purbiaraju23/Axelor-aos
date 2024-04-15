import React from "react";
import i18next from "i18next";
import { initReactI18next, I18nextProvider } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

import en from "../assets/locales/en/translations.json";
import fr from "../assets/locales/fr/translations.json";

const i18n = i18next.createInstance();

i18n
  .use(initReactI18next)
  .use(LanguageDetector)
  .init({
    fallbackLng: "en",
    resources: {
      en: { translation: en },
      fr: { translation: fr },
    },
    interpolation: {
      escapeValue: false,
    },
  });

export function Translate({ children }) {
  return <I18nextProvider i18n={i18n}>{children}</I18nextProvider>;
}

export { useTranslation } from "react-i18next";

export default Translate;
