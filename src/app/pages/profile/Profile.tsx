import LoadingSpinner from "@/app/components/LoadingSpinner";
import { useGetTemplatesForUserQuery } from "@/app/services/templateApi";
import { TemplateComponent } from "./TemplateComponent";
import { useToast } from "@/app/hooks/use-toast";

export default function ProfilePage() {
  const { toast } = useToast();
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  const { data, isLoading, isError, isSuccess } = useGetTemplatesForUserQuery(user.id);

  if (isError) {
    toast({ variant: "destructive", description: "Something went wrong" });
  }

  return (
    <div className="container flex-grow">
      <h1 className="text-2xl font-semibold mb-5">Your templates ({isSuccess && data.length})</h1>
      <div className="flex flex-col gap-5">
        {isSuccess && data.length !== 0 ? (
          data.map((t) => <TemplateComponent t={t} key={t.id} />)
        ) : (
          <div>You do not have templates.</div>
        )}
      </div>
      {isLoading && <LoadingSpinner />}
    </div>
  );
}
