import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";

import Layout from "../components/Layout";
//import TextLiion from "../components/TextLiion";

const BienvenidaScreen = () => {
  return (
    <Layout>
      <View style={styles.container}>
        <Image
          style={styles.logo}
          source={require("../../assets/images/logo.png")}
        />
        <Text style={styles.textBienvenida}>¡Bienvenidos a Liion!</Text>
        <Text style={styles.textSubBienvenida}>Viajemos en manada...</Text>
      </View>
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 100,
    justifyContent: "center",
    alignItems: "center",
  },
  logo: {
    width: 260,
    height: 300,
  },
    textBienvenida: { fontFamily: "Gotham-Bold", fontSize: 30, color: "#009999", paddingTop:50 },
    textSubBienvenida: { fontFamily: "Gotham-Medium", fontSize: 25, color: "#009999", paddingTop:25},
});

export default BienvenidaScreen;
