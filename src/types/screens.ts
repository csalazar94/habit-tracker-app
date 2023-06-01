import type { NativeStackScreenProps } from '@react-navigation/native-stack';

type Habit = {
  id?: number;
  name: string;
  frequency: string;
  unit: string;
  target: number;
  current: number;
  progress: number;
  done: boolean;
};

type HabitsStackParamList = {
  Habits: undefined;
  AddHabit: undefined;
  Habit: { habit: Habit };
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
  Habits: undefined;
  Profile: undefined;
};
type AppDrawerHabitsProps = NativeStackScreenProps<AppDrawerParamList, 'Habits'>;
type AppDrawerProfileProps = NativeStackScreenProps<AppDrawerParamList, 'Profile'>;

export type {
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
