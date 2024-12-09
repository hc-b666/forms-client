import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";

import "./index.css";
import { store } from "@/app/store.ts";
import { ThemeProvider } from "@/app/components/ThemeProvider.tsx";
import { AppProvider } from "./app/AppProvider";
import { App } from "@/app/App.tsx";

createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <Provider store={store}>
      <ThemeProvider>
        <AppProvider>
          <App />
        </AppProvider>
      </ThemeProvider>
    </Provider>
  </BrowserRouter>
);
