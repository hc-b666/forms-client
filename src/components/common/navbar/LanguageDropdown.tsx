import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import locales from "@/locales/i18n";
import { useLocale } from "@/app/providers/LocaleProvider";

export function LanguageDropdown() {
  const { locale, onLocaleChange } = useLocale();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">
          <span>{locale === "en" ? "English" : "Русский" }</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {Object.entries(locales).map(([key, value]) => (
          <DropdownMenuItem key={key} onClick={() => onLocaleChange(value)}>
            {value === "en" ? "English" : "Русский" }
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
