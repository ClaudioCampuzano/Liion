import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";

import Layout from "../../components/Layout";
import ButtonLiion from "../../components/ButtonLiion";

import {
  COLORS,
  widthPercentageToDP,
  heightPercentageToDP,
} from "../../constants/styleThemes";

const BienvenidaScreen = ({ navigation }) => {
  return (
    <Layout>
      <View style={styles.container}>
        <Image
          resizeMode="contain"
          style={styles.logo}
          source={require("../../../assets/images/logo.png")}
        />
        <Text style={styles.textBienvenida}>¡Bienvenidos a Liion!</Text>
        <Text style={styles.textSubBienvenida}>Viajemos en manada...</Text>
      </View>
      <View style={styles.buttonView}>
        <ButtonLiion
          title="Acceder"
          styleView={styles.button}
          onPress={() => navigation.navigate("AccesoCuenta")}
        />
        <ButtonLiion
          title="Crear cuenta"
          styleView={styles.button}
          onPress={() => navigation.navigate("RegistroCuenta")}
        />
      </View>
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: heightPercentageToDP('3'),
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
  },
  logo: {
    height: "55%",
  },
  textBienvenida: {
    fontFamily: "Gotham-SSm-Bold",
    fontSize: 30,
    color: COLORS.TURKEY,
    paddingTop: heightPercentageToDP('4'),
  },
  textSubBienvenida: {
    fontFamily: "Gotham-SSm-Medium",
    fontSize: 25,
    color: COLORS.TURKEY,
    paddingTop: heightPercentageToDP('0.7'),
  },
  button: {
    width: widthPercentageToDP("78.6"),
    height: heightPercentageToDP("4.8"),
    margin: heightPercentageToDP("0.6"),
  },
  buttonView: {
    flex: 1,
    justifyContent: "flex-end",
    paddingBottom: heightPercentageToDP('6'),
  },
});

export default BienvenidaScreen;

/*

  
      <ModalPopUp visible={modalVisible} setModalVisible={setModalVisible}>
        No disponible compadre, me entendiste chonchetumare?
      </ModalPopUp>

                <ButtonLiion
            title="Crear cuenta"
            styleView={styles.button}
            styleText={{ margin: -10 }}
            onPress={() => setModalVisible(true)}
          />
*/
