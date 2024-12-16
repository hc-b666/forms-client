import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

import "@/index.css";
import { persistor, store } from "@/app/store.ts";
import { ThemeProvider } from "@/app/providers/ThemeProvider";
import { LocaleProvider } from "@/app/providers/LocaleProvider";
import { App } from "@/app/App.tsx";
import LoadingSpinner from "@/components/common/LoadingSpinner";

createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <Provider store={store}>
      <PersistGate loading={<LoadingSpinner />} persistor={persistor}>
        <ThemeProvider>
          <LocaleProvider>
            <App />
          </LocaleProvider>
        </ThemeProvider>
      </PersistGate>
    </Provider>
  </BrowserRouter>
);
