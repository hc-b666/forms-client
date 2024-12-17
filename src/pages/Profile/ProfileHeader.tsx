import { useNavigate } from "react-router-dom";

import { Button } from "@/components/ui/button";
import { useAuth } from "@/features/auth/hooks/useAuth";

interface IProfileHeader {
  user: IUserProfile;
  totalTempaltes: number;
}

export function ProfileHeader({ user, totalTempaltes }: IProfileHeader) {
  const { user: currentUser } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-between">
      <h1 className="text-2xl font-semibold mb-5">
        {currentUser?.id === user.id ? "Your" : "Their"} templates ({totalTempaltes})
      </h1>
      
      {currentUser?.id === user.id && (
        <Button onClick={() => navigate("/create-template")}>
          Create Template
        </Button>
      )}
    </div>
  );
}
