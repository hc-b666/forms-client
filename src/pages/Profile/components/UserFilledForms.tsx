import { MoonLoader } from "react-spinners";
import { useIntl } from "react-intl";
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
import { RefreshCcw } from "lucide-react";

export function UserFilledForms() {
  const intl = useIntl();

  const { data, isLoading, isSuccess, refetch } = useGetFormsByUserQuery({});

  return (
    <div className="h-full">
      <div className="flex justify-between items-center mb-4">
        <h1 className="md:text-2xl font-semibold">
          {intl.formatMessage({ id: "profilepage.filledout-forms" })}
        </h1>
        <Button onClick={() => refetch()} size="icon">
          <RefreshCcw />
        </Button>
      </div>
      <div className="overflow-x-auto">
        <div className="min-w-[800px]">
          <Table className="h-full">
            <TableHeader>
              <TableRow>
                <TableHead>
                  {intl.formatMessage({ id: "profilepage.title" })}
                </TableHead>
                <TableHead>
                  {intl.formatMessage({ id: "profilepage.description" })}
                </TableHead>
                <TableHead>
                  {intl.formatMessage({ id: "profilepage.topic" })}
                </TableHead>
                <TableHead>
                  {intl.formatMessage({ id: "profilepage.tags" })}
                </TableHead>
                <TableHead>
                  {intl.formatMessage({ id: "profilepage.filledat" })}
                </TableHead>
                <TableHead>More</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody className="h-full w-full">
              {isSuccess &&
                (data.length === 0 ? (
                  <TableRow>
                    <TableCell>
                      {intl.formatMessage({ id: "profilepage.noforms" })}
                    </TableCell>
                  </TableRow>
                ) : (
                  data.map((form) => <FormRow form={form} key={form.id} />)
                ))}
            </TableBody>
          </Table>
        </div>
      </div>
      {isLoading && (
        <div className="w-full flex justify-center items-center h-32">
          <MoonLoader color="black" />
        </div>
      )}
    </div>
  );
}
