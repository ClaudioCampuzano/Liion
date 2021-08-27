import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";

import Layout from "../../components/Layout";
import ButtonLiion from "../../components/ButtonLiion";
import InputLiion from "../../components/InputLiion";
import KeyboardAvoidingWrapper from "../../components/KeyboardAvoidingWrapper";

import {
  COLORS,
  widthPercentageToDP,
  heightPercentageToDP,
} from "../../constants/styleThemes";

import {
  validateEmail,
  validatePassword,
  isFirstRender,
} from "../../utils/utils";

import { useKeyboard } from "../../hooks/useKeyboard";
import { RegisterBackend } from "../../api/api"

const RegistroCuentaCorreo = ({ route, navigation }) => {
  const [valueEmail, setValueEmail] = useState("jon@jiron.com");
  const [valueEmailConfirm, setValueEmailConfirm] = useState("jon@jiron.com");
  const [valuePass, setValuePass] = useState("123456789Aa");
  const [valuePassConfirm, setValuePassConfirm] = useState("123456789Aa");

  const [errorEmail, setErrorEmail] = useState(null);
  const [errorEmailConfirm, seterrorEmailConfirm] = useState(null);
  const [errorPass, setErrorPass] = useState(null);
  const [errorPassConfirm, setErrorPassConfirm] = useState(null);

  const [focusEmailInput, setfocusEmailInput] = useState(false);
  const [focusEmailConfirmInput, setfocusEmailConfirmInput] = useState(false);
  const [focusPasswordInput, setfocusPasswordInput] = useState(false);
  const [focusPasswordConfirmInput, setfocusPasswordConfirmInput] =
    useState(false);

  const [pushButton, setPushButton] = useState(false);

  const { isKeyboardVisible } = useKeyboard();
  const isFirst = isFirstRender();
  const {name, lastname, run} = route.params

  useEffect(() => {
    if (valueEmail != "") {
      if (!validateEmail(valueEmail))
        setErrorEmail("Formato de email incorrecto");
      else setErrorEmail(null);
    }
    if (
      valueEmailConfirm != "" &&
      valueEmail.toLowerCase() != valueEmailConfirm.toLowerCase()
    ) {
      seterrorEmailConfirm("Email's no coinciden");
    } else seterrorEmailConfirm(null);
    if (valuePass != "") {
      if (!validatePassword(valuePass))
        setErrorPass(
          "Debe tener a lo menos 8 caracteres, mayusculas, minusculas, y numeros"
        );
      else setErrorPass(null);
    }
    if (valuePassConfirm != "" && valuePass != valuePassConfirm) {
      setErrorPassConfirm("Contraseñas no coinciden");
    } else setErrorPassConfirm(null);
  }, [
    focusEmailInput,
    focusEmailConfirmInput,
    focusPasswordInput,
    focusPasswordConfirmInput,
    isKeyboardVisible,
  ]);

  useEffect(() => {
    //console.log(name, lastname, run);
    if ( pushButton &&
      !isFirst &&
      !errorEmail &&
      !errorEmailConfirm &&
      !errorPass &&
      !errorPassConfirm
    )
    
    //crack porfavor revisar
    if  (name && lastname && run){
      (async function  () {
      const [resval, resmsg] = await RegisterBackend({name:name, lastname:lastname, run:run, email:valueEmail,
      password:valuePass, isPassenger:"true", isDriver:"false"})
      console.log(resval, resmsg)
      })();
    }
    else {
      console.log("Ingresa todo")
    }
    setPushButton(false)

  }, [pushButton]);

  const checkValidator = () => {
    if (valueEmail == "") setErrorEmail("Falta que ingreses tu email");
    else setErrorEmail(null);

    if (valueEmailConfirm == "")
      seterrorEmailConfirm("Falta que ingreses la confirmacion de tu email");
    else seterrorEmailConfirm(null);

    if (valuePass == "") setErrorPass("Falta tu contraseña");
    else if (!validatePassword(valuePass))
      setErrorPass(
        "Debe tener a lo menos 8 caracteres, mayusculas, minusculas, y numeros"
      );
    else setErrorPass(null);

    if (valuePassConfirm == "")
      setErrorPassConfirm("Falta la confirmacion de la contraseña");
    else if (valuePass != valuePassConfirm)
      setErrorPassConfirm("Contraseñas no coinciden");
    else setErrorPassConfirm(null);
    setPushButton(true)
  };

  return (
    <Layout>
      <KeyboardAvoidingWrapper>
        <View
          style={{
            height: heightPercentageToDP("75"),
          }}
        >
          <Text style={styles.text_titulo}>Correo electronico </Text>
          <Text style={styles.text_subTitulo}>
            Aquí te enviaremos los recibos e informaciónes sobre tus viajes
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
          <InputLiion
            style={styles.input}
            label="Confirma tu email"
            value={valueEmailConfirm}
            errorText={errorEmailConfirm}
            onBlur={() => setfocusEmailConfirmInput(false)}
            onFocus={() => setfocusEmailConfirmInput(true)}
            secureTextEntry={false}
            onChangeText={(text) => setValueEmailConfirm(text)}
          />
          <InputLiion
            style={styles.input}
            label="Contraseña"
            value={valuePass}
            errorText={errorPass}
            onBlur={() => setfocusPasswordInput(false)}
            onFocus={() => setfocusPasswordInput(true)}
            secureTextEntry={true}
            onChangeText={(text) => setValuePass(text)}
          />
          <InputLiion
            style={styles.input}
            label="Confirma tu contraseña"
            value={valuePassConfirm}
            errorText={errorPassConfirm}
            onBlur={() => setfocusPasswordConfirmInput(false)}
            onFocus={() => setfocusPasswordConfirmInput(true)}
            secureTextEntry={true}
            onChangeText={(text) => setValuePassConfirm(text)}
          />
        </View>
        <View style={styles.buttonView}>
          <ButtonLiion
            title="Siguiente"
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
    paddingBottom: heightPercentageToDP("5"),
  },
  input: {
    marginTop: heightPercentageToDP("1.8"),
    width: widthPercentageToDP("78.6"),
    alignSelf: "center",
  },
  buttonView: {
    flex: 1,
    height: heightPercentageToDP("18"),
    justifyContent: "flex-end",
    paddingBottom: heightPercentageToDP("8"),
  },
  button: {
    width: widthPercentageToDP("78.6"),
    height: heightPercentageToDP("4.8"),
    alignSelf: "center",
  },
});

export default RegistroCuentaCorreo;
