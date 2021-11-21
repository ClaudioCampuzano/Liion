import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { useNavigation } from '@react-navigation/native';

import Layout from "../../components/Layout";
import ButtonLiion from "../../components/ButtonLiion";
import { COLORS, hp, wp } from "../../constants/styleThemes";
import MapViewCustom from "../../components/MapViewCustom";
import KeyboardAvoidingWrapper from "../../components/KeyboardAvoidingWrapper";

const SearchStepThree = ({navigation, route }) => {
  const {coordinates} = route.params.travelData
  
  const checkValidator = () => {
    navigation.navigate("SearchStepFour");
  };
  return (
    <Layout>
    <KeyboardAvoidingWrapper> 
    <View style={styles.topPanel}>
          <MapViewCustom
            dimensions={{ height: hp("30%"), width: wp("100%") }}
            coordinates={coordinates}
            mapDirections={false}
            showGps={false}
            ArrowBack={() => navigation.goBack()}
          />
        </View>
      <View style={styles.buttonView}>
        <ButtonLiion
          title="Ingresar"
          styleView={styles.button}
          onPress={() => checkValidator()}
        />
      </View>
      </KeyboardAvoidingWrapper>
    </Layout>
  );
};

export default SearchStepThree;

const styles = StyleSheet.create({
  topPanel: {
    height: hp("30%"),
    width: wp("100%"),
  },
  buttonView: {
    flex: 1,
    justifyContent: "flex-end",
    paddingBottom: hp("8%"),
  },
  button: {
    width: wp("78.6%"),
    height: hp("4.8%"),
    alignSelf: "center",
  },
});
