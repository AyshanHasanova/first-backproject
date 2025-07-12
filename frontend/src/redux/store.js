
import { configureStore } from "@reduxjs/toolkit";
import { productApi } from "./api/productsApi";
import { userApi } from "./api/userApi";

export const store = configureStore({
    reducer : {
        [productApi.reducerPath] : productApi.reducer,
        [userApi.reducerPath] : userApi.reducer

    },
    middleware: (getDefaultMiddleware)=>
        getDefaultMiddleware().concat([productApi.middleware, userApi.middleware])
})