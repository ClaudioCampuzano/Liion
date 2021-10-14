import React, { useState, useContext, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  useColorScheme,
  ColorPropType,
  FlatList,
} from "react-native";
import { GlobalContext } from "../../context/Provider";
import Layout from "../../components/Layout";
import ButtonLiionDisable from "../../components/ButtonLiionDisable";
import DriverFiles from "../../components/DriverFiles";
import { COLORS, hp, wp } from "../../constants/styleThemes";

const DriverSignupOne = () => {
  //programar en ingles, sin embargo estos son nombres Chilenos que no sabia traducir
  const [files, setFiles] = useState([
    { name: "Licencia de Conducir", state: false },
    { name: "Certificado de Antecedentes", state: false },
    { name: "Cédula de Identidad", state: false },
    { name: "Hoja de vida del Conductor", state: false },
  ]);
  const [ready, setReady] = useState(false)

  const defineColor = (docState) => {
    if (docState) return COLORS.CHECK_GREEN;
    else return COLORS.WARN_RED;
  };
  const defineIcon = (docState) => {
    if (docState) return "check-circle";
    else return "file-plus";
  };

  const updateState = (index, stateflag) => {
    let document = [...files]
    document[index].state=stateflag
    setFiles(document);
  };

  const defineButtonText = (flag) => {
    if (flag) return "Registrar Conductor"
    else return "Aún Faltan Datos"
  }

  useEffect (() => {
    let flag = true;
    files.forEach((x,i) => flag = x.state && flag) 
    if (flag) setReady(true)
}, [files] )



  return (
    <Layout>
      <View style={[styles.container]}>
        <Text style={styles.textDriversignin}>Registro de Conductor</Text>
        <Text style={styles.tesxtSubDriversignin}>
          Para habilitarte como condctor, sube los siguiente documentos:{" "}
        </Text>
      </View>
      <View style={[styles.driverfilesView]}>
        {
          // files.map((document, index) => ( <Text key={index} > hello {index} </Text>))
          files.map((document, index) => (
            <DriverFiles
              key={index}
              iconname={defineIcon(document.state)}
              color={defineColor(document.state)}
              title={document.name}
              styleView={styles.driverfiles}
              onPress={() => {
                updateState(index,true)
                //console.log(document.name);
              }}
            />
          ))
        }
      </View>
      <View style={[styles.buttonView]}>
        <ButtonLiionDisable
        colordisable={defineColor(ready)}
        disabled={!ready}
          title={defineButtonText(ready)}
          styleView={styles.button}
          onPress={() => console.log("listo")}
        />
      </View>
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
