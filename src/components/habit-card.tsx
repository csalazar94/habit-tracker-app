import { Avatar, Button, Card, IconButton, ProgressBar, Text, useTheme } from "react-native-paper";
import { StyleSheet, View } from "react-native";

export default function HabitCard({ habit }) {
  const theme = useTheme();

  const styles = StyleSheet.create({
    container: {
      marginHorizontal: 20,
    },
    contentContainer: {
      flex: 1,
      gap:10,
    },
    subContentContainer: {
      flex: 1,
      gap: 10,
      flexDirection: 'row',
    },
    descriptionContainer: {
      flex: 1,
    },
    titleContainer: {
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    targetText: {
      marginBottom: 5,
    },
    actionsContainer: {
      flexDirection: 'row',
      justifyContent: 'flex-end',
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
        <View style={styles.titleContainer}>
          <Text variant="titleMedium">{habit.name}</Text>
          <Text>{Math.round(habit.progress * 100)}%</Text>
        </View>
        <View style={styles.subContentContainer}>
          <Avatar.Icon size={60} icon="home" />
          <View style={styles.descriptionContainer}>
            <Text style={styles.targetText}>{getTargetText()}</Text>
            <ProgressBar style={styles.progress} progress={habit.progress} />
            <View style={styles.actionsContainer}>
              <IconButton iconColor={theme.colors.primary} size={20} icon="pencil" onPress={() => { }} />
              <IconButton iconColor={theme.colors.error} size={20} icon="trash-can" onPress={() => { }} />
            </View>
          </View>
        </View>
      </Card.Content>
    </Card>
  );
}
