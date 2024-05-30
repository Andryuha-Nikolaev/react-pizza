import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../store';

export type CartItemProps = {
  id: number;
  title: string;
  price: number;
  imageUrl: string;
  type: string;
  size: number;
  count: number;
  data: string;
};

interface CartSliceProps {
  totalPrice: number;
  items: CartItemProps[];
  totalItems: number;
}

const initialState: CartSliceProps = {
  totalPrice: 0,
  items: [],
  totalItems: 0,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem(state, action: PayloadAction<CartItemProps>) {
      const item = state.items.find((obj) => obj.data === action.payload.data);
      if (item) {
        item.count++;
      } else {
        state.items.push({
          ...action.payload,
          count: 1,
        });
      }
      state.totalPrice = state.items.reduce((sum, obj) => {
        return obj.price * obj.count + sum;
      }, 0);
      state.totalItems = state.items.reduce((sum, obj) => {
        return obj.count + sum;
      }, 0);
    },

    minusItem(state, action: PayloadAction<string>) {
      const item = state.items.find((obj) => obj.data === action.payload);
      if (item) {
        item.count--;
      }

      state.totalPrice = state.items.reduce((sum, obj) => {
        return obj.price * obj.count + sum;
      }, 0);
      state.totalItems = state.items.reduce((sum, obj) => {
        return obj.count + sum;
      }, 0);
    },

    removeItem(state, action: PayloadAction<string>) {
      state.items = state.items.filter((obj) => obj.data !== action.payload);
      state.totalPrice = state.items.reduce((sum, obj) => {
        return obj.price * obj.count + sum;
      }, 0);
      state.totalItems = state.items.reduce((sum, obj) => {
        return obj.count + sum;
      }, 0);
    },
    clearItems(state) {
      state.items = [];
      state.totalPrice = 0;
      state.totalItems = 0;
    },
  },
});

export const selectCart = (state: RootState) => state.cart;

export const selectCartItem = (data: string) => (state: RootState) =>
  state.cart.items.find((obj: CartItemProps) => obj.data === data);

export const { addItem, minusItem, removeItem, clearItems } = cartSlice.actions;

export default cartSlice.reducer;
