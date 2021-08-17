import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";

import Layout from "../../components/Layout";

import ButtonLiion from "../../components/ButtonLiion";
import InputLiion from "../../components/InputLiion";

import { COLORS } from "../../constants/styleThemes";

const RegistroCuentaCorreo = ({ navigation }) => {
  const [valueEmail, setValueEmail] = useState("");
  const [valueEmailConfirm, setValueEmailConfirm] = useState("");
  const [valuePass, setValuePass] = useState("");
  const [valuePassConfirm, setValuePassConfirm] = useState("");
  const [error, setError] = useState(null);

  return (
    <Layout>
      <View>
        <Text style={styles.text_1}>Correo electronico </Text>
        <Text style={styles.text_2}>
          Aqui te enviaremos los recibos e 
        </Text>

        <InputLiion
          style={styles.input}
          label="Email"
          value={valueEmail}
          errorText={error}
          secureTextEntry={false}
          onChangeText={(text) => setValueEmail(text)}
        />
        <InputLiion
          style={styles.input}
          label="Confirma tu email"
          value={valueEmailConfirm}
          secureTextEntry={false}
          onChangeText={(text) => setValueEmailConfirm(text)}
        />
        <InputLiion
          style={styles.input}
          label="Contraseña"
          value={valuePass}
          secureTextEntry={false}
          onChangeText={(text) => setValuePass(text)}
        />
        <InputLiion
          style={styles.input}
          label="Confirma tu contraseña"
          value={valuePassConfirm}
          secureTextEntry={false}
          onChangeText={(text) => setValuePassConfirm(text)}
        />
        <View style={{ flex: 1, justifyContent: "flex-end", marginBottom: 40 }}>
          <ButtonLiion
            title="Siguiente"
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

export default RegistroCuentaCorreo;
