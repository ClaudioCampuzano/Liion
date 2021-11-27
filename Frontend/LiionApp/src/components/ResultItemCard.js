import React from "react";
import { StyleSheet, Text, TouchableWithoutFeedback, View } from "react-native";
import { Avatar } from "react-native-paper";

import { MaterialIcons } from "@expo/vector-icons";

import { COLORS, hp, wp } from "../constants/styleThemes";
import ShowTravel from "./ShowTravel";

import moment from "moment";
import "moment/locale/es";
moment.locale("es");

const ResultItemCard = ({ item, onPress, style, seatOff }) => {
  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <View style={[styles.touchable, style]}>
        <View style={{ flex: 1, flexDirection: "row", marginBottom: hp(2) }}>
          <View style={{ flex: 0.8 }}>
            <Avatar.Image
              source={{
                uri: item.driverData.photo,
              }}
              size={hp("7")}
            />
          </View>
          <View style={{ flex: 1.6 }}>
            <Text style={styles.textConductor}>
              {item.driverData.nameConductor}
            </Text>
            <View style={{ flexDirection: "row" }}>
              <MaterialIcons
                name="stars"
                size={hp("2.5")}
                color={COLORS.TURKEY}
              />
              <Text style={styles.labelRankings}>
                {Math.round(
                  (item.driverData.sRating / item.driverData.nRating) * 10
                ) /
                  10 +
                  "/5 - " +
                  item.driverData.nRating +
                  "\nCalificaciones"}
              </Text>
            </View>
          </View>
          <View style={{ flex: 1.4, flexDirection: "row" }}>
            <View>
              <Text style={styles.textConductor}>
                {"$" + item.travelData.price}
              </Text>
              {!seatOff && (
                <Text style={[styles.textConductor, { alignSelf: "flex-end" }]}>
                  {item.travelData.seatsAvaliable}
                </Text>
              )}
            </View>
            <View style={{ marginLeft: wp(1) }}>
              <Text style={styles.textLegend}>{"Por\nasiento"}</Text>
              {!seatOff && (
                <Text style={styles.textLegend}>{"Asientos\ndisponibles"}</Text>
              )}
            </View>
          </View>
        </View>

        <ShowTravel
          style={styles.inputLocation}
          timeStart={item.travelData.time}
          timeEnd={moment(item.travelData.time, "hh:mm")
            .add(item.travelData.duration, "minutes")
            .format("LT")}
          labelO={item.travelData.addresses.origin}
          labelD={item.travelData.addresses.destination}
          dirTextSize={wp("3%")}
        />
      </View>
    </TouchableWithoutFeedback>
  );
};

export default ResultItemCard;

const styles = StyleSheet.create({
  touchable: {
    padding: hp(1),
    marginVertical: hp(1),
    marginHorizontal: wp(1.5),
    elevation: hp(1),
    borderRadius: hp(1),
    backgroundColor: COLORS.WHITE,
  },
  textConductor: {
    color: COLORS.TURKEY,
    fontFamily: "Gotham-SSm-Medium",
    fontSize: hp(1.9),
  },
  textLegend: {
    color: COLORS.BLACK,
    fontFamily: "Gotham-SSm-Medium",
    fontSize: hp(1.2),
  },
  labelRankings: {
    fontFamily: "Gotham-SSm-Medium",
    fontSize: hp("1.4"),
    color: COLORS.BLACK,
  },
  inputLocation: {
    width: wp("78.6%"),
    height: hp("12%"),
    alignSelf: "center",
    marginTop: -1 * wp("2%"),
    marginBottom: -1 * wp("2%"),
  },
});
