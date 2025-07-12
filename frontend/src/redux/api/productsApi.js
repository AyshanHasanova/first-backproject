import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const productApi = createApi({
  reducerPath: 'productApi',
  baseQuery: fetchBaseQuery({ baseUrl: '/api/v1', credentials: 'include' }),
  tagTypes: ['Products'],
  endpoints: builder => ({
    createProduct: builder.mutation({
      query: formData => ({
        url: '/admin/product',
        method: 'POST',
        body: formData,
      }),
      invalidatesTags: ['Products']
    }),
    // updateProduct: builder.mutation({
    //   query: ({ id, formData }) => ({
    //     url: `/admin/product/${id}`,
    //     method: 'PUT',
    //     body: formData,
    //   }),
    //   invalidatesTags: ['Products']
    // }),
    // deleteProduct: builder.mutation({
    //   query: id => ({
    //     url: `/admin/product/${id}`,
    //     method: 'DELETE',
    //   }),
    //   invalidatesTags: ['Products']
    // }),
    getProducts: builder.query({
      query: () => '/mehsullar',
      providesTags: ['Products']
    }),
    getProductsDetails :builder.query({
         query: (id) => `/mehsullar/${id}`,
      providesTags: ['Products']
    })
  })
})

export const {
  useCreateProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation,
  useGetProductsQuery,
  useGetProductsDetailsQuery
} = productApi 