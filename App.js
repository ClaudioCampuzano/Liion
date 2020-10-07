import React, {useEffect,useState} from 'react';
import { View, Text} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";

import PhoneAuthentication from "./screens/Login/phoneAuthentication/Login";
import Welcome from "./screens/Bienvenida/Welcome"
import Home from "./screens/Home/HomeScreen"
import SignIn from "./screens/Login/EmailAuthentication/LoginScreen/SignIn"
import SignUp from "./screens/Login/EmailAuthentication/RegistrationScreen/signUp"
import useAuthFirebase from "./hooks/useAuthFirebase";

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();
const AuthStack = createStackNavigator();

const StackScreen = ({ user }) => (
    <Stack.Navigator headerMode="none">
        {user ? (
            <Stack.Screen
                //user = {user}
                name="DrawerScreen"
                component={DrawerScreen}
                options={{
                    animationEnabled: false
                }}
            />
        ) : (
            <Stack.Screen
                name="Auth"
                component={AuthStackScreen}
                options={{
                    animationEnabled: false
                }}
            />
        )}
    </Stack.Navigator>
);

const AuthStackScreen = () => (
    <AuthStack.Navigator>
        <AuthStack.Screen name="Welcome" component={Welcome} />
        <AuthStack.Screen name="PhoneAuthentication" component={PhoneAuthentication} />
        <AuthStack.Screen name="SignIn" component={SignIn} />
        <AuthStack.Screen name="SignUp" component={SignUp} />
    </AuthStack.Navigator>
);

const DrawerScreen = () => (
    <Drawer.Navigator initialRouteName="Home">
        <Drawer.Screen name="Home" component={Home} />
    </Drawer.Navigator>
);

export default function App() {
    const authFirebase = useAuthFirebase();
    return (
        <NavigationContainer>
            <StackScreen user={authFirebase.user} />
        </NavigationContainer>
    );
}
