import { Avatar, Card, ProgressBar, Text } from "react-native-paper";
import { StyleSheet, View } from "react-native";
import { Switch } from "react-native-gesture-handler";
import { Calendar } from "react-native-calendars";
import LastNDays from "./last-n-days";

export default function HabitCard({ habit, disabled = false }) {

  const styles = StyleSheet.create({
    container: {
      margin: 3,
    },
    contentContainer: {
      flex: 1,
      gap: 10,
    },
    subContentContainer: {
      flex: 1,
      gap: 10,
      flexDirection: 'row',
    },
    descriptionContainer: {
      flex: 1,
    },
    headerContainer: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
      gap: 10,
    },
    titleContainer: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    targetText: {
      marginBottom: 5,
    },
    actionsContainer: {
      marginTop: 10,
      flexDirection: 'row',
      justifyContent: 'flex-end',
      alignItems: 'center',
    },
    progress: {
      height: 10,
      borderRadius: 5,
    },
  });

  const getTargetText = () => {
    let suffix;
    switch (habit.frequency) {
      case 'daily':
        suffix = 'al día';
        break;
      case 'weekly':
        suffix = 'a la semana';
        break;
      case 'monthly':
        suffix = 'al mes';
        break;
    }
    let unit;
    switch (habit.unit) {
      case 'times':
        if (habit.target === 1) {
          unit = 'vez';
        } else {
          unit = 'veces';
        }
        break;
      case 'pages':
        if (habit.target === 1) {
          unit = 'página';
        } else {
          unit = 'páginas';
        }
        break;
    }
    return `${habit.target} ${unit} ${suffix}`;
  };

  return (
    <Card style={styles.container}>
      <Card.Content style={styles.contentContainer}>
        <View style={styles.headerContainer}>
          <Avatar.Icon size={36} icon="heart" />
          <View style={styles.titleContainer}>
            <Text variant="titleMedium">{habit.name}</Text>
            <Text>{Math.round(habit.progress * 100)}%</Text>
          </View>
        </View>
        <View style={styles.subContentContainer}>
          <View style={styles.descriptionContainer}>
            <Text style={styles.targetText}>{getTargetText()}</Text>
            <ProgressBar style={styles.progress} progress={habit.progress} />
            <View style={styles.actionsContainer}>
              <LastNDays />
            </View>
          </View>
        </View>
      </Card.Content>
    </Card>
  );
}
