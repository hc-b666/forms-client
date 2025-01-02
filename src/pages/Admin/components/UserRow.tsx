import { Button } from "@/components/ui/button";
import { TableCell, TableRow } from "@/components/ui/table";
import { Link } from "react-router-dom";
import { RoleSelect } from "./SelectRole";
import { Lock, LockOpen, Trash } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useTranslations } from "@/hooks/useTranslations";
import { useAuth } from "@/features/auth/hooks/useAuth";
import {
  useBlockUserMutation,
  useDeleteUserMutation,
  useDemoteToUserMutation,
  usePromoteToAdminMutation,
  useUnblockUserMutation,
} from "../services";
import { toast } from "@/hooks/use-toast";

interface UserRowProps {
  user: IUserAdmin;
  refetch: () => void;
}

export function UserRow({ user, refetch }: UserRowProps) {
  const { t } = useTranslations();
  const { user: currentUser } = useAuth();

  const [blockUser] = useBlockUserMutation();
  const [unblockUser] = useUnblockUserMutation();
  const [promoteToAdmin] = usePromoteToAdminMutation();
  const [demoteToUser] = useDemoteToUserMutation();
  const [deleteUser] = useDeleteUserMutation();

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

  const handleDelete = async (userId: number) => {
    try {
      const res = await deleteUser(userId).unwrap();
      toast({ description: res.message });
      refetch();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <TableRow
      key={user.id}
      className={`${currentUser?.id === user.id ? "bg-gray-100" : ""}`}
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
          {user.isBlocked ? t("admin.blocked") : t("admin.active")}
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
          title={t("admin.block")}
        >
          <Lock />
        </Button>
        <Button
          onClick={() => handleUnblock(user.id)}
          size="icon"
          title={t("admin.unblock")}
        >
          <LockOpen />
        </Button>
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button size="icon" variant="destructive" title={t("admin.delete")}>
              <Trash />
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>
                {t("admin.delete.alert.title")}
              </AlertDialogTitle>
              <AlertDialogDescription>
                {t("admin.delete.alert.description")}
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>{t("admin.cancel")}</AlertDialogCancel>
              <AlertDialogAction onClick={() => handleDelete(user.id)}>
                {t("admin.delete")}
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </TableCell>
    </TableRow>
  );
}
