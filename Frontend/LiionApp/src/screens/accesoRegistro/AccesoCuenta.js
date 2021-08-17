import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Keyboard,
} from "react-native";

import Layout from "../../components/Layout";

import ButtonLiion from "../../components/ButtonLiion";
import InputLiion from "../../components/InputLiion";

import { COLORS } from "../../constants/styleThemes";

const AccesoCuenta = () => {
  const [valueEmail, setValueEmail] = useState("");
  const [valueContraseña, setValueContraseña] = useState("");
  const [error, setError] = useState(null);
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);

  useEffect(() => {
    if (valueEmail != "") {
      if (!validate(valueEmail)) setError("Formato de email incorrecto");
      else setError(null);
    }
  }, [isKeyboardVisible]);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      () => {
        setKeyboardVisible(true); // or some other action
      }
    );
    const keyboardDidHideListener = Keyboard.addListener(
      "keyboardDidHide",
      () => {
        setKeyboardVisible(false); // or some other action
      }
    );
    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);

  const validate = (text) => {
    const reg =
      /(?!.*\.{2})^([a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+(\.[a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+)*|"((([\t]*\r\n)?[\t]+)?([\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|\\[\x01-\x09\x0b\x0c\x0d-\x7f\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))*(([\t]*\r\n)?[\t]+)?")@(([a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.)+([a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.?$/i;
    if (reg.test(text) === false) {
      return false;
    } else {
      return true;
    }
  };

  return (
    <Layout>
      <View>
        <Text style={styles.text_1}>Bienvenido de vuelta</Text>
        <Text style={styles.text_2}>Ingresa tus datos</Text>
        <InputLiion
          style={styles.input}
          label="Email"
          value={valueEmail}
          errorText={error}
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
        <View style={{ flex: 1, justifyContent: "flex-end", marginBottom: 40 }}>
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
