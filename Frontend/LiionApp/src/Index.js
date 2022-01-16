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
  const [modalVisible1, setModalVisible1] = useState(false);
  const [modalVisible2, setModalVisible2] = useState(false);
  const fontsLoaded = loadFonts();

  const navigation = useNavigation();
  const gotoTravelHandler1 = () => {
    setModalVisible1(false);
    //solo lo puedo mandar al navegador, pero nose como indicar a screen pasajero o conductor
    //nose porque no funciona con TravelPasajeroTab alomejor crack con la sabiduria crackiana diosiana sabe redirijir a nested screen en nested  navigators
    navigation.navigate("TravelConductorTab");
  }

  const gotoTravelHandler2 = () => {
    setModalVisible2(false);
    navigation.navigate('TempScreen');
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


  //primer plano
  useEffect(() => {
    const uunsubscribe = messaging().onMessage(async remoteMessage => {
      const { data } = remoteMessage
      //console.log(remoteMessage);
      const { userFor } = data
      if (userFor === 'passengers') {
        setModalVisible2(true)
        //asi deberia ser
        //updateTravelStatus('ongoing')
        //pero se deja el anterior para notar que hay un cambio solamente, a que no cambie stylos para el ongoing
        updateTravelStatus('soon')
      }
    });

    return uunsubscribe;
  }, []);

  //segundo  plano
  messaging().setBackgroundMessageHandler(async remoteMessage => {
    //console.log(remoteMessage);
    const { data } = remoteMessage
    const { userFor } = data
    if (userFor === 'passengers') {
      navigation.navigate('TempScreen');
      //asi deberia ser
      //updateTravelStatus('ongoing')
      //pero se deja el anterior para notar que hay un cambio solamente, a que no cambie stylos para el ongoing
      updateTravelStatus('soon')
    }
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
              setModalVisible1(true)
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
            visible={modalVisible1}
            setModalVisible={setModalVisible1}
            firstFunction={() => {
              gotoTravelHandler1();
            }}
            secondFunction={() => {
              setModalVisible1(false);
            }}>
            Parece tienes un como conductor viaje por partir
          </ModalPopUpDouble>

            <ModalPopUpDouble
              firstButtonText="Vamos"
              secondButtonText="Cancelar"
              visible={modalVisible2}
              setModalVisible={setModalVisible2}
              firstFunction={() => {
                gotoTravelHandler2();
              }}
              secondFunction={() => {
                setModalVisible2(false);
              }}>
              Parece tienes un como pasajero viaje por partir
            </ModalPopUpDouble>

            <DrawerNavigator /></> : <AuthNavigator />}
      </> : <Loading />
      }

    </>
  );
}

export default Index;