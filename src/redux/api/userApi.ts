import { tagTypes } from "../tag-Types";
import { baseApi } from "./baseApi";

export const userApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getUsers: build.query({
      query: () => ({
        url: "/users",
        method: "GET",
      }),
      providesTags: [tagTypes.users],
    }),
    getSingleUser: build.query({
      query: ({ id }) => ({
        url: `/users/${id}`,
        method: "GET",
      }),
      providesTags: [tagTypes.users],
    }),
    createUser: build.mutation({
      query: (data) => ({
        url: "/users",
        method: "POST",
        body: data,
      }),
      invalidatesTags: [tagTypes.users],
    }),
    deleteUser: build.mutation({
      query: (id: string) => ({
        url: `/users${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.users],
    }),
    updateUser: build.mutation({
      query: ({ data, id }) => ({
        url: `/users/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: [tagTypes.users],
    }),
  }),
});

export const {
  useGetSingleUserQuery,
  useGetUsersQuery,
  useCreateUserMutation,
  useDeleteUserMutation,
  useUpdateUserMutation,
} = userApi;
