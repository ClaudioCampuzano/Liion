import React, { useState, useContext, useEffect, useRef } from "react";
import { StyleSheet, Text, View, Image } from "react-native";
import {
  Ionicons,
  MaterialIcons,
  Feather,
  MaterialCommunityIcons,
  FontAwesome5,
} from "@expo/vector-icons";
import Layout from "../../components/Layout";
import ButtonLiion from "../../components/ButtonLiion";
import { COLORS, hp, wp } from "../../constants/styleThemes";
import ShowTravel from "../../components/ShowTravel";
import { GlobalContext } from "../../context/Provider";
import moment from "moment";
import "moment/locale/es";
moment.locale("es");

const CreateStepFive = ({ navigation, route }) => {
  const { userFirestoreData } = useContext(GlobalContext);
  //console.log(route.params.time)

  const checkValidator = () => {
    const titulo = "¡Creación de viaje realizada!";
    const subTitulo =
      "Tu creación de viaje fue generada exitosamente.\nPara chequear el estatus de tu\nviaje chequéalo en Mis viajes\n(conductor) en el home.";
    const initialRoute = "CreateStepOne";
    navigation.navigate("SucessScreen", {
      titulo: titulo,
      subTitulo: subTitulo,
      initialRoute: initialRoute,
    });
  };
  const vars = useRef({
    origin: "Rancagua, Region de Ohiggins",
    destiny: "San Fernando, Region de Ohiggins",
    nOfSeats: 3,
    pricerPerSeat: 4000,
    bags: [1, 0, 1],
    vehicle: { model: "Tesla Model X", color: "Blanco", patente: "ABCD12" },
  });

  const getSex = () => {
    if (route.params.allGender) {
      return (
        <View style={styles.iconTextInfo}>
          <Text style={styles.iconTextInfoText}>Todo Género</Text>
          <MaterialCommunityIcons
            name={"gender-male-female"}
            size={hp("2")}
            color={COLORS.TURKEY}
            style={{ alignSelf: "center" }}
          />
        </View>
      );
    } else if (route.params.onlyWoman) {
      return (
        <View style={styles.iconTextInfo}>
          <Text style={styles.iconTextInfoText}>Solo Mujeres</Text>
          <MaterialCommunityIcons
            name={"gender-female"}
            size={hp("2")}
            color={COLORS.TURKEY}
            style={{ alignSelf: "center" }}
          />
        </View>
      );
    } else {
      return (
        <View style={styles.iconTextInfo}>
          <Text style={styles.iconTextInfoText}>Solo Hombres</Text>
          <MaterialCommunityIcons
            name={"gender-male"}
            size={hp("2")}
            color={COLORS.TURKEY}
            style={{ alignSelf: "center" }}
          />
        </View>
      );
    }
  };

  return (
    <Layout>
      <View style={styles.container}>
        <View style={styles.contentFive}>
          <View style={styles.titleContainer}>
            <Text style={styles.titleStyle}>
              Confirmación de creacion de viaje
            </Text>
          </View>
          <View style={styles.routeContainer}>
            <Text style={styles.rutaStyle}>Ruta</Text>
            <ShowTravel
              style={styles.inputLocation}
              timeStart={route.params.time}
              timeEnd={moment(route.params.time, "hh:mm")
                .add(route.params.duration, "minutes")
                .format("LT")}
              labelO={route.params.addresses.origin.formatted_address}
              labelD={route.params.addresses.destination.formatted_address}
              dirTextSize={wp("2.5%")}
            />
          </View>
          <View style={styles.vehicleContainer}>
            <Image
              source={require("../../../assets/images/teslaX.png")}
              style={styles.teslaImage}
            />
            <View>
              <Text style={styles.vehicleModelTitle}>
                {" "}
                {userFirestoreData.driverData.car}
              </Text>
              <Text style={styles.vehicleModelColor}>
                {userFirestoreData.driverData.plate}
              </Text>
              <Text style={styles.vehicleModelColor}>
                {userFirestoreData.driverData.carcolor}
              </Text>
            </View>
            <View style={{ marginLeft: wp("3") }}>
              {getSex()}
              {route.params.approvalIns ? (
                <Text style={styles.iconTextInfoText}> Admisión Rápida</Text>
              ) : (
                <></>
              )}
              {route.params.smoking ? (
                <Text style={styles.iconTextInfoText}> Permitido Fumar</Text>
              ) : (
                <></>
              )}
            </View>
          </View>
          <View style={styles.priceContainer}>
            <View style={styles.steering}>
              <View style={styles.iconContainer}>
                <MaterialCommunityIcons
                  name="steering"
                  size={hp("8")}
                  color={COLORS.TURKEY}
                />
                <View style={styles.tinyiconText}>
                  <View style={styles.tinyIcons}>
                    {[...Array(route.params.nOfSeats)].map((value, index) => (
                      <Ionicons
                        key={index}
                        name="person-circle-outline"
                        size={hp("3")}
                        color={COLORS.TURKEY}
                      />
                    ))}
                  </View>
                  <Text style={styles.tinyTextStyle}>
                    {route.params.nOfSeats} asientos disponibles
                  </Text>
                </View>
              </View>
              <Text style={styles.prideDesc}>Precio por asiento</Text>
            </View>
            <Text style={styles.price}>$ {route.params.price}</Text>
          </View>
          <View style={styles.bagsContainer}>
            <Text style={styles.equipajePermStyle}>
              Equipaje extra permitido
            </Text>
            <View style={styles.bagIcons}>
              <View style={styles.bagIconText}>
                <MaterialCommunityIcons
                  name="bag-personal-outline"
                  size={hp("7")}
                  color={COLORS.TURKEY}
                />
                <Text style={styles.bagIconTinyText}>Equipaje de mano </Text>
                <Text style={styles.bagIconTinyText}>
                  {route.params.personalItem}
                </Text>
              </View>

              <View style={styles.bagIconText}>
                <FontAwesome5
                  name="suitcase-rolling"
                  size={hp("7")}
                  color={COLORS.TURKEY}
                />
                <Text style={styles.bagIconTinyText}>Maleta de viaje</Text>
                <Text style={styles.bagIconTinyText}>
                  {route.params.bigBags}
                </Text>
              </View>
            </View>
          </View>
        </View>
        <View style={styles.buttonView}>
          <ButtonLiion
            title="Confirmar viaje"
            styleView={styles.button}
            onPress={() => checkValidator()}
          />
        </View>
      </View>
    </Layout>
  );
};

