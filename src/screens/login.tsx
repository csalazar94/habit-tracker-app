import React, { useState } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { Button, TextInput, Text, useTheme, HelperText } from 'react-native-paper';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../storage/store';
import { loginStart } from '../storage/users/reducer';
import { LoginProps } from '../types/screens';

export default function LoginScreen({ navigation }: LoginProps) {
  const [email, setEmail] = useState('camilosalazar94@gmail.com');
  const [password, setPassword] = useState('123456');

  const theme = useTheme();

  const dispatch = useDispatch();
  const { loginStatus } = useSelector((state: RootState) => state.users);

  const handleLogin = () => {
    dispatch(loginStart({ email, password }));
  };

  const styles = StyleSheet.create({
    background: {
      flex: 1,
    },
    container: {
      flexGrow: 1,
      padding: 20,
      justifyContent: 'center',
    },
    title: {
      color: theme.colors.primary,
      textAlign: 'center',
      fontWeight: 'bold',
    },
    subtitle: {
      color: theme.colors.secondary,
    },
    input: {
      marginTop: 15,
    },
    button: {
      marginTop: 20,
    },
    link: {
      color: theme.colors.primary,
      marginTop: 15,
    },
  });

  return (
    <View style={styles.background}>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={{ flex: 2 }}></View>
        <Text style={styles.title} variant='displayMedium'>Daily Goals</Text>
        <View style={{ flex: 1 }}></View>
        <Text style={styles.subtitle} variant='headlineMedium'>Iniciar sesión</Text>
        <TextInput
          label="Correo electrónico"
          value={email}
          onChangeText={(text) => setEmail(text)}
          mode="outlined"
          style={styles.input}
          autoCapitalize="none"
          error={loginStatus === 'error'}
        />
        <TextInput
          label="Contraseña"
          value={password}
          onChangeText={(text) => setPassword(text)}
          secureTextEntry
          mode="outlined"
          style={styles.input}
          error={loginStatus === 'error'}
          blurOnSubmit={false}
        />
        {loginStatus === 'error' && (
          <HelperText type="error" visible={loginStatus === 'error'}>
            Ha ocurrido un error
          </HelperText>
        )}
        <Button
          mode="contained"
          onPress={handleLogin}
          style={styles.button}
          loading={loginStatus === 'loading'}
          disabled={loginStatus === 'loading'}
        >
          Iniciar sesión
        </Button>
        <TouchableOpacity
          onPress={() => { navigation.navigate('Register') }}
        >
          <Text variant='labelLarge' style={styles.link}>Crea tu cuenta</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => { }}
        >
          <Text variant='labelLarge' style={styles.link}>¿Olvidaste tu contraseña?</Text>
        </TouchableOpacity>
        <View style={{ flex: 2 }}></View>
      </ScrollView>
    </View >
  );
};

