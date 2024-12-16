import { Button } from "@/app/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/app/components/ui/dropdown-menu";
import { capitalize } from "@/app/lib/stringUtils";
import locales, { useLocale } from "@/app/locales/locales";

export function LanguageDropdown() {
  const { locale, onLocaleChange } = useLocale();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon">
          <span>{capitalize(locale)}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {Object.entries(locales).map(([key, value]) => (
          <DropdownMenuItem key={key} onClick={() => onLocaleChange(value)}>
            {capitalize(value)}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
