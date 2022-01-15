import React, {
  useState,
  useEffect,
  useRef,
  useCallback,
  useContext,
} from "react";
import { StyleSheet, Text, View } from "react-native";
import * as Location from "expo-location";

import { reverseGeocodeAsync } from "expo-location";
import { useQuery, useMutation, useQueryClient } from "react-query";

import { COLORS, hp, wp } from "../../constants/styleThemes";
import { GlobalContext } from "../../context/Provider";
import MapOngoingTravel from "../../components/MapOngoingTravel";
import Loading from "../../components/Loading";
import Layout from "../../components/Layout";
import ModalPopUp from "../../components/ModalPopUp";
import { getRouteCoordinates, updateUserLocationInTravel } from "../../api/api";

const OngoingTravelPassengerVisualizer = ({ navigation, route }) => {
  const { id } = route.params;
  const { uid } = useContext(GlobalContext);

  const [userLocation, setUserLocation] = useState(() => {
    return { latitude: 0, longitude: 0 };
  });
  const [errorMsg, setErrorMsg] = useState("");
  const [modalErrorState, setModalErrorState] = useState(false);

  const {
    data: dataRoute,
    isSuccess: isSucessRoute,
    isError: isErrorRoute,
  } = useQuery(
    ["routeCoordinateP", id],
    () => getRouteCoordinates({ travelId: id }),
    {
      refetchOnMount: false,
    }
  );

  const { mutate: mutateUpdateLocation, isError: isErrorUpdateLocation } =
    useMutation(updateUserLocationInTravel);

  useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Se ha denegado el permiso de acceder a la ubicación");
        setModalErrorState(true);
        return;
      }
      const subscription = await Location.watchPositionAsync(
        { accuracy: Location.Accuracy.BestForNavigation, distanceInterval: 20 },
        (loc) => {
          if (userLocation != null) {
            var coordObj = {
              latitude: loc.coords.latitude,
              longitude: loc.coords.longitude,
            };
            setUserLocation(coordObj);
            mutateUpdateLocation({
              travelId: id,
              uid: uid,
              location: coordObj,
            });
          }
        }
      );
      return () => subscription.remove();
    })();
  }, []);

  useEffect(() => {
    isErrorRoute && setErrorMsg("Error al obtener la ruta");
    isErrorRoute && setModalErrorState(true);
  }, [isErrorRoute]);

  const modalHandler = () => {
    navigation.goBack();
    setModalErrorState(false);
  };

  return (
    <Layout>
      {!isSucessRoute ? (
        <Loading />
      ) : (
        <>
          <ModalPopUp
            visible={modalErrorState}
            setModalVisible={setModalErrorState}
            customFunction={modalHandler}
          >
            {errorMsg}
          </ModalPopUp>
          <View
            style={{
              alignItems: "center",
              backgroundColor: COLORS.WHITE,
            }}
          >
            <MapOngoingTravel
              dimensions={styles.mapDimensions}
              coordinateList={dataRoute.routeCoordinates}
              origin={userLocation}
              destiny={dataRoute.routeCoordinates[10]}
              navigation={navigation}
              typePassenger={"passenger"}
              //El pasajero solo necesita saber dos ubicaciones, las suyas
              markers={[
                {
                  status: "active",
                  coordinate: { latitude: -33.57784, longitude: -70.66883 },
                  type: "pickUp",
                },
              ]}
            />
            <View style={styles.floatingSheet}></View>
          </View>
        </>
      )}
    </Layout>
  );
};

export default OngoingTravelPassengerVisualizer;
const styles = StyleSheet.create({
  mapDimensions: {
    height: hp("100%"),
    width: wp("100%"),
  },
  floatingSheet: {
    position: "absolute",
    height: hp(20),
    width: wp(90),
    bottom: hp(1),
    borderRadius: hp(5),
    elevation: 5,
    backgroundColor: COLORS.WHITE,
  },
});
