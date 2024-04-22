import { createSlice } from '@reduxjs/toolkit'
import { getAdmin } from './adminAuctions'

// initialize adminToken from local storage
const adminToken = localStorage.getItem('adminToken')
    ? localStorage.getItem('adminToken')
    : null

const initialState = {
    preLoading: false,
    adminInfo: null, // for admin object
    adminToken, // for storing the JWT
    errors: [],
    errorsModalTrigger: "fade",
    navMenu: "",
    success: false, // for monitoring the registration process.
    message: "",
}

const adminSlice = createSlice({
    name: 'adminAuth',
    initialState,
    reducers: {
        setAdminCredentials: (state, { payload }) => {
            state.adminInfo = payload
        },
        changeNavMenu: (state, { payload }) => {
            console.log(payload);
            state.navMenu = payload
        },
        emptyStatus: (state) => { //same as initialState
            state.preLoading = false
            state.adminInfo = null
            state.adminToken = null
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
        // get admin
        [getAdmin.pending]: (state) => {
            console.log(state);
            state.preLoading = true
            state.errors = []
            state.errorsModalTrigger = "fade"
        },
        [getAdmin.fulfilled]: (state, { payload }) => {
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
                console.log(payload.data.adminInfo);

                state.preLoading = true
                state.success = true
                state.errors = []
                state.navMenu = "Home"
                state.errorsModalTrigger = "fade"
                state.message = payload.message
                state.adminInfo = payload.data.adminInfo
                state.adminToken = payload.data.adminToken
            }
        },
        [getAdmin.rejected]: (state, { payload }) => {
            state.preLoading = false
            state.errors = payload
            state.errorsModalTrigger = "d-block"
        },
    },
})

export const { setAdminCredentials, changeNavMenu, emptyStatus, startPreloading } = adminSlice.actions

export default adminSlice.reducer
