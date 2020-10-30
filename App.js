import React, {useEffect,useState} from 'react';
import { View, Text, Button} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';

import Home from "./screens/Home/Home";
import TabPersonalizado from "./Component/TabPersonalizado";
import Notificaciones from "./screens/Notificaciones"
import UnirseViaje from "./screens/UnirseViaje";
import CrearViaje from "./screens/CrearViaje";
import Perfil from "./screens/Perfil";
import useAuthFirebase from "./hooks/useAuthFirebase";
import Bienvenida from "./screens/Bienvenida/Bienvenida";
import SignIn from "./screens/Login/EmailAuthentication/LoginScreen/SignIn";
import SignUp from "./screens/Login/EmailAuthentication/RegistrationScreen/signUp";
import PhoneAuthentication from "./screens/Login/phoneAuthentication/Login"
import DrawerContent from "./Component/customDrawer"

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();
const AuthStack = createStackNavigator();

const AuthStackScreen = () => (
    <AuthStack.Navigator>
        <AuthStack.Screen name="Welcome" component={Bienvenida} />
        <AuthStack.Screen name="PhoneAuthentication" component={PhoneAuthentication} />
        <AuthStack.Screen name="SignIn" component={SignIn} />
        <AuthStack.Screen name="SignUp" component={SignUp} />
    </AuthStack.Navigator>
);

const DrawerScreen = ({props, user}) => (
    <Drawer.Navigator drawerContent={props =>  (console.log('jonn'), console.log(user),
        <DrawerContent {...props} user={user} />  )}>
        <Drawer.Screen name="Home"  component={TabPersonalizado} />
        <Drawer.Screen name="Perfil" component={Perfil} />
        <Drawer.Screen name="Crear Viaje" component={CrearViaje} />
        <Drawer.Screen name="Unirse a viajes" component={UnirseViaje} />
    </Drawer.Navigator>
);   

const StackScreen = ({ user }) => (
    <Stack.Navigator headerMode="none">
        {user ? (
            <Stack.Screen name="DrawerScreen" >
                {(props) => < DrawerScreen  {...props} user={user} />}
            </Stack.Screen>
        ) : (
            <Stack.Screen
                name="Auth"
                component={AuthStackScreen}
                options={{
                    animationEnabled: true
                }}
            />
        )}
    </Stack.Navigator>
);

export default function App() {
    const authFirebase = useAuthFirebase();
    return (
        <NavigationContainer>
            <StackScreen user={authFirebase.user} />
        </NavigationContainer>
    )
}

