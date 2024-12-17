import { useNavigate, useParams } from "react-router-dom";

import LoadingSpinner from "@/components/common/LoadingSpinner";
import { useGetProfileQuery } from "@/features/templates/services/templateApi";
import { TemplateComponent } from "./TemplateComponent";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/features/auth/hooks/useAuth";
import { useDispatch } from "react-redux";

export default function ProfilePage() {
  const { userId } = useParams();
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { data, isLoading, isError, isSuccess } = useGetProfileQuery(userId);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (isError) {
    dispatch(logout());
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
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-semibold mb-5">
              {user?.id === data.user.id ? "Your" : "Their"} templates (
              {data.templates.length})
            </h1>
            {user?.id === data.user.id && (
              <Button onClick={() => navigate("/create-template")}>Create Template</Button>
            )}
          </div>
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
