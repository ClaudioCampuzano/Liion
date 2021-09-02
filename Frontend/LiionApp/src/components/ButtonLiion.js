import React from "react";
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";

import {COLORS, hp} from "../constants/styleThemes"

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

export default ButtonLiion;
