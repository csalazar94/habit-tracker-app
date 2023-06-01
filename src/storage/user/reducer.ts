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

const initialState: { user: User | null, status: string } = {
  user: null,
  status: '',
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    loginStart: (state, action: PayloadAction<{ email: string, password: string }>) => {
      state.status = 'loading';
    },
    loginFailed: (state) => {
      state.status = 'error';
    },
    loginSuccess: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
      state.status = 'ok';
    },
    logout: (state) => {
      state.user = null;
      state.status = '';
    }
  },
})

export const { loginStart, loginFailed, loginSuccess, logout } = userSlice.actions;
export default userSlice.reducer;
