import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import ordersService from './ordersService';

const initialState = {
    orders: [],
    isLoading: false,
};

export const getAll = createAsyncThunk('orders', async thunkAPI => {
    try {
      return await ordersService.getAll();
    } catch (error) {
      const message = error.response.data;
      return thunkAPI.rejectWithValue(message);
    }
});

export const createOrder = createAsyncThunk('orders/create', async (order, thunkAPI) => {
  try {
    return await ordersService.createOrder(order);
  } catch (error) {
      const message = error.response.data;
      return thunkAPI.rejectWithValue(message);
  }
});

export const ordersSlice = createSlice({
    name: 'orders',
    initialState,
    reducers: {
      resetOrder: state => {
        state.isLoading = false;
      },
    },  
    extraReducers: builder => {
      builder
        .addCase(getAll.fulfilled, (state, action) => {
          state.orders = action.payload.allorders;
        })
        .addCase(getAll.pending, state => {
          state.isLoading = true;
        })
    },
  });

export const { resetOrder } = ordersSlice.actions;
export default ordersSlice.reducer;

