import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "@/app/store";
import { authApi } from "../services/authApi";

type AuthState = {
  user: IUser | null;
  token: string | null;
  isAuthenticated: boolean;
}

const initialState: AuthState = {
  user: null,
  token: null,
  isAuthenticated: false,
};

const authSlice = createSlice({
  name: "authSlice",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
    },
  }, 
  extraReducers: (builder) => {
    builder.addMatcher(authApi.endpoints.login.matchFulfilled, (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.isAuthenticated = true;
    });
  },
});

export const { logout } = authSlice.actions;

export default authSlice.reducer;

export const selectUser = (state: RootState) => state.authSlice.user;
export const selectIsAuthenticated = (state: RootState) => state.authSlice.isAuthenticated;
