import React, { useState } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { Button, TextInput, Text, useTheme, HelperText } from 'react-native-paper';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../storage/store';
import { loginStart } from '../storage/user/reducer';
import { LoginProps } from '../types/screens';

export default function LoginScreen({ navigation }: LoginProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const theme = useTheme();

  const dispatch = useDispatch();
  const { status } = useSelector((state: RootState) => state.user);

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
          error={status === 'error'}
        />
        <TextInput
          label="Contraseña"
          value={password}
          onChangeText={(text) => setPassword(text)}
          secureTextEntry
          mode="outlined"
          style={styles.input}
          error={status === 'error'}
        />
        {status === 'error' && (
          <HelperText type="error" visible={status === 'error'}>
            Ha ocurrido un error
          </HelperText>
        )}
        <Button
          mode="contained"
          onPress={handleLogin}
          style={styles.button}
          loading={status === 'loading'}
          disabled={status === 'loading'}
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

