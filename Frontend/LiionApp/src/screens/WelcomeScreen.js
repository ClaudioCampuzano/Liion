import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";

import Layout from "../components/Layout";
import ButtonLiion from "../components/ButtonLiion";

import { COLORS, hp, wp } from "../constants/styleThemes";

const WelcomeScreen = ({ navigation }) => {
  return (
    <Layout>
      <View style={[styles.container]}>
        <View style={{ paddingTop: hp('10%') }}>
          <Image
            resizeMode="contain"
            style={styles.logo}
            source={require("../../assets/images/logo.png")}
          />
        </View>
        <Text style={styles.textBienvenida}>¡Bienvenidos a Liion!</Text>
        <Text style={styles.textSubBienvenida}>Viajemos en manada...</Text>
      </View>
      <View style={[styles.buttonView]}>
        <ButtonLiion
          title="Acceder"
          styleView={styles.button}
          onPress={() => navigation.navigate("AccountAccess")}
        />
        <ButtonLiion
          title="Crear cuenta"
          styleView={styles.button}
          onPress={() => navigation.navigate("RegisterStepOne")}
        />
      </View>
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
  },
  logo: {
    height: hp('35%'),
  },
  textBienvenida: {
    fontFamily: "Gotham-SSm-Bold",
    fontSize: hp('4%'),
    color: COLORS.TURKEY,
    paddingTop: hp('4%'),
  },
  textSubBienvenida: {
    fontFamily: "Gotham-SSm-Medium",
    fontSize: hp('3%'),
    color: COLORS.TURKEY,
    paddingTop: hp('0.7%'),
  },
  button: {
    width: wp('78.6%'),
    height: hp('4.8%'),
    margin: hp('0.6%'),
  },
  buttonView: {
    flex: 1,
    justifyContent: "flex-end",
    paddingBottom: hp('6%'),
  },
});

export default WelcomeScreen;
