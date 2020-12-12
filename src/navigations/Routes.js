import React, { useContext, useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import firebase from '../constants/firebase';
import AuthStack from './AuthStack';
import DrawerStack from "./DrawerStack";
import { AuthContext } from './AuthProvider';
import Loading from '../components/Loading';
import AsyncStorage from '@react-native-async-storage/async-storage';


async function getData (key)  {
  try {
    const jsonValue = await AsyncStorage.getItem(key)
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch(e) {
    // error reading value
  }
}



export default function Routes() {
    const { user, setUser, userobj, setUserobj } = useContext(AuthContext);
    const [loading, setLoading] = useState(true);
    const [initializing, setInitializing] = useState(true);
    // Handle user state changes
    function onAuthStateChanged(user) {
      setUser(user);
      if (initializing) setInitializing(false);
      setLoading(false);
      
      getData('usersave').then(res => {console.log("jon"), console.log(JSON.stringify(res)), setUserobj(res), console.log('jon2')})

      
      
      




    }
    useEffect(() => {
      const subscriber = firebase.auth().onAuthStateChanged(onAuthStateChanged);
      return subscriber; // unsubscribe on unmount
    }, []);
    if (loading) {
      return <Loading />;
    }
    return (
      <NavigationContainer>
        {user ? <DrawerStack /> : <AuthStack />}
      </NavigationContainer>
    );
  }
