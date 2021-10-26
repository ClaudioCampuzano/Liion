import React from "react";
import { View, Text, StyleSheet } from "react-native";

import { Entypo } from "@expo/vector-icons";
import { COLORS } from "../constants/styleThemes";

const PlaceRow = ({ data, index }) => {
  return (
    <>
      {index < 5 && (
        <View style={styles.row}>
          <View style={styles.iconContainer}>
            <Entypo name="location-pin" siz={30} color={COLORS.TURKEY} />
          </View>
          <Text style={styles.locationText}>
            {data.description || data.vicinity}
          </Text>
        </View>
      )}
    </>
  );
};

export default PlaceRow;

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 12,
  },
  iconContainer: {
    padding: 5,
  },
  locationText: {
    fontFamily: "Gotham-SSm-Book",
  },
});
