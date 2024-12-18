import { MoonLoader } from "react-spinners";
import { useGetUserByIdQuery } from "../services/userApi";
import { Mail, User } from "lucide-react";

export function UserProfile({ userId }: { userId: string | undefined }) {
  const { data, isLoading, isSuccess } = useGetUserByIdQuery(userId);

  return (
    <div className="col-span-1 flex justify-center">
      {isLoading && <MoonLoader color="black" />}
      {isSuccess && (
        <div className="w-full flex flex-col">
          <h3 className="text-xl font-bold">
            {data.firstName} {data.lastName}
          </h3>
          <h3 className="flex items-center gap-1">
            <Mail className="w-4" /> {data.email}
          </h3>
          <h3 className="flex items-center gap-1">
            <User className="w-4" />
            {data.username}
          </h3>
        </div>
      )}
    </div>
  );
}
