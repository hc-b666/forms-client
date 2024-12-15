import { IntlProvider } from "react-intl";

import { localizationDictionaries, useLocale } from "./locales/locales";
import { Router } from "./router";
import { Navbar } from "./components/navbar/Navbar";
import { Toaster } from "./components/ui/toaster";

export function App() {
  const { locale } = useLocale();

  return (
    <IntlProvider locale={locale} messages={localizationDictionaries[locale]} >
      <main className="w-full h-screen flex flex-col gap-10">
        <Navbar />
        <Router />
        <Toaster />
      </main>
    </IntlProvider>
  );
}
