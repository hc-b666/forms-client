import { useState } from "react";
import { IntlProvider } from "react-intl";

import { localizationDictionaries, useLocale } from "./locales/locales";
import { Router } from "./router";
import { Navbar } from "./components/navbar/Navbar";
import { Toaster } from "./components/ui/toaster";
import Footer from "./components/Footer";
import { Sidebar } from "./components/Sidebar";

export function App() {
  const { locale } = useLocale();
  const [sidebar, setSidebar] = useState(false);

  return (
    <IntlProvider locale={locale} messages={localizationDictionaries[locale]}>
      <main className="w-full h-screen flex flex-col gap-10">
        <Navbar setSidebar={setSidebar} />
        <Sidebar sidebar={sidebar} setSidebar={setSidebar} />
        <Router />
        <Footer />
      </main>
      <Toaster />
    </IntlProvider>
  );
}
