import React, { useState } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { Button, TextInput, Text, useTheme } from 'react-native-paper';
import { useDispatch } from 'react-redux';
import { loginStart } from '../storage/user/reducer';
import { LoginProps } from '../types/screens';

export default function LoginScreen({ navigation }: LoginProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const theme = useTheme();

  const dispatch = useDispatch();

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
      marginBottom: 20,
    },
    input: {
      marginBottom: 20,
    },
    button: {
      marginBottom: 20,
    },
    link: {
      color: theme.colors.primary,
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
        />
        <TextInput
          label="Contraseña"
          value={password}
          onChangeText={(text) => setPassword(text)}
          secureTextEntry
          mode="outlined"
          style={styles.input}
        />
        <Button mode="contained" onPress={handleLogin} style={styles.button}>
          Iniciar sesión
        </Button>
        <TouchableOpacity
          onPress={() => { navigation.navigate('Register') }}
        >
          <Text variant='labelLarge' style={styles.link}>Crea tu cuenta</Text>
        </TouchableOpacity>
        <View style={{ height: 10 }}></View>
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

