import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import authService from './authService';

const user = JSON.parse(localStorage.getItem('user'));

const initialState = {
  mode: 'light',
  user: user ? user : null,
  isError: false,
  isSuccess: false,
  message: '',
  isLoading: false,
  token: '',
  orders:[]
};

export const register = createAsyncThunk(
  'auth/register',
  async (user, thunkAPI) => {
    try {
      return await authService.register(user);
    } catch (error) {
      const message = error.response.data.errors[0].message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const login = createAsyncThunk('auth/login', async (user, thunkAPI) => {
  try {
    return await authService.login(user);
  } catch (error) {
    const message = error.response.data.message;
    return thunkAPI.rejectWithValue(message);
  }
});

export const logout = createAsyncThunk('auth/logout', async () => {
  try {
    return await authService.logout();
  } catch (error) {
    console.error(error);
  }
});

export const getUserInfo = createAsyncThunk('auth/info', async () => {
  try {
    return await authService.getUserInfo();
  } catch (error) {
    console.error(error);
  }
});

export const updateUser = createAsyncThunk('auth/update', async (userData, thunkAPI) => {
  try {
    return await authService.updateUser(userData);
  } catch (error) {
    const message = error.response.data.message;
    return thunkAPI.rejectWithValue(message);
  }
})

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    reset: state => {
      state.isError = false;
      state.isSuccess = false;
      state.message = '';
    },
    resetLoading: state => {
      state.isLoading = false;
    },
    setMode: state => {
      state.mode = state.mode === 'light' ? 'dark' : 'light';
    },
  },
  extraReducers: builder => {
    builder
      .addCase(login.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isSuccess = true;
        state.message = action.payload.message;
      })
      .addCase(login.rejected, (state, action) => {
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(logout.fulfilled, state => {
        state.user = null;
        state.orders = [];
      })
      .addCase(register.fulfilled, (state, action) => {
        state.isSuccess = true;
        state.message = action.payload.message;
      })
      .addCase(register.rejected, (state, action) => {
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getUserInfo.fulfilled, (state,action) => {
        state.isSuccess = true;
        state.orders = action.payload.user.Orders;
      })
      .addCase(getUserInfo.rejected, (state, action) => {
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.isSuccess = true;
        state.message = action.payload.message;
        state.user = action.payload
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.isError = true;
        state.message = action.payload;
      })
  },
});
export const { reset, resetLoading, setMode } = authSlice.actions;
export default authSlice.reducer;
