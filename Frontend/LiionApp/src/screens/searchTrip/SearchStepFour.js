import React from "react";
import { StyleSheet, Text, View } from "react-native";

import Layout from "../../components/Layout";
import ButtonLiion from "../../components/ButtonLiion";
import { COLORS, hp, wp } from "../../constants/styleThemes";
import ResultItemCard from "../../components/ResultItemCard";

const SearchStepFour = ({ navigation, route }) => {
  const checkValidator = () => {
    const titulo = "¡Solicitud de reserva realizada!";
    const subTitulo =
      "Tu solicitud de reserva fue\ngenerada exitosamente.\nPara chequear el estatus de tu\nviaje chequéalo en Mis viajes en el\nhome.";
    const initialRoute = "SearchStepOne";
    navigation.navigate("SucessScreen", {
      titulo: titulo,
      subTitulo: subTitulo,
      initialRoute: initialRoute,
    });
  };

  return (
    <Layout>
      <View>
        <Text style={styles.titleStyle}>
          Confirmación de solicitud de reserva
        </Text>
      </View>
      <View style={{ height: hp("15.8%"),width: wp("85.6%") }}>
        <ResultItemCard item={route.params} />
      </View>

      <View style={styles.buttonView}>
        <ButtonLiion
          title="Confirmar solicitud"
          styleView={styles.button}
          onPress={() => checkValidator()}
        />
      </View>
    </Layout>
  );
};

export default SearchStepFour;

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
  titleStyle: {
    fontSize: wp("8%"),
    color: COLORS.TURKEY,
    textAlign: "center",
    marginHorizontal: wp("5%"),
    fontFamily: "Gotham-SSm-Medium",
  },
});
