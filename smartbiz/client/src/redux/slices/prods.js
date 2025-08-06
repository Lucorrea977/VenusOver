import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API = 'http://localhost:5000/api/sales';

export const getProds = createAsyncThunk('prods/get', async () => {
  const res = await axios.get(`${API}/prods`);
  return res.data;
});

export const addProd = createAsyncThunk('prods/add', async (prod) => {
  const res = await axios.post(`${API}/prods`, prod);
  return res.data;
});

const slice = createSlice({
  name: 'prods',
  initialState: { list: [] },
  extraReducers: builder => {
    builder.addCase(getProds.fulfilled, (state, action) => {
      state.list = action.payload;
    });
  }
});

export default slice.reducer;
