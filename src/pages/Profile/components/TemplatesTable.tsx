import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ErrorMessage } from "@/pages/error/Error";
import { useTranslations } from "@/hooks/useTranslations";
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
import { type FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { type SerializedError } from "@reduxjs/toolkit";
import { useGetPath } from "@/hooks/useGetPath";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { ResponseProps } from "../services";

interface TemplatesTableProps {
  author: boolean;
  tabTitle: string;
  data: ResponseProps | undefined;
  isLoading: boolean;
  isError: boolean;
  isSuccess: boolean;
  error: FetchBaseQueryError | SerializedError | undefined;
  showActions?: boolean;
  createPath?: string;
  page: number;
  handlePageChange: (page: number) => void;
}

export function TemplatesTable({
  author,
  tabTitle,
  data,
  isLoading,
  isError,
  isSuccess,
  error,
  showActions = false,
  page,
  handlePageChange,
}: TemplatesTableProps) {
  const { userId } = useParams();
  const navigate = useNavigate();
  const { t } = useTranslations();
  const { path } = useGetPath("/create-template", parseInt(userId as string));

  if (isError) {
    return <ErrorMessage error={error} />;
  }

  return (
    <div className="h-full flex flex-col">
      <div className="flex items-center justify-between mb-5">
        {isLoading ? (
          <Skeleton className="w-48 h-10" />
        ) : (
          <h1 className="md:text-2xl font-semibold">
            {t(tabTitle)} ({data?.metadata.total})
          </h1>
        )}

        {showActions && (
          <Button onClick={() => navigate(path)}>
            {t("profilepage.create")}
          </Button>
        )}
      </div>

      <div className="overflow-x-auto flex-grow">
        <div className="min-w-[920px] h-full flex flex-col">
          <Table className="h-full">
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>{t("profilepage.title")}</TableHead>
                <TableHead>{t("profilepage.description")}</TableHead>
                <TableHead>{t("profilepage.topic")}</TableHead>
                <TableHead>{t("profilepage.tags")}</TableHead>
                <TableHead>{t("profilepage.responses")}</TableHead>
                <TableHead>{t("profilepage.likes")}</TableHead>
                <TableHead>{t("profilepage.createdAt")}</TableHead>
                {showActions && (
                  <TableHead>{t("profilepage.actions")}</TableHead>
                )}
              </TableRow>
            </TableHeader>
            <TableBody className="w-full h-full">
              {isLoading &&
                Array.from({ length: 5 }).map((_, rIdx) => (
                  <TableRow key={`row-${rIdx}`}>
                    {Array.from({ length: showActions ? 9 : 8 }).map(
                      (_, cIdx) => (
                        <TableCell key={`cell-${rIdx}-${cIdx}`}>
                          <Skeleton className="w-full h-10" />
                        </TableCell>
                      )
                    )}
                  </TableRow>
                ))}

              {isSuccess &&
                data &&
                data.templates.length > 0 &&
                data.templates.map((template) => (
                  <TemplateRow
                    author={author}
                    key={template.id}
                    template={template}
                    showActions={showActions}
                  />
                ))}
            </TableBody>
          </Table>

          {isSuccess && (!data || data.templates.length === 0) && (
            <div className="w-full py-10">
              <h1 className="text-center font-semibold">
                {t("profilepage.notemplates")}
              </h1>
            </div>
          )}

          <Pagination className="mt-auto">
            <PaginationContent>
              <PaginationPrevious
                onClick={() => {
                  if (page > 1) {
                    handlePageChange(page - 1);
                  }
                }}
              />
              {data &&
                data.metadata.totalPages > 0 &&
                Array.from({ length: data.metadata.totalPages }).map(
                  (_, idx) => (
                    <PaginationItem key={idx}>
                      <PaginationLink
                        isActive={data.metadata.page === idx + 1}
                        onClick={() => handlePageChange(idx + 1)}
                      >
                        {idx + 1}
                      </PaginationLink>
                    </PaginationItem>
                  )
                )}

              <PaginationNext
                onClick={() => {
                  if (
                    data?.metadata.totalPages &&
                    page < data?.metadata.totalPages
                  ) {
                    handlePageChange(page + 1);
                  }
                }}
              />
            </PaginationContent>
          </Pagination>
        </div>
      </div>
    </div>
  );
}
