import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Entypo } from "@expo/vector-icons";
import { StackActions } from '@react-navigation/native';

import Layout from "../components/Layout";
import ButtonLiion from "../components/ButtonLiion";
import { COLORS, hp, wp } from "../constants/styleThemes";

const SucessScreen = ({ navigation, route }) => {
  //console.log(route.params.createValues)
  const { titulo, subTitulo, initialRoute } = route.params;

  const checkValidator = () => {
    navigation.navigate("MyTravelNavigator");
    navigation.dispatch(StackActions.popToTop());
  };
  return (
    <Layout>
      <View
        style={{
          height: hp("70%"),
        }}
      >
        <Text style={styles.text_titulo}>{titulo}</Text>
        <Entypo
          name="check"
          size={80}
          color={COLORS.TURKEY}
          style={styles.figure}
        />
        <Text style={styles.text_subTitulo}>{subTitulo}</Text>
      </View>
      <View style={styles.buttonView}>
        <ButtonLiion
          title="Continuar"
          styleView={styles.button}
          onPress={() => checkValidator()}
        />
      </View>
    </Layout>
  );
};

export default SucessScreen;

const styles = StyleSheet.create({
  figure: {
    textAlign: "center",
    marginTop: hp("6%"),
    shadowOpacity: 2,
    textShadowRadius: 4,
    textShadowOffset: { width: 2, height: 2 },
  },
  text_titulo: {
    fontFamily: "Gotham-SSm-Bold",
    fontSize: hp("4.2%"),
    color: COLORS.TURKEY,
    paddingTop: hp("20%"),
    textAlign: "center",
  },
  text_subTitulo: {
    fontFamily: "Gotham-SSm-Medium",
    fontSize: hp("2.04%"),
    color: COLORS.TURKEY_CLEAR,
    paddingTop: hp("6%"),
    textAlign: "center",
    paddingBottom: hp("5%"),
  },
  buttonView: {
    flex: 1,
    height: hp("23%"),
    justifyContent: "flex-end",
    paddingBottom: hp("8%"),
  },
  button: {
    width: wp("78.6%"),
    height: hp("4.8%"),
    alignSelf: "center",
  },
});
