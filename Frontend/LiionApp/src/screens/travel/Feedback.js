import React, { useEffect, useContext } from "react";
import { StyleSheet, Text, View } from "react-native";

import Layout from "../../components/Layout";
import { COLORS, hp, wp } from "../../constants/styleThemes";
import ButtonLiion from "../../components/ButtonLiion";
import { GlobalContext } from "../../context/Provider";
import ShowTravel from "../../components/ShowTravel";
import FeedbackCatcher from "../../components/FeedbackCatcher";

import moment from "moment";
import "moment/locale/es";
moment.locale("es");

const Feedback = ({ navigation, route }) => {
  const { uid } = useContext(GlobalContext);
  const {
    travelId,
    startTime,
    originDetails,
    destinationDetails,
    date,
    durationMinutes,
  } = route.params;

  useEffect(() => {
    navigation.addListener("beforeRemove", (e) => {
      const action = e.data.action;
      e.preventDefault();
      e.data.action.type == "POP_TO_TOP" && navigation.dispatch(e.data.action);
    });
  }, [navigation]);

  const checkValidator = () => {
    navigation.navigate("SearchStack");
  };
  return (
    <Layout>
      <View style={{ height: hp("70%") }}>
        <Text style={styles.text_titulo}>Viaje finalizado</Text>
        <Text style={styles.text_subTitulo}>
          {"Por favor, puntúa a tus\ncompañeros de viaje"}
        </Text>
        <View style={styles.viewBorder}>
          <ShowTravel
            style={styles.inputLocation}
            timeStart={startTime}
            timeEnd={moment(startTime, "hh:mm")
              .add(durationMinutes, "minutes")
              .format("LT")}
            labelO={originDetails.formatted_address}
            labelD={destinationDetails.formatted_address}
            dirTextSize={wp("3%")}
          />
        </View>
        <FeedbackCatcher />
      </View>
      <View style={styles.buttonView}>
        <ButtonLiion
          title="Enviar Feedback"
          styleView={styles.button}
          onPress={() => checkValidator()}
        />
      </View>
    </Layout>
  );
};

export default Feedback;

const styles = StyleSheet.create({
  text_titulo: {
    fontFamily: "Gotham-SSm-Bold",
    fontSize: hp("3%"),
    color: COLORS.TURKEY,
    paddingTop: hp("10%"),
    textAlign: "center",
  },
  text_subTitulo: {
    fontFamily: "Gotham-SSm-Medium",
    fontSize: hp("2.4%"),
    color: COLORS.TURKEY_CLEAR,
    paddingTop: hp("6%"),
    textAlign: "center",
    paddingBottom: hp("5%"),
  },
  buttonView: {
    flex: 1,
    height: hp("23%"),
    justifyContent: "flex-end",
    paddingBottom: hp("6%"),
  },
  button: {
    width: wp("78.6%"),
    height: hp("4.8%"),
    alignSelf: "center",
  },
  viewBorder: {
    borderColor: COLORS.LIGHT_LEAD,
    borderWidth: 1,
    borderRadius: wp(3),
    width: wp("80%"),
    height: hp("14%"),
    alignItems: "center",
  },
  inputLocation: {
    width: wp("78.6%"),
    height: hp("12%"),

    justifyContent: "center",
  },
});
