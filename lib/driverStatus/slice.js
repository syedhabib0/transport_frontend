// src/features/postsSlice.js
import apis from '@/constants/apis';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';


export const fetchDriverStatus = createAsyncThunk('driverStatus/fetchDriverStatus', async (_,{getState}) => {
  const token = getState().auth.access_token
  const response = await axios.get(apis.getDriverStatus,{headers:{Authorization:`Bearer ${token}`}});
  return response.data;
});

const driverStatusSlice = createSlice({
  name: 'driverStatus',
  initialState: {
    driverStatus: {},
    message:"",
    isLoading:false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchDriverStatus.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchDriverStatus.fulfilled, (state, action) => {
        state.isLoading = false;
        state.message = action.payload.message;
        state.driverStatus = action.payload.data;
      })
      .addCase(fetchDriverStatus.rejected, (state, action) => {
        state.isLoading = false;
        state.message = action.error.message;
        state.driverStatus = {};
      });
  },
});

export default driverStatusSlice.reducer;