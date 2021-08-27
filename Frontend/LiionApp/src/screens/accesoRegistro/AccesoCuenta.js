import React, { useState, useEffect, useContext } from "react";
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
import ModalPopUp from "../../components/ModalPopUp";
import KeyboardAvoidingWrapper from "../../components/KeyboardAvoidingWrapper";

import {
  COLORS,
  widthPercentageToDP,
  heightPercentageToDP,
} from "../../constants/styleThemes";

import { validateEmail } from "../../utils/utils";
import { useKeyboard } from "../../hooks/useKeyboard";
import loginUser from "../../context/actions/auth/loginUser";
import {GlobalContext} from '../../context/Provider';

const AccesoCuenta = () => {
  const [valueEmail, setValueEmail] = useState("jon@jiron.cl");
  const [focusEmailInput, setfocusEmailInput] = useState(false);
  const [valuePassword, setValuePassword] = useState("123456789");
  const [error, setError] = useState(null);

  const [modalVisible, setModalVisible] = useState(false);

  const { isKeyboardVisible } = useKeyboard();

  useEffect(() => {
    if (valueEmail != "") {
      if (!validateEmail(valueEmail)) setError("Formato de email incorrecto");
      else setError(null);
    }
  }, [focusEmailInput, isKeyboardVisible]);

  const { authDispatch } = useContext(GlobalContext);

const HandleLoggin = (payload) => {
  //console.log(authDispatch)
  //console.log(authState)
  loginUser({email:valueEmail, password:valuePassword})(authDispatch);
}

  return (
    <Layout>
      <KeyboardAvoidingWrapper>
        <View
          style={{
            height: heightPercentageToDP("70"),
          }}
        >
          <Text style={styles.text_titulo}>Bienvenido de vuelta</Text>
          <Text style={styles.text_subTitulo}>Ingresa tus datos</Text>
          <InputLiion
            style={styles.input}
            label="Email"
            value={valueEmail}
            errorText={error}
            secureTextEntry={false}
            onBlur={() => setfocusEmailInput(false)}
            onFocus={() => setfocusEmailInput(true)}
            onChangeText={(text) => setValueEmail(text)}
          />
          <InputLiion
            style={styles.input}
            label="Contraseña"
            value={valueContraseña}
            secureTextEntry={true}
            onChangeText={(text) => setValueContraseña(text)}
          />
          <ModalPopUp visible={modalVisible} setModalVisible={setModalVisible}>
            No disponible compadre, me entendiste chonchetumare?
          </ModalPopUp>

          <TouchableOpacity onPress={() => setModalVisible(true)}>
            <View>
              <Text style={styles.text_Olvidaste}>
                ¿Olvidaste tu contraseña?
              </Text>
            </View>
          </TouchableOpacity>
        </View>
        <View style={styles.buttonView}>
          <ButtonLiion
            title="Siguiente"
            styleView={styles.button}
            styleText={{ margin: -10 }}
            onPress={() => HandleLoggin()}
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
  text_Olvidaste: {
    fontFamily: "Gotham-SSm-Medium",
    fontSize: 16,
    color: COLORS.TURKEY,
    paddingTop: heightPercentageToDP('2'),
  },
  buttonView: {
    flex: 1,
    height: heightPercentageToDP("23"),
    justifyContent: "flex-end",
    paddingBottom: heightPercentageToDP("8"),
  },
  button: {
    width: widthPercentageToDP("78.6"),
    height: heightPercentageToDP("4.8"),
    alignSelf: "center",
  },
  input: {
    marginTop: heightPercentageToDP("1.8"),
    width: widthPercentageToDP("78.6"),
    alignSelf: "center",
  },
});

export default AccesoCuenta;
