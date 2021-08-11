import React from "react";
import { View, StyleSheet, StatusBar } from "react-native";
import { useFonts } from "expo-font";
import AppLoading from "expo-app-loading";
import {COLORS} from "../constants/styleThemes"

const Layout = ({ children }) => {
  const [fontsLoaded, error] = useFonts({
    "Gotham-SSm-Bold": require("../../assets/fonts/GothamSSm-Bold.ttf"),
    "Gotham-SSm-Book": require("../../assets/fonts/GothamSSm-Book.ttf"),
    "Gotham-SSm-Medium": require("../../assets/fonts/GothamSSm-Medium.ttf")
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  } else {
    return (
      <View style={styles.container}>
        <StatusBar barStyle="dark-content" backgroundColor={COLORS.WHITE} />
        {children}
      </View>
    );
  }
};

export default Layout;

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.WHITE,
    alignItems: "center",
    flex: 1,
  },
});
