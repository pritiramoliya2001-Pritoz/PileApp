import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const BASE_URL = 'http://3.7.81.243/projects/plie-api/public/api';

export const loginUser = createAsyncThunk(
  'auth/login',
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const formData = new FormData();
      formData.append('email', email);
      formData.append('password', password);

      const response = await fetch(`${BASE_URL}/login`, {
        method: 'POST',
        body: formData,
      });
      console.log(response, 'Response');
      console.log(formData, 'FormData');

      const data = await response.json();

      if (!response.ok) {
        return rejectWithValue(data.message || 'Login failed');
      }

      return data;
    } catch (error) {
      return rejectWithValue(error.message || 'Network error');
    }
  },
);

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    token: null,
    loading: false,
    error: null,
  },
  reducers: {
    logout: state => {
      state.user = null;
      state.token = null;
      state.error = null;
    },
    clearError: state => {
      state.error = null;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(loginUser.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.data?.user || action.payload.user;
        state.token = action.payload.data?.token || action.payload.token;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { logout, clearError } = authSlice.actions;
export default authSlice.reducer;
