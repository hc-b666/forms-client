import { useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import { useTranslations } from "@/hooks/useTranslations";

export function GoBack() {
  const navigate = useNavigate();
  const { t } = useTranslations();
  return <Button onClick={() => navigate(-1)}>{t("goback")}</Button>;
}
