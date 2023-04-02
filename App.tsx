import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HabitsScreen from './src/screens/habits';
import AddHabitScreen from './src/screens/add-habit';
import GoalsScreen from './src/screens/goals';
import AddGoalScreen from './src/screens/add-goal';
import HomeScreen from './src/screens/home';
import ProfileScreen from './src/screens/profile';
import LoginScreen from './src/screens/login';
import RegisterScreen from './src/screens/register';
import RemindersScreen from './src/screens/reminders';
import AddReminderScreen from './src/screens/add-reminder';
import { createDrawerNavigator } from '@react-navigation/drawer';
import HelpScreen from './src/screens/help';
import ConfigurationScreen from './src/screens/configuration';
import StatisticsScreen from './src/screens/statistics';
import { adaptNavigationTheme, Provider, useTheme } from 'react-native-paper';
import {
  DarkTheme as NavigationDarkTheme,
  DefaultTheme as NavigationDefaultTheme,
} from '@react-navigation/native';
import {
  MD3DarkTheme,
  MD3LightTheme,
} from 'react-native-paper';
import merge from 'deepmerge';

const {
  LightTheme,
  // DarkTheme
} = adaptNavigationTheme({
  reactNavigationLight: NavigationDefaultTheme,
  // reactNavigationDark: NavigationDarkTheme,
});

const CombinedDefaultTheme = merge(MD3LightTheme, LightTheme);
// const CombinedDarkTheme = merge(MD3DarkTheme, DarkTheme);

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

const HabitsStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Lista de hábitos" component={HabitsScreen} />
      <Stack.Screen name="Añadir hábito" component={AddHabitScreen} />
    </Stack.Navigator>
  );
};

const RemindersStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Lista de recordatorios" component={RemindersScreen} />
      <Stack.Screen name="Añadir recordatorio" component={AddReminderScreen} />
    </Stack.Navigator>
  );
};

const GoalsStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Lista de objetivos" component={GoalsScreen} />
      <Stack.Screen name="Añadir objetivo" component={AddGoalScreen} />
    </Stack.Navigator>
  );
};

const AppDrawer = () => {
  const theme = useTheme();
  const screenOptions = {
    headerTintColor: theme.colors.primary,
  };

  // <Drawer.Screen options={screenOptions} name="Estadísticas" component={StatisticsScreen} />
  // <Drawer.Screen options={screenOptions} name="Objetivos" component={GoalsStack} />
  // <Drawer.Screen options={screenOptions} name="Recordatorios" component={RemindersStack} />

  return (
    <Drawer.Navigator>
      <Drawer.Screen options={screenOptions} name="Inicio" component={HomeScreen} />
      <Drawer.Screen options={screenOptions} name="Hábitos" component={HabitsStack} />
      <Drawer.Screen options={screenOptions} name="Perfil" component={ProfileScreen} />
      <Drawer.Screen options={screenOptions} name="Configuración" component={ConfigurationScreen} />
      <Drawer.Screen options={screenOptions} name="Ayuda" component={HelpScreen} />
    </Drawer.Navigator>
  );
};

const AppStack = () => {
  const isAuthenticated = true;

  return (
    <Provider theme={CombinedDefaultTheme}>
      <NavigationContainer theme={CombinedDefaultTheme}>
        {
          isAuthenticated ? (
            <>
              <AppDrawer />
            </>
          ) : (
            <>
              <Stack.Navigator screenOptions={{ headerShown: false }}>
                <Stack.Screen name="Inicio de sesión" component={LoginScreen} />
                <Stack.Screen name="Registro" component={RegisterScreen} />
              </Stack.Navigator>
            </>
          )
        }
      </NavigationContainer>
    </Provider>
  );
};

export default AppStack;

