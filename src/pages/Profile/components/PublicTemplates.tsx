import { useState } from "react";
import { useParams } from "react-router-dom";

import { useGetPublicByUserIdQuery } from "../services";
import { useAuth } from "@/features/auth/hooks/useAuth";
import { ErrorMessage } from "@/pages/error/Error";
import { TemplatesTable } from "./TemplatesTable";

export function PublicTemplates() {
  const { userId } = useParams();
  const { user } = useAuth();
  const [page, setPage] = useState(1);

  const { data, isLoading, isError, isSuccess, error } = useGetPublicByUserIdQuery({ userId, page });

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
      tabTitle={"profilepage.templates"}
      showActions={
        user?.id === parseInt(userId as string) || user?.role === "ADMIN"
      }
      page={page}
      handlePageChange={handlePageChange}
    />
  );
}
