import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { cnAuth, enAuth } from './auth';
import { cnCommon, enCommon } from './common';
import { cnOcr, enOcr } from './ocr';
export const cnDict = {
  ...cnCommon,
  ...cnAuth,
  ...cnOcr,
}

type Dictionary = typeof cnDict;

export const enDict: Dictionary = {
  ...enCommon,
  ...enAuth,
  ...enOcr,
}

export const Dict = Object.keys(cnDict).reduce(
  (indexes, index) => {
    indexes[index] = index;
    return indexes;
  },
  {} as Dictionary
);

i18n.use(initReactI18next).init({
  debug: false,
  fallbackLng: "cn",
  interpolation: {
    escapeValue: false // not needed for react as it escapes by default
  },
  lng: "cn",
  resources: {
    cn: {
      translation: cnDict
    },
    en: {
      translation: enDict
    }
  }
});

export { i18n };
export default i18n;