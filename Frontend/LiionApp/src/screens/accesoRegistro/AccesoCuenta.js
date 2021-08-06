import React from "react";
import { View, Text, StyleSheet } from "react-native";

import Layout from "../../components/Layout";
import InputLiion from "../../components/InputLiion";
import ButtonLiion from "../../components/ButtonLiion";

const AccesoCuenta = () => {
  return (
    <Layout>
      <View>
        <Text style={styles.text_1}>Bienvenido de vuelta</Text>
        <Text style={styles.text_2}>Ingresa tus datos</Text>

        
      </View>
    </Layout>
  );
};

const styles = StyleSheet.create({
  text_1: {
    fontFamily: "Gotham-SSm-Bold",
    fontSize: 25,
    color: "#009999",
    paddingTop: 50,
    alignSelf: "center",
  },
  text_2: {
    fontFamily: "Gotham-SSm-Medium",
    fontSize: 20,
    color: "#60BFB6",
    paddingTop: 50,
    alignSelf: "center",
  },
});

export default AccesoCuenta;
