import React, {
  useState,
  useEffect,
  useRef,
  useCallback,
  useContext,
} from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableWithoutFeedback,
  Image,
} from "react-native";
import * as Location from "expo-location";

import { reverseGeocodeAsync } from "expo-location";
import { useQuery, useMutation, useQueryClient } from "react-query";
import { MaterialIcons } from "@expo/vector-icons";
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import QRCode from "react-native-qrcode-svg";
import { getDistance } from "geolib";
import { Avatar } from "react-native-paper";

import { COLORS, hp, wp } from "../../constants/styleThemes";
import { GlobalContext } from "../../context/Provider";
import MapOngoingTravel from "../../components/MapOngoingTravel";
import Loading from "../../components/Loading";
import Layout from "../../components/Layout";
import ModalPopUp from "../../components/ModalPopUp";
import {
  getRouteCoordinates,
  updateUserLocationInTravel,
  getPassengerTravelItinerary,
} from "../../api/api";
import ButtonLiion from "../../components/ButtonLiion";

const OngoingTravelPassenger = ({ navigation, route }) => {
  const {
    id,
    nameDriver,
    driverPhoto,
    carModel,
    carPhoto,
    plate,
    startTime,
    originDetails,
    destinationDetails,
    date,
    durationMinutes,
  } = route.params;
  const { uid } = useContext(GlobalContext);

  const [userLocation, setUserLocation] = useState(() => {
    return { latitude: 0, longitude: 0 };
  });
  const [errorMsg, setErrorMsg] = useState("");
  const [modalErrorState, setModalErrorState] = useState(false);
  const [nameDirection, setNameDirection] = useState("");
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  const sheetRef = useRef();
  const snapPoints = ["55%"];

  const queryClient = useQueryClient();

  const {
    data: dataRoute,
    isSuccess: isSucessRoute,
    isError: isErrorRoute,
  } = useQuery(
    ["routeCoordinateP", id],
    () => getRouteCoordinates({ travelId: id }),
    {
      refetchOnMount: false,
    }
  );

  const {
    data: dataItinerary,
    isSuccess: isSucessItinerary,
    isError: isErrorItinerary,
  } = useQuery(
    ["travelItineraryP", id],
    () => getPassengerTravelItinerary({ travelId: id, uid: uid }),
    {
      refetchOnMount: true,
      refetchInterval: 30000,
      onSuccess: (data) => {
        data.status !== "finished"
          ? (async () => {
              var address = await reverseGeocodeAsync(data.coordinate);
              setNameDirection(
                address[0].street +
                  " " +
                  address[0].name +
                  ", " +
                  address[0].city
              );
            })()
          : navigation.navigate("Feedback", {
              travelId: id,
              startTime: startTime,
              originDetails: originDetails,
              destinationDetails: destinationDetails,
              date: date,
              durationMinutes: durationMinutes,
            });
      },
    }
  );

  const { mutate: mutateUpdateLocation, isError: isErrorUpdateLocation } =
    useMutation(updateUserLocationInTravel);

  useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Se ha denegado el permiso de acceder a la ubicación");
        setModalErrorState(true);
        return;
      }
      const subscription = await Location.watchPositionAsync(
        { accuracy: Location.Accuracy.BestForNavigation, distanceInterval: 20 },
        (loc) => {
          if (userLocation != null) {
            var coordObj = {
              latitude: loc.coords.latitude,
              longitude: loc.coords.longitude,
            };
            setUserLocation(coordObj);
            if (isSucessItinerary)
              if (dataItinerary.status === "active") {
                mutateUpdateLocation({
                  travelId: id,
                  uid: uid,
                  location: coordObj,
                });
              }
          }
        }
      );
      return () => subscription.remove();
    })();
  }, []);

  useEffect(() => {
    isErrorRoute && setErrorMsg("Error al obtener la ruta");
    isErrorRoute && setModalErrorState(true);
  }, [isErrorRoute]);

  useEffect(() => {
    !isSheetOpen && queryClient.invalidateQueries("travelItineraryP");
  }, [isSheetOpen]);

  useEffect(() => {
    isSucessItinerary &&
      dataItinerary.status !== "finished" &&
      dataItinerary.type === "dropOff" &&
      getDistance(userLocation, dataItinerary.coordinate) < 5 &&
      queryClient.invalidateQueries("travelItineraryP");
  }, [userLocation]);

  const modalHandler = () => {
    navigation.goBack();
    setModalErrorState(false);
  };

  const handleSnapOpen = useCallback((index) => {
    sheetRef.current?.snapToIndex(index);
    setIsSheetOpen(true);
  }, []);

  const handleSnapClose = useCallback(() => {
    sheetRef.current?.close();
    setIsSheetOpen(false);
  }, []);

  return (
    <Layout>
      {!isSucessRoute || !isSucessItinerary ? (
        <Loading />
      ) : (
        <>
          {dataItinerary.status !== "finished" && (
            <>
              <ModalPopUp
                visible={modalErrorState}
                setModalVisible={setModalErrorState}
                customFunction={modalHandler}
              >
                {errorMsg}
              </ModalPopUp>
              <TouchableWithoutFeedback
                onPress={() => isSheetOpen && handleSnapClose()}
              >
                <View
                  style={{
                    alignItems: "center",
                    backgroundColor: COLORS.WHITE,
                  }}
                >
                  <MapOngoingTravel
                    dimensions={styles.mapDimensions}
                    coordinateList={dataRoute.routeCoordinates}
                    origin={userLocation}
                    destiny={dataRoute.routeCoordinates[10]}
                    navigation={navigation}
                    typePassenger={"passenger"}
                    markers={dataItinerary.markerList}
                  />
                  <View style={styles.floatingSheet}>
                    <View
                      style={{
                        margin: hp(1.5),
                        justifyContent: "space-evenly",
                      }}
                    >
                      <View style={{ flexDirection: "row" }}>
                        <View style={{ width: wp("45%") }}>
                          <Avatar.Image
                            source={{
                              uri: driverPhoto,
                            }}
                            size={hp("7")}
                            style={{ position: "absolute", zIndex: 1 }}
                          />

                          <Image
                            source={{ uri: carPhoto }}
                            style={styles.Image}
                          />
                        </View>
                        <View style={{ width: wp("40%") }}>
                          <Text
                            style={{
                              fontSize: hp("1.9%"),
                              color: COLORS.BLACK,
                              fontFamily: "Gotham-SSm-Bold",
                            }}
                          >
                            {nameDriver}
                          </Text>
                          <Text
                            style={{
                              fontSize: hp("1.4%"),
                              color: COLORS.BLACK,
                              fontFamily: "Gotham-SSm-Medium",
                            }}
                          >
                            {carModel + " - " + plate}
                          </Text>
                        </View>
                      </View>

                      <View
                        style={{
                          flexDirection: "row",
                          alignItems: "center",
                        }}
                      >
                        <MaterialIcons
                          name="directions-walk"
                          size={24}
                          color={COLORS.TURKEY}
                          style={
                            dataItinerary.type === "dropOff" && {
                              transform: [{ rotateY: "180deg" }],
                            }
                          }
                        />
                        <Text style={styles.labelText}>
                          {(dataItinerary.type === "pickUp"
                            ? "Subida en "
                            : "Bajada en ") + nameDirection}
                        </Text>
                      </View>
                    </View>

                    {dataItinerary.type !== "pickUp" ? (
                      <View style={styles.buttonView}>
                        <ButtonLiion
                          title="¿Problemas?"
                          styleView={styles.button}
                          onPress={() => console.log("¿Problemas?")}
                        />
                      </View>
                    ) : (
                      <View style={styles.buttonView}>
                        <ButtonLiion
                          title="Ver Codigo QR"
                          styleView={styles.button}
                          onPress={() => handleSnapOpen(0)}
                        />
                      </View>
                    )}
                  </View>
                </View>
              </TouchableWithoutFeedback>

              <BottomSheet
                ref={sheetRef}
                snapPoints={snapPoints}
                enablePanDownToClose={true}
                onClose={() => setIsSheetOpen(false)}
                index={-1}
              >
                <BottomSheetView style={{ alignItems: "center" }}>
                  <Text style={[styles.textQr, { marginBottom: hp(5) }]}>
                    {"Muestra el codigo QR\nal conductor"}
                  </Text>
                  <QRCode
                    value={id + "~-!-~" + uid}
                    color={COLORS.TURKEY}
                    size={300}
                  />
                </BottomSheetView>
              </BottomSheet>
            </>
          )}
        </>
      )}
    </Layout>
  );
};

export default OngoingTravelPassenger;
const styles = StyleSheet.create({
  mapDimensions: {
    height: hp("100%"),
    width: wp("100%"),
  },
  floatingSheet: {
    position: "absolute",
    height: hp(20),
    width: wp(90),
    bottom: hp(1),
    borderRadius: hp(5),
    elevation: 5,
    backgroundColor: COLORS.WHITE,
  },
  labelText: {
    color: COLORS.BLACK,
    fontSize: hp("1.5%"),
    fontFamily: "Gotham-SSm-Medium",
  },
  buttonView: {
    flex: 1,
    height: hp("23%"),
    justifyContent: "flex-end",
    paddingBottom: hp("1.5%"),
  },
  button: {
    width: wp("60%"),
    height: hp("4.8%"),
    alignSelf: "center",
  },
  textQr: {
    fontFamily: "Gotham-SSm-Bold",
    fontSize: hp("2.4%"),
    textAlign: "center",
    color: COLORS.TURKEY,
  },
  Image: {
    width: wp("45%"),
    height: hp("8%"),
  },
});
