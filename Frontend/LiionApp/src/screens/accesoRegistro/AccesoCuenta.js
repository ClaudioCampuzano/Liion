import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Keyboard } from "react-native";

import Layout from "../../components/Layout";

import ButtonLiion from "../../components/ButtonLiion";
import InputLiion from "../../components/InputLiion";

import { COLORS } from "../../constants/styleThemes";

const AccesoCuenta = () => {
  const [valueEmail, setValueEmail] = useState("");
  const [valueContraseña, setValueContraseña] = useState("");
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => {
        setKeyboardVisible(true); 
      }
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        setKeyboardVisible(false);
      }
    );

    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);

  //const [error, setError] = useState(null)
  return (
    <Layout>
      <View>
        <Text style={styles.text_1}>Bienvenido de vuelta</Text>
        <Text style={styles.text_2}>Ingresa tus datos</Text>
        <InputLiion
          style={styles.input}
          label="Email"
          value={valueEmail}
          onChangeText={(text) => setValueEmail(text)}
        />
        <InputLiion
          style={styles.input}
          label="Contraseña"
          value={valueContraseña}
          onChangeText={(text) => setValueContraseña(text)}
        />

        <TouchableOpacity>
          <View>
            <Text style={styles.text_3}>¿Olvidaste tu contraseña?</Text>
          </View>
        </TouchableOpacity>
        <View style={{paddingTop: 220 }}>
        <ButtonLiion
          title="Ingresar"
          styleView={styles.button}
          styleText={{ margin: -10 }}
        />
      </View>
      </View>
      

    </Layout>
  );
};

const styles = StyleSheet.create({
  text_1: {
    fontFamily: "Gotham-SSm-Bold",
    fontSize: 25,
    color: COLORS.TURKEY,
    paddingTop: 50,
    alignSelf: "center",
  },
  text_2: {
    fontFamily: "Gotham-SSm-Medium",
    fontSize: 20,
    color: COLORS.TURKEY_CLEAR,
    paddingTop: 50,
    alignSelf: "center",
    marginBottom: 50,
  },
  text_3: {
    fontFamily: "Gotham-SSm-Medium",
    fontSize: 16,
    color: COLORS.TURKEY,
    paddingTop: 15,
    marginBottom: 5,
  },
  button: {
    width: 333,
    height: 40,
    padding: 16,
    margin: 5,
  },
  input: {
    marginTop: 32,
    width: 333,
  },
});

export default AccesoCuenta;
