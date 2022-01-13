import React, {
  useState,
  useEffect,
  useContext,
  useRef,
  useCallback,
} from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from "react-native";
import * as Location from "expo-location";
import { AntDesign } from "@expo/vector-icons";
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import { Camera } from "expo-camera";
import { BarCodeScanner } from "expo-barcode-scanner";

//import { useQuery } from "react-query";

import { GlobalContext } from "../../context/Provider";
import MapOngoingTravel from "../../components/MapOngoingTravel";
import Loading from "../../components/Loading";
import Layout from "../../components/Layout";
import ModalPopUp from "../../components/ModalPopUp";
import { COLORS, hp, wp } from "../../constants/styleThemes";
import {
  updateUserLocationInTravel,
  getDetailsOfTravel,
  getDetailsOngoingTravel,
} from "../../api/api";

const OngoingTravelVisualizer = ({ navigation, route }) => {
  //const { uid, userData } = useContext(GlobalContext);
  const { id } = route.params;
  const [userLocation, setUserLocation] = useState(() => {
    return { latitude: 0, longitude: 0 };
  });

  const [loading, setLoading] = useState(true);
  const [dataFromApi, setDataFromApi] = useState({});

  const [errorMsg, setErrorMsg] = useState("");
  const [modalState, setModalState] = useState(false);

  const [isSheetOpen, setIsSheetOpen] = useState(false);

  const sheetRef = useRef();
  const cameraRef = useRef();
  const [dataScaned, setDataScaned] = useState("");

  const snapPoints = ["70%"];

  /*   const {
    data: dataFromApi,
    error,
    isLoading: loading,
    isError,
    isSuccess,
  } = useQuery(["OngoingTravel"], getDetailsOngoingTravel); */

  useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Se ha denegado el permiso de acceder a la ubicación");
        setModalState(true);
        return;
      }
      await Location.watchPositionAsync(
        { accuracy: Location.Accuracy.BestForNavigation, distanceInterval: 15 },
        (loc) =>
          setUserLocation({
            latitude: loc.coords.latitude,
            longitude: loc.coords.longitude,
          })
      );
    })();
  }, []);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Se ha denegado el permiso de acceder a la camara");
        setModalState(true);
        return;
      }
    })();
  }, []);

  /*   useEffect(() => {
    if (userLocation != null) console.log(userLocation);
           (async () => {
        var data = {
          travelId: id,
          uid: uid,
          location: location,
        };
        await updateUserLocationInTravel(data);
      })(); 
  }, [userLocation]); */

  useEffect(() => {
    (async function () {
      const [resFlag, resMsg] = await getDetailsOfTravel(id);
      resFlag
        ? setDataFromApi({ ...route.params, ...resMsg })
        : setModalState(true);
      setLoading(false);
    })();
  }, []);

  const handleSnapOpen = useCallback((index) => {
    sheetRef.current?.snapToIndex(index);
    setIsSheetOpen(true);
  }, []);

  const handleSnapClose = useCallback(() => {
    sheetRef.current?.close();
    setIsSheetOpen(false);
  }, []);

  const modalHandler = () => {
    navigation.back();
    setModalState(false);
  };

  const handleCamScaned = (result) => {
    setDataScaned(result.data);
    handleSnapClose();
    console.log(result.data);
  };

  return (
    <Layout>
      {loading ? (
        <Loading />
      ) : (
        <>
          <ModalPopUp
            visible={modalState}
            setModalVisible={setModalState}
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
                coordinateList={dataFromApi.routeCoordinates}
                origin={userLocation}
                destiny={
                  dataFromApi.routeCoordinates[
                    dataFromApi.routeCoordinates.length - 1
                  ]
                }
                navigation={navigation}
                typePassenger={"driver"}
                markers={""}
              />
              <View style={styles.floatingSheet}>
                <View style={{ flexDirection: "row" }}>
                  <View>
                    <View style={{ flexDirection: "row" }}>
                      {/* nombre y maletas */}
                    </View>
                    <View style={{ flexDirection: "row" }}>
                      {/* monito y direccion */}
                    </View>
                  </View>
                  {/*imagen*/}
                </View>
                <TouchableOpacity onPress={() => handleSnapOpen(0)}>
                  <View style={styles.containerQr}>
                    <AntDesign name="qrcode" size={45} color={COLORS.TURKEY} />
                    <Text style={styles.textQr}>
                      {"Registrar subida de pasajeros"}
                    </Text>
                  </View>
                </TouchableOpacity>
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
              <Text style={styles.textQr}>
                {"Escaneé el codigo QR\ndel pasajero"}
              </Text>
              {isSheetOpen && (
                <Camera
                  ref={cameraRef}
                  style={styles.camContainer}
                  type={Camera.Constants.Type.back}
                  autoFocus={Camera.Constants.AutoFocus.on}
                  barCodeScannerSettings={{
                    barCodeTypes: [BarCodeScanner.Constants.BarCodeType.qr],
                  }}
                  onBarCodeScanned={(result) => handleCamScaned(result)}
                />
              )}
            </BottomSheetView>
          </BottomSheet>
        </>
      )}
    </Layout>
  );
};

export default OngoingTravelVisualizer;

const styles = StyleSheet.create({
  camContainer: {
    marginTop: hp(3),
    height: hp("50%"),
    width: wp("90%"),
  },
  mapDimensions: {
    height: hp("100%"),
    width: wp("100%"),
  },
  floatingSheet: {
    position: "absolute",
    height: hp(25),
    width: wp(90),
    bottom: hp(1),
    borderRadius: hp(5),
    elevation: 5,
    backgroundColor: COLORS.WHITE,
  },
  textQr: {
    fontFamily: "Gotham-SSm-Bold",
    fontSize: hp("2.4%"),
    textAlign: "center",
    color: COLORS.TURKEY,
  },
  containerQr: {
    alignItems: "center",
  },
});
