import { View } from "react-native";
import { ActivityIndicator, Text, useTheme } from "react-native-paper";
import dayjs, { Dayjs } from "dayjs";
import { RootState } from "../storage/store";
import { useDispatch, useSelector } from "react-redux";
import { TouchableOpacity } from "react-native-gesture-handler";
import { createDailyRecordStart, deleteDailyRecordStart } from "../storage/habits/reducer";

export default function MyCalendarDay(
  {
    habitId,
    day,
    year,
    month
  }: {
    habitId: number,
    day: Dayjs,
    year: number,
    month: number
  }) {
  const dailyRecord = useSelector((state: RootState) => state.habits.habits.find((habit) => habit.id === habitId)?.dailyRecords.find((dailyRecord) => dayjs(dailyRecord.date).format('YYYY-MM-DD') === day.format('YYYY-MM-DD')));
  const createStatus = useSelector((state: RootState) => state.habits.createDailyRecordStatus.find((s) => s.habitId === habitId && dayjs(s.date).format('YYYY-MM-DD') === day.format('YYYY-MM-DD'))?.status || '');
  const deleteStatus = useSelector((state: RootState) => state.habits.deleteDailyRecordStatus.find((s) => s.dailyRecordId === dailyRecord?.id)?.status || '');
  const isLoading = createStatus === 'loading' || deleteStatus === 'loading';
  const dispatch = useDispatch();
  const theme = useTheme();
  return (
    <TouchableOpacity
      onLongPress={() => {
        if (dailyRecord) {
          dispatch(deleteDailyRecordStart({
            dailyRecordId: dailyRecord.id,
          }));
        } else {
          dispatch(createDailyRecordStart({
            habitId,
            date: day.format('YYYY-MM-DD'),
          }));
        }
      }}
    >
      <View
        style={{
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: isLoading
            ? 'transparent'
            : dailyRecord
              ? day.format('YYYYMM') !== dayjs().year(year).month(month).format('YYYYMM')
                ? theme.colors.secondary
                : theme.colors.primary
              : 'transparent',
          borderRadius: 20,
          height: 40,
          width: 40,
        }}
        key={day.format('YYYY-MM-DD')}
      >
        {
          isLoading
            ? <ActivityIndicator />
            : <Text
              style={{
                color: dailyRecord
                  ? day.format('YYYYMM') !== dayjs().year(year).month(month).format('YYYYMM')
                    ? theme.colors.onPrimary
                    : theme.colors.onSecondary
                  : day.format('YYYYMM') !== dayjs().year(year).month(month).format('YYYYMM')
                    ? theme.colors.secondary
                    : theme.colors.onBackground,
              }}
              variant="bodyLarge"
            >
              {day.format('DD')}
            </Text>
        }
      </View>
    </TouchableOpacity>
  );
}
