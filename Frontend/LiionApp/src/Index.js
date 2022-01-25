import React, { useState, useContext, useEffect, useRef } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import * as Notifications from "expo-notifications";
import { useNavigation } from "@react-navigation/native";

import AuthNavigator from "./navigations/AuthNavigator";
import DrawerNavigator from "./navigations/DrawerNavigator";
import { GlobalContext } from "./context/Provider";
import registerForPushNotificationsAsync from "./notifications/notifications";
import { loadFonts } from "./constants/styleThemes";
import Loading from "./components/Loading";
import ModalPopUpDouble from "./components/ModalPopUpDouble";

import { getUpcomingTravels, updateExpoToken } from "./api/api";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});

const Index = (props) => {
  const {
    loadUserFirestoreData,
    isLoadedData,
    notification,
    setNotificationF,
    refreshTokens,
    updateTravelStatus,
  } = useContext(GlobalContext);

  const notificationListener = useRef();
  const responseListener = useRef();

  const [userStateLoaded, setUserStateLoaded] = useState(false);

  const [user, setUser] = useState(null);
  const [modalVisible1, setModalVisible1] = useState(false);
  const [modalVisible2, setModalVisible2] = useState(false);
  const fontsLoaded = loadFonts();

  const navigation = useNavigation();
  const gotoTravelHandler1 = () => {
    setModalVisible1(false);

    navigation.navigate("MyTravelNavigator", {
      screen: "TravelTabNavigator",
      params: {
        screen: "TravelConductorTab",
      },
    });
  };

  const gotoTravelHandler2 = () => {
    setModalVisible2(false);
    navigation.navigate("MyTravelNavigator", {
      screen: "TravelTabNavigator",
      params: {
        screen: "TravelPasajeroTab",
      },
    });
  };

  // Check user state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(getAuth(), (firebaseUser) => {
      setUser(firebaseUser);
      setUserStateLoaded(true);

      if (firebaseUser) {
        firebaseUser
          .getIdToken(true)
          .then((id) => {
            if (id) refreshTokens({ accesstoken: id });
          })
          .catch((e) => console.log(e));
      }
    });

    return () => unsubscribe;
  }, []);

  // Only user change and exists load firestoreData
  useEffect(() => {
    (async function loadInfo() {
      if (user) {
        await loadUserFirestoreData(user);

        const [status, data] = await getUpcomingTravels({
          driverUID: user.uid,
        });

        if (status === true) {
          const { res, sucess } = data;
          if (sucess === true || sucess === "true") {
            if (res.status === "closed" || res.status === "open") {
              updateTravelStatus("soon");
              setModalVisible1(true);
              //navigation.navigate("MyTravelNavigator");
            } else if (res.status === "ongoing") {
              updateTravelStatus("ongoing");
              //tiene un viaje en curso.. abrir modal y llevar a vista de viaje.. mientras, una vista X
            } else {
              updateTravelStatus("");
            }
          }
        }
      }
    })();
    return;
  }, [user]);

  useEffect(() => {
    notificationListener.current =
      Notifications.addNotificationReceivedListener((notification) => {
        setNotificationF(notification);
      });
    responseListener.current =
      Notifications.addNotificationResponseReceivedListener((response) => {
        const {
          notification: {
            request: {
              content: {
                data: { screen },
              },
            },
          },
        } = response;
        if (screen) {
          props.navigation.navigate(screen);
        }
      });
    return () => {
      Notifications.removeNotificationSubscription(
        notificationListener.current
      );
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);

  useEffect(() => {
    if (notification) {
      const { userFor } = notification.request.content.data;
      if (userFor === "passengers") {
        setModalVisible2(true);
        updateTravelStatus("soon");
      }
    }
  }, [notification]);

  // If fonts, userState are loaded, and if user exists, firestoreData load
  return (
    <>
      {fontsLoaded && userStateLoaded && (!user || isLoadedData) ? (
        <>
          {isLoadedData ? (
            <>
              <ModalPopUpDouble
                firstButtonText="Vamos"
                secondButtonText="Cancelar"
                visible={modalVisible1}
                setModalVisible={setModalVisible1}
                firstFunction={() => {
                  gotoTravelHandler1();
                }}
                secondFunction={() => {
                  setModalVisible1(false);
                }}
              >
                Tienes un viaje como conductor viaje por partir
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
                  //console.log('close modal');
                  setModalVisible2(false);
                }}
              >
                Tienes un viaje como pasajero en curso
              </ModalPopUpDouble>

              <DrawerNavigator />
            </>
          ) : (
            <AuthNavigator />
          )}
        </>
      ) : (
        <Loading />
      )}
    </>
  );
};

export default Index;
