import React, { useState, useContext, useEffect } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { NavigationContainer } from "@react-navigation/native";

import AuthNavigator from "./navigations/AuthNavigator";
import DrawerNavigator from "./navigations/DrawerNavigator";
import { GlobalContext } from "./context/Provider";

import { loadFonts } from "./constants/styleThemes";

import Loading from "./components/Loading";

const Index = (props) => {
  const {
    reLoadUserInfo,
    isLoggedIn,
    loadUserFirestoreData,
    isLoadedDATA,
    setIsLoadedDATA,
    userData,
  } = useContext(GlobalContext);

  const [isAuthenticated, setIsAuthenticated] = useState(isLoggedIn);
  const [isLoaded, setIsLoaded] = useState(false);

  const fontsLoaded = loadFonts();

  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(getAuth(), (firebaseUser) => {
      if (firebaseUser) {
        setUser(firebaseUser);
        setIsAuthenticated(true);
        const fetchData = async () => {
          const loadfirestore = await loadUserFirestoreData(user);
          const reload = await reLoadUserInfo(user);
          reload && loadfirestore && setIsLoadedDATA(true);
        };
        fetchData();
      } else {
        setIsAuthenticated(false);
      }
      setIsLoaded(true);
    });
    return () => unsubscribe();
  }, [isLoggedIn]);

  useEffect(() => {
    if (user && !isLoggedIn) {
      const fetchData = async () => {
        const loadfirestore = await loadUserFirestoreData(user);
        const reload = await reLoadUserInfo(user);
        reload && loadfirestore && setIsLoadedDATA(true);
      };
      fetchData();
    }
  }, [user]);

  return (
    <>
      {isLoaded && fontsLoaded && (!user || isLoadedDATA) ? (
        <NavigationContainer>
          {isAuthenticated ? <DrawerNavigator /> : <AuthNavigator />}
        </NavigationContainer>
      ) : (
        <Loading />
      )}
    </>
  );
};

export default Index;
