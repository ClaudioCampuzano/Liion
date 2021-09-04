import React, { useState, useEffect, useContext } from "react";
import { ActivityIndicator } from "react-native";
import firebase from "firebase";
import { NavigationContainer } from "@react-navigation/native";

import AuthNavigator from "./navigations/AuthNavigator";
import DrawerNavigator from "./navigations/DrawerNavigator";

import { GlobalContext } from "./context/Provider";
import { COLORS } from "./constants/styleThemes";

const Index = () => {
  const {
    authState: { isLoggedIn },
  } = useContext(GlobalContext);

  const [isAuthenticated, setIsAuthenticated] = useState(isLoggedIn);
  const [authLoaded, setAuthLoaded] = useState(false);

  // no es nesesario utilizar el async storage si se utiliza el watcher de firebase
  //es como un hook que esta mirando cada vez que hay cambios del auth con onAuthStateChanged
  //que por debajo utiliza el mismo Asyncstorage:
  //https://stackoverflow.com/questions/46011436/what-and-how-to-store-to-keep-users-logged-in-in-a-react-native-app-with-firebas
  //https://firebase.google.com/docs/auth/web/auth-state-persistence?hl=es
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      setIsAuthenticated(true);
      var uid = user.uid;
      setAuthLoaded(true);
      //añadir user, token, id, jiro... etc cualquier wea que utilize el manejador de estados
    } else {
      //console.log('logout form index')
      setIsAuthenticated(false);
      setAuthLoaded(true);
      //eliminar user, token, id, jiro...etc cualquier wea que utilize el provider
    }
  });

  return (
    <>
      {authLoaded ? (
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
