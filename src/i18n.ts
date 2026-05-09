import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

i18n.use(initReactI18next).init({
  resources: {
    tr: {
      translation: {
        selectLanguage: 'Dil Seçiniz',
        welcomeMessage: "MedKit'e Hoş Geldiniz",
        startButton: 'Başla',
      },
    },
    en: {
      translation: {
        selectLanguage: 'Select Language',
        welcomeMessage: 'Welcome to MedKit',
        startButton: 'Start',
      },
    },
    fr: {
      translation: {
        selectLanguage: 'Choisir la langue',
        welcomeMessage: 'Bienvenue sur MedKit',
        startButton: 'Commencer',
      },
    },
    de: {
      translation: {
        selectLanguage: 'Sprache wählen',
        welcomeMessage: 'Willkommen bei MedKit',
        startButton: 'Starten',
      },
    },
    el: {
      translation: {
        selectLanguage: 'Επιλέξτε γλώσσα',
        welcomeMessage: 'Καλώς ήρθατε στο MedKit',
        startButton: 'Έναρξη',
      },
    },
  },
  lng: 'tr',
  fallbackLng: 'en',
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
