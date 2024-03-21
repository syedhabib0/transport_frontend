// src/features/postsSlice.js
import apis from '@/constants/apis';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';


export const fetchTruckTypes = createAsyncThunk('truckTypes/fetchTruckTypes', async (_,{getState}) => {
  const token = getState().auth.access_token
  const response = await axios.get(apis.getTruckTypes,{headers:{Authorization:`Bearer ${token}`}});
  return response.data;
});

const truckTypeSlice = createSlice({
  name: 'truckTypes',
  initialState: {
    truckTypes: {},
    message:"",
    isLoading:false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTruckTypes.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchTruckTypes.fulfilled, (state, action) => {
        state.isLoading = false;
        state.message = action.payload.message;
        state.truckTypes = action.payload.data;
      })
      .addCase(fetchTruckTypes.rejected, (state, action) => {
        state.isLoading = false;
        state.message = action.error.message;
        state.truckTypes = {};
      });
  },
});

export default truckTypeSlice.reducer;