import { Router } from "./router";
import { Navbar } from "./components/navbar/Navbar";

export function App() {
  return (
    <main className="w-full h-screen flex flex-col gap-10">
      <Navbar />
      <Router />
    </main>
  );
}
