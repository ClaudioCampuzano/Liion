import React, {useEffect,useState} from 'react';
import { View, Text} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';


import firebase from 'firebase'

import PhoneAuthentication from "./screens/Login/phoneAuthentication/Login";
import Welcome from "./screens/Welcome/Welcome"
import Home from "./screens/HomeScreen/HomeScreen"
import Home2 from "./screens/HomeScreen/Home2"
import SignIn from "./screens/Login/EmailAuthentication/LoginScreen/SignIn"
import SignUp from "./screens/Login/EmailAuthentication/RegistrationScreen/signUp"
import { DrawerContent } from './CustomNavigators/customDrawer'
const RootStack = createStackNavigator();
const Stack = createStackNavigator();

//
const RootStackScreen = ({ user }) => (
    <RootStack.Navigator headerMode="none">
        {user ? (
            <RootStack.Screen name="DrawerScreen" >
            {(props) => < DrawerScreen  {...props} user={user} />}
            </RootStack.Screen>
        ) : (
            <RootStack.Screen
                name="Auth"
                component={AuthStackScreen}
                options={{
                    animationEnabled: false
                }}
            />
        )}
    </RootStack.Navigator>
);

export default function App() {
    const [loading, setLoading] = useState(true)
    const [user, setUser] = useState(null)

    useEffect(() => {
        const usersRef = firebase.firestore().collection('users');
        firebase.auth().onAuthStateChanged(user => {
            if (user) {
                usersRef
                    .doc(user.uid)
                    .get()
                    .then((document) => {
                        const userData = document.data()
                        setLoading(false)
                        setUser(userData)
                    })
                    .catch((error) => {
                        setLoading(false)
                    });
            } else {
                setLoading(false)
            }
        });
    }, []);

    return (
        <NavigationContainer>
            <RootStackScreen user={user} />
        </NavigationContainer>
    );
}

const AuthStack = createStackNavigator();
const AuthStackScreen = () => (
    <AuthStack.Navigator>
        <AuthStack.Screen name="Welcome" component={Welcome} />
        <AuthStack.Screen name="PhoneAuthentication" component={PhoneAuthentication} />
        <AuthStack.Screen name="SignIn" component={SignIn} />
        <AuthStack.Screen name="SignUp" component={SignUp} />
    </AuthStack.Navigator>
);

const Drawer = createDrawerNavigator();
const DrawerScreen = ({user}) => (
    console.log('jiro'),
    console.log(JSON.stringify(user)),
    //console.log(props),
    <Drawer.Navigator drawerContent={props =>  (console.log('jonn'), console.log(user),
    <DrawerContent {...props} user={user} />  )}>
        <Drawer.Screen name="Home"  component={Home} />

        <Drawer.Screen name="Home2" component={Home2} />
    </Drawer.Navigator>
);