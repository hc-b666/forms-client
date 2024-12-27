import { useEffect } from "react";
import { NavLink } from "react-router-dom";
import { Moon, Sun, X } from "lucide-react";

import { useAuth } from "@/features/auth/hooks/useAuth";
import { useTheme } from "@/app/providers/ThemeProvider";
import { useLocale } from "@/app/providers/LocaleProvider";
import locales from "@/locales/i18n";
import Logo from "./Logo";
import { Button } from "../ui/button";
import { DropdownMenu, DropdownMenuTrigger } from "../ui/dropdown-menu";
import { DropdownMenuContent, DropdownMenuItem } from "../ui/dropdown-menu";
import { useTranslations } from "@/hooks/useTranslations";

interface ISidebar {
  sidebar: boolean;
  setSidebar: React.Dispatch<React.SetStateAction<boolean>>;
}

export function Sidebar({ sidebar, setSidebar }: ISidebar) {
  const { t } = useTranslations();
  const { isAuthenticated, user } = useAuth();
  const { setTheme } = useTheme();
  const { locale, onLocaleChange } = useLocale();

  useEffect(() => {
    if (sidebar) document.body.classList.add("no-scroll");
    else document.body.classList.remove("no-scroll");

    return () => document.body.classList.remove("no-scroll");
  }, [sidebar, setSidebar]);

  return (
    <>
      {sidebar && (
        <div onClick={() => setSidebar(false)} className="fixed inset-0 bg-black/75 z-40" />
      )}

      <aside className={`${sidebar ? "w-3/4 p-5" : "w-0"} absolute top-0 right-0 h-screen z-50 shadow bg-white dark:bg-zinc-950 duration-500`}>
        {sidebar && (
          <div className="h-full flex flex-col gap-10">
            <div className="flex items-center justify-between">
              <Logo />
              <X onClick={() => setSidebar(false)} />
            </div>

            <div className="flex flex-col gap-3">
              <NavLink to="/">
                {t("sidebar.home")}
              </NavLink>
              <NavLink to="/search">
                {t("sidebar.search")}
              </NavLink>
              <NavLink to="/templates">
                {t("sidebar.templates")}
              </NavLink>
              {user?.role === "ADMIN" && (
                <NavLink to="/admin">
                  {t("sidebar.dashboard")}
                </NavLink>
              )}
            </div>

            <div className="flex flex-col gap-3">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button className="w-full">
                  <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                  <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                  <span className="sr-only">Toggle Theme</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-64">
                  <DropdownMenuItem onClick={() => setTheme("light")}>
                    Light
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setTheme("dark")}>
                    Dark
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setTheme("system")}>
                    System
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button className="w-full">
                    <span>{locale === "en" ? "English" : "Русский"}</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-64">
                  {Object.entries(locales).map(([key, value]) => (
                    <DropdownMenuItem key={key} onClick={() => onLocaleChange(value)}>
                      {value === "en" ? "English" : "Русский"}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>     

              {isAuthenticated ? (
                <>
                  <NavLink to={`/profile/${user?.id}`} className="hover:underline">
                    <Button className="w-full">
                      {user?.email}
                    </Button>
                  </NavLink>
                </>
              ) : (
                <NavLink to="/login">
                  <Button className="w-full">
                    {t("navbar.login")}
                  </Button>
                </NavLink>
              )}
            </div>
          </div>
        )}
      </aside>
    </>
  );
}
