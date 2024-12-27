import { useParams } from "react-router-dom";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { UserFilledForms } from "./components/UserFilledForms";
import { useAuth } from "@/features/auth/hooks/useAuth";
import { UserProfile } from "./components/UserProfile";
import { ProfileTemplates } from "@/pages/Profile/components/ProfileTemplates";
import { PrivateTemplates } from "./components/PrivateTemplates";
import { PrivateAccessibleTemplates } from "./components/PrivateAccessibleTemplates";
import { useTranslations } from "@/hooks/useTranslations";

export default function ProfilePage() {
  const { userId } = useParams();
  const { user: currentUser } = useAuth();
  const { t } = useTranslations();

  return (
    <div className="container flex-grow flex flex-col md:grid grid-cols-4 xl:grid-cols-5 gap-20">
      <UserProfile userId={userId} />
      <Tabs defaultValue="templates" className="col-span-3 xl:col-span-4">
        <div className="overflow-x-auto">
          {currentUser?.id === parseInt(userId as string) && (
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
        <TabsContent value="templates">
          <ProfileTemplates userId={parseInt(userId as string)} />
        </TabsContent>
        <TabsContent value="private-templates">
          <PrivateTemplates />
        </TabsContent>
        <TabsContent value="forms" className="h-full">
          <UserFilledForms />
        </TabsContent>
        <TabsContent value="private-accessible-templates">
          <PrivateAccessibleTemplates />
        </TabsContent>
      </Tabs>
    </div>
  );
}
