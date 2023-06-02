import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItem, DrawerItemList } from '@react-navigation/drawer';
import { adaptNavigationTheme, Provider, useTheme } from 'react-native-paper';
import { DefaultTheme as NavigationDefaultTheme } from '@react-navigation/native';
import { MD3LightTheme } from 'react-native-paper';
import merge from 'deepmerge';
import { RootState } from './src/storage/store';
import { useDispatch, useSelector } from 'react-redux';
import HabitsScreen from './src/screens/habits';
import AddHabitScreen from './src/screens/add-habit';
import ProfileScreen from './src/screens/profile';
import LoginScreen from './src/screens/login';
import RegisterScreen from './src/screens/register';
import HabitScreen from './src/screens/habit';
import { AppDrawerParamList, AuthStackParamList, HabitsStackParamList } from './src/types/screens';
import { logout } from './src/storage/user/reducer';

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

const CustomDrawerContent = (props: any) => {
  const dispatch = useDispatch();

  return (
    <DrawerContentScrollView {...props}>
      <DrawerItemList {...props} />
      <DrawerItem
        label="Cerrar sesión"
        onPress={() => dispatch(logout())}
      />
    </DrawerContentScrollView>
  );
}

const AppDrawer = () => {
  const theme = useTheme();
  const screenOptions = {
    headerTintColor: theme.colors.primary,
  };

  return (
    <AppDrawerNavigator.Navigator drawerContent={(props) => <CustomDrawerContent {...props} />}>
      <AppDrawerNavigator.Screen
        options={{
          ...screenOptions,
          drawerLabel: 'Hábitos',
          title: 'Hábitos'
        }}
        name="HabitsDrawer"
        component={HabitsStack}
      />
      <AppDrawerNavigator.Screen
        options={{
          ...screenOptions,
          drawerLabel: 'Perfil',
          title: 'Perfil',
        }}
        name="Profile"
        component={ProfileScreen}
      />
    </AppDrawerNavigator.Navigator>
  );
};

const App = () => {
  const userStatus = useSelector((state: RootState) => state.user.status);
  const isAuthenticated = userStatus === 'ok';

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

