import React, { useState, useEffect } from "react";
import { StyleSheet, View } from "react-native";

import Layout from "../../components/Layout";
import ButtonLiion from "../../components/ButtonLiion";
import InputLocation from "../../components/InputLocation";
import InputDateTime from "../../components/InputDateTime";

import { hp, wp } from "../../constants/styleThemes";

const SearchStepOne = ({ navigation }) => {
  const [searchValues, setSearchValues] = useState({
    addresses: null,
    date: null,
    time: null,
  });

  const [errorDate, SetErrorDate] = useState(null)
  const [errorTime, SetErrorTime] = useState(null)
  const [errorAddresses, SetErrorAddresses] = useState(null)
  const [focusInputLocation, setfocusInputLocation] = useState(false);

  const changeValuesHandler = (field, value) => {
    setSearchValues({ ...searchValues, [field]: value });
  };
  
  useEffect(()=>{
    SetErrorAddresses(null)
    setfocusInputLocation(false)
  },[focusInputLocation]);

  useEffect(() => {
    if (searchValues.date) SetErrorDate(null)
    if (searchValues.time) SetErrorTime(null)
    if (searchValues.addresses) SetErrorAddresses(null)
  }, [searchValues]);

  const checkValidator = () => {
    if (!searchValues.date) SetErrorDate('Falta la fecha')
    if (!searchValues.time) SetErrorTime('Falta la hora')
    if (!searchValues.addresses) SetErrorAddresses('Falta las direcciones')
    if (searchValues.addresses && searchValues.date && searchValues.time)
      navigation.navigate("SeachStepTwo", {searchValues});
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
          title="Buscar"
          styleView={styles.button}
          onPress={() => checkValidator()}
        />
      </View>
    </Layout>
  );
};

export default SearchStepOne;

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
