import { Button, Text } from "react-native-paper";
import { View } from "react-native";
import { useNavigation } from "@react-navigation/native";

export default function GoalsScreen() {
  const navigation = useNavigation();

  return (
    <View>
      <Text>Goals</Text>
      <Button
        onPress={() => { navigation.navigate('Añadir objetivo') }}
      >Add Goal</Button>
    </View>
  );
}
