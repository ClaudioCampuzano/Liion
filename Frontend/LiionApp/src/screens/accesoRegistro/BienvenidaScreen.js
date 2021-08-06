import React, { useState } from "react";
import { View, Text, StyleSheet, Image } from "react-native";

import Layout from "../../components/Layout";
import ButtonLiion from "../../components/ButtonLiion";
import ModalPopUp from "../../components/ModalPopUp";

const BienvenidaScreen = ({ navigation }) => {
  const [modalVisible, setModalVisible] = useState(false);
  return (
    <Layout>
      <ModalPopUp visible={modalVisible} setModalVisible={setModalVisible}>
        No disponible compadre, me entendiste chonchetumare?
      </ModalPopUp>
      <View style={styles.container}>
        <Image
          resizeMode="contain"
          style={styles.logo}
          source={require("../../../assets/images/logo.png")}
        />
        <Text style={styles.textBienvenida}>¡Bienvenidos a Liion!</Text>
        <Text style={styles.textSubBienvenida}>Viajemos en manada...</Text>
        <ButtonLiion
          title="Acceder"
          styleView={styles.button}
          styleText={{ margin: -10 }}
          onPress={() => navigation.navigate("AccesoCuenta")}
        />
        <ButtonLiion
          title="Crear cuenta"
          styleView={styles.button}
          styleText={{ margin: -10 }}
          onPress={() => setModalVisible(true)}
        />
      </View>
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  logo: {
    width: 260,
    height: "55%",
  },
  textBienvenida: {
    fontFamily: "Gotham-SSm-Bold",
    fontSize: 30,
    color: "#009999",
    paddingTop: 10,
  },
  textSubBienvenida: {
    fontFamily: "Gotham-SSm-Medium",
    fontSize: 25,
    color: "#009999",
    paddingTop: 25,
    paddingBottom: 100,
  },
  button: {
    width: 333,
    height: 40,
    padding: 16,
    margin: 5,
  },
});

export default BienvenidaScreen;
