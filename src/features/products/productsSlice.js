import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import productsService from './productsService';

const initialState = {
  products: [],
  isLoading: false,
};

export const getAll = createAsyncThunk('products/', async thunkAPI => {
  try {
    return await productsService.getAll();
  } catch (error) {
    const message = error.response.data;
    return thunkAPI.rejectWithValue(message);
  }
});

export const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    reset: state => {
      state.isLoading = false;
    },
  },  
  extraReducers: builder => {
    builder
      .addCase(getAll.fulfilled, (state, action) => {
        state.products = action.payload.allproducts;
      })
      .addCase(getAll.pending, state => {
        state.isLoading = true;
      });
  },
});

export const { reset } = productsSlice.actions;
export default productsSlice.reducer;
