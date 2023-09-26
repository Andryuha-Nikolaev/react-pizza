import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  totalPrice: 0,
  items: [],
  totalItems: 0,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem(state, action) {
      const finditem = state.items.find((obj) => obj.data === action.payload.data);
      if (finditem) {
        finditem.count++;
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

    minusItem(state, action) {
      const finditem = state.items.find((obj) => obj.data === action.payload);
      if (finditem) {
        finditem.count--;
      }

      state.totalPrice = state.items.reduce((sum, obj) => {
        return obj.price * obj.count + sum;
      }, 0);
      state.totalItems = state.items.reduce((sum, obj) => {
        return obj.count + sum;
      }, 0);
    },

    removeItem(state, action) {
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

export const selectCart = (state) => state.cart;

export const selectCartItem = (data) => (state) =>
  state.cart.items.find((obj) => obj.data === data);

export const { addItem, minusItem, removeItem, clearItems } = cartSlice.actions;

export default cartSlice.reducer;
