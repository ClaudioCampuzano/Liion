import React from "react";
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";


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
    backgroundColor: "#009999",
    borderRadius: 32,
    alignItems: "center",
  },
  text: {
    fontSize: 20,
    color: "#fff",
    fontFamily: "Gotham-SSm-Medium",
    textAlign: "center",
  },
});

/*const ButtonLiion = ({onPress, title }) => {
  return (
    <TouchableOpacity onPress={onPress}>
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
    fontFamily: "Gotham-SSm-Medium",
    textAlign: "center",
    margin: -10,
  },
});*/
export default ButtonLiion;
