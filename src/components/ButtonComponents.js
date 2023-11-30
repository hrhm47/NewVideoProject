import { StyleSheet, Text, View,TouchableOpacity,Alert } from 'react-native'
import React from 'react'

const ButtonComponents = ({validateForm,BtnName}) => {
  
  return (
    <View style={{width:"100%", alignItems:"center",marginBottom:10}}>
     <TouchableOpacity
          style={{
            backgroundColor: 'green',
            width: '80%',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 10,
            padding:10,
            // opacity:mute?1:.5
          }}
          onPress={() => {
            // if (BtnName==="Log In") {
            //   console.log("btn name is log in");
            //   // validateForm("Log In");
            // }
              validateForm();
              // Alert.alert("Button is working")
              
          }}>
          <Text style={{fontSize: 20, color: '#fff', fontWeight:"600"}}>{BtnName}</Text>
        </TouchableOpacity>
    </View>
  )
}

export default ButtonComponents

const styles = StyleSheet.create({})