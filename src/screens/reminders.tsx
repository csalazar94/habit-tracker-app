import { Button, Text } from "react-native-paper";
import { View } from "react-native";
import { useNavigation } from "@react-navigation/native";

export default function RemindersScreen() {
  const navigation = useNavigation();

  return (
    <View>
      <Text>Reminders</Text>
      <Button
        onPress={() => { navigation.navigate('Añadir recordatorio') }}
      >Add Habit</Button>
    </View>
  );
}
