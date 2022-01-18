import React, { useEffect, useContext, useState } from "react";
import { StyleSheet, Text, View, ScrollView } from "react-native";
import StarRating from "react-native-star-rating";
import { Avatar } from "react-native-paper";
import { FontAwesome, MaterialIcons } from "@expo/vector-icons";

import Layout from "../../components/Layout";
import { COLORS, hp, wp } from "../../constants/styleThemes";
import ButtonLiion from "../../components/ButtonLiion";
import { GlobalContext } from "../../context/Provider";
import ShowTravel from "../../components/ShowTravel";
import ModalPopUpDecision from "../../components/ModalPopUpDecision";

import { getTravelPartners, updateUserRanting } from "../../api/api";
import { useQuery, useMutation } from "react-query";

import moment from "moment";
import "moment/locale/es";
import Loading from "../../components/Loading";
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

  const [userRatings, setUserRatings] = useState({});
  const [modalError, setModalError] = useState(false);

  const { data, error, isLoading, isFetching, isError, isSuccess } = useQuery(
    ["travelPartners", uid, travelId],
    () => getTravelPartners({ travelId: travelId, userUid: uid })
  );

  const {
    mutate,
    isError: isErrorUpdate,
    isLoading: isLoadingUpdate,
  } = useMutation(updateUserRanting);

  useEffect(() => {
    navigation.addListener("beforeRemove", (e) => {
      const action = e.data.action;
      e.preventDefault();
      e.data.action.type == "POP_TO_TOP" && navigation.dispatch(e.data.action);
    });
  }, [navigation]);

  const checkValidator = () => {
    if (Object.keys(userRatings).length != data.length) setModalError(true);
    else {
      Object.keys(userRatings).length > 0 && mutate({ userList: userRatings });
      //navigation.navigate("SearchStack");
    }
  };

  const modalHandler = () => {
    Object.keys(userRatings).length > 0 && mutate({ userList: userRatings });
    //navigation.navigate("SearchStack");
    setModalError(false);
  };

  return (
    <Layout>
      {!isSuccess ? (
        <Loading />
      ) : (
        <>
          <ModalPopUpDecision
            visible={modalError}
            setModalVisible={setModalError}
            customFunction={modalHandler}
          >
            {"Aun le falta terminar de dar feedback\n¿Desea continuar?"}
          </ModalPopUpDecision>
          <Text style={styles.text_titulo}>Viaje finalizado</Text>
          <Text style={styles.text_subTitulo}>
            {"Por favor, puntúa a tus\ncompañeros de viaje"}
          </Text>

          <View style={styles.viewBorder}>
            <Text style={styles.textDate}>
              {moment(date, "DD-MM-YYYY").format("LL")}
            </Text>
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
          <View style={{ height: hp(40), width: wp(80), marginTop: hp(0.5) }}>
            <ScrollView showsVerticalScrollIndicator={false}>
              {isSuccess &&
                data.map((data, index) => {
                  return (
                    <View key={index} style={{ marginTop: hp(1.3) }}>
                      <View style={{ flexDirection: "row" }}>
                        <Text
                          style={{
                            fontSize: hp("2.3%"),
                            color: COLORS.BLACK,
                            fontFamily: "Gotham-SSm-Book",
                          }}
                        >
                          {data.nameUser}
                        </Text>
                        {data.type === "driver" ? (
                          <FontAwesome
                            name="drivers-license"
                            size={24}
                            color={COLORS.TURKEY_CLEAR}
                            style={{ marginLeft: wp(1) }}
                          />
                        ) : (
                          <MaterialIcons
                            name="emoji-people"
                            size={24}
                            color={COLORS.TURKEY_CLEAR}
                            style={{ marginLeft: wp(1) }}
                          />
                        )}
                      </View>

                      <View
                        style={[
                          {
                            flexDirection: "row",
                            alignItems: "center",
                            justifyContent: "space-between",
                          },
                          { ...styles.barSeparator },
                        ]}
                      >
                        <View>
                          <StarRating
                            disabled={false}
                            emptyStar={"star-outline"}
                            fullStar={"star"}
                            halfStar={"star-half-full"}
                            iconSet={"MaterialCommunityIcons"}
                            maxStars={5}
                            rating={userRatings[data.uid] ?? 0}
                            selectedStar={(rating) => {
                              setUserRatings({
                                ...userRatings,
                                [data.uid]: rating,
                              });
                            }}
                            fullStarColor={COLORS.TURKEY}
                          />
                        </View>
                        <Avatar.Image
                          source={{
                            uri: data.userPhoto,
                          }}
                          size={hp(8.5)}
                          style={{
                            paddingRight: wp(1),
                            position: "absolute",
                            right: wp(1),
                            top: hp(-3),
                          }}
                        />
                      </View>
                    </View>
                  );
                })}
            </ScrollView>
          </View>
          <View style={styles.buttonView}>
            <ButtonLiion
              title="Enviar Feedback"
              styleView={styles.button}
              onPress={() => checkValidator()}
            />
          </View>
        </>
      )}
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
    height: hp("0%"),
    width: wp(100),
    justifyContent: "flex-end",
    paddingBottom: hp("5%"),
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
    height: hp("16%"),
    alignItems: "center",
  },
  inputLocation: {
    width: wp("78.6%"),
    height: hp("12%"),

    justifyContent: "center",
  },
  textDate: {
    fontFamily: "Gotham-SSm-Medium",
    fontSize: hp(2),
    color: COLORS.LEAD,
  },
  barSeparator: {
    borderBottomColor: COLORS.LIGHT_LEAD,
    borderBottomWidth: 1,
    borderBottomStartRadius: 5,
    borderBottomEndRadius: 20,
    paddingBottom: hp("1.8"),
  },
});
