import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";

import Layout from "../../components/Layout";
import ButtonLiion from "../../components/ButtonLiion";
import KeyboardAvoidingWrapper from "../../components/KeyboardAvoidingWrapper";
import InputLocation from "../../components/InputLocation/InputLocation";
import InputDateTime from "../../components/InputDateTime";

import { COLORS, hp, wp } from "../../constants/styleThemes";

import moment from "moment";
import "moment/locale/es";

const SearchStepOne = ({ navigation }) => {
  const [date, setDate] = useState(moment("00/00/0000", "DD/MM/YYYY"));
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
        <InputDateTime
          style={styles.inputDateTime}
/*           onDataChange={(value) => {
            setValueFecha(value);
          }} */
          mode="date"
          label="Fecha de viaje"
          maximum="-180"
          minimum="-1"
        />
          <InputDateTime
          style={styles.inputDateTime}
/*           onDataChange={(value) => {
            setValueFecha(value);
          }} */
          mode="time"
          label="Hora de llegada"
          maximum="-180"
          minimum="-1"
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
  inputDateTime2: {
    marginTop: hp("1.8%"),
    width: wp("78.6%"),
    alignSelf: "center",
    backgroundColor: "yellow",
  },
  inputLocation: {
    marginTop: hp("25%"),
    width: wp("78.6%"),
    height: hp("15%"),
    alignSelf: "center",
  },
});
