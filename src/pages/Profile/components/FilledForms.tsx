import { useParams } from "react-router-dom";
import { RefreshCcw } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useGetFormsByUserQuery } from "../services";
import { FormRow } from "./FormRow";
import { Button } from "@/components/ui/button";
import { ErrorMessage } from "@/pages/error/Error";
import { useAuth } from "@/features/auth/hooks/useAuth";
import { useTranslations } from "@/hooks/useTranslations";
import { Skeleton } from "@/components/ui/skeleton";

export function FilledForms() {
  const { user } = useAuth();
  const { t } = useTranslations();
  const { userId } = useParams();

  const { data, isLoading, isError, isSuccess, error, refetch } =
    useGetFormsByUserQuery(userId);

  if (isError) {
    return <ErrorMessage error={error} />;
  }

  return (
    <div className="h-full">
      <div className="flex justify-between items-center mb-5">
        {isLoading ? (
          <Skeleton className="w-48 h-10" />
        ) : (
          <h1 className="md:text-2xl font-semibold">
            {t("profilepage.filledout-forms")} ({data?.length})
          </h1>
        )}

        {(user?.id === parseInt(userId as string) || user?.role === "ADMIN") && (
          <Button onClick={() => refetch()} size="icon">
            <RefreshCcw />
          </Button>
        )}
      </div>

      <div className="overflow-x-auto">
        <div className="min-w-[800px]">
          <Table className="h-full">
            <TableHeader>
              <TableRow>
                <TableHead>{t("profilepage.title")}</TableHead>
                <TableHead>{t("profilepage.description")}</TableHead>
                <TableHead>{t("profilepage.topic")}</TableHead>
                <TableHead>{t("profilepage.tags")}</TableHead>
                <TableHead>{t("profilepage.filledat")}</TableHead>
                <TableHead>More</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody className="h-full w-full">
              {isLoading &&
                Array.from({ length: 5 }).map((_, rIdx) => (
                  <TableRow key={rIdx}>
                    {Array.from({ length: 6 }).map((_, cIdx) => (
                      <TableCell key={cIdx}>
                        <Skeleton className="w-full h-10" />
                      </TableCell>
                    ))}
                  </TableRow>
                ))}

              {isSuccess &&
                (data.length === 0 ? (
                  <TableRow>
                    <TableCell>{t("profilepage.noforms")}</TableCell>
                  </TableRow>
                ) : (
                  data.map((form) => <FormRow form={form} key={form.id} />)
                ))}
            </TableBody>
          </Table>

          {isSuccess && data.length === 0 && (
            <div className="w-full py-10">
              <h1 className="text-center font-semibold">
                You have not filled out any forms yet.
              </h1>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
