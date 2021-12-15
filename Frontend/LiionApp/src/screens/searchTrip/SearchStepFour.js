import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, ScrollView } from "react-native";
import { orderByDistance } from "geolib";
import { reverseGeocodeAsync } from "expo-location";

import Layout from "../../components/Layout";
import ButtonLiion from "../../components/ButtonLiion";
import { COLORS, hp, wp } from "../../constants/styleThemes";
import ResultItemCard from "../../components/ResultItemCard";
import InputPicker from "../../components/InputPicker";
import TouchableIcon from "../../components/TouchableIcon";

const SearchStepFour = ({ navigation, route }) => {
  const dataTravel = route.params;

  const [orderValues, setOrderValues] = useState({
    valuePickUp: {},
    valueDescent: {},
    valuePay: "",
    handBaggage: false,
    maletaBaggage: false,
  });

  const [errorValues, setErrorValues] = useState({
    errorPay: null,
    errorPickUp: null,
    errorDescent: null,
  });

  const [valuePickUp, SetValuePickUp] = useState("");
  const [valueDescent, SetValueDescent] = useState("");

  const [pickersLabel, setPickersLabel] = useState({
    pickUp: [],
    putDown: [],
  });

  const [pickersCoord, setPickersCoord] = useState({
    pickUp: [],
    putDown: [],
  });

  const changeValuesHandler = (field, value) => {
    setOrderValues({ ...orderValues, [field]: value });
  };

  useEffect(() => {
    (async () => {
      var origin = {
        latitude: dataTravel.addresses.origin.location.lat,
        longitude: dataTravel.addresses.origin.location.lng,
      };
      var destination = {
        latitude: dataTravel.addresses.destination.location.lat,
        longitude: dataTravel.addresses.origin.location.lng,
      };
      var originSort = orderByDistance(
        origin,
        dataTravel.routeCoordinates
      ).slice(0, 4);
      var destinationSort = orderByDistance(
        destination,
        dataTravel.routeCoordinates
      ).slice(0, 4);

      var aux = { ...pickersLabel };
      aux.pickUp = await getReverseGeocode(originSort);
      aux.putDown = await getReverseGeocode(destinationSort);
      setPickersLabel(aux);

      var aux_ = { ...pickersCoord };
      aux_.pickUp = originSort;
      aux_.putDown = destinationSort;
      setPickersCoord(aux_);
    })();
  }, []);

  const getReverseGeocode = async (arrayOfObjCoord) => {
    var labels = [];
    for (let i = 0; i < arrayOfObjCoord.length; i++) {
      var address = await reverseGeocodeAsync(arrayOfObjCoord[i]);
      var nameAdrress =
        address[0].street + " " + address[0].name + ", " + address[0].city;
      labels.push(nameAdrress);
    }
    return labels;
  };
  useEffect(() => {
    var aux = { ...errorValues };
    if (orderValues.valuePay != "") aux.errorPay = null;
    if (valuePickUp != "") aux.errorPickUp = null;
    if (valueDescent != "") aux.errorDescent = null;
    setErrorValues(aux);
  }, [orderValues.valuePay, valuePickUp, valueDescent]);

  const checkValidator = () => {
    var aux = { ...errorValues };
    orderValues.valuePay == ""
      ? (aux.errorPay = "Falta tu medio de pago")
      : (aux.errorPay = null);
    valuePickUp == ""
      ? (aux.errorPickUp = "Falta tu subida")
      : (aux.errorPickUp = null);
    valueDescent == ""
      ? (aux.errorDescent = "Falta tu bajada")
      : (aux.errorDescent = null);
    setErrorValues(aux);

    if (valuePickUp != "" && valueDescent != "" && orderValues.valuePay != "") {
      const titulo = "¡Solicitud de reserva realizada!";
      const subTitulo =
        "Tu solicitud de reserva fue\ngenerada exitosamente.\nPara chequear el estatus de tu\nviaje chequéalo en Mis viajes en el\nhome.";
      const finalTabRoute = "TravelPasajeroTab";
      navigation.navigate("SucessScreen", {
        titulo: titulo,
        subTitulo: subTitulo,
        finalTabRoute: finalTabRoute,
      });
    }
  };

  return (
    <Layout>
      <ScrollView>
        <View>
          <Text style={styles.titleStyle}>
            Confirmación de solicitud de reserva
          </Text>
          <View style={{ paddingTop: hp(2) }}>
            <ResultItemCard
              item={dataTravel}
              style={{ paddingLeft: wp(5) }}
              seatOff={true}
            />
            <InputPicker
              style={styles.input}
              errorText={errorValues.errorPickUp}
              onSelect={(selectedItem, index) => {
                SetValuePickUp(selectedItem);
                changeValuesHandler("valuePickUp", pickersCoord.pickUp[index]);
              }}
              value={valuePickUp}
              data={pickersLabel.pickUp}
              label="Lugar de recogida"
            />
            <InputPicker
              style={styles.input}
              errorText={errorValues.errorDescent}
              onSelect={(selectedItem, index) => {
                SetValueDescent(selectedItem);
                changeValuesHandler(
                  "valueDescent",
                  pickersCoord.putDown[index]
                );
              }}
              value={valueDescent}
              data={pickersLabel.putDown}
              label="Lugar de bajada"
            />
            {(dataTravel.extraBaggage.bigBags != 0 ||
              dataTravel.extraBaggage.personalItem != 0) && (
              <View style={styles.viewBaggage}>
                <Text style={styles.labelBaggage}>
                  {"Seleccione su equipaje extra"}
                </Text>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-evenly",
                  }}
                >
                  {dataTravel.extraBaggage.personalItem != 0 && (
                    <TouchableIcon
                      value={orderValues.handBaggage}
                      type={"baggage_hand"}
                      onPress={() =>
                        changeValuesHandler(
                          "handBaggage",
                          !orderValues.handBaggage
                        )
                      }
                      style={{ paddingTop: hp("1.5") }}
                      sizeIcon={6}
                    />
                  )}
                  {dataTravel.extraBaggage.bigBags != 0 && (
                    <TouchableIcon
                      value={orderValues.maletaBaggage}
                      type={"baggage_heavy"}
                      onPress={() =>
                        changeValuesHandler(
                          "maletaBaggage",
                          !orderValues.maletaBaggage
                        )
                      }
                      style={{ paddingTop: hp("1.5") }}
                      sizeIcon={6}
                    />
                  )}
                </View>
              </View>
            )}
            <InputPicker
              style={styles.inputPay}
              errorText={errorValues.errorPay}
              onSelect={(selectedItem, index) =>
                changeValuesHandler("valuePay", selectedItem)
              }
              value={orderValues.valuePay}
              data={["Credito", "Debito"]}
              label="Medio de pago"
            />
          </View>
        </View>
        <View
          style={[
            styles.buttonView,
            dataTravel.extraBaggage.bigBags === 0 &&
              dataTravel.extraBaggage.personalItem === 0 && {
                paddingTop: hp("8%"),
              },
          ]}
        >
          <ButtonLiion
            title="Confirmar solicitud"
            styleView={styles.button}
            onPress={() => checkValidator()}
          />
        </View>
      </ScrollView>
    </Layout>
  );
};

