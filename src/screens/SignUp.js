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
} from 'react-native';
import React, {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {actionFunctions} from '../app/action/action';
import UserDataScreen from './UserDataScreen';
import * as ImagePicker from 'react-native-image-picker';
import ButtonComponents from '../components/ButtonComponents';

import {useNavigation} from '@react-navigation/native';
import SignUpAuth from '../app/auth/authFile';
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
      }
    });
  };

  const validateForm = () => {
    // SignUpAuth()
    // console.log('data', data);

    const validRegex =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

      
    if (data.fullName==null) {
      dispatch(actionFunctions.ACFC.addERName(true));
      
    } else {
      if (data.fullName.length >= 6){

        dispatch(actionFunctions.ACFC.addERName(false))
      }else{

        dispatch(actionFunctions.ACFC.addERName(true));
      }
       
    }
    //cninc checking
    if (data.CNIC != null) {
      if (!isNaN(data.CNIC)) {
        if (data.CNIC.length === 13) {
          dispatch(actionFunctions.ACFC.addERCnic(false));
        } else {
          console.log('cnic', data.CNIC.length);
          dispatch(actionFunctions.ACFC.addERCnic(true));
        }
      } else {
        dispatch(actionFunctions.ACFC.addERCnic(true));
      }
    } else {
      dispatch(actionFunctions.ACFC.addERCnic(true));
    }

    // email checking
    if (data.email==null) {
      dispatch(actionFunctions.ACFC.addEREmail(true));
    } else {
      data.email.match(validRegex)
        ? dispatch(actionFunctions.ACFC.addEREmail(false))
        : dispatch(actionFunctions.ACFC.addEREmail(true));
    }
    // password checking
    if(data.password!=null){
    if (data.password.length < 8) {
      dispatch(actionFunctions.ACFC.addERPassword(true));
    } else {
      dispatch(actionFunctions.ACFC.addERPassword(false));
    }
  }else{
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


const globalFieldsChecker=()=>{
  if ((data.fullNameError || data.cnicError || data.emailError || data.passwordError || data.confirmPasswordError || data.pictureUriError)===true ) {
    // setButtonFlag(false);
    console.log("eror in feilds");
  }
  else{
    // setButtonFlag(true);
    console.log("no error in fields");
    SignUpAuth(
      data.fullName,
      data.CNIC,
      data.email,
      data.password,
      data.confirmPassword,
      data.pictureUri,
    )
    // .then((res)=>{
    //   console.log("response on signup form", res);
    // })
  }
}







  return (
    <SafeAreaView style={styles.safeAreaContainer}>
      <View style={styles.mainView}>
        <Text style={styles.registrationText}>Registration Form</Text>
        <TouchableOpacity
          onPress={() => openGallery()}
          style={styles.imageClick}>
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
          mute={ButtonFlag}
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
  imageClick: {
    width: 150,
    height: 150,
    backgroundColor: 'green',
    borderRadius: 100,
    marginTop: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
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
