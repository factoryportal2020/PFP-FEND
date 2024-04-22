// aadminActions.js
import axios from 'axios'
import { createAsyncThunk } from '@reduxjs/toolkit'

const backendURL = (process.env.REACT_APP_API_URL)

export const getAdmin = createAsyncThunk(
  'website/admin/get',
  async (params, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      }
      const { data } = await axios.post(
        `${backendURL}/website/admin/get`,
        params,
        config
      )
      console.log(data);
      if (data.status) {
        if (data.data) {
          localStorage.setItem('adminToken', data.data.adminToken)
          if (data.data.adminInfo) {
            localStorage.setItem('adminName', data.data.adminInfo.site_url)
          }
        }
      }
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



