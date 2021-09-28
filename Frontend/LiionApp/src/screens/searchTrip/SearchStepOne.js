import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";

import Layout from "../../components/Layout";
import ButtonLiion from "../../components/ButtonLiion";
import KeyboardAvoidingWrapper from "../../components/KeyboardAvoidingWrapper";
import InputDataDate from "../../components/InputDataDate";

import { COLORS, hp, wp } from "../../constants/styleThemes";

const SearchStepOne = ({ navigation }) => {
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
      <KeyboardAvoidingWrapper>
        <View
          style={{
            height: hp("78%"),
          }}
        >
          <Text>Buscar Viaje</Text>

          <InputDataDate
            label="Fecha de nacimiento"
            errorText={searchError.errorDate}
            style={styles.input}
            onDataChange={(value) => changeValuesHandler("date", value)}
          />
        </View>
        <View style={styles.buttonView}>
          <ButtonLiion
            title="Buscar"
            styleView={styles.button}
            onPress={() => checkValidator()}
          />
        </View>
      </KeyboardAvoidingWrapper>
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
  input: {
    marginTop: hp("1.8%"),
    width: wp("78.6%"),
    alignSelf: "center",
  },
});
