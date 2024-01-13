// app/services/auth/customerService.js
// React-specific entry point to allow generating React hooks
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

let baseURL = (process.env.REACT_APP_API_URL)



export const customerApi = createApi({
    reducerPath: 'customerApi',
    baseQuery: fetchBaseQuery({
        // base url of backend API
        baseUrl: baseURL,
        // prepareHeaders is used to configure the header of every request and gives access to getState which we use to include the token from the store
        prepareHeaders: (headers, { getState }) => {
            const token = getState().auth.userToken
            headers.set('Access-Control-Allow-Origin', baseURL)
            if (token) {
                // include token in req header
                // headers.set('Content-type', 'multipart/form-data')
                headers.set('authorization', `Bearer ${token}`)
                return headers
            }
        },
    }),
    endpoints: (builder) => ({
        getDetail: builder.query({
            query: (encrypt_id) => ({
                url: `admin/customer/get/${encrypt_id}`,
                method: 'GET',
            }),
        }),
        listDetail: builder.mutation({
            query: (body) => ({
                url: `admin/customer/list/`,
                method: 'POST',
                body,
            }),
            transformResponse: (response) => {
                
                return response;
              }
        }),
    }),
})

// export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
// export const { useGetUserDetailsQuery, useGetDetailQuery, useListDetailMutation } = authApi
export const { useGetDetailQuery, useListDetailMutation } = customerApi
