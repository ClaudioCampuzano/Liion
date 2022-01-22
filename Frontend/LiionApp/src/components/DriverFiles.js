import React from "react";
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";
import { Feather } from "@expo/vector-icons";

import { COLORS, hp } from "../constants/styleThemes";

const DriverFiles = (props) => {
  return (
    <TouchableOpacity onPress={props.onPress}>
      <View style={[styles.files, { ...props.styleView }]}>
        <Text style={[styles.text, styles.textIcon, { ...props.styleText }]}>
          {props.title}
        </Text>
        <Feather
          name={props.iconname}
          style={[[styles.icon, { ...props.styleText }]]}
          size={hp("4")}
          color={props.color}
        />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  files: {
    backgroundColor: COLORS.WHITE,
    borderRadius: hp("2%"),
    borderColor: COLORS.BORDER_COLOR,
    borderWidth: 1,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  text: {
    fontSize: hp("2%"),
    color: COLORS.REAL_BLACK,
    fontFamily: "Gotham-SSm-Bold",
    textAlign: "left",
    marginLeft: hp("2%"),
  },
  icon: {
    marginRight: hp("1.5%"),
  },
  textIcon: {},
});

export default DriverFiles;
