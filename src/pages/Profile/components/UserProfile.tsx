import { MoonLoader } from "react-spinners";
import { useGetUserByIdQuery } from "../services";
import { Mail, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTranslations } from "@/hooks/useTranslations";
import { useAuth } from "@/features/auth/hooks/useAuth";

export function UserProfile({ userId }: { userId: string | undefined }) {
  const { data, isLoading, isSuccess } = useGetUserByIdQuery(userId);
  const { t } = useTranslations();
  const { user, logout } = useAuth();

  return (
    <div className="col-span-1 flex justify-center">
      {isLoading && <MoonLoader color="green" />}
      {isSuccess && (
        <div className="w-full flex flex-col">
          <h3 className="text-xl font-bold">
            {data.firstName} {data.lastName}
          </h3>
          <h3 className="flex items-center gap-1">
            <Mail className="w-4" /> {data.email}
          </h3>
          <h3 className="flex items-center gap-1">
            <User className="w-4" />
            {data.username}
          </h3>
          {user?.id === parseInt(userId as string) && (
            <Button onClick={logout} className="mt-5">
              {t("navbar.logout")}
            </Button>
          )}
        </div>
      )}
    </div>
  );
}
