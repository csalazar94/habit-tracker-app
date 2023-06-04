import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { TextInput, Text, Button } from 'react-native-paper';
import DropDown from 'react-native-paper-dropdown';
import { ScrollView } from 'react-native-gesture-handler';
import HabitCard from '../components/habit-card';
import { AddHabitProps } from '../types/screens';
import { useDispatch, useSelector } from 'react-redux';
import { findAllStart } from '../storage/habit-categories/reducer';
import { RootState } from '../storage/store';

export default function AddHabitScreen({ navigation }: AddHabitProps) {
  const [habitName, setHabitName] = useState('');
  const [showDropDownFrequency, setShowDropDownFrequency] = useState(false);
  const [frequency, setFrequency] = useState('daily');
  const [showDropDownUnits, setShowDropDownUnits] = useState(false);
  const [unit, setUnit] = useState('times');
  const [showDropDownCategory, setShowDropDownCategory] = useState(false);
  const [category, setCategory] = useState('health');
  const [target, setTarget] = useState(0);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(findAllStart());
  }, []);

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
    },
    {
      label: 'Anual',
      value: 'yearly',
    },
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
  const { habitCategories } = useSelector((state: RootState) => state.habitCategories);
  const categories = habitCategories.map((hc) => {
    switch (hc.name) {
      case 'mental-health': {
        return {
          label: 'Salud mental',
          value: hc.name,
        };
      }
      case 'physical-health': {
        return {
          label: 'Salud física',
          value: hc.name,
        };
      }
      case 'education': {
        return {
          label: 'Educación',
          value: hc.name,
        };
      }
      case 'finance': {
        return {
          label: 'Finanzas',
          value: hc.name,
        };
      }
      case 'productivity': {
        return {
          label: 'Productividad',
          value: hc.name,
        };
      }
      case 'social': {
        return {
          label: 'Social',
          value: hc.name,
        };
      }
      case 'art': {
        return {
          label: 'Arte',
          value: hc.name,
        };
      }
      case 'environment': {
        return {
          label: 'Medio ambiente',
          value: hc.name,
        };
      }
      case 'tecnology': {
        return {
          label: 'Tecnología',
          value: hc.name,
        };
      }
      case 'spirituality': {
        return {
          label: 'Espiritualidad',
          value: hc.name,
        };
      }
      case 'other': {
        return {
          label: 'Otro',
          value: hc.name,
        };
      }
      default: {
        return {
          label: '?',
          value: hc.name,
        };
      }
    }
  }).filter((hc) => hc.label !== '?');

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
    },
  });

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <HabitCard
          habit={{
            name: habitName,
            frequency,
            unit,
            target: Number(target),
            progress: Math.random(),
            current: Math.random(),
            dailyRecords: [],
            habitCategory: {
              id: 999,
              name: category,
              icon: habitCategories.find((hc) => hc.name === category)?.icon || 'question',
              createdAt: new Date(),
              updatedAt: new Date(),
            },
          }}
        />
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
          label="Objetivo"
          keyboardType="numeric"
          value={target === 0 ? '' : target.toString()}
          onChangeText={(text) => setTarget(Number(text.replace(/[^0-9]/g, '')))}
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
          visible={showDropDownFrequency}
          showDropDown={() => setShowDropDownFrequency(true)}
          onDismiss={() => setShowDropDownFrequency(false)}
          value={frequency}
          setValue={setFrequency}
          list={frequencies}
        />
        <Button mode='contained' onPress={onSave}>Guardar</Button>
        <Button mode='outlined' onPress={() => navigation.goBack()}>Volver</Button>
      </ScrollView>
    </View>
  );
};

