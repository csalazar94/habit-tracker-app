import { Text, useTheme } from "react-native-paper";
import { StyleSheet, View } from "react-native";
import dayjs from "dayjs";
import { TouchableOpacity } from "react-native-gesture-handler";
import { DailyRecord } from "../types/screens";

export default function LastNDays({ records }: { records: DailyRecord[] }) {
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
    {
      date: dayjs().subtract(3, 'day').format('YYYY-MM-DD'),
      done: records.find((record) => dayjs().subtract(3, 'day').isSame(record.date, 'day'))
    },
    {
      date: dayjs().subtract(2, 'day').format('YYYY-MM-DD'),
      done: records.find((record) => dayjs().subtract(2, 'day').isSame(record.date, 'day'))
    },
    {
      date: dayjs().subtract(1, 'day').format('YYYY-MM-DD'),
      done: records.find((record) => dayjs().subtract(1, 'day').isSame(record.date, 'day'))
    },
    {
      date: dayjs().format('YYYY-MM-DD'),
      done: records.find((record) => dayjs().isSame(record.date, 'day'))
    },
  ];
  const dayNamesShort = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];
  return (
    <View style={styles.container}>
      {data.map((day, index) => {
        const date = dayjs(day.date);
        return (
          <TouchableOpacity key={index} onPress={() => { }}>
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
