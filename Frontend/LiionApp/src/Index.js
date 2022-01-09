import React, { useState, useContext, useEffect, useRef } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { NavigationContainer } from "@react-navigation/native";
import messaging from '@react-native-firebase/messaging';
import AuthNavigator from "./navigations/AuthNavigator";
import DrawerNavigator from "./navigations/DrawerNavigator";
import { GlobalContext } from "./context/Provider";

import { loadFonts } from "./constants/styleThemes";

import Loading from "./components/Loading";

const Index = (props) => {
  const { loadUserFirestoreData, isLoadedData, refreshTokens } = useContext(GlobalContext);

  const [userStateLoaded, setUserStateLoaded] = useState(false);
  const [user, setUser] = useState(null);

  const fontsLoaded = loadFonts();

  // Check user state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(getAuth(), (firebaseUser) => {
      setUser(firebaseUser);
      setUserStateLoaded(true);
      //metodo para actualizar token cuando cambie, no se como probar ya que el token cambia cada 1.. habria que dejarlo ese tiempo y ver que pasa
      //no me gusta esa sintaxis qla de then con callbacks pero weno se le hace a todo
      firebaseUser.getIdToken(true).then(id => {
        refreshTokens({ accesstoken: id })
        console.log('se ha actualizado token de sesion')
      }).catch(e => console.log(e))
    });

    return () => unsubscribe;
  }, []);


  useEffect(() => {
    const uunsubscribe = messaging().onMessage(async remoteMessage => {
      console.log('A new FCM message arrived!', JSON.stringify(remoteMessage));
    });

    return uunsubscribe;
  }, []);

  messaging().setBackgroundMessageHandler(async remoteMessage => {
    console.log('Message handled in the background!', remoteMessage);
  });

  // Only user change and exists load firestoreData
  useEffect(() => {
    (async function loadInfo() {
      if (user) {
        await loadUserFirestoreData(user);
      }
    })();
  }, [user]);

  // If fonts, userState are loaded, and if user exists, firestoreData load
  return (
    <>
      {fontsLoaded && userStateLoaded && (!user || isLoadedData) ? (
        <NavigationContainer>
          {isLoadedData ? <DrawerNavigator /> : <AuthNavigator />}
        </NavigationContainer>
      ) : (
        <Loading />
      )}
    </>
  );
};

export default Index;
