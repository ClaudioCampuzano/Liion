import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import Layout from "../../components/Layout";
import { COLORS, hp, wp } from "../../constants/styleThemes";
import ButtonLiion from "../../components/ButtonLiion";
import CameraLiion from "../../components/CameraLiion";
import ModalPopUpDecision from "../../components/ModalPopUpDecision";

const RegisterStepTwo = ({ route, navigation }) => {
  const [photoBase64, setPhotoBase64] = useState(null);
  const [modalError, setModalError] = useState(false);

  const checkValidator = () => {
    if (photoBase64)
      navigation.navigate("RegisterStepThree", {
        ...route.params,
        photo: photoBase64,
      });
    else setModalError(true);
  };

  const modalHandler = () => {
    navigation.navigate("RegisterStepThree", {
      ...route.params,
      photo: photoBase64,
    });
    setModalError(false);
  };
  return (
    <Layout>
      <View
        style={{
          height: hp("78%"),
        }}
      >
        <ModalPopUpDecision
          visible={modalError}
          setModalVisible={setModalError}
          customFunction={modalHandler}
        >
          {"No a seleccionado fotografía\n¿Desea continuar?"}
        </ModalPopUpDecision>
        <Text style={styles.text_titulo}>Fotografía personal</Text>
        <Text style={styles.text_subTitulo}>
          {"Con esto ayudaremos a que los\ndemas usuarios confíen en tí"}
        </Text>
        <View>
          <CameraLiion
            onDataExtract={(value) => {
              setPhotoBase64(value);
            }}
          />
        </View>
      </View>
      <View style={styles.buttonView}>
        <ButtonLiion
          title="Siguiente"
          styleView={styles.button}
          onPress={() => checkValidator()}
        />
      </View>
    </Layout>
  );
};

export default RegisterStepTwo;

const styles = StyleSheet.create({
  text_titulo: {
    fontFamily: "Gotham-SSm-Bold",
    fontSize: hp("3%"),
    color: COLORS.TURKEY,
    paddingTop: hp("6%"),
    textAlign: "center",
  },
  text_subTitulo: {
    fontFamily: "Gotham-SSm-Medium",
    fontSize: hp("2.5%"),
    color: COLORS.TURKEY_CLEAR,
    paddingTop: hp("6%"),
    textAlign: "center",
    paddingBottom: hp("5%"),
  },
  buttonView: {
    flex: 1,
    height: hp("15%"),
    justifyContent: "flex-end",
    paddingBottom: hp("8%"),
  },
  button: {
    width: wp("78.6%"),
    height: hp("4.8%"),
    alignSelf: "center",
  },
});
