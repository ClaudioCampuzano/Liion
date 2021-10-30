import React, { useState, useContext, useEffect, useRef } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import { GlobalContext } from "../../context/Provider";
import Layout from "../../components/Layout";
import { COLORS, hp, wp } from "../../constants/styleThemes";
import ButtonLiion from "../../components/ButtonLiion";
import ShowTravel from "../../components/ShowTravel";
import NumericInput from "react-native-numeric-input";
import InputLiion from "../../components/InputLiion";
import KeyboardAvoidingWrapper from "../../components/KeyboardAvoidingWrapper";

import MapViewCustom from "../../components/MapViewCustom";

import { numberWithSep } from "../../utils/utils";

const CreateStepTwo = ({ navigation, route }) => {
  //console.log(route.params.createValues)
  

  

  const hardCodedGpsData = useRef([
    { latitude: route.params.createValues.addresses.origin.location.lat, longitude: route.params.createValues.addresses.origin.location.lng },
    { latitude: route.params.createValues.addresses.destination.location.lat, longitude: route.params.createValues.addresses.destination.location.lng },
  ]);
 

  const [nOfSeats, setnOfSeats] = useState(0);
  const [price, setPrice] = useState(0);

  const [errorPrice, setErrorPrice] = useState(null);
  const [errornSeat, setErrornSeat] = useState(COLORS.BORDER_COLOR);

  const [focusEmailInput, setfocusPriceInput] = useState(false);

  useEffect(() => {
    if (focusEmailInput) setErrorPrice(false);
  }, [focusEmailInput]);

  useEffect(() => {
    setErrornSeat(COLORS.BORDER_COLOR)
  }, [nOfSeats])

  const ButtonGo = () => {
    if (price > 0 && nOfSeats > 0) navigation.navigate("CreateStepThree");
    else {
      if (price < 1) setErrorPrice(" ");
      if (nOfSeats < 1) setErrornSeat(COLORS.WARN_RED);
    }
  };

  /*
  const { userFirestoreData, getState2 } = useContext(GlobalContext);
  useEffect(() => {
    let flag =
      Object.keys(userFirestoreData).length !== 0 &&
      Object.getPrototypeOf(userFirestoreData) === Object.prototype;
    if (userFirestoreData && flag) {
      console.log("Create1");
    }
  }, [getState2]);
  */

  const [totalMoney, setTotalMoney] = useState(0);
  useEffect(() => {
    setTotalMoney(nOfSeats * price);
  }, [nOfSeats, price]);

  const NumberFormatter = (str) => {
    let n = str.replace(/\D/g, "");
    let nn = Number(n);
    setPrice(nn);
  };
  
  

  return (
    <Layout>
      <KeyboardAvoidingWrapper>
        <View style={styles.topPanel}>
          <MapViewCustom
            dimensions={{ height: hp("55%"), width: wp("100%") }}
            coordinates={hardCodedGpsData.current}
            mapDirections={true}
            showGps={false}
            onDataChange={() => navigation.navigate("CreateStepOne")}
            //onDataExtract={(value)=> console.log(value)}
          />
        </View>
        <View style={styles.bottomPanel}>
          <View style={styles.InfoView}>
            <Text style={styles.titleStyle}>
              {"    " +
                route.params.createValues.date +
                " | " +
                route.params.createValues.time}
            </Text>

            <View style={styles.bar2}>
              <ShowTravel
                style={styles.inputLocation}
                timeStart={route.params.createValues.time}
                timeEnd={"N/A"}
                labelO={
                  route.params.createValues.addresses.origin.formatted_address
                }
                labelD={
                  route.params.createValues.addresses.destination
                    .formatted_address
                }
                dirTextSize={wp("2.5%")}
              />
            </View>
            <View style={styles.textStyle}>
              <Text style={styles.textColor}>
                Costo total del viaje ${numberWithSep(totalMoney)}
                <Ionicons
                  name="alert-circle-outline"
                  size={wp("4.5")}
                  color={COLORS.WARN_YELLOW}
                />
              </Text>
              <Text style={styles.textColor}>
                Los demás conductores en trayectos similares cobran 25.000
              </Text>
            </View>
          </View>
          <View style={styles.middleSection}>
            <View style={{ paddingBottom: wp("1%") }}>
              <View>
                <Text style={styles.textNSeats}>N° de asientos</Text>
                <NumericInput
                  value={nOfSeats}
                  onChange={(n) => setnOfSeats(n)}
                  rounded
                  type="plus-minus"
                  textColor="#26547C"
                  iconStyle={{ color: COLORS.WHITE }}
                  rightButtonBackgroundColor={COLORS.TURKEY}
                  leftButtonBackgroundColor={COLORS.TURKEY}
                  totalHeight={hp("7%")}
                  totalWidth={wp("22%")}
                  minValue={0}
                  maxValue={10}
                  borderColor={errornSeat}
                />
              </View>
            </View>
            <View>
              <Text style={styles.textPSeats}>Valor por asiento</Text>
              <InputLiion
                style={styles.input}
                label=""
                errorText={errorPrice}
                //value={price.toString()}
                secureTextEntry={false}
                onBlur={() => setfocusPriceInput(false)}
                onFocus={() => setfocusPriceInput(true)}
                onChangeText={(price) => NumberFormatter(price)}
                keyboardType="numeric"
              />
            </View>
          </View>
          <View style={styles.buttonView}>
            <ButtonLiion
              title="Siguiente"
              styleView={styles.button}
              onPress={() => ButtonGo()}
            />
          </View>
        </View>
      </KeyboardAvoidingWrapper>
    </Layout>
  );
};

