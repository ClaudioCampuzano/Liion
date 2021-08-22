import React from "react";
import { KeyboardAvoidingView, ScrollView } from "react-native";

import { COLORS } from "../constants/styleThemes";

const KeyboardAvoidingWrapper = ({ children }) => {
  return (
    <KeyboardAvoidingView style={{ flex: 1, backgroundColor: COLORS.WHITE }}>
      <ScrollView>{children}</ScrollView>
    </KeyboardAvoidingView>
  );
};

export default KeyboardAvoidingWrapper;
