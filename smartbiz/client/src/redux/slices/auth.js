import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API = 'http://localhost:5000/api/auth';

export const login = createAsyncThunk('auth/login', async (cred) => {
  const res = await axios.post(`${API}/login`, cred);
  return res.data;
});

export const register = createAsyncThunk('auth/register', async (data) => {
  const res = await axios.post(`${API}/register`, data);
  return res.data;
});

const slice = createSlice({
  name: 'auth',
  initialState: { user: null, token: null },
  reducers: { logout: state => { state.user = null; state.token = null } },
  extraReducers: builder => {
    builder.addCase(login.fulfilled, (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
    });
  }
});

export const { logout } = slice.actions;
export default slice.reducer;
