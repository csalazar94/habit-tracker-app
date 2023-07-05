import { Button, HelperText, TextInput } from "react-native-paper";
import { Pressable, StyleSheet, View } from "react-native";
import { useState } from "react";
import DatePicker from "react-native-date-picker";
import DropDown from "react-native-paper-dropdown";
import { RootState } from "../storage/store";
import { useDispatch, useSelector } from "react-redux";
import dayjs from "dayjs";
import { logout, updateStart } from "../storage/users/reducer";

const styles = StyleSheet.create({
  formContainer: {
    flex: 1,
    gap: 10,
    padding: 10,
  },
});

export default function ProfileScreen() {
  const { user, updateStatus, updateError } = useSelector((state: RootState) => state.users);
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
        dob: dayjs(dob).format('YYYY-MM-DD'),
        weight,
        height,
      };
      dispatch(updateStart({ userId, ...updatedUser }));
    }
  };

  const hasErrors = (property: string) => {
    return updateStatus === 'error' && Array.isArray(updateError) && updateError.findIndex((e) => e.property === property) !== -1;
  }

  const getErrorsMessage = (property: string) => {
    if (!hasErrors(property)) return;
    return (
      <HelperText type="error">
        {(updateError as { property: string, messages: [] }[]).find((e) => e.property === property)?.messages.join('\n')}
      </HelperText>
    );
  }

  return (
    <View style={styles.formContainer}>
      <TextInput
        mode="outlined"
        label={'Nombre'}
        value={firstName}
        onChangeText={(text) => setFirstName(text)}
      />
      {getErrorsMessage('firstName')}
      <TextInput
        mode="outlined"
        label={'Apellido'}
        value={lastName}
        onChangeText={(text) => setLastName(text)}
      />
      {getErrorsMessage('lastName')}
      <TextInput
        mode="outlined"
        label={'Email'}
        value={email}
        onChangeText={(text) => setEmail(text)}
        editable={false}
      />
      {getErrorsMessage('email')}
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
      {getErrorsMessage('gender')}
      <Pressable
        onPress={() => {
          setOpenDobDatePicker(true);
        }}
      >
        <TextInput
          label={'Fecha de nacimiento'}
          mode='outlined'
          value={dayjs(dob).format('DD/MM/YYYY')}
          editable={false}
        />
      </Pressable>
      {getErrorsMessage('dob')}
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
      {getErrorsMessage('weight')}
      <TextInput
        label={'Altura (cms)'}
        keyboardType="numeric"
        mode='outlined'
        value={height === 0 ? '' : height.toString()}
        onChangeText={(text) => setHeight(Number(text.replace(/[^0-9]/g, '')))}
      />
      {getErrorsMessage('height')}
      {
        updateStatus === 'error' && (typeof updateError === 'string') && (
          <HelperText type="error" visible={updateStatus === 'error' && (typeof updateError === 'string')}>
            {String(updateError)}
          </HelperText>
        )
      }
      <Button
        mode={'contained'}
        onPress={handleSave}
        loading={updateStatus === 'loading'}
        disabled={updateStatus === 'loading'}
      >
        Guardar
      </Button>
    </View>
  );
}
