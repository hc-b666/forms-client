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
