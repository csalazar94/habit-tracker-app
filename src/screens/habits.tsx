import { Button, Text } from "react-native-paper";
import { View } from "react-native";
import { useNavigation } from "@react-navigation/native";

export default function HabitsScreen() {
  const navigation = useNavigation();

  return (
    <View>
      <Text>Habits</Text>
      <Button
        onPress={() => { navigation.navigate('Añadir hábito') }}
      >Add Habit</Button>
    </View>
  );
}
