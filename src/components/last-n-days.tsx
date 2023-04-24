import { Text, useTheme } from "react-native-paper";
import { StyleSheet, View } from "react-native";
import dayjs from "dayjs";
import { TouchableOpacity } from "react-native-gesture-handler";

export default function LastNDays() {
  const theme = useTheme();
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "space-between",
      flexDirection: "row",
    },
    daysContainer: {
      alignItems: 'center',
      justifyContent: 'center',
      height: 45,
      width: 45,
      borderRadius: 22.5,
    },
    daysContainerSelected: {
      backgroundColor: theme.colors.primary,
    },
    dayText: {
      color: theme.colors.onSurface,
    },
    dayTextSelected: {
      color: theme.colors.onPrimary,
    },
  });
  const data = [
    { date: "2023-04-01", done: false },
    { date: "2023-04-02", done: false },
    { date: "2023-04-03", done: true },
    { date: "2023-04-04", done: true },
  ];
  const dayNamesShort = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];
  return (
    <View style={styles.container}>
      {data.map((day, index) => {
        const date = dayjs(day.date);
        return (
          <TouchableOpacity key={index} onPress={() => {}}>
            <View style={[styles.daysContainer, day.done ? styles.daysContainerSelected : null]}>
              <Text style={day.done ? styles.dayTextSelected : styles.dayText}>{dayNamesShort[date.day()]}</Text>
              <Text style={day.done ? styles.dayTextSelected : styles.dayText}>{date.date()}</Text>
            </View>
          </TouchableOpacity>
        )
      })}
    </View>
  );
}
