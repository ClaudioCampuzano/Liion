import React from "react";
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";

import {COLORS, hp} from "../constants/styleThemes"

const ButtonLiionDisable = (props) => {
  return (
    <TouchableOpacity disabled={props.disabled} onPress={props.onPress}>
      <View style={[{backgroundColor: props.colordisable}, {...styles.button}, {...props.styleView}]}>
        <Text style={[styles.text, {...props.styleText}]}>{props.title}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    borderRadius: hp('3.8%'),
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontSize: hp('2.4%'),
    color: COLORS.WHITE,
    fontFamily: "Gotham-SSm-Medium",
    textAlign: "center",
  },
});

export default ButtonLiionDisable;
