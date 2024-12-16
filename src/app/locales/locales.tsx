import { createContext, useContext, useEffect, useState } from "react";

import en from "./en.json";
import ru from "./ru.json";

const locales = {
  EN: "en",
  RU: "ru",
};

export default locales;

export const localizationDictionaries = {
  [locales.EN]: en,
  [locales.RU]: ru,
};

type LocaleProviderState = {
  locale: string;
  setLocale: React.Dispatch<React.SetStateAction<string>>;
  onLocaleChange: (locale: string) => void;
};

const initialState: LocaleProviderState = {
  locale: locales.EN,
  setLocale: () => null,
  onLocaleChange: () => null,
};

const LocaleProviderContext = createContext<LocaleProviderState>(initialState);

interface ILocaleProvider {
  children: React.ReactNode;
}

export function LocaleProvider({ children }: ILocaleProvider) {
  const [locale, setLocale] = useState(() => {
    const locale = localStorage.getItem("locale");
    return locale ? locale : locales.EN;
  });

  const onLocaleChange = (locale: string) => {
    setLocale(locale);
    localStorage.setItem("locale", locale);
  };

  useEffect(() => {
    const locale = localStorage.getItem("locale");
    if (locale) setLocale(locale);
    else setLocale(locales.EN);
  }, []);

  return (
    <LocaleProviderContext.Provider value={{ locale, setLocale, onLocaleChange }}>
      {children}
    </LocaleProviderContext.Provider>
  );
}

export function useLocale() {
  return useContext(LocaleProviderContext);
}
