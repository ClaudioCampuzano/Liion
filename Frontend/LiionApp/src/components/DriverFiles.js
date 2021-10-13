import React from "react";
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";
import {
  Ionicons,
  MaterialIcons,
  Feather,
  MaterialCommunityIcons,
  FontAwesome5,
} from "@expo/vector-icons";

import { COLORS, hp } from "../constants/styleThemes";

const DriverFiles = (props) => {
  return (
    <TouchableOpacity onPress={props.onPress}>
      <View style={[styles.files, { ...props.styleView }]}>
        <Text style={[styles.text, styles.textIcon, { ...props.styleText }]}>{props.title}</Text>
        <Feather
          name="file-plus"
          style={[[styles.icon, { ...props.styleText }]]}
          size={hp("5")}
          color={COLORS.WARN_RED}
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
  },
  text: {
    fontSize: hp("2.4%"),
    color: COLORS.REAL_BLACK,
    fontFamily: "Gotham-SSm-Bold",
    textAlign: "left",
    marginLeft: hp("2%"),
  },
  icon: {
    marginRight: hp("2.5%"),
    marginTop: hp("0.8%"),
  },
  textIcon: {
    marginTop: hp("1.5%"),
  },
});

export default DriverFiles;
