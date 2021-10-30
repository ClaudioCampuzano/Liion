import React, { useState, useContext, useEffect } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { NavigationContainer } from "@react-navigation/native";
import { ActivityIndicator } from "react-native";

import { COLORS } from "./constants/styleThemes";
import AuthNavigator from "./navigations/AuthNavigator";
import DrawerNavigator from "./navigations/DrawerNavigator";
import { GlobalContext } from "./context/Provider";

import { loadFonts } from "./constants/styleThemes";

const Index = (props) => {

  const {
    reLoadUserInfo,
    isLoggedIn,
    loadUserFirestoreData,
    isLoadedDATA,
    setIsLoadedDATA,
  } = useContext(GlobalContext);

  const [isAuthenticated, setIsAuthenticated] = useState(isLoggedIn);
  const [isLoaded, setIsLoaded] = useState(false);

  const fontsLoaded = loadFonts();

  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe =  onAuthStateChanged(getAuth(), (firebaseUser) => {
      setUser(firebaseUser);
      if (firebaseUser) {
        setIsAuthenticated(true);
        const fetchData = async () => {
          const reload = await reLoadUserInfo(user);
          const loadfirestore = await loadUserFirestoreData(user);
          reload && loadfirestore && setIsLoadedDATA(true);
        };
        fetchData();
      } else {
        setIsAuthenticated(false);
      }
      setIsLoaded(true);
    });
    return () => unsubscribe()
  }, [isLoggedIn]);

  useEffect(() => {
    if (user && !isLoggedIn) {
      const fetchData = async () => {
        const reload = await reLoadUserInfo(user);
        const loadfirestore = await loadUserFirestoreData(user);
        reload && loadfirestore && setIsLoadedDATA(true);
      };
      fetchData();
    }
  }, [user]);

  /*      useEffect(() => {
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
  }, [reloadTrigger]);  */

  return (
    <>
      {isLoaded && fontsLoaded && (!user || isLoadedDATA) ? (
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
