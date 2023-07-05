import { Button, Text, useTheme } from "react-native-paper";
import { StyleSheet, View } from "react-native";
import { HabitProps } from "../types/screens";
import { RootState } from "../storage/store";
import { useSelector } from "react-redux";
import MyCalendar from "../components/calendar";
import { useState } from "react";
import dayjs from "dayjs";

export default function HabitScreen({ route, navigation }: HabitProps) {
  const { habitId } = route.params;
  const { habits } = useSelector((state: RootState) => state.habits);
  const habit = habits.find((habit) => habit.id === habitId);
  const [year, setYear] = useState(dayjs().year());
  const [month, setMonth] = useState(dayjs().month());

  return (
    <View style={styles.container}>
      <Text variant="titleLarge">{habit?.name}</Text>
      <MyCalendar
        habitId={habitId}
        year={year}
        month={month}
        setYear={setYear}
        setMonth={setMonth}
      />
      <Button onPress={() => navigation.goBack()} mode="contained">Volver</Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    marginTop: 10,
    gap: 10,
  },
});
