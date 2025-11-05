import { apiSlice } from "./apiSlice.js";

export const superAdminApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllUsers: builder.query({
      query: () => ({ url: "/api/superadmin/users", method: "GET" }),
      providesTags: ["User"],
    }),
    changeUserRole: builder.mutation({
      query: ({ id, role }) => ({
        url: `/api/superadmin/users/${id}/role`,
        method: "PUT",
        body: { role },
      }),
      invalidatesTags: ["User"],
    }),
  }),
});

export const { useGetAllUsersQuery, useChangeUserRoleMutation } = superAdminApi;
