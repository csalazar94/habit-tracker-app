import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { HabitCategory } from '../habit-categories/reducer';

export interface Habit {
  id: number;
  name: string;
  target: number;
  frequency: string;
  createdAt: Date;
  updatedAt: Date;
  habitCategory: HabitCategory;
};

const initialState: {
  habits: Habit[],
  findAllStatus: string,
  createStatus: string,
} = {
  habits: [],
  findAllStatus: '',
  createStatus: '',
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
    createStart: (state, _action: PayloadAction<{
      userId: number,
      habitCategoryId: number,
      name: string,
      target: number;
      frequency: string;
    }>) => {
      state.createStatus = 'loading';
    },
    createFailed: (state) => {
      state.createStatus = 'error';
    },
    createSuccess: (state, action: PayloadAction<Habit>) => {
      state.habits.push(action.payload);
      state.createStatus = 'ok';
    },
    createReset: (state) => {
      state.createStatus = '';
    },
  },
})

export const {
  findAllStart,
  findAllFailed,
  findAllSuccess,
  createStart,
  createFailed,
  createSuccess,
  createReset,
} = habitsSlice.actions;
export default habitsSlice.reducer;
