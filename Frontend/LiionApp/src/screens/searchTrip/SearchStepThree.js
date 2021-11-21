import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { useNavigation } from "@react-navigation/native";

import Layout from "../../components/Layout";
import ButtonLiion from "../../components/ButtonLiion";
import { COLORS, hp, wp } from "../../constants/styleThemes";
import MapViewCustom from "../../components/MapViewCustom";
import KeyboardAvoidingWrapper from "../../components/KeyboardAvoidingWrapper";
import ShowTravel from "../../components/ShowTravel";

import moment from "moment";
import "moment/locale/es";
moment.locale("es");

const SearchStepThree = ({ navigation, route }) => {
  const { coordinates, time, duration, addresses, date } =
    route.params.travelData;

  const checkValidator = () => {
    navigation.navigate("SearchStepFour", route.params);
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
        <Text style={styles.titleStyle}>
          {"    " + moment(date, "DD-MM-YYYY").format("LL")}
        </Text>
        <View style={styles.viewTravel}>
          <ShowTravel
            style={styles.inputLocation}
            timeStart={moment(time, "hh:mm").format("LT")}
            timeEnd={moment(time, "hh:mm")
              .add(duration, "minutes")
              .format("LT")}
            labelO={addresses.origin}
            labelD={addresses.destination}
            dirTextSize={wp("3.2%")}
          />
        </View>
        <View style={styles.buttonView}>
          <ButtonLiion
            title="Solicitar reserva"
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
  inputLocation: {
    marginTop: hp("1%"),
    width: wp("78.6%"),
    height: hp("12%"),
    alignSelf: "center",
  },
  viewTravel: {
    borderBottomColor: COLORS.LIGHT_LEAD,
    borderBottomWidth: 1,
    borderRadius: wp("3.8%"),
    borderBottomStartRadius: wp("5%"),
    borderBottomEndRadius: wp("5%"),
  },
  titleStyle: {
    fontFamily: "Gotham-SSm-Bold",
    fontSize: hp("2.5%"),
    paddingLeft: wp("7%"),
    paddingTop: hp("1.5%"),
    color: COLORS.BLACK,
  },
});
