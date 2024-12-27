import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { capitalize } from "@/lib/utils/stringUtils";

export interface RoleSelectProps {
  currentRole: UserRole;
  onRoleChange: {
    promote: (userId: number) => Promise<void>;
    demote: (userId: number) => Promise<void>;
  };
  userId: number;
}

export function RoleSelect({
  currentRole,
  onRoleChange,
  userId,
}: RoleSelectProps) {
  const handleValueChange = (value: UserRole) => {
    if (value === "ADMIN") {
      onRoleChange.promote(userId);
    } else if (value === "USER") {
      onRoleChange.demote(userId);
    }
  };

  return (
    <Select defaultValue={currentRole} onValueChange={handleValueChange}>
      <SelectTrigger className="w-[100px]">
        <SelectValue>{capitalize(currentRole)}</SelectValue>
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="USER">User</SelectItem>
        <SelectItem value="ADMIN">Admin</SelectItem>
      </SelectContent>
    </Select>
  );
}
