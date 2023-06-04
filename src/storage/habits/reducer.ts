import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export interface HabitCategory {
  id: number;
  name: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Habit {
  id: number;
  name: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;
  habitCategory: HabitCategory;
};

const initialState: {
  habits: Habit[],
  findAllStatus: string,
} = {
  habits: [],
  findAllStatus: '',
};

export const habitsSlice = createSlice({
  name: 'habits',
  initialState,
  reducers: {
    findAllStart: (state, _action: PayloadAction<{ userId: number }>) => {
      state.findAllStatus = 'loading';
    },
    findAllFailed: (state) => {
      state.findAllStatus = 'error';
    },
    findAllSuccess: (state, action: PayloadAction<Habit[]>) => {
      state.habits = action.payload;
      state.findAllStatus = 'ok';
    },
  },
})

export const {
  findAllStart,
  findAllFailed,
  findAllSuccess,
} = habitsSlice.actions;
export default habitsSlice.reducer;
