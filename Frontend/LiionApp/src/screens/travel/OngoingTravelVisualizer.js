import React, { useState, useEffect, useContext } from "react";
import { StyleSheet, Text, View } from "react-native";
import * as Location from "expo-location";

import Loading from "../../components/Loading";
import Layout from "../../components/Layout";
import ModalPopUp from "../../components/ModalPopUp";
import { COLORS, hp, wp } from "../../constants/styleThemes";
import { updateUserLocationInTravel } from "../../api/api";
import { GlobalContext } from "../../context/Provider";

const OngoingTravelVisualizer = ({ navigation, route }) => {
  const { uid, userData } = useContext(GlobalContext);
  const { id } = route.params;
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

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
          setLocation({
            latitude: loc.coords.latitude,
            longitude: loc.coords.longitude,
          })
      );
    })();
  }, []);

  useEffect(() => {
    if (location != null)
      (async () => {
        var data = {
          travelId: id,
          uid: uid,
          location: location,
        };
        await updateUserLocationInTravel(data);
      })();
  }, [location]);

  let text = "Waiting..";
  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
    text = JSON.stringify(location);
  }
  return (
    <View>
      <Text>{text}{id}{uid}</Text>
    </View>
  );
};

export default OngoingTravelVisualizer;

const styles = StyleSheet.create({});
