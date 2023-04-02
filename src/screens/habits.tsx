import { Button, IconButton, Text, useTheme } from "react-native-paper";
import { StyleSheet, View, VirtualizedList } from "react-native";
import { useNavigation } from "@react-navigation/native";
import HabitCard from "../components/habit-card";

export default function HabitsScreen() {
  const habits = [
    {
      id: 1,
      name: 'Habit 1',
      frequency: 'weekly',
      unit: 'times',
      target: 3,
      current: 2,
      progress: 2 / 3,
    },
    {
      id: 2,
      name: 'Habit 2',
      frequency: 'weekly',
      unit: 'times',
      target: 5,
      current: 3,
      progress: 3 / 5,
    },
    {
      id: 3,
      name: 'Habit 3',
      frequency: 'daily',
      unit: 'times',
      target: 2,
      current: 1,
      progress: 1 / 2,
    },
    {
      id: 4,
      name: 'Habit 4',
      frequency: 'daily',
      unit: 'pages',
      target: 100,
      current: 30,
      progress: 30 / 100,
    },
    {
      id: 5,
      name: 'Habit 5',
      frequency: 'weekly',
      unit: 'times',
      target: 3,
      current: 2,
      progress: 2 / 3,
    },
    {
      id: 6,
      name: 'Habit 6',
      frequency: 'weekly',
      unit: 'times',
      target: 5,
      current: 3,
      progress: 3 / 5,
    },
    {
      id: 7,
      name: 'Habit 7',
      frequency: 'daily',
      unit: 'times',
      target: 2,
      current: 1,
      progress: 1 / 2,
    },
    {
      id: 8,
      name: 'Habit 8',
      frequency: 'daily',
      unit: 'pages',
      target: 10000000000000000,
      current: 30,
      progress: 30 / 100,
    },
    {
      id: 9,
      name: 'Habit 9',
      frequency: 'weekly',
      unit: 'times',
      target: 5,
      current: 3,
      progress: 3 / 5,
    },
    {
      id: 10,
      name: 'Habit 10',
      frequency: 'daily',
      unit: 'times',
      target: 2,
      current: 1,
      progress: 1 / 2,
    },
    {
      id: 11,
      name: 'Habit 11',
      frequency: 'daily',
      unit: 'pages',
      target: 100,
      current: 30,
      progress: 30 / 100,
    }
  ];

  const theme = useTheme();
  const navigation = useNavigation();

  const styles = StyleSheet.create({
    container: {
    },
    button: {
      width: 60,
      height: 60,
      borderRadius: 30,
      position: 'absolute',
      bottom: 20,
      right: 20,
    },
  });

  return (
    <View style={styles.container}>
      <VirtualizedList
        renderItem={({ item }) => <HabitCard habit={item} />}
        data={habits}
        keyExtractor={(item) => item.id}
        getItemCount={(data) => data.length}
        getItem={(data, index) => data[index]}
        ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
        ListHeaderComponent={() => <View style={{ height: 10 }} />}
        ListFooterComponent={() => <View style={{ height: 110 }} />}
      />
      <IconButton
        icon="plus"
        mode="contained"
        iconColor={theme.colors.inversePrimary}
        containerColor={theme.colors.primary}
        style={styles.button}
        onPress={() => { navigation.navigate('Añadir hábito') }}
      />
    </View>
  );
}
