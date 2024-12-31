import { NavLink } from "react-router-dom";
import { Menu } from "lucide-react";

import { SearchComponent } from "@/features/search/components/SearchComponent";
import { ModeToggle } from "./ModeToggle";
import { Button } from "@/components/ui/button";
import { LanguageDropdown } from "./LanguageDropdown";
import { useAuth } from "@/features/auth/hooks/useAuth";
import Logo from "../Logo";
import { useTranslations } from "@/hooks/useTranslations";

interface INavbar {
  setSidebar: React.Dispatch<React.SetStateAction<boolean>>;
}

export function Navbar({ setSidebar }: INavbar) {
  const { t } = useTranslations();
  const { isAuthenticated, user } = useAuth();

  return (
    <nav className="container py-3 flex items-center justify-between border-b">
      <Logo />

      <div className="flex items-center gap-3">
        <SearchComponent />

        <div className="hidden lg:flex items-center gap-4">
          {isAuthenticated ? (
            <div className="flex items-center gap-4">
              {user?.role === "ADMIN" && (
                <NavLink to="/admin" className="hover:underline">
                  {t("navbar.dashboard")}
                </NavLink>
              )}
              <NavLink to={`/profile/${user?.id}?tab=templates`} className="hover:underline">
                {user?.username}
              </NavLink>
            </div>
          ) : (
            <NavLink to="/login">
              <Button>{t("navbar.login")}</Button>
            </NavLink>
          )}
          <NavLink to="/templates" className="hover:underline">
            {t("navbar.templates")}
          </NavLink>
          <ModeToggle />
          <LanguageDropdown />
        </div>

        <Menu onClick={() => setSidebar(true)} className="lg:hidden" />
      </div>
    </nav>
  );
}
