import { ActivityIndicator, Button, Text, useTheme } from "react-native-paper";
import { StyleSheet, View } from "react-native";
import { Calendar, LocaleConfig } from "react-native-calendars";
import { HabitProps } from "../types/screens";
import dayjs from "dayjs";
import { RootState } from "../storage/store";
import { useDispatch, useSelector } from "react-redux";
import { createDailyRecordStart, deleteDailyRecordStart } from "../storage/habits/reducer";
import { TouchableOpacity } from "react-native-gesture-handler";

LocaleConfig.locales['es'] = {
  monthNames: [
    'Enero',
    'Febrero',
    'Marzo',
    'Abril',
    'Mayo',
    'Junio',
    'Julio',
    'Agosto',
    'Septiembre',
    'Octubre',
    'Noviembre',
    'Diciembre',
  ],
  monthNamesShort: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'],
  dayNames: ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'],
  dayNamesShort: ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'],
  today: 'Hoy',
};
LocaleConfig.defaultLocale = 'es';

export default function HabitScreen({ route, navigation }: HabitProps) {
  const { habit: habitSelected } = route.params;
  const { habits } = useSelector((state: RootState) => state.habits);
  const habit = habits.find((habit) => habit.id === habitSelected.id);

  const theme = useTheme();

  const calendarTheme = {
    backgroundColor: theme.colors.background,
    calendarBackground: theme.colors.background,
    textSectionTitleColor: theme.colors.onBackground,
    textSectionTitleDisabledColor: theme.colors.onSurfaceDisabled,
    selectedDayBackgroundColor: theme.colors.primary,
    selectedDayTextColor: theme.colors.inversePrimary,
    todayTextColor: theme.colors.primary,
    dayTextColor: theme.colors.onBackground,
    textDisabledColor: theme.colors.onSurfaceDisabled,
    dotColor: theme.colors.primary,
    selectedDotColor: theme.colors.inversePrimary,
    arrowColor: theme.colors.primary,
    disabledArrowColor: theme.colors.onSurfaceDisabled,
    monthTextColor: theme.colors.onBackground,
    indicatorColor: theme.colors.primary,
    textDayFontFamily: theme.fonts.bodySmall.fontFamily,
    textDayFontWeight: theme.fonts.bodySmall.fontWeight,
    textDayFontSize: theme.fonts.bodySmall.fontSize,
    textDayHeaderFontFamily: theme.fonts.titleSmall.fontFamily,
    textDayHeaderFontWeight: theme.fonts.titleSmall.fontWeight,
    textDayHeaderFontSize: theme.fonts.titleSmall.fontSize,
    textMonthFontFamily: theme.fonts.titleMedium.fontFamily,
    textMonthFontWeight: theme.fonts.titleMedium.fontWeight,
    textMonthFontSize: theme.fonts.titleMedium.fontSize,
  };
  const customMarkingStyle = {
    customStyles: {
      container: {
        backgroundColor: theme.colors.primary
      },
      text: {
        color: theme.colors.inversePrimary
      }
    }
  };
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      paddingHorizontal: 20,
      marginTop: 10,
    },
  });
  const dayStyles = StyleSheet.create({
    container: {
      height: 30,
      width: 30,
      borderRadius: 15,
      alignItems: 'center',
      justifyContent: 'center',
    },
  });

  const dispatch = useDispatch();
  const { createDailyRecordStatus, deleteDailyRecordStatus } = useSelector((state: RootState) => state.habits);

  return (
    <View style={styles.container}>
      <Text variant="titleLarge">{habit?.name}</Text>
      <Calendar
        firstDay={1}
        enableSwipeMonths={true}
        theme={calendarTheme}
        markingType='custom'
        hideExtraDays
        dayComponent={(props) => {
          const currentDate = dayjs(props.date?.timestamp);
          const dailyRecord = habit?.dailyRecords.find((record) => currentDate.isSame(record.date, 'day'));
          const dayId = dailyRecord?.id;
          const currentCreateDailyRecordStatus = createDailyRecordStatus.find((s) => s.habitId === habit?.id && s.date === currentDate.toISOString())?.status;
          const currentDeleteDailyRecordStatus = deleteDailyRecordStatus.find((s) => s.dailyRecordId === dayId)?.status;
          const dayLoading = currentCreateDailyRecordStatus === 'loading' || currentDeleteDailyRecordStatus === 'loading';
          if (dayLoading) return <ActivityIndicator style={dayStyles.container}/>;
          return (
            <TouchableOpacity
              onLongPress={() => {
                if (props.date && props.onLongPress) props.onLongPress(props.date);
              }}
              style={[dayStyles.container, props.marking?.customStyles?.container]}
            >
              <Text variant="bodySmall" style={[props.marking?.customStyles?.text]}>{props.date?.day}</Text>
            </TouchableOpacity>
          );
        }}
        markedDates={
          Object.fromEntries(habit?.dailyRecords.map((record) => [dayjs(record.date).utc().format("YYYY-MM-DD"), customMarkingStyle]) || [])
        }
        onDayLongPress={(day) => {
          const currentDate = dayjs(day?.timestamp);
          const dailyRecord = habit?.dailyRecords.find((record) => dayjs(record.date).isSame(currentDate, 'day'));
          if (dailyRecord && dailyRecord.id) {
            dispatch(deleteDailyRecordStart({ dailyRecordId: dailyRecord.id }));
          } else {
            if (habit?.id) {
              dispatch(createDailyRecordStart({ habitId: habit.id, date: currentDate.toISOString() }));
            }
          }
        }}
      />
      <Button onPress={() => navigation.goBack()} mode="contained">Volver</Button>
    </View>
  );
}

