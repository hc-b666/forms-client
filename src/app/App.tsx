import { Router } from "./router";
import { Navbar } from "./components/navbar/Navbar";
import { Toaster } from "./components/ui/toaster";

export function App() {
  return (
    <main className="w-full h-screen flex flex-col gap-10">
      <Navbar />
      <Router />
      <Toaster />
    </main>
  );
}
