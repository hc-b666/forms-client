import { useParams } from "react-router-dom";

import LoadingSpinner from "@/app/components/LoadingSpinner";
import { useGetTemplatesForUserQuery } from "@/app/services/templateApi";
import { TemplateComponent } from "./TemplateComponent";
import { useToast } from "@/app/hooks/use-toast";
import { useAppContext } from "@/app/AppProvider";

export default function ProfilePage() {
  const { userId } = useParams();
  const { toast } = useToast();
  const { user } = useAppContext();

  const { data, isLoading, isError, isSuccess } = useGetTemplatesForUserQuery(userId);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (isError) {
    toast({ variant: "destructive", description: "Something went wrong" });
  }

  return (
    isSuccess && (
      <div className="container flex-grow grid grid-cols-4 gap-20">
        <div className="col-span-1">
          <h3>{data.user.firstName} {data.user.lastName}</h3>
          <h3>Email: {data.user.email}</h3>
          <h3>Username: {data.user.username}</h3>
        </div>
        <div className="col-span-3">
          <h1 className="text-2xl font-semibold mb-5">
            {user?.id === data.user.id ? "Your" : "Their"} templates (
            {data.templates.length})
          </h1>
          <div className="flex flex-col gap-5">
            {data.templates.length !== 0 ? (
              data.templates.map((t) => (
                <TemplateComponent
                  t={t}
                  key={t.id}
                  isAuthor={user?.id === data.user.id}
                />
              ))
            ) : (
              <div>
                {user?.id === data.user.id ? "You" : "They"} do not have
                templates.
              </div>
            )}
          </div>
        </div>
      </div>
    )
  );
}
