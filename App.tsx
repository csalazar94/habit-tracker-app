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
  return (
    <Drawer.Navigator>
      <Drawer.Screen name="Inicio" component={HomeScreen} />
      <Drawer.Screen name="Estadísticas" component={StatisticsScreen} />
      <Drawer.Screen name="Hábitos" component={HabitsStack} />
      <Drawer.Screen name="Objetivos" component={GoalsStack} />
      <Drawer.Screen name="Recordatorios" component={RemindersStack} />
      <Drawer.Screen name="Perfil" component={ProfileScreen} />
      <Drawer.Screen name="Configuración" component={ConfigurationScreen} />
      <Drawer.Screen name="Ayuda" component={HelpScreen} />
    </Drawer.Navigator>
  );
};

const AppStack = () => {
  const isAuthenticated = true;

  return (
    <NavigationContainer>
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
  );
};

export default AppStack;

