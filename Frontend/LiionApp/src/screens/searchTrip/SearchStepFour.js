import React, { useState } from "react";
import { StyleSheet, Text, View, ScrollView } from "react-native";

import Layout from "../../components/Layout";
import ButtonLiion from "../../components/ButtonLiion";
import { COLORS, hp, wp } from "../../constants/styleThemes";
import ResultItemCard from "../../components/ResultItemCard";
import InputPicker from "../../components/InputPicker";
import TouchableIcon from "../../components/TouchableIcon";

const SearchStepFour = ({ navigation, route }) => {
  const { travelData, driverData } = route.params;

  const [orderValues, setOrderValues] = useState({
    valuePickUp: "",
    valueDescent: "",
    valuePay: "",
    handBaggage: false,
    maletaBaggage: false,
  });

  const [errorValues, setErrorValues] = useState({
    errorPay: null,
    errorPickUp: null,
    errorDescent: null,
  });

  const checkValidator = () => {
    const titulo = "¡Solicitud de reserva realizada!";
    const subTitulo =
      "Tu solicitud de reserva fue\ngenerada exitosamente.\nPara chequear el estatus de tu\nviaje chequéalo en Mis viajes en el\nhome.";
    const initialRoute = "SearchStepOne";
    navigation.navigate("SucessScreen", {
      titulo: titulo,
      subTitulo: subTitulo,
      initialRoute: initialRoute,
    });
  };

  const changeValuesHandler = (field, value) => {
    setOrderValues({ ...orderValues, [field]: value });
  };

  const changeErrorHandler = (field, value) => {
    setErrorValues({ ...errorValues, [field]: value });
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
              item={{ travelData, driverData }}
              style={{ paddingLeft: wp(5) }}
              seatOff={true}
            />
            <InputPicker
              style={styles.input}
              errorText={errorValues.errorPickUp}
              onSelect={(selectedItem, index) =>
                changeValuesHandler("valuePickUp", selectedItem)
              }
              value={orderValues.valuePickUp}
              data={["Mujer", "Hombre", "Ninguno de los anteriores"]}
              label="Lugar de recogida"
            />
            <InputPicker
              style={styles.input}
              errorText={errorValues.errorDescent}
              onSelect={(selectedItem, index) =>
                changeValuesHandler("valueDescent", selectedItem)
              }
              value={orderValues.valueDescent}
              data={["Mujer", "Hombre", "Ninguno de los anteriores"]}
              label="Lugar de bajada"
            />
            <View style={styles.viewBaggage}>
              <Text style={styles.labelBaggage}>
                {"Seleccione su equipaje extra"}
              </Text>
              <View
                style={{ flexDirection: "row", justifyContent: "space-evenly" }}
              >
                <TouchableIcon
                  value={orderValues.handBaggage}
                  type={"baggage_hand"}
                  onPress={() =>
                    changeValuesHandler("handBaggage", !orderValues.handBaggage)
                  }
                  style={{ paddingTop: hp("1.5") }}
                  sizeIcon={6}
                />
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
              </View>
            </View>
            <InputPicker
              style={styles.inputPay}
              errorText={errorValues.errorPay}
              onSelect={(selectedItem, index) =>
                changeValuesHandler('valuePay', selectedItem)
              }
              value={orderValues.valuePay}
              data={["Credito", "Debito"]}
              label="Medio de pago"
            />
          </View>
        </View>
        <View style={styles.buttonView}>
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
    justifyContent: "flex-end",
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
