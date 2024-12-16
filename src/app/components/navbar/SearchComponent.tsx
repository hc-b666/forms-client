import { useIntl } from "react-intl";
import { Input } from "../ui/input";

export function SearchComponent() {
  const intl = useIntl();

  return (
    <Input 
      className="w-[480px]" 
      placeholder={intl.formatMessage({ id: "navbar.search" })}
    />
  );
}
