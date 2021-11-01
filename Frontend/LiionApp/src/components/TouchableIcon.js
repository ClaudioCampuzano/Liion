import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, TouchableWithoutFeedback } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { COLORS, hp } from "../constants/styleThemes";

const TouchableIcon = (props) => {
  const { type, value, style, ...restOfProps } = props;

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
    case "approval":
      labelShow = "Aprobación\nautomatica";
      nameIcon = "lightning-bolt";
      break;
    default:
      labelShow = "Default";
      nameIcon = "skull-crossbones-outline";
  }

  return (
    <TouchableWithoutFeedback {...restOfProps}>
      <View style={{ ...styles.viewGeneral, ...style }}>
        <MaterialCommunityIcons
          name={nameIcon}
          size={hp("7")}
          color={color}
          style={{ alignSelf: "center" }}
        />
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
