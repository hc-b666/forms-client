import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "@/app/store";
import { authApi } from "../services/authApi";

type AuthState = {
  user: IUser | null;
  accessToken: string | null;
  refreshToken: string | null;
  isAuthenticated: boolean;
}

const initialState: AuthState = {
  user: null,
  accessToken: null,
  refreshToken: null,
  isAuthenticated: false,
};

const authSlice = createSlice({
  name: "authSlice",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.accessToken = null;
      state.refreshToken = null;
      state.isAuthenticated = false;
    },
    updateAccessToken: (state, action) => {
      state.accessToken = action.payload;
    },
  }, 
  extraReducers: (builder) => {
    builder
    .addMatcher(authApi.endpoints.login.matchFulfilled, (state, action) => {
      state.user = action.payload.user;
      state.accessToken = action.payload.accessToken;
      state.refreshToken = action.payload.refreshToken;
      state.isAuthenticated = true;
    })
    .addMatcher(authApi.endpoints.login.matchRejected, (state) => {
      state.user = null;
      state.accessToken = null;
      state.refreshToken = null;
      state.isAuthenticated = false;
    });
  },
});

export const { logout, updateAccessToken } = authSlice.actions;

export default authSlice.reducer;

export const selectUser = (state: RootState) => state.authSlice.user;
export const selectIsAuthenticated = (state: RootState) => state.authSlice.isAuthenticated;
