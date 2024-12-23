import { useParams } from "react-router-dom";
import { useIntl } from "react-intl";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { UserFilledForms } from "./components/UserFilledForms";
import { useAuth } from "@/features/auth/hooks/useAuth";
import { UserProfile } from "@/features/users/components/UserProfile";
import { ProfileTemplates } from "@/pages/Profile/components/ProfileTemplates";
import { PrivateTemplates } from "./components/PrivateTemplates";
import { PrivateAccessibleTemplates } from "./components/PrivateAccessibleTemplates";

export default function ProfilePage() {
  const { userId } = useParams();
  const { user: currentUser } = useAuth();
  const intl = useIntl();

  return (
    <div className="container flex-grow flex flex-col md:grid grid-cols-4 gap-20">
      <UserProfile userId={userId} />
      <Tabs defaultValue="templates" className="col-span-3">
        <div className="overflow-x-auto">
          {currentUser?.id === parseInt(userId as string) && (
            <TabsList className="grid w-full min-w-[800px] grid-cols-4 mb-5">
              <TabsTrigger value="templates">
                {intl.formatMessage({ id: "profilepage.templates" })}
              </TabsTrigger>
              <TabsTrigger value="private-templates">
                Private Templates
              </TabsTrigger>
              <TabsTrigger value="forms">
                {intl.formatMessage({ id: "profilepage.filledoutforms" })}
              </TabsTrigger>
              <TabsTrigger value="private-accessible-templates">
                Private Accessible templates
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
