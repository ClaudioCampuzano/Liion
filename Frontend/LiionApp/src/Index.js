import React, { useState, useContext, useEffect } from "react";
import firebase from "firebase";
import { NavigationContainer } from "@react-navigation/native";
import { ActivityIndicator } from "react-native";

import { COLORS } from "./constants/styleThemes";
import AuthNavigator from "./navigations/AuthNavigator";
import DrawerNavigator from "./navigations/DrawerNavigator";
import { GlobalContext } from "./context/Provider";

import { loadFonts } from "./constants/styleThemes";

const Index = () => {
  const {
    reLoadUserInfo,
    isLoggedIn,
    loadUserFirestoreData,
    userData,
    uid,
    userFirestoreData,
    getState2,
    accesstoken,
    isLoadedDATA,
    setIsLoadedDATA,
    reloadTrigger,
  } = useContext(GlobalContext);

  const [isAuthenticated, setIsAuthenticated] = useState(isLoggedIn);
  const [isLoaded, setIsLoaded] = useState(false);

  const fontsLoaded = loadFonts();

  const [user, setUser] = useState(() => {
    const user = firebase.auth().currentUser;
    //console.log(user)
    return user;
  });

  //console.log(isAuthenticated)
  useEffect(() => {
    firebase.auth().onAuthStateChanged((firebaseUser) => {
      setIsLoaded(false);
      setUser(firebaseUser);
      //console.log(firebaseUser)
      firebaseUser ? setIsAuthenticated(true) : setIsAuthenticated(false);
      setIsLoaded(true);
    });
  }, [isLoggedIn]);

  useEffect(() => {
    
    if (user && !isLoggedIn) {
      (async () => {
        setIsLoaded(false);
        const reload = await reLoadUserInfo(user);
        const loadfirestore = await loadUserFirestoreData(user);
        console.log("jiro")
        setIsLoaded(true);
        setIsLoadedDATA(true);
        if (reload && loadfirestore) {
          console.log("datos cargados exitosamente");
          
        }
      })();
    }
    
  }, [user]);

  useEffect(() => {
    (async () => {
      setIsLoaded(false);
      const reload = await reLoadUserInfo(user);
      const loadfirestore = await loadUserFirestoreData(user);
      setIsLoadedDATA(true);
      setIsLoaded(true);
      if (reload && loadfirestore) {
        console.log("datos cargados exitosamente load & reload");
      }
    })();
  }, [reloadTrigger]);

  //console.log("isLoaded: ",isLoaded,"fontsLoaded: ",fontsLoaded,"isLoadedDATA: ",isLoadedDATA )

  return (
    <>
      {isLoaded && fontsLoaded && isLoadedDATA ? (
        <NavigationContainer>
          {isAuthenticated ? <DrawerNavigator /> : <AuthNavigator />}
        </NavigationContainer>
      ) : (
        <ActivityIndicator size="large" color={COLORS.TURKEY} />
      )}
    </>
  );
};

export default Index;
