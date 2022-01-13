import React, { useState, useEffect, useContext } from "react";
import { StyleSheet, Text, View } from "react-native";
import * as Location from "expo-location";

import Loading from "../../components/Loading";
import Layout from "../../components/Layout";
import ModalPopUp from "../../components/ModalPopUp";
import { COLORS, hp, wp } from "../../constants/styleThemes";
import { updateUserLocationInTravel, getDetailsOfTravel } from "../../api/api";
import { GlobalContext } from "../../context/Provider";
import MapOngoingTravel from "../../components/MapOngoingTravel";

const OngoingTravelVisualizer = ({ navigation, route }) => {
  const { uid, userData } = useContext(GlobalContext);
  const { id } = route.params;
  const [userLocation, setUserLocation] = useState(null);

  const [errorMsg, setErrorMsg] = useState(null);

  const [dataFromApi, setDataFromApi] = useState({});
  const [loading, setLoading] = useState(true);
  const [modalState, setModalState] = useState(false);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Se ha denegado el permiso de acceder a la ubicación");
        return;
      }
      await Location.watchPositionAsync(
        { accuracy: Location.Accuracy.BestForNavigation, distanceInterval: 15 },
        (loc) =>
          setUserLocation({
            latitude: loc.coords.latitude,
            longitude: loc.coords.longitude,
          })
      );
    })();
  }, []);

  useEffect(() => {
    if (userLocation != null) console.log(userLocation);
    /*       (async () => {
        var data = {
          travelId: id,
          uid: uid,
          location: location,
        };
        await updateUserLocationInTravel(data);
      })(); */
  }, [userLocation]);

  useEffect(() => {
    (async function () {
      const [resFlag, resMsg] = await getDetailsOfTravel(id);
      resFlag
        ? setDataFromApi({ ...route.params, ...resMsg })
        : setModalState(true);
      setLoading(false);
    })();
  }, []);

  return (
    <Layout>
      {loading ? (
        <Loading />
      ) : (
        <MapOngoingTravel
          dimensions={styles.mapDimensions}
          coordinateList={dataFromApi.routeCoordinates}
          origin={userLocation}
          destiny={dataFromApi.routeCoordinates[dataFromApi.routeCoordinates.length - 1]}
          navigation={navigation}
          typePassenger={'driver'}
          markers={''}
        />
      )}
    </Layout>
  );
};

export default OngoingTravelVisualizer;

const styles = StyleSheet.create({
  mapDimensions: {
    height: hp("100%"),
    width: wp("100%"),
  },
});
