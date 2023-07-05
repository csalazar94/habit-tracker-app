import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { HabitCategory } from '../storage/habit-categories/reducer';

type DailyRecord = {
  id: number;
  habitId: number;
  date: string;
};

type Habit = {
  id: number;
  name: string;
  frequency: string;
  target: number;
  current: number;
  progress: number;
  dailyRecords: DailyRecord[];
  habitCategory: HabitCategory;
};

type HabitsStackParamList = {
  Habits: undefined;
  AddHabit: undefined;
  Habit: { habitId: number };
};
type HabitsProps = NativeStackScreenProps<HabitsStackParamList, 'Habits'>;
type AddHabitProps = NativeStackScreenProps<HabitsStackParamList, 'AddHabit'>;
type HabitProps = NativeStackScreenProps<HabitsStackParamList, 'Habit'>;

type AuthStackParamList = {
  Login: undefined;
  Register: undefined;
};
type LoginProps = NativeStackScreenProps<AuthStackParamList, 'Login'>;
type RegisterProps = NativeStackScreenProps<AuthStackParamList, 'Register'>;

type AppDrawerParamList = {
  HabitsDrawer: undefined;
  Profile: undefined;
  };
type AppDrawerHabitsProps = NativeStackScreenProps<AppDrawerParamList, 'HabitsDrawer'>;
type AppDrawerProfileProps = NativeStackScreenProps<AppDrawerParamList, 'Profile'>;

export type {
  DailyRecord,
  Habit,
  HabitsStackParamList,
  HabitsProps,
  AddHabitProps,
  HabitProps,
  AuthStackParamList,
  LoginProps,
  RegisterProps,
  AppDrawerParamList,
  AppDrawerHabitsProps,
  AppDrawerProfileProps,
};
