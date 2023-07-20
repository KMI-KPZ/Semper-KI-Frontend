import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import Backend from "i18next-http-backend";
import translationEN from "@locals/en/translation.json";
import translationDE from "@locals/de/translation.json";

i18n
  // i18next-http-backend
  // loads translations from your server
  // https://github.com/i18next/i18next-http-backend
  .use(Backend)
  // detect user language
  // learn more: https://github.com/i18next/i18next-browser-languageDetector
  .use(LanguageDetector)
  // pass the i18n instance to react-i18next.
  .use(initReactI18next)
  // init i18next
  // for all options read: https://www.i18next.com/overview/configuration-options
  .init({
    supportedLngs: ["de","en"],
    lng: "de",
    fallbackLng: "de",
    detection: {
        order: ["cookie", "htmlTag", "localStorage", "path", "subdomain"],
        caches: ["cookie"],
      },
    resources: {
          de: { translation: translationDE },
          en: { translation: translationEN },
      },
  });

export default i18n;
