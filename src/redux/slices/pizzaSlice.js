import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchPizzas = createAsyncThunk('pizza/fetchPizzasStatus', async (params) => {
  const { order, sortBy, category, search, currentPage } = params;

  const { data } = await axios.get(
    `https://6397233886d04c76338c00d0.mockapi.io/items?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}${search}`,
  );
  return data;
});

const initialState = {
  items: [],
  loading: 'pending', //'idle' | 'pending' | 'succeeded' | 'failed'
};

const pizzaSlice = createSlice({
  name: 'pizza',
  initialState,
  reducers: {
    setItems(state, action) {
      state.items = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchPizzas.pending, (state, action) => {
      state.items = [];
      state.loading = 'pending';
    });

    builder.addCase(fetchPizzas.fulfilled, (state, action) => {
      state.items = action.payload;
      state.loading = 'succeeded';
    });

    builder.addCase(fetchPizzas.rejected, (state, action) => {
      state.items = [];
      state.loading = 'failed';
    });
  },
});

export const { setItems } = pizzaSlice.actions;

export default pizzaSlice.reducer;
