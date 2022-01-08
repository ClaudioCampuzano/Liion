import React, { useState, useContext } from "react";
import { StyleSheet, Text, View } from "react-native";

import Layout from "../../components/Layout";
import ButtonLiion from "../../components/ButtonLiion";
import { COLORS, hp, wp } from "../../constants/styleThemes";
import TouchableIcon from "../../components/TouchableIcon";
import KeyboardAvoidingWrapper from "../../components/KeyboardAvoidingWrapper";
import { GlobalContext } from "../../context/Provider";

const CreateStepThree = ({ navigation, route }) => {
  const { userData } = useContext(GlobalContext);
  const [preferences, setPreferences] = useState({
    allGender: true,
    onlyWoman: false,
    onlyMen: false,
    smoking: false,
    approvalIns: false,
  });

  const changePreferencesHandler = (field) => {
    let aux = { ...preferences };
    switch (field) {
      case "smoking":
        aux.smoking ? (aux.smoking = false) : (aux.smoking = true);
        break;
      default:
        aux.approvalIns ? (aux.approvalIns = false) : (aux.approvalIns = true);
        break;
    }
    setPreferences(aux);
  };

  const handleGender = (field, value) => {
    let aux = { ...preferences };

    if (field === "allGender")
      if (aux.allGender) {
        if (aux.onlyWoman || aux.onlyMen) aux.allGender = false;
      } else {
        aux.allGender = true;
        aux.onlyMen = false;
        aux.onlyWoman = false;
      }
    else if (field === "onlyWoman")
      if (aux.onlyWoman) {
        if (aux.allGender || aux.onlyMen) aux.onlyWoman = false;
      } else {
        aux.onlyWoman = true;
        aux.onlyMen = false;
        aux.allGender = false;
      }
    else if (field === "onlyMen")
      if (aux.onlyMen) {
        if (aux.onlyWoman || aux.allGender) aux.onlyMen = false;
      } else {
        aux.onlyMen = true;
        aux.allGender = false;
        aux.onlyWoman = false;
      }
    setPreferences(aux);
  };

  const checkValidator = () => {
    var dataAddTravel = {
      smoking: preferences.smoking,
      approvalIns: preferences.approvalIns,
      genderPreference: "allGender",
    };
    if (preferences.onlyWoman) dataAddTravel.genderPreference = "onlyWoman";
    else if (preferences.onlyMen) dataAddTravel.genderPreference = "onlyMen";
    navigation.navigate("CreateStepFour", {
      ...route.params,
      ...dataAddTravel,
    });
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
              value={preferences.allGender}
              type={"allGender"}
              onPress={() => handleGender("allGender")}
              style={{ paddingTop: hp("1.5") }}
              sizeIcon={7}
            />
            {userData.gender === "Mujer" && (
              <TouchableIcon
                value={preferences.onlyWoman}
                type={"onlyWoman"}
                onPress={() => handleGender("onlyWoman")}
                style={{ paddingTop: hp("1.5") }}
                sizeIcon={7}
              />
            )}
            {userData.gender === "Hombre" && (
              <TouchableIcon
                value={preferences.onlyMen}
                type={"onlyMen"}
                onPress={() => handleGender("onlyMen")}
                style={{ paddingTop: hp("1.5") }}
                sizeIcon={7}
              />
            )}
          </View>
          <Text style={{ ...styles.text_firstSection, paddingTop: hp("2%") }}>
            Otros:
          </Text>
          <View
            style={{ flexDirection: "row", justifyContent: "space-around" }}
          >
            <TouchableIcon
              value={preferences.smoking}
              type={"smoking"}
              onPress={() => changePreferencesHandler("smoking")}
              style={{ paddingTop: hp("1.5") }}
              sizeIcon={7}
            />
            <TouchableIcon
              value={preferences.approvalIns}
              type={"approval"}
              onPress={() => changePreferencesHandler("approvalIns")}
              style={{ paddingTop: hp("1.5") }}
              sizeIcon={7}
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
    paddingBottom: hp("6%"),
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
    paddingTop: hp("2%"),
    textAlign: "center",
  },
  text_subTitulo: {
    fontFamily: "Gotham-SSm-Medium",
    fontSize: hp("2.4%"),
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
