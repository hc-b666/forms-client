import { useAuth } from "@/features/auth/hooks/useAuth";

export function useGetPath(basePath: string, userId: number) {
  const { user } = useAuth();
  let path = basePath;

  const isAdmin = user?.id === userId && user?.role === "ADMIN";

  if (isAdmin || user?.id === userId) {
    return { isAdmin, path };
  } else {
    path = `${basePath}?userId=${userId}`;
  }

  return { isAdmin, path };
}
