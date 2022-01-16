import React, { useState, useContext, useEffect, useRef } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { NavigationContainer } from "@react-navigation/native";
import messaging from '@react-native-firebase/messaging';
import AuthNavigator from "./navigations/AuthNavigator";
import DrawerNavigator from "./navigations/DrawerNavigator";
import { GlobalContext } from "./context/Provider";
import { useQuery, useMutation, useQueryClient } from "react-query";
import { loadFonts } from "./constants/styleThemes";
import { getupcomingTravels, notifToPassengers } from "./api/api";
import Loading from "./components/Loading";
import ModalPopUpDouble from "./components/ModalPopUpDouble";
import { createNavigationContainerRef } from '@react-navigation/native';
import { useNavigation } from "@react-navigation/native";
const Index = (props) => {
  const { loadUserFirestoreData, isLoadedData, refreshTokens, updateTravelStatus } = useContext(GlobalContext);

  const [userStateLoaded, setUserStateLoaded] = useState(false);
  const [user, setUser] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const fontsLoaded = loadFonts();

  const navigation = useNavigation();
  const gotoTravelHandler = () => {
    setModalVisible(false);
    navigation.navigate("MyTravelNavigator");
  }

  // Check user state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(getAuth(), (firebaseUser) => {
      setUser(firebaseUser);
      setUserStateLoaded(true);
      //metodo para actualizar token cuando cambie, no se como probar ya que el token cambia cada 1.. habria que dejarlo ese tiempo y ver que pasa
      //no me gusta esa sintaxis qla de then con callbacks pero weno se le hace a todo
      firebaseUser.getIdToken(true).then(id => {
        refreshTokens({ accesstoken: id })
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
        //se intento con query, pero daba warning de unhandled posible rejection (no tiene sentido pero se quito, mientras tanto. implementar despues)
        //quitar este chorizo de logica de aca mas adelante
        const [status, data] = await getupcomingTravels(user.uid)
        if (status === true) {
          const { res, sucess } = data
          if (sucess === true || sucess === "true") {
            if (res.status === 'closed' || res.status === 'open') {
              updateTravelStatus('soon')
              setModalVisible(true)
              //navigation.navigate("MyTravelNavigator");
            }
            else if (res.status === 'ongoing') {
              updateTravelStatus('ongoing')
              //tiene un viaje en curso.. abrir modal y llevar a vista de viaje.. mientras, una vista X
            }


            else {
              updateTravelStatus('')
            }
          }
        }
        else { console.log('no tienes viajes pronto', data) }
      }
    })();
    return
  }, [user]);

  // If fonts, userState are loaded, and if user exists, firestoreData load
  //la descicion de crear otro modal con 2 opciones, es nada mas que por miedo a romper el actual
  //y con esto la logica de todo el resto de la aplicacion si cometia algun error con el doble boton
  return (
    <>
      {fontsLoaded && userStateLoaded && (!user || isLoadedData) ? <>
        {isLoadedData ?
          <><ModalPopUpDouble
            firstButtonText="Vamos"
            secondButtonText="Cancelar"
            visible={modalVisible}
            setModalVisible={setModalVisible}
            firstFunction={() => {
              gotoTravelHandler();
            }}
            secondFunction={() => {
              console.log('close modal');
              setModalVisible(false);
            }}>
            Parece tienes un viaje por partir
          </ModalPopUpDouble><DrawerNavigator /></> : <AuthNavigator />}
      </> : <Loading />
      }

    </>
  );
}

export default Index;