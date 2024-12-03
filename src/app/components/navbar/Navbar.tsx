import { Link } from "react-router-dom";

import { ModeToggle } from "../ModeToggle";

export function Navbar() {
  return (
    <nav className="container py-3 flex items-center justify-between border-b">
      <Link to={"/"} className="text-xl font-semibold">Customizable Forms</Link>
      <ModeToggle />
    </nav>
  );
};
