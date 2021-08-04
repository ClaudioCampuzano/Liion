import React from "react";
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";

const ButtonLiion = ({ title }) => {
  return (
    <TouchableOpacity>
      <View style={styles.button}>
        <Text style={styles.text}>{title}</Text>
      </View>
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  button: {
    backgroundColor: "#009999",
    borderRadius: 32,
    padding: 16,
    alignItems: "center",
    width: 333,
        height: 40,
        margin: 5,

  },
  text: {
    fontSize: 20,
    color: "#fff",
    fontFamily: "Gotham-Medium",
      textAlign: "center",
      margin: -10,

  },
});
export default ButtonLiion;
