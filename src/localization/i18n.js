import i18next from 'i18next';
import {initReactI18next} from 'react-i18next';
import English from './eng.json';
import Vietnamese from './viet.json';
import Korea from './korea.json';

const resources = {
  eng: {
    translation: English,
  },
  vie: {
    translation: Vietnamese,
  },
  korea: {
    translation: Korea,
  },
};

i18next.use(initReactI18next).init({
  compatibilityJSON: 'v3',
  resources,
  lng: 'vie',
  debug: true,
  fallbackLng: 'en',
  interpolation: {
    escapeValue: false,
  },
  react: {
    useSuspense: false,
  },
});

export default i18next;
