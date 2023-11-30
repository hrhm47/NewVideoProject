/*


sigup ka kam karna hy or login ka page banana hy


*/

import {
  Image,
  Keyboard,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  StatusBar,
  Platform,
  Alert,
} from 'react-native';
import React, {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {actionFunctions} from '../app/action/action';
import UserDataScreen from './UserDataScreen';
import * as ImagePicker from 'react-native-image-picker';
import ButtonComponents from '../components/ButtonComponents';

import {useNavigation} from '@react-navigation/native';
import {SignUpAuth} from '../app/auth/authFile';
// import validateForm from '../components/ValidationFunction';

const SignUp = () => {
  const [ButtonFlag, setButtonFlag] = useState(false);
  const navigation = useNavigation();
  const data = useSelector(state => state.signupReducer);
  // console.log('data', data);
  const dispatch = useDispatch();

  const openGallery = () => {
    const options = {
      selectionLimit: 0,
      mediaType: 'photo',
      includeBase64: false,
      includeExtra: true,
    };
    ImagePicker.launchImageLibrary(options, response => {
      if (response.didCancel) {
        dispatch(actionFunctions.ACFC.addERPicture(true));
      } else if (response.assets) {
        console.log(response.assets[0]);
        dispatch(actionFunctions.ACFC.addPicture(response.assets[0]));
        dispatch(actionFunctions.ACFC.addERPicture(false));
      }
    });
  };

  const validateForm = async() => {
    // SignUpAuth()
    // console.log('data', data);

    const validRegex =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      
      // image checking
      if (data.pictureUri === null) {
        dispatch(actionFunctions.ACFC.addERPicture(true));
      } else {
        dispatch(actionFunctions.ACFC.addERPicture(false));
      }
      
      const checkString = /^[a-zA-Z\s]{6,}$/;
    // fullname checking
    if (
      data.fullName === null ||
      data.fullName.length < 1 ||
      !data.fullName.match(checkString)
    ) {
      dispatch(actionFunctions.ACFC.addERName(true));
    } else {
      if (data.fullName.length >= 6) {
        dispatch(actionFunctions.ACFC.addERName(false));
      } else {
        dispatch(actionFunctions.ACFC.addERName(true));
      }
    }
    //cninc checking

    if (data.CNIC != null && !isNaN(data.CNIC)) {
      if (data.CNIC.length === 13) {
        dispatch(actionFunctions.ACFC.addERCnic(false));
      } else {
        dispatch(actionFunctions.ACFC.addERCnic(true));
      }
    } else {
      dispatch(actionFunctions.ACFC.addERCnic(true));
    }

    // email checking
    if (data.email == null) {
      dispatch(actionFunctions.ACFC.addEREmail(true));
    } else {
      data.email.match(validRegex)
        ? dispatch(actionFunctions.ACFC.addEREmail(false))
        : dispatch(actionFunctions.ACFC.addEREmail(true));
    }
    // password checking
    if (data.password != null) {
      if (data.password.length < 8) {
        dispatch(actionFunctions.ACFC.addERPassword(true));
      } else {
        dispatch(actionFunctions.ACFC.addERPassword(false));
      }
    } else {
      dispatch(actionFunctions.ACFC.addERPassword(true));
    }
    // confirm password checking
    if (data.confirmPassword.length != null) {
      if (data.confirmPassword.length < 8) {
        dispatch(actionFunctions.ACFC.addERConfirmPassword(true));
      } else {
        if (data.password === data.confirmPassword) {
          dispatch(actionFunctions.ACFC.addERConfirmPassword(false));
        } else {
          dispatch(actionFunctions.ACFC.addERConfirmPassword(true));
        }
      }
    } else {
      dispatch(actionFunctions.ACFC.addERConfirmPassword(true));
    }

    globalFieldsChecker();
  };

  const globalFieldsChecker = () => {
    if (
      data.fullName.trim() === '' ||
      data.CNIC.trim() === '' ||
      data.email.trim() === '' ||
      data.password.trim() === '' ||
      data.confirmPassword.trim() === '' ||
      data.pictureUri === null
    ) {
      console.log('One or more fields are empty');
      return;
    } else {
      if (data.fullNameError || data.cnicError || data.emailError || data.passwordError || data.confirmPasswordError || data.pictureUriError) {
        // console.log('hello in error mode', data.fullNameError, data.cnicError, data.emailError, data.passwordError, data.confirmPasswordError, data.pictureUriError);
        return;
      } 
      else {
        // console.log('hello in zero error mode');
        SignUpAuth(
          data.fullName,
          data.CNIC,
          data.email,
          data.password,
          data.confirmPassword,
          data.pictureUri,
        )
          .then(res => {
            // console.log('response on signup form', res);
            if (res.success){
              Alert.alert("Successfully Registerd ",data.fullName+" Your Account Is Please Login To Continue", [
                {
                  text: "OK",
                  onPress: () => navigation.navigate('LogIn'),
                  style: "default"
                },
              ])
            }else{
              Alert.alert("Please Try Again ",res.message,  [
                {
                  text: "OK",
                  onPress: () => {},
                  style: "cancel",
                },
                
              ])
            }

            // navigation.navigate('LogIn');
          })
          .catch(error => {
            console.log('error', error);
          });
      }
    }
  };

  return (
    <SafeAreaView style={styles.safeAreaContainer}>
      <View style={styles.mainView}>
        <Text style={styles.registrationText}>Registration Form</Text>
        <TouchableOpacity
          onPress={() => openGallery()}
          style={styles.imageClick(data.pictureUriError)}>
          {data.pictureUri ? (
            <Image
              source={{uri: data.pictureUri.uri}}
              style={styles.imageStyle}
            />
          ) : null}
        </TouchableOpacity>
      </View>
      <ScrollView
        style={{width: '100%', marginTop: 10}}
        contentContainerStyle={{alignItems: 'center'}}>
        {/* input data coming from this file  */}
        <UserDataScreen />
        {/* submit button */}
        <ButtonComponents
          validateForm={validateForm}
          BtnName="Submit"
          
        />
        <View
          style={{
            alignItems: 'center',
            flexDirection: 'row',
            marginBottom: 20,
          }}>
          <Text style={styles.alreadyAccText}>Already have an account?</Text>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('LogIn');
              
            }}>
            <Text style={[styles.alreadyAccText, {color: 'yellow'}]}>
              {' '}
              Login
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignUp;

const styles = StyleSheet.create({
  safeAreaContainer: {
    alignItems: 'center',
    height: '100%',
    backgroundColor: '#333',
    // paddingTop: Platform.OS == 'android' ? StatusBar.currentHeight : 0,
  },
  mainView: {
    width: '100%',
    alignItems: 'center',
  },
  registrationText: {
    fontSize: 30,
    fontWeight: '500',
    color: '#fff',
  },
  imageClick: error => ({
    width: 150,
    height: 150,
    backgroundColor: error ? 'red' : 'green',
    borderRadius: 100,
    marginTop: 10,
    alignItems: 'center',
    justifyContent: 'center',
  }),
  imageStyle: {
    width: 150,
    height: 150,
    backgroundColor: 'green',
    borderRadius: 100,
    resizeMode: 'cover',
  },
  alreadyAccText: {
    color: 'white',
    fontSize: 17,
    fontWeight: '200',
  },
});
