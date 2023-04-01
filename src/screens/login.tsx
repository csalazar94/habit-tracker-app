import React, { useState } from 'react';
import { ImageBackground, StyleSheet, TouchableOpacity, View } from 'react-native';
import { TouchableHighlight } from 'react-native-gesture-handler';
import { Button, TextInput, Text, useTheme } from 'react-native-paper';

const backgroundImage = require('../../assets/login-bg.jpg');

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const theme = useTheme();

  const handleLogin = () => {
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
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
    <ImageBackground source={backgroundImage} resizeMode="cover" style={styles.container}>
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
        onPress={() => { }}
      >
        <Text variant='labelLarge' style={styles.link}>¿Olvidaste tu contraseña?</Text>
      </TouchableOpacity>
      <View style={{ flex: 2 }}></View>
    </ImageBackground>
  );

};


export default LoginScreen;
