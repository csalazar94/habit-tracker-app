import React, { useEffect, useMemo, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { TextInput, Text, Button, HelperText } from 'react-native-paper';
import DropDown from 'react-native-paper-dropdown';
import { ScrollView } from 'react-native-gesture-handler';
import HabitCard from '../components/habit-card';
import { AddHabitProps } from '../types/screens';
import { useDispatch, useSelector } from 'react-redux';
import { findAllStart } from '../storage/habit-categories/reducer';
import { RootState } from '../storage/store';
import { createReset, createStart } from '../storage/habits/reducer';

export default function AddHabitScreen({ navigation }: AddHabitProps) {
  const [habitName, setHabitName] = useState('');
  const [showDropDownFrequency, setShowDropDownFrequency] = useState(false);
  const [frequency, setFrequency] = useState('weekly');
  const [showDropDownCategory, setShowDropDownCategory] = useState(false);
  const [category, setCategory] = useState('');
  const [target, setTarget] = useState(0);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(findAllStart());
  }, []);

  const { createStatus, createError } = useSelector((state: RootState) => state.habits);
  useEffect(() => {
    if (createStatus === 'ok') {
      navigation.goBack();
      dispatch(createReset());
    }
  }, [createStatus]);

  const { findAllStatus, habitCategories } = useSelector((state: RootState) => state.habitCategories);
  useEffect(() => {
    if (findAllStatus === 'ok') {
      setCategory(habitCategories[0].id);
    }
  }, [findAllStatus]);

  const { user } = useSelector((state: RootState) => state.users);

  const frequencies = [
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
  const categories = habitCategories.map((hc) => {
    return { label: hc.name, value: hc.id };
  });

  const onSave = () => {
    dispatch(createStart({ userId: user.id, habitCategoryId: category, name: habitName, frequency, target }));
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

  const progress = useMemo(() => Math.random(), []);

  const hasErrors = (property: string) => {
    return createStatus === 'error' && Array.isArray(createError) && createError.findIndex((e) => e.property === property) !== -1;
  }

  const getErrorsMessage = (property: string) => {
    if (!hasErrors(property)) return;
    return (
      <HelperText type="error">
        {(createError as { property: string, messages: [] }[]).find((e) => e.property === property)?.messages.join('\n')}
      </HelperText>
    );
  }

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <HabitCard
          containerStyle={{ margin: 5 }}
          habit={{
            name: habitName,
            frequency,
            target: Number(target),
            progress,
            current: progress,
            dailyRecords: [],
            habitCategory: {
              id: category,
              name: habitCategories.find((hc) => hc.id === category)?.name || 'Otro',
              icon: habitCategories.find((hc) => hc.id === category)?.icon || 'help',
              createdAt: new Date(),
              updatedAt: new Date(),
            },
          }}
          status={''}
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
        {getErrorsMessage('habitCategoryId')}
        <TextInput
          mode="outlined"
          value={habitName}
          onChangeText={setHabitName}
          label="Nombre del hábito"
        />
        {getErrorsMessage('name')}
        <TextInput
          mode="outlined"
          label="Objetivo"
          keyboardType="numeric"
          value={target === 0 ? '' : target.toString()}
          onChangeText={(text) => setTarget(Number(text.replace(/[^0-9]/g, '')))}
        />
        {getErrorsMessage('target')}
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
        {getErrorsMessage('frequency')}
        {
          createStatus === 'error' && (typeof createError === 'string') && (
            <HelperText type="error" visible={createStatus === 'error' && (typeof createError === 'string')}>
              {String(createError)}
            </HelperText>
          )
        }
        <Button
          mode='contained'
          onPress={onSave}
          loading={createStatus === 'loading'}
          disabled={createStatus === 'loading'}
        >
          Guardar
        </Button>
        <Button
          mode='outlined'
          onPress={() => navigation.goBack()}
        >
          Volver
        </Button>
      </ScrollView>
    </View>
  );
};

