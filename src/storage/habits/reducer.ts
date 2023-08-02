import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { HabitCategory } from '../habit-categories/reducer';
import { DailyRecord } from '../../types/screens';

export interface Habit {
  id: number;
  name: string;
  target: number;
  frequency: string;
  createdAt: Date;
  updatedAt: Date;
  habitCategory: HabitCategory;
  dailyRecords: DailyRecord[];
};

const initialState: {
  habits: Habit[],
  findOneStatus: { habitId: number, status: string }[],
  findAllStatus: string,
  createStatus: string,
  createError: { property: string, messages: [] }[] | string,
  createDailyRecordStatus: { habitId: number, date: string, status: string }[],
  deleteDailyRecordStatus: { dailyRecordId: number, status: string }[],
} = {
  habits: [],
  findOneStatus: [],
  findAllStatus: '',
  createStatus: '',
  createError: [],
  createDailyRecordStatus: [],
  deleteDailyRecordStatus: [],
};

export const habitsSlice = createSlice({
  name: 'habits',
  initialState,
  reducers: {
    findOneStart: (state, action: PayloadAction<{ habitId: number }>) => {
      const findOneStatus = state.findOneStatus.find((s) => s.habitId === action.payload.habitId);
      if (findOneStatus) {
        findOneStatus.status = 'loading';
      } else {
        state.findOneStatus.push({
          habitId: action.payload.habitId,
          status: 'loading',
        });
      }
    },
    findOneFailed: (state, action: PayloadAction<{ habitId: number }>) => {
      const findOneStatus = state.findOneStatus.find((s) => s.habitId === action.payload.habitId);
      if (findOneStatus) {
        findOneStatus.status = 'error';
      } else {
        state.findOneStatus.push({
          habitId: action.payload.habitId,
          status: 'error',
        });
      }
    },
    findOneSuccess: (state, action: PayloadAction<Habit>) => {
      state.habits = state.habits.map((h) => {
        if (h.id === action.payload.id) {
          return action.payload;
        } else {
          return h;
        }
      })
      const findOneStatus = state.findOneStatus.find((s) => s.habitId === action.payload.id);
      if (findOneStatus) {
        findOneStatus.status = 'ok';
      } else {
        state.findOneStatus.push({
          habitId: action.payload.id,
          status: 'ok',
        });
      }
    },
    findOneReset: (state, action: PayloadAction<{ habitId: number }>) => {
      state.findOneStatus = state.findOneStatus.filter((s) => !(s.habitId === action.payload.habitId));
    },
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
    createFailed: (state, action: PayloadAction<[] | string>) => {
      state.createStatus = 'error';
      state.createError = action.payload;
    },
    createSuccess: (state, action: PayloadAction<Habit>) => {
      state.habits.push(action.payload);
      state.createStatus = 'ok';
    },
    createReset: (state) => {
      state.createStatus = '';
    },
    createDailyRecordStart: (state, action: PayloadAction<{
      habitId: number,
      date: string,
    }>) => {
      const dailyRecordStatus = state.createDailyRecordStatus.find((s) => s.habitId === action.payload.habitId && s.date === action.payload.date);
      if (dailyRecordStatus) {
        dailyRecordStatus.status = 'loading';
      } else {
        state.createDailyRecordStatus.push({
          habitId: action.payload.habitId,
          date: action.payload.date,
          status: 'loading',
        });
      }
    },
    createDailyRecordFailed: (state, action: PayloadAction<{
      habitId: number,
      date: string,
    }>) => {
      const dailyRecordStatus = state.createDailyRecordStatus.find((s) => s.habitId === action.payload.habitId && s.date === action.payload.date);
      if (dailyRecordStatus) {
        dailyRecordStatus.status = 'error';
      } else {
        state.createDailyRecordStatus.push({
          habitId: action.payload.habitId,
          date: action.payload.date,
          status: 'error',
        });
      }
    },
    createDailyRecordSuccess: (state, action: PayloadAction<DailyRecord>) => {
      state.habits.find((habit) => habit.id === action.payload.habitId)?.dailyRecords.push(action.payload);
      const dailyRecordStatus = state.createDailyRecordStatus.find((s) => s.habitId === action.payload.habitId && s.date === action.payload.date);
      if (dailyRecordStatus) {
        dailyRecordStatus.status = 'ok';
      } else {
        state.createDailyRecordStatus.push({
          habitId: action.payload.habitId,
          date: action.payload.date,
          status: 'ok',
        });
      }
    },
    createDailyRecordReset: (state, action: PayloadAction<{
      habitId: number,
      date: string,
    }>) => {
      state.createDailyRecordStatus = state.createDailyRecordStatus.filter((s) => !(s.habitId === action.payload.habitId && s.date === action.payload.date));
    },
    deleteDailyRecordStart: (state, action: PayloadAction<{
      dailyRecordId: number,
    }>) => {
      const dailyRecordStatus = state.deleteDailyRecordStatus.find((s) => s.dailyRecordId === action.payload.dailyRecordId);
      if (dailyRecordStatus) {
        dailyRecordStatus.status = 'loading';
      } else {
        state.deleteDailyRecordStatus.push({
          dailyRecordId: action.payload.dailyRecordId,
          status: 'loading',
        });
      }
    },
    deleteDailyRecordFailed: (state, action: PayloadAction<{
      dailyRecordId: number,
    }>) => {
      const dailyRecordStatus = state.deleteDailyRecordStatus.find((s) => s.dailyRecordId === action.payload.dailyRecordId);
      if (dailyRecordStatus) {
        dailyRecordStatus.status = 'error';
      } else {
        state.deleteDailyRecordStatus.push({
          dailyRecordId: action.payload.dailyRecordId,
          status: 'error',
        });
      }
    },
    deleteDailyRecordSuccess: (state, action: PayloadAction<{
      habitId: number,
      dailyRecordId: number,
    }>) => {
      const currentHabit = state.habits.find((h) => h.id === action.payload.habitId);
      if (currentHabit) {
        currentHabit.dailyRecords = currentHabit.dailyRecords.filter((dr) => dr.id !== action.payload.dailyRecordId);
      }
      const dailyRecordStatus = state.deleteDailyRecordStatus.find((s) => s.dailyRecordId === action.payload.dailyRecordId);
      if (dailyRecordStatus) {
        dailyRecordStatus.status = 'ok';
      } else {
        state.deleteDailyRecordStatus.push({
          dailyRecordId: action.payload.dailyRecordId,
          status: 'ok',
        });
      }
    },
    deleteDailyRecordReset: (state, action: PayloadAction<{
      dailyRecordId: number,
    }>) => {
      state.deleteDailyRecordStatus = state.deleteDailyRecordStatus.filter((s) => !(s.dailyRecordId === action.payload.dailyRecordId));
    },
  },
})

export const {
  findOneStart,
  findOneFailed,
  findOneSuccess,
  findOneReset,
  findAllStart,
  findAllFailed,
  findAllSuccess,
  createStart,
  createFailed,
  createSuccess,
  createReset,
  createDailyRecordStart,
  createDailyRecordFailed,
  createDailyRecordSuccess,
  createDailyRecordReset,
  deleteDailyRecordStart,
  deleteDailyRecordFailed,
  deleteDailyRecordSuccess,
  deleteDailyRecordReset,
} = habitsSlice.actions;
export default habitsSlice.reducer;
