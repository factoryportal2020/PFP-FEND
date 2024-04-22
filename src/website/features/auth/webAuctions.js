// authActions.js
import axios from 'axios'
import { createAsyncThunk } from '@reduxjs/toolkit'

const backendURL = (process.env.REACT_APP_API_URL)

export const registerUser = createAsyncThunk(
  'website/visitor/register',
  async (params, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      }
      const { data } = await axios.post(
        `${backendURL}/website/visitor/register`,
        params,
        config
      )
      console.log(data);
      return data
    } catch (error) {
      // return custom error message from backend if present
      console.log(error);
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message)
      } else {
        return rejectWithValue(error.message)
      }
    }
  }
)


export const saveResetPassword = createAsyncThunk(
  'customer/reset/password',
  async (params, { rejectWithValue }) => {
    try {
      const adminEncryptId = localStorage.getItem('adminToken');
      const config = {
        headers: {
          'Content-Type': 'application/json',
          'Admin-EncryptId': adminEncryptId,
        },
      }
      const { data } = await axios.post(
        `${backendURL}/website/visitor/reset/password`,
        params,
        config
      )
      return data
    } catch (error) {
      // return custom error message from backend if present
      console.log(error);
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message)
      } else {
        return rejectWithValue(error.message)
      }
    }
  }
)

export const sendPasswordResetLink = createAsyncThunk(
  'customer/forgot/password',
  async (params, { rejectWithValue }) => {
    try {
      const adminEncryptId = localStorage.getItem('adminToken');
      const config = {
        headers: {
          'Content-Type': 'application/json',
          'Admin-EncryptId': adminEncryptId,
        },
      }
      const { data } = await axios.post(
        `${backendURL}/website/visitor/forgot/password`,
        params,
        config
      )
      return data
    } catch (error) {
      // return custom error message from backend if present
      console.log(error);
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message)
      } else {
        return rejectWithValue(error.message)
      }
    }
  }
)


export const userLogin = createAsyncThunk(
  'website/visitor/login',
  async ({ email, password }, { rejectWithValue }) => {
    try {
      // configure header's Content-Type as JSON
      const adminEncryptId = localStorage.getItem('adminToken');
      const config = {
        headers: {
          'Content-Type': 'application/json',
          'Admin-EncryptId': adminEncryptId,
        },
      }
      const { data } = await axios.post(
        `${backendURL}/website/visitor/login`,
        { email, password },
        config
      )
      // store user's token in local storage
      if (data.status) {
        if (data.data) {
          localStorage.setItem('userToken', data.data.access_token)
          localStorage.setItem('permissions', JSON.stringify(data.data.permissions))
          if (data.data.userInfo) {
            localStorage.setItem('role', data.data.userInfo.role)
          }
        }
      }
      return data
    } catch (error) {
      console.log(error);

      // return custom error message from API if any
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message)
      } else {
        return rejectWithValue(error.message)
      }
    }
  }
)

