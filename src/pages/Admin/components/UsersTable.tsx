import { MoonLoader } from "react-spinners";
import { Lock, LockOpen } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  useBlockUserMutation,
  useDemoteToUserMutation,
  useGetUsersQuery,
  usePromoteToAdminMutation,
  useUnblockUserMutation,
} from "../services";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import { Link } from "react-router-dom";
import { RoleSelect } from "./SelectRole";
import { useAuth } from "@/features/auth/hooks/useAuth";
import { ErrorMessage } from "@/pages/error/Error";

export function UsersTable() {
  const { user: currentUser } = useAuth();

  const { data, isLoading, isError, isSuccess, error, refetch } = useGetUsersQuery();

  const [blockUser] = useBlockUserMutation();
  const [unblockUser] = useUnblockUserMutation();
  const [promoteToAdmin] = usePromoteToAdminMutation();
  const [demoteToUser] = useDemoteToUserMutation();

  const handleBlock = async (userId: number) => {
    try {
      const res = await blockUser(userId).unwrap();
      toast({ description: res.message });
      refetch();
    } catch (err) {
      console.log(err);
    }
  };

  const handleUnblock = async (userId: number) => {
    try {
      const res = await unblockUser(userId).unwrap();
      toast({ description: res.message });
      refetch();
    } catch (err) {
      console.log(err);
    }
  };

  const handlePromote = async (userId: number) => {
    try {
      const res = await promoteToAdmin(userId).unwrap();
      toast({ description: res.message });
      refetch();
    } catch (err) {
      console.log(err);
    }
  };

  const handleDemote = async (userId: number) => {
    try {
      const res = await demoteToUser(userId).unwrap();
      toast({ description: res.message });
      refetch();
    } catch (err) {
      console.log(err);
    }
  };

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
              <TableHead>First Name</TableHead>
              <TableHead>Last Name</TableHead>
              <TableHead>Username</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isSuccess &&
              data.map((user) => (
                <TableRow
                  key={user.id}
                  className={`${
                    currentUser?.id === user.id ? "bg-gray-100" : ""
                  }`}
                >
                  <TableCell>{user.id}</TableCell>
                  <TableCell>{user.firstName}</TableCell>
                  <TableCell>{user.lastName}</TableCell>
                  <TableCell>
                    <Link to={`/profile/${user.id}`}>
                      <Button size="sm">{user.username}</Button>
                    </Link>
                  </TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>
                    <span
                      className={`px-2 py-1 rounded-md text-sm ${
                        user.isBlocked ? "bg-red-500" : "bg-green-500"
                      }`}
                    >
                      {user.isBlocked ? "Blocked" : "Active"}
                    </span>
                  </TableCell>
                  <TableCell>
                    <RoleSelect
                      currentRole={user.role}
                      onRoleChange={{
                        promote: handlePromote,
                        demote: handleDemote,
                      }}
                      userId={user.id}
                    />
                  </TableCell>
                  <TableCell className="flex space-x-2">
                    <Button
                      onClick={() => handleBlock(user.id)}
                      size="icon"
                      title="Block User"
                    >
                      <Lock />
                    </Button>
                    <Button
                      onClick={() => handleUnblock(user.id)}
                      size="icon"
                      title="Unblock User"
                    >
                      <LockOpen />
                    </Button>
                  </TableCell>
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
