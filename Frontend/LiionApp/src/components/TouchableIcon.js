import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, TouchableWithoutFeedback } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { COLORS, hp } from "../constants/styleThemes";

const TouchableIcon = (props) => {
  const { type, valueDefault, style, ...restOfProps } = props;
  const [stateIcon, SetStateIcon] = useState(valueDefault);

  useEffect(() => {
    props.onStateChange(stateIcon);
  }, [stateIcon]);

  useEffect(() => {
    SetStateIcon(valueDefault);
  }, [valueDefault]);

  let color = stateIcon ? COLORS.TURKEY : COLORS.LIGHT_LEAD;
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
    <TouchableWithoutFeedback
      onPress={() => (stateIcon ? SetStateIcon(false) : SetStateIcon(true))}
    >
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
