import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export interface HabitCategory {
  id: number;
  name: string;
  icon: string;
  createdAt: Date;
  updatedAt: Date;
}

const initialState: {
  habitCategories: HabitCategory[],
  findAllStatus: string,
} = {
  habitCategories: [],
  findAllStatus: '',
};

export const habitCategoriesSlice = createSlice({
  name: 'habitCategories',
  initialState,
  reducers: {
    findAllStart: (state) => {
      state.findAllStatus = 'loading';
    },
    findAllFailed: (state) => {
      state.findAllStatus = 'error';
    },
    findAllSuccess: (state, action: PayloadAction<HabitCategory[]>) => {
      state.habitCategories = action.payload;
      state.findAllStatus = 'ok';
    },
  },
})

export const {
  findAllStart,
  findAllFailed,
  findAllSuccess,
} = habitCategoriesSlice.actions;
export default habitCategoriesSlice.reducer;
