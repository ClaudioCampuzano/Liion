import React from "react";
import { StyleSheet, Text, View } from "react-native";
import Layout from "../../components/Layout";
import { COLORS, hp, wp } from "../../constants/styleThemes";
import ButtonLiion from "../../components/ButtonLiion";

const Feedback = () => {
  return (
    <Layout>
      <View style={{ height: hp("70%") }}>
        <Text style={styles.text_titulo}>Viaje finalizado</Text>
        <Text style={styles.text_subTitulo}>
          {"Por favor, puntúa a tus\ncompañeros de viaje"}
        </Text>
      </View>
      <View style={styles.buttonView}>
        <ButtonLiion
          title="Enviar Feedback"
          styleView={styles.button}
          onPress={() => checkValidator()}
        />
      </View>
    </Layout>
  );
};

export default Feedback;

const styles = StyleSheet.create({
  text_titulo: {
    fontFamily: "Gotham-SSm-Bold",
    fontSize: hp("3%"),
    color: COLORS.TURKEY,
    paddingTop: hp("10%"),
    textAlign: "center",
  },
  text_subTitulo: {
    fontFamily: "Gotham-SSm-Medium",
    fontSize: hp("2.4%"),
    color: COLORS.TURKEY_CLEAR,
    paddingTop: hp("6%"),
    textAlign: "center",
    paddingBottom: hp("5%"),
  },
  buttonView: {
    flex: 1,
    height: hp("23%"),
    justifyContent: "flex-end",
    paddingBottom: hp("6%"),
  },
  button: {
    width: wp("78.6%"),
    height: hp("4.8%"),
    alignSelf: "center",
  },
});
