import React, { useState, useEffect } from "react";
import { StyleSheet, View } from "react-native";

import Layout from "../../components/Layout";
import ButtonLiion from "../../components/ButtonLiion";
import InputLocation from "../../components/InputLocation";
import InputDateTime from "../../components/InputDateTime";

import { hp, wp } from "../../constants/styleThemes";

const CreateStepOne = ({ navigation }) => {
  const [createValues, setSearchValues] = useState({
    addresses: null,
    date: null,
    time: null,
  });

  const [errorDate, SetErrorDate] = useState(null)
  const [errorTime, SetErrorTime] = useState(null)
  const [errorAddresses, SetErrorAddresses] = useState(null)
  const [focusInputLocation, setfocusInputLocation] = useState(false);

  const changeValuesHandler = (field, value) => {
    setSearchValues({ ...createValues, [field]: value });
  };
  
  useEffect(()=>{
    SetErrorAddresses(null)
    setfocusInputLocation(false)
  },[focusInputLocation]);

  useEffect(() => {
    if (createValues.date) SetErrorDate(null)
    if (createValues.time) SetErrorTime(null)
    if (createValues.addresses) SetErrorAddresses(null)
  }, [createValues]);

  const checkValidator = () => {
    if (!createValues.date) SetErrorDate('Falta la fecha')
    if (!createValues.time) SetErrorTime('Falta la hora')
    if (!createValues.addresses) SetErrorAddresses('Falta las direcciones')
    if (createValues.addresses && createValues.date && createValues.time)
      navigation.navigate("CreateStepTwo", {createValues});
  };
  return (
    <Layout>
      <View
        style={{
          height: hp("78%"),
          flexDirection: "column",
        }}
      >
        <View
          style={{
            flexDirection: "row",
          }}
        >
          <InputDateTime
            style={styles.inputDateTime}
            onDataChange={(value) => {
              changeValuesHandler("date", value.local().format("DD/MM/YYYY"));
            }}
            errorText={errorDate}
            mode="date"
            label="Fecha de viaje"
            maximum="-180"
            minimum="-1"
          />
          <InputDateTime
            style={styles.inputDateTimeRight}
            onDataChange={(value) => {
              changeValuesHandler("time", value.local().format("HH:mm"));
            }}
            errorText={errorTime}
            mode="time"
            label="Hora de llegada"
            maximum="-180"
            minimum="-1"
          />
        </View>

        <InputLocation
          errorText={errorAddresses}
          onFocus={() => setfocusInputLocation(true)}
          style={styles.inputLocation}
          labelO="Ingresa tu origen"
          labelD="Ingresa tu destino"
          onDataChange={(value) => {
            changeValuesHandler("addresses", value);
          }}
        />
      </View>
      <View style={styles.buttonView}>
        <ButtonLiion
          title="Crear"
          styleView={styles.button}
          onPress={() => checkValidator()}
        />
      </View>
    </Layout>
  );
};

export default CreateStepOne;

const styles = StyleSheet.create({
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
  inputLocation: {
    marginTop: hp("1.8%"),
    width: wp("78.6%"),
    alignSelf: "center",
  },
  inputDateTime: {
    marginTop: hp("10%"),
    width: wp("38%"),
    alignSelf: "center",
  },
  inputDateTimeRight: {
    marginLeft: wp("2.6"),
    marginTop: hp("10%"),
    width: wp("38%"),
    alignSelf: "center",
  },
});