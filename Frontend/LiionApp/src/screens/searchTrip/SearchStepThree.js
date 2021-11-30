import React from "react";
import { StyleSheet, Text, View, Image, ScrollView } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Avatar } from "react-native-paper";

import Layout from "../../components/Layout";
import ButtonLiion from "../../components/ButtonLiion";
import { COLORS, hp, wp } from "../../constants/styleThemes";
import MapViewCustom from "../../components/MapViewCustom";
import ResultItemCard from "../../components/ResultItemCard";
import TouchableIcon from "../../components/TouchableIcon";

import moment from "moment";
import "moment/locale/es";
moment.locale("es");

const SearchStepThree = ({ navigation, route }) => {
  const { travelData, driverData } = route.params;

  const checkValidator = () => {
    navigation.navigate("SearchStepFour", route.params);
  };

  const genderComponent = () => {
    let gender;
    if (travelData.allGender) gender = "allGender";
    else if (travelData.onlyWoman) gender = "woman";
    else gender = "men";

    return <TouchableIcon value={true} type={gender} style={{}} sizeIcon={7} />;
  };
  const smokeComponent = () => {
    let smokeType;
    travelData.smoking ? (smokeType = "smoking") : (smokeType = "noSmoking");

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
        <View style={{ flexDirection: "column" }}>
          <TouchableIcon value={true} type={type} style={{}} sizeIcon={7} />
          {type === "baggage_hand" ? (
            <Text style={styles.subText_view}>{"Maximo\n55x35x25 [cm]"}</Text>
          ) : (
            <Text style={styles.subText_view}>{"Desde\n55x35x25 [cm]"}</Text>
          )}
        </View>
      );
  };

  const passengerPictureState = (
    nSeatOfVehicule,
    nSeatTravel,
    nSeatAvaliable
  ) => {
    var output = [];
    var cnt = 0;

    for (let i = 0; i < nSeatAvaliable; i++) {
      output.push(
        <Avatar.Image
          key={cnt}
          source={require("../../../assets/images/passengerPicture.png")}
          style={{
            marginTop: hp(1),
            marginBottom: hp(1),
            backgroundColor: "white",
          }}
          size={hp("7")}
        />
      );
      cnt += 1;
    }
    for (let i = 0; i < nSeatTravel - nSeatAvaliable; i++) {
      output.push(
        <Avatar.Image
          key={cnt}
          source={require("../../../assets/images/passengerPictureOccupied.png")}
          style={{
            marginTop: hp(1),
            marginBottom: hp(1),
            backgroundColor: "white",
          }}
          size={hp("7")}
        />
      );
      cnt += 1;
    }
    for (let i = 0; i < nSeatOfVehicule - nSeatTravel; i++) {
      output.push(
        <Avatar.Image
          key={cnt}
          source={require("../../../assets/images/passengerPictureOff.png")}
          style={{
            marginTop: hp(1),
            marginBottom: hp(1),
            backgroundColor: "white",
          }}
          size={hp("7.1")}
        />
      );
      cnt += 1;
    }

    return output;
  };

  return (
    <Layout>
      <ScrollView showsVerticalScrollIndicator={true}>
        <View style={styles.topPanel}>
          <MapViewCustom
            dimensions={{ height: hp("30%"), width: wp("100%") }}
            coordinates={travelData.coordinates}
            mapDirections={false}
            showGps={false}
            ArrowBack={() => navigation.goBack()}
          />
        </View>
        <Text style={styles.titleStyle}>
          {"    " + moment(travelData.date, "DD-MM-YYYY").format("LL")}
        </Text>
        <View style={styles.viewBorder}>
          <ResultItemCard
            item={{ travelData, driverData }}
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
              {driverData.typeVehicule}
            </Text>
            <Text style={styles.vehicleModelColor}>{driverData.carcolor}</Text>
          </View>
        </View>

        <Text style={styles.text_titule}>Estado asientos:</Text>

        <View
          style={[
            styles.viewBorder,
            {
              flexDirection: "row",
              justifyContent: "space-evenly",
            },
          ]}
        >
          {passengerPictureState(
            driverData.nPassengerSeats,
            travelData.nOfSeats,
            travelData.seatsAvaliable
          )}
        </View>
        <View>
          <Text style={styles.text_titule}>Preferencias:</Text>
          <View style={styles.characteristicView}>
            {genderComponent()}
            {smokeComponent()}
          </View>

          <Text style={styles.text_titule}>Facilidades:</Text>
          <View style={styles.characteristicView}>
            {facilityComponent(travelData.approvalIns, "approval")}
            {facilityComponent(driverData.usb, "usb")}
            {facilityComponent(driverData.airConditioning, "airConditioning")}
            {!driverData.airConditioning &&
              !driverData.usb &&
              !travelData.approvalIns && (
                <TouchableIcon
                  value={true}
                  type={"sadFace"}
                  style={{}}
                  sizeIcon={7}
                />
              )}
          </View>
          <Text style={styles.text_titule}>Equipaje extra permitido:</Text>
          <Text style={styles.text_subTitule}>
            {"(Todos tienen derecho a un equipaje\n de mano)"}
          </Text>
          <View style={styles.characteristicView}>
            {packageComponent(travelData.personalItem, "baggage_hand")}
            {packageComponent(travelData.bigBags, "baggage_heavy")}
            {travelData.personalItem <= 0 && travelData.bigBags <= 0 && (
              <TouchableIcon
                value={true}
                type={"noBaggage"}
                style={{}}
                sizeIcon={7}
              />
            )}
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
            {"Visto " + travelData.views + " veces"}
          </Text>
        </View>

        <View style={styles.buttonView}>
          <ButtonLiion
            title="Iniciar proceso de reserva"
            styleView={styles.button}
            onPress={() => checkValidator()}
          />
        </View>
      </ScrollView>
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
    paddingBottom: hp("5%"),
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
    marginTop: hp(1),
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
