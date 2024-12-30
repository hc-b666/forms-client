import { useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import { useTranslations } from "@/hooks/useTranslations";

export function GoBack({ className }: { className?: string }) {
  const navigate = useNavigate();
  const { t } = useTranslations();
  return (
    <Button
      className={`${className && className}`}
      onClick={() => navigate(-1)}
    >
      {t("goback")}
    </Button>
  );
}
