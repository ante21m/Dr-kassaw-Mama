import { baseApi } from './baseApi';

export interface AdminUser {
  id: number;
  name?: string | null;
  email?: string | null;
  phone?: string | null;
  username: string;
  role: string;
  isActive: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface CreateUserRequest {
  username: string;
  password: string;
  name?: string;
  email?: string;
  phone?: string;
  role?: string;
  isActive?: boolean;
}

export interface UpdateUserRequest {
  username?: string;
  password?: string;
  name?: string;
  email?: string;
  phone?: string;
  role?: string;
  isActive?: boolean;
}

export const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getUsers: builder.query<AdminUser[], void>({
      query: () => '/users',
      providesTags: ['User'],
    }),
    getUserById: builder.query<AdminUser, number>({
      query: (id) => `/users/${id}`,
      providesTags: (_result, _error, id) => [{ type: 'User', id }],
    }),
    createUser: builder.mutation<AdminUser, CreateUserRequest>({
      query: (body) => ({
        url: '/users',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['User'],
    }),
    updateUser: builder.mutation<AdminUser, { id: number; data: UpdateUserRequest }>({
      query: ({ id, data }) => ({
        url: `/users/${id}`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: (_result, _error, { id }) => ['User', { type: 'User', id }],
    }),
    deleteUser: builder.mutation<{ success: boolean }, number>({
      query: (id) => ({
        url: `/users/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['User'],
    }),
  }),
});

export const {
  useGetUsersQuery,
  useGetUserByIdQuery,
  useCreateUserMutation,
  useUpdateUserMutation,
  useDeleteUserMutation,
} = userApi;
