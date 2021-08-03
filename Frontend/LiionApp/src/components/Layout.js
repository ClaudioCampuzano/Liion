import React from "react";
import { View, StyleSheet, StatusBar } from "react-native";
import { useFonts } from "expo-font";
import AppLoading from "expo-app-loading";

const Layout = ({ children }) => {
  const [fontsLoaded, error] = useFonts({
    "Gotham-Bold": require("../../assets/fonts/GothamBold.otf"),
    "Gotham-Book": require("../../assets/fonts/GothamBook.otf"),
    "Gotham-Medium": require("../../assets/fonts/GothamMedium.otf"),
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  } else {
    return (
      <View style={styles.container}>
        <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
        {children}
      </View>
    );
  }
};

export default Layout;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#ffffff",
    alignItems: "center",
    flex: 1,
  },
});
