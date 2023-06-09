import { IconButton, useTheme } from "react-native-paper";
import { StyleSheet, View, VirtualizedList } from "react-native";
import HabitCard from "../components/habit-card";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Habit, HabitsProps } from "../types/screens";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../storage/store";
import { useEffect } from "react";
import { findAllStart } from "../storage/habits/reducer";
import { logout } from "../storage/users/reducer";

export default function HabitsScreen({ navigation }: HabitsProps) {
  const dispatch = useDispatch();
  const { habits, findAllStatus, findOneStatus } = useSelector((state: RootState) => state.habits);
  const { user } = useSelector((state: RootState) => state.users);
  const theme = useTheme();

  useEffect(() => {
    if (!user) {
      dispatch(logout());
    } else {
      dispatch(findAllStart({ userId: user.id }));
    }
  }, []);

  const styles = StyleSheet.create({
    container: {
    },
    button: {
      width: 60,
      height: 60,
      borderRadius: 30,
      position: 'absolute',
      bottom: 20,
      right: 20,
    },
    itemContainer: {
      paddingHorizontal: 20,
    },
  });

  return (
    <View style={styles.container}>
      <VirtualizedList
        onRefresh={() => {
          if (!user) {
            dispatch(logout());
          } else {
            dispatch(findAllStart({ userId: user.id }));
          }
        }}
        refreshing={findAllStatus === 'loading'}
        renderItem={({ item }: { item: Habit }) => {
          const status = findOneStatus.find((s) => s.habitId === item.id)?.status || '';
          return (
            <TouchableOpacity
              style={styles.itemContainer}
              onPress={() => navigation.navigate('Habit', { habit: item })}
            >
              <HabitCard habit={item} status={status} />
            </TouchableOpacity>
          );
        }}
        data={habits}
        keyExtractor={(item) => String(item.id)}
        getItemCount={(data) => data.length}
        getItem={(data, index): Habit => data[index]}
        ItemSeparatorComponent={() => <View style={{ height: 15 }} />}
        ListHeaderComponent={() => <View style={{ height: 15 }} />}
        ListFooterComponent={() => <View style={{ height: 110 }} />}
      />
      <IconButton
        icon="plus"
        mode="contained"
        iconColor={theme.colors.inversePrimary}
        containerColor={theme.colors.primary}
        style={styles.button}
        onPress={() => { navigation.navigate('AddHabit') }}
      />
    </View>
  );
}
