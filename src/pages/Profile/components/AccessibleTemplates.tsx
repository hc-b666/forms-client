import { useParams } from "react-router-dom";

import { useGetAccessibleTemplatesQuery } from "../services";
import { useAuth } from "@/features/auth/hooks/useAuth";
import { ErrorMessage } from "@/pages/error/Error";

import { TemplatesTable } from "./TemplatesTable";

export function AccessibleTemplates() {
  const { userId } = useParams();
  const { user } = useAuth();

  const { data, isLoading, isError, isSuccess, error } =
    useGetAccessibleTemplatesQuery(userId);

  if (isError) {
    return <ErrorMessage error={error} />;
  }

  return (
    <TemplatesTable
      data={data}
      isLoading={isLoading}
      isError={isError}
      isSuccess={isSuccess}
      error={error}
      tabTitle={"profilepage.private-accessible-templates"}
      showActions={
        user?.id === parseInt(userId as string) || user?.role === "ADMIN"
      }
    />
  );
}
