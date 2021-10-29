import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";

import Layout from "../../components/Layout";
import ButtonLiion from "../../components/ButtonLiion";
import { COLORS, hp, wp } from "../../constants/styleThemes";
import TouchableIcon from "../../components/TouchableIcon";
import KeyboardAvoidingWrapper from "../../components/KeyboardAvoidingWrapper";

const CreateStepThree = ({ navigation, route }) => {
  const [preferences, setPreferences] = useState({
    allGender: true,
    onlyWoman: false,
    onlyMen: false,
    smoking: false,
    approvalIns: false,
  });

  const changePreferencesHandler = (field, value) => {
    setPreferences({ ...preferences, [field]: value });
  };

  useEffect(() => {
    console.log(preferences);
  }, [preferences]);

  const handleGender = (field) => {
    let aux = { ...preferences };
    switch (field) {
      case "onlyWoman":
        aux.allGender = false;
        aux.onlyWoman = true;
        aux.onlyMen = false;
        break;
      case "onlyMen":
        aux.allGender = false;
        aux.onlyWoman = false;
        aux.onlyMen = true;
        break;
      default:
        aux.allGender = true;
        aux.onlyWoman = false;
        aux.onlyMen = false;
    }
    setPreferences(aux);
  };

  const checkValidator = () => {
    navigation.navigate("CreateStepFour",{...preferences});
  };
  return (
    <Layout>
      <KeyboardAvoidingWrapper>
        <View style={{ height: hp("70%") }}>
          <Text style={styles.text_titulo}>Preferencias del viaje</Text>
          <Text style={styles.text_subTitulo}>
            {"Pulse las características que\ndesea que tenga su viaje"}
          </Text>
          <Text style={styles.text_firstSection}>Genero:</Text>
          <View
            style={{ flexDirection: "row", justifyContent: "space-around" }}
          >
            <TouchableIcon
              valueDefault={preferences.allGender}
              type={"allGender"}
              onStateChange={(value) => value && handleGender("allGender")}
              style={{ paddingTop: hp("1.5") }}
            />
            <TouchableIcon
              valueDefault={preferences.onlyWoman}
              type={"woman"}
              onStateChange={(value) => value && handleGender("onlyWoman")}
              style={{ paddingTop: hp("1.5") }}
            />
            <TouchableIcon
              valueDefault={preferences.onlyMen}
              type={"men"}
              onStateChange={(value) => value && handleGender("onlyMen")}
              style={{ paddingTop: hp("1.5") }}
            />
          </View>
          <Text style={{ ...styles.text_firstSection, paddingTop: hp("2%") }}>
            Otros:
          </Text>
          <View
            style={{ flexDirection: "row", justifyContent: "space-around" }}
          >
            <TouchableIcon
              valueDefault={preferences.smoking}
              type={"smoking"}
              onStateChange={(value) =>
                value && changePreferencesHandler("smoking", value)
              }
              style={{ paddingTop: hp("1.5") }}
            />
            <TouchableIcon
              valueDefault={preferences.approvalIns}
              type={"approval"}
              onStateChange={(value) =>
                value && changePreferencesHandler("approvalIns", value)
              }
              style={{ paddingTop: hp("1.5") }}
            />
          </View>
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

export default CreateStepThree;

const styles = StyleSheet.create({
  buttonView: {
    flex: 1,
    height: hp("23%"),
    justifyContent: "flex-end",
    paddingBottom: hp("8%"),
  },
  button: {
    width: wp("78.6%"),
    height: hp("4.8%"),
    alignSelf: "center",
  },
  text_titulo: {
    fontFamily: "Gotham-SSm-Bold",
    fontSize: hp("3%"),
    color: COLORS.TURKEY,
    paddingTop: hp("5%"),
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
  text_firstSection: {
    fontSize: hp("2.2%"),
    fontFamily: "Gotham-SSm-Medium",
    color: COLORS.BLACK,
  },
});
