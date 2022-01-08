import React, { useState, useContext } from "react";
import { StyleSheet, Text, View, Image } from "react-native";
import {
  Ionicons,
  MaterialCommunityIcons,
  FontAwesome5,
} from "@expo/vector-icons";

import Loading from "../../components/Loading";

import Layout from "../../components/Layout";
import ButtonLiion from "../../components/ButtonLiion";
import { COLORS, hp, wp } from "../../constants/styleThemes";
import ShowTravel from "../../components/ShowTravel";
import { GlobalContext } from "../../context/Provider";
import moment from "moment";
import { createTravel } from "../../api/api";
import ModalPopUp from "../../components/ModalPopUp";
import "moment/locale/es";
moment.locale("es");

const CreateStepFive = ({ navigation, route }) => {
  const { userData, uid, accesstoken } =
    useContext(GlobalContext);
  const [modalVisible, setModalVisible] = useState(false);
  const [waitingLogin, setWaitingLogin] = useState(false);

  const checkValidator = async () => {
    setWaitingLogin(true);
    const titulo = "¡Creación de viaje realizada!";
    const subTitulo =
      "Tu creación de viaje fue generada exitosamente.\nPara chequear el estatus de tu\nviaje chequéalo en Mis viajes\n(conductor) en el home.";
    const finalTabRoute = "TravelConductorTab";

      const dataForSend = {
      atoken: accesstoken,
      driverUID: uid,
      status: "open",
      nSeatsAvailable: route.params.nSeatsOffered,
      ...route.params,
      seen: 0,
      requestingPassengers: []
    };

    const [resflag, resmsg] = await createTravel(dataForSend);
    if (resflag) {
      navigation.navigate("SucessScreen", {
        titulo: titulo,
        subTitulo: subTitulo,
        finalTabRoute: finalTabRoute,
      });
    } else {
      //dataForRoutingTwo.current = dataForSend
      setModalVisible(true);
    }
    setWaitingLogin(false);
  };

  const modalHandler = () => {
    //alfinal no fue nesesario
    //console.log(dataForRoutingTwo.current)
    navigation.navigate("CreateStepOne");
    setModalVisible(false);
  };

  const getSex = () => {
    if (route.params.genderPreference === 'allGender') {
      return (
        <View style={styles.iconTextInfo}>
          <MaterialCommunityIcons
            name={"gender-male-female"}
            size={hp("7")}
            color={COLORS.TURKEY}
            style={{ alignSelf: "center" }}
          />
        </View>
      );
    } else if (route.params.genderPreference === 'onlyWoman') {
      return (
        <View style={styles.iconTextInfo}>
          <MaterialCommunityIcons
            name={"gender-female"}
            size={hp("7")}
            color={COLORS.TURKEY}
            style={{ alignSelf: "center" }}
          />
        </View>
      );
    } else {
      return (
        <View style={styles.iconTextInfo}>
          <MaterialCommunityIcons
            name={"gender-male"}
            size={hp("7")}
            color={COLORS.TURKEY}
            style={{ alignSelf: "center" }}
          />
        </View>
      );
    }
  };

  return (
    <Layout>
      {waitingLogin ? (
        <Loading />
      ) : (
        <>
          <ModalPopUp
            visible={modalVisible}
            setModalVisible={setModalVisible}
            customFunction={modalHandler}
          >
            Parece que ya tienes un viaje en ese intervalo de tiempo
          </ModalPopUp>
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
                  timeStart={route.params.startTime}
                  timeEnd={moment(route.params.startTime, "hh:mm")
                    .add(route.params.durationMinutes, "minutes")
                    .format("LT")}
                  labelO={route.params.originDetails.formatted_address}
                  labelD={route.params.destinationDetails.formatted_address}
                  dirTextSize={wp("2.5%")}
                />
              </View>
              <View style={styles.vehicleContainer}>
                <Image
                  source={{ uri: userData.driverData.carPhoto }}
                  style={styles.teslaImage}
                />
                <View>
                  <Text style={styles.vehicleModelTitle}>
                    {" "}
                    {userData.driverData.car}
                  </Text>
                  <Text style={styles.vehicleModelColor}>
                    {userData.driverData.plate}
                  </Text>
                  <Text style={styles.vehicleModelColor}>
                    {userData.driverData.carcolor}
                  </Text>
                </View>
                <View
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    marginLeft: wp("3"),
                  }}
                >
                  {getSex()}
                  {route.params.approvalIns && (
                    <View style={styles.iconTextInfo}>
                      <MaterialCommunityIcons
                        name={"lightning-bolt"}
                        size={hp("7")}
                        color={COLORS.TURKEY}
                        style={{ alignSelf: "center" }}
                      />
                    </View>
                  )}
                  {route.params.smoking && (
                    <View style={styles.iconTextInfo}>
                      <MaterialCommunityIcons
                        name={"smoking"}
                        size={hp("7")}
                        color={COLORS.TURKEY}
                        style={{ alignSelf: "center" }}
                      />
                    </View>
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
                        {[...Array(route.params.nSeatsOffered)].map(
                          (value, index) => (
                            <Ionicons
                              key={index}
                              name="person-circle-outline"
                              size={hp("3")}
                              color={COLORS.TURKEY}
                            />
                          )
                        )}
                      </View>
                      <Text style={styles.tinyTextStyle}>
                        {route.params.nSeatsOffered}{" "}
                        {route.params.nSeatsOffered === 1
                          ? "asiento disponible"
                          : "asientos disponibles"}
                      </Text>
                    </View>
                  </View>
                  <Text style={styles.prideDesc}>Precio por asiento</Text>
                </View>
                <Text style={styles.price}>$ {route.params.costPerSeat}</Text>
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
                    <Text style={styles.bagIconTinyText}>
                      Equipaje de mano{" "}
                    </Text>
                    <Text style={styles.bagIconTinyText}>
                      {route.params.extraBaggage.personalItem}
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
                      {route.params.extraBaggage.bigBags}
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
        </>
      )}
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
    marginLeft: wp(1),
  },
  iconTextInfoText: {
    fontFamily: "Gotham-SSm-Medium",
    fontSize: wp("3.5%"),
    color: COLORS.TURKEY,
    alignSelf: "auto",
  },
});
