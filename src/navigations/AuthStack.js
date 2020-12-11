import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import SignupScreen from '../screens/SignupScreen';
import SignupScreenPasajero from '../screens/SignupScreenPasajero';
import SignupScreenConductor from '../screens/SignupScreenConductor';
import LoginScreen from '../screens/LoginScreen';
import WelcomeScreen from "../screens/WelcomeScreen";

const Stack = createStackNavigator();

export default function AuthStack() {
  return (
    <Stack.Navigator initialRouteName='Bienvenido'>
        <Stack.Screen name='Bienvenido'component={WelcomeScreen} options={{ header: () => null }}/>
        <Stack.Screen  name='Login'  component={LoginScreen} options={{ header: () => null }} />
        <Stack.Screen name='Signup' component={SignupScreen} />
        <Stack.Screen name='SignupPasajero' component={SignupScreenPasajero} />
        <Stack.Screen name='SignupConductor' component={SignupScreenConductor} />
    </Stack.Navigator>
  );
}
