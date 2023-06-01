import { Button, RadioButton, TextInput, Text } from "react-native-paper";
import { StyleSheet, View } from "react-native";
import { useState } from "react";
import DatePicker from "react-native-date-picker";
import DropDown from "react-native-paper-dropdown";

const styles = StyleSheet.create({
  formContainer: {
    flex: 1,
    gap: 10,
    padding: 10,
  },
});

export default function ProfileScreen() {
  const [gender, setGender] = useState("");
  const [showGenderDropdown, setShowGenderDropdown] = useState(false);
  const [open, setOpen] = useState(false);
  const [date, setDate] = useState(new Date());

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
      />
      <TextInput
        mode="outlined"
        label={'Apellido'}
      />
      <TextInput
        mode="outlined"
        label={'Email'}
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
        label={'Peso'}
        keyboardType="numeric"
        mode='outlined'
      />
      <TextInput
        label={'Altura'}
        keyboardType="numeric"
        mode='outlined'
      />
      <Button
        mode={'contained'}
      >
        Guardar
      </Button>
    </View>
  );
}
