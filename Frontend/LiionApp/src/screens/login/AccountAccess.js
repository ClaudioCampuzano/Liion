import React, { useState, useEffect, useContext } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

import Layout from "../../components/Layout";
import ButtonLiion from "../../components/ButtonLiion";
import InputLiion from "../../components/InputLiion";
import KeyboardAvoidingWrapper from "../../components/KeyboardAvoidingWrapper";
import ModalPopUp from "../../components/ModalPopUp";

import { COLORS, hp, wp } from "../../constants/styleThemes";
import { validateEmail, validatePassword } from "../../utils/utils";
import { useKeyboard } from "../../hooks/useKeyboard";

import { GlobalContext } from "../../context/Provider";

const AccountAccess = ({ navigation }) => {
  const [valueEmail, setValueEmail] = useState("");
  const [focusEmailInput, setfocusEmailInput] = useState(false);
  const [valuePass, setValuePass] = useState("");

  const [errorEmail, setErrorEmail] = useState(null);
  const [errorPass, setErrorPass] = useState(null);

  const [modalVisible, setModalVisible] = useState(false);
  const [textModal, setTextModal] = useState("");


  const { isKeyboardVisible } = useKeyboard();

  const { loginUser } = useContext(GlobalContext);

  useEffect(() => {
    if (valueEmail != "") setErrorEmail(null);
    if (valuePass != "") setErrorPass(null);
  }, [valueEmail, valuePass]);

  useEffect(() => {
    if (valueEmail != "") {
      if (!validateEmail(valueEmail))
        setErrorEmail("Formato de email incorrecto");
      else setErrorEmail(null);
    }
    if (valuePass != "")
      if (!validatePassword(valuePass))
        setErrorPass(
          "Recuerda debe tener a lo menos 8 caracteres, mayusculas, minusculas, y numeros"
        );
      else setErrorPass(null);
  }, [focusEmailInput, isKeyboardVisible]);

  const checkValidator = () => {
    if (valuePass == "") setErrorPass("Falta tu contraseña");
    else if (!validatePassword(valuePass))
      setErrorPass(
        "Recuerda debe tener a lo menos 8 caracteres, mayusculas, minusculas, y numeros"
      );
    else setErrorPass(null);

    if (valueEmail == "") setErrorEmail("Falta que ingreses tu email");
    else if (!validateEmail(valueEmail))
      setErrorEmail("Formato de email incorrecto");
    else setErrorEmail(null);

    if (validateEmail(valueEmail) && validatePassword(valuePass))
      (async () => {
        await loginUser({ email: valueEmail, password: valuePass });
      })();
    
  };

  return (
    <Layout>
      <KeyboardAvoidingWrapper>
        <View
          style={{
            height: hp("70%"),
          }}
        >
          <ModalPopUp visible={modalVisible} setModalVisible={setModalVisible}>
            Errores en el registro, consulte con el administrador
          </ModalPopUp>
          <Text style={styles.text_titulo}>Bienvenido de vuelta</Text>
          <Text style={styles.text_subTitulo}>Ingresa tus datos</Text>
          <InputLiion
            style={styles.input}
            label="Email"
            value={valueEmail}
            errorText={errorEmail}
            secureTextEntry={false}
            onBlur={() => setfocusEmailInput(false)}
            onFocus={() => setfocusEmailInput(true)}
            onChangeText={(text) => setValueEmail(text)}
          />
          <InputLiion
            style={styles.input}
            label="Contraseña"
            value={valuePass}
            errorText={errorPass}
            secureTextEntry={true}
            onChangeText={(text) => setValuePass(text)}
          />

          <TouchableOpacity
            onPress={() => navigation.navigate("RecoverAccount")}
          >
            <View>
              <Text style={styles.text_Olvidaste}>
                ¿Olvidaste tu contraseña?
              </Text>
            </View>
          </TouchableOpacity>
        </View>
        <View style={styles.buttonView}>
          <ButtonLiion
            title="Ingresar"
            styleView={styles.button}
            onPress={() => checkValidator()}
          />
        </View>
      </KeyboardAvoidingWrapper>
    </Layout>
  );
};

const styles = StyleSheet.create({
  text_titulo: {
    fontFamily: "Gotham-SSm-Bold",
    fontSize: hp("3%"),
    color: COLORS.TURKEY,
    paddingTop: hp("6%"),
    textAlign: "center",
  },
  text_subTitulo: {
    fontFamily: "Gotham-SSm-Medium",
    fontSize: hp("2.5%"),
    color: COLORS.TURKEY_CLEAR,
    paddingTop: hp("6%"),
    textAlign: "center",
    paddingBottom: hp("10%"),
  },
  text_Olvidaste: {
    fontFamily: "Gotham-SSm-Medium",
    fontSize: hp("2%"),
    color: COLORS.TURKEY,
    paddingTop: hp("2%"),
  },
  buttonView: {
    flex: 1,
    height: hp("23%"),
    justifyContent: "flex-end",
    paddingBottom: hp("8%"),
  },
  button: {
    width: wp("78.6%"),
    height: hp("4.8%"),
    alignSelf: "center",
  },
  input: {
    marginTop: hp("1.8%"),
    width: wp("78.6%"),
    alignSelf: "center",
  },
});

export default AccountAccess;
