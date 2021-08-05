import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { TextInput } from "react-native-paper";

const InputLiion = ({ children}) => {
  const [text, setText] = useState("");
  return (
    <TextInput
      label={children}
      value={text}
      onChangeText={(children) => setText(children)}
      placeholderTextColor="#009999"
      mode="outlined"
      selectionColor="#009999"
          outlineColor="#D9D9D9"
          style={styles.textInput}
    />
  );
};

const styles = StyleSheet.create({
    textInput: {
        paddingTop: 50
    }
})

export default InputLiion;
