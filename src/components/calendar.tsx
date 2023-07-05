import { Button, IconButton, Text } from "react-native-paper";
import dayjs from "dayjs";
import { StyleSheet, View } from "react-native";
import MyCalendarDay from "./calendar-day";

export default function MyCalendar(
  {
    habitId,
    year,
    month,
    setYear,
    setMonth,
  }: {
    habitId: number,
    year: number,
    month: number
    setYear: (year: number) => void,
    setMonth: (month: number) => void,
  }) {
  const daysInPreviousMonth = Array.from(
    {
      length: dayjs().year(year).month(month).date(1).day() > 0
        ? dayjs().year(year).month(month).date(1).day() - 1
        : 6
    },
    (_, i) => dayjs().year(year).month(month).date(1).subtract(i + 1, 'day')
  ).reverse();
  const daysInMonth = Array.from(
    { length: dayjs().year(year).month(month).daysInMonth() },
    (_, i) => dayjs().year(year).month(month).date(i + 1)
  );
  const daysInNextMonth = Array.from(
    {
      length: dayjs().year(year).month(month).date(dayjs().year(year).month(month).daysInMonth()).day() > 0
        ? 7 - dayjs().year(year).month(month).date(dayjs().year(year).month(month).daysInMonth()).day()
        : 0
    },
    (_, i) => dayjs().year(year).month(month).date(dayjs().year(year).month(month).daysInMonth()).add(i + 1, 'day')
  );
  const allDays = [...daysInPreviousMonth, ...daysInMonth, ...daysInNextMonth];
  const numberOfWeeks = allDays.length / 7;
  const weekDays = allDays.slice(0, 7);

  return <View
    style={styles.container}
  >
    <View style={{
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    }}>
      <IconButton
        onPress={() => {
          const newDate = dayjs().year(year).month(month).subtract(1, 'month');
          setYear(newDate.year());
          setMonth(newDate.month());
        }}
        icon="chevron-left"
      />
      <Text variant="titleLarge">{dayjs().year(year).month(month).date(1).format('MMMM YYYY')}</Text>
      <IconButton
        onPress={() => {
          const newDate = dayjs().year(year).month(month).add(1, 'month');
          setYear(newDate.year());
          setMonth(newDate.month());
        }}
        icon="chevron-right"
      />
    </View>
    <View
      key={-1}
      style={{
        flexDirection: 'row',
        gap: 10,
      }}
    >
      {
        weekDays.map((day) => {
          return <View
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              borderColor: 'black',
              width: 40,
            }}
            key={day.format('ddd')}
          >
            <Text
              variant="titleMedium"
            >
              {day.format('ddd')}
            </Text>
          </View>
        })
      }
    </View>
    {
      Array.from({ length: numberOfWeeks }, (_, i) => i).map((weekNumber) => {
        const currentWeekDays = allDays.slice(weekNumber * 7, (weekNumber + 1) * 7);
        return <View
          key={weekNumber}
          style={{
            flexDirection: 'row',
            gap: 10,
          }}
        >
          {
            currentWeekDays.map((day) => {
              return <MyCalendarDay 
                habitId={habitId}
                key={day.format('YYYY-MM-DD')} 
                day={day}
                year={year}
                month={month} 
              />
            })
          }
        </View>
      })
    }
  </View>;
}

const styles = StyleSheet.create({
  container: {
    gap: 10,
  },
});
