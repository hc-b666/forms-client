import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useGetUsersQuery } from "../services";
import { capitalize } from "@/lib/utils/stringUtils";
import { MoonLoader } from "react-spinners";

export function UsersTable() {
  const { data, isLoading, isSuccess } = useGetUsersQuery();

  return (
    <div className="h-full overflow-x-auto">
      <div className="min-w-[800px]">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Id</TableHead>
              <TableHead>First Name</TableHead>
              <TableHead>Last Name</TableHead>
              <TableHead>Username</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Is Blocked</TableHead>
              <TableHead>Role</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isSuccess &&
              data.length !== 0 &&
              data.map((user) => (
                <TableRow key={user.id}>
                  <TableCell>{user.id}</TableCell>
                  <TableCell>{user.firstName}</TableCell>
                  <TableCell>{user.lastName}</TableCell>
                  <TableCell>{user.username}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.isBlocked ? "Yes" : "No"}</TableCell>
                  <TableCell>{capitalize(user.role)}</TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </div>
      {isLoading && (
        <div className="w-full h-80 flex items-center justify-center">
          <MoonLoader color="black" />
        </div>
      )}
    </div>
  );
}
