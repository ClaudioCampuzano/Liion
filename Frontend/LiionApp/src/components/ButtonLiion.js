import React from "react";
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";

import {COLORS} from "../constants/styleThemes"

const ButtonLiion = (props) => {
  return (
    <TouchableOpacity onPress={props.onPress}>
      <View style={[styles.button, {...props.styleView}]}>
        <Text style={[styles.text, {...props.styleText}]}>{props.title}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: COLORS.TURKEY,
    borderRadius: 32,
    alignItems: "center",
  },
  text: {
    fontSize: 20,
    color: COLORS.WHITE,
    fontFamily: "Gotham-SSm-Medium",
    textAlign: "center",
  },
});

export default ButtonLiion;
