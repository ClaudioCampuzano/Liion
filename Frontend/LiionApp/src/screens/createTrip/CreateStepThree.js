import React from "react";
import { StyleSheet, Text, View, TouchableHighlight } from "react-native";

import Layout from "../../components/Layout";
import ButtonLiion from "../../components/ButtonLiion";
import { COLORS, hp, wp } from "../../constants/styleThemes";

const CreateStepThree = ({ navigation, route }) => {
  const checkValidator = () => {
    navigation.navigate("CreateStepFour");
  };

  return (
    <Layout>
      <View style={{ height: hp("70%") }}>
        <Text style={styles.text_titulo}>Preferencias del viaje</Text>
        <Text style={styles.text_subTitulo}>
          {"Marque las características que\ndesea que tenga su viaje"}
        </Text>
        <Text style={styles.text_firstSection}>Genero:</Text>
        <View style={{ flexDirection: "row" }}>
          <TouchableHighlight onPress={console.log("1")}>
            <Text>1          </Text>
          </TouchableHighlight>
          <TouchableHighlight onPress={console.log("2")}>
            <Text>2</Text>
          </TouchableHighlight>
          <TouchableHighlight onPress={console.log("3")}>
            <Text>3</Text>
          </TouchableHighlight>
        </View>
      </View>
      <View style={styles.buttonView}>
        <ButtonLiion
          title="Siguiente"
          styleView={styles.button}
          onPress={() => checkValidator()}
        />
      </View>
    </Layout>
  );
};

export default CreateStepThree;

const styles = StyleSheet.create({
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
  text_titulo: {
    fontFamily: "Gotham-SSm-Bold",
    fontSize: hp("3%"),
    color: COLORS.TURKEY,
    paddingTop: hp("5%"),
    textAlign: "center",
  },
  text_subTitulo: {
    fontFamily: "Gotham-SSm-Medium",
    fontSize: hp("2.5%"),
    color: COLORS.TURKEY_CLEAR,
    paddingTop: hp("6%"),
    textAlign: "center",
    paddingBottom: hp("5%"),
  },
  text_firstSection: {
    fontSize: hp("2.3%"),
    fontFamily: "Gotham-SSm-Medium",
    color: COLORS.BLACK,
  },
});
