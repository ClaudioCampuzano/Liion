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
  var [i, setI] = useState(0)
    const { user, setUser, userobj, setUserobj, getbyid, flag, setFlag} = useContext(AuthContext);
    const [loading, setLoading] = useState(true);
    const [initializing, setInitializing] = useState(true);
    // Handle user state changes
    function onAuthStateChanged(user) {
      setUser(user);
      
      if (initializing) setInitializing(false);
      setLoading(false);
      }
   
    function test12(user){
 if(user) {
   //console.log(user.uid)
    if(user.uid !== null) {
      console.log(user.uid)
      getbyid('users' ,user.uid)
  }
 }
}


    useEffect(() => {
      const subscriber = firebase.auth().onAuthStateChanged(onAuthStateChanged);
      console.log(user)

      test12(user)
      console.log('cambio flag o user')

     return subscriber; // unsubscribe on unmount
    }, [user, flag]);
    if (loading) {
      return <Loading />;
    }

    //console.log(user)
      
    return (
      <NavigationContainer>
        {user ? <DrawerStack /> : <AuthStack />}
      </NavigationContainer>
    );
  }
