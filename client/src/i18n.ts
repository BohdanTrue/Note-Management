import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

i18n
  .use(initReactI18next)
  .use(LanguageDetector)
  .init({
    fallbackLng: 'en',
    debug: true,
    resources: {
      en: {
        translation: {
          languageEN: "English",
          languageUA: "Ukrainian",
          enterNote: "Enter your note..."
        }
      },
      ua: {
        translation: {
          languageEN: "Англійська",
          languageUA: "Українська",
          enterNote: "Введіть своє завдання..."
        }
      }
    }
  });

export default i18n;
