import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API = 'http://localhost:5000/api/sales';

export const getStats = createAsyncThunk('sales/get', async () => {
  const res = await axios.get(`${API}/stats`);
  return res.data;
});

const slice = createSlice({
  name: 'sales',
  initialState: { stats: {} },
  extraReducers: builder => {
    builder.addCase(getStats.fulfilled, (state, action) => {
      state.stats = action.payload;
    });
  }
});

export default slice.reducer;
