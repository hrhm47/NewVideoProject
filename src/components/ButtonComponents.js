import { StyleSheet, Text, View,TouchableOpacity } from 'react-native'
import React from 'react'

const ButtonComponents = ({validateForm,BtnName,mute}) => {
  console.log(mute,"mute");
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
            // if(mute){
              validateForm();
              // console.log('btn clicked in mute mood');
            // }else{
              // console.log('btn clicked in unmute mood');
            // }
          }}>
          <Text style={{fontSize: 20, color: '#fff', fontWeight:"600"}}>{BtnName}</Text>
        </TouchableOpacity>
    </View>
  )
}

export default ButtonComponents

const styles = StyleSheet.create({})