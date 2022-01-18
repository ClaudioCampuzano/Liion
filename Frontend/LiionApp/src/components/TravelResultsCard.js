import React from "react";
import { StyleSheet, Text, TouchableWithoutFeedback, View } from "react-native";
import { Avatar } from "react-native-paper";

import { MaterialIcons } from "@expo/vector-icons";

import { COLORS, hp, wp } from "../constants/styleThemes";
import ShowTravel from "./ShowTravel";
import { FontAwesome } from "@expo/vector-icons";

import moment from "moment";
import "moment/locale/es";
moment.locale("es");

const TravelResultsCard = ({ item, onPress, style, driverOn }) => {
  var colorBar, textBar;
  if (driverOn)
    switch (item.status) {
      case "open":
        colorBar = COLORS.TURKEY;
        textBar = "Abierto";
        break;
      case "closed":
        colorBar = COLORS.WARN_YELLOW;
        textBar = "Cerrado";
        break;
      default:
        colorBar = COLORS.WHITE;
        textBar = "default";
    }
  else {
    switch (item.statusRequest) {
      case "accepted":
        colorBar = COLORS.TURKEY;
        textBar = "Reserva aceptada";
        break;
      case "refused":
        colorBar = COLORS.WARN_YELLOW;
        textBar = "Reserva rechazada";
        break;
      case "pending":
        colorBar = COLORS.GRAY;
        textBar = "Reserva pendiente";
        break;
      default:
        colorBar = COLORS.WHITE;
        textBar = "default";
    }
  }
  switch (item.status) {
    case "ongoing":
      colorBar = COLORS.WARN_RED;
      textBar = "En curso";
      break;
    case "finished":
      colorBar = COLORS.GRAY;
      textBar = "Finalizado";
      break;
    default:
      colorBar = COLORS.WHITE;
      textBar = "default";
  }

  const passengerPictureState = (item) => {
    const { carSeats, nSeatsOffered, nSeatsAvailable } = item;
    var output = [];
    var cnt = 0;

    for (let i = 0; i < nSeatsAvailable; i++) {
      output.push(
        <Avatar.Image
          key={cnt}
          source={require("../../assets/images/passengerPicture.png")}
          style={{
            marginTop: hp(1),
            marginBottom: hp(1),
            backgroundColor: "white",
          }}
          size={hp("4")}
        />
      );
      cnt += 1;
    }
    for (let i = 0; i < nSeatsOffered - nSeatsAvailable; i++) {
      output.push(
        <Avatar.Image
          key={cnt}
          source={require("../../assets/images/passengerPictureOccupied.png")}
          style={{
            marginTop: hp(1),
            marginBottom: hp(1),
            backgroundColor: "white",
          }}
          size={hp("4")}
        />
      );
      cnt += 1;
    }
    for (let i = 0; i < carSeats - nSeatsOffered; i++) {
      output.push(
        <Avatar.Image
          key={cnt}
          source={require("../../assets/images/passengerPictureOff.png")}
          style={{
            marginTop: hp(1),
            marginBottom: hp(1),
            backgroundColor: "white",
          }}
          size={hp("4")}
        />
      );
      cnt += 1;
    }

    return output;
  };

  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <View style={[styles.touchable, style]}>
        <View
          style={{
            flex: 1,
            flexDirection: "row",
            marginBottom: hp(1),
          }}
        >
          <View style={{ marginLeft: wp(4) }}>
            {driverOn ? (
              <FontAwesome
                name="drivers-license-o"
                size={hp("7")}
                color={COLORS.TURKEY}
              />
            ) : (
              <Avatar.Image
                source={{
                  uri: item.driverPhoto,
                }}
                size={hp("7")}
              />
            )}
          </View>
          <View style={{ marginLeft: wp(3) }}>
            {driverOn ? (
              <Text style={styles.textDate}>
                {moment(item.date, "DD-MM-YYYY").format("LL")}
              </Text>
            ) : (
              <Text style={styles.textConductor}>{item.nameDriver}</Text>
            )}

            <View style={{ flexDirection: "row" }}>
              {driverOn ? (
                passengerPictureState(item)
              ) : (
                <>
                  <MaterialIcons
                    name="stars"
                    size={hp("2.5")}
                    color={COLORS.TURKEY}
                  />
                  <Text style={styles.labelRankings}>
                    {item.nRating == 0
                      ? 0
                      : Math.round(item.sRating / item.nRating)}
                    {"/5 - " + item.nRating + " Calificaciones"}
                  </Text>
                </>
              )}
            </View>

            {!driverOn && (
              <Text style={styles.textDate}>
                {moment(item.date, "DD-MM-YYYY").format("LL")}
              </Text>
            )}
          </View>
        </View>

        <ShowTravel
          style={styles.inputLocation}
          timeStart={item.startTime}
          timeEnd={moment(item.startTime, "hh:mm")
            .add(item.durationMinutes, "minutes")
            .format("LT")}
          labelO={item.originDetails.formatted_address}
          labelD={item.destinationDetails.formatted_address}
          dirTextSize={wp("3%")}
        />
        <View style={[styles.barStatus, { backgroundColor: colorBar }]}>
          <Text style={[styles.textBarStatus, { color: COLORS.BLACK }]}>
            {"Estado del viaje: "}
          </Text>
          <Text style={[styles.textBarStatus, { color: COLORS.WHITE }]}>
            {textBar}
          </Text>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default TravelResultsCard;

const styles = StyleSheet.create({
  touchable: {
    paddingTop: hp(1),
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
  textDate: {
    color: COLORS.BLACK,
    fontFamily: "Gotham-SSm-Bold",
    fontSize: hp(1.8),
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
  barStatus: {
    height: hp(3.5),
    borderBottomLeftRadius: hp(1),
    borderBottomRightRadius: hp(1),
    marginTop: hp(1),
    flexDirection: "row",
    justifyContent: "center",
  },
  textBarStatus: {
    fontFamily: "Gotham-SSm-Medium",
    fontSize: hp(1.5),
    alignSelf: "center",
  },
});
