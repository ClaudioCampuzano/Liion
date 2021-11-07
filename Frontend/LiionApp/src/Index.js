import React, { useState, useContext, useEffect } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { NavigationContainer } from "@react-navigation/native";
import { ActivityIndicator, View, Image } from "react-native";

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
    const unsubscribe = onAuthStateChanged(getAuth(), (firebaseUser) => {
      if (firebaseUser) {
        setUser(firebaseUser);
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
    return () => unsubscribe();
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

  //console.log(user,isLoaded,fontsLoaded,isLoadedDATA,isAuthenticated, isLoggedIn)

  return (
    <>
      {isLoaded && fontsLoaded && (!user || isLoadedDATA) ? (
        <NavigationContainer>
          {isAuthenticated ? <DrawerNavigator /> : <AuthNavigator />}
        </NavigationContainer>
      ) : (
        <View style={{ flex: 1, justifyContent: "center" }}>
          <Image
            source={{
              uri: "https://media.tenor.com/images/39d6060576a516f1dd437eafccafbdb1/tenor.gif",
            }}
            style={{
              height: 400,
              width: 400,
              justifyContent: "center",
              alignItems: "center",
            }}
          />
          {/* <ActivityIndicator size="large" color={COLORS.TURKEY} /> */}
        </View>
      )}
    </>
  );
};

export default Index;
