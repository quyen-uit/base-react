import { baseApi } from '../../baseApi';
import { Profile, UpdateProfileData, ChangePasswordData, UpdateAvatarResponse } from '@/types';

export const profileApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Get current user profile
    getProfile: builder.query<Profile, void>({
      query: () => '/profile',
      providesTags: ['User'],
    }),

    // Update profile information
    updateProfile: builder.mutation<Profile, UpdateProfileData>({
      query: (data) => ({
        url: '/profile',
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: ['User'],
      // Optimistic update
      async onQueryStarted(data, { dispatch, queryFulfilled }) {
        const patchResult = dispatch(
          profileApi.util.updateQueryData('getProfile', undefined, (draft) => {
            Object.assign(draft, data);
          })
        );
        try {
          await queryFulfilled;
        } catch {
          patchResult.undo();
        }
      },
    }),

    // Change password
    changePassword: builder.mutation<{ message: string }, ChangePasswordData>({
      query: (data) => ({
        url: '/profile/change-password',
        method: 'POST',
        body: data,
      }),
    }),

    // Upload avatar
    uploadAvatar: builder.mutation<UpdateAvatarResponse, FormData>({
      query: (formData) => ({
        url: '/profile/avatar',
        method: 'POST',
        body: formData,
      }),
      invalidatesTags: ['User'],
      // Optimistic update for avatar
      async onQueryStarted(formData, { dispatch, queryFulfilled }) {
        // Get preview URL from FormData
        const file = formData.get('avatar') as File;
        if (file) {
          const previewUrl = URL.createObjectURL(file);
          const patchResult = dispatch(
            profileApi.util.updateQueryData('getProfile', undefined, (draft) => {
              draft.avatar = previewUrl;
            })
          );
          try {
            const { data } = await queryFulfilled;
            // Update with real URL from server
            dispatch(
              profileApi.util.updateQueryData('getProfile', undefined, (draft) => {
                draft.avatar = data.avatar;
              })
            );
            URL.revokeObjectURL(previewUrl);
          } catch {
            patchResult.undo();
            URL.revokeObjectURL(previewUrl);
          }
        }
      },
    }),

    // Delete avatar
    deleteAvatar: builder.mutation<{ message: string }, void>({
      query: () => ({
        url: '/profile/avatar',
        method: 'DELETE',
      }),
      invalidatesTags: ['User'],
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        const patchResult = dispatch(
          profileApi.util.updateQueryData('getProfile', undefined, (draft) => {
            draft.avatar = undefined;
          })
        );
        try {
          await queryFulfilled;
        } catch {
          patchResult.undo();
        }
      },
    }),
  }),
});

export const {
  useGetProfileQuery,
  useUpdateProfileMutation,
  useChangePasswordMutation,
  useUploadAvatarMutation,
  useDeleteAvatarMutation,
} = profileApi;
