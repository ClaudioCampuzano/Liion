import React, { useState } from "react";
import { View, Text, StyleSheet, Image } from "react-native";

import Layout from "../../components/Layout";
import ButtonLiion from "../../components/ButtonLiion";
import ModalPopUp from "../../components/ModalPopUp";

import { COLORS, DEVICE } from "../../constants/styleThemes";

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
        <View style={styles.ViewButton}>
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
      </View>
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 50,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: 'column',
  },
  logo: {
    width: 260,
    height: "55%",
  },
  textBienvenida: {
    fontFamily: "Gotham-SSm-Bold",
    fontSize: 30,
    color: COLORS.TURKEY,
    paddingTop: 10,
  },
  textSubBienvenida: {
    fontFamily: "Gotham-SSm-Medium",
    fontSize: 25,
    color: COLORS.TURKEY,
    paddingTop: 25,
  },
  button: {
    width: 333,
    height: 40,
    padding: 16,
    margin: 5,
  },
  ViewButton: {
    flex: 1, 
    justifyContent: 'flex-end',
    marginBottom: 40 
  }
});

export default BienvenidaScreen;
