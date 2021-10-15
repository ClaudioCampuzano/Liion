import React, { useState, useContext, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  useColorScheme,
  ColorPropType,
  FlatList,
  ActivityIndicator,
} from "react-native";

import {
  Ionicons,
  MaterialIcons,
  Feather,
  MaterialCommunityIcons,
  FontAwesome5,
} from "@expo/vector-icons";

import { GlobalContext } from "../../context/Provider";
import Layout from "../../components/Layout";
import ButtonLiionDisable from "../../components/ButtonLiionDisable";
import DriverFiles from "../../components/DriverFiles";
import { COLORS, hp, wp } from "../../constants/styleThemes";

const DriverSignupOne = () => {
  const {
    reLoadUserInfo,
    isLoggedIn,
    loadUserFirestoreData,
    userData,
    uid,
    userFirestoreData,
    getState2,
    accesstoken,
    isLoadedDATA,
    updateDriverApicall,
    updateReloadTrigger,
    reloadTrigger,
  } = useContext(GlobalContext);
  //programar en ingles, sin embargo estos son nombres Chilenos que no sabia traducir
  const [files, setFiles] = useState([
    { name: "Licencia de Conducir", state: false },
    { name: "Certificado de Antecedentes", state: false },
    { name: "Cédula de Identidad", state: false },
    { name: "Hoja de vida del Conductor", state: false },
  ]);
  const [ready, setReady] = useState(false);

  const defineColor = (docState) => {
    if (docState) return COLORS.CHECK_GREEN;
    else return COLORS.WARN_RED;
  };
  const defineIcon = (docState) => {
    if (docState) return "check-circle";
    else return "file-plus";
  };

  const updateState = (index, stateflag) => {
    let document = [...files];
    document[index].state = stateflag;
    setFiles(document);
  };

  const defineButtonText = (flag) => {
    if (flag) return "Registrar Conductor";
    else return "Aún Faltan Datos";
  };

  useEffect(() => {
    let flag = true;
    files.forEach((x, i) => (flag = x.state && flag));
    if (flag) setReady(true);
  }, [files]);

  useEffect(() => {
    let isDriver = userFirestoreData.isDriver;
    let document = [...files];
    //console.log(isDriver, typeof isDriver === 'string' || isDriver instanceof String)
    ///console.log(isDriver, isDriver === "true", isDriver === true)
    if (isDriver === true) {
      document.forEach((x) => (x.state = true));
      setFiles(document);
    }
  }, [getState2]);

  const updateDriverHandle = async (flag) => {
    let [status, res] = await updateDriverApicall(flag, {
      uid: uid,
      atoken: accesstoken,
    });
    if (status) await updateReloadTrigger(!reloadTrigger);
  };

  let isDriverg = userFirestoreData.isDriver;

  return (
    <Layout>
      <View style={[styles.container]}>
        <Text style={styles.textDriversignin}>Registro de Conductor</Text>
        <Text style={styles.tesxtSubDriversignin}>
          Para habilitarte como condctor, sube los siguiente documentos:{" "}
        </Text>
      </View>

      {isLoadedDATA ? (
        <>
          <View style={[styles.driverfilesView]}>
            {files.map((document, index) => (
              <DriverFiles
                key={index}
                iconname={defineIcon(document.state)}
                color={defineColor(document.state)}
                title={document.name}
                styleView={styles.driverfiles}
                onPress={() => {
                  updateState(index, true);
                }}
              />
            ))}
          </View>
          {!isDriverg ? (
            <View style={[styles.buttonView]}>
              <ButtonLiionDisable
                colordisable={defineColor(ready)}
                disabled={!ready}
                title={defineButtonText(ready)}
                styleView={styles.button}
                onPress={() => updateDriverHandle(true)}
              />
            </View>
          ) : (
            <Text style={styles.textDriversigninReady}>
              Ya estás Listo!
              <Feather
                name={"check-circle"}
                size={hp("5")}
                color={COLORS.CHECK_GREEN}
              />
            </Text>
          )}
        </>
      ) : (
        <ActivityIndicator size="large" color={COLORS.TURKEY} />
      )}
    </Layout>
  );
};

export default DriverSignupOne;

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
  },
  logo: {
    height: hp("35%"),
  },
  textDriversignin: {
    fontFamily: "Gotham-SSm-Bold",
    fontSize: hp("4%"),
    color: COLORS.TURKEY,
    paddingTop: hp("5%"),
  },
  textDriversigninReady: {
    fontFamily: "Gotham-SSm-Bold",
    fontSize: hp("4%"),
    color: COLORS.TURKEY,
    paddingBottom: hp("7%"),
  },
  tesxtSubDriversignin: {
    fontFamily: "Gotham-SSm-Book",
    fontSize: hp("2.5%"),
    color: COLORS.TURKEY,
    paddingTop: hp("9%"),
    paddingHorizontal: hp("4%"),
  },
  button: {
    width: wp("78.6%"),
    height: hp("6%"),
    margin: hp("0.6%"),
  },
  driverfiles: {
    width: wp("78.6%"),
    height: hp("7%"),
    margin: hp("0.6%"),
  },
  buttonView: {
    flex: 1,
    justifyContent: "flex-end",
    paddingBottom: hp("6%"),
  },
  driverfilesView: {
    marginTop: hp("30%"),
    flex: 1,
    justifyContent: "flex-end",
    paddingBottom: hp("6%"),
  },
});