export default CreateStepTwo;

const styles = StyleSheet.create({
  topPanel: {
    height: hp("55%"),
    width: wp("100%"),
  },
  bottomPanel: {
    height: hp("45%"),
    width: wp("100%"),
  },
  InfoView: {
    height: hp("31%"),
    backgroundColor: COLORS.WHITE,
    flex: 5,
    borderTopWidth: 1,
    borderColor: COLORS.LIGHT_LEAD,
  },
  buttonView: {
    flex: 1,
    height: hp("7%"),
    backgroundColor: COLORS.WHITE,
    justifyContent: "flex-end",
    paddingBottom: hp("1.5%"),
  },
  button: {
    width: wp("78.6%"),
    height: hp("4.8%"),
    alignSelf: "center",
  },
  titleStyle: {
    fontFamily: "Gotham-SSm-Bold",
    fontSize: hp("2.5%"),
    paddingLeft: wp("7%"),
    paddingTop: hp("1.5%"),
    color: COLORS.BLACK,
  },
  inputLocation: {
    marginTop: hp("1%"),
    width: wp("78.6%"),
    height: hp("12%"),
    alignSelf: "center",
  },
  bar2: {
    borderBottomColor: COLORS.LIGHT_LEAD,
    borderBottomWidth: 1,
    borderRadius: wp("3.8%"),
    borderBottomStartRadius: wp("5%"),
    borderBottomEndRadius: wp("5%"),
  },
  textStyle: {
    fontSize: wp("100%"),
    paddingHorizontal: wp("6%"),
    alignItems: "center",
    flex: 1,
  },
  textColor: {
    color: COLORS.TURKEY,
    fontFamily: "Gotham-SSm-Medium",
    textAlign: "center",
  },
  middleSection: {
    flex: 2,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingLeft: wp("5%"),
  },
  textNSeats: {
    fontFamily: "Gotham-SSm-Medium",
    paddingLeft: wp("1%"),
    fontSize: hp("1.3%"),
    color: COLORS.LEAD,
  },
  textPSeats: {
    fontFamily: "Gotham-SSm-Medium",
    paddingLeft: wp("1%"),
    fontSize: hp("1.3%"),
    color: COLORS.LEAD,
  },
  input: {
    width: wp("35%"),
    height: hp("7%"),
    paddingRight: wp("5.5%"),
  },
});
