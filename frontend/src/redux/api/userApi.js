import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({ baseUrl: "/api/v1", credentials: "include" }),
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (data) => ({
        url: "/login",
        method: "POST",
        body: data,
      }),
    }),

    register: builder.mutation({
      query: (data) => ({
        url: "/register",
        method: "POST",
        body: data,
      }),
    }),
     logout: builder.mutation({
      query: () => ({
        url: "/logout",
        method: "GET",
        credentials: "include", // cookie də getsin!
      }),

      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
          // logoutdan sonra `getUserProfile`-in cache-i sıfırlansın
          dispatch(userApi.util.resetApiState());
        } catch (err) {
          console.error("Logout failed:", err);
        }
      },
    }),

   getUserProfile: builder.query({
      query: () => "/me",
    }),
  }),
});

export const {
  useLoginMutation,
  useRegisterMutation,
  useLogoutMutation,
  useGetUserProfileQuery,
} = userApi;