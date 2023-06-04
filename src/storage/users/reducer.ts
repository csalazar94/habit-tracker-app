import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  gender: string;
  dob: Date;
  weight: number;
  height: number;
  createdAt: Date;
  updatedAt: Date;
};

const initialState: {
  user: User | null,
  loginStatus: string,
  registerStatus: string,
  updateStatus: string,
} = {
  user: null,
  loginStatus: '',
  registerStatus: '',
  updateStatus: '',
};

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    registerStart: (state, _action: PayloadAction<{
      firstName: string,
      lastName: string,
      email: string,
      password: string,
    }>) => {
      state.registerStatus = 'loading';
    },
    registerFailed: (state) => {
      state.registerStatus = 'error';
    },
    registerSuccess: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
      state.registerStatus = 'ok';
    },
    loginStart: (state, _action: PayloadAction<{ email: string, password: string }>) => {
      state.loginStatus = 'loading';
    },
    loginFailed: (state) => {
      state.loginStatus = 'error';
    },
    loginSuccess: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
      state.loginStatus = 'ok';
    },
    updateStart: (state, _action: PayloadAction<{
      userId: number,
      firstName: string,
      lastName: string,
      gender: string,
      dob: string,
      weight: number,
      height: number,
    }>) => {
      state.updateStatus = 'loading';
    },
    updateFailed: (state) => {
      state.updateStatus = 'error';
    },
    updateSuccess: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
      state.updateStatus = 'ok';
    },
    logout: (state) => {
      state.user = null;
      state.loginStatus = '';
      state.registerStatus = '';
    },
  },
})

export const {
  registerStart,
  registerFailed,
  registerSuccess,
  loginStart,
  loginFailed,
  loginSuccess,
  updateStart,
  updateFailed,
  updateSuccess,
  logout,
} = usersSlice.actions;
export default usersSlice.reducer;