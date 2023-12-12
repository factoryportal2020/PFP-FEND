// authActions.js
import axios from 'axios'
import { createAsyncThunk } from '@reduxjs/toolkit'

const backendURL = (process.env.REACT_APP_API_URL)

export const registerUser = createAsyncThunk(
  'auth/register',
  async (params, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      }
      const { data } = await axios.post(
        `${backendURL}/admin/register`,
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
  'auth/login',
  async ({ email, password }, { rejectWithValue }) => {
    try {
      // configure header's Content-Type as JSON
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      }
      const { data } = await axios.post(
        `${backendURL}/admin/login`,
        { email, password },
        config
      )
      // store user's token in local storage
      console.log(data);
      if (data.status) {
        localStorage.setItem('userToken', data.data.access_token)
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

