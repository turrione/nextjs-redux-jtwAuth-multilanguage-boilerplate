import { useContext } from 'react';
import { LocaleContext } from '../context/LocaleContext';
import strings from '../translations/strings';
import { defaultLocale } from '../translations/config';


export default function useTranslation() {
  // here I make locale default to the defaultLocale value 
  const { locale = defaultLocale } = useContext(LocaleContext);

  function t(key) {
    const pathArr = [locale, ...key.split(".")];
    const translation = pathArr.reduce((obj, path) => {
      return (obj || {})[path];
    }, strings);
    if (!translation) {
      console.warn(`Translation '${key}' for locale '${locale}' not found.`);
    }
    return translation || "";
  }

  return {
    t,
    locale,
  };
}