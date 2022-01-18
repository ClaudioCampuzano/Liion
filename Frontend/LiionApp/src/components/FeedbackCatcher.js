import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import { COLORS, hp, wp } from "../constants/styleThemes";

const FeedbackCatcher = () => {
  return (
    <View style={{ flexDirection: "row" }}>
      {[1, 2, 3, 4, 5].map((data, index) => (
        <TouchableOpacity onPress={() => console.log("apretada")}>
          <MaterialCommunityIcons
            name="star"
            size={45}
            key={index}
            color={COLORS.TURKEY}
          />
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default FeedbackCatcher;

const styles = StyleSheet.create({});
