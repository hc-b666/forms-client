import { RootState } from "@/app/store";
import { useDispatch, useSelector } from "react-redux";
import { useRefreshTokenMutation } from "../services/authApi";
import { useEffect } from "react";
import { logout, updateAccessToken } from "../slices/authSlice";

export const useAuth = () => {
  const auth = useSelector((state: RootState) => state.authSlice);
  const dispatch = useDispatch();
  const [refreshToken] = useRefreshTokenMutation();

  useEffect(() => {
    const refreshAccessToken = async () => {
      if (auth.refreshToken) {
        try {
          const res = await refreshToken({ refreshToken: auth.refreshToken }).unwrap();

          dispatch(updateAccessToken(res.accessToken));

        } catch (err) {
          dispatch(logout());
        }
      }
    };

    const intervalId = setInterval(refreshAccessToken, 1000 * 60 * 30);

    return () => clearInterval(intervalId);
  }, [auth.refreshToken, dispatch, refreshToken]);

  return { ...auth, isAuthenticated: !!auth.accessToken, logout: () => dispatch(logout()) };
};