export default CreateStepFive;

const styles = StyleSheet.create({
  buttonView: {
    flex: 1,
    height: hp("23%"),
    justifyContent: "flex-end",
    paddingBottom: hp("5%"),
  },
  button: {
    width: wp("78.6%"),
    height: hp("4.8%"),
    alignSelf: "center",
  },
  contentFive: {
    flex: 9,
  },
  container: {
    display: "flex",
    flexDirection: "column",
  },
  titleContainer: {
    flex: 1.1,
    justifyContent: "center",
    alignItems: "center",
  },
  titleStyle: {
    fontSize: wp("8%"),
    color: COLORS.TURKEY,
    textAlign: "center",
    marginHorizontal: wp("5%"),
    fontFamily: "Gotham-SSm-Medium",
  },
  rutaStyle: {
    fontSize: wp("5%"),
    color: COLORS.TURKEY,
    textAlign: "left",
    fontFamily: "Gotham-SSm-Bold",
  },
  routeContainer: {
    flex: 0.9,
  },
  vehicleContainer: {
    flex: 0.7,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: COLORS.GRAY,
  },
  vehicleModelTitle: {
    fontFamily: "Gotham-SSm-Medium",
    fontSize: wp("4%"),
  },
  vehicleModelColor: {
    fontFamily: "Gotham-SSm-Medium",
    fontSize: wp("3.5%"),
    marginLeft: wp("1.5%"),
    color: COLORS.LEAD,
  },
  teslaImage: {
    width: wp("17.5%"),
    height: hp("4.9%"),
    marginRight: wp("2%"),
  },
  priceContainer: {
    flex: 1,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    borderBottomWidth: 1,
    borderColor: COLORS.GRAY,
  },
  price: {
    fontFamily: "Gotham-SSm-Bold",
    fontSize: wp("5%"),
    alignSelf: "flex-end",
    marginBottom: hp("2%"),
    color: COLORS.TURKEY,
  },
  prideDesc: {
    fontFamily: "Gotham-SSm-Medium",
    fontSize: wp("3.7%"),
    color: COLORS.LEAD,
  },
  iconContainer: {
    display: "flex",
    flexDirection: "row",
  },
  steering: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  },
  tinyiconText: {
    marginLeft: wp("4%"),
  },
  tinyTextStyle: {
    fontFamily: "Gotham-SSm-Medium",
    fontSize: wp("3%"),
    color: COLORS.LEAD,
  },
  tinyIcons: {
    display: "flex",
    flexDirection: "row",
  },
  bagsContainer: {
    flex: 1.2,
    marginTop: hp("1.5"),
  },
  equipajePermStyle: {
    fontFamily: "Gotham-SSm-Bold",
    fontSize: wp("3.2%"),
    color: COLORS.LEAD,
  },
  bagIcons: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    marginTop: hp("2.5"),
  },
  bagIconText: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  bagIconTinyText: {
    fontFamily: "Gotham-SSm-Medium",
    fontSize: wp("3.7%"),
    color: COLORS.TURKEY,
    alignSelf: "center",
  },
  inputLocation: {
    width: wp("78.6%"),
    height: hp("12%"),
    alignSelf: "center",
    marginTop: -1 * wp("2%"),
  },
  iconTextInfo: {
    display: "flex",
    flexDirection: "row",
  },
  iconTextInfoText: {
    fontFamily: "Gotham-SSm-Medium",
    fontSize: wp("3.5%"),
    color: COLORS.TURKEY,
    alignSelf: "auto",
  },
});
