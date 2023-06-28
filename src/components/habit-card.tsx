import { ActivityIndicator, Avatar, Card, ProgressBar, Text } from "react-native-paper";
import { StyleSheet, View, ViewStyle } from "react-native";
import LastNDays from "./last-n-days";
import { Habit } from "../types/screens";

export default function HabitCard({
  onPress,
  containerStyle,
  habit,
  status
}: {
  onPress?: () => void,
  containerStyle: ViewStyle,
  habit: Habit,
  status: string
}) {
  const styles = StyleSheet.create({
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
      case 'weekly':
        suffix = 'a la semana';
        break;
      case 'monthly':
        suffix = 'al mes';
        break;
      case 'yearly':
        suffix = 'al año';
        break;
    }
    let unit;
    if (habit.target === 1) {
      unit = 'vez';
    } else {
      unit = 'veces';
    }
    return `${habit.target} ${unit} ${suffix}`;
  };

  return (
    <Card
      onPress={onPress}
      style={containerStyle}
    >
      <Card.Content style={styles.contentContainer}>
        <View style={styles.headerContainer}>
          <Avatar.Icon size={36} icon={habit.habitCategory.icon} />
          <View style={styles.titleContainer}>
            <Text variant="titleMedium">{habit.name}</Text>
            {
              status === 'loading'
                ? <ActivityIndicator />
                : <Text>{Math.round(habit.progress * 100)}%</Text>
            }
          </View>
        </View>
        <View style={styles.subContentContainer}>
          <View style={styles.descriptionContainer}>
            <Text style={styles.targetText}>{getTargetText()}</Text>
            <ProgressBar style={styles.progress} progress={habit.progress} indeterminate={status === 'loading'} />
            <View style={styles.actionsContainer}>
              <LastNDays
                habitId={habit.id}
                records={habit.dailyRecords}
              />
            </View>
          </View>
        </View>
      </Card.Content>
    </Card>
  );
}
