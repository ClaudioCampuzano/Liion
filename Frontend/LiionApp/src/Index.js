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
  const { reLoadUserInfo, isLoggedIn } = useContext(GlobalContext);

  const [isAuthenticated, setIsAuthenticated] = useState(isLoggedIn);
  const [isLoaded, setIsLoaded] = useState(false);

  const fontsLoaded = loadFonts();

  const [user, setUser] = useState( () => {
    
    const user = firebase.auth().currentUser;
    
    
    return user;
  });

  useEffect(() => {
    
    firebase.auth().onAuthStateChanged((firebaseUser) => {
      
      
      
      
      

      setUser(firebaseUser);
      firebaseUser ? setIsAuthenticated(true) : setIsAuthenticated(false);
      setIsLoaded(true);
    });
  }, [isLoggedIn]);

  useEffect(() => {
    
    if (user && !isLoggedIn) {
      
      reLoadUserInfo(user);
    }
  }, [user]);

  return (
    <>
      {isLoaded && fontsLoaded ?  (
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
