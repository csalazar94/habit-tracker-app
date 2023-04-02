import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { TextInput, Text, Button } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import DropDown from 'react-native-paper-dropdown';
import { ScrollView } from 'react-native-gesture-handler';

const AddHabitScreen = () => {
  const [habitName, setHabitName] = useState('');
  const [showDropDownFreq, setShowDropDownFreq] = useState(false);
  const [frequency, setFrequency] = useState('Diario');
  const [showDropDownUnits, setShowDropDownUnits] = useState(false);
  const [unit, setUnit] = useState('Veces');
  const [showDropDownCategory, setShowDropDownCategory] = useState(false);
  const [category, setCategory] = useState('Salud');
  const [goal, setGoal] = useState('');

  const frequencies = [
    {
      label: 'Diario',
      value: 'daily',
    },
    {
      label: 'Semanal',
      value: 'weekly',
    },
    {
      label: 'Mensual',
      value: 'monthly',
    }
  ];
  const units = [
    {
      label: 'Veces',
      value: 'times',
    },
    {
      label: 'Páginas',
      value: 'pages',
    },
  ];
  const categories = [
    {
      label: 'Productividad',
      value: 'productivity',
    },
    {
      label: 'Salud',
      value: 'health',
    }
  ];

  const navigation = useNavigation();

  const onSave = () => {
    navigation.goBack();
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 20,
    },
    scrollContainer: {
      flexGrow: 1,
      gap: 10,
      justifyContent: 'center',
    },
  });

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text variant='titleLarge'>Crear hábito</Text>
        <DropDown
          label='Categoría'
          mode='outlined'
          visible={showDropDownCategory}
          showDropDown={() => setShowDropDownCategory(true)}
          onDismiss={() => setShowDropDownCategory(false)}
          value={category}
          setValue={setCategory}
          list={categories}
        />
        <TextInput
          mode="outlined"
          value={habitName}
          onChangeText={setHabitName}
          label="Nombre del hábito"
        />
        <TextInput
          mode="outlined"
          value={goal}
          onChangeText={setGoal}
          keyboardType="numeric"
          label="Objetivo"
        />
        <DropDown
          label='Unidad'
          mode='outlined'
          visible={showDropDownUnits}
          showDropDown={() => setShowDropDownUnits(true)}
          onDismiss={() => setShowDropDownUnits(false)}
          value={unit}
          setValue={setUnit}
          list={units}
        />
        <DropDown
          label='Frecuencia'
          mode='outlined'
          visible={showDropDownFreq}
          showDropDown={() => setShowDropDownFreq(true)}
          onDismiss={() => setShowDropDownFreq(false)}
          value={frequency}
          setValue={setFrequency}
          list={frequencies}
        />
        <Button mode='contained' onPress={onSave}>Save</Button>
      </ScrollView>
    </View>
  );
};

export default AddHabitScreen;
