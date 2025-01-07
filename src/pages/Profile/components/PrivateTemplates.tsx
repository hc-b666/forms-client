import { useState } from "react";
import { useParams } from "react-router-dom";

import { useGetPrivateTemplatesQuery } from "../services";
import { ErrorMessage } from "@/pages/error/Error";
import { useAuth } from "@/features/auth/hooks/useAuth";
import { TemplatesTable } from "./TemplatesTable";

export function PrivateTemplates() {
  const { userId } = useParams();
  const { user } = useAuth();
  const [page, setPage] = useState(1);

  const { data, isLoading, isError, isSuccess, error } = useGetPrivateTemplatesQuery({ userId, page });

  const handlePageChange = (page: number) => {
    setPage(page);
  };

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
      tabTitle={"profilepage.private-templates"}
      showActions={
        user?.id === parseInt(userId as string) || user?.role === "ADMIN"
      }
      page={page}
      handlePageChange={handlePageChange}
    />
  );
}
