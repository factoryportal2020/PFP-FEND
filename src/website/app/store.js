// app/store.js
import { configureStore } from '@reduxjs/toolkit'
import adminReducer from '../features/auth/adminSlice'
import websiteReducer from '../features/auth/websiteSlice'
import { websiteAuthApi } from './services/auth/authService'

const store = configureStore({
    reducer: {
        adminAuth: adminReducer,
        websiteAuth: websiteReducer,
        [websiteAuthApi.reducerPath]: websiteAuthApi.reducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware()
    .concat(websiteAuthApi.middleware),
})
export default store
