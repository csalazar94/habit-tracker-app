import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  gender: string;
  dob: string;
  weight: number;
  height: number;
  createdAt: Date;
  updatedAt: Date;
};

const initialState: {
  user: User | null,
  loginStatus: string,
  registerStatus: string,
  registerError: { property: string, messages: [] }[] | string,
  updateStatus: string,
  updateError: { property: string, messages: [] }[] | string,
} = {
  user: null,
  loginStatus: '',
  registerStatus: '',
  registerError: [],
  updateStatus: '',
  updateError: [],
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
      state.registerError = [];
    },
    registerFailed: (state, action: PayloadAction<[] | string>) => {
      state.registerStatus = 'error';
      state.registerError = action.payload;
    },
    registerSuccess: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
      state.registerStatus = 'ok';
      state.registerError = [];
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
    updateFailed: (state, action: PayloadAction<[] | string>) => {
      state.updateStatus = 'error';
      state.updateError = action.payload;
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
