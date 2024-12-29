import { useEffect, useState } from "react";
import { X } from "lucide-react";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { useSearchUserByEmailQuery } from "../services";
import { useTranslations } from "@/hooks/useTranslations";
import { useCreateTemplate } from "../CreateTemplateProvider";

export function AddUsers() {
  const { users, setUsers } = useCreateTemplate();

  const { t } = useTranslations();
  const [user, setUser] = useState("");
  const [debouncedUser, setDebouncedUser] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedUser(user);
    }, 300);

    return () => clearTimeout(timer);
  }, [user]);

  const { data: suggestedUsers = [], isLoading } = useSearchUserByEmailQuery(debouncedUser, { skip: debouncedUser.trim().length < 3 });

  const userExists = (userToAdd: { id: number, email: string }) => {
    return users.some(u => u.email.toLowerCase() === userToAdd.email.toLowerCase());
  }

  const handleAddUser = (userToAdd: { id: number; email: string }) => {
    if (!userExists(userToAdd)) {
      setUsers((p) => [...p, userToAdd]);
      setUser("");
      setShowSuggestions(false);
    }
  };

  const handleDeleteUser = (id: number) => {
    setUsers(p => p.filter(u => u.id !== id));
  };

  return (
    <div className="flex flex-col gap-3">
      <Label htmlFor="add-user-input">
        {t("createtemplatepage.search.user")}
      </Label>
      {users.length > 0 && (
        <div>
          {users.map((user) => (
            <Badge key={user.id}>
              {user.email}
              <X className="w-4 h-4" onClick={() => handleDeleteUser(user.id)} />
            </Badge>
          ))}
        </div>
      )}
      <div className="grid grid-cols-4 gap-5">
        <div className="col-span-3 relative">
          <Input
            id="add-user-input"
            value={user}
            onChange={(e) => {
              setUser(e.target.value);
              setShowSuggestions(true);
            }}
            placeholder={t("createtemplatepage.search.placeholder")}
          />

          {user.trim() && showSuggestions && (
            <div className="absolute top-full left-0 w-full bg-white dark:bg-zinc-800 shadow-lg border rounded-md p-3 z-10 max-h-60 overflow-y-auto">
              {isLoading ? (
                <div className="text-gray-500">Loading...</div>
              ) : (
                suggestedUsers.length > 0 ? (
                  suggestedUsers.map((user) => (
                    <div
                      key={user.id}
                      className="cursor-pointer hover:bg-zinc-100 dark:hover:bg-zinc-700 p-2 rounded"
                      onClick={() => handleAddUser(user)}
                    >
                      {user.email}
                    </div>
                  ))
                ) : (
                  <div className="text-gray-500">{t("createtemplatepage.search.no.user")}</div>
                )
              )}
            </div>
          )}
        </div>

        <Button onClick={() => setUsers([])}>
          {t("createtemplatepage.clear")}
        </Button>
      </div>
    </div>
  );
}
