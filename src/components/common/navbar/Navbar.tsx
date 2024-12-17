import { Link, NavLink } from "react-router-dom";
import { useIntl } from "react-intl";
import { Menu, Rotate3d } from "lucide-react";

import { SearchComponent } from "./SearchComponent";
import { ModeToggle } from "./ModeToggle";
import { Button } from "@/components/ui/button";
import { LanguageDropdown } from "./LanguageDropdown";
import { useAuth } from "@/features/auth/hooks/useAuth";

interface INavbar {
  setSidebar: React.Dispatch<React.SetStateAction<boolean>>;
}

export function Navbar({ setSidebar }: INavbar) {
  const intl = useIntl();
  const { isAuthenticated, user, logout } = useAuth();

  return (
    <nav className="container py-3 flex items-center justify-between border-b">
      <Link to={"/"} className="text-xl font-semibold flex items-center gap-1">
        <Rotate3d />
        Forms
      </Link>

      <SearchComponent />

      <div className="hidden md:flex items-center gap-4">
        {isAuthenticated ? (
          <div className="flex items-center gap-4">
            <NavLink to={`/profile/${user?.id}`} className="hover:underline">
              {user?.username}
            </NavLink>
            <Button onClick={logout}>
              {intl.formatMessage({ id: "navbar.logout" })}
            </Button>
          </div>
        ) : (
          <NavLink to="/login">
            <Button>
              {intl.formatMessage({ id: "navbar.login" })}
            </Button>
          </NavLink>
        )}
        <ModeToggle />
        <LanguageDropdown />
      </div>
        
      <Menu onClick={() => setSidebar(true)} className="md:hidden" />        
    </nav>
  );
}
