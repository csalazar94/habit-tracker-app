import { Button, HelperText, Text, TextInput } from "react-native-paper";
import { StyleSheet, View } from "react-native";
import { useState } from "react";
import DatePicker from "react-native-date-picker";
import DropDown from "react-native-paper-dropdown";
import { RootState } from "../storage/store";
import { useDispatch, useSelector } from "react-redux";
import dayjs from "dayjs";
import { logout, updateStart } from "../storage/user/reducer";

const styles = StyleSheet.create({
  formContainer: {
    flex: 1,
    gap: 10,
    padding: 10,
  },
});

export default function ProfileScreen() {
  const { user, updateStatus } = useSelector((state: RootState) => state.user);
  const [firstName, setFirstName] = useState(user?.firstName || '');
  const [lastName, setLastName] = useState(user?.lastName || '');
  const [email, setEmail] = useState(user?.email || '');
  const [gender, setGender] = useState(user?.gender || '');
  const [showGenderDropdown, setShowGenderDropdown] = useState(false);
  const [openDobDatePicker, setOpenDobDatePicker] = useState(false);
  const [dob, setDob] = useState(user && user.dob ? new Date(user.dob) : new Date());
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

  const dispatch = useDispatch();
  const handleSave = () => {
    if (!user) {
      dispatch(logout());
    } else {
      const userId = user.id;
      const updatedUser = {
        firstName,
        lastName,
        gender,
        dob: dayjs(dob).format('YYYY-MM-DDT00:00:00.000Z'),
        weight,
        height,
      };
      dispatch(updateStart({ userId, ...updatedUser }));
    }
  };

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
        editable={false}
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
        value={dayjs(dob).format('DD/MM/YYYY')}
        onPressIn={() => setOpenDobDatePicker(true)}
        editable={false}
      />
      <DatePicker
        modal
        mode="date"
        open={openDobDatePicker}
        date={dob}
        onConfirm={(date) => {
          setOpenDobDatePicker(false)
          setDob(date)
        }}
        onCancel={() => setOpenDobDatePicker(false)}
      />
      <TextInput
        label={'Peso (kg)'}
        keyboardType="numeric"
        mode='outlined'
        value={weight === 0 ? '' : weight.toString()}
        onChangeText={(text) => setWeight(Number(text.replace(/[^0-9]/g, '')))}
      />
      <TextInput
        label={'Altura (cms)'}
        keyboardType="numeric"
        mode='outlined'
        value={height === 0 ? '' : height.toString()}
        onChangeText={(text) => setHeight(Number(text.replace(/[^0-9]/g, '')))}
      />
      {updateStatus === 'error' && (
        <HelperText type="error" visible={updateStatus === 'error'}>
          Ha ocurrido un error
        </HelperText>
      )}
      <Button
        mode={'contained'}
        onPress={handleSave}
      >
        Guardar
      </Button>
    </View>
  );
}
