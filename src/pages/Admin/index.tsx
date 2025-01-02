import { useTranslations } from "@/hooks/useTranslations";
import { UsersTable } from "@/pages/Admin/components/UsersTable";
import { useEffect } from "react";

export default function AdminPage() {
  const { t } = useTranslations();

  useEffect(() => {
    document.title = "Forms | Admin Dashboard";
  }, []);

  return (
    <div className="container flex-grow">
      <h1 className="text-xl font-semibold mb-5">{t("admin.title")}</h1>

      <UsersTable />
    </div>
  );
}
