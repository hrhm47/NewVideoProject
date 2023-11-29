import {ScrollView, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';

import {useNavigation} from '@react-navigation/native';

import TextInputField from '../components/TextInputField';
import ButtonComponents from '../components/ButtonComponents';

const LogIn = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.loginContainer}>
      <Text style={styles.LoginText}>LOG IN</Text>
      <ScrollView
        style={{width: '100%', marginTop: 10}}
        contentContainerStyle={{alignItems: 'center'}}>

      <View style={styles.LoginInnreView}>
        <TextInputField
          label="Username / Email"
          placeholder="Enter your username or email"
          identifier="fullName"
          // err={data.fullNameError}
          // errMsg="Name must be greater than 6 characters"
        />
        <TextInputField
          label="Password"
          placeholder="Enter full name"
          identifier="fullName"
          // err={data.fullNameError}
          // errMsg="Name must be greater than 6 characters"
        />
        <ButtonComponents BtnName={'Log In'} />
        <Text style={[styles.alreadyAccText,{alignSelf:"center"}]}>Forget Password?</Text>
        <View
          style={{
              alignItems: 'center',
              flexDirection: 'row',
              marginBottom: 20,
              justifyContent: 'center',
            }}>
          <Text style={styles.alreadyAccText}>Create an account?</Text>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('SignUp');
            }}>
            <Text style={[styles.alreadyAccText, {color: 'yellow'}]}>
              {' '}
              SignUp
            </Text>
          </TouchableOpacity>
        </View>
      </View>
        </ScrollView>
    </View>
  );
};

export default LogIn;

const styles = StyleSheet.create({
  loginContainer: {
    height: '100%',
    width: '100%',
    backgroundColor: '#333',
    alignItems: 'center',
    paddingTop: '40%',
    // justifyContent:"center"
  },
  LoginText: {
    fontSize: 30,
    fontWeight: '500',
    color: '#fff',
  },
  LoginInnreView: {
    width: '100%',
    borderWidth: 1,
    marginTop: '5%',
    borderColor: '#fff',
    // paddingHorizontal: 10,
    // backgroundColor: 'red',
    paddingTop: '10%',
    
  },
  alreadyAccText: {
    color: 'white',
    fontSize: 17,
    fontWeight: '200',
  },
});
