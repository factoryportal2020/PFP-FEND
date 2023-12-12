import { createSlice } from '@reduxjs/toolkit'
import { registerUser, userLogin } from './authAuctions'

// initialize userToken from local storage
const userToken = localStorage.getItem('userToken')
    ? localStorage.getItem('userToken')
    : null


const initialState = {
    preLoading: false,
    userInfo: null, // for user object
    userToken, // for storing the JWT
    errors: [],
    errorsModalTrigger: "fade",
    navMenu: "",
    success: false, // for monitoring the registration process.
    message: "",
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logout: (state) => {
            localStorage.removeItem('userToken') // deletes token from storage
            state.preLoading = false
            state.userInfo = null
            state.userToken = null
            state.errors = []
            state.navMenu = ""
            state.errorsModalTrigger = "fade"
            state.success = false
            state.message = ""
        },
        setCredentials: (state, { payload }) => {
            state.userInfo = payload
        },
        changeNavMenu: (state, { payload }) => {
            state.navMenu = payload
        },
        emptyStatus: (state) => {
            state.preLoading = false
            state.userInfo = null
            state.userToken = null
            state.errors = []
            state.navMenu = ""
            state.errorsModalTrigger = "fade"
            state.success = false
            state.message = ""
        },
        startPreloading: (state, { payload }) => {
            state.preLoading = payload
        }
    },
    extraReducers: {
        // register user
        [registerUser.pending]: (state) => {
            state.preLoading = true
            state.errors = []
            state.errorsModalTrigger = "fade"
        },
        [registerUser.fulfilled]: (state, { payload }) => {
            console.log(payload);
            // registration successful
            state.preLoading = false

            if (!payload.status) {
                state.preLoading = true
                state.success = false
                state.errors = payload.message
                state.errorsModalTrigger = "d-block"
            } else {
                state.preLoading = true
                state.success = true
                state.errors = []
                state.message = payload.message
                state.errorsModalTrigger = "fade"
            }
        },
        [registerUser.rejected]: (state, { payload }) => {
            state.preLoading = false
            state.errors = payload.message
            state.errorsModalTrigger = "d-block"
        },

        // login user
        [userLogin.pending]: (state) => {
            state.preLoading = true
            state.errors = []
            state.errorsModalTrigger = "fade"
        },
        [userLogin.fulfilled]: (state, { payload }) => {
            state.preLoading = false
            console.log(payload);

            if (!payload.status) {
                state.preLoading = true
                state.success = false
                state.errors = []
                state.navMenu = ""
                state.errorsModalTrigger = "fade"
                state.message = payload.message
            } else {
                console.log(payload.data.userInfo);
                console.log(payload.data.access_token);

                state.preLoading = true
                state.success = true
                state.errors = []
                state.navMenu = "Dashboard"
                state.errorsModalTrigger = "fade"
                state.message = payload.message
                state.userInfo = payload.data.userInfo
                state.userToken = payload.data.access_token
            }
        },
        [userLogin.rejected]: (state, { payload }) => {
            state.preLoading = false
            state.errors = payload.message
            state.errorsModalTrigger = "d-block"
        },

    },
})

export const { logout, setCredentials, changeNavMenu, emptyStatus, startPreloading } = authSlice.actions

export default authSlice.reducer
