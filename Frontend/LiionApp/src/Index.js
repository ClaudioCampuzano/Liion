import React, { useState, useContext, useEffect, useRef } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { NavigationContainer } from "@react-navigation/native";

import AuthNavigator from "./navigations/AuthNavigator";
import DrawerNavigator from "./navigations/DrawerNavigator";
import { GlobalContext } from "./context/Provider";

import { loadFonts } from "./constants/styleThemes";

import Loading from "./components/Loading";

const Index = (props) => {
  const { isLoggedIn, loadUserFirestoreData, isLoadedData } =
    useContext(GlobalContext);

  const [userStateLoaded, setUserStateLoaded] = useState(false);
  const [user, setUser] = useState({});

  const fontsLoaded = loadFonts();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(getAuth(), (firebaseUser) => {
      setUser(firebaseUser);
      setUserStateLoaded(true);
    });

    return () => unsubscribe;
  }, []);

  useEffect(() => {
    (async function loadInfo() {
      if (user) {
        const loadFirestore = await loadUserFirestoreData(user);
      }
    })();
  }, [user]);

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
