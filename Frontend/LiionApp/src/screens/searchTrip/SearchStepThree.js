import React, { useContext } from "react";
import { StyleSheet, Text, View, Image } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import Layout from "../../components/Layout";
import ButtonLiion from "../../components/ButtonLiion";
import { COLORS, hp, wp } from "../../constants/styleThemes";
import MapViewCustom from "../../components/MapViewCustom";
import KeyboardAvoidingWrapper from "../../components/KeyboardAvoidingWrapper";
import ResultItemCard from "../../components/ResultItemCard";
import { GlobalContext } from "../../context/Provider";
import TouchableIcon from "../../components/TouchableIcon";

import moment from "moment";
import "moment/locale/es";
moment.locale("es");

const SearchStepThree = ({ navigation, route }) => {
  const { userFirestoreData } = useContext(GlobalContext);

  const checkValidator = () => {
    navigation.navigate("SearchStepFour", route.params);
  };

  const genderComponent = () => {
    let gender;
    if (route.params.travelData.allGender) gender = "allGender";
    else if (route.params.travelData.onlyWoman) gender = "woman";
    else gender = "men";

    return <TouchableIcon value={true} type={gender} style={{}} sizeIcon={7} />;
  };
  const smokeComponent = () => {
    let smokeType;
    route.params.travelData.smoking
      ? (smokeType = "smoking")
      : (smokeType = "noSmoking");

    return (
      <TouchableIcon value={true} type={smokeType} style={{}} sizeIcon={7} />
    );
  };

  const facilityComponent = (type, nameIcon) => {
    if (type)
      return (
        <TouchableIcon value={true} type={nameIcon} style={{}} sizeIcon={7} />
      );
  };

  const packageComponent = (cntBag, type) => {
    if (cntBag > 0)
      return (
        <View style={{flexDirection:'column'}}>
          <TouchableIcon value={true} type={type} style={{}} sizeIcon={7} />
          {type === "baggage_hand" ? (
            <Text style={styles.subText_view}>{"Maximo\n55x35x25 [cm]"}</Text>
          ) : (
            <Text style={styles.subText_view}>{"Desde\n55x35x25 [cm]"}</Text>
          )}
        </View>
      );
  };

  return (
    <Layout>
      <KeyboardAvoidingWrapper>
        <View style={styles.topPanel}>
          <MapViewCustom
            dimensions={{ height: hp("30%"), width: wp("100%") }}
            coordinates={route.params.travelData.coordinates}
            mapDirections={false}
            showGps={false}
            ArrowBack={() => navigation.goBack()}
          />
        </View>
        <Text style={styles.titleStyle}>
          {"    " +
            moment(route.params.travelData.date, "DD-MM-YYYY").format("LL")}
        </Text>
        <View style={styles.viewBorder}>
          <ResultItemCard
            item={route.params}
            style={{ elevation: hp(0), paddingLeft: wp(5) }}
            seatOff={true}
          />
        </View>
        <View style={[styles.viewVehicule, styles.viewBorder]}>
          <Image
            source={require("../../../assets/images/teslaX.png")}
            style={styles.teslaImage}
          />
          <View>
            <Text
              style={{ fontFamily: "Gotham-SSm-Medium", fontSize: wp("4%") }}
            >
              {" "}   

              {route.params.driverData.typeVehicule}
            </Text>
            <Text style={styles.vehicleModelColor}>
              {route.params.driverData.carcolor}
            </Text>
          </View>
        </View>
        <View>
          <Text style={styles.text_titule}>Pasajeros:</Text>
        </View>
        <View>
          <Text style={styles.text_titule}>Preferencias:</Text>
          <View style={styles.characteristicView}>
            {genderComponent()}
            {smokeComponent()}
          </View>

          <Text style={styles.text_titule}>Facilidades:</Text>
          <View style={styles.characteristicView}>
            {facilityComponent(route.params.travelData.approvalIns, "approval")}
            {facilityComponent(route.params.driverData.usb, "usb")}
            {facilityComponent(
              route.params.driverData.airConditioning,
              "airConditioning"
            )}
          </View>
          <Text style={styles.text_titule}>Equipaje extra permitido:</Text>
          <Text style={styles.text_subTitule}>
            {"(Todos tienen derecho a un equipaje\n de mano)"}
          </Text>
          <View style={styles.characteristicView}>
            {packageComponent(
              route.params.travelData.personalItem,
              "baggage_hand"
            )}
            {packageComponent(route.params.travelData.bigBags, "baggage_heavy")}
          </View>
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            paddingBottom: hp(2),
          }}
        >
          <MaterialCommunityIcons name="eye" size={24} color="black" />
          <Text style={styles.text_view}>
            {"Visto " + route.params.travelData.views + " veces"}
          </Text>
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
  viewBorder: {
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
  viewVehicule: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    paddingTop: hp(2),
    paddingBottom: hp(2),
  },
  vehicleModelColor: {
    fontFamily: "Gotham-SSm-Medium",
    fontSize: wp("3.5%"),
    marginLeft: wp("1.5%"),
    color: COLORS.LEAD,
  },
  teslaImage: {
    width: wp("27.5%"),
    height: hp("6.9%"),
    marginRight: wp("1%"),
  },
  text_titule: {
    fontSize: hp("2%"),
    fontFamily: "Gotham-SSm-Bold",
    color: COLORS.BLACK,
    marginLeft: wp(5),
  },
  text_subTitule: {
    fontSize: hp("1.5%"),
    fontFamily: "Gotham-SSm-Medium",
    color: COLORS.BLACK,
    marginLeft: wp(5),
  },
  text_view: {
    color: COLORS.BLACK,
    fontFamily: "Gotham-SSm-Medium",
    fontSize: hp("2.1%"),
    paddingLeft: wp(3),
  },
  characteristicView: {
    flexDirection: "row",
    justifyContent: "center",
    paddingBottom: hp(2),
    justifyContent: "space-evenly",
  },
  subText_view: {
    color: COLORS.BLACK,
    fontFamily: "Gotham-SSm-Medium",
    fontSize: hp("1.4%"),
    textAlign: "center",
  },
});
