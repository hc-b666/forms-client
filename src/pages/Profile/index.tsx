import { useParams } from "react-router-dom";
import { useIntl } from "react-intl";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { UserFilledForms } from "@/features/forms/components/UserFilledForms";
import { useAuth } from "@/features/auth/hooks/useAuth";
import { UserProfile } from "@/features/users/components/UserProfile";
import { ProfileTemplates } from "@/features/templates/components/ProfileTemplates";

export default function ProfilePage() {
  const { userId } = useParams();
  const { user: currentUser } = useAuth();
  const intl = useIntl();

  return (
    <div className="container flex-grow flex flex-col md:grid grid-cols-4 gap-20">
      <UserProfile userId={userId} />
      <Tabs defaultValue="templates" className="col-span-3">
        {currentUser?.id === parseInt(userId as string) && (
          <TabsList className="grid w-full grid-cols-2 mb-5">
            <TabsTrigger value="templates">
              {intl.formatMessage({ id: "profilepage.templates" })}
            </TabsTrigger>
            <TabsTrigger value="forms">
              {intl.formatMessage({ id: "profilepage.filledoutforms" })}
            </TabsTrigger>
          </TabsList>
        )}
        <TabsContent value="templates">
          <ProfileTemplates userId={parseInt(userId as string)} />
        </TabsContent>
        <TabsContent value="forms" className="h-full">
          <UserFilledForms />
        </TabsContent>
      </Tabs>
    </div>
  );
}
