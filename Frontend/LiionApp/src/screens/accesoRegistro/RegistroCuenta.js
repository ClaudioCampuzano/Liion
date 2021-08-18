import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Keyboard } from "react-native";

import Layout from "../../components/Layout";

import ButtonLiion from "../../components/ButtonLiion";
import InputLiion from "../../components/InputLiion";

import { COLORS } from "../../constants/styleThemes";

import { validate, clean, format, getCheckDigit } from "../../utils/utils";

import { useKeyboard } from "../../hooks/useKeyboard";

const RegistroCuenta = ({ navigation }) => {
  const [valueNombre, setValueNombre] = useState("");
  const [valueApellido, setValueApellido] = useState("");
  const [valueRun, setValueRun] = useState("");
  const [error, setError] = useState(null);
  const [focusEmailInput, setfocusEmailInput] = useState(false);


  const {isKeyboardVisible} = useKeyboard()

  useEffect(() => {
    if (valueRun != "") {
      setValueRun(format(valueRun));

      if (!validate(valueRun)) {
        setError("Run no valido");
      } else setError(null);
    } else setError(null);
  }, [isKeyboardVisible, focusEmailInput]);

  return (
    <Layout>
      <View>
        <Text style={styles.text_1}>Datos personales</Text>
        <Text style={styles.text_2}>Tus datos dan seguridad </Text>
        <Text style={styles.text_3}>a la comunidad </Text>
        <InputLiion
          style={styles.input}
          label="Nombre"
          value={valueNombre}
          secureTextEntry={false}
          onChangeText={(text) => setValueNombre(text)}
        />
        <InputLiion
          style={styles.input}
          label="Apellido"
          value={valueApellido}
          secureTextEntry={false}
          onChangeText={(text) => setValueApellido(text)}
        />
        <InputLiion
          style={styles.input}
          label="Run"
          errorText={error}
          keyboardType="numeric"
          value={valueRun}
          onBlur={() => setfocusEmailInput(false)}
          onFocus={() => setfocusEmailInput(true) }
          secureTextEntry={false}
          onChangeText={(text) => setValueRun(text)}
        />
        <View style={{ flex: 1, justifyContent: "flex-end", marginBottom: 40 }}>
          <ButtonLiion
            title="Siguiente"
            styleView={styles.button}
            styleText={{ margin: -10 }}
            onPress={() => navigation.navigate("RegistroCuentaCorreo")}
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
  },
  text_3: {
    fontFamily: "Gotham-SSm-Medium",
    fontSize: 20,
    color: COLORS.TURKEY_CLEAR,
    alignSelf: "center",
    marginBottom: 50,
  },
  input: {
    marginTop: 32,
    width: 333,
  },
  button: {
    width: 333,
    height: 40,
    padding: 16,
    margin: 5,
  },
});

export default RegistroCuenta;
