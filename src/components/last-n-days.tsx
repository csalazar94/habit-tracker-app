import { ActivityIndicator, Text, useTheme } from "react-native-paper";
import { StyleSheet, View } from "react-native";
import dayjs from "dayjs";
import { TouchableOpacity } from "react-native-gesture-handler";
import { DailyRecord } from "../types/screens";
import { useDispatch, useSelector } from "react-redux";
import { createDailyRecordStart, deleteDailyRecordStart } from "../storage/habits/reducer";
import { RootState } from "../storage/store";

export default function LastNDays({
  habitId,
  records
}: {
  habitId?: number,
  records: DailyRecord[]
}) {
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
  const getDateData = (n: number) => {
    const currentDate = dayjs().startOf('day');
    const currentRecord = records.find((record) => currentDate.subtract(n, 'day').isSame(record.date, 'day'));
    return {
      id: currentRecord?.id,
      date: currentDate.subtract(n, 'day'),
      dateString: currentDate.subtract(n, 'day').format('YYYY-MM-DD'),
      done: currentRecord ? true : false,
    };
  };
  const data = [3, 2, 1, 0].map((n) => getDateData(n));
  const dispatch = useDispatch();
  const { createDailyRecordStatus, deleteDailyRecordStatus } = useSelector((state: RootState) => state.habits);
  return (
    <View style={styles.container}>
      {data.map((day, index) => {
        const currentCreateDailyRecordStatus = createDailyRecordStatus.find((s) => s.habitId === habitId && s.date === day.dateString)?.status;
        const currentDeleteDailyRecordStatus = deleteDailyRecordStatus.find((s) => s.dailyRecordId === day.id)?.status;
        const dayLoading = currentCreateDailyRecordStatus === 'loading' || currentDeleteDailyRecordStatus === 'loading';
        if (dayLoading) {
          return <ActivityIndicator key={index} style={styles.daysContainer} />
        } else {
          return (
            <TouchableOpacity
              key={index}
              onLongPress={() => {
                if (day.done) {
                  if (day.id) {
                    dispatch(deleteDailyRecordStart({ dailyRecordId: day.id }));
                  }
                } else {
                  if (habitId) {
                    dispatch(createDailyRecordStart({ habitId, date: day.dateString }));
                  }
                }
              }}
            >
              <View style={[styles.daysContainer, day.done ? styles.daysContainerSelected : null]}>
                <Text style={day.done ? styles.dayTextSelected : styles.dayText}>{day.date.format('ddd')}</Text>
                <Text style={day.done ? styles.dayTextSelected : styles.dayText}>{day.date.date()}</Text>
              </View>
            </TouchableOpacity>
          );
        }
      })}
    </View>
  );
}
