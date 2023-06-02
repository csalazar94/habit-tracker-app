import React, { useState } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { Button, TextInput, Text, useTheme, HelperText } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../storage/store';
import { registerStart } from '../storage/user/reducer';
import { RegisterProps } from '../types/screens';


export default function RegisterScreen({ navigation }: RegisterProps) {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');

  const theme = useTheme();

  const dispatch = useDispatch();
  const { registerStatus } = useSelector((state: RootState) => state.user);
  const handleRegister = () => {
    dispatch(registerStart({ firstName, lastName, email, password }));
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
    registerButton: {
      marginTop: 15,
    },
    link: {
      marginTop: 15,
      color: theme.colors.primary,
    },
  });

  return (
    <View style={styles.background}>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={{ flex: 2 }}></View>
        <Text style={styles.title} variant='displayMedium'>Daily Goals</Text>
        <View style={{ flex: 1 }}></View>
        <Text style={styles.subtitle} variant='headlineMedium'>Crear cuenta</Text>
        <TextInput
          label="Primer nombre"
          value={firstName}
          onChangeText={(text) => setFirstName(text)}
          mode="outlined"
          style={styles.input}
          error={registerStatus === 'error'}
        />
        <TextInput
          label="Primer apellido"
          value={lastName}
          onChangeText={(text) => setLastName(text)}
          mode="outlined"
          style={styles.input}
          error={registerStatus === 'error'}
        />
        <TextInput
          label="Correo electrónico"
          value={email}
          onChangeText={(text) => setEmail(text)}
          mode="outlined"
          style={styles.input}
          error={registerStatus === 'error'}
        />
        <TextInput
          label="Contraseña"
          value={password}
          onChangeText={(text) => setPassword(text)}
          secureTextEntry
          mode="outlined"
          style={styles.input}
          error={registerStatus === 'error'}
        />
        <TextInput
          label="Confirmar contraseña"
          value={passwordConfirmation}
          onChangeText={(text) => setPasswordConfirmation(text)}
          secureTextEntry
          mode="outlined"
          style={styles.input}
          error={
            registerStatus === 'error'
            || (passwordConfirmation !== '' && passwordConfirmation !== password)
          }
        />
        {passwordConfirmation !== '' && passwordConfirmation !== password && (
          <HelperText type="error" visible={passwordConfirmation !== '' && passwordConfirmation !== password}>
            Las contraseñas no coinciden
          </HelperText>
        )}
        {registerStatus === 'error' && (
          <HelperText type="error" visible={registerStatus === 'error'}>
            Ha ocurrido un error
          </HelperText>
        )}
        <Button
          mode="contained"
          onPress={handleRegister}
          style={styles.registerButton}
          loading={registerStatus === 'loading'}
          disabled={registerStatus === 'loading'}
        >
          Crear cuenta
        </Button>
        <TouchableOpacity
          onPress={() => { navigation.navigate('Login') }}
        >
          <Text variant='labelLarge' style={styles.link}>¿Ya tienes una cuenta?</Text>
        </TouchableOpacity>
        <View style={{ flex: 2 }}></View>
      </ScrollView>
    </View>
  );
};

