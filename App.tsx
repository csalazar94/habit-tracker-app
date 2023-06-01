import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { adaptNavigationTheme, Provider, useTheme } from 'react-native-paper';
import {
  DefaultTheme as NavigationDefaultTheme,
} from '@react-navigation/native';
import {
  MD3LightTheme,
} from 'react-native-paper';
import merge from 'deepmerge';
import HabitsScreen from './src/screens/habits';
import AddHabitScreen from './src/screens/add-habit';
import ProfileScreen from './src/screens/profile';
import LoginScreen from './src/screens/login';
import RegisterScreen from './src/screens/register';
import HabitScreen from './src/screens/habit';
import { AppDrawerParamList, AuthStackParamList, HabitsStackParamList } from './src/types/screens';

const {
  LightTheme,
} = adaptNavigationTheme({
  reactNavigationLight: NavigationDefaultTheme,
});

const CombinedDefaultTheme = merge(MD3LightTheme, LightTheme);

const HabitsStackNavigator = createStackNavigator<HabitsStackParamList>();
const AuthStackNavigator = createStackNavigator<AuthStackParamList>();
const AppDrawerNavigator = createDrawerNavigator<AppDrawerParamList>();

const HabitsStack = () => {
  return (
    <HabitsStackNavigator.Navigator screenOptions={{ headerShown: false }}>
      <HabitsStackNavigator.Screen name="Habits" component={HabitsScreen} />
      <HabitsStackNavigator.Screen name="AddHabit" component={AddHabitScreen} />
      <HabitsStackNavigator.Screen name="Habit" component={HabitScreen} />
    </HabitsStackNavigator.Navigator>
  );
};

const AuthStack = () => {
  return (
    <AuthStackNavigator.Navigator screenOptions={{ headerShown: false }}>
      <AuthStackNavigator.Screen name="Login" component={LoginScreen} />
      <AuthStackNavigator.Screen name="Register" component={RegisterScreen} />
    </AuthStackNavigator.Navigator>
  );
};

const AppDrawer = () => {
  const theme = useTheme();
  const screenOptions = {
    headerTintColor: theme.colors.primary,
  };

  return (
    <AppDrawerNavigator.Navigator>
      <AppDrawerNavigator.Screen options={screenOptions} name="Hábitos" component={HabitsStack} />
      <AppDrawerNavigator.Screen options={screenOptions} name="Perfil" component={ProfileScreen} />
    </AppDrawerNavigator.Navigator>
  );
};

const App = () => {
  const isAuthenticated = false;

  return (
    <Provider theme={CombinedDefaultTheme}>
      <NavigationContainer theme={CombinedDefaultTheme}>
        {
          isAuthenticated ? (
            <AppDrawer />
          ) : (
            <AuthStack />
          )
        }
      </NavigationContainer>
    </Provider>
  );
};

export default App;

