import { useState } from "react";
import { IntlProvider } from "react-intl";

import { useLocale } from "@/app/providers/LocaleProvider";
import { Router } from "./router";
import { Navbar } from "@/components/common/navbar/Navbar";
import { Toaster } from "@/components/ui/toaster";
import Footer from "@/components/common/Footer";
import { Sidebar } from "@/components/common/Sidebar";
import { localizationDictionaries } from "@/locales/i18n";

export function App() {
  const { locale } = useLocale();
  const [sidebar, setSidebar] = useState(false);

  return (
    <IntlProvider locale={locale} messages={localizationDictionaries[locale]}>
      <main className="w-full h-screen flex flex-col gap-5">
        <Navbar setSidebar={setSidebar} />
        <Sidebar sidebar={sidebar} setSidebar={setSidebar} />
        <Router />
        <Footer />
      </main>
      <Toaster />
    </IntlProvider>
  );
}
