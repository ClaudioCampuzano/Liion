import React from "react";
import { StyleSheet, Text, View } from "react-native";

import Layout from "../../components/Layout";
import ButtonLiion from "../../components/ButtonLiion";
import { COLORS, hp, wp } from "../../constants/styleThemes";

const CreateStepFive = ({ navigation, route }) => {
  const checkValidator = () => {
    const titulo = "¡Creación de viaje realizada!";
    const subTitulo =
      "Tu creación de viaje fue generada exitosamente.\nPara chequear el estatus de tu\nviaje chequéalo en Mis viajes\n(conductor) en el home.";
    const initialRoute = 'CreateStepOne'
    navigation.navigate("SucessScreen", {
      titulo: titulo,
      subTitulo: subTitulo,
      initialRoute: initialRoute
    });
  };
  return (
    <Layout>
      <View>
        <Text>ETAPA CINCO</Text>
      </View>
      <View style={styles.buttonView}>
        <ButtonLiion
          title="Ingresar"
          styleView={styles.button}
          onPress={() => checkValidator()}
        />
      </View>
    </Layout>
  );
};

export default CreateStepFive;

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
});
