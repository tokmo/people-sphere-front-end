import type { ProductType } from './types';
import { api } from '@/store/api';

export const productApi = api.injectEndpoints({
  endpoints: (build) => ({
    getProducts: build.query<ProductType[], void>({
      query: () => `products`,
      providesTags: ['Products'],
    }),
    getProduct: build.query<ProductType, number>({
      query: (id) => `product/${id}`,
      providesTags: ['Products'],
    }),
    addProduct: build.mutation({
      query: (data) => ({
        url: `products`,
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Products'],
    }),
    updateProduct: build.mutation({
      query: (data) => ({
        url: `products`,
        method: 'PATCH',
        body: data,
      }),
      invalidatesTags: ['Products'],
    }),
    deleteProduct: build.mutation<number, number>({
      query: (id: number) => ({
        url: `products/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Products'],
    }),
  }),
});

export const {
  useGetProductsQuery,
  useGetProductQuery,
  useAddProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation,
} = productApi;
