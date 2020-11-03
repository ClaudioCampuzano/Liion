import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import SignupScreen from '../screens/SignupScreen';
import LoginScreen from '../screens/LoginScreen';
import WelcomeScreen from "../screens/WelcomeScreen";
import StackNavigator from "@react-navigation/stack/src/navigators/createStackNavigator";

const Stack = createStackNavigator();

export default function AuthStack() {
  return (
    <Stack.Navigator initialRouteName='Bienvenido'>
        <Stack.Screen name='Bienvenido'component={WelcomeScreen} options={{ header: () => null }}/>
        <Stack.Screen  name='Login'  component={LoginScreen} options={{ header: () => null }} />
        <Stack.Screen name='Signup' component={SignupScreen} />
    </Stack.Navigator>
  );
}
