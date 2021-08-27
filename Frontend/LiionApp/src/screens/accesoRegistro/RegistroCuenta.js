import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";

import ButtonLiion from "../../components/ButtonLiion";
import InputLiion from "../../components/InputLiion";
import KeyboardAvoidingWrapper from "../../components/KeyboardAvoidingWrapper";
import Layout from "../../components/Layout";

import {
  COLORS,
  widthPercentageToDP,
  heightPercentageToDP,
} from "../../constants/styleThemes";

import { validate, format, clean } from "../../utils/utils";

import { useKeyboard } from "../../hooks/useKeyboard";

const RegistroCuenta = ({ navigation }) => {
  const [valueNombre, setValueNombre] = useState("jon");
  const [valueApellido, setValueApellido] = useState("jiron");
  const [valueRun, setValueRun] = useState("12345674");
  const [errorNombre, setErrorNombre] = useState(null);
  const [errorApellido, setErrorApellido] = useState(null);
  const [errorRun, setErrorRun] = useState(null);
  const [focusRunInput, setfocusRunInput] = useState(false);
  
  //luego mejor crear un objecto reactivo, en vez de objetos chicos por separados
  //const [state, setState] = useState({ fName: "", lName: "" });
  //con teclado numerico que pasa con rut raya K

  const { isKeyboardVisible } = useKeyboard();

  useEffect(() => {
    if (valueRun != "") {
      setValueRun(format(valueRun));

      if (!validate(clean(valueRun))) {
        setErrorRun("Run no valido");
      } else setErrorRun(null);
    } else setErrorRun(null);
  }, [isKeyboardVisible, focusRunInput]);

  const checkValidator = () => {
    if (valueNombre == "") setErrorNombre("Falta tu nombre");
    else setErrorNombre(null);
    if (valueApellido == "") setErrorApellido("Falta tu apellido");
    else setErrorApellido(null);
    if (valueRun == "") setErrorRun("Falto tu Run");
    else if (!validate(clean(valueRun))) {
      setErrorRun("Run no valido");
    } else setErrorRun(null);

    if (
      valueNombre != "" &&
      valueApellido != "" &&
      valueRun != "" &&
      validate(clean(valueRun))
    ) {
      const data1 = {name: valueNombre, lastname:valueApellido, run:valueRun}
      navigation.navigate("RegistroCuentaCorreo", data1);
    }
  };

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
            errorText={errorNombre}
            value={valueNombre}
            secureTextEntry={false}
            onChangeText={(text) => setValueNombre(text)}
          />
          <InputLiion
            style={styles.input}
            errorText={errorApellido}
            label="Apellido"
            value={valueApellido}
            secureTextEntry={false}
            onChangeText={(text) => setValueApellido(text)}
          />
          <InputLiion
            style={styles.input}
            label="Run"
            errorText={errorRun}
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
    height: heightPercentageToDP("23"),
    justifyContent: "flex-end",
    paddingBottom: heightPercentageToDP("8"),
  },
  button: {
    width: widthPercentageToDP("78.6"),
    height: heightPercentageToDP("4.8"),
    alignSelf: "center",
  },
});
export default RegistroCuenta;
