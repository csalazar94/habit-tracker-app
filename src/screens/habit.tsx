import { Button, Text, useTheme } from "react-native-paper";
import { StyleSheet, View } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Calendar, LocaleConfig } from "react-native-calendars";

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

export default function HabitScreen() {
  const { habit } = useRoute().params;

  const navigation = useNavigation();
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
    textDayFontFamily: theme.fonts.titleMedium.fontFamily,
    textMonthFontFamily: theme.fonts.titleMedium.fontFamily,
    textDayHeaderFontFamily: theme.fonts.titleMedium.fontFamily,
    textDayFontWeight: theme.fonts.titleMedium.fontWeight,
    textMonthFontWeight: 'bold',
    textDayHeaderFontWeight: theme.fonts.titleMedium.fontWeight,
    textDayFontSize: theme.fonts.bodyLarge.fontSize,
    textMonthFontSize: theme.fonts.titleMedium.fontSize,
    textDayHeaderFontSize: theme.fonts.bodyLarge.fontSize,
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

  return (
    <View style={styles.container}>
      <Text variant="titleLarge">{habit.name}</Text>
      <Calendar
        firstDay={1}
        enableSwipeMonths={true}
        theme={calendarTheme}
        markingType='custom'
        markedDates={{
          '2023-04-03': customMarkingStyle,
          '2023-04-05': customMarkingStyle,
          '2023-04-06': customMarkingStyle,
        }}
      />
      <Button onPress={() => navigation.goBack()} mode="contained">Volver</Button>
    </View>
  );
}

