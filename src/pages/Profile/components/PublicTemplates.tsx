import { useNavigate, useParams } from "react-router-dom";

import { useGetTemplatesByUserIdQuery } from "../services";
import { useAuth } from "@/features/auth/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { ErrorMessage } from "@/pages/error/Error";
import { useTranslations } from "@/hooks/useTranslations";
import { useGetPath } from "@/hooks/useGetPath";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { TemplateRow } from "./TemplateRow";

export function PublicTemplates() {
  const { userId } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  const { t } = useTranslations();
  const { path } = useGetPath("/create-template", parseInt(userId as string));

  const { data, isLoading, isError, isSuccess, error } =
    useGetTemplatesByUserIdQuery(userId);

  if (isError) {
    return <ErrorMessage error={error} />;
  }

  return (
    <div className="h-full">
      <div className="flex items-center justify-between mb-5">
        {isLoading ? (
          <Skeleton className="w-48 h-10" />
        ) : (
          <h1 className="md:text-2xl font-semibold">
            {t("profilepage.templates")} ({data?.length})
          </h1>
        )}

        {(user?.id === parseInt(userId as string) || user?.role === "ADMIN") && (
          <Button onClick={() => navigate(path)}>
            {t("profilepage.create")}
          </Button>
        )}
      </div>

      <div className="overflow-x-auto">
        <div className="min-w-[920px]">
          <Table className="h-full">
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Title</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Topic</TableHead>
                <TableHead>Tags</TableHead>
                <TableHead>Responses</TableHead>
                <TableHead>Likes</TableHead>
                <TableHead>Created At</TableHead>
                {(user?.id === parseInt(userId as string) || user?.role === "ADMIN") && (
                  <TableHead>Actions</TableHead>
                )}
              </TableRow>
            </TableHeader>
            <TableBody className="w-full h-full">
              {isLoading &&
                Array.from({ length: 5 }).map((_, rIdx) => (
                  <TableRow key={`row-${rIdx}`}>
                    {Array.from({ length: 9 }).map((_, cIdx) => (
                      <TableCell key={`cell-${rIdx}-${cIdx}`}>
                        <Skeleton className="w-full h-10" />
                      </TableCell>
                    ))}
                  </TableRow>
                ))}

              {isSuccess &&
                data.length > 0 &&
                data.map((template) => (
                  <TemplateRow
                    userId={userId}
                    template={template}
                    key={template.id}
                  />
                ))}
            </TableBody>
          </Table>

          {isSuccess && data.length === 0 && (
            <div className="w-full py-10">
              <h1 className="text-center font-semibold">
                You don't have any public templates yet.
              </h1>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
