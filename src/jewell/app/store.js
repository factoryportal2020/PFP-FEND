// app/store.js
import { configureStore } from '@reduxjs/toolkit'
import authReducer from '../features/auth/authSlice'
import viewReducer from '../features/auth/viewSlice' 
import { authApi } from './services/auth/authService'

const store = configureStore({
    reducer: {
        auth: authReducer,
        view: viewReducer,
        [authApi.reducerPath]: authApi.reducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware()
        .concat(authApi.middleware),
})
export default store
