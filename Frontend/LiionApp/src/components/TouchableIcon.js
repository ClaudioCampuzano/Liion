import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, TouchableWithoutFeedback } from "react-native";
import { MaterialCommunityIcons, FontAwesome5 } from "@expo/vector-icons";
import { COLORS, hp } from "../constants/styleThemes";

const TouchableIcon = (props) => {
  const { type, value, style, sizeIcon, ...restOfProps } = props;

  let color = value ? COLORS.TURKEY : COLORS.LIGHT_LEAD;
  let labelShow = "";
  let nameIcon = "";
  switch (type) {
    case "men":
      labelShow = "Solo\nhombres";
      nameIcon = "gender-male";
      break;
    case "woman":
      labelShow = "Solo\nmujeres";
      nameIcon = "gender-female";
      break;
    case "allGender":
      labelShow = "Para todo\ngenero";
      nameIcon = "gender-male-female";
      break;
    case "smoking":
      labelShow = "Permitido\nfumar";
      nameIcon = "smoking";
      break;
    case "noSmoking":
      labelShow = "No permitido\nfumar";
      nameIcon = "smoking-off";
      break;
    case "approval":
      labelShow = "Aprobación\nautomatica";
      nameIcon = "lightning-bolt";
      break;
    case "usb":
        labelShow = "Carga\nUSB";
        nameIcon = "usb";
        break;
        case "airConditioning":
        labelShow = "Aire\nacondicionado";
        nameIcon = "weather-windy";
        break;
    case "baggage_hand":
      labelShow = "Equipaje\nde mano";
      nameIcon = "bag-personal-outline";
      break;
    case "baggage_heavy":
      labelShow = "Maletas";
      nameIcon = "suitcase-rolling";
      break;
    case "seeAll":
      labelShow = "Mostrar todos\nlos viajes";
      nameIcon = "eye-outline";
      break;
    case "sadFace":
        labelShow = "Sin resultados";
        nameIcon = "emoticon-sad-outline";
        break;
    default:
      labelShow = "Default";
      nameIcon = "skull-crossbones-outline";
  }

  return (
    <TouchableWithoutFeedback {...restOfProps}>
      <View style={{ ...styles.viewGeneral, ...style }}>
        {type != "baggage_heavy" ? (
          <MaterialCommunityIcons
            name={nameIcon}
            size={hp(sizeIcon)}
            color={color}
            style={{ alignSelf: "center" }}
          />
        ) : (
          <FontAwesome5
            name={nameIcon}
            size={hp(sizeIcon)}
            color={color}
            style={{ alignSelf: "center" }}
          />
        )}
        <Text style={{ ...styles.label, color: color }}>{labelShow}</Text>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default TouchableIcon;

const styles = StyleSheet.create({
  label: {
    fontFamily: "Gotham-SSm-Medium",
    fontSize: hp("1.8%"),
    textAlign: "center",
  },
  viewGeneral: {
    flexDirection: "column",
    alignSelf: "center",
    justifyContent: "center",
  },
});
