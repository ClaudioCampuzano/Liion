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
    const initialRoute = "CreateStepOne";
    navigation.navigate("SucessScreen", {
      titulo: titulo,
      subTitulo: subTitulo,
      initialRoute: initialRoute,
    });
  };
  return (
    <Layout>
      <View style={styles.container}>
        <View style={styles.contentFive}>
          <View style={styles.titleContainer}>
            <Text>ETAPA CINCO</Text>
          </View>
          <View style={styles.routeContainer}>
          <Text>ETAPA CINCO</Text>
          </View>
          <View style={styles.vehicleContainer}>
          <Text>ETAPA CINCO</Text>
          </View>
          <View style={styles.priceContainer}>
          <Text>ETAPA CINCO</Text>
          </View>
          <View style={styles.bagsContainer}>
          <Text>ETAPA CINCO</Text>
          </View>
        </View>
        <View style={styles.buttonView}>
          <ButtonLiion
            title="Confirmar viaje"
            styleView={styles.button}
            onPress={() => checkValidator()}
          />
        </View>
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
    paddingBottom: hp("5%"),
    backgroundColor: "green",
  },
  button: {
    width: wp("78.6%"),
    height: hp("4.8%"),
    alignSelf: "center",
  },
  contentFive: {
    flex: 9,
  },
  container: {
    display: "flex",
    flexDirection: "column",
  },
  titleContainer: {
    backgroundColor: "green",
    flex: 1.1,
  },
  routeContainer:{
    backgroundColor:"yellow",
    flex:0.9,
  },
  vehicleContainer:{
    backgroundColor:"green",
    flex:0.7,
  },
  priceContainer:{
    backgroundColor:"yellow",
    flex:1,
  },
  bagsContainer:{
    backgroundColor:"red",
    flex:1.2,
  }
});
