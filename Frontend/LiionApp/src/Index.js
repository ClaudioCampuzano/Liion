import React, { useState, useEffect, useContext } from "react";
import { NavigationContainer } from "@react-navigation/native";
import AuthNavigator from "./navigations/AuthNavigator";
import DrawerNavigator from "./navigations/DrawerNavigator";
import { ActivityIndicator } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { GlobalContext } from "./context/Provider";
import firebase from "firebase";
import { COLORS } from "./constants/styleThemes"

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
      setAuthLoaded(true)
      //añadir user, token, id, jiro... etc cualquier wea que utilize el manejador de estados
    } else {
      //console.log('logout form index')
      setIsAuthenticated(false);
      setAuthLoaded(true)
      //eliminar user, token, id, jiro...etc cualquier wea que utilize el provider
    }
  });

  /******DATO**********
   * Como se deberia llamar funciones en event handlers como botones
   * Notice how with onClick={() => console.log('click')},
   *  we’re passing a function as the onClick prop. 
   * React will only call this function after a click. 
   * Forgetting () => and writing onClick={console.log('click')} is a common mistake, 
   * and would fire every time the component re-renders.
   * REF:  https://reactjs.org/tutorial/tutorial.html   Primera 'Note'
   ******************/


  return (
    //el log siguiente da falso ya que firebase.auth.onsateauthchange es asincrono
    //es decir mientras se ejecuta esa peticion el el console log ya se ha ejecutado y la variable es por defecto
    //inicializada falsa, por lo que da falso, pero en realidad, es verdadera solo que se demora un poco mas que el instantaneo console.log
    //console.log(isAuthenticated),
    <>
      {authLoaded ? (
        <NavigationContainer>
          {isAuthenticated ? <DrawerNavigator />  : <AuthNavigator /> }
        </NavigationContainer>
      ) : (
        <ActivityIndicator size="large" color={COLORS.TURKEY} />
      )}
    </>
  );
};

export default Index;