export default SearchStepFour;

const styles = StyleSheet.create({
  buttonView: {
    flex: 1,
    paddingTop: hp("2%"),
    paddingBottom: hp("2%"),
  },
  button: {
    width: wp("78.6%"),
    height: hp("4.8%"),
    alignSelf: "center",
  },
  titleStyle: {
    fontSize: wp("8%"),
    color: COLORS.TURKEY,
    textAlign: "center",
    marginHorizontal: wp("5%"),
    fontFamily: "Gotham-SSm-Medium",
  },
  input: {
    marginTop: hp("1.8%"),
    width: wp("89%"),
    alignSelf: "center",
  },
  inputPay: {
    marginTop: hp("1.8%"),
    marginLeft: wp(2),
    width: wp("40%"),
    alignSelf: "flex-start",
  },
  viewBaggage: {
    borderRadius: 17,
    borderWidth: 1,
    backgroundColor: "white",
    borderColor: COLORS.BORDER_COLOR,
    width: wp("89%"),
    alignSelf: "center",
    marginTop: hp("1.8%"),
  },
  labelBaggage: {
    top: hp(-1),
    left: hp(1.4),

    fontFamily: "Gotham-SSm-Medium",
    fontSize: hp("1.43%"),
    backgroundColor: "white",
    position: "absolute",
    color: COLORS.LEAD,
  },
});
