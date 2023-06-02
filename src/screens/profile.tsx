import { Button, TextInput } from "react-native-paper";
import { StyleSheet, View } from "react-native";
import { useState } from "react";
import DatePicker from "react-native-date-picker";
import DropDown from "react-native-paper-dropdown";
import { RootState } from "../storage/store";
import { useSelector } from "react-redux";

const styles = StyleSheet.create({
  formContainer: {
    flex: 1,
    gap: 10,
    padding: 10,
  },
});

export default function ProfileScreen() {
  const { user } = useSelector((state: RootState) => state.user);
  const [firstName, setFirstName] = useState(user?.firstName || '');
  const [lastName, setLastName] = useState(user?.lastName || '');
  const [email, setEmail] = useState(user?.email || '');
  const [gender, setGender] = useState(user?.gender || '');
  const [showGenderDropdown, setShowGenderDropdown] = useState(false);
  const [open, setOpen] = useState(false);
  const [date, setDate] = useState(user?.dob || new Date());
  const [weight, setWeight] = useState(user?.weight || 0);
  const [height, setHeight] = useState(user?.height || 0);

  const genderOptions = [
    {
      label: 'Hombre',
      value: 'male',
    },
    {
      label: 'Mujer',
      value: 'female',
    },
    {
      label: 'Otro',
      value: 'other',
    }
  ];

  return (
    <View style={styles.formContainer}>
      <TextInput
        mode="outlined"
        label={'Nombre'}
        value={firstName}
        onChangeText={(text) => setFirstName(text)}
      />
      <TextInput
        mode="outlined"
        label={'Apellido'}
        value={lastName}
        onChangeText={(text) => setLastName(text)}
      />
      <TextInput
        mode="outlined"
        label={'Email'}
        value={email}
        onChangeText={(text) => setEmail(text)}
      />
      <DropDown
        label='Género'
        mode='outlined'
        visible={showGenderDropdown}
        showDropDown={() => setShowGenderDropdown(true)}
        onDismiss={() => setShowGenderDropdown(false)}
        value={gender}
        setValue={setGender}
        list={genderOptions}
      />
      <TextInput
        label={'Fecha de nacimiento'}
        mode='outlined'
        value={date.toString()}
        onPressIn={() => setOpen(true)}
        editable={false}
      />
      <DatePicker
        modal
        mode="date"
        open={open}
        date={date}
        onConfirm={(date) => {
          setOpen(false)
          setDate(date)
        }}
        onCancel={() => setOpen(false)}
      />
      <TextInput
        label={'Peso (kg)'}
        keyboardType="numeric"
        mode='outlined'
        value={weight.toString()}
        onChangeText={(text) => setWeight(Number(text.replace(/[^0-9]/g, '')))}
      />
      <TextInput
        label={'Altura (cms)'}
        keyboardType="numeric"
        mode='outlined'
        value={height.toString()}
        onChangeText={(text) => setHeight(Number(text.replace(/[^0-9]/g, '')))}
      />
      <Button
        mode={'contained'}
      >
        Guardar
      </Button>
    </View>
  );
}
