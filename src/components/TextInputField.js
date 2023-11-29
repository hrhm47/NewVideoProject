import {StyleSheet, Text, TextInput, View} from 'react-native';
import React from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {actionFunctions} from '../app/action/action';


const TextInputField = ({placeholder, identifier,label,err,errMsg}) => {
  const data=useSelector(state=>state.singupReducer)
  const dispatch = useDispatch();
  // let key1=key;

  const onDataChange = text => {
   
    // console.log('text', text, identifier);
    switch (identifier) {
      case 'fullName':
        return dispatch(actionFunctions.ACFC.addName(text));
      case 'CNIC':
        return dispatch(actionFunctions.ACFC.addCnic(text));
      case 'Email':
        return dispatch(actionFunctions.ACFC.addEmail(text));
      case 'Password':
        return dispatch(actionFunctions.ACFC.addPassword(text));
      case 'ConfirmPassword':
        return dispatch(actionFunctions.ACFC.addConfirmPassword(text));
      default:
        return null;
    }
  };

  return (
    <View style={{marginBottom:10, alignItems:"center"}}>
         <Text style={{color:"white", fontSize:17, fontWeight:'500', marginBottom:5, textAlign:"justify", width:"90%"}}>{label}</Text>
        <TextInput
        placeholder={placeholder}
        style={{
            borderWidth: 1,
            borderColor: 'black',
            width: '90%',
            color: '#fff',
            paddingHorizontal:10,
            borderRadius: 10,
            }}
            onChangeText={text => {
                onDataChange(text);
            }}
            placeholderTextColor={'white'}
            // autoFocus={true}
            />
        {err?<Text style={{color:"red", fontSize:13, textAlign:"justify", width:"90%",marginTop:2}}>{errMsg}</Text>:null}
        </View>
  );
};

export default TextInputField;

const styles = StyleSheet.create({});
