import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useGetFormsByUserQuery } from "../services";
import { MoonLoader } from "react-spinners";
import { capitalize, truncateText } from "@/lib/utils/stringUtils";
import { useIntl } from "react-intl";

export function UserFilledForms() {
  const { data, isLoading, isSuccess } = useGetFormsByUserQuery({});
  const intl = useIntl();

  return (
    <div className="h-full overflow-x-auto">
      <div className="min-w-[600px]">
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
            </TableRow>
          </TableHeader>
          <TableBody className="h-full w-full">
            {isSuccess &&
              (data.length === 0 ? (
                <TableRow>
                  <TableCell>{intl.formatMessage({ id: "profilepage.noforms" })}</TableCell>
                </TableRow>
              ) : (
                data.map((form) => (
                  <TableRow key={form.id}>
                    <TableCell>
                      {truncateText(form.template.title, 20)}
                    </TableCell>
                    <TableCell>
                      {truncateText(form.template.description, 60)}
                    </TableCell>
                    <TableCell>{capitalize(form.template.topic)}</TableCell>
                    <TableCell>
                      {form.template.tags.slice(0, 3).join(", ")}
                    </TableCell>
                    <TableCell>
                      {new Date(form.filledAt).toLocaleDateString()}
                    </TableCell>
                  </TableRow>
                ))
              ))}
          </TableBody>
        </Table>
      </div>
      {isLoading && (
        <div className="w-full flex justify-center items-center h-32">
          <MoonLoader color="black" />
        </div>
      )}
    </div>
  );
}
