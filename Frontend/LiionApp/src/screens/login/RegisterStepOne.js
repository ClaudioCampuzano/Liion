import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, ScrollView } from "react-native";

import ButtonLiion from "../../components/ButtonLiion";
import InputLiion from "../../components/InputLiion";
import KeyboardAvoidingWrapper from "../../components/KeyboardAvoidingWrapper";
import Layout from "../../components/Layout";
import { COLORS, hp, wp } from "../../constants/styleThemes";
import { validate, format, clean } from "../../utils/utils";
import InputDateTime from "../../components/InputDateTime";
import InputPicker from "../../components/InputPicker";

import moment from "moment";
import "moment/locale/es";

const RegisterStepOne = ({ navigation }) => {
  const [valueNombre, setValueNombre] = useState("");
  const [valueApellido, setValueApellido] = useState("");
  const [valueRun, setValueRun] = useState("");
  const [valueFecha, setValueFecha] = useState(moment());
  const [valueGender, setValueGender] = useState("");

  const [errorNombre, setErrorNombre] = useState(null);
  const [errorApellido, setErrorApellido] = useState(null);
  const [errorRun, setErrorRun] = useState(null);
  const [errorFecha, setErrorFecha] = useState(null);
  const [errorGenero, setErrorGenero] = useState(null);

  useEffect(() => {
    if (valueNombre != "") setErrorNombre(null);
    if (valueApellido != "") setErrorApellido(null);
    if (valueGender != "") setErrorGenero(null);
    if (valueRun != "") {
      setValueRun(format(valueRun));
      !validate(clean(valueRun))
        ? setErrorRun("Run no valido")
        : setErrorRun(null);
    }
    if (!(valueFecha.format("YYYY-MM-DD") === moment().format("YYYY-MM-DD")))
      setErrorFecha(null);
  }, [valueNombre, valueApellido, valueRun, valueFecha, valueGender]);

  const checkValidator = () => {
    if (valueNombre == "") setErrorNombre("Falta tu nombre");
    else setErrorNombre(null);
    if (valueApellido == "") setErrorApellido("Falta tu apellido");
    else setErrorApellido(null);
    if (valueRun == "") setErrorRun("Falto tu Run");
    else if (!validate(clean(valueRun))) {
      setErrorRun("Run no valido");
    } else setErrorRun(null);
    if (valueFecha.format("YYYY-MM-DD") === moment().format("YYYY-MM-DD"))
      setErrorFecha("Falta tu fecha de nacimiento");
    else setErrorFecha(null);
    if (valueGender == "") setErrorGenero("Falta que indiques tu genero");
    else setErrorGenero(null);

    if (
      valueNombre != "" &&
      valueApellido != "" &&
      valueRun != "" &&
      validate(clean(valueRun)) &&
      !(valueFecha.format("YYYY-MM-DD") === moment().format("YYYY-MM-DD")) &&
      valueGender != ""
    ) {
      const dataToStep2 = {
        name: valueNombre,
        lastname: valueApellido,
        run: valueRun,
        dateBirth: valueFecha.utc().format("YYYY-MM-DD"),
        gender: valueGender,
      };
      navigation.navigate("RegisterStepTwo", dataToStep2);
    }
  };

  return (
    <Layout>
      <KeyboardAvoidingWrapper>
        <View
          style={{
            height: hp("78%"),
          }}
        >
          <Text style={styles.text_titulo}>Datos personales</Text>
          <Text style={styles.text_subTitulo}>
            Tus datos dan seguridad a la comunidad
          </Text>

          <ScrollView showsVerticalScrollIndicator={false}>
            <View style={{ flexDirection: "row", alignSelf: "center" }}>
              <InputLiion
                style={{ ...styles.inputNames, marginRight: wp(1) }}
                label="Nombre"
                errorText={errorNombre}
                value={valueNombre}
                secureTextEntry={false}
                onChangeText={(text) => setValueNombre(text)}
              />
              <InputLiion
                style={styles.inputNames}
                errorText={errorApellido}
                label="Apellido"
                value={valueApellido}
                secureTextEntry={false}
                onChangeText={(text) => setValueApellido(text)}
              />
            </View>
            <InputLiion
              style={styles.input}
              label="Run"
              errorText={errorRun}
              keyboardType="default"
              value={valueRun}
              secureTextEntry={false}
              onChangeText={(text) => setValueRun(text)}
            />
            <InputDateTime
              style={styles.input}
              errorText={errorFecha}
              onDataChange={(value) => {
                setValueFecha(value);
              }}
              label="Fecha de nacimiento"
              mode="date"
              maximum="6574"
              minimum="33238"
            />
            <InputPicker
              style={styles.input}
              errorText={errorGenero}
              onSelect={(selectedItem, index) => {
                var item = selectedItem;
                if (selectedItem == "Ninguno de los anteriores") item = "Otro";
                setValueGender(item);
              }}
              value={valueGender}
              data={["Mujer", "Hombre", "Ninguno de los anteriores"]}
              label="Genero"
            />
          </ScrollView>
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
    paddingBottom: hp("5%"),
  },
  input: {
    marginTop: hp("1.8%"),
    width: wp("78.6%"),
    alignSelf: "center",
  },
  inputNames: {
    marginTop: hp("1.8%"),
    width: wp("38.8"),
    alignSelf: "center",
  },
  buttonView: {
    flex: 1,
    height: hp("15%"),
    justifyContent: "flex-end",
    paddingBottom: hp("8%"),
  },
  button: {
    width: wp("78.6%"),
    height: hp("4.8%"),
    alignSelf: "center",
  },
});
export default RegisterStepOne;
