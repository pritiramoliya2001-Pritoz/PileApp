import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const BASE_URL = 'http://3.7.81.243/projects/plie-api/public/api';

export const fetchEvents = createAsyncThunk(
  'events/fetchAll',
  async (token, { rejectWithValue }) => {
    try {
      const response = await fetch(`${BASE_URL}/events-listing`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(response, 'RESPONSE');

      const data = await response.json();

      if (!response.ok) {
        return rejectWithValue(data.message || 'Failed to fetch events');
      }

      return data;
    } catch (error) {
      return rejectWithValue(error.message || 'Network error');
    }
  },
);

const eventsSlice = createSlice({
  name: 'events',
  initialState: {
    list: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchEvents.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchEvents.fulfilled, (state, action) => {
        state.loading = false;
        state.list =
          action.payload.data || action.payload.events || action.payload || [];
      })
      .addCase(fetchEvents.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default eventsSlice.reducer;
