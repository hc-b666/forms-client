import { baseApi } from "@/services/baseApi";

export const adminApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getUsers: builder.query<IUserAdmin[], void>({
      query: () => ({
        url: "admin/users",
        method: "GET",
      }),
    }),
    blockUser: builder.mutation<{ message: string }, number>({
      query: (userId) => ({
        url: `admin/block/${userId}`,
        method: "PUT",
      }),
    }),
    unblockUser: builder.mutation<{ message: string }, number>({
      query: (userId) => ({
        url: `admin/unblock/${userId}`,
        method: "PUT",
      }),
    }),
    promoteToAdmin: builder.mutation<{ message: string }, number>({
      query: (userId) => ({
        url: `admin/promote/${userId}`,
        method: "PUT",
      }),
    }),
    demoteToUser: builder.mutation<{ message: string }, number>({
      query: (userId) => ({
        url: `admin/demote/${userId}`,
        method: "PUT",
      }),
    }),
    deleteUser: builder.mutation<{ message: string }, number>({
      query: (userId) => ({
        url: `admin/users/${userId}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useGetUsersQuery,
  useBlockUserMutation,
  useUnblockUserMutation,
  usePromoteToAdminMutation,
  useDemoteToUserMutation,
  useDeleteUserMutation,
} = adminApi;
