import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import Layout from "../../components/Layout";

import ButtonLiion from "../../components/ButtonLiion";
import InputLiion from "../../components/InputLiion";

import {
  COLORS,
  widthPercentageToDP,
  heightPercentageToDP,
} from "../../constants/styleThemes";

import { validate, format, clean } from "../../utils/utils";

import { useKeyboard } from "../../hooks/useKeyboard";
import KeyboardAvoidingWrapper from "../../components/KeyboardAvoidingWrapper";

const RegistroCuenta = ({ navigation }) => {
  const [valueNombre, setValueNombre] = useState("");
  const [valueApellido, setValueApellido] = useState("");
  const [valueRun, setValueRun] = useState("");
  const [error, setError] = useState(null);
  const [focusRunInput, setfocusRunInput] = useState(false);

  const { isKeyboardVisible } = useKeyboard();

  useEffect(() => {
    if (valueRun != "") {
      setValueRun(format(valueRun));

      if (!validate(clean(valueRun))) {
        setError("Run no valido");
      } else setError(null);
    } else setError(null);
  }, [isKeyboardVisible, focusRunInput]);

  return (
    <Layout>
      <KeyboardAvoidingWrapper>
        <View
          style={{
            height: heightPercentageToDP("70"),
          }}
        >
          <Text style={styles.text_titulo}>Datos personales</Text>
          <Text style={styles.text_subTitulo}>
            Tus datos dan seguridad a la comunidad
          </Text>
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
            onBlur={() => setfocusRunInput(false)}
            onFocus={() => setfocusRunInput(true)}
            secureTextEntry={false}
            onChangeText={(text) => setValueRun(text)}
          />
        </View>

        <View style={styles.buttonView}>
          <ButtonLiion
            title="Siguiente"
            styleView={styles.button}
            onPress={() => navigation.navigate("RegistroCuentaCorreo")}
          />
        </View>
      </KeyboardAvoidingWrapper>
    </Layout>
  );
};

const styles = StyleSheet.create({
  text_titulo: {
    fontFamily: "Gotham-SSm-Bold",
    fontSize: 25,
    color: COLORS.TURKEY,
    paddingTop: heightPercentageToDP("6"),
    textAlign: "center",
  },
  text_subTitulo: {
    fontFamily: "Gotham-SSm-Medium",
    fontSize: 20,
    color: COLORS.TURKEY_CLEAR,
    paddingTop: heightPercentageToDP("6"),
    textAlign: "center",
    paddingBottom: heightPercentageToDP("10"),
  },
  input: {
    marginTop: heightPercentageToDP("1.8"),
    width: widthPercentageToDP("78.6"),
    alignSelf: "center",
  },
  buttonView: {
    flex: 1,
    height: heightPercentageToDP("23"),
    justifyContent: "flex-end",
    paddingBottom: heightPercentageToDP('4.7'),
  },
  button: {
    width: widthPercentageToDP("78.6"),
    padding: heightPercentageToDP("0"),
    height: heightPercentageToDP("4.8"),
    alignSelf: "center",
  },
});
export default RegistroCuenta;
