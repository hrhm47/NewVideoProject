import {Alert, ScrollView, StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import {useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';

import TextInputField from '../components/TextInputField';
import ButtonComponents from '../components/ButtonComponents';
import {
  Email_Verification,
  OTP_Verification,
  Reset_Password,
} from '../app/auth/authFile';

const OTPFScreen = () => {
  const data = useSelector(state => state.signupReducer);
  const navigation = useNavigation();
  const [otp, setOtp] = useState('Forget_Password');
  //   let otp='Forget_Password'
  validateEmail = () => {
    Email_Verification(data.email).then(res => {
      console.log('Email_Verification', res);
      if (res.success) {
        setOtp('OTP');
      } else {
        Alert.alert('Error', res.success);
      }
    });
  };
  validateOTP = () => {
    OTP_Verification(data.email, data.otp).then(res => {
      console.log('OTP_Verification', res);
      if (res.success) {
        setOtp('');
      } else {
        Alert.alert('Please ReEnter OTP ', 'your otp is not correct');
      }
    });
  };

  confirmPassword = () => {
    Reset_Password(data.email.data.password, data.confirmPassword).then(res => {
      if (res.success) {
        setOtp('');
        navigation.navigate('LogIn');
      } else {
        Alert.alert('Issue in passowrd', res.success);
      }
    });
    // setOtp('Reset_Password');
  };
  return (
    <View style={styles.mainView}>
      {/* get user email  */}

      {otp === 'Forget_Password' ? (
        <View style={styles.emailVerificationView}>
          <Text style={styles.headingTextStyle}>Forget Password</Text>
          <Text style={styles.textStyle}>
            Enter your email and we'll send you an OTP on your email to reset
            your password.
          </Text>
          <View style={{width: '100%'}}>
            <TextInputField
              placeholder={'Enter your email'}
              identifier={'Email'}
              color={'black'}
            />
          </View>
          <ButtonComponents BtnName={'Send OTP'} validateForm={validateEmail} />
        </View>
      ) : otp === 'OTP' ? (
        <View style={styles.emailVerificationView}>
          <Text style={styles.headingTextStyle}>OTP Verification</Text>
          <Text style={styles.textStyle}>
            We have send you One Time Password_OTP on this email.
          </Text>
          <View style={{width: '100%'}}>
            <TextInputField
              placeholder={'Enter otp'}
              identifier={'OTP'}
              color={'black'}
            />
          </View>
          <ButtonComponents BtnName={'Verify'} validateForm={validateOTP} />
        </View>
      ) : (
        <View style={styles.emailVerificationView}>
          <Text style={styles.headingTextStyle}>RESET Password</Text>
          {/* <Text style={styles.textStyle}>.</Text> */}
          <View style={{width: '100%'}}>
            <TextInputField
              label="Password"
              placeholder="Enter your Password"
              identifier="Password"
             marginBottom={15}
            />

            <TextInputField
              label="Confirm Password"
              placeholder="Confirm Password"
              identifier="ConfirmPassword"
              marginBottom={0}
            />
          </View>
          <ButtonComponents BtnName={'Confirm'} validateForm={validateOTP} />
        </View>
      )}
    </View>
  );
};

export default OTPFScreen;

const styles = StyleSheet.create({
  mainView: {
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#333',
  },
  emailVerificationView: {
    width: '90%',
    height: '50%',
    backgroundColor: '#ffffff',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headingTextStyle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#333',
    textAlign: 'center',
    marginBottom: 10,
  },
  textStyle: {
    fontSize: 15,
    fontWeight: '500',
    color: '#333',
    textAlign: 'center',
    marginTop: 10,
    width: '90%',
  },
});
