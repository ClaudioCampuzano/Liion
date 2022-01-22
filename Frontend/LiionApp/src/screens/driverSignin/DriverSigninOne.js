import React, { useState, useContext, useEffect } from "react";
import { View, Text, StyleSheet, ActivityIndicator } from "react-native";
import { getAuth } from "@firebase/auth";

import { GlobalContext } from "../../context/Provider";
import Layout from "../../components/Layout";
import ButtonLiionDisable from "../../components/ButtonLiionDisable";
import DriverFiles from "../../components/DriverFiles";
import { COLORS, hp, wp } from "../../constants/styleThemes";

import { updateDriverStatus } from "../../api/api";

const DriverSignupOne = () => {
  const {
    loadUserFirestoreData,
    uid,
    userData,
    getState2,
    accesstoken,
    reloadTrigger,
  } = useContext(GlobalContext);
  //programar en ingles, sin embargo estos son nombres Chilenos que no sabia traducir
  const [files, setFiles] = useState([
    { name: "Licencia de Conducir", state: false },
    { name: "Certificado de Antecedentes", state: false },
    { name: "Cédula de Identidad", state: false },
    { name: "Hoja de vida del Conductor", state: false },
  ]);

  //recarga local
  const [user, setUser] = useState(() => {
    const user = getAuth().currentUser;
    return user;
  });
  const [localLoad, setLocalLoad] = useState(false);
  const [localTrigger, setLocalTrigger] = useState(false);

  const [ready, setReady] = useState(false);

  const defineColor = (docState) => {
    if (docState) return COLORS.TURKEY;
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
    if (flag) return "Registrar conductor";
    else return "Aún faltan datos";
  };

  const toType = function (obj) {
    return {}.toString
      .call(obj)
      .match(/\s([a-zA-Z]+)/)[1]
      .toLowerCase();
  };

  const checkDriverVar = (obj) => {
    let type = toType(obj);
    if (type === "string") return obj === "true";
    else if (type === "boolean") return obj === true;
    else return false;
  };

  useEffect(() => {
    let flag = true;
    files.forEach((x, i) => (flag = x.state && flag));
    if (flag) setReady(true);
  }, [files]);

  useEffect(() => {
    let isDriver = userData.isDriver;
    let document = [...files];

    if (checkDriverVar(isDriver)) {
      document.forEach((x) => (x.state = true));
      setFiles(document);
    }
  }, [getState2]);

  const updateDriverHandle = async (flag) => {
    const driverData = {
      car: "Tesla Model S",
      plate: "DLJR01",
      carPhoto:
        "https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/compositor-1623493959.jpg?crop=0.628xw:0.628xh;0.190xw,0.222xh&resize=980:*",
      sRating: 0,
      nRating: 0,
      usb: true,
      airConditioning: true,
      carSeats: 4,
      carColor: "Azul",
      typeVehicule: "SUV",
    };

    let [status, res] = await updateDriverStatus(flag, {
      uid: uid,
      atoken: accesstoken,
      driverData: driverData,
    });
    setLocalTrigger(!reloadTrigger);
  };

  //recarga local
  useEffect(() => {
    (async () => {
      setLocalLoad(false);
      const loadfirestore = await loadUserFirestoreData(user);
      setLocalLoad(true);
    })();
  }, [localTrigger]);

  return (
    <Layout>
      <View style={[styles.container]}>
        <Text style={styles.text_titulo}>Registro de Conductor</Text>
        <Text style={styles.text_subTitulo}>
          Para habilitarte como conductor, sube los siguiente documentos:
        </Text>
      </View>

      {localLoad ? (
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
          {!checkDriverVar(userData.isDriver) ? (
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
            <Text style={styles.textDriversigninReady}>Ya estás Listo!</Text>
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
  text_titulo: {
    fontFamily: "Gotham-SSm-Bold",
    fontSize: hp("3%"),
    color: COLORS.TURKEY,
    paddingTop: hp("5%"),
    textAlign: "center",
  },
  textDriversigninReady: {
    fontFamily: "Gotham-SSm-Bold",
    fontSize: hp("4%"),
    color: COLORS.TURKEY_CLEAR,
    paddingBottom: hp("7%"),
  },
  text_subTitulo: {
    fontFamily: "Gotham-SSm-Medium",
    fontSize: hp("2.5%"),
    color: COLORS.TURKEY_CLEAR,
    paddingTop: hp("6%"),
    paddingHorizontal: hp("4%"),
    textAlign: "center",
  },
  button: {
    width: wp("78.6%"),
    height: hp("6%"),
    margin: hp("0.6%"),
  },
  driverfiles: {
    width: wp("78.6%"),
    height: hp("6%"),
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
