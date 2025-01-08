import { useState } from "react";
import { useParams } from "react-router-dom";

import { useGetAccessibleTemplatesQuery } from "../services";
import { useAuth } from "@/features/auth/hooks/useAuth";
import { ErrorMessage } from "@/pages/error/Error";
import { TemplatesTable } from "./TemplatesTable";

export function AccessibleTemplates() {
  const { userId } = useParams();
  const { user } = useAuth();
  const [page, setPage] = useState(1);

  const { data, isLoading, isError, isSuccess, error } = useGetAccessibleTemplatesQuery({ userId, page });

  const handlePageChange = (page: number) => {
    setPage(page);
  };

  if (isError) {
    return <ErrorMessage error={error} />;
  }

  return (
    <TemplatesTable
      author={false}
      data={data}
      isLoading={isLoading}
      isError={isError}
      isSuccess={isSuccess}
      error={error}
      tabTitle={"profilepage.private-accessible-templates"}
      showActions={user?.role === "ADMIN"}
      page={page}
      handlePageChange={handlePageChange}
    />
  );
}
