import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HabitsScreen from './src/screens/habits';
import AddHabitScreen from './src/screens/add-habit';
import ProfileScreen from './src/screens/profile';
import LoginScreen from './src/screens/login';
import RegisterScreen from './src/screens/register';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { adaptNavigationTheme, Provider, useTheme } from 'react-native-paper';
import {
  DefaultTheme as NavigationDefaultTheme,
} from '@react-navigation/native';
import {
  MD3LightTheme,
} from 'react-native-paper';
import merge from 'deepmerge';
import HabitScreen from './src/screens/habit';

const {
  LightTheme,
} = adaptNavigationTheme({
  reactNavigationLight: NavigationDefaultTheme,
});

const CombinedDefaultTheme = merge(MD3LightTheme, LightTheme);

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

const HabitsStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Lista de hábitos" component={HabitsScreen} />
      <Stack.Screen name="Añadir hábito" component={AddHabitScreen} />
      <Stack.Screen 
        name="Hábito"
        component={HabitScreen}
      />
    </Stack.Navigator>
  );
};

const AppDrawer = () => {
  const theme = useTheme();
  const screenOptions = {
    headerTintColor: theme.colors.primary,
  };

  return (
    <Drawer.Navigator>
      <Drawer.Screen options={screenOptions} name="Hábitos" component={HabitsStack} />
      <Drawer.Screen options={screenOptions} name="Perfil" component={ProfileScreen} />
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

