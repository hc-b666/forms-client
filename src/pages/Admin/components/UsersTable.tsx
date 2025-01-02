import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useGetUsersQuery } from "../services";
import { ErrorMessage } from "@/pages/error/Error";
import { useTranslations } from "@/hooks/useTranslations";
import { Skeleton } from "@/components/ui/skeleton";
import { UserRow } from "./UserRow";

export function UsersTable() {
  const { t } = useTranslations();

  const { data, isLoading, isError, isSuccess, error, refetch } =
    useGetUsersQuery();

  if (isError) {
    return <ErrorMessage error={error} />;
  }

  return (
    <div className="h-full overflow-x-auto">
      <div className="min-w-[800px]">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Id</TableHead>
              <TableHead>{t("admin.table.firstname")}</TableHead>
              <TableHead>{t("admin.table.lastname")}</TableHead>
              <TableHead>{t("admin.table.username")}</TableHead>
              <TableHead>{t("admin.table.email")}</TableHead>
              <TableHead>{t("admin.table.status")}</TableHead>
              <TableHead>{t("admin.table.role")}</TableHead>
              <TableHead>{t("admin.table.actions")}</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading &&
              Array.from({ length: 5 }).map((_, rIdx) => (
                <TableRow key={`row-${rIdx}`}>
                  {Array.from({ length: 8 }).map((_, cIdx) => (
                    <TableCell key={`cell-${rIdx}-${cIdx}`}>
                      <Skeleton className="w-full h-10" />
                    </TableCell>
                  ))}
                </TableRow>
              ))}

            {isSuccess &&
              data.map((user) => (
                <UserRow user={user} refetch={refetch} key={user.id} />
              ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
