import { useParams, useSearchParams } from "react-router-dom";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuth } from "@/features/auth/hooks/useAuth";
import { useTranslations } from "@/hooks/useTranslations";

import { UserProfile } from "./components/UserProfile";
import { PublicTemplates } from "@/pages/Profile/components/PublicTemplates";
import { PrivateTemplates } from "./components/PrivateTemplates";
import { FilledForms } from "./components/FilledForms";
import { AccessibleTemplates } from "./components/AccessibleTemplates";

export default function ProfilePage() {
  const { userId } = useParams();
  const { user: currentUser } = useAuth();
  const { t } = useTranslations();
  const [searchParams, setSearchParams] = useSearchParams();
  const currentTab = searchParams.get("tab") || "templates";

  const handleTabChange = (value: string) => {
    setSearchParams((prev) => {
      const newParams = new URLSearchParams(prev);
      newParams.set("tab", value);
      return newParams;
    });
  };

  return (
    <div className="container flex-grow flex flex-col md:grid grid-cols-4 xl:grid-cols-5 gap-10 xl:gap-20">
      <UserProfile userId={userId} />

      <Tabs value={currentTab} onValueChange={handleTabChange} className="col-span-3 xl:col-span-4">
        <div className="overflow-x-auto">
          {(currentUser?.id === parseInt(userId as string) || currentUser?.role === "ADMIN") && (
            <TabsList className="grid w-full min-w-[920px] grid-cols-4 mb-5">
              <TabsTrigger value="templates">
                {t("profilepage.templates")}
              </TabsTrigger>
              <TabsTrigger value="private-templates">
                {t("profilepage.private-templates")}
              </TabsTrigger>
              <TabsTrigger value="forms">
                {t("profilepage.filledout-forms")}
              </TabsTrigger>
              <TabsTrigger value="private-accessible-templates">
                {t("profilepage.private-accessible-templates")}
              </TabsTrigger>
            </TabsList>
          )}
        </div>

        <TabsContent value="templates" className="h-full">
          <PublicTemplates />
        </TabsContent>
        <TabsContent value="private-templates">
          <PrivateTemplates />
        </TabsContent>
        <TabsContent value="forms" className="h-full">
          <FilledForms />
        </TabsContent>
        <TabsContent value="private-accessible-templates">
          <AccessibleTemplates />
        </TabsContent>
      </Tabs>
    </div>
  );
}
