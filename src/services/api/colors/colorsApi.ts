import { baseApi } from '../../baseApi';
import { API_ENDPOINTS } from '@/constants';
import type { ApiEnvelope, ColorDto, ColorSpecParams, CreateColorDto, Pagination } from '@/types';

export const colorsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getColor: builder.query<ColorDto, string>({
      query: (id) => ({ url: API_ENDPOINTS.COLOR.GET(id) }),
      transformResponse: (response: ApiEnvelope<ColorDto>) => response.data,
      providesTags: (_result, _error, id) => [{ type: 'Colors' as const, id }, 'Colors'],
    }),
    searchColors: builder.query<Pagination<ColorDto>, ColorSpecParams | void>({
      query: (params = {}) => ({
        url: API_ENDPOINTS.COLOR.SEARCH,
        method: 'POST',
        body: params,
      }),
      transformResponse: (response: ApiEnvelope<Pagination<ColorDto>>) => response.data,
      providesTags: (result) => {
        const base: Array<{ type: 'Colors'; id?: string } | 'Colors'> = ['Colors'];
        if (result?.data) {
          base.push(...result.data.map((c) => ({ type: 'Colors' as const, id: c.id })));
        }
        return base;
      },
    }),
    createColor: builder.mutation<ColorDto, CreateColorDto>({
      query: (dto) => ({
        url: API_ENDPOINTS.COLOR.CREATE,
        method: 'POST',
        body: dto,
      }),
      transformResponse: (response: ApiEnvelope<ColorDto>) => response.data,
      invalidatesTags: ['Colors'],
    }),
    updateColor: builder.mutation<ColorDto, CreateColorDto>({
      query: (dto) => ({
        url: API_ENDPOINTS.COLOR.UPDATE,
        method: 'POST',
        body: dto,
      }),
      transformResponse: (response: ApiEnvelope<ColorDto>) => response.data,
      invalidatesTags: (result) =>
        result ? [{ type: 'Colors' as const, id: result.id }, 'Colors'] : ['Colors'],
    }),
    createManyColors: builder.mutation<ColorDto[], CreateColorDto[]>({
      query: (list) => ({
        url: API_ENDPOINTS.COLOR.CREATE_MANY,
        method: 'POST',
        body: list,
      }),
      transformResponse: (response: ApiEnvelope<ColorDto[]>) => response.data,
      invalidatesTags: ['Colors'],
    }),
    deleteColor: builder.mutation<null, string>({
      query: (id) => ({
        url: API_ENDPOINTS.COLOR.DELETE(id),
        method: 'DELETE',
      }),
      // server returns data: null on success
      transformResponse: () => null,
      invalidatesTags: (_result, _error, id) => [{ type: 'Colors' as const, id }, 'Colors'],
    }),
  }),
});

export const {
  useGetColorQuery,
  useSearchColorsQuery,
  useCreateColorMutation,
  useUpdateColorMutation,
  useCreateManyColorsMutation,
  useDeleteColorMutation,
} = colorsApi;
