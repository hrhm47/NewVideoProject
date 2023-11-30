import React from 'react';
import {View, StyleSheet} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import SignUp from './src/screens/SignUp';
import LogIn from './src/screens/LogIn';
import ImageViewer from './src/screens/ImageViewer';


import {Provider} from 'react-redux';
import store from './src/app/store/store';
import OTPFScreen from './src/screens/OTPFScreen';

const Stack = createNativeStackNavigator();

function App() {
  return (
    <Provider store={store}>
      <View style={styles.container}>
        <NavigationContainer>
          <Stack.Navigator
            initialRouteName="SignUp"
            screenOptions={{headerShown:false}}>
            <Stack.Screen name="SignUp" component={SignUp} />
            <Stack.Screen name="LogIn" component={LogIn} /> 
            <Stack.Screen name="ImageViewer" component={ImageViewer} /> 
            <Stack.Screen name="OTPFScreen" component={OTPFScreen} /> 
          </Stack.Navigator>
        </NavigationContainer>
        {/* <SignUp /> */}
      </View>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    // flex:1,
    height: '100%',
    // backgroundColor: 'black',
  },
});

export default App;
