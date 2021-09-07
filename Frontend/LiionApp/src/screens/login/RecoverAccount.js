import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";

import Layout from "../../components/Layout";
import ButtonLiion from "../../components/ButtonLiion";
import InputLiion from "../../components/InputLiion";
import ModalPopUp from "../../components/ModalPopUp";
import KeyboardAvoidingWrapper from "../../components/KeyboardAvoidingWrapper";
import { COLORS, hp, wp } from "../../constants/styleThemes";
import { useKeyboard } from "../../hooks/useKeyboard";
import { validateEmail } from "../../utils/utils";

import { recoverEmail } from "../../firebase/Auth";

const RecoverAccount = ({ navigation }) => {
  const [valueEmail, setValueEmail] = useState("");
  const [errorEmail, setErrorEmail] = useState(null);
  const [focusEmailInput, setfocusEmailInput] = useState(false);

  const { isKeyboardVisible } = useKeyboard();
  const [modalVisible, setModalVisible] = useState(false);
  const [textModal, setTextModal] = useState("");

  useEffect(() => {
    if (valueEmail != "") setErrorEmail(null);
  }, [valueEmail]);

  useEffect(() => {
    if (valueEmail != "") {
      if (!validateEmail(valueEmail))
        setErrorEmail("Formato de email incorrecto");
      else setErrorEmail(null);
    }
  }, [focusEmailInput, isKeyboardVisible]);

  const checkValidator = () => {
    if (valueEmail == "") setErrorEmail("Falta que ingreses tu email");
    else if (!validateEmail(valueEmail))
      setErrorEmail("Formato de email incorrecto");
    else setErrorEmail(null);
    if (validateEmail(valueEmail)) {
      (async () => {
        const stadeRecovery = await recoverEmail({ email: valueEmail });
        setModalVisible(true);
        if (stadeRecovery) {
          setTextModal(
            "En unos instantes te llegara un correo de recuperación"
          );
        } else setTextModal("Email no registrado");
      })();
    }
  };

  useEffect(() => {
    if (
      textModal == "En unos instantes te llegara un correo de recuperación" &&
      !modalVisible
    )
    navigation.navigate("AccountAccess")
  }, [modalVisible]);

  return (
    <Layout>
      <KeyboardAvoidingWrapper>
        <View
          style={{
            height: hp("70%"),
          }}
        >
          <ModalPopUp visible={modalVisible} setModalVisible={setModalVisible}>
            {textModal}
          </ModalPopUp>
          <Text style={styles.text_titulo}>¿Cuál es tu email? </Text>
          <Text style={styles.text_subTitulo}>
            Te enviaremos un link para recuperar tu cuenta
          </Text>
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
        </View>
        <View style={styles.buttonView}>
          <ButtonLiion
            title="Enviar"
            styleView={styles.button}
            onPress={() => checkValidator()}
          />
        </View>
      </KeyboardAvoidingWrapper>
    </Layout>
  );
};

export default RecoverAccount;

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
    paddingHorizontal: wp("5%"),
  },
  input: {
    marginTop: hp("1.8%"),
    width: wp("78.6%"),
    alignSelf: "center",
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
});
