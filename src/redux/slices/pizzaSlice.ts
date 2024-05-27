import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { RootState } from '../store';

export type PizzaProps = {
  id: number;
  title: string;
  price: number;
  imageUrl: string;
  sizes: number[];
  types: number[];
};

enum Status {
  PENDING = 'pending',
  IDLE = 'idle',
  SUCCEEDED = 'succeeded',
  FAILED = 'failed',
}

interface PizzaSliceState {
  items: PizzaProps[];
  loading: Status;
  pageCountNumber: number;
}

type FetchPizzasArgs = Record<string, string>;

export const fetchPizzas = createAsyncThunk(
  'pizza/fetchPizzasStatus',
  async (params: FetchPizzasArgs) => {
    const { order, sortBy, category, search, currentPage } = params;

    const { data } = await axios.get<PizzaProps[]>(
      `https://6397233886d04c76338c00d0.mockapi.io/items?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}${search}`,
    );
    return data;
  },
);

export const pageCount = createAsyncThunk(
  'pizza/fetchPageCountStatus',
  async (params: FetchPizzasArgs) => {
    const { order, sortBy, category, search } = params;

    const { data } = await axios.get<PizzaProps[]>(
      `https://6397233886d04c76338c00d0.mockapi.io/items?&${category}&sortBy=${sortBy}&order=${order}${search}`,
    );
    return Math.ceil(data.length / 4);
  },
);

const initialState: PizzaSliceState = {
  items: [],
  loading: Status.PENDING,
  pageCountNumber: 3,
};

const pizzaSlice = createSlice({
  name: 'pizza',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchPizzas.pending, (state, action) => {
      state.items = [];
      state.loading = Status.PENDING;
    });

    builder.addCase(fetchPizzas.fulfilled, (state, action) => {
      state.items = action.payload;
      state.loading = Status.SUCCEEDED;
    });

    builder.addCase(fetchPizzas.rejected, (state, action) => {
      state.items = [];
      state.loading = Status.FAILED;
    });

    builder.addCase(pageCount.fulfilled, (state, action) => {
      state.pageCountNumber = action.payload;
    });
  },
});

export const selectPizzasData = (state: RootState) => state.pizza;

export default pizzaSlice.reducer;
