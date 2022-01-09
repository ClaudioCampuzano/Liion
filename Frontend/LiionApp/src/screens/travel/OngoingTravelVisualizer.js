import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import * as Location from "expo-location";

import Loading from "../../components/Loading";
import Layout from "../../components/Layout";
import ModalPopUp from "../../components/ModalPopUp";
import { COLORS, hp, wp } from "../../constants/styleThemes";

const OngoingTravelVisualizer = ({ navigation, route }) => {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Se ha denegado el permiso de acceder a la ubicación");
        return;
      }

      let locations = await Location.watchPositionAsync(
        { accuracy: Location.Accuracy.Lowest, distanceInterval: 10 },
        (loc) => setLocation(JSON.parse(JSON.stringify(loc.coords)))
      );
      setLocation(locations);
    })();
  }, []);
  let text = "Waiting..";
  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
    text = JSON.stringify(location);
  }
  return (
    <View>
      <Text>{text}</Text>
    </View>
  );
};

export default OngoingTravelVisualizer;

const styles = StyleSheet.create({});
