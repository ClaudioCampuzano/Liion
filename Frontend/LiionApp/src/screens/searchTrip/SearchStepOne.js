import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";

import Layout from "../../components/Layout";
import ButtonLiion from "../../components/ButtonLiion";
import KeyboardAvoidingWrapper from "../../components/KeyboardAvoidingWrapper";
import InputLocation from "../../components/InputLocation/InputLocation";
import InputDataDate from "../../components/InputDataDate";

import { COLORS, hp, wp } from "../../constants/styleThemes";


import moment from "moment";
import "moment/locale/es";

import DatePicker from 'react-native-modern-datepicker';
const SearchStepOne = ({ navigation }) => {
  const [valueFecha, setValueFecha] = useState(moment());
  const [errorFecha, setErrorFecha] = useState(null);

  const [searchValues, setSearchValues] = useState({
    origin: "",
    destination: "",
    date: "",
    time: "",
  });

  const [searchError, setSearchError] = useState({
    errorOrigin: null,
    errorDestination: null,
    errorDate: null,
    errorTime: null,
  });

  useEffect(() => {
    console.log(searchValues);
  }, [searchValues]);

  const changeValuesHandler = (field, value) => {
    setSearchValues({ ...searchValues, [field]: value });
  };
  const changeErrorHandler = (field, value) => {
    setSearchError({ ...searchError, [field]: value });
  };

  const checkValidator = () => {
    navigation.navigate("SeachStepTwo");
  };
  return (
    <Layout>
      <View
        style={{
          height: hp("78%"),
        }}
      >
        <InputLocation
          style={styles.inputLocation}
          labelO="Ingresa tu origen"
          labelD="Ingresa tu destino"
          value0={searchValues["origin"]}
          valueD={searchValues["destination"]}
        />
        <InputDataDate
          label="Fecha de salida"
          errorText={errorFecha}
          style={styles.inputDateTime}
          onDataChange={(value) => setValueFecha(value)}
          maximum='-10'
          minimum='0'
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
    marginTop: hp("25%"),
    width: wp("78.6%"),
    height: hp("15%"),
    alignSelf: "center",
  },
  inputDateTime: {
    marginTop: hp("1.8%"),
    width: wp("78.6%"),
    alignSelf: "center",
  },
  inputLocation: {
    marginTop: hp("25%"),
    width: wp("78.6%"),
    height: hp("15%"),
    alignSelf: "center",
  },
});
