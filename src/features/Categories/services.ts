import type { CategoryType } from './types';
import { api } from '@/store/api';

export const categoryApi = api.injectEndpoints({
  endpoints: (build) => ({
    getCategories: build.query<CategoryType[], void>({
      query: () => `categories`,
      providesTags: ['Categories'],
    }),
  }),
});

export const { useGetCategoriesQuery } = categoryApi;
