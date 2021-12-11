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
import Loading from "../../components/Loading";

import moment from "moment";
import "moment/locale/es";
moment.locale("es");

const CreateStepTwo = ({ navigation, route }) => {
  const { userFirestoreData } = useContext(GlobalContext);
  const [loading, setLoading] = useState(true);

  const hardCodedGpsData = useRef([
    {
      latitude: route.params.originDetails.location.lat,
      longitude: route.params.originDetails.location.lng,
    },
    {
      latitude: route.params.destinationDetails.location.lat,
      longitude: route.params.destinationDetails.location.lng,
    },
  ]);

  const [nOfSeats, setnOfSeats] = useState(0);
  const [price, setPrice] = useState(0);
  const [mapInfo, setMapInfo] = useState({});
  const [totalMoney, setTotalMoney] = useState(0);

  const [focusEmailInput, setfocusPriceInput] = useState(false);

  const [errorPrice, setErrorPrice] = useState(null);
  const [errornSeat, setErrornSeat] = useState(COLORS.TURKEY);

  useEffect(() => {
    if (focusEmailInput) setErrorPrice(false);
  }, [focusEmailInput]);

  useEffect(() => {
    if (errornSeat === COLORS.WARN_RED) setErrornSeat(COLORS.TURKEY);
  }, [nOfSeats]);

  useEffect(() => {
    //Supuestamente aqui se hace el calculo del precio, que incluye valor de la bencina ocupada + peajes
    //Simularemos, que el costo de los peajes es 0, que la bencina esta a 900 el L, y que el auto rinde 15 km/L
    setTotalMoney(Math.round((mapInfo.distance / 15) * 900));
    setLoading(false);
  }, [mapInfo]);

  const NumberFormatter = (str) => {
    let n = str.replace(/\D/g, "");
    let nn = Number(n);
    setPrice(nn);
  };

  //2
  //js si se ejecuta secuencialmente en JS (apa la prueba reyKING)
  //console.log('render ', typeof mapInfo === 'undefined')

  //useEffect (() => {
  //console.log(mapInfo)
  //console.log('useffect ',typeof mapInfo === 'undefined')
  //}, [mapInfo])

  const ButtonGo = () => {
    if (price > 0 && nOfSeats > 0) {
      mapInfo["routeCoordinates"] = mapInfo["coordinates"];
      mapInfo["distanceMetter"] = mapInfo["distance"];
      mapInfo["durationMinutes"] = mapInfo["duration"];
      delete mapInfo.coordinates;
      delete mapInfo.duration;
      delete mapInfo.distance;

      navigation.navigate("CreateStepThree", {
        nSeatsOffered: nOfSeats,
        costPerSeat: price,
        totalTravelCost: totalMoney,
        ...route.params,
        ...mapInfo,
      });
    } else {
      if (price < 1) setErrorPrice(" ");
      if (nOfSeats < 1) setErrornSeat(COLORS.WARN_RED);
    }
  };

  return (
    <Layout>
      {loading ? (
        <Loading />
      ) : (
        <KeyboardAvoidingWrapper>
          <View style={styles.topPanel}>
            <MapViewCustom
              dimensions={{ height: hp("55%"), width: wp("100%") }}
              coordinates={hardCodedGpsData.current}
              mapDirections={true}
              showGps={false}
              ArrowBack={() => navigation.goBack()}
              onDataExtract={(value) => {
                setMapInfo(value);
              }}
            />
          </View>
          <View style={styles.bottomPanel}>
            <View style={styles.InfoView}>
              <Text style={styles.titleStyle}>
                {"    " + moment(route.params.date, "DD-MM-YYYY").format("LL")}
              </Text>

              <View style={styles.bar2}>
                <ShowTravel
                  style={styles.inputLocation}
                  timeStart={moment(route.params.startTime, "hh:mm").format(
                    "LT"
                  )}
                  timeEnd={moment(route.params.startTime, "hh:mm")
                    .add(mapInfo.duration, "minutes")
                    .format("LT")}
                  labelO={route.params.originDetails.formatted_address}
                  labelD={route.params.destinationDetails.formatted_address}
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
                  Los demás conductores en trayectos similares cobran $
                  {numberWithSep(totalMoney * 2)}
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
                    rightButtonBackgroundColor={errornSeat}
                    leftButtonBackgroundColor={errornSeat}
                    totalHeight={hp("7%")}
                    totalWidth={wp("22%")}
                    minValue={0}
                    maxValue={userFirestoreData.driverData.carSeats}
                    borderColor={COLORS.BORDER_COLOR}
                  />
                </View>
              </View>
              <View>
                <Text style={styles.textPSeats}>Valor por asiento</Text>
                <InputLiion
                  style={styles.input}
                  label=""
                  errorText={errorPrice}
                  value={price.toString()}
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
      )}
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
