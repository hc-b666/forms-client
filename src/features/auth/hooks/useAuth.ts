import { RootState } from "@/app/store";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../slices/authSlice";

export const useAuth = () => {
  const auth = useSelector((state: RootState) => state.authSlice);
  const dispatch = useDispatch();

  return {
    ...auth,
    isAuthenticated: !!auth.accessToken,
    logout: () => dispatch(logout()),
  };
};
