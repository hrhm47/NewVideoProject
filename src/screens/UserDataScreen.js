import {
  Image,
  Keyboard,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import TextInputField from '../components/TextInputField';
const UserDataScreen = () => {
  const data = useSelector(state => state.signupReducer);
  // console.log('data', data.fullNameError);
  //   const dispatch = useDispatch();
  return (
    <View style={{width: '100%'}}>
      <TextInputField
        label="Full Name"
        placeholder="Enter full name"
        identifier="fullName"
        err={data.fullNameError}
        errMsg="Name must be greater than 6 characters"
      />

      <TextInputField
        label="Cnic"
        placeholder="Enter your cnic"
        identifier="CNIC"
        err={data.cnicError}
        errMsg="Check Your CNIC"
      />

      <TextInputField
        label="Email"
        placeholder="Enter your Email"
        identifier="Email"
        err={data.emailError}
        errMsg="Email is not valid"
      />

      <TextInputField
        label="Password"
        placeholder="Enter your Password"
        identifier="Password"
        err={data.passwordError}
        errMsg="Password must be greater than 8 characters"
      />

      <TextInputField
        label="Confirm Password"
        placeholder="Confirm Password"
        identifier="ConfirmPassword"
        err={data.confirmPasswordError}
        errMsg="Password must same"
      />
    </View>
  );
};

export default UserDataScreen;

const styles = StyleSheet.create({});
