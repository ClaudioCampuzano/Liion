import React, { useState, useContext, useEffect } from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { GlobalContext } from "../../context/Provider";
import Layout from "../../components/Layout";
import ButtonLiion from "../../components/ButtonLiion";
import DriverFiles from "../../components/DriverFiles";
import { COLORS, hp, wp } from "../../constants/styleThemes";
const DriverSignupOne = () => {
  return (
    <Layout>
      <View style={[styles.container]}>
        <Text style={styles.textDriversignin}>Registro de Conductor</Text>
        <Text style={styles.tesxtSubDriversignin}>Para habilitarte como condctor, sube los siguiente documentos: </Text>
    </View>
    <View style={[styles.driverfilesView]}>
        <DriverFiles
          title="Licencia de Conducir"
          styleView={styles.driverfiles}
          onPress={() => console.log('Licencia de Conducir')}
        />
      </View>
      <View style={[styles.buttonView]}>
        <ButtonLiion
          title="Listo"
          styleView={styles.button}
          onPress={() => console.log('listo')}
        />
      </View>
    </Layout>
  );
};

export default DriverSignupOne;

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
  },
  logo: {
    height: hp('35%'),
  },
  textDriversignin: {
    fontFamily: "Gotham-SSm-Bold",
    fontSize: hp('4%'),
    color: COLORS.TURKEY,
    paddingTop: hp('5%'),
  },
  tesxtSubDriversignin: {
    fontFamily: "Gotham-SSm-Book",
    fontSize: hp('2.5%'),
    color: COLORS.TURKEY,
    paddingTop: hp('9%'),
    paddingHorizontal: hp('4%')
  },
  button: {
    width: wp('78.6%'),
    height: hp('6%'),
    margin: hp('0.6%'),
  },
  driverfiles: {
    width: wp('78.6%'),
    height: hp('7%'),
    margin: hp('0.6%'),
  },
  buttonView: {
    flex: 1,
    justifyContent: "flex-end",
    paddingBottom: hp('6%'),
  },
  driverfilesView: {
    flex: 1,
    justifyContent: "flex-end",
    paddingBottom: hp('6%'),
  },
});

