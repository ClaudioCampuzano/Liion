import React, { useContext } from "react";
import { StyleSheet, Text, View, TouchableWithoutFeedback } from "react-native";

import { Ionicons, Feather, MaterialCommunityIcons } from "@expo/vector-icons";
import { COLORS, hp } from "../constants/styleThemes";
import { useNavigation } from "@react-navigation/native";

import { GlobalContext } from "../context/Provider";

const TabDownButton = (props) => {
  const { type, style, sizeIcon, ...restOfProps } = props;
  const { userFirestoreData } = useContext(GlobalContext);
  const navigation = useNavigation();

  var colorSearch = COLORS.LIGHT_LEAD;
  var colorMyTravels = COLORS.LIGHT_LEAD;
  var colorCreate = COLORS.LIGHT_LEAD;
  var stateSearch = false;
  var stateMyTravels = false;
  var stateCreate = false;

  if (type === "create") {
    stateCreate = true;
    colorCreate = COLORS.TURKEY;
  } else if (type === "search") {
    colorSearch = COLORS.TURKEY;
    stateSearch = true;
  } else {
    colorMyTravels = COLORS.TURKEY;
    stateMyTravels = true;
  }

  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-evenly",
        marginTop: hp(4),
      }}
    >
      <TouchableWithoutFeedback
        disabled={stateSearch}
        onPress={() => navigation.navigate("SearchStack")}
      >
        <View style={{ ...styles.viewGeneral, ...style }}>
          <Feather
            name="search"
            size={hp(sizeIcon)}
            style={{ alignSelf: "center" }}
            color={colorSearch}
          />
          <Text style={{ ...styles.label, color: colorSearch }}>
            {"Buscar Viajes"}
          </Text>
        </View>
      </TouchableWithoutFeedback>
      <TouchableWithoutFeedback
        disabled={stateMyTravels}
        onPress={() => navigation.navigate("MyTravelNavigator")}
      >
        <View style={{ ...styles.viewGeneral, ...style }}>
          <MaterialCommunityIcons
            name="routes"
            size={hp(sizeIcon)}
            style={{ alignSelf: "center" }}
            color={colorMyTravels}
          />
          <Text style={{ ...styles.label, color: colorMyTravels }}>
            {"Mis Viajes"}
          </Text>
        </View>
      </TouchableWithoutFeedback>
      {userFirestoreData.isDriver && 
        <TouchableWithoutFeedback
          disabled={stateCreate}
          onPress={() => navigation.navigate("CreateNavigator")}
        >
          <View style={{ ...styles.viewGeneral, ...style }}>
            <Ionicons
              name="ios-car-sport-outline"
              size={hp(sizeIcon)}
              style={{ alignSelf: "center" }}
              color={colorCreate}
            />
            <Text style={{ ...styles.label, color: colorCreate }}>
              {"Crear Viaje"}
            </Text>
          </View>
        </TouchableWithoutFeedback>
      }
    </View>
  );
};

export default TabDownButton;

const styles = StyleSheet.create({
  viewGeneral: {
    flexDirection: "column",
    alignSelf: "center",
    justifyContent: "center",
  },
  label: {
    fontFamily: "Gotham-SSm-Medium",
    fontSize: hp("1.8%"),
    textAlign: "center",
  },
});
