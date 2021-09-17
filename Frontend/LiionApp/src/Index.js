import React, { useState, useContext, useEffect } from "react";
import firebase from "firebase";
import { NavigationContainer } from "@react-navigation/native";

import AuthNavigator from "./navigations/AuthNavigator";
import DrawerNavigator from "./navigations/DrawerNavigator";
import { GlobalContext } from "./context/Provider";

const Index = () => {
  const { reLoadUserInfo, isLoggedIn } = useContext(GlobalContext);

  const [isAuthenticated, setIsAuthenticated] = useState(isLoggedIn);

  const [user, setUser] = useState(() => {
    const user = firebase.auth().currentUser;
    return user;
  });

  useEffect(() => {
    firebase.auth().onAuthStateChanged((firebaseUser) => {
      setUser(firebaseUser);
      firebaseUser ? setIsAuthenticated(true) : setIsAuthenticated(false);
    });
  }, [isLoggedIn]);

  useEffect(() => {
    if (user && !isLoggedIn) {
      reLoadUserInfo(user);
    }
  }, [user]);

  return (
    <NavigationContainer>
      {isAuthenticated ? <DrawerNavigator /> : <AuthNavigator />}
    </NavigationContainer>
  );
};

export default Index;
