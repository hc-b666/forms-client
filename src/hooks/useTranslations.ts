import { useIntl } from "react-intl";

export function useTranslations() {
  const intl = useIntl();

  return {
    t: (id: string) => intl.formatMessage({ id }),
  };
}
