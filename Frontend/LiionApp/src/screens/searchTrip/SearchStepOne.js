import React, { useState, useEffect } from "react";
import { StyleSheet, View } from "react-native";

import Layout from "../../components/Layout";
import ButtonLiion from "../../components/ButtonLiion";
import KeyboardAvoidingWrapper from "../../components/KeyboardAvoidingWrapper";
import InputLocation from "../../components/InputLocation";
import InputDateTime from "../../components/InputDateTime";

import { hp, wp } from "../../constants/styleThemes";

import moment from "moment";
import "moment/locale/es";

const SearchStepOne = ({ navigation }) => {
  const [searchValues, setSearchValues] = useState({
    origin: null,
    destination: null,
    date: moment("00/00/0000", "DD/MM/YYYY"),
    time: moment("00/00/0000", "DD/MM/YYYY"),
  });

  const [searchError, setSearchError] = useState({
    errorOrigin: null,
    errorDestination: null,
    errorDate: null,
    errorTime: null,
  });

  /*   useEffect(() => {
    console.log("---------------searchValues---------------")
    console.log(searchValues);
    console.log("------------------------------------------")
  }, [searchValues]); */

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
              changeValuesHandler("date", value);
            }}
            mode="date"
            label="Fecha de viaje"
            maximum="-180"
            minimum="-1"
          />
          <InputDateTime
            style={styles.inputDateTimeRight}
            onDataChange={(value) => {
              changeValuesHandler("time", value);
            }}
            mode="time"
            label="Hora de llegada"
            maximum="-180"
            minimum="-1"
          />
        </View>

        <InputLocation
          style={styles.inputLocation}
          labelO="Ingresa tu origen"
          labelD="Ingresa tu destino"
          onDataChange={(value) => {
            console.log(value);
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
